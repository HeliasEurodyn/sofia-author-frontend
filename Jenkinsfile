def remote = [:]
remote.name = 'onenet'
remote.host = 'onenet-NGSI-LD-server.eurodyn.com'
remote.allowAnyHosts = true
node
{
    try{
        stage("Clone From GIT")
        {
            git branch: 'master',
            url: 'https://{token}@github.com/HeliasEurodyn/sofia-author-frontend.git'
        }
        stage("Build")
        {
            nodejs('NodeJs') {
                sh 'npm install --save-dev @angular-devkit/build-angular --legacy-peer-deps'
                sh 'npm --version'
                sh 'node --version'
                sh 'npm update --legacy-peer-deps'
                sh 'ng config -g cli.warnings.versionMismatch false'
                sh 'ng build --no-aot --no-build-optimizer --base-href ./ --configuration production'
            }
        }
        stage("Deploy")
        {
            withCredentials([usernamePassword(credentialsId: 'onenet', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')])
            {
                remote.user = USERNAME
                remote.password = PASSWORD
                sshCommand remote: remote, command: "cd /home/engonenet/ed/onenet_for_jenkins/frontend-author-container;docker-compose down"
                sshRemove remote: remote, path: '/home/engonenet/ed/onenet_for_jenkins/frontend-author-container/sofia-frontend-author/dist'
                sshPut remote: remote, from: './dist', into: '/home/engonenet/ed/onenet_for_jenkins/frontend-author-container/sofia-frontend-author/'
                sshCommand remote: remote, command: "cd /home/engonenet/ed/onenet_for_jenkins/frontend-author-container;docker-compose up --build -d"
            }
        }

        emailext body: '$PROJECT_NAME - Build # $BUILD_NUMBER - SUCESSS: <br> Check console output at $BUILD_URL to view the results.',
                 subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - SUCESSS!',
                 to: '$DEFAULT_RECIPIENTS'

    }catch(e){

        emailext body: '$PROJECT_NAME - Build # $BUILD_NUMBER - ERROR: <br> Check console output at $BUILD_URL to view the results.',
                 subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - ERROR!',
                 to: '$DEFAULT_RECIPIENTS'
    }

}
