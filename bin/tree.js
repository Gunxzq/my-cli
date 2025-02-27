import fs from 'fs-extra';

import path from 'path';
const generateMarkdown = async (dirPath, prefix = '==') => {
  let md = '';

  const files = await fs.readdir(dirPath, { withFileTypes: true });

  for (let file of files) {
    if (file.isDirectory()) {
      md += `${prefix}-[${file.name}](./${file.name})\n`;
      md += await generateMarkdown(path.join(dirPath, file.name), `${prefix}+`);
    } else {
      md += `${prefix}-[${file.name}](./${file.name})\n`;
    }
  }

  return md;
};

export default generateMarkdown;
