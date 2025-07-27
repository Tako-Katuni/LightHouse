package resolutionTests;

import com.microsoft.playwright.*;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import steps.mobile.MobileBaseStep;
import steps.mobile.MobileDetailedOfferStep;
import steps.mobile.MobileOffersStep;

public class MobileResolutionTest {


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
    public void openTBCbankGeInMobileResolution() {
        new MobileBaseStep(page)
                .resizeToMobile()
                .openTBCBankGeInEnglish();
    }

    @Test(dependsOnMethods = {"openTBCbankGeInMobileResolution"})
    public void switchToGeorgianLanguage() {
        new MobileBaseStep(page)
                .openBurgerMenu()
                .switchToGeorgianLanguage();
    }

    @Test(dependsOnMethods = {"switchToGeorgianLanguage"})
    public void validateLanguageIsSetToGeorgian() {
        new MobileBaseStep(page)
                .openBurgerMenu()
                .validateLanguageIsSetToGeorgian();
    }

    @Test(dependsOnMethods = {"validateLanguageIsSetToGeorgian"})
    public void validateMobileModeAndClickOffers() {
        new MobileBaseStep(page)
                .validateBurgerMenuSubsectionsAreVertical()
                .clickOffersButtonInBurgerMenu();
    }

    @Test(dependsOnMethods = {"validateMobileModeAndClickOffers"})
    public void checkOutFirstOffer() {
        new MobileOffersStep(page)
                .saveFirstOfferData()
                .clickOnFirstOfferCard();
    }

    @Test(dependsOnMethods = {"checkOutFirstOffer"})
    public void validateOfferDetails() {
        new MobileDetailedOfferStep(page)
                .validateTitle()
                .validateDuration();
    }
}
