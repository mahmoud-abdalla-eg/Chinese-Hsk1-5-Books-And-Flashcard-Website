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
  dashboard: { en: "Dashboard", zh: "学习面板", ar: "لوحة التقدم" },
  startLearning: { en: "Start learning", zh: "开始学习", ar: "ابدأ التعلم" },
  dataWarning: {
    en: "Data warnings are visible because missing translations or audio are not invented.",
    zh: "数据警告可见，因为不会编造缺失的翻译或音频。",
    ar: "تظهر تنبيهات البيانات لأن الترجمات أو الصوت المفقود لا يتم اختلاقه.",
  },
};

export function t(key, lang = "en") {
  return dictionary[key]?.[lang] || dictionary[key]?.en || key;
}
