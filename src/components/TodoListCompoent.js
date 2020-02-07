import React, {useState, useEffect} from 'react';
import {initialDragList} from '../constants';
import {useStore} from './../storeProvider';
let curIdx = '';

function getRandomColor() {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16);
}

function DraggableItem(props) {
  useEffect(() => {
    const {id, onDrogChange, onStartDragChange} = props;
    const targetEle = document.getElementById(id);

    targetEle.addEventListener(
      'dragstart',
      function(event) {
        curIdx = event.target.id;
        // onStartDragChange(curIdx);
      },
      false
    );

    // in order to fire drop event
    targetEle.addEventListener(
      'dragover',
      function(event) {
        // prevent default to allow drop
        event.preventDefault();
      },
      false
    );

    targetEle.addEventListener(
      'dragenter',
      function(event) {
        const dragged = event.target;
        dragged.style.transform = 'scale(1.1)';
      },
      false
    );
    targetEle.addEventListener(
      'dragleave',
      function(event) {
        const dragged = event.target;
        dragged.style.transform = 'scale(1)';
      },
      false
    );
    targetEle.addEventListener(
      'drop',
      function(event) {
        event.preventDefault();
        const dragged = event.target;
        dragged.style.transform = 'scale(1)';
        onDrogChange(curIdx, event.target.id);
      },
      false
    );
  }, []);

  return (
    <div className="drag-wrapper" draggable={true} id={props.id}>
      {`${props.id}. `}
      {props.name}
    </div>
  );
}

function DragListComponent() {
  const {state, dispatch} = useStore();

  const handleDropChange = (start, end) => {
    if (start !== end) {
      const removed = state.filter(val => val.index == start)[0];
      const bottom = state.indexOf(state.filter(val => val.index == end)[0]);
      let tempList = state.filter(val => val.index != start);
      tempList.splice(bottom, 0, removed);
      dispatch({type: 'UPDATE', payload: tempList});
    }
  };

  return (
    <React.Fragment>
      {state.map((item, idx) => (
        <DraggableItem
          key={idx}
          id={item.index}
          name={item.name}
          onDrogChange={(start, end) =>
            handleDropChange(parseInt(start), parseInt(end))
          }
        />
      ))}
    </React.Fragment>
  );
}

export default DragListComponent;
