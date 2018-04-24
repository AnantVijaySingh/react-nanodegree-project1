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

    updateState = (booksData) => {
        this.setState(() => ({reading: booksData.filter(book => book.shelf === "currentlyReading")}));
        this.setState(() => ({toRead: booksData.filter(book => book.shelf === "wantToRead")}));
        this.setState(() => ({read: booksData.filter(book => book.shelf === "read")}));
    };

    updateCategory = (category,id) => {
        // get book id and new category and pass it to the update method of the API
        const book = {id:id};
        BooksAPI.update(book,category)
            .then((response) => (console.log(response)));

        // call the getAll method to update the bookshelves
        // TODO: Evaluate using splice and push to update the respective arrays to reduce API calls and number of components that are rendered
        BooksAPI.getAll()
            .then((books) => {
                this.updateState(books)
            });
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
                    <BookShelfSection title="Currently Reading" books={this.state.reading} bookShelf={"currentlyReading"} updateCategory = {this.updateCategory} />
                    <BookShelfSection title="Want To Read" books={this.state.toRead} bookShelf={"wantToRead"} updateCategory = {this.updateCategory} />
                    <BookShelfSection title="Read" books={this.state.read} bookShelf={"noShelf"} updateCategory = {this.updateCategory} />
                </div>
            </div>
        )
    }
}

export default BookShelf;