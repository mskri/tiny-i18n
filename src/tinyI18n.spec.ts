import { tinyI18n, t } from './index';

describe('tinyI18n', () => {
  it('translates correctly', () => {
    tinyI18n({
      locales: {
        en: {
          hello: 'hello world',
          onePlaceholder: 'hello ${name}',
          receiveLessThanExpect: 'hello ${name}',
          receiveMoreThanExpect: 'hello',
          multiplePlaceholders: 'hello ${firstName} ${lastName}',
          dotNotationPlaceholder: 'hello ${first.name} ${last.name}',
        },
      },
    });

    expect(t('hello')).toEqual('hello world');
    expect(t('onePlaceholder', 'jane')).toEqual('hello jane');
    expect(() => t('receiveLessThanExpect')).toThrow(
      'Number of params does not match with number of placeholders in translation. Received 0, expected 1'
    );
    expect(t('multiplePlaceholders', 'jane', 'doe')).toEqual('hello jane doe');
    expect(t('dotNotationPlaceholder', 'jane', 'doe')).toEqual('hello jane doe');
    expect(() => t('receiveMoreThanExpect', 'jane')).toThrow(
      'Number of params does not match with number of placeholders in translation. Received 1, expected 0'
    );
    expect(() => t('invalidKey')).toThrow("Could not find translation for 'invalidKey'");
  });
});
