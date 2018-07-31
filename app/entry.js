import '~less/base.less'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

// import { Provider } from 'react-redux'
// import configureStore from './redux/store'
import App from './app'

// const store = configureStore()

const Root = ()=>{
    return (
        // <Provider store={store}>
            <App/>
        // </Provider>
    )
}

render(<Root/>, document.getElementById('root'))

// if(process.env.NODE_ENV === 'development'){
//     if(module.hot){
//         module.hot.accept(['./pages/routes'], function() {
//             const newRoutes = require('./pages/routes').default
//             render(<App routes={newRoutes}/>, document.getElementById('root'))
//         })
//     }
// }

