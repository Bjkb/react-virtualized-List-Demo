import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Home from '../pages/Home';

const _Router = () => (
    <Router>
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
    </Router>
)

export default _Router;