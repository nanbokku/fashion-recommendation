import { Reactor } from '../utils/reactor.js';

export class RecommendationsModel {
  constructor() {
    this.events = new Reactor();

    this.all = [];
    this.tops = [];
    this.outors = [];
    this.bottoms = [];
  }

  add(item) {
    this.all.push(item);

    const category = item.category;
    eval('this.' + category).push(item); // カテゴリーごとの配列に格納

    this.events.dispatchEvent('added', item);
  }

  get(id) {
    const index = this.findIndex(this.all, id);
    return this.all[index];
  }

  update(item) {
    const allIndex = this.findIndex(this.all, item.id);
    this.all[allIndex] = item;

    const category = eval('this.' + item.category);
    const catIndex = this.findIndex(category, item.id);
    category[catIndex] = item;

    this.events.dispatchEvent('updated', item);
  }

  delete(id) {
    const allIndex = this.findIndex(this.all, id);
    const category = eval('this.' + this.all[allIndex].category);
    const catIndex = this.findIndex(category, id);

    this.all.splice(allIndex, 1);
    category.splice(catIndex, 1);

    this.events.dispatchEvent('deleted', id);
  }

  findIndex(items, id) {
    return items.findIndex(item => {
      return item.id === id;
    });
  }
}
