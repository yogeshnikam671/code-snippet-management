import * as child_process from 'child_process';
import { openVim, snippetPath, term } from '../../main/utils/utils';

jest.mock('child_process', () => {
  return {
    spawnSync: jest.fn(),
  };
});

jest.mock('os', () => {
  return {
    homedir: jest.fn().mockReturnValue('homedir'),
  };
});

describe('utils tests', () => {
 
  it('should open vim using spawnSync', async () => {
    await openVim("path");
    expect(child_process.spawnSync).toHaveBeenCalledWith(
      "vim", ["path"], {"stdio": "inherit"}
    );
  });

  it('should return the snippetPath', () => {
    expect(snippetPath).toEqual('homedir/.code-snippets');
  });

  it('should return the term object', () => {
    expect(term).toBeDefined();
  });
});
