# Testing Workflow

> Comprehensive testing strategy for portfolio-cv project
> Includes unit tests, E2E tests, visual regression, and quality gates
> Date: 2025-11-10

## 📋 Overview

This document describes the complete testing workflow for the portfolio-cv project. All code must be tested before merge to ensure reliability, maintainability, and quality.

---

## 🎯 Testing Strategy

### Test Pyramid

```
        /\
       /E2E\          ← 10% (Critical user journeys)
      /------\
     /Visual \        ← 15% (Visual regression)
    /----------\
   /Integration\     ← 25% (Component + Service integration)
  /--------------\
 /  Unit Tests   \   ← 50% (Individual functions, pipes, utils)
/------------------\
```

### Coverage Requirements

**Minimum Coverage Thresholds**:
- ✅ **Overall**: 80%
- ✅ **Statements**: 80%
- ✅ **Branches**: 75%
- ✅ **Functions**: 80%
- ✅ **Lines**: 80%

**Coverage Configuration** (karma.conf.js):
```javascript
coverageReporter: {
  dir: require('path').join(__dirname, './coverage'),
  subdir: '.',
  reporters: [
    { type: 'html' },
    { type: 'text-summary' },
    { type: 'lcovonly' }
  ],
  check: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80
    }
  }
}
```

---

## 🧪 Unit Testing (Jasmine + Karma)

### What to Test

**Components**:
- Component creation
- Input/Output bindings
- Template rendering
- User interactions (click, input, etc.)
- Computed values (signals)
- Error states
- Edge cases

**Services**:
- HTTP requests/responses
- Data transformations
- Error handling
- State management
- Business logic

**Pipes**:
- Value transformations
- Edge cases (null, undefined, empty)
- Different input types

**Utils/Helpers**:
- Pure functions
- All branches and conditions
- Edge cases

### Component Testing Template

