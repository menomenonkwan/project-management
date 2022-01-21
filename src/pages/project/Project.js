import { useNavigate, useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

// components 
import Comments from './Comments';

// styles
import './Project.css';

export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument('projects', id);
  const { deleteDocument, updateDocument } = useFirestore('projects');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    deleteDocument(document.id);

    navigate('/dashboard');
  }

  const handleUpdate = (e) => {
    const updateComplete = { complete: !document.complete }
    updateDocument(document.id, updateComplete);
  }

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
        <div className="project-details">

          <h2>{document.name}</h2>
          <p>details: {document.details}</p>
          <p>category: {document.category}</p>
          <p>assigned to: {document.assignedUsersList.map(user => (<span key={user.id}>{user.displayName}, </span>))}</p>
          {/* <p>comments: {document.comments}</p> */}
          <p>created at: {document.createdAt.toDate().toDateString()}</p>
          <p>created by: {document.createdBy.displayName}</p>
          <p>due date: {document.dueDate.toDate().toDateString()}</p>
          <p>priority: {document.priority ? 'Yes' : 'No'}</p>

          {/* complete button  */}
          {document.complete ? <button className="btn complete-btn" onClick={handleUpdate}>Mark as Incomplete</button> :
          <button className="btn" onClick={handleUpdate}>Mark as Complete</button>}
          {/* delete button */}
          {user.uid === document.createdBy.id && 
            <button className="btn" onClick={handleDelete}>Delete</button>
          }
        </div>

        <Comments document={document} />
      </div>
    </div>
  )
}
