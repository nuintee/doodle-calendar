import fs from 'fs';

const PUBLIC_DOCS_PATH = 'docs/public';

if (!fs.existsSync(PUBLIC_DOCS_PATH)) {
  fs.mkdirSync(PUBLIC_DOCS_PATH);
}

fs.cpSync('public', PUBLIC_DOCS_PATH, { recursive: true });
