import express from "express";
import { testController } from "../controllers/test.controller";
import {
  AllUser,
  CreateUser,
  LonginUser,
} from "../controllers/user.controller";
import { checkToken } from "../middlewares/checkToken";

const router = express.Router();

router.get("/", testController);
router.get("/users", checkToken, AllUser);

router.post("/users", CreateUser);
router.post("/login", LonginUser);

export default router;
