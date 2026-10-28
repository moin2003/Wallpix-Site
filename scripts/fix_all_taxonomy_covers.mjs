import fs from 'fs';
import path from 'path';

const catalogPath = path.resolve('public/data/catalog.json');
const taxonomyPath = path.resolve('src/data/taxonomyData.json');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const taxonomy = JSON.parse(fs.readFileSync(taxonomyPath, 'utf8'));

console.log(`Total wallpapers in catalog: ${catalog.length}`);

// Build search indexes
const urlMap = new Map();
const tagMap = new Map();

catalog.forEach((w) => {
  const cdn = (w.sourceCdn || '').toLowerCase();
  const slug = (w.slug || '').toLowerCase();
  const title = (w.title || '').toLowerCase();

  // Index tags
  (w.tags || []).forEach((t) => {
    const norm = t.toLowerCase().trim();
    if (!tagMap.has(norm)) tagMap.set(norm, []);
    tagMap.get(norm).push(w);
  });
});

function findBestWallpaper(subName, subSlug, catId) {
  const sName = subName.toLowerCase().trim();
  const sSlug = subSlug.toLowerCase().trim();
  const words = sName.split(/\s+/).filter((w) => w.length > 2);

  // 1. Search in URL (e.g., /henry-cavill/ in filename)
  const urlMatch = catalog.find((w) => {
    const u = (w.sourceCdn || '').toLowerCase();
    return u.includes(`-${sSlug}-`) || u.includes(`/${sSlug}-`) || u.includes(sSlug);
  });
  if (urlMatch) return urlMatch.sourceCdn;

  // 2. Search in tags
  if (tagMap.has(sSlug)) return tagMap.get(sSlug)[0].sourceCdn;
  if (tagMap.has(sName)) return tagMap.get(sName)[0].sourceCdn;

  // 3. Exact title match
  const titleMatch = catalog.find((w) => (w.title || '').toLowerCase().includes(sName));
  if (titleMatch) return titleMatch.sourceCdn;

  // 4. All words match in title + tags
  if (words.length > 1) {
    const multiMatch = catalog.find((w) => {
      const combined = `${(w.title || '').toLowerCase()} ${(w.tags || []).join(' ').toLowerCase()} ${(w.sourceCdn || '').toLowerCase()}`;
      return words.every((word) => combined.includes(word));
    });
    if (multiMatch) return multiMatch.sourceCdn;
  }

  // 5. Singular/first word match in category
  if (words.length > 0) {
    const firstWord = words[0];
    const catMatch = catalog.find((w) => {
      const catMatches = (w.category || '').toLowerCase().includes((catId || '').toLowerCase());
      const hasWord = ((w.title || '') + ' ' + (w.sourceCdn || '')).toLowerCase().includes(firstWord);
      return catMatches && hasWord;
    });
    if (catMatch) return catMatch.sourceCdn;
  }

  return null;
}

let updatedCount = 0;
let exactMatches = 0;

(taxonomy.mainCategories || []).forEach((cat) => {
  const catSubs = cat.subTopics || [];
  catSubs.forEach((sub) => {
    const matchedCdn = findBestWallpaper(sub.name, sub.slug, cat.id || cat.slug);
    if (matchedCdn) {
      if (sub.cover !== matchedCdn) {
        sub.cover = matchedCdn;
        updatedCount++;
      }
      exactMatches++;
    }
  });
});

console.log(`Matched ${exactMatches} subtopics to real wallpapers! Updated ${updatedCount} covers.`);

fs.writeFileSync(taxonomyPath, JSON.stringify(taxonomy, null, 2), 'utf8');

// Verify Henry Cavill
const moviesCat = taxonomy.mainCategories.find((c) => c.id === 'movies' || c.name.includes('Movie'));
const henry = moviesCat?.subTopics.find((s) => s.slug === 'henry-cavill');
console.log('Henry Cavill new cover:', henry?.cover);
