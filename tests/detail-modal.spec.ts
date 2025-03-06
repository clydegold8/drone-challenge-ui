import { test, expect } from '@playwright/test';

test('Billboard detail component should have the right elements', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
    await page.getByRole('button', { name: 'Send Instructions' }).click();
    await page.getByRole('cell').filter({ hasText: /^$/ }).click();
    await page.locator('#billboard_detail_modal').click();
    await expect(page.getByRole('heading', { name: 'Billboard Details' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
});

test('Billboard detail component should be closed after clicking close btn', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
    await page.getByRole('button', { name: 'Send Instructions' }).click();
    await page.getByRole('cell').filter({ hasText: /^$/ }).click();
    await page.locator('#billboard_detail_modal').click();
    await expect(page.getByRole('heading', { name: 'Billboard Details' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('cell').filter({ hasText: /^$/ })).toBeVisible();
});
