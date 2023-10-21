import { ChangeEvent } from 'react'
import { categoryOptions } from '@src/constants/options'

const CategorySelect = ({ postData, setPostData }: IWriteInputsProps) => {
  const setSelectedCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setPostData((prev) => {
      return { ...prev, categoryName: e.target.value }
    })
  }
  return (
    <>
      <h2>종목</h2>
      <select name="categoryName" onChange={(e) => setSelectedCategory(e)} value={postData.categoryName}>
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
