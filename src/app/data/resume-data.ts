import {
  PersonalInfo,
  Experience,
  SkillCategory,
  Project,
  Achievement,
  Education,
  Certification,
  NavItem,
} from '../models/portfolio.models';

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', sectionId: 'about' },
  { label: 'Experience', sectionId: 'experience' },
  { label: 'Skills', sectionId: 'skills' },
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Achievements', sectionId: 'achievements' },
  { label: 'Certifications', sectionId: 'certifications' },
  { label: 'Education', sectionId: 'education' },
  { label: 'Contact', sectionId: 'contact' },
];

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Aakash Vishwakarma',
  tagline: 'Software Engineer | Building Scalable Systems for 5M+ Users',
  bio: 'Software Engineer with 2.5+ years at Jio, building scalable backends, high-performance APIs, and automating workflows for platforms serving 5M+ users. Passionate about optimized systems and delivering real-world impact.',
  email: 'aakashvish22@gmail.com',
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/wolbek',
      icon: 'github',
      label: 'GitHub Profile',
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aakashvish22/',
      icon: 'linkedin',
      label: 'LinkedIn Profile',
    },
    {
      platform: 'Email',
      url: 'mailto:aakashvish22@gmail.com',
      icon: 'mail',
      label: 'Send Email',
    },
  ],
  stats: [
    { value: '2.5+', numericValue: 2.5, suffix: '+', label: 'Years Experience' },
    { value: '5M+', numericValue: 5, suffix: 'M+', label: 'Users Served' },
    { value: '9.47', numericValue: 9.47, suffix: '', label: 'GPA / 10' },
  ],
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'jio',
    role: 'Software Development Engineer',
    company: 'Jio Platforms Limited',
    period: 'Oct 2023 - Present',
    tags: ['Node.js', 'NestJS', 'MongoDB', 'Elastic Search', 'Redis', 'GCP', 'Docker', 'FFmpeg'],
    subProjects: [
      {
        name: 'JioGames Watch - Game Streaming Platform',
        link: 'https://watch.jiogames.com/',
        bullets: [
          'Built scalable RESTful APIs for the admin dashboard to monitor KPIs for 5M+ gamers across India.',
          'Reduced analytics dashboard latency by 40% by integrating Elastic Search for distributed search over massive datasets and using composite queries for huge data transfer.',
        ],
      },
      {
        name: 'JioStream - Video Commerce Platform',
        link: 'https://stream.jio/',
        bullets: [
          'Designed and delivered end-to-end backend for media-embedded questionnaires, covering schema design, API design, and JSON schema validation.',
          'Developed and automated CSV export pipeline handling 50K+ responses/month using MongoDB cursors, cron jobs, and Google Cloud Storage, helping clients like Tira to extract actionable insights.',
          'Implemented GIF transcoding pipelines with FFmpeg to produce high-quality, compatible media.',
        ],
      },
      {
        name: 'JioLoyalty - Reward Program Platform',
        bullets: [
          'Designed & implemented a secure file upload pipeline GCS → Eventarc → Pub/Sub → Scanner Service, enabling signed-URL uploads to GCS with asynchronous malware scanning on Cloud Run and advanced file security validations, further classifying files into unscanned, scanned, or quarantine storage buckets.',
        ],
      },
    ],
  },
  {
    id: 'police-academy',
    role: 'Software Developer Intern',
    company: 'Maharashtra Police Academy - Nashik',
    period: 'Jan 2022 - Jul 2022',
    tags: [
      'Python',
      'Flask',
      'WTForms',
      'HTML',
      'CSS',
      'Material Dashboard',
      'JavaScript',
      'jQuery',
      'ChartJS',
      'MySQL',
      'Database Designing',
      'Website Designing',
      'APIs',
      'CRUD',
    ],
    bullets: [
      'Engineered training platform for Maharashtra Police Academy to identify nearby trainers, manage course tracking, assessments, and performance reporting for over 1000 cadets.',
      'Automated evaluation workflows, including exam scoring, certificate generation, email-based result delivery with embedded feedback forms and visualized cadet feedback to refine training programs.',
      'Reduced manual admin effort by 80% through automation, helping the academy digitize operations.',
      'Maintained fitness tracking portal, actively used by 10+ police institutes across Maharashtra.',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages & Frameworks',
    icon: 'code',
    skills: [
      { name: 'Angular' },
      { name: 'Nest.js' },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'Java' },
    ],
  },
  {
    category: 'Databases',
    icon: 'database',
    skills: [{ name: 'MongoDB' }, { name: 'Redis' }, { name: 'Elastic Search' }],
  },
  {
    category: 'DevOps & Cloud',
    icon: 'cloud',
    skills: [
      { name: 'Docker' },
      { name: 'Linux' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Google Cloud Platform' },
    ],
  },
  {
    category: 'CS Fundamentals',
    icon: 'cpu',
    skills: [
      { name: 'Data Structures & Algorithms' },
      { name: 'OOPs' },
      { name: 'Operating Systems' },
      { name: 'Computer Networks' },
      { name: 'DBMS' },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'creditx',
    title: 'CreditX - Credit Risk Analysis',
    description:
      'Engineered a credit risk analysis web app integrating Probability of Default ML model, allowing users to check credit scores and bankers to assess loan risk.',
    bullets: [
      'Calculated Loss Given Default, Exposure at Default, and Expected Loss, providing insights for lending decisions.',
    ],
    tags: ['Machine Learning', 'Python', 'Web App', 'Risk Analysis'],
    links: [
      {
        label: 'Video',
        url: 'https://drive.google.com/file/d/1a3Y61piIQUTkVmh-HiLQXJhS2vdSOLZm/view',
        icon: 'play-circle',
      },
      {
        label: 'Repository',
        url: 'https://github.com/wolbek/Credit-Score-Prediction-Website',
        icon: 'github',
      },
      {
        label: 'IEEE Paper',
        url: 'https://ieeexplore.ieee.org/document/10393778',
        icon: 'file-text',
      },
    ],
    badge: 'IEEE Published',
  },
  {
    id: 'stockrisk',
    title: 'StockRisk - Portfolio Risk Assessment',
    description:
      'Developed a portfolio risk assessment platform that analyzes user holdings and suggests optimized stock weight distributions. Visualized results using dynamic charts with 2-year price forecasts.',
    bullets: [
      'Implemented a custom web scraping engine for real-time, in-depth search of NSE-listed stocks.',
    ],
    tags: ['Finance', 'Python', 'Web Scraping', 'Data Visualization'],
    links: [
      {
        label: 'Video',
        url: 'https://drive.google.com/file/d/1PKlAJakIiGIWf75eVv4p3KyhMmbe-wfA/view',
        icon: 'play-circle',
      },
      {
        label: 'Repository',
        url: 'https://github.com/wolbek/Financial-Risk-Assessment',
        icon: 'github',
      },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Store for Clothes',
    description:
      'Developed an API-integrated B2C e-commerce website allowing users to search and purchase clothes or register as a seller on-site to sell clothes using the seller dashboard providing analytics of sales.',
    bullets: [],
    tags: [
      'Python',
      'Django',
      'REST APIs',
      'PostgreSQL',
      'JavaScript',
      'jQuery',
      'ChartJS',
      'Razorpay',
    ],
    links: [
      {
        label: 'Video',
        url: 'https://drive.google.com/file/d/1AWPE3khwuUITUKbxk-umZoCPpF14BpOI/view',
        icon: 'play-circle',
      },
      {
        label: 'Repository',
        url: 'https://github.com/wolbek/E-Commerce-Store',
        icon: 'github',
      },
    ],
  },
  {
    id: 'scientific-calculator',
    title: 'Scientific Calculator',
    description:
      'Developed an application that performs basic arithmetic operations as well as exponentiation, log, factorial, nth root operation, switch between degrees and radian mode, integration, differentiation, complex trigonometry, and fixpoint arithmetic. No upper limit on digits handled.',
    bullets: [],
    tags: ['Java', 'OOPs', 'Swing', 'AWT'],
    links: [
      {
        label: 'Video',
        url: 'https://drive.google.com/file/d/11aZihblLtHLuh7azvsSoV08tCkSyF7zQ/view?usp=sharing',
        icon: 'play-circle',
      },
      {
        label: 'Repository',
        url: 'https://github.com/wolbek/Scientific-Calculator',
        icon: 'github',
      },
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'brave',
    title: 'Brave Browser Open Source Contributor',
    description:
      'Contributed UI improvements to Brave Browser, enhancing user experience for its global user base.',
    metric: '60M+ Users Impacted',
    icon: 'globe',
  },
  {
    id: 'codechef',
    title: 'CodeChef Global Rank 19',
    description: 'Ranked 19th globally in CodeChef January Long Challenge 2022, Division 3.',
    metric: 'Rank #19 Worldwide',
    icon: 'trophy',
  },
  {
    id: 'computers-100',
    title: 'Perfect Score in Computers',
    description:
      'Received an award for scoring 100/100 in computers in 10th ICSE Board. Also scored 100/100 in computers in 12th ISC Board.',
    metric: '100/100 Twice',
    icon: 'award',
  },
  {
    id: 'java-contest',
    title: 'Junior College Java Programming Representative',
    description:
      'Selected as junior college representative for Java programming contest held at "The Cathedral and John Connon School".',
    icon: 'code',
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    id: 'btech',
    level: 'B.Tech',
    degree: 'B.Tech in Information Technology',
    institution: 'Pillai College of Engineering, Panvel',
    university: 'Mumbai University',
    gpa: '9.47 / 10.00',
    period: 'Jun 2019 - May 2023',
  },
  {
    id: 'xii',
    level: 'XII',
    degree: 'Indian School Certificate (ISC)',
    institution: 'Guardian Junior College',
    percentage: '86.6%',
    period: '2019',
  },
  {
    id: 'x',
    level: 'X',
    degree: 'Indian Certificate of Secondary Education (ICSE)',
    institution: 'Guardian School',
    percentage: '92.67%',
    period: '2017',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'namaste-node',
    title: 'Namaste NodeJs',
    provider: 'NamasteDev',
    link: 'https://drive.google.com/file/d/1zoelI3OiziORJCK6073cEA12rt417s4e/view',
  },
  {
    id: 'namaste-js',
    title: 'Namaste JavaScript',
    provider: 'NamasteDev',
    link: 'https://drive.google.com/file/d/1i18NZ0wtTlv2PWCFr7nNL6jNacmEfTXg/view',
  },
  {
    id: 'alpha-dsa',
    title: 'Alpha: DSA with Java',
    provider: 'Apna College',
    link: 'https://drive.google.com/file/d/1XkOB7eNqwA_7qb358WRqjA6B_ZTycv5D/view',
  },
  {
    id: 'python-specialization',
    title: 'Python Specialization',
    provider: 'Coursera',
    link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/WA4QA4SGA5GZ',
  },
  {
    id: 'google-it-support',
    title: 'Google IT Support Specialization',
    provider: 'Coursera',
    link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/9FX3BHPNA7V8',
  },
];
