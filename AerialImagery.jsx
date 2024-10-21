// AerialImagery.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AerialImagery = ({ projectId }) => {
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const response = await axios.get(`/api/projects/${projectId}/aerial-imagery`);
        setImages(response.data);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        await axios.post(`/api/projects/${projectId}/aerial-imagery`, formData);
        fetchImages();
    };

    return (
        <div className="aerial-imagery-tab">
            <h2>Aerial Imagery</h2>
            <form onSubmit={handleUpload}>
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    required 
                />
                <button type="submit">Upload</button>
            </form>
            <div className="image-gallery">
                {images.map(img => (
                    <div key={img.id} className="image-item">
                        <img src={img.file_url} alt={`Aerial ${img.id}`} />
                        <a href={img.file_url} download>Download</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AerialImagery;
