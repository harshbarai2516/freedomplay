// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import axios from "axios";
// import "react-calendar/dist/Calendar.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Account3D = () => {
//   const navigate = useNavigate();

//   const [fromDate, setFromDate] = useState(new Date());
//   const [toDate, setToDate] = useState(new Date());
//   const [showFromCalendar, setShowFromCalendar] = useState(false);
//   const [showToCalendar, setShowToCalendar] = useState(false);

//   const [accountData, setAccountData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Format date to YYYY-MM-DD
//   const formatDate = (d) => {
//     const day = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year = d.getFullYear();
//     return `${year}-${month}-${day}`;
//   };

//   const handleFromDateChange = (newDate) => {
//     setFromDate(newDate);
//     setShowFromCalendar(false);
//     setShowToCalendar(false);
//   };

//   const handleToDateChange = (newDate) => {
//     setToDate(newDate);
//     setShowToCalendar(false);
//     setShowFromCalendar(false);
//   };

//   // ---------------------------------------------------------
//   // ⭐ UPDATED API CALL (WORKING VERSION)
//   // ---------------------------------------------------------
//   const fetchAccountHistory = async (auto = false) => {
//     setLoading(true);
//     setError("");
//     if (!auto) setAccountData(null);

//     const username = localStorage.getItem("username");
//     const token = localStorage.getItem("token");

//     if (!username) {
//       setError("⚠️ Username missing. Please login again.");
//       setLoading(false);
//       return;
//     }

//     const payload = {
//       from_date: formatDate(fromDate),
//       to_date: formatDate(toDate),
//       username: username.trim(),
//     };

//     try {
//       const res = await axios.post(
//         "https://freedomplay.us/api/Threedreport/accountHistory",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.status === 200 && res.data?.ok) {
//         const d = res.data.data?.[0];

//         if (!d) {
//           setError("No data found.");
//         } else {
//           // MAP NEW API RESPONSE TO OLD UI FORMAT
//           setAccountData({
//             username: d.username.trim(),
//             summary: {
//               Amount: d.Amount,
//               Win_Amount: d.Win_Amount,
//               Commission: d.Commission,
//               nettopay: d.nettopay,
//             },
//           });
//         }
//       } else {
//         setError("No data found.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong while fetching data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAccountHistory(true);
//   }, []);

//   // ------------------ CUSTOM PRINT ------------------
// //   const handleCustomPrint = () => {
// //     if (!accountData) {
// //       alert("No data to print");
// //       return;
// //     }

// //     const printContent = `
// // 3D Game
// // --------------------------------------------------------
// // FromDate: ${formatDate(fromDate)}
// // ToDate: ${formatDate(toDate)}
// // UserName : ${accountData.username}
// // Total Pay : ${accountData.summary?.Amount}
// // Total Win : ${accountData.summary?.Win_Amount}
// // User Comission : ${accountData.summary?.Commission}
// // Net To Pay : ${accountData.summary?.nettopay}
// // --------------------------------------------------------
// // `;

// //     const printWindow = window.open("", "_blank", "width=600,height=600");
// //     printWindow.document.write(`
// //       <pre style="font-size:20px; font-family: monospace;">
// // ${printContent}
// //       </pre>
// //     `);
// //     printWindow.document.close();
// //     printWindow.print();
// //   };

// const handleCustomPrint = () => {
//   if (!accountData) {
//     alert("No data to print");
//     return;
//   }

//   // Parse rows just like Print.jsx
//   const tickets = accountData.tck_result
//     ? accountData.tck_result.split(",").map(t => t.trim())
//     : [];

//   const rows = [];
//   if (tickets.length === 1) {
//     rows.push(tickets.slice(0, 1));
//   } else {
//     for (let i = 0; i < tickets.length; i += 3) {
//       rows.push(tickets.slice(i, i + 3));
//     }
//   }

//   const printData = {
//     mainhead: "1x Bet",
//     header: "FOR AMUSEMENT ONLY, 3series",
//     subhead: "(Ticket valid for 10 days)",
//     rows,

//     drawTime: accountData.nxt_draw || accountData.draw_time || "",
//     selectedTime: new Date().toLocaleString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       hour12: true,
//       weekday: "short",
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit"
//     }),

