// import { exec } from 'child_process';
// import fs from 'fs';

// // Ensure reports folder exists
// if (!fs.existsSync('./reports')) {
//   fs.mkdirSync('./reports');
// }

// const url = process.argv[2] || 'https://example.com';
// const timestamp = Date.now();
// const outputPath = `./reports/report-${timestamp}.json`;

// console.log(`Running Lighthouse audit on: ${url}`);
// console.log(`Report will be saved to: ${outputPath}`);

// const command = `lighthouse ${url} --quiet --chrome-flags="--headless" --output json --output-path=${outputPath}`;

// exec(command, (error) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   console.log(`Lighthouse report generated: ${outputPath}`);
// });

import { exec } from 'child_process';
import fs from 'fs';

// Ensure reports folder exists
if (!fs.existsSync('./reports')) {
  fs.mkdirSync('./reports');
}

// Hardcoded URLs
const urls = [
  'https://tbcbank.ge/ka',
  'https://tbcbank.ge/ka/treasury-products',
  'https://tbcbank.ge/ka/retail',
  'https://tbcbank.ge/ka/corporate'
];

urls.forEach((url, index) => {
  const timestamp = Date.now();
  const outputPath = `./reports/report-${timestamp}-${index + 1}.json`;

  console.log(`Running Lighthouse audit on: ${url}`);
  console.log(`Saving to: ${outputPath}`);

  const command = `lighthouse ${url} --quiet --chrome-flags="--headless" --output json --output-path=${outputPath}`;

  exec(command, (error) => {
    if (error) {
      console.error(`Error on ${url}: ${error.message}`);
      return;
    }
    console.log(`Report generated: ${outputPath}`);
  });
});
