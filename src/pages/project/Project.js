import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

// components 
import Comments from './Comments';
import Summary from './Summary';

// styles
import './Project.css';

export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument('projects', id);

  if (error) {
    return (
      <div className='main-wrapper'>
        <div className="project">
          <p className="error">{error}</p>
        </div>
      </div>
    )
  }
  if (!document) {
    return (
      <div className='main-wrapper'>
        <div className="project">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='main-wrapper'>
      <div className="project">
        <Summary document={document} />
        <Comments document={document} />
      </div>
    </div>
  )
}
