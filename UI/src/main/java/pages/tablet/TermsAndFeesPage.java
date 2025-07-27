package pages.tablet;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class TermsAndFeesPage {
    private final Page page;
    public final Locator forInDividualsRightArrow;
    public final Locator documentsHyperLink;


    public TermsAndFeesPage(Page page) {
        this.page = page;
        forInDividualsRightArrow = page.locator("//*[text()=\" For Individuals \"]/ancestor::tbcx-pw-section-title/following-sibling::*//*[text()=\"arrow-right-outlined\"]");
        documentsHyperLink = page.locator("//*[text()=\"Documents\"]/ancestor::a");
    }

    public Locator getForIndividualsCardByTitle(String title) {
        String dynamicPath = "//*[text()=\" For Individuals \"]/ancestor::tbcx-pw-section-title/following-sibling::*//*[text()=\"" + title + "\"]/ancestor::tbcx-pw-card";
        return page.locator(dynamicPath);
    }
    public final Locator getSubwindowHeadlineByText(String text) {
        String dynamicPath =  "tbcx-pw-container//*[text()=\"" + text + "\"]";
        return page.locator(dynamicPath);
    }
}
