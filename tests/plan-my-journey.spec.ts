import { test, expect } from '@playwright/test';
import { PlanJourneyForm } from './plan-journey-form';

let planJourneyForm : PlanJourneyForm;

test.beforeEach(
    async ({ page }) => {
        planJourneyForm = new PlanJourneyForm(page);
        await planJourneyForm.open();
    }
);

test('Should show matching departure stations',
    async ({ page }) => {
        await planJourneyForm.from('Paddington Station')
        await planJourneyForm.to('Oxford Circus')
        await planJourneyForm.planMyJourney();
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
