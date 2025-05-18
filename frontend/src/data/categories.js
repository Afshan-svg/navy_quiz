const categories = [
    {
      name: 'Information Technology',
      questions: [
        {
          id: 1,
          question: 'What does CPU stand for?',
          options: ['Central Processing Unit', 'Control Processing Unit', 'Computer Personal Unit', 'Central Personal Unit'],
          answer: 'Central Processing Unit',
        },
        {
          id: 2,
          question: 'Which programming language is known as the backbone of web development?',
          options: ['Python', 'Java', 'JavaScript', 'C++'],
          answer: 'JavaScript',
        },
        {
          id: 3,
          question: 'What is the main function of a firewall?',
          options: ['Data storage', 'Network security', 'Data encryption', 'Software development'],
          answer: 'Network security',
        },
        {
          id: 4,
          question: 'Which protocol is used to transfer web pages?',
          options: ['FTP', 'HTTP', 'SMTP', 'TCP'],
          answer: 'HTTP',
        },
      ],
    },
    {
      name: 'Diving Officer',
      questions: [
        {
          id: 1,
          question: 'What gas mixture is commonly used for deep-sea diving?',
          options: ['Oxygen only', 'Heliox', 'Nitrogen only', 'Carbon dioxide'],
          answer: 'Heliox',
        },
        {
          id: 2,
          question: 'What is decompression sickness commonly called?',
          options: ['The bends', 'Nitrogen narcosis', 'Oxygen toxicity', 'Hypothermia'],
          answer: 'The bends',
        },
        {
          id: 3,
          question: 'Which piece of equipment regulates air supply for divers?',
          options: ['Fins', 'Mask', 'Regulator', 'Dive computer'],
          answer: 'Regulator',
        },
        {
          id: 4,
          question: 'What is the primary purpose of a buoyancy compensator?',
          options: ['Supply oxygen', 'Control buoyancy', 'Monitor depth', 'Protect against cold'],
          answer: 'Control buoyancy',
        },
      ],
    },
    {
      name: 'Architecture',
      questions: [
        {
          id: 1,
          question: 'Who designed the Sydney Opera House?',
          options: ['Frank Lloyd Wright', 'Jørn Utzon', 'Zaha Hadid', 'Le Corbusier'],
          answer: 'Jørn Utzon',
        },
        {
          id: 2,
          question: 'What is the main material used in Gothic architecture?',
          options: ['Wood', 'Stone', 'Concrete', 'Glass'],
          answer: 'Stone',
        },
        {
          id: 3,
          question: 'What is a flying buttress?',
          options: ['A decorative column', 'An external support structure', 'A type of roof', 'A foundation type'],
          answer: 'An external support structure',
        },
        {
          id: 4,
          question: 'Which architectural style is characterized by minimalism and open spaces?',
          options: ['Baroque', 'Modernism', 'Victorian', 'Renaissance'],
          answer: 'Modernism',
        },
      ],
    },
    {
      name: 'First Aid Expert',
      questions: [
        {
          id: 1,
          question: 'What is the first step in the primary survey of first aid?',
          options: ['Check for bleeding', 'Check for response', 'Start CPR', 'Apply a bandage'],
          answer: 'Check for response',
        },
        {
          id: 2,
          question: 'What does CPR stand for?',
          options: ['Cardiac Pulse Recovery', 'Cardiopulmonary Resuscitation', 'Critical Patient Response', 'Chest Pressure Relief'],
          answer: 'Cardiopulmonary Resuscitation',
        },
        {
          id: 3,
          question: 'How many chest compressions per minute are recommended in adult CPR?',
          options: ['60', '80', '100-120', '140'],
          answer: '100-120',
        },
        {
          id: 4,
          question: 'What should you do if someone is choking and cannot breathe?',
          options: ['Give water', 'Perform the Heimlich maneuver', 'Start CPR', 'Apply a cold compress'],
          answer: 'Perform the Heimlich maneuver',
        },
      ],
    },
  ];
  
  export default categories;