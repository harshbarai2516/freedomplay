import React, { useState } from "react";

const Nav6 = ({
  setDisplayList,
  selectedRate,
  rangeFrom,
  rangeTo,
  lpickType = "BOX",
  setInputsDisabled,
}) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selected, setSelected] = useState([]);

  const [isSingle, setIsSingle] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isTriple, setIsTriple] = useState(false);

  const toggleNumber = (num) => {
    if (selected.includes(num)) {
      setSelected(selected.filter((n) => n !== num));
    } else {
      setSelected([...selected, num]);
    }
  };

  const toggleAll = () => {
    if (selected.length === numbers.length) {
      setSelected([]);
    } else {
      setSelected([...numbers]);
    }
  };

  const generateSingleCombinations = (arr) => {
    const combos = [];
    arr.forEach((a) => {
      arr.forEach((b) => {
        arr.forEach((c) => {
          if (a !== b && b !== c && a !== c) combos.push(`${a}${b}${c}`);
        });
      });
    });
    return combos;
  };

  const generateDuplicateCombinations = (arr) => {
    const combos = [];
    arr.forEach((a) => {
      arr.forEach((b) => {
        if (a !== b) {
          combos.push(`${a}${a}${b}`);
          combos.push(`${a}${b}${a}`);
          combos.push(`${b}${a}${a}`);
        }
      });
    });
    return [...new Set(combos)];
  };

  const generateTripleCombinations = (arr) => arr.map((n) => `${n}${n}${n}`);

  const handleLuckyPick = () => {
    setInputsDisabled(false);
    const count = Math.floor(Math.random() * 7) + 3;
    const shuffled = [...numbers].sort(() => 0.5 - Math.random());
    const randomNums = shuffled.slice(0, count).sort((a, b) => a - b);
    setSelected(randomNums);
    
    const combos = generateSingleCombinations(randomNums);
    const finalCombos = combos.map((num) => ({
      number: num,
      type: "BOX",
      rate: selectedRate,
    }));
    setDisplayList(finalCombos);
  };

  const handleMotor = () => {
    if (selected.length === 0) return;

    setInputsDisabled(true);

    let combos = [];
    if (isSingle) {
      combos = generateSingleCombinations(selected);
    } else if (isDuplicate) {
      combos = generateDuplicateCombinations(selected);
    } else if (isTriple) {
      combos = generateTripleCombinations(selected);
    } else {
      combos = generateSingleCombinations(selected);
    }

    const finalCombos = combos.map((num) => ({
      number: num,
      type: lpickType,
      rate: selectedRate,
    }));

    setDisplayList((prev) => [...prev, ...finalCombos]);
  };

  return (
    <div className="container-fluid px-3 bg-info nav6-wrapper">
      <button
        className={`btn mx-1 my-1 fw-bold ${
          selected.length === numbers.length
            ? "btn-danger text-light"
            : "btn-light border-dark"
        }`}
        onClick={toggleAll}
      >
        ALL
      </button>

      {numbers.map((num) => (
        <button
          key={num}
          onClick={() => toggleNumber(num)}
          className={`btn mx-2 px-4 my-2 fw-bold ${
            selected.includes(num)
              ? "btn-danger text-light"
              : "btn-light border-dark"
          }`}
        >
          {num}
        </button>
      ))}

      <div className="d-block d-md-inline-block mt-2">
        <input
          type="checkbox"
          checked={isSingle}
          onChange={() => {
            setIsSingle(!isSingle);
            setIsDuplicate(false);
            setIsTriple(false);
          }}
        />
        <label className="me-5 mx-1 fw-bold">Single</label>

        <input
          type="checkbox"
          checked={isDuplicate}
          onChange={() => {
            setIsDuplicate(!isDuplicate);
            setIsSingle(false);
            setIsTriple(false);
          }}
        />
        <label className="me-5 mx-1 fw-bold">Duplicate</label>

        <input
          type="checkbox"
          checked={isTriple}
          onChange={() => {
            setIsTriple(!isTriple);
            setIsSingle(false);
            setIsDuplicate(false);
          }}
        />
        <label className="me-5 mx-1 fw-bold">Triple</label>

        <button
          className="btn btn-primary me-1 fw-bold fs-6 my-1 px-5 rounded-0"
          onClick={handleMotor}
        >
          Motor
        </button>

        <button
          className="btn btn-primary fw-bold fs-6 my-1 px-4 rounded-0"
          onClick={handleLuckyPick}
        >
          Lucky Pick
        </button>
      </div>
    </div>
  );
};

export default Nav6;

// import React, { useState } from "react";

// const Nav6 = ({
//   setDisplayList,
//   selectedRate,
//   rangeFrom,
//   rangeTo,
//   lpickType = "BOX",
//   setInputsDisabled,
// }) => {
//   const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//   const [selected, setSelected] = useState([]);
//   const [isSingle, setIsSingle] = useState(false);
//   const [isDuplicate, setIsDuplicate] = useState(false);
//   const [isTriple, setIsTriple] = useState(false);

