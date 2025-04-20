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
    }
}