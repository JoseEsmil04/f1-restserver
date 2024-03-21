import { Router } from "express";
import { FormulaRoutes } from "./formula1/f1Routes";



export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/api/formula1', FormulaRoutes.routes)
    // Se pueden agregar mas rutas a futuro...

    return router
  }
}