//   const toggleNumber = (num) => {
//     if (selected.includes(num)) {
//       setSelected(selected.filter((n) => n !== num));
//     } else {
//       setSelected([...selected, num]);
//     }
//   };

//   const toggleAll = () => {
//     if (selected.length === numbers.length) {
//       setSelected([]);
//     } else {
//       setSelected([...numbers]);
//     }
//   };

//   const generateSingleCombinations = (arr) => {
//     const combos = [];
//     arr.forEach((a) => {
//       arr.forEach((b) => {
//         arr.forEach((c) => {
//           if (a !== b && b !== c && a !== c) combos.push(`${a}${b}${c}`);
//         });
//       });
//     });
//     return combos;
//   };

//   const generateDuplicateCombinations = (arr) => {
//     const combos = [];
//     arr.forEach((a) => {
//       arr.forEach((b) => {
//         if (a !== b) {
//           combos.push(`${a}${a}${b}`);
//           combos.push(`${a}${b}${a}`);
//           combos.push(`${b}${a}${a}`);
//         }
//       });
//     });
//     return [...new Set(combos)];
//   };

//   const generateTripleCombinations = (arr) => arr.map((n) => `${n}${n}${n}`);

//   const handleLuckyPick = () => {
//     setInputsDisabled(false);
//     const count = Math.floor(Math.random() * 7) + 3;
//     const shuffled = [...numbers].sort(() => 0.5 - Math.random());
//     const randomNums = shuffled.slice(0, count).sort((a, b) => a - b);
//     setSelected(randomNums);

//     const combos = generateSingleCombinations(randomNums);
//     const finalCombos = combos.map((num) => ({
//       number: num,
//       type: "BOX",
//       rate: selectedRate,
//     }));
//     setDisplayList(finalCombos);
//   };

//   const handleMotor = () => {
//     if (selected.length === 0) return;
//     setInputsDisabled(true);

//     let combos = [];
//     if (isSingle) combos = generateSingleCombinations(selected);
//     else if (isDuplicate) combos = generateDuplicateCombinations(selected);
//     else if (isTriple) combos = generateTripleCombinations(selected);
//     else combos = generateSingleCombinations(selected);

//     const finalCombos = combos.map((num) => ({
//       number: num,
//       type: lpickType,
//       rate: selectedRate,
//     }));

//     setDisplayList((prev) => [...prev, ...finalCombos]);
//   };

//   return (
//     <div className="container-fluid bg-info py-2 px-2">
//       <div className="row gx-1 gy-1 align-items-center">
//         {/* ALL Button */}
//         <div className="col-3 col-sm-2 col-md-auto">
//           <button
//             className={`btn w-100 fw-bold ${
//               selected.length === numbers.length
//                 ? "btn-danger text-light"
//                 : "btn-light border-dark"
//             }`}
//             onClick={toggleAll}
//           >
//             ALL
//           </button>
//         </div>

//         {/* Number Buttons */}
//         {numbers.map((num) => (
//           <div key={num} className="col-2 col-sm-1 col-md-auto">
//             <button
//               onClick={() => toggleNumber(num)}
//               className={`btn w-100 fw-bold ${
//                 selected.includes(num)
//                   ? "btn-danger text-light"
//                   : "btn-light border-dark"
//               }`}
//             >
//               {num}
//             </button>
//           </div>
//         ))}

//         {/* Checkboxes */}
//         <div className="col-12 col-sm-12 col-md-auto d-flex flex-wrap align-items-center mt-2 mt-md-0">
//           <div className="form-check me-3">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="singleCheck"
//               checked={isSingle}
//               onChange={() => {
//                 setIsSingle(!isSingle);
//                 setIsDuplicate(false);
//                 setIsTriple(false);
//               }}
//             />
//             <label className="form-check-label fw-bold" htmlFor="singleCheck">
//               Single
//             </label>
//           </div>

//           <div className="form-check me-3">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="duplicateCheck"
//               checked={isDuplicate}
//               onChange={() => {
//                 setIsDuplicate(!isDuplicate);
//                 setIsSingle(false);
//                 setIsTriple(false);
//               }}
//             />
//             <label
//               className="form-check-label fw-bold"
//               htmlFor="duplicateCheck"
//             >
//               Duplicate
//             </label>
//           </div>

//           <div className="form-check me-3">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="tripleCheck"
//               checked={isTriple}
//               onChange={() => {
//                 setIsTriple(!isTriple);
//                 setIsSingle(false);
//                 setIsDuplicate(false);
//               }}
//             />
//             <label className="form-check-label fw-bold" htmlFor="tripleCheck">
//               Triple
//             </label>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="col-12 col-sm-12 col-md-auto d-flex flex-wrap mt-2 mt-md-0">
//           <div className="me-2 mb-2 mb-md-0">
//             <button
//               className="btn btn-primary fw-bold"
//               onClick={handleMotor}
//             >
//               Motor
//             </button>
//           </div>
//           <div className="mb-2 mb-md-0">
//             <button
//               className="btn btn-primary fw-bold"
//               onClick={handleLuckyPick}
//             >
//               Lucky Pick
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Nav6;
