import { v4 as uuid } from 'uuid';
import randomColor from 'randomcolor'; // Assuming you have a library for generating random colors

// Array of users with their avatars
const usersWithAvatars = [
  { id: 1, name: 'John Doe', avatar: 'https://example.com/avatar1.png' },
  { id: 2, name: 'Jane Smith', avatar: 'https://example.com/avatar2.png' },
  // Add more users as needed
];

// Define the taskLimitNumber
const taskLimitNumber = 10; // Set your task limit number

// Raw data with columns and tasks including assignees
export const columnsRawData = [
  {
    id: 1,
    name: 'No Status',
    limit: taskLimitNumber,
    color: randomColor({ luminosity: 'light' }),
    taskIds: [
      {
        id: uuid(),
        text: 'This is a task description of Learn GraphQL',
        idColumn: 1,
        title: 'Learn GraphQL',
        comments: ['good', 'wowo'],
        assignee: usersWithAvatars,
        attachments:[] // Assign a user to the task
      },
      {
        id: uuid(),
        text: 'New slides for presentation',
        idColumn: 1,
        title: 'Complete the Presentation',
        comments: ['good', 'wowo'],
        assignee: usersWithAvatars, 
        attachments:[]// Assign another user to the task
      },
    ],
  },
  {
    id: 2,
    name: 'ToDo',
    limit: taskLimitNumber,
    color: randomColor({ luminosity: 'light' }),
    taskIds: [
      {
        id: uuid(),
        text: 'Blog assets',
        idColumn: 2,
        title: 'Finalize Blogs',
        comments: ['good', 'wowo'],
        assignee: usersWithAvatars,
        attachments:[] // Assign a user to the task
      },
    ],
  },
  {
    id: 3,
    name: 'In Progress',
    limit: taskLimitNumber,
    color: randomColor({ luminosity: 'light' }),
    taskIds: [
      {
        id: uuid(),
        text: 'Change css img',
        idColumn: 3,
        title: 'Meeting with Airtribe',
        comments:["good","wowo"],
        assignee: usersWithAvatars,
        attachments:[] // Assign a user to the task
      },
      {
        id: uuid(),
        text: 'Meeting',
        idColumn: 3,
        title: 'Wash Clothes',
        comments:["good","wowo"],
        assignee: usersWithAvatars,
        attachments:[] // Assign another user to the task
      },
    ],
  },
  {
    id: 4,
    name: 'Done',
    limit: taskLimitNumber,
    color: randomColor({ luminosity: 'light' }),
    taskIds: [],
  },
];
