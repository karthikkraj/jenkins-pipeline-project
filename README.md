
# Jenkins CI/CD Pipeline Project

A complete end-to-end Continuous Integration and Continuous Deployment (CI/CD) pipeline using **Jenkins**, integrating with **GitHub**, **SonarQube**, **Docker**, and automated deployment workflows. The project containerizes a basic Node.js application and demonstrates best practices for software build, testing, analysis, and deployment automation.

---

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Pipeline Architecture](#pipeline-architecture)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Pipeline Stages](#pipeline-stages)
- [Setup & Prerequisites](#setup--prerequisites)
- [How to Run](#how-to-run)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## 🚀 Project Overview

This project automates the process of building, analyzing, Dockerizing, and deploying a Node.js application through a Jenkins Pipeline. It covers:

- **Source Code Management**: Pulling code from GitHub.
- **Static Code Analysis**: Using SonarQube for quality checks.
- **Containerization**: Dockerizing the application.
- **Deployment Automation**: Deploying Docker containers.

---

## 🛠️ Pipeline Architecture

```plaintext
GitHub Repository ➔ Jenkins Pipeline ➔ SonarQube Analysis ➔ Docker Build & Push ➔ Deployment
```

Each commit triggers the Jenkins pipeline, ensuring code is built, tested, analyzed, containerized, and deployed automatically.

---

## 💻 Technologies Used

- **Jenkins**: Automation server for CI/CD pipeline orchestration.
- **Git & GitHub**: Version control and source code hosting.
- **Node.js**: Application environment.
- **SonarQube**: Static code analysis and code quality checks.
- **Docker**: Containerization and image management.

---

## 📂 Folder Structure

```
├── Dockerfile                 # Dockerfile to build the Node.js app image
├── Jenkinsfile                # Declarative Jenkins pipeline definition
├── app.js                     # Basic Node.js application
├── package.json               # Node.js dependencies and metadata
└── sonar-project.properties   # SonarQube project configuration
```

---

## ⚙️ Pipeline Stages

| Stage                  | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| **Checkout**           | Clones the source code from GitHub.                                         |
| **Build & Install**    | Installs Node.js dependencies using `npm install`.                          |
| **SonarQube Analysis** | Runs static code analysis and generates code quality reports.               |
| **Docker Build**       | Builds a Docker image of the Node.js app using the Dockerfile.              |
| **Docker Push**        | Pushes the Docker image to DockerHub (configured credentials required).     |
| **Deployment**         | Deploys the Docker container to the specified environment/server.           |

---

## 📥 Setup & Prerequisites

Ensure the following software and configurations are available:

1. **Jenkins Installed** with:
   - Git plugin
   - Docker plugin
   - SonarQube Scanner plugin

2. **SonarQube Server** configured and accessible.

3. **Docker Installed & Running** on Jenkins host.

4. **GitHub Repository Access** with valid credentials.

5. **DockerHub Account** to push Docker images.

---

## ▶️ How to Run

1. **Clone the Repository**

```bash
git clone https://github.com/karthikkraj/jenkins-pipeline-project.git
cd jenkins-pipeline-project
```

2. **Configure Jenkins:**
   - Create a new pipeline job.
   - Link the repository.
   - Set up necessary credentials (GitHub & DockerHub).
   - Configure SonarQube integration in Jenkins.

3. **Run the Pipeline:**
   - Start the Jenkins pipeline.
   - Monitor each stage in the Jenkins UI.

---

## 🌟 Future Improvements

- Add unit testing stage with test coverage reports.
- Implement notifications (Slack, Email) on pipeline success/failure.
- Extend deployment to Kubernetes or cloud environments.
- Add Blue-Green deployment strategy.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📢 Author

**Karthik Raj**  
GitHub: [karthikkraj](https://github.com/karthikkraj)
