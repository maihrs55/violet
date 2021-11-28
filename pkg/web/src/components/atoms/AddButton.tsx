import { alphaLevel, colors } from '@violet/web/src/utils/constants'
import styled from 'styled-components'

export const AddButton = styled.label`
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 36px;
  height: 36px;
  color: ${colors.violet};
  cursor: pointer;
  background-color: ${colors.violet}${alphaLevel[2]};
  border: none;
  border-radius: 4px;
  transform: scale(var(--ggs, 1));
  ::after,
  ::before {
    position: absolute;
    top: 16px;
    left: 8px;
    box-sizing: border-box;
    display: block;
    width: 20px;
    height: 4px;
    color: ${colors.violet};
    content: '';
    background: currentColor;
    border-radius: 5px;
  }
  ::after {
    top: 8px;
    left: 16px;
    width: 4px;
    height: 20px;
    color: ${colors.violet};
  }
`
