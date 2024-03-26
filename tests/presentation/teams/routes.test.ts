import { testServer } from "../../testServer"
import { prisma } from '../../../src/data/postgres/index';
import request from 'supertest'

describe('test Teamroutes.ts', () => {

  // Antes que todo inicia el server.
  beforeAll(async() => {
    testServer.start()
  })

  // Despues de todo, cierra el server.
  beforeAll(() => {
    testServer.close()
  })
  
  const team1 = { name: 'Ferrari', drivers: 'Charles Leclerc, Carlos Sainz', champions: 0 }
  const team2 = { name: 'Red Bull', drivers: 'Max Verstappen, Sergio Perez', champions: 3 }
  // Despues de cada prueba, borra los equipos
  afterEach(async() => {
    await prisma.team.deleteMany()
  })


  test('Get All Teams /api/teams', async() => {
    await prisma.team.createMany({
      data: [team1, team2]
    })

    const { body } = await request(testServer.app)
      .get('/api/formula1')
      .expect(200)

    expect(body[0]).toEqual({
      id: expect.any(Number), 
      name: team1.name,
      drivers: team1.drivers,
      champions: team1.champions
    })

    expect(body[1]).toEqual({
      id: expect.any(Number), 
      name: team2.name,
      drivers: team2.drivers, 
      champions: team2.champions
    })
  })

  test('Buscar un Equipo /api/teams/:id', async() => {
    const team = await prisma.team.create({
      data: {
        name: 'Paco Racing',
        drivers: 'Jose Esmil, Lana Boit',
        champions: 1
      }
    })

    const { body } = await request(testServer.app)
      .get(`/api/formula1/${team.id}`)
      .expect(200)

    expect(body).toEqual({
      id: team.id,
      name: 'Paco Racing',
      drivers: 'Jose Esmil, Lana Boit',
      champions: 1
    })
  })

  test('Buscar un Equipo /api/teams/:id', async() => {
    const { body } = await request(testServer.app)
      .get(`/api/formula1/abc`)
      .expect(500)

    expect(body).toEqual({
      error: 'Internal Server error!'
    })
  })

  test('Create Team /api/teams', async() => {

    const { body } = await request(testServer.app)
      .post('/api/formula1')
      .send(team1)
      .expect(201)

    expect(body).toEqual({
      id: body.id,
      name: team1.name,
      drivers: team1.drivers,
      champions: team1.champions
    })
  })

  test('Error si no se mandan los datos /api/teams', async() => {

    const { body } = await request(testServer.app)
      .post('/api/formula1')
      .send({ })
      .expect(400)

    expect(body).toEqual({
      error: "El nombre del equipo es requerido"
    })
  })

  test('Actualizar un Equipo /api/teams/:id', async() => {
    const team = await prisma.team.create({
      data: {
        name: 'Paco Racing',
        drivers: 'Jose Esmil, Lana Boit',
        champions: 1
      }
    })

    const { body } = await request(testServer.app)
      .put(`/api/formula1/${team.id}`)
      .send({name: 'Dominican Racing'})
      .expect(200)

    expect(body).toEqual({
      id: team.id,
      name: 'Dominican Racing',
      drivers: 'Jose Esmil, Lana Boit',
      champions: 1
    })
  })

  test('Actualizar un Equipo /api/teams/:id', async() => {
    const team = await prisma.team.create({
      data: {
        name: 'Paco Racing',
        drivers: 'Jose Esmil, Lana Boit',
        champions: 1
      }
    })

    const { body } = await request(testServer.app)
      .put(`/api/formula1/${team.id}`)
      .send({
        drivers: 'Jose Esmil, Lana Boit',
        champions: 1
      })
      .expect(200)

    expect(body).toEqual({
      id: team.id,
      name: 'Paco Racing',
      drivers: 'Jose Esmil, Lana Boit',
      champions: 1
    })
  })

  test('Lanzar error si no se encuentra el Team /api/teams/:id', async() => {
    const { body } = await request(testServer.app)
      .put(`/api/formula1/${1500}`)
      .send({name: 'Dominican Racing'})
      .expect(404)

    expect(body).toEqual({ error: 'Team with id: 1500 not found!' })
  })

  test('Borrar el Team DELETE /api/teams/:id', async() => {
    const team = await prisma.team.create({
      data: team1
    })

    const { body } = await request(testServer.app)
      .delete(`/api/formula1/${team.id}`)
      .expect(200)

    expect(body).toEqual({
      id: expect.any(Number),
      name: team.name,
      drivers: team.drivers,
      champions: team.champions
    })
  })

  test('Lanzar error si no se encuentra el Team DELETE /api/teams/:id', async() => {
    const { body } = await request(testServer.app)
      .delete(`/api/formula1/${678}`)
      .expect(404)

    expect(body).toEqual({ error: 'Team with id: 678 not found!' })
  })
})