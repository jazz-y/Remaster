import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './navbar';
import Spinner from 'react-bootstrap/Spinner';
import ReactCardFlip from 'react-card-flip';
import CardDisplay from './stylecard';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

class Study extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
      cardData: [],
      showDeleteModal: false,
    };
  }

  componentDidMount() {
    axios
      .get(`http://ec2-18-216-254-218.us-east-2.compute.amazonaws.com:3001/auth/set`)
      .then(response => {
        this.setState({ cardData: response.data.set });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  };

  handleEdit = () => {
    const navigate = useNavigate();
    navigate('/edit');
  };

  handleDelete = async () => {
    const { navigate } = this.props;
    try {
      await axios.post(
        `http://ec2-18-216-254-218.us-east-2.compute.amazonaws.com:3001/auth/deleteSet`
      );
      console.log('Set deleted successfully');
    } catch (error) {
      console.error('Cannot delete set:', error);
      // Handle error, show an error message, etc.
    }
  };

  render() {
    const { cardData } = this.state;

  return (
      <>
        <NavBar />
        <span style={{ margin: '0 10px' }}> </span>
        <Button variant="warning" onClick={this.handleEdit} >Edit</Button>
        <Button variant="outline-warning" onClick={() => this.handleDelete()} > Delete</Button>
        {cardData ? (
          cardData.map((card, index) => (
            <ReactCardFlip key={index} isFlipped={this.state.isFlipped} flipDirection="vertical" >
              <CardDisplay onClick={this.handleClick} content={<div>{card.term}</div>} ></CardDisplay>
              <CardDisplay onClick={this.handleClick} content={<div>{card.def}</div>} ></CardDisplay>
            </ReactCardFlip>
          ))
        ) : (
          <Spinner animation="border" variant="warning" />
        )}
      </>
    );
  }
}

export default Study;
