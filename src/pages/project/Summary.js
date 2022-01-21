import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

// styles
import './Project.css';

export default function Summary({ document }) {
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

  return (
    <div className='project-summary'>
      <h2 className='project-name'>{document.name}</h2>
      <p className='project-due-date'>Due Date: {document.dueDate.toDate().toDateString()}</p>
      <p className='project-details'>{document.details}</p>

      <ul className='project-assigned'>Assigned To: {document.assignedUsersList.map(user => (<li key={user.id}><Avatar src={user.photoURL} /></li>))}</ul>

      <div className="project-info">
        <p className='project-category'>Category: <span>{document.category}</span></p>
        <p className='project-created-at'>Created On: <span>{document.createdAt.toDate().toDateString()}</span></p>
        <p className='project-created-by'>Created By: <span>{document.createdBy.displayName}</span></p>
        <p className='project-priority'>Priority: <span>{document.priority ? 'Yes' : 'No'}</span></p>
      </div>

      <div className="project-buttons">
        {/* delete button */}
        {user.uid === document.createdBy.id && 
          <button className="btn" onClick={handleDelete}>Delete</button>
        }      
        {/* complete button  */}
        {document.complete ? <button className="btn is-complete-btn" onClick={handleUpdate}>Mark as Incomplete</button> :
        <button className="btn not-complete-btn" onClick={handleUpdate}>Mark as Complete</button>}
      </div>
    </div>
  );
}