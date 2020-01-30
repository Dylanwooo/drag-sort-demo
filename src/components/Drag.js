import React, {useState, useEffect} from 'react';
import {initialDragList} from './../constants';
let curIdx = '';
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
      {props.name}
    </div>
  );
}

function DragListComponent() {
  const [dragList, setDragList] = useState(initialDragList);

  const handleDropChange = (start, end) => {
    if (start !== end) {
      const removed = dragList.filter(val => val.index == start)[0];
      const bottom = dragList.indexOf(
        dragList.filter(val => val.index == end)[0]
      );
      let tempList = dragList.filter(val => val.index != start);
      tempList.splice(bottom, 0, removed);
      setDragList(tempList);
    }
  };

  return (
    <React.Fragment>
      {dragList.map((item, idx) => (
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
