package pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class BasePage {
    public final Locator searchButton;
    public final Locator searchField;


    public BasePage(Page page){
        searchButton = page.locator("button.tbcx-pw-search__button");
        searchField = page.locator("#tbcx-text-input-4");
    }
}
