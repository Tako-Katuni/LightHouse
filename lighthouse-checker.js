import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import open from 'open';

// Hardcoded URLs
const urls = [
  'https://tbcbank.ge/ka',
  'https://tbcbank.ge/ka/atms&branches',
  'https://tbcbank.ge/ka/tbc-education/it-academy'
];

// Fixed validations
const thresholds = {
  performance: 80,
  accessibility: 80,
  seo: 90,
  best: 90
};

// Reports Folder
if (!fs.existsSync('./reports')) {
  fs.mkdirSync('./reports');
}

// Generating report for each URL
function runAudit(url) {
  return new Promise((resolve) => {
    const timestamp = Date.now();
    const safeUrl = url.replace(/[^a-z0-9]/gi, '_'); // Safe filename
    const basePath = `./reports/report-${safeUrl}-${timestamp}`;
    const jsonPath = `${basePath}.report.json`;
    const htmlPath = `${basePath}.report.html`;
    const summaryPath = `./reports/summary-${safeUrl}-${timestamp}.html`;

    console.log(`\nRunning Lighthouse on ${url}...`);
// Detect mode
const isDesktop = process.argv.includes('--desktop');
const isMobile = process.argv.includes('--mobile');

// Decide extra flags
const extraFlags = isDesktop
  ? '--form-factor=desktop --screen-emulation.disabled --throttling.cpuSlowdownMultiplier=1 --throttling-method=provided'
  : '--form-factor=mobile';

// Use in command
const command = `lighthouse "${url}" \
  --quiet \
  --chrome-flags="--headless" \
  --output json \
  --output html \
  --output-path=${basePath} \
  --form-factor=desktop \
  --screen-emulation.disabled \
  --throttling.cpuSlowdownMultiplier=1 \
  --throttling-method=provided`;



    exec(command, async (error) => {
      if (error) {
        console.error(`Error running Lighthouse on ${url}: ${error.message}`);
        resolve();
        return;
      }

      // Parse JSON for the main metrics
      const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const scores = {
        performance: report.categories.performance.score * 100,
        accessibility: report.categories.accessibility.score * 100,
        seo: report.categories.seo.score * 100,
        best: report.categories['best-practices'].score * 100
      };

      // Extract all other info
      const audits = report.audits;
      const opportunities = Object.values(audits).filter(a => a.details && a.details.type === 'opportunity');
      const diagnostics = Object.values(audits).filter(a => a.details && a.details.type === 'diagnostic');
      const failedAudits = Object.values(audits).filter(a => a.score !== null && a.score < 1);
      const passedAudits = Object.values(audits).filter(a => a.score === 1);

      // human-readable summary
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

// Launch each URL seperately
(async () => {
  for (const url of urls) {
    await runAudit(url);
  }
})();
