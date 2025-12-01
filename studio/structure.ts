import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Standing Straight CMS')
    .items([
      // Homepage
      S.listItem()
        .title('Homepage')
        .child(
          S.list()
            .title('Homepage')
            .items([
              S.listItem()
                .title('Hero (Top Banner)')
                .child(
                  S.document()
                    .schemaType('heroSection')
                    .documentId('heroSection')
                ),
              S.listItem()
                .title('Why We Exist')
                .child(
                  S.document()
                    .schemaType('missionSnapshot')
                    .documentId('missionSnapshot')
                ),
              S.listItem()
                .title('Real Stories of Transformation')
                .child(
                  S.documentTypeList('patientStory')
                    .title('Featured Stories')
                    .filter('_type == "patientStory" && isFeatured == true')
                    .defaultOrdering([{field: 'missionDate', direction: 'desc'}])
                ),
              S.listItem()
                .title('Upcoming Missions & Events')
                .child(
                  S.documentTypeList('event')
                    .title('Upcoming Events')
                    .filter('_type == "event" && startDate >= now() && isPublished == true')
                    .defaultOrdering([{field: 'startDate', direction: 'asc'}])
                ),
              S.listItem()
                .title('How You Can Help')
                .child(
                  S.document()
                    .schemaType('howYouCanHelp')
                    .documentId('howYouCanHelp')
                ),
              S.listItem()
                .title('Partners')
                .child(
                  S.documentTypeList('partner')
                    .title('Partners')
                    .filter('_type == "partner" && isActive == true')
                    .defaultOrdering([{field: 'tier', direction: 'asc'}, {field: 'displayOrder', direction: 'asc'}])
                ),
              S.listItem()
                .title('Global Footprint')
                .child(
                  S.document()
                    .schemaType('globalFootprint')
                    .documentId('globalFootprint')
                ),
            ])
        ),

      // People & Stories
      S.listItem()
        .title('People & Stories')
        .child(
          S.list()
            .title('People & Stories')
            .items([
              S.listItem()
                .title('Patient Stories')
                .child(
                  S.documentTypeList('patientStory')
                    .title('Patient Stories')
                    .defaultOrdering([{field: 'missionDate', direction: 'desc'}])
                ),
              S.listItem()
                .title('Featured Stories')
                .child(
                  S.documentTypeList('patientStory')
                    .title('Featured Stories')
                    .filter('_type == "patientStory" && isFeatured == true')
                    .defaultOrdering([{field: 'missionDate', direction: 'desc'}])
                ),
              S.divider(),
              S.listItem()
                .title('Team Members')
                .child(
                  S.documentTypeList('teamMember')
                    .title('Team Members')
                    .defaultOrdering([{field: 'displayOrder', direction: 'asc'}])
                ),
              S.listItem()
                .title('Board & Leadership')
                .child(
                  S.documentTypeList('teamMember')
                    .title('Board & Leadership')
                    .filter('_type == "teamMember" && role in ["board-member", "medical-director", "program-director"]')
                    .defaultOrdering([{field: 'displayOrder', direction: 'asc'}])
                ),
            ])
        ),

      // Events & Missions
      S.listItem()
        .title('Events & Missions')
        .child(
          S.list()
            .title('Events & Missions')
            .items([
              S.listItem()
                .title('Upcoming Events')
                .child(
                  S.documentTypeList('event')
                    .title('Events')
                    .filter('_type == "event" && startDate >= now()')
                    .defaultOrdering([{field: 'startDate', direction: 'asc'}])
                ),
              S.listItem()
                .title('Past Events')
                .child(
                  S.documentTypeList('event')
                    .title('Past Events')
                    .filter('_type == "event" && startDate < now()')
                    .defaultOrdering([{field: 'startDate', direction: 'desc'}])
                ),
              S.divider(),
              S.listItem()
                .title('Active Missions')
                .child(
                  S.documentTypeList('mission')
                    .title('Active Missions')
                    .filter('_type == "mission" && status in ["planning", "scheduled", "in-progress"]')
                    .defaultOrdering([{field: 'dates.startDate', direction: 'asc'}])
                ),
              S.listItem()
                .title('Completed Missions')
                .child(
                  S.documentTypeList('mission')
                    .title('Completed Missions')
                    .filter('_type == "mission" && status == "completed"')
                    .defaultOrdering([{field: 'dates.startDate', direction: 'desc'}])
                ),
            ])
        ),

      // Volunteers & Partners
      S.listItem()
        .title('Volunteers & Partners')
        .child(
          S.list()
            .title('Volunteers & Partners')
            .items([
              S.listItem()
                .title('Volunteer Opportunities')
                .child(
                  S.documentTypeList('volunteerOpportunity')
                    .title('Volunteer Opportunities')
                    .defaultOrdering([{field: 'urgency', direction: 'asc'}])
                ),
              S.listItem()
                .title('Urgent Opportunities')
                .child(
                  S.documentTypeList('volunteerOpportunity')
                    .title('Urgent Opportunities')
                    .filter('_type == "volunteerOpportunity" && (urgency == "immediate" || urgency == "high" || isUrgent == true)')
                    .defaultOrdering([{field: 'applicationDeadline', direction: 'asc'}])
                ),
              S.divider(),
              S.listItem()
                .title('Partners')
                .child(
                  S.documentTypeList('partner')
                    .title('Partners')
                    .defaultOrdering([{field: 'tier', direction: 'asc'}, {field: 'displayOrder', direction: 'asc'}])
                ),
              S.listItem()
                .title('Featured Partners')
                .child(
                  S.documentTypeList('partner')
                    .title('Featured Partners')
                    .filter('_type == "partner" && isFeatured == true')
                    .defaultOrdering([{field: 'displayOrder', direction: 'asc'}])
                ),
            ])
        ),

      S.divider(),

      // All document types (backup access)
      S.listItem()
        .title('All Content')
        .child(
          S.list()
            .title('All Content Types')
            .items([
              S.documentTypeListItem('event').title('All Events'),
              S.documentTypeListItem('mission').title('All Missions'),
              S.documentTypeListItem('patientStory').title('All Patient Stories'),
              S.documentTypeListItem('teamMember').title('All Team Members'),
              S.documentTypeListItem('volunteerOpportunity').title('All Volunteer Opportunities'),
              S.documentTypeListItem('partner').title('All Partners'),
              S.documentTypeListItem('missionSnapshot').title('Mission Snapshots'),
              S.documentTypeListItem('globalFootprint').title('Global Footprints'),
              S.documentTypeListItem('contactInfo').title('Contact Information'),
              S.documentTypeListItem('heroSection').title('Hero Sections'),
            ])
        ),
    ])
