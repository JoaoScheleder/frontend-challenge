
const translations: { [key: string]: { [key: string]: string } } = {
    en: {
      welcome_message: "Hi, I'm Astro Cat, how can I help you?",
      new_chat : "New Chat",
      upgrade_to_premium: "Upgrade to",
      do_more : "Do More",
      your_virtual_assistant: "Your virtual assistant",
      exit: "Exit",
      settings: "Settings",
      developer: "Developer",
    },
    pt: {
      welcome_message: "Oii, sou o Astro Cat, como posso te ajudar?",
      new_chat : "Novo Chat",
      upgrade_to_premium: "Atualize para o",
      do_more: "Aproveite mais",
      your_virtual_assistant: "Seu assistente virtual",
      exit: "Sair",
      settings: "Configurações",
      developer: "Desenvolvedor",
    },
  };
  
  export type Locale = 'en' | 'pt';
  
  export const getTranslation = (locale: Locale, key: string): string => {
    return translations[locale][key] || key;
  };