```typescript
// experience-card.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ExperienceCardComponent } from './experience-card.component';
import { Experience } from '../../models/experience.types';

describe('ExperienceCardComponent', () => {
  let component: ExperienceCardComponent;
  let fixture: ComponentFixture<ExperienceCardComponent>;
  let compiled: HTMLElement;

  const mockExperience: Experience = {
    id: 'exp-1',
    company: 'EDF',
    role: 'Senior Full-Stack Developer',
    startDate: '2021-09-01',
    endDate: '2024-10-31',
    location: 'Paris, France',
    description: 'Developed critical applications for nuclear division',
    technologies: ['Angular', '.NET Core', 'SQL Server'],
    achievements: [
      'Optimized performance by 40%',
      'Led team of 4 developers'
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceCardComponent] // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should require experience input', () => {
      // This will throw error if required input is missing
      expect(() => fixture.detectChanges()).toThrow();
    });

    it('should initialize with provided experience', () => {
      component.experience = mockExperience;
      fixture.detectChanges();

      expect(component.experience).toEqual(mockExperience);
    });
  });

  describe('Template Rendering', () => {
    beforeEach(() => {
      component.experience = mockExperience;
      fixture.detectChanges();
    });

    it('should display company name', () => {
      const companyElement = compiled.querySelector('.company-name');
      expect(companyElement?.textContent).toContain('EDF');
    });

    it('should display role title', () => {
      const roleElement = compiled.querySelector('.role-title');
      expect(roleElement?.textContent).toContain('Senior Full-Stack Developer');
    });

    it('should display date range', () => {
      const dateElement = compiled.querySelector('.date-range');
      expect(dateElement?.textContent).toContain('Sep 2021 - Oct 2024');
    });

    it('should display location', () => {
      const locationElement = compiled.querySelector('.location');
      expect(locationElement?.textContent).toContain('Paris, France');
    });

    it('should display description', () => {
      const descElement = compiled.querySelector('.description');
      expect(descElement?.textContent).toContain('Developed critical applications');
    });

    it('should render all technologies', () => {
      const techBadges = compiled.querySelectorAll('.tech-badge');
      expect(techBadges.length).toBe(3);
      expect(techBadges[0].textContent).toContain('Angular');
      expect(techBadges[1].textContent).toContain('.NET Core');
      expect(techBadges[2].textContent).toContain('SQL Server');
    });

    it('should render all achievements', () => {
      const achievements = compiled.querySelectorAll('.achievement-item');
      expect(achievements.length).toBe(2);
    });
  });

  describe('User Interactions', () => {
    beforeEach(() => {
      component.experience = mockExperience;
      fixture.detectChanges();
    });

    it('should expand details on click', () => {
      const expandButton = compiled.querySelector('.expand-button') as HTMLButtonElement;
      expect(component.isExpanded).toBe(false);

      expandButton.click();
      fixture.detectChanges();

      expect(component.isExpanded).toBe(true);
      const detailsSection = compiled.querySelector('.details-section');
      expect(detailsSection).toBeTruthy();
    });

    it('should emit cardClick event when clicked', () => {
      spyOn(component.cardClick, 'emit');

      const card = compiled.querySelector('.experience-card') as HTMLElement;
      card.click();

      expect(component.cardClick.emit).toHaveBeenCalledWith(mockExperience);
    });
  });

  describe('Edge Cases', () => {
    it('should handle experience without end date (current)', () => {
      const currentExperience = { ...mockExperience, endDate: null };
      component.experience = currentExperience;
      fixture.detectChanges();

      const dateElement = compiled.querySelector('.date-range');
      expect(dateElement?.textContent).toContain('Present');
    });

    it('should handle experience without achievements', () => {
      const expNoAchievements = { ...mockExperience, achievements: [] };
      component.experience = expNoAchievements;
      fixture.detectChanges();

      const achievements = compiled.querySelectorAll('.achievement-item');
      expect(achievements.length).toBe(0);
    });

    it('should handle long technology list', () => {
      const manyTechs = {
        ...mockExperience,
        technologies: ['Angular', 'React', 'Vue', '.NET', 'Node', 'Python', 'Java']
      };
      component.experience = manyTechs;
      fixture.detectChanges();

      const techBadges = compiled.querySelectorAll('.tech-badge');
      expect(techBadges.length).toBe(7);
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      component.experience = mockExperience;
      fixture.detectChanges();
    });

    it('should have proper ARIA labels', () => {
      const card = compiled.querySelector('.experience-card');
      expect(card?.getAttribute('role')).toBe('article');
      expect(card?.getAttribute('aria-label')).toContain('EDF');
    });

    it('should have keyboard-accessible expand button', () => {
      const expandButton = compiled.querySelector('.expand-button') as HTMLButtonElement;
      expect(expandButton.getAttribute('tabindex')).not.toBe('-1');
    });
  });
});
```

### Service Testing Template

```typescript
// cv-data.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CvDataService } from './cv-data.service';
import { CvData } from '../models/cv-data.types';

describe('CvDataService', () => {
  let service: CvDataService;
  let httpMock: HttpTestingController;

  const mockCvData: CvData = {
    profile: {
      firstName: 'Mafal',
      lastName: 'GAI',
      title: 'Développeur .NET',
      email: 'gaimafal@gmail.com'
    },
    experiences: [],
    education: [],
    skills: {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CvDataService]
    });

    service = TestBed.inject(CvDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  describe('getCvData', () => {
    it('should fetch CV data from JSON file', () => {
      service.getCvData().subscribe(data => {
        expect(data).toEqual(mockCvData);
      });

      const req = httpMock.expectOne('/assets/data/cv-data.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockCvData);
    });

    it('should handle HTTP errors gracefully', () => {
      service.getCvData().subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne('/assets/data/cv-data.json');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });

    it('should cache CV data after first request', () => {
      // First request
      service.getCvData().subscribe();
      const req1 = httpMock.expectOne('/assets/data/cv-data.json');
      req1.flush(mockCvData);

      // Second request should use cache (no HTTP call)
      service.getCvData().subscribe(data => {
        expect(data).toEqual(mockCvData);
      });

      httpMock.expectNone('/assets/data/cv-data.json');
    });
  });

  describe('filterExperiencesByTech', () => {
    const experiences = [
      { id: '1', technologies: ['Angular', '.NET'] },
      { id: '2', technologies: ['React', 'Node.js'] },
      { id: '3', technologies: ['Angular', 'NestJS'] }
    ] as any[];

    it('should filter experiences by technology', () => {
      const result = service.filterExperiencesByTech(experiences, 'Angular');
      expect(result.length).toBe(2);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('3');
    });

    it('should be case-insensitive', () => {
      const result = service.filterExperiencesByTech(experiences, 'angular');
      expect(result.length).toBe(2);
    });

    it('should return empty array if no matches', () => {
      const result = service.filterExperiencesByTech(experiences, 'Python');
      expect(result.length).toBe(0);
    });

    it('should return all experiences if tech is empty', () => {
      const result = service.filterExperiencesByTech(experiences, '');
      expect(result.length).toBe(3);
    });
  });
});
```

