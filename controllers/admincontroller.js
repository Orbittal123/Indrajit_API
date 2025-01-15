import asyncHandler from "express-async-handler";
import sql from "mssql";

const config = {
  user: "admin2",
  password: "reset@123",
  database: "replus_treceability",
  server: "REP-TRACE",
  options: {
    encrypt: false, // Change to true if you're using SSL
    trustServerCertificate: false, // Change to true if using self-signed certificates
  },
};

const pool = new sql.ConnectionPool(config);

pool.connect().then(() => {
  console.log("Connected to MSSQL database!");
}).catch(err => {
  console.error("Error connecting to MSSQL database:", err);
});

export default pool;

// export const CountAll = asyncHandler(async (request, response) => {
//   try {
//     const result = await pool.request().query(
//       `SELECT 
//         SUM(CASE WHEN v1_status = 'OK' AND DATEPART(HOUR, v1_end_date) BETWEEN 6 AND 13 THEN 1 ELSE 0 END) AS v1_first_shift_ok,
//         SUM(CASE WHEN v1_status = 'NOT OK' AND DATEPART(HOUR, v1_end_date) BETWEEN 6 AND 13 THEN 1 ELSE 0 END) AS v1_first_shift_notok,
//         SUM(CASE WHEN v1_status = 'OK' AND DATEPART(HOUR, v1_end_date) BETWEEN 14 AND 21 THEN 1 ELSE 0 END) AS v1_second_shift_ok,
//         SUM(CASE WHEN v1_status = 'NOT OK' AND DATEPART(HOUR, v1_end_date) BETWEEN 14 AND 21 THEN 1 ELSE 0 END) AS v1_second_shift_notok,
//         SUM(CASE WHEN v1_status = 'OK' AND (DATEPART(HOUR, v1_end_date) BETWEEN 22 AND 23 OR DATEPART(HOUR, v1_end_date) BETWEEN 0 AND 5) THEN 1 ELSE 0 END) AS v1_third_shift_ok,
//         SUM(CASE WHEN v1_status = 'NOT OK' AND (DATEPART(HOUR, v1_end_date) BETWEEN 22 AND 23 OR DATEPART(HOUR, v1_end_date) BETWEEN 0 AND 5) THEN 1 ELSE 0 END) AS v1_third_shift_notok,
        
//         -- v2_status counts
//         SUM(CASE WHEN v2_status = 'OK' AND DATEPART(HOUR, v2_end_date) BETWEEN 6 AND 13 THEN 1 ELSE 0 END) AS v2_first_shift_ok,
//         SUM(CASE WHEN v2_status = 'NOT OK' AND DATEPART(HOUR, v2_end_date) BETWEEN 6 AND 13 THEN 1 ELSE 0 END) AS v2_first_shift_notok,
//         SUM(CASE WHEN v2_status = 'OK' AND DATEPART(HOUR, v2_end_date) BETWEEN 14 AND 21 THEN 1 ELSE 0 END) AS v2_second_shift_ok,
//         SUM(CASE WHEN v2_status = 'NOT OK' AND DATEPART(HOUR, v2_end_date) BETWEEN 14 AND 21 THEN 1 ELSE 0 END) AS v2_second_shift_notok,
//         SUM(CASE WHEN v2_status = 'OK' AND (DATEPART(HOUR, v2_end_date) BETWEEN 22 AND 23 OR DATEPART(HOUR, v2_end_date) BETWEEN 0 AND 5) THEN 1 ELSE 0 END) AS v2_third_shift_ok,
//         SUM(CASE WHEN v2_status = 'NOT OK' AND (DATEPART(HOUR, v2_end_date) BETWEEN 22 AND 23 OR DATEPART(HOUR, v2_end_date) BETWEEN 0 AND 5) THEN 1 ELSE 0 END) AS v2_third_shift_notok,

