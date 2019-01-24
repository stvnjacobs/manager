#!/usr/bin/env groovy

node('docker') {
  checkout scm

  withEnv([
    'TEST_FOO=foo',
    'TEST_BAR=bar',
    'TEST_BAZ=baz']) {

    docker.image("node:lts-alpine").inside {
      stage('Debug Environment') {
        sh 'echo $TEST_FOO'
        sh 'echo "$TEST_FOO"'
        sh 'echo ${TEST_BAR}'
        sh 'echo "${TEST_BAR}"'
        sh "echo ${env.TEST_BAZ}"
      }
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
}
