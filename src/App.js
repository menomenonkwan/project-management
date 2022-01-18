import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components & pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

// styles
import './App.css';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <div className="container">

        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Signup /> } />
        </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
