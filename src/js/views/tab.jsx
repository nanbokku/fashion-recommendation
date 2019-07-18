import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { CardView } from './card';
import { CarouselView } from './carousel';

export class TabView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redies: [],
      mens: []
    };

    this._isMounted = false;

    this.props.model.events.addEventListener('pushed', () => {
      if (!this._isMounted) return;

      const redies = this.props.model.getAll('redies');
      const mens = this.props.model.getAll('mens');
      this.setState({ redies, mens });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    const redies = this.props.model.getAll('redies');
    const mens = this.props.model.getAll('mens');
    this.setState({ redies, mens });
  }

  render() {
    const redies = this.createTabContents(this.state.redies);
    const mens = this.createTabContents(this.state.mens);

    return (
      <div className="p-3">
        <Tabs fill defaultActiveKey={0}>
          <Tab eventKey={0} title="Redies">
            <CarouselView id={'redies-carousel'} items={redies} />
          </Tab>
          <Tab eventKey={1} title="Mens">
            <CarouselView id={'mens-carousel'} items={mens} />
          </Tab>
        </Tabs>
      </div>
    );
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
