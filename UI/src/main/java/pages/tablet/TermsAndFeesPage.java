package pages.tablet;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class TermsAndFeesPage extends TabletBasePage {
    private final Page page;
    public final Locator forIndividualsRightArrow;
    public final Locator documentsHyperLink;


    public TermsAndFeesPage(Page page) {
        super(page);
        this.page = page;
        forIndividualsRightArrow = page.locator("//*[text()=\" For Individuals \"]/ancestor::tbcx-pw-section-title/following-sibling::*//*[text()=\"arrow-right-outlined\"]");
        documentsHyperLink = page.locator("//*[text()=\"Documents\"]/ancestor::a");
    }

    public Locator getForIndividualsCardByTitle(String title) {
        String dynamicPath = "//*[text()=\" For Individuals \"]/ancestor::tbcx-pw-section-title/following-sibling::*//*[text()=\"" + title + "\"]/ancestor::tbcx-pw-card";
        return page.locator(dynamicPath);
    }
    public final Locator getSubwindowHeadlineByText(String text) {
        String dynamicPath =  "//tbcx-pw-container//*[text()=\"" + text + "\"]";
        return page.locator(dynamicPath);
    }
}
