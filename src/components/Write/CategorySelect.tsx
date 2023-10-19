import { ChangeEvent } from 'react'
import { categoryOptions } from '@src/constants/options'

type PropsType = {
  selectedCategory: string
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
}

const CategorySelect = ({ selectedCategory, setSelectedCategory }: PropsType) => {
  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value)
  }
  return (
    <>
      <h2>종목</h2>
      <select name="categoryName" onChange={(event) => handleChangeSelect(event)} value={selectedCategory}>
        {categoryOptions.map((item, index) => {
          if (index)
            return (
              <option value={item} key={item}>
                {item}
              </option>
            )
        })}
      </select>
    </>
  )
}

export default CategorySelect
