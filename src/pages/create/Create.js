import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../hooks/useThemeContext';

// components
import Switch from '../../components/Switch';
import Select from 'react-select';

// firebase imports
import { Timestamp } from "firebase/firestore";

// styles
import './Create.css';

const categoryOptions = [
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'chores', label: 'Chores'},
  { value: 'errands', label: 'Errands' },
  { value: 'relax', label: 'Relax' },
  { value: 'social', label: 'Social' }
];

const customStyles = {
    control: () => ({
    background: '#ddd',
    display: 'flex',
    borderRadius: '5px;'
  })
}

export default function Create() {
  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext('');
  const { addDocument, response } = useFirestore('projects');
  const navigate = useNavigate();
  const { mode } = useThemeContext();

  // FORM FIELDS
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assigned, setAssigned] = useState('');
  const [priority, setPriority] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map(document => {
        return { value: document, label: document.displayName }
      })
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a project category');
      return;
    }
    if (assigned.length < 1) {
      setFormError('Please assign the project to someone');
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assigned.map(member => {
      return {
        displayName: member.value.displayName,
        photoURL: member.value.photoURL,
        id: member.value.id
      }
    });

    const project = {
      name,
      details,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      category: category.value, 
      priority,
      createdBy,
      assignedUsersList,
      complete: false,
      comments: []
    }
    
    await addDocument(project);
    if (!response.error) {
      navigate('/dashboard');
    }
  }

  return (
    <div className={`main-wrapper ${mode}`}>
      <form onSubmit={handleSubmit} className='create-form'>
        <h2>New Project</h2>

        {/* NAME */}
        <label>
          <span>Project Name:</span>
          <input 
            type="text" 
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        {/* DETAILS */}
        <label>
          <span>Project Details:</span>
          <textarea 
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>

        {/* DUE DATE */}
        <label>
          <span>Due Date:</span>
          <input 
            type="date" 
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>

        {/* PRIORITY */}
        <label className='prioritize'>
          <span>Prioritize:</span>
          <Switch isOn={priority} setIsOn={setPriority} />
        </label>

        {/* CATEGORY */}
        <label>
          <span>Category:</span>
          <Select 
            styles={mode === 'dark' ? customStyles : ''}
            options={categoryOptions}
            onChange={(option) => setCategory(option)}
          />
         </label>

        {/* ASSIGNED */}
        <label>
          <span>Assign:</span>
          <Select 
            styles={mode === 'dark' ? customStyles : ''}
            options={users}
            onChange={(option) => setAssigned(option)}
            isMulti
          />
        </label>

        <button className='btn' type="submit">Submit</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
}
