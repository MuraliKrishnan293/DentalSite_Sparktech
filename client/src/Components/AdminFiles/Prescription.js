import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import '../../App.css';

const PrescriptionForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    medications: '',
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' }, // A4 in px
      })
      .from(element)
      .save();
};


  return (
    <div className="prescription-form-container">
      <div id="prescription-container" className="prescription-image">
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleInputChange}
          className="input-field patient-name"
        />
        <textarea
          name="medications"
          placeholder="Medications"
          value={formData.medications}
          onChange={handleInputChange}
          className="input-field medications"
        />
        {/* Add more input fields as needed */}
      </div>
      <button className="download-button" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default PrescriptionForm;