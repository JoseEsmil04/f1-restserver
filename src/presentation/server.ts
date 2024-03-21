import express, { Router } from 'express'
import path from 'path'


interface Options {
  port: number,
  public_path?: string
  routes: Router
}

export class Server {

  private app = express()
  private readonly port: number
  private readonly publicPath: string
  private readonly routes: Router

  constructor(options: Options) {
    const { port, public_path = 'public', routes } = options

    this.port = port
    this.publicPath = public_path
    this.routes = routes
  }

  async start() {

    // Middlewares
    this.app.use(express.json()) // Parsear la info que viene en el body y la convierte en json
    this.app.use(express.urlencoded({ extended: true })) // Se pasa la info en la url como key=value&key=value...
    /** carpeta publica... */
    this.app.use(express.static(this.publicPath))

    // Routes Middleware
    this.app.use(this.routes)

    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)

      res.sendFile(indexPath)
    })
    
    this.app.listen(this.port, () => {
      console.log(`Server listening on PORT ${this.port}`)
    })
  }
}