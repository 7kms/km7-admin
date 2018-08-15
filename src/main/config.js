
const pathConfig = require('../../build/pathConfig')
module.exports = {
    STORAGE_KEY: 'km7_preference',
    CONTENT_URL : process.env.NODE_ENV === 'production' ? `file://${pathConfig.clientOutput}/index.html` : `http://127.0.0.1:6900`,
    WINDOW_SIZE: {
        width: 1080,
        minWidth: 680,
        height: 840,
    },
    WINDOW_SIZE_LOGIN: {
        width: 375,
        height: 667
    }
};
