import React from 'react';
import { Button } from 'react-bootstrap';
import { CardView } from './card';

export class PersonalColorView extends React.Component {
  constructor(props) {
    super(props);

    const hash = location.hash;
    this.type = hash.substr(hash.indexOf('/') + 1); // 最後の'/'以降の文字列を取得
  }

  render() {
    const type = this.type.charAt(0).toUpperCase() + this.type.slice(1); // 1文字目だけ大文字に変換する
    const colors = eval('Colors.' + type).map((c, i) => {
      return <ColorBox key={i} color={c} />;
    });

    const children = (
      <div style={{ textAlign: 'center' }}>
        {colors}
        <Button
          className="m-4"
          variant="primary"
          size="sm"
          onClick={event => {
            this.props.onTopPageBtnClicked();
          }}
        >
          {'トップページに戻る'}
        </Button>
      </div>
    );

    return (
      <div style={{ whilteSpace: 'pre-line' }}>
        <CardView
          title={'Result'}
          text={
            'あなたのパーソナルカラータイプは ' +
            this.type.toUpperCase() +
            ' です．\nあなたに似合う色はこちらです．'
          }
          child={children}
        />
      </div>
    );
  }
}

class ColorBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      width: 50,
      height: 50,
      backgroundColor: this.props.color,
      float: 'left'
    };

    return <div className="color-box" style={style} />;
  }
}

const Colors = {
  Spring: ['#f3ecd8', '#bb8d5f', '#208028', '#ff8c00', '#f88fa7'],
  Summer: ['#fffef9', '#a18594', '#c8ddee', '#cf61a5', '#a998cd'],
  Autumn: ['#ebd9be', '#e3622f', '#ecdf7a', '#808000', '#330066'],
  Winter: ['#ffffff', '#0d214f', '#b11226', '#e6e9f9', '#000000']
};
