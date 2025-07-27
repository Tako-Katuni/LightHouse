package steps.mobile;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import pages.mobile.DetailedOfferPage;

public class MobileDetailedOfferStep {

    private DetailedOfferPage detailedOfferPage;

    public MobileDetailedOfferStep(Page page) {
        this.detailedOfferPage = new DetailedOfferPage(page);
    }

    public MobileDetailedOfferStep validateTitle() {
        PlaywrightAssertions.assertThat(detailedOfferPage.detailedPageTitle).isVisible();
        PlaywrightAssertions.assertThat(detailedOfferPage.detailedPageTitle).hasText(MobileOffersStep.getSavedCard().getTitle());
        return this;
    }

    public MobileDetailedOfferStep validateDuration() {
        PlaywrightAssertions.assertThat(detailedOfferPage.detailedPageDuration).isVisible();
        PlaywrightAssertions.assertThat(detailedOfferPage.detailedPageDuration.first()).hasText(MobileOffersStep.getSavedCard().getDuration());
        return this;
    }
}
