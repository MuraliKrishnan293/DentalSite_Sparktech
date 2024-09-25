import React from 'react';

const PrintDemo = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Print Demo Page</h1>
      <div id="printSection" style={{ padding: '20px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginBottom: '20px' }}>
        <h2>Content to Print</h2>
        <p>This content will be printed when you click the print button.</p>
      </div>
      
      <button 
        onClick={handlePrint} 
        style={{ 
          padding: '10px 15px', 
          backgroundColor: '#2A4735', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer', 
          fontSize: '16px' 
        }}
      >
        Print this section
      </button>

      {/* Optional: Custom styles for printing */}
      <style>
        {`
          @media print {
            button {
              display: none; /* Hide the button when printing */
            }
          }
        `}
      </style>
    </div>
  );
};

export default PrintDemo;
