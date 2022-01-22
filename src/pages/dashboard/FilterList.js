// styles
import './FilterList.css';

const filterList = ['all', 'mine', 'cleaning', 'shopping', 'chores', 'errands', 'relax', 'social', 'incomplete', 'complete', 'priority'];

export default function FilterList({ currentFilter, changeFilter }) {

  const handleClick = (newFilter) => {
    changeFilter(newFilter)
  }

  return (
    <div className='filter'>
      <ul className='filter-list'>
        {filterList.map((filter, i) => (
          <li key={i}>
            <button 
              onClick={() => handleClick(filter)} 
              className={`filter-btn ${filter === currentFilter ? 'filter-active' : ''}`}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>      
    </div>
  );
}
