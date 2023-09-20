import * as child_process from 'child_process';
import * as os from 'os';
import termkit from 'terminal-kit';

export const term = termkit.terminal;

export const snippetPath = `${os.homedir()}/.code-snippets`;

export const openVim = async (filePath: string) => {
  child_process.spawnSync('vim', [filePath], { stdio: "inherit" });
}
