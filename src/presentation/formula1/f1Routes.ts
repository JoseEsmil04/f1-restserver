import { Router } from "express"
import { FormulaController } from "./f1Controller"
import { TeamRepositoryImpl } from "../../infrastructure/repositories/team.repository.impl"
import { TeamDatasourceImpl } from "../../infrastructure/datasources/team.datasource.impl"


export class FormulaRoutes {

  static get routes(): Router {
    const router = Router()

    const datasource = new TeamDatasourceImpl()
    const repository = new TeamRepositoryImpl(datasource)
    const formulaController = new FormulaController(repository)

    router.get('/', formulaController.getAllTeams)
    router.get('/:id', formulaController.getTeamById)
    
    router.post('/', formulaController.createTeam)
    router.put('/:id', formulaController.updateTeam)
    router.delete('/:id', formulaController.deleteTeam)


    return router
  }
}