//     username: accountData.username,
//     quantity: accountData.summary?.qty || "0",
//     amount: accountData.summary?.Amount || "0",
//     barcode: accountData.barcode || "0",
//   };

//   const printWindow = window.open("", "_blank", "width=400,height=600");
//   if (!printWindow) return;

//   printWindow.document.write(`
// <html>
// <head>
// <title>Print Ticket</title>

// <style>
//   @media print {
//     @page {
//       size: 80mm auto;
//       margin: 1mm;
//     }
//     html, body {
//       padding: 0;
//       margin: 0;
//       width: 70mm;
//       font-family: monospace;
//       font-size: 11px;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }
//   body { width: 70mm; font-family: monospace; font-size: 11px; }
//   .ticket { width: 70mm; padding: 1mm; }
//   .header { font-weight: bold; margin-left: 25px; margin-bottom: 1mm; }
//   .draw-line { font-weight: bold; margin-left: 20px; margin-bottom: 2mm; }
//   table { width: 70%; margin-left: 16px; text-align: center; font-size: 11px; }
//   th, td { font-weight: bold; padding: 0; margin: 0; }
//   tr { line-height: 1.1; }
//   .footer { margin-left: 35px; margin-top: 1.5mm; font-size: 11px; font-weight: bold; }
//   .barcode { margin-left: 40px; margin-top: 2mm; }
//   .barcode-text { margin-left: 15px; font-weight: bold; }
// </style>

// </head>

// <body>
// <div class="ticket">

//   <div class="header">${printData.mainhead}</div>
//   <div class="header">${printData.header}</div>
//   <div class="header">${printData.subhead}</div>

//   <div class="draw-line">
//     DrawTime: ${new Date().toLocaleDateString("en-IN")} ${printData.drawTime}
//   </div>

//   <div class="header">Username: ${printData.username}</div>
//   <div class="header">Qty: ${printData.quantity} , Points: ${printData.amount}</div>

//   <table>
//     <thead>
//       <tr>
//         ${rows[0] ? rows[0].map(() => `
//           <th>No.</th>
//           <th>Qt.</th>
//         `).join("") : ""}
//       </tr>
//     </thead>
    
//     <tbody>
//       ${rows.map(row => `
//         <tr>
//           ${row.map(t => {
//             const [num, qty] = t.split("|");
//             return `
//               <td>${num}</td>
//               <td>${qty}</td>
//             `;
//           }).join("")}
//         </tr>
//       `).join("")}
//     </tbody>
//   </table>

//   <div class="footer">
//     ${new Date().toLocaleString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       hour12: true,
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric"
//     })}
//   </div>

//   <div class="barcode">
//     <svg id="barcodeSvg"></svg>
//     <span class="barcode-text">${printData.barcode}</span>
//   </div>

//   <div class="footer">Reprint Ticket</div>
// </div>

// <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
// <script>
//   window.onload = function () {
//     JsBarcode("#barcodeSvg", "${printData.barcode}", {
//       format: "CODE128",
//       width: 3,
//       height: 60,
//       displayValue: false
//     });

//     setTimeout(() => {
//       window.print();
//       window.close();
//     }, 400);
//   };
// </script>

// </body>
// </html>
// `);
//   printWindow.document.close();
// };

//   // ---------------------------------------------------

//   return (
//     <div style={{ background: "#F9F8F6", minHeight: "100vh" }}>
//       <div
//         className="container-fluid text-center fw-bold fs-4 text-light py-2"
//         style={{ background: "#d620a9" }}
//       >
//         ACCOUNTS
//       </div>

//       <div
//         className="container-fluid mt-2 py-3"
//         style={{ background: "#d620a9" }}
//       >
//         <div className="row g-3 align-items-center justify-content-center text-center">

//           {/* FROM DATE */}
//           <div className="col-auto">
//             <div className="position-relative d-flex align-items-center">
//               <span
//                 style={{ background: "purple", color: "whitesmoke" }}
//                 className="me-2 px-2 rounded"
//               >
//                 From Date
//               </span>

//               <button
//                 className="btn btn-secondary dropdown-toggle fw-bold border-secondary rounded-0"
//                 onClick={() => {
//                   setShowFromCalendar(!showFromCalendar);
//                   setShowToCalendar(false);
//                 }}
//               >
//                 {formatDate(fromDate)}
//               </button>

