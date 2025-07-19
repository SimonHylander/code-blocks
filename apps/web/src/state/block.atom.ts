import { atom } from "jotai";
import { BlockDTO } from "../server/data/block/block.mapper";

interface BlockDialogState {
  isOpen: boolean;
  block: BlockDTO | null;
}

export const blockDialogAtom = atom<BlockDialogState>({
  isOpen: false,
  block: null,
});
