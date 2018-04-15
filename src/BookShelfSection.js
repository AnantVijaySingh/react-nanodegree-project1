import React, {Component} from 'react';
import Book from './Book'

class BookShelfSection extends Component {
    render() {
        const {title,books} = this.props;

        return (
            <div className="bookshelf">
               <h1>{title}</h1>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((book) => (
                                <li>
                                    <Book key={book.title} bookData = {book}/>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
            )
    }
}

export default BookShelfSection;