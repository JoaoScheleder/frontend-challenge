import React from 'react';

interface InputProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, type, value, onChange, onKeyPress }: Readonly<InputProps>) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className="border-none outline-none dark:bg-zinc-700 bg-zinc-200 p-4 rounded-2xl w-full dark:text-white text-black"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
      onKeyDownCapture={onKeyPress}
    />
  );
}