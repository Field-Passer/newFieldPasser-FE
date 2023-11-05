import React, { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

interface IChildren {
  children: ReactNode
}

const Mobile = ({ children }: IChildren) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })
  return <React.Fragment>{isMobile && children}</React.Fragment>
}

const PC = ({ children }: IChildren) => {
  const isPC = useMediaQuery({
    query: '(min-width: 834px)',
  })
  return <React.Fragment>{isPC && children}</React.Fragment>
}

export { Mobile, PC }
