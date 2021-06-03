import { useState } from 'react'

type Option = {
  label: string,
  value: string
}

interface SelectOptions {
  title: string
  id: string
  name: string
  options: Option[]
  defaultOption: Option
  selected: string
  ariaLabel?: string
}

const Select = (props: SelectOptions) => {
  const [open, setOpen] = useState(false)

  const selectOptions = props.options.map(option => {
    return (
      <option 
        key={option.value}
        value={option.value}
        selected={props.selected === option.value}
      >
        { option.label }
      </option>
    )
  })
  const selectOption = () => {}

  return (
    <div className="select-wrapper">
      { props.title && 
        <label htmlFor={props.id}>
          { props.title }
        </label>
      }
      <div className="select">
        <select 
          id={props.id}
          name={props.name}
          aria-label={ props.ariaLabel || `Select an option ${props.name && 'for ' + props.name}`}
          data-open={open}
          onClick={() => setOpen(true)}
          onChange={()=> selectOption()}
        > 
          { props.defaultOption &&
            <option 
              value={props.defaultOption.value}
              selected={props.selected === props.defaultOption.value}
            >
              { props.defaultOption.label }
            </option>
          }
          { selectOptions }
        </select>
        <span className={`caret ${open && 'caret-up'}`}>

        </span>
    </div>
  </div>
  )
}


/*
  todo: import icon
  <span :class="['caret', { 'caret-up': open }]" >
    <IconAngleDown />
  </span>
*/

export default Select 