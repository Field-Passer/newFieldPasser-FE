/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react'

type InputValidator = () => string

const useInput = (validator?: InputValidator | any, defaultValue?: string): [string, ChangeEventHandler, string] => {
  const [value, setValue] = useState<string>(defaultValue || '')
  const [error, setError] = useState<string>('')

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)

      const error = validator(e.target.value)
      if (error) {
        console.log('오류..', e.target.value)
        setError(error)
        return
      }
      setError('')
    },
    [validator]
  )
  return [value, onChange, error]
}

export default useInput
