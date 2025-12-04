import React, { useState } from "react";
import axios from "axios";
import JsBarcode from "jsbarcode";
import { useNavigate } from "react-router-dom";

const Nav10 = ({
  totalAmount,
  quantity,
  nextSlot,
  displayList,
  selectedZones,
  advancedDraws = [],
  clearDisplayList,
}) => {
  const username =
    localStorage.getItem("username") ||
    JSON.parse(localStorage.getItem("token"))?.username ||
    "User";

  // Password States
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const updatePassword = async () => {
    if (!currentPass || !newPass || !confirmPass) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    if (newPass !== confirmPass) {
      alert("❌ New passwords do not match.");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await axios.post(
        "https://thewonder.uk/royalgame/api/change_password",
        {
          password: newPass,
          password_confirmation: confirmPass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === true) {
        alert("✅ Password Updated Successfully!");
      } else {
        alert("❌ " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    }
  };

  // TIME → HH:MM:SS converter
  const to24HourTime = (timeStr) => {
    if (!timeStr) return "00:00:00";

    timeStr = timeStr
      .replaceAll(".", ":")
      .replaceAll("-", ":")
      .replaceAll(" ", "")
      .toLowerCase();

    const match = timeStr.match(/(\d{1,2}):(\d{1,2})/);
    if (!match) return "00:00:00";

    let hour = parseInt(match[1]);
    let minute = parseInt(match[2]);

    const isPM = timeStr.includes("pm");
    const isAM = timeStr.includes("am");

    if (isPM && hour < 12) hour += 12;
    if (isAM && hour === 12) hour = 0;

    hour = String(hour).padStart(2, "0");
    minute = String(minute).padStart(2, "0");

    return `${hour}:${minute}:00`;
  };

  // BUY
  const handleBuy = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ Please log in first.");
        return;
      }
      const bearer = JSON.parse(token);

      if (!displayList.length) {
        alert("⚠️ Please add at least one number.");
        return;
      }
      if (!selectedZones.length) {
        alert("⚠️ Please select at least one zone.");
        return;
      }

      clearDisplayList();

      // Generate all Tickets
      const expandedTickets = [];
      displayList.forEach((item) => {
        selectedZones.forEach((zone) => {
          expandedTickets.push(
            `${item.number}|${item.type}|${item.rate}|${zone}`
          );
        });
      });

      const ticketList = expandedTickets.join(",");

      // ⭐ QTY and AMOUNT EXACT LOGIC
      const qty = expandedTickets.length;
      const rate = Number(displayList[0].rate);
      const amt = qty * rate;

      // Draw array
      const rawDraws = advancedDraws.length > 0 ? advancedDraws : [nextSlot];
      const is_advance_bet = advancedDraws.length > 0 ? "1" : "0";

      // nxt_draw → 24hr format ONLY
      const drawsToSend = rawDraws.map((t) => to24HourTime(t));

      // Barcode
      const generateBarcode = () => {
        const now = new Date();
        const yy = String(now.getFullYear()).slice(2);
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");
        const rand4 = String(Math.floor(1000 + Math.random() * 9000));
        return `${yy}${mm}${dd}${rand4}`;
      };

      const record_date = new Date().toISOString().slice(0, 10);

      const formatTimeHHMMSS = (date) => {
        const hh = String(date.getHours()).padStart(2, "0");
        const mm = String(date.getMinutes()).padStart(2, "0");
        const ss = String(date.getSeconds()).padStart(2, "0");
        return `${hh}:${mm}:${ss}`;
      };

      const tck_time = formatTimeHHMMSS(new Date());

      // API CALL
      const requests = drawsToSend.map((drawTime, index) => {
        const barcode = generateBarcode();

        const payload = {
          username: username,
          qty: String(qty), // ⭐ 43
          amt: String(amt), // ⭐ 430
          nxt_draw: drawTime,            // 24hr
          draw_time: rawDraws[index],    // original
          barcode: barcode,
          tck_result: ticketList,
          tck_time: tck_time,
          record_date: record_date,
          is_advance_bet: is_advance_bet,
        };

        return axios
          .post("https://freedomplay.us/api/record/insert", payload, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearer}`,
            },
          })
          .then(() => {
            printTicket({
              barcode,
              drawTime: rawDraws[index],
              perDrawAmount: amt,
              perDrawQty: qty,
              ticketList,
            });

            return { error: false };
          })
          .catch((err) => {
            console.error("Insert error:", err?.response || err);
            return { error: true };
          });
      });

      const results = await Promise.all(requests);
      const success = results.filter((r) => !r.error).length;
      const failed = results.length - success;

      alert(
        `✅ ${success} draw(s) inserted successfully ${
          failed > 0 ? `\n❌ ${failed} failed` : ""
        }`
      );

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while placing bets.");
    }
  };

  // PRINT
  const printTicket = ({
    barcode,
    drawTime,
    perDrawAmount,
    perDrawQty,
    ticketList,
  }) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("⚠️ Allow popup to print.");
      return;
    }

    const now = new Date();
    const ticketDate = now.toISOString().slice(0, 10);
    const ticketTime = now.toLocaleTimeString("en-US");

    const tickets = ticketList.split(",");
    const formattedTickets = tickets.map((t) => {
      const [num, type, amount, zone] = t.split("|");
      return `${num} ${type} ${amount}-${zone}`;
    });

    const half = Math.ceil(formattedTickets.length / 2);
    const left = formattedTickets.slice(0, half);
    const right = formattedTickets.slice(half);

    let ticketHtml = `<table style="font-size:14px; width:100%;">`;
    for (let i = 0; i < half; i++) {
      ticketHtml += `
        <tr>
          <td style="padding-right:40px;">${left[i] || ""}</td>
          <td>${right[i] || ""}</td>
        </tr>`;
    }
    ticketHtml += "</table>";

    const svg = document.createElement("svg");
    JsBarcode(svg, barcode, {
      width: 2,
      height: 60,
      fontSize: 16,
      displayValue: true,
      margin: 0,
    });

    const barcodeSvg = svg.outerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <style>
            body { font-family: Arial; width: 260px; padding: 5px; }
            .title { text-align: center; font-size: 22px; font-weight: bold; }
            .line { border-top: 1px dashed #000; margin: 10px 0; }
            .barcode { text-align: center; margin-top: 5px; }
          </style>
        </head>
        <body>

          <div class="title">3D Game</div>
          <div class="line"></div>

          <b>Ticket Date:</b> ${ticketDate}<br/>
          <b>Ticket Time:</b> ${ticketTime}<br/>
          <b>Draw:</b> ${drawTime}<br/>
          <b>UserName:</b> ${username}<br/>
          <b>Qty:</b> ${perDrawQty}<br/>
          <b>Points:</b> ${perDrawAmount}<br/>
          <div class="line"></div>

          <div>${ticketHtml}</div>

          <div class="line"></div>
          <div class="barcode">${barcodeSvg}</div>

          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  // UI (UNCHANGED)
  return (
    <div
      className="fw-bold nav10-container"
      style={{
        padding: "0.1rem 0.5rem",
        overflowX: "auto",
        minHeight: "32px",
        width: "100%",
        borderTop: "1px solid #ccc",
        borderBottom: "1px solid #ccc",
        marginBottom: "0.5rem",
      }}
    >
      <div
        className="d-flex flex-nowrap align-items-center"
        style={{ gap: 0, minWidth: "fit-content", width: "100%" }}
      >
        <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: "0.1rem" }}>
          <button
            className="btn btn-primary w-100 fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#changePasswordModal"
            style={{
               padding: "0.15rem 0.2rem",
               height: "clamp(28px, 2vw, 36px)",
               background: "linear-gradient(to right, #007bff, #0056b3)",
               color: "white"
             }}
          >
            CHANGE PASSWORD
          </button>
        </div>

        <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: "0.1rem" }}>
          <button
            className="btn btn-success w-100 fw-bold"
            style={{
               padding: "0.15rem 0.2rem",
               height: "clamp(28px, 2vw, 36px)",
               background: "linear-gradient(to right, #28a745, #1e7e34)",
               color: "white"
             }}
             onClick={() => navigate('/twoD')}
          >
            2D
          </button>
        </div>

        <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: "0.1rem" }}>
          <input
            type="text"
            value={totalAmount}
            readOnly
            className="form-control text-center fw-bold"
            style={{
              fontSize: "clamp(0.4rem, 1.2vw, 0.6rem)",
              padding: "0.15rem 0.2rem",
              height: "clamp(28px, 2vw, 36px)",
            }}
          />
        </div>

        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <button
            className="btn btn-dark w-100 fw-bold"
            onClick={handleBuy}
            style={{
               padding: "0.15rem 0.2rem",
               height: "clamp(28px, 2vw, 36px)",
             }}
          >
            BUY-F6
          </button>
        </div>
      </div>

      {/* PASSWORD MODAL */}
      <div
        className="modal fade"
        id="changePasswordModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "450px" }}
        >
          <div
            className="modal-content shadow-lg border-0"
            style={{ borderRadius: "12px", overflow: "hidden" }}
          >
            <div
              className="modal-header text-white p-3"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <h6 className="modal-title fw-bold">🔑 Change Password</h6>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body p-3" style={{ background: "#f8f9fa" }}>
              <input
                type="password"
                className="form-control fw-bold mb-2"
                placeholder="Current Password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
              />

              <input
                type="password"
                className="form-control fw-bold mb-2"
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />

              <input
                type="password"
                className="form-control fw-bold"
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary w-100 fw-bold"
                onClick={updatePassword}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav10;

