export const languages = {
  en: { label: "English", dir: "ltr" },
  zh: { label: "中文", dir: "ltr" },
  ar: { label: "العربية", dir: "rtl" },
};

export const dictionary = {
  appName: {
    en: "Mandarin Flow HSK",
    zh: "中文会话 HSK",
    ar: "ماندرين فلو HSK",
  },
  home: { en: "Home", zh: "首页", ar: "الرئيسية" },
  flashcards: { en: "Flashcards", zh: "抽认卡", ar: "البطاقات" },
  conversations: { en: "Conversations", zh: "会话", ar: "المحادثات" },
  grammar: { en: "Grammar", zh: "语法", ar: "القواعد" },
  dashboard: { en: "Dashboard", zh: "学习面板", ar: "لوحة التقدم" },
  startLearning: { en: "Start learning", zh: "开始学习", ar: "ابدأ التعلم" },
  dataWarning: {
    en: "Some lessons are still growing. New translations, examples, and audio will appear as they are added.",
    zh: "部分课程还在完善中。新的翻译、例句和音频会逐步加入。",
    ar: "بعض الدروس ما زالت تتطور. ستظهر الترجمات والأمثلة والصوت عند إضافتها.",
  },
};

export function t(key, lang = "en") {
  return dictionary[key]?.[lang] || dictionary[key]?.en || key;
}
