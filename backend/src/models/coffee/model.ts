export interface CoffeeModel {
  name: string;
  ingredients: [string];
  price: number;
  isDeleted: boolean;
  createdAt: Date;
}

export type CoffeeModelUpdateProperties = Omit<
  CoffeeModel,
  "name" | "ingredients" | "price" | "isDeleted" | "createdAt"
>;
