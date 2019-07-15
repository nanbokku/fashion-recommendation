import React from 'react';

export class DiagnosisView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <input
          type="button"
          value="パーソナルカラー"
          onClick={event => {
            this.props.onPersonalColorBtnClicked();
          }}
        />
        <input
          type="button"
          value="骨格診断"
          onClick={event => {
            // 画面遷移
            // this.props.history.push('/skeleton');
          }}
        />
      </span>
    );
  }
}
