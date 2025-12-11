// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const Result = () => {
//   const navigate = useNavigate();
//   const [date, setDate] = useState(new Date());
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [results, setResults] = useState([]);

//   // Format date
//   function formatDate(d) {
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   }

//   const fetchResults = async () => {
//     const selectedDate = formatDate(date);

//     try {
//       const response = await fetch(
//         "https://thewonder.uk/royalgame/api/result_threed",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             res_date: selectedDate,
//           }),
//         }
//       );

//       const data = await response.json();
//       console.log("API Response:", data);

//       if (!data.status || !data.data) {
//         setResults([]);
//         return;
//       }

//       setResults(data.data);
//       console.log("Total results:", data.data.length);
//     } catch (err) {
//       console.error("API Error:", err);
//       setResults([]);
//     }
//   };

//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//     setShowCalendar(false);
//   };

//   useEffect(() => {
//     fetchResults();
//   }, [fetchResults]);

//   return (
//     <div style={{ background: "#F9F8F6", minHeight: "100vh" }}>
//       {/* Back Button */}
//       <div className="container-fluid p-2">
//         <button
//           type="button"
//           className="btn fw-bold fs-6 rounded-pill px-5 bg-dark text-white"
//           style={{ width: "10%" }}
//           onClick={() => navigate("/home")}
//         >
//           Back
//         </button>
//       </div>

//       {/* Date + Go Button */}
//       <div className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
//         <div className="p-2">
//           <div className="container-fluid text-center">
//             <div className="row">
//               <div className="col text-primary fw-bold fs-5">
//                 <div className="position-relative">
//                   {/* Date button */}
//                   <button
//                     type="button"
//                     className="btn btn-secondary dropdown-toggle w-50 fw-bold border border-secondary rounded-pill"
//                     onClick={() => setShowCalendar(!showCalendar)}
//                   >
//                     {date.toDateString()}
//                   </button>

//                   {/* Calendar */}
//                   {showCalendar && (
//                     <div
//                       className="position-absolute bg-white p-2 shadow rounded"
//                       style={{ zIndex: 999 }}
//                     >
//                       <Calendar onChange={handleDateChange} value={date} />
//                     </div>
//                   )}

//                   {/* Go Button */}
//                   <button
//                     type="button"
//                     className="btn btn-secondary border-1 rounded-pill fw-bold ms-3"
//                     onClick={fetchResults}
//                   >
//                     Go
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RESULTS TABLE */}
//       <div
//         className="table-responsive"
//         style={{
//           maxHeight: "80vh",
//           overflowY: "scroll",
//           marginTop: "10px",
//         }}
//       >
//         <table className="table table-secondary table-striped table-hover">
//           <thead className="table-dark sticky-top" style={{ top: 0 }}>
//             <tr>
//               <th>#</th>
//               <th>DrawTime</th>
//               <th>Date</th>
//               <th>Game</th>
//               <th>Straight</th>
//               <th>Box</th>
//               <th>Split Pair</th>
//               <th>Front Pair</th>
//               <th>Back Pair</th>
//               <th>Any Pair</th>
//             </tr>
//           </thead>

//           <tbody>
//             {results.length > 0 ? (
//               results.map((row, index) => (
//                 <tr key={index}>
//                   <th>{index + 1}</th>
//                   <td>{row.res_time}</td>
//                   <td>{row.res_date}</td>
//                   <td>{row.game}</td>
//                   <td>{row.straight}</td>
//                   <td>{row.box}</td>
//                   <td>{row.splitpair}</td>
//                   <td>{row.frontpair}</td>
//                   <td>{row.backpair}</td>
//                   <td>{row.anypair}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" className="text-center">
//                   No result found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Result;

// ***********************************************************

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const Result = () => {
//   const navigate = useNavigate();
//   const [date, setDate] = useState(new Date());
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [results, setResults] = useState([]);

//   // Format calendar date to YYYY-MM-DD
//   function formatDate(d) {
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   }

//   // ---------------------------
//   // FETCH RESULTS (DATE-WISE)
//   // ---------------------------

//   const fetchResults = async () => {
//     try {
//       const response = await fetch(
//         "https://freedomplay.us/api/results/3dAllResult",
//         { method: "GET" }
//       );

//       const data = await response.json();
//       if (!data.ok || !data.results) {
//         setResults([]);
//         return;
//       }

//       let items = data.results;

//       // ----------------------------------------
//       // FILTER BY SELECTED DATE
//       // ----------------------------------------
//       const selectedDate = formatDate(date);

