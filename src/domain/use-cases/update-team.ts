import { UpdateTeamZod } from "../dtos";
import { TeamEntity } from "../entities/team.entity";
import { TeamRepository } from "../repositories/team.repository";

export interface UpdateTeamUseCase {
  execute(updateTeamZod: UpdateTeamZod): Promise<TeamEntity>
}

export class UpdateTeam implements UpdateTeamUseCase {

  constructor(
    private readonly repository: TeamRepository
  ){}

  execute(updateTeamZod: UpdateTeamZod): Promise<TeamEntity> {
    return this.repository.updateTeam(updateTeamZod)
  }
}