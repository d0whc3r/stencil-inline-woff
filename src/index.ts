import { PluginTransformResults, PluginTransformer } from './declarations';
import { getBase64 } from './util';

export function inlineFile(regex?: RegExp): PluginTransformer {
  return {
    name: 'inlineFile',
    transform(
        sourceText: string,
        fileName: string,
    ): Promise<PluginTransformResults> {
      if (!regex) {
        throw new Error('/** inlineFile error: files to check are empty **/');
      }

      if (!regex.test(fileName)) {
        return null;
      }

      if (sourceText === '') {
        throw new Error('/** inlineFile error: the file is empty **/');
      }

      return new Promise<PluginTransformResults>((resolve) => {
        resolve({
          id: fileName,
          code: getBase64(fileName),
        });
      });
    },
  };
}
