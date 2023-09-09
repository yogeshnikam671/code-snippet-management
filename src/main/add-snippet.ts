import { openVim, snippetPath } from './utils/utils';

export const addSnippet = (snippetFileName: string) => { 
  openVim(`${snippetPath}/${snippetFileName}`); 
}
