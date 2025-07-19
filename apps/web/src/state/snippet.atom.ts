import { atom } from "jotai";
import { SnippetDTO } from "../server/data/snippet/snippet.mapper";

interface SnippetDialogState {
  isOpen: boolean;
  snippet: SnippetDTO | null;
}

export const snippetDialogAtom = atom<SnippetDialogState>({
  isOpen: false,
  snippet: null,
});
