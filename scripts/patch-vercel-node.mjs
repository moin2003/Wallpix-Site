import fs from 'fs';
import path from 'path';

const adapterPath = path.resolve('node_modules/@astrojs/vercel/dist/serverless/adapter.js');

if (fs.existsSync(adapterPath)) {
  let content = fs.readFileSync(adapterPath, 'utf8');
  let modified = false;

  // Replace fallback nodejs18.x with nodejs20.x
  if (content.includes("return 'nodejs18.x';")) {
    content = content.replace("return 'nodejs18.x';", "return 'nodejs20.x';");
    modified = true;
  }

  // Also add 22 and 24 to SUPPORTED_NODE_VERSIONS
  if (content.includes("20: { status: 'default' }")) {
    content = content.replace(
      "20: { status: 'default' }",
      "20: { status: 'default' },\n    22: { status: 'default' },\n    24: { status: 'default' }"
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(adapterPath, content, 'utf8');
    console.log('✓ Successfully patched @astrojs/vercel for modern Node.js 20/22/24 runtimes.');
  } else {
    console.log('• @astrojs/vercel adapter already up to date.');
  }
}
