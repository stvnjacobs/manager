#!/usr/bin/env groovy

node('docker') {
  def img;

  stage('Checkout') {
    checkout scm
  }

  stage('Build') {
    img = docker.build("manager-builder:${env.BUILD_ID}")
  }

  stage('Debug') {
    img.inside() {
      sh "yarn"
    }
  }
}
