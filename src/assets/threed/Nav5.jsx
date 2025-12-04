// https://thewonder.uk/royalgame/api/logout
// https://thewonder.uk/royalgame/api/get_date

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Nav5 = ({ onZoneChange }) => {
  const navigate = useNavigate();
  const items = ["ALL", "A", "B", "C"];
  const [checkedItems, setCheckedItems] = useState({
    A: true,
    B: false,
    C: false,
    ALL: false,
  });

  const handleChange = (item) => {
    if (item === "ALL") {
      const newChecked = !checkedItems.ALL;
      const newCheckedItems = {
        ALL: newChecked,
        A: newChecked,
        B: newChecked,
        C: newChecked,
      };
      setCheckedItems(newCheckedItems);
    } else {
      const newCheckedItems = {
        ...checkedItems,
        [item]: !checkedItems[item],
      };
      const allSelected =
        newCheckedItems.A && newCheckedItems.B && newCheckedItems.C;
      newCheckedItems.ALL = allSelected;
      setCheckedItems(newCheckedItems);
    }
  };

  // 👇 Send selected zones to App.jsx whenever they change
  useEffect(() => {
    const selectedZones = [];
    if (checkedItems.A) selectedZones.push("A");
    if (checkedItems.B) selectedZones.push("B");
    if (checkedItems.C) selectedZones.push("C");
    console.log("Selected Zones:", selectedZones);
    onZoneChange(selectedZones);
  }, [checkedItems, onZoneChange]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="container-fluid fw-bold text-center" id="nav5-container">
      <div className="row gy-2 gx-2 align-items-center">
        {items.map((item, i) => (
          <div
            key={i}
            className="col-6 col-md-2 d-flex justify-content-center align-items-center"
            style={{ gap: "4px" }}
          >
            <input
              type="checkbox"
              checked={checkedItems[item]}
              onChange={() => handleChange(item)}
              style={{
                height: "30px",
                width: "30px",
                marginRight: "4px",
                verticalAlign: "middle",
              }}
            />
            <label
              className={`fw-bold text-light px-4 py-1 rounded-0 m-0 ${
                item === "A"
                  ? "bg-success"
                  : item === "B"
                  ? "bg-danger"
                  : item === "C"
                  ? "bg-dark"
                  : "bg-primary"
              }`}
              style={{ fontSize: "16px", width: "80%" }}
            >
              {item}
            </label>
          </div>
        ))}

        <button
          type="button"
          className="col-6 col-md btn btn-secondary rounded-0 text-light p-2 fw-bold h-25"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          How to Play
        </button>

        {/* MODAL AND LOGOUT SECTION UNCHANGED */}

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                  How to Play
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body modal-dialog modal-xl">
                <table className="table table-success table-bordered border-dark px-5 w-100 fw-bold">
                  <thead>
                    <tr>
                      <th scope="col">PLAY</th>
                      <th scope="col">NO.</th>
                      <th scope="col">IF LUCKY COUPON DRAWS</th>
                      <th scope="col">POINTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Straight</th>
                      <td>1&nbsp;2&nbsp;3</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; only Excel match Wins
                      </td>
                      <td>900 x 10 = 9000</td>
                    </tr>
                    <tr>
                      <th scope="row">Box-3-Way</th>
                      <td>1&nbsp;1&nbsp;2</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                      </td>
                      <td>300 x 10 = 3000</td>
                    </tr>
                    <tr>
                      <th scope="row">Box-6-Way</th>
                      <td>1&nbsp;2&nbsp;3</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <br />
                        <br />
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                      </td>
                      <td>150 x 10 = 1500</td>
                    </tr>
                    <tr>
                      <th scope="row">Front Pair</th>
                      <td>1&nbsp;2&nbsp;X</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                      </td>
                      <td>90 x 10 = 900</td>
                    </tr>
                    <tr>
                      <th scope="row">Back Pair</th>
                      <td>X&nbsp;2&nbsp;3</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                      </td>
                      <td>90 x 10 = 900</td>
                    </tr>
                    <tr>
                      <th scope="row">Split Pair</th>
                      <td>1&nbsp;X&nbsp;3</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                      </td>
                      <td>90 x 10 = 900</td>
                    </tr>
                    <tr>
                      <th scope="row">Any Pair</th>
                      <td>X&nbsp;2&nbsp;3</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                      </td>
                      <td>30 x 10 = 300</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <button
          className="col-6 col-md btn btn-danger text-light p-2 rounded-0 fw-bold h-25 ms-2"
          onClick={handleLogout}
        >
          Logout (F8)
        </button>
      </div>
    </div>
  );
};

