import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import logo from "../images/logo1.jpeg";

const UserBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          "https://dentalsite-sparktech-2.onrender.com/app/user-bills", // Update with your API endpoint
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setBills(response.data.bills);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBills();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePrint = (billId) => {
    const billElement = document.getElementById(`bill-${billId}`);
    if (billElement) {
      const printStyles = `
        @media print {
          body * {
            visibility: hidden;
          }
          #bill-${billId}, #bill-${billId} * {
            visibility: visible;
          }
          #bill-${billId} {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `;

      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = printStyles;
      document.head.appendChild(styleSheet);

      window.print();
      document.head.removeChild(styleSheet);
    }
  };

  return (
    <div className="p-5" style={{ marginTop: "100px" }}>
      <h2>Your Bills</h2>
      {bills.length > 0 ? (
        <MDBContainer>
          <MDBRow>
            {bills.map((bill, index) => (
              <MDBCol key={index} md="6" sm="6" xs="12" className="mb-4">
                <MDBCard id={`bill-${bill.appointmentId}`} className="bill-card h-100">
                  <MDBCardBody className="mx-3">
                    <MDBContainer>
                      <img
                        className="text-start w-100 float-start d-flex"
                        src={logo}
                        alt="logo"
                      />
                      <h2 className="text-center">INVOICE</h2>
                      <h6 className="text-black text-end mb-4">
                        {bill.bookdate}
                      </h6>
                      <div>
                <span className="d-flex">
                <p className="text-start">Name:&nbsp;</p>
                <p className="text-start">{bill.name}</p></span>

                <span className="d-flex">
                <p className="text-start">Date:&nbsp;</p>
                <p className="text-start">{bill.date}</p></span>

                <span className="d-flex">
                <p className="text-start">Time:&nbsp;</p>
                <p className="text-start">{bill.time}</p></span>

                <span className="d-flex">
                <p className="text-start">Location:&nbsp;</p>
                <p className="text-start" style={{textTransform: "capitalize"}}>{bill.location}</p></span>
                </div>
                      {/* <div>
                        <p>
                          <strong>Name:</strong> {bill.name}
                        </p>
                        <p>
                          <strong>Date:</strong> {bill.date}
                        </p>
                        <p>
                          <strong>Time:</strong> {bill.time}
                        </p>
                        <p style={{ textTransform: "capitalize" }}>
                          <strong>Location:</strong> {bill.location}
                        </p>
                      </div> */}
                      <hr />
                      <div className="d-flex text-end mt-2"><span  style={{ width: "100%" }} className="d-flex justify-end">
                    <p className="w-100 text-end">Appointment ID</p>
                  
                    <p className="w-100 text-end">{bill.appointmentId}</p>
                 </span></div>
                      <hr />
                      <div className="d-flex text-end mt-2"><span  style={{ width: "100%" }} className="d-flex justify-end">
                    <p className="w-100 text-end">Payment ID</p>
                  
                    <p className="w-100 text-end">{bill.paymentId}</p>
                 </span></div>
                 <hr />
                 <div className="d-flex text-end mt-2"><span  style={{ width: "100%" }} className="d-flex justify-end">
                    <p className="w-100 text-end">Amount Paid:</p>
                  
                    <p className="w-100 text-end"> ₹{bill.amount / 100}</p>
                 </span></div>
                      
                      <hr style={{ border: "2px solid black" }} />
                      <p className="text-end fw-bold">
                        Total: ₹{bill.amount / 100}
                      </p>
                      <div className="text-center mt-4">
                        <button
                          className="btn btn-primary"
                          onClick={() => handlePrint(bill.appointmentId)}
                        >
                          Print Receipt
                        </button>
                        <p className="mt-2 text-muted">
                          Thank you for choosing our services!
                        </p>
                      </div>
                    </MDBContainer>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
          <style>
{`
  @media print {
    body {
      margin: 0; /* Remove body margins */
      padding: 0; /* Remove body padding */
      overflow: hidden; /* Prevent content overflow */
    }
    @page {
      size: auto; /* Let the browser handle the page size */
      margin: 0; /* Remove default margins */
    }

    .navbar, header, footer, .url-container, .btn {
      display: none; /* Hide unnecessary elements like navbar, footer, and buttons */
    }

    .print-container, .print-container * {
      visibility: visible;
    }
    .print-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      max-width: 800px; /* Adjust as needed */
      height: auto; /* Ensure content does not extend beyond the page */
      transform: translate(0%, 0%);
    }
  }
`}
</style>

        </MDBContainer>
      ) : (
        <p>No bills found</p>
      )}
    </div>
  );
};

export default UserBills;