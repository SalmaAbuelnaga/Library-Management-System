const { connection } = require('./dbConfig');


const getAllAsync = (tableName, filter, sort) => {

    return new Promise((resolve, reject) => {

        let query = `SELECT * FROM ${tableName}`;
        if (filter)
            query += `WHERE ${filter}`
        if (sort)
            query += `ORDER BY ${sort}`

        connection.query(query, (err, rows) => {
            try {
                console.log(rows)
                resolve(rows)
            }
            catch (err) {
                reject(err)
            }
        });
    }

    )
}
const addAsync = (tableName, tableData, schema) => {
    return new Promise((resolve, reject) => {
        const values = Object.entries(tableData)
            .map(([key, value]) => (schema[key] === 'string' || schema[key] === 'date' ? `"${value}"` : value))
            .join(', ');
        const fields = Object.keys(tableData).join(', ');

        let query = `INSERT INTO ${tableName} (${fields}) VALUES (${values})`;
        console.log(query)
        connection.query(query, (err, rows) => {
            try {
                console.log(rows)
                resolve(rows)
            } catch (err) {
                reject(err)
            }
        })
    })
}

const updateAsync = (tableName, id, tableData, schema) => {
    return new Promise((resolve, reject) => {
        const data = Object.entries(tableData)
            .map(([key, value]) => {
                const formattedValue = schema[key] === 'string' || schema[key] === 'date' ? `"${value}"` : value;
                return `${key} = ${formattedValue}`;
            }).join(', ');
        console.log(data);
        let query = `UPDATE ${tableName} SET ${data} WHERE  id = ${id}`;
        console.log(query)
        connection.query(query, (err, rows) => {
            try {
                console.log(rows)
                resolve(rows)
            } catch (err) {
                reject(err)
            }
        })
    })
}
const deleteAsync = (tableName, id) => {
    return new Promise((resolve, reject) => {
        let query = `DELETE FROM ${tableName} WHERE id = ${id};`;
        console.log(query)
        connection.query(query, (err, rows) => {
            try {
                console.log(rows)
                resolve(rows)
            } catch (err) {
                reject(err)
            }
        })
    })
}
const getAllJoined = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT br.id AS id, br.bookId, bo.title, br.borrowerId, bor.name, br.checkoutDate, br.checkinDate  FROM borrowedBooks br Join books bo on br.bookId = bo.id 
    Join borrowers bor on br.borrowerId = bor.id WHERE checkinDate IS NULL ORDER BY br.id `
        connection.query(query, (err, rows) => {
            try {
                console.log(rows)
                resolve(rows)
            }
            catch (err) {
                reject(err)
            }
        });
    })
}

const getBorrowersBooks = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT br.id AS id, br.bookId, bo.title, br.borrowerId, bor.name, br.checkoutDate, br.checkinDate  FROM borrowedBooks br Join books bo on br.bookId = bo.id 
    Join borrowers bor on br.borrowerId = bor.id WHERE br.borrowerId = ${id}`
        connection.query(query, (err, rows) => {
            try {
                console.log(rows)
                resolve(rows)
            }
            catch (err) {
                reject(err)
            }
        });
    })
}

const getOverdueBooks = () => {
    return new Promise((resolve, reject) => {

        const query = "SELECT br.id AS id, br.bookId, bo.title, br.borrowerId, bor.name, br.checkoutDate, br.checkinDate  FROM borrowedBooks br Join books bo on br.bookId = bo.id Join borrowers bor on br.borrowerId = bor.id WHERE DATEDIFF(CURRENT_DATE, checkoutDate) > 14 AND checkinDate IS NULL;"
        connection.query(query, (err, rows) => {
            try {
                console.log(rows)
                resolve(rows)
            }
            catch (err) {
                reject(err)
            }
        });
    })
}
module.exports = { getAllAsync, addAsync, updateAsync, deleteAsync, getAllJoined, getBorrowersBooks, getOverdueBooks };