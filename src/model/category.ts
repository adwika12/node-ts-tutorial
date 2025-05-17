import { Schema, model } from "mongoose";
import { ICategory } from "../interface/category";

const schema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
});

export const CategoryModel = model<ICategory>("category", schema);
