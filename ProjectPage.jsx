// ProjectPage.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const ProjectPage = ({ projectName }) => {
    return (
        <div className="project-page">
            <h1>{projectName}</h1>
            <nav className="project-nav">
                <NavLink to="documents" activeClassName="active">Documents</NavLink>
                <NavLink to="dashboards" activeClassName="active">Dashboards</NavLink>
                <NavLink to="aerial-imagery" activeClassName="active">Aerial Imagery</NavLink>
            </nav>
            <div className="project-content">
                <Outlet />
            </div>
        </div>
    );
};

export default ProjectPage;
