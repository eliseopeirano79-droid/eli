// Same-origin paths share existing localStorage; do not rename or clear any key.
export async function redirectLegacyLocation(){
 const legacy=/^\/(?:PHARMA|eli)(?:\/|$)/.test(location.pathname);
 const supportedHost=location.hostname==='eliseopeirano79-droid.github.io'||['localhost','127.0.0.1'].includes(location.hostname);
 if(!legacy||!supportedHost||!navigator.onLine)return false;
 try{
  const target=new URL('/ELIX/',location.origin);
  const response=await fetch(new URL('release.json',target),{cache:'no-store',signal:AbortSignal.timeout(3500)});
  if(!response.ok)return false;
  const release=await response.json();
  if(release.app!=='ELIX'||release.canonicalPath!=='/ELIX/'||release.ready!==true)return false;
  // Require the real HTML shell too: a marker alone cannot prove a deployment.
  const shell=await fetch(new URL('index.html',target),{cache:'no-store',signal:AbortSignal.timeout(3500)});
  if(!shell.ok||!(await shell.text()).includes('src="./elix-entry.js"'))return false;
  target.search=location.search;target.hash=location.hash;
  location.replace(target.href);return true;
 }catch{return false;} // Network failure keeps the complete local app available.
}
