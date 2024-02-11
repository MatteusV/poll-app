import fastify from 'fastify'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import websocket from '@fastify/websocket'
import { pollResults } from './ws/poll-results'

export const app = fastify()

app.register(cors)
app.register(websocket)

app.register(cookie, {
  secret: 'cookie-secret-poll',
  hook: 'onRequest',
})

// routes
app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResults)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})
