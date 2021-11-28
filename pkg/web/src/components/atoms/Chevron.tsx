import styled from 'styled-components'
export const ChevronUp = styled.i`
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 22px;
  height: 22px;
  border: 2px solid transparent;
  border-radius: 100px;
  transform: scale(var(--ggs, 1));
  &::after {
    position: absolute;
    bottom: 2px;
    left: 4px;
    box-sizing: border-box;
    display: block;
    width: 10px;
    height: 10px;
    content: '';
    border-top: 2px solid;
    border-right: 2px solid;
    transform: rotate(-45deg);
  }
`
