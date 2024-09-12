import { useLanguage } from "@/context/translationcontext";
import { Locale } from "@/translation";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Image from "next/image";
import { useState } from "react";

const LanguageSelector = () => {
  const { changeLanguage } = useLanguage();
  const [value , setValue] = useState('en');

  const handleChange = (value : string) => {
    changeLanguage(value as Locale);
    setValue(value)
  };

  return (
    <Select value={value} onValueChange={(value)=>handleChange(value)}>
    <SelectTrigger className="w-[148px]">
      <SelectValue placeholder="Languages" />
    </SelectTrigger>
    <SelectContent className="flex items-center">
      <SelectItem  value="en">
        <Image width={24} height={24} className="inline-block mr-2" alt="Bandeira dos Estados Unidos" src='/images/united-states.png'></Image>
        English</SelectItem >
      <SelectItem value="pt">        
        <Image width={24} height={24} className="inline-block mr-2" alt="Bandeira do Brasil" src='/images/brazil.png'></Image>
        Português
      </SelectItem >
    </SelectContent>
  </Select>
  );
};

export default LanguageSelector;