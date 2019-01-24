#!/usr/bin/env groovy

def setEnv() {
  def envs = [:];

  envs.REACT_APP_API_ROOT = 'https://api.linode.com'
  envs.REACT_APP_LOGIN_ROOT = 'https://login.linode.com'

  if (env.BRANCH_NAME == 'master') {
    envs.REACT_APP_APP_ROOT = 'https://manager.master.pg.stj.io'
    envs.REACT_APP_CLIENT_ID = ''
  }
  else if (env.BRANCH_NAME == 'develop') {
    envs.REACT_APP_APP_ROOT = 'https://manager.develop.pg.stj.io'
    envs.REACT_APP_CLIENT_ID = ''
  }
  else if (env.BRANCH_NAME == 'release') {
    envs.REACT_APP_APP_ROOT = 'https://manager.release.pg.stj.io'
    envs.REACT_APP_CLIENT_ID = ''
  }

  return envs.collect { key, value -> "${key}=${value}" }
}

node('docker') {
  checkout scm

  def img;

  withEnv(setEnv()) {
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

    stage('Package') {
      img = docker.build("linode-manager:${env.BUILD_ID}", "./Dockerfile-server")
    }
  }

  stage('Debug') {
    img.inside {
      sh "ls -alh"
      sh "ls -alh /usr/share/nginx/html"
    }
  }
}
