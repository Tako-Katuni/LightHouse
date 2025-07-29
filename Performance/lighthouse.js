module.exports = {
    ci: {
        collect: {
            url: [
                "https://www.tbcbank.ge/web/ka/web/guest/personal",
                "https://www.tbcbank.ge/web/ka/web/guest/business",
                "https://www.tbcbank.ge/web/ka/web/guest/premium"
            ],
            startServerCommand: "mvn test -Dtest=LighthousePlaywrightTest",
            numberOfRuns: 3,
            settings: {
                onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
            }
        },
        assert: {
            assertions: {
                "categories:performance": ["error", { minScore: 0.9 }],
                "categories:accessibility": ["error", { minScore: 0.9 }],
                "categories:best-practices": ["error", { minScore: 0.9 }],
                "categories:seo": ["error", { minScore: 0.9 }]
            }
        },
        upload: {
            target: "temporary-public-storage",
            outputDir: "./lighthouse-results"
        }
    }
};