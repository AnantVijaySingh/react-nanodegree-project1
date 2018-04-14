import React, {Component} from 'react';

class Book extends Component {

    render() {

        const {bookData} = this.props;
        console.log(bookData);
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{width:'128px', height:'193px', backgroundImage:`url(${bookData.imageURL})`}}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled="true">Move to...</option>
                            <option value="currentlyReading" default="true">Currently Reading</option>
                            <option value="wantToRead">Want To Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookData.title}</div>
                <div className="book-authors">{bookData.author}</div>
            </div>
        )
    }
}

export default Book;