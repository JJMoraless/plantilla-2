import { request, response } from "express";
import { createToken } from "../utils/jwt.js";
import { resOk } from "../utils/functions.js";

import db from "../../db/conection.js";
import { hash } from "bcrypt";
const User = db.collection("users");

// en la ruta se usa local strategy que valida las credenciales
// local strategy agrega objeto user al request con los datos de la db

export class AuthCrll {
  static async login(req = request, res = response) {
    const { user } = req;

    const token = await createToken({
      sub: user._id,
      role: user.role,
    });

    res.cookie("token", token);
    resOk(res, { user, token });
  }

  static async register(req, res) {
    const reqUser = req.body;
    const checkEmail = await User.findOne({ email: reqUser.email });
    if (checkEmail) {
      throw new ClientError("email is already in use");
    }

    const userCreated = await User.insertOne({
      ...reqUser,
      password: await hash(reqUser.password, 10),
      role: "reader",
    });

    resOk(res, { user_create: userCreated });
  }
}
