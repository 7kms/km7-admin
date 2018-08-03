
'use strict';
const path = require('path')
const AppConfig = require('../config');
const { BrowserWindow } = require('electron');
class MainWindow {
  constructor() {
    this.isShown = false;
    this.createWindow();
    this.initWindowWebContent();
  }

  resizeWindow(isLogged) {
    console.log('resizeWindow')
    const size = isLogged ? AppConfig.WINDOW_SIZE : AppConfig.WINDOW_SIZE_LOGIN;
    // this._window.setResizable(isLogged);
    this._window.setSize(size.width, size.height);
    this.show();
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
    //   icon: path.join(__dirname, '../../../assets/icon.png'),
      
      titleBarStyle: 'hidden-inset',
      webPreferences: {
        // javascript: true,
        // plugins: true,
        // nodeIntegration: false,
        // preload: path.join(__dirname, '../inject'),
      },
    });
  }

  loadURL(url=AppConfig.CONTENT_URL) {
    console.log(url)
    this._window.loadURL(url);
  }

  show() {
    console.log('main window show')
    this._window.show();
    this._window.focus();
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

    this._window.webContents.on('will-navigate', (ev, url) => {
        console.log('main-window will-navigate')
    });

    this._window.webContents.on('dom-ready', () => {
        console.log('main-window dom-ready')
    });

    this._window.webContents.on('new-window', (event, url) => {
        console.log('main-window new-window')
    });

    this._window.webContents.on('will-navigate', (event, url) => {
      console.log('main-window will-change')
    });
  }
}

module.exports = MainWindow;
