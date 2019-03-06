import React, { Component } from 'react';
import DeleteBtn from '../components/DeleteBtn';
import API from '../utils/DBAPI';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Redirect } from 'react-router-dom'

class Books extends Component {
  state = {
    books: [],
    redirect: false
  };

  componentDidMount() {
    // load all saved books:
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        if (res.data.length < 1) {
          // if there's no data, redirect to search page:
          this.setState({ redirect: true });
          return;
        } else {
          console.log('Loaded books data:', res.data);
          this.setState({ books: res.data });
        }
      }).catch(err => console.log(err));
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        {/* If no books in db, redirect to book search: */}
        {this.state.redirect ? <Redirect to='/search' /> : ''}
        <Row>
          <Col size='sm-12'>
            <h1 className='text-center m-5'>My Saved Books</h1>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={'/books/' + book._id}>
                      <strong>
                        {book.title} by {book.authors[0]}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
        <div className='text-center my-3'>
          <Link to={'/search/'}>Search for Books</Link>
        </div>
      </Container>
    );
  }
}

export default Books;
