pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Security Evidence') {
      steps {
        sh 'test -f docs/${ISSUE_KEY}/security-pre-pr.md && grep "^SECURITY_DECISION: pass$" docs/${ISSUE_KEY}/security-pre-pr.md'
      }
    }

    stage('Manual Approval') {
      steps {
        echo 'Jenkins validation complete. GitHub PR still requires manual review and merge.'
      }
    }
  }
}
