module.exports.autoreload = {
    active: true,
    usePolling: false,
    dirs: [
        'api/models',
        'api/controllers',
        'api/services',
        'config/locals'
    ],
    //los archivos temporales no provocaran que el servidor se reinicie
    ignored: [
        '**.ts'
    ]
}