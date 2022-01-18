import { useState } from "react"
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

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

        {/* password */}
        <label>
          <span>Password:</span>
          <input 
            type="email"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={email} 
          />
        </label>

        <button className="btn" type="submit">Submit</button>
        {/* <p className="error">{error}</p> */}
      </form>

      <Link to="/signup" className="signin-access">Signup for an account</Link>
    </div>
  )
}