### Pipe Testing Template

```typescript
// date-range.pipe.spec.ts
import { DateRangePipe } from './date-range.pipe';

describe('DateRangePipe', () => {
  let pipe: DateRangePipe;

  beforeEach(() => {
    pipe = new DateRangePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format date range with both dates', () => {
    const result = pipe.transform('2021-09-01', '2024-10-31');
    expect(result).toBe('Sep 2021 - Oct 2024');
  });

  it('should show "Present" when end date is null', () => {
    const result = pipe.transform('2021-09-01', null);
    expect(result).toBe('Sep 2021 - Present');
  });

  it('should show "Present" when end date is empty string', () => {
    const result = pipe.transform('2021-09-01', '');
    expect(result).toBe('Sep 2021 - Present');
  });

  it('should handle invalid start date', () => {
    const result = pipe.transform('invalid-date', '2024-10-31');
    expect(result).toBe('Invalid date - Oct 2024');
  });

  it('should handle both invalid dates', () => {
    const result = pipe.transform('invalid', 'invalid');
    expect(result).toBe('Invalid date - Invalid date');
  });

  it('should handle null start date', () => {
    const result = pipe.transform(null, '2024-10-31');
    expect(result).toBe('');
  });
});
```

### Running Unit Tests

```bash
# Run tests once
npm run test -- --watch=false

# Run tests in watch mode (during development)
npm run test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test -- experience-card.component.spec.ts

# Run tests matching pattern
npm run test -- --include='**/*service.spec.ts'

# Run in headless mode (CI)
npm run test -- --browsers=ChromeHeadless --watch=false
```

---

## 🎭 E2E Testing (Playwright)

### What to Test

