// ✅ SECURITY FIX: Simplified code display without vulnerable dependencies
const CustomCode = ({ value }: any) => {
    const { code } = value;
    const { code: codeContent, language } = code;

    // Sanitize code content to prevent XSS
    const sanitizedCode = (codeContent || '').replace(/[<>]/g, '');

    return (
        <div style={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            overflow: 'auto',
            border: '1px solid #333'
        }}>
            <div style={{
                color: '#569cd6',
                marginBottom: '8px',
                fontSize: '12px',
                textTransform: 'uppercase'
            }}>
                {language || 'code'}
            </div>
            <pre style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
            }}>
                {sanitizedCode}
            </pre>
        </div>
    );
};

export default CustomCode;
