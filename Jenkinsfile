#!/usr/bin/env groovy

node('docker') {
  checkout scm

  docker.build("manager-builder:${env.BUILD_ID}").inside {
    stage('Install Depenencies') {
      sh "yarn install --frozen-lockfile"
    }
    stage('Build') {
      sh "yarn build"
    }
    stage('Test') {
      sh "yarn test --coverage"
    }
  }
}
