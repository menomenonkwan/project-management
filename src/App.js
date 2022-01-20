import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// components & pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Sidebar from './components/Sidebar';
import Users from './components/Users';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';

// styles
import './App.css';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">

      <BrowserRouter>
        <div className="container">
          {user && <Sidebar />}

        <Routes>
          <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" /> } />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" /> } />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" /> } />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" /> } />
          <Route path="/create" element={user ? <Create /> : <Navigate to="/login" /> } />
          <Route path="/projects/:id" element={user ? <Project /> : <Navigate to="/login" /> } />
          <Route path="*" element={user ? <Dashboard /> : <Navigate to="/login" /> } />
        </Routes>

          {user && <Users />}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
