import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
  // useState hook to manage form input data
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publicationYear: ''
  });

  // State for success message, error message, and loading status
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle change for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');
    setLoading(true);

    try {
      // POST request to backend API
      const response = await axios.post('http://localhost:5000/api/books', {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        category: formData.category,
        publicationYear: Number(formData.publicationYear)
      });

      if (response.status === 201 || response.status === 200) {
        // Display suitable success message
        setMessage('Book added successfully to the library database!');

        // Clear the form fields after successful submission
        setFormData({
          title: '',
          author: '',
          isbn: '',
          category: '',
          publicationYear: ''
        });
      }
    } catch (error) {
      console.error('Error submitting book:', error);
      const serverError =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Failed to add book. Please make sure the backend server is running.';
      setErrorMessage(serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Add New Book</h2>
        <p>Enter the book details to register it in the library catalog.</p>
      </div>

      {/* Success Notification */}
      {message && (
        <div className="alert alert-success">
          <strong>Success!</strong> {message}
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="alert alert-error">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Book Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Clean Code"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author Name *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="e.g. Robert C. Martin"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="isbn">ISBN *</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="e.g. 978-0132350884"
              required
            />
          </div>

          <div className="form-group half-width">
            <label htmlFor="publicationYear">Publication Year *</label>
            <input
              type="number"
              id="publicationYear"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleChange}
              placeholder="e.g. 2008"
              min="1000"
              max="2100"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Adding Book...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
