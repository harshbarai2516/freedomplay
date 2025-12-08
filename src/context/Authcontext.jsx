import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

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
    const [checkedRanges, setCheckedRanges] = useState([]); // from Leftcol
    const [checkedMainRanges, setCheckedMainRanges] = useState([]); // from Filter
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

    /* ---------------------- SHARED UPDATE ---------------------- */
    const handleSharedUpdate = (range, type, index, value) => {
        setSharedGridData((prev) => {
            const updated = { ...prev };

            const ensureRange = (r) => {
                if (!updated[r]) {
                    updated[r] = {
                        rows: Array(10).fill(""),
                        cols: Array(10).fill(""),
                        cells: Array.from({ length: 10 }, () => Array(10).fill("")),
                    };
                }
            };

            // 1️⃣ Always update current visible range
            ensureRange(range);
            if (type === "row") {
                updated[range].rows[index] = value;
                updated[range].cells[index] = Array(10).fill(value);
            }
            if (type === "col") {
                updated[range].cols[index] = value;
                updated[range].cells = updated[range].cells.map((row) => {
                    const copy = [...row];
                    copy[index] = value;
                    return copy;
                });
            }

            // 2️⃣ Mirror to checked subranges (Leftcol)
            checkedRanges.forEach((checked) => {
                if (checked === range) return;
                ensureRange(checked);

                if (type === "row") {
                    updated[checked].rows[index] = value;
                    updated[checked].cells[index] = Array(10).fill(value);
                }
                if (type === "col") {
                    updated[checked].cols[index] = value;
                    updated[checked].cells = updated[checked].cells.map((r) => {
                        const copy = [...r];
                        copy[index] = value;
                        return copy;
                    });
                }
            });

            // ✅ STEP 3 — Mirror only the matching subrange of each checked Filter range
            checkedMainRanges.forEach((mainRange) => {
                const [mainStart] = mainRange.split("-");
                const mainBase = parseInt(mainStart, 10) * 100;

                // determine index (0–9) of the current subrange within its own Filter group
                const currentStart = parseInt(range.split("-")[0], 10);
                const currentMainGroup = Math.floor(currentStart / 1000) * 10;
                const offsetIndex = (currentStart / 100) % 10; // 0–9 index

                // compute the corresponding subrange for this Filter range
                const low = String(mainBase + offsetIndex * 100).padStart(4, "0");
                const high = String(mainBase + offsetIndex * 100 + 99).padStart(4, "0");
                const targetSubrange = `${low}-${high}`;

                // skip if same as current (avoid self-mirroring)
                if (targetSubrange === range) return;

                ensureRange(targetSubrange);

                // perform mirror only in that target subrange
                if (type === "row") {
                    updated[targetSubrange].rows[index] = value;
                    updated[targetSubrange].cells[index] = Array(10).fill(value);
                }
                if (type === "col") {
                    updated[targetSubrange].cols[index] = value;
                    updated[targetSubrange].cells = updated[targetSubrange].cells.map((r) => {
                        const copy = [...r];
                        copy[index] = value;
                        return copy;
                    });
                }
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

        // Grid control
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
