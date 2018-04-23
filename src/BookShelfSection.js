import React, {Component} from 'react';
import Book from './Book'

class BookShelfSection extends Component {
    render() {
        const {title,books,updateCategory,bookShelf} = this.props;

        return (
            <div className="bookshelf">
               <h1>{title}</h1>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((book) => (
                                <li key={book.title}>
                                    <Book bookData = {book} bookShelf = {bookShelf} updateCategory = {updateCategory} />
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