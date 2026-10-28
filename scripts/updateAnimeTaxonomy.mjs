import fs from 'fs';
import path from 'path';

const animeListRaw = `
Anime Girls
Naruto
Jujutsu Kaisen
Demon Slayer: Kimetsu no Yaiba
Your Name
Studio Ghibli
One Piece
Cool Anime Backgrounds
Goku
Attack on Titan: The Final Season
Berserk
Hellsing
Gothic Anime
Tokyo Ghoul
Initial D
Bleach
Pokemon
My Dress-Up Darling
Hunter x Hunter
Lofi Forest
Black Clover
Attack on Titan
Makoto Shinkai
Ponyo
Kenshin
Monkey D. Luffy
Levi Ackerman
The Garden of Words
Anime Phone
Mob Psycho 100
Spirited Away
Kirito
Neon Genesis Evangelion
Dragon Ball Z
One-Punch Man
Demon Slayer: Mugen Train
Bleach: Thousand Year Blood War
Hatake Kakashi
Serial Experiments Lain
Haikyuu!!
My Hero Academia
Ghost in the Shell
Suzume no Tojimari
Tokyo Revengers
Hinata
Whisper of the Heart
Kiki's Delivery Service
Dragon Ball Super: Super Hero
Howl's Moving Castle
Avatar: The Last Airbender
Konan
Sailor Moon
Killua
Horimiya
Is It Wrong to Try to Pick Up Girls in a Dungeon?
My Neighbor Totoro
Juuzou Suzuya
Jiraiya
Gundam
A Silent Voice
Mei Terumi
Hajime no Ippo
That Time I Got Reincarnated as a Slime
Dr.STONE
The Secret World of Arrietty
Great Teacher Onizuka
Mushoku Tensei: Jobless Reincarnation
Fullmetal Alchemist
Manga
Kaguya-sama: Love Is War
Law
K-On!
Gasai Yuno
The Seven Deadly Sins
Kakashi
Evangelion: 3.0+1.0 Thrice Upon a Time
Sword Art Online
Kakegurui Twin
Code Geass: Lelouch of the Rebellion
Hayao Miyazaki
Kuroko's Basketball
Erza
Ken Kaneki
The Wind Rises
Kenpachi
Fate/stay night: Heaven's Feel
Wonder Egg Priority
Alucard
Elfen Lied
Princess Mononoke
Overlord
Ichigo Kurosaki
86
Infinite Stratos
Megalo Box
Gintama
Soul Eater
Aggretsuko
Gogeta
Jotaro Kujo
Dragon Ball Z Abridged
Kyubey
Jujutsu Kaisen 0: The Movie
Sonny Boy
Leafeon
Hinata Hyuga
When Marnie Was There
Hidan
KonoSuba: God's Blessing on This Wonderful World!
Gaara
BEASTARS
Kisuke Urahara
Laputa: Castle in the Sky
Gon Freecss
Assassination Classroom
SK8 the Infinity
Tokyo Ghoul: Root A
Kamisama
Made in Abyss
Kurapika
Fairy Tail
Goku Super Saiyan
Komi Can't Communicate
Girls' Frontline
Black Rock Shooter
The Case Study of Vanitas
Lelouch
Sailor Moon Eternal
Detective Conan
Toradora!
Dusk Maiden of Amnesia
Meliodas
Ranking of Kings
Konoha Symbol
The Rising of the Shield Hero
Kimi ni Todoke
The Promised Neverland
Princess Connect! Re: Dive
InuYasha
Kurama
Black Butler
Gantz
My Ordinary Life
Goku Kamehameha
Korra
Vivy: Fluorite Eye's Song
Android 18
Steins;Gate
Hisoka
Blue Period
Genos
Gintoki Sakata
Noragami
Erased
Black Bullet
Madoka Magica
To Your Eternity
Hellsing Ultimate
Master Roshi
Kaguya Shinomiya
Latios
Tengen Toppa Gurren Lagann
Gangsta.
Hashirama Senju
Nausicaa of the Valley of the Wind
Magic Kaito
Gundam Unicorn
Krillin
Gate
Free!
Haku
InuYasha and Sesshomaru
Love Live! The School Idol
Tailed Beasts
Belle: Ryu to Sobakasu no Hime
Guilty Crown
Majin Vegeta
Lucario
Yoko
Lugia
Goku and Naruto
Gurren Lagann
Gilgamesh
Fruits Basket
Date A Live
Gohan
Kyogre
Goten
Golden Frieza
The Girl Who Leapt Through Time
Gin Ichimaru
Aharen-san wa Hakarenai
Made in Abyss: Dawn of the Deep Soul
Aiolia
Cells at Work! Code Black
Itachi Uchiha
Roronoa Zoro
RWBY
Obito Uchiha
Madara Uchiha
Gon and Killua
Gintama: The Final
Fate/stay night: Unlimited Blade Works
Naruto Team
Naruto Characters
Sasuke and Itachi
Eren Yeager
Akatsuki
Hokuto no Ken
Blue Exorcist
Kingdom
Haruhi Suzumiya
Sasuke Susanoo
Bubble
Minato Namikaze
The Seven Deadly Sins: Cursed by Light
Spice and Wolf
InuYasha and Kagome
Anime Scenery
Odd Taxi
Mikasa Ackerman
Anime City
Sosuke Aizen
Lupin the Third
Edward Elric
Sasuke and Naruto
Chibi
Natsu
Inazuma Eleven
Golden Time
The Melancholy of Haruhi Suzumiya
Luffy And Ace
A Couple of Cuckoos
Kamina
Shisui Uchiha
Teasing master takagi-san
Gundam SEED
Kushina Uzumaki
Kagome
Wolf Children
Yowamushi Pedal
Love, Chunibyo and Other Delusions
Grimmjow Jaggerjack
Anime Couple
Kon
Saint Seiya: Knights Of The Zodiac
Nagato
Kairi
Glitter Force
Lovely Complex
Sanji
Broly
Nami
Ichigo and Rukia
Simon
Dog Days
Happy
Your Lie in April
Monogatari
Snow White with the Red Hair
Katekyo Hitman Reborn!
Nia
Gabriel DropOut
Angel Beats!
Magi
Juvia Lockser
Beyond the Boundary
Hitsugaya
Wotakoi: Love Is Hard for Otaku
Re:Zero
Summer Time Rendering
Gray Fullbuster
Science Fell in Love, So I Tried to Prove It
Skeleton Knight in Another World
The Devil Is a Part-Timer!
Obito vs Kakashi
Killer Bee
Saitama
Aoashi
5 Centimeters per Second
Cherry Blossom
Kyuubi Nine Tails
Little Witch Academia
Kiba Inuzuka
Beelzebub
Matatabi
Kekkai Sensen
The Anthem of the Heart
Accel World
Magikarp
Gajeel Redfox
Laxus Dreyar
WorldEnd
Nisekoi: False Love
Anohana
A Certain Magical Index
Maid Sama!
Gotenks
Shadowverse
`;

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const lines = animeListRaw.split('\n').map(l => l.trim()).filter(Boolean);
const seenSlugs = new Set();
const subTopics = [];

