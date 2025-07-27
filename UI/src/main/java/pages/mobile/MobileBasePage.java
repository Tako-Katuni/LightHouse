package pages.mobile;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import pages.BasePage;

public class MobileBasePage extends BasePage {

    public final Locator burgerMenuSwitchToGeorgianButton;
    public final Locator burgerMenuSwitchToEnglishButton;

    public final Locator burgerMenuSubgroupButtons;
    public final Locator offersButtonInGeorgian;
    public final Locator burgerMenuButton;


    public MobileBasePage(Page page) {
        super(page);
        burgerMenuSwitchToGeorgianButton = page.locator("//tbcx-pw-mega-menu-bottom//*[text()=\" ქარ \"]");
        burgerMenuSwitchToEnglishButton = page.locator("//tbcx-pw-mega-menu-bottom//*[text()=\" EN \"]");

        burgerMenuSubgroupButtons = page.locator("tbcx-pw-mega-menu-sub-group");
        offersButtonInGeorgian = page.locator("//a[@href=\"/ka/offers\"]");
        burgerMenuButton = page.locator("//tbcx-pw-hamburger-menu/div/button");
    }


}
