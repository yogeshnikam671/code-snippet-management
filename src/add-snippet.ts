import * as child_process from 'child_process';
import * as os from 'os';

export const addSnippet = (snippetFileName: string) => { 
  const snippetsStoragePath = `${os.homedir()}/.code-snippets`;
  const snippetFilePath = `${snippetsStoragePath}/${snippetFileName}`;

  child_process.spawnSync('vim', [snippetFilePath], { stdio: "inherit" });
}
