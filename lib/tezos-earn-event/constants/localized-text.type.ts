export type LocalizedText = {
  en: string;
  km: string;
};
export const LocalizedText = {
  en: 'en',
  km: 'km',
};

export const createEmptyLocalizedText = (): LocalizedText => {
  return {
    en: '',
    km: '',
  };
};
