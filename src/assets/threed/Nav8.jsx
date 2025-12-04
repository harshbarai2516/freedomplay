// import React, { useEffect, useState, useCallback } from "react";

// const Nav8 = ({
//   numberInput,
//   setNumberInput,
//   selectedRate,
//   setSelectedRate,
//   selectedTypes,
//   setDisplayList,
//   setTotalAmount,
//   rangeFrom,
//   setRangeFrom,
//   rangeTo,
//   setRangeTo,
//   lpickType,
//   setLpickType,
//   inputsDisabled,
// }) => {
//   const [quantity, setQuantity] = useState("");

//   const isTwoDigitOnly =
//     selectedTypes.length > 0 &&
//     selectedTypes.every((t) => ["SP", "FP", "BP", "AP"].includes(t));

//   const getTwoDigitCombo = useCallback((numStr, type) => {
//     const d1 = numStr[0];
//     const d2 = numStr[1];
//     const d3 = numStr[2];
//     switch (type) {
//       case "SP":
//         return d1 + d3;
//       case "FP":
//         return d1 + d2;
//       case "BP":
//         return d2 + d3;
//       case "AP": {
//         const randomType = ["SP", "FP", "BP"][Math.floor(Math.random() * 3)];
//         return getTwoDigitCombo(numStr, randomType);
//       }
//       default:
//         return numStr;
//     }
//   }, []);

//   useEffect(() => {
//     const qty = parseInt(quantity || 0);
//     const total = qty * selectedRate;
//     setTotalAmount(total);
//   }, [quantity, selectedRate, setTotalAmount]);

//   useEffect(() => {
//     const fromValid = isTwoDigitOnly
//       ? /^\d{2}$/.test(rangeFrom)
//       : /^\d{3}$/.test(rangeFrom);
//     const toValid = isTwoDigitOnly
//       ? /^\d{2}$/.test(rangeTo)
//       : /^\d{3}$/.test(rangeTo);
//     if (!fromValid || !toValid) return;

//     const start = parseInt(rangeFrom);
//     const end = parseInt(rangeTo);
//     if (start > end) return;

//     const newItems = [];
//     for (let i = start; i <= end; i++) {
//       const num = i.toString().padStart(3, "0");
//       selectedTypes.forEach((type) => {
//         let finalNumber = num;
//         if (["SP", "FP", "BP", "AP"].includes(type)) {
//           finalNumber = getTwoDigitCombo(num, type);
//         }
//         newItems.push({ number: finalNumber, type, rate: selectedRate });
//       });
//     }

//     setDisplayList([]);
//     setDisplayList((prev) => [...prev, ...newItems]);
//     setRangeFrom("");
//     setRangeTo("");
//   }, [
//     rangeFrom,
//     rangeTo,
//     selectedTypes,
//     selectedRate,
//     isTwoDigitOnly,
//     setDisplayList,
//     setRangeFrom,
//     setRangeTo,
//     getTwoDigitCombo,
//   ]);

//   useEffect(() => {
//     setLpickType(lpickType);
//   }, [lpickType, setLpickType]);

//   return (
//     <div className="container-fluid text-center fw-bold py-2 px-1" id="bco">
//       <div className="row align-items-center">
//         {/* Number Input */}
//         <div className="container-fluid col-12 col-md-3">
//           <input
//             type="text"
//             placeholder="ADD NUMBER"
//             value={numberInput}
//             disabled={inputsDisabled}
//             onChange={(e) => setNumberInput(e.target.value.replace(/\D/g, ""))}
//             className="form-control text-center fw-bold rounded-pill"
//             maxLength={isTwoDigitOnly ? 2 : 3}
//           />
//         </div>