//         -- welding_status counts
//         SUM(CASE WHEN welding_status = 'OK' AND DATEPART(HOUR, welding_end_date) BETWEEN 6 AND 13 THEN 1 ELSE 0 END) AS welding_first_shift_ok,
//         SUM(CASE WHEN welding_status = 'NOT OK' AND DATEPART(HOUR, welding_end_date) BETWEEN 6 AND 13 THEN 1 ELSE 0 END) AS welding_first_shift_notok,
//         SUM(CASE WHEN welding_status = 'OK' AND DATEPART(HOUR, welding_end_date) BETWEEN 14 AND 21 THEN 1 ELSE 0 END) AS welding_second_shift_ok,
//         SUM(CASE WHEN welding_status = 'NOT OK' AND DATEPART(HOUR, welding_end_date) BETWEEN 14 AND 21 THEN 1 ELSE 0 END) AS welding_second_shift_notok,
//         SUM(CASE WHEN welding_status = 'OK' AND (DATEPART(HOUR, welding_end_date) BETWEEN 22 AND 23 OR DATEPART(HOUR, welding_end_date) BETWEEN 0 AND 5) THEN 1 ELSE 0 END) AS welding_third_shift_ok,
//         SUM(CASE WHEN welding_status = 'NOT OK' AND (DATEPART(HOUR, welding_end_date) BETWEEN 22 AND 23 OR DATEPART(HOUR, welding_end_date) BETWEEN 0 AND 5) THEN 1 ELSE 0 END) AS welding_third_shift_notok,

//         -- fpcb_status counts
//         SUM(CASE WHEN fpcb_status = 'OK' AND DATEPART(HOUR, fpcb_end_date) BETWEEN 6 AND 13 THEN 1 ELSE 0 END) AS fpcb_first_shift_ok,
//         SUM(CASE WHEN fpcb_status = 'NOT OK' AND DATEPART(HOUR, fpcb_end_date) BETWEEN 6 AND 13 THEN 1 ELSE 0 END) AS fpcb_first_shift_notok,
//         SUM(CASE WHEN fpcb_status = 'OK' AND DATEPART(HOUR, fpcb_end_date) BETWEEN 14 AND 21 THEN 1 ELSE 0 END) AS fpcb_second_shift_ok,
//         SUM(CASE WHEN fpcb_status = 'NOT OK' AND DATEPART(HOUR, fpcb_end_date) BETWEEN 14 AND 21 THEN 1 ELSE 0 END) AS fpcb_second_shift_notok,
//         SUM(CASE WHEN fpcb_status = 'OK' AND (DATEPART(HOUR, fpcb_end_date) BETWEEN 22 AND 23 OR DATEPART(HOUR, fpcb_end_date) BETWEEN 0 AND 5) THEN 1 ELSE 0 END) AS fpcb_third_shift_ok,
//         SUM(CASE WHEN fpcb_status = 'NOT OK' AND (DATEPART(HOUR, fpcb_end_date) BETWEEN 22 AND 23 OR DATEPART(HOUR, fpcb_end_date) BETWEEN 0 AND 5) THEN 1 ELSE 0 END) AS fpcb_third_shift_notok,

//         -- module_a_barcode counts
//         SUM(CASE WHEN DATEPART(HOUR, fpcb_end_date) BETWEEN 6 AND 14 THEN 1 ELSE 0 END) AS module_first_shift_total,
//         SUM(CASE WHEN DATEPART(HOUR, fpcb_end_date) BETWEEN 13 AND 21 THEN 1 ELSE 0 END) AS module_second_shift_total,
//         SUM(CASE WHEN DATEPART(HOUR, fpcb_end_date) BETWEEN 22 AND 23 OR DATEPART(HOUR, fpcb_end_date) BETWEEN 0 AND 5 THEN 1 ELSE 0 END) AS module_third_shift_total,

//         SUM(CASE WHEN DATEPART(HOUR, v1_end_date) BETWEEN 6 AND 13 THEN v1_difference ELSE 0 END) AS v1_fristshift_Diff,
//         SUM(CASE WHEN DATEPART(HOUR, v1_end_date) BETWEEN 14 AND 21 THEN v1_difference ELSE 0 END) AS v1_secoundshift_Diff,
//         SUM(CASE WHEN DATEPART(HOUR, v2_end_date) BETWEEN 6 AND 13 THEN v2_difference ELSE 0 END) AS v2_fristshift_Diff,
//         SUM(CASE WHEN DATEPART(HOUR, v2_end_date) BETWEEN 14 AND 21 THEN v2_difference ELSE 0 END) AS v2_secoundshift_Diff,
//         SUM(CASE WHEN DATEPART(HOUR, welding_end_date) BETWEEN 6 AND 13 THEN welding_difference ELSE 0 END) AS welding_fristshift_Diff,
//         SUM(CASE WHEN DATEPART(HOUR, welding_end_date) BETWEEN 14 AND 21 THEN welding_difference ELSE 0 END) AS welding_secoundshift_Diff,
//         SUM(CASE WHEN DATEPART(HOUR, fpcb_end_date) BETWEEN 6 AND 13 THEN fpcb_difference ELSE 0 END) AS fpcb_fristshift_Diff,
//         SUM(CASE WHEN DATEPART(HOUR, fpcb_end_date) BETWEEN 14 AND 21 THEN fpcb_difference ELSE 0 END) AS fpcb_secoundshift_Diff

