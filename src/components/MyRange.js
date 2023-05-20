import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './MyRange.css'; // Import custom CSS for styling

export const MyRange = ({ paramName, ranges, setRanges, index }) => {
  const range = ranges[index];

  const [minRange, setMinRange] = useState(-20);
  const [maxRange, setMaxRange] = useState(20);
  const step = 1;

  const marks = {};

  const sectionSize = (maxRange - minRange) / 4; // Divide the range into 4 sections

  for (let i = 0; i < 5; i++) {
    const value = minRange + i * sectionSize;
    marks[value] = value;
  }

  const railStyle = {
    backgroundColor: '#e9e9e9',
    height: '8px',
    borderRadius: '4px'
  };

  const trackStyle = {
    backgroundColor: '#6a91e2',
    height: '8px',
    borderRadius: '4px'
  };

  const handleStyle = {
    borderColor: '#6a91e2',
    height: '18px',
    width: '18px',
    marginLeft: '-9px',
    marginTop: '-6px',
    backgroundColor: 'white',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
  };

  const handleChange = (values) => {
    const updatedRanges = [...ranges];
    updatedRanges[index] = values;
    setRanges(updatedRanges);
  };

  const handleExpandMinRange = () => {
    setMinRange(minRange - 10);
  };

  const handleExpandMaxRange = () => {
    setMaxRange(maxRange + 10);
  };

  return (
    <div className="range-container" style={{ marginTop: 70, width: '50%' }}>
      <div className="expand-buttons">
        <button className="expand-button expand-button-left" onClick={handleExpandMinRange}>
          -
        </button>
        <button className="expand-button expand-button-right" onClick={handleExpandMaxRange}>
          +
        </button>
      </div>
      <Slider
        range
        min={minRange}
        max={maxRange}
        step={step}
        value={range}
        onChange={handleChange}
        railStyle={railStyle}
        trackStyle={trackStyle}
        handleStyle={handleStyle}
        marks={marks}
      />
      <div className="value">
        <label style={{ fontSize: '34px', fontWeight: 'bold' }}>{paramName}:</label> {range[0]} -> {range[1]}
      </div>
    </div>
  );
};