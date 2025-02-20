import React, { useEffect, useState } from "react";
import logo from "../images/logo1.jpeg";

const App = () => {
  const [name, setName] = useState("");
  const [billCharges, setBillCharges] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const [lastReceiptId, setLastReceiptId] = useState(0);

  const saveLastReceiptId = async (newReceiptId) => {
    try {
      const response = await fetch("https://dentalsite-sparktech-2.onrender.com/app/update-last-receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ lastReceipt: newReceiptId }),
      });
  
      if (!response.ok) throw new Error("Failed to update receipt ID");
  
      console.log("Receipt ID updated in DB:", newReceiptId);
    } catch (error) {
      console.error("Error saving receipt ID:", error);
    }
  };
  

const fetchLastReceiptId = async () => {
  try {
    //https://dentalsite-sparktech-2.onrender.com
    const response = await fetch("https://dentalsite-sparktech-2.onrender.com/app/get-last-receipt",{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    const data = await response.json();
    const lastId = data.lastReceipt || 0;

    setLastReceiptId(lastId);
    
    // Initialize the first payment with the correct receipt ID
    setPayments([{ date: "", receipt: lastId + 1, payment: "", appliedAmount: "" }]);
  } catch (error) {
    console.error("Error fetching last receipt ID:", error);
  }
};

const clearIt = ()=>{
  setName("");
  setBillCharges([]);
  setPayments([]);
  setShowBill(false);
}


  // const handleAddCharge = () => {
  //   setBillCharges([...billCharges, { name: "", performed: "", amount: "", units: "", netAmount: "" }]);
  // };



  const handleAddCharge = () => {
    const newCharges = [...billCharges, { name: "", performed: "", amount: "", units: "", netAmount: "" }];
    setBillCharges(newCharges);
    updateTotalNetAmount(newCharges);
  };
  

  const handleAddPayment = () => {
    if (payments.length === 0) {
      // If no payments exist, start with a new receipt ID
      setPayments([{ date: "", receipt: lastReceiptId + 1, payment: "", appliedAmount: "" }]);
    } else {
      // Use the same receipt ID for additional payments in the same bill
      setPayments([...payments, { date: "", receipt: payments[0].receipt, payment: "", appliedAmount: "" }]);
    }
  };
  
  

  // const handleInputChange = (index, list, field, value) => {
  //   const updatedList = [...list];
  //   updatedList[index][field] = value;
  //   if (list === billCharges) setBillCharges(updatedList);
  //   else setPayments(updatedList);
  // };



  // const handleInputChange = (index, list, field, value) => {
  //   const updatedList = [...list];
  //   updatedList[index][field] = value;
  
  //   if (list === billCharges) {
  //     if (field === "amount" || field === "units") {
  //       const amount = parseFloat(updatedList[index].amount || 0);
  //       const units = parseFloat(updatedList[index].units || 0);
  //       updatedList[index].netAmount = (amount * units).toFixed(2);
  //     }
  //     setBillCharges(updatedList);
  //   } else {
  //     setPayments(updatedList);
  //   }
  // };



  const updateTotalNetAmount = (charges) => {
    const total = charges.reduce((sum, charge) => sum + (parseFloat(charge.netAmount) || 0), 0);
  
    setPayments((prevPayments) => {
      if (prevPayments.length > 0) {
        const updatedPayments = [...prevPayments];
        updatedPayments[0].payment = total.toFixed(2);
        return updatedPayments;
      }
      return [{ date: "", receipt: lastReceiptId + 1, payment: total.toFixed(2), appliedAmount: "" }];
    });
  };
  



  const handleInputChange = (index, list, field, value) => {
    const updatedList = [...list];
    updatedList[index][field] = value;
  
    if (list === billCharges) {
      if (field === "amount" || field === "units") {
        const amount = parseFloat(updatedList[index].amount || 0);
        const units = parseFloat(updatedList[index].units || 0);
        updatedList[index].netAmount = (amount * units).toFixed(2);
      }
      setBillCharges(updatedList);
  
      // Recalculate the total net amount
      updateTotalNetAmount(updatedList);
    } else {
      setPayments(updatedList);
    }
  };
  
  

  // const handleSubmit = () => {
  //   setShowBill(true);
  // };
  const handleSubmit = () => {
    setShowBill(true);
    const newReceiptId = lastReceiptId + 1;
  
    setLastReceiptId(newReceiptId);
    setPayments((prevPayments) =>
      prevPayments.map((payment, index) =>
        index === 0 ? { ...payment, receipt: newReceiptId } : payment
      )
    );
  
    // Save receipt ID in DB
    saveLastReceiptId(newReceiptId);
  };
  
  

  // const printBill = () => {
  //   window.print();
  // };



  const printBill = () => {
    window.print();
    const newReceiptId = lastReceiptId + 1;
  
    setLastReceiptId(newReceiptId);
    setPayments((prevPayments) =>
      prevPayments.map((payment, index) =>
        index === 0 ? { ...payment, receipt: newReceiptId } : payment
      )
    );
  
    // Save receipt ID in DB
    saveLastReceiptId(newReceiptId);
  };
  



  useEffect(() => {
    fetchLastReceiptId();
  }, []);
  

  // const fetchLastReceiptId = async () => {
  //   try {
  //     const response = await fetch("https://dentalsite-sparktech-2.onrender.com/get-last-receipt");
  //     const data = await response.json();
  //     const lastReceiptId = data.lastReceipt || 0;
      
  //     setPayments([{ date: "", receipt: lastReceiptId + 1, payment: "", appliedAmount: "" }]);
  //   } catch (error) {
  //     console.error("Error fetching last receipt ID:", error);
  //   }
  // };
  

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      {/* Form Section */}
      <h2 style={{ textAlign: "center", color: "#2A4735", marginBottom: "20px" }}>Bill Form</h2>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
          Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        />
      </div>

      {/* Bill Charges Section */}
      <h3 style={{ color: "#2A4735", marginBottom: "10px" }}>Bill Charges</h3>
      {billCharges.map((charge, index) => (
        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Charge Name"
            value={charge.name}
            onChange={(e) => handleInputChange(index, billCharges, "name", e.target.value)}
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <input
            type="text"
            placeholder="Performed Doctor"
            value={charge.performed}
            onChange={(e) => handleInputChange(index, billCharges, "performed", e.target.value)}
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={charge.amount}
            onChange={(e) => handleInputChange(index, billCharges, "amount", e.target.value)}
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <input
            type="number"
            placeholder="Units"
            value={charge.units}
            onChange={(e) => handleInputChange(index, billCharges, "units", e.target.value)}
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <input
            type="number"
            placeholder="Net Amount"
            value={charge.netAmount}
            onChange={(e) => handleInputChange(index, billCharges, "netAmount", e.target.value)}
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>
      ))}
      <button
        onClick={handleAddCharge}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2A4735",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Charge
      </button>

      {/* Payments Section */}
      <h3 style={{ color: "#2A4735", marginTop: "20px", marginBottom: "10px" }}>Payments</h3>
      {payments.map((payment, index) => (
        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="date"
            value={payment.date}
            onChange={(e) => handleInputChange(index, payments, "date", e.target.value)}
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <input
            type="text"
            placeholder="Receipt"
            value={payment.receipt}
            onChange={(e) => handleInputChange(index, payments, "receipt", e.target.value)}
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <input
            type="number"
            placeholder="Payment Amount"
            value={payment.payment}
            onChange={(e) => handleInputChange(index, payments, "payment", e.target.value)}
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <input
            type="number"
            placeholder="Applied Amount"
            value={payment.appliedAmount}
            onChange={(e) => handleInputChange(index, payments, "appliedAmount", e.target.value)}
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>
      ))}
      <button
        onClick={handleAddPayment}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2A4735",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Payment
      </button>

      {/* Submit Button */}
      <div className="d-flex gap-3">
      <button
        onClick={handleSubmit}
        style={{
          display: "block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#2A4735",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit & Show Bill
      </button>
      <button
        onClick={clearIt}
        style={{
          display: "block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#2A4735",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>
      </div>

      {/* Display Styled Bill */}
      {showBill && (
        <div className="print-container"
          style={{
            marginTop: "40px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
            <img
                  className="text-start w-100 float-start d-flex"
                  src={logo}
                  alt="logo"
                />
                <hr className="mt-5" style={{border: "4px solid #2A4735"}} />
          <h2 className="mt-5" style={{ textAlign: "center", color: "#2A4735", marginBottom: "20px" }}>Bill Details</h2>
          <h4>Name: {name}</h4>
          <h3 className="mt-5" style={{ color: "#2A4735" }}>Bill Charges</h3>
          <table className="table table-striped table-bordered" style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>#</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Performed Doctor</th>
                <th style={tableHeaderStyle}>Amount (INR)</th>
                <th style={tableHeaderStyle}>Units</th>
                <th style={tableHeaderStyle}>Net Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              {billCharges.map((charge, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{charge.name}</td>
                  <td style={tableCellStyle}>{charge.performed}</td>
                  <td style={tableCellStyle}>{charge.amount}</td>
                  <td style={tableCellStyle}>{charge.units}</td>
                  <td style={tableCellStyle}>{charge.netAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="mt-5 pt-5" style={{ color: "#2A4735" }}>Payments</h3>
          <table className="table table-striped table-bordered" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>#</th>
                <th style={tableHeaderStyle}>Date</th>
                <th style={tableHeaderStyle}>Receipt</th>
                <th style={tableHeaderStyle}>Payment</th>
                <th style={tableHeaderStyle}>Applied Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{payment.date}</td>
                  <td style={tableCellStyle}>{payment.receipt}</td>
                  <td style={tableCellStyle}>{payment.payment}</td>
                  <td style={tableCellStyle}>{payment.appliedAmount}</td>
                </tr>
              ))}
              <tr>
  <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
  <td style={tableCellStyle}>
    {payments.reduce((sum, payment) => sum + (parseFloat(payment.payment) || 0), 0)}
  </td>
  <td style={tableCellStyle}>
    {payments.reduce((sum, payment) => sum + (parseFloat(payment.appliedAmount) || 0), 0)}
  </td>
</tr>

            </tbody>
          </table>
        </div>
      )}
      
      {showBill && (
        <button
          onClick={printBill}
          style={{
            display: "block",
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#2A4735",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Print Bill
        </button>
      )}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-container, .print-container * {
              visibility: visible;
            }
            
            .print-container {
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 1200px;
    border: none !important;
  }
  @page {
    margin: 0;
  }
  body {
  border: 0px solid transparent;
    margin: 0;
  }


  /* Hide navbar and URL */
  .navbar, header, footer, .url-container {
    display: none;
  }
          }
        `}
      </style>
    </div>
  );
};

const tableHeaderStyle = {
  padding: "10px",
  borderBottom: "2px solid #ccc",
  backgroundColor: "#f0f0f0",
  textAlign: "left",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ccc",
};

export default App;