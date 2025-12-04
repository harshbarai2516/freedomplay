// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Nav4 = ({ onDrawSelect }) => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [balance, setBalance] = useState(null);
//   const [remainingDraws, setRemainingDraws] = useState([]);
//   const [selectedDraws, setSelectedDraws] = useState([]);
//   const [drawCount, setDrawCount] = useState("");

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) setUsername(storedUsername);

//     const tokenStr = localStorage.getItem("token");
//     let token = null;
//     try {
//       token = JSON.parse(tokenStr);
//     } catch (e) {
//       token = tokenStr;
//     }

//     if (!token) {
//       console.error("No token, cannot fetch balance");
//       return;
//     }

//     axios
//       .get("https://thewonder.uk/royalgame/api/balance", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         if (res.data && res.data.balance !== undefined) {
//           setBalance(res.data.balance);
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to fetch balance", err);
//       });

//     generateRemainingDraws();
//   }, []);

//   const generateRemainingDraws = () => {
//     const allDrawTimes = [];
//     const startTime = new Date();
//     startTime.setHours(8, 0, 0, 0); // 8:00 AM
//     const endTime = new Date();
//     endTime.setHours(22, 0, 0, 0); // 10:00 PM

//     while (startTime <= endTime) {
//       const hours = startTime.getHours();
//       const minutes = startTime.getMinutes();
//       const ampm = hours >= 12 ? "PM" : "AM";
//       const formattedTime = `${String(hours > 12 ? hours - 12 : hours).padStart(
//         2,
//         "0"
//       )}:${String(minutes).padStart(2, "0")} ${ampm}`;
//       allDrawTimes.push(formattedTime);
//       startTime.setMinutes(startTime.getMinutes() + 15);
//     }

//     const now = new Date();
//     const futureDraws = allDrawTimes.filter((timeStr) => {
//       const [t, period] = timeStr.split(" ");
//       const [h, m] = t.split(":");
//       let hours = parseInt(h);
//       const minutes = parseInt(m);
//       if (period === "PM" && hours !== 12) hours += 12;
//       if (period === "AM" && hours === 12) hours = 0;

//       const drawTime = new Date();
//       drawTime.setHours(hours, minutes, 0, 0);

//       return drawTime > now;
//     });

//     setRemainingDraws(futureDraws);
//   };

//   const Refresh = () => window.location.reload();

//   const toggleDrawSelection = (time) => {
//     setSelectedDraws((prev) =>
//       prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
//     );
//   };

//   const handleDrawCountChange = (e) => {
//     const val = e.target.value.replace(/\D/g, "");
//     setDrawCount(val);

//     if (val === "") {
//       setSelectedDraws([]);
//       return;
//     }

//     const count = Math.min(parseInt(val), remainingDraws.length);
//     setSelectedDraws(remainingDraws.slice(0, count));
//   };

//   // const handleOk = () => {
//   //   console.log("Selected Draws:", selectedDraws);
//   //   alert(`Selected Draws: ${selectedDraws.join(", ")}`);
//   // };

//   const handleOk = () => {
//     if (onDrawSelect) onDrawSelect(selectedDraws);
//     alert(`Selected Draws: ${selectedDraws.join(", ")}`);
//   };

//   return (
//     <div className="container-fluid fw-bold py-1 px-0">
//       <div className="container-fluid text-center">
//         <div className="row gy-2 gx-2 flex-wrap" id="navRow1">
//           {/* Username and Balance */}
//           <div className="col-12 col-md text-danger fw-bold">
//             {username
//               ? `${username} : ${balance !== null ? balance : "Loading..."}`
//               : "Guest : 00000"}
//           </div>

//           {/* Buttons */}
//           <button
//             onClick={Refresh}
//             className="col-6 col-md btn btn-danger rounded-0 text-light fw-bold"
//             type="button"
//           >
//             REFRESH(F5)
//           </button>

//           <button
//             onClick={() => navigate("/result")}
//             className="col-6 col-md btn btn-success rounded-0 text-light fw-bold"
//             type="button"
//           >
//             RESULT(F1)
//           </button>

//            <button
//             onClick={() => navigate("/account")}
//             className="col-6 col-md btn btn-secondary rounded-0 text-light fw-bold"
//             type="button"
//           >
//             ACCOUNT(F2)
//           </button>
//           <button
//             onClick={() => navigate("/reprint")}
//             className="col-6 col-md btn btn-primary rounded-0 text-light fw-bold"
//             type="button"
//           >
//             REPRINT(F3)
//           </button>

//           <button
//             onClick={() => navigate("/cancel")}
//             className="col-6 col-md btn btn-secondary rounded-0 text-light fw-bold"
//             type="button"
//           >
//             CANCEL(F4)
//           </button>

//           {/* ✅ ADVANCE DRAW BUTTON */}
//           <button
//             type="button"
//             className="col-12 col-md btn btn-danger text-light rounded-0 fw-bold"
//             data-bs-toggle="modal"
//             data-bs-target="#staticBackdrop"
//           >
//             ADVANCE DRAW(F9)
//             {selectedDraws.length > 0 && <sup>{selectedDraws.length}</sup>}
//           </button>

