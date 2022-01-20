import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageError, setProfileImageError] = useState(null);
  const { signup, loading, error } = useSignup();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, profileImage);
    navigate('/dashboard');
  }

  const handleFileChange = (e) => {
    setProfileImage(null);
    const selected = e.target.files[0];
  
    if(!selected) {
      setProfileImageError('Please select an image, buddy');
      return;
    }
    if(!selected.type.includes('image')) {
      setProfileImageError('Selected file must be an image');
      return;
    }
    if(selected.size > 100000) {
      setProfileImageError('Selected file must be less than 100kb. Sorry, buddy');
      return;
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
          {profileImageError && <p className="error">{profileImageError}</p>}
        </label>

        {loading 
          ? <button className="btn" type="submit" disabled>Submitting...</button>
          : <button className="btn" type="submit">Submit</button>
        }
        {error && <p className="error">{error}</p>}
      </form>

      <Link to="/login" className="signin-access">Login to your account</Link>
    </div>
  )
}