import { PluginTransformer } from '../src/declarations';
import { inlineFile } from '../src';

describe('Inline File Stencil Plugin', () => {
  let transformer: PluginTransformer;
  beforeEach(() => {
    transformer = inlineFile(/\.(woff|woff2|png)/i);
  });

  it('should create a transformer object', () => {
    expect(transformer).toBeDefined();
    expect(transformer.name).toBe('inlineFile');
  });

  it('should ignore file that is not in regex', async () => {
    const response = await transformer.transform('Content', 'file.svg');

    expect(response).toBeNull();
  });

  it('should return an error for an empty file', async () => {
    let error;
    try {
      await transformer.transform('', 'file.woff');
    } catch (err) {
      error = err;
    }

    expect(error.message).toBe('/** inlineFile error: the file is empty **/');
  });
});
