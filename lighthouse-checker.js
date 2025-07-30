// import readline from 'readline';
// import { exec } from 'child_process';
// import fs from 'fs';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// function ask(question) {
//   return new Promise(resolve => rl.question(question, answer => resolve(answer)));
// }

// async function main() {
//   const url = await ask('Enter website URL to audit: ');
//   const perfThreshold = parseInt(await ask('Performance min score: '), 10);
//   const accThreshold = parseInt(await ask('Accessibility min score: '), 10);
//   const seoThreshold = parseInt(await ask('SEO min score: '), 10);

//   if (!fs.existsSync('./reports')) {
//     fs.mkdirSync('./reports');
//   }

//   const timestamp = Date.now();
//   const outputPath = `./reports/report-${timestamp}.json`;

//   console.log(`\nRunning Lighthouse on ${url}...`);

//   const command = `lighthouse ${url} --quiet --chrome-flags="--headless" --output json --output-path=${outputPath}`;

//   exec(command, (error) => {
//     if (error) {
//       console.error(`Error running Lighthouse: ${error.message}`);
//       rl.close();
//       return;
//     }

//     const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
//     const performance = report.categories.performance.score * 100;
//     const accessibility = report.categories.accessibility.score * 100;
//     const seo = report.categories.seo.score * 100;
//     const bestPractices = report.categories['best-practices'].score * 100;


//     console.log('\n=== Lighthouse Results ===');
//     console.log(`Performance: ${performance} (${performance >= perfThreshold ? 'PASS' : 'FAIL'})`);
//     console.log(`Accessibility: ${accessibility} (${accessibility >= accThreshold ? 'PASS' : 'FAIL'})`);
//     console.log(`SEO: ${seo} (${seo >= seoThreshold ? 'PASS' : 'FAIL'})`);
//     console.log(`Best Practices: ${bestPractices}`);

//     rl.close();
//   });
// }

// main();


import readline from 'readline';
import { exec } from 'child_process';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

async function runAudit(url, thresholds) {
  if (!fs.existsSync('./reports')) {
    fs.mkdirSync('./reports');
  }

  const timestamp = Date.now();
  const outputPath = `./reports/report-${timestamp}.json`;

  console.log(`\nRunning Lighthouse on ${url}...`);

  const command = `lighthouse "${url}" --quiet --chrome-flags="--headless" --output json --output-path=${outputPath}`;

  exec(command, (error) => {
    if (error) {
      console.error(`Error running Lighthouse: ${error.message}`);
      return;
    }

    const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    const performance = report.categories.performance.score * 100;
    const accessibility = report.categories.accessibility.score * 100;
    const seo = report.categories.seo.score * 100;
    const bestPractices = report.categories['best-practices'].score * 100;

    console.log('\n=== Lighthouse Results ===');
    console.log(`Performance: ${performance} (${performance >= thresholds.perf ? 'PASS' : 'FAIL'})`);
    console.log(`Accessibility: ${accessibility} (${accessibility >= thresholds.acc ? 'PASS' : 'FAIL'})`);
    console.log(`SEO: ${seo} (${seo >= thresholds.seo ? 'PASS' : 'FAIL'})`);
    console.log(`Best Practices: ${bestPractices} (${bestPractices >= thresholds.best ? 'PASS' : 'FAIL'})`);
  });
}

async function main() {
  const mode = await ask('Choose mode: (1) Hardcoded URLs  (2) Enter URL manually: ');

  if (mode === '1') {
    // Hardcoded URLs
    const urls = [
      'https://tbcbank.ge/ka',
      'https://tbcbank.ge/ka/treasury-products',
      'https://tbcbank.ge/ka/retail',
      'https://tbcbank.ge/ka/corporate'
    ];

    const thresholds = {
      perf: 80,
      acc: 80,
      seo: 80,
      best: 80
    };

    for (const url of urls) {
      await runAudit(url, thresholds);
    }
    rl.close();

  } else {
    // Interactive URL
    let url = await ask('Enter website URL to audit: ');
    url = encodeURI(url); // encode special characters like &

    const perfThreshold = parseInt(await ask('Performance min score: '), 10);
    const accThreshold = parseInt(await ask('Accessibility min score: '), 10);
    const seoThreshold = parseInt(await ask('SEO min score: '), 10);
    const bestThreshold = parseInt(await ask('Best Practices min score: '), 10);

    const thresholds = {
      perf: perfThreshold,
      acc: accThreshold,
      seo: seoThreshold,
      best: bestThreshold
    };

    await runAudit(url, thresholds);
    rl.close();
  }
}

main();
