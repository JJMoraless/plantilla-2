import Joi from "joi";
import objectId from "joi-objectid";
Joi.objectId = objectId(Joi);

const title = Joi.string();
const description = Joi.string();
const stock = Joi.number().integer();
const price = Joi.number();

export const postVentaShema = Joi.object({
  title: title.required(),
  description: description.required(),
  stock: stock.required(),
  price: price.required(),
});

export const getVentaSchema = Joi.object({
  id: Joi.objectId(),
});
