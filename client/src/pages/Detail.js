import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/DBAPI';
import FormatAuthorList from '../utils/FormatAuthorList';

// todo: am I using this? potentially delete

class Detail extends Component {
  state = {
    book: {
      title: '',
      authors: []
    },
    bookNotFound: false
  };

  componentDidMount = async () => {
    let book = await API.getBook(this.props.match.params.id);
    // console.log('book:', book.data);
    if (!book) {
      this.setState({ bookNotFound: true });
    } else {
      this.setState({ book: book.data });
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size='md-12'>
            <Jumbotron>
              <h1>
                {/* {this.state.bookNotFound ? '' : this.state.book.title} */}
                {/* {this.state.book.title} by {FormatAuthorList(this.state.book.authors)} */}
                {FormatAuthorList(this.state.book.authors)}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size='md-10 md-offset-1'>
            <article>
              <h1>Synopsis</h1>
              {/* <img src={this.state.book.imageSrc} alt='Book Cover' />
              <div dangerouslySetInnerHTML={{ __html: this.state.book.description }} />
              <div><a href={this.state.book.link}>View in Google Play Store</a></div> */}
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
