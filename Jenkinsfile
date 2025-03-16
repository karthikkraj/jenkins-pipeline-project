pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Name you configured in Jenkins
    }

    environment {
        SONARQUBE = 'My SonarQube' // Name you configured for SonarQube
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/karthikkraj/jenkins-pipeline-project', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('My SonarQube') {
                    sh 'sonar-scanner -Dsonar.projectKey=BCD41-Karthik-jenkins -Dsonar.sources=. -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        def app = docker.build("karthikkraj/BCD41-Karthik-jenkins:${env.BUILD_NUMBER}")
                        app.push()
                    }
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    sh '''
                    docker rm -f bcd41-container || true
                    docker pull karthikkraj/BCD41-Karthik-jenkins:${BUILD_NUMBER}
                    docker run -d --name bcd41-container -p 3000:3000 karthikkraj/BCD41-Karthik-jenkins:${BUILD_NUMBER}
                    '''
                }
            }
        }
    }
}