//         FROM [dbo].[clw_station_status]
//         WHERE CAST(v1_end_date AS DATE) = CAST(GETDATE() AS DATE)
//         OR CAST(v2_end_date AS DATE) = CAST(GETDATE() AS DATE)
//         OR CAST(welding_end_date AS DATE) = CAST(GETDATE() AS DATE)
//         OR CAST(fpcb_end_date AS DATE) = CAST(GETDATE() AS DATE)`
//     );

//     const result2 = await pool.request().query(`SELECT module_barcode AS v1_live_status FROM [replus_treceability].[dbo].[linking_module_RFID] WHERE v1_live_status = '1'`);
//     const result3 = await pool.request().query(`SELECT module_barcode AS v2_live_status FROM [replus_treceability].[dbo].[linking_module_RFID] WHERE v2_live_status = '1'`);
//     const result4 = await pool.request().query(`SELECT module_barcode AS welding_live_status FROM [replus_treceability].[dbo].[linking_module_RFID] WHERE welding_live_status = '1'`);
//     const result5 = await pool.request().query(`SELECT module_barcode AS fpcb_live_status FROM [replus_treceability].[dbo].[linking_module_RFID] WHERE fpcb_live_status = '1'`);    
   
//     const v1LiveStatuses = result2.recordset.map(item => item.v1_live_status);
//     const v2LiveStatuses = result3.recordset.map(item => item.v2_live_status);
//     const weldingLiveStatuses = result4.recordset.map(item => item.welding_live_status);
//     const fpcbLiveStatuses = result5.recordset.map(item => item.fpcb_live_status);

//   console.log("v1LiveStatuses::", v1LiveStatuses);
//   console.log("v2LiveStatuses::", v2LiveStatuses);
//   console.log("weldingLiveStatuses::", weldingLiveStatuses);
//   console.log("fpcbLiveStatuses::", fpcbLiveStatuses);

//     // console.log("v1_live::", `SELECT module_barcode AS v1_live_status FROM [replus_treceability].[dbo].[linking_module_RFID] WHERE v1_live_status = '1'`);
//     response.status(200).json({ status: "success", data: result.recordset,
//       liveStatuses: {
//         v1: v1LiveStatuses,
//         v2: v2LiveStatuses,
//         welding: weldingLiveStatuses,
//         fpcb: fpcbLiveStatuses,
//       }
//     });
//   }

//   catch (error) {
//         console.error("Error while updating live status:", error);
//         response.status(500).json({ status: "error", msg: "Error while updating live status" });
//       }
// });

