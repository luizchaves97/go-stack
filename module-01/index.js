const express = require("express");

const server = express();
server.use(express.json());

let requestCount = 0;
const projects = [];

server.use((req, res, next) => {
  requestCount += 1;
  console.log(`[LOG] Número de requisições na API: ${requestCount}`);

  return next();
})

function checkUserExist(req, res, next) {
  const { id } = req.params;
  if(!projects.find(p => p.id === id)) {
    return res.status(400).json({ message: 'User was not exist'});
  }

  return next();
}

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkUserExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkUserExist, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id);
  projects.splice(projectIndex, 1);

  return res.json(projects);
});

server.post("/projects/:id/task", checkUserExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  project.tasks.push(title);

  return res.json(projects);
});

server.listen("3000");
