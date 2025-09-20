"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { Box, createTheme, Tab, Tabs, ThemeProvider, Typography } from "@mui/material";
import {
    LinkBubbleMenu,
    RichTextEditor,
    type RichTextEditorRef,
    TableBubbleMenu
} from "mui-tiptap";

// Custom extension setup for TipTap editor
import useExtensions from "./useExtensions";
import EditorMenuControls from "./EditorMenuControls";
import dynamic from "next/dynamic";
import { Loader } from "../../ui/Loader";
import { useTheme } from "@/app/context/ThemeContext";
// import EditorTextReadOnly from "./EditorTextReadOnly";
const EditorTextReadOnly = dynamic(() => import("./EditorTextReadOnly"), { ssr: false, loading: () => <Loader loadingText="Loading..." /> })

//
// ---------- TabPanel Component ----------
// Displays tab content when the selected tab matches the index
// Memoized to avoid unnecessary re-renders.
//
interface TabPanelProps {
    children?: React.ReactNode;
    value: number;
    index: number;
}

const TabPanel = React.memo(({ children, value, index }: TabPanelProps) => {
    if (value !== index) return null; // Do not render if not active tab
    return (
        <Box sx={{ p: 2 }}>
            <Typography component="div">{children}</Typography>
        </Box>
    );
});
TabPanel.displayName = "TabPanel";

//
// ---------- TextEditor Component ----------
// Main TipTap rich text editor with menus and toolbar
//
interface TextEditorProps {
    placeholder?: string;
    content: string;
    setContent: (text: string) => void;
}

const TextEditor = React.memo(({ placeholder, content, setContent }: TextEditorProps) => {
    const rteRef = useRef<RichTextEditorRef>(null); // Ref to access TipTap editor instance
    const extensions = useExtensions({ placeholder }); // Load extensions (bold, italic, links, etc.)

    // Memoized update handler to avoid creating new function on each render
    const handleUpdate = useCallback(() => {
        const html = rteRef.current?.editor?.getHTML();
        if (html !== undefined) {
            setContent(html); // Update external state with current editor content
        }
    }, [setContent]);
    console.log(content, "76........");

    return (
        <div className="prose dark:prose-invert max-w-none">
            <RichTextEditor
                ref={rteRef}
                content={content}
                extensions={extensions}
                immediatelyRender={false} // Disable SSR rendering
                onUpdate={handleUpdate}
                renderControls={() => <EditorMenuControls />} // Editor toolbar

            >
                {() => (
                    <>
                        <LinkBubbleMenu />   {/* Floating menu for links */}
                        <TableBubbleMenu />  {/* Floating menu for tables */}
                    </>
                )}
            </RichTextEditor>
        </div>
    );
});
TextEditor.displayName = "TextEditor";

//
// ---------- CustomEditor Component ----------
// Wraps the rich text editor with optional preview tab
//
interface CustomEditorProps {
    placeholder?: string;
    showPreview?: boolean;      // If true, show tabbed view (Editor / Preview)
    content: string;
    setContent: (value: string) => void;
}

const CustomEditor = ({
    placeholder,
    showPreview = false,
    content,
    setContent
}: CustomEditorProps) => {
    const [tabIndex, setTabIndex] = useState(0); // Current active tab (0 = Editor, 1 = Preview)
    const { isDarkMode } = useTheme()
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: isDarkMode ? "dark" : "light",
                    secondary: {
                        main: "#42B81A",
                    },
                },
            }),
        [isDarkMode]
    );


    // Memoized tab change handler
    const handleTabChange = useCallback(
        (_: React.SyntheticEvent, newValue: number) => {
            setTabIndex(newValue);
        },
        []
    );

    // If preview is disabled, render only the editor
    if (!showPreview) {
        return (
            <div className="prose dark:prose-invert max-w-none">
                <TextEditor placeholder={placeholder} content={content} setContent={setContent} />
            </div>
        );
    }

    // Tabbed view: Editor | Preview
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: "100%" }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Editor tabs">
                    <Tab label="Editor" id="tab-0" aria-controls="tab-panel-0" />
                    <Tab label="Preview" id="tab-1" aria-controls="tab-panel-1" />
                </Tabs>

                <TabPanel value={tabIndex} index={0}>
                    <TextEditor placeholder={placeholder} content={content} setContent={setContent} />
                </TabPanel>

                <TabPanel value={tabIndex} index={1}>
                    <EditorTextReadOnly content={content} />
                    {/* <EditorTextReadOnly content={content} /> Read-only rendered HTML */}
                </TabPanel>
            </Box>
        </ThemeProvider>
    );
};

// Memoize the full CustomEditor to prevent re-renders unless props change
export default React.memo(CustomEditor);
