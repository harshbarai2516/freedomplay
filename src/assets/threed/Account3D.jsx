// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Calendar from "react-calendar";
// // import axios from "axios";
// // import "react-calendar/dist/Calendar.css";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const Account = () => {
// //   const navigate = useNavigate();

// //   const [fromDate, setFromDate] = useState(new Date());
// //   const [toDate, setToDate] = useState(new Date());
// //   const [showFromCalendar, setShowFromCalendar] = useState(false);
// //   const [showToCalendar, setShowToCalendar] = useState(false);

// //   const [accountData, setAccountData] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // Format date to YYYY-MM-DD
// //   const formatDate = (d) => {
// //     const day = String(d.getDate()).padStart(2, "0");
// //     const month = String(d.getMonth() + 1).padStart(2, "0");
// //     const year = d.getFullYear();
// //     return `${year}-${month}-${day}`;
// //   };

// //   const handleFromDateChange = (newDate) => {
// //     setFromDate(newDate);
// //     setShowFromCalendar(false);
// //     setShowToCalendar(false);
// //   };

// //   const handleToDateChange = (newDate) => {
// //     setToDate(newDate);
// //     setShowToCalendar(false);
// //     setShowFromCalendar(false);
// //   };

// //   // Fetch Account History
// //   const fetchAccountHistory = async (auto = false) => {
// //     setLoading(true);
// //     setError("");
// //     if (!auto) setAccountData(null);

// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       setError("⚠️ Please login again. Token missing.");
// //       setLoading(false);
// //       return;
// //     }

// //     const payload = {
// //       from_date: formatDate(fromDate),
// //       to_date: formatDate(toDate),
// //     };

// //     try {
// //       const res = await axios.post(
// //         "https://thewonder.uk/royalgame/api/account_history",
// //         payload,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${JSON.parse(token)}`,
// //           },
// //         }
// //       );

// //       if (res.status === 200 && res.data?.status) {
// //         setAccountData(res.data.data);
// //       } else {
// //         setError(res.data?.message || "No data found.");
// //       }
// //     } catch (err) {
// //       setError("Something went wrong while fetching data.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAccountHistory(true);
// //   }, []);

// //   // ------------------ CUSTOM PRINT ------------------
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
// //   // ---------------------------------------------------

// //   return (
// //     <div style={{ background: "#F9F8F6", minHeight: "100vh" }}>
// //       <div
// //         className="container-fluid text-center fw-bold fs-4 text-light py-2"
// //         style={{ background: "#d620a9" }}
// //       >
// //         ACCOUNTS
// //       </div>

// //       <div
// //         className="container-fluid mt-2 py-3"
// //         style={{ background: "#d620a9" }}
// //       >
// //         <div className="row g-3 align-items-center justify-content-center text-center">

// //           {/* FROM DATE */}
// //           <div className="col-auto">
// //             <div className="position-relative d-flex align-items-center">
// //               <span
// //                 style={{ background: "purple", color: "whitesmoke" }}
// //                 className="me-2 px-2 rounded"
// //               >
// //                 From Date
// //               </span>

// //               <button
// //                 className="btn btn-secondary dropdown-toggle fw-bold border-secondary rounded-0"
// //                 onClick={() => {
// //                   setShowFromCalendar(!showFromCalendar);
// //                   setShowToCalendar(false);
// //                 }}
// //               >
// //                 {formatDate(fromDate)}
// //               </button>

// //               {showFromCalendar && (
// //                 <div
// //                   className="position-absolute bg-white p-2 shadow rounded"
// //                   style={{ top: "100%", left: 0, zIndex: 999 }}
// //                 >
// //                   <Calendar onChange={handleFromDateChange} value={fromDate} />
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* TO DATE */}
// //           <div className="col-auto">
// //             <div className="position-relative d-flex align-items-center">
// //               <span
// //                 style={{ background: "purple", color: "whitesmoke" }}
// //                 className="me-2 px-2 rounded"
// //               >
// //                 To Date
// //               </span>

// //               <button
// //                 className="btn btn-secondary dropdown-toggle fw-bold border-secondary rounded-0"
// //                 onClick={() => {
// //                   setShowToCalendar(!showToCalendar);
// //                   setShowFromCalendar(false);
// //                 }}
// //               >
// //                 {formatDate(toDate)}
// //               </button>

// //               {showToCalendar && (
// //                 <div
// //                   className="position-absolute bg-white p-2 shadow rounded"
// //                   style={{ top: "100%", left: 0, zIndex: 999 }}
// //                 >
// //                   <Calendar onChange={handleToDateChange} value={toDate} />
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* BUTTONS */}
// //           <div className="col-auto d-flex gap-2">
// //             <button
// //               className="btn fw-bold fs-6 rounded-pill px-4"
// //               style={{ background: "gray", color: "white" }}
// //               onClick={() => fetchAccountHistory(false)}
// //             >
// //               Submit
// //             </button>

