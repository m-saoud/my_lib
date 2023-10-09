import './App.css';
import  BookForm from './components/BookForm';
import BookList from './components/BookList';
function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <BookList />
      <BookForm />
    </div>
  );
}

export default App;
