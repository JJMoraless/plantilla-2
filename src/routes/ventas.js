import { Router } from "express";
import { shemasHandler, wrapError } from "../middlewares/index.js";
import { postVentaShema } from "../shemas/index.js";
import { VentasCrll } from "../controllers/ventas.js";
import { passportJwt } from "../utils/auth/index.js";
export const router = Router();

router.get("/", passportJwt, wrapError(VentasCrll.get));
router.post(
  "/",
  passportJwt,
  shemasHandler(postVentaShema, "body"),
  wrapError(VentasCrll.create)
);
