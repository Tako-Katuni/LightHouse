// // import readline from 'readline';
// // import { exec } from 'child_process';
// // import fs from 'fs';

// // const rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout
// // });

// // function ask(question) {
// //   return new Promise(resolve => rl.question(question, answer => resolve(answer)));
// // }

// // async function main() {
// //   const url = await ask('Enter website URL to audit: ');
// //   const perfThreshold = parseInt(await ask('Performance min score: '), 10);
// //   const accThreshold = parseInt(await ask('Accessibility min score: '), 10);
// //   const seoThreshold = parseInt(await ask('SEO min score: '), 10);

// //   if (!fs.existsSync('./reports')) {
// //     fs.mkdirSync('./reports');
// //   }

// //   const timestamp = Date.now();
// //   const outputPath = `./reports/report-${timestamp}.json`;

// //   console.log(`\nRunning Lighthouse on ${url}...`);

// //   const command = `lighthouse ${url} --quiet --chrome-flags="--headless" --output json --output-path=${outputPath}`;

// //   exec(command, (error) => {
// //     if (error) {
// //       console.error(`Error running Lighthouse: ${error.message}`);
// //       rl.close();
// //       return;
// //     }

// //     const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
// //     const performance = report.categories.performance.score * 100;
// //     const accessibility = report.categories.accessibility.score * 100;
// //     const seo = report.categories.seo.score * 100;
// //     const bestPractices = report.categories['best-practices'].score * 100;


// //     console.log('\n=== Lighthouse Results ===');
// //     console.log(`Performance: ${performance} (${performance >= perfThreshold ? 'PASS' : 'FAIL'})`);
// //     console.log(`Accessibility: ${accessibility} (${accessibility >= accThreshold ? 'PASS' : 'FAIL'})`);
// //     console.log(`SEO: ${seo} (${seo >= seoThreshold ? 'PASS' : 'FAIL'})`);
// //     console.log(`Best Practices: ${bestPractices}`);

// //     rl.close();
// //   });
// // }

// // main();


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

// async function runAudit(url, thresholds) {
//   if (!fs.existsSync('./reports')) {
//     fs.mkdirSync('./reports');
//   }

//   const timestamp = Date.now();
//   const outputPath = `./reports/report-${timestamp}.json`;

//   console.log(`\nRunning Lighthouse on ${url}...`);

//   const command = `lighthouse "${url}" --quiet --chrome-flags="--headless" --output json --output-path=${outputPath}`;

//   exec(command, (error) => {
//     if (error) {
//       console.error(`Error running Lighthouse: ${error.message}`);
//       return;
//     }

//     const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
//     const performance = report.categories.performance.score * 100;
//     const accessibility = report.categories.accessibility.score * 100;
//     const seo = report.categories.seo.score * 100;
//     const bestPractices = report.categories['best-practices'].score * 100;

//     console.log('\n=== Lighthouse Results ===');
//     console.log(`Performance: ${performance} (${performance >= thresholds.perf ? 'PASS' : 'FAIL'})`);
//     console.log(`Accessibility: ${accessibility} (${accessibility >= thresholds.acc ? 'PASS' : 'FAIL'})`);
//     console.log(`SEO: ${seo} (${seo >= thresholds.seo ? 'PASS' : 'FAIL'})`);
//     console.log(`Best Practices: ${bestPractices} (${bestPractices >= thresholds.best ? 'PASS' : 'FAIL'})`);
//   });
// }

// async function main() {
//   const mode = await ask('Choose mode: (1) Hardcoded URLs  (2) Enter URL manually: ');

//   if (mode === '1') {
//     // Hardcoded URLs
//     const urls = [
//       'https://tbcbank.ge/ka',
//       'https://tbcbank.ge/ka/treasury-products',
//       'https://tbcbank.ge/ka/retail',
//       'https://tbcbank.ge/ka/corporate'
//     ];

//     const thresholds = {
//       perf: 80,
//       acc: 80,
//       seo: 80,
//       best: 80
//     };

//     for (const url of urls) {
//       await runAudit(url, thresholds);
//     }
//     rl.close();

//   } else {
//     // Interactive URL
//     let url = await ask('Enter website URL to audit: ');
//     url = encodeURI(url); // encode special characters like &

//     const perfThreshold = parseInt(await ask('Performance min score: '), 10);
//     const accThreshold = parseInt(await ask('Accessibility min score: '), 10);
//     const seoThreshold = parseInt(await ask('SEO min score: '), 10);
//     const bestThreshold = parseInt(await ask('Best Practices min score: '), 10);

//     const thresholds = {
//       perf: perfThreshold,
//       acc: accThreshold,
//       seo: seoThreshold,
//       best: bestThreshold
//     };

//     await runAudit(url, thresholds);
//     rl.close();
//   }
// }

// main();
// //https://tbcbank.ge/ka
// //https://tbcbank.ge/ka/atms&branches
// //https://tbcbank.ge/ka/tbc-education/it-academy

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import open from 'open'; // npm install open

