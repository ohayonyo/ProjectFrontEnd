import React, { useState } from 'react';
import '../css/SelectionListForm.css'; // You can include your own professional CSS styles here

const SelectionListForm = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsPage, setShowDetailsPage] = useState(false);

  // This is an example list of items that the user can select from
  const items = [
    {
      id: 1,
      name: 'Item 1',
    },
    {
      id: 2,
      name: 'Item 2',
    },
    {
      id: 3,
      name: 'Item 3',
    },
  ];

  // This function is called when the user selects an item from the list
  const handleItemSelection = (item) => {
    setSelectedItem(item);
    setShowDetailsPage(true);
  };

  // This function is called when the user goes back to the list page
  const handleBackToList = () => {
    setSelectedItem(null);
    setShowDetailsPage(false);
  };

  return (
    <div className="App">
      {/* Render the list page if showDetailsPage is false */}
      {!showDetailsPage && (
        <div className="list-page">
          <h1>Please select an item:</h1>
          <ul>
            {items.map((item) => (
              <li key={item.id} onClick={() => handleItemSelection(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Render the details page if showDetailsPage is true */}
      {showDetailsPage && (
        <div className="details-page">
          <h1>Please enter the details for {selectedItem.name}:</h1>
          <form>
            {/* Add form fields for the details here */}
            <button type="submit">Submit</button>
            <button onClick={handleBackToList}>Back to List</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SelectionListForm;