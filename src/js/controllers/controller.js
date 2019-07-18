import $ from 'jquery';

const appid = 'dj00aiZpPThxMjRsdXJ1ZXJscCZzPWNvbnN1bWVyc2VjcmV0Jng9ZDA-';
const baseUrl =
  'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch?appid=' +
  appid;
const RediesCategoryIds = { Tops: 36861, Bottoms: 36913 };
const MensCategoryIds = { Tops: 36504, Bottoms: 36624 };
const imageSize = 300;

const PersonalColorKeywords = [
  'アイボリー キャメル ウォームグレー グリーン ピーチピンク コーラルピンク クリアレッド ブライトネイビー ピーチ',
  'ソフトホワイト ピンクベージュ ローズブラウン ラベンダー ローズピンク プラム バーガンディ スカイブルー',
  'ベージュ テラコッタ ダークブラウン グレージュ アプリコット オレンジ ゴールド カーキ オリーブ レッドパープル',
  'ホワイト ブラック ロイヤルブルー ワインレッド レモンイエロー ベリーレッド パープル アイシー'
];

export class YahooShoppingAPIController {
  constructor() {}

  async fetchRediesItems(personalColorType) {
    const keyword = PersonalColorKeywords[personalColorType.number];

    const tops = await this.fetchRediesTops(keyword);
    const bottoms = await this.fetchRediesBottoms(keyword);

    return tops.concat(bottoms);
  }

  async fetchMensItems(personalColorType) {
    const keyword = PersonalColorKeywords[personalColorType.number];

    const tops = await this.fetchMensTops(keyword);
    const bottoms = await this.fetchMensBottoms(keyword);

    return tops.concat(bottoms);
  }

  fetchMensBottoms(keyword) {
    return this.fetch(MensCategoryIds.Bottoms, keyword);
  }

  fetchMensTops(keyword) {
    return this.fetch(MensCategoryIds.Tops, keyword);
  }

  fetchRediesBottoms(keyword) {
    return this.fetch(RediesCategoryIds.Bottoms, keyword);
  }

  fetchRediesTops(keyword) {
    return this.fetch(RediesCategoryIds.Tops, keyword);
  }

  fetch(categoryId, keyword) {
    const url =
      baseUrl +
      '&category_id=' +
      categoryId +
      '&image_size=' +
      imageSize +
      '&type=any' +
      '&query=' +
      keyword;

    const defer = $.Deferred();

    $.ajax({
      type: 'get',
      url: url,
      dataType: 'jsonp',
      success: defer.resolve,
      error: defer.reject
    });

    return defer
      .promise()
      .then(data => {
        return this.objectToArray(data.ResultSet[0].Result);
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  }

  objectToArray(obj) {
    return Object.keys(obj)
      .map(key => {
        return obj[key];
      })
      .filter(obj => obj.Name); // Nameプロパティがあるもののみ
  }
}
