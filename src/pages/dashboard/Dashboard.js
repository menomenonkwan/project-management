import { useEffect, useState } from 'react';
import CircleProgress from './CircleProgress';
import ProjectList from '../../components/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import './Dashboard.css';
import FilterList from './FilterList';

export default function Dashboard() {
  const [filter, setFilter] = useState('all');
  const [percentage, setPercentage] = useState(0);
  const { documents, error } = useCollection('projects');
  const { user } = useAuthContext();
  


  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  }

  const projects = documents ? documents.filter(doc => {
    switch (filter) {
      case 'all':
        return true;
      case 'mine':
        let assignedToMe = false;
        doc.assignedUsersList.forEach(assigned => {
          if (assigned.id === user.uid) {
            assignedToMe = true;
          }
        })
        return assignedToMe;
      case 'cleaning':
        return doc.category === filter;
      case 'shopping':
        return doc.category === filter;
      case 'chores':
        return doc.category === filter;
      case 'errands':
        return doc.category === filter;
      case 'relax':
        return doc.category === filter;
      case 'social':
        return doc.category === filter;
      case 'incomplete':
        return doc.complete === false;
      case 'complete':
        return doc.complete === true;
      case 'priority':
        return doc.priority === true;
      default:
        return true;
    }
  }) : null;

  useEffect(() => {
    if (!projects) { return; }
    
    const completed = projects.filter(doc => doc.complete === true);
    const completedPercentage = (completed.length / projects.length * 100).toFixed(2);
    
    setPercentage(isNaN(completedPercentage) ? 0 : completedPercentage);
  }, [projects]);

  return (
    <div className="main-wrapper">
      {/* <div className="dashboard"> */}
        <CircleProgress percentage={percentage} />
        <FilterList currentFilter={filter} changeFilter={changeFilter} />
        {error && <p className='error'>{error}</p>}
        {projects && <ProjectList projects={projects} />}

      {/* </div> */}
    </div>
  )
}
