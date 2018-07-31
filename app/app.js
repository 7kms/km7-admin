import React, {PureComponent} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import MainPage from './pages/main'
import LoginPage from './pages/login'

export default class App extends PureComponent{
    render(){
        return(
        <Router>
            <Switch>
                <Route path="/" component={MainPage} exact/>
                <Route path="/login" component={LoginPage} exact/>
                <Redirect to="/"/>
            </Switch>
        </Router>)
    }
}
