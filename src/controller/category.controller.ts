import { Request, Response } from "express";
import CategoryService from "../services/category.service";

class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const category = await CategoryService.createCategory(req.body);
      return res.status(201).json({ status: 201, message: "Created", category });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAllCategories();
      return res.status(200).json({ status: 200, categories });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      return res.status(category ? 200 : 404).json({
        status: category ? 200 : 404,
        category: category || null,
        message: category ? "Found" : "Not Found",
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const category = await CategoryService.updateCategory(req.params.id, req.body);
      return res.status(category ? 200 : 404).json({
        status: category ? 200 : 404,
        category: category || null,
        message: category ? "Updated" : "Not Found",
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const category = await CategoryService.deleteCategory(req.params.id);
      return res.status(category ? 200 : 404).json({
        status: category ? 200 : 404,
        category: category || null,
        message: category ? "Deleted" : "Not Found",
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default CategoryController;
