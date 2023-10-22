import { COLORS } from '@src/globalStyles'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

type PropsType = {
  selectedSortOption: string
  setSelectedSortOption: React.Dispatch<React.SetStateAction<string>>
  setDisplayReorderButton: React.Dispatch<React.SetStateAction<boolean>>
}

const ReorderButton = ({ selectedSortOption, setSelectedSortOption, setDisplayReorderButton }: PropsType) => {
  const [sortOptionTemp, setSortOptionTemp] = useState('')

  const reOrder = () => {
    setSortOptionTemp(selectedSortOption)
    setSelectedSortOption('가장 최신 순')
  }

  useEffect(() => {
    if (sortOptionTemp) {
      setSelectedSortOption(sortOptionTemp)
      setDisplayReorderButton(false)
    }
  }, [sortOptionTemp])

  return (
    <Button onClick={() => reOrder()}>
      다시
      <br />
      정렬하기
    </Button>
  )
}

const Button = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 60px;
  height: 60px;
  background-color: ${COLORS.green};
  border-radius: 100%;
  color: white;
  font-size: 12px;
  z-index: 100;
  &:hover {
    background-color: ${COLORS.gray40};
  }
`

export default ReorderButton
