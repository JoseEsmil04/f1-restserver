import { Request, Response } from 'express'
import { CreateTeamDto, UpdateTeamZod } from '../../domain/dtos'
import { CreateTeam, DeleteTeam, GetTeam, GetTeams, UpdateTeam } from '../../domain/use-cases'
import { TeamRepository } from '../../domain'


export class FormulaController {

	constructor(
		private readonly repository: TeamRepository
	) {}

	public getAllTeams = (req: Request, res: Response) => {
		new GetTeams(this.repository).execute()
			.then(teams => res.json(teams))
			.catch(err => res.status(400).json({ err }))
	}

	public getTeamById = (req: Request, res: Response) => {
		const id = +req.params.id

		if (isNaN(id)) {
			return res.status(400).json({ error: 'ID arg is not a number!' })
		}

		new GetTeam(this.repository).execute(id)
			.then(team => res.status(200).json(team))
			.catch(err => res.status(400).json({ err }))
	}

	public createTeam = (req: Request, res: Response) => {

		// DTOS creado con logica
		const [error, createTeamDto] = CreateTeamDto.create(req.body)

		if(error) {
			return res.status(400).json({ error })
		}

		new CreateTeam(this.repository).execute(createTeamDto!)
			.then(team => res.status(200).json(team))
			.catch(err => res.status(400).json({ err }))
	}

	public updateTeam = (req: Request, res: Response) => {
		const id = +req.params.id

		if (isNaN(id)) {
			return res.status(400).json({ error: 'ID arg is not a number!' })
		}

		const updateTeamZod = new UpdateTeamZod({...req.body, id})

		new UpdateTeam(this.repository).execute(updateTeamZod)
			.then(team => res.status(200).json(team))
			.catch(err => res.status(400).json({ err }))
	}

	public deleteTeam = (req: Request, res: Response) => {
		const id = +req.params.id

		if (isNaN(id)) {
			return res.status(400).json({ error: 'ID arg is not a number!' })
		}

		new DeleteTeam(this.repository).execute(id)
			.then(team => res.status(200).json(team))
			.catch(err => res.status(400).json({ err }))
	}
}
