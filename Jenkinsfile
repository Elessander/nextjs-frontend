pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Deploy') {
            steps {
                dir('backend') {
                    bat 'docker-compose down'
                    bat 'docker-compose up -d --build'
                }
            }
        }
    }
}