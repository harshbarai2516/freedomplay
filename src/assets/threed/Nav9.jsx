import React, { useEffect, useState } from "react";

const Nav9 = ({ displayList = [], onRemove = () => {} }) => {
  const [columns, setColumns] = useState(30);
  const [containerHeight, setContainerHeight] = useState("200px");

  // ⭐ Font-size and desktop flag
  const [fontSize, setFontSize] = useState("8px"); // default for mobile/tablet
  const [isDesktop, setIsDesktop] = useState(false);

  const updateGrid = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 💻 Desktop & Large Desktop → BIG BOLD FONT
    if (width >= 1024) {
      setColumns(40);
      setContainerHeight("200px");
      setFontSize("10px");
      setIsDesktop(true);
      return;
    }

    // 📱 Mobile Landscape
    if (width > height) {
      setColumns(30);
      setContainerHeight("115px");
      setFontSize("8px");
      setIsDesktop(false);
      return;
    }

    // 📱 Mobile Portrait
    if (height > width) {
      setColumns(10);
      setContainerHeight("120px");
      setFontSize("8px");
      setIsDesktop(false);
      return;
    }
  };

  useEffect(() => {
    updateGrid();
    window.addEventListener("resize", updateGrid);
    window.addEventListener("orientationchange", updateGrid);

    return () => {
      window.removeEventListener("resize", updateGrid);
      window.removeEventListener("orientationchange", updateGrid);
    };
  }, []);

  return (
    <div
      className="container-fluid border border-dark my-0 nav9-container"
      style={{
        overflowY: "auto",
        minHeight: containerHeight,
        maxHeight: containerHeight,
        padding: "0.9rem",
      }}
    >
      {displayList.length === 0 ? (
        <p className="text-muted text-center">No numbers added yet.</p>
      ) : (
        <div
          className="d-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "0px",
          }}
        >
          {displayList.map((item, index) => (
            <div
              key={index}
              className="border border-success rounded bg-light text-center"
              style={{
                padding: "3px",
                fontSize: fontSize, // ⭐ Auto Responsive Font Size
                fontWeight: isDesktop ? "bold" : "normal", // Desktop → bold
                lineHeight: "12px",
              }}
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
                className="btn btn-sm fw-bold text-danger p-0 mt-0"
                onClick={() => onRemove(index)}
              >
                <b>X</b>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Nav9;

