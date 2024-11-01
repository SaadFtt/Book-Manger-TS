import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book, { IBook } from './models/Book';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Create a new book
app.post('/books', async (req: Request, res: Response) => {
  try {
    const book: IBook = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(400).json({ message: (err as Error).message });
  }
});

// Get all books
app.get('/books', async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.error('Error retrieving books:', err);
    res.status(500).json({ message: (err as Error).message });
  }
});


  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
