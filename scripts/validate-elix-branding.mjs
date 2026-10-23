import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url));
const manifest=JSON.parse(read('manifest.webmanifest'));
assert.equal(manifest.short_name,'ELIX');assert.equal(manifest.name,'ELIX — Farmacologia & Principi Attivi');
assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');
for(const i of manifest.icons.filter(x=>x.type==='image/png')){
 const b=read(i.src);assert.equal(b.readUInt32BE(16)+'x'+b.readUInt32BE(20),i.sizes);
}
assert.ok(manifest.icons.some(i=>i.sizes==='512x512'&&i.purpose==='maskable'));
assert.equal(crypto.createHash('sha256').update(read('assets/elix-reference.png')).digest('hex'),'476b3193923d8f6cb362edef39cb0d2e9cca5d72d128bf577b0c8583a1f221f2');
const html=read('index.html').toString();
for(const value of ['og:title','og:image','apple-mobile-web-app-title','application-name'])assert.ok(html.includes(value));
assert.match(html,/<title>ELIX — Farmacologia & Principi Attivi/);assert.match(html,/rel="canonical" href="https:\/\/eliseopeirano79-droid.github.io\/ELIX\/"/);
console.log('ELIX_BRANDING_PASS: name, canonical URL, reference integrity, PNG dimensions, maskable icon and metadata');
