import { useEffect } from 'react';
import {Editor, EditorState, DraftHandleValue, getDefaultKeyBinding} from 'draft-js';
import { setSelectToEnd } from '../generic/editorutilities';

type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;
type textEditorProps = {
   editorState: EditorState, 
   stripPastedStyles?: boolean,
   setEditorState: (editorState: EditorState) => void,
   customKeyBindings: (e: SyntheticKeyboardEvent) => string,
   handleKeyCommand: (command: string) => DraftHandleValue
}

export default function TextEditor({
   editorState, 
   stripPastedStyles = true,
   setEditorState,
   customKeyBindings,
   handleKeyCommand
}: textEditorProps) {
   const keyBindings = (e: SyntheticKeyboardEvent) => {
      const keyCommand = customKeyBindings(e);
      if (keyCommand) {
         return keyCommand;
      }
      return getDefaultKeyBinding(e);
   }

   useEffect(() => {
      setSelectToEnd(editorState, setEditorState);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <Editor  
         editorState={editorState} 
         onChange={(newEditorState: EditorState) => {
            setEditorState(newEditorState);
         }}
         stripPastedStyles={stripPastedStyles}
         handleKeyCommand={handleKeyCommand}
         keyBindingFn={keyBindings}
      />
   );
}