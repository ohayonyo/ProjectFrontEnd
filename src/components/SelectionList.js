import React, { useState } from 'react';
import '../css/SelectionList.css';

function SelectionList() {
  const [selectedValue, setSelectedValue] = useState('');
  const options = [
    { value: 'Option 1', imageUrl: 'https://example.com/option1.png' },
    { value: 'Option 2', imageUrl: 'https://example.com/option2.png' },
    { value: 'Option 3', imageUrl: 'https://example.com/option3.png' },
  ];

  return (
    <div className="selection-list">
      <label htmlFor="options" className="selection-list__label">
        Select an option:
      </label>
      <select
        id="options"
        name="options"
        className="selection-list__select"
        value={selectedValue}
        onChange={(event) => setSelectedValue(event.target.value)}
      >
        <option value="" disabled>
          Choose an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            <img src={option.imageUrl} alt={option.value} className="selection-list__option-image" />
            {option.value}
            <div className="selection-list__option-actions">
              <button className="selection-list__option-action selection-list__option-action--approve">Approve</button>
              <button className="selection-list__option-action selection-list__option-action--decline">Decline</button>
            </div>
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectionList;