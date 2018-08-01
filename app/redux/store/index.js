import { createStore, applyMiddleware, compose} from 'redux'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'


import rootSaga from '../sagas'


const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(sagaMiddleware))
  )
  sagaMiddleware.run(rootSaga)
  return store
} 



export default configureStore
