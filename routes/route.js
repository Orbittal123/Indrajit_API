import express from "express";
import { CountAll } from "../controllers/admincontroller.js";
import { WeekMonthDiff } from "../controllers/admincontroller.js";
import { selectAll } from "../controllers/selectmodule.js";
import { comparebarcode } from "../controllers/comparebarcode.js";
import { insertmoduledata } from "../controllers/insertmoduledata.js";
import {
    getModules,
    createModule,
    updateModule,
    deleteModule,
    updateModuleCount,
    getModuleCount
} from "../controllers/module_config.js";  //

const router = express.Router();

router.get("/CountAll", CountAll);
router.get("/WeekMonthDiff", WeekMonthDiff);
router.get("/selectAll", selectAll);
router.get("/comparebarcode", comparebarcode);
router.get("/insertmoduledata", insertmoduledata);
router.get("/module-specifications", getModules);
router.post("/module-specifications", createModule);
router.put("/module-specifications/:id", updateModule);
router.delete("/module-specifications/:id", deleteModule);
router.put("/update-module-count", updateModuleCount);
router.get('/get-module-count', getModuleCount);


export default router;
