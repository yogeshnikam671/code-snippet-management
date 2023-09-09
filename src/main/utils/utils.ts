import * as child_process from 'child_process';
import * as os from 'os';

export const openVim = async (filePath: string) => {
  child_process.spawnSync('vim', [filePath], { stdio: "inherit" });
}

export const snippetPath = `${os.homedir()}/.code-snippets`;
