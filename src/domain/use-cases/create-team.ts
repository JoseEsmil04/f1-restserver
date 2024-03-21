import { CreateTeamDto } from "../dtos";
import { TeamEntity } from "../entities/team.entity";
import { TeamRepository } from "../repositories/team.repository";


export interface CreateTeamUseCase {
  execute(createTeamDto: CreateTeamDto): Promise<TeamEntity>
}

export class CreateTeam implements CreateTeamUseCase {

  constructor(
    private readonly repository: TeamRepository
  ){}

  execute(createTeamDto: CreateTeamDto): Promise<TeamEntity> {
    return this.repository.createTeam(createTeamDto)
  }
}