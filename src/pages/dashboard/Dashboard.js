import ProjectList from '../../components/ProjectList';
import { useCollection } from '../../hooks/useCollection';

// styles
import './Dashboard.css';

export default function Dashboard() {
  const { documents, error } = useCollection('projects');

  return (
    <div className="main-wrapper">
      <div className="dashboard">
        {error && <p className='error'>{error}</p>}
        {documents && <ProjectList projects={documents} />}
      </div>
    </div>
  )
}
