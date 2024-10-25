import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]); // State untuk daftar buku
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    published_year: '',
    status: 'true',
  });

  // Fungsi untuk mengambil semua buku dari API Laravel
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/books');
      setBooks(response.data.data); // Simpan data ke state
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Panggil fetchBooks saat komponen pertama kali dimuat
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fungsi untuk menangani input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi untuk menambahkan buku baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/books', {
        ...formData,
        status: formData.status === 'true',
      });
      fetchBooks(); // Refresh daftar buku setelah menambah data
      setFormData({
        title: '',
        author: '',
        category: '',
        published_year: '',
        status: 'true',
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Library Books</h1>

      {/* Form untuk menambahkan buku */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="published_year"
          placeholder="Published Year"
          value={formData.published_year}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <button type="submit">Add Book</button>
      </form>

      {/* Daftar buku */}
      <h2>Books List</h2>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} - {book.author} ({book.published_year}) [{book.status ? 'Available' : 'Not Available'}]
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default App;
