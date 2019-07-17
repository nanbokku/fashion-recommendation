import React from 'react';
import { Card } from 'react-bootstrap';

export class CardView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href={this.props.link}>
        <Card>
          <Card.Img variant="top" src={this.props.img} />
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>{this.props.text}</Card.Text>
          </Card.Body>
        </Card>
      </a>
    );
  }
}
