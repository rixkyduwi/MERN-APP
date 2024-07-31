import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" render={() => <h1>Hello World</h1>}  />
            </Switch>
        </Router>
    );
}

export default App;
