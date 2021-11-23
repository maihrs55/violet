import { getMessages } from '@violet/api/src/service/streamBar'
import type { RevisionId } from '@violet/lib/types/branded'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ params }) => {
    const messages = await getMessages(params.revisionId as RevisionId)

    return { status: 200, body: messages }
  },
}))