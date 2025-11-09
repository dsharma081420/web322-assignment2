const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        projects = [];
        
        for (let i = 0; i < projectData.length; i++) {
            let project = projectData[i];
            let newProject = {};
            
            newProject.id = project.id;
            newProject.sector_id = project.sector_id;
            newProject.title = project.title;
            newProject.feature_img_url = project.feature_img_url;
            newProject.summary_short = project.summary_short;
            newProject.intro_short = project.intro_short;
            newProject.impact = project.impact;
            newProject.original_source_url = project.original_source_url;
            
            for (let j = 0; j < sectorData.length; j++) {
                if (sectorData[j].id === project.sector_id) {
                    newProject.sector = sectorData[j].sector_name;
                    break;
                }
            }
            
            projects.push(newProject);
        }
        
        resolve();
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        resolve(projects);
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        let found = null;
        
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id == projectId) {
                found = projects[i];
                break;
            }
        }
        
        if (found) {
            resolve(found);
        } else {
            reject("unable to find requested project");
        }
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        let result = [];
        let searchSector = sector.toLowerCase();
        
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].sector) {
                let projectSector = projects[i].sector.toLowerCase();
                if (projectSector.includes(searchSector)) {
                    result.push(projects[i]);
                }
            }
        }
        
        if (result.length > 0) {
            resolve(result);
        } else {
            reject("unable to find requested projects");
        }
    });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };