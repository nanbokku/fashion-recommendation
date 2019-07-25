import { Reactor } from '../utils/reactor.js';
import Backbone from 'backbone';

//TODO: backbone.collection継承に変更する
export class RecommendationsModel {
  constructor() {
    this.events = new Reactor();

    this.type = null;
    this.women = [];
    this.men = [];
  }

  get personalColorType() {
    return this.type;
  }

  setPersonalColorType(type) {
    this.type = type;
  }

  add(item) {
    const category = item.category;
    eval('this.' + category).push(item); // カテゴリーごとの配列に格納

    this.events.dispatchEvent('added', item);
  }

  push(items, categoryName) {
    const data = items.map(item => {
      return {
        name: item.Name,
        img: item.ExImage.Url,
        url: item.Url,
        description: item.Description.substr(0, 100) + '...' // 100文字以下とする
      };
    });
    if (categoryName === 'women') {
      this.women = this.women.concat(data);
    } else {
      this.men = this.men.concat(data);
    }

    this.events.dispatchEvent('pushed', data);
  }

  getAll(categoryName) {
    if (categoryName === 'women') {
      return this.women;
    } else if (categoryName === 'men') {
      return this.men;
    } else return null;
  }

  get(id) {
    let index = this.findIndex(this.women, id);
    if (index) return this.women[index];

    index = this.findIndex(this.men, id);
    if (index) return this.men[index];

    return null;
  }

  update(item) {
    if (item.category === 'women') {
      const index = this.findIndex(this.women, item.id);
      this.women[index] = item;
    } else if (item.category === 'men') {
      const index = this.findIndex(this.men, item.id);
      this.men[index] = item;
    } else {
      return;
    }

    this.events.dispatchEvent('updated', item);
  }

  deleteAll() {
    this.women = [];
    this.men = [];
  }

  delete(id) {
    let index = this.findIndex(this.women, id);
    if (index) this.women[index].splice(index, 1);

    index = this.findIndex(this.men, id);
    if (index) this.men[index].splice(index, 1);

    if (!index) return;

    this.events.dispatchEvent('deleted', id);
  }

  findIndex(items, id) {
    return items.findIndex(item => {
      return item.id === id;
    });
  }
}
