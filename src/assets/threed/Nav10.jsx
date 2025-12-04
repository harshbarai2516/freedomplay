import React, { useState} from "react";
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

   const navigate = useNavigate();

  // ⭐ Password States
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // ================================================
  // ⭐ CHANGE PASSWORD FUNCTION (AXIOS FINAL)
  // ================================================
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

      const data = response.data;
      console.log(data);

      if (data.status === true) {
        alert("✅ Password Updated Successfully!");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    }
  };

  // ================================================
  // ⭐ BUY FUNCTION
  // ================================================
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

      const expandedTickets = [];
      displayList.forEach((item) => {
        selectedZones.forEach((zone) => {
          expandedTickets.push(
            `${item.number}|${item.type}|${item.rate}|${zone}`
          );
        });
      });

      const ticketList = expandedTickets.join(",");
      const drawsToSend = advancedDraws.length > 0 ? advancedDraws : [nextSlot];
      const perDrawAmount = Number(totalAmount) / drawsToSend.length;
      const perDrawQty = perDrawAmount;

      const requests = drawsToSend.map((drawTime) =>
        axios
          .post(
            "https://thewonder.uk/royalgame/api/insert_record",
            {
              qty: perDrawQty,
              amt: perDrawAmount,
              nxt_draw: drawTime,
              tck_result: ticketList,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearer}`,
              },
            }
          )
          .then((res) => {
            const barcode = res.data?.data?.barcode;
            if (!barcode) {
              alert("❌ Barcode not received from API.");
              return;
            }

            printTicket({
              barcode,
              drawTime,
              perDrawAmount,
              perDrawQty,
              ticketList,
            });

            return { drawTime, error: false };
          })
          .catch(() => ({ drawTime, error: true }))
      );

      const results = await Promise.all(requests);
      const successCount = results.filter((r) => !r.error).length;
      const failCount = results.length - successCount;

      alert(
        `✅ ${successCount} draw(s) inserted successfully${
          failCount > 0 ? `\n❌ ${failCount} failed` : ""
        }`
      );

      window.location.reload();
    } catch (err) {
      alert("Something went wrong while placing bets.");
    }
  };

  // ================================================
  // ⭐ PRINT FUNCTION
  // ================================================
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
    const leftCol = formattedTickets.slice(0, half);
    const rightCol = formattedTickets.slice(half);

    let ticketHtml = `<table style="font-size:14px; width:100%;">`;
    for (let i = 0; i < half; i++) {
      ticketHtml += `
        <tr>
          <td style="padding-right:40px;">${leftCol[i] || ""}</td>
          <td>${rightCol[i] || ""}</td>
        </tr>
      `;
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
            }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  // =================================================
  // ⭐ RENDER UI
  // =================================================
  return (
    <div className="container-fluid text-center py-2 border border-dark rounded-0 mb-5">
      <div className="row gy-2 gx-2">
        <div className="col-6 col-md">
          <button
            className="btn btn-primary w-100 fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#changePasswordModal"
          >
            Change Password
          </button>
        </div>

        <div className="col-6 col-md">
          <button className="btn btn-success w-100 fw-bold" onClick={() => navigate('/twod')}>2D</button>
        </div>

        <div className="col-6 col-md">
          <input
            type="text"
            value={totalAmount}
            readOnly
            className="form-control text-center fw-bold"
          />
        </div>

        <div className="col-6 col-md">
          <button className="btn btn-dark w-100 fw-bold" onClick={handleBuy}>
            BUY-F6
          </button>
        </div>
      </div>

      {/* ================== CHANGE PASSWORD MODAL ================== */}
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
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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