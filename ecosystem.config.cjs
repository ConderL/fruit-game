module.exports = {
    apps: [
        {
            name: 'fruits-game',
            port: '10200',
            exec_mode: 'cluster',
            instances: '3',
            script: './.output/server/index.mjs'
        }
    ]
}