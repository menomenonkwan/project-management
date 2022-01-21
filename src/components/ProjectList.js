// styles
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import './ProjectList.css';

export default function ProjectList({ projects }) {
  // sort by date
  projects.sort((a, b) => {
    const dateA = a.dueDate; 
    const dateB = b.dueDate; 
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });


  return (
    <div className="project-list">
      {projects.length === 0 && <p>We have no projects</p>}

      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id} >
          <div className="card" style={project.complete ? { background: 'var(--grey, grey)'} : null }>
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