**Critical User Journeys**:
- Navigation between pages
- Form submissions
- Data loading and display
- User interactions (click, scroll, etc.)
- Responsive behavior
- Accessibility

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
});
```

### E2E Test Template

```typescript
// e2e/experience.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Experience Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experience');
  });

  test('should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Experience.*Portfolio/);
  });

  test('should display page heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Professional Experience');
  });

  test('should display experience timeline', async ({ page }) => {
    const timeline = page.locator('.experience-timeline');
    await expect(timeline).toBeVisible();
  });

  test('should display all experience cards', async ({ page }) => {
    const cards = page.locator('.experience-card');
    await expect(cards).toHaveCount(greaterThanOrEqual(4));
  });

  test('should filter experiences by technology', async ({ page }) => {
    // Click Angular filter
    await page.click('button:has-text("Angular")');

    // Wait for filter to apply
    await page.waitForTimeout(500);

    // Verify filtered results
    const cards = page.locator('.experience-card:visible');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(10);

    // Verify all visible cards contain Angular
    for (let i = 0; i < count; i++) {
      const techBadges = cards.nth(i).locator('.tech-badge');
      const techTexts = await techBadges.allTextContents();
      expect(techTexts.some(text => text.includes('Angular'))).toBe(true);
    }
  });

  test('should expand experience details on click', async ({ page }) => {
    const firstCard = page.locator('.experience-card').first();

    // Details should be hidden initially
    const detailsSection = firstCard.locator('.details-section');
    await expect(detailsSection).not.toBeVisible();

    // Click expand button
    await firstCard.locator('.expand-button').click();

    // Details should now be visible
    await expect(detailsSection).toBeVisible();
    await expect(detailsSection.locator('.achievement-item')).toHaveCount(greaterThan(0));
  });

  test('should navigate to project page from experience', async ({ page }) => {
    // Click link to project from experience
    await page.click('text=View Project');

    // Should navigate to projects page
    await expect(page).toHaveURL(/\/projects/);
  });

  test('should be responsive on mobile', async ({ page, viewport }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const timeline = page.locator('.experience-timeline');
    await expect(timeline).toBeVisible();

    // Check mobile-specific layout
    const cards = page.locator('.experience-card');
    const firstCard = cards.first();
    const boundingBox = await firstCard.boundingBox();

    // Card should take full width on mobile
    expect(boundingBox?.width).toBeGreaterThan(300);
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Tab to first expand button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Press Enter to expand
    await page.keyboard.press('Enter');

    // Verify details expanded
    const firstCard = page.locator('.experience-card').first();
    const detailsSection = firstCard.locator('.details-section');
    await expect(detailsSection).toBeVisible();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const firstCard = page.locator('.experience-card').first();

    // Check role
    await expect(firstCard).toHaveAttribute('role', 'article');

    // Check aria-label
    const ariaLabel = await firstCard.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel?.length).toBeGreaterThan(0);
  });
});
```

### Visual Regression Testing

```typescript
// e2e/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      threshold: 0.2 // 20% difference tolerance
    });
  });

  test('experience page snapshot', async ({ page }) => {
    await page.goto('/experience');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('experience-page.png', {
      fullPage: true
    });
  });

  test('experience card hover state', async ({ page }) => {
    await page.goto('/experience');
    const firstCard = page.locator('.experience-card').first();

    // Hover over card
    await firstCard.hover();
    await page.waitForTimeout(300); // Wait for transition

    await expect(firstCard).toHaveScreenshot('experience-card-hover.png');
  });

  test('mobile experience page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/experience');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('experience-mobile.png', {
      fullPage: true
    });
  });

  test('dark theme snapshot', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await expect(page).toHaveScreenshot('homepage-dark.png', {
      fullPage: true
    });
  });
});
```

### Running E2E Tests

```bash
# Install Playwright browsers (first time)
npx playwright install

# Run all E2E tests
npm run e2e

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test e2e/experience.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox

# Update visual regression snapshots
npx playwright test --update-snapshots

# Debug mode (opens Playwright Inspector)
npx playwright test --debug

# Run in UI mode (interactive)
npx playwright test --ui

# Generate HTML report
npx playwright show-report
```

---

## 📊 Test Coverage Analysis

### Viewing Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# Open HTML report in browser
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

### Coverage Report Structure

```
coverage/
├── index.html              # Main coverage report
├── lcov.info              # LCOV format (for SonarQube)
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── experience/
│   │   │   │   ├── components/
│   │   │   │   │   └── experience-card.component.ts.html
│   │   │   │   └── services/
│   │   │   │       └── experience.service.ts.html
```

### Improving Coverage

**Identify uncovered code**:
1. Open coverage report
2. Navigate to file with low coverage
3. Red/pink highlights show uncovered lines
4. Write tests for uncovered scenarios

**Common uncovered scenarios**:
- Error handling (catch blocks)
- Edge cases (null, undefined, empty)
- Conditional branches (if/else)
- Default values in switches
- Async error callbacks

---

## 🔍 Integration with SonarQube

### SonarQube Test Configuration

```properties
# sonar-project.properties
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.testExecutionReportPaths=test-results/sonar-report.xml
```

### Generating SonarQube Test Report

```bash
# Run tests with SonarQube reporter
npm run test:coverage

# Upload to SonarQube
npm run sonar
```

### SonarQube Quality Checks

1. **Code Coverage**: Minimum 80%
2. **Test Success Rate**: 100% (all tests must pass)
3. **Test Execution Time**: Reasonable (not too slow)
4. **Test Code Quality**: No code smells in test files

---

## 🚀 CI/CD Integration

### GitHub Actions Test Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

      - name: Archive coverage results
        uses: actions/upload-artifact@v3
        with:
          name: coverage-report
          path: coverage/

  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run e2e

      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: test-results/
```

---

## ✅ Test Checklist

### Before Committing

