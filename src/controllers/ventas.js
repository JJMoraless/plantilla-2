import { request } from "express";
import { resOk } from "../utils/index.js";
import db from "../../db/conection.js";
const Venta = db.collection("ventas");

export class VentasCrll {
  static async create(req = request, res) {
    const data = req.body;
    const venta = await Venta.insertOne(data);
    resOk(res, {
      venta,
    });
  }

  static async get(req = request, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Venta.countDocuments();
    const ventas = await Venta.find({})
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .toArray();
    resOk(res, { ventas, total });
  }

  // 1 Listar todas las ventas que se realizaron en el mes de julio de 2023.
  static async getJuly(req = request, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Venta.countDocuments();
    const ventas = await Venta.find({})
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .toArray();
    resOk(res, { products: ventas, total });
  }
}
