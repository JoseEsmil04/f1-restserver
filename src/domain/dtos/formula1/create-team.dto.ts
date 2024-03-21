



export class CreateTeamDto {

  private constructor(
    public readonly name: string,
    public readonly drivers: string,
    public readonly champions: number,
  ) {}

  static create(propiedades: {[key: string]: any}): [string?, CreateTeamDto?] {
    const { name, drivers, champions } = propiedades

    if(!name) return ['El nombre del equipo es requerido', undefined]

    if(!drivers) return ['Los conductores del equipo son requeridos', undefined]

    if(champions <= -1) {
      return ['Los Campeonatos son requeridos y no pueden ser negativos', undefined]
    } else if(isNaN(champions)) {
      return ['Los Campeonatos deben ser un numero', undefined]
    }

    return [undefined, new CreateTeamDto(name, drivers, Number(champions))]
  }
}