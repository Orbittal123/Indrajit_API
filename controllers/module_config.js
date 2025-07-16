import sql from "mssql";

const config = {
    user: "admin2",
    password: "reset@123",
    database: "replus_treceability",
    server: "REP-TRACE",
    options: {
        encrypt: false,
        trustServerCertificate: false,
    },
};

const pool = new sql.ConnectionPool(config);

const poolConnect = pool.connect()
    .then(() => console.log("Connected to MSSQL database!"))
    .catch(err => console.error("MSSQL connection error:", err));

const getModules = async (req, res) => {
    try {
        await poolConnect; // wait for connection
        const result = await pool.request()
            .query(`
                SELECT TOP (200) 
                    sr_no, module_code, cell_count, no_of_modules, date_time 
                FROM vision_pack_master
            `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createModule = async (req, res) => {
    try {
        await poolConnect;
        const { module_code, cell_count } = req.body;

        // Check if module exists
        const check = await pool.request()
            .input("module_code", sql.VarChar, module_code)
            .query("SELECT * FROM vision_pack_master WHERE module_code = @module_code");

        if (check.recordset.length > 0) {
            return res.status(400).json({ error: "Module already exists" });
        }

        await pool.request()
            .input("module_code", sql.VarChar, module_code)
            .input("cell_count", sql.Int, cell_count)
            .query("INSERT INTO vision_pack_master (module_code, cell_count) VALUES (@module_code, @cell_count)");

        res.json({ message: "Record saved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateModule = async (req, res) => {
    try {
        await poolConnect;
        const { module_code, cell_count } = req.body;
        const { id } = req.params;

        await pool.request()
            .input("id", sql.Int, id)
            .input("module_code", sql.VarChar, module_code)
            .input("cell_count", sql.Int, cell_count)
            .query(`UPDATE vision_pack_master SET module_code = @module_code, cell_count = @cell_count WHERE id = @id`);

        res.json({ message: "Record updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteModule = async (req, res) => {
    try {
        await poolConnect;
        const { id } = req.params;
        await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM vision_pack_master WHERE id = @id");

        res.json({ message: "Record deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const updateModuleCount = async (req, res) => {
  const { no_of_modules } = req.body;

  if (!no_of_modules) {
    return res.status(400).json({ message: 'no_of_modules is required' });
  }

  try {
    await poolConnect; // Ensure pool is connected

    const result = await pool.request()
      .input('no_of_modules', sql.NVarChar(50), no_of_modules)
      .query(`
        UPDATE dbo.vision_pack_module_count
        SET no_of_modules = @no_of_modules
        WHERE sr_no = 1
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Record with sr_no = 1 not found' });
    }

    res.status(200).json({ message: 'Module count updated successfully' });
  } catch (err) {
    console.error('SQL Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const getModuleCount = async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request()
      .query(`
        SELECT sr_no, no_of_modules, date_time 
        FROM dbo.vision_pack_module_count
        WHERE sr_no = 1
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Record with sr_no = 1 not found' });
    }

    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error('SQL Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export {
    getModules,
    createModule,
    updateModule,
    deleteModule,
    updateModuleCount,
    getModuleCount
};