// Base count distribution matching WallpaperCat
const countTiers = [122, 95, 88, 76, 68, 62, 58, 52, 48, 45, 42, 38, 36, 34, 32, 28, 24, 21, 18, 15];

lines.forEach((name, idx) => {
  const slug = slugify(name);
  if (!slug || seenSlugs.has(slug)) return;
  seenSlugs.add(slug);
  
  const countNum = idx < countTiers.length ? countTiers[idx] : Math.max(12, 45 - Math.floor(idx / 6));
  subTopics.push({
    name,
    slug,
    count: `${countNum} Wallpapers`
  });
});

console.log(`Generated ${subTopics.length} anime subtopics.`);

const taxonomyPath = path.resolve('src/data/taxonomy.ts');
let content = fs.readFileSync(taxonomyPath, 'utf8');

// Replace the anime category's subTopics in MAIN_CATEGORIES
const animeCategoryRegex = /("id":\s*"anime",[\s\S]*?"subTopics":\s*\[)[\s\S]*?(\]\s*\})/;

const newSubTopicsJson = JSON.stringify(subTopics, null, 8).replace(/^\[/, '').replace(/\]$/, '');
const replacement = `$1\n${newSubTopicsJson}\n      $2`;

if (animeCategoryRegex.test(content)) {
  content = content.replace(animeCategoryRegex, replacement);
  fs.writeFileSync(taxonomyPath, content, 'utf8');
  console.log('Successfully updated src/data/taxonomy.ts with complete anime subtopics!');
} else {
  console.error('Could not find anime category in taxonomy.ts');
}
