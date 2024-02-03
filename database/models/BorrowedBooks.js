const db = require('../dbConfig');

const borrowedBooksSchema = {
    borrowerId :"number",
    bookId :"number",
    checkoutDate :"date",
    checkinDate :"date",
}

const BorrowedBooksTable = () => {
    try {
        db.connection.execute(`
        CREATE TABLE borrowedBooks(
            id INT PRIMARY KEY AUTO_INCREMENT,
            borrowerId INT,
            bookId Int,
            checkoutDate DATE,
            checkinDate Date,
            FOREIGN KEY (borrowerId)REFERENCES borrowers(id),
            FOREIGN KEY (bookId) REFERENCES books(id)
        );
        `);
        console.log('borrowed books table created');

    } catch (error) {
        console.error('An error occured while creating the borrowed books table', error)
    }

};
module.exports = { BorrowedBooksTable, borrowedBooksSchema };