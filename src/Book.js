//Component that creates the UO for each individual book

import React, {Component} from 'react';

class Book extends Component {

    render() {

        const {bookData,updateCategory,bookShelf} = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{width:'128px', height:'193px', backgroundSize:'cover' , backgroundRepeat: 'no-repeat' ,backgroundImage:`url(${bookData.imageLinks.thumbnail})`}}></div>
                    <div className="book-shelf-changer">
                        <select
                            name="category-selector"
                            onChange={(event) => {updateCategory(event.target.value,bookData.id)}}
                            value={bookShelf}
                        >
                            <option value="noshelf" disabled="true">Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want To Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>

                    </div>
                </div>
                <div className="book-title">{bookData.title}</div>
                    {
                        typeof bookData.authors !== 'undefined' && (
                            bookData.authors.map(author => (
                                <div className="book-authors" key={author}>{author}</div>
                            ))
                        )
                    }
            </div>
        )
    }
}

export default Book;