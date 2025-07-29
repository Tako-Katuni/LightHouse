package com.example;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.io.*;
import java.util.Arrays;
import java.util.List;

public class LighthousePlaywrightTest {

    private final List<String> urls = Arrays.asList(
            "https://tbcbank.ge/ka/treasury-products",
            "https://tbcbank.ge/ka",
            "https://tbcbank.ge/ka/loans"
    );

    @Test
    public void runLighthouseAudits() throws IOException, InterruptedException {
        for (String url : urls) {
            runAuditAndVerify(url);
        }
    }

    private void runAuditAndVerify(String url) throws IOException, InterruptedException {
        // Run Node script
        String command = String.format("node lighthouse-runner.js \"%s\"", url);
        Process process = Runtime.getRuntime().exec(command);

        // Capture script output (for debugging)
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            System.out.println("Node script exited with code: " + exitCode);
        }

        // Parse JSON report
        String reportName = url.replace("https://", "").replace("/", "_").replace(":", "_");
        File jsonFile = new File("lighthouse-reports/" + reportName + ".report.json");

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(jsonFile);

        double performance = root.path("categories").path("performance").path("score").asDouble() * 100;
        double accessibility = root.path("categories").path("accessibility").path("score").asDouble() * 100;
        double bestPractices = root.path("categories").path("best-practices").path("score").asDouble() * 100;
        double seo = root.path("categories").path("seo").path("score").asDouble() * 100;

        // Print results
        System.out.printf("Results for %s:%n", url);
        System.out.printf("Performance: %.1f%n", performance);
        System.out.printf("Accessibility: %.1f%n", accessibility);
    }
}