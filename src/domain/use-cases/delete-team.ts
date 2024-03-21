import { TeamEntity } from "../entities/team.entity";
import { TeamRepository } from "../repositories/team.repository";

export interface DeleteTeamUseCase {
  execute(id: number): Promise<TeamEntity>
}

export class DeleteTeam implements DeleteTeamUseCase {

  constructor(
    private readonly repository: TeamRepository
  ){}

  execute(id: number): Promise<TeamEntity> {
    return this.repository.deleteTeam(id)
  }
}