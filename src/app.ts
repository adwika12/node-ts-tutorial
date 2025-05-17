import express, { Application as ExApplication } from 'express';
import UserController from './controller/user.controller';
import CategoryController from './controller/category.controller';

class Application {
  private readonly _instance: ExApplication;
  _UserController = new UserController();
  _CategoryController = new CategoryController();

  get instance(): ExApplication {
    return this._instance;
  }

  constructor() {
    this._instance = express();
    this._instance.use(express.json({ limit: "150mb" }));
    this._instance.use(express.urlencoded({ limit: "150mb", extended: true }));
    this.routes();
  }

  routes() {
    this._instance.get("/api/v1/users", this._UserController.userList);

    this._instance.post("/api/v1/categories", this._CategoryController.create);
    this._instance.get("/api/v1/categories", this._CategoryController.findAll);
    this._instance.get("/api/v1/categories/:id", this._CategoryController.findOne);
    this._instance.put("/api/v1/categories/:id", this._CategoryController.update);
    this._instance.delete("/api/v1/categories/:id", this._CategoryController.delete);
  }
}

export default new Application();
