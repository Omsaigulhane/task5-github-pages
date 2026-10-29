# 🚀 DevOps & Cloud Engineering Portfolio

A modern, responsive, and high-performance DevOps portfolio website designed and optimized for hosting on **GitHub Pages**.

Built for the **Elevate Labs Internship (Task 5: GitHub Pages Portfolio)**, this project highlights foundational and advanced competencies in Infrastructure as Code (IaC), containerization, CI/CD pipelines, cloud administration, and automated reliability engineering.

---

## 🌟 Key Features

- **Dark DevOps Aesthetic**: Sleek slate and dark navy palette with vibrant cyan (`#00f2fe`) and emerald (`#10b981`) terminal glows, glassmorphism, and subtle technical grid overlay.
- **Interactive Terminal Simulator**: Hero terminal widget displaying live simulated CLI workflows (`deploy.sh`, `main.tf`, `docker-compose`).
- **Hero Metrics Bar**: Highlights 100% automated IaC, 99.9% uptime target, and rapid CI/CD build cycles.
- **About & Philosophy**: Explains core infrastructure philosophies (Shift-Left security, Immutable infrastructure, Continuous delivery, and Observability).
- **Technical Skills Matrix**: Comprehensive categorization covering Git & GitHub, Docker, Terraform, Linux Systems, AWS Cloud, and CI/CD automation with custom SVG icons.
- **Featured Projects with Filter & Interactive Modals**:
  1. **Dockerized Node.js Application**: Multi-stage build (reducing image size from 820MB to 78MB), non-root execution, dumb-init signal handling, and native health checks.
  2. **Terraform-Managed Nginx Infrastructure**: Declarative IaC provisioning an Nginx reverse proxy with dynamic templates, custom bridge networks, and state management.
  3. **Git Workflow & CI/CD Demo**: Trunk-based branching, conventional commits, and automated GitHub Actions verification pipeline.
- **Interactive Modals**: Detailed architectural breakdown, manifest snippets (`Dockerfile`, `main.tf`, `deploy.yml`), and verification commands for every project.
- **End-to-End Pipeline Visualizer**: Interactive 5-stage lifecycle from Code & Commit to Observability.
- **Contact & Connect Section**: Direct links to GitHub and LinkedIn profiles, one-click copy button for email with toast notification, and a validated contact form.
- **Fully Responsive**: Mobile menu drawer with smooth toggle, fluid layouts for mobile, tablet, and desktop viewports.
- **Zero Build Tools or Heavy Dependencies**: 100% native semantic HTML5, Vanilla CSS3, and modern JavaScript. Loads instantly with 0 external npm dependencies.

---

## 📂 Repository File Structure

```text
task5-github-pages/
├── .gitignore          # Ignores OS artifacts, editor settings, and secrets
├── README.md           # Documentation, local preview, and deployment instructions
├── index.html          # Main entry point and semantic structure
├── style.css           # Modern design system, themes, animations, responsive rules
└── script.js           # Interactive terminal, project filtering, modal viewer, toast
```

---

## 💻 How to Preview Locally

Because this project is built with static web standards (HTML/CSS/JS), it can be run locally using any standard static file server or directly in your browser.

### Option 1: Using Python (Recommended & Built-in)

If you have Python installed, open your terminal in the project directory and run:

```bash
# Python 3
python -m http.server 8000
```

Then visit: [http://localhost:8000](http://localhost:8000)

### Option 2: Using Node.js `npx serve`

If you have Node.js installed:

```bash
npx serve .
```

### Option 3: Using VS Code Live Server Extension

1. Open the folder in VS Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

### Option 4: Direct Browser Preview

You can double-click `index.html` in your file explorer to open it directly in Chrome, Firefox, or Edge.

---

## 🌐 How to Deploy to GitHub Pages

Follow these step-by-step instructions to deploy your portfolio to GitHub Pages:

### Step 1: Initialize Git and Commit Changes (Local)

If the repository has not yet been initialized:

```bash
git init
git add .
git commit -m "feat: complete responsive DevOps portfolio website for GitHub Pages"
```

### Step 2: Push to GitHub

Link your local repository to your GitHub remote repository and push to the `main` branch:

```bash
# Replace with your repository URL:
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages in Repository Settings

1. On GitHub, navigate to your repository.
2. Click on the **Settings** tab (gear icon at the top).
3. In the left navigation menu, scroll down to the **Code and automation** section and click on **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` from the dropdown, and keep the folder as `/ (root)`.
5. Click **Save**.

### Step 4: Access Your Live Portfolio

GitHub Actions will automatically trigger a deployment workflow. In about 1 to 2 minutes, your portfolio will be live at:

```text
https://<your-username>.github.io/<your-repo-name>/
```

*(If this is a user repository named `<your-username>.github.io`, the URL will be `https://<your-username>.github.io/`)*.

---

## ⚙️ Customization Guide

To personalize this portfolio with your actual details:

1. **Personal Information**:
   - Open `index.html`.
   - Update the placeholder email `devops.engineer.intern@example.com` to your real contact email.
   - Update `github.com/devops-intern` and `linkedin.com/in/devops-profile` with your actual social links.
2. **Project Links**:
   - Update the repository links (`class="link-github"`) to point directly to your specific GitHub repositories for your Docker, Terraform, and CI/CD projects.
3. **Bio & Experience**:
   - Edit the paragraphs in `<section class="section about-section" id="about">` to reflect your background and aspirations.

---

## 🛡️ License

This project is created for educational and internship portfolio demonstration purposes. Feel free to modify and adapt it for your personal portfolio.
