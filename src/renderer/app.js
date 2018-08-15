import React, {PureComponent} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import MainPage from './pages/main'
import LoginPage from './pages/login'

export default class App extends PureComponent{
    render(){
        return(
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} exact/>
                <Route path="/" component={MainPage}/>
            </Switch>
        </Router>)
    }
}
