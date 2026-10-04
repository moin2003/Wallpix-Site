const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function scanLogs() {
  const files = [
    'C:\\Users\\88019\\.gemini\\antigravity\\brain\\52beafaa-1842-4a5d-9cdb-c17178ceb3cf\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\88019\\.gemini\\antigravity\\brain\\52beafaa-1842-4a5d-9cdb-c17178ceb3cf\\.system_generated\\logs\\transcript_full.jsonl'
  ];

  for (const f of files) {
    if (!fs.existsSync(f)) continue;
    const rl = readline.createInterface({ input: fs.createReadStream(f), crlfDelay: Infinity });
    let idx = 0;
    for await (const line of rl) {
      idx++;
      if (line.includes('write_to_file') || line.includes('Header.astro')) {
        try {
          const obj = JSON.parse(line);
          if (obj.tool_calls) {
            for (const tc of obj.tool_calls) {
              if (tc.name === 'write_to_file' && tc.parameters?.TargetFile && tc.parameters?.CodeContent) {
                const base = path.basename(tc.parameters.TargetFile);
                const stepIdx = obj.step_index ?? idx;
                const savePath = path.join('M:\\Wallpaper Site\\scripts', `saved_step${stepIdx}_${base}`);
                fs.writeFileSync(savePath, tc.parameters.CodeContent);
                console.log(`Extracted: ${savePath} from ${path.basename(f)} line ${idx}`);
              }
            }
          }
        } catch(e) {}
      }
    }
  }
}
scanLogs();
