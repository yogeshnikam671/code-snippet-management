import { Terminal } from 'terminal-kit';
import * as fs from 'fs';
import * as os from 'os';

const snippetPath = `${os.homedir()}/.code-snippets`;

export const listSnippets = (term: Terminal) => {
  const files = fs.readdirSync(snippetPath);
  if(!files.length) { 
    handleNoSnippetsError(term);
    return;
  }

  term.white("The available snippets are: \n");
  term.singleColumnMenu(files, (error, response) => {
    if (error) {
      term.red("Error occurred while listing the snippets: " + error);
      return;
    }
    if (response.selectedText) {
      displaySnippet(term, response.selectedText);
    }
    process.exit();
  });
};

const handleNoSnippetsError = (term: Terminal) => {
  term.red("No snippets found\n"); 
  term.green("Use -A/--add option to add a new snippet\n");
  return;
}

const displaySnippet = (term: Terminal, snippetName: string) => {
  const content = fs.readFileSync(`${snippetPath}/${snippetName}`, 'utf-8');
  
  term.green(`\n----   ${snippetName}  ----\n\n`);
  term.white(content);
  term.green("\n\n----   End of snippet  ----\n\n");
  process.exit();
}