//         {/* Range Input */}
//         <div className="container-fluid col-12 col-md-3" id="range">
//           <div className="container-fluid d-flex flex-wrap justify-content-start me-5">
//             <label className="me-4">Range:</label>
//             <input
//               type="text"
//               placeholder="NUM"
//               maxLength={isTwoDigitOnly ? 2 : 3}
//               value={rangeFrom}
//               disabled={inputsDisabled}
//               onChange={(e) => setRangeFrom(e.target.value.replace(/\D/g, ""))}
//               className="form-control d-inline w-25 mx-2 text-center fw-bold"
//             />
//             <label className="me-4">To</label>
//             <input
//               type="text"
//               placeholder="NUM"
//               maxLength={isTwoDigitOnly ? 2 : 3}
//               value={rangeTo}
//               disabled={inputsDisabled}
//               onChange={(e) => setRangeTo(e.target.value.replace(/\D/g, ""))}
//               className="form-control d-inline w-25 mx-2 text-center fw-bold"
//             />
//           </div>
//         </div>

//         {/* L-pick + Qty */}
//         <div className="container-fluid col-12 col-md-3" id="lpick">
//           <div className="d-flex flex-wrap justify-content-start">
//             <label>L-pick:</label>
//             <select
//               value={lpickType}
//               onChange={(e) => setLpickType(e.target.value)}
//               className="btn btn-secondary dropdown-toggle fw-bold w-25 mx-3"
//             >
//               <option value="BOX">BOX</option>
//               <option value="STR">STR</option>
//             </select>
//             <input
//               type="text"
//               placeholder="ENTER Qty"
//               value={quantity}
//               onChange={(e) => {
//                 const val = e.target.value.replace(/\D/g, "").slice(0, 3);
//                 setQuantity(val);
//               }}
//               className="form-control d-inline w-50 text-center fw-bold"
//             />
//           </div>
//         </div>

//         {/* Rate Selector */}
//         <div className="container-fluid col-12 col-md-3 ra">
//           <div className="d-flex flex-wrap justify-content-start px-1">
//             <label>Rate:</label>
//             {[10, 20, 30, 40, 50, 100, 200].map((rate) => (
//               <div key={rate} className="mx-1 text-center">
//                 <input
//                   type="radio"
//                   name="rate"
//                   id={`rate-${rate}`}
//                   checked={selectedRate === rate}
//                   onChange={() => setSelectedRate(rate)}
//                 /> <br/>
//                 <label htmlFor={`rate-${rate}`} className="me-0">
//                   {rate}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Nav8;

import React, { useEffect, useState, useCallback } from "react";

