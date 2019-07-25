import $ from 'jquery';

const appid = 'dj00aiZpPThxMjRsdXJ1ZXJscCZzPWNvbnN1bWVyc2VjcmV0Jng9ZDA-';
const baseUrl =
  'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch?appid=' +
  appid;
const WomenCategoryIds = { Tops: 36861, Bottoms: 36913 };
const MenCategoryIds = { Tops: 36504, Bottoms: 36624 };
const imageSize = 300;

const PersonalColorKeywords = [
  'アイボリー キャメル ウォームグレー グリーン ピーチピンク コーラルピンク クリアレッド ブライトネイビー ピーチ',
  'ソフトホワイト ピンクベージュ ローズブラウン ラベンダー ローズピンク プラム バーガンディ スカイブルー',
  'ベージュ テラコッタ ダークブラウン グレージュ アプリコット オレンジ ゴールド カーキ オリーブ レッドパープル',
  'ホワイト ブラック ロイヤルブルー ワインレッド レモンイエロー ベリーレッド パープル アイシー'
];

export class YahooShoppingAPIController {
  constructor() {}

  async fetchWomenItems(personalColorType) {
    const keyword = PersonalColorKeywords[personalColorType.number];

    const tops = await this.fetchWomenTops(keyword);
    const bottoms = await this.fetchWomenBottoms(keyword);

    return tops.concat(bottoms);
  }

  async fetchMenItems(personalColorType) {
    const keyword = PersonalColorKeywords[personalColorType.number];

    const tops = await this.fetchMenTops(keyword);
    const bottoms = await this.fetchMenBottoms(keyword);

    return tops.concat(bottoms);
  }

  fetchMenBottoms(keyword) {
    return this.fetch(MenCategoryIds.Bottoms, keyword);
  }

  fetchMenTops(keyword) {
    return this.fetch(MenCategoryIds.Tops, keyword);
  }

  fetchWomenBottoms(keyword) {
    return this.fetch(WomenCategoryIds.Bottoms, keyword);
  }

  fetchWomenTops(keyword) {
    return this.fetch(WomenCategoryIds.Tops, keyword);
  }

  fetch(categoryId, keyword) {
    const url =
      baseUrl +
      '&category_id=' +
      categoryId +
      '&image_size=' +
      imageSize +
      '&type=any' +
      '&condition=new' +
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
