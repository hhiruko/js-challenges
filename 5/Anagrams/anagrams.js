const getText = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        console.error(error.message);
    }
};

const url = "https://worldofspectrum.net/pub/sinclair/games-info/l/LordOfTheRings.txt";
const text = await getText(url);

const words = new Set(text.replace(/\r?\n/g, ' ').split(' ').map(e => e.replace(/[0-9\W_]/g, '').toLowerCase()).filter(e => e !== ''));

const anagrams = new Map();
for (const word of words) {
  const sorted = word.split('').sort().join('');
  const group = anagrams.get(sorted);
  if (group) {
    group.push(word);
  } else {
    anagrams.set(sorted, [word]);
  }
}

for (const [key, group] of anagrams) {
  if (group.length < 2) {
    anagrams.delete(key);
  }
}

console.log(anagrams.values())