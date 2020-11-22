import React from "react";
import { ProvideAuth } from "hooks/use-auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "utils/routes";
import PageNotFoundPage from "components/PageNotFoundPage";
import Header from "components/Header";
import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <ProvideAuth>
            <Header />
            <div className="page-wrapper">
              <Switch>
                {publicRoutes.map((route) => (
                  <PublicRoute
                    exact={route.path === "/"}
                    path={route.path}
                    key={route.path}
                    component={route.component}
                  />
                ))}
                {privateRoutes.map((route) => (
                  <PrivateRoute
                    exact={route.path === "/"}
                    path={route.path}
                    key={route.path}
                    component={route.component}
                  />
                ))}
                <Route path="*" exact={true} component={PageNotFoundPage} />
              </Switch>
            </div>
          </ProvideAuth>
        </Router>
      </div>
    );
  }
}

export default App;
