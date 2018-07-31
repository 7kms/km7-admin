const path = require('path')

const resolve = (url)=>{
    return path.resolve(__dirname,url)
}
module.exports = {
    appSrc: resolve('../app'),
    publicPath: './',
    clientOutput: resolve('../__build__client__output__'),
    clientEntry: resolve('../app/entry.js'),
    htmlTemplate: resolve('../app/template/index.html'),
    generageStaticPath: (string)=>{
        return `static/${string}`
    }
}