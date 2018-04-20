import React, {Component} from 'react';
import BookShelfSection from './BookShelfSection';
import * as BooksAPI from './BooksAPI';

class BookShelf extends Component {

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
            this.updateState(books)
            })
    };

    updateState = function(booksData) {
        console.log(booksData);
        this.setState(() => ({reading: booksData.filter(book => book.shelf === "currentlyReading")}));
        this.setState(() => ({toRead: booksData.filter(book => book.shelf === "wantToRead")}));
        this.setState(() => ({read: booksData.filter(book => book.shelf === "read")}));
    };

    updateCategory = function (category,id) {
        console.log('testing function pipeline for updating book category',category,id)
    };

    state = {
        reading:[],
        toRead:[],
        read:[]
    };

    render() {
        return (
            <div className="list-books-content">
                <div>
                    <BookShelfSection title="Currently Reading" books={this.state.reading} updateCategory = {this.updateCategory} />
                    <BookShelfSection title="Want To Read" books={this.state.toRead} updateCategory = {this.updateCategory} />
                    <BookShelfSection title="Read" books={this.state.read} updateCategory = {this.updateCategory} />
                </div>
            </div>
        )
    }
}

export default BookShelf;