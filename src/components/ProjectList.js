// styles
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import './ProjectList.css';

export default function ProjectList({ projects }) {

  return (
    <div className="project-list">
      {projects.length === 0 && <p>We have no projects</p>}

      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id} >
          <div className="card">
            {project.priority && <p className='prioritize'>priority</p>}
            <h3 className='card-name'>{project.name}</h3>
            <p className='card-category'>{project.category}</p>
            <p className='card-due-date'>{project.dueDate.toDate().toDateString()}</p>  
            
            <div className="card-assigned">
              <ul>
                {project.assignedUsersList.map(assigned => (
                  <li key={assigned.id}>
                    <Avatar src={assigned.photoURL} />
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </Link>
      ))}
    </div>
  )
}
{/* https://www.framer.com/docs/animate-shared-layout/ */}
{/* https://codesandbox.io/s/framer-motion-animatesharedlayout-app-store-demo-i1kct?from-embed */}
