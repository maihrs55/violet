import { acceptExtensions, fileTypes } from '@violet/def/constants'
import type { ApiRevision } from '@violet/lib/types/api'
import type { ProjectId, RevisionPath, WorkId } from '@violet/lib/types/branded'
import type { InfoJson } from '@violet/lib/types/files'
import { CardModal } from '@violet/web/src/components/organisms/CardModal'
import { useApiContext } from '@violet/web/src/contexts/Api'
import { useBrowserContext } from '@violet/web/src/contexts/Browser'
import { colors, fontSizes, mainColumnHeight } from '@violet/web/src/utils/constants'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`

const Column = styled.div`
  display: flex;
  justify-content: end;
`

const SecondaryButton = styled.button`
  padding: 0.3em;
  font-size: ${fontSizes.large};
  color: ${colors.white};
  cursor: pointer;
  background-color: ${colors.gray};
  border: none;
  border-radius: 16px;
`

const DisplayWorksFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: ${mainColumnHeight};
  min-height: 100%;
  padding: 48px;
  background: ${colors.transparent};
  transition: background 0.2s, padding 0.2s;
`

const DisplayWorksViewer = styled.img`
  height: 100%;
  vertical-align: middle;
`

const Dropper = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: ${colors.transparent};
  opacity: 0;
`

const AlertMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  white-space: nowrap;
  transform: translate(-50%, -50%);
`

export const Revision = (props: {
  projectId: ProjectId
  workId: WorkId
  revision: ApiRevision
}) => {
  const [isFile, setIsFile] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const { api, onErr } = useApiContext()
  const { wholeDict, updateWholeDict } = useBrowserContext()
  const [workPath, setWorkPath] = useState([props.revision.url])
  const revisionPath = props.revision.url.substring(0, props.revision.url.lastIndexOf('/'))

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 1) {
      dropFile(e.target.files[0])
    }
    setIsFile(false)
    e.target.value = ''
  }

  const dropFile = (file: File) => {
    fileTypes.some((f) => file.type === f.type) ? void sendFormData(file) : setOpenAlert(true)
  }

  const sendFormData = async (file: File) => {
    const revisionRes = await api.browser.projects
      ._projectId(props.projectId)
      .works._workId(props.workId)
      .revisions.$post({ body: { uploadFile: file } })
      .catch(onErr)

    if (!revisionRes) return

    updateWholeDict('revisionsForWorkId', {
      [props.workId]: [
        ...(wholeDict.revisionsForWorkId[props.workId] ?? []),
        { ...revisionRes, workId: props.workId },
      ],
    })
  }

  const closeModal = () => {
    setOpenAlert(false)
  }

  useEffect(() => {
    void (async () => {
      const json: InfoJson = await fetch(props.revision.url).then((res) => res.json())
      setWorkPath(
        json.fallbackImageExts.map((ext, i) => `${revisionPath}/${i}.${ext}` as RevisionPath)
      )
    })()
  }, [props.revision.url, revisionPath])

  return (
    <Container
      onDragEnter={() => setIsFile(true)}
      onDragLeave={() => setIsFile(false)}
      onChange={onChange}
    >
      <CardModal open={openAlert} onClose={closeModal}>
        <AlertMessage>UnSupported File Format!</AlertMessage>
        <Column>
          <SecondaryButton onClick={closeModal}>Confirm</SecondaryButton>
        </Column>
      </CardModal>
      {isFile && <Dropper type="file" accept={acceptExtensions} />}
      <DisplayWorksFrame>
        {workPath.map((p, i) => (
          <DisplayWorksViewer key={i} src={p} />
        ))}
      </DisplayWorksFrame>
    </Container>
  )
}