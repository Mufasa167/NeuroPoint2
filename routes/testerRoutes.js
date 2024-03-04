import express  from "express";

import { updateTester,deleteTester,getAllTesters,getSingleTester }
 from "../Controllers/testerController.js";

 import { authenticate, restrict } from "../auth/verifyToken.js";
//  import reviewRoute from "./reviewRoutes.js"


const router= express.Router()

// router.use('/:testerId/reviews',reviewRoute)

router.get('/:id',authenticate,restrict(['testers']), getSingleTester)
router.get('/', authenticate,restrict(['admin']),getAllTesters)
router.put('/:id',authenticate,restrict(['testers']), updateTester)
router.delete('/:id',authenticate,restrict(['testers']),deleteTester)

export default router