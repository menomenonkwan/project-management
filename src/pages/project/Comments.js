import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import Avatar from '../../components/Avatar';
import { v4 as uuidv4 } from 'uuid';

// styles
import './Project.css';

export default function Comments({ document }) {
  const [comment, setComment] = useState('');
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore('projects');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: Timestamp.fromDate(new Date()),
      id: uuidv4(),
      comment
    }
    
    await updateDocument(document.id, {
      comments: [ ...document.comments, newComment ]
    }) 
    if (!response.error) {
      setComment('');
    }
  }

  return (
    <div className='project-comments'>
      <h4>Project Comments:</h4>
      {document.comments.length === 0 && (
        <p className='no-comment'>No comments...</p>
      )}
      <ul className='comments-list'>
        {document.comments.map(post => (
          <li key={post.id}>
            <div>
              <Avatar src={post.photoURL} />
              <h5>{post.displayName}</h5>
            </div>
            <p>{post.comment}</p>
            <p>{post.createdAt.toDate().toDateString()}</p>
            <p>{post.createdAt.toDate().toLocaleTimeString()}</p>
          </li>
        ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add Comment:</span>
          <textarea
            required
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
        </label>

        <button className="btn" type="submit">Submit</button>
      </form>

    </div>
  );
}
