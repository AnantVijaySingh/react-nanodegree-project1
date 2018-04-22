import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
    state = {
        query:'',
        searchedBooks:[],
        books:[]
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                // console.log(books);
                books.map((book)=> {
                    this.state.books.push({id:book.id,shelf:book.shelf})
                })
            })
    }


    updateResults = (query) => {
        // console.log('---New Query String---',query);
        this.setState(
            {query: query.trim()},
            () => {
                // console.log('Callback function executed with query string as:',this.state.query);
                this.processResults()
            }
        );
    };

    processResults = () => {
        let processedBookArray= [];
        let index;
            BooksAPI.search(this.state.query)
                .then((booksData) => {
                    booksData.map((book) => {
                        // console.log(book.id);
                        // console.log('working out the find function',this.state.books.findIndex(shelfedBook => shelfedBook.id == book.id));
                        index = this.state.books.findIndex(shelfedBook => shelfedBook.id == book.id);
                        book.shelf = index > 0 ? this.state.books[index].shelf : "noShelf";
                        processedBookArray.push(book)
                    });

                    this.setState(() => ({
                        searchedBooks: processedBookArray
                    }))
                });
            // console.log('---API Query String---',this.state.query,' ','---API Result---', this.state.searchedBooks);
    };

    updateCategory = (category,id) => {
        // get book id and new category and pass it to the update method of the API and update the local books and searchedBooks array
        let index;
        const book = {id:id};
        const shelf = category === 'noShelf' ? "none" : category;
        BooksAPI.update(book,shelf)
            .then((response) => {
                console.log('---Backend API updated---')
            })


        // let index;
        // const book = {id:id};
        // const shelf = category === 'noShelf' ? "none" : category;
        // BooksAPI.update(book,shelf)
        //     .then(() => {
        //         index = this.state.searchedBooks.findIndex(shelfedBook => shelfedBook.id === id);
        //         this.state.searchedBooks[index].shelf = shelf;
        //         this.setState((prevState) => ({
        //             searchedBooks: prevState
        //         }))}
        //     )

        // call the getAll method to update the bookshelves
        // TESTING IF THE BOOKS WERE ADDED TO THE CORRECT CATEGORY
        // BooksAPI.getAll()
        //     .then((books) => {
        //         console.log(books.length)
        //     });
    };

    render() {
        const {searchedBooks} = this.state;

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
                                        <Book key={book.title} bookData = {book} bookShelf={book.shelf} updateCategory = {this.updateCategory} />
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