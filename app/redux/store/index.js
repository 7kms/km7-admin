import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'


import { helloSaga } from '../saga'

const sagaMiddleware = createSagaMiddleware()
const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(sagaMiddleware)
)




export default configureStore
