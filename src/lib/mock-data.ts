export type Attachment = {
  name: string;
  type: 'spreadsheet' | 'document' | 'image' | 'pdf';
  size: string;
};

export type Email = {
  id: string;
  from: {
    name: string;
    email: string;
    avatarId: string;
  };
  subject: string;
  body: string;
  timestamp: string;
  source: 'Gmail' | 'Outlook' | 'Slack' | 'Teams';
  attachments: Attachment[];
  read: boolean;
};

export const mockEmails: Email[] = [
  {
    id: '1',
    from: {
      name: 'Sarah Johnson',
      email: 'sarah.j@examplecorp.com',
      avatarId: 'avatar1',
    },
    subject: 'Q3 Budget Proposal',
    body: "Hi team, please find attached the initial draft for the Q3 budget. It includes a detailed breakdown in the spreadsheet. Let's discuss this in our meeting tomorrow. I've incorporated the feedback from Alex regarding the marketing spend.",
    timestamp: '2024-07-29T10:00:00Z',
    source: 'Gmail',
    attachments: [
      {
        name: 'Q3_Budget_Draft_v1.xlsx',
        type: 'spreadsheet',
        size: '1.2MB',
      },
    ],
    read: false,
  },
  {
    id: '2',
    from: {
      name: 'Alex Chen',
      email: 'alex.chen@examplecorp.com',
      avatarId: 'avatar2',
    },
    subject: 'Re: Q3 Budget Proposal',
    body: "Thanks, Sarah. I've had a quick look at the spreadsheet. The numbers for the new ad campaign look promising. I have a few questions about the projected ROI for the European market. Let's sync up before the meeting.",
    timestamp: '2024-07-29T11:30:00Z',
    source: 'Outlook',
    attachments: [],
    read: true,
  },
  {
    id: '3',
    from: {
      name: 'Michael Brown',
      email: 'michael.b@slack',
      avatarId: 'avatar3',
    },
    subject: 'Project Phoenix Update',
    body: 'Quick update on Project Phoenix: The design mockups are almost complete. @Priya, can you share the latest user feedback report? The dev team is waiting for it to finalize the sprint plan.',
    timestamp: '2024-07-28T15:45:00Z',
    source: 'Slack',
    attachments: [],
    read: false,
  },
  {
    id: '4',
    from: {
      name: 'Priya Patel',
      email: 'priya.p@teams',
      avatarId: 'avatar4',
    },
    subject: 'User Feedback Report - Project Phoenix',
    body: "Here is the user feedback report from last week's testing session. Overall sentiment is positive, but there are some concerns about the new navigation flow. I've highlighted the key takeaways in the attached PDF.",
    timestamp: '2024-07-28T16:20:00Z',
    source: 'Teams',
    attachments: [
      {
        name: 'User_Feedback_Phoenix_July.pdf',
        type: 'pdf',
        size: '800KB',
      },
    ],
    read: true,
  },
  {
    id: '5',
    from: {
      name: 'David Miller',
      email: 'david.m@examplecorp.com',
      avatarId: 'avatar5',
    },
    subject: 'Annual Performance Reviews',
    body: "Just a reminder that the deadline for submitting your self-assessment for the annual performance review is this Friday. Please make sure to complete it on the HR portal. Let me know if you have any questions.",
    timestamp: '2024-07-27T09:00:00Z',
    source: 'Gmail',
    attachments: [],
    read: true,
  },
];
