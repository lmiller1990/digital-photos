import express, { Response, Express, Request } from 'express'
import { Client } from 'pg'

import { dbMiddleware } from './middleware/db'

const app: Express = express()
app.use(dbMiddleware)

declare global {
  namespace Express {
    interface Request {
      client: Client
      token: string
    }
  }
}

app.post('/images', async (req: Request, res: Response) => {
  res.json({ msg: 'ok' })
})

app.get('/images', async (req: Request, res: Response) => {
  const query = await req.client.query('select * from photoframes')

  console.log('rows', query.rows)
  res.send(`
    <h3>Upload images</h3>
    <div></div>
  `)
})

app.listen(8080)
