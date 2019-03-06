import React from 'react';
import FormatAuthorsList from '../../utils/FormatAuthorList';
import DeleteBtn from '../../components/DeleteBtn';

const MAX_TITLE_CHARS = 75;

function formatTitle(title) {
    if (title.length < MAX_TITLE_CHARS) {
        return title;
    }
    return title.substring(0, MAX_TITLE_CHARS).trim() + '...';
}

const BookList = props => {
    console.log('BookList props.books:', props.books);
    return (
        <ul className='list-group'>
            {props.books.map(book => { 
                console.log('individual book:', book);
                return (
                    <li className='list-group-item' key={book._id}>
                        <a href={`/view/${book.id}`}>
                            {formatTitle(book.title)} <small className='text-muted'> - {FormatAuthorsList(book.authors)}</small>
                        </a>
                        {console.log(`calling deleteBook with argument ${book._id}`)}
                        <DeleteBtn onClick={() => props.deleteBook(book._id)} />
                    </li>
                
            )})}
        </ul>
    );
};
// 
export default BookList;