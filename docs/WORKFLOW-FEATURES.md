# Feature Development Workflow

> Production workflow for developing features with quality standards
> Includes SonarQube rules, coding standards, and Angular best practices
> Date: 2025-11-10

## 📋 Overview

This document describes the complete workflow for developing features in the portfolio-cv project. All team members (even solo) must follow this workflow to ensure code quality, consistency, and maintainability.

---

## 🎯 Quality Standards

### SonarQube Quality Gate Requirements

All code must pass the following SonarQube quality gates before merge:

**Mandatory Criteria**:
- ✅ **0 Bugs** - No bugs allowed
- ✅ **0 Vulnerabilities** - No security vulnerabilities
- ✅ **0 Security Hotspots** - Review all security-sensitive code
- ✅ **Code Coverage ≥ 80%** - Minimum 80% test coverage
- ✅ **Duplicated Lines < 3%** - Keep code DRY
- ✅ **Maintainability Rating ≥ A** - Technical debt < 5%
- ✅ **Reliability Rating ≥ A** - Bug-free code
- ✅ **Security Rating ≥ A** - Secure code

**SonarQube Configuration**:
```properties
# sonar-project.properties
sonar.projectKey=portfolio-cv
sonar.organization=maflabs
sonar.host.url=https://sonarqube.maflabs.fr

# Source & Test paths
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts
sonar.exclusions=**/*.spec.ts,**/*.mock.ts,**/node_modules/**,**/dist/**

# TypeScript configuration
sonar.typescript.lcov.reportPaths=coverage/lcov.info

# Quality Gate
sonar.qualitygate.wait=true
sonar.qualitygate.timeout=300

# Coverage thresholds
sonar.coverage.exclusions=**/*.spec.ts,**/*.mock.ts,**/*.module.ts,**/*.config.ts
```

---

## 🔧 Angular Best Practices

### 1. Standalone Components (Angular 17+)

**Always use standalone components** - No NgModules:

```typescript
// ✅ GOOD: Standalone component
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss']
})
export class ExperienceCardComponent {
  // Component logic
}
```

```typescript
// ❌ BAD: Using NgModule
@NgModule({
  declarations: [ExperienceCardComponent],
  exports: [ExperienceCardComponent]
})
export class ExperienceModule {}
```

### 2. OnPush Change Detection

**Always use OnPush** for better performance:

```typescript
// ✅ GOOD: OnPush change detection
@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
```

### 3. Smart/Dumb Component Pattern

**Smart Components** (Containers):
- Located in `features/[feature]/containers/`
- Manage state and business logic
- Communicate with services
- Pass data to dumb components via @Input
- Listen to events from dumb components via @Output

**Dumb Components** (Presentational):
- Located in `features/[feature]/components/`
- Receive data via @Input
- Emit events via @Output
- No service injection (except utility services)
- Pure presentation logic

```typescript
// ✅ GOOD: Dumb component
@Component({
  selector: 'app-skill-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="skill-badge" [class.highlighted]="highlighted">
      {{ skill.name }}
    </span>
  `
})
export class SkillBadgeComponent {
  @Input({ required: true }) skill!: Skill;
  @Input() highlighted = false;
}

// ✅ GOOD: Smart component
@Component({
  selector: 'app-skills-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SkillBadgeComponent],
  template: `
    <div class="skills-grid">
      @for (skill of skills(); track skill.id) {
        <app-skill-badge
          [skill]="skill"
          [highlighted]="isHighlighted(skill)"
        />
      }
    </div>
  `
})
export class SkillsSectionComponent {
  private skillsService = inject(SkillsService);

  skills = this.skillsService.getAllSkills();

  isHighlighted(skill: Skill): boolean {
    return skill.level >= 4;
  }
}
```

### 4. Signals (Angular 17+)

**Use signals** for reactive state management:

```typescript
// ✅ GOOD: Using signals
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-experience-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class ExperienceListComponent {
  experiences = signal<Experience[]>([]);
  selectedTech = signal<string>('all');

  // Computed signal for filtered experiences
  filteredExperiences = computed(() => {
    const tech = this.selectedTech();
    if (tech === 'all') return this.experiences();
    return this.experiences().filter(exp =>
      exp.technologies.includes(tech)
    );
  });

  selectTech(tech: string): void {
    this.selectedTech.set(tech);
  }
}
```

### 5. Dependency Injection with `inject()`

**Use inject() function** instead of constructor injection:

```typescript
// ✅ GOOD: Using inject()
import { inject } from '@angular/core';

