export const Coffee = {
  name: "required|string",
  ingredients: "required|array",
  price: "integer",
};

export const CoffeePartial = {
  name: "string",
  ingredients: "array",
  price: "integer",
  isDeleted: "boolean",
};
