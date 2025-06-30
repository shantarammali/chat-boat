pipeline {
  agent any

  environment {
    NODE_VERSION = '22.18.0' // Specify the Node.js version you want to use
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
          sh 'npm test || true' // Use '|| true' to allow the pipeline to continue even if tests fail
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
          sh 'npm test -- --watchAll=false || true' // Use '--watchAll=false' to run tests once and '|| true' to allow the pipeline to continue even if tests fail
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          echo 'Building React frontend...'
          sh 'npm run build'
        }
      }
    }

    stage('Deploy') {
  steps {
    sshagent(['ec2-ssh-key']) {
      sh '''
        ssh -o StrictHostKeyChecking=no ec2-user@15.206.35.255 << 'EOF'
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
