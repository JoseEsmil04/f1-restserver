import { TeamEntity } from "../entities/team.entity";
import { TeamRepository } from "../repositories/team.repository";

export interface GetTeamsUseCase {
  execute(): Promise<TeamEntity[]>
}

export class GetTeams implements GetTeamsUseCase {

  constructor(
    private readonly repository: TeamRepository
  ){}

  execute(): Promise<TeamEntity[]> {
    return this.repository.getAllTeams()
  }
}