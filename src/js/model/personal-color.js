import { UsersModel } from './users.js';

class PersonalColorModel {
  constructor() {
    this.model = new UsersModel();
    this.questions = questions;
  }

  findQuestion(id) {
    return questions.find(question => {
      return question.id === id;
    });
  }

  registerPersonalColorType(answers) {
    const type = this.judgePersonalColorType(answers);
  }

  judgePersonalColorType(answers) {
    const skinJudgeAry = answers.slice(0, answers.length);
    const eyeJudge = answers.slice(-1)[0];
    const yellowCount = skinJudgeAry.filter(answer => answer === 0).length; // イエローベースの項目数

    if (yellowCount > answers.length - 1) {
      // イエローベースのとき
      if (eyeJudge === 0) {
        // springタイプ
        return 'spring';
      } else {
        // autumnタイプ
        return 'autumn';
      }
    } else {
      if (eyeJudge === 0) {
        // summerタイプ
        return 'summer';
      } else {
        // winterタイプ
        return 'winter';
      }
    }
  }
}

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
