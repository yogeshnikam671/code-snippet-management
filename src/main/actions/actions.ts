import * as fs from 'fs';
import clipboard from 'clipboardy';
import { openVim, snippetPath, term } from '../utils/utils';

export const displaySnippet = (snippetName: string) => {
  const content = fs.readFileSync(`${snippetPath}/${snippetName}`, 'utf-8');

  term.green(`\n----   ${snippetName}  ----\n\n`);
  term.white(content);
  term.green("\n\n----   End of snippet  ----\n\n");
  process.exit();
}

export const editSnippet = (snippetName: string) => {
  openVim(`${snippetPath}/${snippetName}`);
  term.green(`\n\nSnippet [${snippetName}] edited successfully!\n\n`);
  process.exit();
}

export const copySnippet = (snippetName: string) => {
  const content = fs.readFileSync(`${snippetPath}/${snippetName}`, 'utf-8');
  clipboard.writeSync(content);
  term.green(`\n\nSnippet [${snippetName}] copied to clipboard!\n\n`);
  process.exit();
};

export const deleteSnippet = (snippetName: string) => {
  fs.unlinkSync(`${snippetPath}/${snippetName}`);
  term.green(`\n\nSnippet [${snippetName}] deleted successfully!\n\n`);
  process.exit();
}