//               {showFromCalendar && (
//                 <div
//                   className="position-absolute bg-white p-2 shadow rounded"
//                   style={{ top: "100%", left: 0, zIndex: 999 }}
//                 >
//                   <Calendar onChange={handleFromDateChange} value={fromDate} />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* TO DATE */}
//           <div className="col-auto">
//             <div className="position-relative d-flex align-items-center">
//               <span
//                 style={{ background: "purple", color: "whitesmoke" }}
//                 className="me-2 px-2 rounded"
//               >
//                 To Date
//               </span>

//               <button
//                 className="btn btn-secondary dropdown-toggle fw-bold border-secondary rounded-0"
//                 onClick={() => {
//                   setShowToCalendar(!showToCalendar);
//                   setShowFromCalendar(false);
//                 }}
//               >
//                 {formatDate(toDate)}
//               </button>

//               {showToCalendar && (
//                 <div
//                   className="position-absolute bg-white p-2 shadow rounded"
//                   style={{ top: "100%", left: 0, zIndex: 999 }}
//                 >
//                   <Calendar onChange={handleToDateChange} value={toDate} />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* BUTTONS */}
//           <div className="col-auto d-flex gap-2">
//             <button
//               className="btn fw-bold fs-6 rounded-pill px-4"
//               style={{ background: "gray", color: "white" }}
//               onClick={() => fetchAccountHistory(false)}
//             >
//               Submit
//             </button>

//             <button
//               className="btn fw-bold fs-6 rounded-pill px-4"
//               style={{ background: "gray", color: "white" }}
//               onClick={handleCustomPrint}
//             >
//               Print
//             </button>

