import http from 'node:http'
import fs from 'node:fs'


const server = http.createServer((req, res) => {
  console.log(req.url)

  // res.writeHead(200, { 'Content-Type': 'text/html' })
  // res.write(``)
  // res.end()

  // const data = {name: 'Jose Esmil', age: 23}
  // res.writeHead(200, {'Content-Type': 'application/json'})
  // res.end(JSON.stringify(data))

  if(req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')

    res.writeHead(200, { 'Content-Type': 'text/html' })

    res.end(htmlFile)

    return
  }

  if(req.url?.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' })
  } else if(req.url?.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' })
  }

  const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
  res.end(responseContent)
})


server.listen(3001, () => {
  console.log('Server running on por 3001');
})