export const CountAll = asyncHandler(async (request, response) => {
  try {
    const result = await pool.request().query(
      `SELECT 
          -- v1 status counts
          SUM(CASE 
              WHEN v1_status = 'OK' 
              AND CAST(v1_start_date AS DATE) = CAST(GETDATE() AS DATE) 
              THEN 1 ELSE 0 
          END) AS v1_ok_count,
          SUM(CASE 
              WHEN v1_status = 'NOT OK' 
              AND CAST(v1_start_date AS DATE) = CAST(GETDATE() AS DATE) 
              THEN 1 ELSE 0 
          END) AS v1_notok_count,

          -- v2 status counts
          SUM(CASE 
              WHEN v2_status = 'OK' 
              AND CAST(v2_start_date AS DATE) = CAST(GETDATE() AS DATE) 
              THEN 1 ELSE 0 
          END) AS v2_ok_count,
          SUM(CASE 
              WHEN v2_status = 'NOT OK' 
              AND CAST(v2_start_date AS DATE) = CAST(GETDATE() AS DATE) 
              THEN 1 ELSE 0 
          END) AS v2_notok_count,

          -- welding status counts
          SUM(CASE 
              WHEN welding_status = 'OK' 
              AND CAST(welding_start_date AS DATE) = CAST(GETDATE() AS DATE) 
              THEN 1 ELSE 0 
          END) AS welding_ok_count,
          SUM(CASE 
              WHEN welding_status = 'NOT OK' 
              AND CAST(welding_start_date AS DATE) = CAST(GETDATE() AS DATE) 
              THEN 1 ELSE 0 
          END) AS welding_notok_count,

          -- fpcb status counts
          SUM(CASE 
              WHEN fpcb_status = 'OK' 
              AND CAST(fpcb_start_date AS DATE) = CAST(GETDATE() AS DATE) 
              THEN 1 ELSE 0 
          END) AS fpcb_ok_count,
          SUM(CASE 
              WHEN fpcb_status = 'NOT OK' 
              AND CAST(fpcb_start_date AS DATE) = CAST(GETDATE() AS DATE) 
              THEN 1 ELSE 0 
          END) AS fpcb_notok_count

      FROM [dbo].[clw_station_status]
      WHERE 
          -- Filter invalid data upfront
          TRY_CAST(v1_start_date AS DATE) IS NOT NULL
          AND TRY_CAST(v2_start_date AS DATE) IS NOT NULL
          AND TRY_CAST(welding_start_date AS DATE) IS NOT NULL
          AND TRY_CAST(fpcb_start_date AS DATE) IS NOT NULL
          AND v1_status IN ('OK', 'NOT OK')
          AND v2_status IN ('OK', 'NOT OK')
          AND welding_status IN ('OK', 'NOT OK')
          AND fpcb_status IN ('OK', 'NOT OK');`
    );

    response.status(200).json({
      status: "success",
      data: result.recordset[0], // Aggregate counts for the day
    });
  } catch (error) {
    console.error("Error while counting records:", error);
    response
      .status(500)
      .json({ status: "error", msg: "Error while counting records" });
  }
});


// Function to call CountAll at an interval
const callCountAll = () => {
  // Mock request and response objects
  const request = {}; // Add any necessary properties
  const response = {
    json: (data) => console.log('Response:', data),
    status: (statusCode) => ({
      json: (data) => console.log('Response with status:', statusCode, data),
    }),
  };

  // Call the function
  CountAll(request, response);
};

// Set the interval to 10 seconds (10000 milliseconds)
setInterval(callCountAll, 10000);

////////////////////weekmonth avg/////////////////////////////


// //////////////////////week/////////////////////////////////////
export const WeekMonthDiff = asyncHandler(async (request, response) => {
  try {
    const avgvalue = 480.0; 

    await sql.connect(config);
    const result = await sql.query`
      SELECT    
        SUM(CAST(v1_difference AS DECIMAL(10, 2))) / ${avgvalue} AS v1_weekDiff_Avg,
        SUM(CAST(v2_difference AS DECIMAL(10, 2))) / ${avgvalue} AS v2_weekDiff_Avg,
        SUM(CAST(welding_difference AS DECIMAL(10, 2))) / ${avgvalue} AS welding_weekDiff_Avg,
        SUM(CAST(fpcb_difference AS DECIMAL(10, 2))) / ${avgvalue} AS fpcb_weekDiff_Avg
        FROM [dbo].[clw_station_status]
    WHERE 
    (v1_end_date >= DATEADD(HOUR, 6, DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0)) 
     AND v1_end_date < DATEADD(HOUR, 22, DATEADD(DAY, 5, DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0))))
    OR
    (v2_end_date >= DATEADD(HOUR, 6, DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0)) 
     AND v2_end_date < DATEADD(HOUR, 22, DATEADD(DAY, 5, DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0))))
    OR
    (welding_end_date >= DATEADD(HOUR, 6, DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0)) 
     AND welding_end_date < DATEADD(HOUR, 22, DATEADD(DAY, 5, DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0))))
    OR
    (fpcb_end_date >= DATEADD(HOUR, 6, DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0)) 
     AND fpcb_end_date < DATEADD(HOUR, 22, DATEADD(DAY, 5, DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0))))`;

    response.status(200).json({ status: "success", data: result.recordset });
  } catch (error) {
    console.error("Error while counting records:", error);
    response.status(500).json({ status: "error", msg: "Error while counting records" });
  }
}); 





// Function to call WeekMonthDiff at an interval
const callWeekMonthDiff = () => {
  // Mock request and response objects
  const request = {}; // Add any necessary properties
  const response = {
    json: (data) => console.log('Response:', data),
    status: (statusCode) => ({
      json: (data) => console.log('Response with status:', statusCode, data),
    }),
  };

  // Call the function
  WeekMonthDiff(request, response);
};

// Set the interval to 10 seconds (10000 milliseconds)
setInterval(callWeekMonthDiff, 10000);
