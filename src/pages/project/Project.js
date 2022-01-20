import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

// styles
import './Project.css';

export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument('projects', id);

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{document.name}</h2>
      <p>details: {document.details}</p>
      <p>category: {document.category}</p>
      <p>assigned to: {document.assignedUsersList.map(user => (<span key={user.id}>{user.displayName}, </span>))}</p>
      {/* <p>comments: {document.comments}</p> */}
      <p>created at: {document.createdAt.toDate().toDateString()}</p>
      <p>created by: {document.createdBy.displayName}</p>
      <p>due date: {document.dueDate.toDate().toDateString()}</p>
      <p>priority: {document.priority ? 'Yes' : 'No'}</p>
    </div>
  )
}
