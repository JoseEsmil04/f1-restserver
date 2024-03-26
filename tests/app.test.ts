import { envs } from "../src/config/envs"
import { Server } from "../src/presentation/server"

jest.mock("../src/presentation/server")
// Mock para probar solo el app

describe('Test app.ts', () => {
  test('should call serverStart with args', async() => {
    
    await import ('../src/app') // importamos el app

    expect(Server).toHaveBeenCalledTimes(1) // se haya llamado en el app 1 vez
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      public_path: 'public',
      routes: expect.any(Function)
    })
    expect(Server.prototype.start).toHaveBeenCalledWith()
  })
})