// Hardcoded URLs
const urls = [
  'https://tbcbank.ge/ka',
  'https://tbcbank.ge/ka/atms&branches',
  'https://tbcbank.ge/ka/tbc-education/it-academy'
];

// Fixed thresholds
const thresholds = {
  performance: 80,
  accessibility: 80,
  seo: 80,
  best: 80,
  pwa: 80
};

// Ensure reports folder exists
if (!fs.existsSync('./reports')) {
  fs.mkdirSync('./reports');
}

// Function to generate report per URL
function runAudit(url) {
  return new Promise((resolve) => {
    const timestamp = Date.now();
    const safeUrl = url.replace(/[^a-z0-9]/gi, '_'); // Safe filename
    const basePath = `./reports/report-${safeUrl}-${timestamp}`;
    const jsonPath = `${basePath}.report.json`;
    const htmlPath = `${basePath}.report.html`;
    const summaryPath = `./reports/summary-${safeUrl}-${timestamp}.html`;

    console.log(`\nRunning Lighthouse on ${url}...`);

    const command = `lighthouse "${url}" --quiet --chrome-flags="--headless" --output json --output html --output-path=${basePath}`;

    exec(command, async (error) => {
      if (error) {
        console.error(`Error running Lighthouse on ${url}: ${error.message}`);
        resolve();
        return;
      }

      // Parse JSON report
      const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const scores = {
        performance: report.categories.performance.score * 100,
        accessibility: report.categories.accessibility.score * 100,
        seo: report.categories.seo.score * 100,
        best: report.categories['best-practices'].score * 100,
        pwa: report.categories.pwa ? report.categories.pwa.score * 100 : 0
      };

      // Extract deep diagnostics
      const audits = report.audits;
      const opportunities = Object.values(audits).filter(a => a.details && a.details.type === 'opportunity');
      const diagnostics = Object.values(audits).filter(a => a.details && a.details.type === 'diagnostic');
      const failedAudits = Object.values(audits).filter(a => a.score !== null && a.score < 1);
      const passedAudits = Object.values(audits).filter(a => a.score === 1);

      // Build human-readable summary
      const summaryHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Lighthouse Summary Report</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    h1, h2, h3 { color: #333; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
    th { background: #f4f4f4; }
    .pass { color: green; font-weight: bold; }
    .fail { color: red; font-weight: bold; }
    .section { margin-top: 40px; }
  </style>
</head>
<body>
  <h1>Lighthouse Summary</h1>
  <p><strong>URL:</strong> ${report.requestedUrl}</p>
  <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>

  <table>
    <tr>
      <th>Metric</th>
      <th>Score</th>
      <th>Expected</th>
      <th>Status</th>
    </tr>
    ${Object.keys(scores).map(key => `
      <tr>
        <td>${key.charAt(0).toUpperCase() + key.slice(1)}</td>
        <td>${scores[key]}</td>
        <td>${thresholds[key]}</td>
        <td class="${scores[key] >= thresholds[key] ? 'pass' : 'fail'}">
          ${scores[key] >= thresholds[key] ? 'PASS' : 'FAIL'}
        </td>
      </tr>
    `).join('')}
  </table>

  <div class="section">
    <h2>Opportunities (Improvements)</h2>
    ${opportunities.length ? opportunities.map(o => `
      <p><strong>${o.title}</strong>: ${o.description || ''}</p>
    `).join('') : '<p>No major opportunities found.</p>'}
  </div>

  <div class="section">
    <h2>Diagnostics</h2>
    ${diagnostics.length ? diagnostics.map(d => `
      <p><strong>${d.title}</strong>: ${d.description || ''}</p>
    `).join('') : '<p>No diagnostics available.</p>'}
  </div>

  <div class="section">
    <h2>Failed Audits</h2>
    ${failedAudits.length ? failedAudits.map(f => `
      <p><strong>${f.title}</strong>: ${f.description || ''}</p>
    `).join('') : '<p>All audits passed 🎉</p>'}
  </div>

  <div class="section">
    <h2>Passed Audits</h2>
    ${passedAudits.length ? passedAudits.slice(0, 10).map(p => `
      <p>${p.title}</p>
    `).join('') + (passedAudits.length > 10 ? `<p>...and ${passedAudits.length - 10} more</p>` : '') : '<p>No passed audits.</p>'}
  </div>

  <div class="section">
    <h2>Full Lighthouse Report</h2>
    <p><a href="./report-${safeUrl}-${timestamp}.report.html" target="_blank">Open full report</a></p>
  </div>
</body>
</html>
`;

      fs.writeFileSync(summaryPath, summaryHtml);

      console.log(`Summary generated: ${summaryPath}`);
      await open(path.resolve(summaryPath));
      resolve();
    });
  });
}

// Run audits sequentially
(async () => {
  for (const url of urls) {
    await runAudit(url);
  }
})();
