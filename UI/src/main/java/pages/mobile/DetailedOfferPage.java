package pages.mobile;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import static data.Constants.Mobile.*;

import java.util.regex.Pattern;

public class DetailedOfferPage extends MobileBasePage{
    public final Locator detailedPageTitle;
    public final Locator detailedPageDuration;


    Pattern pattern = Pattern.compile(".*" + DURATION_TEXT + ".*", Pattern.CASE_INSENSITIVE);

    public DetailedOfferPage(Page page) {
        super(page);
        detailedPageTitle = page.locator("//h2");
        detailedPageDuration = page.getByText(pattern);
    }
}
