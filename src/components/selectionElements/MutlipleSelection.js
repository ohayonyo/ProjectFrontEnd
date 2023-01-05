import React from 'react';

import Select from 'react-select';


export default ({options}) => (

  
  
  <Select
    // defaultValue={[colourOptions[2], colourOptions[3]]}
    isMulti
    name="colors"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    isDisabled={false}
    isLoading={false}
    isClearable={true}
    isRtl={true}
    isSearchable={true}
  />
);