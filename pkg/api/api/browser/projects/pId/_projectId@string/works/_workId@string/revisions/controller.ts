import { createRevision, getRevisions } from '@violet/api/src/service/browser/revisions'
import { sendNewWork } from '@violet/api/src/service/s3'
import { createS3SaveRevisionPath } from '@violet/api/src/utils/s3'
import type { ProjectId, WorkId } from '@violet/lib/types/branded'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ params, query }) => {
    const revisions = await getRevisions(
      params.projectId as ProjectId,
      params.workId as WorkId,
      query
    )

    return { status: 200, body: revisions }
  },
  post: async ({ params, body }) => {
    const revision = await createRevision(params.projectId as ProjectId, params.workId as WorkId)
    const data = await sendNewWork({
      uploadFile: body.uploadFile,
      path: createS3SaveRevisionPath(
        params.projectId as ProjectId,
        revision.id,
        body.uploadFile.filename
      ),
    })

    return data.httpStatusCode === 200 ? { status: 201, body: revision } : { status: 400 }
  },
}))
