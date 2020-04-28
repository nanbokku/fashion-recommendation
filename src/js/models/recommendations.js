import Backbone from 'backbone';

export class RecommendationsModel extends Backbone.Model {
  constructor(props) {
    super(props);

    this.type = null;
    this.women = [];
    this.men = [];
  }

  get personalColorType() {
    return this.type;
  }

  set personalColorType(type) {
    this.type = type;
  }

  add(item) {
    const category = item.category;
    eval('this.' + category).push(item); // カテゴリーごとの配列に格納

    this.trigger('added', item);
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

    this.trigger('pushed', data);
  }

  getAll(categoryName) {
    switch (categoryName) {
      case 'women':
        return this.women;
      case 'men':
        return this.men;
      default:
        return null;
    }
  }

  get(id) {
    let index = this.findIndex(this.women, id);
    if (index) return this.women[index];

    index = this.findIndex(this.men, id);
    if (index) return this.men[index];

    return null;
  }

  update(item) {
    let index;
    switch (item.category) {
      case 'women':
        index = this.findIndex(this.women, item.id);
        this.women[index] = item;
        break;
      case 'men':
        index = this.findIndex(this.men, item.id);
        this.men[index] = item;
        break;
      default:
        return;
    }

    this.trigger('updated', item);
  }

  deleteAll() {
    this.women = [];
    this.men = [];
  }

  delete(id) {
    // womenを探索
    let index = this.findIndex(this.women, id);
    if (index >= 0) {
      this.women[index].splice(index, 1);
      this.trigger('deleted', id);
      return;
    }

    // menを探索
    index = this.findIndex(this.men, id);
    if (index >= 0) {
      this.men[index].splice(index, 1);
      this.trigger('deleted', id);
      return;
    }
  }

  findIndex(items, id) {
    return items.findIndex(item => {
      return item.id === id;
    });
  }
}
