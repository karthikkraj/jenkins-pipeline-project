pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
        BRANCH_NAME = 'main'
        IMAGE_NAME = 'karthikkraj/bcd41-karthik-jenkins:latest'
        CONTAINER_NAME = 'nodejs-app'
        // Add Docker path to environment variables
        DOCKER_PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
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
                    // Use withEnv to ensure Docker is found in PATH
                    withEnv(["PATH+DOCKER=${DOCKER_PATH}"]) {
                        sh 'which docker || echo "Docker not found in PATH"'
                        sh 'docker --version || echo "Docker command failed"'
                        sh "docker build -t ${IMAGE_NAME} ."
                    }
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                echo "Pushing Docker image to DockerHub..."
                script {
                    // Use withEnv to ensure Docker is found in PATH
                    withEnv(["PATH+DOCKER=${DOCKER_PATH}"]) {
                        // Use credentials binding instead of withDockerRegistry for better compatibility
                        withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", 
                                                         usernameVariable: 'DOCKER_USERNAME', 
                                                         passwordVariable: 'DOCKER_PASSWORD')]) {
                            sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                            sh "docker push ${IMAGE_NAME}"
                            sh 'docker logout'
                        }
                    }
                }
            }
        }
        
        stage('Deploy Docker Container') {
            steps {
                echo "Deploying Docker container: ${CONTAINER_NAME}"
                script {
                    // Use withEnv to ensure Docker is found in PATH
                    withEnv(["PATH+DOCKER=${DOCKER_PATH}"]) {
                        // Add error handling for container operations
                        sh '''
                            # Stop & remove existing container (if any)
                            docker ps -a | grep -q ${CONTAINER_NAME} && docker rm -f ${CONTAINER_NAME} || echo "No existing container to remove"
                            
                            # Run new container with health check
                            docker run -d --name ${CONTAINER_NAME} -p 9090:9090 ${IMAGE_NAME}
                            
                            # Verify container is running
                            CONTAINER_RUNNING=$(docker ps -q -f name=${CONTAINER_NAME})
                            if [ -z "$CONTAINER_RUNNING" ]; then
                                echo "Error: Failed to start container ${CONTAINER_NAME}"
                                exit 1
                            else
                                echo "Container '${CONTAINER_NAME}' deployed successfully!"
                            fi
                        '''
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed. Cleaning up dangling images..."
            withEnv(["PATH+DOCKER=${DOCKER_PATH}"]) {
                sh 'docker image prune -f || true'
            }
        }
        success {
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check logs."
            // Add more detailed error reporting if needed
            withEnv(["PATH+DOCKER=${DOCKER_PATH}"]) {
                sh 'docker ps -a || true'
                sh 'docker images || true'
            }
        }
    }
}
