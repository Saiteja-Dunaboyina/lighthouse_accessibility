import { test, expect } from '@playwright/test';
import playwright from "playwright-core";
import { runAudit } from '../utils/audit.js';


let browser,context,page;

test.beforeAll("SetUp", async () => {
  browser = await playwright["chromium"].launch({
    args: ["--remote-debugging-port=9223"],
  });
  context = await browser.newContext();
  page = await context.newPage();
});

test('Accessibility Testing on Amazon Home Page', async () => {
  await page.goto("https://www.amazon.in/");
  await page.waitForTimeout(3000);
  await runAudit(page,"lighthouse_report_amazon_homepage");
});

test('Accessibility Testing on Amazon Signin Page' , async () => {
  await page.goto("https://www.amazon.in/");
  await page.locator("//a[@id='nav-link-accountList']").click();
  await runAudit(page,"lighthouse_report_amazon_signinpage");
});

test('Accessibility Testing on Amazon Create Account Page' , async () => {
  await page.goto("https://www.amazon.in/");
  await page.locator("//a[@id='nav-link-accountList']").click();
  await page.locator("//a[@id='createAccountSubmit']").click();
  await runAudit(page,"lighthouse_report_amazon_createaccountpage");
})

test.afterAll("Teardown", async () => {
  await page.close();
  await context.close();
  await browser.close();
});
