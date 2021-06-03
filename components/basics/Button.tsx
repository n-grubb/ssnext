import styled from "styled-components"

type ButtonOptions = {
  label: string
  type: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost' 
  size?: 'small' | 'medium' | 'large' 
}

const ButtonComponent = ({ label, type = 'button', disabled = false, variant = 'primary', size = 'medium' }: ButtonOptions) => {
  return (
    <Button
      className={`${variant} ${size}`}
      type={type}
      disabled={disabled}
      tabIndex={0}
    >
      { label }
    </Button>
  )
}

const Button = styled.button`
  --button-bg-color: var(--neutral);
  --button-border-color: var(--neutral);
  --button-text-color: var(--white);
  --button-hover-color: var(--neutral-dark);
  
  /* button sizing */
  min-width: var(--button-min-width, 12rem);
  padding: var(--s-sm) var(--s);
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  border-color: var(--button-border-color);
  background-color: var(--button-color);
    
  /* button typography */
  color: var(--button-text-color);
  fill: var(--button-text-color);
  font-size: var(--text-sm);
  font-weight: var(--font-semi);
  line-height: var(--leading-none);
  text-align: center;

  /* animation */
  transition: .3s;

  /* center child content */
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:focus,
  &:active,
  &:not(:disabled):hover {
    background-color: var(--button-hover-color);
    border-color: var(--button-hover-color);
  }

  &:focus {
    outline: 2px solid transparent; /* fallback for high-contrast mode. */
    box-shadow: 
      0 0 0 1px transparent, 
      0 0 0 .25rem var(--focus-color);
  }

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: .75;
  }

  /* Button Sizing Options */
  &.small {
    min-width: var(--min-tap-area);
    width: max-content;
  }

  &.large {
    width: 100%;
  }

  /* Primary Button Styles */
  &.primary {
    --button-bg-color: var(--neutral);
    --button-border-color: var(--neutral);
  }

  &.secondary {
    --button-bg-color: var(--white);
    --button-border-color: var(--neutral);
    --button-text-color: var(--neutral);
  
    &:focus,
    &:active,
    &:not(:disabled):hover {
      --button-hover-color: var(--neutral-darker);
    }
  }

  &.ghost {
    --button-text-color: var(--text-color);

    min-width: min-content;
    background-color: transparent;
    border-color: transparent;
  
    &:focus,
    &:active,
    &:not(:disabled):hover {
      --button-hover-color: var(--neutral-darker);
      border-color: transparent;
    }
  }
`
export default ButtonComponent