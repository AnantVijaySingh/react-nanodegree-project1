import React, {Component} from 'react';
import BookShelfSection from './BookShelfSection';

class BookShelf extends Component {
    state = {
        reading:[
            {title: 'name1',author:'author1',imageURL:'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api'},
            {title: 'name2',author:'author2',imageURL:'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'}
            ],
        toRead:[],
        read:[]
    };

    render() {
        return (
            <div className="list-books-content">
                <div>
                    <BookShelfSection title="Currently Reading" books={this.state.reading} />
                    <BookShelfSection title="Want To Read" books={this.state.toRead} />
                    <BookShelfSection title="Read" books={this.state.read} />
                </div>
            </div>
        )
    }
}

export default BookShelf;