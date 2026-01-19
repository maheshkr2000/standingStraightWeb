import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = createClient({
     projectId: 'wfeqwe3v',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
  // No token needed for public read access
})

// Studio URL configuration
export const getStudioUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:3333'
  }
  // Production: Use your studio Vercel domain
  return 'https://standing-straight-studio.vercel.app'
}

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage | null | undefined) {
  try {
    if (!source || !source.asset || !source.asset._ref) {
      // Return a placeholder builder that generates a simple placeholder
      const placeholderUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9IiMyRDcyRDIiLz48dGV4dCB4PSI5NjAiIHk9IjU0MCIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VXBsb2FkIEhlcm8gSW1hZ2VzPC90ZXh0Pjwvc3ZnPg==';
      const chain = {
        width: (_w: number) => chain,
        height: (_h: number) => chain,
        quality: (_q: number) => chain,
        url: () => placeholderUrl,
      };
      return chain;
    }
    
    // Check if the asset reference is valid
    if (source.asset._ref === '' || source.asset._ref === 'placeholder') {
      // Return a placeholder builder that generates a simple placeholder
      const placeholderUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9IiMyRDcyRDIiLz48dGV4dCB4PSI5NjAiIHk9IjU0MCIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VXBsb2FkIEhlcm8gSW1hZ2VzPC90ZXh0Pjwvc3ZnPg==';
      const chain = {
        width: (_w: number) => chain,
        height: (_h: number) => chain,
        quality: (_q: number) => chain,
        url: () => placeholderUrl,
      };
      return chain;
    }
    
    return builder.image(source)
  } catch (error) {
    console.warn('Error processing image:', error)
    // Return a placeholder builder that generates a simple placeholder
    const placeholderUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9IiMyRDcyRDIiLz48dGV4dCB4PSI5NjAiIHk9IjU0MCIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VXBsb2FkIEhlcm8gSW1hZ2VzPC90ZXh0Pjwvc3ZnPg==';
    const chain = {
      width: (_w: number) => chain,
      height: (_h: number) => chain,
      quality: (_q: number) => chain,
      url: () => placeholderUrl,
    };
    return chain;
  }
}

