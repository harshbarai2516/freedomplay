// import React, { useState } from "react";
// import axios from "axios";
// import JsBarcode from "jsbarcode";
// import { useNavigate } from "react-router-dom";
// import "./Nav.css";

// const Nav10 = ({
//   totalAmount,
//   quantity,
//   nextSlot,
//   displayList,
//   selectedZones,
//   advancedDraws = [],
//   clearDisplayList,
// }) => {
//   const username =
//     localStorage.getItem("username") ||
//     JSON.parse(localStorage.getItem("token"))?.username ||
//     "User";

//   const [currentPass, setCurrentPass] = useState("");
//   const [newPass, setNewPass] = useState("");
//   const [confirmPass, setConfirmPass] = useState("");
//   const [barcodeInput, setBarcodeInput] = useState("");
//   const [claimStatus, setClaimStatus] = useState("");
//   const [claimDetails, setClaimDetails] = useState(null);
//   const [showClaimModal, setShowClaimModal] = useState(false);

//   const navigate = useNavigate();

//   const handleBarcodeChange = (e) => {
//     let val = e.target.value.replace(/\D/g, "");
//     if (val.length > 10) val = val.slice(0, 10);
//     setBarcodeInput(val);
//     if (val.length === 10) fetchClaimStatus(val);
//   };

//   const fetchClaimStatus = async (barcode) => {
//     try {
//       const res = await axios.post(
//         "https://freedomplay.us/api/ClaimWin/3dClaim",
//         { username, barcode }
//       );
//       setClaimDetails(res.data);
//       setClaimStatus(res.data.ok ? `Won: ${res.data.winAmount}` : res.data.message);
//       setShowClaimModal(true);
//     } catch (err) {
//       console.error(err);
//       setClaimStatus("⚠️ Unable to fetch claim status");
//       setShowClaimModal(true);
//     }
//   };

//   const updatePassword = async () => {
//     if (!currentPass || !newPass || !confirmPass) return alert("⚠️ Fill all fields");
//     if (newPass !== confirmPass) return alert("❌ Passwords do not match");

//     try {
//       const token = JSON.parse(localStorage.getItem("token"));
//       const res = await axios.post(
//         "https://thewonder.uk/royalgame/api/change_password",
//         { password: newPass, password_confirmation: confirmPass },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (res.data.status) alert("✅ Password Updated Successfully!");
//       else alert("❌ " + res.data.message);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Something went wrong.");
//     }
//   };

//   const to24HourTime = (timeStr) => {
//     if (!timeStr) return "00:00:00";
//     timeStr = timeStr.replaceAll(".", ":").replaceAll("-", ":").replaceAll(" ", "").toLowerCase();
//     const match = timeStr.match(/(\d{1,2}):(\d{1,2})/);
//     if (!match) return "00:00:00";
//     let hour = parseInt(match[1]);
//     const minute = parseInt(match[2]);
//     const isPM = timeStr.includes("pm");
//     const isAM = timeStr.includes("am");
//     if (isPM && hour < 12) hour += 12;
//     if (isAM && hour === 12) hour = 0;
//     return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
//   };

//   // ----------------------------
//   // ✅ HANDLE BUY FUNCTION
//   // ----------------------------
//   const handleBuy = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("❌ Please log in first.");
//       const bearer = token ? JSON.parse(token)?.token || token : "";

//       // Get hidden random numbers if any
//       const hiddenRandoms = window._lpickRandomNumbers || [];

//       // Check tickets
//       if (!displayList.length && hiddenRandoms.length === 0)
//         return alert("⚠️ Add at least one number.");
//       if (!selectedZones.length) return alert("⚠️ Select at least one zone.");

//       // Decide ticket source
//       const ticketSource = hiddenRandoms.length > 0 ? hiddenRandoms : displayList;

//       // Build tickets
//       const expandedTickets = [];
//       ticketSource.forEach((item) => {
//         selectedZones.forEach((zone) => {
//           expandedTickets.push(`${item.type}|${item.number}|${item.rate}|${zone}`);
//         });
//       });

