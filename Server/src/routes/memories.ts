/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { Prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler',async(request) => {
   await request.jwtVerify()
  })

  app.get('/memories', async (request) => {
    const memories = await Prisma.memory.findMany({
      where: {
        userId: request.user.sub
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return memories.map((memories) => {
      return {
        id: memories.id,
        coverURL: memories.coverURL,
        excerpt: memories.content.substring(0, 115).concat('...'),
        createdAt: memories.createdAt        
      }
    })
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memory = await Prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    })
    if (!memory.isPublic && memory.userId !== request.user.sub){
      return reply.status(401).send()
    }
    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverURL: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { content, coverURL, isPublic } = bodySchema.parse(request.body)
  

    const memory = await Prisma.memory.create({
      data: {
       content,
       coverURL,
       isPublic,
        userId: request.user.sub,
    },
  })
  return memory
}) 

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const bodySchena = z.object({
      content: z.string(),
      coverURL: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { content, coverURL, isPublic } = bodySchena.parse(request.body)

     let memory = await Prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
     })

     if (memory.userId !== request.user.sub){
      return reply.status(401).send()
     }

    memory = await Prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverURL,
        isPublic,
      },
    })
    return memory
  })

  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memory = await Prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
     })

     if (memory.userId !== request.user.sub){
      return reply.status(401).send()
     }

      await Prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
