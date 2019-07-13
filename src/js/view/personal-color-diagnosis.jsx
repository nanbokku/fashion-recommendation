import React from 'react';
import { withRouter } from 'react-router';

class PersonalColorDiagnosisView extends React.Component {
  constructor(props) {
    super(props);

    this.answers = [];

    this.state = {
      id: -1,
      question: null
    };
  }

  render() {
    if (this.state.question) {
      return this.renderQuestion();
    } else {
      return this.renderStartBtn();
    }
  }

  renderQuestion() {
    const onClicked = event => {
      const id = this.state.id + 1;
      const question = findQuestion(id);
      if (id < questions.length) {
        // 次の問題へ
        this.setState({ id, question });
      } else {
        // 結果の表示
        this.props.onDiagnosisFinished(this.answers);
      }
    };

    return (
      <div>
        {this.state.question.question}
        <input
          type="button"
          value={this.state.question.choices[0]}
          onClick={event => {
            this.answers.push(0);
            onClicked(event);
          }}
        />
        <input
          type="button"
          value={this.state.question.choices[1]}
          onClick={event => {
            this.answers.push(1);
            onClicked(event);
          }}
        />
      </div>
    );
  }

  renderStartBtn() {
    return (
      <div>
        <input
          type="button"
          value="パーソナルカラー診断を始める"
          onClick={event => {
            this.setState({ id: 0, question: findQuestion(0) });
          }}
        />
      </div>
    );
  }
}

export default withRouter(PersonalColorDiagnosisView);

const questions = [
  {
    id: 0,
    question: '腕の血管は何色ですか？',
    choices: ['緑色', '青色']
  },
  {
    id: 1,
    question: '日焼けをするとどうなりますか？',
    choices: ['小麦色になる', 'すぐに赤くなる']
  },
  {
    id: 2,
    question: '持っているアクセサリーの色はどうですか？',
    choices: ['ゴールドが多い', 'シルバーが多い']
  },
  {
    id: 3,
    question: '肌色は何色ですか？',
    choices: ['黄みが強い', 'ピンクみが強い']
  },
  {
    id: 4,
    question: 'どちらの色のチークが似合いますか？',
    choices: ['オレンジ系', 'ピンク系']
  },
  {
    id: 5,
    question: '瞳の色は何色ですか？',
    choices: ['明るい茶色，あるいはソフトな黒', 'こげ茶色，あるいは黒']
  }
];

const findQuestion = id => {
  return questions.find(question => {
    return question.id === id;
  });
};
