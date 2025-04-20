pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Image') {
            steps {
                bat 'docker build -t elessanderunc/nextjs-frontend:1.0 .' 
            }
        }
        
        stage('Deploy') {
            steps {
                bat 'docker-compose down --remove-orphans'  
                bat 'docker-compose up -d --build'
            }
        }
         stage('docker push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    bat """
                        docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%
                        docker tag nextjs-frontend:1.0 %DOCKERHUB_USERNAME%/nextjs-frontend:1.0
                        docker push %DOCKERHUB_USERNAME%/nextjs-frontend:1.0
                        docker logout
                    """
                }
            }
        }
    }
}