//             <button
//               className="btn fw-bold fs-6 rounded-pill px-4"
//               style={{ background: "gray", color: "white" }}
//               onClick={() => navigate("/home")}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* DATA SECTION */}
//       <div className="container-fluid mt-4">
//         {loading ? (
//           <div className="text-center mt-5">
//             <div className="spinner-border text-primary"></div>
//             <p className="fw-bold mt-2">Loading account data...</p>
//           </div>
//         ) : error ? (
//           <p className="text-danger text-center fw-bold mt-4">{error}</p>
//         ) : accountData ? (
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped text-center align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>UserName</th>
//                   <th>Play</th>
//                   <th>Win</th>
//                   <th>User Commission</th>
//                   <th>Net To Pay</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{accountData.username}</td>
//                   <td>{accountData.summary?.Amount}</td>
//                   <td>{accountData.summary?.Win_Amount}</td>
//                   <td>{accountData.summary?.Commission}</td>
//                   <td>{accountData.summary?.nettopay}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-center fw-bold text-muted mt-4">
//             Please select dates and click Submit.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Account3D;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Account3D = () => {
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);

  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Format date to YYYY-MM-DD
  const formatDate = (d) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleFromDateChange = (newDate) => {
    setFromDate(newDate);
    setShowFromCalendar(false);
    setShowToCalendar(false);
  };

  const handleToDateChange = (newDate) => {
    setToDate(newDate);
    setShowToCalendar(false);
    setShowFromCalendar(false);
  };

  // ---------------------------------------------------------
  // ⭐ UPDATED API CALL (WORKING VERSION)
  // ---------------------------------------------------------
  const fetchAccountHistory = async (auto = false) => {
    setLoading(true);
    setError("");
    if (!auto) setAccountData(null);

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!username) {
      setError("⚠️ Username missing. Please login again.");
      setLoading(false);
      return;
    }

    const payload = {
      from_date: formatDate(fromDate),
      to_date: formatDate(toDate),
      username: username.trim(),
    };

    try {
      const res = await axios.post(
        "https://freedomplay.us/api/Threedreport/accountHistory",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 && res.data?.ok) {
        const d = res.data.data?.[0];

        if (!d) {
          setError("No data found.");
        } else {
          // MAP NEW API RESPONSE TO OLD UI FORMAT
          setAccountData({
            username: d.username.trim(),
            summary: {
              Amount: d.Amount,
              Win_Amount: d.Win_Amount,
              Commission: d.Commission,
              nettopay: d.nettopay,
            },
          });
        }
      } else {
        setError("No data found.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountHistory(true);
  }, []);

  // ------------------ CUSTOM PRINT ------------------
  const handleCustomPrint = () => {
    if (!accountData) {
      alert("No data to print");
      return;
    }

    const printContent = `
3D Game
--------------------------------------------------------
FromDate: ${formatDate(fromDate)}
ToDate: ${formatDate(toDate)}
UserName : ${accountData.username}
Total Pay : ${accountData.summary?.Amount}
Total Win : ${accountData.summary?.Win_Amount}
User Comission : ${accountData.summary?.Commission}
Net To Pay : ${accountData.summary?.nettopay}
--------------------------------------------------------
`;

    const printWindow = window.open("", "_blank", "width=600,height=600");
    printWindow.document.write(`
      <pre style="font-size:20px; font-family: monospace;">
${printContent}
      </pre>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  // ---------------------------------------------------

  return (
    <div style={{ background: "#F9F8F6", minHeight: "100vh" }}>
      <div
        className="container-fluid text-center fw-bold fs-4 text-light py-2"
        style={{ background: "#d620a9" }}
      >
        ACCOUNTS
      </div>

      <div
        className="container-fluid mt-2 py-3"
        style={{ background: "#d620a9" }}
      >
        <div className="row g-3 align-items-center justify-content-center text-center">

          {/* FROM DATE */}
          <div className="col-auto">
            <div className="position-relative d-flex align-items-center">
              <span
                style={{ background: "purple", color: "whitesmoke" }}
                className="me-2 px-2 rounded"
              >
                From Date
              </span>

              <button
                className="btn btn-secondary dropdown-toggle fw-bold border-secondary rounded-0"
                onClick={() => {
                  setShowFromCalendar(!showFromCalendar);
                  setShowToCalendar(false);
                }}
              >
                {formatDate(fromDate)}
              </button>

              {showFromCalendar && (
                <div
                  className="position-absolute bg-white p-2 shadow rounded"
                  style={{ top: "100%", left: 0, zIndex: 999 }}
                >
                  <Calendar onChange={handleFromDateChange} value={fromDate} />
                </div>
              )}
            </div>
          </div>

          {/* TO DATE */}
          <div className="col-auto">
            <div className="position-relative d-flex align-items-center">
              <span
                style={{ background: "purple", color: "whitesmoke" }}
                className="me-2 px-2 rounded"
              >
                To Date
              </span>

              <button
                className="btn btn-secondary dropdown-toggle fw-bold border-secondary rounded-0"
                onClick={() => {
                  setShowToCalendar(!showToCalendar);
                  setShowFromCalendar(false);
                }}
              >
                {formatDate(toDate)}
              </button>

              {showToCalendar && (
                <div
                  className="position-absolute bg-white p-2 shadow rounded"
                  style={{ top: "100%", left: 0, zIndex: 999 }}
                >
                  <Calendar onChange={handleToDateChange} value={toDate} />
                </div>
              )}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="col-auto d-flex gap-2">
            <button
              className="btn fw-bold fs-6 rounded-pill px-4"
              style={{ background: "gray", color: "white" }}
              onClick={() => fetchAccountHistory(false)}
            >
              Submit
            </button>

            <button
              className="btn fw-bold fs-6 rounded-pill px-4"
              style={{ background: "gray", color: "white" }}
              onClick={handleCustomPrint}
            >
              Print
            </button>

            <button
              className="btn fw-bold fs-6 rounded-pill px-4"
              style={{ background: "gray", color: "white" }}
              onClick={() => navigate("/home")}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* DATA SECTION */}
      <div className="container-fluid mt-4">
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary"></div>
            <p className="fw-bold mt-2">Loading account data...</p>
          </div>
        ) : error ? (
          <p className="text-danger text-center fw-bold mt-4">{error}</p>
        ) : accountData ? (
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>UserName</th>
                  <th>Play</th>
                  <th>Win</th>
                  <th>User Commission</th>
                  <th>Net To Pay</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{accountData.username}</td>
                  <td>{accountData.summary?.Amount}</td>
                  <td>{accountData.summary?.Win_Amount}</td>
                  <td>{accountData.summary?.Commission}</td>
                  <td>{accountData.summary?.nettopay}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center fw-bold text-muted mt-4">
            Please select dates and click Submit.
          </p>
        )}
      </div>
    </div>
  );
};

export default Account3D;