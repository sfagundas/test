import React from 'react';

const SimpleContent = ({ title, description}) => {

    return (
    <>
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
    </>
 );
};

export default SimpleContent;