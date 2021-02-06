/* eslint-disable @typescript-eslint/ban-types */
import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';

import { Container, Error } from './styles';

registerLocale('ptBR', ptBR);

interface InputProps extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const DatePicker: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [date, setDate] = useState(defaultValue || null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} />}
      <ReactDatePicker
        locale="ptBR"
        dateFormat="dd/MM/yyyy"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        selected={date}
        onChange={setDate}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default DatePicker;
