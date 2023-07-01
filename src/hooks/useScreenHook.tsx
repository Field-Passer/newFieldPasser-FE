import React, { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

interface IChildren {
  children: ReactNode
}

const Mobile = ({ children }: IChildren) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 450px)',
  })
  return <React.Fragment>{isMobile && children}</React.Fragment>
}

const Tablet = ({ children }: IChildren) => {
  const isTablet = useMediaQuery({
    query: '(max-width: 834px) and (min-width: 451px)',
  })
  return <React.Fragment>{isTablet && children}</React.Fragment>
}

const PC = ({ children }: IChildren) => {
  const isPC = useMediaQuery({
    query: '(min-width: 835px)',
  })
  return <React.Fragment>{isPC && children}</React.Fragment>
}

export { Mobile, Tablet, PC }
