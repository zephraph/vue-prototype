import {
  templateRegex,
  scriptRegex,
  compileTemplate,
  compileScript,
  normalizeWhitespace
} from './jest-vue';

const useLang = lang =>
  lang ? ' lang="' + lang + '"' : '';

const template = lang => `
    <template ${ useLang(lang) }>
      test
    </template>`;

const script = lang => `
  <script ${ useLang(lang) }>
    export default {
      name: 'HelloWorld'
    };
  </script>
`;

const unnormalized = `
   firstLevel
     secondLevel
`;

test('normalizeWhitespace should equalize the tab depth', () => {
  expect(normalizeWhitespace(unnormalized)).toMatchSnapshot();
});

[
  ['template', 'templateRegex', templateRegex, template],
  ['script', 'scriptRegex', scriptRegex, script]
].forEach(([type, regexName, regex, template]) => {

  describe(`${regexName}`, () => {

    afterEach(() => {
      regex.lastIndex = 0;
    });

    test(`should match ${type} string`, () => {
      expect(template()).toMatch(regex);
    });

    test(`should match ${type} with specified lang`, () => {
      expect(template('pug')).toMatch(regex);
    });

    test(`snapshot should match ${type} body`, () => {
      expect(regex.exec(template())[3]).toMatchSnapshot();
    });

    test('should give language match', () => {
      expect(regex.exec(template('pug'))[2]).toBe('pug');
    });

  });

});

[
  ['compileTemplate', compileTemplate, template, ['pug']],
  ['compileScript', compileScript, script, []]
].forEach(([name, func, template, langs]) => {

  describe(name, () => {

    test('should match snapshot', () => {
      expect(func(template())).toMatchSnapshot();
    });

    langs.forEach(lang => {
      test(`should match ${lang} snapshot`, () => {
        expect(func(template(lang))).toMatchSnapshot();
      });
    })

  });

});
