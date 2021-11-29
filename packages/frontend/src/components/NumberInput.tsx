import { InputNumber, InputNumberProps } from 'antd'

const NumberInput: React.FC<InputNumberProps & { disabled?: boolean }> = ({
  onChange,
  value,
  defaultValue,
  placeholder = '0.0',
  disabled = false,
}) => {
  return (
    <InputNumber
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}

export default NumberInput
