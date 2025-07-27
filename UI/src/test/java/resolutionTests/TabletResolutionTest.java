package resolutionTests;

import com.microsoft.playwright.*;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import steps.tablet.TabletBaseStep;
import steps.tablet.TermsAndFeesStep;

public class TabletResolutionTest {


    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;

    @BeforeClass
    public void setUp() {
        playwright = Playwright.create();
        BrowserType.LaunchOptions options = new BrowserType.LaunchOptions();
        options.setHeadless(true);
//        options.setSlowMo(2000);
        browser = playwright.chromium().launch(options);
        context = browser.newContext();
        page = context.newPage();
    }

    @AfterClass
    public void tearDown() {
        browser.close();
        playwright.close();
    }

    @Test
    public void openWebpageInTabletResolution(){
        new TabletBaseStep(page)
                .resizeToTablet()
                .openTBCBankGeInGeorgian();
    }

    @Test(dependsOnMethods = {"openWebpageInTabletResolution"})
    public void changeLanguageToEnglish(){
        new TabletBaseStep(page)
                .changeLanguage()
                .validateLanguageIsSetToEnglish();
    }

    @Test(dependsOnMethods = {"changeLanguageToEnglish"})
    public void navigateToTermsAndFeesPage(){
        new TabletBaseStep(page)
                .validateTermsAndFeesButton()
                .clickTemsAndFeesButton();
    }

    @Test(dependsOnMethods = {"navigateToTermsAndFeesPage"})
    public void findDesiredCard(){
        new TermsAndFeesStep(page)
                .clickRightArrowUntilDesiredCard()
                .openDesiredCard()
                .validateSubwindowHeadline();
    }

    @Test(dependsOnMethods = {"findDesiredCard"})
    public void validateDocumentHyperlink(){
        new TermsAndFeesStep(page)
                .validateURL()
                .clickDocumentsHyperLink();

    }

}
