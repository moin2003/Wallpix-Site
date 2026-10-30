import fs from 'fs';
import path from 'path';

const adapterPath = path.resolve('node_modules/@astrojs/vercel/dist/serverless/adapter.js');

if (fs.existsSync(adapterPath)) {
  let content = fs.readFileSync(adapterPath, 'utf8');
  let modified = false;

  // Replace any retired/discontinued fallback (18 or 20) with active LTS nodejs22.x
  if (content.includes("return 'nodejs18.x';")) {
    content = content.replace(/return 'nodejs18\.x';/g, "return 'nodejs22.x';");
    modified = true;
  }
  if (content.includes("return 'nodejs20.x';")) {
    content = content.replace(/return 'nodejs20\.x';/g, "return 'nodejs22.x';");
    modified = true;
  }

  // Ensure 20, 22, 24, 26, 28 are in SUPPORTED_NODE_VERSIONS
  if (content.includes("20: { status: 'default' }") && !content.includes("26: { status: 'default' }")) {
    content = content.replace(
      "20: { status: 'default' }",
      "20: { status: 'default' },\n    22: { status: 'default' },\n    24: { status: 'default' },\n    26: { status: 'default' },\n    28: { status: 'default' }"
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(adapterPath, content, 'utf8');
    console.log('✓ Successfully patched @astrojs/vercel for modern Node.js 22/24/26 runtimes.');
  } else {
    console.log('• @astrojs/vercel adapter already up to date.');
  }
}
