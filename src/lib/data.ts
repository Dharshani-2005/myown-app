import {
  Calendar,
  CheckSquare,
  BookOpen,
  GraduationCap,
  Mic,
  Briefcase,
  HeartHandshake,
  User,
  Settings,
  Bot,
} from 'lucide-react';

export const user = {
  name: 'Alex Doe',
  email: 'alex.doe@university.edu',
  avatar: '/avatars/01.png',
  branch: 'Computer Science',
  year: '3rd Year',
  section: 'A',
  whatsapp: '+1234567890',
};

export const timetable = [
  { day: 'Monday', time: '9:00 AM', subject: 'Data Structures', color: 'bg-red-200' },
  { day: 'Monday', time: '11:00 AM', subject: 'Operating Systems', color: 'bg-blue-200' },
  { day: 'Tuesday', time: '10:00 AM', subject: 'Database Management', color: 'bg-green-200' },
  { day: 'Wednesday', time: '9:00 AM', subject: 'Data Structures Lab', color: 'bg-red-200' },
  { day: 'Thursday', time: '1:00 PM', subject: 'Algorithms', color: 'bg-yellow-200' },
  { day: 'Friday', time: '10:00 AM', subject: 'Operating Systems Lab', color: 'bg-blue-200' },
];

export const deadlines = [
  { id: 'task-1', title: 'OS Assignment 3', dueDate: '3 days', subject: 'Operating Systems' },
  { id: 'task-2', title: 'DBMS Project Phase 1', dueDate: '5 days', subject: 'Database Management' },
  { id: 'task-3', title: 'DSA Quiz 2', dueDate: 'Next week', subject: 'Data Structures' },
];

export const tasks = {
  todo: [
    { id: 'task-1', content: 'Finish OS Assignment 3', priority: 'High' },
    { id: 'task-2', content: 'Prepare for DSA Quiz 2', priority: 'Medium' },
    { id: 'task-5', content: 'Start DBMS Project Phase 1', priority: 'High' },
  ],
  doing: [
    { id: 'task-3', content: 'Reading Chapter 5 of OS textbook', priority: 'Medium' },
    { id: 'task-6', content: 'Group meeting for DBMS project', priority: 'Low' },
  ],
  done: [
    { id: 'task-4', content: 'Submit DSA Assignment 2', priority: 'High' },
  ],
};

export const notes = [
  { id: 'note-1', title: 'Quick Sort Implementation', tags: ['dsa', 'algorithms'], pinned: true },
  { id: 'note-2', title: 'Virtual Memory Concepts', tags: ['os'], pinned: false },
  { id: 'note-3', title: 'SQL Join Types', tags: ['dbms', 'sql'], pinned: false },
  { id: 'note-4', title: 'Hackathon Ideas', tags: ['projects'], pinned: true },
];

export const communityUpdates = [
    { id: 'comm-1', user: 'Jane Smith', content: 'Posted a new set of notes for the upcoming "Algorithms" exam.' },
    { id: 'comm-2', user: 'Admin', content: 'New workshop on "Intro to Docker" scheduled for this Friday.' },
    { id: 'comm-3', user: 'Project Group C', content: 'Looking for one more member for the DBMS project.' },
];

export const placementPrep = {
    "Technical Round": [
        {
          company: "Google",
          question: "Given two sorted arrays, find the median of the combined array.",
          bruteForce: "Combine both arrays, sort the new array, and find the median. O( (m+n)log(m+n) ) time.",
          better: "Use two pointers to merge the arrays into a new array, then find the median. O(m+n) time, O(m+n) space.",
          optimal: "Use binary search on the smaller array to find the correct partition. O(log(min(m,n))) time.",
          practiceLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
          concept: "Binary Search, Two Pointers, Array Partitioning"
        },
        {
          company: "Amazon",
          question: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes.",
          bruteForce: "For each node, check if it's an ancestor of both given nodes. Store paths from root to both nodes and find the last common node. O(n) time, O(n) space.",
          better: "Recursive approach. If the current node is one of the two nodes, return it. Recursively search left and right. If both searches return a non-null node, the current node is the LCA. O(n) time.",
          optimal: "Same as better approach, it's the most optimal for a binary tree without parent pointers. O(n) time, O(h) space where h is the height of the tree.",
          practiceLink: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
          concept: "Tree Traversal, Recursion, DFS"
        },
        {
          company: "Microsoft",
          question: "Design a data structure that supports insert, delete, and getRandom in O(1) time.",
          bruteForce: "Using a hash map alone works for insert/delete but not O(1) getRandom. Using an array alone works for getRandom but not O(1) delete.",
          better: "N/A",
          optimal: "Use a combination of a hash map and an array (or dynamic array/vector). The hash map stores element-to-index mapping. The array stores the elements. To delete, swap the element with the last element and pop, updating the map. O(1) average time for all operations.",
          practiceLink: "https://leetcode.com/problems/insert-delete-getrandom-o1/",
          concept: "Data Structure Design, Hash Maps, Arrays"
        }
    ],
    "Non-Technical / HR": [
        {
          company: "All Companies",
          question: "Tell me about yourself.",
          trick: "The 'Elevator Pitch'. Structure your answer in 3 parts: 1. Present: Who you are and what you do. 2. Past: Your relevant experience and a key achievement. 3. Future: Why you're interested in this role and company. Keep it under 90 seconds."
        },
        {
          company: "All Companies",
          question: "What are your strengths and weaknesses?",
          trick: "For strengths, pick 2-3 relevant to the job and have a specific example for each. For weaknesses, choose a real but non-critical weakness, show self-awareness, and explain what steps you are taking to improve it. (e.g., 'I sometimes get too focused on details, but I'm learning to balance it by setting time limits for tasks.')"
        },
        {
          company: "Amazon",
          question: "Tell me about a time you had to deal with a difficult customer/teammate. (Behavioral)",
          trick: "Use the STAR method: **S**ituation (Describe the context), **T**ask (What was your goal?), **A**ction (What specific steps did you take?), **R**esult (What was the outcome? Quantify if possible). This is key for all Amazon Leadership Principle questions."
        }
    ],
    "MCQ Challenge": [
        {
            question: "What is the time complexity of a lookup in a balanced binary search tree?",
            options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
            answer: "O(log n)"
        },
        {
            question: "Which of the following is not an O(n log n) sorting algorithm?",
            options: ["Merge Sort", "Quick Sort", "Heap Sort", "Bubble Sort"],
            answer: "Bubble Sort"
        },
        {
            question: "In object-oriented programming, what is polymorphism?",
            options: ["The ability of an object to take on many forms", "The process of hiding implementation details", "The ability to create a new class from an existing class", "The bundling of data and methods that operate on the data"],
            answer: "The ability of an object to take on many forms"
        }
    ]
}

export const mainNav = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Calendar,
  },
  {
    title: 'Tasks',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Notes',
    href: '/notes',
    icon: BookOpen,
  },
];

export const aiToolsNav = [
    {
        title: 'Study AI',
        href: '/study-ai',
        icon: Bot,
    },
    {
        title: 'Interview AI',
        href: '/interview-ai',
        icon: Mic,
    },
    {
        title: 'Career AI',
        href: '/career',
        icon: Briefcase,
    }
]

export const secondaryNav = [
    {
        title: 'Community',
        href: '/community',
        icon: HeartHandshake,
    },
    {
        title: 'Profile',
        href: '/profile',
        icon: User,
    },
]
