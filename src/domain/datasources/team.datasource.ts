import { CreateTeamDto, UpdateTeamZod } from "../dtos";
import { TeamEntity } from "../entities/team.entity";


export abstract class TeamDatasource {
  abstract getAllTeams(): Promise<TeamEntity[]>
  abstract getTeam(id: number): Promise<TeamEntity>
  abstract createTeam(createTeam: CreateTeamDto): Promise<TeamEntity> 
  abstract updateTeam(updateTeam: UpdateTeamZod): Promise<TeamEntity> 
  abstract deleteTeam(id: number): Promise<TeamEntity> 
}