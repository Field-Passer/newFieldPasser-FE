import { Mobile, Tablet, PC } from '@src/hooks/useScreenHook'

const Main = () => {
  return (
    <div>
      <PC>PC입니다.</PC>
      <Tablet>타블렛입니다.</Tablet>
      <Mobile>모바일입니다.</Mobile>
    </div>
  )
}

export default Main
