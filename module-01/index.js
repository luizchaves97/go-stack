const express = require("express");

const server = express();
server.use(express.json());

const projects = [];

server.post("/projects", (req, res) => {
  projects.push(req.body);

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id);
  projects.splice(projectIndex, 1);

  return res.json(projects);
});

server.post("/projects/:id/task", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  project.tasks.push(title);

  return res.json(projects);
});

server.listen("3000");
