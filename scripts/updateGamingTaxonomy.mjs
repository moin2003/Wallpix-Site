import fs from 'fs';
import path from 'path';

const gamingListRaw = `
Red Dead Redemption
Need for Speed
Grand Theft Auto 5
God of War
Minecraft
Call of Duty
The Last of Us
Cyberpunk 2077
Assassin's Creed
Forza Horizon
Batman: Arkham City
Grand Theft Auto: San Andreas
The Witcher
Resident Evil Village
GTA: Vice City
Uncharted
Valorant
Elden Ring
Firewatch
Tomb Raider
Gengar
GTA V
Shooters
Genshin Impact
Garena Free Fire
Hitman
FIFA
Action Adventure Game
Horizon Forbidden West
Mario Bros.
God of War: Ragnarok
League of Angels
Halo
The PlayStation
Roblox
Steam
Ubisoft
S.T.A.L.K.E.R. 2
Stray
Leon S. Kennedy
Kratos
Far Cry 3
Skyrim
GTA
Mafia
Fortnite
World of Warcraft
Pokemon
The Legend of Zelda
Death Stranding
Hogwarts Legacy
Fallout
Marvel's Guardians of the Galaxy
Dota 2
Shadow of the Colossus
League of Legends
GTA: San Andreas
Jinx
Gamer
Horizon Zero Dawn
Darth Revan
Diablo
Games
Among Us
Far Cry 6
Metro Exodus
Half-Life
John Marston
Angry Birds
Herobrine
Clash of Clans
Grand Theft Auto
Gears of War
BioShock
Mario
Horde
Racing Games
Dead Space
Role-Playing Games
Battlefield 3
Overwatch
Fighting Games
Far Cry 5
Dishonored
S.T.A.L.K.E.R.: Call of Pripyat
Gamer Girl
Gran Turismo 7
Hideo Kojima
Nintendo
Hellblade
Iori Yagami
Magic: The Gathering
Poppy Playtime
A Plague Tale: Requiem
Halo Ring
Pokemon GO
Dead by Daylight
Ghost Recon: Wildlands
Bethesda
Pac-Man
It Takes Two
Crysis
Metro 2033
The Elder Scrolls
WoW
Limbo
Need for Speed Hot Pursuit Remastered
Sifu
Heavy Rain
War Thunder
Outer Wilds
Hitman: Absolution
CarX Street
Halo: Reach
Legend of Zelda: Breath of the Wild
Mass Effect
Final Fantasy XIV
World of Tanks
Hades
Portal 2
Destiny
League of Legends Logo
Half-Life 2
Scorn
FIFA Soccer
Sega
Battle Royale Games
Ghost Pokemon
SCUM
Hyper Sonic
Apex Legends
Kingdom Hearts
Injustice
Kena: Bridge of Spirits
Diablo IV
Dying Light 2: Stay Human
Mario Castle
No Man’s Sky
Metro: Last Light
League of Legends Minimalist
Bayonetta 3
Hyper Light Drifter
LittleBigPlanet
Ivysaur
Arma Reforger
Horde Logo
Genji
Life is Strange: True Colors
Mario Kart
Lich King
Halo 3: ODST
Master Chief
Saints Row
Hyrule
Hearts of Iron
Lord of the Rings: Gollum
King of Fighters
Majora's Mask
EVE Online
Legendary Pokemon
Zelda
PUBG MOBILE
Illidan
Splatoon 3
Mass Effect 3
Greninja
Resident Evil
Link
LEGO Star Wars: The Skywalker Saga
Hearthstone
Halo 2
Giratina
Journey
Invoker
Mazinger Z
Ratchet and Clank: Rift Apart
Deus Ex
ARK: Survival Evolved
Hello Neighbor 2
Huggy Wuggy
Lineage
Legend of Zelda: Twilight Princess
Halo: Combat Evolved
Dark Souls III
Hitman Logo
Sonic Frontiers
Garry's Mod
inFAMOUS
Arthur Morgan
Metroid Dread
Mobile Legends: Bang Bang
Tomb Raider: Underworld
Ashe
Gears 5
Days Gone
Ghost Recon: Future Soldier
Mass Effect: Andromeda
Hyrule Warriors
Legend of Zelda: Skyward Sword
Hollow Knight
Groudon
Injustice 2
Arbiter
Glaceon
Heroes of Might and Magic
Ho-Oh
Galactica
Devil May Cry 5
Guild Wars
Legend of Zelda: Triforce
Sekiro: Shadows Die Twice
Guilty Gear
Mass Effect 2
Inscryption
Killzone
Diablo Immortal
Suicide Squad: Kill the Justice League
Pokemon Legends: Arceus
Isaac Clarke
Call of Duty: Mobile
Metro: 2033 Redux
inFAMOUS: Second Son
Riders Republic
Doom
Grim Dawn
Covenant
Total War: Warhammer III
Just Cause
Deep Rock Galactic
Sonic Adventure 2
Imperial Guard
Heroes of the Storm
Killer Instinct
Kirby and the Forgotten Land
Halo Wars
Sackboy
Need For Speed: Most Wanted
Minecraft Shaders
Grass
The Room
Dune: Awakening
Watch Dogs 2
Gastly
Jirachi
S.T.A.L.K.E.R.: Shadow of Chernobyl
Hitman: Contracts
Injustice: Gods Among Us
Knuckles the Echidna
Kerrigan
Jolteon
V Rising
Mass Effect 3: Citadel
Bloodborne
Garchomp
Counter-Strike
S.T.A.L.K.E.R.: Clear Sky
Dragon Ball Legends
Epic Games, Inc.
Lost Planet
Destiny 2: The Witch Queen
Hunter
Monument Valley
Ellie Williams
Psychonauts 2
Avatar: Frontiers of Pandora
Garrus Vakarian
Tekken 7
Deathloop
Tunic Game
The Legend of Zelda: Breath of the Wild 2
Jin Kazama
Ghostwire: Tokyo
Jhin
The Callisto Protocol
Elites
Hitman: Blood Money
Vampire: The Masquerade - Bloodhunt
Pikachu
Kingdom Hearts Final Mix
Starfield
JoJo's Bizarre Adventure: All Star Battle
L4D 2
Elise
Cute Pikachu
LBP
Master Yi
Call of Duty: Modern Warfare 2
Kindred
Jaina Proudmoore
Dragon Ball Z: Dokkan Battle
MotoGP 22
Rainbow Six Extraction
Homefront
NieR
Naruto Shippuden: Ultimate Ninja Storm
KotOR
Karthus
F1 22
Playstation Logo
Five Nights at Freddy's: Security Breach
Warhammer 40,000: Space Marine
MOBA
Goomba
Infinite Lagrange
We Were Here Forever
Crash Bandicoot
Pathfinder: Wrath of the Righteous
Haxorus
Batman: Arkham Knight
God Hand
The Dark Pictures: The Devil in Me
Warhammer 40 000: Chaos Gate - Daemonhunters
Vampire: The Masquerade — Swansong
Charizard
Liara T'Soni
Gyarados
Far Cry 4
Call Of Duty: Black Ops 3
Lee Sin
Steve
Hoopa
The Stanley Parable Ultra Deluxe
Ezio Auditore da Firenze
Call Of Duty: Modern Warfare
Prince of Persia
Hanzo
Shadowverse
Doom Eternal
HITMAN 3
Deemo II
Assassin's Creed Valhalla
2B
Warhammer 40 000: Darktide
Michael
Killzone 3
PlayStation 5
Sonic Mania
The Division Resurgence
Kingdom Hearts 358/2 Days
Company of Heroes 3
Gotham Knights
Marvel’s Midnight Suns
Infernape
Sports Games
Simulators
Heavenly Sword
Fire Emblem
Strategies
Roxas
Forspoken
Warner Bros. Entertainment
KotOR 2
L4D
Midna
Aqua
Kingdom Hearts Birth by Sleep
Halo Legends
Halo: Spartan Assault
Sora
Mei
Gangplank
inFAMOUS 2
Trek to Yomi
Test Drive Unlimited Solar Crown
Chibi
Lost Light
Tiny Tina's Wonderlands
Jet Set Radio Future
Jace Beleren
Garen
Mass Effect 2: Lair of the Shadow Broker
Kissy Missy
Niantic
Handsome Jack
Gardevoir
Mass Effect 3: Omega
Platform Games
God Eater
Killzone: Shadow Fall
Ganondorf
Nami
Gabe Newell
Gallade
Star Wars: Galaxy of Heroes
Beyond Good and Evil
Mario + Rabbids: Sparks of Hope
Mark of the Ninja
Mass Effect 3: Leviathan
Lost Saga
Riku
Gears of War: Judgment
Songs of Conquest
Puzzles
Liberty Prime
Krieg
Junkrat
Mass Effect 2: Kasumi – Stolen Memory
Ghost
Lucina
Shadow Warrior 3
Kid Icarus
Lucian
FPP Games
Magicka
Empires and Puzzles
Hanzo
Heartless
LOST in BLUE
McCree
M. Bison
Dark Eden M
Heroes and Generals
The Artful Escape
Ni no Kuni: Cross Worlds
Lucio
Guile
Warcraft Arclight Rumble
Tokyo Ghoul: re Call to Exist
Mabinogi
H1Z1
High Noon Yasuo
Houndoom
Mass Effect Infiltrator
Princess Connect! Re: Dive
Ark II
Redfall
Mass Effect 2: Arrival
Haiku, the Robot
MultiVersus
GunZ
Dread Hunger
Online Board Games
Source of Madness
Checkers
Best Month Ever
Hood: Outlaws and Legends
Nobody
Wilderless
Mass Effect Galaxy
Terra
New York Subliners
Mass Effect 2: Overlord
Alpha Ace
Roller Champions
Crowns and Pawns: Kingdom of Deceit
Mass Effect: Pinnacle Station
Dark Nemesis: Infinite Quest
Mechanic 8230
Second Life
Endless Battlefield
Mythical Games
Deadly Dozen Reloaded
Horizon Worlds
Awaken: Chaos Era
Cue!
`;

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const lines = gamingListRaw.split('\n').map(l => l.trim()).filter(Boolean);
const seenSlugs = new Set();
const subTopics = [];

