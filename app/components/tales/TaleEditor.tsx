import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { Loader } from '../ui/Loader';
const EditorTextReadOnly = dynamic(() => import('../common/CustomEditor/EditorTextReadOnly'),
    { ssr: false, loading: () => <Loader loadingText='Loading Editor...' /> })

const CustomEditor = dynamic(() => import('../common/CustomEditor'), {
    ssr: false,
    loading: () => <Loader loadingText="Loading Editor..." />,
});

interface TaleEditorProps {
    content: string;
    setContent: (content: string) => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    value: number;
    index: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tab-panel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const TaleEditor = ({ content, setContent }: TaleEditorProps) => {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="editor preview tabs">
                <Tab label="Editor" id="tab-0" aria-controls="tab-panel-0" />
                <Tab label="Preview" id="tab-1" aria-controls="tab-panel-1" />
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
                <CustomEditor content={content} setContent={setContent} placeholder='Tale goes here.....' />
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
                <EditorTextReadOnly content={content} />
            </TabPanel>
        </Box>
    );
};

export default TaleEditor;
