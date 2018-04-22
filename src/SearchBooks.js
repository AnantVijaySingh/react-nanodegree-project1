import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
    state = {
        query:'',
        searchedBooks:[]
    };

    updateResults = (query) => {
        console.log('---New Query String---',query);
        this.setState(
            {query: query.trim()},
            () => {
                console.log('Callback function executed with query string as:',this.state.query);
                this.processResults()
            }
        );
    };

    processResults = () => {
            BooksAPI.search(this.state.query)
                .then((booksData) => {
                    this.setState(() => ({
                        searchedBooks: booksData
                    }))
                });
            console.log('---API Query String---',this.state.query,' ','---API Result---', this.state.searchedBooks);
    };

    updateCategory = (category,id) => {
        // get book id and new category and pass it to the update method of the API
        const book = {id:id};
        BooksAPI.update(book,category)
            .then((response) => (console.log(response)));

        // call the getAll method to update the bookshelves
        // TESTING IF THE BOOKS WERE ADDED TO THE CORRECT CATEGORY
        BooksAPI.getAll()
            .then((books) => {
                console.log(books.length)
            });
    };

    // showResults = () => {

        // BooksAPI.search(this.state.query)
        //     .then((booksData) => {
        //         this.setState(() => ({
        //             searchedBooks: booksData
        //         }))
        //     });
        //
        // console.log(this.state.searchedBooks);
    // };

    render() {
        const {searchedBooks} = this.state;
        console.log('searchedBooks',searchedBooks);

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <form>
                            <input type="text"
                                   placeholder="Search by title or author"
                                   value={this.state.query}
                                   onChange={(event) => {this.updateResults(event.target.value)}}
                            />
                        </form>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            typeof searchedBooks !== 'undefined' && (
                                searchedBooks.map((book) => (
                                    <li>
                                        <Book key={book.title} bookData = {book} updateCategory = {this.updateCategory} />
                                    </li>
                                ))
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks;