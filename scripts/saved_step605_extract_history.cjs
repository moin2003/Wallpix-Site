const fs = require('fs');
const readline = require('readline');

async function findFiles() {
  const fileStream = fs.createReadStream('C:\\Users\\88019\\.gemini\\antigravity\\brain\\52beafaa-1842-4a5d-9cdb-c17178ceb3cf\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  let count = 0;
  for await (const line of rl) {
    count++;
    if (line.includes('write_to_file')) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
          for (const tc of obj.tool_calls) {
            const tf = tc.parameters?.TargetFile;
            if (tf && tf.includes('Header.astro')) {
              console.log('Found Header.astro at step', count);
              fs.writeFileSync(`M:\\Wallpaper Site\\scripts\\header_step_${count}.astro`, tc.parameters.CodeContent);
            }
            if (tf && tf.includes('Hero.astro')) {
              console.log('Found Hero.astro at step', count);
              fs.writeFileSync(`M:\\Wallpaper Site\\scripts\\hero_step_${count}.astro`, tc.parameters.CodeContent);
            }
            if (tf && tf.includes('index.astro') && !tf.includes('wallpapers')) {
              console.log('Found index.astro at step', count);
              fs.writeFileSync(`M:\\Wallpaper Site\\scripts\\index_step_${count}.astro`, tc.parameters.CodeContent);
            }
          }
        }
      } catch(e) {}
    }
  }
}
findFiles();
