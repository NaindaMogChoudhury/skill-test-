import React from 'react';
import BookForm from './BookForm';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Library Book Management System</h1>
        <p className="subtitle">Skill Test Examination - Advanced Application Development Lab</p>
      </header>

      <main className="app-main">
        <BookForm />
      </main>

      <footer className="app-footer">
        <p>Full-Stack MERN Implementation (React + Node/Express + MongoDB)</p>
      </footer>
    </div>
  );
}

export default App;
