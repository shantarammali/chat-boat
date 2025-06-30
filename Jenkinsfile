pipeline {
  agent any

  environment {
    NODE_VERSION = '22.18.0'
  }

  tools {
    nodejs "${NODE_VERSION}"
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Cloning repository...'
        git branch: 'main', url: 'https://github.com/shantarammali/chat-boat.git'
      }
    }

    stage('Install Backend Dependencies') {
      steps {
        dir('backend')  {
          echo 'Installing backend dependencies...'
          sh 'npm install'
        }
      }
    }

    stage('Run Backend Tests') {
      steps {
        dir('backend') {
          echo 'Running backend tests...'
          sh 'npm test || true'
        }
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        dir('frontend') {
          echo 'Installing frontend dependencies...'
          sh 'npm install'
        }
      }
    }

    stage('Run Frontend Tests') {
      steps {
        dir('frontend') {
          echo 'Running frontend tests...'
          sh 'npm test -- --watchAll=false || true'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          echo 'Building React frontend...'
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Deploy Backend and Frontend') {
      steps {
        sshagent(['ec2-ssh-key']) {
          sh '''#!/bin/bash

# Deploy backend and restart server
ssh -o StrictHostKeyChecking=no ec2-user@15.206.35.255 <<EOF
cd chat-boat/backend || exit 1
git pull origin main
pm2 restart server || pm2 start server.js --name server
EOF
'''
        }
      }
    }
  }

  post {
    success {
      echo 'Build and deployment successful!'
    }
    failure {
      echo 'Build failed!'
    }
  }
}
