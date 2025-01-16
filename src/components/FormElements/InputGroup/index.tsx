import React from "react";

interface InputGroupProps {
  customClasses?: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  value?: any;
  name?: string;
  inputClasses?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  customClasses,
  label,
  type,
  placeholder,
  required,
  value,
  onChange,
  name,
  inputClasses
}) => {
  return (
    <>
      <div className={customClasses}>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          {label}
          {required && <span className="text-red">*</span>}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${inputClasses}`}
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    </>
  );
};

export default InputGroup;
