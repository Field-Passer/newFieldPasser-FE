import SearchForm from '@src/components/SearchForm'
import Board from '@src/components/Board'

const BoradBlind = () => {
  return (
    <>
      <SearchForm />
      <Board data={[]} message={'일치하는 조건의 게시글이 없습니다!'} />
    </>
  )
}

export default BoradBlind
