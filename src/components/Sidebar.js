import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import Avatar from './Avatar';
import Navbar from './Navbar';
import Switch from './Switch';

// styles
import './Sidebar.css';
import { useState } from 'react';

export default function Sidebar() {
  const [isOn, setIsOn] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className='sidebar'>
      <div className="current-user">
        <Avatar src={user.photoURL} />
        <h3 className='current-user-name'>{ user.displayName }</h3>
      </div>

      <button className="btn" onClick={logout}>logout</button>

      <Navbar />

      <Switch isOn={isOn} setIsOn={setIsOn} purpose="mode" />
    </div>
  )
}