node() {
    def docker_image
    def commit_id
        stage('Clone Repository') {
            checkout scm
        }
        stage('Build') {
            docker.image('node:13.8.0').inside {
                sh 'npm --version'
            }
        }
        stage('Building image') {
            script {
                commit_id = sh(returnStdout: true, script: 'git rev-parse HEAD')
                docker_image = docker.build("${env.registry}")
                echo "$commit_id"
            }
        }
        stage('Pushing image') {
            script {
                    docker.withRegistry('', "${env.docker_creds}" ) {
                    echo "$commit_id"
                    docker_image.push("${commit_id}")
                    docker_image.push("latest")
                }
            }
        }
}