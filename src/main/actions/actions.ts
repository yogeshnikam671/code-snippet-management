import { Terminal } from 'terminal-kit';
import * as fs from 'fs';
import clipboard from 'clipboardy';
import { openVim, snippetPath } from '../utils/utils';

export const displaySnippet = (term: Terminal, snippetName: string) => {
  const content = fs.readFileSync(`${snippetPath}/${snippetName}`, 'utf-8');

  term.green(`\n----   ${snippetName}  ----\n\n`);
  term.white(content);
  term.green("\n\n----   End of snippet  ----\n\n");
  process.exit();
}

export const editSnippet = (term: Terminal, snippetName: string) => {
  openVim(`${snippetPath}/${snippetName}`);
  term.green(`\n\nSnippet [${snippetName}] edited successfully!\n\n`);
  process.exit();
}

export const copySnippet = (term: Terminal, snippetName: string) => {
  const content = fs.readFileSync(`${snippetPath}/${snippetName}`, 'utf-8');
  clipboard.writeSync(content);
  term.green(`\n\nSnippet [${snippetName}] copied to clipboard!\n\n`);
  process.exit();
};

export const deleteSnippet = (term: Terminal, snippetName: string) => {
  fs.unlinkSync(`${snippetPath}/${snippetName}`);
  term.green(`\n\nSnippet [${snippetName}] deleted successfully!\n\n`);
  process.exit();
}
