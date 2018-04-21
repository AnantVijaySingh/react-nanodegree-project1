import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SearchBooks extends Component {
    state = {
        query:''
    };

    updateResults = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))


    };

    render() {
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

                    </ol>
                </div>

            </div>
        )
    }
}

export default SearchBooks;