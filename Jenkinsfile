def remote = [:]
remote.name = 'rita'
remote.host = 'cityscape-rita-server.eurodyn.com'
remote.allowAnyHosts = true
node
{
    stage("Clone From GIT")
    {
        git branch: 'master',
            url: 'https://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@github.com/HeliasEurodyn/sofia-frontend.git'
    }
    stage("Build")
    {
    nodejs('NodeJs') {
            sh 'npm install --save-dev @angular-devkit/build-angular --legacy-peer-deps'
            sh 'npm --version'
            sh 'node --version'
            sh 'ng --version'
            sh 'pwd'
            sh 'ls -al'
            sh 'npm update --legacy-peer-deps'
            sh 'ng build --prod'
        }
    }
    stage("Deploy")
        {
            withCredentials([usernamePassword(credentialsId: 'rita', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')])
            {
                remote.user = USERNAME
                remote.password = PASSWORD
                sshCommand remote: remote, command: "cd /root/rita-docker/frontend-container;docker-compose down"
                sshRemove remote: remote, path: '/root/rita-docker/frontend-container/rita-frontend/dist'
                sshPut remote: remote, from: './dist', into: '/root/rita-docker/frontend-container/rita-frontend/'
                sshCommand remote: remote, command: "cd /root/rita-docker/frontend-container;docker-compose up --build -d"
            }
        }
}
