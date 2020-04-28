import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import { CardView } from './card';
import { CarouselView } from './carousel';

export class TabView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      women: [],
      men: []
    };

    this._isMounted = false;

    this.props.model.on('pushed', () => {
      if (!this._isMounted) return;

      this.setItemData();
    });
  }

  static get propTypes() {
    return {
      model: PropTypes.object
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    this.setItemData();
  }

  render() {
    const women = this.createTabContents(this.state.women);
    const men = this.createTabContents(this.state.men);

    return (
      <div className="p-3">
        <Tabs fill defaultActiveKey={0}>
          <Tab eventKey={0} title="Women">
            <CarouselView id={'women-carousel'} items={women} />
          </Tab>
          <Tab eventKey={1} title="Men">
            <CarouselView id={'men-carousel'} items={men} />
          </Tab>
        </Tabs>
      </div>
    );
  }

  setItemData() {
    const women = this.props.model.getAll('women');
    const men = this.props.model.getAll('men');
    this.setState({ women, men });
  }

  createTabContents(data) {
    return data.map((item, i) => {
      return (
        <a href={item.url} key={i}>
          <CardView
            title={item.name}
            text={item.description}
            img={item.img}
            link={item.url}
          />
        </a>
      );
    });
  }
}
