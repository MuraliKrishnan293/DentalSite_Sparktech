import React from "react";
import { useLocation } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import logo from "../images/logo1.jpeg";

const Confirmation = () => {
  const location = useLocation();

  const appointmentId = location.state?.appointmentId;
  const paymentId = location.state?.razorpay_payment_id;
  const amount = location.state?.amount;
  const name = location.state?.name;
  const date = location.state?.date;
  const time = location.state?.time;
  const location1 = location.state?.location;

  return (
    // <div style={{ paddingTop: "100px", textAlign: "center" }}>
    //   <h1>Payment Successful!</h1>
    //   <h3>Your appointment is confirmed</h3>
    //   <div>
    //     <p>Appointment ID: {appointmentId}</p>
    //     <p>Payment ID: {paymentId}</p>
    //     <p>Amount Paid: ₹{amount / 100}</p>
    //   </div>
    //   <button onClick={() => window.print()}>Print Receipt</button>
    // </div>

    <>
      <MDBContainer className="py-5" style={{ marginTop: "100px" }}>
        <div className="print-container">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <MDBContainer>
                <img
                  className="text-start w-100 float-start d-flex"
                  src={logo}
                  alt="logo"
                />
                <br />
                {"\n"}
                <h2 className="text-center">
                  INVOICE
                </h2>
                <h6 className="text-black text-end mb-5">
                  {new Date().toLocaleDateString()}
                </h6>
                <div>
                <span className="d-flex">
                <p className="text-start">Name:&nbsp;</p>
                <p className="text-start">{name}</p></span>

                <span className="d-flex">
                <p className="text-start">Date:&nbsp;</p>
                <p className="text-start">{date}</p></span>

                <span className="d-flex">
                <p className="text-start">Time:&nbsp;</p>
                <p className="text-start">{time}</p></span>

                <span className="d-flex">
                <p className="text-start">Location:&nbsp;</p>
                <p className="text-start" style={{textTransform: "capitalize"}}>{location1}</p></span>
                </div>
                {/* <hr /> */}
                <hr />
                <div className="d-flex text-end mt-2"><span  style={{ width: "100%" }} className="d-flex justify-end">
                    <p className="w-100 text-end">Payment ID</p>
                  
                    <p className="w-100 text-end">{paymentId}</p>
                 </span></div>

                <hr />
                <div className="d-flex text-end mt-2"><span  style={{ width: "100%" }} className="d-flex justify-end">
                    <p className="w-100 text-end">Amount Paid</p>
                  
                    <p className="w-100 text-end">₹{amount / 100}</p>
                 </span></div>
                <hr style={{ border: "2px solid black" }} />

                <MDBRow className="text-black">
                  <MDBCol xl="12">
                    <p className="float-end fw-bold">Total: ₹{amount / 100}</p>
                  </MDBCol>
                </MDBRow>
                <hr style={{ border: "2px solid black" }} />
                <div className="text-center" style={{ marginTop: "50px" }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => window.print()}
                  >
                    Print Receipt
                  </button>
                  <p className="mt-3 text-muted">
                    Thank you for choosing our services!
                  </p>
                </div>
              </MDBContainer>
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>

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
              left: 0;
              top: 0;
              transform: translate(0%, 0%);
    width: 100%;
    max-width: 800px;
            }
            @page {
    margin: 0;
  }
  body {
    margin: 0;
  }

  /* Hide navbar and URL */
  .navbar, header, footer, .url-container {
    display: none;
  }
          }
        `}
      </style>
    </>
  );
};

export default Confirmation;
