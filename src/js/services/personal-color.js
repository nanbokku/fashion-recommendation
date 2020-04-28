import { Reactor } from '../utils/reactor';
import { PersonalColorType } from '../constants/constants';

export class PersonalColorService {
  constructor(repository) {
    this.repository = repository;
    this.events = new Reactor();
  }

  findQuestion(id) {
    return questions.find(question => {
      return question.id === id;
    });
  }

  async fetchPersonalColorType(id) {
    try {
      const data = await this.repository.fetch(id);
      if (!data) return null;

      return data.type;
    } catch (e) {}
  }

  async addPersonalColorType(id, answers) {
    const type = this.judgePersonalColorType(answers);
    try {
      const data = { id, type };
      await this.repository.add(data);
      this.events.dispatchEvent('added', data);
    } catch (e) {}
  }

  judgePersonalColorType(answers) {
    const skinJudgeAry = answers.slice(0, answers.length);
    const isSoftEye = answers.slice(-1)[0] === 0;
    const yellowCount = skinJudgeAry.filter(answer => answer === 0).length; // イエローベースの項目数
    const isYellowBase = yellowCount > (answers.length - 1) / 2;

    if (isYellowBase && isSoftEye) {
      // Springタイプ
      return PersonalColorType.Spring.string;
    } else if (isYellowBase && !isSoftEye) {
      // Autumnタイプ
      return PersonalColorService.Autumn.string;
    } else if (!isYellowBase && isSoftEye) {
      // Summerタイプ
      return PersonalColorType.Summer.string;
    } else {
      // Winterタイプ
      return PersonalColorType.Winter.string;
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