export default Nav5;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Nav5 = ({ onZoneChange }) => {
//   const navigate = useNavigate();
//   const items = ["ALL", "A", "B", "C"];
//   const [checkedItems, setCheckedItems] = useState({
//     A: true,
//     B: false,
//     C: false,
//     ALL: false,
//   });

//   const handleChange = (item) => {
//     if (item === "ALL") {
//       const newChecked = !checkedItems.ALL;
//       const newCheckedItems = {
//         ALL: newChecked,
//         A: newChecked,
//         B: newChecked,
//         C: newChecked,
//       };
//       setCheckedItems(newCheckedItems);
//     } else {
//       const newCheckedItems = {
//         ...checkedItems,
//         [item]: !checkedItems[item],
//       };
//       const allSelected =
//         newCheckedItems.A && newCheckedItems.B && newCheckedItems.C;
//       newCheckedItems.ALL = allSelected;
//       setCheckedItems(newCheckedItems);
//     }
//   };

//   // 👇 Send selected zones to App.jsx whenever they change
//   useEffect(() => {
//     const selectedZones = [];
//     if (checkedItems.A) selectedZones.push("A");
//     if (checkedItems.B) selectedZones.push("B");
//     if (checkedItems.C) selectedZones.push("C");
//     console.log("Selected Zones:", selectedZones);
//     onZoneChange(selectedZones);
//   }, [checkedItems, onZoneChange]);

//   // const handleLogout = () => {
//   //   localStorage.clear();
//   //   console.log("Successfully Logout");
//   //   navigate("/");
//   // };

//   const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("username");
//   navigate("/");
// };

//   return (
//     <div className="container-fluid fw-bold text-center">
//       <div className="row gy-2 gx-2 align-items-center">
//         {items.map((item, i) => (
//           <div
//             key={i}
//             className="col-6 col-md-2 d-flex justify-content-center align-items-center"
//             style={{ gap: "4px" }}
//           >
//             <input
//               type="checkbox"
//               checked={checkedItems[item]}
//               onChange={() => handleChange(item)}
//               style={{
//                 height: "30px",
//                 width: "30px",
//                 marginRight: "4px",
//                 verticalAlign: "middle",
//               }}
//             />
//             <label
//               className={`fw-bold text-light px-4 py-1 rounded-0 m-0 ${
//                 item === "A"
//                   ? "bg-success"
//                   : item === "B"
//                   ? "bg-danger"
//                   : item === "C"
//                   ? "bg-dark"
//                   : "bg-primary"
//               }`}
//               style={{ fontSize: "16px", width: "80%" }}
//             >
//               {item}
//             </label>
//           </div>
//         ))}

//         <button
//           type="button"
//           className="col-6 col-md btn btn-secondary rounded-0 text-light p-2 fw-bold h-25"
//           data-bs-toggle="modal"
//           data-bs-target="#exampleModal"
//         >
//           How to Play
//         </button>
//         <button
//           className="col-6 col-md btn btn-danger text-light p-2 rounded-0 fw-bold h-25 ms-2"
//           onClick={handleLogout}
//         >
//           Logout (F8)
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Nav5;
