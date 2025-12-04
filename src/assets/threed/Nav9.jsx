import React from "react";

const Nav9 = ({ displayList = [], onRemove = () => {} }) => {
  return (
    <div
      className="container-fluid border border-dark my-0 overflow-scroll"
      id="greedi"
      style={{
        minHeight: "190px",
        maxHeight: "190px",
        padding: "1rem",
      }}
    >
      {displayList.length === 0 ? (
        <p className="text-muted text-center">No numbers added yet.</p>
      ) : (
        <div
          className="d-grid gap-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(30, 1fr)",
            gap: "8px",
          }}
        >
          {displayList.map((item, index) => (
            <div
              key={index}
              className="border border-success rounded bg-light text-center p-2"
              style={{ fontSize: "10px" }}
            >
              <div>
                <b>{item.number}</b>
              </div>
              <div>
                <b>{item.type}</b>
              </div>
              <div>
                <b>₹{item.rate}</b>
              </div>
              <button
                className="btn btn-sm fw-bold text-danger p-0 mt-1"
                onClick={() => onRemove(index)}
              >
                <b id="clo">X</b>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Nav9;