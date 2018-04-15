import React, { Component } from 'react';
import './App.css';
import BookShelf from './BookShelf';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <BookShelf/>
        </div>
      </div>
    );
  }
}

export default App;
