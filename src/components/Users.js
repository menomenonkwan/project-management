import { useEffect, useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';

// styles
import './Users.css';

export default function Users() {
  const [online, setOnline] = useState(null);
  const [offline, setOffline] = useState(null);
  const { documents: members, error } = useCollection('users');

  useEffect(() => {
    if(members) {
      const onlineFilter = members.filter(member => member.online);
      setOnline(onlineFilter);

      const offlineFilter = members.filter(member => !member.online);
      setOffline(offlineFilter);
    }
  }, [members]);

  return (
    <div className='users'>
      <h2>Team Members</h2>
      {error && <p className='error'>{ error }</p>}
{/* 
      <ul className="users-list">
        {members && members.map(member => (
          <li className='user' key={member.id}>
            {member.online && <div className='online'></div>}
            <p className='user-name'>{member.displayName}</p>
            <Avatar src={member.photoURL} />
          </li>
        ))}
      </ul> */}

      <h4 className='online-status'>online:</h4>
      <ul className="users-list">
        {online && online.map(member => (
          <li className='user' key={member.id}>
            <Avatar src={member.photoURL} />
            <p className='user-name'>{member.displayName}</p>
            {member.online && <div className='online'></div>}
          </li>
        ))}
      </ul>

      <h4 className='online-status'>offline:</h4>
      <ul className="users-list">
        {offline && offline.map(member => (
          <li className='user' key={member.id}>
            <Avatar src={member.photoURL} />
            <p className='user-name'>{member.displayName}</p>
            {member.online && <div className='online'></div>}
          </li>
        ))}
      </ul>
      {/* <ul className="users-list">
        {offline && offline.map(member => (
          <li className='user' key={member.id}>
            {member.online && <div className='online'></div>}
            <p className='user-name'>{member.displayName}</p>
            <Avatar src={member.photoURL} />
          </li>
        ))}
      </ul> */}
    </div>
  )
}