//       const ticketList = expandedTickets.join(",");
//       const qty = expandedTickets.length;
//       const rate = ticketSource.length > 0 ? Number(ticketSource[0].rate) || 0 : 0;
//       const amt = qty * rate;

//       const rawDraws = advancedDraws.length ? advancedDraws : [nextSlot];
//       const is_advance_bet = advancedDraws.length ? "1" : "0";
//       const drawsToSend = rawDraws.map(to24HourTime);

//       const generateBarcode = () => {
//         const now = new Date();
//         const yy = String(now.getFullYear()).slice(2);
//         const mm = String(now.getMonth() + 1).padStart(2, "0");
//         const dd = String(now.getDate()).padStart(2, "0");
//         const rand4 = String(Math.floor(1000 + Math.random() * 9000));
//         return `${yy}${mm}${dd}${rand4}`;
//       };

//       const record_date = new Date().toISOString().slice(0, 10);
//       const tck_time = new Date().toTimeString().split(" ")[0];

//       clearDisplayList();

//       const requests = drawsToSend.map((drawTime, index) => {
//         const barcode = barcodeInput || generateBarcode();
//         const payload = {
//           username,
//           qty: String(qty),
//           amt: String(amt),
//           nxt_draw: drawTime,
//           draw_time: rawDraws[index],
//           barcode,
//           tck_result: ticketList,
//           tck_time,
//           record_date,
//           is_advance_bet,
//         };
//         return axios
//           .post("https://freedomplay.us/api/record/insert", payload, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${bearer}`,
//             },
//           })
//           .then(() => ({ barcode, drawTime: rawDraws[index] }))
//           .catch((err) => ({ error: true, err }));
//       });

//       const results = await Promise.all(requests);
//       const successResults = results.filter((r) => !r.error);
//       const failed = results.length - successResults.length;

//       if (successResults.length)
//         printTicketsMultiple(successResults, qty, amt, ticketList);

//       alert(
//         `✅ ${successResults.length} draw(s) inserted successfully${
//           failed ? `\n❌ ${failed} failed` : ""
//         }`
//       );
//       window.location.reload();
//     } catch (err) {
//       console.error("Error placing bets:", err.response?.data || err.message || err);
//       alert("Something went wrong while placing bets.");
//     }
//   };

//   // ----------------------------
//   // ✅ PRINT FUNCTION
//   // ----------------------------
//   const printTicketsMultiple = (ticketData, perDrawQty, perDrawAmount, ticketList) => {
//     const printWindow = window.open("", "_blank", "width=400,height=600");
//     if (!printWindow) return alert("⚠️ Allow popup to print.");

//     const tickets = ticketList ? ticketList.split(",").map((t) => t.trim()) : [];

//     const rows = [];
//     if (tickets.length === 1) {
//       rows.push(tickets.slice(0, 1));
//     } else {
//       for (let i = 0; i < tickets.length; i += 3) {
//         rows.push(tickets.slice(i, i + 3));
//       }
//     }

//     const username = sessionStorage.getItem("username") || "user123";

//     const now = new Date();
//     const ticketDate = now.toISOString().slice(0, 10);
//     const ticketTime = now.toLocaleTimeString("en-US");

//     const mainTicket = ticketData[0] || {};

//     const printData = {
//       mainhead: "3D Game",
//       header: "FOR AMUSEMENT ONLY",
//       subhead: "(Ticket valid for 10 days)",
//       rows,
//       gst: "27AAMC P0300J2Z8",
//       drawTime: mainTicket.drawTime || "",
//       selectedTime: now.toLocaleString("en-IN", {
//         timeZone: "Asia/Kolkata",
//         hour12: true,
//         weekday: "short",
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       username,
//       quantity: perDrawQty || "0",
//       amount: perDrawAmount || "0",
//       barcode: mainTicket.barcode || "0",
//     };

