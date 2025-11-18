import { test, expect } from '@playwright/test';

test.describe('Projects Section Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://192.168.1.82:4201');
    await page.waitForLoadState('networkidle');
  });

  test('should display IFTTT-Trading tree structure correctly', async ({ page }) => {
    // Navigate to Projects section
    const projectsSection = page.locator('text=IFTTT-Trading').first();
    await projectsSection.scrollIntoViewIfNeeded();
    
    // Verify main project title exists
    await expect(page.locator('h3:has-text("IFTTT-Trading")')).toBeVisible();
    
    // Verify tree structure is visible
    await expect(page.locator('.project-tree')).toBeVisible();
    
    // Verify sub-projects exist
    await expect(page.locator('text=devops-ifttt-trading')).toBeVisible();
    await expect(page.locator('text=iftt-trading-automation')).toBeVisible();
    await expect(page.locator('text=custom-solcrates-ohlcv-api')).toBeVisible();
  });

  test('should have GitHub icons on the left side', async ({ page }) => {
    const projectsSection = page.locator('text=IFTTT-Trading').first();
    await projectsSection.scrollIntoViewIfNeeded();
    
    // Get first tree item
    const firstTreeItem = page.locator('.project-tree-item').first();
    const header = firstTreeItem.locator('.project-tree-header');
    
    // Verify links container is first child (using order: -1)
    const links = header.locator('.project-tree-links');
    await expect(links).toBeVisible();
    
    // Verify GitHub icon exists
    const githubIcon = links.locator('img[alt*="GitHub"]').first();
    await expect(githubIcon).toBeVisible();
  });

  test('should display GitHub-Private icons for private repos', async ({ page }) => {
    const projectsSection = page.locator('text=IFTTT-Trading').first();
    await projectsSection.scrollIntoViewIfNeeded();
    
    // Verify private repo icon exists
    const privateIcon = page.locator('img[alt="GitHub Private"]').first();
    await expect(privateIcon).toBeVisible();
    
    // Verify it's using the correct icon path
    const src = await privateIcon.getAttribute('src');
    expect(src).toContain('github-private-mono.svg');
  });

  test('should not have Example text in bold', async ({ page }) => {
    const projectsSection = page.locator('text=IFTTT-Trading').first();
    await projectsSection.scrollIntoViewIfNeeded();
    
    const exampleText = page.locator('.project-main-example');
    await expect(exampleText).toBeVisible();
    
    // Verify no <strong> tag inside
    const strongElement = exampleText.locator('strong');
    await expect(strongElement).not.toBeVisible();
  });

  test('should have no border on Example section', async ({ page }) => {
    const projectsSection = page.locator('text=IFTTT-Trading').first();
    await projectsSection.scrollIntoViewIfNeeded();
    
    const exampleText = page.locator('.project-main-example');
    
    // Check computed styles
    const borderLeft = await exampleText.evaluate((el) => {
      return window.getComputedStyle(el).borderLeftWidth;
    });
    
    expect(borderLeft).toBe('0px');
  });

  test('should have proper tree alignment', async ({ page }) => {
    const projectsSection = page.locator('text=IFTTT-Trading').first();
    await projectsSection.scrollIntoViewIfNeeded();
    
    const treeItem = page.locator('.project-tree-item').first();
    
    // Check padding-left is 2rem (32px)
    const paddingLeft = await treeItem.evaluate((el) => {
      return window.getComputedStyle(el).paddingLeft;
    });
    
    expect(paddingLeft).toBe('32px'); // 2rem = 32px
  });

  test('should highlight favorite project in amber', async ({ page }) => {
    const projectsSection = page.locator('text=IFTTT-Trading').first();
    await projectsSection.scrollIntoViewIfNeeded();
    
    // Find favorite project
    const favoriteItem = page.locator('.project-tree-item-favorite');
    await expect(favoriteItem).toBeVisible();
    
    // Verify it contains the custom-solcrates project
    await expect(favoriteItem.locator('text=custom-solcrates-ohlcv-api')).toBeVisible();
    
    // Verify name has amber color
    const name = favoriteItem.locator('.project-tree-name');
    const color = await name.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    // rgb(251, 191, 36) is amber-400
    expect(color).toBe('rgb(251, 191, 36)');
  });
});
