/* ELIX: category-level three-dimensional illustrations, not atomistic coordinates. */

function svgEsc(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

function hashId(text){let h=2166136261;for(const c of String(text||""))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;}

export function conceptualKind(molecule){
 const n=String(molecule?.name||"").toUpperCase(),t=String(molecule?.type||"").toUpperCase();
 if(/HEPARIN|ENOXAPARIN|POLYSACCHARIDE|MIXTURE|EXTRACT|IMMUNOGLOBULINS?/.test(n))return "mixture";
 if(/PROTEIN|ANTIBODY|PEPTIDE|ENZYME|INSULIN|GLOBULIN|INTERFERON|MONOCLONAL|RECOMBINANT|ALPHA.?1.?PROTEINASE/.test(t+" "+n))return "biologic";
 return "compound";
}

function orbitPoints(seed,n){
 const pts=[];for(let i=0;i<n;i++){const a=i*2.3999632297+(seed%97)*.011,r=40+((seed+i*37)%54),z=Math.cos(a*1.8),x=240+Math.cos(a)*r*1.32,y=142+Math.sin(a)*r*.69+z*20;pts.push({x,y,z,radius:7+(i%3)*2});}
 return pts.sort((a,b)=>a.z-b.z);
}

export function schematicStructure(molecule,mini=false){
 const kind=conceptualKind(molecule),s=hashId(molecule?.id||molecule?.name||"unknown");
 const id="evc"+s.toString(36)+(mini?"m":"d");
 const pts=orbitPoints(s,kind==="biologic"?14:kind==="mixture"?13:9);
 const color=kind==="biologic"?"#79cd9d":kind==="mixture"?"#9fb6e3":"#85cbbb";
 const kindText=kind==="biologic"?"Macromolecola":kind==="mixture"?"Miscela / polimero":"Identità non rappresentata";
 const strands=kind==="biologic"?
 `<path d="M92 169 C130 78 166 212 210 104 S314 208 378 91" fill="none" stroke="url(#${id}-a)" stroke-width="19" stroke-linecap="round"/>
 <path d="M99 118 C156 215 170 58 226 174 S315 55 381 184" fill="none" stroke="url(#${id}-b)" stroke-width="14" stroke-linecap="round"/>
 <path d="M142 192 Q213 67 309 188" fill="none" stroke="#d6f9ea" stroke-width="4" opacity=".42"/>`:
 kind==="mixture"?
 `<path d="M58 151 Q108 65 162 142 T267 133 T406 164" fill="none" stroke="url(#${id}-a)" stroke-width="14" stroke-linecap="round"/>
 <path d="M76 115 Q137 212 205 151 T365 127" fill="none" stroke="url(#${id}-b)" stroke-width="11" stroke-linecap="round"/>`:
 `<path d="M122 173 L165 111 L217 155 L265 88 L324 132 L363 106" fill="none" stroke="url(#${id}-a)" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M165 111 L158 76 M217 155 L225 195 M324 132 L343 177" stroke="#9ce6bf" opacity=".8" stroke-width="7" stroke-linecap="round"/>`;
 const dots=pts.map(p=>`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.radius}" fill="url(#${id}-s)" opacity="${(.68+p.z*.15).toFixed(2)}"/>`).join("");
 return `<div class="ev-concept-art ev-concept-${kind}" role="img" aria-label="Illustrazione tridimensionale concettuale per ${svgEsc(molecule?.name)}. Non è una struttura molecolare reale né predittiva.">
 <svg viewBox="0 0 480 280" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">
 <defs><linearGradient id="${id}-a" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b4f3d6"/><stop offset=".53" stop-color="${color}"/><stop offset="1" stop-color="#267c77"/></linearGradient>
 <linearGradient id="${id}-b" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#98b9ed"/><stop offset=".6" stop-color="#7ad2bf"/><stop offset="1" stop-color="#3d7e96"/></linearGradient>
 <radialGradient id="${id}-s" cx=".32" cy=".25" r=".8"><stop stop-color="#edfff8"/><stop offset=".4" stop-color="#8ed7c1"/><stop offset="1" stop-color="#427c92"/></radialGradient></defs>
 <ellipse cx="240" cy="142" rx="167" ry="103" fill="none" stroke="#78b5a4" opacity=".1" stroke-width="2"/>
 <g class="ev-concept-model">${strands}${dots}</g></svg>
 <div class="ev-concept-meta"><strong>${kindText}</strong><span>Visualizzazione 3D illustrativa</span></div></div>`;
}
