# Standing Straight CMS Documentation

This folder contains setup guides and documentation for the Sanity CMS configuration.

## Available Guides

### [Mission Snapshot Setup](./MISSION_SNAPSHOT_SETUP.md)

Complete guide for setting up the Mission Snapshot section in the homepage "Why We Exist" area.

## CMS Structure Overview

The CMS is organized into logical sections that mirror the website structure:

- **Homepage**
  - Hero Section
  - Why We Exist (Mission Snapshot)
  - Global Footprint
  - Contact Information
- **People & Stories**
  - Patient Stories
  - Team Members
- **Events & Missions**
  - Upcoming Events
  - Past Events
  - Active Missions
- **Volunteers & Partners**
  - Volunteer Opportunities
  - Partners

## Getting Started

1. **Access Sanity Studio**: Run `npm run dev` in the CMS project
2. **Navigate to Homepage**: Start with the Homepage section for core content
3. **Follow Setup Guides**: Use the guides in this folder for detailed instructions
4. **Publish Changes**: Remember to publish documents after making changes

## Best Practices

- Only one document should be marked as "Active" for singleton content types
- Use descriptive titles and descriptions for better content management
- Keep content up-to-date with the `lastUpdated` field
- Test changes on the website after publishing

## Need Help?

- Check the individual setup guides for specific sections
- Refer to Sanity documentation for advanced features
- Ensure environment variables are properly configured
- Verify CORS settings for website integration
