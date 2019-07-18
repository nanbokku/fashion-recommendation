import React from 'react';
import { Button } from 'react-bootstrap';
import { TabView } from './tab';
import { CardView } from './card';

export class RecommendationView extends React.Component {
  constructor(props) {
    super(props);

    this.personalColorType = this.props.model.personalColorType;
  }

  render() {
    return (
      <div>
        <CardView
          title={'パーソナルカラー：SUMMERタイプ'}
          text={
            'パーソナルカラーが' +
            this.personalColorType.string.toUpperCase() +
            'のあなたへのおすすめアイテムはこちら'
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
