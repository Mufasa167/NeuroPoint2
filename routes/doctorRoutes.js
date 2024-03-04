import express  from "express";

import { updateDoctor,deleteDoctor,getAllDoctors,getSingleDoctor } from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
// import reviewRoute from "./reviewRoutes.js"

const router= express.Router()

// router.use('/:doctorId/reviews',reviewRoute)

router.get('/:id',authenticate,restrict(['doctor']), getSingleDoctor)
router.get('/',authenticate,restrict(['admin']), getAllDoctors)
router.put('/:id', authenticate,restrict(['doctor']),updateDoctor)
router.delete('/:id',authenticate,restrict(['doctor']),deleteDoctor)

export default router