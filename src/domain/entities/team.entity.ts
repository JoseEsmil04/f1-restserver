

export class TeamEntity {

  // "id": 2,
  // "name": "Coca Cola Team F1",
  // "drivers": "Jose Esmil, Jecx Greka",
  // "champions": 7

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly drivers: string,
    public readonly champions: number
  ){}

  static fromObject = (object: {[key: string]: any}): TeamEntity => {
    const { id, name, drivers, champions } = object

    if(!id) throw `Id is required`
    if(!name) throw `Team name is required`
    if(!drivers) throw `Team drivers are required`
    if(champions === undefined) throw `Champions must be required Or > 0`

    return new TeamEntity(id, name, drivers, champions)
  }
}