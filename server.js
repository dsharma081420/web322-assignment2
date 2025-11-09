/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Dhruv Sharma Student ID: 180876237 Date: November 9, 2025
*
********************************************************************************/

const express = require('express');
const path = require('path');
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/solutions/projects", (req, res) => {
    const sector = req.query.sector;
    
    if (sector) {
        projectData.getProjectsBySector(sector)
            .then(projects => {
                if (projects.length === 0) {
                    res.status(404).render("404", {
                        message: `No projects found for sector: ${sector}`
                    });
                } else {
                    res.render("projects", { projects: projects });
                }
            })
            .catch(err => {
                res.status(404).render("404", {
                    message: `No projects found for sector: ${sector}`
                });
            });
    } else {
        projectData.getAllProjects()
            .then(projects => {
                res.render("projects", { projects: projects });
            })
            .catch(err => {
                res.status(404).render("404", {
                    message: "Unable to load projects"
                });
            });
    }
});

app.get("/solutions/projects/:id", (req, res) => {
    const projectId = req.params.id;
    
    projectData.getProjectById(projectId)
        .then(project => {
            res.render("project", { project: project });
        })
        .catch(err => {
            res.status(404).render("404", {
                message: `No project found with ID: ${projectId}`
            });
        });
});

app.use((req, res) => {
    res.status(404).render("404", {
        message: "I'm sorry, we're unable to find what you're looking for"
    });
});

projectData.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server running on port " + PORT);
        });
    })
    .catch(err => {
        console.log("Error: " + err);
    });

module.exports = app;