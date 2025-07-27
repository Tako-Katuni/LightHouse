package pages.mobile;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class MobileOffersPage extends MobileBasePage{
    public final Locator offerCards;

    public MobileOffersPage(Page page) {
        super(page);
        offerCards = page.locator("//tbcx-pw-card/tbcx-pw-link");
    }

    public Locator getOfferCardTitle(Locator offerCard) {
        return offerCard.locator("//h3");
    }

    public Locator getOfferCardDuration(Locator offerCard) {
        return offerCard.locator("//tbcx-icon/following-sibling::div");
    }
}


