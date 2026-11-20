import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hubRoot = path.resolve(__dirname, '..');
const financialRoot = path.resolve(hubRoot, '..', 'Financial Dashboard');
const financialTarget = path.join(hubRoot, 'dashboards', 'financial');

console.log('🔄 [FINANCIAL SYNC] Synchronizing Financial Command Center with Central Command Hub...');
console.log(`📁 Source: ${financialRoot}`);
console.log(`📁 Target: ${financialTarget}`);

if (!fs.existsSync(financialRoot)) {
  console.error(`❌ Source folder not found: ${financialRoot}`);
  process.exit(1);
}

// 1. Fetch live pre-rendered HTML from :3008 if active
async function syncFromLiveServer() {
  try {
    const res = await fetch('http://localhost:3008/');
    if (res.ok) {
      let html = await res.text();

      // Transform absolute /_next/ paths to relative ./_next/ for GitHub Pages subpath hosting!
      html = html.replace(/href="\/_next\//g, 'href="./_next/');
      html = html.replace(/src="\/_next\//g, 'src="./_next/');
      html = html.replace(/"\/_next\//g, '"./_next/');
      html = html.replace(/'\/_next\//g, '\'./_next/');
      html = html.replace(/\\\/_next\\\//g, '\\.\\/_next\\/');

      const targetIndex = path.join(financialTarget, 'index.html');
      fs.writeFileSync(targetIndex, html, 'utf8');
      console.log(`✓ Synchronized live page render to ${targetIndex} (${html.length} bytes) with relative ./_next paths`);
      return true;
    }
  } catch (e) {
    console.warn('⚠️ Live server on :3008 unreachable, checking static files...');
  }
  return false;
}

// 2. Copy static public/rates assets if present
function syncAssets() {
  const publicDir = path.join(financialRoot, 'public');
  if (fs.existsSync(publicDir)) {
    for (const item of fs.readdirSync(publicDir)) {
      const sPath = path.join(publicDir, item);
      const dPath = path.join(financialTarget, item);
      if (fs.statSync(sPath).isFile()) {
        fs.copyFileSync(sPath, dPath);
        console.log(`  ✓ Synced asset: ${item}`);
      }
    }
  }

  // Copy Next.js static bundles into dashboards/financial/_next/static AND root _next/static
  const nextStaticSource = path.join(financialRoot, '.next', 'static');
  if (fs.existsSync(nextStaticSource)) {
    const hubFinancialNext = path.join(financialTarget, '_next', 'static');
    const hubRootNext = path.join(hubRoot, '_next', 'static');

    // Clean existing destination before copy to remove obsolete hash chunks
    if (fs.existsSync(hubFinancialNext)) {
      fs.rmSync(hubFinancialNext, { recursive: true, force: true });
    }
    fs.mkdirSync(hubFinancialNext, { recursive: true });
    fs.cpSync(nextStaticSource, hubFinancialNext, { recursive: true, force: true });

    if (fs.existsSync(hubRootNext)) {
      fs.rmSync(hubRootNext, { recursive: true, force: true });
    }
    fs.mkdirSync(hubRootNext, { recursive: true });
    fs.cpSync(nextStaticSource, hubRootNext, { recursive: true, force: true });

    // Patch webpack runtime in dashboards/financial/_next/static/chunks/webpack-*.js to use relative r.p="./_next/"
    const chunksDir = path.join(hubFinancialNext, 'chunks');
    if (fs.existsSync(chunksDir)) {
      for (const f of fs.readdirSync(chunksDir)) {
        if (f.startsWith('webpack-') && f.endsWith('.js')) {
          const wPath = path.join(chunksDir, f);
          let content = fs.readFileSync(wPath, 'utf8');
          content = content.replace(/r\.p="\/_next\/"/g, 'r.p="./_next/"');
          fs.writeFileSync(wPath, content, 'utf8');
          console.log(`  ✓ Patched ${f} publicPath to relative ./_next/`);
        }
      }
    }

    console.log(`  ✓ Synced fresh Next.js chunks to ${hubFinancialNext} and ${hubRootNext}`);
  }
}

async function main() {
  if (!fs.existsSync(financialTarget)) {
    fs.mkdirSync(financialTarget, { recursive: true });
  }
  await syncFromLiveServer();
  syncAssets();
  console.log('🎉 [FINANCIAL SYNC COMPLETE] Central Command Hub dashboards/financial is synchronized!');
}

main();
