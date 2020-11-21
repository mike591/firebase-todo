import React from "react";
import { ProvideAuth } from "hooks/use-auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "utils/routes";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ProvideAuth>
          <Router>
            <Switch>
              {publicRoutes.map((route) => (
                <Route
                  exact={route.path === "/"}
                  path={route.path}
                  key={route.path}
                  component={route.component}
                />
              ))}
              {privateRoutes.map((route) => (
                <Route
                  exact={route.path === "/"}
                  path={route.path}
                  key={route.path}
                  component={route.component}
                />
              ))}
            </Switch>
          </Router>
        </ProvideAuth>
      </div>
    );
  }
}

export default App;
