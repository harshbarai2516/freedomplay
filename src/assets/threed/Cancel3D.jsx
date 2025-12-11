// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import axios from "axios";

// const Cancel = () => {
//   const navigate = useNavigate();
//   const [date, setDate] = useState(new Date());
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const formatDate = (d) => {
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const fetchTickets = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const rawToken = localStorage.getItem("token");
//       if (!rawToken) {
//         alert("Please log in again.");
//         navigate("/");
//         return;
//       }

//       const token = JSON.parse(rawToken);
//       const formattedDate = formatDate(date);

//       const response = await axios.get(
//         "https://thewonder.uk/royalgame/api/cancel_ticket_threed",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { date: formattedDate },
//         }
//       );

//       if (response.data.status && Array.isArray(response.data.data)) {
//         setTickets(response.data.data);
//       } else {
//         setTickets([]);
//       }
//     } catch (err) {
//       console.error("API Error:", err);
//       setError("Failed to load tickets. Please try again.");
//       setTickets([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [date, navigate]);

//   const handleCancel = async (barcode) => {
//     const confirmCancel = window.confirm(
//       `Are you sure you want to cancel ticket ${barcode}?`
//     );
//     if (!confirmCancel) return;

//     try {
//       const rawToken = localStorage.getItem("token");
//       if (!rawToken) {
//         alert("Please log in again.");
//         navigate("/login");
//         return;
//       }

//       const token = JSON.parse(rawToken);
      

//       const response = await axios.post(
//         "https://thewonder.uk/royalgame/api/cancle_barcode_threed",
//         { barcode },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.status) {
//         alert("✅ Ticket cancelled successfully!");
//         fetchTickets();
//       } else {
//         alert("❌ Failed to cancel ticket: " + (response.data.message || ""));
//       }
//     } catch (err) {
//       console.error("Cancel API Error:", err);
//       alert("❌ Error cancelling ticket.");
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) fetchTickets();
//   }, [fetchTickets]);

//   return (
//     <div style={{ background: "#F9F8F6", minHeight: "100vh" }}>
//       <div className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
//         {/* Calendar */}
//         <div className="p-2">
//           <div className="container-fluid text-center">
//             <div className="row">
//               <div className="col text-primary fw-bold fs-5">
//                 <div className="position-relative">
//                   <button
//                     type="button"
//                     className="btn btn-secondary dropdown-toggle w-50 fw-bold border border-secondary rounded-pill"
//                     style={{ marginRight: "40%" }}
//                     onClick={() => setShowCalendar(!showCalendar)}
//                   >
//                     {date.toDateString()}
//                   </button>

//                   {showCalendar && (
//                     <div
//                       className="position-absolute bg-white p-2 shadow rounded"
//                       style={{ zIndex: 999 }}
//                     >
//                       <Calendar onChange={setDate} value={date} />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Home Button */}
//         <div className="container-fluid p-2">
//           <button
//             type="button"
//             className="btn fw-bold fs-6 rounded-pill px-5"
//             style={{
//               background: "gray",
//               color: "white",
//               marginLeft: "70%",
//               width: "30%",
//             }}
//             onClick={() => navigate("/home")}
//           >
//             Home
//           </button>
//         </div>
//       </div>

//       {/* Tickets Table */}
//       {/* ⬇️ This div creates scrollable tbody using Bootstrap */}
//       <div className="p-0" style={{ maxHeight: "650px", overflowY: "auto" }}>
//         {loading ? (
//           <div className="text-center">Loading tickets...</div>
//         ) : error ? (
//           <div className="text-center text-danger">{error}</div>
//         ) : (
//           <table className="table table-secondary table-striped table-hover">
//             <thead className="table-dark sticky-top">
//               <tr>
//                 <th>#</th>
//                 <th>DrawTime</th>
//                 <th>QTY</th>
//                 <th>Points</th>
//                 <th>Barcode</th>
//                 <th>Cancel</th>
//               </tr>
//             </thead>

//             <tbody>
//               {tickets.length > 0 ? (
//                 tickets.map((t, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{t.nxt_draw || "N/A"}</td>
//                     <td>{t.qty}</td>
//                     <td>{t.amt}</td>
//                     <td>{t.barcode}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger btn-sm fw-bold"
//                         onClick={() => handleCancel(t.barcode)}
//                       >
//                         Cancel
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     No Tickets Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cancel;

// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import axios from "axios";

