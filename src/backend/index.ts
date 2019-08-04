import express, { Response, Express, Request } from 'express'
import { Client } from 'pg'
import multer from 'multer'

import { dbMiddleware } from './middleware/db'

const app: Express = express()
app.use(dbMiddleware)

const upload = multer({ dest: 'public' })

declare global {
  namespace Express {
    interface Request {
      client: Client
      token: string
    }
  }
}

app.post('/images', upload.array('images'), async (req: Request, res: Response) => {
  // access files in req.files
  res.json({ msg: 'ok' })
})

app.get('/images', async (req: Request, res: Response) => {
  const query = await req.client.query('select * from photoframes')

  console.log('rows', query.rows)
  res.send(`
    <h3>Upload images</h3>
    <form action="/images" method="post" enctype="multipart/form-data">
      <input type="file" name="images">
      <button type="submit">Submit</button>
    </form>
    <div></div>
  `)
})

app.listen(8080)
