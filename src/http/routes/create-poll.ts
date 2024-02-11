import { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../../lib/prisma'

export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
      options: z.array(z.string()),
    })

    const { title, options } = createPollBody.parse(request.body)
    console.log(options)
    const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map((option) => {
              return {
                title: option,
              }
            }),
          },
        },
      },
    })

    if (!poll.id) {
      reply.status(400).send({ error: 'Error creating poll' })
    }
    reply.status(201).send({ message: 'Poll created successfully' })
  })
}
