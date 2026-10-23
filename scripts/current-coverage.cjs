const fs=require('node:fs'),path=require('node:path');
module.exports=async function currentCoverage(){
 const {appendAllContentBatches}=await import('../elix-batch-registry.js');
 const {buildCatalogCoverage}=await import('../elix-coverage-audit.js');
 const read=p=>JSON.parse(fs.readFileSync(path.join(__dirname,'..',p),'utf8'));
 const editorial=read('data/editorial.json'),pk=read('data/pk-reviewed.json');
 appendAllContentBatches(editorial,pk);
 return buildCatalogCoverage({catalog:read('data/catalog.json'),editorial,pk,index:read('data/verified/index.json')});
};