@Component({
  selector: 'app-cv-viewer',
  // ...
})
export class CvViewerComponent {
  private cvService = inject(CvService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.cvService.loadCvData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => console.log(data));
  }
}

// ❌ BAD: Constructor injection (old style)
constructor(
  private cvService: CvService,
  private router: Router
) {}
```

### 6. Template Syntax (Angular 17+)

**Use new control flow syntax** (@if, @for, @switch):

```typescript
// ✅ GOOD: New control flow
@Component({
  template: `
    @if (isLoading()) {
      <app-spinner />
    } @else if (error()) {
      <app-error-message [error]="error()" />
    } @else {
      <div class="content">
        @for (item of items(); track item.id) {
          <app-item-card [item]="item" />
        } @empty {
          <p>No items found</p>
        }
      </div>
    }
  `
})
export class ItemListComponent {
  isLoading = signal(false);
  error = signal<Error | null>(null);
  items = signal<Item[]>([]);
}

// ❌ BAD: Old syntax
<ng-container *ngIf="isLoading; else content">
  <app-spinner></app-spinner>
</ng-container>
<ng-template #content>
  <div *ngFor="let item of items">
    {{ item.name }}
  </div>
</ng-template>
```

### 7. RxJS Best Practices

**Always unsubscribe** - Use takeUntilDestroyed():

```typescript
// ✅ GOOD: Auto-unsubscribe with takeUntilDestroyed
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-data-loader',
  // ...
})
export class DataLoaderComponent {
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.dataService.getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.processData(data));
  }
}

// ❌ BAD: No unsubscribe (memory leak)
ngOnInit(): void {
  this.dataService.getData()
    .subscribe(data => this.processData(data));
}
```

### 8. Lazy Loading Routes

**Always use lazy loading**:

```typescript
// ✅ GOOD: Lazy loaded routes
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/containers/experience-page.component')
      .then(m => m.ExperiencePageComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/containers/projects-page.component')
      .then(m => m.ProjectsPageComponent)
  }
];
```

---

## 💬 Code Comments in English

**All code comments MUST be in English**:

```typescript
// ✅ GOOD: English comments
/**
 * Retrieves the user's CV data from the JSON file
 * @returns Observable of CV data
 */
getCvData(): Observable<CvData> {
  return this.http.get<CvData>('/assets/data/cv-data.json');
}

// ❌ BAD: French comments
/**
 * Récupère les données du CV depuis le fichier JSON
 * @returns Observable des données CV
 */
getCvData(): Observable<CvData> {
  // ...
}
```

**JSDoc Comments** - Required for all public methods:

```typescript
/**
 * Filters experiences by technology stack
 * @param experiences - Array of professional experiences
 * @param technology - Technology to filter by (e.g., 'Angular', '.NET')
 * @returns Filtered array of experiences containing the specified technology
 * @example
 * filterByTech(experiences, 'Angular')
 * // Returns experiences where technologies includes 'Angular'
 */
