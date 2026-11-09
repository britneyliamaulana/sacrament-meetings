
import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-10-25',
    meetingType: 'testimony',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Williams',
    announcements: ['Ward activity next Saturday.'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Johnson',
    wardBusiness: [
      { description: 'Sustain the new ward calling.' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [
      {
        name: 'Ward Members',
        topic: 'Personal Testimonies',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    closingPrayer: 'Brother Smith',
  },
  {
    id: 2,
    date: '2026-11-01',
    meetingType: 'regular',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Williams',
    announcements: ['Youth activity on Wednesday.'],
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Brother Brown',
    wardBusiness: [
      { description: 'Ward council updates.' },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [
      {
        name: 'Sister Davis',
        topic: 'Faith in Jesus Christ',
        type: 'speaker',
      },
      {
        name: 'Brother Clark',
        topic: 'Serving Others',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 81, title: 'Press Forward, Saints' },
    closingPrayer: 'Sister Taylor',
  },
  {
    id: 3,
    date: '2026-11-08',
    meetingType: 'regular',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Williams',
    announcements: ['Temple preparation class this week.'],
    openingHymn: { number: 10, title: 'Come, Sing to the Lord' },
    openingPrayer: 'Sister Miller',
    wardBusiness: [
      { description: 'Upcoming ward service project.' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      {
        name: 'Brother James',
        topic: 'The Power of Prayer',
        type: 'speaker',
      },
      {
        name: 'Sister Wilson',
        topic: 'Following Christ',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 134, title: 'I Believe in Christ' },
    closingPrayer: 'Brother Lee',
  },
  {
    id: 4,
    date: '2026-11-15',
    meetingType: 'stake',
    presiding: 'Stake President Johnson',
    conducting: 'Brother Adams',
    announcements: ['Stake conference preparation meeting.'],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Green',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 194, title: 'There Is a Green Hill Far Away' },
    speakers: [
      {
        name: 'Stake President Johnson',
        topic: 'Strengthening Families',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Sister White',
  },
  {
    id: 5,
    date: '2026-11-22',
    meetingType: 'general',
    presiding: 'Elder Anderson',
    conducting: 'Brother Williams',
    announcements: [],
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Brother Smith',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      {
        name: 'Elder Anderson',
        topic: 'The Gospel of Jesus Christ',
        type: 'speaker',
      },
      {
        name: 'Ward Choir',
        topic: 'Musical Number',
        type: 'musical-number',
      },
    ],
    closingHymn: { number: 89, title: 'The Lord Is My Light' },
    closingPrayer: 'Sister Davis',
  },
];
export function getMeetings(
  date?: string | null
): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(
  id: number
): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}