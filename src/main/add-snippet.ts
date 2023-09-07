import * as os from 'os';
import { openVim } from './utils/utils';

export const addSnippet = (snippetFileName: string) => { 
  const snippetsStoragePath = `${os.homedir()}/.code-snippets`;
  const snippetFilePath = `${snippetsStoragePath}/${snippetFileName}`;
  openVim(snippetFilePath); 
}
