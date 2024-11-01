"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Book_1 = __importDefault(require("./models/Book"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON requests
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
// Create a new book
app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new Book_1.default(req.body);
        yield book.save();
        res.status(201).json(book);
    }
    catch (err) {
        console.error('Error creating book:', err);
        res.status(400).json({ message: err.message });
    }
}));
// Get all books
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book_1.default.find();
        res.status(200).json(books);
    }
    catch (err) {
        console.error('Error retrieving books:', err);
        res.status(500).json({ message: err.message });
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
