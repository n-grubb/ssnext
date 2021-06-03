import css from 'styled-jsx/css'
import Input from '@/components/basics/Input'

const FormField = props => {
  const hasError = props.error && props.error !== ''

  return (
    <>
      <div className="form-field">
        { props.label &&
          <label 
            htmlFor={props.name}
            className="form-field__label"
          >
            { props.label }
            { props.optional &&
              <span className="optional-text">(optional)</span>
            }
          </label>
        }
        <Input 
          type={props.type || 'text'} 
          name={props.name || null} 
          value={props.value}
          placeholder={props.placeholder}
          onBlur={props.onBlur}
          onChange={props.onChange}
        />
        { hasError && 
          <div className="form-field__error">
            { props.error }
          </div>
        }
      </div>
      <style jsx>{ formFieldStyles }</style>
    </>
  )
}

const formFieldStyles = css`
  .form-field {
    margin-bottom: var(--s);
  }

  .form-field__label {
    font-weight: var(--font-semi);
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
  }

  .optional-text {
    margin-left: var(--s-xxs);
    color: var(--text-color-light);
    font-size: var(--text-sm);
    font-weight: var(--font-light);
  }

  .form-field__error {
    padding: var(--s-xs);
    border-left: 4px solid var(--red);
    border-top-right-radius: var(--border-radius-light);
    border-bottom-right-radius: var(--border-radius-light);
    background-color: var(--red-100);
    color: var(--black);
    font-size: var(--text-sm);
    font-weight: var(--font-light);
  }

`

export default FormField