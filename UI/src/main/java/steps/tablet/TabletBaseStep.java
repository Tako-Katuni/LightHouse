package steps.tablet;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import pages.tablet.TabletBasePage;
import steps.BaseStep;

import static data.Constants.Tablet.*;

public class TabletBaseStep extends BaseStep {

    private final Page page;
    private final TabletBasePage tabletBasePage;

    public TabletBaseStep(Page page) {
        super(page);
        this.page = page;
        this.tabletBasePage = new TabletBasePage(page);
    }

    public TabletBaseStep changeLanguage() {
        tabletBasePage.headerLanguageChangeButton.click();
        return this;
    }

    public TabletBaseStep validateLanguageIsSetToEnglish() {
            PlaywrightAssertions
                    .assertThat(
                            tabletBasePage.getSubelementWithText(tabletBasePage.headerLanguageChangeButton, GEORGIAN_LANGUAGE_BUTTON_TEXT))
                    .isVisible();
        return this;
    }

    public TabletBaseStep validateTermsAndFeesButton(){
        PlaywrightAssertions
                .assertThat(
                        tabletBasePage.footerTermsAndFeesButton)
                .isVisible();
        return this;
    }

    public TabletBaseStep clickTemsAndFeesButton() {
        tabletBasePage.footerTermsAndFeesButton.click();
        return this;
    }

    public TabletBaseStep resizeToTablet(){
        page.setViewportSize(1024,1366);
        page.evaluate("window.resizeTo(1024, 1366);");
        return this;
    }






}
