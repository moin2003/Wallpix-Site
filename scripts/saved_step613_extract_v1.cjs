const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function extractSpecific() {
  const logPath = 'C:\\Users\\88019\\.gemini\\antigravity\\brain\\52beafaa-1842-4a5d-9cdb-c17178ceb3cf\\.system_generated\\logs\\transcript_full.jsonl';
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  let count = 0;
  for await (const line of rl) {
    count++;
    if (count >= 240 && count <= 300) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
          for (const tc of obj.tool_calls) {
            if (tc.parameters && tc.parameters.TargetFile && tc.parameters.CodeContent) {
              const base = path.basename(tc.parameters.TargetFile);
              const savePath = path.join('M:\\Wallpaper Site\\scripts', `v1_${base}`);
              fs.writeFileSync(savePath, tc.parameters.CodeContent);
              console.log(`Saved step ${count}: ${savePath}`);
            }
          }
        }
      } catch(e) {
        console.error(`Error at line ${count}:`, e.message);
      }
    }
  }
}
extractSpecific();