// GROQ queries for fetching data
export const queries = {
  // Events
  upcomingEvents: `*[_type == "event" && startDate >= now() && isPublished == true] | order(startDate asc) {
    _id,
    title,
    slug,
    eventType,
    startDate,
    endDate,
    location,
    description,
    status,
    urgency,
    capacity,
    teamSize,
    requirements,
    featuredImage,
    isFeatured
  }`,

  featuredEvents: `*[_type == "event" && isFeatured == true && isPublished == true] | order(startDate asc) [0...3] {
    _id,
    title,
    slug,
    eventType,
    startDate,
    endDate,
    location,
    description,
    status,
    urgency,
    capacity,
    featuredImage
  }`,

  // Patient Stories
  patientStories: `*[_type == "patientStory" && isPublished == true] | order(missionDate desc) {
    _id,
    title,
    slug,
    patientName,
    age,
    condition,
    location,
    missionDate,
    summary,
    outcome,
    featuredImage,
    beforeSurgeryImages[],
    afterSurgeryImages[],
    beforeImages[],
    afterImages[],
    videoUrl,
    video{
      url,
      asset->{url},
      file{asset->{url}}
    },
    isFeatured,
    "surgeon": surgeryDetails.surgeon->{name, title}
  }`,

  featuredStories: `*[_type == "patientStory" && isFeatured == true && isPublished == true] | order(missionDate desc) [0...3] {
    _id,
    title,
    slug,
    patientName,
    age,
    condition,
    location,
    summary,
    featuredImage,
    outcome,
    beforeSurgeryImages[],
    afterSurgeryImages[],
    beforeImages[],
    afterImages[],
    videoUrl,
    video{
      url,
      asset->{url},
      file{asset->{url}}
    }
  }`,

  // Team Members
  teamMembers: `*[_type == "teamMember" && isActive == true] | order(displayOrder asc) {
    _id,
    name,
    slug,
    title,
    specialization,
    bio,
    credentials,
    experience,
    hospital,
    location,
    photo,
    role,
    missionCount,
    languages,
    isFeatured
  }`,

  featuredTeamMembers: `*[_type == "teamMember" && isFeatured == true && isActive == true] | order(displayOrder asc) [0...6] {
    _id,
    name,
    title,
    specialization,
    bio,
    photo,
    role,
    missionCount
  }`,

  // Volunteer Opportunities
  volunteerOpportunities: `*[_type == "volunteerOpportunity" && status == "open" && isPublished == true] | order(urgency asc) {
    _id,
    title,
    slug,
    type,
    commitment,
    location,
    description,
    requirements,
    roles,
    impact,
    urgency,
    status,
    openings,
    applicationDeadline,
    startDate,
    featuredImage,
    isUrgent
  }`,

  urgentOpportunities: `*[_type == "volunteerOpportunity" && (urgency == "immediate" || urgency == "high" || isUrgent == true) && status == "open" && isPublished == true] | order(applicationDeadline asc) [0...3] {
    _id,
    title,
    type,
    commitment,
    location,
    description,
    urgency,
    applicationDeadline,
    featuredImage
  }`,

  // Partners
  partners: `*[_type == "partner" && isActive == true] | order(tier asc, displayOrder asc) {
    _id,
    name,
    slug,
    type,
    description,
    location,
    logo,
    website,
    partnership,
    isFeatured,
    tier
  }`,

  featuredPartners: `*[_type == "partner" && isFeatured == true && isActive == true] | order(displayOrder asc) [0...6] {
    _id,
    name,
    type,
    logo,
    website,
    tier
  }`,

  // Missions
  activeMissions: `*[_type == "mission" && status in ["planning", "scheduled", "in-progress"] && isPublished == true] | order(dates.startDate asc) {
    _id,
    name,
    slug,
    missionType,
    description,
    location,
    dates,
    status,
    teamSize,
    objectives,
    statistics,
    featuredImage
  }`,

  completedMissions: `*[_type == "mission" && status == "completed" && isPublished == true] | order(dates.startDate desc) {
    _id,
    name,
    slug,
    missionType,
    description,
    location,
    dates,
    statistics,
    impact,
    featuredImage,
    "successStories": successStories[]->{_id, title, patientName, featuredImage}
  }`,

  // Site Configuration
  missionSnapshot: `*[_type == "missionSnapshot" && isActive == true][0] {
    title,
    description,
    statistics,
    missionStatement,
    visionStatement,
    keyPrograms,
    impactHighlights,
    lastUpdated
  }`,

  globalFootprint: `*[_type == "globalFootprint" && isActive == true][0] {
    title,
    subtitle,
    worldMap,
    statistics,
    locations,
    contactSection,
    isActive
  }`,

  contactInfo: `*[_type == "contactInfo" && isActive == true][0] {
    title,
    description,
    headquarters,
    departmentContacts,
    emergencyContact,
    socialMedia,
    additionalOffices,
    donationInformation,
    mediaKit,
    lastUpdated
  }`,

  howYouCanHelp: `*[_type == "howYouCanHelp" && isActive == true][0] {
    title,
    subtitle,
    cards,
    ctaBannerTitle,
    ctaBannerSubtitle,
    ctaPrimary,
    ctaSecondary,
    isActive,
    lastUpdated
  }`,
}

// Helper functions for common data fetching
export async function getUpcomingEvents() {
  return await client.fetch(queries.upcomingEvents)
}

export async function getFeaturedEvents() {
  return await client.fetch(queries.featuredEvents)
}

export async function getPatientStories() {
  return await client.fetch(queries.patientStories)
}

export async function getFeaturedStories() {
  return await client.fetch(queries.featuredStories)
}

export async function getTeamMembers() {
  return await client.fetch(queries.teamMembers)
}

export async function getFeaturedTeamMembers() {
  return await client.fetch(queries.featuredTeamMembers)
}

export async function getVolunteerOpportunities() {
  return await client.fetch(queries.volunteerOpportunities)
}

export async function getUrgentOpportunities() {
  return await client.fetch(queries.urgentOpportunities)
}

export async function getPartners() {
  return await client.fetch(queries.partners)
}

export async function getFeaturedPartners() {
  return await client.fetch(queries.featuredPartners)
}

export async function getMissionSnapshot() {
  return await client.fetch(queries.missionSnapshot)
}

export async function getGlobalFootprint() {
  return await client.fetch(queries.globalFootprint)
}

export async function getContactInfo() {
  return await client.fetch(queries.contactInfo)
}

export async function getHowYouCanHelp() {
  return await client.fetch(queries.howYouCanHelp)
}

export async function getHeroSection() {
  try {
    const result = await client.fetch(`*[_type == "heroSection"] | order(_createdAt desc) [0]{
      title,
      subtitle,
      description,
      slides[]{
        image{
          asset,
          alt,
          hotspot,
          crop
        },
        caption
      },
      primaryButton{
        text,
        link,
        style
      },
      secondaryButton{
        text,
        link,
        style
      },
      autoplaySpeed,
      showIndicators,
      overlayOpacity,
      isActive
    }`)
    return result;
  } catch (error) {
    return null;
  }
}

