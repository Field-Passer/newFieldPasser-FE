import { ChangeEvent } from 'react'
import { districtOptions } from '@src/constants/options'

type PropsType = {
  selectedDistrict: string
  setSelectedDistrict: React.Dispatch<React.SetStateAction<string>>
}

const DistrictSelect = ({ selectedDistrict, setSelectedDistrict }: PropsType) => {
  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value)
  }
  return (
    <>
      <h2>지역</h2>
      <select name="districtName" onChange={(event) => handleChangeSelect(event)} value={selectedDistrict}>
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
