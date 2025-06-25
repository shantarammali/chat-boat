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
        git 'https://your-git-repo-url.git'
      }
    }

    stage('Install Backend Dependencies') {
      steps {
        dir('server') {
          echo 'Installing backend dependencies...'
          sh 'npm install'
        }
      }
    }

    stage('Run Backend Tests') {
      steps {
        dir('server') {
          echo 'Running backend tests...'
          sh 'npm test'
        }
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        dir('client') {
          echo 'Installing frontend dependencies...'
          sh 'npm install'
        }
      }
    }

    stage('Run Frontend Tests') {
      steps {
        dir('client') {
          echo 'Running frontend tests...'
          sh 'npm test -- --watchAll=false'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('client') {
          echo 'Building React frontend...'
          sh 'npm run build'
        }
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying application...'
        // You can add SSH, FTP, Docker, etc. deployment here.
        // Example:
        // sh 'scp -r client/build user@your-server:/var/www/html'
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
