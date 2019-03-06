import React, { Component } from 'react';
import FormatAuthorsList from '../utils/FormatAuthorList';
import { Link } from 'react-router-dom';
import DBAPI from '../utils/DBAPI';
import GoogleAPI from '../utils/GoogleAPI';

class ViewBook extends Component {
    state = {
        title: '',
        authors: [],
        description: '',
        imageSrc: '',
        link: '',
        bookSaved: false
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
            });
    }

    componentDidMount = async props => {
        const { id } = this.props.match.params;
        console.log('ID is:', id);
        const bookData = await GoogleAPI.findById(id);
        const { title, authors, description, previewLink } = bookData.volumeInfo;
        const imageSrc = bookData.volumeInfo.imageLinks.small;
        this.setState({
            title, authors, description, imageSrc, link: previewLink
        });
        console.log('bookData:', bookData);
    }

    renderBookDetails() {
        return (
            <div className='container'>
                <div>Title: {this.state.title}</div>
                <div>{this.state.authors.length > 1 ? 'Authors' : 'Author'}: {FormatAuthorsList(this.state.authors)}</div>
                <img src={this.state.imageSrc} alt='Book Cover' />
                <div><a href={this.state.link}>View in Google Play Store</a></div>
                <div dangerouslySetInnerHTML={{ __html: this.state.description }} />
                {this.state.bookSaved ? <div>Book added to your list.</div> : <button onClick={() => this.saveBook()}>Save Book</button>}
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