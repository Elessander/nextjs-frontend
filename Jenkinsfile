pipeline {
  agent any
  environment {
    DOCKER_IMAGE = "elessanderunc/nextjs-frontend"
    TAG          = "1.0"
  }
  stages {
    stage('Build') {
      steps {
        sh 'cd frontend && npm install && npm run build'
      }
    }
    stage('Docker') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh """
            docker login -u $USER -p $PASS
            cd frontend
            docker build -t $DOCKER_IMAGE:$TAG .
            docker push $DOCKER_IMAGE:$TAG
            docker logout
          """
        }
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker-compose pull && docker-compose up -d'
      }
    }
  }
}