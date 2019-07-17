import { Reactor } from '../utils/reactor.js';
import Backbone from 'backbone';

//TODO: backbone.collection継承に変更する
export class RecommendationsModel {
  constructor() {
    this.events = new Reactor();

    this.type = null;
    this.redies = [];
    this.mens = [];
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
    if (categoryName === 'redies') {
      this.redies = this.redies.concat(data);
    } else {
      this.mens = this.mens.concat(data);
    }

    this.events.dispatchEvent('pushed', data);
  }

  getAll(categoryName) {
    if (categoryName === 'redies') {
      return this.redies;
    } else if (categoryName === 'mens') {
      return this.mens;
    } else return null;
  }

  get(id) {
    let index = this.findIndex(this.redies, id);
    if (index) return this.redies[index];

    index = this.findIndex(this.mens, id);
    if (index) return this.mens[index];

    return null;
  }

  update(item) {
    if (item.category === 'redies') {
      const index = this.findIndex(this.redies, item.id);
      this.redies[index] = item;
    } else if (item.category === 'mens') {
      const index = this.findIndex(this.mens, item.id);
      this.mens[index] = item;
    } else {
      return;
    }

    this.events.dispatchEvent('updated', item);
  }

  delete(id) {
    let index = this.findIndex(this.redies, id);
    if (index) this.redies[index].splice(index, 1);

    index = this.findIndex(this.mens, id);
    if (index) this.mens[index].splice(index, 1);

    if (!index) return;

    this.events.dispatchEvent('deleted', id);
  }

  findIndex(items, id) {
    return items.findIndex(item => {
      return item.id === id;
    });
  }
}
