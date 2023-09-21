import * as fs from 'fs';
import { copySnippet, deleteSnippet, displaySnippet, editSnippet } from './actions/actions';
import { snippetPath, term } from './utils/utils';
import { promptMessages } from './constants/prompt-messages';

type SearchSnippetsAction = 'copy' | 'delete' | 'edit' | 'view' | undefined;


export const searchSnippets = (action : SearchSnippetsAction = undefined) => {
  let files = fs.readdirSync(snippetPath);
  if (!files.length) {
    handleNoSnippetsError();
    process.exit();
}

  term.white(promptMessages.pressTabToViewFullList);
  term.white(promptMessages.searchForSnippet);
  term.inputField({ autoComplete: files, autoCompleteMenu: true }, (error, input) => {
    if (error) {
      term.red(promptMessages.errorWhileListingSnippets + error);
      process.exit();
    }
    const validFile = files.includes(input || "");
    if (!validFile) {
      term.red(promptMessages.noSuchSnippetExists);
      process.exit();
    }
    const snippetName = input || "";
    
    switch(action) {
      case 'view': displaySnippet(snippetName); break;
      case 'edit': editSnippet(snippetName); break;
      case 'copy': copySnippet(snippetName); break;
      case 'delete': deleteSnippet(snippetName); break;
      default: displayActionsForSelectedFile(snippetName);
    }
  });
};

const handleNoSnippetsError = () => {
  term.red(promptMessages.noSnippetsFound);
  term.green(promptMessages.useAddOption);
  process.exit();
}

const displayActionsForSelectedFile = (snippetName: string) => {
  const actions = [
    "1. View snippet",
    "2. Edit snippet",
    "3. Copy snippet",
    "4. Delete snippet"
  ];

  term.singleColumnMenu(actions, (error, response) => {
    if (error) {
      term.red("Error occurred while listing the snippets: " + error);
      process.exit();
      return; // to avoid test failure
}
    switch(response.selectedIndex) {
      case 0:
        displaySnippet(snippetName);
        break;
      case 1:
        editSnippet(snippetName);
        break;
      case 2:
        copySnippet(snippetName);
        break;
      case 3:
        deleteSnippet(snippetName);
        break;
    }
  });
};

