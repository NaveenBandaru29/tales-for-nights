import { RichTextReadOnly } from 'mui-tiptap'
import React from 'react'
import useExtensions from './useExtensions'

const EditorTextReadOnly = ({ content }: { content: string }) => {
    const extensions = useExtensions()
    return (
        <>
            <RichTextReadOnly immediatelyRender={false} extensions={extensions} content={content} />
        </>
    )
}

export default EditorTextReadOnly