import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { useThemeContext } from '../hooks/useThemeContext';

// components
import Avatar from './Avatar';
import Navbar from './Navbar';

// styles
import './Sidebar.css';

export default function Sidebar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { mode } = useThemeContext();

  return (
    <div className={`sidebar ${mode}`}>
      <div className="current-user">
        <Avatar src={user.photoURL} />
        <h3 className='current-user-name'>{ user.displayName }</h3>
        <button className="btn" onClick={logout}>logout</button>
      </div>

      <Navbar />
    </div>
  )
}