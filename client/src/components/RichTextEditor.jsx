import React, { useState } from 'react'
import { 
    EditorProvider,
    BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Editor,
    Toolbar
  } from 'react-simple-wysiwyg';

export default function RichTextEditor() {
    const [value, setValue] = useState();
  return (
    <EditorProvider>
        <Editor value={value} onChange={() => {
            setValue(e.target.value)
        }}>
            <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <HtmlButton />
          <Separator />
          <BtnStyles />
        </Toolbar>
        </Editor>
    </EditorProvider>
  )
}
