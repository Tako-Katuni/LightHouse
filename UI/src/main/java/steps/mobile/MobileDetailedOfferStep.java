package steps.mobile;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import pages.mobile.DetailedOfferPage;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MobileDetailedOfferStep extends MobileBaseStep{

    private DetailedOfferPage detailedOfferPage;

    public MobileDetailedOfferStep(Page page) {
        super(page);
        this.detailedOfferPage = new DetailedOfferPage(page);
    }

    public MobileDetailedOfferStep validateTitle() {
        PlaywrightAssertions.assertThat(detailedOfferPage.detailedPageTitle).isVisible();
        PlaywrightAssertions.assertThat(detailedOfferPage.detailedPageTitle).hasText(MobileOffersStep.getSavedCard().getTitle());
        return this;
    }

    public MobileDetailedOfferStep validateDuration() {
        // Extracting the number from saved card's duration text
        String savedDurationText = MobileOffersStep.getSavedCard().getDuration();
        Matcher matcher = Pattern.compile("\\d+").matcher(savedDurationText);
        String durationValue = matcher.find() ? matcher.group() : null;

        if (durationValue == null) {
            throw new AssertionError("No numeric duration found in: " + savedDurationText);
        }

        //Building a flexible pattern using the extracted number
        Pattern durationPattern = Pattern.compile("დარჩენილი დღეები\\s*[-:]?\\s*" + durationValue, Pattern.CASE_INSENSITIVE);

        PlaywrightAssertions.assertThat(detailedOfferPage.detailedPageDuration.first()).hasText(durationPattern);
        return this;
    }
}
