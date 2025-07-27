package steps.tablet;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import pages.tablet.TermsAndFeesPage;

import java.util.regex.Pattern;

import static data.Constants.Tablet.*;

public class TermsAndFeesStep {
    Page page;
    private final TermsAndFeesPage termsAndFeesPage;

    public TermsAndFeesStep(Page page) {
        this.termsAndFeesPage = new TermsAndFeesPage(page);
        this.page = page;
    }

    public TermsAndFeesStep clickRightArrowUntilDesiredCard() {
        while (!termsAndFeesPage.getForIndividualsCardByTitle(OPENING_ACCOUNT_FOR_NON_GEORGIAN).isVisible()) {
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
                termsAndFeesPage.getSubwindowHeadlineByText(OPENING_ACCOUNT_FOR_NON_GEORGIAN)
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
        Pattern pattern = Pattern.compile(".*" + Pattern.quote(DOCUMENTS_URL_BASE) + ".*");
        PlaywrightAssertions.assertThat(page).hasURL(pattern);
        return this;
    }

}
