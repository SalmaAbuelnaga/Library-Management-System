const express = require('express');
const mysql = require('mysql2');
const path = require('path')
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser')
const { connection } = require('./database/dbConfig');
const { BooksTable, BookSchema } = require('./database/models/Books');
const { BorrowersTable, borrowersSchema } = require('./database/models/Borrowers');
const { BorrowedBooksTable, borrowedBooksSchema } = require('./database/models/BorrowedBooks');
const baseRepo = require('./database/baseRepo')
const methodOverride = require('method-override');

const port = process.env.port || 3000;

app.set('views', 'views')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


// BooksTable();
// BorrowersTable();
// BorrowedBooksTable();

app.get('/', (req, res) => {
    res.render('app.ejs')
});

app.get('/books', async (req, res) => {
    try {
        var borrowers = await baseRepo.getAllAsync('borrowers');
        var rows = await baseRepo.getAllAsync('books')
        res.render('books.ejs', { title: "Books Library", books: rows, borrowers:borrowers })
    } catch (error) {
        console.log(error)
        res.render('error.ejs', { error: error });
    }
});


app.post('/books/add', async (req, res) => {
    try {
        var rows = await baseRepo.addAsync('books', req.body, BookSchema)
        res.redirect('/books')
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

app.put('/books/update/:id', async (req, res) => {
    try {
        var u = await baseRepo.updateAsync('books', req.params.id, req.body, BookSchema)
        res.redirect('/books')
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

app.delete('/books/delete/:id', async (req, res) => {
    try {
        var u = await baseRepo.deleteAsync('books', req.params.id)
        res.redirect('/books');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.get('/borrowers', async (req, res) => {
    try {
        var rows = await baseRepo.getAllAsync('borrowers')
        res.render('borrowers.ejs', { borrowers: rows })
    } catch (error) {
        console.log(error)
        //res.status(500).json({ error: 'Internal Server Error' });
        res.render('error.ejs', { error: error });
    }
})

app.post('/borrowers/add', async (req, res) => {
    try {
        var rows = await baseRepo.addAsync('borrowers', req.body, borrowersSchema)
        res.redirect('/borrowers')
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

app.put('/borrowers/update/:id', async (req, res) => {
    try {
        var u = await baseRepo.updateAsync('borrowers', req.params.id, req.body, borrowersSchema)
        res.redirect('/borrowers')
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

app.delete('/borrowers/delete/:id', async (req, res) => {
    try {
        var u = await baseRepo.deleteAsync('borrowers', req.params.id)
        res.redirect('/borrowers');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/books/borrow/:id', async (req, res) => {
    try {
        let data = {borrowerId : req.body.userId}; 
        data.bookId = req.params.id;
        data.checkoutDate = new Date().toJSON().slice(0, 10);
        var u = await baseRepo.addAsync('borrowedbooks', data, borrowedBooksSchema)
        res.redirect('/borrowedBooks')
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.get('/borrowedbooks', async (req, res) => {
    try {
        var borrowed = await baseRepo.getAllJoined();
        res.render('borrowedbooks.ejs', {title:'All Borrowed Books',borrowed: borrowed})
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/search', async (req, res) => {
    const searchTerm = req.query.query
    if (searchTerm) {
        var borrowers = await baseRepo.getAllAsync('borrowers');
        const query = `SELECT * FROM books WHERE title LIKE ? 
         OR author LIKE ? OR ISBN LIKE ?`;
        var searchVal = `%${searchTerm}%`
        connection.query(query, [searchVal, searchVal, searchVal], (err, rows) => {
            try {
                res.render('books.ejs', { title: `Search results for '${searchTerm}'`, books: rows, borrowers:borrowers })
            } catch (error) {
                res.render('error.ejs', { error: error })
            }

        })
    } else {
        res.redirect('/books')
    }

})

app.get('/borrowers/borrowedbooks/:id', async (req,res)=>{
    try {
        var books = await baseRepo.getBorrowersBooks(req.params.id)
        console.log(books)
        res.render('borrowedbooks.ejs', {title:"Borrowers's Books",borrowed: books})
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.put('/borrowedbooks/return/:id', async (req,res)=>{
    try {
        let updatedDate = {checkinDate : new Date().toJSON().slice(0, 10)}
        
        var up = await baseRepo.updateAsync('borrowedBooks', req.params.id, updatedDate, borrowedBooksSchema)
        res.redirect('/borrowedbooks');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.get('/borrowedbooks/overdue/', async (req,res)=>{
    try {
        var books = await baseRepo.getOverdueBooks(req.params.id)
        console.log(books)
        res.render('borrowedbooks.ejs', {title:"Borrowers's Books",borrowed: books})
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

process.on('exit', () => {
    connection.end();
})



app.listen(port, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port 3000");
});
