package steps.mobile;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import org.testng.Assert;
import pages.mobile.MobileBasePage;
import steps.BaseStep;

import java.util.List;

public class MobileBaseStep extends BaseStep {
    private Page page;
    private MobileBasePage mobileBasePage;

    public MobileBaseStep(Page page) {
        super(page);
        this.page = page;
        this.mobileBasePage = new MobileBasePage(page);
    }


    public MobileBaseStep openBurgerMenu() {
        PlaywrightAssertions.assertThat(mobileBasePage.burgerMenuButton).isVisible();
        mobileBasePage.burgerMenuButton.click();
        return this;
    }

    public MobileBaseStep switchToGeorgianLanguage() {
        PlaywrightAssertions.assertThat(mobileBasePage.burgerMenuSwitchToGeorgianButton).isVisible();
        mobileBasePage.burgerMenuSwitchToGeorgianButton.click();
        return this;
    }

    public MobileBaseStep clickOffersButton() {
        PlaywrightAssertions.assertThat(mobileBasePage.offersButtonInGeorgian).isVisible();
        mobileBasePage.offersButtonInGeorgian.click();
        return this;
    }

    public MobileBaseStep validateLanguageIsSetToGeorgian() {
        PlaywrightAssertions.assertThat(mobileBasePage.burgerMenuSwitchToEnglishButton).isVisible();
        return this;
    }

    public MobileBaseStep validateBurgerMenuSubsectionsAreVertical(){
        PlaywrightAssertions.assertThat(mobileBasePage.burgerMenuSubgroupButtons).isVisible();
        List<Locator>subsections = mobileBasePage.burgerMenuSubgroupButtons.all();
        for (int i = 0; i < subsections.size()-1; i++) {
            Locator subsection1 = subsections.get(i);
            Locator subsection2 = subsections.get(i + 1);
            int first = subsection1.boundingBox() != null ? (int) subsection1.boundingBox().y : 0;
            int second = subsection2.boundingBox() != null ? (int) subsection2.boundingBox().y : 0;
            Assert.assertTrue(first != second, "Subsections are not vertical");
            }
        return this;
    }

    public MobileBaseStep clickOffersButtonInBurgerMenu() {
        PlaywrightAssertions.assertThat(mobileBasePage.offersButtonInGeorgian).isVisible();
        mobileBasePage.offersButtonInGeorgian.click();
        return this;
    }

    public MobileBaseStep resizeToMobile(){
        page.setViewportSize(360,720);
        page.evaluate("window.resizeTo(360, 720);");
        return this;
    }
}

