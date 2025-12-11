// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import axios from "axios";
// import JsBarcode from "jsbarcode";
// import "react-calendar/dist/Calendar.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Reprint = () => {
//   const navigate = useNavigate();
//   const [date, setDate] = useState(new Date());
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [historyData, setHistoryData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ================== FORMAT DATE ==================
//   const formatDate = (d) => {
//     const day = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year = d.getFullYear();
//     return `${year}-${month}-${day}`;
//   };

//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//     setShowCalendar(false);
//   };

//   // ================ FORMAT TICKET LIST (2 COLUMNS) ================
//   const formatTicketList = (str) => {
//     if (!str) return "";

//     const tickets = str.split(",").map((t) => {
//       const [num, type, amount, zone] = t.split("|");
//       return `${num} ${type} ${amount}-${zone}`;
//     });

//     const half = Math.ceil(tickets.length / 2);

//     const leftCol = tickets.slice(0, half);
//     const rightCol = tickets.slice(half);

//     let html = `<table style="font-size:14px;">`;

//     for (let i = 0; i < half; i++) {
//       html += `
//         <tr>
//           <td style="padding-right:40px;">${leftCol[i] || ""}</td>
//           <td>${rightCol[i] || ""}</td>
//         </tr>
//       `;
//     }

//     html += "</table>";
//     return html;
//   };

//   // ================= FETCH HISTORY =================
//   const fetchHistory = useCallback(async () => {
//     setLoading(true);
//     setError("");
//     setHistoryData([]);

//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("⚠️ Please login again. Token missing.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "https://thewonder.uk/royalgame/api/history_daywise_threed",
//         { record_date: formatDate(date) },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${JSON.parse(token)}`,
//           },
//         }
//       );

//       if (res.status === 200 && res.data?.data) {
//         const records = res.data.data.flat();
//         setHistoryData(records.length ? records : []);
//       } else {
//         setError("No records found.");
//       }
//     } catch {
//       setError("No records found.");
//     }

//     setLoading(false);
//   }, [date]);

//   useEffect(() => {
//     fetchHistory();
//   }, [fetchHistory]);

//   // =================== PRINT FUNCTION ====================
//   const handleReprint = (item) => {
//     const printWindow = window.open("", "_blank");

//     const ticketListHtml = formatTicketList(item.tck_result);

//     const svg = document.createElement("svg");
//     JsBarcode(svg, item.barcode, {
//       format: "CODE128",
//       width: 1.8,
//       height: 60,
//       displayValue: true,
//       fontSize: 16,
//       margin: 0,
//     });

//     const barcodeSvg = svg.outerHTML;

//     printWindow.document.write(`
//       <html>
//         <head>
//           <style>
//             body { font-family: Arial; width: 260px; }
//             .title { text-align: center; font-size: 22px; font-weight: bold; }
//             .line { border-top: 1px dashed black; margin: 8px 0; }
//           </style>
//         </head>

//         <body>
//           <div class="title">3D Game</div>
//           <div class="line"></div>

//           <b>Reprint</b><br/>
//           <b>Ticket Date:</b> ${item.tck_time.split(" ")[0]}<br/>
//           <b>Ticket Time:</b> ${item.tck_time.split(" ")[1]}<br/>
//           <b>Draw:</b> ${item.nxt_draw}<br/>
//           <b>UserName:</b> ${item.username}<br/>
//           <b>Qty:</b> ${item.qty}<br/>
//           <b>Points:</b> ${item.amt}<br/>

//           <div class="line"></div>

//           ${ticketListHtml}

//           <div class="line"></div>

//           <div style="text-align:center;">${barcodeSvg}</div>
//           <b>Serial Id:</b> ${item.barcode}

//           <script>
//             window.onload = function() {
//               window.print();
//               setTimeout(() => window.close(), 500);
//             }
//           </script>
//         </body>
//       </html>
//     `);

//     printWindow.document.close();
//   };

//   // =====================================================

//   return (
//     <div style={{ backgroundColor: "#F9F8F6", minHeight: "100vh", padding: "20px" }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h4 className="fw-bold text-secondary">🎟️ Reprint</h4>

//           <div className="position-relative mt-2">
//             <button
//               className="btn btn-outline-secondary fw-bold rounded-pill"
//               onClick={() => setShowCalendar(!showCalendar)}
//             >
//               {formatDate(date)}
//             </button>

//             {showCalendar && (
//               <div className="position-absolute bg-white p-2 shadow rounded mt-2" style={{ zIndex: 999 }}>
//                 <Calendar onChange={handleDateChange} value={date} />
//               </div>
//             )}
//           </div>
//         </div>

//         <button
//           className="btn btn-dark fw-bold rounded-pill px-4"
//           onClick={() => navigate("/home")}
//         >
//           ⬅️ Home
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-center mt-0 fw-bold">Loading…</p>
//       ) : error ? (
//         <p className="text-center text-danger fw-bold">{error}</p>
//       ) : historyData.length === 0 ? (
//         <p className="text-center fw-bold mt-0">No records found</p>
//       ) : (
//         <div
//           className="table-responsive mt-0"
//           style={{ maxHeight: "80vh", overflowY: "auto", border: "1px solid #ccc" }}
//         >
//           <table className="table table-bordered table-hover text-center table-secondary align-middle mb-0">
//             <thead className="table-dark sticky-top">
//               <tr>
//                 <th>Draw Time</th>
//                 <th>Qty</th>
//                 <th>Amt</th>
//                 <th>Barcode</th>
//                 <th>Ticket Time</th>
//                 <th>Win</th>
//                 <th>Status</th>
//                 <th>View</th>
//                 <th>Print</th>
//               </tr>
//             </thead>

//             <tbody>
//               {historyData.map((item, index) => {
//                 const ticketListHtml = formatTicketList(item.tck_result);

//                 return (
//                   <tr key={index}>
//                     <td>{item.nxt_draw}</td>
//                     <td>{item.qty}</td>
//                     <td>{item.amt}</td>
//                     <td className="fw-bold">{item.barcode}</td>
//                     <td>{item.tck_time}</td>
//                     <td>{item.win_amount}</td>
//                     <td>{item.claim_status || "claim"}</td>

//                     {/* VIEW BUTTON */}
//                     <td>
//                       <button
//                         type="button"
//                         data-bs-toggle="modal"
//                         data-bs-target={`#modal-${index}`}
//                         className="btn btn-success fw-bold fs-6"
//                       >
//                         View
//                       </button>
//                     </td>

//                     {/* UNIQUE MODAL */}
//                     <div
//                       className="modal fade"
//                       id={`modal-${index}`}
//                       data-bs-backdrop="static"
//                       data-bs-keyboard="false"
//                       tabIndex="-1"
//                       aria-hidden="true"
//                     >
//                       <div className="modal-dialog">
//                         <div className="modal-content">
//                           <div className="modal-header">
//                             <h1 className="modal-title fs-5"><b>Ticket Details</b></h1>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
//                           </div>

//                           <div className="modal-body text-start">
//                             <div><b>Barcode:</b> {item.barcode}</div>
//                             <div><b>Draw Time:</b> {item.nxt_draw}</div>
//                             <div><b>Amount:</b> {item.amt}</div>
//                             <div><b>Quantity:</b> {item.qty}</div>

//                             <b>Ticket Result:</b>
//                             <div dangerouslySetInnerHTML={{ __html: ticketListHtml }} />
//                           </div>

//                           <div className="modal-footer">
//                             <button className="btn btn-danger m-auto fw-bold" data-bs-dismiss="modal">
//                               Close
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* PRINT BUTTON */}
//                     <td>
//                       <button
//                         className="btn btn-primary btn-sm fw-bold"
//                         onClick={() => handleReprint(item)}
//                       >
//                         Print
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reprint;

// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import axios from "axios";
// import JsBarcode from "jsbarcode";
// import "react-calendar/dist/Calendar.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Reprint = () => {
//   const navigate = useNavigate();
//   const [date, setDate] = useState(new Date());
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [historyData, setHistoryData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const formatDate = (d) => {
//     const day = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year = d.getFullYear();
//     return `${year}-${month}-${day}`;
//   };

//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//     setShowCalendar(false);
//   };

//   const formatTicketList = (str) => {
//     if (!str) return "";

//     const tickets = str.split(",").map((t) => {
//       const [num, type, amount, zone] = t.split("|");
//       return `${num} ${type} ${amount}-${zone}`;
//     });

//     const half = Math.ceil(tickets.length / 2);

//     const leftCol = tickets.slice(0, half);
//     const rightCol = tickets.slice(half);

//     let html = `<table style="font-size:14px;">`;

//     for (let i = 0; i < half; i++) {
//       html += `
//         <tr>
//           <td style="padding-right:40px;">${leftCol[i] || ""}</td>
//           <td>${rightCol[i] || ""}</td>
//         </tr>
//       `;
//     }

//     html += "</table>";
//     return html;
//   };

//   const fetchHistory = useCallback(async () => {
//     setLoading(true);
//     setError("");
//     setHistoryData([]);

//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("⚠️ Please login again. Token missing.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "https://thewonder.uk/royalgame/api/history_daywise_threed",
//         { record_date: formatDate(date) },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${JSON.parse(token)}`,
//           },
//         }
//       );

//       if (res.status === 200 && res.data?.data) {
//         const records = res.data.data.flat();
//         setHistoryData(records.length ? records : []);
//       } else {
//         setError("No records found.");
//       }
//     } catch {
//       setError("No records found.");
//     }

//     setLoading(false);
//   }, [date]);

//   useEffect(() => {
//     fetchHistory();
//   }, [fetchHistory]);

//   const handleReprint = (item) => {
//     const printWindow = window.open("", "_blank");

//     const ticketListHtml = formatTicketList(item.tck_result);

//     const svg = document.createElement("svg");
//     JsBarcode(svg, item.barcode, {
//       format: "CODE128",
//       width: 1.8,
//       height: 60,
//       displayValue: true,
//       fontSize: 16,
//       margin: 0,
//     });

//     const barcodeSvg = svg.outerHTML;

//     printWindow.document.write(`
//       <html>
//         <head>
//           <style>
//             body { font-family: Arial; width: 260px; }
//             .title { text-align: center; font-size: 22px; font-weight: bold; }
//             .line { border-top: 1px dashed black; margin: 8px 0; }
//           </style>
//         </head>

//         <body>
//           <div class="title">3D Game</div>
//           <div class="line"></div>

//           <b>Reprint</b><br/>
//           <b>Ticket Date:</b> ${item.tck_time.split(" ")[0]}<br/>
//           <b>Ticket Time:</b> ${item.tck_time.split(" ")[1]}<br/>
//           <b>Draw:</b> ${item.nxt_draw}<br/>
//           <b>UserName:</b> ${item.username}<br/>
//           <b>Qty:</b> ${item.qty}<br/>
//           <b>Points:</b> ${item.amt}<br/>

//           <div class="line"></div>

//           ${ticketListHtml}

//           <div class="line"></div>

//           <div style="text-align:center;">${barcodeSvg}</div>
//           <b>Serial Id:</b> ${item.barcode}

//           <script>
//             window.onload = function() {
//               window.print();
//               setTimeout(() => window.close(), 500);
//             }
//           </script>
//         </body>
//       </html>
//     `);

//     printWindow.document.close();
//   };

//   return (
//     <div style={{ backgroundColor: "#F9F8F6", minHeight: "100vh", padding: "20px" }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h4 className="fw-bold text-secondary">🎟️ Reprint</h4>

//           <div className="position-relative mt-2">
//             <button
//               className="btn btn-outline-secondary fw-bold rounded-pill"
//               onClick={() => setShowCalendar(!showCalendar)}
//             >
//               {formatDate(date)}
//             </button>

//             {showCalendar && (
//               <div className="position-absolute bg-white p-2 shadow rounded mt-2" style={{ zIndex: 999 }}>
//                 <Calendar onChange={handleDateChange} value={date} />
//               </div>
//             )}
//           </div>
//         </div>

//         <button
//           className="btn btn-dark fw-bold rounded-pill px-4"
//           onClick={() => navigate("/home")}
//         >
//           ⬅️ Home
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-center mt-0 fw-bold">Loading…</p>
//       ) : error ? (
//         <p className="text-center text-danger fw-bold">{error}</p>
//       ) : historyData.length === 0 ? (
//         <p className="text-center fw-bold mt-0">No records found</p>
//       ) : (
//         <div
//           className="table-responsive mt-0"
//           style={{ maxHeight: "80vh", overflowY: "auto", border: "1px solid #ccc" }}
//         >
//           <table className="table table-bordered table-hover text-center table-secondary align-middle mb-0">
//             <thead className="table-dark sticky-top">
//               <tr>
//                 <th>Draw Time</th>
//                 <th>Qty</th>
//                 <th>Amt</th>
//                 <th>Barcode</th>
//                 <th>Ticket Time</th>
//                 <th>Win</th>
//                 <th>Status</th>
//                 <th>View</th>
//                 <th>Print</th>
//               </tr>
//             </thead>

//             <tbody>
//               {historyData.map((item, index) => {
//                 const ticketListHtml = formatTicketList(item.tck_result);

//                 return (
//                   <tr key={index}>
//                     <td>{item.nxt_draw}</td>
//                     <td>{item.qty}</td>
//                     <td>{item.amt}</td>
//                     <td className="fw-bold">{item.barcode}</td>
//                     <td>{item.tck_time}</td>
//                     <td>{item.win_amount}</td>
//                     <td>{item.claim_status || "claim"}</td>

//                     {/* ✅ VIEW BUTTON + BEAUTIFUL COMPACT MODAL ✅ */}
//                     <td>
//                       <button
//                         type="button"
//                         data-bs-toggle="modal"
//                         data-bs-target={`#modal-${index}`}
//                         className="btn btn-success fw-bold btn-sm"
//                       >
//                         View
//                       </button>
//                     </td>

//                     <div
//                       className="modal fade"
//                       id={`modal-${index}`}
//                       tabIndex="-1"
//                       aria-hidden="true"
//                     >
//                       <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "450px" }}>
//                         <div className="modal-content shadow-lg border-0" style={{ borderRadius: "12px", overflow: "hidden" }}>

//                           {/* Gradient Header */}
//                           <div 
//                             className="modal-header text-white p-3" 
//                             style={{ 
//                               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                               borderBottom: "none"
//                             }}
//                           >
//                             <h6 className="modal-title fw-bold mb-0" style={{ fontSize: "1.1rem" }}>
//                               🎟️ Ticket Details
//                             </h6>
//                             <button
//                               type="button"
//                               className="btn-close btn-close-white"
//                               data-bs-dismiss="modal"
//                               style={{ opacity: "0.8" }}
//                             ></button>
//                           </div>

//                           {/* Compact Body */}
//                           <div className="modal-body p-3" style={{ backgroundColor: "#f8f9fa" }}>

//                             {/* Info Grid */}
//                             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//                               <div style={{ padding: "8px", backgroundColor: "#fff", borderRadius: "6px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
//                                 <span style={{ fontSize: "0.75rem", color: "#667eea", fontWeight: "600", textTransform: "uppercase" }}>Barcode</span>
//                                 <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", fontWeight: "700", color: "#333" }}>{item.barcode}</p>
//                               </div>

//                               <div style={{ padding: "8px", backgroundColor: "#fff", borderRadius: "6px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
//                                 <span style={{ fontSize: "0.75rem", color: "#667eea", fontWeight: "600", textTransform: "uppercase" }}>Draw Time</span>
//                                 <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", fontWeight: "600", color: "#333" }}>{item.nxt_draw}</p>
//                               </div>

//                               <div style={{ padding: "8px", backgroundColor: "#fff", borderRadius: "6px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
//                                 <span style={{ fontSize: "0.75rem", color: "#667eea", fontWeight: "600", textTransform: "uppercase" }}>Amount</span>
//                                 <p style={{ margin: "4px 0 0 0", fontSize: "0.95rem", fontWeight: "700", color: "#28a745" }}>₹ {item.amt}</p>
//                               </div>

//                               <div style={{ padding: "8px", backgroundColor: "#fff", borderRadius: "6px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
//                                 <span style={{ fontSize: "0.75rem", color: "#667eea", fontWeight: "600", textTransform: "uppercase" }}>Quantity</span>
//                                 <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", fontWeight: "600", color: "#333" }}>{item.qty}</p>
//                               </div>

//                               <div style={{ padding: "8px", backgroundColor: "#fff", borderRadius: "6px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", gridColumn: "1" }}>
//                                 <span style={{ fontSize: "0.75rem", color: "#667eea", fontWeight: "600", textTransform: "uppercase" }}>Win Amount</span>
//                                 <p style={{ margin: "4px 0 0 0", fontSize: "0.95rem", fontWeight: "700", color: item.win_amount ? "#ff6b6b" : "#999" }}>
//                                   {item.win_amount ? `₹ ${item.win_amount}` : "—"}
//                                 </p>
//                               </div>
//                             </div>

//                             {/* Ticket Result - Compact */}
//                             <div style={{ marginTop: "12px" }}>
//                               <h6 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#333", textTransform: "uppercase", letterSpacing: "0.3px", marginBottom: "6px" }}>
//                                 📋 Results
//                               </h6>
//                               <div
//                                 style={{
//                                   padding: "8px",
//                                   borderLeft: "3px solid #667eea",
//                                   borderRadius: "4px",
//                                   backgroundColor: "#f0f4ff",
//                                   fontSize: "0.8rem",
//                                   color: "#333",
//                                   lineHeight: "1.4",
//                                   maxHeight: "100px",
//                                   overflowY: "auto"
//                                 }}
//                                 dangerouslySetInnerHTML={{ __html: ticketListHtml }}
//                               />
//                             </div>

//                           </div>

//                           {/* Footer */}
//                           <div 
//                             className="modal-footer p-2" 
//                             style={{ 
//                               borderTop: "1px solid #e0e0e0", 
//                               backgroundColor: "#ffffff",
//                               display: "flex",
//                               justifyContent: "center"
//                             }}
//                           >
//                             <button
//                               className="btn fw-bold"
//                               data-bs-dismiss="modal"
//                               style={{
//                                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "6px",
//                                 fontSize: "0.9rem",
//                                 padding: "6px 20px",
//                                 transition: "all 0.3s ease",
//                                 cursor: "pointer"
//                               }}
//                               onMouseEnter={(e) => {
//                                 e.target.style.transform = "translateY(-1px)";
//                                 e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
//                               }}
//                               onMouseLeave={(e) => {
//                                 e.target.style.transform = "translateY(0)";
//                                 e.target.style.boxShadow = "none";
//                               }}
//                             >
//                               ✕ Close
//                             </button>
//                           </div>

//                         </div>
//                       </div>
//                     </div>

//                     {/* PRINT BUTTON */}
//                     <td>
//                       <button
//                         className="btn btn-primary btn-sm fw-bold"
//                         onClick={() => handleReprint(item)}
//                       >
//                         Print
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reprint;

// i want to fetch data using this api https://freedomplay.us/api/Threedreport/records remove old api https://thewonder.uk/royalgame/api/history_daywise_threed
// pass this parameter
// {
//   "username" : "akshay",
// "from" : "2025-12-06",
// "to" : "2025-12-06"
// }
// response
// {
//   "ok": true,
//   "username": "akshay",
//   "from": "2025-12-06",
//   "to": "2025-12-06",
//   "playedRecords": {
//     "count": 6,
//     "data": [
//       {
//         "username": "Akshay ",
//         "qty": 2,
//         "amt": 20,
//         "winAmt": 0,
//         "claimAmt": "0",
//         "date": "2025-12-05T18:30:00.000Z",
//         "drawTime": "08:00 AM",
//         "barcode": "2512062232",
//         "ticketResult": "252|BOX|10|A,252|BOX|10|A",
//         "isAdvanceBet": 1,
//         "drawCount": 1
//       },
//       {
//         "username": "Akshay ",
//         "qty": 2,
//         "amt": 20,
//         "winAmt": 0,
//         "claimAmt": "0",
//         "date": "2025-12-05T18:30:00.000Z",
//         "drawTime": "08:15 AM",
//         "barcode": "2512064069",
//         "ticketResult": "252|BOX|10|A,252|BOX|10|A",
//         "isAdvanceBet": 1,
//         "drawCount": 1
//       },
//       {
//         "username": "akshay",
//         "qty": 1,
//         "amt": 10,
//         "winAmt": 0,
//         "claimAmt": "0",
//         "date": "2025-12-05T18:30:00.000Z",
//         "drawTime": "10:30AM",
//         "barcode": "2512066100",
//         "ticketResult": "111|BOX|10|A",
//         "isAdvanceBet": 0,
//         "drawCount": 1
//       },
//       {
//         "username": "akshay",
//         "qty": 6,
//         "amt": 60,
//         "winAmt": 0,
//         "claimAmt": "0",
//         "date": "2025-12-05T18:30:00.000Z",
//         "drawTime": "12:15PM",
//         "barcode": "2512061631",
//         "ticketResult": "256|BOX|10|A,265|BOX|10|A,526|BOX|10|A,562|BOX|10|A,625|BOX|10|A,652|BOX|10|A",
//         "isAdvanceBet": 0,
//         "drawCount": 1
//       },
//       {
//         "username": "akshay",
//         "qty": 24,
//         "amt": 240,
//         "winAmt": 0,
//         "claimAmt": "0",
//         "date": "2025-12-05T18:30:00.000Z",
//         "drawTime": "12:30PM",
//         "barcode": "2512063282",
//         "ticketResult": "037|BOX|10|A,038|BOX|10|A,073|BOX|10|A,078|BOX|10|A,083|BOX|10|A,087|BOX|10|A,307|BOX|10|A,308|BOX|10|A,370|BOX|10|A,378|BOX|10|A,380|BOX|10|A,387|BOX|10|A,703|BOX|10|A,708|BOX|10|A,730|BOX|10|A,738|BOX|10|A,780|BOX|10|A,783|BOX|10|A,803|BOX|10|A,807|BOX|10|A,830|BOX|10|A,837|BOX|10|A,870|BOX|10|A,873|BOX|10|A",
//         "isAdvanceBet": 0,
//         "drawCount": 1
//       },
//       {
//         "username": "akshay",
//         "qty": 60,
//         "amt": 600,
//         "winAmt": 0,
//         "claimAmt": "0",
//         "date": "2025-12-05T18:30:00.000Z",
//         "drawTime": "12:45PM",
//         "barcode": "2512066661",
//         "ticketResult": "015|BOX|10|A,017|BOX|10|A,019|BOX|10|A,051|BOX|10|A,057|BOX|10|A,059|BOX|10|A,071|BOX|10|A,075|BOX|10|A,079|BOX|10|A,091|BOX|10|A,095|BOX|10|A,097|BOX|10|A,105|BOX|10|A,107|BOX|10|A,109|BOX|10|A,150|BOX|10|A,157|BOX|10|A,159|BOX|10|A,170|BOX|10|A,175|BOX|10|A,179|BOX|10|A,190|BOX|10|A,195|BOX|10|A,197|BOX|10|A,501|BOX|10|A,507|BOX|10|A,509|BOX|10|A,510|BOX|10|A,517|BOX|10|A,519|BOX|10|A,570|BOX|10|A,571|BOX|10|A,579|BOX|10|A,590|BOX|10|A,591|BOX|10|A,597|BOX|10|A,701|BOX|10|A,705|BOX|10|A,709|BOX|10|A,710|BOX|10|A,715|BOX|10|A,719|BOX|10|A,750|BOX|10|A,751|BOX|10|A,759|BOX|10|A,790|BOX|10|A,791|BOX|10|A,795|BOX|10|A,901|BOX|10|A,905|BOX|10|A,907|BOX|10|A,910|BOX|10|A,915|BOX|10|A,917|BOX|10|A,950|BOX|10|A,951|BOX|10|A,957|BOX|10|A,970|BOX|10|A,971|BOX|10|A,975|BOX|10|A",
//         "isAdvanceBet": 0,
//         "drawCount": 1
//       }
//     ]
//   }
// }

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JsBarcode from "jsbarcode";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reprint3D.css";

const Reprint3D = () => {
  const navigate = useNavigate();
  const [date] = useState(new Date()); // ✅ Always today's date
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (d) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const formatTicketList = (str) => {
    if (!str) return "";

    const tickets = str.split(",").map((t) => {
      const [num, type, amount, zone] = t.split("|");
      return `${num} ${type} ${amount}-${zone}`;
    });

    const half = Math.ceil(tickets.length / 2);
    const leftCol = tickets.slice(0, half);
    const rightCol = tickets.slice(half);

    let html = `<table style="font-size:14px;">`;

    for (let i = 0; i < half; i++) {
      html += `
        <tr>
          <td style="padding-right:40px;">${leftCol[i] || ""}</td>
          <td>${rightCol[i] || ""}</td>
        </tr>
      `;
    }

    html += "</table>";
    return html;
  };

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError("");
    setHistoryData([]);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("⚠️ Please login again. Token missing.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://freedomplay.us/api/Threedreport/records",
        {
          username: "akshay",
          from: formatDate(date),
          to: formatDate(date),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      if (res.status === 200 && res.data?.ok && res.data.playedRecords?.data) {
        let records = res.data.playedRecords.data.map((item) => ({
          username: item.username,
          qty: item.qty,
          amt: item.amt,
          win_amount: item.winAmt || 0,
          claim_status: item.claimAmt !== "0" ? "Claimed" : "Pending",
          tck_time: item.date,
          nxt_draw: item.drawTime,
          barcode: item.barcode,
          tck_result: item.ticketResult,
        }));

        const timeToSeconds = (timeStr) => {
          if (!timeStr) return 0;
          const [time, period] = timeStr.trim().split(" ");
          let [hours, minutes] = time.split(":").map(Number);
          if (period === "PM" && hours !== 12) hours += 12;
          if (period === "AM" && hours === 12) hours = 0;
          return hours * 3600 + minutes * 60;
        };

        records.sort(
          (a, b) => timeToSeconds(b.nxt_draw) - timeToSeconds(a.nxt_draw)
        );
        setHistoryData(records.length ? records : []);
      } else {
        setError("No records found.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch records.");
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleReprint = (item) => {
    const printWindow = window.open("", "_blank");

    const ticketListHtml = formatTicketList(item.tck_result);

    const svg = document.createElement("svg");
    JsBarcode(svg, item.barcode, {
      format: "CODE128",
      width: 1.8,
      height: 60,
      displayValue: true,
      fontSize: 16,
      margin: 0,
    });

    const barcodeSvg = svg.outerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <style>
            body { font-family: Arial; width: 260px; }
            .title { text-align: center; font-size: 22px; font-weight: bold; }
            .line { border-top: 1px dashed black; margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="title">3D Game</div>
          <div class="line"></div>

          <b>Reprint</b><br/>
          <b>Ticket Date:</b> ${item.tck_time.split("T")[0]}<br/>
          <b>Ticket Time:</b> ${
            item.tck_time.split("T")[1]?.split(".")[0] || ""
          }<br/>
          <b>Draw:</b> ${item.nxt_draw}<br/>
          <b>UserName:</b> ${item.username}<br/>
          <b>Qty:</b> ${item.qty}<br/>
          <b>Points:</b> ${item.amt}<br/>

          <div class="line"></div>
          ${ticketListHtml}
          <div class="line"></div>

          <div style="text-align:center;">${barcodeSvg}</div>
          <b>Serial Id:</b> ${item.barcode}

          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 500);
            }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="reprint-page">
      <div className="d-flex justify-content-between align-items-center mb-4 reprint-header">
        <div>
          <h4 className="fw-bold text-white mb-1">🎟️ Reprint</h4>
          <span className="reprint-date text-white fw-bold fs-5">{formatDate(date)}</span>
        </div>

        <button
          className="btn btn-outline-light fw-bold rounded-pill px-4"
          onClick={() => navigate("/home")}
        >
          ⬅️ Home
        </button>
      </div>

      {loading ? (
        <p className="text-center text-white fw-bold">Loading…</p>
      ) : error ? (
        <p className="text-center text-danger fw-bold">{error}</p>
      ) : historyData.length === 0 ? (
        <p className="text-center text-white fw-bold">No records found</p>
      ) : (
        <div className="table-responsive reprint-table-wrap">
          <table className="table table-hover text-center align-middle mb-0 reprint-table">
            <thead>
              <tr>
                <th>Draw Time</th>
                <th>Qty</th>
                <th>Amt</th>
                <th>Barcode</th>
                <th>Ticket Time</th>
                <th>Win</th>
                <th>Win Result</th>
                <th>View</th>
                <th>Print</th>
              </tr>
            </thead>

            <tbody>
              {historyData.map((item, index) => {
                const ticketListHtml = formatTicketList(item.tck_result);

                return (
                  <tr key={index}>
                    <td>{item.nxt_draw}</td>
                    <td>{item.qty}</td>
                    <td>{item.amt}</td>
                    <td className="fw-bold">{item.barcode}</td>
                    <td>{item.tck_time}</td>
                    <td>{item.win_amount}</td>
                    <td>0</td>

                    <td>
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#modal-${index}`}
                        className="btn btn-success fw-bold btn-sm"
                      >
                        View
                      </button>
                    </td>

                    {/* Modal same as yours – UI unchanged */}
                    {/* <div className="modal fade" id={`modal-${index}`} tabIndex="-1" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable reprint-modal mx-auto">
                        <div className="modal-content shadow-lg border-0 reprint-modal-content">
                          <div className="modal-header reprint-modal-header">
                            <h6 className="modal-title fw-bold mb-0">🎟️ Ticket Details</h6>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                          </div>

                          <div className="modal-body">
                            <div
                              className="reprint-ticket-html"
                              dangerouslySetInnerHTML={{ __html: ticketListHtml }}
                            />
                          </div>

                          <div className="modal-footer justify-content-center">
                            <button className="btn reprint-close-btn" data-bs-dismiss="modal">
                              ✕ Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    <div
                      className="modal fade"
                      id={`modal-${index}`}
                      tabIndex="-1"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable reprint-modal mx-auto">
                        <div className="modal-content gradient-modal-content">
                          {/* Header */}
                          <div className="modal-header gradient-modal-header">
                            <h5 className="modal-title fw-bold">
                              🎟️ Ticket Details
                            </h5>
                            <button
                              type="button"
                              className="btn gradient-close-btn"
                              data-bs-dismiss="modal"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Body */}
                          <div className="modal-body">
                            <div className="modal-gradient-grid">
                              <div className="modal-info-box">
                                <span>Barcode</span>
                                <p>{item.barcode}</p>
                              </div>
                              <div className="modal-info-box">
                                <span>Draw Time</span>
                                <p>{item.nxt_draw}</p>
                              </div>
                              <div className="modal-info-box">
                                <span>Amount</span>
                                <p>{item.amt}</p>
                              </div>
                              <div className="modal-info-box">
                                <span>Quantity</span>
                                <p>{item.qty}</p>
                              </div>
                              <div className="modal-info-box">
                                <span>Win Amount</span>
                                <p>{item.win_amount}</p>
                              </div>
                            </div>

                            {/* Ticket Numbers */}
                            <div className="ticket-numbers-card mt-3">
                              <h6 className="fw-bold mb-2">🎟 Ticket Numbers</h6>
                              <div
                                className="reprint-ticket-html"
                                dangerouslySetInnerHTML={{
                                  __html: ticketListHtml,
                                }}
                              />
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="modal-footer justify-content-center">
                            <button
                              className="btn gradient-close-btn"
                              data-bs-dismiss="modal"
                            >
                              ✕ Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <td>
                      <button
                        className="btn btn-primary btn-sm fw-bold"
                        onClick={() => handleReprint(item)}
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reprint3D;
