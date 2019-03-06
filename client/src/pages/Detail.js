import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/DBAPI';
import FormatAuthorList from '../utils/FormatAuthorList';

// todo: am I using this? potentially delete

class Detail extends Component {
  state = {
    book: {}
  };

  componentDidMount = async () => {
    let book = await API.getBook(this.props.match.params.id);
    console.log('book:', book.data);
    this.setState({ book: book.data });
  }

  // basically, if I get detail from the API, grab data from params, else make a call to local db
  // or better, copy the scheme of routes?


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size='md-12'>
            <Jumbotron>
              <h1>
                {this.state.book.title} by {FormatAuthorList(this.state.book.authors)}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size='md-10 md-offset-1'>
            <article>
              <h1>Synopsis</h1>
              <img />
              <p>{this.state.book.description}</p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size='md-2'>
            <Link to='/'>← Back to Authors</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
