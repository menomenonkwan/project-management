import { useState } from "react"
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageError, setProfileImageError] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, displayName, profileImage });
  }

  const handleFileChange = (e) => {
    setProfileImage(null);
    const selected = e.target.files[0];
  
    if(!selected) {
      setProfileImageError('Please select an image, buddy');
    }
    if(!selected.type.includes('image')) {
      setProfileImageError('Selected file must be an image');
    }
    if(selected.size > 1000000) {
      setProfileImageError('Selected file must be less than 1MB. Sorry, buddy');
    }

    setProfileImageError(null);
    setProfileImage(selected);
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>

        {/* email */}
        <label>
          <span>Email:</span>
          <input 
            type="email" 
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        {/* display name */}
        <label>
          <span>Username:</span>
          <input 
            type="text" 
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            maxLength="12"
          />
        </label>

        {/* password */}
        <label>
          <span>Password:</span>
          <input 
            type="password" 
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        {/* profileImage */}
        <label>
          <span>Profile Image:</span>
          <input 
            type="file"
            accept="image/*" 
            required
            onChange={handleFileChange}
          />
          {/* <p className="error">{imgerr}</p> */}
        </label>

        <button className="btn" type="submit">Submit</button>
        {/* <p className="error">{error}</p> */}
      </form>

      <Link to="/login" className="signin-access">Login to your account</Link>
    </div>
  )
}