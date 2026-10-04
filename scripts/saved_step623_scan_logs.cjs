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
      if (line.includes('write_to_file')) {
        try {
          const obj = JSON.parse(line);
          if (obj.tool_calls) {
            for (const tc of obj.tool_calls) {
              const args = tc.args || tc.parameters;
              if (args && args.TargetFile && args.CodeContent) {
                const base = path.basename(args.TargetFile);
                const stepIdx = obj.step_index ?? idx;
                const savePath = path.join('M:\\Wallpaper Site\\scripts', `saved_step${stepIdx}_${base}`);
                let content = args.CodeContent;
                if (typeof content === 'string' && content.startsWith('"') && content.endsWith('"')) {
                  try {
                    content = JSON.parse(content);
                  } catch(e) {}
                }
                fs.writeFileSync(savePath, content);
                console.log(`Extracted: step${stepIdx}_${base}`);
              }
            }
          }
        } catch(e) {}
      }
    }
  }
}
scanLogs();
