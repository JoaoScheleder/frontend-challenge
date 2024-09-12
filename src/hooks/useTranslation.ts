import { useLanguage } from "@/context/translationcontext";
import { getTranslation } from "@/translation";

const useTranslation = () => {
  const { locale } = useLanguage();

  const t = (key: string): string => {
    return getTranslation(locale, key);
  };

  return { t };
};

export default useTranslation;