import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
    state = {
        query:'',
        searchedBooks:[],
        books:[],
        resultsFound: true,
    };

    // Create an array to get the state of books that already have a shelf
    // This array will be used to add the correct shelf to the search results
    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                books.map((book)=> {
                    this.state.books.push({id:book.id,shelf:book.shelf})
                })
            })
    }

    // As input query changes the the state is set and a call is made to the API in the callback function
    updateResults = (query) => {
        this.setState(
            {query: query.trimLeft()},
            () => {
                this.processResults()
            }
        );
    };

    // This function takes the response of the API search call and matches the results to the available shelved books to determine the correct shelf
    processResults = () => {
        let processedBookArray= [];
        let index;

        BooksAPI.search(this.state.query)
            .then((booksData) => {
            if (this.state.query.length !== 0 && booksData.error !== 'empty query' ) {
                booksData.map((book) => {
                    index = this.state.books.findIndex(shelfedBook => shelfedBook.id == book.id);
                    book.shelf = index > 0 ? this.state.books[index].shelf : "none";
                    processedBookArray.push(book)
                });

                this.setState(() => ({
                    searchedBooks: processedBookArray,
                    resultsFound: true
                }))
            } else if (booksData.error === 'empty query') {
                this.setState(() => ({
                    searchedBooks: [],
                    resultsFound: false
                }))
            } else {
                this.setState(() => ({
                    searchedBooks: [],
                    resultsFound: true
                }))
            }
            });
    };

    // This function tracks any change in category and makes a API call
    updateCategory = (category,id) => {
        const book = {id:id};
        BooksAPI.update(book,category)
            .then((response) => {
                console.log('---Backend API updated---')
            })
    };

    render() {
        const {searchedBooks, resultsFound} = this.state;
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
                            resultsFound === false && (
                                <p style={{textAlign:'center', padding:'50px'}}>No Results Found</p>
                            )
                        }
                        {   typeof searchedBooks !== 'undefined' && (
                                searchedBooks.map((book) => (
                                    <li key={book.id}>
                                        <Book bookData = {book} bookShelf={book.shelf} updateCategory = {this.updateCategory} />
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