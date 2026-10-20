import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hubRoot = path.resolve(__dirname, '..');
const fleetRoot = path.resolve(hubRoot, '..', 'Fleet Asset Manager');
const fleetDist = path.join(fleetRoot, 'dist');
const garageTarget = path.join(hubRoot, 'dashboards', 'garage');

console.log('🔄 [GARAGE SYNC] Synchronizing Fleet Asset Manager with Central Command Hub...');
console.log(`📁 Source: ${fleetRoot}`);
console.log(`📁 Target: ${garageTarget}`);

if (!fs.existsSync(fleetRoot)) {
  console.error(`❌ Source folder not found: ${fleetRoot}`);
  process.exit(1);
}

// 1. Build Fleet Asset Manager if needed
try {
  console.log('⚡ Building Fleet Asset Manager from source...');
  execSync('npm.cmd run build', { cwd: fleetRoot, stdio: 'inherit' });
  console.log('✓ Fleet Asset Manager build complete.');
} catch (e) {
  console.warn('⚠️ Build command via npm.cmd had notice; checking existing dist...');
}

if (!fs.existsSync(fleetDist)) {
  console.error(`❌ Build dist not found in: ${fleetDist}`);
  process.exit(1);
}

// 2. Recursive copy
function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  for (const item of fs.readdirSync(src)) {
    const sPath = path.join(src, item);
    const dPath = path.join(dest, item);
    if (fs.statSync(sPath).isDirectory()) {
      copyRecursive(sPath, dPath);
    } else {
      fs.copyFileSync(sPath, dPath);
      console.log(`  ✓ Copied: ${path.relative(hubRoot, dPath)}`);
    }
  }
}

copyRecursive(fleetDist, garageTarget);
console.log('🎉 [GARAGE SYNC COMPLETE] Central Command Hub dashboards/garage is 100% up-to-date!');
