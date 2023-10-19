import Write from '@src/components/Write/Write'
import { useEffect } from 'react'

const WritePost = () => {
  // api호출해 state에 담고 form에 보내기

  useEffect(() => {
    console.log('write')
  }, [])

  return <Write />
}

export default WritePost
