import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getUpcomingEvents,
  getFeaturedEvents,
  getPatientStories,
  getFeaturedStories,
  getTeamMembers,
  getFeaturedTeamMembers,
  getVolunteerOpportunities,
  getUrgentOpportunities,
  getPartners,
  getFeaturedPartners,
  getMissionSnapshot,
  getGlobalFootprint,
  getContactInfo,
  getHeroSection,
  getEventBySlug,
  getStoryBySlug,
  getTeamMemberBySlug,
  getVolunteerOpportunityBySlug,
  getHowYouCanHelp,
} from '@/lib/sanity'

// Default query options to prevent infinite loops
const defaultQueryOptions = {
  retry: (failureCount: number, error: Error | { message?: string; status?: number }) => {
    // Don't retry on CORS errors or 403 errors
    if (error?.message?.includes('CORS') || (error as { status?: number })?.status === 403) {
      return false
    }
    // Only retry up to 2 times for other errors
    return failureCount < 2
  },
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  refetchOnWindowFocus: false, // Prevent refetch on window focus
  refetchOnReconnect: false, // Prevent refetch on reconnect
}

// Hook for upcoming events
export function useUpcomingEvents() {
  return useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: getUpcomingEvents,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...defaultQueryOptions,
  })
}

// Hook for featured events
export function useFeaturedEvents() {
  return useQuery({
    queryKey: ['featuredEvents'],
    queryFn: getFeaturedEvents,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook for patient stories
export function usePatientStories() {
  return useQuery({
    queryKey: ['patientStories'],
    queryFn: getPatientStories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Hook for featured stories
export function useFeaturedStories() {
  return useQuery({
    queryKey: ['featuredStories'],
    queryFn: getFeaturedStories,
    staleTime: 10 * 60 * 1000,
  })
}

// Hook for team members
export function useTeamMembers() {
  return useQuery({
    queryKey: ['teamMembers'],
    queryFn: getTeamMembers,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Hook for featured team members
export function useFeaturedTeamMembers() {
  return useQuery({
    queryKey: ['featuredTeamMembers'],
    queryFn: getFeaturedTeamMembers,
    staleTime: 30 * 60 * 1000,
  })
}

// Hook for volunteer opportunities
export function useVolunteerOpportunities() {
  return useQuery({
    queryKey: ['volunteerOpportunities'],
    queryFn: getVolunteerOpportunities,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook for urgent opportunities
export function useUrgentOpportunities() {
  return useQuery({
    queryKey: ['urgentOpportunities'],
    queryFn: getUrgentOpportunities,
    staleTime: 2 * 60 * 1000, // 2 minutes for urgent content
  })
}

// Hook for partners
export function usePartners() {
  return useQuery({
    queryKey: ['partners'],
    queryFn: getPartners,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

// Hook for featured partners
export function useFeaturedPartners() {
  return useQuery({
    queryKey: ['featuredPartners'],
    queryFn: getFeaturedPartners,
    staleTime: 60 * 60 * 1000,
  })
}

// Hook for mission snapshot (homepage stats)
export function useMissionSnapshot() {
  return useQuery({
    queryKey: ['missionSnapshot'],
    queryFn: getMissionSnapshot,
    staleTime: 30 * 60 * 1000,
    ...defaultQueryOptions,
  })
}

// Hook for global footprint
export function useGlobalFootprint() {
  return useQuery({
    queryKey: ['globalFootprint'],
    queryFn: getGlobalFootprint,
    staleTime: 60 * 60 * 1000,
  })
}

// Hook for contact information
export function useContactInfo() {
  return useQuery({
    queryKey: ['contactInfo'],
    queryFn: getContactInfo,
    staleTime: 60 * 60 * 1000,
  })
}

// Hook for hero section
export function useHeroSection() {
  return useQuery({
    queryKey: ['heroSection'],
    queryFn: getHeroSection,
    staleTime: 60 * 60 * 1000,
    ...defaultQueryOptions,
  })
}

// Hook for individual event by slug
export function useEventBySlug(slug: string) {
  return useQuery({
    queryKey: ['event', slug],
    queryFn: () => getEventBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  })
}

// Hook for individual story by slug
export function useStoryBySlug(slug: string) {
  return useQuery({
    queryKey: ['story', slug],
    queryFn: () => getStoryBySlug(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000,
  })
}

// Hook for individual team member by slug
export function useTeamMemberBySlug(slug: string) {
  return useQuery({
    queryKey: ['teamMember', slug],
    queryFn: () => getTeamMemberBySlug(slug),
    enabled: !!slug,
    staleTime: 60 * 60 * 1000,
  })
}

// Hook for individual volunteer opportunity by slug
export function useVolunteerOpportunityBySlug(slug: string) {
  return useQuery({
    queryKey: ['volunteerOpportunity', slug],
    queryFn: () => getVolunteerOpportunityBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  })
}

// Hook for how you can help
export function useHowYouCanHelp() {
  return useQuery({
    queryKey: ['howYouCanHelp'],
    queryFn: getHowYouCanHelp,
    staleTime: 60 * 60 * 1000,
  })
}

// Hook for prefetching data (useful for route preloading)
export function usePrefetchData() {
  const queryClient = useQueryClient()

  const prefetchEvents = () => {
    queryClient.prefetchQuery({
      queryKey: ['upcomingEvents'],
      queryFn: getUpcomingEvents,
      staleTime: 5 * 60 * 1000,
    })
  }

  const prefetchStories = () => {
    queryClient.prefetchQuery({
      queryKey: ['patientStories'],
      queryFn: getPatientStories,
      staleTime: 10 * 60 * 1000,
    })
  }

  const prefetchTeam = () => {
    queryClient.prefetchQuery({
      queryKey: ['teamMembers'],
      queryFn: getTeamMembers,
      staleTime: 30 * 60 * 1000,
    })
  }

  const prefetchVolunteers = () => {
    queryClient.prefetchQuery({
      queryKey: ['volunteerOpportunities'],
      queryFn: getVolunteerOpportunities,
      staleTime: 5 * 60 * 1000,
    })
  }

  return {
    prefetchEvents,
    prefetchStories,
    prefetchTeam,
    prefetchVolunteers,
  }
}

// Error boundary hook for Sanity data
export function useSanityError(error: Error | null) {
  if (error) {
    console.error('Sanity data fetch error:', error)
    
    // You could integrate with error reporting service here
    // e.g., Sentry, LogRocket, etc.
    
    return {
      hasError: true,
      message: 'Unable to load content. Please try again later.',
      canRetry: true,
    }
  }

  return {
    hasError: false,
    message: null,
    canRetry: false,
  }
}
