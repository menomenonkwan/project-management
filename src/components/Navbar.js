import { Link } from 'react-router-dom';

// styles & images
import './Navbar.css';
import dashboardIcon from '../assets/dashboard.svg';
import addIcon from '../assets/add.svg';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/dashboard">
        <img src={dashboardIcon} alt="" />
        <p>Dashboard</p>
      </Link>
      <Link to="/create">
        <img src={addIcon} alt="" />
        <p>New Project</p>
      </Link>
      <Link to="/">Teams</Link>
      <Link to="/">Calendar</Link>
    </nav>
  );
}
