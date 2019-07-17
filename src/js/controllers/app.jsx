import React from 'react';
import Backbone from 'backbone';
import { Router } from '../routers/router.js';
import { RecommendationsModel } from '../models/recommendations.js';
import { PersonalColorService } from '../services/personal-color.js';
import { UsersRepository } from '../repository/users.js';
import { LoginAuthentication } from '../connection/login.js';
import { RecommendationView } from '../views/recommendation.jsx';
import { DiagnosisView } from '../views/diagnosis.jsx';
import { PersonalColorDiagnosisView } from '../views/personal-color-diagnosis.jsx';
import { ViewState, PersonalColorType } from '../constants/constants.js';
import { PersonalColorView } from '../views/personal-color.jsx';
import { Controller } from './controller.js';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nowShowing: ViewState.Recommendation
    };

    this.router = new Router();
    this.recommendModel = new RecommendationsModel();
    this.personalColorService = new PersonalColorService(new UsersRepository());
    this.login = new LoginAuthentication();

    this.personalColorService.events.addEventListener('added', async () => {
      const type = await this.personalColorService.fetchPersonalColorType(
        this.id
      );
      this.router.navigate('personal-color/' + type, { trigger: true });
    });

    this.login.events.addEventListener('logined', async id => {
      this.id = id;

      const controller = new Controller();
      // const personalColorType = Object.values(PersonalColorType).find(
      //   val => val.string === 'spring'
      // );
      // console.log(personalColorType);
      const data = await controller.fetchRediesItems(PersonalColorType.Spring);
      console.log(data);

      const type = await this.personalColorService.fetchPersonalColorType(id);
      if (type) {
        this.router.navigate('recommendation', { trigger: true });
      } else {
        // idがデータベースに登録されていなかったとき
        this.router.navigate('diagnosis', { trigger: true });
      }
    });

    this.login.signIn();
  }

  componentDidMount() {
    // setStateによるエラー回避のため，ここでイベントをセットする
    this.router.events.addEventListener('recommendation', () => {
      this.setState({ nowShowing: ViewState.Recommendation });
    });
    this.router.events.addEventListener('diagnosis', () => {
      this.setState({ nowShowing: ViewState.Diagnosis });
    });
    this.router.events.addEventListener('personal-color-diagnosis', () => {
      this.setState({ nowShowing: ViewState.PersonalColorDiagnosis });
    });
    this.router.events.addEventListener('personal-color-result', type => {
      this.setState({ nowShowing: ViewState.PersonalColorResult });
    });
    Backbone.history.start();
  }

  render() {
    let main;
    if (this.state.nowShowing === ViewState.Recommendation) {
      main = <RecommendationView />;
    } else if (this.state.nowShowing === ViewState.Diagnosis) {
      main = (
        <DiagnosisView
          onPersonalColorBtnClicked={event => {
            this.router.navigate('diagnosis/personal-color', { trigger: true });
          }}
        />
      );
    } else if (this.state.nowShowing === ViewState.PersonalColorDiagnosis) {
      main = (
        <PersonalColorDiagnosisView
          onDiagnosisFinished={answers => {
            this.personalColorService.addPersonalColorType(this.id, answers);
          }}
        />
      );
    } else {
      main = <PersonalColorView />;
    }

    return <div>{main}</div>;
  }
}
