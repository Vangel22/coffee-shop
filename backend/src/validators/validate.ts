import { Validator } from "node-input-validator";

export const validate = async (data, schema) => {
  const v = new Validator(data, schema);
  const e = v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors,
    };
  }
};
