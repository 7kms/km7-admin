
const path = require('path')
const {app, BrowserWindow} = require('electron')
const pathConfig = require('./build/pathConfig')


const debug = /--debug/.test(process.argv[2])

class Main {
  constructor(){
    this.mainWindow = null;
    this.contentUrl = process.env.NODE_ENV === 'production' ? `file://${pathConfig.clientOutput}/index.html` : `http://127.0.0.1:6900`;
    this.init();
  }
  init(){
    app.on('ready', () => {
      this.createWindow()
    })
  
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    app.on('activate', () => {
      if (this.mainWindow === null) {
        this.createWindow()
      }
    })
  }
  createWindow(){
    const windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840,
      title: app.getName()
    }
    this.mainWindow = new BrowserWindow(windowOptions)
    this.mainWindow.loadURL(this.contentUrl)

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      this.mainWindow.webContents.openDevTools()
      this.mainWindow.maximize()
      require('devtron').install()
    }

    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })
  }
}

new Main();