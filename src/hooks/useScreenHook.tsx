import React, { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

interface IChildren {
  children: ReactNode
}

const Mobile = ({ children }: IChildren) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 380px)',
  })
  return <React.Fragment>{isMobile && children}</React.Fragment>
}

const Tablet = ({ children }: IChildren) => {
  const isTablet = useMediaQuery({
    query: '(min-width: 380px)',
  })
  return <React.Fragment>{isTablet && children}</React.Fragment>
}

export { Mobile, Tablet }
