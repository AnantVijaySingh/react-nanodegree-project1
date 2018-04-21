import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

class App extends Component {
  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() => (
              <div className="list-books">
                  <div className="list-books-title">
                      <h1>MyReads</h1>
                  </div>
                  <BookShelf/>
                  <div className="open-search">
                      <Link to="/search"
                      >
                          Add a book
                      </Link>
                  </div>
              </div>
          )} />
          <Route exact path="/search" render={() => (
              <SearchBooks />
          )} />
      </div>
    );
  }
}

export default App;
