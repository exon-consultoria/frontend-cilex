import { FieldProps } from 'formik';
import React from 'react';
import Select, { OptionsType, ValueType } from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: OptionsType<Option>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
}: CustomSelectProps): JSX.Element => {
  const onChange = (option: ValueType<any, any>) => {
    form.setFieldValue(
      field.name,
      option ? (option as Option[]).map((item: Option) => item.value) : [],
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    }

    return isMulti ? [] : ('' as any);
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti
    />
  );
};

export default CustomSelect;
