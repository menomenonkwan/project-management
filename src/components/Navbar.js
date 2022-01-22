import { NavLink } from 'react-router-dom';

// styles & images
import './Navbar.css';
import dashboardIcon from '../assets/dashboard.svg';
import addIcon from '../assets/add.svg';
import taskIcon from '../assets/task.svg';
import { useThemeContext } from '../hooks/useThemeContext';

export default function Navbar() {
  const { mode } = useThemeContext();
  
  return (
    <nav className={`navbar ${mode}`}>
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
