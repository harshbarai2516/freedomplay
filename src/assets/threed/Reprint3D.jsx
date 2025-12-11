// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import JsBarcode from "jsbarcode";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Reprint3D.css";

// const Reprint3D = () => {
//   const navigate = useNavigate();
//   const [date] = useState(new Date()); // ✅ Always today's date
//   const [historyData, setHistoryData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const formatDate = (d) => {
//     const day = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year = d.getFullYear();
//     return `${year}-${month}-${day}`;
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
//         "https://freedomplay.us/api/Threedreport/records",
//         {
//           username: "akshay",
//           from: formatDate(date),
//           to: formatDate(date),
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${JSON.parse(token)}`,
//           },
//         }
//       );

//       if (res.status === 200 && res.data?.ok && res.data.playedRecords?.data) {
//         let records = res.data.playedRecords.data.map((item) => ({
//           username: item.username,
//           qty: item.qty,
//           amt: item.amt,
//           win_amount: item.winAmt || 0,
//           claim_status: item.claimAmt !== "0" ? "Claimed" : "Pending",
//           tck_time: item.date,
//           nxt_draw: item.drawTime,
//           barcode: item.barcode,
//           tck_result: item.ticketResult,
//         }));

//         const timeToSeconds = (timeStr) => {
//           if (!timeStr) return 0;
//           const [time, period] = timeStr.trim().split(" ");
//           let [hours, minutes] = time.split(":").map(Number);
//           if (period === "PM" && hours !== 12) hours += 12;
//           if (period === "AM" && hours === 12) hours = 0;
//           return hours * 3600 + minutes * 60;
//         };

//         records.sort(
//           (a, b) => timeToSeconds(b.nxt_draw) - timeToSeconds(a.nxt_draw)
//         );
//         setHistoryData(records.length ? records : []);
//       } else {
//         setError("No records found.");
//       }
//     } catch (err) {
//       console.error("API Error:", err);
//       setError("Failed to fetch records.");
//     } finally {
//       setLoading(false);
//     }
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
//           <b>Ticket Date:</b> ${item.tck_time.split("T")[0]}<br/>
//           <b>Ticket Time:</b> ${
//             item.tck_time.split("T")[1]?.split(".")[0] || ""
//           }<br/>
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
//     <div className="reprint-page">
//       <div className="d-flex justify-content-between align-items-center mb-4 reprint-header">
//         <div>
//           <h4 className="fw-bold text-white mb-1">🎟️ Reprint</h4>
//           <span className="reprint-date text-white fw-bold fs-5">{formatDate(date)}</span>
//         </div>

//         <button
//           className="btn btn-outline-light fw-bold rounded-pill px-4"
//           onClick={() => navigate("/home")}
//         >
//           ⬅️ Home
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-center text-white fw-bold">Loading…</p>
//       ) : error ? (
//         <p className="text-center text-danger fw-bold">{error}</p>
//       ) : historyData.length === 0 ? (
//         <p className="text-center text-white fw-bold">No records found</p>
//       ) : (
//         <div className="table-responsive reprint-table-wrap">
//           <table className="table table-hover text-center align-middle mb-0 reprint-table">
//             <thead>
//               <tr>
//                 <th>Draw Time</th>
//                 <th>Qty</th>
//                 <th>Amt</th>
//                 <th>Barcode</th>
//                 <th>Ticket Time</th>
//                 <th>Win</th>
//                 <th>Win Result</th>
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
//                     <td>0</td>

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

//                     {/* Modal same as yours – UI unchanged */}
//                     {/* <div className="modal fade" id={`modal-${index}`} tabIndex="-1" aria-hidden="true">
//                       <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable reprint-modal mx-auto">
//                         <div className="modal-content shadow-lg border-0 reprint-modal-content">
//                           <div className="modal-header reprint-modal-header">
//                             <h6 className="modal-title fw-bold mb-0">🎟️ Ticket Details</h6>
//                             <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
//                           </div>

//                           <div className="modal-body">
//                             <div
//                               className="reprint-ticket-html"
//                               dangerouslySetInnerHTML={{ __html: ticketListHtml }}
//                             />
//                           </div>

//                           <div className="modal-footer justify-content-center">
//                             <button className="btn reprint-close-btn" data-bs-dismiss="modal">
//                               ✕ Close
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div> */}

//                     <div
//                       className="modal fade"
//                       id={`modal-${index}`}
//                       tabIndex="-1"
//                       aria-hidden="true"
//                     >
//                       <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable reprint-modal mx-auto">
//                         <div className="modal-content gradient-modal-content">
//                           {/* Header */}
//                           <div className="modal-header gradient-modal-header">
//                             <h5 className="modal-title fw-bold">
//                               🎟️ Ticket Details
//                             </h5>
//                             <button
//                               type="button"
//                               className="btn gradient-close-btn"
//                               data-bs-dismiss="modal"
//                             >
//                               ✕
//                             </button>
//                           </div>

//                           {/* Body */}
//                           <div className="modal-body">
//                             <div className="modal-gradient-grid">
//                               <div className="modal-info-box">
//                                 <span>Barcode</span>
//                                 <p>{item.barcode}</p>
//                               </div>
//                               <div className="modal-info-box">
//                                 <span>Draw Time</span>
//                                 <p>{item.nxt_draw}</p>
//                               </div>
//                               <div className="modal-info-box">
//                                 <span>Amount</span>
//                                 <p>{item.amt}</p>
//                               </div>
//                               <div className="modal-info-box">
//                                 <span>Quantity</span>
//                                 <p>{item.qty}</p>
//                               </div>
//                               <div className="modal-info-box">
//                                 <span>Win Amount</span>
//                                 <p>{item.win_amount}</p>
//                               </div>
//                             </div>

//                             {/* Ticket Numbers */}
//                             <div className="ticket-numbers-card mt-3">
//                               <h6 className="fw-bold mb-2">🎟 Ticket Numbers</h6>
//                               <div
//                                 className="reprint-ticket-html"
//                                 dangerouslySetInnerHTML={{
//                                   __html: ticketListHtml,
//                                 }}
//                               />
//                             </div>
//                           </div>

//                           {/* Footer */}
//                           <div className="modal-footer justify-content-center">
//                             <button
//                               className="btn gradient-close-btn"
//                               data-bs-dismiss="modal"
//                             >
//                               ✕ Close
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

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

// export default Reprint3D;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reprint3D.css";

const Reprint3D = () => {
  const navigate = useNavigate();
  const [date] = useState(new Date());
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [claimStatus] = useState({}); // placeholder if needed

  const formatDate = (d) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
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
          id: item.id || "", // for handlePrint key
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

  // ====================== NEW PRINT FUNCTION ======================
  const handlePrint = (record) => {
    const key = `${record.barcode}_${record.id}`;

    // Parse tickets
    const tickets = record.tck_result
      ? record.tck_result.split(",").map((t) => t.trim())
      : [];

    // Row grouping: 3 tickets per row
    const rows = [];
    if (tickets.length === 1) {
      rows.push(tickets.slice(0, 1));
    } else {
      for (let i = 0; i < tickets.length; i += 3) {
        rows.push(tickets.slice(i, i + 3));
      }
    }

    const printData = {
      mainhead: "1x Bet",
      header: "FOR AMUSEMENT ONLY, 3series",
      subhead: "(Ticket valid for 10 days)",
      rows,
      gst: "27AAMC P0300J2Z8",
      drawTime: record.nxt_draw || record.draw_time || "",
      selectedTime: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      username: sessionStorage.getItem("username") || "user123",
      quantity: record.qty || "0",
      amount: record.amt || "0",
      barcode: record.barcode || "0",
      winAmount: record.win_amount || "0",
      claim: claimStatus[key] || "",
    };

    const printWindow = window.open("", "_blank", "width=400,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
<html>
<head>
<title>Print Ticket</title>

<style>
  @media print {
    @page {
      size: 80mm auto;
      margin: 1mm;
    }
    html, body { padding:0; margin:0; width:70mm; font-family:monospace; font-size:11px; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  }
  body { width:70mm; font-family:monospace; font-size:11px; margin:0; padding:0; }
  .ticket { width:70mm; margin:0; text-align:flex-start; font-family:monospace; padding:1mm; box-sizing:border-box; }
  .header { font-weight:bold; font-size:11px; margin-bottom:1mm; margin-left:25px; }
  .draw-line { font-size:11px; margin-bottom:1mm; font-weight:bold; width:70%; margin-left:20px; }
  table { width:70%; text-align:center; border-collapse:collapse; table-layout:auto; font-size:11px; margin-left:16px; padding:0; }
  th, td { text-align:center; padding:0; margin:0; font-weight:bold; white-space:nowrap; }
  th + th, td + td { padding-left:1px !important; }
  tr { line-height:1.1; }
  .barcode { margin-top:1.5mm; text-align:center; width:100%; display:flex; flex-direction:column; align-items:flex-start; margin-left:40px; }
  .barcode svg { width:auto; height:30px; margin:0; display:block; }
  .barcode-text { margin-left:15px; font-size:11px; font-weight:bold; }
  .footer { margin-top:1.5mm; font-size:11px; line-height:1.2; font-weight:bold; margin-left:35px; }
</style>

</head>

<body>
  <div class="ticket">
     <div class="header">${printData.mainhead}</div>
    <div class="header">${printData.header}</div>
     <div class="header">${printData.subhead}</div>
     <div class="draw-line"> DrawTime: ${new Date().toLocaleString("en-IN", {timeZone:"Asia/Kolkata", day:"2-digit", month:"2-digit", year:"numeric"})} ${printData.drawTime}</div>
      <div class="header">Username ${printData.username}</div>
      <div class="header">Qty: ${printData.quantity} , Points:  ${printData.amount}</div>

<table>
  <thead>
    <tr>
      ${rows[0] ? rows[0].map(() => `<th>No.</th><th>Qt.</th>`).join('') : ''}
    </tr>
  </thead>
  <tbody>
    ${rows.map((row) => `<tr>${row.map(t => { const [num, qty] = t.split("|"); return `<td>${num||""}</td><td>${qty||""}</td>`; }).join('')}</tr>`).join('')}
  </tbody>
</table>
     <div class="footer">${new Date().toLocaleString("en-IN", {timeZone:"Asia/Kolkata", hour12:true, hour:"2-digit", minute:"2-digit", second:"2-digit", day:"2-digit", month:"2-digit", year:"numeric"})}</div>
     <div class="barcode">
       <svg id="barcodeSvg"></svg>
       <span class="barcode-text">${printData.barcode}</span>
     </div>
    <div class="footer">Reprint Ticket</div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
  <script>
    window.onload = function() {
      JsBarcode("#barcodeSvg", "${printData.barcode}", { format:"CODE128", width:3.5, height:70, displayValue:false });
      setTimeout(()=>{window.print(); window.close();}, 500);
    };
  </script>
</body>
</html>
    `);

    printWindow.document.close();
  };
  // ====================== END PRINT FUNCTION ======================

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
              {historyData.map((item, index) => (
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

                  <div className="modal fade" id={`modal-${index}`} tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable reprint-modal mx-auto">
                      <div className="modal-content gradient-modal-content">
                        <div className="modal-header gradient-modal-header">
                          <h5 className="modal-title fw-bold">🎟️ Ticket Details</h5>
                          <button type="button" className="btn gradient-close-btn" data-bs-dismiss="modal">✕</button>
                        </div>

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

                          <div className="ticket-numbers-card mt-3">
                            <h6 className="fw-bold mb-2">🎟 Ticket Numbers</h6>
                            <div dangerouslySetInnerHTML={{ __html: item.tck_result }} />
                          </div>
                        </div>

                        <div className="modal-footer justify-content-center">
                          <button className="btn gradient-close-btn" data-bs-dismiss="modal">✕ Close</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <td>
                    <button
                      className="btn btn-primary btn-sm fw-bold"
                      onClick={() => handlePrint(item)}
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reprint3D;