import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the 'assets', 'style', and 'js' directories
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Serve 'index.html' as the default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle requests for other HTML files
app.get('/:htmlFile', (req, res) => {
  const { htmlFile } = req.params;
  res.sendFile(path.join(__dirname, `${htmlFile}`));
});

// Handle requests for JS files
app.get('/js/:jsFile', (req, res) => {
  const { jsFile } = req.params;
  res.sendFile(path.join(__dirname, 'js', `${jsFile}.js`));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