//     printWindow.document.write(`
//       <html>
//       <head>
//       <title>Print Ticket</title>
//       <style>
//       @media print { @page { size: 80mm auto; margin: 1mm; } html, body { padding:0;margin:0;width:70mm;font-family:monospace;font-size:11px; } }
//       body{ width:70mm; font-family:monospace; font-size:11px; margin:0; padding:0; }
//       .ticket{ width:70mm; margin:0; text-align:flex-start; padding:1mm; box-sizing:border-box;}
//       .header{ font-weight:bold; font-size:11px; margin-bottom:1mm; margin-left:25px; }
//       .draw-line{ font-size:11px; margin-bottom:1mm; font-weight:bold; width:70%; margin-left:20px; }
//       table{ width:70%; text-align:center; border-collapse:collapse; table-layout:auto; font-size:11px; margin-left:16px; padding:0; }
//       th, td{ text-align:center; padding:0; margin:0; font-weight:bold; white-space:nowrap; }
//       th+th, td+td{ padding-left:1px !important; }
//       tr{ line-height:1.1; }
//       .footer{ margin-top:1.5mm; font-size:11px; line-height:1.2; font-weight:bold; margin-left:35px; }
//       .barcode{ margin-top:1.5mm; text-align:center; width:100%; display:flex; flex-direction:column; align-items:flex-start; margin-left:40px; }
//       .barcode svg{ width:auto; height:30px; margin:0; display:block; }
//       .barcode-text{ margin-left:15px; font-size:11px; font-weight:bold; }
//       </style>
//       </head>
//       <body>
//       <div class="ticket">
//         <div class="header">${printData.mainhead}</div>
//         <div class="header">${printData.header}</div>
//         <div class="header">${printData.subhead}</div>
//         <div class="draw-line"> DrawTime: ${printData.selectedTime} ${printData.drawTime}</div>
//         <div class="header">Username ${printData.username}</div>
//         <div class="header">Qty: ${printData.quantity} , Points: ${printData.amount}</div>
//         <table>
//           <tbody>
//           ${rows.map(row => `
//             <tr>
//               ${row.map(t => {
//                 const [num, qty] = t.split("|");
//                 return `<td>${num||""}</td><td>${qty||""}</td>`;
//               }).join("")}
//             </tr>`).join("")}
//           </tbody>
//         </table>
//         <div class="footer">${ticketDate} ${ticketTime}</div>
//         <div class="barcode">
//           <svg id="barcodeSvg"></svg>
//           <span class="barcode-text">${printData.barcode}</span>
//         </div>
//         <div class="footer">Reprint Ticket</div>
//       </div>
//       <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
//       <script>
//         window.onload = function(){
//           JsBarcode("#barcodeSvg", "${printData.barcode}", { format:"CODE128", width:3.5, height:70, displayValue:false });
//           setTimeout(()=>{ window.print(); window.close(); }, 500);
//         };
//       </script>
//       </body>
//       </html>
//     `);

//     printWindow.document.close();
//   };

//   return (
//     <div className="fw-bold nav10-container" style={{ padding: "0.1rem 0.5rem", overflowX: "auto", minHeight: "32px", width: "100%", borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc", marginBottom: "0.5rem" }}>
//       <div className="d-flex flex-nowrap align-items-center" style={{ gap: 0, minWidth: "fit-content", width: "100%" }}>
//         <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: "0.1rem" }}>
//           <button className="btn btn-primary w-100 fw-bold" data-bs-toggle="modal" data-bs-target="#changePasswordModal" style={{ padding: "0.15rem 0.2rem", height: "clamp(28px, 2vw, 36px)" }}>CHANGE PASSWORD</button>
//         </div>
//         <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: "0.1rem" }}>
//           <button className="btn btn-success w-100 fw-bold" style={{ padding: "0.15rem 0.2rem", height: "clamp(28px, 2vw, 36px)" }} onClick={() => navigate("/twoD")}>2D</button>
//         </div>
//         <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: "0.1rem" }}>
//           <input type="text" value={totalAmount} readOnly className="form-control text-center fw-bold fs-5" style={{ padding: "0.15rem 0.2rem", height: "clamp(28px, 2vw, 36px)" }} />
//         </div>
//         <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: "0.1rem" }}>
//           <input type="text" placeholder="Enter Barcode" value={barcodeInput} onChange={handleBarcodeChange} className="form-control text-center fw-bold fs-5" style={{ padding: "0.15rem 0.2rem", height: "clamp(28px, 2vw, 36px)" }} />
//         </div>
//         <div style={{ flex: "1 1 0", minWidth: 0 }}>
//           <button className="btn btn-dark w-100 fw-bold" onClick={handleBuy} style={{ padding: "0.15rem 0.2rem", height: "clamp(28px, 2vw, 36px)" }}>BUY-F6</button>
//         </div>
//       </div>

