import fs from 'fs';
import path from 'path';

function fixVcConfigs(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixVcConfigs(fullPath);
    } else if (entry.name === '.vc-config.json') {
      try {
        const raw = fs.readFileSync(fullPath, 'utf8');
        const json = JSON.parse(raw);
        console.log(`[postbuild] Enforcing active Node.js 22.x LTS runtime in ${fullPath} (was: ${json.runtime})`);
        json.runtime = 'nodejs22.x';
        fs.writeFileSync(fullPath, JSON.stringify(json, null, '\t'), 'utf8');
      } catch (e) {
        console.error(`[postbuild] Failed to process ${fullPath}:`, e.message);
      }
    }
  }
}

fixVcConfigs(path.resolve('.vercel/output/functions'));
console.log('✓ Vercel Serverless Function configurations strictly locked to nodejs22.x.');
