import { ChangeEvent } from 'react'
import styled from 'styled-components'

type PropsType = {
  formattedPrice: string
  setFormattedPrice: React.Dispatch<React.SetStateAction<string>>
}

const PriceInput = ({ formattedPrice, setFormattedPrice }: PropsType) => {
  const priceFormatting = (event: ChangeEvent<HTMLInputElement>) => {
    let price = event.target.value
    price = Number(price.replace(/[^0-9]/g, '')).toLocaleString('ko-KR')
    setFormattedPrice(price)
  }

  return (
    <>
      <h2>가격</h2>
      <div>
        <PriceBox
          type="text"
          placeholder="50,000"
          minLength={1}
          maxLength={7}
          required
          name="price"
          value={formattedPrice}
          onChange={(event) => priceFormatting(event)}
        />
        <span className="won">원</span>
      </div>
    </>
  )
}

const PriceBox = styled.input`
  width: 100%;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export default PriceInput
