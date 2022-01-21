import { NavLink } from 'react-router-dom';

// styles & images
import './Navbar.css';
import dashboardIcon from '../assets/dashboard.svg';
import addIcon from '../assets/add.svg';
import taskIcon from '../assets/task.svg';

export default function Navbar() {
  
  return (
    <nav className="navbar">
      <NavLink to="/dashboard">
        <img src={dashboardIcon} alt="" />
        <p>Dashboard</p>
      </NavLink>
      <NavLink to="/create">
        <img src={addIcon} alt="" />
        <p>New Project</p>
      </NavLink>
    </nav>
  );
}
