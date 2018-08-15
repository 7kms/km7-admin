const config = require('../config')

const CryptoJS = require("crypto-js");
const nconf = require('nconf')

const {AES,enc} = CryptoJS


const getUserHome = ()=> {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}


nconf.argv()
.env()
.file({ file: `${getUserHome()}/.7km.json` });

  //
  // Set a few variables on `nconf`.
//   //
//   nconf.set('database:host', '127.0.0.1');
//   nconf.set('database:port', 5984);
 
//   //
//   // Get the entire database object from nconf. This will output
//   // { host: '127.0.0.1', port: 5984 }
//   //
//   console.log('foo: ' + nconf.get('foo'));
//   console.log('NODE_ENV: ' + nconf.get('NODE_ENV'));
//   console.log('database: ' + nconf.get('database'));

class Storage {
    constructor(){
        this.key = config.STORAGE_KEY;
    }
    getItem(key){
        nconf.load(); 
        return nconf.get(key);
    }
    setItem(key, str){
        nconf.set(key, str);
        nconf.save();
    }
    setEncryptoJSON(key,obj){
        let str = AES.encrypt(JSON.stringify(obj), this.key).toString();
        this.setItem(key,str)
    }
    getEncryptoJSON(key){
        let data = this.getItem(key)
        if(data){
            let str = AES.decrypt(data, this.key).toString(enc.Utf8);
            return JSON.parse(str)
        }else{
            return {}
        }
    }
}

window.$storage = new Storage()
