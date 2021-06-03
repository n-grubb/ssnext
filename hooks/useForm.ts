import React, { useState, useEffect, useRef } from 'react'

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues || {})
  const [errors, setErrors] = useState<any>({})
  const [touched, setTouched] = useState<any>({})

  // setup a useEffect hook to only run on first render.
  const formRendered = useRef(true)
  useEffect(() => {
    if (formRendered.current) {
      setValues(initialValues)
      setErrors({})
      setTouched({})
    }
    formRendered.current = false
  }, [initialValues])

  // handle change events on our form fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    const { name, value } = target
    setValues({ ...values, [name]: value });
  }

  // handle blur events, mark fields as touched and set errors.
  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    const { name } = target
    setTouched({ ...touched, [name]: true })
    // the validate function returns an errors object, so we can use it with setErrors
    setErrors(validate(values))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) { event.preventDefault() }
    setErrors(validate(values))
    onSubmit({ values, errors })
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  }
}

export default useForm