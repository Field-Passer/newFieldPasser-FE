import React from 'react'
import styled from 'styled-components'

interface IInner {
  width?: string
  height?: string
  display?: string
  padding?: string
  children: React.ReactNode
}
const Inner = ({
  width = '834px',
  height = '',
  display = '',
  padding = '',
  children,
}: IInner) => {
  return (
    <InnerStyle
      width={width}
      height={height}
      display={display}
      padding={padding}
    >
      {children}
    </InnerStyle>
  )
}

export default Inner

const InnerStyle = styled.div<{
  width: string
  height: string
  display: string
  padding: string
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: 0 auto;
  display: ${({ display }) => display};
  padding: ${({ padding }) => padding};
`