export function filterByTech(
  experiences: Experience[],
  technology: string
): Experience[] {
  return experiences.filter(exp =>
    exp.technologies.some(tech =>
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
}
```

---

## 📁 File & Folder Structure

### Project Structure

```
src/
├── app/
│   ├── core/                    # Core module (singletons)
│   │   ├── services/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── models/
│   ├── shared/                  # Shared components/utilities
│   │   ├── components/          # Reusable dumb components
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── utils/
│   ├── features/                # Feature modules
│   │   ├── home/
│   │   │   ├── containers/      # Smart components
│   │   │   │   └── home-page.component.ts
│   │   │   ├── components/      # Dumb components
│   │   │   │   ├── hero-section.component.ts
│   │   │   │   └── intro-section.component.ts
│   │   │   ├── services/        # Feature-specific services
│   │   │   └── models/          # Feature-specific types
│   │   ├── experience/
│   │   ├── projects/
│   │   ├── cv/
│   │   └── contact/
│   ├── layout/                  # Layout components
│   │   ├── header/
│   │   ├── footer/
│   │   └── sidebar/
│   └── app.config.ts           # App configuration
├── assets/
│   ├── data/                   # JSON data files
│   │   └── cv-data.json
│   ├── images/
│   └── i18n/
└── environments/
```

### Naming Conventions

**Components**:
- Smart: `feature-page.component.ts` (e.g., `experience-page.component.ts`)
- Dumb: `feature-name.component.ts` (e.g., `experience-card.component.ts`)

**Services**:
- `feature-name.service.ts` (e.g., `cv-data.service.ts`)

**Models/Types**:
- `feature-name.types.ts` (e.g., `experience.types.ts`)
- Interface names: `PascalCase` (e.g., `Experience`, `CvData`)

**Constants**:
- `feature-name.constants.ts` (e.g., `routes.constants.ts`)
- Constant names: `SCREAMING_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`)

---

## 🔀 Git Workflow

### Branch Naming

```bash
# Feature branches
feature/PORTFOLIO-123-add-experience-timeline
feature/PORTFOLIO-124-implement-cv-export

# Bugfix branches
fix/PORTFOLIO-125-correct-date-formatting

# Chore branches (no JIRA ticket needed)
chore/update-dependencies
chore/improve-documentation
```

### Commit Messages (Conventional Commits)

**Format**: `type(scope): description`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc. (no code change)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests
- `chore`: Maintenance tasks (dependencies, config)
- `ci`: CI/CD changes

**Examples**:
```bash
feat(experience): add timeline component with animations
fix(cv): correct date formatting in export PDF
docs(readme): update installation instructions
test(skills): add unit tests for skill filter pipe
refactor(shared): extract common button styles to component
perf(home): optimize image loading with lazy loading
```

**With JIRA ticket**:
```bash
feat(projects): PORTFOLIO-123 add IFTT Trading project card
fix(cv): PORTFOLIO-124 correct PDF export layout
```

### Commit Guidelines

✅ **DO**:
- Write clear, descriptive commit messages
- Use present tense ("add feature" not "added feature")
- Keep commits atomic (one logical change per commit)
- Reference JIRA tickets when applicable
- Write commits in English

❌ **DON'T**:
- Commit commented-out code
- Commit console.log() statements
- Make huge commits with unrelated changes
- Use vague messages like "fix bug" or "update code"

---

## 🔄 Feature Development Process

### Step 1: Create JIRA Ticket

1. Go to https://maflabs.atlassian.net
2. Create issue in project **PORTFOLIO**
3. Fill in details:
   - **Summary**: Clear description (e.g., "Add experience timeline component")
   - **Description**: Detailed requirements
   - **Epic Link**: Link to relevant epic
   - **Story Points**: Estimate complexity
   - **Assignee**: Yourself
4. Move ticket to "In Progress"

### Step 2: Create Feature Branch

```bash
# Ensure you're on develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/PORTFOLIO-123-add-experience-timeline

# Verify branch
git branch --show-current
```

### Step 3: Develop Feature

**Development checklist**:
- [ ] Create component(s) following Angular best practices
- [ ] Use standalone components with OnPush
- [ ] Add TypeScript types/interfaces
- [ ] Write JSDoc comments (English)
- [ ] Follow smart/dumb component pattern
- [ ] Use signals for state management
- [ ] Implement lazy loading if applicable
- [ ] Add unit tests (>80% coverage)
- [ ] Run ESLint and fix all issues
- [ ] Test manually in browser
- [ ] Commit with conventional commit message

**Commands**:
```bash
# Generate component
ng generate component features/experience/components/timeline --standalone

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Check coverage meets threshold
cat coverage/lcov-report/index.html  # Should show >80%
```

### Step 4: Local Quality Checks

Before pushing, run all quality checks:

```bash
# 1. Lint
npm run lint
npm run format:check

# 2. Unit tests with coverage
npm run test:coverage

# 3. Build (ensure no compilation errors)
npm run build

# 4. E2E tests (if implemented)
npm run e2e

# 5. SonarQube scan (local)
npm run sonar
```

**Fix any issues** before proceeding.

### Step 5: Push & Create Pull Request

```bash
# Commit changes
git add .
git commit -m "feat(experience): PORTFOLIO-123 add timeline component with animations"

# Push to remote
git push -u origin feature/PORTFOLIO-123-add-experience-timeline
```

**Create Pull Request**:
1. Go to GitHub repository
2. Click "New Pull Request"
3. Base: `develop` ← Compare: `feature/PORTFOLIO-123-add-experience-timeline`
4. Fill in PR template:

```markdown
## Description
Adds an animated timeline component for displaying professional experience.

## JIRA Ticket
[PORTFOLIO-123](https://maflabs.atlassian.net/browse/PORTFOLIO-123)

## Type of Change
- [x] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [x] Code follows project style guidelines
- [x] Self-review of code completed
- [x] Comments added (English)
- [x] Unit tests added (coverage >80%)
- [x] ESLint passes (0 errors, 0 warnings)
- [x] Build succeeds
- [x] Documentation updated (if needed)

## Screenshots (if applicable)
![Timeline Component](/path/to/screenshot.png)

## Testing Instructions
1. Navigate to `/experience`
2. Verify timeline displays with animations
3. Check responsive behavior on mobile
4. Verify accessibility (keyboard navigation)
```

5. Assign reviewers (if team project)
6. Link to JIRA ticket
7. Submit PR

### Step 6: CI/CD Pipeline

**GitHub Actions will automatically**:
1. ✅ Run ESLint
2. ✅ Run Prettier check
3. ✅ Run unit tests
4. ✅ Generate coverage report
5. ✅ Run SonarQube analysis
6. ✅ Check Quality Gate
7. ✅ Build application

**If pipeline fails**:
- Check logs in GitHub Actions tab
- Fix issues locally
- Push new commit to same branch
- Pipeline will re-run automatically

**Quality Gate Failure**:
- Go to https://sonarqube.maflabs.fr/
- Find project: `portfolio-cv`
- Review issues (bugs, code smells, coverage)
- Fix locally and push

### Step 7: Code Review (if team)

**As author**:
- Respond to review comments
- Make requested changes
- Push new commits (don't force-push)
- Re-request review

**As reviewer**:
- Check code quality and standards
- Verify tests exist and pass
- Run code locally if needed
- Approve or request changes

### Step 8: Merge to Develop

Once PR is approved and CI passes:

```bash
# Merge via GitHub UI (recommended)
# - Click "Squash and merge" or "Merge pull request"
# - Delete branch after merge

# OR merge locally
git checkout develop
git pull origin develop
git merge --no-ff feature/PORTFOLIO-123-add-experience-timeline
git push origin develop
git branch -d feature/PORTFOLIO-123-add-experience-timeline
```

### Step 9: Update JIRA Ticket

1. Move ticket to "Done"
2. Add comment with PR link
3. Update remaining estimate to 0h

---

## 🧪 Testing Requirements

### Unit Tests

**Coverage requirement**: ≥80% for all files

**Test file naming**: `feature-name.component.spec.ts`

**Example**:
```typescript
// experience-card.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceCardComponent } from './experience-card.component';
import { Experience } from '../models/experience.types';

describe('ExperienceCardComponent', () => {
  let component: ExperienceCardComponent;
  let fixture: ComponentFixture<ExperienceCardComponent>;

  const mockExperience: Experience = {
    id: '1',
    company: 'EDF',
    role: 'Senior Full-Stack Developer',
    startDate: '2021-09',
    endDate: '2024-10',
    technologies: ['Angular', '.NET Core', 'SQL Server']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceCardComponent);
    component = fixture.componentInstance;
    component.experience = mockExperience;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display company name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.company-name')?.textContent)
      .toContain('EDF');
  });

  it('should format date range correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.date-range')?.textContent)
      .toContain('Sep 2021 - Oct 2024');
  });

  it('should display all technologies', () => {
    const compiled = fixture.nativeElement;
    const techBadges = compiled.querySelectorAll('.tech-badge');
    expect(techBadges.length).toBe(3);
  });
});
```

### E2E Tests (Playwright)

**Example**:
```typescript
// experience.e2e.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Experience Page', () => {
  test('should display experience timeline', async ({ page }) => {
    await page.goto('/experience');

    // Check page title
    await expect(page.locator('h1')).toContainText('Experience');

    // Check timeline is visible
    const timeline = page.locator('.experience-timeline');
    await expect(timeline).toBeVisible();

    // Check at least one experience card exists
    const cards = page.locator('.experience-card');
    await expect(cards).toHaveCount(greaterThan(0));
  });

  test('should filter experiences by technology', async ({ page }) => {
    await page.goto('/experience');

    // Click Angular filter
    await page.click('text=Angular');

    // Verify filtered results
    const cards = page.locator('.experience-card');
    await expect(cards).toHaveCount(4); // Assuming 4 Angular experiences
  });
});
```

---

## 📝 Code Review Checklist

**Before requesting review**:
- [ ] Code compiles without errors/warnings
- [ ] ESLint passes (0 errors, 0 warnings)
- [ ] Prettier formatting applied
- [ ] All unit tests pass (coverage ≥80%)
- [ ] Manual testing completed
- [ ] Comments in English
- [ ] No console.log() statements
- [ ] No commented-out code
- [ ] Types properly defined (no `any`)
- [ ] Standalone components used
- [ ] OnPush change detection used
- [ ] Proper error handling
- [ ] Accessibility considered (ARIA, keyboard nav)

**Reviewer checklist**:
- [ ] Code follows Angular style guide
- [ ] Smart/dumb pattern followed
- [ ] Proper use of signals and RxJS
- [ ] Tests cover edge cases
- [ ] Performance considerations addressed
- [ ] Security vulnerabilities checked
- [ ] Documentation updated if needed
- [ ] No unnecessary dependencies added

---

## 🚀 Definition of Done (DoD)

A feature is "Done" when:

1. ✅ **Code Quality**:
   - Follows all Angular best practices
   - ESLint: 0 errors, 0 warnings
   - Prettier formatted
   - Comments in English
   - No code smells (SonarQube)

2. ✅ **Testing**:
   - Unit tests written (coverage ≥80%)
   - E2E tests written (critical paths)
   - All tests pass
   - Manual testing completed

3. ✅ **SonarQube**:
   - Quality Gate passed
   - 0 bugs
   - 0 vulnerabilities
   - 0 security hotspots
   - Maintainability ≥ A

4. ✅ **CI/CD**:
   - Pipeline passes (lint → test → sonar → build)
   - Build succeeds
   - No console errors

5. ✅ **Documentation**:
   - JSDoc comments added
   - README updated (if needed)
   - CHANGELOG updated

6. ✅ **Code Review**:
   - PR approved by reviewer(s)
   - All comments addressed

7. ✅ **JIRA**:
   - Ticket moved to "Done"
   - PR linked to ticket
   - Remaining estimate = 0h

---

## 🔧 Tools & Commands

### Daily Development

```bash
# Start dev server
npm start

# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Run unit tests (watch mode)
npm run test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build

# Run E2E tests
npm run e2e

# SonarQube analysis
npm run sonar
```

### Pre-commit Hook (Husky)

Automatically runs before each commit:
```bash
# .husky/pre-commit
npm run lint
npm run format:check
npm run test -- --run
```

### Pre-push Hook

Automatically runs before push:
```bash
# .husky/pre-push
npm run test:coverage
npm run build
```

---

## 📚 References

- [Angular Style Guide](https://angular.dev/style-guide)
- [Angular Best Practices](https://angular.dev/best-practices)
- [SonarQube Rules](https://sonarqube.maflabs.fr/coding_rules)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

---

**Last Updated**: 2025-11-10
**Status**: Production Ready
**Version**: 1.0.0
