import { useState } from 'react';

import { formatTimer } from '../helpers/actions';

const Header = ({ onAddTask }) => {
  const [value, setValue] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const inputChange = (e) => {
    setValue(e.target.value);
  };

  const inputMin = (e) => {
    const minutes = e.target.value.replace(/\D/g, '');
    setMin(minutes);
  };

  const inputSec = (e) => {
    let seconds = e.target.value.replace(/\D/g, '');
    if (seconds > 59) seconds = 59;
    setSec(seconds);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const timer = formatTimer(min + ':' + sec);
    const timerType = timer === '00:00' ? 'increase' : 'decrease';
    onAddTask(value, timer, timerType);

    setValue('');
    setMin('');
    setSec('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={formSubmit}>
        <input name="title" type="text" className="new-todo" placeholder="Task" onChange={inputChange} value={value} />
        <input
          name="min"
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={inputMin}
          value={min}
          autoComplete="off"
          maxLength="2"
        />
        <input
          name="sec"
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={inputSec}
          value={sec}
          autoComplete="off"
          maxLength="2"
        />
        <button type="submit" />
      </form>
    </header>
  );
};

export default Header;
