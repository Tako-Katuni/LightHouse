package steps.tablet;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import org.testng.Assert;
import pages.tablet.TermsAndFeesPage;


import java.util.regex.Pattern;

import static data.Constants.Tablet.*;

public class TermsAndFeesStep extends TabletBaseStep {
    Page page;
    private final TermsAndFeesPage termsAndFeesPage;

    public TermsAndFeesStep(Page page) {
        super(page);
        this.termsAndFeesPage = new TermsAndFeesPage(page);
        this.page = page;
    }

    public TermsAndFeesStep clickRightArrowUntilDesiredCard() {
        if(!termsAndFeesPage.getForIndividualsCardByTitle(OPENING_ACCOUNT_FOR_NON_GEORGIAN).first().isVisible()) {
            while (!termsAndFeesPage.getForIndividualsCardByTitle(OPENING_ACCOUNT_FOR_NON_GEORGIAN).first().isVisible()) {
                termsAndFeesPage.forIndividualsRightArrow.click();
            }
        } else{
            termsAndFeesPage.forIndividualsRightArrow.click();
            termsAndFeesPage.forIndividualsRightArrow.click();
        }
        return this;
    }

    public TermsAndFeesStep openDesiredCard() {
        clickForIndividualsCardByTitle(OPENING_ACCOUNT_FOR_NON_GEORGIAN);
        return this;
    }

    public TermsAndFeesStep validateSubwindowHeadline() {
        PlaywrightAssertions.assertThat(
                termsAndFeesPage.getSubwindowHeadlineByText(OPENING_ACCOUNT_FOR_NON_GEORGIAN).first()
        ).isVisible();
        return this;
    }

    public TermsAndFeesStep clickDocumentsHyperLink() {
        termsAndFeesPage.documentsHyperLink.click();
        return this;
    }

    public void clickForIndividualsRightArrow() {
        termsAndFeesPage.forIndividualsRightArrow.click();
    }

    public void clickForIndividualsCardByTitle(String title) {
        termsAndFeesPage.getForIndividualsCardByTitle(title).click();
    }

    public TermsAndFeesStep validateURL() {
        String URL = page.url();
        Assert.assertTrue(URL.contains(DOCUMENTS_URL_BASE));
        return this;
    }

}
