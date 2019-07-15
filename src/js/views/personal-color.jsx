import React from 'react';

export class PersonalColorView extends React.Component {
  constructor(props) {
    super(props);

    const hash = location.hash;
    this.type = hash.substr(hash.indexOf('/') + 1); // 最後の'/'以降の文字列を取得
  }

  render() {
    return (
      <div>
        あなたのパーソナルカラータイプは
        {this.type}です．
      </div>
    );
  }
}
