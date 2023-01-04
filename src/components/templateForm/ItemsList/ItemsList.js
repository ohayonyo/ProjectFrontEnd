import React,{ useState } from 'react';
import './ItemsList.css';

function ItemsList({minValues, setMinValues, maxValues, setMaxValues}) {

  const names = ['a', 'b', 'c', 'd'];
  const minText = "ערך מינימאלי";
  const maxText = "ערך מקסימאלי";

  const handleMinChange = (index, event) => {
    const newMinValues = [...minValues];
    newMinValues[index] = event.target.value;
    setMinValues(newMinValues);
  };

  const handleMaxChange = (index, event) => {
    const newMaxValues = [...maxValues];
    newMaxValues[index] = event.target.value;
    setMaxValues(newMaxValues);
  };

  return (
    <div dir="rtl" style={{ width: '800px', height: '500px' }}>
      {names.map((name, index) => (
        <div className="list-item">
          <p>{name}:פרמטר</p>

          <div>
            <label for="min">{minText}</label>
            <input type="number" id="min" placeholder={0} step={0.01} onChange={(event) => handleMinChange(index, event)} />
          </div>

          <div>
            <label for="max">{maxText}</label>
            <input type="number" id="max" placeholder={0} step={0.01} onChange={(event) => handleMaxChange(index, event)} />
          </div>
        </div>
       ))}
    </div>
  );
}

export default ItemsList;