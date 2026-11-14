import { Course, Profile, CBTExam, CBTAttempt, LiveRoom, LiveParticipant, LiveChatMessage, SubscriptionPlan, IntranetAccessRequest, IntranetBulletin, TutoringAttendanceSession } from '@/types';

export const DEFAULT_INSTRUCTOR_PROFILE: Profile = {
  id: 'faculty_author_001',
  email: 'faculty@reactjav.io',
  full_name: 'Dr. Elena Chen',
  avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  role: 'instructor',
  bio: 'Principal AI Research Scientist & Lead Faculty with 12+ years of experience in Large Language Models, RLHF Data Alignment, and Applied AI Systems.',
  created_at: '2025-11-01T08:00:00Z',
  subscription_status: 'active',
  subscription_plan: 'lifetime',
  admin_granted: true,
};

// Demo user accounts removed. Platform requires authentic registration and login.
export const DEMO_PROFILES: Record<string, Profile> = {};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs_ai_prompting_annotation_01',
    instructor_id: 'usr_instructor_001',
    title: 'AI Prompting and Data Annotation',
    slug: 'ai-prompting-and-data-annotation',
    previous_slugs: ['ai-career-essentials', 'nextjs-supabase-web-engineering'],
    description: 'Master professional prompt engineering, Reinforcement Learning from Human Feedback (RLHF), supervised fine-tuning (SFT) data annotation, red-teaming, and AI response evaluation rubrics used by leading AI labs.',
    category: 'Prompt Engineering & RLHF',
    track: 'Prompt Engineering & RLHF',
    level: 'Beginner',
    outcome_hook: 'Master structured AI prompting, RLHF preference ranking, and high-precision data annotation for global AI teams.',
    duration_weeks: 8,
    weekly_hours: '10-15 hrs/week',
    skills: [
      'Prompt Engineering',
      'Data Annotation',
      'RLHF & Preference Ranking',
      'Chain-of-Thought',
      'AI Output Evaluation',
      'Red-Teaming & Factuality',
    ],
    sponsorship_note: 'Sponsored / $0 Upfront',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'Rolling Admissions',
    price: 39.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-01T09:00:00Z',
    enrollments_count: 4850,
    average_rating: 4.96,
    reviews_count: 640,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_pa_01',
        course_id: 'crs_ai_prompting_annotation_01',
        title: 'Module 1: Structured Prompt Engineering & Reasoning Frameworks',
        position: 1,
        lessons: [
          {
            id: 'les_pa_01_01',
            section_id: 'sec_pa_01',
            title: '1.1 Anatomy of High-Precision Prompts: System Instructions, Context & Constraints',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            content: 'Learn how to design deterministic system prompts, persona boundaries, output schemas, and explicit guardrails for enterprise AI workflows.',
            duration_seconds: 540,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_pa_01_02',
            section_id: 'sec_pa_01',
            title: '1.2 Zero-Shot, Few-Shot & Chain-of-Thought (CoT) Prompting Patterns',
            type: 'article',
            content: `### Engineering Reliable Reasoning with Few-Shot & Chain-of-Thought

Modern AI models respond dramatically better when given explicit structural patterns and intermediate reasoning steps.

#### 1. Zero-Shot vs. Few-Shot Prompting
- **Zero-Shot**: Asking the model to perform a task without prior examples. Best for straightforward summarization or translation.
- **Few-Shot**: Providing 2–5 high-quality input/output exemplars inside the prompt so the model learns the exact tone, schema, and edge-case handling required.

#### 2. Chain-of-Thought (CoT) Reasoning
When solving multi-step logic, math, or classification tasks, instructing the model to reason step-by-step before emitting its final answer reduces logic errors by over 40%.

\`\`\`text
System: You are an expert AI Data Quality Auditor.
Task: Classify the user query intent and extract structured entities.
Instructions:
1. First, think step-by-step inside <reasoning> tags.
2. Verify all extracted values against the source text.
3. Output the final result strictly as valid JSON inside <output> tags.
\`\`\`

#### Core Takeaways:
- Separate instructions, context data, and output format using clear delimiters (\`###\`, XML tags).
- Specify what the model should do when information is missing rather than letting it guess.`,
            duration_seconds: 420,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_pa_01_03',
            section_id: 'sec_pa_01',
            title: '1.3 Checkpoint Quiz: Prompt Engineering Fundamentals',
            type: 'quiz',
            duration_seconds: 300,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_pa_01',
                lesson_id: 'les_pa_01_03',
                question: 'Why does Chain-of-Thought (CoT) prompting improve model accuracy on complex reasoning tasks?',
                options: [
                  'It forces the model to generate intermediate reasoning tokens before committing to a final answer',
                  'It doubles the GPU clock speed during token generation',
                  'It bypasses the tokenizer and reads raw bytes',
                  'It disables the attention mechanism in transformer layers',
                ],
                correct_option_index: 0,
                explanation: 'By generating intermediate reasoning steps, the model allocates more computation (tokens) to decompose the problem before outputting the final conclusion.',
                position: 1,
              },
              {
                id: 'q_pa_02',
                lesson_id: 'les_pa_01_03',
                question: 'What is the primary purpose of providing Few-Shot examples in a prompt?',
                options: [
                  'To permanently retrain the base weights of the model',
                  'To demonstrate the exact output structure, tone, and edge-case handling through in-context learning',
                  'To encrypt the user prompt before sending it to the API',
                  'To reduce the number of input tokens billed',
                ],
                correct_option_index: 1,
                explanation: 'Few-shot examples leverage in-context learning to steer the model toward a specific schema and quality bar without updating model weights.',
                position: 2,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_pa_02',
        course_id: 'crs_ai_prompting_annotation_01',
        title: 'Module 2: Data Annotation, RLHF & AI Evaluation Rubrics',
        position: 2,
        lessons: [
          {
            id: 'les_pa_02_01',
            section_id: 'sec_pa_02',
            title: '2.1 Reinforcement Learning from Human Feedback (RLHF) & Preference Ranking',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            content: 'How human annotators compare side-by-side model responses (Response A vs. Response B) across instruction following, truthfulness, safety, and formatting.',
            duration_seconds: 600,
            position: 1,
            is_free_preview: false,
            is_completed: false,
          },
          {
            id: 'les_pa_02_02',
            section_id: 'sec_pa_02',
            title: '2.2 Auditing Hallucinations, Golden Datasets & Annotation Quality Rubrics',
            type: 'article',
            content: `### High-Precision Data Annotation & RLHF Evaluation

Every frontier AI model relies on human data annotators and domain specialists to align raw pre-trained models into helpful, honest, and harmless assistants.

#### The 4 Dimensions of Response Evaluation:
1. **Instruction Following**: Did the model obey every positive and negative constraint (e.g., word count, JSON format, forbidden words)?
2. **Factuality & Grounding**: Are all claims verifiable against the provided reference text, or did the model hallucinate unsupported facts?
3. **Completeness & Clarity**: Is the response thorough, well-structured, and easy to scan?
4. **Safety & Harmlessness**: Does the response appropriately refuse harmful requests while avoiding unnecessary preachy refusals on benign prompts?

#### Writing Golden SFT (Supervised Fine-Tuning) Responses:
When rewriting a suboptimal AI response during annotation, annotators craft a **Golden Response** that resolves all factual errors, removes filler phrases, and models ideal reasoning.`,
            duration_seconds: 480,
            position: 2,
            is_free_preview: false,
            is_completed: false,
          },
        ],
      },
    ],
  },
  {
    "id": "crs_ai_basics_02",
    "instructor_id": "usr_instructor_001",
    "title": "AI Foundations: Getting Started with AI",
    "slug": "ai-basics-getting-started-with-ai",
    "previous_slugs": [
      "ai-foundations",
      "data-analytics-career-accelerator"
    ],
    "description": "After this course, anyone can explain what AI is, how it learns, what it can and can’t do, and how to use it responsibly. Features written lessons with diagrams and alt text, hands-on activities, 20-question module banks (10 drawn per attempt), a 1-hour no-code Guided Lab, and the 2-hour “AI in My Life” Authentic Assessment.",
    "category": "AI Foundations",
    "track": "AI Foundations",
    "level": "Beginner",
    "outcome_hook": "After this course, anyone can explain what AI is, how it learns, what it can and can’t do, and how to use it responsibly.",
    "duration_weeks": 1,
    "weekly_hours": "7 hours 20 minutes (440 min | No Coding | No Prerequisites | Written Format)",
    "skills": [
      "AI vs. ML vs. DL vs. GenAI",
      "How AI Learns from Data",
      "Everyday AI Systems Audit",
      "LLM Hallucination Verification",
      "Responsible AI & Ethics",
      "No-Code Image Classification"
    ],
    "sponsorship_note": "Fully Funded / Free Access (No-Login Tools)",
    "is_now_open": true,
    "is_popular": true,
    "cohort_date": "Self-Paced (7h 20m)",
    "price": 0,
    "thumbnail_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    "is_published": true,
    "created_at": "2026-03-05T10:00:00Z",
    "enrollments_count": 6320,
    "average_rating": 4.95,
    "reviews_count": 890,
    "instructor": DEFAULT_INSTRUCTOR_PROFILE,
    "sections": [
      {
        "id": "sec_aif_00",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 1: Orientation and Self-Check (0.5h)",
        "position": 1,
        "lessons": [
          {
            "id": "les_aif_00_01",
            "section_id": "sec_aif_00",
            "title": "0.1 Orientation Guide, Course Map, Glossary, Audience Person & Tool Check",
            "type": "article",
            "summary": "Welcome guide covering the 7h 20m course map, 10-term glossary preview, choosing your audience person, tool readiness check, and starting confidence rating.",
            "implementation_tip": "Choose one real friend, relative, neighbor, or colleague right now as your \"Audience Person\"—and record your starting 1–5 confidence ratings in Personal Study Notes before taking the Pre-Check.",
            "content": "> **Orientation guide, course map, and pre-check (30 minutes total):**\n> - **5 min:** Read the course guide (Part A)\n> - **5 min:** Preview the glossary (Part B)\n> - **5 min:** Choose your audience person (Part C)\n> - **5 min:** Complete the tool check (Part D)\n> - **10 min:** Take the ungraded pre-check (Lesson 0.2)\n\n---\n\n### Part A: Course Guide (5 min)\n\n#### Welcome\nWelcome, and thank you for joining. **AI Foundations** is a short, friendly course for anyone who wants to understand AI. You do not need any technical background, and you do not need to write code. By the end, you will be able to explain AI to someone else, and you will know how to use it more wisely.\n\n#### What you will be able to do\n- Explain what AI is, and tell AI, machine learning, deep learning, and generative AI apart.\n- Describe in simple words how an AI system learns from data.\n- Spot AI in everyday life, and name its benefits and risks.\n- Explain what chatbots do well, where they go wrong, and how to check their answers.\n- Make good decisions about when and how to use AI.\n\n#### How the course works\nThe course takes about **7 hours and 20 minutes** (440 minutes). You can study at your own pace. Each part is short, so you can stop and start again when you like.\n\n| Part | Time | What you do |\n| :--- | :--- | :--- |\n| **Orientation** | **30 min** | Read this guide, choose your audience person, check your tools, and take the pre-check |\n| **Module 1: What Is AI?** | **50 min** | Read the lesson, sort everyday items in “AI or Not AI?”, and take a short quiz |\n| **Module 2: How AI Learns** | **50 min** | Read the lesson and a short reading, do “Be the Algorithm”, and take a quiz |\n| **Module 3: Generative AI and Chatbots** | **50 min** | Read the lesson and a short reading, do “Spot the Hallucination”, and take a quiz |\n| **Module 4: AI in Society** | **50 min** | Read the lesson and a checklist, write “My Five Rules”, and take a quiz |\n| **Guided lab** | **60 min** | Train a simple image classifier and test a chatbot |\n| **“AI in My Life” assessment** | **120 min** | Audit five AI systems, test a chatbot, and explain AI to your audience person |\n| **Reflection and review** | **30 min** | Reflect, retake the pre-check, and submit your work |\n\n#### What you need\n- A computer, tablet, or phone with a web browser and an internet connection.\n- A webcam for the lab. If you do not have one, we provide a ready-made image set.\n- Access to any chatbot for the lab and the assessment. Free tools are fine.\n- A way to make a one-page infographic or a short written document.\n\n#### How you earn your certificate and badge\n- Take the four module quizzes. You can retake them, and each attempt has new questions (10 drawn from 20-question banks).\n- Complete the **“AI in My Life”** assessment. Part of it is checked automatically, and part is graded with a rubric.\n- Reach at least **70%** in both the automated part and the rubric part. Reach **90%** in both for a **certificate with distinction**.\n- If you fall short, you can revise your work once, using the feedback.\n\n#### Tips for success\n- Study in short blocks, and take the activities seriously. They prepare you for the assessment.\n- Use your own life for examples. The assessment uses the AI you already use.\n- Try the tools, but always check important facts.\n- Write the assessment in your own words.\n\n#### Using AI in this course\nYou may use a chatbot to test it, to explore ideas, and to check your understanding. However, your audit, notes, explainer, and reflection must be in your own words. **Please never share passwords, bank details, ID numbers, or other private information with any tool.**\n\n#### Help and access\nAll diagrams have alt text, and every activity has a text-only version. If you need extra help or a different format, contact the course team before you begin.\n\n---\n\n### Part B: Glossary Preview (5 min)\nThese ten words appear throughout the course. Read them now, and do not worry if some feel new. Each one is explained step by step in the modules.\n\n| Word | Simple meaning |\n| :--- | :--- |\n| **Artificial intelligence (AI)** | Computer systems that do tasks that usually need human thinking |\n| **Algorithm** | A set of steps a computer follows to solve a problem |\n| **Data** | Information such as pictures, words, numbers, or sounds |\n| **Model** | What an AI system has learned, saved as patterns it can use |\n| **Training** | The process of studying examples to find patterns |\n| **Prediction** | The model’s best guess about something new |\n| **Machine learning** | AI that learns patterns from examples |\n| **Generative AI** | AI that creates new content, such as text, images, or sound |\n| **Hallucination** | A confident answer from an AI tool that is false or made up |\n| **Bias** | An unfair or unbalanced tendency in results, often caused by the data |\n\n---\n\n### Part C: Choose Your Audience Person (5 min)\nIn the final assessment, you will explain AI to someone who does not know much about it. Choose that person now. This could be a friend, a relative, a neighbor, or a colleague. Choosing early helps you notice what is useful as you learn.\n\nRecord your answers in your **Personal Study Notes** tab below:\n- **Who is your audience person?** *(first name or role is enough)*\n- **What do they already know about AI?**\n- **Why might they be curious or worried about AI?**\n- **Write two questions they might ask you about AI.**\n\n> **Privacy tip:** You do not need to use real names. A description such as *“my neighbor who is retired”* is fine.\n\n---\n\n### Part D: Tool Check & Confidence Baseline (5 min)\nCheck each item when you are ready:\n- [ ] I can open this course on my device and read the lessons\n- [ ] I have a webcam, or I will use the ready-made image set in the lab\n- [ ] I can open a chatbot (free is fine), or I will ask for help with this before the lab\n- [ ] I know how I will make my explainer: an infographic tool or a document\n- [ ] I know where to ask for help or for a different format\n\n#### Confidence rating (before you start)\nBefore you move to **Lesson 0.2 (Pre-Check)**, note your starting confidence (1 = not at all confident, 5 = very confident) in your **Personal Study Notes**:\n1. *How confident are you that you could explain what AI is to a friend?* **My rating (1–5):** `____`\n2. *How confident are you that you can check whether an AI answer is true?* **My rating (1–5):** `____`\n\nYou will track your **Before / After / Change** growth on your Pre-Check score and these two confidence ratings at the end of the course in **Segment 8**.",
            "duration_seconds": 1200,
            "position": 1,
            "is_free_preview": true,
            "is_completed": false
          },
          {
            "id": "les_aif_00_02",
            "section_id": "sec_aif_00",
            "title": "0.2 Ungraded Pre-Check: What Do I Already Know? (11 Questions)",
            "type": "quiz",
            "summary": "This check is not graded. It shows what you already know, so choose \"I’m not sure\" whenever you are unsure. You will retake these exact 11 questions at the end of the course to see how much you have learned.",
            "duration_seconds": 600,
            "position": 2,
            "is_free_preview": true,
            "is_completed": false,
            "quiz_questions": [
              {
                "id": "q_aif_pre_1",
                "lesson_id": "les_aif_00_02",
                "question": "Which sentence best describes AI?",
                "options": [
                  "A computer system that does tasks that usually need human thinking",
                  "A robot that feels emotions",
                  "Any machine that uses electricity",
                  "A program that only works on the internet",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "AI is software that does tasks that usually need human thinking. Covered in Module 1.",
                "position": 1
              },
              {
                "id": "q_aif_pre_2",
                "lesson_id": "les_aif_00_02",
                "question": "Which of these learns patterns from many examples?",
                "options": [
                  "A pocket calculator",
                  "A thermostat with a fixed temperature rule",
                  "An email spam filter",
                  "A timer on a washing machine",
                  "I’m not sure"
                ],
                "correct_option_index": 2,
                "explanation": "A spam filter learns from examples, while the others follow fixed rules. Covered in Module 1.",
                "position": 2
              },
              {
                "id": "q_aif_pre_3",
                "lesson_id": "les_aif_00_02",
                "question": "What does generative AI do?",
                "options": [
                  "Only sorts emails",
                  "Creates new content, such as text, images, or sound",
                  "Only stores files",
                  "Only measures speed",
                  "I’m not sure"
                ],
                "correct_option_index": 1,
                "explanation": "Generative AI creates new content. Covered in Modules 1 and 3.",
                "position": 3
              },
              {
                "id": "q_aif_pre_4",
                "lesson_id": "les_aif_00_02",
                "question": "Which order shows how a machine learning system works?",
                "options": [
                  "Data, training, model, prediction",
                  "Prediction, model, data, training",
                  "Model, prediction, training, data",
                  "Training, prediction, data, model",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "The system learns from data, trains, saves a model, and then makes predictions. Covered in Module 2.",
                "position": 4
              },
              {
                "id": "q_aif_pre_5",
                "lesson_id": "les_aif_00_02",
                "question": "Why can a chatbot give a confident answer that is wrong?",
                "options": [
                  "It writes text that sounds likely, and it does not guarantee the text is true",
                  "It always looks up one correct answer",
                  "It never makes mistakes",
                  "It is switched off at night",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "A chatbot predicts likely words, so it can hallucinate. Covered in Module 3.",
                "position": 5
              },
              {
                "id": "q_aif_pre_6",
                "lesson_id": "les_aif_00_02",
                "question": "A chatbot gives you a surprising statistic. What should you do first?",
                "options": [
                  "Share it with friends",
                  "Cross-check it with a trusted source",
                  "Trust it because it sounds exact",
                  "Ask the chatbot to say it again",
                  "I’m not sure"
                ],
                "correct_option_index": 1,
                "explanation": "Check important facts before you rely on them. Covered in Module 3.",
                "position": 6
              },
              {
                "id": "q_aif_pre_7",
                "lesson_id": "les_aif_00_02",
                "question": "Unfair results from an AI system often come from…",
                "options": [
                  "Data that is incomplete or unbalanced",
                  "Computers that are too fast",
                  "Screens that are too small",
                  "Too many people online",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "A model learns from data, so poor data can lead to bias. Covered in Modules 2 and 4.",
                "position": 7
              },
              {
                "id": "q_aif_pre_8",
                "lesson_id": "les_aif_00_02",
                "question": "Which information is safest to type into a public chatbot?",
                "options": [
                  "A general question, such as how photosynthesis works",
                  "Your password",
                  "Your bank details",
                  "A private document with other people’s names",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "Never share private information with a chatbot. Covered in Modules 3 and 4.",
                "position": 8
              },
              {
                "id": "q_aif_pre_9",
                "lesson_id": "les_aif_00_02",
                "question": "What is a deepfake?",
                "options": [
                  "A type of password",
                  "A very fast computer",
                  "A very realistic fake picture, voice, or video made with AI",
                  "A deep learning textbook",
                  "I’m not sure"
                ],
                "correct_option_index": 2,
                "explanation": "Deepfakes can look and sound real, so check shocking content. Covered in Module 4.",
                "position": 9
              },
              {
                "id": "q_aif_pre_10",
                "lesson_id": "les_aif_00_02",
                "question": "What does “human in the loop” mean?",
                "options": [
                  "A person reviews and controls important decisions made with AI",
                  "A robot lives in a house",
                  "Only people can use AI",
                  "AI works without any help",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "Important decisions, such as hiring or health, need a person in charge. Covered in Module 4.",
                "position": 10
              },
              {
                "id": "q_aif_pre_11",
                "lesson_id": "les_aif_00_02",
                "question": "Which statement about AI is true?",
                "options": [
                  "AI can make mistakes, so important information should be checked",
                  "AI is always right",
                  "AI feels emotions like a person",
                  "AI needs no people to build or check it",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "AI is powerful but not perfect, and people stay important. Covered in Modules 1 and 3.",
                "position": 11
              }
            ]
          }
        ]
      },
      {
        "id": "sec_aif_01",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 2 — Module 1: What Is AI? (50 min)",
        "position": 2,
        "lessons": [
          {
            "id": "les_aif_01_01",
            "section_id": "sec_aif_01",
            "title": "1.1 Written Lesson: What Is AI? (Rules vs. Learning, Map & 5 Myths)",
            "type": "article",
            "summary": "Say what AI is in simple words, compare rules vs. learning (21°C thermostat vs. spam filter), trace the story of AI (1950s–2020s), see the 4-term nested map, explore AI around you, and bust 5 common myths.",
            "content": "> **What you will learn:** By the end of this lesson, you will be able to say what AI is in simple words. You will also see how AI, machine learning, deep learning, and generative AI fit together, and you will know which common ideas about AI are wrong.\n\n---\n\n### 1. What is AI?\nFirst, let’s start with a simple idea. **Artificial intelligence (AI)** is a computer system that can do tasks that usually need human thinking. For example, it can recognize a face, understand speech, suggest a movie, or answer a question.\n\nNotice that the word **“artificial”** means made by people, and **“intelligence”** means the ability to learn and solve problems. So, in other words, AI is a human-made tool that can learn from information and then use it to make a choice or give an answer.\n\nHowever, AI is not a robot with feelings, and it is not magic. Instead, it is software. It follows math and patterns, and it works only with the information it has been given.\n\n---\n\n### 2. Rules versus learning: the big difference\nBefore we go further, we need to understand one key difference, because it explains almost everything in AI.\n\nImagine a **thermostat**. You set it to **21°C**. When the room is colder, it turns the heating on, and when the room is warm enough, it turns the heating off. This is a rule: *“If the temperature is below 21, then heat.”* A person wrote this rule, and the thermostat never changes it. As a result, the thermostat is **not really AI**.\n\nNow imagine a **spam filter** in your email. Nobody can write a rule for every spam message, because spammers change their messages all the time. So, instead, the filter looks at thousands of examples of spam and normal email. Then it learns the patterns. After that, it can guess whether a new email is spam, even if it has never seen that exact message before. This is learning from examples, and it **is AI**.\n\n> **In short:** **Rules:** a person writes the steps. **Learning:** the computer finds the steps by looking at examples.\n\n---\n\n### 3. A short story of AI\nNext, let’s look at how AI developed. Don’t worry about memorizing dates. The story is what matters.\n- **1950s — the idea begins:** First, scientists asked, *“Can machines think?”* In 1956, a group of researchers met and used the name *“artificial intelligence”* for the first time.\n- **1960s to 1980s — rule-based systems:** Then, people built programs full of hand-written rules. For example, some programs helped doctors with medical questions. However, these systems were hard to update, because people had to write every rule themselves.\n- **1990s to 2000s — machines start to learn:** After that, computers became faster and there was more digital data. Therefore, learning from examples became practical. This is the time when email spam filters and online recommendations began.\n- **2010s — deep learning:** Later, new methods made computers much better at images, speech, and translation.\n- **2020s — generative AI:** Finally, AI tools that can write text, create images, and hold a conversation became easy for everyone to use. That is why AI is in the news today.\n\nSo AI is not new. What is new is that it is now powerful and easy to use.\n\n---\n\n### 4. The AI family: four terms, one map\nPeople use many AI words, and they often mix them up. Fortunately, the idea is simple. Think of circles inside circles, going from the biggest circle to the smallest:\n\n| Layer (Outer to Inner) | Plain-Language Meaning |\n| :--- | :--- |\n| **ARTIFICIAL INTELLIGENCE (AI)** *(Biggest Circle)* | Any computer system that does tasks that need human-like thinking. |\n| **MACHINE LEARNING (ML)** *(Inside AI)* | AI that learns from examples instead of following only fixed rules (e.g., your spam filter). |\n| **DEEP LEARNING** *(Inside ML)* | ML using many-layered **neural networks**, loosely inspired by the brain, great at pictures, sounds, and language. |\n| **GENERATIVE AI** *(Smallest Circle)* | Creates new text, images, or sound—such as a paragraph, a picture, or a song. |\n\n> **Diagram Alt Text:** *Four nested shaded boxes/circles going from largest to smallest: outer layer \"Artificial Intelligence (AI): any computer system that does tasks that need human-like thinking,\" containing \"Machine Learning (ML): AI that learns from examples,\" containing \"Deep Learning: ML using many-layered neural networks,\" containing at the center \"Generative AI: creates new text, images, or sound.\"*\n\n**An easy way to remember:** Every generative AI tool is AI, but not every AI tool is generative AI. For instance, a spam filter is AI, but it does not create anything new—it only decides.\n\n---\n\n### 5. AI around you\nBecause AI is already in daily life, you probably use it every day:\n\n| What you do | Where AI helps |\n| :--- | :--- |\n| **Use a map app** | It predicts traffic and chooses a faster route |\n| **Watch videos or listen to music** | It suggests what you may like next |\n| **Check your email** | It filters spam and suggests replies |\n| **Unlock your phone with your face** | It recognizes your face |\n| **Talk to a voice assistant** | It turns your speech into text and finds an answer |\n| **Use a chatbot** | It writes, explains, or translates for you |\n\nAs you can see, AI is not only for scientists and big companies. It is part of ordinary life.\n\n---\n\n### 6. Myths about AI\nFinally, let’s correct five common wrong ideas:\n\n| Myth | Truth |\n| :--- | :--- |\n| **“AI is one single thing.”** | AI is a large group of different tools. A chess program, a face-unlock feature, and a chatbot are all AI, but they work in very different ways. |\n| **“AI thinks and feels like a human.”** | AI finds patterns in data. It may sound friendly, but that does not mean it understands or feels anything. |\n| **“AI is always right.”** | AI makes mistakes. Sometimes it gives a wrong answer in a very confident voice. That is why we always need to check important information. |\n| **“AI will do everything by itself.”** | AI needs people to build it, give it data, and check its work. Because of this, people stay important. |\n| **“You need to be a genius to use AI.”** | Many AI tools are made for everyday users. You can start with simple questions, and then you can learn more step by step. |\n\n---\n\n> **Key takeaways:**\n> - AI is a human-made computer system that does tasks that normally need human thinking.\n> - Rules are written by people. Learning means the computer finds patterns from examples.\n> - The AI family has four levels: **AI → machine learning → deep learning → generative AI**.\n> - AI is already in maps, email, phones, and entertainment.\n> - AI is powerful but not perfect, and it does not think or feel like a human.\n\n#### New words in this lesson\n| Word | Meaning |\n| :--- | :--- |\n| **Artificial intelligence (AI)** | Computer systems that do tasks that usually need human thinking |\n| **Algorithm** | A set of steps a computer follows to solve a problem |\n| **Machine learning** | AI that learns patterns from examples |\n| **Deep learning** | Machine learning that uses many-layered neural networks |\n| **Neural network** | A computer model loosely inspired by the brain, made of connected layers |\n| **Generative AI** | AI that creates new content, such as text, images, or sound |\n\n*Next: the activity “AI or not AI?”, where you sort everyday items and test what you just learned.*",
            "duration_seconds": 1200,
            "position": 1,
            "is_free_preview": true,
            "is_completed": false
          },
          {
            "id": "les_aif_01_02",
            "section_id": "sec_aif_01",
            "title": "1.2 Activity: “AI or Not AI?” (Sort 10 Everyday Items)",
            "type": "article",
            "summary": "Sort 10 everyday tools into AI or Not AI, write your reasoning for each, and check your answers against the detailed explanation key.",
            "content": "> **What you will learn:** How to tell the difference between fixed-rule automation and true data-driven AI across 10 everyday tools.\n\n### Your Task (15 Minutes)\nFor each of the **10 items** below, decide whether it is **AI** or **Not AI** and note *why* in your **Personal Study Notes** tab before checking the Answer Key below.\n\n1. **A pocket calculator**\n2. **A fixed-rule thermostat** (turns heat on below 21°C, off above 21°C)\n3. **An email spam filter**\n4. **Video recommendations** (YouTube / Netflix)\n5. **A voice assistant** (Siri / Alexa / Google Assistant)\n6. **A washing machine timer**\n7. **A spreadsheet `SUM` formula**\n8. **Smartphone face unlock**\n9. **A customer-support chatbot**\n10. **A motion-activated grocery store door**\n\n---\n\n### Answer Key & Explanations\n| # | Item | AI or Not AI? | Explanation |\n| :--- | :--- | :--- | :--- |\n| **1** | **Pocket calculator** | **Not AI** | Follows fixed mathematical rules programmed by engineers; never learns from examples. |\n| **2** | **Fixed-rule thermostat** | **Not AI** | Uses a simple `IF temp < 21°C THEN heat ON` rule written by a person with zero learning. |\n| **3** | **Email spam filter** | **AI** | Uses Machine Learning trained on thousands of emails to spot changing scam patterns. |\n| **4** | **Video recommendations** | **AI** | Learns from your watch history and millions of similar viewers to predict what you will click next. |\n| **5** | **Voice assistant** | **AI** | Uses Deep Learning for speech recognition and natural-language understanding. |\n| **6** | **Washing machine timer** | **Not AI** | Counts down fixed minutes and follows a preset mechanical or digital sequence. |\n| **7** | **Spreadsheet `SUM` formula** | **Not AI** | Executes an exact arithmetic instruction on the cells you selected. |\n| **8** | **Smartphone face unlock** | **AI** | Uses Deep Learning to recognize your unique facial geometry across different lighting and angles. |\n| **9** | **Customer-support chatbot** | **AI** | Uses language models to interpret customer questions and generate helpful replies. |\n| **10** | **Motion-activated grocery door** | **Not AI** | A simple sensor triggers `IF motion detected THEN open door`. |",
            "duration_seconds": 900,
            "position": 2,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_01_03",
            "section_id": "sec_aif_01",
            "title": "1.3 Module 1 Knowledge Check (10 Questions from 20-Question Bank)",
            "type": "quiz",
            "summary": "Answer 10 questions randomly drawn from the 20-question Module 1 bank (15 minutes). Retake anytime for a fresh set of questions with instant feedback.",
            "duration_seconds": 900,
            "position": 3,
            "is_free_preview": false,
            "is_completed": false,
            "quiz_questions": [
              {
                "id": "q_aif_01_1",
                "lesson_id": "les_aif_01_03",
                "question": "Which sentence best describes AI?",
                "options": [
                  "A robot that feels emotions like a person",
                  "A human-made computer system that does tasks that usually need human thinking",
                  "Any machine that uses electricity",
                  "A program that only works on the internet"
                ],
                "correct_option_index": 1,
                "explanation": "AI is a human-made system that does tasks that normally need human thinking, such as recognizing faces or answering questions. It is software, not a being with feelings.",
                "position": 1
              },
              {
                "id": "q_aif_01_2",
                "lesson_id": "les_aif_01_03",
                "question": "A thermostat turns the heating on when the room is colder than 21°C and off when it is warmer. Why is this not really AI?",
                "options": [
                  "It uses electricity",
                  "It follows a fixed rule that a person wrote and it never learns",
                  "It only works at home",
                  "It is too old"
                ],
                "correct_option_index": 1,
                "explanation": "The thermostat follows one rule written by a person. AI, by contrast, finds patterns by learning from examples.",
                "position": 2
              },
              {
                "id": "q_aif_01_3",
                "lesson_id": "les_aif_01_03",
                "question": "What makes an email spam filter an example of machine learning?",
                "options": [
                  "It learns patterns from many examples of spam and normal email",
                  "It deletes all emails with the word “free”",
                  "A person checks every email",
                  "It only works on one device"
                ],
                "correct_option_index": 0,
                "explanation": "The filter looks at many examples and learns patterns, so it can judge new emails it has never seen before.",
                "position": 3
              },
              {
                "id": "q_aif_01_4",
                "lesson_id": "les_aif_01_03",
                "question": "In the “circles inside circles” map, which is the biggest circle?",
                "options": [
                  "Generative AI",
                  "Deep learning",
                  "Machine learning",
                  "Artificial intelligence"
                ],
                "correct_option_index": 3,
                "explanation": "AI is the biggest circle. Machine learning, deep learning, and generative AI are all inside it.",
                "position": 4
              },
              {
                "id": "q_aif_01_5",
                "lesson_id": "les_aif_01_03",
                "question": "True or false: Every generative AI tool is also AI.",
                "options": [
                  "True",
                  "False"
                ],
                "correct_option_index": 0,
                "explanation": "Generative AI sits inside the AI circle, so every generative AI tool is AI.",
                "position": 5
              },
              {
                "id": "q_aif_01_6",
                "lesson_id": "les_aif_01_03",
                "question": "True or false: Every AI tool is generative AI.",
                "options": [
                  "True",
                  "False"
                ],
                "correct_option_index": 1,
                "explanation": "Many AI tools only sort, recognize, or predict. A spam filter, for example, is AI, but it does not create anything new.",
                "position": 6
              },
              {
                "id": "q_aif_01_7",
                "lesson_id": "les_aif_01_03",
                "question": "What does deep learning use to find very complex patterns?",
                "options": [
                  "Neural networks with many layers",
                  "A list of hand-written rules",
                  "A single yes-or-no question",
                  "A calculator"
                ],
                "correct_option_index": 0,
                "explanation": "Deep learning uses many-layered neural networks, which work well for images, sound, and language.",
                "position": 7
              },
              {
                "id": "q_aif_01_8",
                "lesson_id": "les_aif_01_03",
                "question": "Which of these is an example of generative AI?",
                "options": [
                  "A thermostat that turns the heating on and off",
                  "A tool that writes a new paragraph from your request",
                  "A calculator that adds numbers",
                  "A clock that shows the time"
                ],
                "correct_option_index": 1,
                "explanation": "Generative AI creates new content, such as text, images, or sound.",
                "position": 8
              },
              {
                "id": "q_aif_01_9",
                "lesson_id": "les_aif_01_03",
                "question": "A chatbot gives a confident answer that turns out to be wrong. Which myth does this show is false?",
                "options": [
                  "“AI is one single thing”",
                  "“AI is always right”",
                  "“You need to be a genius to use AI”",
                  "“AI is only for big companies”"
                ],
                "correct_option_index": 1,
                "explanation": "AI can make mistakes, even when it sounds sure. This is why we check important information.",
                "position": 9
              },
              {
                "id": "q_aif_01_10",
                "lesson_id": "les_aif_01_03",
                "question": "Why is AI in the news much more today than in the 1950s?",
                "options": [
                  "AI was only invented last year",
                  "It is now powerful and easy for everyone to use",
                  "People stopped using computers before",
                  "AI now thinks and feels like a human"
                ],
                "correct_option_index": 1,
                "explanation": "AI is not new. What changed is that it became powerful and easy to use, especially with generative AI tools.",
                "position": 10
              },
              {
                "id": "q_aif_01_11",
                "lesson_id": "les_aif_01_03",
                "question": "In 1956, researchers first used which name for the new field?",
                "options": [
                  "Artificial intelligence",
                  "Machine learning",
                  "Deep learning",
                  "Generative AI"
                ],
                "correct_option_index": 0,
                "explanation": "At a meeting in 1956, researchers first used the name “artificial intelligence.” The other terms came later.",
                "position": 11
              },
              {
                "id": "q_aif_01_12",
                "lesson_id": "les_aif_01_03",
                "question": "Which sentence correctly describes machine learning?",
                "options": [
                  "A person writes every rule the computer follows",
                  "The computer finds patterns from many examples instead of following only fixed rules",
                  "The computer copies one answer from a book",
                  "The computer works without any data"
                ],
                "correct_option_index": 1,
                "explanation": "Machine learning means the computer learns patterns from examples.",
                "position": 12
              },
              {
                "id": "q_aif_01_13",
                "lesson_id": "les_aif_01_03",
                "question": "“If the temperature is below 21°C, then heat” is an example of…",
                "options": [
                  "A fixed rule written by a person",
                  "Learning from examples",
                  "Deep learning",
                  "Generative AI"
                ],
                "correct_option_index": 0,
                "explanation": "A thermostat follows a rule that a person wrote. It does not learn.",
                "position": 13
              },
              {
                "id": "q_aif_01_14",
                "lesson_id": "les_aif_01_03",
                "question": "Which of these is generative AI?",
                "options": [
                  "A tool that creates a new picture from your written description",
                  "A calculator",
                  "A clock",
                  "A light switch"
                ],
                "correct_option_index": 0,
                "explanation": "Generative AI creates new content, such as pictures, text, or sound.",
                "position": 14
              },
              {
                "id": "q_aif_01_15",
                "lesson_id": "les_aif_01_03",
                "question": "In the circles map, which circle is the smallest and sits inside all the others?",
                "options": [
                  "Artificial intelligence",
                  "Machine learning",
                  "Generative AI",
                  "Deep learning"
                ],
                "correct_option_index": 2,
                "explanation": "The order from biggest to smallest is AI, machine learning, deep learning, and generative AI.",
                "position": 15
              },
              {
                "id": "q_aif_01_16",
                "lesson_id": "les_aif_01_03",
                "question": "True or false: AI is one single technology.",
                "options": [
                  "True",
                  "False"
                ],
                "correct_option_index": 1,
                "explanation": "AI is a large group of different tools. A chess program, a face-unlock feature, and a chatbot work in very different ways.",
                "position": 16
              },
              {
                "id": "q_aif_01_17",
                "lesson_id": "les_aif_01_03",
                "question": "Why does a spam filter learn from examples instead of using only fixed rules?",
                "options": [
                  "Spammers change their messages all the time, so rules alone cannot keep up",
                  "Computers cannot follow rules",
                  "Rules are against the law",
                  "Email has no patterns"
                ],
                "correct_option_index": 0,
                "explanation": "Learning from many examples lets the filter judge new messages that it has never seen.",
                "position": 17
              },
              {
                "id": "q_aif_01_18",
                "lesson_id": "les_aif_01_03",
                "question": "A map app predicts traffic and picks a faster route. What does this show?",
                "options": [
                  "AI is only used in laboratories",
                  "AI is already part of everyday life",
                  "Maps are a type of generative AI",
                  "AI always gives perfect routes"
                ],
                "correct_option_index": 1,
                "explanation": "Maps, email, phones, and entertainment all use AI every day.",
                "position": 18
              },
              {
                "id": "q_aif_01_19",
                "lesson_id": "les_aif_01_03",
                "question": "True or false: AI thinks and feels like a human.",
                "options": [
                  "True",
                  "False"
                ],
                "correct_option_index": 1,
                "explanation": "AI finds patterns in data. It may sound friendly, but that does not mean it understands or feels anything.",
                "position": 19
              },
              {
                "id": "q_aif_01_20",
                "lesson_id": "les_aif_01_03",
                "question": "Which statement about people and AI is true?",
                "options": [
                  "AI needs no people at all",
                  "People are no longer important",
                  "People build AI, give it data, and check its work",
                  "AI builds itself from nothing"
                ],
                "correct_option_index": 2,
                "explanation": "AI needs people at every stage, so people stay important.",
                "position": 20
              }
            ]
          }
        
      ]
    },
    {
        "id": "sec_aif_02",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 3 — Module 2: How AI Learns (50 min)",
        "position": 3,
        "lessons": [
          {
            "id": "les_aif_02_01",
            "section_id": "sec_aif_02",
            "title": "2.1 Written Lesson & Reading: How AI Learns + “Garbage In, Garbage Out”",
            "type": "article",
            "summary": "Learn the 4 steps of machine learning (data, training, model, prediction), the 3 learning types (supervised, unsupervised, reinforcement), and why data quality prevents bias.",
            "content": "> **What you will learn:** By the end of this lesson, you will be able to explain how a machine learning system learns from examples. You will know the four steps (**data, training, model, prediction**), and you will be able to name the three main ways machines learn.\n\n---\n\n### 1. Learning from examples\nFirst, think about how a child learns what an apple is. Nobody gives the child a long list of rules, such as *“round, red or green, with a stem on top.”* Instead, you show the child many apples and say, *“This is an apple.”* After a while, the child can recognize an apple they have never seen before, even if it is a different color or size.\n\nMachine learning works in a similar way. In other words, instead of writing rules for the computer, we show it many examples, and the computer finds the patterns by itself. This is why machine learning is so useful. Some problems, like recognizing a face or a spoken word, are too complicated for anyone to write down as rules.\n\n---\n\n### 2. The four steps: data, training, model, prediction\nEvery machine learning system follows the same four steps:\n\n| Step | What happens | Spam example |\n| :--- | :--- | :--- |\n| **1. DATA** | Examples are collected | Thousands of emails marked “spam” or “not spam” |\n| **2. TRAINING** | The computer studies the examples to find patterns | The computer compares the spam emails with the normal ones |\n| **3. MODEL** | The patterns it learned are saved | It saves patterns, such as pressure words, strange links, and requests for money |\n| **4. PREDICTION** | The model makes a guess about something new | A new email arrives and is marked “probably spam” |\n\n- **Step 1, Data:** Data is information, such as pictures, words, numbers, or sounds. The examples we use for learning are called **training data**.\n- **Step 2, Training:** Next, the computer studies the training data again and again. Each time, it adjusts itself to make fewer mistakes. This process is called **training**.\n- **Step 3, Model:** After training, what the computer has learned is saved as a **model**. You can think of the model as the “learned experience” of the system.\n- **Step 4, Prediction:** Finally, we give the model something new, and it makes a **prediction**. For example, it says, *“This email is probably spam,”* or *“This photo shows a cat.”*\n\n> **Remember:** The model is not a list of rules written by a person. It is a set of patterns that the computer found by itself.\n\n---\n\n### 3. Why predictions can be wrong\nBecause a model works with patterns, it makes a **best guess**, not a perfect answer. For instance, a spam filter may say an email is probably spam, but sometimes a normal email gets caught. Similarly, it may miss a new kind of spam that looks different from anything it has seen.\n\nTherefore, we should never think of AI as always right. Instead, we should think of it as very good at patterns it has seen before, and less reliable when something is new or unusual.\n\n---\n\n### 4. Three ways machines learn\nThere is more than one way to teach a machine. Fortunately, the three main ways are easy to picture with everyday examples:\n\n| Way of learning | Everyday picture | Example |\n| :--- | :--- | :--- |\n| **Supervised learning** | Studying with an answer key. Each example comes with the correct answer, called a **label** | A spam filter learns from emails labeled “spam” or “not spam.” A photo tool learns from pictures labeled “cat” or “dog” |\n| **Unsupervised learning** | Sorting a box of mixed buttons into piles. Nobody tells you the piles, so you group the buttons by how they look | A shop groups customers with similar buying habits, without being told the groups in advance |\n| **Reinforcement learning** | Training a dog with treats, or learning a video game by playing. You try something, get a reward or a penalty, and improve | A program learns to play a game by trying moves and earning points. A robot learns to walk by trial and error |\n\n> **In short:** Supervised learning has answers, unsupervised learning finds groups, and reinforcement learning uses rewards.\n\n---\n\n### Part B: Reading (8 minutes) — “Garbage In, Garbage Out”\nComputer experts have a short saying: **“garbage in, garbage out.”** It means that if the information we give a computer is poor, the results will be poor too. This idea is very important for AI, because a model is only as good as the data it learned from.\n\n#### Three questions to ask about data\nTo judge whether data is good, we can ask three simple questions:\n1. **Is there enough of it?** A child who has seen only one apple may not recognize a different apple. In the same way, a model with too few examples may not learn the pattern well.\n2. **Is it correct?** If many photos in the training data have the wrong label, for instance dogs labeled as cats, the model will learn the wrong lesson.\n3. **Does it cover everyone and everything?** This is called being **representative**. If the data leaves out some groups or situations, the model will not work well for them.\n\n#### Example 1: The daylight camera\nImagine a model that learns to recognize street signs, but all of its training photos were taken on sunny days. As a result, it may work well at noon, but it may make many mistakes at night or in the rain. The problem is not the computer. The problem is that the data did not show those situations.\n\n#### Example 2: Unfair results\nNow imagine a face recognition tool trained mostly on photos of one group of people. Because the data was not representative, the tool will probably work worse for people from other groups. This kind of unfair result is called **bias**. Importantly, bias often does not come from bad intentions. It often comes from data that is incomplete or unbalanced.\n\nSimilarly, if a model learns from past decisions that were unfair, it can repeat those unfair patterns. This is why people must check the data and the results.\n\n#### What can we do?\n- Use data that is large, correct, and varied.\n- Test the model on different groups and situations before using it.\n- Keep a person in charge of important decisions, such as hiring or health.\n\n> **In short:** Better data leads to better AI. Poor or unbalanced data leads to poor or unfair results.\n\n---\n\n> **Key takeaways:**\n> - Machine learning means the computer finds patterns from examples instead of following only written rules.\n> - The four steps are **data → training → model → prediction**.\n> - A model makes best guesses, so it can be wrong, especially with new or unusual cases.\n> - The three main ways to learn are **supervised**, **unsupervised**, and **reinforcement learning**.\n\n#### New words in this lesson\n| Word | Meaning |\n| :--- | :--- |\n| **Data** | Information such as pictures, words, numbers, or sounds |\n| **Training data** | The examples a system learns from |\n| **Label** | The correct answer attached to an example, such as “spam” or “cat” |\n| **Training** | The process of studying examples to find patterns |\n| **Model** | What the system has learned, saved as patterns it can use |\n| **Prediction** | The model’s best guess about something new |\n| **Supervised learning** | Learning from examples that come with correct answers |\n| **Unsupervised learning** | Finding groups or patterns in data without answers |\n| **Reinforcement learning** | Learning by trial and error with rewards |",
            "duration_seconds": 1200,
            "position": 1,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_02_02",
            "section_id": "sec_aif_02",
            "title": "2.2 Activity: “Be the Algorithm” (Good vs. Narrow Training Data)",
            "type": "article",
            "summary": "Act like a machine learning system in two rounds: learn from 10 labeled emails, predict 5 new ones, then see how a narrow “FREE = spam” rule fails.",
            "content": "> **Your goal:** Act like a machine learning system. You will learn from examples, make predictions, and then see what happens when the examples are poor. *(15 minutes total)*\n\n---\n\n### Round 1: Learn from good examples (7 minutes)\nFirst, study these **10 labeled email subject lines**. This is your **training data**. Look for patterns.\n\n| # | Subject line (training data) | Label |\n| :---: | :--- | :--- |\n| **1** | WIN a FREE prize now!!! | **Spam** |\n| **2** | Claim your reward: click here today | **Spam** |\n| **3** | Cheap pills, no prescription needed | **Spam** |\n| **4** | You have been selected: send your bank details | **Spam** |\n| **5** | Last chance: double your money in 24 hours | **Spam** |\n| **6** | Meeting moved to 3 pm tomorrow | **Not spam** |\n| **7** | Your library book is due Friday | **Not spam** |\n| **8** | Photos from the weekend trip | **Not spam** |\n| **9** | Invoice for October attached | **Not spam** |\n| **10** | Can you review my draft report? | **Not spam** |\n\nIn your **Personal Study Notes**, write in one or two sentences: **What do the spam messages have in common?**\n\nNext, predict the label for these **5 new messages**, and write the clue you used. These are your **predictions**:\n1. *Urgent: verify your password at this link*\n2. *Lunch on Thursday?*\n3. *Congratulations! You won a free vacation*\n4. *Notes from today’s class*\n5. *Free parking available at the venue*\n\n---\n\n### Round 2: Learn from poor examples (8 minutes)\nNow, imagine a different system. It was trained on a much narrower set of examples. In this set, every spam message contained the word **“FREE,”** and no normal message did. Because of this, the system learned only one pattern: **“FREE = spam.”**\n\nUse **only that rule** and predict the labels for the same 5 messages again, then compare with Round 1:\n1. *Urgent: verify your password at this link*\n2. *Lunch on Thursday?*\n3. *Congratulations! You won a free vacation*\n4. *Notes from today’s class*\n5. *Free parking available at the venue*\n\n#### Think about it\n- Which messages did the narrow system get wrong?\n- Why did the narrow system make those mistakes?\n- What kind of examples would you add to improve it?\n\n---\n\n### Answer Guide\n| # | New message | Best label (Round 1) | “FREE = spam” result | Right? |\n| :---: | :--- | :--- | :--- | :---: |\n| **1** | Urgent: verify your password at this link | **Spam** | Not spam | **Wrong** |\n| **2** | Lunch on Thursday? | **Not spam** | Not spam | **Right** |\n| **3** | Congratulations! You won a free vacation | **Spam** | Spam | **Right** |\n| **4** | Notes from today’s class | **Not spam** | Not spam | **Right** |\n| **5** | Free parking available at the venue | **Not spam** | Spam | **Wrong** |\n\n- **Round 1 pattern:** The spam messages use pressure and promises, such as “now,” “last chance,” “click here,” “prize,” and requests for money or private details. The normal messages are calm and about ordinary tasks. Message 5 is the tricky one: it contains “free,” but it is not spam. Learners who look at the whole meaning, not just one word, should get it right.\n- **Round 2 lesson:** The narrow system missed message 1 because it did not contain “free,” and it wrongly blocked message 5 because it did. The problem was **poor and narrow data**, not a bad computer. Adding varied examples, including normal messages with “free” and spam without it, would improve the system.",
            "duration_seconds": 900,
            "position": 2,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_02_03",
            "section_id": "sec_aif_02",
            "title": "2.3 Module 2 Knowledge Check (10 Questions from 20-Question Bank)",
            "type": "quiz",
            "summary": "Answer 10 questions randomly drawn from the 20-question Module 2 bank (15 minutes). Retake anytime for a fresh variation with instant feedback.",
            "duration_seconds": 900,
            "position": 3,
            "is_free_preview": false,
            "is_completed": false,
            "quiz_questions": [
              {
                "id": "q_aif_02_1",
                "lesson_id": "les_aif_02_03",
                "question": "Which order shows the four steps of machine learning?",
                "options": [
                  "Prediction → model → training → data",
                  "Data → training → model → prediction",
                  "Model → data → prediction → training",
                  "Training → prediction → data → model"
                ],
                "correct_option_index": 1,
                "explanation": "First we collect data, then the system trains on it, the result is saved as a model, and finally the model makes predictions.",
                "position": 1
              },
              {
                "id": "q_aif_02_2",
                "lesson_id": "les_aif_02_03",
                "question": "What is training data?",
                "options": [
                  "The examples a system learns from",
                  "The final answer the model gives",
                  "A list of rules written by a person",
                  "The screen of the computer"
                ],
                "correct_option_index": 0,
                "explanation": "Training data is the set of examples used to teach the system.",
                "position": 2
              },
              {
                "id": "q_aif_02_3",
                "lesson_id": "les_aif_02_03",
                "question": "In machine learning, what is a “model”?",
                "options": [
                  "A person who tests the system",
                  "A photo used as an example",
                  "What the system has learned, saved as patterns it can use",
                  "A type of computer"
                ],
                "correct_option_index": 2,
                "explanation": "The model holds the patterns learned during training. It is used to make predictions.",
                "position": 3
              },
              {
                "id": "q_aif_02_4",
                "lesson_id": "les_aif_02_03",
                "question": "Learning from examples that come with the correct answers is called…",
                "options": [
                  "Supervised learning",
                  "Unsupervised learning",
                  "Reinforcement learning",
                  "Random learning"
                ],
                "correct_option_index": 0,
                "explanation": "Supervised learning uses labeled examples, like studying with an answer key.",
                "position": 4
              },
              {
                "id": "q_aif_02_5",
                "lesson_id": "les_aif_02_03",
                "question": "A shop wants to group customers with similar buying habits without telling the computer the groups in advance. Which type of learning fits best?",
                "options": [
                  "Supervised learning",
                  "Unsupervised learning",
                  "Reinforcement learning",
                  "No learning"
                ],
                "correct_option_index": 1,
                "explanation": "Unsupervised learning finds groups in data without being given answers.",
                "position": 5
              },
              {
                "id": "q_aif_02_6",
                "lesson_id": "les_aif_02_03",
                "question": "A program learns to play a game by trying moves and earning points for good ones. This is…",
                "options": [
                  "Supervised learning",
                  "Unsupervised learning",
                  "Reinforcement learning",
                  "A fixed rule"
                ],
                "correct_option_index": 2,
                "explanation": "Reinforcement learning improves through trial and error with rewards.",
                "position": 6
              },
              {
                "id": "q_aif_02_7",
                "lesson_id": "les_aif_02_03",
                "question": "What does “garbage in, garbage out” mean?",
                "options": [
                  "Computers cannot store data",
                  "Poor data leads to poor results",
                  "Old computers should be thrown away",
                  "AI always cleans its own data"
                ],
                "correct_option_index": 1,
                "explanation": "A model is only as good as the data it learned from.",
                "position": 7
              },
              {
                "id": "q_aif_02_8",
                "lesson_id": "les_aif_02_03",
                "question": "A face recognition tool was trained mostly on photos of one group of people. What is the most likely problem?",
                "options": [
                  "It will work equally well for everyone",
                  "It will probably work worse for people who were underrepresented in the data",
                  "It will stop working",
                  "It will become faster"
                ],
                "correct_option_index": 1,
                "explanation": "Data that is not representative can lead to bias and unfair results.",
                "position": 8
              },
              {
                "id": "q_aif_02_9",
                "lesson_id": "les_aif_02_03",
                "question": "True or false: A machine learning model understands the meaning of data the way a person does.",
                "options": [
                  "True",
                  "False"
                ],
                "correct_option_index": 1,
                "explanation": "A model finds patterns in data. It does not understand meaning like a person.",
                "position": 9
              },
              {
                "id": "q_aif_02_10",
                "lesson_id": "les_aif_02_03",
                "question": "A model learned to read street signs from photos taken only in daylight. What will probably happen at night?",
                "options": [
                  "It will make more mistakes, because the data did not show night conditions",
                  "It will work perfectly",
                  "It will refuse to start",
                  "It will turn into a different model"
                ],
                "correct_option_index": 0,
                "explanation": "The model has not seen night conditions, so it is less reliable there. The training data was not varied enough.",
                "position": 10
              },
              {
                "id": "q_aif_02_11",
                "lesson_id": "les_aif_02_03",
                "question": "Teaching a child what an apple is by showing many apples is most similar to…",
                "options": [
                  "Machine learning from examples",
                  "Writing a fixed rule for a thermostat",
                  "Typing a prompt",
                  "Switching on a computer"
                ],
                "correct_option_index": 0,
                "explanation": "In both cases, the learner sees many examples and finds the pattern.",
                "position": 11
              },
              {
                "id": "q_aif_02_12",
                "lesson_id": "les_aif_02_03",
                "question": "In machine learning, what is a “label”?",
                "options": [
                  "The name of the computer",
                  "The correct answer attached to an example, such as “spam” or “cat”",
                  "A sticker on the screen",
                  "The speed of training"
                ],
                "correct_option_index": 1,
                "explanation": "Labels are the correct answers that supervised learning uses.",
                "position": 12
              },
              {
                "id": "q_aif_02_13",
                "lesson_id": "les_aif_02_03",
                "question": "Why can a model’s prediction be wrong?",
                "options": [
                  "It is a best guess from patterns, so new or unusual cases can fool it",
                  "Models are never trained",
                  "Models always know the true answer",
                  "Predictions are chosen at random"
                ],
                "correct_option_index": 0,
                "explanation": "A model makes best guesses. It is less reliable with cases that are very new or unusual.",
                "position": 13
              },
              {
                "id": "q_aif_02_14",
                "lesson_id": "les_aif_02_03",
                "question": "What does “training” mean in machine learning?",
                "options": [
                  "Teaching people to use a computer",
                  "Deleting old data",
                  "Studying examples again and again to find patterns and make fewer mistakes",
                  "Printing the results"
                ],
                "correct_option_index": 2,
                "explanation": "During training, the computer adjusts itself to make fewer mistakes.",
                "position": 14
              },
              {
                "id": "q_aif_02_15",
                "lesson_id": "les_aif_02_03",
                "question": "A photo tool learns from pictures marked “cat” or “dog.” This is…",
                "options": [
                  "Supervised learning",
                  "Unsupervised learning",
                  "Reinforcement learning",
                  "A fixed rule"
                ],
                "correct_option_index": 0,
                "explanation": "The pictures come with labels, so this is supervised learning.",
                "position": 15
              },
              {
                "id": "q_aif_02_16",
                "lesson_id": "les_aif_02_03",
                "question": "Sorting a box of mixed buttons into piles without being told the piles is like…",
                "options": [
                  "Supervised learning",
                  "Unsupervised learning",
                  "Reinforcement learning",
                  "Writing a rule"
                ],
                "correct_option_index": 1,
                "explanation": "Unsupervised learning finds groups in data without being given answers.",
                "position": 16
              },
              {
                "id": "q_aif_02_17",
                "lesson_id": "les_aif_02_03",
                "question": "A robot learns to walk by trying moves and getting rewards for good ones. This is…",
                "options": [
                  "Reinforcement learning",
                  "Supervised learning",
                  "Unsupervised learning",
                  "A fixed rule"
                ],
                "correct_option_index": 0,
                "explanation": "Reinforcement learning improves through trial and error with rewards.",
                "position": 17
              },
              {
                "id": "q_aif_02_18",
                "lesson_id": "les_aif_02_03",
                "question": "A spam filter was trained on only one kind of spam. What is most likely?",
                "options": [
                  "It will miss other kinds of spam that look different",
                  "It will catch every kind of spam",
                  "It will delete all email",
                  "It will stop learning forever"
                ],
                "correct_option_index": 0,
                "explanation": "The training data was not varied enough, so new kinds of spam can slip through.",
                "position": 18
              },
              {
                "id": "q_aif_02_19",
                "lesson_id": "les_aif_02_03",
                "question": "Which question helps you judge whether data is good?",
                "options": [
                  "Does it cover everyone and everything, or is it representative?",
                  "Is the file name short?",
                  "Is the screen bright?",
                  "Is the data stored on a red disk?"
                ],
                "correct_option_index": 0,
                "explanation": "Good data is large enough, correct, and representative.",
                "position": 19
              },
              {
                "id": "q_aif_02_20",
                "lesson_id": "les_aif_02_03",
                "question": "True or false: A model is a list of rules written by a person.",
                "options": [
                  "True",
                  "False"
                ],
                "correct_option_index": 1,
                "explanation": "A model is a set of patterns that the computer found by itself from examples.",
                "position": 20
              }
            ]
          }
        
      ]
    },
    {
        "id": "sec_aif_03",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 4 — Module 3: Generative AI and Chatbots (50 min)",
        "position": 4,
        "lessons": [
          {
            "id": "les_aif_03_01",
            "section_id": "sec_aif_03",
            "title": "3.1 Written Lesson & Reading: Generative AI, Chatbots & The Verification Habit",
            "type": "article",
            "summary": "Learn how language models and image generators work, their 6 strengths and 5 limits (hallucinations, cutoff, bias, no understanding, privacy), and the 4-step Verification Habit.",
            "content": "> **What you will learn:** By the end of this lesson, you will be able to explain what generative AI does and how a chatbot writes its answers. You will know where it is strong, where it goes wrong, and why you should check what it tells you.\n\n---\n\n### 1. What is generative AI?\nFirst, let’s remember the AI family from Module 1. Some AI tools recognize or sort things. For example, a spam filter decides whether an email is spam. In contrast, **generative AI** creates something new, such as a paragraph, a picture, a song, or a piece of computer code.\n\nFor example, you can type, *“Write a friendly message to invite my neighbors to a garden party,”* and a chatbot will write a new message for you. Similarly, you can describe a picture in words, and an image tool will draw it. This is why generative AI feels so different from older tools, and why so many people are talking about it.\n\n---\n\n### 2. How does a chatbot write its answers?\nNow we come to the key question. How does a chatbot produce text that sounds so natural?\n\nThink about the suggestions on your phone keyboard. When you type *“Good,”* the keyboard may suggest *“morning.”* It does this because, in the text it learned from, *“morning”* often follows *“Good.”* A chatbot works in a similar way, but on a much larger scale.\n\nIn other words, a chatbot is built on a **language model**. During training, the model studied huge amounts of text and learned which words and phrases usually go together. Then, when you send a request, called a **prompt**, the model builds its answer one small piece at a time. At each step, it predicts the most likely next piece.\n\n> **Remember:** A chatbot is designed to write text that sounds right. It is not designed to guarantee that the text is true.\n\nBecause of this, a chatbot does not “look up” facts like a library catalog by default. Instead, it generates likely-sounding text from patterns. Some tools can also search the web, which can help. However, you should still check important answers.\n\n---\n\n### 3. How do image generators work?\nImage tools follow a similar idea. During training, they studied very many pictures together with the words that describe them. As a result, they learned patterns that connect words and images. When you describe a picture, the tool creates a new image that fits those patterns. Notice that the image is newly made, not copied from a single photo, but it can still contain mistakes, such as strange hands or text that is spelled wrongly.\n\n---\n\n### 4. What generative AI does well\nGenerative AI is a useful helper for many everyday tasks. Here are some of its strengths:\n\n| Task | How it helps |\n| :--- | :--- |\n| **Drafting** | Writes a first version of an email, letter, or post, which you then improve |\n| **Summarizing** | Shortens a long text into the main points |\n| **Translating** | Gives a quick translation that you can check or polish |\n| **Brainstorming** | Suggests ideas, names, or approaches when you feel stuck |\n| **Explaining** | Describes a hard idea in simpler words or with an example |\n| **Practicing** | Acts as a partner for practicing a language or an interview |\n\nIn all of these tasks, the AI gives you a starting point. Then, you review and decide.\n\n---\n\n### 5. Where generative AI goes wrong\nHowever, generative AI also has important limits. It is better to know them before you rely on it.\n\n| Limit | What it means |\n| :--- | :--- |\n| **Hallucinations** | The AI gives an answer that sounds confident but is false or made up. For example, it may invent a book title, a statistic, or a web link that looks real but does not exist |\n| **Outdated knowledge** | A model learned from information up to a certain date, called its **knowledge cutoff**. Unless the tool can search the web, it may not know about recent events |\n| **Bias** | The model learned from human writing, which can be unbalanced or unfair. As a result, its answers can reflect those patterns |\n| **No real understanding** | The AI finds patterns in language. It does not understand or feel like a person, even when it sounds friendly |\n| **Privacy risks** | What you type may be stored or used by the tool, depending on its settings. Therefore, you should never share private information |\n\nThe most important limit for beginners is the **hallucination**, because the answer sounds correct. So the next reading teaches a simple habit for dealing with it.\n\n---\n\n### Part B: Reading (6 minutes) — The Verification Habit\nBecause AI can sound sure even when it is wrong, we need a habit that protects us. The habit has four steps. Fortunately, it only takes a few minutes.\n\n1. **Step 1: Check it** — First, look at the answer and ask, *“What can be checked?”* Names, dates, numbers, quotes, and web links are easy to check. Be extra careful when the answer sounds very exact or very perfect.\n2. **Step 2: Cross-check with a trusted source** — Next, look for the same fact in a trusted place. Good examples are official websites, well-known encyclopedias, and respected news organizations. If two independent trusted sources agree, you can feel more confident. If you cannot find the fact anywhere, treat it as unverified.\n3. **Step 3: Ask for sources, then verify them** — Then, you can ask the chatbot, *“What sources can I check for this?”* However, do not stop there, because chatbots can invent sources. Therefore, open each link, or search for the title, and confirm that it exists and really says what the chatbot claimed.\n4. **Step 4: Protect your privacy** — Finally, think about what you are typing. Never share passwords, bank details, ID numbers, private documents, or other people’s personal information. If you are not sure how a tool uses your data, check its privacy settings first.\n\n#### How careful should I be?\n| Situation | How much checking? |\n| :--- | :--- |\n| **Low stakes**, such as brainstorming party names | A quick look is enough |\n| **Medium stakes**, such as a school or work document | Check every fact, name, and number |\n| **High stakes**, such as health, money, law, or safety | Cross-check with trusted sources and ask a qualified person before acting |\n\n> **Helpful prompt ideas:** *“Tell me if you are not sure.”* and *“Give me sources I can check.”* These can help, but they never replace your own checking.\n\n---\n\n> **Key takeaways:**\n> - Generative AI creates new content, such as text, images, sound, and code.\n> - A chatbot builds answers by predicting likely next words from patterns it learned.\n> - It is useful for drafting, summarizing, translating, brainstorming, and explaining.\n> - It can hallucinate, be outdated, show bias, and put your privacy at risk.\n> - A confident answer is not always a correct answer, so check what matters.\n\n#### New words in this lesson\n| Word | Meaning |\n| :--- | :--- |\n| **Generative AI** | AI that creates new content, such as text, images, or sound |\n| **Chatbot** | A program you talk to by typing or speaking |\n| **Language model** | An AI model that learned patterns in language from large amounts of text |\n| **Prompt** | The request or question you give to an AI tool |\n| **Hallucination** | A confident answer that is false or made up |\n| **Knowledge cutoff** | The date after which a model has not learned new information |\n| **Bias** | An unfair or unbalanced tendency in results, often from the data |",
            "duration_seconds": 1080,
            "position": 1,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_03_02",
            "section_id": "sec_aif_03",
            "title": "3.2 Activity: “Spot the Hallucination” (Eiffel Tower, Marie Curie & Pacific Ocean)",
            "type": "article",
            "summary": "Investigate three AI-written answers using the 4-step Verification Habit to catch the made-up claim hidden inside a confident answer.",
            "content": "> **Your goal:** Three AI-written answers are shown below. Two are accurate and one contains a made-up claim. Use the verification habit to find it. *(17 minutes total)*\n\n---\n\n### Step 1: Read (3 minutes)\nRead the three answers carefully. Underline or list any facts you could check, such as names, dates, and numbers.\n\n| Answer | Text (written by an AI chatbot) |\n| :---: | :--- |\n| **Answer A**<br>*(Eiffel Tower)* | The Eiffel Tower is in Paris, France. It was completed in 1889 for the World’s Fair, and it was designed by the engineering company of Gustave Eiffel. It was the tallest man-made structure in the world until 1930. |\n| **Answer B**<br>*(Marie Curie)* | Marie Curie was born in Warsaw, Poland. She won Nobel Prizes in both Physics and Chemistry, and she was the first person to win two Nobel Prizes. She also won a third Nobel Prize, in Medicine, in 1921. |\n| **Answer C**<br>*(Pacific Ocean)* | The Pacific Ocean is the largest and deepest ocean on Earth. Its deepest point is the Mariana Trench, which is about 11,000 meters deep. The Pacific covers roughly one third of the Earth’s surface. |\n\n---\n\n### Step 2: Investigate (8 minutes)\nUse a search engine or an online encyclopedia. For each answer, check the facts you underlined. Follow the verification habit: check, cross-check with at least one trusted source, and note where you found the information.\n\n### Step 3: Record your findings (4 minutes)\nIn your **Personal Study Notes**, record for Answers **A**, **B**, and **C**:\n- **Claim I checked**\n- **True or false?**\n- **Source I used**\n\n### Step 4: Reflect (2 minutes)\n- Which answer contained the made-up claim, and how did you find it?\n- Why was it hard to notice by reading alone?\n- What will you do next time a chatbot gives you a fact?\n\n---\n\n### Answer Guide\n| Answer | Result |\n| :---: | :--- |\n| **A** | **Accurate.** The tower is in Paris, was completed in 1889 for the World’s Fair, and was designed by Gustave Eiffel’s company. It was the world’s tallest man-made structure until the Chrysler Building was completed in 1930. |\n| **B** | **Contains the made-up claim.** Marie Curie was born in Warsaw, won the Nobel Prize in Physics (1903) and in Chemistry (1911), and was the first person to win two Nobel Prizes. She did not win a third prize. The claim about a Nobel Prize in Medicine in 1921 is **invented**. |\n| **C** | **Accurate.** The Pacific is the largest and deepest ocean, the Mariana Trench is about 11,000 meters deep, and the Pacific covers roughly one third of the Earth’s surface. |\n\n> **Key lesson:** A hallucination can sit inside an answer that is mostly correct, and it sounds just as confident as the true parts.",
            "duration_seconds": 1020,
            "position": 2,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_03_03",
            "section_id": "sec_aif_03",
            "title": "3.3 Module 3 Knowledge Check (10 Questions from 20-Question Bank)",
            "type": "quiz",
            "summary": "Answer 10 questions randomly drawn from the 20-question Module 3 bank (15 minutes). Retake anytime for a fresh variation with instant feedback.",
            "duration_seconds": 900,
            "position": 3,
            "is_free_preview": false,
            "is_completed": false,
            "quiz_questions": [
              {
                "id": "q_aif_03_1",
                "lesson_id": "les_aif_03_03",
                "question": "Generative AI is best described as AI that…",
                "options": [
                  "Only sorts and recognizes things",
                  "Creates new content, such as text, images, or sound",
                  "Only works on the internet",
                  "Replaces all computers"
                ],
                "correct_option_index": 1,
                "explanation": "Generative AI creates new content. Other AI tools, like a spam filter, only recognize or sort.",
                "position": 1
              },
              {
                "id": "q_aif_03_2",
                "lesson_id": "les_aif_03_03",
                "question": "How does a chatbot mainly produce its answers?",
                "options": [
                  "By looking up one correct answer in a book",
                  "By predicting likely next words from patterns it learned in large amounts of text",
                  "By asking a person in another room",
                  "By copying one web page exactly"
                ],
                "correct_option_index": 1,
                "explanation": "A language model builds answers one small piece at a time by predicting what is likely to come next.",
                "position": 2
              },
              {
                "id": "q_aif_03_3",
                "lesson_id": "les_aif_03_03",
                "question": "What is a hallucination in AI?",
                "options": [
                  "A picture that is too bright",
                  "A confident answer that is false or made up",
                  "A slow computer",
                  "A message that is too short"
                ],
                "correct_option_index": 1,
                "explanation": "A hallucination sounds sure but is wrong, such as an invented book title or statistic.",
                "position": 3
              },
              {
                "id": "q_aif_03_4",
                "lesson_id": "les_aif_03_03",
                "question": "Which is a sensible use of a chatbot?",
                "options": [
                  "Writing a first draft of a letter that you then review and improve",
                  "Making a final medical decision without asking anyone",
                  "Sharing your bank password to get help",
                  "Copying its answer into an exam without checking"
                ],
                "correct_option_index": 0,
                "explanation": "Drafting is a strength of chatbots, as long as you review the result yourself.",
                "position": 4
              },
              {
                "id": "q_aif_03_5",
                "lesson_id": "les_aif_03_03",
                "question": "A chatbot gives you a surprising statistic. What should you do first?",
                "options": [
                  "Share it right away",
                  "Cross-check it with a trusted source",
                  "Ask the chatbot to repeat it louder",
                  "Ignore the rest of the answer"
                ],
                "correct_option_index": 1,
                "explanation": "Surprising or exact numbers are a good reason to cross-check with a trusted source before using them.",
                "position": 5
              },
              {
                "id": "q_aif_03_6",
                "lesson_id": "les_aif_03_03",
                "question": "A chatbot gives you a web link as its source. What is the best next step?",
                "options": [
                  "Trust it because it looks real",
                  "Open the link and confirm it exists and says what the chatbot claims",
                  "Delete the answer",
                  "Ask the chatbot to make the link shorter"
                ],
                "correct_option_index": 1,
                "explanation": "Chatbots can invent links and sources, so you must open them and confirm.",
                "position": 6
              },
              {
                "id": "q_aif_03_7",
                "lesson_id": "les_aif_03_03",
                "question": "Which information should you never paste into a chatbot?",
                "options": [
                  "A question about a recipe",
                  "A request to explain photosynthesis",
                  "Passwords, ID numbers, or private documents",
                  "A request for party ideas"
                ],
                "correct_option_index": 2,
                "explanation": "Private information may be stored or used by the tool, so keep it out of chatbots.",
                "position": 7
              },
              {
                "id": "q_aif_03_8",
                "lesson_id": "les_aif_03_03",
                "question": "True or false: If a chatbot sounds confident, its answer must be correct.",
                "options": [
                  "True",
                  "False"
                ],
                "correct_option_index": 1,
                "explanation": "Chatbots can sound very sure even when they are wrong. Always check important facts.",
                "position": 8
              },
              {
                "id": "q_aif_03_9",
                "lesson_id": "les_aif_03_03",
                "question": "Why might a chatbot not know about very recent events?",
                "options": [
                  "It is switched off at night",
                  "Its learning data stops at a certain date, called a knowledge cutoff, unless it can search the web",
                  "It dislikes the news",
                  "Recent events are never written down"
                ],
                "correct_option_index": 1,
                "explanation": "A model only knows what was in its training data. Some tools add web search, but checking is still wise.",
                "position": 9
              },
              {
                "id": "q_aif_03_10",
                "lesson_id": "les_aif_03_03",
                "question": "Why can a chatbot’s answers show bias?",
                "options": [
                  "Because it learned from human writing that can be unbalanced or unfair",
                  "Because it has opinions like a person",
                  "Because it is too fast",
                  "Because it uses too much electricity"
                ],
                "correct_option_index": 0,
                "explanation": "A model learns patterns from its data. If the data is unbalanced, the answers can reflect that.",
                "position": 10
              },
              {
                "id": "q_aif_03_11",
                "lesson_id": "les_aif_03_03",
                "question": "What is a prompt?",
                "options": [
                  "The request or question you give to an AI tool",
                  "The battery of a computer",
                  "A type of image",
                  "The final answer of a chatbot"
                ],
                "correct_option_index": 0,
                "explanation": "A prompt is what you type or say to an AI tool to ask for something.",
                "position": 11
              },
              {
                "id": "q_aif_03_12",
                "lesson_id": "les_aif_03_03",
                "question": "Which task is a strength of generative AI?",
                "options": [
                  "Summarizing a long text into its main points",
                  "Guaranteeing that every fact is true",
                  "Knowing news from tomorrow",
                  "Replacing all human judgment"
                ],
                "correct_option_index": 0,
                "explanation": "Summarizing is a strength, but you should still review the result.",
                "position": 12
              },
              {
                "id": "q_aif_03_13",
                "lesson_id": "les_aif_03_03",
                "question": "You ask a chatbot about last week’s news, but its learning data ends months ago. What should you do?",
                "options": [
                  "Trust the chatbot completely",
                  "Ask the chatbot to guess",
                  "Check a current, trusted news source",
                  "Ignore the news"
                ],
                "correct_option_index": 2,
                "explanation": "A model may not know recent events, so cross-check with current trusted sources.",
                "position": 13
              },
              {
                "id": "q_aif_03_14",
                "lesson_id": "les_aif_03_03",
                "question": "How do image generators create pictures?",
                "options": [
                  "They use patterns learned from many pictures and descriptions to make a new image",
                  "They copy one photo exactly",
                  "They search a library for a drawing",
                  "They ask a person to paint"
                ],
                "correct_option_index": 0,
                "explanation": "The image is newly made from learned patterns, so it can still contain mistakes.",
                "position": 14
              },
              {
                "id": "q_aif_03_15",
                "lesson_id": "les_aif_03_03",
                "question": "Which is a warning sign of a possible hallucination?",
                "options": [
                  "An exact-sounding name or number that you cannot find in any trusted source",
                  "A short answer",
                  "A friendly tone",
                  "An answer in a list"
                ],
                "correct_option_index": 0,
                "explanation": "Exact details that you cannot verify are a good reason to be careful.",
                "position": 15
              },
              {
                "id": "q_aif_03_16",
                "lesson_id": "les_aif_03_03",
                "question": "A chatbot answers a question about your health or money. How careful should you be?",
                "options": [
                  "A quick look is enough",
                  "Very careful: cross-check with trusted sources and ask a qualified person",
                  "Just trust it",
                  "Ask the chatbot to repeat it"
                ],
                "correct_option_index": 1,
                "explanation": "High-stakes decisions need more checking and a qualified person.",
                "position": 16
              },
              {
                "id": "q_aif_03_17",
                "lesson_id": "les_aif_03_03",
                "question": "Which prompt idea can help a little but never replaces your own checking?",
                "options": [
                  "“Tell me if you are not sure.”",
                  "“Be correct.”",
                  "“Never make mistakes.”",
                  "“Hide your sources.”"
                ],
                "correct_option_index": 0,
                "explanation": "Helpful prompts can reduce problems, but you must still check important facts.",
                "position": 17
              },
              {
                "id": "q_aif_03_18",
                "lesson_id": "les_aif_03_03",
                "question": "True or false: By default, a chatbot looks up facts in a library catalog.",
                "options": [
                  "True",
                  "False"
                ],
                "correct_option_index": 1,
                "explanation": "A chatbot generates likely-sounding text from patterns. Some tools can also search the web, but you should still check.",
                "position": 18
              },
              {
                "id": "q_aif_03_19",
                "lesson_id": "les_aif_03_03",
                "question": "Why do AI-generated images sometimes show strange hands or misspelled text?",
                "options": [
                  "The images are newly made from patterns, and patterns can produce mistakes",
                  "Cameras are broken",
                  "The image tool is tired",
                  "Hands cannot be drawn by any tool"
                ],
                "correct_option_index": 0,
                "explanation": "Generated images can contain errors, so look at them carefully.",
                "position": 19
              },
              {
                "id": "q_aif_03_20",
                "lesson_id": "les_aif_03_03",
                "question": "Which is the best example of a low-stakes use of a chatbot?",
                "options": [
                  "Brainstorming names for a party",
                  "Choosing a medicine",
                  "Deciding on a loan",
                  "Writing a legal contract without help"
                ],
                "correct_option_index": 0,
                "explanation": "Brainstorming has low stakes. Health, money, and law need much more care.",
                "position": 20
              }
            ]
          }
        
      ]
    },
    {
        "id": "sec_aif_04",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 5 — Module 4: AI in Society (50 min)",
        "position": 5,
        "lessons": [
          {
            "id": "les_aif_04_01",
            "section_id": "sec_aif_04",
            "title": "4.1 Written Lesson & Reading: AI in Society + The Responsible-Use Checklist",
            "type": "article",
            "summary": "Explore AI across 6 areas of life, 4 key benefits, 5 main risks (bias, privacy, deepfakes, energy, jobs), human-in-the-loop governance, and the Purpose-Data-Verify-Disclose-Human checklist.",
            "content": "> **What you will learn:** By the end of this lesson, you will be able to name where AI is used in daily life and industry. You will also be able to weigh its benefits against its main risks, and you will know why people must stay in charge.\n\n---\n\n### 1. AI is already part of many areas of life\nFirst, let’s look at the big picture. In earlier modules, you saw AI in maps, email, and phones. In fact, AI is now used in almost every area of society. The table below shows some examples, together with one thing to watch in each area:\n\n| Area | How AI helps | What to watch |\n| :--- | :--- | :--- |\n| **Health** | Helps doctors notice patterns in scans and test results | Mistakes are possible, and health data is very private. A doctor should make the final decision |\n| **Banking** | Spots unusual card activity to catch fraud, and helps check applications | Honest customers can be blocked by mistake, and decisions can be unfair |\n| **Transport** | Predicts traffic, plans routes, and supports driver-assist features | Unusual situations can confuse the system, so safety checks matter |\n| **Entertainment and social media** | Suggests videos, music, and posts you may like | You may see only more of the same, and you may spend more time than you planned |\n| **Education** | Explains ideas, gives practice, and adapts exercises | Answers can be wrong, and copying can replace real learning |\n| **Work** | Drafts text, summarizes meetings, and answers common customer questions | Quality still needs checking, and some tasks are changing |\n\n---\n\n### 2. The benefits\nBecause of these uses, AI brings real benefits. For example, it can **save time** on routine tasks. In addition, it can **find patterns** in large amounts of data that people would miss. Moreover, it can make things **easier to access**, such as automatic captions, translation, and reading text aloud. Finally, it can give **personal help**, such as practice questions that match your level.\n\n---\n\n### 3. The five main risks\nHowever, AI also brings risks. It is better to know them early, so you can use AI wisely. Here are the five main ones:\n\n1. **Risk 1: Bias and unfair results.** As you learned in Module 2, a model learns from data. If the data is incomplete or unbalanced, the results can be unfair to some people. For example, a system may work well for one group and badly for another.\n2. **Risk 2: Privacy.** AI tools often need data, and some of that data is personal. Therefore, it is important to know what you share, who can see it, and how it may be used.\n3. **Risk 3: Deepfakes and misinformation.** AI can now create very realistic fake pictures, voices, and videos, called **deepfakes**. As a result, something that looks or sounds real may be false. Whenever a clip or image shocks you, pause first. Then check whether trusted news sources report the same thing before you believe it or share it.\n4. **Risk 4: Energy use.** Training and running large AI systems can use a lot of electricity. For this reason, it is wise to use AI when it helps, instead of using it for everything.\n5. **Risk 5: Changes to jobs.** AI can do some tasks faster, so some jobs are changing. At the same time, new tasks and new jobs appear. Consequently, learning how to work with AI is a useful skill for almost everyone.\n\n---\n\n### 4. People stay in charge\nSo who is responsible when AI makes a mistake? The answer is simple: **people are.** AI is a tool, so the people and organizations that build it and use it must make sure it is safe, fair, and honest.\n\nExperts call this idea **“human in the loop.”** It means that a person reviews and controls important decisions, such as hiring, health, or money. In addition, many places are creating rules for AI. For instance, the European Union has passed a law about AI. The details differ from place to place, but the goal is the same: to make AI safe and trustworthy.\n\n---\n\n### 5. Your role\nFinally, remember that you are not only a user of AI. You are also a **decision maker**. You decide what to share, what to believe, and when to ask a human. The next reading gives you a simple checklist to help with these decisions.\n\n---\n\n### Part B: Reading (8 minutes) — The Responsible-Use Checklist\nWhenever you use an AI tool, you can ask five simple questions. Together, they make a checklist that is easy to remember: **Purpose, Data, Verify, Disclose, Human**.\n\n| Check | Ask yourself | Example |\n| :--- | :--- | :--- |\n| **Purpose** | Why am I using AI here? Is it a good fit for this task? | Using it to brainstorm ideas is a good fit. Using it to make a final medical choice is not |\n| **Data** | What am I sharing? Would I be comfortable if it became public? | Never paste passwords, bank details, ID numbers, or other people’s private information |\n| **Verify** | Have I checked the facts, names, numbers, and sources? | Cross-check with a trusted source before using a statistic |\n| **Disclose** | Am I honest about using AI? What are the rules for this school or workplace? | If a course says to mention AI help, mention it. If it forbids AI, do not use it |\n| **Human** | Who makes the final decision? Should a qualified person check this? | For health, money, law, or safety, ask a qualified person before acting |\n\n#### Three short scenarios\nNow, let’s test the checklist. Read each scenario and decide what you would do before checking the suggested answers:\n- **Scenario 1:** A student asks a chatbot to write a whole essay and submits it as their own work.\n- **Scenario 2:** An employee pastes a customer’s name, address, and phone number into a public chatbot to write a reply faster.\n- **Scenario 3:** You receive a shocking video of a well-known person saying something unbelievable. Friends are already sharing it.\n\n#### Suggested answers\n- **Scenario 1:** The **Disclose** and **Purpose** checks fail. The student should follow the school’s rules, be honest about any AI help, and use AI to support learning, such as getting feedback, not to replace the work.\n- **Scenario 2:** The **Data** check fails. Customer details are private. The employee should remove the personal details or use a tool that the company has approved.\n- **Scenario 3:** The **Verify** check applies. Pause, look for the same story from trusted news sources, and do not share it until it is confirmed. It may be a deepfake.\n\n> **In short:** **Purpose, Data, Verify, Disclose, Human.** A few seconds with this checklist can prevent many problems.\n\n---\n\n> **Key takeaways:**\n> - AI is used in health, banking, transport, entertainment, education, and work.\n> - The benefits are saving time, finding patterns, making things accessible, and personal help.\n> - The five main risks are **bias**, **privacy**, **deepfakes and misinformation**, **energy use**, and **changes to jobs**.\n> - People are responsible for AI, and important decisions need a **human in the loop**.\n> - You can protect yourself with simple habits and a personal set of rules.\n\n#### New words in this lesson\n| Word | Meaning |\n| :--- | :--- |\n| **Deepfake** | A very realistic fake picture, voice, or video made with AI |\n| **Misinformation** | False or misleading information, shared on purpose or by mistake |\n| **Privacy** | Your right to control who can see and use your personal information |\n| **Human in the loop** | A person reviews and controls important decisions made with AI |\n| **Automation** | Using technology to do a task without a person doing every step |\n| **Responsible use** | Using AI in ways that are safe, fair, and honest |",
            "duration_seconds": 1200,
            "position": 1,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_04_02",
            "section_id": "sec_aif_04",
            "title": "4.2 Activity: “My Five Rules” + Where to Go Next",
            "type": "article",
            "summary": "Write five specific, realistic personal AI rules with reasons (\"because\"), test them on two real-world situations, and preview your next courses.",
            "content": "> **Your goal:** Write five personal rules for using AI, one for each part of the checklist. Make them specific and honest, so you can really follow them. *(15 minutes total)*\n\n---\n\n### Step 1: Think (3 minutes)\nThink about how you use AI now, or how you expect to use it. Which tools do you use? What do you ask them? What information do you share?\n\n### Step 2: Write your rules (7 minutes)\nUse the sentence frames below in your **Personal Study Notes**. Each rule needs two parts: **what you will do** and **why** (include *\"because\"*).\n\n| # | Topic | Sentence frame |\n| :---: | :--- | :--- |\n| **1** | **Purpose** | *I will use AI for ___ and I will not use it for ___ because ___.* |\n| **2** | **Data** | *I will never share ___ with an AI tool because ___.* |\n| **3** | **Verify** | *Before I use a fact from AI, I will ___ because ___.* |\n| **4** | **Disclose** | *When I use AI for ___, I will ___ because ___.* |\n| **5** | **Human** | *For decisions about ___, I will ask ___ because ___.* |\n\n### Step 3: Test your rules (3 minutes)\nNext, check whether your rules would help in these two situations. Write one sentence for each:\n- **Situation A:** You want a chatbot to summarize a long contract from your landlord. Which of your rules apply, and what will you do?\n- **Situation B:** A friend sends you an audio clip of a famous person saying something shocking. Which of your rules apply, and what will you do?\n\n### Step 4: Choose one to share (2 minutes)\nFinally, pick the rule you think is most useful and imagine telling it to a friend or family member. Write it in one sentence.\n\n---\n\n### What good rules look like\n| Topic | Weak rule | Stronger rule |\n| :--- | :--- | :--- |\n| **Data** | “I will be careful.” | “I will never paste passwords or private documents into a chatbot, because I do not know how the tool stores them.” |\n| **Verify** | “I will check sometimes.” | “Before I use a number or a quote from AI, I will find it in a trusted source, because AI can invent facts.” |\n| **Human** | “I will ask someone.” | “For health or money decisions, I will talk to a doctor or a bank adviser, because mistakes can be costly.” |\n\n> **Self-check:** Strong rules are specific, realistic, and explain why (a sentence with *\"because\"*). Look at your weakest rule and make it more specific.\n\n---\n\n### Part F: Where to Go Next\nEach course in the catalog is standalone, so you can choose whichever fits your goals after completing **AI Foundations**:\n\n| If you want to… | Take this course |\n| :--- | :--- |\n| Get better results from chatbots and write stronger prompts | **Generative AI and Prompt Engineering** |\n| Go deeper on bias, privacy, safety, and rules | **AI Ethics, Safety, and Responsible Use** |\n| Save time at work or in study with AI tools | **AI for Productivity and Workflow Automation** |\n| Understand how models are built and trained (coding) | **Machine Learning Essentials** |\n| Design websites faster with AI help | **Web Design with AI** |\n| Write and fix code with an AI assistant | **Coding with AI** |\n| Add AI features to a website | **Integrating AI into Your Website** |\n| Build an AI-powered application or solve a real problem | **Building AI-Powered Applications**, or the **AI Capstone** |",
            "duration_seconds": 900,
            "position": 2,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_04_03",
            "section_id": "sec_aif_04",
            "title": "4.3 Module 4 Knowledge Check (10 Questions from 20-Question Bank)",
            "type": "quiz",
            "summary": "Answer 10 questions randomly drawn from the 20-question Module 4 bank (15 minutes). Retake anytime for a fresh variation with instant feedback.",
            "duration_seconds": 900,
            "position": 3,
            "is_free_preview": false,
            "is_completed": false,
            "quiz_questions": [
              {
                "id": "q_aif_04_1",
                "lesson_id": "les_aif_04_03",
                "question": "Which is an example of AI in banking?",
                "options": [
                  "Spotting unusual card activity that may be fraud",
                  "Printing paper statements",
                  "Counting coins in a machine",
                  "Locking the bank door at night"
                ],
                "correct_option_index": 0,
                "explanation": "Banks use AI to spot unusual patterns in card activity, which helps catch fraud.",
                "position": 1
              },
              {
                "id": "q_aif_04_2",
                "lesson_id": "les_aif_04_03",
                "question": "Unfair AI results often come from…",
                "options": [
                  "Data that is incomplete or unbalanced",
                  "Computers that are too fast",
                  "Screens that are too small",
                  "Too many people using the tool"
                ],
                "correct_option_index": 0,
                "explanation": "As in Module 2, a model learns from its data. Poor or unbalanced data can lead to bias.",
                "position": 2
              },
              {
                "id": "q_aif_04_3",
                "lesson_id": "les_aif_04_03",
                "question": "What is a deepfake?",
                "options": [
                  "A very realistic fake picture, voice, or video made with AI",
                  "A slow computer",
                  "A type of password",
                  "A deep learning textbook"
                ],
                "correct_option_index": 0,
                "explanation": "Deepfakes can look and sound real, so they can spread false information.",
                "position": 3
              },
              {
                "id": "q_aif_04_4",
                "lesson_id": "les_aif_04_03",
                "question": "You receive a shocking video of a public figure. What should you do first?",
                "options": [
                  "Share it immediately",
                  "Pause and check whether trusted news sources report the same thing",
                  "Believe it because it looks real",
                  "Comment angrily"
                ],
                "correct_option_index": 1,
                "explanation": "Pausing and checking helps stop the spread of misinformation.",
                "position": 4
              },
              {
                "id": "q_aif_04_5",
                "lesson_id": "les_aif_04_03",
                "question": "Why should you avoid pasting private documents into a chatbot?",
                "options": [
                  "The tool may store or use the information, which is a privacy risk",
                  "The chatbot cannot read documents",
                  "Documents make the chatbot tired",
                  "It uses too much paper"
                ],
                "correct_option_index": 0,
                "explanation": "Private information can be stored or used by the tool, so keep it out.",
                "position": 5
              },
              {
                "id": "q_aif_04_6",
                "lesson_id": "les_aif_04_03",
                "question": "What does “human in the loop” mean?",
                "options": [
                  "A person reviews and controls important decisions made with AI",
                  "A robot lives in a house",
                  "Only people can use AI",
                  "AI must work without any help"
                ],
                "correct_option_index": 0,
                "explanation": "Important decisions, such as in health or money, need a person in charge.",
                "position": 6
              },
              {
                "id": "q_aif_04_7",
                "lesson_id": "les_aif_04_03",
                "question": "True or false: AI changes some jobs, but it also creates new tasks and new jobs.",
                "options": [
                  "True",
                  "False"
                ],
                "correct_option_index": 0,
                "explanation": "AI automates some tasks, while new tasks and roles appear. Learning to work with AI is a useful skill.",
                "position": 7
              },
              {
                "id": "q_aif_04_8",
                "lesson_id": "les_aif_04_03",
                "question": "Which is the best example of a good personal rule?",
                "options": [
                  "“I will be careful with AI.”",
                  "“I never paste passwords or private documents into a chatbot, because I do not know how it stores them.”",
                  "“I will use AI for everything.”",
                  "“I will never think about AI.”"
                ],
                "correct_option_index": 1,
                "explanation": "A good rule is specific, realistic, and includes a reason.",
                "position": 8
              },
              {
                "id": "q_aif_04_9",
                "lesson_id": "les_aif_04_03",
                "question": "Your school allows AI help only if you mention it. What should you do when you use it?",
                "options": [
                  "Hide it",
                  "Follow the rule and be honest about the AI help",
                  "Ask a friend to hide it",
                  "Stop reading the rules"
                ],
                "correct_option_index": 1,
                "explanation": "Disclosing AI use honestly and following the rules is part of responsible use.",
                "position": 9
              },
              {
                "id": "q_aif_04_10",
                "lesson_id": "les_aif_04_03",
                "question": "Which risk is about AI systems using a lot of electricity?",
                "options": [
                  "Bias",
                  "Energy use",
                  "Deepfakes",
                  "Privacy"
                ],
                "correct_option_index": 1,
                "explanation": "Training and running large AI systems can use a lot of electricity, so it is wise to use AI when it truly helps.",
                "position": 10
              },
              {
                "id": "q_aif_04_11",
                "lesson_id": "les_aif_04_03",
                "question": "Which is a benefit of AI mentioned in this module?",
                "options": [
                  "Making things more accessible, such as automatic captions",
                  "Removing all risks",
                  "Replacing every teacher",
                  "Making privacy unnecessary"
                ],
                "correct_option_index": 0,
                "explanation": "AI can help with captions, translation, and reading text aloud.",
                "position": 11
              },
              {
                "id": "q_aif_04_12",
                "lesson_id": "les_aif_04_03",
                "question": "In which area can AI help doctors notice patterns in scans?",
                "options": [
                  "Health",
                  "Entertainment",
                  "Banking",
                  "Transport"
                ],
                "correct_option_index": 0,
                "explanation": "Health is one area where AI supports doctors. A doctor should make the final decision.",
                "position": 12
              },
              {
                "id": "q_aif_04_13",
                "lesson_id": "les_aif_04_03",
                "question": "In the responsible-use checklist, what does “Data” ask?",
                "options": [
                  "How fast is the tool?",
                  "What am I sharing, and would I be comfortable if it became public?",
                  "What color is the app?",
                  "Who built the keyboard?"
                ],
                "correct_option_index": 1,
                "explanation": "The Data check is about what you share with a tool.",
                "position": 13
              },
              {
                "id": "q_aif_04_14",
                "lesson_id": "les_aif_04_03",
                "question": "In the checklist, what does “Disclose” ask?",
                "options": [
                  "Am I honest about using AI, and do I follow the rules of my school or workplace?",
                  "Did I turn off the computer?",
                  "Can I hide that I used AI?",
                  "Is the answer long enough?"
                ],
                "correct_option_index": 0,
                "explanation": "Being honest about AI use and following the rules is part of responsible use.",
                "position": 14
              },
              {
                "id": "q_aif_04_15",
                "lesson_id": "les_aif_04_03",
                "question": "An employee pastes a customer’s name, address, and phone number into a public chatbot. Which check fails?",
                "options": [
                  "Data",
                  "Purpose only",
                  "Human only",
                  "None of them"
                ],
                "correct_option_index": 0,
                "explanation": "Customer details are private and should not be pasted into a public tool.",
                "position": 15
              },
              {
                "id": "q_aif_04_16",
                "lesson_id": "les_aif_04_03",
                "question": "What is a risk of recommendation systems on social media?",
                "options": [
                  "You may see only more of the same and spend more time than planned",
                  "They stop all advertising",
                  "They make every post true",
                  "They delete your account every day"
                ],
                "correct_option_index": 0,
                "explanation": "Recommendations can keep showing similar content, so it helps to be aware.",
                "position": 16
              },
              {
                "id": "q_aif_04_17",
                "lesson_id": "les_aif_04_03",
                "question": "True or false: When AI makes a mistake, the AI alone is responsible, not people.",
                "options": [
                  "True",
                  "False"
                ],
                "correct_option_index": 1,
                "explanation": "The people and organizations that build and use AI are responsible for making it safe, fair, and honest.",
                "position": 17
              },
              {
                "id": "q_aif_04_18",
                "lesson_id": "les_aif_04_03",
                "question": "What is misinformation?",
                "options": [
                  "False or misleading information, shared on purpose or by mistake",
                  "A very fast computer",
                  "Information that is always correct",
                  "A kind of password"
                ],
                "correct_option_index": 0,
                "explanation": "Misinformation can spread easily, especially when deepfakes look real.",
                "position": 18
              },
              {
                "id": "q_aif_04_19",
                "lesson_id": "les_aif_04_03",
                "question": "Which decision most needs a human in the loop?",
                "options": [
                  "A decision about hiring, health, or money",
                  "Choosing a song",
                  "Picking a wallpaper",
                  "Naming a pet"
                ],
                "correct_option_index": 0,
                "explanation": "Important decisions that affect people need a person in charge.",
                "position": 19
              },
              {
                "id": "q_aif_04_20",
                "lesson_id": "les_aif_04_03",
                "question": "What makes a personal AI rule strong?",
                "options": [
                  "It is specific, realistic, and explains why",
                  "It is long and complicated",
                  "It is never followed",
                  "It is vague, such as “be careful”"
                ],
                "correct_option_index": 0,
                "explanation": "Strong rules are specific, can really be followed, and include a reason.",
                "position": 20
              }
            ]
          }
        
      ]
    },
    {
        "id": "sec_aif_05",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 6: Guided Lab (1.0h)",
        "position": 6,
        "lessons": [
          {
            "id": "les_aif_05_01",
            "section_id": "sec_aif_05",
            "title": "5.1 Guided Lab Part A: Train & Test an Image Classifier (35 min)",
            "type": "article",
            "summary": "Teach a no-code image classifier 3 classes, test 6 new examples, break it on purpose with Narrow Data or Too Little Data, and record your observations.",
            "implementation_tip": "No webcam? Download our ready-made image set (Pen, Mug, Phone — 25 photos each + dim-light test folder) using the Upload option in Teachable Machine!",
            "content": "> **Your goal:** Teach a computer to tell three things apart by showing it examples. Then, find out what happens when the examples are poor. This is the **data → training → model → prediction** flow from Module 2, and you will see it work. *(35 minutes)*\n\n> **Privacy tip:** Use everyday objects or hand gestures. **Please do not use photos of other people’s faces.** Your images are for learning only, and you should not upload private photos. Check the tool’s privacy notice if you are not sure.\n\n---\n\n### Step 1: Set up (5 minutes)\n1. Open the image tool in your browser (for example, [Google Teachable Machine](https://teachablemachine.withgoogle.com/)).\n2. Choose an **Image Project**, and then the **Standard image model**.\n3. Rename the first three classes. Choose three things that look clearly different. For example: *Pen, Mug, Phone*, or three hand gestures: *Thumbs up, Open hand, Fist*.\n4. Write your three class names in the Step 6 observation table in your **Personal Study Notes**.\n\n---\n\n### Step 2: Collect training data (10 minutes)\n1. For each class, record **20–30 samples** with your webcam. If you have no webcam, upload photos or use the ready-made image set from your course team.\n2. Make the samples **varied**: change the angle, the distance, and the background a little each time.\n3. Keep the three classes **balanced**, with about the same number of samples in each.\n\nThis is your **training data**. The **labels** are the class names that you gave.\n\n---\n\n### Step 3: Train the model (3 minutes)\n1. Click **Train Model**.\n2. Keep the tab open and visible until training finishes (switching tabs can stop it).\n3. When it is done, you have a **model**.\n\n---\n\n### Step 4: Test it with new examples (5 minutes)\nNow give the model something new. Show each object or gesture to the camera, or upload a new image. The model will make a **prediction**, and it will show how confident it is.\n\nRun **at least 6 tests** (two for each class). Record the results in your **Personal Study Notes**, and **take one screenshot of the preview window while testing**:\n\n| Test | What I showed | Model’s prediction | Confidence (%) | Right or wrong? |\n| :---: | :--- | :--- | :---: | :---: |\n| **1–6** | *(Record 2 tests per class)* | | | |\n\n---\n\n### Step 5: Break it on purpose (10 minutes)\nNext, you will see what poor data does. Choose **one** of the two experiments:\n\n- **Experiment 1: Narrow data**\n  1. Delete all samples of one class.\n  2. Record new samples for that class, but **all in the same conditions**: the same angle, the same light, and the same background. Make the other two classes different from this.\n  3. Train again.\n  4. Test again in normal conditions, with a different angle, light, and background.\n- **Experiment 2: Too little data**\n  1. Delete most samples of one class, so that **only 3–5 remain**.\n  2. Train again.\n  3. Test all three classes again.\n\nRun **at least 6 tests** again, record the results in your **Personal Study Notes**, and **take one screenshot of the new results**.\n\n---\n\n### Step 6: Record your observations (2 minutes)\nComplete these 5 prompts in your **Personal Study Notes**:\n1. **My three classes were…**\n2. **Number of right answers in Step 4 (out of 6):**\n3. **Experiment I chose (1 or 2):**\n4. **Number of right answers in Step 5 (out of 6):**\n5. **What changed after I made the data poor?**\n\n---\n\n### Part D (Alternative for Part A if webcam/image tool is unavailable)\nTwo models were trained to tell apart a mug, a pen, and a phone. **Model 1** was trained on varied, balanced photos. **Model 2** was trained with all the mug photos taken in dim light from one angle:\n\n| Test | What was shown | Model 1 prediction | Model 2 prediction | Notes |\n| :---: | :--- | :--- | :--- | :--- |\n| **1** | Mug, bright light | Mug | Phone | Model 2 is wrong |\n| **2** | Mug, dim light | Mug | Mug | Both right |\n| **3** | Pen, bright light | Pen | Pen | Both right |\n| **4** | Phone, bright light | Phone | Phone | Both right |\n| **5** | Mug, side angle | Mug | Pen | Model 2 is wrong |\n| **6** | Pen, dim light | Pen | Mug | Model 2 is wrong |\n\n1. Count the correct answers for each model.\n2. Explain why Model 2 made its mistakes. Which part of the data was the problem?\n3. Describe two changes that would improve Model 2.",
            "duration_seconds": 2100,
            "position": 1,
            "is_free_preview": false,
            "is_completed": false,
            "resources": [
              {
                "id": "res_aif_imageset",
                "name": "AI_Foundations_Ready_Made_Image_Set_Guide.txt",
                "size": "12 KB",
                "type": "TXT",
                "description": "Instructions and sample set guide for learners without a webcam (3 categories: Pen, Mug, Phone + Skewed Light Test)."
              }
            ]
          },
          {
            "id": "les_aif_05_02",
            "section_id": "sec_aif_05",
            "title": "5.2 Guided Lab Parts B & C: Probe a Chatbot, Debrief & Troubleshooting (25 min)",
            "type": "article",
            "summary": "Test a chatbot with a well-known fact, a tricky/obscure prompt, and a 3-source check; complete the 5-prompt debrief worksheet and save your evidence for the final assessment.",
            "content": "> **Your goal:** Test a chatbot with three kinds of questions, check what it says using the 4-step Verification Habit from Module 3, and complete your Debrief Worksheet. **Keep your Part B screenshots and notes—you will reuse them in the final assessment!** *(25 minutes total: 20m Part B + 5m Part C)*\n\n> **Before you start:** Do not type private information. Use general questions only. Chatbots can answer differently each time, so record what your chatbot really said, even if it differs from what others see.\n\n---\n\n### Part B: Probe a Chatbot (20 minutes)\n\n#### Question 1: A well-known fact (3 minutes)\nAsk something you can easily check, such as *“Who wrote the novel Pride and Prejudice?”* or *“At what temperature does water boil at sea level?”* Then check the answer.\n\n#### Question 2: A tricky or obscure question (5 minutes)\nAsk something that is hard or has a false idea inside it. Here are two examples you may use, or you may write your own:\n- *“When did Marie Curie win her Nobel Prize in Literature?”* (Her prizes were not in literature, so does the chatbot notice?)\n- *“Summarize the book ‘The Quiet River of Maplewood’ by A. Hartley.”* (This is a made-up title. Does the chatbot admit it does not know it?)\n\nThen check whether the answer is **true**, **partly true**, or **invented**.\n\n#### Question 3: A request for sources (8 minutes)\nAsk the chatbot about a topic you know a little about, and then ask: **“Give me three sources I can check.”**\nFor each source, search for it. Does the page, article, or book really exist, and does it say what the chatbot claimed?\n\n#### Record your results (4 minutes)\nTake **one screenshot for each question** (3 screenshots total). Then complete these two tables in your **Personal Study Notes**:\n\n| Question type | Question I asked | What I checked | Source I used | Result (correct, partly correct, or wrong) |\n| :--- | :--- | :--- | :--- | :--- |\n| **1. A well-known fact** | | | | |\n| **2. A tricky or obscure question** | | | | |\n| **3. A request for sources** | | | | |\n\nFor **Question 3**, list each source the chatbot gave:\n\n| Source the chatbot gave | Does it exist? (yes or no) | Does it say what the chatbot claimed? |\n| :--- | :---: | :--- |\n| **Source 1** | | |\n| **Source 2** | | |\n| **Source 3** | | |\n\n*(Alternative if no chatbot is available: Use the sample chatbot transcripts from your course team, mark verifiable claims, search for them, and fill in the tables above.)*\n\n---\n\n### Part C: Debrief and Submission (5 minutes)\n\n#### Debrief worksheet\nAnswer each prompt in **two or three sentences** in your **Personal Study Notes**:\n1. What did the image model learn from? Use the words **data**, **training**, and **model**.\n2. What caused the model’s mistakes when the data was poor?\n3. What surprised you in the chatbot test?\n4. Which verification step was the most useful, and why?\n5. What would you do differently next time you use a chatbot?\n\n#### What to submit / Completion checklist\n- [ ] Screenshot of the Step 4 test results\n- [ ] Screenshot of the Step 5 test results\n- [ ] Three chatbot screenshots, one for each question\n- [ ] The tables in Part A and Part B, with every row filled in\n- [ ] The debrief worksheet, with all five answers (at least two sentences each)\n\n> **Keep your Part B evidence!** In the final **“AI in My Life”** assessment, you will build on it for the hallucination test, so save your screenshots and notes.\n\n---\n\n### Part E: Troubleshooting Guide\n| Problem | What to try |\n| :--- | :--- |\n| **The webcam does not work** | Check that your browser has permission to use the camera. Or upload photos, or use the ready-made image set |\n| **Training seems stuck** | Keep the tab open and visible. Wait one more minute, then refresh and try again with fewer samples |\n| **The model gets everything wrong** | Check that each class has varied samples, and that the classes look clearly different from each other |\n| **The model is right only for one class** | One class may have far more samples than the others. Try to balance them |\n| **The chatbot refuses to answer** | Rephrase the question in a simple way. Do not ask for anything private or harmful |\n| **The chatbot gives a different answer from a classmate** | This is normal. Record what your chatbot said, and check it |\n| **I cannot find a source** | Treat it as unverified. Write “could not find it” in your table. That is a valid result |",
            "duration_seconds": 1500,
            "position": 2,
            "is_free_preview": false,
            "is_completed": false
          }
        ]
      },
      {
        "id": "sec_aif_06",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 7: Authentic Assessment — “AI in My Life” Audit (2.0h)",
        "position": 7,
        "lessons": [
          {
            "id": "les_aif_06_01",
            "section_id": "sec_aif_06",
            "title": "6.1 Authentic Assessment Workspace: Audit, Hallucination Test & Written Explainer",
            "type": "article",
            "summary": "Complete the 2-hour “AI in My Life” Authentic Assessment: Plan (15m), 5-System Audit (45m), Hallucination Test Write-Up (20m), and One-Page Written Explainer or Infographic (40m) — or Stretch Model Card Critique.",
            "implementation_tip": "Use the interactive Authentic Assessment Workspace below! It validates all 5 systems, your 3 hallucination tests, your 10-term glossary usage, and your 150–200 word reflection.",
            "content": "> **What you will learn:** How to synthesize everything from Modules 1–4 and the Guided Lab into a real-world AI audit and a plain-language written explainer for your named audience person.\n\n### Assessment Time Plan (2.0 Hours Total)\n1. **Plan (15 min)**: Confirm your **named audience person** (chosen in Orientation) and select **5 AI systems** you actually use in daily life.\n2. **Audit (45 min)**: For each of the 5 systems, record what it does, what data it uses, how it likely learned, one concrete benefit, and one specific risk.\n3. **Hallucination Test Write-Up (20 min)**: Build on Part B of your Guided Lab (well-known fact, obscure/tricky question, request for sources), attach screenshot references, explain how you verified each answer, and summarize what you found.\n4. **Explainer (40 min — Written Format)**: Choose **either**:\n   - **One-Page Written Explainer** aimed at your named audience person, explaining what AI is and how it learns, **OR**\n   - **One-Page Infographic** (with text summary/alt text), **OR**\n   - **Stretch Option**: Read a published AI Model Card and write a **one-page critique** of what it says about training data, limits, and intended use.\n\nComplete and validate every part in the **Interactive Assessment Workspace** below.",
            "duration_seconds": 7200,
            "position": 1,
            "is_free_preview": false,
            "is_completed": false
          }
        ]
      },
      {
        "id": "sec_aif_07",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 8: Reflection, Review & Post-Check (0.5h)",
        "position": 8,
        "lessons": [
          {
            "id": "les_aif_07_01",
            "section_id": "sec_aif_07",
            "title": "7.1 Reflection (15m), Rubric Self-Assessment (5m) & Course Survey (5m)",
            "type": "article",
            "summary": "Write your 150–200 word reflection on what surprised you and how you will use AI differently, self-assess against the 4-level rubric, complete the feedback survey, and claim your Certificate & Open Badge.",
            "content": "> **What you will learn:** How to reflect on your growth, evaluate your work against the 4-level rubric, and claim your Certificate of Completion and Open Badge.\n\n### Segment 8 Checklist (25 Minutes)\n1. **Personal Reflection (15 min)**: Write **150–200 words** in the Assessment Workspace on what surprised you most and how you will use AI differently in your life or work.\n2. **Rubric Self-Assessment (5 min)**: Check your submission against the 4 rubric criteria:\n   - *Accuracy of AI concepts* (AI/ML/GenAI distinctions clear)\n   - *Clarity for the audience* (understandable by your named audience person without extra help)\n   - *Critical thinking about risks* (specific risks per system + credible chatbot verification)\n   - *Reflection* (connects learning to personal future AI decisions)\n3. **Feedback Survey & Full Package Submission (5 min)**: Submit your short course feedback and run the Mixed-Model Grading & Credential generator to unlock your **“AI Foundations: Certificate of Completion”** and **“AI Foundations” Open Badge**.\n\nNext, open **Lesson 7.2** to retake the **10-Question Pre-Check as your Post-Check**!",
            "duration_seconds": 1200,
            "position": 1,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_07_02",
            "section_id": "sec_aif_07",
            "title": "7.2 Post-Check: Retake the 11-Question Check to Measure Growth",
            "type": "quiz",
            "summary": "Retake the exact 11 questions from the Orientation Pre-Check and compare your Before and After score and 1–5 confidence ratings to see how much your understanding of AI has grown!",
            "duration_seconds": 600,
            "position": 2,
            "is_free_preview": false,
            "is_completed": false,
            "quiz_questions": [
              {
                "id": "q_aif_post_1",
                "lesson_id": "les_aif_07_02",
                "question": "Which sentence best describes AI?",
                "options": [
                  "A computer system that does tasks that usually need human thinking",
                  "A robot that feels emotions",
                  "Any machine that uses electricity",
                  "A program that only works on the internet",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "AI is software that does tasks that usually need human thinking. Covered in Module 1.",
                "position": 1
              },
              {
                "id": "q_aif_post_2",
                "lesson_id": "les_aif_07_02",
                "question": "Which of these learns patterns from many examples?",
                "options": [
                  "A pocket calculator",
                  "A thermostat with a fixed temperature rule",
                  "An email spam filter",
                  "A timer on a washing machine",
                  "I’m not sure"
                ],
                "correct_option_index": 2,
                "explanation": "A spam filter learns from examples, while the others follow fixed rules. Covered in Module 1.",
                "position": 2
              },
              {
                "id": "q_aif_post_3",
                "lesson_id": "les_aif_07_02",
                "question": "What does generative AI do?",
                "options": [
                  "Only sorts emails",
                  "Creates new content, such as text, images, or sound",
                  "Only stores files",
                  "Only measures speed",
                  "I’m not sure"
                ],
                "correct_option_index": 1,
                "explanation": "Generative AI creates new content. Covered in Modules 1 and 3.",
                "position": 3
              },
              {
                "id": "q_aif_post_4",
                "lesson_id": "les_aif_07_02",
                "question": "Which order shows how a machine learning system works?",
                "options": [
                  "Data, training, model, prediction",
                  "Prediction, model, data, training",
                  "Model, prediction, training, data",
                  "Training, prediction, data, model",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "The system learns from data, trains, saves a model, and then makes predictions. Covered in Module 2.",
                "position": 4
              },
              {
                "id": "q_aif_post_5",
                "lesson_id": "les_aif_07_02",
                "question": "Why can a chatbot give a confident answer that is wrong?",
                "options": [
                  "It writes text that sounds likely, and it does not guarantee the text is true",
                  "It always looks up one correct answer",
                  "It never makes mistakes",
                  "It is switched off at night",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "A chatbot predicts likely words, so it can hallucinate. Covered in Module 3.",
                "position": 5
              },
              {
                "id": "q_aif_post_6",
                "lesson_id": "les_aif_07_02",
                "question": "A chatbot gives you a surprising statistic. What should you do first?",
                "options": [
                  "Share it with friends",
                  "Cross-check it with a trusted source",
                  "Trust it because it sounds exact",
                  "Ask the chatbot to say it again",
                  "I’m not sure"
                ],
                "correct_option_index": 1,
                "explanation": "Check important facts before you rely on them. Covered in Module 3.",
                "position": 6
              },
              {
                "id": "q_aif_post_7",
                "lesson_id": "les_aif_07_02",
                "question": "Unfair results from an AI system often come from…",
                "options": [
                  "Data that is incomplete or unbalanced",
                  "Computers that are too fast",
                  "Screens that are too small",
                  "Too many people online",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "A model learns from data, so poor data can lead to bias. Covered in Modules 2 and 4.",
                "position": 7
              },
              {
                "id": "q_aif_post_8",
                "lesson_id": "les_aif_07_02",
                "question": "Which information is safest to type into a public chatbot?",
                "options": [
                  "A general question, such as how photosynthesis works",
                  "Your password",
                  "Your bank details",
                  "A private document with other people’s names",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "Never share private information with a chatbot. Covered in Modules 3 and 4.",
                "position": 8
              },
              {
                "id": "q_aif_post_9",
                "lesson_id": "les_aif_07_02",
                "question": "What is a deepfake?",
                "options": [
                  "A type of password",
                  "A very fast computer",
                  "A very realistic fake picture, voice, or video made with AI",
                  "A deep learning textbook",
                  "I’m not sure"
                ],
                "correct_option_index": 2,
                "explanation": "Deepfakes can look and sound real, so check shocking content. Covered in Module 4.",
                "position": 9
              },
              {
                "id": "q_aif_post_10",
                "lesson_id": "les_aif_07_02",
                "question": "What does “human in the loop” mean?",
                "options": [
                  "A person reviews and controls important decisions made with AI",
                  "A robot lives in a house",
                  "Only people can use AI",
                  "AI works without any help",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "Important decisions, such as hiring or health, need a person in charge. Covered in Module 4.",
                "position": 10
              },
              {
                "id": "q_aif_post_11",
                "lesson_id": "les_aif_07_02",
                "question": "Which statement about AI is true?",
                "options": [
                  "AI can make mistakes, so important information should be checked",
                  "AI is always right",
                  "AI feels emotions like a person",
                  "AI needs no people to build or check it",
                  "I’m not sure"
                ],
                "correct_option_index": 0,
                "explanation": "AI is powerful but not perfect, and people stay important. Covered in Modules 1 and 3.",
                "position": 11
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'crs_intro_to_llms_03',
    instructor_id: 'usr_instructor_001',
    title: 'Intro to Large Language Models - LLM',
    slug: 'intro-to-large-language-models-llm',
    previous_slugs: ['deep-learning-transformers'],
    description: 'Dive inside Large Language Models (LLMs). Understand tokenization, vector embeddings, the Transformer self-attention architecture, pre-training vs. fine-tuning, sampling parameters, and Retrieval-Augmented Generation (RAG).',
    category: 'Large Language Models',
    track: 'Large Language Models',
    level: 'Intermediate',
    outcome_hook: 'Understand how Transformer LLMs work under the hood and build grounded AI applications with embeddings and RAG.',
    duration_weeks: 12,
    weekly_hours: '12-18 hrs/week',
    skills: [
      'Large Language Models (LLMs)',
      'Transformers & Attention',
      'Tokenization & Embeddings',
      'RAG Architectures',
      'Fine-Tuning vs. Prompting',
      'LLM Inference & Sampling',
    ],
    sponsorship_note: 'Sponsored / $5/mo',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'April 2026',
    price: 49.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-10T14:00:00Z',
    enrollments_count: 3490,
    average_rating: 4.94,
    reviews_count: 520,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_llm_01',
        course_id: 'crs_intro_to_llms_03',
        title: 'Module 1: Tokenization, Embeddings & Transformer Architecture',
        position: 1,
        lessons: [
          {
            id: 'les_llm_01_01',
            section_id: 'sec_llm_01',
            title: '1.1 From Text to Tokens to High-Dimensional Vector Embeddings',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            content: 'Explore Byte-Pair Encoding (BPE) tokenizers, token IDs, and how semantic meaning is encoded in high-dimensional embedding spaces.',
            duration_seconds: 560,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_llm_01_02',
            section_id: 'sec_llm_01',
            title: '1.2 Self-Attention & Next-Token Prediction Explained Simply',
            type: 'article',
            content: `### Inside the Transformer: How LLMs Understand Context

At its core, a Large Language Model is a next-token prediction engine powered by the **Transformer** architecture.

#### 1. Tokenization
Before an LLM reads text, a tokenizer splits words into sub-word units called **tokens** (roughly 0.75 words per token in English).

#### 2. Semantic Embeddings
Each token is mapped to a dense numerical vector (an **embedding**). Words with similar meanings or context live close together in this vector space.

#### 3. The Self-Attention Mechanism
Self-attention allows every token in a sentence to dynamically weigh its relationship to every other token—resolving ambiguous pronouns, long-range dependencies, and complex syntax in parallel.

#### 4. Sampling Parameters (\`temperature\` & \`top_p\`)
- **\`temperature = 0\`**: Deterministic, greedy decoding—ideal for code, data extraction, and classification.
- **Higher \`temperature\` (0.7–1.0)**: Increases diversity and creativity for brainstorming and storytelling.`,
            duration_seconds: 460,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_llm_01_03',
            section_id: 'sec_llm_01',
            title: '1.3 Checkpoint Quiz: Transformer & LLM Mechanics',
            type: 'quiz',
            duration_seconds: 300,
            position: 3,
            is_free_preview: false,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_llm_01',
                lesson_id: 'les_llm_01_03',
                question: 'What is the role of the Self-Attention mechanism in a Transformer-based Large Language Model?',
                options: [
                  'It enables each token to weigh and attend to relevant context tokens across the entire input sequence',
                  'It compresses audio files into MP3 format',
                  'It deletes stop-words before tokenization',
                  'It replaces GPU memory with hard disk swap space',
                ],
                correct_option_index: 0,
                explanation: 'Self-attention computes relevance scores between all pairs of tokens in the context window so the model understands context-dependent meaning.',
                position: 1,
              },
              {
                id: 'q_llm_02',
                lesson_id: 'les_llm_01_03',
                question: 'When calling an LLM API for deterministic JSON data extraction, which temperature setting is recommended?',
                options: [
                  'temperature = 0 (or near 0)',
                  'temperature = 2.0',
                  'temperature = 1.5',
                  'temperature has no effect on token sampling',
                ],
                correct_option_index: 0,
                explanation: 'Setting temperature to 0 selects the highest-probability token at each step, maximizing consistency and schema adherence.',
                position: 2,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_llm_02',
        course_id: 'crs_intro_to_llms_03',
        title: 'Module 2: Retrieval-Augmented Generation (RAG), Fine-Tuning & Deployment',
        position: 2,
        lessons: [
          {
            id: 'les_llm_02_01',
            section_id: 'sec_llm_02',
            title: '2.1 Grounding LLMs with Retrieval-Augmented Generation (RAG) & Vector Search',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            content: 'How to connect LLMs to external knowledge bases using document chunking, vector embeddings, similarity search, and grounded citations.',
            duration_seconds: 590,
            position: 1,
            is_free_preview: false,
            is_completed: false,
          },
          {
            id: 'les_llm_02_02',
            section_id: 'sec_llm_02',
            title: '2.2 Prompt Engineering vs. RAG vs. Fine-Tuning: Choosing the Right Architecture',
            type: 'article',
            content: `### Decision Matrix: Prompting vs. RAG vs. Fine-Tuning

| Approach | Best Used When... | Key Advantage |
| :--- | :--- | :--- |
| **Prompt Engineering** | You need fast iteration on task formatting, reasoning, or tone | Zero training cost; immediate deployment |
| **RAG (Retrieval-Augmented Generation)** | The model needs access to up-to-date, private, or citeable documents | Eliminates knowledge cutoff limits & reduces hallucinations |
| **Fine-Tuning (SFT / LoRA)** | You need to teach a specialized style, domain vernacular, or compact model behavior | Lower inference latency with shorter prompts |`,
            duration_seconds: 420,
            position: 2,
            is_free_preview: false,
            is_completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 'crs_genai_prompt_eng_04',
    instructor_id: 'usr_instructor_001',
    title: 'Generative AI and Prompt Engineering',
    slug: 'generative-ai-and-prompt-engineering',
    description: 'Master multimodal Generative AI across text, code, image, and audio models. Learn advanced prompt engineering frameworks, meta-prompting, structured JSON outputs, system persona design, and multi-turn conversational chaining.',
    category: 'Prompt Engineering & RLHF',
    track: 'Prompt Engineering & RLHF',
    level: 'Beginner',
    outcome_hook: 'Design production-grade prompt templates and multimodal Generative AI workflows that deliver consistent, verifiable outputs.',
    duration_weeks: 8,
    weekly_hours: '10-14 hrs/week',
    skills: [
      'Generative AI',
      'Advanced Prompt Engineering',
      'Multimodal Prompting',
      'Structured JSON Outputs',
      'Meta-Prompting',
      'Tree-of-Thoughts',
    ],
    sponsorship_note: 'Sponsored / $0 Upfront',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'Rolling Admissions',
    price: 39.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-12T09:00:00Z',
    enrollments_count: 5120,
    average_rating: 4.97,
    reviews_count: 710,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_gpe_01',
        course_id: 'crs_genai_prompt_eng_04',
        title: 'Module 1: Generative AI Ecosystem & Multimodal Foundations',
        position: 1,
        lessons: [
          {
            id: 'les_gpe_01_01',
            section_id: 'sec_gpe_01',
            title: '1.1 How Generative AI Creates Text, Code, Images & Audio',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            content: 'Explore diffusion models, autoregressive language models, and multimodal architectures that unify text, vision, and speech.',
            duration_seconds: 520,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_gpe_01_02',
            section_id: 'sec_gpe_01',
            title: '1.2 Advanced Prompting Frameworks: Role-Task-Format, ReAct & Tree-of-Thoughts',
            type: 'article',
            content: `### Advanced Prompt Engineering Frameworks

Moving from casual chat prompts to deterministic production prompts requires repeatable architectural patterns.

#### 1. The R-T-C-F Framework (Role, Task, Context, Format)
- **Role**: Establish domain authority and behavioral constraints.
- **Task**: Define the exact action verb and objective.
- **Context**: Supply reference documents, user constraints, and edge-case rules.
- **Format**: Enforce strict output schemas (JSON, Markdown tables, or XML tags).

#### 2. Meta-Prompting & Self-Critique
Ask the model to critique and refine its own draft against a rubric before emitting the final response—dramatically boosting accuracy on analytical and creative tasks.`,
            duration_seconds: 450,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_gpe_01_03',
            section_id: 'sec_gpe_01',
            title: '1.3 Checkpoint Quiz: Generative AI & Prompt Architecture',
            type: 'quiz',
            duration_seconds: 240,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_gpe_01',
                lesson_id: 'les_gpe_01_03',
                question: 'What is Meta-Prompting in prompt engineering?',
                options: [
                  'Using an AI model to generate, critique, or optimize prompts and intermediate drafts based on a quality rubric',
                  'Running prompts without an internet connection',
                  'Compressing images into JPEG format',
                  'Deleting system instructions to save tokens',
                ],
                correct_option_index: 0,
                explanation: 'Meta-prompting leverages the LLM itself to architect, audit, and refine prompt instructions for higher precision.',
                position: 1,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_gpe_02',
        course_id: 'crs_genai_prompt_eng_04',
        title: 'Module 2: Prompt Chaining, Guardrails & Evaluation',
        position: 2,
        lessons: [
          {
            id: 'les_gpe_02_01',
            section_id: 'sec_gpe_02',
            title: '2.1 Multi-Step Prompt Chaining & Deterministic Schema Enforcement',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            content: 'Break complex monolithic prompts into reliable multi-step chains with validation gates between steps.',
            duration_seconds: 580,
            position: 1,
            is_free_preview: false,
            is_completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 'crs_ml_essentials_05',
    instructor_id: 'usr_instructor_001',
    title: 'Machine Learning Essentials',
    slug: 'machine-learning-essentials',
    description: 'Build a strong practical foundation in classical and modern Machine Learning. Master feature engineering, regression, classification, clustering, decision trees, model evaluation metrics, and overfitting prevention.',
    category: 'AI Foundations',
    track: 'AI Foundations',
    level: 'Beginner',
    outcome_hook: 'Train, evaluate, and validate predictive Machine Learning models on real-world tabular and structured datasets.',
    duration_weeks: 10,
    weekly_hours: '10-15 hrs/week',
    skills: [
      'Supervised Learning',
      'Unsupervised Clustering',
      'Feature Engineering',
      'Model Evaluation Metrics',
      'Decision Trees & Ensembles',
      'Data Preprocessing',
    ],
    sponsorship_note: 'Sponsored / $5/mo',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'Rolling Admissions',
    price: 44.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-14T10:00:00Z',
    enrollments_count: 3890,
    average_rating: 4.93,
    reviews_count: 480,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_mle_01',
        course_id: 'crs_ml_essentials_05',
        title: 'Module 1: Supervised & Unsupervised Learning Foundations',
        position: 1,
        lessons: [
          {
            id: 'les_mle_01_01',
            section_id: 'sec_mle_01',
            title: '1.1 The End-to-End Machine Learning Lifecycle: Data Prep to Inference',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Understand problem framing, exploratory data analysis, train/validation/test splits, and feature scaling.',
            duration_seconds: 540,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_mle_01_02',
            section_id: 'sec_mle_01',
            title: '1.2 Regression, Classification & Model Evaluation (Precision, Recall, F1, ROC-AUC)',
            type: 'article',
            content: `### Evaluating Machine Learning Models Accurately

Accuracy alone can be misleading—especially on imbalanced datasets (such as fraud detection where 99% of transactions are legitimate).

#### Core Evaluation Metrics:
- **Precision**: Out of all positive predictions, how many were truly positive?
- **Recall (Sensitivity)**: Out of all actual positive cases, how many did the model successfully catch?
- **F1-Score**: The harmonic mean of Precision and Recall.
- **RMSE & MAE**: Standard error metrics for continuous regression predictions.

#### Preventing Overfitting:
Always evaluate your model on a held-out **Test Set** and use **K-Fold Cross-Validation** to ensure the model generalizes to unseen real-world data.`,
            duration_seconds: 440,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_mle_01_03',
            section_id: 'sec_mle_01',
            title: '1.3 Checkpoint Quiz: Machine Learning Essentials',
            type: 'quiz',
            duration_seconds: 240,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_mle_01',
                lesson_id: 'les_mle_01_03',
                question: 'What happens when a Machine Learning model overfits the training data?',
                options: [
                  'It memorizes noise in the training set and performs poorly on unseen test data',
                  'It trains faster and achieves 100% accuracy on all future data',
                  'It automatically deletes duplicate columns',
                  'It converts classification problems into clustering problems',
                ],
                correct_option_index: 0,
                explanation: 'Overfitting occurs when a model captures random noise in the training set rather than generalizable underlying patterns.',
                position: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'crs_ai_ethics_safety_06',
    instructor_id: 'usr_instructor_001',
    title: 'AI Ethics, Safety, and Responsible Use',
    slug: 'ai-ethics-safety-and-responsible-use',
    description: 'Navigate the critical landscape of AI Safety, Alignment, Fairness, Privacy, and Governance. Learn how to audit AI systems for bias, prevent prompt injection and jailbreaks, protect data privacy, and comply with global AI regulations.',
    category: 'AI Foundations',
    track: 'AI Foundations',
    level: 'Beginner',
    outcome_hook: 'Audit AI systems for fairness, safety, red-team vulnerabilities, and regulatory compliance across enterprise teams.',
    duration_weeks: 6,
    weekly_hours: '6-10 hrs/week',
    skills: [
      'AI Safety & Alignment',
      'Red-Teaming & Jailbreak Defense',
      'Algorithmic Fairness & Bias Auditing',
      'AI Governance & Compliance',
      'Data Privacy & PII Protection',
      'Responsible AI Frameworks',
    ],
    sponsorship_note: 'Fully Funded / Free Access',
    is_now_open: true,
    is_popular: false,
    cohort_date: 'Rolling Admissions',
    price: 0.00,
    thumbnail_url: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-15T11:00:00Z',
    enrollments_count: 3150,
    average_rating: 4.95,
    reviews_count: 410,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_aes_01',
        course_id: 'crs_ai_ethics_safety_06',
        title: 'Module 1: AI Safety, Bias Mitigation & Adversarial Red-Teaming',
        position: 1,
        lessons: [
          {
            id: 'les_aes_01_01',
            section_id: 'sec_aes_01',
            title: '1.1 Principles of Responsible AI: Fairness, Transparency, Accountability & Privacy',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            content: 'How organizations implement practical AI governance, human-in-the-loop oversight, and transparency cards.',
            duration_seconds: 490,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_aes_01_02',
            section_id: 'sec_aes_01',
            title: '1.2 Defending Against Prompt Injection, Jailbreaks & Data Leakage',
            type: 'article',
            content: `### Securing AI Systems Against Adversarial Prompts

As AI models are deployed into customer-facing products, safety engineers must defend against adversarial manipulation:

1. **Direct & Indirect Prompt Injection**: Untrusted external text attempting to override system instructions.
2. **PII & Training Data Extraction**: Ensuring models never regurgitate confidential user records or API keys.
3. **Balanced Refusal Calibration**: Training models to refuse genuinely harmful requests while remaining helpful on benign sensitive queries.`,
            duration_seconds: 410,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_aes_01_03',
            section_id: 'sec_aes_01',
            title: '1.3 Checkpoint Quiz: AI Safety & Governance',
            type: 'quiz',
            duration_seconds: 240,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_aes_01',
                lesson_id: 'les_aes_01_03',
                question: 'What is an Indirect Prompt Injection attack?',
                options: [
                  'Malicious instructions hidden inside external documents or web pages that an AI assistant retrieves and processes',
                  'Upgrading an LLM to a newer version',
                  'Using a lower temperature setting during API calls',
                  'Running an AI model on local hardware',
                ],
                correct_option_index: 0,
                explanation: 'Indirect prompt injection embeds untrusted instructions inside retrieved data sources to hijack the model’s behavior.',
                position: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'crs_ai_productivity_automation_07',
    instructor_id: 'usr_instructor_001',
    title: 'AI for Productivity and Workflow Automation',
    slug: 'ai-for-productivity-and-workflow-automation',
    description: 'Supercharge personal and team productivity using AI agents and no-code/low-code automation pipelines. Connect LLMs to spreadsheets, email, CRM, research synthesis, and multi-step automated business workflows.',
    category: 'Applied AI & Automation',
    track: 'Applied AI & Automation',
    level: 'Beginner',
    outcome_hook: 'Automate repetitive business operations, research synthesis, reporting, and multi-app workflows using AI.',
    duration_weeks: 6,
    weekly_hours: '8-12 hrs/week',
    skills: [
      'AI Workflow Automation',
      'AI Copilot Systems',
      'Automated Document Synthesis',
      'No-Code AI Pipelines',
      'AI Data Extraction',
      'Business Process Automation',
    ],
    sponsorship_note: 'Sponsored / $0 Upfront',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'Rolling Admissions',
    price: 34.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-16T12:00:00Z',
    enrollments_count: 5480,
    average_rating: 4.96,
    reviews_count: 690,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_apa_01',
        course_id: 'crs_ai_productivity_automation_07',
        title: 'Module 1: Designing End-to-End AI Automation Pipelines',
        position: 1,
        lessons: [
          {
            id: 'les_apa_01_01',
            section_id: 'sec_apa_01',
            title: '1.1 Mapping High-ROI Tasks for AI Augmentation vs. Full Automation',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            content: 'How to audit daily workflows and connect AI reasoning steps with webhooks, spreadsheets, and notification triggers.',
            duration_seconds: 510,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_apa_01_02',
            section_id: 'sec_apa_01',
            title: '1.2 Automating Document Triage, Meeting Intelligence & Structured Reporting',
            type: 'article',
            content: `### Architecting Reliable AI Workflow Automations

An effective AI automation pipeline follows a clear **Trigger → Context Enrichment → AI Reasoning → Schema Validation → Action** loop:

1. **Trigger**: Incoming customer inquiry, uploaded PDF invoice, or scheduled daily report.
2. **AI Processing Step**: Extract structured fields (e.g., priority, sentiment, action items) into strict JSON.
3. **Human-in-the-Loop Approval**: Route high-stakes actions for 1-click human review before final dispatch.`,
            duration_seconds: 390,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_apa_01_03',
            section_id: 'sec_apa_01',
            title: '1.3 Checkpoint Quiz: AI Workflow Automation',
            type: 'quiz',
            duration_seconds: 240,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_apa_01',
                lesson_id: 'les_apa_01_03',
                question: 'Why is enforcing a structured JSON output schema essential in automated multi-app AI workflows?',
                options: [
                  'Downstream apps (databases, CRMs, webhooks) require predictable field names and data types to process the AI output reliably',
                  'JSON files do not use any storage space',
                  'It prevents the user from reading the output',
                  'It bypasses API authentication',
                ],
                correct_option_index: 0,
                explanation: 'Downstream automation steps rely on deterministic keys and types so they can map AI outputs directly into database columns or API payloads.',
                position: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'crs_building_ai_apps_08',
    instructor_id: 'usr_instructor_001',
    title: 'Building AI-Powered Applications',
    slug: 'building-ai-powered-applications',
    description: 'Transition from AI user to AI application builder. Integrate LLM APIs, streaming responses, tool/function calling, vector databases, semantic search, and agentic memory into full-stack applications.',
    category: 'Applied AI & Automation',
    track: 'Applied AI & Automation',
    level: 'Intermediate',
    outcome_hook: 'Architect and ship full-stack AI applications with LLM APIs, function calling, RAG vector search, and streaming UIs.',
    duration_weeks: 10,
    weekly_hours: '12-16 hrs/week',
    skills: [
      'LLM API Integration',
      'Tool & Function Calling',
      'RAG & Vector Databases',
      'Streaming AI Interfaces',
      'AI Agents & Memory',
      'Evaluation & Observability',
    ],
    sponsorship_note: 'Sponsored / $5/mo',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'April 2026',
    price: 49.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-18T14:00:00Z',
    enrollments_count: 4210,
    average_rating: 4.96,
    reviews_count: 560,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_baa_01',
        course_id: 'crs_building_ai_apps_08',
        title: 'Module 1: LLM APIs, Streaming, Function Calling & Agentic Tool Use',
        position: 1,
        lessons: [
          {
            id: 'les_baa_01_01',
            section_id: 'sec_baa_01',
            title: '1.1 Integrating Frontier LLM APIs with Streaming & Structured Outputs',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            content: 'Build responsive AI interfaces using Server-Sent Events (SSE) token streaming, system instructions, and token budget management.',
            duration_seconds: 600,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_baa_01_02',
            section_id: 'sec_baa_01',
            title: '1.2 Tool Calling (Function Calling) & Grounded RAG Pipelines',
            type: 'article',
            content: `### Giving AI Applications Real-World Capabilities with Tool Calling

By defining typed **Tools (Functions)**, an LLM can decide when to query a live database, call an external weather or payment API, or search a vector index before answering the user.

\`\`\`json
{
  "name": "lookup_order_status",
  "description": "Retrieve live shipping status for a customer order ID",
  "parameters": {
    "type": "object",
    "properties": {
      "order_id": { "type": "string", "description": "Unique order identifier e.g. ORD-9021" }
    },
    "required": ["order_id"]
  }
}
\`\`\`

#### Production Best Practices:
- Validate all tool arguments against your schema before executing backend queries.
- Log latency, token usage, and user feedback thumbs-up/down for continuous evaluation.`,
            duration_seconds: 470,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_baa_01_03',
            section_id: 'sec_baa_01',
            title: '1.3 Checkpoint Quiz: AI Application Architecture',
            type: 'quiz',
            duration_seconds: 240,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_baa_01',
                lesson_id: 'les_baa_01_03',
                question: 'How does Tool/Function Calling work in an LLM-powered application?',
                options: [
                  'The LLM outputs a structured JSON tool call request with arguments, which the application executes and returns to the model',
                  'The LLM directly rewrites the operating system kernel',
                  'The browser disables all API routes',
                  'The model skips tokenization',
                ],
                correct_option_index: 0,
                explanation: 'The model emits a structured tool name and arguments; your application code safely executes the function and passes the result back to the model.',
                position: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'crs_deep_learning_advanced_09',
    instructor_id: 'usr_instructor_001',
    title: 'Deep Learning and Advanced Techniques',
    slug: 'deep-learning-and-advanced-techniques',
    description: 'Master neural networks, backpropagation, Convolutional & Transformer architectures, parameter-efficient fine-tuning (LoRA / QLoRA), quantization, preference optimization (RLHF / DPO), and distributed GPU inference.',
    category: 'Large Language Models',
    track: 'Large Language Models',
    level: 'Advanced',
    outcome_hook: 'Fine-tune, quantize, and optimize deep neural networks and open-weight LLMs using LoRA, QLoRA, and DPO.',
    duration_weeks: 12,
    weekly_hours: '14-18 hrs/week',
    skills: [
      'Deep Neural Networks',
      'Backpropagation & Optimizers',
      'LoRA & QLoRA Fine-Tuning',
      'DPO & RLHF Alignment',
      'Model Quantization',
      'Multi-Modal Transformers',
    ],
    sponsorship_note: 'Sponsored / $5/mo',
    is_now_open: true,
    is_popular: false,
    cohort_date: 'May 2026',
    price: 59.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-20T09:00:00Z',
    enrollments_count: 2740,
    average_rating: 4.95,
    reviews_count: 350,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_dla_01',
        course_id: 'crs_deep_learning_advanced_09',
        title: 'Module 1: Neural Networks, Gradients & Parameter-Efficient Fine-Tuning (PEFT)',
        position: 1,
        lessons: [
          {
            id: 'les_dla_01_01',
            section_id: 'sec_dla_01',
            title: '1.1 Deep Neural Networks, Loss Landscapes, Backpropagation & AdamW',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            content: 'Understand forward passes, automatic differentiation, vanishing gradients, layer normalization, and modern optimizers.',
            duration_seconds: 620,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_dla_01_02',
            section_id: 'sec_dla_01',
            title: '1.2 Fine-Tuning LLMs with LoRA, QLoRA & Direct Preference Optimization (DPO)',
            type: 'article',
            content: `### Parameter-Efficient Fine-Tuning (PEFT) & Alignment

Updating all billions of parameters in a modern foundation model is prohibitively expensive. **LoRA (Low-Rank Adaptation)** freezes the base model weights and injects tiny trainable rank-decomposition matrices into the attention layers.

#### Key Techniques Covered:
- **LoRA & QLoRA**: Fine-tune 7B–70B models on a single GPU by combining 4-bit NormalFloat quantization (\`NF4\`) with low-rank adapters.
- **Direct Preference Optimization (DPO)**: Align models directly on human preference pairs (\`chosen\` vs. \`rejected\` responses) without training a separate reward model.`,
            duration_seconds: 490,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_dla_01_03',
            section_id: 'sec_dla_01',
            title: '1.3 Checkpoint Quiz: Deep Learning & PEFT',
            type: 'quiz',
            duration_seconds: 240,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_dla_01',
                lesson_id: 'les_dla_01_03',
                question: 'How does LoRA (Low-Rank Adaptation) dramatically reduce GPU memory requirements during fine-tuning?',
                options: [
                  'It freezes the pretrained model weights and trains small low-rank adapter matrices',
                  'It deletes 90% of the vocabulary tokens',
                  'It converts all text to ASCII',
                  'It replaces neural networks with decision trees',
                ],
                correct_option_index: 0,
                explanation: 'By freezing the base weights and only computing gradients for compact low-rank adapter matrices, LoRA cuts trainable parameters by over 99%.',
                position: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'crs_ai_capstone_10',
    instructor_id: 'usr_instructor_001',
    title: 'AI Capstone: Solve a Real Problem',
    slug: 'ai-capstone-solve-a-real-problem',
    description: 'Put your AI skills to the test by scoping, architecting, evaluating, and deploying an end-to-end AI solution for a real-world industry problem. Build a verified portfolio project complete with golden evaluation datasets, safety guardrails, and live deployment.',
    category: 'Applied AI & Automation',
    track: 'Applied AI & Automation',
    level: 'Advanced',
    outcome_hook: 'Scope, build, benchmark, and ship a portfolio-ready AI solution solving a high-impact real-world problem.',
    duration_weeks: 8,
    weekly_hours: '12-16 hrs/week',
    skills: [
      'End-to-End AI Architecture',
      'Problem Scoping & ROI',
      'Golden Dataset Benchmarking',
      'Safety & Hallucination Guardrails',
      'Production AI Deployment',
      'Technical Portfolio Defense',
    ],
    sponsorship_note: 'Sponsored / $0 Upfront',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'Rolling Admissions',
    price: 49.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-22T10:00:00Z',
    enrollments_count: 2380,
    average_rating: 4.98,
    reviews_count: 310,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_cap_01',
        course_id: 'crs_ai_capstone_10',
        title: 'Module 1: Problem Discovery, Architecture Design & Evaluation Benchmarking',
        position: 1,
        lessons: [
          {
            id: 'les_cap_01_01',
            section_id: 'sec_cap_01',
            title: '1.1 Scoping a High-Impact AI Capstone Project & Defining Success Metrics',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            content: 'How to select a real-world domain problem, curate a 50-example golden evaluation benchmark, and design your AI system architecture.',
            duration_seconds: 540,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_cap_01_02',
            section_id: 'sec_cap_01',
            title: '1.2 Capstone Rubric: Accuracy, Latency, Safety Guardrails & Live Demo Defense',
            type: 'article',
            content: `### Capstone Deliverable Blueprint

Every scholar completes the programme by shipping an audited, production-grade AI solution:

1. **Problem Statement & Dataset Specification**: Clear definition of the user pain point and source data.
2. **System Architecture**: Prompt chains, RAG pipeline, or fine-tuned model workflow.
3. **Evaluation Suite**: Quantitative pass/fail scores on a curated Golden Dataset (measuring factuality, schema compliance, and safety).
4. **Live Application & Technical Walkthrough**: Deployed application with documented source repository.`,
            duration_seconds: 430,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_cap_01_03',
            section_id: 'sec_cap_01',
            title: '1.3 Checkpoint Quiz: AI Capstone Readiness',
            type: 'quiz',
            duration_seconds: 240,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_cap_01',
                lesson_id: 'les_cap_01_03',
                question: 'Why should you create a Golden Evaluation Dataset before iterating on complex prompt or RAG architectures?',
                options: [
                  'It provides an objective baseline to measure whether architectural changes actually improve accuracy and reduce hallucinations',
                  'It replaces the user interface',
                  'It eliminates the need for an internet connection',
                  'It automatically writes CSS styles',
                ],
                correct_option_index: 0,
                explanation: 'Without a fixed evaluation benchmark, you cannot objectively verify whether a prompt or retrieval change improved or degraded system quality.',
                position: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'crs_website_dev_ai_11',
    instructor_id: 'usr_instructor_001',
    title: 'Website Development with AI',
    slug: 'website-development-with-ai',
    description: 'Build, style, debug, and deploy modern responsive websites and full-stack web applications using AI coding assistants, generative UI workflows, and modern web standards—from idea to live production deployment in record time.',
    category: 'Applied AI & Automation',
    track: 'Applied AI & Automation',
    level: 'Beginner',
    outcome_hook: 'Build and deploy modern, responsive websites and web apps 5x faster using AI-assisted web development.',
    duration_weeks: 8,
    weekly_hours: '10-14 hrs/week',
    skills: [
      'AI-Assisted Web Development',
      'HTML, CSS & Modern JavaScript',
      'React & Next.js with AI Copilots',
      'Generative UI Prototyping',
      'AI Debugging & Refactoring',
      'Cloud Deployment & SEO',
    ],
    sponsorship_note: 'Sponsored / $0 Upfront',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'Rolling Admissions',
    price: 39.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-24T11:00:00Z',
    enrollments_count: 6150,
    average_rating: 4.97,
    reviews_count: 820,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_wda_01',
        course_id: 'crs_website_dev_ai_11',
        title: 'Module 1: AI-First Web Design, Frontend Engineering & Responsive UI',
        position: 1,
        lessons: [
          {
            id: 'les_wda_01_01',
            section_id: 'sec_wda_01',
            title: '1.1 From Wireframe Prompt to Live Responsive Website with AI Coding Copilots',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Learn how to prompt AI coding assistants to scaffold semantic HTML5, modern CSS Grid/Flexbox layouts, interactive React components, and accessible design systems.',
            duration_seconds: 550,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_wda_01_02',
            section_id: 'sec_wda_01',
            title: '1.2 Prompting for Clean Component Architecture, Debugging & Live Cloud Deployment',
            type: 'article',
            content: `### Building Production Websites with AI Pair Programming

AI coding assistants allow creators and developers to go from concept to deployed web application faster than ever—when guided by clear architectural prompts.

#### The AI Web Development Workflow:
1. **Specification & Design Tokens**: Define your color palette, typography, layout structure, and target user flow before generating code.
2. **Iterative Component Generation**: Build modular, reusable UI sections (Hero, Features, Pricing, Contact Forms) and review the generated code for accessibility and mobile responsiveness.
3. **AI-Assisted Debugging & Verification**: Paste console errors or layout edge cases directly into your AI assistant with context to resolve bugs systematically.
4. **Continuous Deployment**: Connect your GitHub repository to cloud hosting (Vercel / Render) for automatic live URLs on every push.`,
            duration_seconds: 440,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_wda_01_03',
            section_id: 'sec_wda_01',
            title: '1.3 Checkpoint Quiz: Website Development with AI',
            type: 'quiz',
            duration_seconds: 240,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_wda_01',
                lesson_id: 'les_wda_01_03',
                question: 'What is the most effective way to prompt an AI coding assistant when building a complex website?',
                options: [
                  'Break the website into modular components with clear layout, styling, and responsiveness specifications, verifying each step',
                  'Ask for a 10,000-line website in a single vague 3-word prompt without testing',
                  'Avoid using CSS or semantic HTML tags',
                  'Never test the site on mobile screens',
                ],
                correct_option_index: 0,
                explanation: 'Decomposing web applications into well-specified, modular components produces clean, maintainable, and bug-free code.',
                position: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'crs_web_design_ai_12',
    instructor_id: 'usr_instructor_001',
    title: 'Web Design with AI',
    slug: 'web-design-with-ai',
    description: 'Master AI-powered UI/UX design, generative wireframing, visual brand systems, typography, color theory, and interactive prototyping. Transform text prompts into high-converting, accessible web designs and export production-ready styles.',
    category: 'Applied AI & Automation',
    track: 'Applied AI & Automation',
    level: 'Beginner',
    outcome_hook: 'Design stunning, conversion-focused web interfaces, design systems, and brand assets using AI design tools.',
    duration_weeks: 6,
    weekly_hours: '8-12 hrs/week',
    skills: [
      'AI UI/UX Design',
      'Generative Wireframing',
      'Design Systems & Tokens',
      'AI Visual Asset Generation',
      'Responsive Layout Architecture',
      'Accessibility & Visual Hierarchy',
    ],
    sponsorship_note: 'Sponsored / $0 Upfront',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'Rolling Admissions',
    price: 34.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-25T10:00:00Z',
    enrollments_count: 4720,
    average_rating: 4.96,
    reviews_count: 590,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_wdai_01',
        course_id: 'crs_web_design_ai_12',
        title: 'Module 1: Generative UI/UX Wireframing, Visual Hierarchy & Design Systems',
        position: 1,
        lessons: [
          {
            id: 'les_wdai_01_01',
            section_id: 'sec_wdai_01',
            title: '1.1 Prompting for High-Converting Layouts, Color Palettes & Typography Systems',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            content: 'How to direct AI design generators to produce cohesive design tokens, glassmorphic and minimalist UI cards, and accessible contrast ratios.',
            duration_seconds: 510,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_wdai_01_02',
            section_id: 'sec_wdai_01',
            title: '1.2 From AI Mockup to Interactive Component Specs & Responsive Breakpoints',
            type: 'article',
            content: `### Principles of AI-Driven Web Design

Great web design blends aesthetic clarity with effortless usability. AI accelerates ideation while you control the creative direction.

#### Core Design Pillars:
1. **Visual Hierarchy & Whitespace**: Guide the visitor's eye from the primary headline and value proposition to the call-to-action (CTA).
2. **Design Tokens**: Standardize spacing (\`4px / 8px\` grid), border radii, elevation shadows, and semantic color variables.
3. **Mobile-First Responsiveness**: Ensure every AI-generated section adapts gracefully across desktop, tablet, and mobile viewports.`,
            duration_seconds: 410,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_wdai_01_03',
            section_id: 'sec_wdai_01',
            title: '1.3 Checkpoint Quiz: Web Design with AI',
            type: 'quiz',
            duration_seconds: 240,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_wdai_01',
                lesson_id: 'les_wdai_01_03',
                question: 'Why are Design Tokens important when generating web UI components with AI?',
                options: [
                  'They enforce consistent typography, colors, spacing, and radii across every page and component',
                  'They replace the domain name registrar',
                  'They disable mobile responsiveness',
                  'They encrypt browser cookies',
                ],
                correct_option_index: 0,
                explanation: 'Design tokens ensure visual consistency so AI-generated sections look like part of a unified product rather than disconnected templates.',
                position: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'crs_integrating_ai_website_13',
    instructor_id: 'usr_instructor_001',
    title: 'Integrating AI into Your Website',
    slug: 'integrating-ai-into-your-website',
    description: 'Embed intelligent AI capabilities directly into new or existing websites. Add custom AI chat assistants, semantic site search, smart form autofill, personalized content recommendations, voice/vision widgets, and secure serverless API routes.',
    category: 'Applied AI & Automation',
    track: 'Applied AI & Automation',
    level: 'Intermediate',
    outcome_hook: 'Embed custom AI chatbots, semantic search, and intelligent assistants into any live website securely.',
    duration_weeks: 8,
    weekly_hours: '10-14 hrs/week',
    skills: [
      'Embedded AI Chatbots',
      'Website RAG & Semantic Search',
      'Serverless AI API Routes',
      'Streaming UI Widgets',
      'Rate Limiting & API Security',
      'Smart Forms & Personalization',
    ],
    sponsorship_note: 'Sponsored / $5/mo',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'Rolling Admissions',
    price: 44.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-26T12:00:00Z',
    enrollments_count: 4390,
    average_rating: 4.97,
    reviews_count: 540,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_iaw_01',
        course_id: 'crs_integrating_ai_website_13',
        title: 'Module 1: Embedding AI Assistants, Semantic Search & Secure API Gateways',
        position: 1,
        lessons: [
          {
            id: 'les_iaw_01_01',
            section_id: 'sec_iaw_01',
            title: '1.1 Architecting Secure Backend Proxy Routes for Website AI Features',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            content: 'Learn why API keys must never be exposed in client-side JavaScript and how to build secure Next.js/serverless streaming endpoints.',
            duration_seconds: 560,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_iaw_01_02',
            section_id: 'sec_iaw_01',
            title: '1.2 Grounding Website Chatbots on Your Own Site Content, Docs & Product Catalog',
            type: 'article',
            content: `### How to Integrate Custom AI Into Any Website

Adding AI to a website goes far beyond a generic chat bubble—when grounded on your site's own pages, FAQs, and catalog, it becomes a 24/7 conversion and support engine.

#### Key Integration Patterns:
1. **Server-Side API Proxy**: Keep your LLM API keys strictly on the server (\`/api/ai/chat\`) with IP rate-limiting and input sanitization.
2. **Site-Indexed RAG**: Index your website's pages, documentation, and pricing into vector embeddings so the assistant answers with accurate links and zero hallucinations.
3. **Streaming UX**: Stream tokens progressively into the UI widget so users see instant feedback within 300ms.`,
            duration_seconds: 450,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_iaw_01_03',
            section_id: 'sec_iaw_01',
            title: '1.3 Checkpoint Quiz: Website AI Integration',
            type: 'quiz',
            duration_seconds: 240,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_iaw_01',
                lesson_id: 'les_iaw_01_03',
                question: 'Where should your private LLM API key be stored when integrating AI into a public website?',
                options: [
                  'In server-side environment variables accessed only via backend API routes',
                  'Hardcoded directly inside public client-side HTML',
                  'Inside the URL query string',
                  'In a public GitHub README file',
                ],
                correct_option_index: 0,
                explanation: 'Storing API keys in server-side environment variables prevents attackers from extracting your credentials from browser DevTools.',
                position: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'crs_coding_with_ai_14',
    instructor_id: 'usr_instructor_001',
    title: 'Coding with AI',
    slug: 'coding-with-ai',
    description: 'Master AI-augmented software engineering. Learn how to write, refactor, test, document, and debug Python, JavaScript, TypeScript, and SQL code alongside AI coding agents while maintaining rigorous software architecture and security standards.',
    category: 'Applied AI & Automation',
    track: 'Applied AI & Automation',
    level: 'Beginner',
    outcome_hook: 'Write, debug, test, and ship clean production code in Python, TypeScript, and SQL with AI coding copilots.',
    duration_weeks: 8,
    weekly_hours: '10-15 hrs/week',
    skills: [
      'AI Pair Programming',
      'Context-Aware Code Generation',
      'Automated Unit Test Generation',
      'AI Debugging & Root-Cause Analysis',
      'Code Refactoring & Security Auditing',
      'Python & TypeScript with AI',
    ],
    sponsorship_note: 'Sponsored / $0 Upfront',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'Rolling Admissions',
    price: 39.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-27T09:00:00Z',
    enrollments_count: 5890,
    average_rating: 4.98,
    reviews_count: 780,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_cwai_01',
        course_id: 'crs_coding_with_ai_14',
        title: 'Module 1: AI Pair Programming, Context Engineering for Code & Automated Testing',
        position: 1,
        lessons: [
          {
            id: 'les_cwai_01_01',
            section_id: 'sec_cwai_01',
            title: '1.1 Context-First Coding: Scoping Files, Types & Interfaces for AI Agents',
            type: 'video',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            content: 'How to provide type definitions, architectural constraints, and edge-case specifications so AI coding assistants generate production-grade code.',
            duration_seconds: 570,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_cwai_01_02',
            section_id: 'sec_cwai_01',
            title: '1.2 AI-Assisted Debugging, Unit Testing & Security Vulnerability Auditing',
            type: 'article',
            content: `### Engineering Discipline When Coding with AI

AI coding assistants multiply developer velocity, but human engineers remain the architects and quality gatekeepers.

#### The 4 Rules of High-Velocity AI Coding:
1. **Types & Contracts First**: Define your TypeScript interfaces or Python Pydantic schemas first so the AI generates strictly typed implementations.
2. **Generate Tests Alongside Code**: Prompt your AI copilot to write unit and edge-case tests for every function it creates.
3. **Never Blindly Paste Unreviewed Code**: Audit generated code for SQL injection, auth bypasses, hardcoded secrets, and off-by-one bugs.
4. **Incremental Commits**: Verify and test each small change before moving to the next feature.`,
            duration_seconds: 440,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_cwai_01_03',
            section_id: 'sec_cwai_01',
            title: '1.3 Checkpoint Quiz: Coding with AI Best Practices',
            type: 'quiz',
            duration_seconds: 240,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_cwai_01',
                lesson_id: 'les_cwai_01_03',
                question: 'Why should you define data types/interfaces and generate unit tests when coding with AI?',
                options: [
                  'They constrain the AI to valid data structures and automatically verify that generated logic handles edge cases accurately',
                  'They make the source file larger for no reason',
                  'They prevent the code from compiling',
                  'They replace version control',
                ],
                correct_option_index: 0,
                explanation: 'Explicit type contracts and automated tests catch subtle logic errors immediately and keep AI-generated code maintainable.',
                position: 1,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const SAMPLE_CBT_EXAMS: CBTExam[] = [
  {
    id: 'cbt_prompting_annotation_01',
    title: 'AI Prompting & RLHF Data Annotation Certification CBT',
    slug: 'ai-prompting-data-annotation-cbt',
    description: 'Timed certification assessment evaluating structured prompt engineering, Chain-of-Thought reasoning, RLHF preference ranking, SFT golden responses, and hallucination auditing.',
    category: 'Prompt Engineering & RLHF',
    duration_minutes: 15,
    passing_score_percent: 70,
    total_questions: 5,
    difficulty: 'Beginner',
    created_at: '2026-03-01T08:00:00Z',
    questions: [
      {
        id: 'cbt_pa_q1',
        exam_id: 'cbt_prompting_annotation_01',
        question: 'In Reinforcement Learning from Human Feedback (RLHF), what is the primary objective of pairwise preference ranking?',
        options: [
          'Comparing two model responses to the same prompt and selecting which better satisfies instruction following, truthfulness, and safety rubrics',
          'Writing SQL database migrations for training servers',
          'Compressing image datasets into JPEG format',
          'Increasing the parameter count of the base model',
        ],
        correct_option_index: 0,
        explanation: 'Pairwise preference ranking collects human judgments between candidate completions to train a reward model or directly optimize alignment (DPO).',
        topic: 'RLHF & Alignment',
        position: 1,
      },
      {
        id: 'cbt_pa_q2',
        exam_id: 'cbt_prompting_annotation_01',
        question: 'Which prompting technique explicitly provides 3–5 input-output pairs inside the prompt to guide the model’s output structure?',
        options: [
          'Zero-Shot Prompting',
          'Few-Shot Prompting',
          'Model Quantization',
          'Gradient Checkpointing',
        ],
        correct_option_index: 1,
        explanation: 'Few-shot prompting uses in-context exemplars to demonstrate the desired formatting, reasoning style, and edge-case behavior.',
        topic: 'Prompt Engineering',
        position: 2,
      },
      {
        id: 'cbt_pa_q3',
        exam_id: 'cbt_prompting_annotation_01',
        question: 'When auditing an AI response during data annotation, what constitutes an "extrinsic hallucination"?',
        options: [
          'A grammatical typo in the user’s prompt',
          'A fabricated claim or citation produced by the model that cannot be verified in the source context or real-world facts',
          'A response that uses markdown bullet points',
          'A response that finishes in less than 1 second',
        ],
        correct_option_index: 1,
        explanation: 'Extrinsic hallucinations introduce unsupported or fabricated facts that are neither grounded in the provided source text nor factually true.',
        topic: 'Data Quality & Auditing',
        position: 3,
      },
      {
        id: 'cbt_pa_q4',
        exam_id: 'cbt_prompting_annotation_01',
        question: 'What is the best practice when instructing an LLM to extract structured data from untrusted user text?',
        options: [
          'Use clear delimiters (such as XML tags), define an explicit JSON schema, and instruct the model to return null for missing fields',
          'Leave the output format unspecified so the model can choose freely',
          'Set temperature to 1.8 for maximum randomness',
          'Remove all system instructions',
        ],
        correct_option_index: 0,
        explanation: 'Delimiters isolate user input from instructions, while an explicit schema and null-handling policy prevent fabricated fields.',
        topic: 'Structured Outputs',
        position: 4,
      },
      {
        id: 'cbt_pa_q5',
        exam_id: 'cbt_prompting_annotation_01',
        question: 'In Supervised Fine-Tuning (SFT) annotation, what is a "Golden Response"?',
        options: [
          'An ideal, human-written or human-edited reference completion that exemplifies perfect instruction adherence, accuracy, and tone',
          'Any response that exceeds 5,000 words',
          'An unedited raw output from an unaligned base model',
          'A prompt designed to crash the server',
        ],
        correct_option_index: 0,
        explanation: 'Golden responses serve as high-quality ground-truth demonstrations used to fine-tune or benchmark conversational AI models.',
        topic: 'SFT Annotation',
        position: 5,
      },
    ],
  },
  {
    id: 'cbt_ai_basics_02',
    title: 'AI Basics - Getting Started with AI Assessment CBT',
    slug: 'ai-basics-getting-started-cbt',
    description: 'Foundational timed assessment covering core Artificial Intelligence concepts, Machine Learning paradigms, Generative AI capabilities, and Responsible AI safety.',
    category: 'AI Foundations',
    duration_minutes: 15,
    passing_score_percent: 70,
    total_questions: 5,
    difficulty: 'Beginner',
    created_at: '2026-03-02T10:00:00Z',
    questions: [
      {
        id: 'aib_q_01',
        exam_id: 'cbt_ai_basics_02',
        question: 'Which branch of Artificial Intelligence focuses on models that can create new text, images, code, or audio rather than only classifying existing data?',
        options: [
          'Generative AI',
          'Spreadsheet Macros',
          'Relational Database Indexing',
          'Static HTML Rendering',
        ],
        correct_option_index: 0,
        explanation: 'Generative AI models learn underlying data distributions to synthesize new content across text, code, vision, and audio modalities.',
        topic: 'Generative AI',
        position: 1,
      },
      {
        id: 'aib_q_02',
        exam_id: 'cbt_ai_basics_02',
        question: 'Training a model on thousands of house listings where the actual sale price is known is an example of which learning paradigm?',
        options: [
          'Supervised Learning',
          'Unsupervised Clustering',
          'Hardware Overclocking',
          'Manual Rule Coding',
        ],
        correct_option_index: 0,
        explanation: 'Supervised learning trains models using labeled input-output pairs (features paired with known target labels like sale prices).',
        topic: 'Machine Learning Basics',
        position: 2,
      },
      {
        id: 'aib_q_03',
        exam_id: 'cbt_ai_basics_02',
        question: 'Why is a "Human-in-the-Loop" workflow essential when using AI in professional environments?',
        options: [
          'Because AI models can generate plausible-sounding inaccuracies (hallucinations) that require human verification before high-stakes use',
          'Because AI models cannot process text longer than 10 words',
          'Because computers cannot operate after 5:00 PM',
          'Because AI models require manual typing of every output letter',
        ],
        correct_option_index: 0,
        explanation: 'Human-in-the-loop review ensures factual accuracy, ethical compliance, and accountability on important deliverables.',
        topic: 'Responsible AI',
        position: 3,
      },
      {
        id: 'aib_q_04',
        exam_id: 'cbt_ai_basics_02',
        question: 'Which of the following should NEVER be pasted into a public consumer AI chat interface?',
        options: [
          'Publicly available Wikipedia summaries',
          'Sensitive customer Personally Identifiable Information (PII), private API keys, or confidential medical records',
          'Generic Python sorting algorithms',
          'Draft outlines for a public blog post',
        ],
        correct_option_index: 1,
        explanation: 'Protecting data privacy requires keeping confidential PII, credentials, and proprietary secrets out of unapproved public AI tools.',
        topic: 'AI Security & Privacy',
        position: 4,
      },
      {
        id: 'aib_q_05',
        exam_id: 'cbt_ai_basics_02',
        question: 'What is a "multimodal" AI model?',
        options: [
          'An AI model capable of understanding and processing multiple types of data—such as text, images, audio, and video—within a unified system',
          'A model that only works in two countries',
          'A model that requires two keyboards to operate',
          'A database with two tables',
        ],
        correct_option_index: 0,
        explanation: 'Multimodal models process and reason across multiple modalities (text, vision, audio, video) seamlessly.',
        topic: 'AI Modalities',
        position: 5,
      },
    ],
  },
  {
    id: 'cbt_llm_intro_03',
    title: 'Intro to Large Language Models (LLM) Technical CBT',
    slug: 'intro-to-llms-technical-cbt',
    description: 'Standardized technical examination covering sub-word tokenization, vector embeddings, Transformer self-attention, temperature sampling, and RAG architectures.',
    category: 'Large Language Models',
    duration_minutes: 20,
    passing_score_percent: 75,
    total_questions: 5,
    difficulty: 'Intermediate',
    created_at: '2026-03-03T11:00:00Z',
    questions: [
      {
        id: 'llm_q_01',
        exam_id: 'cbt_llm_intro_03',
        question: 'How do Large Language Models represent words and sub-words prior to passing them into Transformer layers?',
        options: [
          'By converting text into sub-word tokens and mapping each token to a high-dimensional numerical embedding vector',
          'By converting text into BMP image pixels',
          'By sorting words alphabetically and discarding verbs',
          'By storing raw ASCII characters in a SQLite table',
        ],
        correct_option_index: 0,
        explanation: 'Tokenizers segment text into sub-word tokens, which are then mapped to dense embedding vectors that capture semantic relationships.',
        topic: 'Tokenization & Embeddings',
        position: 1,
      },
      {
        id: 'llm_q_02',
        exam_id: 'cbt_llm_intro_03',
        question: 'What problem does Retrieval-Augmented Generation (RAG) solve for Large Language Models?',
        options: [
          'It grounds LLM responses in up-to-date or private external documents retrieved at query time, reducing hallucinations without retraining weights',
          'It eliminates the need for electricity when running inference',
          'It converts Python code into C++ automatically',
          'It increases screen resolution on client monitors',
        ],
        correct_option_index: 0,
        explanation: 'RAG retrieves relevant document chunks via vector/hybrid search and injects them into the prompt context for accurate, citeable answers.',
        topic: 'RAG Architecture',
        position: 2,
      },
      {
        id: 'llm_q_03',
        exam_id: 'cbt_llm_intro_03',
        question: 'What happens when an input prompt plus generated tokens exceed an LLM’s maximum Context Window?',
        options: [
          'The API rejects the request or truncates earlier tokens outside the context window, losing access to that earlier information',
          'The model automatically upgrades its hardware RAM',
          'The model switches to generating images instead of text',
          'The context window has no limit in any Transformer model',
        ],
        correct_option_index: 0,
        explanation: 'Every LLM has a finite context window (e.g., 8K, 128K, 1M tokens) bounding how many tokens it can attend to in a single call.',
        topic: 'Context Windows',
        position: 3,
      },
      {
        id: 'llm_q_04',
        exam_id: 'cbt_llm_intro_03',
        question: 'What is the effect of lowering the "temperature" parameter toward 0 during LLM token generation?',
        options: [
          'The output becomes more deterministic and focused by favoring the highest-probability next tokens',
          'The output becomes completely random and chaotic',
          'The physical cooling fans on the server spin faster',
          'The model forgets its pre-training language',
        ],
        correct_option_index: 0,
        explanation: 'Lower temperature sharpens the probability distribution over next tokens, making outputs predictable and repeatable.',
        topic: 'Inference & Sampling',
        position: 4,
      },
      {
        id: 'llm_q_05',
        exam_id: 'cbt_llm_intro_03',
        question: 'In a Transformer block, why is Positional Encoding (such as RoPE) necessary?',
        options: [
          'Because self-attention processes tokens in parallel and needs positional information to know word order in a sequence',
          'Because GPUs can only process one word per minute',
          'To encrypt the user’s geographic GPS coordinates',
          'To translate English into binary Morse code',
        ],
        correct_option_index: 0,
        explanation: 'Unlike recurrent networks that process words sequentially, self-attention is permutation-invariant without positional encodings.',
        topic: 'Transformer Architecture',
        position: 5,
      },
    ],
  },
];

export const SAMPLE_LIVE_ROOMS: LiveRoom[] = [
  {
    id: 'room_arch_office_hours_01',
    title: 'AI Prompting & RLHF Data Annotation Live Lab',
    description: 'Weekly interactive workshop with Dr. Elena Chen. Practice side-by-side LLM response evaluation, SFT golden rewrites, and structured prompt engineering.',
    instructor_id: 'usr_instructor_001',
    instructor_name: 'Dr. Elena Chen',
    instructor_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    course_id: 'crs_ai_prompting_annotation_01',
    course_title: 'AI Prompting and Data Annotation',
    is_active: true,
    scheduled_time: 'Live Right Now',
    participant_count: 12,
    tags: ['Prompt Engineering', 'Data Annotation', 'RLHF', 'Live Lab'],
    created_at: '2026-03-10T14:00:00Z',
  },
  {
    id: 'room_dsa_clinic_02',
    title: 'Large Language Models (LLM) & RAG Architecture Clinic',
    description: 'Interactive diagramming and whiteboard session covering tokenization, vector embeddings, self-attention, and grounding LLMs with RAG.',
    instructor_id: 'usr_instructor_001',
    instructor_name: 'Dr. Elena Chen',
    instructor_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    course_id: 'crs_intro_to_llms_03',
    course_title: 'Intro to Large Language Models - LLM',
    is_active: true,
    scheduled_time: 'Live Right Now',
    participant_count: 16,
    tags: ['LLMs', 'Transformers', 'Embeddings & RAG'],
    created_at: '2026-03-11T16:00:00Z',
  },
  {
    id: 'room_project_review_03',
    title: 'AI Basics - Getting Started with AI Q&A & Mentorship Lounge',
    description: 'Drop-in mentorship session for beginners exploring everyday AI workflows, prompt design, and responsible AI best practices.',
    instructor_id: 'usr_instructor_001',
    instructor_name: 'Dr. Elena Chen',
    instructor_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    course_id: 'crs_ai_basics_02',
    course_title: 'AI Basics - Getting Started with AI',
    is_active: false,
    scheduled_time: 'Today at 5:30 PM UTC',
    participant_count: 6,
    tags: ['AI Basics', 'Mentorship', 'Beginner Friendly'],
    created_at: '2026-03-12T10:00:00Z',
  },
];

export const INITIAL_ROOM_PARTICIPANTS: Record<string, LiveParticipant[]> = {
  room_arch_office_hours_01: [
    {
      id: 'usr_instructor_001',
      name: 'Dr. Elena Chen (Host)',
      avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      role: 'instructor',
      is_speaking: true,
      is_muted: false,
      is_camera_on: true,
    },
    {
      id: 'usr_student_010',
      name: 'Jordan Taylor',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'student',
      is_speaking: false,
      is_muted: true,
      is_camera_on: true,
      has_hand_raised: false,
    },
    {
      id: 'usr_student_002',
      name: 'Sophia Zhang',
      avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      role: 'student',
      is_speaking: false,
      is_muted: true,
      is_camera_on: true,
    },
    {
      id: 'usr_student_003',
      name: 'Liam Patel',
      avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      role: 'student',
      is_speaking: false,
      is_muted: true,
      is_camera_on: false,
    },
  ],
};

export const INITIAL_ROOM_MESSAGES: Record<string, LiveChatMessage[]> = {
  room_arch_office_hours_01: [
    {
      id: 'msg_01',
      room_id: 'room_arch_office_hours_01',
      sender_id: 'usr_instructor_001',
      sender_name: 'Dr. Elena Chen',
      sender_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      sender_role: 'instructor',
      message: 'Welcome everyone! Today we are practicing RLHF pairwise preference ranking and Chain-of-Thought prompt templates. Feel free to use the Whiteboard or raise your hand to speak.',
      timestamp: '14:02',
      is_announcement: true,
    },
    {
      id: 'msg_02',
      room_id: 'room_arch_office_hours_01',
      sender_id: 'usr_student_002',
      sender_name: 'Sophia Zhang',
      sender_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      sender_role: 'student',
      message: 'Hi Dr. Chen! When two LLM completions both follow formatting constraints, how do we weigh subtle factual grounding differences in our annotation rubric?',
      timestamp: '14:04',
    },
    {
      id: 'msg_03',
      room_id: 'room_arch_office_hours_01',
      sender_id: 'usr_instructor_001',
      sender_name: 'Dr. Elena Chen',
      sender_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      sender_role: 'instructor',
      message: 'Great question Sophia! Factuality and truthfulness always take precedence over stylistic polish. Let’s walk through a side-by-side annotation example now.',
      timestamp: '14:05',
    },
  ],
};

// ==========================================
// Subscription Plans (Catalog & Pricing)
// ==========================================

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'term',
    name: 'Term Scholar Pass',
    tagline: 'Ideal for semester coursework and targeted sprint completion',
    price: 149,
    period: '/ semester',
    popular: false,
    features: [
      'Full access to all engineering curricula & video streams',
      'Standard CBT Examination test attempts (up to 3 / month)',
      'Community discussion forums & peer Q&A',
      'Downloadable code repositories & starter templates',
      'Intranet access granted upon admin tuition verification',
    ],
    intranet_perks: [
      'Standard Campus Intranet Access',
      'CBT Examination Center (Level 1)',
      'Community Bulletin Board',
    ],
  },
  {
    id: 'annual',
    name: 'Annual Campus Fellowship',
    tagline: 'Complete year-round access to the full academic suite and live faculty rooms',
    price: 299,
    period: '/ academic year',
    popular: true,
    features: [
      'Unlimited access to all existing and newly released courses',
      'Priority access to Live Virtual Meeting Rooms & Office Hours',
      'Unlimited CBT Certification exams with official digital credential slips',
      'Interactive Screen Sharing & Breakout Room participation',
      'Priority Admin Clearance queue (instant fast-track review)',
      'Internal Academic Code Sandbox & Research Repositories',
    ],
    intranet_perks: [
      'Full Campus Intranet VIP Clearance',
      'Live Virtual Rooms & Faculty Office Hours',
      'Unlimited CBT Testing Center',
      'Internal Library & Research Archive',
    ],
  },
  {
    id: 'lifetime',
    name: 'Distinguished Fellow Pass',
    tagline: 'Permanent lifetime alumni status with direct faculty mentoring and private workshops',
    price: 499,
    period: 'one-time investment',
    popular: false,
    features: [
      'Lifetime non-expiring clearance to all current and future portals',
      'Direct 1-on-1 scheduled office hours with Dr. Chen and senior faculty',
      'Lifetime access to CBT Examination re-takes & archival transcripts',
      'Host & Presenter privileges in collaborative student rooms',
      'Direct contact channel with the Academic Dean & Admin panel',
    ],
    intranet_perks: [
      'Permanent Intranet Clearance with Alumni Badge',
      'Presenter Privileges in Virtual Rooms',
      'Direct Faculty Mentorship Channel',
    ],
  },
];

// ==========================================
// Intranet Access Requests (Admin Clearance Queue)
// ==========================================

export const SAMPLE_INTRANET_REQUESTS: IntranetAccessRequest[] = [
  {
    id: 'req_001',
    user_id: 'usr_applicant_001',
    user_name: 'Marcus Vance',
    user_email: 'marcus.vance@campus.edu',
    user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    plan_id: 'annual',
    plan_name: 'Annual Campus Fellowship',
    amount_paid: 299,
    payment_method: 'credit_card',
    payment_reference: 'TXN-REACTJAV-8921B',
    payment_date: '2026-09-14T18:30:00Z',
    status: 'pending_approval',
    admin_granted: false,
  },
  {
    id: 'req_002',
    user_id: 'usr_student_002',
    user_name: 'Marcus Brody',
    user_email: 'marcus.brody@mit.edu',
    user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    plan_id: 'term',
    plan_name: 'Term Scholar Pass',
    amount_paid: 149,
    payment_method: 'bank_transfer',
    payment_reference: 'TXN-WIRE-44199A',
    payment_date: '2026-09-14T16:15:00Z',
    status: 'pending_approval',
    admin_granted: false,
  },
  {
    id: 'req_003',
    user_id: 'usr_student_003',
    user_name: 'Aisha Patel',
    user_email: 'aisha.patel@oxford.ac.uk',
    user_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    plan_id: 'lifetime',
    plan_name: 'Distinguished Fellow Pass',
    amount_paid: 499,
    payment_method: 'credit_card',
    payment_reference: 'TXN-REACTJAV-1002C',
    payment_date: '2026-09-13T09:00:00Z',
    status: 'active',
    admin_granted: true,
    reviewed_at: '2026-09-13T10:15:00Z',
    reviewed_by: 'System Administrator (usr_admin_001)',
  },
  {
    id: 'req_004',
    user_id: 'usr_student_004',
    user_name: 'Devon Vance',
    user_email: 'devon.vance@stanford.edu',
    user_avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    plan_id: 'term',
    plan_name: 'Term Scholar Pass',
    amount_paid: 149,
    payment_method: 'campus_voucher',
    payment_reference: 'VCH-EXPIRED-992',
    payment_date: '2026-09-12T14:20:00Z',
    status: 'rejected',
    admin_granted: false,
    reviewed_at: '2026-09-12T15:00:00Z',
    reviewed_by: 'System Administrator (usr_admin_001)',
    rejection_reason: 'Voucher code expired on 2026-09-01. Please submit fresh payment receipt.',
  },
];

// ==========================================
// Campus Bulletins & Intranet Announcements
// ==========================================

export const CAMPUS_BULLETINS: IntranetBulletin[] = [
  {
    id: 'blt_01',
    title: 'AI Prompting & RLHF Data Annotation Certification CBT Window Open',
    category: 'Exam',
    priority: 'high',
    author: 'Examination Board',
    author_role: 'Academic Registrar',
    content: 'The official timed CBT certification session for AI Prompting and Data Annotation is now active in the CBT Center. Cleared scholars are eligible for up to 3 attempts with automated credential generation.',
    created_at: '2026-09-15T08:00:00Z',
  },
  {
    id: 'blt_02',
    title: 'Dr. Elena Chen Live LLM & RAG Architecture Workshop',
    category: 'Lecture',
    priority: 'normal',
    author: 'Dr. Elena Chen',
    author_role: 'Faculty Lead',
    content: 'Room #01 will host a collaborative session on Large Language Model tokenization, embeddings, and RLHF annotation rubrics today at 14:00 GMT. Students can join via the Virtual Rooms hub.',
    created_at: '2026-09-15T09:30:00Z',
  },
  {
    id: 'blt_03',
    title: 'AI Evaluation Sandbox & Prompt Playground Updated',
    category: 'Maintenance',
    priority: 'low',
    author: 'Campus AI Operations',
    author_role: 'System Administrator',
    content: 'New RLHF evaluation datasets and LLM tokenization exercises have been added to the Campus Intranet with zero downtime.',
    created_at: '2026-09-14T22:00:00Z',
  },
];

// ==========================================
// Sample Student CBT/CDT Exam Attempts
// ==========================================

export const SAMPLE_CBT_ATTEMPTS: CBTAttempt[] = [
  {
    id: 'att_cbt_01',
    user_id: 'usr_cbt_sample_01',
    exam_id: 'cbt_prompting_annotation_01',
    exam_title: 'AI Prompting & RLHF Data Annotation Certification CBT',
    score: 92,
    passed: true,
    total_questions: 5,
    answered_count: 5,
    correct_count: 5,
    time_spent_seconds: 780,
    answers: { 'cbt_pa_q1': 0, 'cbt_pa_q2': 1, 'cbt_pa_q3': 1, 'cbt_pa_q4': 0, 'cbt_pa_q5': 0 },
    flagged_questions: [],
    created_at: '2026-09-14T14:30:00Z',
  },
  {
    id: 'att_cbt_02',
    user_id: 'usr_cbt_sample_01',
    exam_id: 'cbt_ai_basics_02',
    exam_title: 'AI Basics - Getting Started with AI Assessment CBT',
    score: 88,
    passed: true,
    total_questions: 5,
    answered_count: 5,
    correct_count: 4,
    time_spent_seconds: 640,
    answers: { 'aib_q_01': 0, 'aib_q_02': 0, 'aib_q_03': 0, 'aib_q_04': 1, 'aib_q_05': 0 },
    flagged_questions: [],
    created_at: '2026-09-15T11:15:00Z',
  },
  {
    id: 'att_cbt_03',
    user_id: 'usr_cbt_sample_01',
    exam_id: 'cbt_llm_intro_03',
    exam_title: 'Intro to Large Language Models (LLM) Technical CBT',
    score: 90,
    passed: true,
    total_questions: 5,
    answered_count: 5,
    correct_count: 5,
    time_spent_seconds: 820,
    answers: { 'llm_q_01': 0, 'llm_q_02': 0, 'llm_q_03': 0, 'llm_q_04': 0, 'llm_q_05': 0 },
    flagged_questions: [],
    created_at: '2026-09-16T10:00:00Z',
  },
];

// ==========================================
// Direct Tutoring Attendance Records (Dual Sign-off)
// ==========================================

export const DEFAULT_ACTIVE_TUTORING_STUDENTS: Profile[] = [
  {
    id: 'tut_student_david_eze',
    email: 'david.eze@student.reactjav.io',
    full_name: 'David Eze',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    subscription_status: 'active',
    subscription_plan: 'annual',
    admin_granted: true,
    tutoring_enrolled: true,
    tutoring_track_id: 'python-engineering',
    tutoring_track_name: 'Python Engineering & Algorithmic Thinking',
    tutoring_age: 12,
    tutoring_age_tier: 'Pre-Teen & Middle School (Ages 10–13)',
    tutoring_objective: 'Master algorithmic problem solving, Python coding, and project architecture.',
    tutoring_parent_name: 'Dr. Michael Eze',
    tutoring_parent_email: 'm.eze@family.com',
    tutoring_parent_phone: '+234 803 219 4481',
    tutoring_parent_relationship: 'Father',
    tutoring_parental_consent: true,
    tutoring_frequency: '2x per week (Recommended)',
    created_at: '2026-03-01T10:00:00Z',
  },
  {
    id: 'tut_student_amara_okafor',
    email: 'amara.okafor@student.reactjav.io',
    full_name: 'Amara Okafor',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    subscription_status: 'active',
    subscription_plan: 'annual',
    admin_granted: true,
    tutoring_enrolled: true,
    tutoring_track_id: 'fullstack-web',
    tutoring_track_name: 'Full-Stack Modern Web Engineering',
    tutoring_age: 16,
    tutoring_age_tier: 'High School & Secondary (Ages 14–17)',
    tutoring_objective: 'Build real-world full-stack web applications with Next.js, APIs, and cloud deployments.',
    tutoring_parent_name: 'Mrs. Ngozi Okafor',
    tutoring_parent_email: 'ngozi.okafor@family.net',
    tutoring_parent_phone: '+234 812 559 3012',
    tutoring_parent_relationship: 'Mother',
    tutoring_parental_consent: true,
    tutoring_frequency: '3x per week (Intensive Mastery)',
    created_at: '2026-03-05T11:30:00Z',
  },
  {
    id: 'tut_student_samuel_adeyemi',
    email: 'samuel.adeyemi@student.reactjav.io',
    full_name: 'Samuel Adeyemi',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    subscription_status: 'active',
    subscription_plan: 'annual',
    admin_granted: true,
    tutoring_enrolled: true,
    tutoring_track_id: 'ai-ml',
    tutoring_track_name: 'Artificial Intelligence & Machine Learning',
    tutoring_age: 21,
    tutoring_age_tier: 'College, University & Early Career (Ages 18–24)',
    tutoring_objective: 'Deepen machine learning mathematics and deploy neural networks into production.',
    tutoring_frequency: '2x per week (Recommended)',
    created_at: '2026-03-10T14:15:00Z',
  },
  {
    id: 'tut_student_zainab_bello',
    email: 'zainab.bello@student.reactjav.io',
    full_name: 'Zainab Bello',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    subscription_status: 'active',
    subscription_plan: 'annual',
    admin_granted: true,
    tutoring_enrolled: true,
    tutoring_track_id: 'junior-dev-track',
    tutoring_track_name: 'Junior Dev Track',
    tutoring_age: 8,
    tutoring_age_tier: 'Foundation (Ages 5–10)',
    tutoring_objective: 'Foundational computer science concepts taught through visual logic blocks, interactive storytelling, and kid-friendly digital safety.',
    tutoring_parent_name: 'Alhaji Ibrahim Bello',
    tutoring_parent_email: 'i.bello@family.com',
    tutoring_parent_phone: '+234 802 334 1980',
    tutoring_parent_relationship: 'Father',
    tutoring_parental_consent: true,
    tutoring_frequency: '2x per week (45–60 mins recommended)',
    created_at: '2026-03-12T09:00:00Z',
  },
];

export const INITIAL_TUTORING_ATTENDANCE: TutoringAttendanceSession[] = [
  {
    id: 'att_tut_demo_01',
    student_id: 'tut_student_david_eze',
    student_name: 'David Eze',
    student_avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    instructor_id: 'faculty_author_001',
    instructor_name: 'Dr. Elena Chen',
    instructor_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    track_id: 'python-engineering',
    track_name: 'Python Engineering & Algorithmic Thinking',
    session_date: '2026-09-04',
    session_time: '14:00 - 15:30 GMT',
    session_title: 'Session 1: Algorithmic Thinking & Python Data Structures',
    month: '2026-09',
    student_checked: true,
    student_checked_at: '2026-09-04T15:35:00Z',
    instructor_checked: true,
    instructor_checked_at: '2026-09-04T15:32:00Z',
    is_valid: true,
    topic_summary: 'Comprehensive review of Python dictionaries, sets, and Big-O complexity analysis.',
    notes: 'David demonstrated great grasp of hash table lookups and time complexities.',
    created_at: '2026-09-04T13:00:00Z',
  },
  {
    id: 'att_tut_demo_02',
    student_id: 'tut_student_david_eze',
    student_name: 'David Eze',
    student_avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    instructor_id: 'faculty_author_001',
    instructor_name: 'Dr. Elena Chen',
    instructor_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    track_id: 'python-engineering',
    track_name: 'Python Engineering & Algorithmic Thinking',
    session_date: '2026-09-11',
    session_time: '14:00 - 15:30 GMT',
    session_title: 'Session 2: Object-Oriented Design & Pygame Architecture',
    month: '2026-09',
    student_checked: true,
    student_checked_at: '2026-09-11T15:40:00Z',
    instructor_checked: false,
    is_valid: false,
    topic_summary: 'Sprite classes, game loop management, and collision detection algorithms.',
    notes: 'Sprite handling code submitted. Instructor verification pending.',
    created_at: '2026-09-11T13:00:00Z',
  },
  {
    id: 'att_tut_demo_03',
    student_id: 'tut_student_amara_okafor',
    student_name: 'Amara Okafor',
    student_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    instructor_id: 'faculty_author_001',
    instructor_name: 'Dr. Elena Chen',
    instructor_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    track_id: 'fullstack-web',
    track_name: 'Full-Stack Modern Web Engineering',
    session_date: '2026-09-08',
    session_time: '16:00 - 17:30 GMT',
    session_title: 'Session 1: Next.js 15 App Router & Server Components',
    month: '2026-09',
    student_checked: true,
    student_checked_at: '2026-09-08T17:35:00Z',
    instructor_checked: true,
    instructor_checked_at: '2026-09-08T17:31:00Z',
    is_valid: true,
    topic_summary: 'Server actions, streaming suspense boundaries, and optimistic UI updates.',
    notes: 'Excellent architecture pattern implemented for the cart checkout flow.',
    created_at: '2026-09-08T15:00:00Z',
  },
];

