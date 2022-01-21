import { motion, AnimatePresence } from 'framer-motion';

// styles & images
import './Switch.css';
import yesIcon from '../assets/yes.svg';
import noIcon from '../assets/no.svg';
import lightIcon from '../assets/light_mode.svg';
import darkIcon from '../assets/dark_mode.svg';
import { useThemeContext } from '../hooks/useThemeContext';

const ModeSwitch = ({ isOn, setIsOn }) => {
  const { mode, changeMode } = useThemeContext();
  const switchBackground = `mode-switch ${isOn ? 'on' : 'off'}`;
  const handleClick = () => {
    setIsOn(!isOn);
    changeMode(mode === 'light' ? 'dark' : 'light');
  }

  return (
    <div 
      data-darkmode={isOn}
      className={`${switchBackground}`} 
      onClick={handleClick}
      style={{ justifyContent: isOn ? 'flex-end' : 'flex-start' }}
    >
      <motion.div layout className="handle">
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.img 
            src={!isOn ? lightIcon : darkIcon} 
            alt="prioritize" 
            className='mode-switch-icon'

            key={isOn ? 'dark' : 'light'}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }} 
            transition={{ duration: .2 }}
          />
        </AnimatePresence>
      </motion.div>
    </div>   
  )   
}

export default function Switch({ isOn, setIsOn, purpose }) {
  
  const switchBackground = `switch ${isOn ? 'on' : 'off'}`;

  if (purpose === 'mode') {
    return <ModeSwitch isOn={isOn} setIsOn={setIsOn} />
  }

  return (
    <div 
      className={switchBackground} 
      onClick={() => setIsOn(!isOn)}
      style={{ justifyContent: isOn ? 'flex-end' : 'flex-start' }}
    >
      <motion.div layout className="handle">
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.img 
            src={isOn ? yesIcon : noIcon} 
            alt="prioritize" 
            className='switch-icon'

            key={isOn ? 'yes' : 'no'}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }} 
            transition={{ duration: .2 }}
          />
        </AnimatePresence>
      </motion.div>
      {isOn && 
        <motion.p 
          className='yes'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.35, delay: 0.15 }}
        >yes</motion.p>
      }
      {!isOn && 
        <motion.p 
          className='no'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.35, delay: 0.15 }}
        >no</motion.p>
      }
    </div>
  )
}