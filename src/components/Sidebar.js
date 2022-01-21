import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

// components
import Avatar from './Avatar';
import Navbar from './Navbar';

// styles
import './Sidebar.css';

export default function Sidebar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className='sidebar'>
      <div className="current-user">
        <Avatar src={user.photoURL} />
        <h3 className='current-user-name'>{ user.displayName }</h3>
        <button className="btn" onClick={logout}>logout</button>
      </div>

      <Navbar />
    </div>
  )
}