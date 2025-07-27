package pages.tablet;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import pages.BasePage;

public class TabletHomepage extends BasePage {
    public final Locator headerLanguageChangeButton;
    public final Locator footerTermsAndFeesButton;


    public TabletHomepage(Page page) {
        super(page);
        headerLanguageChangeButton = page.locator("app-header tbcx-language-select");
        footerTermsAndFeesButton = page.locator("//*[text()=\"Personal\"]/ancestor::*/following-sibling::tbcx-pw-footer-sub-item//*[text()=\"Terms and Fees\"]");

    }
}



