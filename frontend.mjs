import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:htmlFile', (req, res) => {
  const { htmlFile } = req.params;
  res.sendFile(path.join(__dirname, `${htmlFile}`));
});

app.get('/js/:jsFile', (req, res) => {
  const { jsFile } = req.params;
  res.sendFile(path.join(__dirname, 'js', `${jsFile}`));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
