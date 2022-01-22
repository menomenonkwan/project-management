import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// styles & images
import background from '../../assets/background.jpg';
import './Home.css';

export default function Home() {

  return (
    <div 
      className='landing-page'
      style={{ backgroundImage: `url(${background})` }}
    >
      <motion.div 
        className="curtain"
        initial={{ opacity: 1}}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      ></motion.div>
      <motion.div 
        className="left-curtain"
        initial={{ opacity: 0, x: '-100vw' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.15 }}
      ></motion.div>
      <motion.div 
        className="right-curtain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.15 }}
      ></motion.div>
      <motion.div 
        className="landing-content"
        initial={{ opacity: 0, x: '100vw' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.15 }}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.65 }}
        >
          <h1>ProjectManagement</h1>
          <h4>Keeping us all on the same page.</h4>
          <Link to='/login' className='btn'>Login</Link>
          <Link to='/signup' className='btn'>Signup</Link>
        </motion.div>
      </motion.div>
      <motion.h4 
        className='version'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.65 }}
      >Desktop Version</motion.h4>
    </div>
  )
}