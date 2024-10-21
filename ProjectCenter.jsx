// ProjectCenter.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
    "Caddeaux",
    "Caddeaux SWD",
    "Caddeaux SWD Maintenance",
    "South Texas",
    "South Texas Maintenance",
    "Oklahoma Maintenance"
];

const ProjectCenter = () => {
    return (
        <div className="project-center">
            <h1>Project Center</h1>
            <div className="project-list">
                {projects.map((project) => (
                    <Link to={`/projects/${project}`} key={project} className="project-card">
                        <h2>{project}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProjectCenter;
