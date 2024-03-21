import { z } from 'zod'

export class UpdateTeamZod {

  static schema = z.object({
    id: z.number().nonnegative().min(1),
    name: z.string().min(1).max(255).optional(),
    drivers: z.string().min(1).max(255).optional(),
    champions: z.number().nonnegative({message: 'Los Campeonatos no pueden ser numeros negativos'}).max(999).optional()
  })

  public readonly id: number
  public readonly name?: string
  public readonly drivers?: string
  public readonly champions?: number

  constructor(propiedades: {id: number, name?: string, drivers?: string, champions?: number}) {
    const data = UpdateTeamZod.schema.parse(propiedades)

    this.id = propiedades.id
    this.name = data.name
    this.drivers = data.drivers
    this.champions = data.champions
  }

  get values() {
    const returnObj: {[key: string]: any} = {};

    if ( this.name ) returnObj.name = this.name;
    if ( this.drivers ) returnObj.drivers = this.drivers;
    if ( this.champions ) returnObj.champions = this.champions;

    return returnObj;
  }
}