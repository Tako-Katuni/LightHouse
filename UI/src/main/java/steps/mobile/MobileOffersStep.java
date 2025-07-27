package steps.mobile;

import POJO.OfferCard;
import com.microsoft.playwright.Page;
import pages.mobile.MobileOffersPage;

public class MobileOffersStep {
    private MobileOffersPage mobileOffersPage;
    private static OfferCard savedCard;

    static OfferCard getSavedCard() {
        return savedCard;
    }

    public MobileOffersStep(Page page) {
        this.mobileOffersPage = new MobileOffersPage(page);
    }

    public MobileOffersStep saveFirstOfferData(){
        mobileOffersPage.offerCards.first().scrollIntoViewIfNeeded();
        String title = mobileOffersPage.getOfferCardTitle(mobileOffersPage.offerCards.first()).textContent();
        String duration = mobileOffersPage.getOfferCardDuration(mobileOffersPage.offerCards.first()).textContent();
        savedCard = new OfferCard(title, duration);
        return this;
    }

    public MobileOffersStep clickOnFirstOfferCard() {
        mobileOffersPage.offerCards.first().click();
        return this;
    }

}
