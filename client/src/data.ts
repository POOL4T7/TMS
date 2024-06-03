interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
];

function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

export const rows = [
  createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(2, 'Donut', 452, 25.0, 51, 4.9),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
  createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
  createData(9, 'KitKat', 518, 26.0, 65, 7.0),
  createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
  createData(11, 'Marshmallow', 318, 0, 81, 2.0),
  createData(12, 'Nougat', 360, 19.0, 9, 37.0),
  createData(13, 'Oreo', 437, 18.0, 63, 4.0),
];

export const TaskListData = [
  {
    _id: 'bcjksnxscsdcsd6c78s1',
    title: 'Gensis kanban board',
    project: {
      _id: 'project1sjdc',
      name: 'Gensis',
    },
    assignedTo: {
      _id: 'user1sjdc',
      firstName: 'Gulshan',
    },
    labels: ['UI'],
    priority: 'high',
    type: 'feature',
    status: 'completed',
    description: 'implment the UI of kanban board.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'bcjksnxdcsd6c78s2',
    title: 'Implement elastic search for user and project searching',
    project: {
      _id: 'project1sjdc',
      name: 'Gensis',
    },
    assignedTo: {
      _id: 'user1sjdc2',
      firstName: 'Pool',
    },
    labels: ['server'],
    priority: 'medium',
    type: 'issue',
    status: 'pending',
    description:
      'Implement elastic search for user and project searching and kanban board.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'bcjscsdcsd6c78s3',
    title: 'Implement Task Flow',
    project: {
      _id: 'project1sjdc',
      name: 'Gensis',
    },
    assignedTo: {
      _id: 'user1sjdc',
      firstName: 'agent4t7',
    },
    labels: ['server', 'nodejs'],
    priority: 'high',
    type: 'feature',
    status: 'inprogress',
    description: 'implment the UI of kanban board.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'task1abc123',
    title: 'Build Login Page',
    project: {
      _id: 'project1xyz',
      name: 'ProjectX',
    },
    assignedTo: {
      _id: 'user123',
      firstName: 'JohnDoe',
    },
    labels: ['UI', 'frontend'],
    priority: 'high',
    type: 'feature',
    status: 'inprogress',
    description: 'Create the login page with responsive design.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'task2def456',
    title: 'Set Up Database',
    project: {
      _id: 'project2abc',
      name: 'BackendProject',
    },
    assignedTo: {
      _id: 'user456',
      firstName: 'JaneSmith',
    },
    labels: ['database', 'server'],
    priority: 'medium',
    type: 'task',
    status: 'pending',
    description: 'Configure the database schema and set up initial tables.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'task3ghi789',
    title: 'Design Landing Page',
    project: {
      _id: 'project3def',
      name: 'FrontendProject',
    },
    assignedTo: {
      _id: 'user789',
      firstName: 'AlexJohnson',
    },
    labels: ['design', 'UI'],
    priority: 'low',
    type: 'feature',
    status: 'completed',
    description: 'Design a visually appealing landing page.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'task4jkl012',
    title: 'Integrate Payment Gateway',
    project: {
      _id: 'project4ghi',
      name: 'ECommerceProject',
    },
    assignedTo: {
      _id: 'user012',
      firstName: 'ChrisLee',
    },
    labels: ['backend', 'payments'],
    priority: 'high',
    type: 'feature',
    status: 'inreview',
    description: 'Integrate Stripe payment gateway for handling transactions.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'task5mno345',
    title: 'Optimize SEO',
    project: {
      _id: 'project5jkl',
      name: 'MarketingProject',
    },
    assignedTo: {
      _id: 'user345',
      firstName: 'PatTaylor',
    },
    labels: ['SEO', 'marketing'],
    priority: 'medium',
    type: 'task',
    status: 'pending',
    description: 'Optimize website content for search engines.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'task6pqr678',
    title: 'Implement Authentication',
    project: {
      _id: 'project6mno',
      name: 'SecurityProject',
    },
    assignedTo: {
      _id: 'user678',
      firstName: 'JordanBaker',
    },
    labels: ['security', 'backend'],
    priority: 'high',
    type: 'feature',
    status: 'inreview',
    description: 'Implement user authentication and authorization.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'task7stu901',
    title: 'Create API Documentation',
    project: {
      _id: 'project7pqr',
      name: 'APIDocsProject',
    },
    assignedTo: {
      _id: 'user901',
      firstName: 'CaseySmith',
    },
    labels: ['documentation', 'API'],
    priority: 'low',
    type: 'task',
    status: 'completed',
    description: 'Write comprehensive API documentation for developers.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'task8vwx234',
    title: 'Test Mobile Responsiveness',
    project: {
      _id: 'project8stu',
      name: 'TestingProject',
    },
    assignedTo: {
      _id: 'user234',
      firstName: 'JamieBrown',
    },
    labels: ['testing', 'mobile'],
    priority: 'medium',
    type: 'task',
    status: 'pending',
    description: 'Ensure the application is responsive on mobile devices.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'task9yzb567',
    title: 'Deploy to Production',
    project: {
      _id: 'project9vwx',
      name: 'DeploymentProject',
    },
    assignedTo: {
      _id: 'user567',
      firstName: 'RobinWhite',
    },
    labels: ['deployment', 'server'],
    priority: 'high',
    type: 'task',
    status: 'prnding',
    description: 'Deploy the latest version of the application to production.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
  {
    _id: 'task10cde890',
    title: 'Set Up CI/CD Pipeline',
    project: {
      _id: 'project10yzb',
      name: 'AutomationProject',
    },
    assignedTo: {
      _id: 'user890',
      firstName: 'MorganGreen',
    },
    labels: ['automation', 'CI/CD'],
    priority: 'high',
    type: 'feature',
    status: 'pending',
    description: 'Set up continuous integration and deployment pipeline.',
    startDate: '2024-05-31T06:25:00+05:30',
    dueDate: '2024-05-31T08:25:00+05:30',
  },
];

export const labelList = [
  {
    _id: 'label-1',
    name: 'server',
  },
  {
    _id: 'label-2',
    name: 'web',
  },
  {
    _id: 'label-3',
    name: 'UI',
  },
  {
    _id: 'label-4',
    name: 'automation',
  },
  {
    _id: 'label-5',
    name: 'CI/CD',
  },
  {
    _id: 'label-6',
    name: 'deployment',
  },
  {
    _id: 'label-7',
    name: 'bug',
  },
  {
    _id: 'label-8',
    name: 'issue',
  },
];
