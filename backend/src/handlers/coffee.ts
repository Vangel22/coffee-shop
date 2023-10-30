import { Request, Response } from "express";
import {
  addCoffee,
  getAllCoffees,
  getOneCoffee,
  removeCoffee,
  updateCoffee,
} from "../models/coffee";
import { validate } from "../validators/validate";
import { Coffee, CoffeePartial } from "../validators/model-bodies";

export const create = async (req: Request, res: Response) => {
  try {
    await validate(req.body, Coffee);
    await addCoffee(req.body);
    return res.status(201).send(req.body);
  } catch (err: unknown) {
    return res.status(500).send("Internal Server Error");
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const allCoffees = await getAllCoffees();
    return res.status(200).send(allCoffees);
  } catch (err: unknown) {
    return res.status(500).send("Internal Server Error");
  }
};

export const getCoffeeByName = async (req: Request, res: Response) => {
  try {
    const coffee = await getOneCoffee(req.params.name);
    return res.status(200).send(coffee);
  } catch (err: unknown) {
    return res.status(500).send("Internal Server Error");
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    await validate(req.body, CoffeePartial);
    await updateCoffee(req.params.id, req.body);
    return res.status(200).send(req.body);
  } catch (err: unknown) {
    return res.status(500).send("Internal Server Error");
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await removeCoffee(req.params.id);
    return res.status(204).send("Coffee deleted!");
  } catch (err: unknown) {
    return res.status(500).send("Internal Server Error");
  }
};
