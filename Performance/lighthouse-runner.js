import { chromium } from 'playwright';
import { playAudit } from 'playwright-lighthouse';
import fs from 'fs';

const args = process.argv.slice(2);
const url = args[0];

if (!url) {
    console.error("No URL provided to lighthouse-runner.js");
    process.exit(1);
}

const reportsDir = 'lighthouse-reports';
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
}

(async () => {
    try {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'load', timeout: 60000 });

        const reportName = url.replace(/https?:\/\//, '').replace(/[\/:]/g, '_');

        await playAudit({
            page,
            thresholds: {},
            reports: {
                formats: { html: true, json: true },
                name: reportName,
                directory: reportsDir
            }
        });

        console.log(`Lighthouse audit completed. Report: ${reportsDir}/${reportName}.report.json`);
        await browser.close();
        process.exit(0);
    } catch (err) {
        console.error("Lighthouse script error:", err);
        process.exit(1);
    }
})();
