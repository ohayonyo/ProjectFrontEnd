import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './MyRange.css'; // Import custom CSS for styling

export const MyRange = ({ paramName, ranges, setRanges, index }) => {
  const range = ranges[index];

  const maxRange = 20;
  const minRange = -20;
  const step = 1;

  const marks = {};
  const totalSections = 10;
  const minorSections = 5;

  for (let i = minRange; i <= maxRange; i += step) {
    if (i % (totalSections * step) === 0) {
      marks[i] = i;
    } else if (maxRange > 30 && i % (step * minorSections) === 0) {
      marks[i] = '';
    }
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

  return (
    <div className="range-container" style={{ marginTop: 100, width: '50%' }}>
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
        <label style={{ fontSize: '30px', fontWeight: 'bold' }}>{paramName}:</label> {range[0]} -> {range[1]}
      </div>
    </div>
  );
};