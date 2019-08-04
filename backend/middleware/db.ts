import { Client } from 'pg'
import { Request, Response, NextFunction } from 'express'

const dbMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    if (req.client) {
      console.log('[DEBUG]: Closing db connection')
      req.client.end()
    }
  })

  res.on('error', () => {
    console.log('[DEBUG]: Error occurred, closing db connection')

    if (req.client) {
      req.client.end()
    }
  })

  try {
    console.log('[DEBUG]: Creating db connection')
    const client = new Client({
      user: 'lachlan',
      host: 'localhost',
      port: 5432,
      database: 'photos_development'
    })
    client.connect()
    req.client = client
    next()
  } catch (e) {
    console.log('Error:', e)
  }
}

export { dbMiddleware }
