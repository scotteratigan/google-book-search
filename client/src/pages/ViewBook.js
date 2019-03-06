import React, { Component } from 'react';
import axios from 'axios';
import FormatAuthorsList from '../utils/FormatAuthorList';
import { Link } from 'react-router-dom';
import DBAPI from '../utils/DBAPI';

class ViewBook extends Component {
    state = {
        title: '',
        authors: [],
        description: '',
        imageSrc: '',
        link: '',
        bookSaved: false
    }

    componentDidMount = props => {
        console.log('props:', props);
    }

    saveBook = () => {
        // event.preventDefault();
        console.log('Saving book!');
        DBAPI.saveBook({
            title: this.state.title,
            authors: this.state.authors,
            description: this.state.description,
            imageSrc: this.state.imageSrc,
            link: this.state.link,
            amzId: this.state.amzId
        }).then(
            () => {
                this.setState({ bookSaved: true });
                alert('Book Saved!');
            });
    }

    componentDidMount(props) {
        const { id } = this.props.match.params;
        console.log('ID is:', id);
        axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`, {}, res => {
            console.log(res);
            const { title, authors, description, imageLinks, infoLink } = res.volumeInfo;
            this.setState({ title, authors, description, imageSrc: imageLinks.small, link: infoLink, amzId: id });
        });
    }

    renderBookDetails() {
        return (
            <div className='container'>
                <div>Title: {this.state.title}</div>
                <div>{this.state.authors.length > 1 ? 'Authors' : 'Author'}: {FormatAuthorsList(this.state.authors)}</div>
                <img src={this.state.imageSrc} alt='Book Cover' />
                <div><a href={this.state.link}>View in Google Play Store</a></div>
                <div>{this.state.description}</div>
                {this.state.bookSaved ? <button>Remove Book</button> : <button onClick={() => this.saveBook()}>Save Book</button>}
            </div>
        );
    }

    render() {
        return (
            <>
                {this.state.title ? this.renderBookDetails() : <div>Loading book info...</div>}
                <Link to='/'>← Home</Link>
            </>
        )

    }
};

export default ViewBook;