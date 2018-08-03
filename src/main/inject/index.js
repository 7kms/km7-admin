const { ipcRenderer } = require('electron') 


class IPCManager {

    constructor(){
        this.init()
    }
    init(){
        // ipcRenderer.on('logined',true)
        window.onload = this.pageloaded;
        window.IPCManager = this;
    }
    pageloaded(){
        ipcRenderer.send('load',true)   
    }
    login(){
        ipcRenderer.send('login',true)
    }

    loginout(){
        ipcRenderer.send('loginout',true)
    }
}

module.export = new IPCManager()