const Nav8 = ({
  numberInput,
  setNumberInput,
  selectedRate,
  setSelectedRate,
  selectedTypes,
  setDisplayList,
  setTotalAmount,
  rangeFrom,
  setRangeFrom,
  rangeTo,
  setRangeTo,
  lpickType,
  setLpickType,
  inputsDisabled,
}) => {
  const [quantity, setQuantity] = useState("");

  const isTwoDigitOnly =
    selectedTypes.length > 0 &&
    selectedTypes.every((t) => ["SP", "FP", "BP", "AP"].includes(t));

  const getTwoDigitCombo = useCallback((numStr, type) => {
    const d1 = numStr[0];
    const d2 = numStr[1];
    const d3 = numStr[2];
    switch (type) {
      case "SP":
        return d1 + d3;
      case "FP":
        return d1 + d2;
      case "BP":
        return d2 + d3;
      case "AP": {
        const randomType = ["SP", "FP", "BP"][Math.floor(Math.random() * 3)];
        return getTwoDigitCombo(numStr, randomType);
      }
      default:
        return numStr;
    }
  }, []);

  useEffect(() => {
    const qty = parseInt(quantity || 0);
    const total = qty * selectedRate;
    setTotalAmount(total);
  }, [quantity, selectedRate, setTotalAmount]);

  useEffect(() => {
    const fromValid = isTwoDigitOnly
      ? /^\d{2}$/.test(rangeFrom)
      : /^\d{3}$/.test(rangeFrom);
    const toValid = isTwoDigitOnly
      ? /^\d{2}$/.test(rangeTo)
      : /^\d{3}$/.test(rangeTo);
    if (!fromValid || !toValid) return;

    const start = parseInt(rangeFrom);
    const end = parseInt(rangeTo);
    if (start > end) return;

    const newItems = [];
    for (let i = start; i <= end; i++) {
      const num = i.toString().padStart(3, "0");
      selectedTypes.forEach((type) => {
        let finalNumber = num;
        if (["SP", "FP", "BP", "AP"].includes(type)) {
          finalNumber = getTwoDigitCombo(num, type);
        }
        newItems.push({ number: finalNumber, type, rate: selectedRate });
      });
    }

    setDisplayList([]);
    setDisplayList((prev) => [...prev, ...newItems]);
    setRangeFrom("");
    setRangeTo("");
  }, [
    rangeFrom,
    rangeTo,
    selectedTypes,
    selectedRate,
    isTwoDigitOnly,
    setDisplayList,
    setRangeFrom,
    setRangeTo,
    getTwoDigitCombo,
  ]);

  useEffect(() => {
    setLpickType(lpickType);
  }, [lpickType, setLpickType]);

  return (
    <div className="container-fluid text-center fw-bold py-2 px-1" id="bco">
      <div className="row align-items-center">

        {/* Number Input */}
        <div className="container-fluid col-12 col-md-3">
          <input
            type="text"
            placeholder="ADD NUMBER"
            value={numberInput}
            disabled={inputsDisabled}
            onChange={(e) => setNumberInput(e.target.value.replace(/\D/g, ""))}
            className="form-control text-center fw-bold rounded-pill"
            maxLength={isTwoDigitOnly ? 2 : 3}
          />
        </div>

        {/* Range Input */}
        <div className="container-fluid col-12 col-md-3" id="range">
          <div className="container-fluid d-flex flex-wrap justify-content-start me-5">
            <label className="me-4">Range:</label>
            <input
              type="text"
              placeholder="NUM"
              maxLength={isTwoDigitOnly ? 2 : 3}
              value={rangeFrom}
              disabled={inputsDisabled}
              onChange={(e) => setRangeFrom(e.target.value.replace(/\D/g, ""))}
              className="form-control d-inline w-25 mx-2 text-center fw-bold"
            />
            <label className="me-4">To</label>
            <input
              type="text"
              placeholder="NUM"
              maxLength={isTwoDigitOnly ? 2 : 3}
              value={rangeTo}
              disabled={inputsDisabled}
              onChange={(e) => setRangeTo(e.target.value.replace(/\D/g, ""))}
              className="form-control d-inline w-25 mx-2 text-center fw-bold"
            />
          </div>
        </div>

        {/* L-pick + Qty */}
        <div className="container-fluid col-12 col-md-3" id="lpick">
          <div className="d-flex flex-wrap justify-content-start">
            <label>L-pick:</label>
            <select
              value={lpickType}
              onChange={(e) => setLpickType(e.target.value)}
              className="btn btn-secondary dropdown-toggle fw-bold w-25 mx-3"
            >
              <option value="BOX">BOX</option>
              <option value="STR">STR</option>
            </select>
            <input
              type="text"
              placeholder="ENTER Qty"
              value={quantity}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                setQuantity(val);
              }}
              className="form-control d-inline w-50 text-center fw-bold"
            />
          </div>
        </div>

        {/* Rate Selector */}
        <div className="container-fluid col-12 col-md-3 ra">
          <div className="d-flex flex-wrap justify-content-start px-1 ">

            <label className="me-2">Rate:</label>

            { [10, 20, 30, 40, 50, 100, 200].map((rate) => (
              <div key={rate} className="mx-1 text-center">
                <div className="d-flex flex-column align-items-center mx-1">
                  <input
                    type="radio"
                    name="rate"
                    id={`rate-${rate}`}
                    checked={selectedRate === rate}
                    onChange={() => setSelectedRate(rate)}
                  />

                  <label htmlFor={`rate-${rate}`} className="fw-bold">
                    {rate}
                  </label>
                </div>
              </div>
            )) }

          </div>
        </div>

      </div>
    </div>
  );
};

export default Nav8;