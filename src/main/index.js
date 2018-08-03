
const {app, ipcMain, BrowserWindow} = require('electron')
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
  initIPC(){
    ipcMain.on('load', () => {
      console.log('load')
      this.mainWindow.resizeWindow(false)
    });
    ipcMain.on('login', () => {
        this.mainWindow.resizeWindow(true)
    });
    ipcMain.on('loginout', () => {
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