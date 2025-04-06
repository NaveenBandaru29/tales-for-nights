"use client"
import { Box, Typography } from "@mui/material";
import {
    LinkBubbleMenu,
    RichTextEditor,
    type RichTextEditorRef,
    RichTextReadOnly,
    TableBubbleMenu
} from "mui-tiptap";
import { useRef } from "react";
import useExtensions from "./useExtensions";
import EditorMenuControls from "./EditorMenuControls";


interface CustomEditorProps {
    placeholder?: string
    showPreview?: boolean
    content: string
    setContent: (value: string) => void
}

const CustomEditor = ({ placeholder, showPreview = false, content = "", setContent }: CustomEditorProps) => {
    const rteRef = useRef<RichTextEditorRef>(null);
    const extensions = useExtensions({ placeholder })

    return (
        <div className="prose max-w-none prose-blockquote:border-none">
            <RichTextEditor
                content={content}
                ref={rteRef}
                onUpdate={() => setContent(rteRef.current?.editor?.getHTML() as string)}
                extensions={extensions} // Or any Tiptap extensions you wish!
                immediatelyRender={false} // Disable SSR rendering
                renderControls={() => (<EditorMenuControls />)}
            >
                {() => (
                    <>
                        <LinkBubbleMenu />
                        <TableBubbleMenu />
                    </>
                )}
            </RichTextEditor>
            {
                showPreview &&
                <Box mt={3}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Preview:
                    </Typography>

                    <RichTextReadOnly
                        content={content}
                        extensions={extensions}
                        immediatelyRender={false}
                    />
                </Box>
            }
        </div>
    );
}

export default CustomEditor;