import { ChangeEvent } from 'react'
import { districtOptions } from '@src/constants/options'

const DistrictSelect = ({ postData, setPostData }: IWriteInputsProps) => {
  const setSelectedDistrict = (e: ChangeEvent<HTMLSelectElement>) => {
    setPostData((prev) => {
      return { ...prev, districtName: e.target.value }
    })
  }

  return (
    <>
      <h2>지역</h2>
      <select name="districtName" onChange={(e) => setSelectedDistrict(e)} value={postData.districtName}>
        {districtOptions.map((item) => {
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

export default DistrictSelect
