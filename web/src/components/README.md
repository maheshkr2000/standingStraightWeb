# Components Organization

This folder contains all React components organized by their purpose and management type.

## Folder Structure

### 📁 `cms/` - CMS-Managed Components

Components that fetch and display content from Sanity CMS:

- **HeroSectionCMS** - Dynamic hero section with carousel from CMS
- **MissionSnapshotCMS** - Mission statement and statistics from CMS

### 📁 `direct/` - Direct/Static Components

Components with hardcoded content that don't require CMS data:

- **HeroSection** - Static hero section (fallback)
- **MissionSnapshot** - Static mission section (fallback)
- **PatientStories** - Patient success stories
- **PatientStoriesPreview** - Preview of patient stories for homepage
- **UpcomingEvents** - Events and missions
- **UpcomingEventsPreview** - Preview of events for homepage
- **Partners** - Partner organizations
- **GlobalFootprint** - Global presence and locations
- **HowYouCanHelp** - Ways to support the organization

### 📁 `shared/` - Shared Components

Components used across multiple pages and sections:

- **Navigation** - Main navigation header
- **Footer** - Site footer
- **AnimatedCounter** - Animated number counter

### 📁 `ui/` - UI Components

shadcn/ui components library (buttons, cards, forms, etc.)

## Import Patterns

### Clean Imports (Recommended)

```typescript
// Import from specific category
import { HeroSectionCMS, MissionSnapshotCMS } from "@/components/cms";
import { PatientStories, Partners } from "@/components/direct";
import { Navigation, Footer } from "@/components/shared";

// Import everything
import * as Components from "@/components";
```

### Direct Imports (Alternative)

```typescript
import HeroSectionCMS from "@/components/cms/HeroSectionCMS";
import PatientStories from "@/components/direct/PatientStories";
import Navigation from "@/components/shared/Navigation";
```

## Adding New Components

### CMS-Managed Component

1. Create component in `cms/` folder
2. Use `useSanityData` hooks for data fetching
3. Add to `cms/index.ts` exports
4. Include fallback content for error states

### Direct Component

1. Create component in `direct/` folder
2. Use hardcoded content or local state
3. Add to `direct/index.ts` exports

### Shared Component

1. Create component in `shared/` folder
2. Make it reusable across multiple contexts
3. Add to `shared/index.ts` exports

## Best Practices

- **CMS Components**: Always include loading states and error handling
- **Direct Components**: Keep content easily editable in the component file
- **Shared Components**: Make them flexible with props and variants
- **Naming**: Use descriptive names that indicate the component's purpose
- **Exports**: Always export from the appropriate index file

## Migration Notes

When migrating from static to CMS-managed:

1. Create CMS version in `cms/` folder
2. Keep original in `direct/` as fallback
3. Update imports in pages
4. Test both versions work correctly
5. Remove direct version once CMS is stable
