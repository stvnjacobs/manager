#!/usr/bin/env groovy

node('docker') {
  checkout scm

  docker.image("node:lts-alpine").inside {
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
