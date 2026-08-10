const r = await fetch('https://el-nafeer-real-estate.vercel.app/lever-pioneer/quote', {
  headers: { 'User-Agent': 'WhatsApp/2.21.10.17 A' }
});
console.log('Status:', r.status);
console.log('Final URL:', r.url);
const html = await r.text();
const imgMatch = html.match(/og:image.*?content="([^"]+)"/s);
const titleMatch = html.match(/og:title.*?content="([^"]+)"/s);
const descMatch = html.match(/og:description.*?content="([^"]+)"/s);
console.log('og:image:', imgMatch ? imgMatch[1] : 'NOT FOUND');
console.log('og:title:', titleMatch ? titleMatch[1] : 'NOT FOUND');
console.log('og:description:', descMatch ? descMatch[1] : 'NOT FOUND');
