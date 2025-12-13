import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from './api.js';


const Cancel = () => {
  const [tickets, setTickets] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [currentVed, setCurrentVed] = useState("");
  const [canCancel, setCanCancel] = useState(true);

   const [timeData, setTimeData] = useState({
  currentTime: "10:35:02",
  currentTime12: "10:35:02",
  drawTime12: "10:30",
  drawTime: "10:40 am",
  closeTime: "10:45 am",
  remainingTime: "09:58",
  pointTotal: "17080",
  currentDate: "" // ✅ ADD THIS LINE
});

  const navigate = useNavigate();

const fetchTimeData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/time/getTime`);
      const data = await response.json();

      if (data) {
        const newTimeData = {
          currentDate: data.current_date || timeData.currentDate,
          currentTime: data.current_time_24h || timeData.currentTime,
          currentTime12: data.current_time_12h || timeData.currentTime12,
          drawTime12: data.draw_time_12h || timeData.drawTime12,
          drawTime: data.next_draw_time_12h || timeData.drawTime,
          nextdrawTime: data.next_draw_time_24h || data.closeTime || timeData.closeTime,
          remainingTime: data.remaining_time || timeData.remainingTime,
          pointTotal: data.point_total || timeData.pointTotal
        };

        setTimeData(newTimeData); // ✅ set entire object
        setCurrentVed(newTimeData.currentTime); // ✅ update currentVed
        sessionStorage.setItem('drawTime', newTimeData.drawTime);
        sessionStorage.setItem('drawTime24', data.prevDraw || "");
        sessionStorage.setItem('nextdrawTime', newTimeData.nextdrawTime);
      }
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

  async function fetch2DCurrentRecord() {
    let res = await fetch(`${BASE_URL}/api/record/all2DRecord`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: sessionStorage.getItem("username")
      })
    });

    let data = await res.json();
    // console.log("Fetched 2D Records:", data);
    data = data.records


     const filtered = data.filter(e =>
        e.draw_time > timeData.currentTime &&
        e.record_date === timeData.currentDate
      );

      console.log("Filtered Tickets for Cancellation:", filtered);
      

      setTickets(filtered); // ✅ set only matching ticket


  }

useEffect(() => {
  const interval = setInterval(() => {
    fetchTimeData();
  }, 700);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  if (timeData.currentDate && timeData.currentTime) {
    fetch2DCurrentRecord();
    checkCancelEligibility(timeData.remainingTime);
  }
}, [timeData]);

  const checkCancelEligibility = (remainingTime) => {
    // Convert MM:SS format to seconds
    const [minutes, seconds] = remainingTime.split(':').map(Number);
    const totalSeconds = (minutes * 60) + seconds;
    
    // If less than or equal to 30 seconds remaining, disable cancel
    setCanCancel(totalSeconds > 30);
  };

  const fetchUserBalance = async () => {
    const username = sessionStorage.getItem('username') || "user123";

    setBalanceLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
        })
      });

      const data = await response.json();

      if (data && data.balance !== undefined) {
        setUserBalance(data.balance);
        console.log("User balance fetched:", data.balance);
      } else {
        console.error("Invalid balance response:", data);
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
    } finally {
      setBalanceLoading(false);
    }
  };

const handleCancel = async (barcode) => {
  console.log("Cancelling barcode:", barcode);

  try {
    const res = await fetch(`${BASE_URL}/api/record/cancelTck`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ barcode })
    });

    const data = await res.json();
    console.log("Cancellation response:", data);

    if (data.ok) {
      // ❌ Don't splice by index
      // ✅ Instead, remove all tickets with the same barcode
      const updated = tickets.filter(t => t.barcode !== barcode);
      setTickets(updated);

      fetchUserBalance(); // ✅ Update balance
    } else {
      console.log('Cancellation failed:', data.message);
      alert(data.message || 'Failed to cancel ticket.');
    }

  } catch (err) {
    console.error('Error cancelling ticket:', err);
    alert('Error cancelling ticket.');
  }
};



  return (
    <div className="cancel-ticket-container">
      {/* Header Bar */}
      <div className="header">
        <h2>Cancel Ticket</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      </div>

      {/* Table */}
      <div className="table-container">
        {tickets.length === 0 ? (
          <div>No tickets found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>DrawTime</th>
                <th>Tck Time</th>
                <th>Ticket_Date</th>
                <th>Qty</th>
                <th>Points</th>
                <th>BarcodeNum</th>
                <th>Lottery Name</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, i) => (
                t ? (
                  <tr key={i}>
                    <td>{t.id}</td>
                    <td>{t.username}</td>
                    <td>{t.nxt_draw}</td>
                    <td>{t.tck_time}</td>
                    <td>{t.record_date}</td>
                    <td>{t.qty}</td>
                    <td>{t.amt}</td>
                    <td>{t.barcode}</td>
                    <td>2D</td>
                    <td>
                      <button
  className={`cancel-btn ${!canCancel ? 'disabled' : ''}`}
  onClick={() => handleCancel(t.barcode, i)}
  disabled={!canCancel || !t}
>
  {canCancel ? 'Cancel' : 'Locked'}
</button>
                    </td>
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Styles */}
      <style jsx="true">{`

        .cancel-btn.disabled {
  background: #cccccc;
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none;
}

.cancel-btn:disabled {
  background: #cccccc;
  opacity: 0.7;
  cursor: not-allowed;
}
        .cancel-ticket-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100%;
          background: #e6e6e6;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #e53935;
          color: #fff;
          padding: 12px 20px;
          font-weight: bold;
        }

        .header h2 {
          margin: 0;
          font-size: 1.3rem;
        }

        .back-btn {
          background: #000;
          color: #fff;
          border: 2px solid #fff;
          padding: 6px 14px;
          font-size: 0.9rem;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
        }

        .table-container {
          flex: 1;
          padding: 10px;
          overflow-x: auto;
          overflow-y: auto;
          color: black;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          table-layout: fixed; /* Prevent horizontal expansion */
        }

        th,
        td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
          font-size: 0.9rem;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

      

        /* Specific width for Cancel column */
        th:nth-child(9), td:nth-child(9) {
          width: 100px;
          max-width: 100px;
          padding: 5px;
        }

        /* Cancel button styles */
        .cancel-btn {
          background: #1976d2;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          font-weight: bold;
          cursor: pointer;
          font-size: 0.9rem;
          box-shadow: 0 2px 6px rgba(25, 118, 210, 0.12);
          width: 100%;
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Responsive queries */
        @media (max-width: 768px) {
          .table-container {
            overflow-x: auto;
          }
          
          table {
            min-width: 700px; /* Minimum width to prevent cramping */
          }
          
          th:nth-child(5), td:nth-child(5) {
            width: 120px;
            max-width: 120px;
          }

          th:nth-child(9), td:nth-child(9) {
            width: 80px;
            max-width: 80px;
            padding: 3px;
          }
          
          .cancel-btn {
            font-size: 0.75rem;
            padding: 4px 8px;
          }
          
          th, td { 
            font-size: 0.75rem; 
            padding: 6px; 
          }
        }

        @media (max-width: 480px) {
          th:nth-child(5), td:nth-child(5) {
            width: 100px;
            max-width: 100px;
          }

          th:nth-child(9), td:nth-child(9) {
            width: 70px;
            max-width: 70px;
            padding: 2px;
          }
          
          .cancel-btn {
            font-size: 0.65rem;
            padding: 3px 6px;
          }
          
          th, td { 
            font-size: 0.65rem; 
            padding: 4px; 
          }
        }

        @media (max-width: 360px) {
          th:nth-child(5), td:nth-child(5) {
            width: 80px;
            max-width: 80px;
          }

          th:nth-child(9), td:nth-child(9) {
            width: 60px;
            max-width: 60px;
            padding: 1px;
          }
          
          .cancel-btn {
            font-size: 0.6rem;
            padding: 2px 4px;
          }
          
          th, td { 
            font-size: 0.6rem; 
            padding: 3px; 
          }
        }
      `}</style>
    </div>
  );
};

export default Cancel2D;
