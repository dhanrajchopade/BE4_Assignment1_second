const express = require("express")
const app = express()

const {initializeDatabase} = require("./db.connect")

const Book = require("./models/books.models")
app.use(express.json())
initializeDatabase()


// API with route "/books" to create a new book data in the books Database
app.post("/books", async(req,res)=>{
    try{
        const newBook = new Book(req.body)
        if(newBook){
            await newBook.save()
            res.status(200).json({message:"Book added successfully", book:newBook})
        }else{
res.status(404).json({error:"Book details required"})
        }

    }catch(error){
        res.status(500).json({error:"Failed to add book.",error})
    }
})


app.get("/books", async(req,res)=>{
    try{
        const books = await Book.find()
        res.status(200).json(books)
    }catch(error){
        res.status(500).json({error:"Failed to retrieve books", error})
    }
})

// find a book with title
async function readBookByTitle(bookTitle) {
    try{
        const book = await Book.findOne({title:bookTitle})
        return book
    }catch(error){
        throw error
    }    
}

app.get("/books/:title", async(req,res)=>{
    try{
        const book = await readBookByTitle(req.params.title)
        if(book){
            res.json(book)
        }else{
            res.status(404).json({error:"Movie not found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch movie."})
    }
})

// Get all Books by Author Name
async function readBooksbyAuthor(authorName) {
    try{
        const bookbyAuthor = await Book.find({author:authorName})
        return bookbyAuthor
    }catch(error){
        console.log(error)
    }
}
app.get("/books/authors/:authorName", async(req,res)=>{
    try{
        const book = await readBooksbyAuthor(req.params.authorName)
        if(book.length !=0){
            res.json(book)
        }else{
            res.status(404).json({error:"No Book Found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch Books by author name."})
    }
})


// get all Books by Genre
async function readBookByGenre(genreName) {
    try{
        const bookByGenre = await Book.find({genre:genreName})
        return bookByGenre
    }catch(error){
        console.log(error)
    }
}

app.get("/books/genres/:genreName", async(req,res)=>{
    try{
        const book1 = await readBookByGenre(req.params.genreName)
        if(book1.length!==0){
            res.json(book1)
        }else{
            res.status(404).json({error:"No Book found"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch books by genre."})
    }
})


//  get all Books by releaseYear
async function readBookbyreleaseYear(releaseYear) {
    try{
        const bookByreleaseYear = await Book.find({publishedYear: releaseYear})
        return bookByreleaseYear
    }catch(error){
        console.log(error)
    }
}

app.get("/books/years/:releaseYear", async(req,res)=>{
    try{
        const book2 = await readBookbyreleaseYear(req.params.releaseYear)
        if(book2!=0){
            res.json(book2)
        }else{
            res.status(404).json({error:"No Book Found"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch books by Release Year."})
    }
})


// Find Book by Id and Update
async function updateBookById(bookId, dataToupdate) {
    try{
        const updatedBook = await Book.findByIdAndUpdate(bookId,dataToupdate,{new:true})
        return updatedBook
    }catch(error){
        console.log("Error in updating a Book Data by Id", error)
    }
}

app.post("/books/id/:bookId", async(req,res)=>{
    try{
        const updatedBook1 = await updateBookById(req.params.bookId, req.body)
        if(updatedBook1){
            res.status(200).json({message:"Book data updated successfully by Id.", updatedBook1:updatedBook1})
        }else{
            res.status(404).json({error:"Book not found by Id."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to update books."})
    }
})

// update book details with book title
async function updateBookByTitle(bookTitle, dataToupdate) {
    try{
        const updatedBook = await Book.findOneAndUpdate({title:bookTitle}, dataToupdate, {new:true})
        return updatedBook 
    }catch(error){
        console.log("Error in updating a Book by Title", error)
    }
}

app.post("/books/title/:bookTitle", async(req,res)=>{
    try{
        const updatedBook2 = await updateBookByTitle(req.params.bookTitle, req.body)
        if(updatedBook2){
            res.status(200).json({message:"Book data updated successfully by Title.", updatedBook:updatedBook2})
        }else{
            res.status(404).json({error:"Book not found by title"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to update book data by Title."})
    }
})

// delete book by ID
app.delete("/books/:id", async(req,res)=>{
    try{
const bookId = req.params.id
const deletedBook = await Book.findByIdAndDelete(bookId)
if(deletedBook){
    res.status(200).json({message:"Book deleted successfully by Id."})
}else{
    res.status(404).json({error:"Book not found"})
}
    }catch(error){
        res.status(500).json({error:"Failed to delete book", error})
    }
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})