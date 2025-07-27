package steps;

import com.microsoft.playwright.Page;
import pages.BasePage;

public class BaseStep {
    private final Page page;
    private final BasePage basePage;

    public BaseStep(Page page) {
        this.page = page;
        this.basePage = new BasePage(page);
    }

    public BaseStep openTBCBankGeInGeorgian() {
        page.navigate("https://tbcbank.ge/ka");
        return this;
    }

    public BaseStep openTBCBankGeInEnglish() {
        page.navigate("https://tbcbank.ge/en");
        return this;
    }
}
