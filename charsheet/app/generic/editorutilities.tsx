import { EditorState } from 'draft-js';

export const setSelectToEnd = (
   editorState: EditorState, 
   setEditorState: (newEditorState: EditorState) => void
) => {
   const content = editorState.getCurrentContent();
   const selection = editorState.getSelection();
   const endOffset = content.getPlainText('').length;

   const newSelection = selection.merge({
      anchorOffset: endOffset,
      focusOffset: endOffset,
   });
   
   const newEditorState = EditorState.forceSelection(editorState, newSelection);
   setEditorState(newEditorState);
};