// const Cancel = () => {
//   const navigate = useNavigate();
//   const [date, setDate] = useState(new Date());
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const formatDate = (d) => {
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const fetchTickets = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const rawToken = localStorage.getItem("token");
//       if (!rawToken) {
//         alert("Please log in again.");
//         navigate("/");
//         return;
//       }

//       const token = JSON.parse(rawToken);
//       const username = "akshay"; // You can make this dynamic if needed

//       // ✅ NEW POST API instead of old GET API
//       const response = await axios.post(
//         "https://freedomplay.us/api/threedreport/getUpcomingRecords",
//         { username },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.ok && Array.isArray(response.data.upcomingRecords.data)) {
//         setTickets(response.data.upcomingRecords.data);
//       } else {
//         setTickets([]);
//       }
//     } catch (err) {
//       console.error("API Error:", err);
//       setError("Failed to load tickets. Please try again.");
//       setTickets([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [navigate]);

//   const handleCancel = async (barcode) => {
//     const confirmCancel = window.confirm(
//       `Are you sure you want to cancel ticket ${barcode}?`
//     );
//     if (!confirmCancel) return;

//     try {
//       const rawToken = localStorage.getItem("token");
//       if (!rawToken) {
//         alert("Please log in again.");
//         navigate("/login");
//         return;
//       }

//       const token = JSON.parse(rawToken);

//       const response = await axios.post(
//         "https://thewonder.uk/royalgame/api/cancle_barcode_threed",
//         { barcode },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.status) {
//         alert("✅ Ticket cancelled successfully!");
//         fetchTickets();
//       } else {
//         alert("❌ Failed to cancel ticket: " + (response.data.message || ""));
//       }
//     } catch (err) {
//       console.error("Cancel API Error:", err);
//       alert("❌ Error cancelling ticket.");
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) fetchTickets();
//   }, [fetchTickets]);

//   return (
//     <div style={{ background: "#F9F8F6", minHeight: "100vh" }}>
//       <div className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
//         {/* Calendar */}
//         <div className="p-2">
//           <div className="container-fluid text-center">
//             <div className="row">
//               <div className="col text-primary fw-bold fs-5">
//                 <div className="position-relative">
//                   <button
//                     type="button"
//                     className="btn btn-secondary dropdown-toggle w-50 fw-bold border border-secondary rounded-pill"
//                     style={{ marginRight: "40%" }}
//                     onClick={() => setShowCalendar(!showCalendar)}
//                   >
//                     {date.toDateString()}
//                   </button>

//                   {showCalendar && (
//                     <div
//                       className="position-absolute bg-white p-2 shadow rounded"
//                       style={{ zIndex: 999 }}
//                     >
//                       <Calendar onChange={setDate} value={date} />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Home Button */}
//         <div className="container-fluid p-2">
//           <button
//             type="button"
//             className="btn fw-bold fs-6 rounded-pill px-5"
//             style={{
//               background: "gray",
//               color: "white",
//               marginLeft: "70%",
//               width: "30%",
//             }}
//             onClick={() => navigate("/home")}
//           >
//             Home
//           </button>
//         </div>
//       </div>

//       {/* Tickets Table */}
//       <div className="p-0" style={{ maxHeight: "650px", overflowY: "auto" }}>
//         {loading ? (
//           <div className="text-center">Loading tickets...</div>
//         ) : error ? (
//           <div className="text-center text-danger">{error}</div>
//         ) : (
//           <table className="table table-secondary table-striped table-hover">
//             <thead className="table-dark sticky-top">
//               <tr>
//                 <th>Username</th>
//                 <th>Draw Time</th>
//                 <th>Ticket Date</th>
//                 <th>QTY</th>
//                 <th>Points</th>
//                 <th>Barcode</th>
//                 <th>Cancel</th>
//               </tr>
//             </thead>

//             <tbody>
//               {tickets.length > 0 ? (
//                 tickets.map((t, index) => (
//                   <tr key={index}>
//                     <td>{t.username}</td>
//                     <td>{t.drawTime || "N/A"}</td>
//                     <td>{t.date || "N/A"}</td>
//                     <td>{t.qty}</td>
//                     <td>{t.amt}</td>
//                     <td>{t.barcode}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger btn-sm fw-bold"
//                         onClick={() => handleCancel(t.barcode)}
//                       >
//                         Cancel
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center">
//                     No Tickets Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cancel;

// i want to cancel ticket using this api https://freedomplay.us/api/Threedreport/cancelTicket remove old api https://thewonder.uk/royalgame/api/cancle_barcode_threed
// and pass this parameter
// {
// "id" : "1",
// "username": "akshay",
// "qty": "60",
// "amt": "600",
// "nxt_draw": "13:00:00",
// "draw_time": "01:00PM",
// "barcode": "2512064539",
// "tck_result": "234|BOX|10|A,235|BOX|10|A,238|BOX|10|A,243|BOX|10|A,245|BOX|10|A,248|BOX|10|A,253|BOX|10|A,254|BOX|10|A,258|BOX|10|A,283|BOX|10|A,284|BOX|10|A,285|BOX|10|A,324|BOX|10|A,325|BOX|10|A,328|BOX|10|A,342|BOX|10|A,345|BOX|10|A,348|BOX|10|A,352|BOX|10|A,354|BOX|10|A,358|BOX|10|A,382|BOX|10|A,384|BOX|10|A,385|BOX|10|A,423|BOX|10|A,425|BOX|10|A,428|BOX|10|A,432|BOX|10|A,435|BOX|10|A,438|BOX|10|A,452|BOX|10|A,453|BOX|10|A,458|BOX|10|A,482|BOX|10|A,483|BOX|10|A,485|BOX|10|A,523|BOX|10|A,524|BOX|10|A,528|BOX|10|A,532|BOX|10|A,534|BOX|10|A,538|BOX|10|A,542|BOX|10|A,543|BOX|10|A,548|BOX|10|A,582|BOX|10|A,583|BOX|10|A,584|BOX|10|A,823|BOX|10|A,824|BOX|10|A,825|BOX|10|A,832|BOX|10|A,834|BOX|10|A,835|BOX|10|A,842|BOX|10|A,843|BOX|10|A,845|BOX|10|A,852|BOX|10|A,853|BOX|10|A,854|BOX|10|A",
// "tck_time": "12:48:31"

