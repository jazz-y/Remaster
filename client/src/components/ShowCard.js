
import React from 'react';
import Card from 'react-bootstrap/Card';

const ShowCard = () => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          blah blah blah 
          {items.map(item => (
          <li key={item.id}>{item.name}</li>
           ))}
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ShowCard;