//       {/* ---------------- MODALS ---------------- */}
//              {/* PASSWORD MODAL */}
//        <div className="modal fade" id="changePasswordModal" tabIndex="-1" aria-hidden="true">
//          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "450px" }}>
//            <div className="modal-content shadow-lg border-0" style={{ borderRadius: "12px", overflow: "hidden" }}>
//              <div className="modal-header text-white p-3" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
//                <h6 className="modal-title fw-bold">🔑 Change Password</h6>
//                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
//              </div>
//              <div className="modal-body p-3" style={{ background: "#f8f9fa" }}>
//                <input type="password" className="form-control fw-bold mb-2" placeholder="Current Password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
//                <input type="password" className="form-control fw-bold mb-2" placeholder="New Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
//                <input type="password" className="form-control fw-bold" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
//              </div>
//              <div className="modal-footer">
//                <button className="btn btn-primary w-100 fw-bold" onClick={updatePassword}>Update Password</button>
//              </div>
//            </div>
//          </div>
//        </div>

//        {/* CLAIM MODAL */}
//        {showClaimModal && (
//          <div style={{
//            position: "fixed",
//            inset: 0,
//            backgroundColor: "rgba(0,0,0,0.6)",
//            backdropFilter: "blur(3px)",
//            zIndex: 9999,
//            display: "flex",
//            alignItems: "center",
//            justifyContent: "center",
//            padding: "15px",
//          }}>
//            <div style={{
//              background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
//              color: "#fff",
//              borderRadius: "20px",
//              width: "100%",
//              maxWidth: "420px",
//              minHeight: "260px",
//              padding: "22px",
//              boxShadow: "0 15px 50px rgba(0,0,0,0.6)",
//              animation: "scaleIn 0.3s ease",
//            }}>
//              <div style={{ textAlign: "center", marginBottom: "15px" }}>
//                <h4 style={{ fontWeight: "800", letterSpacing: "1px" }}> Ticket Status</h4>
//                <div style={{ height: "4px", width: "60px", background: "#00d4ff", margin: "10px auto 0", borderRadius: "10px" }}></div>
//              </div>
//              <div style={{ fontSize: "1.6rem", fontWeight: "bold", textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>
//                {claimStatus}
//              </div>
//              {claimDetails && claimDetails.winAmount > 0 && (
//                <div style={{ fontSize: "1.2rem", textAlign: "center", marginBottom: "20px" }}>
//                  🎉 Win Amount: {claimDetails.winAmount}
//                </div>
//              )}
//              <button onClick={() => { setShowClaimModal(false); setBarcodeInput(""); setClaimDetails(null); }} style={{ width: "100%", background: "linear-gradient(135deg, #00d4ff, #007bff)", color: "white", border: "none", borderRadius: "14px", padding: "14px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer" }}>CLOSE</button>
//            </div>
//          </div>
//        )}
//      </div>
//    );
//  };

// export default Nav10;

