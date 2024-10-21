// Documents.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Documents = ({ projectId }) => {
    const [documents, setDocuments] = useState([]);
    const [spreadName, setSpreadName] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        const response = await axios.get(`/api/projects/${projectId}/documents`);
        setDocuments(response.data);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('spreadName', spreadName);
        formData.append('file', file);
        await axios.post(`/api/projects/${projectId}/documents`, formData);
        fetchDocuments();
    };

    return (
        <div className="documents-tab">
            <h2>Documents</h2>
            <form onSubmit={handleUpload}>
                <input 
                    type="text" 
                    placeholder="Spread Name" 
                    value={spreadName}
                    onChange={(e) => setSpreadName(e.target.value)}
                    required 
                />
                <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])}
                    required 
                />
                <button type="submit">Upload</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Spread Name</th>
                        <th>File</th>
                        <th>Uploaded By</th>
                        <th>Uploaded At</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map(doc => (
                        <tr key={doc.id}>
                            <td>{doc.spread_name}</td>
                            <td><a href={doc.file_url} download>Download</a></td>
                            <td>{doc.uploaded_by}</td>
                            <td>{new Date(doc.uploaded_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Documents;
