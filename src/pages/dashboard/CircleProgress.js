import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircleProgress.css';

export default function CircleProgress({ percentage }) {

  return (
    <div className='circle-progress'>
      <div style={{ width: 100, height: 100 }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          
          // strokeWidth 	Width of circular line relative to total width of component, a value from 0-100. Default: 8.
          strokeWidth={12}
          background={false}          // background 	Whether to display background color. Default: false.
          styles={
            
          
            
            buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              // rotation: 0.25,
              
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            // strokeLinecap: 'butt',
            
            // Text size
            // textSize: '16px',
            
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            
            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',
            
            // Colors
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: '#f88',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}
        />;
      </div>

      <p>Projects Completed</p>
    </div>
  )
}