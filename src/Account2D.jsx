import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Printer, Search, X, Calendar, User } from "lucide-react";

function Accounts() {
    const navigate = useNavigate();

    // State for filters
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);

    // Mock data for demonstration
    const accountData = [{
        username: "john_doe",
        play: 12500,
        win: 8500,
        commission: 750.50,
        net: 3249.50
    }];

    const handleSubmit = () => {
        console.log("Fetching records for:", fromDate, "to", toDate);
        // Add your API call logic here
    };

    const handlePrint = (row) => {
        console.log("Printing record:", row);
        // Add your print logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-2 md:p-4">
            {/* Main Container */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-pink-600 to-purple-700 px-4 py-4 md:px-6 md:py-5">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <User className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                ACCOUNTS SUMMARY
                            </h1>
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                        >
                            <X className="w-5 h-5" />
                            <span className="hidden sm:inline">Close</span>
                        </button>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="w-full px-2 sm:px-4 md:px-6 py-3 md:py-5 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                    <div className="flex flex-wrap items-end justify-between gap-3 w-full">

                        {/* Date Filters */}
                        <div className="flex flex-wrap items-end gap-3 flex-grow">
                            {/* From Date */}
                            <div className="flex flex-col w-[47%] sm:w-auto min-w-[130px] flex-grow">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 whitespace-nowrap">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    From Date
                                </label>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm md:text-base"
                                />
                            </div>

                            {/* To Date */}
                            <div className="flex flex-col w-[47%] sm:w-auto min-w-[130px] flex-grow">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 whitespace-nowrap">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    To Date
                                </label>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm md:text-base"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-end gap-2 sm:gap-3 flex-shrink-0">
                            <button
                                onClick={handleSubmit}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
                            >
                                <Search className="w-5 h-5" />
                                <span>Submit</span>
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
                            >
                                <X className="w-5 h-5" />
                                <span>Close</span>
                            </button>
                        </div>
                    </div>
                </div>


                {/* ✅ Table Section — fully responsive, no horizontal scroll */}
                <div className="w-full px-2 sm:px-4 md:px-6 py-3">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden w-full">
                        <table className="w-full text-[3.2vw] sm:text-sm md:text-base">
                            <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                                <tr className="text-center sm:text-left">
                                    <th className="px-2 py-2 sm:px-3 sm:py-3 font-semibold uppercase text-[3vw] sm:text-xs md:text-sm tracking-wide">
                                        User
                                    </th>
                                    <th className="px-2 py-2 sm:px-3 sm:py-3 font-semibold uppercase text-[3vw] sm:text-xs md:text-sm">
                                        Play
                                    </th>
                                    <th className="px-2 py-2 sm:px-3 sm:py-3 font-semibold uppercase text-[3vw] sm:text-xs md:text-sm">
                                        Win
                                    </th>
                                    <th className="px-2 py-2 sm:px-3 sm:py-3 font-semibold uppercase text-[3vw] sm:text-xs md:text-sm">
                                        Comm.
                                    </th>
                                    <th className="px-2 py-2 sm:px-3 sm:py-3 font-semibold uppercase text-[3vw] sm:text-xs md:text-sm">
                                        Net
                                    </th>
                                    <th className="px-2 py-2 sm:px-3 sm:py-3 font-semibold uppercase text-[3vw] sm:text-xs md:text-sm">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {accountData.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-6 text-gray-500 text-[3vw] sm:text-sm"
                                        >
                                            No records found
                                        </td>
                                    </tr>
                                ) : (
                                    accountData.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-gray-50 text-center sm:text-left transition-all duration-150"
                                        >
                                            <td className="px-2 py-2 sm:px-3 sm:py-3 break-words">
                                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                                    <div className="h-7 w-7 sm:h-9 sm:w-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-[3vw] sm:text-sm">
                                                        {row.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="text-gray-800 font-semibold truncate max-w-[25vw] sm:max-w-none">
                                                        {row.username}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-2 py-2 sm:px-3 sm:py-3">
                                                <span className="font-bold text-blue-700 text-[3vw] sm:text-sm">
                                                    ${row.play.toLocaleString()}
                                                </span>
                                            </td>

                                            <td className="px-2 py-2 sm:px-3 sm:py-3">
                                                <span className="font-bold text-green-600 text-[3vw] sm:text-sm">
                                                    ${row.win.toLocaleString()}
                                                </span>
                                            </td>

                                            <td className="px-2 py-2 sm:px-3 sm:py-3">
                                                <span className="font-bold text-amber-600 text-[3vw] sm:text-sm">
                                                    ${row.commission.toFixed(2)}
                                                </span>
                                            </td>

                                            <td className="px-2 py-2 sm:px-3 sm:py-3">
                                                <span
                                                    className={`font-bold text-[3vw] sm:text-sm ${row.net >= 0 ? "text-emerald-600" : "text-red-600"
                                                        }`}
                                                >
                                                    ${row.net.toFixed(2)}
                                                </span>
                                            </td>

                                            <td className="px-2 py-2 sm:px-3 sm:py-3">
                                                <button
                                                    onClick={() => handlePrint(row)}
                                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-[2.8vw] sm:text-sm px-2 sm:px-3 py-[0.3rem] sm:py-2 rounded-md font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                                                >
                                                    <Printer className="inline w-[3vw] sm:w-4 h-[3vw] sm:h-4 mr-1 align-middle" />
                                                    Print
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* Summary Cards */}
                {/* {accountData.length > 0 && (
          <div className="p-4 md:p-6 border-t">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Total Play</p>
                    <p className="text-2xl font-bold text-blue-900 mt-1">
                      ${accountData.reduce((sum, row) => sum + row.play, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Total Win</p>
                    <p className="text-2xl font-bold text-green-900 mt-1">
                      ${accountData.reduce((sum, row) => sum + row.win, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-600 p-2 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-800">Total Commission</p>
                    <p className="text-2xl font-bold text-amber-900 mt-1">
                      ${accountData.reduce((sum, row) => sum + row.commission, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-amber-600 p-2 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Total Net To Pay</p>
                    <p className="text-2xl font-bold text-emerald-900 mt-1">
                      ${accountData.reduce((sum, row) => sum + row.net, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-emerald-600 p-2 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
            </div>
        </div>
    );
}

// Export wrapper component
export default function Account2D() {
    return <Accounts />;
}