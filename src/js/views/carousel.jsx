import React from 'react';
import { Carousel } from 'react-bootstrap';

export class CarouselView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const calItem = this.props.items.map((item, i) => {
      return <Carousel.Item key={i}>{item}</Carousel.Item>;
    });
    return (
      <Carousel id={this.props.id} defaultActiveIndex={0} className="flexible">
        {calItem}
      </Carousel>
    );
  }
}
