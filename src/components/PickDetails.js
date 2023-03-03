import React, { useState } from 'react';
import '../css/openclass.css';

const PickDetails = () => {
  const thisURL = window.location.href;
  const splits = thisURL.split('/');
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [dueDate, setDueDate] = useState(new Date());

  const handleFinishUnit = () => {
    window.location.href = `http://${splits[2]}/${splits[3]}/${splits[4]}/classUnits`;
  };

  const handleAddExercise = () => {
    window.location.href = `http://${splits[2]}/${splits[3]}/${splits[4]}/openUnit/${name}/data`;
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '5px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid gray',
    width: '100%',
    color: 'black'
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    background: 'blue',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
      </label>
      <label>
        Time Limit:
        <input type="number" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} style={inputStyle} />
      </label>
      <label>
        Due Date:
        <input type="datetime-local" value={dueDate.toISOString().slice(0, 16)} onChange={(e) => setDueDate(new Date(e.target.value))} style={inputStyle} />
      </label>
      <button onClick={handleFinishUnit} style={buttonStyle}>Finish Unit</button>
      <button onClick={handleAddExercise} style={buttonStyle}>Add Another Exercise</button>
    </div>
  );
};

export default PickDetails;
