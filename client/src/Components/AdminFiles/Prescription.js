import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import '../../App.css';

const PrescriptionForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    Age:'',
    Date: '',
    medications: ''
  });

  const handleInputChange = (e) => {
    const { name } = e.target;
    const value = e.target.textContent || e.target.value; // Use textContent for contentEditable or value for input fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const downloadPDF = () => {
    const element = document.getElementById('prescription-container');
    html2pdf()
      .set({
        margin: 0,
        filename: 'Prescription.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: true
         },
        jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' },
      })
      .from(element)
      .save();
  };



  useEffect(() => {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get month (1-12) and pad with 0 if needed
    const day = currentDate.getDate().toString().padStart(2, '0'); // Get day (1-31) and pad with 0 if needed
    const year = currentDate.getFullYear(); // Get the full year (e.g., 2024)
    
    const formattedDate = `${day}/${month}/${year}`; // Format the date as MM/DD/YYYY
    setFormData((prevData) => ({
      ...prevData,
      Date: formattedDate, // Set the formatted date in the Date field
    }));
  }, []);

  return (
    <div className="prescription-form-container">
      <div id="prescription-container" className="prescription-image">
         
        {/* <p className='patient-name'>Name:</p> */}
         <div
          
          onInput={handleInputChange}
          name="patientName"
          placeholder="Patient Name"
          data-placeholder="Patient Name"
          className="input-field patient-name mt-3"
          suppressContentEditableWarning={true}>
          <span contentEditable="false">Name: </span>
          <span style={{width: "50%"}} contentEditable="true">{formData.patientName}</span>
        </div>
        <div
          
          onInput={handleInputChange}
          name="patientAge"
          placeholder="Age"
          data-placeholder="Patient Age"
          className="input-field patient-age mt-3"
          suppressContentEditableWarning={true}
        >
         <span contentEditable="false">Age:    </span>
         <span style={{width: "50%"}} contentEditable="true">{formData.Age}</span>
        </div>
        <div
          contentEditable="true"
          onInput={handleInputChange}
          name="date"
          value={formData.Date}
          placeholder="Date"
          data-placeholder="Date"
          className="input-field patient-date mt-3"
          suppressContentEditableWarning={true}
        >
          {formData.Date}
        </div>
        <div
          contentEditable="true"
          onInput={handleInputChange}
          name="medications"
          placeholder="Medications"
          data-placeholder="Medications"
          className="input-field medications"
          suppressContentEditableWarning={true}
        >
          {formData.medications}
        </div>
      </div>
      <button className="download-button" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default PrescriptionForm;