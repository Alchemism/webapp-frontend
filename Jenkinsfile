node {
    def dockerImage
    def githubCredential = '09445975-bb17-487e-bf6e-bd4a27cc7ab4'
    def commit_id
	
	stage('Clone repository') {
        /* Cloning the Repository to our Workspace */
        checkout scm
    }
    stage('Build') {
        docker.image('node:13.8.0').inside {
                sh 'npm --version'
        }
    }
	stage('Building image') {
        commit_id = sh(returnStdout: true, script: 'git rev-parse HEAD')
  		echo "$commit_id"
        dockerImage = docker.build ("${env.registry}")
        
	}
	stage('Registring image') {
        docker.withRegistry( '', "${env.docker_creds}" ) {
            dockerImage.push("$commit_id")
		}
    }
    stage('Clone another repository') {
     /* Cloning the Repository to our Workspace */
        sh 'rm helmChart -rf; mkdir helmChart'
        dir('helmChart') {
            git ( branch: "${env.helmchart_branch}",
                    credentialsId: githubCredential,
                    url: "${env.helmchart_repo}"
                )
            sh "git config --global user.email 'he.jun@husky.neu.edu'"
            sh "git config --global user.name 'junjie'"
            sh 'git config --global push.default current'
            echo "${BUILD_NUMBER}"
            sh "pwd"
            sh "ls"
            updatedVersion= nextVersionFromGit("${env.releaseType}")
            echo "UpdatedVersion"+ updatedVersion
            sh "yq r ./Chart.yaml version"
            sh "yq w -i ./Chart.yaml 'version' ${updatedVersion}"
            sh "yq r ./Chart.yaml version"
            sh "yq w -i ./values.yaml 'imageFrontend' ${env.registry}:$commit_id"
            sh('git add --all')
            sh "git commit -m 'Version bump ${updatedVersion}'"
            sh ('git push origin')
        }
    }
}
def nextVersionFromGit(scope) {
        def latestVersion = sh returnStdout: true, script: 'yq r ./Chart.yaml version'
        def (major, minor, patch) = latestVersion.tokenize('.').collect { it.toInteger() }
        def nextVersion
        switch (scope) {
            case 'major':
                nextVersion = "${major + 1}.0.0"
                break
            case 'minor':
                nextVersion = "${major}.${minor + 1}.0"
                break
            case 'patch':
                nextVersion = "${major}.${minor}.${patch + 1}"
                break
        }
    nextVersion
}