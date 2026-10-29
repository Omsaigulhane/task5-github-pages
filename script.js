/**
 * DevOps & Cloud Engineering Portfolio - Interactive Logic
 * Pure Vanilla JavaScript (Zero External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav on link click
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Header Scrolled State
  const siteHeader = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // 4. Scroll Spy for Active Navigation Link
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // 5. Interactive Terminal Tabs Simulator
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const terminalScreen = document.getElementById('terminal-screen');

  const terminalSnippets = {
    deploy: `
      <div class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">terraform plan -out=tfplan</span></div>
      <div class="term-line text-muted">Plan: 3 to add, 0 to change, 0 to destroy.</div>
      <div class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">docker build -t app:v1.2.0 .</span></div>
      <div class="term-line text-info">[+] Building 2.4s (14/14) FINISHED</div>
      <div class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">git push origin main</span></div>
      <div class="term-line text-success">&#x2714; GitHub Actions: CI/CD Pipeline Passed in 48s</div>
      <div class="term-line text-cyan">&#x27A4; Release deployed to production cluster with zero downtime.</div>
      <div class="term-line active-line"><span class="term-prompt">$</span> <span class="term-cursor"></span></div>
    `,
    terraform: `
      <div class="term-line"><span class="term-prompt">#</span> <span class="term-cmd">cat main.tf | grep resource</span></div>
      <div class="term-line text-info">resource "docker_image" "nginx" { name = "nginx:alpine" }</div>
      <div class="term-line text-info">resource "docker_container" "web" { ... }</div>
      <div class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">terraform apply -auto-approve</span></div>
      <div class="term-line text-success">&#x2714; docker_container.web: Creation complete after 1.8s [id=3a9b1c]</div>
      <div class="term-line text-cyan">Apply complete! Resources: 2 added, 0 changed, 0 destroyed.</div>
      <div class="term-line active-line"><span class="term-prompt">$</span> <span class="term-cursor"></span></div>
    `,
    docker: `
      <div class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">docker-compose up -d --build</span></div>
      <div class="term-line text-muted">[+] Running 2/2</div>
      <div class="term-line text-info"> ✔ Container node-api-service  Started (healthy)</div>
      <div class="term-line text-info"> ✔ Container nginx-gateway     Started (healthy)</div>
      <div class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">curl -i http://localhost:80/health</span></div>
      <div class="term-line text-success">HTTP/1.1 200 OK | {"status":"UP","uptime":"99.99%"}</div>
      <div class="term-line active-line"><span class="term-prompt">$</span> <span class="term-cursor"></span></div>
    `
  };

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const termKey = tab.getAttribute('data-term');
      if (terminalScreen && terminalSnippets[termKey]) {
        terminalScreen.innerHTML = terminalSnippets[termKey];
      }
    });
  });

  // 6. Project Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // 7. Interactive Project Modals with Architecture & Code
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  const modalTriggers = document.querySelectorAll('.modal-trigger');

  const projectModalData = {
    'docker-node': {
      category: 'Containerization & Security',
      title: 'Dockerized Node.js Application (Multi-Stage Build)',
      description: 'A production-hardened Docker setup designed to minimize container image footprint, eliminate build tool artifacts from the runtime image, run as an unprivileged user, and provide deterministic health check telemetry.',
      keyDecisions: [
        'Multi-stage build separation (Builder stage with npm build tools -> Runtime stage with Node Alpine)',
        'Dramatic image size reduction from 820MB standard Ubuntu/Node down to ~78MB',
        'Security hardening: executed under unprivileged non-root "node" user (UID 1000)',
        'Proper POSIX signal handling using lightweight init process (tini / dumb-init)',
        'Container-native HEALTHCHECK probe querying /healthz endpoint every 30 seconds'
      ],
      codeSnippet: `# ----------------------------------------------------
# Stage 1: Build & Dependencies
# ----------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production && cp -R node_modules prod_node_modules
RUN npm ci

COPY . .
RUN npm run build

# ----------------------------------------------------
# Stage 2: Minimal Production Runtime
# ----------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production
RUN apk --no-cache add dumb-init

COPY --chown=node:node --from=builder /usr/src/app/prod_node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node package*.json ./

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD wget -qO- http://localhost:3000/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]`,
      runCommands: `
# Build the production image:
docker build -t node-production-app:v1.0.0 .

# Run the container with resource limits and health check:
docker run -d --name web-app -p 3000:3000 --memory="256m" --cpus="0.5" node-production-app:v1.0.0

# Verify container status and health:
docker ps --filter "name=web-app"`
    },
    'terraform-nginx': {
      category: 'Infrastructure as Code (IaC)',
      title: 'Terraform-Managed Nginx Web Infrastructure',
      description: 'Declarative configuration management orchestrating isolated Nginx reverse proxies and web application backends. Eliminates manual click-ops and guarantees zero configuration drift.',
      keyDecisions: [
        'Declarative state management maintaining synchronization between configuration and live state',
        'Parameterized variables for listening ports, upstream services, and container memory limits',
        'Custom template configuration dynamically injected into the container at provisioning time',
        'Isolated Docker bridge network created dynamically for secure container-to-container communication',
        'Reproducible teardown and rebuild in under 3 seconds using "terraform apply" / "terraform destroy"'
      ],
      codeSnippet: `terraform {
  required_version = ">= 1.5.0"
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.2"
    }
  }
}

provider "docker" {}

# Custom isolated bridge network
resource "docker_network" "app_network" {
  name = "devops_bridge_net"
}

# Nginx Image definition
resource "docker_image" "nginx" {
  name         = "nginx:alpine"
  keep_locally = true
}

# Nginx Container configuration
resource "docker_container" "nginx_proxy" {
  name  = "nginx-ingress-proxy"
  image = docker_image.nginx.image_id

  ports {
    internal = 80
    external = var.nginx_external_port
  }

  networks_advanced {
    name = docker_network.app_network.name
  }

  volumes {
    container_path = "/etc/nginx/conf.d/default.conf"
    host_path      = abspath("\${path.module}/nginx.conf")
    read_only      = true
  }

  restart = "unless-stopped"
}`,
      runCommands: `
# Initialize Terraform and download providers:
terraform init

# Validate configuration syntax:
terraform validate

# Inspect plan and resources to be created:
terraform plan -out=tfplan

# Apply the infrastructure declaratively:
terraform apply tfplan`
    },
    'git-workflow': {
      category: 'Git Branching & CI/CD Pipelines',
      title: 'Automated Git Workflow & GitHub Actions CI/CD Demo',
      description: 'An enterprise-grade Git strategy with automated branch protections, pull request checks, semantic version calculation, automated linting, and continuous delivery artifacts.',
      keyDecisions: [
        'Trunk-based development flow paired with short-lived feature branches (`feat/*`, `fix/*`)',
        'Conventional Commits specification (`feat:`, `fix:`, `chore:`, `ci:`) for automated changelogs',
        'Automated GitHub Actions CI matrix executing tests across Linux environments',
        'Branch protection rules enforcing linear history and requiring at least 1 approving review',
        'Automated artifact build and GitHub Pages deployment upon merge to main branch'
      ],
      codeSnippet: `name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  validate:
    name: Lint, Test & Validate
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Linters & Static Analysis
        run: npm run lint

      - name: Run Unit Tests with Coverage
        run: npm test -- --coverage

  build-and-deploy:
    name: Package & Deploy
    needs: validate
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./`,
      runCommands: `
# 1. Create a feature branch following naming conventions:
git checkout -b feat/add-prometheus-metrics

# 2. Stage changes and make a Conventional Commit:
git commit -m "feat(metrics): integrate Prometheus exporter endpoint"

# 3. Push branch and open Pull Request for automated CI checks:
git push -u origin feat/add-prometheus-metrics`
    }
  };

  const openModal = (projectId) => {
    const data = projectModalData[projectId];
    if (!data || !modalContent || !modalBackdrop) return;

    modalContent.innerHTML = `
      <div class="modal-header-section">
        <span class="modal-category">${data.category}</span>
        <h3 class="modal-title-text" id="modal-title">${data.title}</h3>
      </div>
      <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
        ${data.description}
      </p>

      <h4 style="color: var(--text-primary); font-size: 1rem; margin-bottom: 0.65rem;">Key Engineering Decisions:</h4>
      <ul style="color: var(--text-secondary); margin-left: 1.25rem; margin-bottom: 1.25rem; font-size: 0.88rem; line-height: 1.6;">
        ${data.keyDecisions.map(item => `<li style="margin-bottom: 0.35rem;">${item}</li>`).join('')}
      </ul>

      <h4 style="color: var(--text-primary); font-size: 1rem; margin-bottom: 0.4rem;">Configuration / Manifest Snippet:</h4>
      <pre class="modal-code-block"><code>${escapeHtml(data.codeSnippet)}</code></pre>

      <h4 style="color: var(--text-primary); font-size: 1rem; margin-bottom: 0.4rem;">Verification &amp; Execution Commands:</h4>
      <pre class="modal-code-block" style="border-left: 3px solid var(--cyan-primary);"><code>${escapeHtml(data.runCommands)}</code></pre>

      <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end;">
        <button class="btn btn-outline btn-sm" id="modal-inner-close">Close Details</button>
      </div>
    `;

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook internal close button
    const innerClose = document.getElementById('modal-inner-close');
    innerClose?.addEventListener('click', closeModal);
  };

  const closeModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project');
      if (projId) openModal(projId);
    });
  });

  modalClose?.addEventListener('click', closeModal);

  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeModal();
    }
  });

  // Helper to escape HTML characters in code blocks
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // 8. Toast Notifications
  const toast = document.getElementById('toast');
  let toastTimeout;

  const showToast = (message, icon = '✔') => {
    if (!toast) return;
    clearTimeout(toastTimeout);
    toast.innerHTML = `<span style="color: var(--cyan-primary);">${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  };

  // 9. Copy Email to Clipboard
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const emailTextElem = document.getElementById('email-address');

  if (btnCopyEmail && emailTextElem) {
    btnCopyEmail.addEventListener('click', async () => {
      const email = emailTextElem.textContent.trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = email;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        showToast('Email address copied to clipboard!');
      } catch (err) {
        showToast('Failed to copy email automatically.', 'ℹ');
      }
    });
  }

  // 10. Contact Form Client-side Validation & Simulation
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('has-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('has-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('has-error');
      }

      if (isValid) {
        const submitBtn = document.getElementById('form-submit-btn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Transmitting...</span>';
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Send Message</span>
              <svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>`;
          }

          contactForm.reset();
          if (formStatus) {
            formStatus.innerHTML = '<span style="color: var(--emerald-primary);">✔ Thank you! Your message has been recorded.</span>';
            setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
          }
          showToast('Message transmitted successfully! Will respond soon.');
        }, 800);
      }
    });

    // Clear error on input
    ['contact-name', 'contact-email', 'contact-message'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', function () {
        this.parentElement.classList.remove('has-error');
      });
    });
  }

  // Console Easter Egg for Engineers
  console.log(
    '%c[DevOps Portfolio]%c System initialized successfully. Built with modern semantic HTML5, CSS3 & JavaScript for GitHub Pages.',
    'color: #00f2fe; font-weight: bold; background: #0b1120; padding: 4px 8px; border-radius: 4px;',
    'color: #10b981;'
  );
});
