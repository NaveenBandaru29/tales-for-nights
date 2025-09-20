import { RichTextReadOnly } from 'mui-tiptap'
import React from 'react'
import useExtensions from './useExtensions'

const EditorTextReadOnly = ({ content }: { content: string }) => {
    const extensions = useExtensions()
    return (
        <div className="prose dark:prose-invert max-w-none">
            <RichTextReadOnly immediatelyRender={false} extensions={extensions} content={content} />
        </div>
    )
}

export default EditorTextReadOnly