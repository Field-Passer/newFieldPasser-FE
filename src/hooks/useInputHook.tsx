/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react'

type InputValidator = () => string

const useInput = (
  validator?: InputValidator | any,
  defaultValue?: string
): [string, ChangeEventHandler, boolean, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(defaultValue || '')
  const [error, setError] = useState<boolean>(false)

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)

      if (validator) {
        const error = validator(e.target.value)
        if (error) {
          setError(error)
          return
        }
      }
      setError(false)
    },
    [validator]
  )
  return [value, onChange, error, setValue]
}

export default useInput
