const db = require('../dbConfig');

const borrowersSchema = {
    name : "string",
    email : "string", 
    registerDate : "date"
}

const BorrowersTable =  ()=> {
    try {
        db.connection.execute(`
        CREATE TABLE borrowers(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            registerDate DATE
        );`);
        console.log('borrowers table created');
        
    } catch (error) {
        console.error('An error occured while creating the borrowers table' ,error)
    }

};
module.exports = {BorrowersTable , borrowersSchema};