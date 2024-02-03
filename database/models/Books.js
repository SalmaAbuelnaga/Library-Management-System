const db = require('../dbConfig');

const BookSchema = {
    title: 'string',
    author: 'string',
    ISBN: 'string',
    availableQuantity: 'number',
    shelfLocation: 'string',
  };

const BooksTable = ()=> {
    try {
        db.connection.execute(
            `CREATE TABLE books(
            id INT PRIMARY KEY AUTO_INCREMENT,
             title VARCHAR(255) NOT NULL,
            author VARCHAR(255),
            ISBN VARCHAR(20),
            availableQuantity INT,
            shelfLocation VARCHAR(20));`);
        console.log('books table created');
        
    } catch (error) {
        console.error('An error occured while creating the books table' ,error)
    }

};
module.exports = {BooksTable, BookSchema};