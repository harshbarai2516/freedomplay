import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  /* ---------------------- AUTH STATE ---------------------- */
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------------- GRID STATE ---------------------- */
  const [mainRange, setMainRange] = useState("00-09");
  const [selectedRange, setSelectedRange] = useState("0000-0099");
  const [checkedRanges, setCheckedRanges] = useState([]); // Leftcol
  const [checkedMainRanges, setCheckedMainRanges] = useState([]); // Filter
  const [sharedGridData, setSharedGridData] = useState({});

  /* ---------------------- AUTH LOGIC ---------------------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  const updateUser = useCallback((newData) => {
    setUser((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  /* ---------------------- GRID LOGIC ---------------------- */
  useEffect(() => {
    const [start] = mainRange.split("-");
    const base = parseInt(start, 10) * 100;
    setSelectedRange(
      `${String(base).padStart(4, "0")}-${String(base + 99).padStart(4, "0")}`
    );
  }, [mainRange]);

  const startNumber = useMemo(() => {
    if (!selectedRange) return 0;
    const [low] = selectedRange.split("-");
    return parseInt(low, 10) || 0;
  }, [selectedRange]);

  /* ---------------------- SHARED UPDATE + MIRROR + QTY/AMT ---------------------- */

  const handleSharedUpdate = (activeRange, type, indexOrObj, value) => {
  setSharedGridData((prev) => {
    const updated = { ...prev };

    // ✅ Helper: create range if not exists
    const ensureRange = (range) => {
      if (!updated[range]) {
        updated[range] = {
          rows: Array(10).fill(""),
          cols: Array(10).fill(""),
          cells: Array.from({ length: 10 }, () => Array(10).fill("")),
          qty: 0,
          amt: 0,
        };
      }
      return updated[range];
    };

    /* -----------------------------------------
       1️⃣ Collect all ranges that should be updated
    ------------------------------------------ */
    const allTargetRanges = new Set();
    if (activeRange) allTargetRanges.add(activeRange);

    // Add Leftcol mirroring
    checkedRanges.forEach((r) => allTargetRanges.add(r));

    /* -----------------------------------------
       2️⃣ Add Filter mirroring (main ↔ subranges)
    ------------------------------------------ */
    const [mainStart] = mainRange.split("-");
    const mainBase = parseInt(mainStart, 10) * 100;

    // Loop through all checked Filter main ranges
    checkedMainRanges.forEach((filterMain) => {
      const [filterStart] = filterMain.split("-");
      const filterBase = parseInt(filterStart, 10) * 100;

      checkedRanges.forEach((subRange) => {
        const [subLowStr] = subRange.split("-");
        const subLow = parseInt(subLowStr, 10);

        // Determine position index of subRange within its block
        const offsetIndex = Math.floor((subLow - mainBase) / 100);

        // Map that offset into the corresponding Filter block
        if (offsetIndex >= 0 && offsetIndex < 10) {
          const mappedLow = filterBase + offsetIndex * 100;
          const mappedHigh = mappedLow + 99;
          const mappedRange = `${String(mappedLow).padStart(4, "0")}-${String(
            mappedHigh
          ).padStart(4, "0")}`;
          allTargetRanges.add(mappedRange);
        }
      });
    });

    /* -----------------------------------------
       3️⃣ Apply updates to allTargetRanges
    ------------------------------------------ */
    allTargetRanges.forEach((range) => {
      const target = ensureRange(range);

      if (type === "row") {
        target.rows[indexOrObj] = value;
        target.cells[indexOrObj] = Array(10).fill(value);
      } else if (type === "col") {
        target.cols[indexOrObj] = value;
        target.cells = target.cells.map((row) => {
          const newRow = [...row];
          newRow[indexOrObj] = value;
          return newRow;
        });
      } else if (type === "cell") {
        const { row, col } = indexOrObj;
        target.cells[row][col] = value;
      }

      // ✅ After updating, recalc Qty and Amt
      const totalQty = target.cells
        .flat()
        .reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
      target.qty = totalQty;
      target.amt = totalQty * 2;
    });

    return updated;
  });
};


  /* ---------------------- CONTEXT VALUE ---------------------- */
  const value = {
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!token,

    // Grid data
    mainRange,
    setMainRange,
    selectedRange,
    setSelectedRange,
    checkedRanges,
    setCheckedRanges,
    checkedMainRanges,
    setCheckedMainRanges,
    sharedGridData,
    setSharedGridData,
    handleSharedUpdate,
    startNumber,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
