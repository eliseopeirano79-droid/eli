import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {italianDrugName,hasReviewedItalianName,internationalDrugName,ITALIAN_DRUG_NAMES} from "../italian-names.js";
import {createEvidenceAtlas} from "../evidence-atlas.js";

assert.ok(Object.keys(ITALIAN_DRUG_NAMES).length >= 200,"Nomenclatura iniziale incompleta");
const examples=[
 ["ACETAMINOPHEN","Paracetamolo"],
 ["ACEBUTOLOL HYDROCHLORIDE","Acebutololo cloridrato"],
 ["ACENOCOUMAROL","Acenocumarolo"],
 ["ACEMETACIN","Acemetacina"],
 ["ACETAZOLAMIDE","Acetazolamide"],
 ["ACETIC ACID","Acido acetico"],
 ["ABACAVIR SULFATE","Abacavir solfato"]
];
for(const [english,italian] of examples){
 const m={name:english};
 assert.equal(italianDrugName(m),italian);
 assert.equal(internationalDrugName(m),english);
 assert.ok(hasReviewedItalianName(m));
}
assert.equal(italianDrugName({name:"UNMAPPED EXPERIMENTAL COMPOUND"}),"UNMAPPED EXPERIMENTAL COMPOUND","Unmapped structures must not be auto-translated");
assert.equal(italianDrugName({name:"HEPARIN"},"Eparina non frazionata"),"Eparina non frazionata","Exact editorial title has priority");
assert.equal(italianDrugName({name:"AMLODIPINE BESYLATE"}),"Amlodipina besilato","Do not strip salt suffixes");
const originalIndex=readFileSync(new URL("../index.html",import.meta.url),"utf8");
const source=readFileSync(new URL("../evidence-atlas.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../elix-focus.css",import.meta.url),"utf8");
const sw=readFileSync(new URL("../sw.js",import.meta.url),"utf8");
const manifest=JSON.parse(readFileSync(new URL("../manifest.webmanifest",import.meta.url),"utf8"));
assert.match(originalIndex,/elix-pill-original\.svg/);
assert.match(originalIndex,/apple-touch-icon[^>]*elix-pill-192\.png/);
assert.doesNotMatch(originalIndex,/elix-logo-192|elix-logo\.svg/,"No previous logo in startup or touch icons");
assert.equal(manifest.short_name,"ELIX");
assert.ok(manifest.icons.every(i=>i.src.includes("elix-pill")),"Only chosen capsule image may be used");
assert.match(sw,/italian-names\.js/,"New localization module must be cached for offline support");
assert.match(css,/\.ev-card-alias/);
assert.match(css,/\.ex-home-brand-icon\{background:#182230/);
assert.match(source,/span lang="en"/);
assert.match(source,/italianDrugName/);

const readJSON=(url)=>JSON.parse(readFileSync(fileURLToPath(url),"utf8"));
const catalog=readJSON(new URL("../data/catalog.json",import.meta.url));
assert.ok(catalog.molecules.length > 4000,"Original source catalogue must be preserved");
const rootNames=catalog.molecules.map(m=>m.name);
assert.ok(rootNames.includes("ACETAMINOPHEN"));
const sample=catalog.molecules.find(m=>m.name==="ACETAMINOPHEN");

globalThis.document={
 addEventListener(){},
 getElementById(){return null;}
};
globalThis.location={hash:"#/atlas"};
const nativeFetch=globalThis.fetch;
globalThis.fetch=async (url)=>{
 const data=readJSON(url);
 return {ok:true,json:async()=>data};
};
let ready;
const loaded=new Promise(resolve=>ready=resolve);
const atlas=createEvidenceAtlas({refresh(){ready();},legacyDrugs:[]});
await loaded;
globalThis.fetch=nativeFetch;
const italianResults=atlas.search("paracetamolo");
const englishResults=atlas.search("acetaminophen");
assert.ok(italianResults.some(x=>x.name==="Paracetamolo"&&x.link==="#/molecule/"+sample.id),"Italian search must resolve the source ID");
assert.ok(englishResults.some(x=>x.name==="Paracetamolo"&&x.link==="#/molecule/"+sample.id),"English searches must resolve to the same Italian display");
const moleculeHTML=atlas.route("molecule",sample.id);
assert.match(moleculeHTML,/Paracetamolo/);
assert.match(moleculeHTML,/Nome internazionale \(EN\):/);
assert.match(moleculeHTML,/ACETAMINOPHEN/);
const listing=atlas.route("atlas");
assert.match(listing,/ev-card-alias/);
assert.match(listing,/ev-language-code/);
assert.match(atlas.search("acenocumarolo").map(x=>x.name).join(","),/Acenocumarolo/);
console.log("ELIX IT: PASS · original source identities, Italian headings, EN synonyms, bilingual search and flat capsule branding");
