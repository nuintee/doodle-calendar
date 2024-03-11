import fs from 'fs';
import path from 'path';

const docsReadMe = path.resolve('docs/README.md');
const rootReadMe = path.resolve('README.md');

const rootReadMeData = fs.readFileSync(rootReadMe);

fs.writeFileSync(docsReadMe, rootReadMeData);
