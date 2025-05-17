import { CategoryModel } from "../model/category";
import { ICategory } from "../interface/category";

class CategoryService {
  async createCategory(data: Partial<ICategory>) {
    return await CategoryModel.create(data);
  }

  async getAllCategories() {
    return await CategoryModel.find();
  }

  async getCategoryById(id: string) {
    return await CategoryModel.findById(id);
  }

  async updateCategory(id: string, data: Partial<ICategory>) {
    return await CategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCategory(id: string) {
    return await CategoryModel.findByIdAndDelete(id);
  }
}

export default new CategoryService();
