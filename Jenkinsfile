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
stage('Clone Helm Chart Repo')
    {
            script
            {
                git (branch: 'jenkins-test',
                	 credentialsId: '9d9b1197-7974-42e1-968d-a66b91409e15',
                     url: 'https://github.com/SoniaMahankali/helm-charts.git')
                sh ("pwd")
                sh ("ls")
                latestversion = getChartVersion()
                newVersion = generateNewVersion("patch")
                echo latestversion
                echo newVersion
                sh ("yq r ./frontend/Chart.yaml version")
                sh ("yq w -i ./frontend/Chart.yaml 'version' ${newVersion}")
                sh ("yq r ./frontend/Chart.yaml version")
                sh ("yq r ./frontend/values.yaml 'image.name'")
                sh ("yq w -i ./frontend/values.yaml 'image.name' '${registry}:${GIT_COMMIT}'")
                sh ("yq r ./frontend/values.yaml 'image.name'")
                sh ('git config --global user.email "mahankali.s@husky.neu.edu"')
                sh ('git config --global user.name "SoniaMahankali"')
                sh ("git add --all")
                sh ('git commit -m "ci/cd"')
                withCredentials([usernamePassword(credentialsId: '9d9b1197-7974-42e1-968d-a66b91409e15', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/SoniaMahankali/helm-charts.git jenkins-test')
                }
            }
        }
    }
def getChartVersion(){
    def version = sh (returnStdout: true, script: 'yq r ./frontend/Chart.yaml version')
    return version
}

def generateNewVersion(release){
    def (major, minor, patch) = getChartVersion().tokenize(".").collect{element -> return element.toInteger()}
    def newVersion
    if (release == 'major'){
        newVersion = "${major + 1}.0.0"
    }
    else if (release == 'minor'){
        newVersion = "${major}.${minor + 1}.0"
    }
    else if (release == 'patch'){
        newVersion = "${major}.${minor}.${patch + 1}"
    }
    return newVersion
}