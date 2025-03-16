pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
        BRANCH_NAME = 'main'
        IMAGE_NAME = 'karthikkraj/bcd41-karthik-jenkins:latest'
        CONTAINER_NAME = 'nodejs-app'
    }

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "Checking out code from branch: ${BRANCH_NAME}"
                git branch: "${BRANCH_NAME}", url: 'https://github.com/karthikkraj/jenkins-pipeline-project'
            }
        }

        stage('Install Dependencies & Build') {
            steps {
                echo "Installing Node.js dependencies and running tests..."
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo "Starting SonarQube analysis..."
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('MySonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=jenkins-pipeline-project"
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker image: ${IMAGE_NAME}"
                script {
                    // Ensure Docker is available
                    sh 'docker --version'
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Docker Push') {
            steps {
                echo "Pushing Docker image to DockerHub..."
                script {
                    // Ensure Docker is available and credentials are correct
                    withDockerRegistry(credentialsId: 'dockerhub-credentials', url: '') {
                        sh "docker push ${IMAGE_NAME}"
                    }
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                echo "Deploying Docker container: ${CONTAINER_NAME}"
                script {
                    // Stop & remove existing container (if any)
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                    
                    // Run new container
                    sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}"
                    
                    echo "Container '${CONTAINER_NAME}' deployed successfully!"
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed. Cleaning up dangling images..."
            sh 'docker image prune -f || true'
        }
        success {
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check logs."
        }
    }
}
