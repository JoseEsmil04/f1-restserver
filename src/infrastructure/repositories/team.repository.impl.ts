import { TeamDatasource, TeamEntity, TeamRepository } from '../../domain';
import { CreateTeamDto, UpdateTeamZod } from '../../domain/dtos';


export class TeamRepositoryImpl implements TeamRepository {

  constructor(
    private readonly datasource: TeamDatasource
  ){}

  getAllTeams(): Promise<TeamEntity[]> {
    return this.datasource.getAllTeams()
  }
  getTeam(id: number): Promise<TeamEntity> {
    return this.datasource.getTeam(id)
  }
  createTeam(createTeam: CreateTeamDto): Promise<TeamEntity> {
    return this.datasource.createTeam(createTeam)
  }
  updateTeam(updateTeam: UpdateTeamZod): Promise<TeamEntity> {
    return this.datasource.updateTeam(updateTeam)
  }
  deleteTeam(id: number): Promise<TeamEntity> {
    return this.datasource.deleteTeam(id)
  }

}