import { Router } from "express";
import getHandler from "./handlers/get";

const router = Router();

router.get("/", getHandler);

export default router;
