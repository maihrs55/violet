import styled from 'styled-components'
import { acceptExtensions } from '~/server/utils/constants'
import { alphaLevel, colors } from '~/utils/constants'

const Container = styled.div`
  display: flex;
  height: 100%;
`
const WidthAdjustments = styled.div`
  width: 95%;
`
const StyledAddButton = styled.label`
  & {
    position: relative;
    box-sizing: border-box;
    display: block;
    width: 48px;
    height: 48px;
    color: ${colors.violet};
    cursor: pointer;
    background-color: ${colors.violet}${alphaLevel[2]};
    border: 2px solid;
    border-radius: 4px;
    transform: scale(var(--ggs, 1));
  }
  &::after,
  &::before {
    position: absolute;
    top: 20px;
    left: 10px;
    box-sizing: border-box;
    display: block;
    width: 24px;
    height: 4px;
    color: ${colors.violet};
    content: '';
    background: currentColor;
    border-radius: 5px;
  }
  &::after {
    top: 10px;
    left: 20px;
    width: 4px;
    height: 24px;
    color: ${colors.violet};
  }
`
const UploadFile = styled.input`
  display: none;
`
export const AddButton = () => {
  return (
    <Container>
      <WidthAdjustments />
      <StyledAddButton>
        <UploadFile type="file" accept={acceptExtensions} />
      </StyledAddButton>
    </Container>
  )
}