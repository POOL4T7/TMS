// import { useCallback, useState } from 'react';
// import {
//   EditorState,
//   RichUtils,
//   convertFromHTML,
//   ContentState,
// } from 'draft-js';
// import { stateToHTML } from 'draft-js-export-html';

// const useEditor = (initialContent = '') => {
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );

//   useState(() => {
//     if (initialContent) {
//       const blocksFromHTML = convertFromHTML(initialContent);
//       const state = ContentState.createFromBlockArray(
//         blocksFromHTML.contentBlocks,
//         blocksFromHTML.entityMap
//       );
//       setEditorState(EditorState.createWithContent(state));
//     }
//   });

//   const onChange = useCallback((newEditorState) => {
//     setEditorState(newEditorState);
//   }, []);

//   const getEditorValue = useCallback(() => {
//     return stateToHTML(editorState.getCurrentContent());
//   }, [editorState]);

//   const toggleInlineStyle = useCallback(
//     (inlineStyle: string) => () => {
//       setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
//     },
//     [editorState]
//   );

//   const toggleBlockType = useCallback(
//     (blockType: string) => () => {
//       setEditorState(RichUtils.toggleBlockType(editorState, blockType));
//     },
//     [editorState]
//   );

//   const handleKeyCommand = useCallback(
//     (command: string, editorState: EditorState) => {
//       const newState = RichUtils.handleKeyCommand(editorState, command);
//       if (newState) {
//         setEditorState(newState);
//         return 'handled';
//       }
//       return 'not-handled';
//     },
//     []
//   );

//   const setEditorValue = (htmlContent: string) => {
//     const blocksFromHTML = convertFromHTML(htmlContent);
//     const state = ContentState.createFromBlockArray(
//       blocksFromHTML.contentBlocks,
//       blocksFromHTML.entityMap
//     );
//     setEditorState(EditorState.createWithContent(state));
//   };

//   const isStyleActive = (style: string) => {
//     const currentStyle = editorState.getCurrentInlineStyle();
//     return currentStyle.has(style);
//   };

//   const isBlockTypeActive = (blockType: string) => {
//     const selection = editorState.getSelection();
//     const blockKey = selection.getStartKey();
//     const block = editorState.getCurrentContent().getBlockForKey(blockKey);
//     return block.getType() === blockType;
//   };

//   return {
//     editorState,
//     onChange,
//     getEditorValue,
//     toggleInlineStyle,
//     toggleBlockType,
//     handleKeyCommand,
//     setEditorValue,
//     isStyleActive,
//     isBlockTypeActive,
//   };
// };

// export default useEditorWithState;