//           {/* MODAL */}
//           <div
//             className="modal fade"
//             id="staticBackdrop"
//             data-bs-backdrop="static"
//             data-bs-keyboard="false"
//             tabIndex={-1}
//             aria-labelledby="staticBackdropLabel"
//             aria-hidden="true"
//           >
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content fw-bold">
//                 <div className="modal-header">
//                   <h1
//                     className="modal-title fs-5 fw-bold"
//                     id="staticBackdropLabel"
//                   >
//                     Advanced Draw
//                   </h1>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   ></button>
//                 </div>

//                 {/* ✅ Scrollable Modal Body */}
//                 <div
//                   className="modal-body overflow-auto"
//                   style={{ maxHeight: "50vh" }} // scrolls within modal
//                 >
//                   <h3 className="modal-title fs-5 fw-bold mb-3">
//                     Remaining Draws
//                   </h3>

//                   <input
//                     type="text"
//                     value={drawCount}
//                     onChange={handleDrawCountChange}
//                     placeholder="Enter number of draws"
//                     className="form-control mb-3 w-50 m-auto text-center fw-bold"
//                   />

//                   {remainingDraws.length > 0 ? (
//                     remainingDraws.map((time, index) => (
//                       <React.Fragment key={index}>
//                         <button
//                           type="button"
//                           className={`btn rounded-0 m-1 ${
//                             selectedDraws.includes(time)
//                               ? "btn-success"
//                               : "btn-outline-dark"
//                           }`}
//                           onClick={() => toggleDrawSelection(time)}
//                         >
//                           {time}
//                         </button>
//                         {(index + 1) % 5 === 0 && <br />}
//                       </React.Fragment>
//                     ))
//                   ) : (
//                     <p className="text-danger">No remaining draws today.</p>
//                   )}
//                 </div>

