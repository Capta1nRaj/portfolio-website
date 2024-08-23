import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import tomorrow from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';

const CustomCode = ({ value }: any) => {
    const { code } = value;
    const { code: codeContent, language } = code;

    return (
        <div style={{ padding: '16px', borderRadius: '8px' }}>
            <SyntaxHighlighter
                language={language}
                style={tomorrow}
            >
                {codeContent}
            </SyntaxHighlighter>
        </div>
    );
};

export default CustomCode;
