import { fileTypes } from '@violet/def/constants'
import { AddButton } from '@violet/web/src/components/atoms/AddButton'
import { Spacer } from '@violet/web/src/components/atoms/Spacer'
import styled from 'styled-components'
import { ChevronUp } from '../../../../components/atoms/Chevron'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const ButtonWrap = styled.div`
  display: flex;
`
export const WorkPagingBar = () => {
  const sendFormData = (file: File) => {
    return file
  }
  const setOpenAlert = (isOpen: boolean) => {
    return isOpen
  }
  const dropFile = (file: File) => {
    fileTypes.some((f) => file.type === f.type) ? void sendFormData(file) : setOpenAlert(true)
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 1) {
      dropFile(e.target.files[0])
    }
    e.target.value = ''
  }

  return (
    <Container>
      <ChevronUp />
      <ButtonWrap onChange={onChange}>
        <Spacer axis="x" size={4} />
        <AddButton />
        <Spacer axis="x" size={4} />
      </ButtonWrap>
    </Container>
  )
}
