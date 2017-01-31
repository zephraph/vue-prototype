const templateRegex = /<template\s*(\s+lang\=\"([a-z]+)\")?>([\s\S]*)<\/template>/gm;
const scriptRegex = /<script\s*(\s+lang\=\"([a-z]+)\")?>([\s\S]*)<\/script>/gm;

const babelJest = require('babel-jest');

const normalizeWhitespace = template => {
  let lines = template.split('\n');
  let indent = -1;
  let index = 0;

  while(indent === -1)
    indent = lines[index++].search(/\S/);

  return lines
    .map(line => line.slice(indent ))
    .join('\n');
};

const compileTemplate = src => {
  templateRegex.lastIndex = 0;

  let [,, lang, template] = templateRegex.exec(src);

  if (lang === 'pug') {
    template = normalizeWhitespace(template);
    template = require('pug').render(template);
  }

  return `exports.default['template']=\`${template}\``;
}

const compileScript = src => {
  scriptRegex.lastIndex = 0;
  let results = scriptRegex.exec(src);
  if (results === null)
    return 'export default {}';
  else
    return results[3];
}

const process = (src, filepath, config, transformOptions) => {

  return `${
    babelJest.process(
      compileScript(src),
      filepath + '.js',
      config,
      transformOptions
    )
  };
  ${compileTemplate(src)};
  `;
}

module.exports = {
  templateRegex,
  scriptRegex,
  compileTemplate,
  compileScript,
  normalizeWhitespace,
  process
}