//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={handleOk}
//                     data-bs-dismiss="modal"
//                   >
//                     OK
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     data-bs-dismiss="modal"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* End of Modal */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Nav4;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Nav4 = ({ onDrawSelect }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(null);
  const [remainingDraws, setRemainingDraws] = useState([]);
  const [selectedDraws, setSelectedDraws] = useState([]);
  const [drawCount, setDrawCount] = useState("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
    const tokenStr = localStorage.getItem("token");
    let token = null;
    try {
      token = JSON.parse(tokenStr);
    } catch (e) {
      token = tokenStr;
    }
    if (!token) {
      console.error("No token, cannot fetch balance");
      return;
    }
    axios
      .get("https://thewonder.uk/royalgame/api/balance", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.balance !== undefined) {
          setBalance(res.data.balance);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch balance", err);
      });
    generateRemainingDraws();
  }, []);
  const generateRemainingDraws = () => {
    const allDrawTimes = [];
    const startTime = new Date();
    startTime.setHours(8, 0, 0, 0); // 8:00 AM
    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0); // 10:00 PM
    while (startTime <= endTime) {
      const hours = startTime.getHours();
      const minutes = startTime.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedTime = `${String(hours > 12 ? hours - 12 : hours).padStart(
        2,
        "0"
      )}:${String(minutes).padStart(2, "0")} ${ampm}`;
      allDrawTimes.push(formattedTime);
      startTime.setMinutes(startTime.getMinutes() + 15);
    }
    const now = new Date();
    const futureDraws = allDrawTimes.filter((timeStr) => {
      const [t, period] = timeStr.split(" ");
      const [h, m] = t.split(":");
      let hours = parseInt(h);
      const minutes = parseInt(m);
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      const drawTime = new Date();
      drawTime.setHours(hours, minutes, 0, 0);
      return drawTime > now;
    });
    setRemainingDraws(futureDraws);
  };
  const Refresh = () => window.location.reload();
  const toggleDrawSelection = (time) => {
    setSelectedDraws((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };
  const handleDrawCountChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    setDrawCount(val);
    if (val === "") {
      setSelectedDraws([]);
      return;
    }
    const count = Math.min(parseInt(val), remainingDraws.length);
    setSelectedDraws(remainingDraws.slice(0, count));
  };
  const handleOk = () => {
    if (onDrawSelect) onDrawSelect(selectedDraws);
    alert(`Selected Draws: ${selectedDraws.join(", ")}`);
  };
  return (
    <div className="container-fluid fw-bold py-1 px-0">
      <div className="container-fluid text-center">
        <div className="row gy-2 gx-2 flex-wrap" id="navRow1">
          {/* Username and Balance */}
          <div className="col-12 col-md text-danger fw-bold">
            {username
              ? `${username} : ${balance !== null ? balance : "Loading..."}`
              : "Guest : 00000"}
          </div>

          {/* Buttons */}
          <button
            onClick={Refresh}
            className="col-6 col-md btn btn-danger rounded-0 text-light fw-bold"
            type="button"
          >
            REFRESH(F5)
          </button>

          <button
            onClick={() => navigate("/result")}
            className="col-6 col-md btn btn-success rounded-0 text-light fw-bold"
            type="button"
          >
            RESULT(F1)
          </button>

           <button
            onClick={() => navigate("/account")}
            className="col-6 col-md btn btn-secondary rounded-0 text-light fw-bold"
            type="button"
          >
            ACCOUNT(F2)
          </button>
          <button
            onClick={() => navigate("/reprint")}
            className="col-6 col-md btn btn-primary rounded-0 text-light fw-bold"
            type="button"
          >
            REPRINT(F3)
          </button>

          <button
            onClick={() => navigate("/cancel")}
            className="col-6 col-md btn btn-secondary rounded-0 text-light fw-bold"
            type="button"
          >
            CANCEL(F4)
          </button>

          {/* ✅ ADVANCE DRAW BUTTON */}
          <button
            type="button"
            className="col-12 col-md btn btn-danger text-light rounded-0 fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            ADVANCE DRAW(F9)
            {selectedDraws.length > 0 && <sup>{selectedDraws.length}</sup>}
          </button>

          {/* MODAL */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content fw-bold">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 fw-bold"
                    id="staticBackdropLabel"
                  >
                    Advanced Draw
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                {/* ✅ Scrollable Modal Body */}
                <div
                  className="modal-body overflow-auto"
                  style={{ maxHeight: "50vh" }} // scrolls within modal
                >
                  <h3 className="modal-title fs-5 fw-bold mb-3">
                    Remaining Draws
                  </h3>

                  <input
                    type="text"
                    value={drawCount}
                    onChange={handleDrawCountChange}
                    placeholder="Enter number of draws"
                    className="form-control mb-3 w-50 m-auto text-center fw-bold"
                  />

                  {remainingDraws.length > 0 ? (
                    remainingDraws.map((time, index) => (
                      <React.Fragment key={index}>
                        <button
                          type="button"
                          className={`btn rounded-0 m-1 ${
                            selectedDraws.includes(time)
                              ? "btn-success"
                              : "btn-outline-dark"
                          }`}
                          onClick={() => toggleDrawSelection(time)}
                        >
                          {time}
                        </button>
                        {(index + 1) % 5 === 0 && <br />}
                      </React.Fragment>
                    ))
                  ) : (
                    <p className="text-danger">No remaining draws today.</p>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleOk}
                    data-bs-dismiss="modal"
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Nav4;

/* ✅ Keep your existing desktop design as is */
// #navRow1 {
//   display: flex;
//   flex-wrap: wrap;
// }

// /* ✅ Tablet & Mobile responsiveness */
// @media (max-width: 992px) {
//   #navRow1 {
//     display: flex;
//     flex-wrap: nowrap;         /* all in one line */
//     overflow-x: hidden;          /* horizontal scroll if needed */
//     scrollbar-width: none;     /* hide scrollbar (Firefox) */
//   }

//   #navRow1::-webkit-scrollbar {
//     display: none;             /* hide scrollbar (Chrome, Safari) */
//   }

//   #navRow1 .col-12,
//   #navRow1 .col-6,
//   #navRow1 button {
//     flex: 0 0 auto;            /* prevent wrapping */
//     width: auto;               /* auto width for each item */
//     min-width: 128px;          /* adjust for mobile fit */
//     margin-top: 4px;
//   }

//   #navRow1 .btn,
//   #navRow1 .bg-success,
//   #navRow1 .bg-primary,
//   #navRow1 .bg-secondary,
//   #navRow1 .text-danger {
//     font-size: 0.6rem;        /* smaller font for mobile/tablet */
//     padding: 2px 4px;          /* reduce height */
//     text-align: center;
//   }
// }

// @media (max-width: 768px){
//  #navRow1 {
//     display: flex;
//     flex-wrap: nowrap;         /* all in one line */
//     overflow-x: hidden;          /* horizontal scroll if needed */
//     scrollbar-width: none;     /* hide scrollbar (Firefox) */
//   }

//   #navRow1::-webkit-scrollbar {
//     display: none;             /* hide scrollbar (Chrome, Safari) */
//   }

//   #navRow1 .col-12,
//   #navRow1 .col-6,
//   #navRow1 button {
//     flex: 0 0 auto;            /* prevent wrapping */
//     width: auto;               /* auto width for each item */
//     min-width: 100px;          /* adjust for mobile fit */
//     margin-top: 4px;
//   }

//   #navRow1 .btn,
//   #navRow1 .bg-success,
//   #navRow1 .bg-primary,
//   #navRow1 .bg-secondary,
//   #navRow1 .text-danger {
//     font-size: 0.6rem;        /* smaller font for mobile/tablet */
//     padding: 2px 4px;          /* reduce height */
//     text-align: center;
//   }
// }

// /* ✅ Even smaller phones (≤576px) */
// @media (max-width: 576px) {
//   #navRow1 .btn,
//   #navRow1 .bg-success,
//   #navRow1 .bg-primary,
//   #navRow1 .bg-secondary,
//   #navRow1 .text-danger {
//     font-size: 0.5rem;
//     padding: 3px 4px;
//     margin-top: 4px;
//   }

//   #navRow1 .col-12,
//   #navRow1 .col-6,
//   #navRow1 button {
//     min-width: 55px;          /* tighter fit for smaller phones */
//   }
// }
