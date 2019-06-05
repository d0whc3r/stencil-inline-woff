import * as fs from 'fs';
import * as mime from 'mime';

export function getBase64(fileName: string) {
  const mimetype = mime.getType(fileName);
  const base64 = fs.readFileSync(fileName, { encoding: 'base64' });
  return `const content = 'data:${mimetype};charset=utf-8;base64,${base64}'; export default content;`;
}