import React, { useState } from "react";
import axios from "axios";
import JsBarcode from "jsbarcode";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav10 = ({
  totalAmount,
  quantity,
  nextSlot,
  displayList,
  selectedZones,
  advancedDraws = [],
  clearDisplayList,
}) => {
  const username =
    localStorage.getItem("username") ||
    JSON.parse(localStorage.getItem("token"))?.username ||
    "User";

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [claimStatus, setClaimStatus] = useState("");
  const [claimDetails, setClaimDetails] = useState(null);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const navigate = useNavigate();

  const handleBarcodeChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);
    setBarcodeInput(val);
    if (val.length === 10) fetchClaimStatus(val);
  };

  const fetchClaimStatus = async (barcode) => {
    try {
      const res = await axios.post(
        "https://freedomplay.us/api/ClaimWin/3dClaim",
        { username, barcode }
      );
      setClaimDetails(res.data);
      setClaimStatus(res.data.ok ? `Won: ${res.data.winAmount}` : res.data.message);
      setShowClaimModal(true);
    } catch (err) {
      console.error(err);
      setClaimStatus("⚠️ Unable to fetch claim status");
      setShowClaimModal(true);
    }
  };

  const updatePassword = async () => {
    if (!currentPass || !newPass || !confirmPass) return alert("⚠️ Fill all fields");
    if (newPass !== confirmPass) return alert("❌ Passwords do not match");

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.post(
        "https://thewonder.uk/royalgame/api/change_password",
        { password: newPass, password_confirmation: confirmPass },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.status) alert("✅ Password Updated Successfully!");
      else alert("❌ " + res.data.message);
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    }
  };

  const to24HourTime = (timeStr) => {
    if (!timeStr) return "00:00:00";
    timeStr = timeStr.replaceAll(".", ":").replaceAll("-", ":").replaceAll(" ", "").toLowerCase();
    const match = timeStr.match(/(\d{1,2}):(\d{1,2})/);
    if (!match) return "00:00:00";
    let hour = parseInt(match[1]);
    const minute = parseInt(match[2]);
    const isPM = timeStr.includes("pm");
    const isAM = timeStr.includes("am");
    if (isPM && hour < 12) hour += 12;
    if (isAM && hour === 12) hour = 0;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
  };

  // ----------------------------
  // ✅ HANDLE BUY FUNCTION
  // ----------------------------
  const handleBuy = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("❌ Please log in first.");
      const bearer = token ? JSON.parse(token)?.token || token : "";

      const hiddenRandoms = window._lpickRandomNumbers || [];

      if (!displayList.length && hiddenRandoms.length === 0)
        return alert("⚠️ Add at least one number.");
      if (!selectedZones.length) return alert("⚠️ Select at least one zone.");

      const ticketSource = hiddenRandoms.length > 0 ? hiddenRandoms : displayList;

      const expandedTickets = [];
      ticketSource.forEach((item) => {
        selectedZones.forEach((zone) => {
          expandedTickets.push(`${item.type}|${item.number}|${item.rate}|${zone}`);
        });
      });

      const ticketList = expandedTickets.join(",");
      const qty = expandedTickets.length;
      const rate = ticketSource.length > 0 ? Number(ticketSource[0].rate) || 0 : 0;
      const amt = qty * rate;

      const rawDraws = advancedDraws.length ? advancedDraws : [nextSlot];
      const is_advance_bet = advancedDraws.length ? "1" : "0";
      const drawsToSend = rawDraws.map(to24HourTime);

      const generateBarcode = () => {
        const now = new Date();
        const yy = String(now.getFullYear()).slice(2);
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");
        const rand4 = String(Math.floor(1000 + Math.random() * 9000));
        return `${yy}${mm}${dd}${rand4}`;
      };

      const record_date = new Date().toISOString().slice(0, 10);
      const tck_time = new Date().toTimeString().split(" ")[0];

      clearDisplayList();

      const requests = drawsToSend.map((drawTime, index) => {
        const barcode = barcodeInput || generateBarcode();
        const payload = {
          username,
          qty: String(qty),
          amt: String(amt),
          nxt_draw: drawTime,
          draw_time: rawDraws[index],
          barcode,
          tck_result: ticketList,
          tck_time,
          record_date,
          is_advance_bet,
        };
        return axios
          .post("https://freedomplay.us/api/record/insert", payload, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearer}`,
            },
          })
          .then(() => ({ barcode, drawTime: rawDraws[index] }))
          .catch((err) => ({ error: true, err }));
      });

      const results = await Promise.all(requests);
      const successResults = results.filter((r) => !r.error);
      const failed = results.length - successResults.length;

      // ✅ PRINT EACH ADVANCED DRAW TICKET
      if (successResults.length) {
        successResults.forEach(result => {
          printTicketsSingle(result.barcode, result.drawTime, qty, amt, ticketList);
        });
      }

      alert(
        `✅ ${successResults.length} draw(s) inserted successfully${
          failed ? `\n❌ ${failed} failed` : ""
        }`
      );
      window.location.reload();
    } catch (err) {
      console.error("Error placing bets:", err.response?.data || err.message || err);
      alert("Something went wrong while placing bets.");
    }
  };

  // ----------------------------
  // ✅ PRINT FUNCTION FOR SINGLE TICKET
  // ----------------------------
  const printTicketsSingle = (barcode, drawTime, perDrawQty, perDrawAmount, ticketList) => {
    const printWindow = window.open("", "_blank", "width=400,height=600");
    if (!printWindow) return alert("⚠️ Allow popup to print.");

    const tickets = ticketList ? ticketList.split(",").map((t) => t.trim()) : [];

    const rows = [];
    for (let i = 0; i < tickets.length; i += 3) {
      rows.push(tickets.slice(i, i + 3));
    }

    const username = sessionStorage.getItem("username") || "user123";
    const now = new Date();
    const ticketDate = now.toISOString().slice(0, 10);
    const ticketTime = now.toLocaleTimeString("en-US");

    const printData = {
      mainhead: "3D Game",
      header: "FOR AMUSEMENT ONLY",
      subhead: "(Ticket valid for 10 days)",
      rows,
      gst: "27AAMC P0300J2Z8",
      drawTime,
      selectedTime: now.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      username,
      quantity: perDrawQty || "0",
      amount: perDrawAmount || "0",
      barcode,
    };

    printWindow.document.write(`
      <html>
      <head>
      <title>Print Ticket</title>
      <style>
      @media print { @page { size: 80mm auto; margin: 1mm; } html, body { padding:0;margin:0;width:70mm;font-family:monospace;font-size:11px; } }
      body{ width:70mm; font-family:monospace; font-size:11px; margin:0; padding:0; }
      .ticket{ width:70mm; margin:0; text-align:flex-start; padding:1mm; box-sizing:border-box;}
      .header{ font-weight:bold; font-size:11px; margin-bottom:1mm; margin-left:25px; }
      .draw-line{ font-size:11px; margin-bottom:1mm; font-weight:bold; width:70%; margin-left:20px; }
      table{ width:70%; text-align:center; border-collapse:collapse; table-layout:auto; font-size:11px; margin-left:16px; padding:0; }
      th, td{ text-align:center; padding:0; margin:0; font-weight:bold; white-space:nowrap; }
      th+th, td+td{ padding-left:1px !important; }
      tr{ line-height:1.1; }
      .footer{ margin-top:1.5mm; font-size:11px; line-height:1.2; font-weight:bold; margin-left:35px; }
      .barcode{ margin-top:1.5mm; text-align:center; width:100%; display:flex; flex-direction:column; align-items:flex-start; margin-left:40px; }
      .barcode svg{ width:auto; height:30px; margin:0; display:block; }
      .barcode-text{ margin-left:15px; font-size:11px; font-weight:bold; }
      </style>
      </head>
      <body>
      <div class="ticket">
        <div class="header">${printData.mainhead}</div>
        <div class="header">${printData.header}</div>
        <div class="header">${printData.subhead}</div>
        <div class="draw-line"> DrawTime: ${printData.selectedTime} ${printData.drawTime}</div>
        <div class="header">Username ${printData.username}</div>
        <div class="header">Qty: ${printData.quantity} , Points: ${printData.amount}</div>
        <table>
          <tbody>
          ${rows.map(row => `
            <tr>
              ${row.map(t => {
                const [num, qty] = t.split("|");
                return `<td>${num||""}</td><td>${qty||""}</td>`;
              }).join("")}
            </tr>`).join("")}
          </tbody>
        </table>
        <div class="footer">${ticketDate} ${ticketTime}</div>
        <div class="barcode">
          <svg id="barcodeSvg"></svg>
          <span class="barcode-text">${printData.barcode}</span>
        </div>
        <div class="footer">Reprint Ticket</div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
      <script>
        window.onload = function(){
          JsBarcode("#barcodeSvg", "${printData.barcode}", { format:"CODE128", width:3.5, height:70, displayValue:false });
          setTimeout(()=>{ window.print(); window.close(); }, 500);
        };
      </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fw-bold nav10-container" style={{ padding: "0.1rem 0.5rem", overflowX: "auto", minHeight: "32px", width: "100%", borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc", marginBottom: "0.5rem" }}>
      <div className="d-flex flex-nowrap align-items-center" style={{ gap: 0, minWidth: "fit-content", width: "100%" }}>
        <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: "0.1rem" }}>
          <button className="btn btn-primary w-100 fw-bold" data-bs-toggle="modal" data-bs-target="#changePasswordModal" style={{ padding: "0.15rem 0.2rem", height: "clamp(28px, 2vw, 36px)" }}>CHANGE PASSWORD</button>
        </div>
        <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: "0.1rem" }}>
          <button className="btn btn-success w-100 fw-bold" style={{ padding: "0.15rem 0.2rem", height: "clamp(28px, 2vw, 36px)" }} onClick={() => navigate("/twoD")}>2D</button>
        </div>
        <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: "0.1rem" }}>
          <input type="text" value={totalAmount} readOnly className="form-control text-center fw-bold fs-5" style={{ padding: "0.15rem 0.2rem", height: "clamp(28px, 2vw, 36px)" }} />
        </div>
        <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: "0.1rem" }}>
          <input type="text" placeholder="Enter Barcode" value={barcodeInput} onChange={handleBarcodeChange} className="form-control text-center fw-bold fs-5" style={{ padding: "0.15rem 0.2rem", height: "clamp(28px, 2vw, 36px)" }} />
        </div>
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <button className="btn btn-dark w-100 fw-bold" onClick={handleBuy} style={{ padding: "0.15rem 0.2rem", height: "clamp(28px, 2vw, 36px)" }}>BUY-F6</button>
        </div>
      </div>

      {/* PASSWORD MODAL */}
      <div className="modal fade" id="changePasswordModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "450px" }}>
          <div className="modal-content shadow-lg border-0" style={{ borderRadius: "12px", overflow: "hidden" }}>
            <div className="modal-header text-white p-3" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
              <h6 className="modal-title fw-bold">🔑 Change Password</h6>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body p-3" style={{ background: "#f8f9fa" }}>
              <input type="password" className="form-control fw-bold mb-2" placeholder="Current Password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
              <input type="password" className="form-control fw-bold mb-2" placeholder="New Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
              <input type="password" className="form-control fw-bold" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary w-100 fw-bold" onClick={updatePassword}>Update Password</button>
            </div>
          </div>
        </div>
      </div>

      {/* CLAIM MODAL */}
      {showClaimModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(3px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px",
        }}>
          <div style={{
            background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
            color: "#fff",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "420px",
            minHeight: "260px",
            padding: "22px",
            boxShadow: "0 15px 50px rgba(0,0,0,0.6)",
            animation: "scaleIn 0.3s ease",
          }}>
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <h4 style={{ fontWeight: "800", letterSpacing: "1px" }}> Ticket Status</h4>
              <div style={{ height: "4px", width: "60px", background: "#00d4ff", margin: "10px auto 0", borderRadius: "10px" }}></div>
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: "bold", textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>
              {claimStatus}
            </div>
            {claimDetails && claimDetails.winAmount > 0 && (
              <div style={{ fontSize: "1.2rem", textAlign: "center", marginBottom: "20px" }}>
                🎉 Win Amount: {claimDetails.winAmount}
              </div>
            )}
            <button onClick={() => { setShowClaimModal(false); setBarcodeInput(""); setClaimDetails(null); }} style={{ width: "100%", background: "linear-gradient(135deg, #00d4ff, #007bff)", color: "white", border: "none", borderRadius: "14px", padding: "14px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer" }}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav10;