// Individual document fetchers
export async function getEventBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "event" && slug.current == $slug && isPublished == true][0] {
      _id,
      title,
      slug,
      eventType,
      startDate,
      endDate,
      location,
      description,
      detailedDescription,
      status,
      urgency,
      capacity,
      teamSize,
      requirements,
      featuredImage,
      isFeatured
    }`,
    { slug }
  )
}

export async function getStoryBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "patientStory" && slug.current == $slug && isPublished == true][0] {
      _id,
      title,
      slug,
      patientName,
      age,
      condition,
      location,
      missionDate,
      summary,
      beforeStory,
      surgeryDetails,
      afterStory,
      currentStatus,
      familyQuote,
      beforeImages,
      afterImages,
      featuredImage,
      outcome,
      followUpMonths,
      "surgeon": surgeryDetails.surgeon->{name, title, photo}
    }`,
    { slug }
  )
}

export async function getTeamMemberBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "teamMember" && slug.current == $slug && isActive == true][0] {
      _id,
      name,
      slug,
      title,
      specialization,
      bio,
      detailedBio,
      credentials,
      experience,
      hospital,
      location,
      photo,
      email,
      socialMedia,
      role,
      missionCount,
      languages,
      isFeatured
    }`,
    { slug }
  )
}

export async function getVolunteerOpportunityBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "volunteerOpportunity" && slug.current == $slug && isPublished == true][0] {
      _id,
      title,
      slug,
      type,
      commitment,
      location,
      description,
      detailedDescription,
      requirements,
      roles,
      impact,
      skillsNeeded,
      training,
      compensation,
      applicationProcess,
      urgency,
      status,
      openings,
      applicationDeadline,
      startDate,
      endDate,
      featuredImage,
      testimonials,
      "relatedMission": relatedMission->{name, location, dates},
      "relatedEvent": relatedEvent->{title, startDate, location}
    }`,
    { slug }
  )
}

// TypeScript interfaces for better type safety
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface Event {
  _id: string
  title: string
  slug: { current: string }
  eventType: string
  startDate: string
  endDate?: string
  location: {
    city: string
    country: string
    venue?: string
  }
  description: string
  status: string
  urgency: string
  capacity?: string
  teamSize?: string
  requirements?: string[]
  featuredImage?: SanityImage
  isFeatured?: boolean
}

export interface PatientStory {
  _id: string
  title: string
  slug: { current: string }
  patientName: string
  age: number
  condition: string
  location: {
    city?: string
    country: string
  }
  missionDate: string
  summary: string
  outcome: string
  featuredImage: SanityImage
  isFeatured?: boolean
}

export interface TeamMember {
  _id: string
  name: string
  slug: { current: string }
  title: string
  specialization: string
  bio: string
  credentials?: string[]
  experience?: number
  hospital?: string
  location?: {
    city?: string
    country?: string
  }
  photo: SanityImage
  role: string
  missionCount?: number
  languages?: string[]
  isFeatured?: boolean
}

export interface VolunteerOpportunity {
  _id: string
  title: string
  slug: { current: string }
  type: string
  commitment: string
  location: string
  description: string
  requirements: string[]
  roles?: string[]
  impact: string
  urgency: string
  status: string
  openings?: number
  applicationDeadline?: string
  startDate?: string
  featuredImage?: SanityImage
  isUrgent?: boolean
}

export interface Partner {
  _id: string
  name: string
  slug: { current: string }
  type: string
  description?: string
  location: {
    city?: string
    country: string
  }
  logo: SanityImage
  website?: string
  partnership?: {
    type: string
    contributions?: string[]
    missionsTogether?: number
  }
  isFeatured?: boolean
  tier: string
}

export interface HeroSection {
  _id?: string
  title: string
  subtitle: string
  description: string
  slides: {
    image: SanityImage
    caption?: string
  }[]
  primaryButton: {
    text: string
    link: string
    style: string
  }
  secondaryButton: {
    text: string
    link: string
    style: string
  }
  autoplaySpeed: number
  showIndicators: boolean
  overlayOpacity: number
}

export interface MissionSnapshot {
  _id?: string
  title: string
  description: string
  statistics: {
    surgeriesPerformed: number
    childrenHelped: number
    countriesServed: number
    localSurgeonsTrained: number
    partnersActive?: number
    volunteersEngaged?: number
  }
  missionStatement: string
  visionStatement?: string
  keyPrograms: {
    title: string
    description: string
    icon: string
  }[]
  impactHighlights: {
    metric: string
    value: string
    description: string
  }[]
  lastUpdated: string
  isActive: boolean
}

export interface GlobalFootprint {
  _id?: string
  title: string
  subtitle: string
  worldMap: SanityImage
  statistics: {
    countriesActive: number
    partnerHospitals: string
  }
  locations: {
    country: string
    city: string
    role: string
    description: string
  }[]
  contactSection: {
    title: string
    ctaButton: {
      text: string
      link: string
    }
  }
  isActive: boolean
}
