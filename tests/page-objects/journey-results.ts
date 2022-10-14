import { Locator, Page } from "@playwright/test";

export class JourneyResultsPanel {
    readonly page: Page;
    readonly from: Locator;
    readonly to: Locator;
    readonly timeBoxes;

    constructor(page: Page) {
        this.page = page;
        this.from = page.locator('.summary-row',{ hasText: 'From:'});
        this.to = page.locator('.summary-row',{ hasText: 'To:'})
        this.timeBoxes = page.locator(".journey-option .time-box:visible");
    }

}