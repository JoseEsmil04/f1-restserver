import { Request, Response } from 'express'
import { CreateTeamDto, UpdateTeamZod } from '../../domain/dtos'
import { CreateTeam, DeleteTeam, GetTeam, GetTeams, UpdateTeam } from '../../domain/use-cases'
import { ErrorController, TeamRepository } from '../../domain'


export class FormulaController {

	constructor(
		private readonly repository: TeamRepository
	) {}

	public errorHandler = (res: Response, err: unknown) => {
		if(err instanceof ErrorController) {
			res.status(err.statusCode).json({ error: err.message })
			return
		}

		res.status(500).json({ error: `Internal Server error!` })
	}

	public getAllTeams = (req: Request, res: Response) => {
		new GetTeams(this.repository).execute()
			.then(teams => res.json(teams))
			.catch(err => this.errorHandler(res, err))
	}

	public getTeamById = (req: Request, res: Response) => {
		const id = +req.params.id

		new GetTeam(this.repository).execute(id)
			.then(team => res.status(200).json(team))
			.catch(err => this.errorHandler(res, err))
	}

	public createTeam = (req: Request, res: Response) => {

		// DTOS creado con logica
		const [error, createTeamDto] = CreateTeamDto.create(req.body)

		if(error) {
			return res.status(400).json({ error })
		}

		new CreateTeam(this.repository).execute(createTeamDto!)
			.then(team => res.status(201).json(team))
			.catch(err => this.errorHandler(res, err))
	}

	public updateTeam = (req: Request, res: Response) => {
		const id = +req.params.id

		const updateTeamZod = new UpdateTeamZod({...req.body, id})

		new UpdateTeam(this.repository).execute(updateTeamZod)
			.then(team => res.status(200).json(team))
			.catch(err => this.errorHandler(res, err))
	}

	public deleteTeam = (req: Request, res: Response) => {
		const id = +req.params.id

		new DeleteTeam(this.repository).execute(id)
			.then(team => res.status(200).json(team))
			.catch(err => this.errorHandler(res, err))
	}
}
