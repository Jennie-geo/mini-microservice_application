import { Router } from "express";
const router = Router();

import { signupUser, loginUser } from "../controllers/user.controller";

router.post("/api/v1/createuser", signupUser);
router.post("/api/v1/user", loginUser);

export default router;
