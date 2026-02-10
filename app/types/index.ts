export interface Excursion {
  id: string
  title: string
  city: string
  description: string
  fullDescription: string
  duration: string
  price: number
  image: string
  images?: string[]
  highlights: string[]
  isFeatured?: boolean
  featuredLabel?: string
}

export interface Yacht {
  id: string
  title: string
  type: string
  port?: string
  capacity: number
  length: string
  description: string
  fullDescription: string
  pricePerHour: number
  image: string
  images?: string[]
  features: string[]
  isFeatured?: boolean
  featuredLabel?: string
}

export interface GroupTrip {
  id: string
  title: string
  description: string
  fullDescription: string
  duration: string
  pricePerTicket: number
  image: string
  images?: string[]
  highlights: string[]
}

export interface BookingFormState {
  type: 'booking' | 'callback'
  serviceType?: 'excursion' | 'yacht'
  serviceTitle?: string
  name: string
  phone: string
  date?: string
  comment?: string
}

export interface NotifyRequest {
  type: 'booking' | 'callback'
  serviceType?: string
  serviceTitle?: string
  name: string
  phone: string
  date?: string
  comment?: string
}
