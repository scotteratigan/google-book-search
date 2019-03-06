import React, { Component } from 'react';
import BookList from '../components/BookList';
import axios from 'axios';

class Search extends Component {
    state = {
        searchTerm: '',
        searchResults: [],
        numResults: 0
    }

    searchForBooks = () => {
        if (this.state.searchTerm === '') {
            alert('Please enter search term.');
            return;
        }
        try {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}`).then(res => {
            const {items, totalItems} = res.data;
            const books = items.map( book => {
                const {title, authors} = book.volumeInfo;
                const {id} = book;
                return {title, authors, id}
            });
            this.setState({searchResults: books, numResults: totalItems})
            // console.log(res);
            });
        }
        catch (err) {
            console.err(err);
        }
        
    }

    handleInput = event => {
        this.setState({searchTerm: event.target.value});
    }

    handleEnterKey = event => {
        event.preventDefault();
        console.log(event.target);
        if (event.key === 'Enter') {
            this.searchForBooks();
            return;
        }
        this.setState({searchTerm: this.state.searchTerm + event.key});

    }

    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>
                    Search Page
                </h1>
                <form>
                    <input onChange={this.handleInput} autoFocus type='text' className='form-control' value={this.state.searchTerm} onKeyPress={e => this.handleEnterKey(e)}/>
                    <button onClick={this.searchForBooks} className='btn btn-outline-secondary' type='button'>Search</button>
                </form>
                
                <h2>{this.state.searchResults.length > 0 ? 'Books Found' : ''}</h2>
                <BookList books={this.state.searchResults}/>
            </div>
        );
    }
}

export default Search;