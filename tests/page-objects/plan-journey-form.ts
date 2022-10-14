import { expect, Locator, Page } from "@playwright/test";

export class PlanJourneyForm {
    readonly page: Page;
    readonly acceptCookiesButton : Locator;
    readonly cookiesDoneButton : Locator;
    readonly fromStation : Locator;
    readonly toStation: Locator;
    readonly stops: Locator;
    readonly planMyJourneyButton : Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptCookiesButton = page.locator("button:has-text('Accept all cookies')");
        this.cookiesDoneButton = page.locator('#cb-confirmedSettings button:has-text("Done")');
        this.fromStation = page.locator('#InputFrom');
        this.toStation = page.locator('#InputTo');
        this.stops = page.locator('.stop-name')
        this.planMyJourneyButton = page.locator('#plan-journey-button')
    }

    async open() {
        await this.page.goto('https://tfl.gov.uk/');
        expect(await this.title()).toContain('Keeping London moving');

        await this.acceptCookiesButton.click();
        await expect(this.acceptCookiesButton).toBeHidden();
        await this.cookiesDoneButton.click();
    }

    async title(): Promise<string> {
        return this.page.title();
    }

    async to(station: string) {
        await this.toStation.click();
        await this.toStation.fill(station);
        await this.stopWithName(station).first().click();
    }

    async from(station: string) {
        await this.fromStation.click();
        await this.fromStation.fill(station);
        await this.stopWithName(station).first().click();
    }

    private stopWithName(station: string) {
        return this.page.locator(`.stop-name:has-text('${station}')`);
    }

    async planMyJourney() {
        await this.planMyJourneyButton.click();
    }
}