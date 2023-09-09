import * as fs from 'fs';
import termkit from 'terminal-kit';
import { displaySnippet, editSnippet, copySnippet, deleteSnippet } from '../../main/actions/actions';
import { openVim, snippetPath } from '../../main/utils/utils';
import clipboard from 'clipboardy';

jest.mock('fs', () => {
  return {
    readFileSync: jest.fn(),
    writeFileSync: jest.fn(),
    unlinkSync: jest.fn()
  };
});

jest.mock('../../main/utils/utils', () => {
  return {
    ...jest.requireActual('../../main/utils/utils'),
    openVim: jest.fn()
  }
});

const term = termkit.terminal;

describe('actions test', () => {
  
  const realProcess = process;
  const processExit = jest.fn();
  beforeAll(() => {
    // @ts-ignore
    global.process = { ...realProcess, exit: processExit };
  });

  afterAll(() => {
    global.process = realProcess;
  });

  it('should display the snippet content', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('snippet_content');

    displaySnippet(term, 'snippet_name');

    expect(fs.readFileSync).toBeCalledWith(
      `${snippetPath}/snippet_name`,
      "utf-8"
    );
    expect(term.green).toHaveBeenNthCalledWith(1, expect.stringContaining('snippet_name'));
    expect(term.white).toBeCalledWith('snippet_content');
    expect(term.green).toBeCalledWith(expect.stringContaining('End of snippet'));
    expect(processExit).toHaveBeenCalled();
  });

  it('should edit of the snippet', () => {
    editSnippet(term, 'snippet_name');

    expect(openVim).toBeCalledWith(`${snippetPath}/snippet_name`);
    expect(term.green).toHaveBeenCalledWith(expect.stringContaining(
      'Snippet [snippet_name] edited successfully'
    ));
    expect(processExit).toHaveBeenCalled();
  });

  it('should copy the snippet', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('snippet_content');
    copySnippet(term, 'snippet_name');

    expect(clipboard.writeSync).toHaveBeenCalledWith('snippet_content');expect(term.green).toHaveBeenCalledWith(expect.stringContaining(
      'Snippet [snippet_name] copied to clipboard!'
    ));
    expect(processExit).toHaveBeenCalled(); 
  });
  
  it('should delete the snippet', () => {
    jest.spyOn(fs, 'unlinkSync').mockReturnValue();
    deleteSnippet(term, 'snippet_name');

    expect(fs.unlinkSync).toHaveBeenCalledWith(`${snippetPath}/snippet_name`);
    expect(term.green).toHaveBeenCalledWith(expect.stringContaining(
      'Snippet [snippet_name] deleted successfully!'
    ));
    expect(processExit).toHaveBeenCalled();
  });
});
