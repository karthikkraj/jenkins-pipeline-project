pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
        BRANCH_NAME = 'main'
    }

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "${BRANCH_NAME}", url: 'https://github.com/karthikkraj/jenkins-pipeline-project.git'
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
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('MySonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t BCD41-Karthik-jenkins:latest .'
            }
        }

        stage('Docker Push & Deploy') {
            steps {
                withDockerRegistry(credentialsId: "${DOCKERHUB_CREDENTIALS}", url: '') {
                    sh 'docker push BCD41-Karthik-jenkins:latest'
                    sh 'docker run -d -p 3000:3000 BCD41-Karthik-jenkins:latest'
                }
            }
        }
    }
}
