import mongoose from "mongoose";
import { CoffeeModel } from "./model";

const CoffeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    default: 50,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const CoffeeMongo = mongoose.model("coffee", CoffeeSchema, "coffee");

export const addCoffee = async (coffee: CoffeeModel) => {
  const newCoffee = new CoffeeMongo(coffee);
  return await newCoffee.save();
};

export const removeCoffee = async (id: string) => {
  return await CoffeeMongo.updateOne({ _id: id }, { isDeleted: true });
};

export const updateCoffee = async (id: string, coffee: CoffeeModel) => {
  return await CoffeeMongo.updateOne({ _id: id }, { $set: coffee });
};

export const getAllCoffees = async () => {
  return await CoffeeMongo.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
};

export const getOneCoffee = async (name: string) => {
  return await CoffeeMongo.findOne({ name });
};
