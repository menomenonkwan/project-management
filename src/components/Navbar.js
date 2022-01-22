import { NavLink } from 'react-router-dom';
import { useThemeContext } from '../hooks/useThemeContext';

// styles & images
import './Navbar.css';
import dashboardIcon from '../assets/dashboard.svg';
import addIcon from '../assets/add.svg';

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
