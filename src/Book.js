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
                        {/*
                        <select
                            name="category-selector"
                        >
                            {
                                options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))
                            }
                        </select>
                        */}

                        <select
                            name="category-selector"
                            onChange={(event) => {updateCategory(event.target.value,bookData.id)}}
                            value={bookShelf}
                        >
                            <option value="none" disabled="true">Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want To Read</option>
                            <option value="read">Read</option>
                            <option value="noShelf">None</option>
                        </select>

                    </div>
                </div>
                <div className="book-title">{bookData.title}</div>
                <div className="book-authors">{bookData.authors[0]}</div>
                <div>{bookShelf}</div>
            </div>
        )
    }
}

export default Book;