import React from 'react'
import styled from 'styled-components'

interface IInner {
  width?: string
  height?: string
  display?: string
  justifyContent?: string
  alignItems?: string
  padding?: string
  children: React.ReactNode
}
const Inner = ({
  width = '834px',
  height = '',
  display = '',
  justifyContent = '',
  alignItems = 'center',
  padding = '',
  children,
}: IInner) => {
  return (
    <InnerStyle
      width={width}
      height={height}
      display={display}
      justifyContent={justifyContent}
      alignItems={alignItems}
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
  justifyContent: string
  alignItems: string
  padding: string
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: 0 auto;
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  padding: ${({ padding }) => padding};
`
