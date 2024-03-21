import { envs } from "./config/envs"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"


(() => {
  main()
})();


async function main() {
  const options = {
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRoutes.routes
  }
  const server = new Server(options)

  server.start()
}