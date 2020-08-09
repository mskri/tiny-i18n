type TinyI18nConfig = {
  locales: TinyLocale;
};

type TinyLocale = Record<string, Record<string, string>>;

const locales: TinyLocale = {};
const language = 'en';

const tinyI18n = ({ locales: loc2 }: TinyI18nConfig): void => {
  for (const [lang, loc] of Object.entries(loc2)) {
    locales[lang] = loc;
  }
};

// Works for: ${abc.def} or ${abcDef}
const placeholderRegExp = /\${[\w._]+}/g;

const t = (key: string, ...params: (string | number | null | undefined)[]): string => {
  const translation: string = locales[language][key];

  if (!translation) {
    throw new Error(`Could not find translation for '${key}'`);
  }

  const placeholders: RegExpMatchArray = translation.match(placeholderRegExp) ?? [];

  if (placeholders.length !== params.length) {
    throw new Error(
      `Number of params does not match with number of placeholders in translation. Received ${params.length}, expected ${placeholders.length}`
    );
  }

  if (params.length > 0) {
    let index = 0;

    return translation.replace(placeholderRegExp, () => {
      const filledTranslation = params[index] as string;
      index++;
      return filledTranslation;
    });
  }

  return translation;
};

export type TinyI18n = {
  tinyI18n: ({ locales }: TinyI18nConfig) => void;
  t: (key: string, ...params: (string | number | null | undefined)[]) => string;
};

const i18n: TinyI18n = Object.freeze({
  tinyI18n,
  t,
});

export default { ...i18n };
