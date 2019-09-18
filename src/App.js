import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import {createBrowserHistory} from 'history'
import routes from './routes';
export const history = createBrowserHistory()

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    {this.showContentMenus(routes)}
                </div>
            </Router>

        );
    }

    showContentMenus = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                );
            });
        }
        return <Switch>{result}</Switch>;
    }

}

export default App;
