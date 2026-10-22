import { readdir, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
for (const dir of ['api', 'lib', 'public', 'scripts', 'tests']) {
  for (const file of await readdir(dir)) if (/\.(js|mjs)$/.test(file)) execFileSync(process.execPath, ['--check', `${dir}/${file}`]);
}
execFileSync(process.execPath, ['--check', 'server.mjs']);
for (const path of ['public/index.html','public/styles.css','public/app.js','docs/requirements.md','docs/SECURITY_SPEC.md','docs/acceptance-tests.md']) {
  if (!(await readFile(path, 'utf8')).trim()) throw new Error(`Empty build input: ${path}`);
}
JSON.parse(await readFile('vercel.json', 'utf8'));
console.log('Build successful: static assets, server JavaScript syntax, specifications, and Vercel configuration checked.');
console.log('No bundler required: native ES modules + Vercel Node function. Deployment has not been verified by this build.');
