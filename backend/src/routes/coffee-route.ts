import express from "express";

import {
  create,
  getAll,
  getCoffeeByName,
  remove,
  update,
} from "../handlers/coffee";

export const CoffeeRoutes = {
  create: "/api/v1/coffee/create",
  update: "/api/v1/coffee/update/:id",
  remove: "/api/v1/coffee/remove/:id",
  getAll: "/api/v1/coffee/getAll",
  getOne: "/api/v1/coffee/:name",
};

const routerCoffees = express.Router();

routerCoffees.get(CoffeeRoutes.getAll, getAll);
routerCoffees.get(CoffeeRoutes.getOne, getCoffeeByName);
routerCoffees.post(CoffeeRoutes.create, create);
routerCoffees.put(CoffeeRoutes.update, update);
routerCoffees.delete(CoffeeRoutes.remove, remove);

export { routerCoffees };
