import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import { useThemeContext } from '../../hooks/useThemeContext';

// styles
import 'react-circular-progressbar/dist/styles.css';
import './CircleProgress.css';

export default function CircleProgress({ percentage }) {
  const { mode } = useThemeContext();

  const fontColor = mode === 'dark' ? 'var(--salmon, salmon)' : 'var(--purple, purple)';

  return (
    <div className='circle-progress'>
      <div style={{ width: 100, height: 100 }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={12}
          background={mode === 'dark' ? false : true}
          
          styles={
            buildStyles({
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
              
              // Colors
              pathColor: 'var(--turquoise, turquoise)',
              textColor: `${fontColor}`,
              trailColor: '#fefefe',
              backgroundColor: `rgba(250, 128, 114, ${percentage / 100})`,
             })}
        />        
      </div>

      <p style={{ color: fontColor }}>Projects Completed</p>
    </div>
  )
}