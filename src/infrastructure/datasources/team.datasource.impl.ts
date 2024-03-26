import { prisma } from "../../data/postgres";
import { ErrorController, TeamDatasource, TeamEntity } from "../../domain";
import { CreateTeamDto, UpdateTeamZod } from "../../domain/dtos";


export class TeamDatasourceImpl implements TeamDatasource {
  async getAllTeams(): Promise<TeamEntity[]> {
    const findAllTeams = await prisma.team.findMany()

    return findAllTeams.map(team => TeamEntity.fromObject(team))
  }

  async getTeam(id: number): Promise<TeamEntity> {
    const team = await prisma.team.findFirst({
			where: {
				id: id
			}
		})

    if (isNaN(id)) {
			throw new ErrorController('ID arg is not a number!', 400)
		}

    if(!team) throw new ErrorController(`Team with id: ${id} not found!`, 404)

    return TeamEntity.fromObject(team)
  }
  async createTeam(createTeam: CreateTeamDto): Promise<TeamEntity> {
    const newTeam = await prisma.team.create({
			data: createTeam!
		})
    
    return newTeam
  }
  async updateTeam(updateTeamZod: UpdateTeamZod): Promise<TeamEntity> {
    await this.getTeam(updateTeamZod.id)

    const updatedTeam = await prisma.team.update({
      where: {
        id: updateTeamZod.id
      },
      data: {
        name: updateTeamZod.name,
        drivers: updateTeamZod.drivers,
        champions: updateTeamZod.champions
      }
    })

    return updatedTeam
  }
  async deleteTeam(id: number): Promise<TeamEntity> {
    await this.getTeam(id)

    const deletedTeam = await prisma.team.delete({
			where: {
				id
			}
		})

    return deletedTeam
  }

}