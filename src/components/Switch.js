import { motion, AnimatePresence } from 'framer-motion';

// styles & images
import './Switch.css';
import yesIcon from '../assets/yes.svg';
import noIcon from '../assets/no.svg';

export default function SwitchTwo({ isOn, setIsOn }) {
  const switchBackground = `switch ${isOn ? 'on' : 'off'}`;

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
    </div>
  )
}