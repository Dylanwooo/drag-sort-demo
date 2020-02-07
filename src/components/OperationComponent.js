import React, {useState} from 'react';
import {useStore} from './../storeProvider';
function OperationComponent() {
  const {dispatch} = useStore();
  const [input, setInput] = useState('');

  function onInputChange(e) {
    setInput(e.target.value);
  }

  function onHandleInput() {
    if (input === '') {
      alert('please input your goal today!');
    } else {
      dispatch({type: 'ADD_ITEM', payload: input});
      setInput('');
    }
  }
  return (
    <div className="operate-wrapper">
      <input
        className="input-wrap"
        onChange={e => onInputChange(e)}
        value={input}
      />
      <div className="add-btn" onClick={() => onHandleInput()}>
        +
      </div>
    </div>
  );
}

export default OperationComponent;
