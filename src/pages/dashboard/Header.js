import { useState } from 'react';

// components
import Switch from '../../components/Switch';
import CircleProgress from './CircleProgress';
import FilterList from './FilterList';

// styles
import './Header.css';

export default function Header({ percentage, currentFilter, changeFilter}) {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className='dashboard-header'>
      <div className='dashboard-general-info'>
        <h1>Dashboard</h1>
        <Switch isOn={isOn} setIsOn={setIsOn} purpose="mode" />
        <CircleProgress percentage={percentage} />
      </div>
      <FilterList currentFilter={currentFilter} changeFilter={changeFilter} />
    </div>
  );
}
