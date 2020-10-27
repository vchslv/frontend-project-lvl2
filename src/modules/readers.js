import fs from 'fs';
import path from 'path';

const allowedExt = ['.json', '.yml'];

const isUnknownExt = (ext) => !allowedExt.includes(ext);

const getContentOfFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const readFile = (filePath) => {
  const content = getContentOfFile(filePath);
  const ext = path.extname(filePath);
  if (isUnknownExt(ext)) {
    throw new Error(`Unknown file extensions ${filePath}`);
  }
  return { content, ext };
};

export default readFile;
