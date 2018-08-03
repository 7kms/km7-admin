import { ipcRenderer } from 'electron'


class IPCManager {

    constructor(){
        this.init()
    }
    init(){
        // ipcRenderer.on('logined',true)
        window.onload = this.pageloaded;
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


export default new IPCManager()