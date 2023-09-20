import { searchSnippets } from "../main/search-snippets";
import * as fs from 'fs';
import { promptMessages } from "../main/constants/prompt-messages";
import { copySnippet, deleteSnippet, displaySnippet, editSnippet } from "../main/actions/actions";
import { term } from "../main/utils/utils";

jest.mock('fs', () => {
  return {
    readdirSync: jest.fn(),
    Dirent: jest.fn().mockReturnValue({})
  }
});

jest.mock('../main/actions/actions', () => {
  return {
    displaySnippet: jest.fn(),
    editSnippet: jest.fn(),
    copySnippet: jest.fn(),
    deleteSnippet: jest.fn()
  }
});

describe('search-snippets tests', () => {
  const dummyFile = new fs.Dirent();
  const realProcess = process;
  
  const mockValidFileInput = () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([dummyFile]);
    // @ts-ignore
    jest.spyOn(term, 'inputField').mockImplementation((_, callback) => {
      callback(null, dummyFile);
    });
  }
  
  beforeAll(() => {
    dummyFile.name = 'example.js';
    // @ts-ignore
    global.process = { ...realProcess, exit: jest.fn() };
  });

  afterAll(() => {
    global.process = realProcess;
  });

  it('should show no snippets found error if there are no snippets found in the snippetPath', async () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([]);
    searchSnippets();
    expect(term.red).toHaveBeenCalledWith(promptMessages.noSnippetsFound);
    expect(term.green).toHaveBeenCalledWith(promptMessages.useAddOption);
  });

  it('should show error if term input field throws an error', async () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([dummyFile]);
    // @ts-ignore
    jest.spyOn(term, 'inputField').mockImplementation((_, callback) => {
      callback('error', '');
    });
    searchSnippets();
    expect(term.red).toHaveBeenCalledWith(promptMessages.errorWhileListingSnippets + 'error');
  });

  it('should show error if the searched file is not valid (does not exist)', () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([dummyFile]);
    // @ts-ignore
    jest.spyOn(term, 'inputField').mockImplementation((_, callback) => {
      callback(null, 'invalid.js');
    });
    searchSnippets();
    expect(term.red).toHaveBeenCalledWith(promptMessages.noSuchSnippetExists);
  });

  describe('displayActionsForSelectedFile tests', () => {
    
    beforeEach(() => {
      mockValidFileInput();
    });

    const mockSelectIndexedOption = (selectedIndex: number) => {
      // @ts-ignore
      jest.spyOn(term, 'singleColumnMenu').mockImplementation((_, callback: any) => {
        callback(null, { selectedIndex });
      });
    }

    it('show show actions if a valid file is searched', () => {
      mockSelectIndexedOption(0);
      searchSnippets();
      expect(term.singleColumnMenu).toHaveBeenCalledWith([
        "1. View snippet",
        "2. Edit snippet",
        "3. Copy snippet",
        "4. Delete snippet"
      ], expect.anything());
    });

    it('should show error if some error occurs while showing actions for a valid file', () => {
      mockValidFileInput();
      // @ts-ignore
      jest.spyOn(term, 'singleColumnMenu').mockImplementation((_, callback: any) => {
        callback('error', null);
      });
      searchSnippets();
      expect(term.red).toHaveBeenCalledWith(promptMessages.errorWhileListingSnippets + 'error');
    });

    it('should display snippet if View snippet option is selected', () => {
      mockSelectIndexedOption(0);
      searchSnippets();
      expect(displaySnippet).toHaveBeenCalledWith({name : dummyFile.name});
    });

    it('should edit snippet if Edit snippet option is selected', () => {
      mockSelectIndexedOption(1);
      searchSnippets();
      expect(editSnippet).toHaveBeenCalledWith({name : dummyFile.name});
    });
    
    it('should copy snippet if Copy snippet option is selected', () => {
      mockSelectIndexedOption(2);
      searchSnippets();
      expect(copySnippet).toHaveBeenCalledWith({name : dummyFile.name});
    });
    
    it('should delete snippet if Delete snippet option is selected', () => {
      mockSelectIndexedOption(3);
      searchSnippets();
      expect(deleteSnippet).toHaveBeenCalledWith({name : dummyFile.name});
    });
  });

  describe('search action tests', () => {
    
    beforeEach(() => {
      jest.resetAllMocks();
      mockValidFileInput();
    });

    it('should copy snippet without showing action menu if copy action is passed as an argument', () => {
      searchSnippets('copy');
      expect(copySnippet).toHaveBeenCalledWith({ name: dummyFile.name });
      expect(term.singleColumnMenu).not.toHaveBeenCalled();
    });

    it('should edit snippet without showing action menu if edit action is passed as an argument', () => {
      searchSnippets('edit');
      expect(editSnippet).toHaveBeenCalledWith({ name: dummyFile.name });
      expect(term.singleColumnMenu).not.toHaveBeenCalled();
    });

    it('should display snippet without showing action menu if display action is passed as an argument', () => {
      searchSnippets('view');
      expect(displaySnippet).toHaveBeenCalledWith({ name: dummyFile.name });
      expect(term.singleColumnMenu).not.toHaveBeenCalled();
    });

    it('should delete snippet without showing action menu if delete action is passed as an argument', () => {
      searchSnippets('delete');
      expect(deleteSnippet).toHaveBeenCalledWith({ name: dummyFile.name });
      expect(term.singleColumnMenu).not.toHaveBeenCalled();
    });
  });

});

