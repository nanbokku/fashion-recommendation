import React from 'react';
import { TabView } from './tab';

export class RecommendationView extends React.Component {
  constructor(props) {
    super(props);

    this.personalColorType = this.props.model.personalColorType;
  }

  render() {
    return (
      <div>
        <center>
          {'パーソナルカラーが' +
            this.personalColorType.string +
            'のあなたへのおすすめアイテムはこちら'}
        </center>
        <TabView model={this.props.model} />
      </div>
    );
  }
}
