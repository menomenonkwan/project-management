// styles
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.css';

export default function ProjectList({ projects }) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="project-list">
      {projects.length === 0 && <p>We have no projects</p>}
      {projects.map(project => (
        
        <Link to={`/projects/${project.id}`} key={project.id} >
          <div className="card">{project.name}</div>

        </Link>
      ))}

    </div>
  )
}
{/* https://www.framer.com/docs/animate-shared-layout/ */}
{/* https://codesandbox.io/s/framer-motion-animatesharedlayout-app-store-demo-i1kct?from-embed */}