//       items = items.filter((item) => {
//         const apiDate = item.result_date?.split("T")[0];
//         return apiDate === selectedDate;
//       });

//       // --------------------------------------------
//       // FILTER TIME RANGE (09:00 AM - 11:00 PM)
//       // --------------------------------------------
//       const convertToMinutes = (timeStr) => {
//         if (!timeStr) return null;
//         const [h, m] = timeStr.split(":");
//         return parseInt(h) * 60 + parseInt(m);
//       };

//       const MIN = convertToMinutes("09:00");
//       const MAX = convertToMinutes("23:00");

//       items = items.filter((item) => {
//         const t = convertToMinutes(item.draw_time);
//         return t >= MIN && t <= MAX;
//       });

//       // ----------------------------------------
//       // SORT IN DESCENDING ORDER
//       // ----------------------------------------
//       items.sort(
//         (a, b) =>
//           convertToMinutes(b.draw_time) - convertToMinutes(a.draw_time)
//       );

//       // ----------------------------------------
//       // CONVERT TIME TO 12-HOUR FORMAT
//       // ----------------------------------------
//       const to12Hour = (timeStr) => {
//         let [h, m] = timeStr.split(":");
//         h = parseInt(h);
//         let ampm = h >= 12 ? "PM" : "AM";
//         h = h % 12 || 12;
//         return `${h}:${m} ${ampm}`;
//       };

//       items = items.map((item) => ({
//         ...item,
//         draw_time_12: to12Hour(item.draw_time),
//       }));

//       setResults(items);
//     } catch (error) {
//       console.error("API Error:", error);
//       setResults([]);
//     }
//   };

//   // Calendar select
//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//     setShowCalendar(false);
//   };

//   useEffect(() => {
//     fetchResults();
//   }, []);

//   return (
//     <div style={{ background: "#F9F8F6", minHeight: "100vh" }}>
//       {/* Back Button */}
//       <div className="container-fluid p-2">
//         <button
//           type="button"
//           className="btn fw-bold fs-6 rounded-pill px-5 bg-dark text-white"
//           style={{ width: "10%" }}
//           onClick={() => navigate("/home")}
//         >
//           Back
//         </button>
//       </div>

//       {/* Date Picker & Go Button */}
//       <div className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
//         <div className="p-2">
//           <div className="container-fluid text-center">
//             <div className="row">
//               <div className="col text-primary fw-bold fs-5">
//                 <div className="position-relative">
//                   <button
//                     type="button"
//                     className="btn btn-secondary dropdown-toggle w-50 fw-bold border border-secondary rounded-pill"
//                     onClick={() => setShowCalendar(!showCalendar)}
//                   >
//                     {date.toDateString()}
//                   </button>

//                   {showCalendar && (
//                     <div
//                       className="position-absolute bg-white p-2 shadow rounded"
//                       style={{ zIndex: 999 }}
//                     >
//                       <Calendar onChange={handleDateChange} value={date} />
//                     </div>
//                   )}

//                   <button
//                     type="button"
//                     className="btn btn-secondary border-1 rounded-pill fw-bold ms-3"
//                     onClick={fetchResults}
//                   >
//                     Go
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div
//         className="table-responsive"
//         style={{
//           maxHeight: "80vh",
//           overflowY: "scroll",
//           marginTop: "10px",
//         }}
//       >
//         <table className="table table-secondary table-striped table-hover">
//           <thead className="table-dark sticky-top" style={{ top: 0 }}>
//             <tr>
//               <th>DrawTime</th>
//               <th>Date</th>
//               <th>Game</th>
//               <th>Straight</th>
//               <th>Box</th>
//               <th>Split Pair</th>
//               <th>Front Pair</th>
//               <th>Back Pair</th>
//               <th>Any Pair</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.length > 0 ? (
//               results.map((row, i) => (
//                 <tr key={i}>
//                   <td>{row.draw_time_12}</td>
//                   <td>{row.result_date?.split("T")[0]}</td>
//                   <td>{row.game}</td>
//                   <td>{row.straight}</td>
//                   <td>{row.box}</td>
//                   <td>{row.splitpair}</td>
//                   <td>{row.frontpair}</td>
//                   <td>{row.backpair}</td>
//                   <td>{row.anypair}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" className="text-center">
//                   No Result Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Result;

