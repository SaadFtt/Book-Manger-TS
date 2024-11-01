import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  pages: number;
  publishedYear: number;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  publishedYear: { type: Number, required: true },
});

const Book = mongoose.model<IBook>('Book', BookSchema);
export default Book;
