import { test, expect } from '@playwright/test';
import { JourneyResultsPanel } from './page-objects/journey-results';
import { PlanJourneyForm } from './page-objects/plan-journey-form';

let planJourneyForm : PlanJourneyForm;
let journeyResults : JourneyResultsPanel;

test.beforeEach(
    async ({ page }) => {
        planJourneyForm = new PlanJourneyForm(page);
        journeyResults = new JourneyResultsPanel(page);
        await planJourneyForm.open();
    }
);

test('Should be able to plan a journey between two stations',
    async ({ page }) => {
        await planJourneyForm.from('Paddington Station')
        await planJourneyForm.to('Oxford Circus')
        await planJourneyForm.planMyJourney();

        await expect(journeyResults.from).toContainText('Paddington Station');
        await expect(journeyResults.to).toContainText('Oxford Circus');
                
        await expect(page.locator(".journey-option").locator(".time-box:visible").first())
                         .toHaveText(/Depart at:.*Arrive at:.*/, { timeout: 10000 });
    }
);

test('Should show matching departure stations on the same line',
    async ({ page }) => {
        await planJourneyForm.from('Canary Wharf')
        await planJourneyForm.to('Bank')
        await planJourneyForm.planMyJourney();
    }
);

test('I should be able to add a single todo item', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/vue');

    // Create 1st todo.
    await page.locator('[placeholder="What needs to be done?"]').fill('feed the cat');
    await page.locator('[placeholder="What needs to be done?"]').press('Enter');

    // Make sure the list only has one todo item.
    await expect(page.locator('.todo label')).toHaveText(['feed the cat']);

}
);
