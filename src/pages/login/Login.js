import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
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
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
          />
        </label>

        {loading 
          ? <button className="btn" type="submit" disabled>Submitting...</button>
          : <button className="btn" type="submit">Submit</button>
        }
        {error && <p className="error">{ error}</p>}
      </form>

      <Link to="/signup" className="signin-access">Signup for an account</Link>
    </div>
  )
}