import { Resource } from '../../../types/resource.types';

const weekdayHours = {
  monday: { start: '09:00', end: '17:00' },
  tuesday: { start: '09:00', end: '17:00' },
  wednesday: { start: '09:00', end: '17:00' },
  thursday: { start: '09:00', end: '17:00' },
  friday: { start: '09:00', end: '17:00' }
};

/**
 * Shown when the demo API is unavailable so browse and home still have something to display.
 */
export const DEMO_RESOURCES: Resource[] = [
  {
    id: 'demo-study-room',
    name: 'Quiet Study Room',
    description: 'A reservable study room with a whiteboard, outlets, and seating for six. Available to partner campuses on weekdays.',
    image: 'assets/uc-images/resources/study-room.svg',
    tags: ['study room', 'quiet'],
    category: 'Space',
    price: 18,
    location: {
      address: '120 College Ave',
      city: 'Madison',
      state: 'WI',
      zip: '53703'
    },
    availability: weekdayHours,
    resourceOwner: 'demo',
    status: 'active'
  },
  {
    id: 'demo-calculator',
    name: 'Graphing Calculator Set',
    description: 'A classroom set of graphing calculators for exams and lab sections. Pickup is arranged with the lending department.',
    image: 'assets/uc-images/resources/calculator.svg',
    tags: ['calculator', 'math', 'equipment'],
    category: 'Equipment',
    price: 8,
    location: {
      address: '88 Science Hall',
      city: 'Ann Arbor',
      state: 'MI',
      zip: '48109'
    },
    availability: weekdayHours,
    resourceOwner: 'demo',
    status: 'active'
  }
];
