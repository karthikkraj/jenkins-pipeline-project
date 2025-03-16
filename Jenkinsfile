pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
    }
    
    environment {
    BRANCH_NAME = 'main'
    }
    
   stage('Checkout Code') {
    steps {
        git branch: 'main', url: 'https://github.com/karthikkraj/jenkins-pipeline-project.git'
            }
        }

        stage('Install Dependencies & Build') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonarQube') {
                    sh 'sonar-scanner'
                }
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t karthikkraj/jenkins-pipeline-node-app:latest .'
            }
        }
        stage('Docker Push & Deploy') {
            steps {
                withDockerRegistry(credentialsId: "${DOCKERHUB_CREDENTIALS}", url: '') {
                    sh 'docker push karthikkraj/jenkins-pipeline-node-app:latest'
                    sh 'docker run -d -p 3000:3000 karthikkraj/jenkins-pipeline-node-app:latest'
                }
            }
        }
    }
}

