import React, { useState, useEffect } from 'react';
import './ConfirmationMessage.css'; // Create a CSS file for styling

const ConfirmationMessage = ( message:string, isVisible:boolean ) => {
  return (
    <div className={`confirmation-message ${isVisible ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default ConfirmationMessage;