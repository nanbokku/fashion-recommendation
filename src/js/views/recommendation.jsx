import React from 'react';
import { Button } from 'react-bootstrap';
import { TabView } from './tab';
import { CardView } from './card';

export class RecommendationView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const type = this.props.model.personalColorType.string.toUpperCase();
    return (
      <div>
        <CardView
          title={'パーソナルカラー：' + type + 'タイプ'}
          text={
            'パーソナルカラーが' + type + 'のあなたへのおすすめアイテムはこちら'
          }
          child={
            <Button
              size="sm"
              onClick={event => {
                this.props.onPersonalDiagnosisBtnClicked();
              }}
            >
              {'パーソナルカラーの再診断はこちら'}
            </Button>
          }
        />
        <TabView model={this.props.model} />
      </div>
    );
  }
}
