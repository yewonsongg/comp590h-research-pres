import { chromium } from 'playwright-core';
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const root=process.cwd(),unpacked=path.join(root,'qa','unpacked-check');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const context=await browser.newContext({offline:true,viewport:{width:1920,height:1080},reducedMotion:'reduce'});
const page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.goto(pathToFileURL(path.join(unpacked,'index.html')).href);
await page.waitForFunction(()=>window.deck);
const files=await page.evaluate(()=>[...document.querySelectorAll('link[href],script[src],img[src]')].map(e=>e.href||e.src));
const missing=[];
for(const url of files){try{await readFile(new URL(url))}catch{missing.push(url)}}
const localLinks=await page.evaluate(()=>[...document.querySelectorAll('a[href]')].map(e=>e.getAttribute('href')).filter(h=>!h.startsWith('#')&&!/^https?:/.test(h)));
for(const file of localLinks){try{await readFile(path.join(unpacked,file))}catch{missing.push(file)}}
await page.evaluate(()=>{deck.goTo(3);deck.advance();deck.advance();deck.advance();deck.advance()});
const interactions=await page.evaluate(()=>deck.step===4&&document.querySelector('#reasoning-loop .focus').dataset.node==='4');
const pdf=(await readFile(path.join(unpacked,'presentation.pdf'))).toString('latin1');
const result={date:'2026-11-10',zip:'agentic-reasoning-offline.zip',extractedApplicationLoadsOffline:await page.locator('.slide').count()===16,localAssetsAndDocumentsPresent:missing.length===0,interactionWorks:interactions,pdfPages:(pdf.match(/\/Type\s*\/Page\b/g)||[]).length,errors,missing};
await writeFile(path.join(root,'qa','package-report.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
await browser.close();
if(errors.length||missing.length||!interactions||result.pdfPages!==16)process.exitCode=1;
