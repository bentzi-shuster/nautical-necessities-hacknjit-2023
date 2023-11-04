import { db } from 'src/lib/db'

export const gamePromptses = () => {
  return db.gamePrompts.findMany()
}

export const gamePrompts = ({ id }) => {
  return db.gamePrompts.findUnique({
    where: { id },
  })
}

export const createGamePrompts = ({ input }) => {
  return db.gamePrompts.create({
    data: input,
  })
}

export const updateGamePrompts = ({ id, input }) => {
  return db.gamePrompts.update({
    data: input,
    where: { id },
  })
}

export const deleteGamePrompts = ({ id }) => {
  return db.gamePrompts.delete({
    where: { id },
  })
}
