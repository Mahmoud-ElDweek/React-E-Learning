const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');
const path = require('path');
const port = 3001;

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'data', 'db.json'));

app.db = router.db;

const rules = auth.rewriter({
  users: 600,
  posts: 664
});

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);

app.listen(port, () => {
  console.log(`
    Server is running on port:
    BaseURL>>  http://localhost:${port}
    End Points Is:
    engCourses >> http://localhost:${port}/courses
    arCourses >> http://localhost:${port}/arCourses
    Users >> http://localhost:${port}/users
    `);
});