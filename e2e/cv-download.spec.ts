import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe('CV Download Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://192.168.1.82:4201/');
    await page.waitForLoadState('networkidle');
  });

  test('should download CV in English when EN button is clicked', async ({ page }) => {
    // Start waiting for download before clicking
    const downloadPromise = page.waitForEvent('download');

    // Find and click the English CV download button (force click as it might be at bottom of sidebar)
    const enButton = page.locator('button[aria-label="Download CV in English"]');
    await enButton.scrollIntoViewIfNeeded();
    await enButton.click({ force: true });

    // Wait for the download
    const download = await downloadPromise;

    // Verify the filename contains "EN" and "Mafal_Gai"
    const filename = download.suggestedFilename();
    expect(filename).toContain('CV_Mafal_Gai_EN');
    expect(filename).toMatch(/\.pdf$/);

    console.log(`Downloaded EN CV: ${filename}`);
  });

  test('should download CV in French when FR button is clicked', async ({ page }) => {
    // Start waiting for download before clicking
    const downloadPromise = page.waitForEvent('download');

    // Find and click the French CV download button (force click as it might be at bottom of sidebar)
    const frButton = page.locator('button[aria-label="Download CV in French"]');
    await frButton.scrollIntoViewIfNeeded();
    await frButton.click({ force: true });

    // Wait for the download
    const download = await downloadPromise;

    // Verify the filename contains "FR" and "Mafal_Gai"
    const filename = download.suggestedFilename();
    expect(filename).toContain('CV_Mafal_Gai_FR');
    expect(filename).toMatch(/\.pdf$/);

    console.log(`Downloaded FR CV: ${filename}`);
  });

  test('should verify cv-printable element exists but is hidden', async ({ page }) => {
    // Check that the cv-printable container exists
    const cvPrintable = page.locator('#cv-printable');
    await expect(cvPrintable).toBeAttached();

    // Verify it's positioned off-screen (hidden)
    const boundingBox = await cvPrintable.boundingBox();
    expect(boundingBox).toBeTruthy();

    // The element should be far left off-screen
    if (boundingBox) {
      expect(boundingBox.x).toBeLessThan(0);
    }

    console.log('CV printable element is correctly hidden off-screen');
  });

  test('should verify CV content structure', async ({ page }) => {
    // Verify the printable CV contains expected sections
    const cvContainer = page.locator('#cv-printable .cv-container');
    await expect(cvContainer).toBeAttached();

    // Check for header section
    const header = cvContainer.locator('.cv-header');
    await expect(header).toBeAttached();

    // Check for photo placeholder
    const photoPlaceholder = header.locator('.cv-photo-placeholder');
    await expect(photoPlaceholder).toBeAttached();

    // Check for personal info
    const personalInfo = header.locator('.cv-personal-info');
    await expect(personalInfo).toBeAttached();

    // Check for name
    const name = personalInfo.locator('.cv-name');
    await expect(name).toHaveText('Mafal Gai');

    // Check for sections (About, Experience, Education)
    const sections = cvContainer.locator('.cv-section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBe(3); // About, Experience, Education

    console.log('CV structure verified successfully');
  });
});
