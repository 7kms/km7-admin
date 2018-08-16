
'use strict';
const path = require('path')
const AppConfig = require('../config');
const { BrowserWindow, session,app } = require('electron');
class MainWindow {
  constructor() {
    this.isShown = false;
    this.createWindow();
    this.initWindowWebContent();
  }

  resizeWindow(isLogged) {
    console.log('resizeWindow')
    // const size = isLogged ? AppConfig.WINDOW_SIZE : AppConfig.WINDOW_SIZE_LOGIN;
    // this._window.setResizable(isLogged);
    // this._window.setSize(size.width, size.height);
    // if(isLogged){
    //     this._window.webContents.session.cookies.set({
    //       url:'http://test.7km.top',
    //       name: 'connect.sid',
    //       value: 's%3AFv_7CiYR_cKJro2DR4WZBGZQjOKER8Iq.YVrHWSd0crs3kxoVIEx36BCVFzC0juParGiabzEXoK0'}, (error, cookies) => {
    //       if(error){
    //         console.log(error)
    //       }else{
    //         console.log('cookies',cookies)
    //       }
    //     })
    // }
    // this.show();
    this._window.center();
  }

  createWindow() {
    this._window = new BrowserWindow({
      title: '7km',
      resizable: true,
      center: true,
      show: false,
      frame: true,
      autoHideMenuBar: true,
      backgroundColor: '#00beff',
    //   icon: path.join(__dirname, '../../../assets/icon.png'),
    
      titleBarStyle: 'hidden-inset',
      webPreferences: {
        // partition: 'persist:km7'
        // javascript: true,
        // plugins: true,
        // nodeIntegration: false,
        preload: path.join(__dirname, '../inject/preload'),
      }
    });
  }

  loadURL(url=AppConfig.CONTENT_URL) {
    console.log(url)
    this._window.loadURL(url);
  }

  show() {
    console.log('main window show')
    // console.log()
    // this._window.webContents.session.cookies.get({}, (error, cookies) => {
     
    //   if(error){
    //     console.log(error)
    //   }else{
    //     console.log('cookies',cookies)
    //   }
    // })
    // session.defaultSession.cookies.get({}, function(error, cookies) {
    //   console.log(cookies);
    // });
    this._window.show();
    // this._window.focus();
    this._window.webContents.send('show-window');
    this.isShown = true;
  }

  hide() {
    this._window.hide();
    this._window.webContents.send('hide-window');
    this.isShown = false;
  }

  initWindowWebContent() {
    this.loadURL();
    let webContents =  this._window.webContents;
    webContents.on('will-navigate', (ev, url) => {
        console.log('main-window will-navigate')
    });

    webContents.on('dom-ready', () => {
        console.log('main-window dom-ready')
    });

    webContents.on('new-window', (event, url) => {
        console.log('main-window new-window')
    });

    webContents.on('will-navigate', (event, url) => {
      console.log('main-window will-change')
    });
    
  }
}

module.exports = MainWindow;
