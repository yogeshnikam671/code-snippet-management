import * as child_process from 'child_process';

export const openVim = async (filePath: string) => {
  child_process.spawnSync('vim', [filePath], { stdio: "inherit" });
}
