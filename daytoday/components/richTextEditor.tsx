import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = () => {
    const [content, setContent] = useState('');
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean'],
        ],
        };
        const quillFormats = [
            'header',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'link',
            'image',
            'align',
            'color',
            'code-block',
          ];
    const handleEditorChange = (newContent: any) => {
        setContent(newContent);
        console.log(newContent);
    };
    return (
        <div>
            <QuillEditor
                value={content}
                onChange={handleEditorChange}
                modules={quillModules} 
                formats={quillFormats}
                className="w-full h-[70%] mt-10 bg-eerie-black"
             />
        </div>
    );
}
export default RichTextEditor