// //             <button
// //               className="btn fw-bold fs-6 rounded-pill px-4"
// //               style={{ background: "gray", color: "white" }}
// //               onClick={handleCustomPrint}
// //             >
// //               Print
// //             </button>

// //             <button
// //               className="btn fw-bold fs-6 rounded-pill px-4"
// //               style={{ background: "gray", color: "white" }}
// //               onClick={() => navigate("/home")}
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* DATA SECTION */}
// //       <div className="container-fluid mt-4">
// //         {loading ? (
// //           <div className="text-center mt-5">
// //             <div className="spinner-border text-primary"></div>
// //             <p className="fw-bold mt-2">Loading account data...</p>
// //           </div>
// //         ) : error ? (
// //           <p className="text-danger text-center fw-bold mt-4">{error}</p>
// //         ) : accountData ? (
// //           <div className="table-responsive">
// //             <table className="table table-bordered table-striped text-center align-middle">
// //               <thead className="table-dark">
// //                 <tr>
// //                   <th>UserName</th>
// //                   <th>Play</th>
// //                   <th>Win</th>
// //                   <th>User Commission</th>
// //                   <th>Net To Pay</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 <tr>
// //                   <td>{accountData.username}</td>
// //                   <td>{accountData.summary?.Amount}</td>
// //                   <td>{accountData.summary?.Win_Amount}</td>
// //                   <td>{accountData.summary?.Commission}</td>
// //                   <td>{accountData.summary?.nettopay}</td>
// //                 </tr>
// //               </tbody>
// //             </table>
// //           </div>
// //         ) : (
// //           <p className="text-center fw-bold text-muted mt-4">
// //             Please select dates and click Submit.
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Account;

// // https://freedomplay.us/api/Threedreport/accountHistory
// // i want to fetch aacount history using this api remove old api https://thewonder.uk/royalgame/api/account_history and use this new api https://freedomplay.us/api/Threedreport/accountHistory

// // this is my parameter { "username" : "akshay" }
// // and this is my response
// // {
// //   "ok": true,
// //   "username": "akshay",
// //   "from": null,
// //   "to": null,
// //   "accountHistory": {
// //     "count": 1,
// //     "data": [
// //       {
// //         "username": "akshay",
// //         "playPoint": "448550",
// //         "winPoint": "282000",
// //         "commission": "44837.00",
// //         "netToPay": 121713,
// //         "drawCount": "463"
// //       }
// //     ]
// //   }
// // }
// // dont change my ui or functionality only change the api and response handling part


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import axios from "axios";
// import "react-calendar/dist/Calendar.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { set } from "react-hook-form";

// const Account = () => {
//   const navigate = useNavigate();

//   const [fromDate, setFromDate] = useState(new Date());
//   const [toDate, setToDate] = useState(new Date());
//   const [showFromCalendar, setShowFromCalendar] = useState(false);
//   const [showToCalendar, setShowToCalendar] = useState(false);

//   const [accountData, setAccountData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//  // const [current, setCurrent] = useState(!null);



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
//   // ⭐ NEW UPDATED API (Account History)
//   // ---------------------------------------------------------
//   const fetchAccountHistory = async (auto = false) => {
//     setLoading(true);
//     setError("");
//     if (!auto) setAccountData(null);

//     const username = localStorage.getItem("username");

//     if (!username) {
//       setError("⚠️ Username missing. Please login again.");
//       setLoading(false);
//       return;
//     }

//     const payload = {
//       from_date : setFromDate ,
//       to_date: setToDate ,
//       username: username, // NEW REQUIRED PAYLOAD,
//     };

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "https://freedomplay.us/api/Threedreport/accountHistory",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//              "Authorization": `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.status === 200 && res.data?.ok) {
//         const d = res.data.accountHistory?.data?.[0];
//         console.log(d);
//         if (!d) {
//           setError("No data found.");
//         } else {
//           // MAP NEW API RESPONSE TO OLD UI FORMAT
//           setAccountData({
//             username: d.username,
//             summary: {
//               Amount: d.playPoint,
//               Win_Amount: d.winPoint,
//               Commission: d.commission,
//               nettopay: d.netToPay,
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
//   const handleCustomPrint = () => {
//     if (!accountData) {
//       alert("No data to print");
//       return;
//     }

//     const printContent = `
// 3D Game
// --------------------------------------------------------
// FromDate: ${formatDate(fromDate)}
// ToDate: ${formatDate(toDate)}
// UserName : ${accountData.username}
// Total Pay : ${accountData.summary?.Amount}
// Total Win : ${accountData.summary?.Win_Amount}
// User Comission : ${accountData.summary?.Commission}
// Net To Pay : ${accountData.summary?.nettopay}
// --------------------------------------------------------
// `;

//     const printWindow = window.open("", "_blank", "width=600,height=600");
//     printWindow.document.write(`
//       <pre style="font-size:20px; font-family: monospace;">
// ${printContent}
//       </pre>
//     `);
//     printWindow.document.close();
//     printWindow.print();
//   };
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

// export default Account;

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
