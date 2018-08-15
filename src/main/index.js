
const {app, ipcMain,session} = require('electron')
const pathConfig = require('../../build/pathConfig')
const AppConfig = require('./config')
const MainWindow = require('./window/main')

const debug = /--debug/.test(process.argv[2])

class Main {
  constructor(){
    this.mainWindow = null;
    this.contentUrl = process.env.NODE_ENV === 'production' ? `file://${pathConfig.clientOutput}/index.html` : `http://127.0.0.1:6900`;
    this.init();
  }
  init(){
    if(this.checkInstance()) {
      console.log('init')
        this.initApp();
        this.initIPC();
      } else {
        app.quit();
      }
  }
  initApp(){
    app.on('ready', () => {
      session.defaultSession.cookies.get({},(err,cookies)=>{
        console.log(err,cookies)
      })
              this.requestInterfere()
        this.createWindow()
    })
    app.on('activate', () => {
        console.log('app active')
        if (this.mainWindow === null) {
            this.createWindow()
        }else{
            this.mainWindow.show()
        }
    })
  }
  setCookie(url,str_cookie){
  let arr = str_cookie.split(/;\s*/);
    let obj = {url}
    arr.forEach((item,index)=>{
      let kv = item.split('=');
      kv[0] = String(kv[0]).toLocaleLowerCase()
      if(index === 0){
        obj.name = kv[0];
        obj.value = kv[1];
      }else{
        obj[kv[0]] = kv[1] || true;
      }
    })
    if(obj.expires){
      obj.expirationDate = new Date(obj.expires).getTime()/1000;
      delete obj.expires
    }
    // console.log(obj)
    session.defaultSession.cookies.set(obj, (error) => {
      if (error) {
        console.error(error)
      }
    })
  }
  requestInterfere(){
    const filter = {
      urls: ['http://*.7km.top/*', 'http://114.115.136.106/*','http://127.0.0.1:6800/*']
    }
    //https://electronjs.org/docs/api/web-request#webrequestonheadersreceivedfilter-listener
    // session.defaultSession.webRequest.onBeforeSendHeaders(filter,(details,callback)=>{
    //   // console.log('onBeforeSendHeaders')
    //   details.requestHeaders['User-Agent'] = 'MyAgent'
    //   // details.requestHeaders['Host'] = 'www.7km.top'
    //   // details.requestHeaders['Origin'] = 'http://www.7km.top'
    //   callback({cancel: false, requestHeaders: details.requestHeaders})
    // })
    session.defaultSession.webRequest.onHeadersReceived(filter,(details,callback)=>{
      console.log('onHeadersReceived')
      details.responseHeaders['Access-Control-Allow-Origin'] = [details.headers.Origin];
      console.log(details.responseHeaders)
      // let set_cookie = details.responseHeaders['set-cookie']
      // if(set_cookie){
      //   let reg = /^https?:\/\/[^/]*/;
        
      //   // console.log(details.responseHeaders['set-cookie'])
      //   // console.log(details.url)
      //   let url = reg.exec(details.url)[0];
      //   this.setCookie(url,set_cookie[0])
      // }
      callback({cancel: false,responseHeaders: details.responseHeaders})
    })
  }
  initIPC(){
    ipcMain.on('load', () => {
      console.log('ipcMain load')
      this.mainWindow.resizeWindow(false)
    });
    ipcMain.on('login', () => {
        console.log('ipcMain login')
        this.mainWindow.resizeWindow(true)
      //   session.defaultSession.cookies.get({url:'http://test.7km.top'}, (error, cookies) => {
      //     if(error){
      //       console.log(error)
      //     }else{
      //       console.log('cookies',cookies)
      //     }
      // })
    });
    ipcMain.on('loginout', () => {
      this.mainWindow.resizeWindow(false)
    });

    ipcMain.on('setitem', () => {
      this.mainWindow.resizeWindow(false)
    });
  }
  createWindow(){
    this.mainWindow = new MainWindow()
  }
  checkInstance() {
    return !app.makeSingleInstance((commandLine, workingDirectory) => {
      console.log(commandLine, workingDirectory)
      // if(this.mainWindow){
      //   this.mainWindow.show();
      // }
    });
  }
}

new Main();