// Base count distribution matching WallpaperCat
const countTiers = [165, 148, 134, 119, 108, 98, 92, 85, 78, 72, 68, 64, 58, 54, 48, 42, 38, 32, 28, 24];

lines.forEach((name, idx) => {
  const slug = slugify(name);
  if (!slug || seenSlugs.has(slug)) return;
  seenSlugs.add(slug);
  
  const countNum = idx < countTiers.length ? countTiers[idx] : Math.max(12, 50 - Math.floor(idx / 8));
  subTopics.push({
    name,
    slug,
    count: `${countNum} Wallpapers`
  });
});

console.log(`Generated ${subTopics.length} gaming subtopics.`);

const taxonomyPath = path.resolve('src/data/taxonomy.ts');
let content = fs.readFileSync(taxonomyPath, 'utf8');

// Replace the gaming category's subTopics in MAIN_CATEGORIES
const gamingCategoryRegex = /("id":\s*"gaming",[\s\S]*?"subTopics":\s*\[)[\s\S]*?(\]\s*\},\s*\{\s*"id":\s*"anime")/;

const newSubTopicsJson = JSON.stringify(subTopics, null, 8).replace(/^\[/, '').replace(/\]$/, '');
const replacement = `$1\n${newSubTopicsJson}\n      $2`;

if (gamingCategoryRegex.test(content)) {
  content = content.replace(gamingCategoryRegex, replacement);
  fs.writeFileSync(taxonomyPath, content, 'utf8');
  console.log('Successfully updated src/data/taxonomy.ts with complete gaming subtopics!');
} else {
  console.error('Could not match gaming category regex in taxonomy.ts');
}
