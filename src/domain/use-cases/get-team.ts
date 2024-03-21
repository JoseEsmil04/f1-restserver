import { TeamEntity } from "../entities/team.entity";
import { TeamRepository } from "../repositories/team.repository";

export interface GetTeamUseCase {
  execute(id: number): Promise<TeamEntity>
}

export class GetTeam implements GetTeamUseCase {

  constructor(
    private readonly repository: TeamRepository
  ){}

  execute(id: number): Promise<TeamEntity> {
    return this.repository.getTeam(id)
  }
}