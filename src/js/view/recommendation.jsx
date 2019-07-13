import React from 'react';
import { withRouter } from 'react-router';
import $ from 'jquery';
import 'jquery.cookie';

class RecommendationView extends React.Component {
  constructor(props) {
    super(props);

    this.props.auth.addEventListener('logined', id => {
      this.id = id;
      this.props.onLogined(this.id);
    });

    // const diagnosed = $.cookie('diagnosed');
    // if (!diagnosed) {
    //   this.props.onCookieChecked(diagnosed);
    //   return;
    // }
  }

  render() {
    return <div />;
  }
}

export default withRouter(RecommendationView);
