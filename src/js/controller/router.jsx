import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecommendationView from '../view/recommendation.jsx';
import DiagnosisView from '../view/diagnosis.jsx';
import { LoginAuthentication } from '../connection/login.js';
import PersonalColorDiagnosisView from '../view/personal-color-diagnosis.jsx';
import { UsersModel } from '../model/users.js';

export class Router extends React.Component {
  constructor(props) {
    super(props);

    this.usersModel = new UsersModel();
    this.login = new LoginAuthentication();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={'/'}
            render={props => (
              <RecommendationView
                auth={this.login}
                onLogined={async id => {
                  const data = await this.usersModel.fetch(id);
                  if (data) {
                    console.log(data.type);
                  } else {
                    props.history.push('/diagnosis');
                  }
                }}
              />
            )}
          />
          <Route path={'/diagnosis'} component={DiagnosisView} />
          <Route
            path={'/personal-color'}
            render={props => (
              <PersonalColorDiagnosisView
                onDiagnosisFinished={() => {
                  props.history.push('/personal-color-result');
                }}
              />
            )}
          />
          <Route
            path={'/personal-color/:id'}
            component={PersonalColorDiagnosisView}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
