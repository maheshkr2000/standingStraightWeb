# Mission Snapshot Setup Guide

## Overview

The Mission Snapshot section is now fully managed through Sanity CMS and appears on the homepage under "Why We Exist".

## Location in Studio

- Navigate to **Homepage** → **Why We Exist (Mission Snapshot)**
- This is a singleton document (only one should be active at a time)

## Required Fields

### Basic Information

- **Snapshot Title**: The main heading (e.g., "Why We Exist")
- **Description**: Brief description shown above statistics
- **Mission Statement**: The main mission text displayed prominently

### Key Programs (Left Column Cards)

Add up to 4 key programs that will appear as cards on the left side:

1. **Program Title**: e.g., "Free Life-Changing Surgeries"
2. **Program Description**: Detailed explanation of the program
3. **Icon Name**: Choose from available Lucide icons:
   - `building2` - For infrastructure/surgery programs
   - `users` - For training/people programs
   - `globe` - For global impact programs
   - `stethoscope` - For medical programs
   - `heart` - For care/compassion programs
   - `mappin` - For location-based programs

### Impact Highlights (Right Column Stats)

Add up to 4 key statistics that will appear in the blue stats card:

1. **Metric**: The name of the statistic (e.g., "Successful Surgeries")
2. **Value**: The numerical value (e.g., "500+", "15", "100%")
3. **Description**: What the metric represents

### Statistics (Optional)

Additional detailed statistics that can be used elsewhere:

- Total Surgeries Performed
- Children Helped
- Countries Served
- Local Surgeons Trained
- Active Partners
- Volunteers Engaged

## Example Setup

### Key Programs

1. **Free Life-Changing Surgeries**
   - Description: "Complete spinal correction surgeries delivered mission by mission, restoring mobility and confidence to children who need it most."
   - Icon: `building2`

2. **Training Local Teams**
   - Description: "Empowering local medical professionals with advanced surgical techniques to continue life-changing work long after our missions end."
   - Icon: `users`

3. **Global Impact**
   - Description: "Building sustainable healthcare infrastructure that creates ripple effects of hope across entire communities."
   - Icon: `globe`

### Impact Highlights

1. **Successful Surgeries**: "500+" - "Successful Surgeries"
2. **Medical Missions**: "15" - "Medical Missions"
3. **Medical Volunteers**: "50+" - "Medical Volunteers"
4. **Success Rate**: "100%" - "Success Rate"

## Important Notes

- Only one Mission Snapshot document should be marked as **Active**
- The component will fall back to default content if no CMS data is available
- Changes are reflected immediately on the website after publishing
- Icons are automatically mapped to Lucide React components

## Troubleshooting

- If content doesn't appear, ensure the document is published and marked as Active
- Check that all required fields are filled
- Verify the icon names match the available options in the icon mapping
- Ensure the website is properly connected to Sanity (check environment variables)
