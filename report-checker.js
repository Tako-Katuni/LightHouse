import readline from 'readline';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Setup readline for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

async function main() {
  // 1. Ask for website URL
  const url = await ask('Enter website URL to audit: ');

  // 2. Ask for thresholds
  const perfThreshold = parseInt(await ask('Performance min score: '), 10);
  const accThreshold = parseInt(await ask('Accessibility min score: '), 10);
  const seoThreshold = parseInt(await ask('SEO min score: '), 10);

  // Ensure reports folder exists
  if (!fs.existsSync('./reports')) {
    fs.mkdirSync('./reports');
  }

  const timestamp = Date.now();
  const outputPath = `./reports/report-${timestamp}.json`;

  console.log(`\nRunning Lighthouse on ${url}...`);

  // 3. Run Lighthouse
  const command = `lighthouse ${url} --quiet --chrome-flags="--headless" --output json --output-path=${outputPath}`;

  exec(command, (error) => {
    if (error) {
      console.error(`Error running Lighthouse: ${error.message}`);
      rl.close();
      return;
    }

    // 4. Parse report
    const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    const performance = report.categories.performance.score * 100;
    const accessibility = report.categories.accessibility.score * 100;
    const seo = report.categories.seo.score * 100;

    console.log('\n=== Lighthouse Results ===');
    console.log(`Performance: ${performance} (${performance >= perfThreshold ? 'PASS' : 'FAIL'})`);
    console.log(`Accessibility: ${accessibility} (${accessibility >= accThreshold ? 'PASS' : 'FAIL'})`);
    console.log(`SEO: ${seo} (${seo >= seoThreshold ? 'PASS' : 'FAIL'})`);

    rl.close();
  });
}

main();