- [ ] All unit tests pass (`npm run test`)
- [ ] Coverage meets threshold (≥80%)
- [ ] No skipped tests (`fit`, `fdescribe`)
- [ ] No focused tests (`xit`, `xdescribe`)
- [ ] Test names are descriptive
- [ ] Edge cases covered

### Before Pull Request

- [ ] All unit tests pass
- [ ] All E2E tests pass
- [ ] Visual regression tests updated (if UI changed)
- [ ] Coverage ≥80% for new code
- [ ] No console errors in tests
- [ ] Test artifacts cleaned up

### Before Merge

- [ ] CI pipeline green (all tests pass)
- [ ] SonarQube Quality Gate passed
- [ ] Code review completed
- [ ] Test documentation updated

---

## 📚 Testing Best Practices

### DO ✅

- **Write tests first** (TDD when possible)
- **Test behavior, not implementation**
- **Use descriptive test names**: "should do X when Y"
- **Follow AAA pattern**: Arrange, Act, Assert
- **Mock external dependencies** (HTTP, services)
- **Test edge cases** (null, empty, invalid)
- **Keep tests simple and focused** (one assertion per test)
- **Use beforeEach for setup**
- **Clean up after tests** (afterEach)

### DON'T ❌

- **Don't test framework code** (Angular internals)
- **Don't test private methods directly**
- **Don't write flaky tests** (depends on timing, external state)
- **Don't skip tests** (fix or remove them)
- **Don't copy-paste test code** (use helpers)
- **Don't test multiple things in one test**
- **Don't rely on test execution order**
- **Don't hardcode test data** (use factories)

### Example: Good vs Bad Tests

```typescript
// ❌ BAD: Testing implementation details
it('should call ngOnInit', () => {
  spyOn(component, 'ngOnInit');
  component.ngOnInit();
  expect(component.ngOnInit).toHaveBeenCalled();
});

// ✅ GOOD: Testing behavior
it('should load experiences on initialization', () => {
  const mockExperiences = [{ id: '1', company: 'EDF' }];
  spyOn(experienceService, 'getExperiences').and.returnValue(of(mockExperiences));

  component.ngOnInit();

  expect(component.experiences()).toEqual(mockExperiences);
});

// ❌ BAD: Multiple assertions unrelated
it('should work', () => {
  expect(component.title).toBe('Experience');
  expect(component.experiences().length).toBe(5);
  expect(component.isLoading()).toBe(false);
  expect(component.error()).toBeNull();
});

// ✅ GOOD: Single, focused assertion
it('should have title "Experience"', () => {
  expect(component.title).toBe('Experience');
});

it('should load 5 experiences', () => {
  expect(component.experiences().length).toBe(5);
});

it('should not be loading after data loaded', () => {
  expect(component.isLoading()).toBe(false);
});

// ❌ BAD: Flaky test (timing dependent)
it('should update after 1 second', (done) => {
  component.startTimer();
  setTimeout(() => {
    expect(component.counter).toBe(1);
    done();
  }, 1000);
});

// ✅ GOOD: Deterministic test
it('should update counter when timer emits', fakeAsync(() => {
  component.startTimer();
  tick(1000);
  expect(component.counter).toBe(1);
}));
```

---

## 🛠️ Testing Tools & Commands

### Daily Testing

```bash
# Run unit tests (watch mode)
npm run test

# Run tests once
npm run test -- --watch=false

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run e2e

# Run E2E in headed mode
npm run e2e:headed

# Run specific test file
npm run test -- experience.component.spec.ts

# Run tests matching pattern
npm run test -- --include='**/*service.spec.ts'
```

### Debugging Tests

```bash
# Debug unit tests in Chrome
npm run test -- --browsers=Chrome

# Debug E2E tests
npm run e2e -- --debug

# Run E2E in UI mode
npx playwright test --ui
```

### Coverage Commands

```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
npm run coverage:open

# Check coverage thresholds
npm run coverage:check
```

---

## 📖 References

- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Configuration](https://karma-runner.github.io/latest/config/configuration-file.html)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated**: 2025-11-10
**Status**: Production Ready
**Version**: 1.0.0
