const path = require('path')

const resolve = (url)=>{
    return path.resolve(__dirname,url)
}
const appSrc = resolve('../src/renderer');
module.exports = {
    appSrc,
    publicPath: './',
    clientOutput: resolve('../__build__client__output__'),
    clientEntry: `${appSrc}/entry.js`,
    htmlTemplate: `${appSrc}/template/index.html`,
    generageStaticPath: (string)=>{
        return `static/${string}`
    }
}