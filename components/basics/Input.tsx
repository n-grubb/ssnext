import css from 'styled-jsx/css'
import  { random5Chars } from '@/utils/randomizer.js' 

type InputOptions = {
  type?: string
  name?: string
  id?: string
  placeholder?: string
  value?: string
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputOptions) => {
  // Setup default name/id
  const inputName = props.name || `input-${random5Chars()}`
  const inputId = props.id || inputName

  return (
    <>
      <input 
        type={props.type || 'text'} 
        id={inputId}
        name={inputName} 
        className="input"
        placeholder={props.placeholder}
        value={props.value} 
        onBlur={props.onBlur}
        onChange={props.onChange} 
      />
      <style jsx>{ inputStyles }</style>
    </>
  )
}

const inputStyles = css`
  .input {
    width: 100%;
    padding: var(--s-xs) var(--s-sm);
    border: 1px solid var(--neutral-light);
    border-radius: var(--border-radius-light);
    margin-bottom: var(--s-xxs);
    background: var(--cool-white);
  }

  .input::placeholder {
    color: var(--text-color-lighter);
  }
`

export default Input