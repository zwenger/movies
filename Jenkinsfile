pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'make build'

            }
            post {
                success {
                    slackSend (color: 'good', message: "BUILD SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
                failure {
                    slackSend (color: 'danger', message: "BUILD FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
            }
        }
        stage('run') {
            steps {
                sh 'make run'
            }
            post {
                success {
                    slackSend (color: 'good', message: "RUN SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
                failure {
                    slackSend (color: 'danger', message: "RUN FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
            }
        }
        stage('Test') {
            steps {
                sh 'docker exec node_api-server_1 npm run test'
            }
            post {
                success {
                    slackSend (color: 'good', message: "TEST SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
                failure {
                    slackSend (color: 'danger', message: "TEST FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
            }
        }
        stage("Docker push") {
            environment {
                DOCKER_USERNAME = credentials("docker-user")
                DOCKER_PASSWORD = credentials("docker-password")
            }
            steps {
                sh "docker login --username ${DOCKER_USERNAME} --password ${DOCKER_PASSWORD}"
                sh "docker tag api-server zwenger/api-server"
                sh "docker push zwenger/api-server"
            }
        }
        stage('stop') {
            steps {
                sh 'make stop'
            }
            post {
                success {
                    slackSend (color: 'good', message: "STOP SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
                failure {
                    slackSend (color: 'danger', message: "STOP FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
            }
        }
        
        
    //     stage('Sonarqube') {
          
    //         steps {
    //            sh "cp -r /var/lib/jenkins/workspace/alfred/* /var/lib/jenkins/workspace/test"
              
    //         }
    //     }
    //     stage('Deliver') {
    //         steps {
    //             sh './jenkins/scripts/deliver.sh'
    //         }
    //         post {
    //             success {
    //                 slackSend (color: 'good', message: "DELIVER SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    //             }
    //             failure {
    //                 slackSend (color: 'danger', message: "DELIVER FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    //             }
    //         }
    //     }
     }
}