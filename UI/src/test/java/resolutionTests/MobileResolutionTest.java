package resolutionTests;

import com.microsoft.playwright.*;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;

public class MobileResolutionTest {


    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;

    @BeforeClass
    public void setUp() {
        playwright = Playwright.create();
        BrowserType.LaunchOptions options = new BrowserType.LaunchOptions();
        options.setHeadless(false); // ეს წასაშლელია, არ დაგრჩეს
        options.setSlowMo(2000);
        browser = playwright.chromium().launch(options);
        context = browser.newContext();
        page = context.newPage();
    }

    @AfterClass
    public void tearDown() {
        browser.close();
        playwright.close();
    }
}
