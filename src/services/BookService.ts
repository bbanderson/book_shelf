import axios from 'axios';
import { BookReqType, IBook } from '../types';

const BOOK_API_URL = 'http://localhost:5000/v1/book';

export default class BookService {
  public static async getBooks(token: string): Promise<IBook[]> {
    const response = await axios.get(BOOK_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  public static async addBook(
    token: string,
    book: BookReqType
  ): Promise<IBook> {
    const response = await axios.post(BOOK_API_URL, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  public static async deleteBook(token: string, bookId: number): Promise<void> {
    await axios.delete(`${BOOK_API_URL}/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
