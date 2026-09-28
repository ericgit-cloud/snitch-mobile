export type ReportStatus = 'pending' | 'under_review' | 'verified' | 'resolved';

export type ReportCategory =
  | 'Illegal Dumping'
  | 'Vandalism'
  | 'Traffic Violation'
  | 'Noise Complaint'
  | 'Theft'
  | 'Illegal Parking';

export type Report = {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  mediaType: 'photo' | 'video';
  mediaUrl: string;
  videoDuration?: string;
  location: string;
  createdAt: Date;
  status: ReportStatus;
  upvotes: number;
  comments: number;
  anonymous: boolean;
  reporter?: string;
};

const minutesAgo = (m: number) => new Date(Date.now() - m * 60 * 1000);

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Mattresses and trash bags dumped behind the park',
    description:
      'Someone dumped a pile of mattresses and bags of garbage overnight next to the playground entrance.',
    category: 'Illegal Dumping',
    mediaType: 'photo',
    mediaUrl: 'https://picsum.photos/seed/snitch-dump/600/400',
    location: 'Riverside Park, N Entrance',
    createdAt: minutesAgo(12),
    status: 'pending',
    upvotes: 24,
    comments: 5,
    anonymous: true,
  },
  {
    id: '2',
    title: 'Car ran a red light at school crossing',
    description:
      'Silver sedan went straight through the red while kids were crossing. Plate visible at 0:08.',
    category: 'Traffic Violation',
    mediaType: 'video',
    mediaUrl: 'https://picsum.photos/seed/snitch-traffic/600/400',
    videoDuration: '0:21',
    location: 'Oak St & 5th Ave',
    createdAt: minutesAgo(47),
    status: 'under_review',
    upvotes: 112,
    comments: 18,
    anonymous: false,
    reporter: 'maria.k',
  },
  {
    id: '3',
    title: 'Graffiti on the new library wall',
    description:
      'Fresh spray paint across the whole east wall of the library that opened last month.',
    category: 'Vandalism',
    mediaType: 'photo',
    mediaUrl: 'https://picsum.photos/seed/snitch-graffiti/600/400',
    location: 'Central Library, East Wall',
    createdAt: minutesAgo(180),
    status: 'verified',
    upvotes: 58,
    comments: 9,
    anonymous: true,
  },
  {
    id: '4',
    title: 'Bike stolen from rack outside café',
    description:
      'Caught a person cutting the lock on a blue road bike around 2pm. Heading south on foot.',
    category: 'Theft',
    mediaType: 'video',
    mediaUrl: 'https://picsum.photos/seed/snitch-bike/600/400',
    videoDuration: '0:43',
    location: 'Bean There Café, Main St',
    createdAt: minutesAgo(60 * 6),
    status: 'under_review',
    upvotes: 87,
    comments: 22,
    anonymous: false,
    reporter: 'jdavis',
  },
  {
    id: '5',
    title: 'Truck blocking fire hydrant for 3 hours',
    description:
      'Delivery truck parked directly in front of the hydrant with hazards on since 9am.',
    category: 'Illegal Parking',
    mediaType: 'photo',
    mediaUrl: 'https://picsum.photos/seed/snitch-parking/600/400',
    location: '1422 Elm Street',
    createdAt: minutesAgo(60 * 26),
    status: 'resolved',
    upvotes: 31,
    comments: 3,
    anonymous: true,
  },
  {
    id: '6',
    title: 'Loud music from warehouse after 2am',
    description:
      'Third weekend in a row. Bass is audible from several blocks away.',
    category: 'Noise Complaint',
    mediaType: 'video',
    mediaUrl: 'https://picsum.photos/seed/snitch-noise/600/400',
    videoDuration: '1:05',
    location: 'Industrial Ave warehouse',
    createdAt: minutesAgo(60 * 50),
    status: 'pending',
    upvotes: 19,
    comments: 7,
    anonymous: false,
    reporter: 'nightowl',
  },
];

export function timeAgo(date: Date): string {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) {
    return 'just now';
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  return `${Math.floor(hours / 24)}d ago`;
}