// }
// and this is response
// {
//   "ok": true,
//   "message": "Ticket cancelled successfully. Refunded: 600 for draws: 01:00PM"
// }

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import "./Cancel3D.css";


const Cancel3D = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const rawToken = localStorage.getItem("token");
      if (!rawToken) {
        alert("Please log in again.");
        navigate("/");
        return;
      }

      const token = JSON.parse(rawToken);
      const username = "akshay"; // You can make this dynamic if needed

      const response = await axios.post(
        "https://freedomplay.us/api/threedreport/getUpcomingRecords",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data.ok &&
        Array.isArray(response.data.upcomingRecords.data)
      ) {
        const timeToSeconds = (timeStr) => {
          if (!timeStr) return 0;

          const [time, period] = timeStr.trim().split(" ");
          let [hours, minutes] = time.split(":").map(Number);

          if (period === "PM" && hours !== 12) hours += 12;
          if (period === "AM" && hours === 12) hours = 0;

          return hours * 3600 + minutes * 60;
        };

        const sorted =
          response.data.upcomingRecords.data.sort(
            (a, b) => timeToSeconds(b.drawTime) - timeToSeconds(a.drawTime)
          );

        setTickets(sorted);
      } else {
        setTickets([]);
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load tickets. Please try again.");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleCancel = async (ticket) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel ticket ${ticket.barcode}?`
    );
    if (!confirmCancel) return;

    try {
      const rawToken = localStorage.getItem("token");
      if (!rawToken) {
        alert("Please log in again.");
        navigate("/login");
        return;
      }

      const token = JSON.parse(rawToken);

      const response = await axios.post(
        "https://freedomplay.us/api/Threedreport/cancelTicket",
        {
          id: ticket.id,
          username: ticket.username,
          qty: ticket.qty,
          amt: ticket.amt,
          nxt_draw: ticket.nxt_draw || ticket.upcomingDraws || "",
          draw_time: ticket.drawTime,
          barcode: ticket.barcode,
          tck_result: ticket.ticketResult || ticket.tck_result || "",
          tck_time: ticket.tck_time || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.ok) {
        alert(`✅ ${response.data.message}`);
        fetchTickets();
      } else {
        alert("❌ Failed to cancel ticket.");
      }
    } catch (err) {
      console.error("Cancel API Error:", err);
      alert("❌ Error cancelling ticket.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="cancel-page">
      {/* Header Section */}
      <div className="cancel-header">
        {/* Date Picker */}
        <div className="position-relative">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle date-btn"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {date.toDateString()}
          </button>

          {showCalendar && (
            <div
              className="position-absolute bg-white p-2 shadow rounded"
              style={{ zIndex: 999 }}
            >
              <Calendar onChange={setDate} value={date} />
            </div>
          )}
        </div>

        {/* Home Button */}
        <button
          type="button"
          className="home-btn"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
      </div>

      {/* Tickets Table */}
      <div className="ticket-wrapper mt-3">
        <div className="ticket-scroll">
          {loading ? (
            <div className="text-center py-3">Loading tickets...</div>
          ) : error ? (
            <div className="text-center text-danger py-3">{error}</div>
          ) : (
            <table className="table ticket-table table-striped table-hove">
              <thead className="sticky-top">
                <tr>
                  <th>Username</th>
                  <th>Draw Time</th>
                  <th>Ticket Date</th>
                  <th>QTY</th>
                  <th>Points</th>
                  <th>Barcode</th>
                  <th>Cancel</th>
                </tr>
              </thead>

              <tbody>
                {tickets.length > 0 ? (
                  tickets.map((t, index) => (
                    <tr key={index}>
                      <td>{t.username}</td>
                      <td>{t.drawTime || "N/A"}</td>
                      <td>{t.date || "N/A"}</td>
                      <td>{t.qty}</td>
                      <td>{t.amt}</td>
                      <td>{t.barcode}</td>
                      <td>
                        <button
                          className="btn btn-danger cancel-btn fw-bold"
                          onClick={() => handleCancel(t)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-3">
                      No Tickets Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cancel3D;


