import {
  gamePromptses,
  gamePrompts,
  createGamePrompts,
  updateGamePrompts,
  deleteGamePrompts,
} from './gamePromptses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('gamePromptses', () => {
  scenario('returns all gamePromptses', async (scenario) => {
    const result = await gamePromptses()

    expect(result.length).toEqual(Object.keys(scenario.gamePrompts).length)
  })

  scenario('returns a single gamePrompts', async (scenario) => {
    const result = await gamePrompts({ id: scenario.gamePrompts.one.id })

    expect(result).toEqual(scenario.gamePrompts.one)
  })

  scenario('creates a gamePrompts', async () => {
    const result = await createGamePrompts({
      input: { prompt: 'String', gameId: 7097727 },
    })

    expect(result.prompt).toEqual('String')
    expect(result.gameId).toEqual(7097727)
  })

  scenario('updates a gamePrompts', async (scenario) => {
    const original = await gamePrompts({
      id: scenario.gamePrompts.one.id,
    })
    const result = await updateGamePrompts({
      id: original.id,
      input: { prompt: 'String2' },
    })

    expect(result.prompt).toEqual('String2')
  })

  scenario('deletes a gamePrompts', async (scenario) => {
    const original = await deleteGamePrompts({
      id: scenario.gamePrompts.one.id,
    })
    const result = await gamePrompts({ id: original.id })

    expect(result).toEqual(null)
  })
})