// ****************************************************

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Result3D = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [results, setResults] = useState([]);

  // Format calendar date to YYYY-MM-DD
  function formatDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // ---------------------------
  // FETCH RESULTS (DATE-WISE)
  // ---------------------------
  const fetchResults = async () => {
    try {
      const response = await fetch(
        "https://freedomplay.us/api/results/3dAllResult",
        { method: "GET" }
      );

      const data = await response.json();
      if (!data.ok || !data.results) {
        setResults([]);
        return;
      }

      let items = data.results;

      // Selected date
      const selectedDate = formatDate(date);

      // Filter by selected date
      items = items.filter((item) => {
        const apiDate = item.result_date?.split("T")[0];
        return apiDate === selectedDate;
      });

      // --------------------------------------------
      // TIME RANGE LOGIC
      // --------------------------------------------
      const convertToMinutes = (timeStr) => {
        if (!timeStr) return null;
        const [h, m] = timeStr.split(":");
        return parseInt(h) * 60 + parseInt(m);
      };

      const MIN = convertToMinutes("09:00");
      const MAX = convertToMinutes("22:00");

      const today = new Date();
      const isToday = selectedDate === formatDate(today);

      // TODAY — cutoff at last completed 15-minute slot
      let currentMinutes = null;
      if (isToday) {
        const nowH = today.getHours();
        const nowM = today.getMinutes();
        const totalMin = nowH * 60 + nowM;

        // Round DOWN to nearest :00, :15, :30, :45
        currentMinutes = totalMin - (totalMin % 15);
      }

      items = items.filter((item) => {
        const t = convertToMinutes(item.draw_time);

        if (!isToday) {
          // Previous dates — full results
          return t >= MIN && t <= MAX;
        }

        // Today — show up to last completed slot only
        return t >= MIN && t <= currentMinutes;
      });

      // ----------------------------------------
      // SORT IN DESCENDING ORDER
      // ----------------------------------------
      items.sort(
        (a, b) =>
          convertToMinutes(b.draw_time) -
          convertToMinutes(a.draw_time)
      );

      // ----------------------------------------
      // CONVERT TO 12-HOUR FORMAT
      // ----------------------------------------
      const to12Hour = (timeStr) => {
        let [h, m] = timeStr.split(":");
        h = parseInt(h);
        let ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        return `${h}:${m} ${ampm}`;
      };

      items = items.map((item) => ({
        ...item,
        draw_time_12: to12Hour(item.draw_time),
      }));

      setResults(items);
    } catch (error) {
      console.error("API Error:", error);
      setResults([]);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div style={{ background: "#F9F8F6", minHeight: "100vh" }}>
      {/* Back Button */}
      <div className="container-fluid p-2">
        <button
          type="button"
          className="btn fw-bold fs-6 rounded-pill px-5 bg-dark text-white"
          style={{ width: "10%" }}
          onClick={() => navigate("/home")}
        >
          Back
        </button>
      </div>

      {/* Date Picker */}
      <div className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="p-2">
          <div className="container-fluid text-center">
            <div className="row">
              <div className="col text-primary fw-bold fs-5">
                <div className="position-relative">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle w-50 fw-bold border border-secondary rounded-pill"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    {date.toDateString()}
                  </button>

                  {showCalendar && (
                    <div
                      className="position-absolute bg-white p-2 shadow rounded"
                      style={{ zIndex: 999 }}
                    >
                      <Calendar onChange={handleDateChange} value={date} />
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn btn-secondary border-1 rounded-pill fw-bold ms-3"
                    onClick={fetchResults}
                  >
                    Go
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS TABLE */}
      <div
        className="table-responsive"
        style={{
          maxHeight: "80vh",
          overflowY: "scroll",
          marginTop: "10px",
        }}
      >
        <table className="table table-secondary table-striped table-hover">
          <thead className="table-dark sticky-top" style={{ top: 0 }}>
            <tr>
              <th>DrawTime</th>
              <th>Date</th>
              <th>Game</th>
              <th>Straight</th>
              <th>Box</th>
              <th>Split Pair</th>
              <th>Front Pair</th>
              <th>Back Pair</th>
              <th>Any Pair</th>
            </tr>
          </thead>

          <tbody>
            {results.length > 0 ? (
              results.map((row, i) => (
                <tr key={i}>
                  <td>{row.draw_time_12}</td>
                  <td>{row.result_date?.split("T")[0]}</td>
                  <td>{row.game}</td>
                  <td>{row.straight}</td>
                  <td>{row.box}</td>
                  <td>{row.splitpair}</td>
                  <td>{row.frontpair}</td>
                  <td>{row.backpair}</td>
                  <td>{row.anypair}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No Result Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result3D;
