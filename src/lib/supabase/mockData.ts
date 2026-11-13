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
    "description": "After this course, anyone can explain what AI is, how it learns, what it can and can’t do, and how to use it responsibly. Features written lessons with diagrams and alt text, hands-on activities, 10-question module banks, a 1-hour no-code Guided Lab, and the 2-hour “AI in My Life” Authentic Assessment.",
    "category": "AI Foundations",
    "track": "AI Foundations",
    "level": "Beginner",
    "outcome_hook": "After this course, anyone can explain what AI is, how it learns, what it can and can’t do, and how to use it responsibly.",
    "duration_weeks": 1,
    "weekly_hours": "7 hours total (No Coding | No Prerequisites | Written Format)",
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
    "cohort_date": "Self-Paced (7 Hours)",
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
            "title": "0.1 Written Course Guide, 10-Term Glossary, Audience Person & Tool Check",
            "type": "article",
            "summary": "One-page written course guide covering the 7-hour structure, 5 learning outcomes, mixed-model grading, 10 core glossary terms, choosing your audience person, and checking your free no-login tools.",
            "implementation_tip": "Choose one real friend or relative right now as your \"Audience Person\"—you will write your final one-page explainer specifically for them.",
            "content": "> **What you will learn:** How this 7-hour course is organized, the 10 core AI terms you will use throughout, who you are writing your final explainer for, and which free tools you need.\n\n---\n\n### 1. One-Page Written Course Guide (5 min)\n**Level:** Beginner | **Length:** 7 Hours | **Coding Required:** None | **Prerequisites:** None\n\n> **Course Promise:** *After this course, anyone can explain what AI is, how it learns, what it can and can’t do, and how to use it responsibly.*\n\nBy the end of this course, you will be able to:\n1. **Define AI** and distinguish AI, machine learning, deep learning, and generative AI.\n2. **Explain in plain language** how an AI system learns from data to make predictions.\n3. **Identify AI systems in everyday life** and describe their inputs, outputs, benefits, and risks.\n4. **Describe what large language models do well**, where they fail (hallucinations, bias), and how to check their output.\n5. **Make informed decisions** about when and how to use AI responsibly.\n\n#### How the 7 Hours Are Structured\n| Segment | Time | Content |\n| :--- | :--- | :--- |\n| **Orientation & Self-Check** | **0.5h (30m)** | One-page course guide, 10-question Pre-Check, 10-term glossary preview, Audience Person & Tool Check |\n| **Module 1: What is AI?** | **0.75h (45m)** | Written lesson + myth busting (20m), “AI or not AI?” activity (15m), 5-question knowledge check (10m) |\n| **Module 2: How AI Learns** | **0.75h (45m)** | Written lesson + “Garbage in, garbage out” reading (20m), “Be the algorithm” activity (15m), 5-question check (10m) |\n| **Module 3: Generative AI & Chatbots** | **0.75h (45m)** | Written lesson + 4-Step Verification Habit (18m), “Spot the hallucination” activity (17m), 5-question check (10m) |\n| **Module 4: AI in Society** | **0.75h (45m)** | Written lesson + Responsible-Use Checklist (20m), “My five rules” activity (15m), 5-question check (10m) |\n| **Guided Lab** | **1.0h (60m)** | Part A: Image classifier (35m) + Part B: Probe a chatbot (20m) + Part C: Debrief worksheet (5m) |\n| **Authentic Assessment** | **2.0h (120m)** | “AI in My Life” audit (15m plan, 45m audit of 5 systems, 20m hallucination write-up, 40m written/infographic explainer) |\n| **Reflection & Review** | **0.5h (30m)** | 150–200 word reflection, rubric self-check, survey, Post-Check (retake the 10-question Pre-Check), Certificate & Open Badge |\n\n#### What Earns the Certificate and Open Badge\n- **Automated Checks (50%)**: 4 Module Knowledge Checks (25%, drawn from 10-question banks so retakes vary) + Submission Validation (25%, confirming all 5 systems, hallucination screenshots/verification, glossary terms, and length limits).\n- **4-Level Rubric (50%)**: Accuracy of AI concepts, Clarity for the audience, Critical thinking about risks, and Reflection (*Beginning, Developing, Proficient, Advanced*).\n- **Pass Rule**: **70% or higher in BOTH** components (you can revise and resubmit once). **Certificate with Distinction**: **90% or higher in BOTH** components.\n- **Credentials**: *“AI Foundations: Certificate of Completion”* + Open Badge named *“AI Foundations”* with verified skills and assessment evidence in its metadata.\n\n---\n\n### 2. Core 10-Term Glossary Preview (5 min)\n1. **AI (Artificial Intelligence)**: Computer systems designed to perform tasks that normally require human intelligence, such as recognizing speech, spotting patterns, or answering questions.\n2. **Algorithm**: A step-by-step set of rules or instructions a computer follows to solve a problem.\n3. **Data**: Examples—such as text, photos, numbers, or audio—collected and used to train or test an AI system.\n4. **Model**: The finished pattern-recognition system created after training an algorithm on data.\n5. **Training**: The process where an AI system adjusts itself across many examples so it gets better at a task.\n6. **Prediction**: The output or best guess a trained model makes when given a new input it has not seen before.\n7. **Machine Learning**: A type of AI where computers learn patterns from data examples instead of following only hand-written rules.\n8. **Generative AI**: AI that creates new content—such as text, images, or audio—rather than just sorting or labeling existing data.\n9. **Hallucination**: When a generative AI system confidently invents false facts, quotes, or sources that sound plausible.\n10. **Bias**: Systematic, unfair errors in an AI system’s output, often caused by skewed or unrepresentative training data.\n\n---\n\n### 3. Choose Your “Audience Person” (5 min)\nYour final Authentic Assessment asks you to write a **one-page written explainer** or **one-page infographic** for a real person who says: *“Everyone talks about AI, but I don’t get what it actually is.”*\nIn your **Personal Study Notes** tab below, write down the name and background of your **Audience Person** (for example: *“My Uncle Sam, a retired carpenter who uses Google Maps and WhatsApp but feels confused by AI news”*).\n\n---\n\n### 4. Tool Check (5 min)\nAll tools in this course are **free and require no login** where possible:\n- **Image Classifier Lab**: Google Teachable Machine (works in any browser with a webcam, **or** use our provided ready-made image set if you have no webcam).\n- **Chatbot Verification**: Any free no-login chatbot interface (or your preferred free AI chat tool).\n- **Final Explainer**: Any word processor, Google Docs/Slides, Canva, or our built-in written submission box.\n\n> **Key takeaways:**\n> - This course takes 7 hours across 8 segments, with zero coding and no prerequisites.\n> - Every module follows the same rhythm: a written lesson, a hands-on activity, and a 5-question check drawn from a 10-question bank.\n> - You are preparing a real-world audit and one-page written explainer for one specific non-technical friend or relative.",
            "duration_seconds": 1200,
            "position": 1,
            "is_free_preview": true,
            "is_completed": false
          },
          {
            "id": "les_aif_00_02",
            "section_id": "sec_aif_00",
            "title": "0.2 Ungraded Pre-Check: What Do I Already Know? (10 Questions)",
            "type": "quiz",
            "summary": "Answer 10 ungraded baseline questions to see what you already believe about AI. You will retake these exact 10 questions at the end of the course as a Post-Check to see how much you grew.",
            "duration_seconds": 600,
            "position": 2,
            "is_free_preview": true,
            "is_completed": false,
            "quiz_questions": [
              {
                "id": "q_aif_pre_1",
                "lesson_id": "les_aif_00_02",
                "question": "Which statement best describes the relationship between Artificial Intelligence (AI) and Machine Learning (ML)?",
                "options": [
                  "Machine Learning is a subset of AI where systems learn patterns from data instead of following only hand-coded rules",
                  "AI and Machine Learning are completely unrelated fields",
                  "AI is a small subset inside Machine Learning",
                  "Machine Learning only works on physical robots, never on software"
                ],
                "correct_option_index": 0,
                "explanation": "AI is the broad umbrella; Machine Learning is a major approach inside AI that learns patterns from examples.",
                "position": 1
              },
              {
                "id": "q_aif_pre_2",
                "lesson_id": "les_aif_00_02",
                "question": "Which everyday tool is an example of AI rather than a simple fixed-rule program?",
                "options": [
                  "A pocket calculator adding 2 + 2",
                  "A grocery store automatic sliding door",
                  "An email spam filter that adapts to new scam messages",
                  "A mechanical washing machine timer"
                ],
                "correct_option_index": 2,
                "explanation": "A spam filter learns patterns from millions of emails to classify new messages, whereas calculators and timers follow fixed rules.",
                "position": 2
              },
              {
                "id": "q_aif_pre_3",
                "lesson_id": "les_aif_00_02",
                "question": "In Machine Learning, what is a \"model\"?",
                "options": [
                  "A human actor hired to demonstrate software",
                  "The finished pattern-recognition system produced after training on data",
                  "A physical 3D-printed microchip",
                  "The internet browser used to open a website"
                ],
                "correct_option_index": 1,
                "explanation": "During training, an algorithm learns from data to build a model—a mathematical recipe that makes predictions on new inputs.",
                "position": 3
              },
              {
                "id": "q_aif_pre_4",
                "lesson_id": "les_aif_00_02",
                "question": "What does \"Garbage in, garbage out\" mean in AI?",
                "options": [
                  "AI systems clean up messy computer hard drives automatically",
                  "If training data is incomplete, inaccurate, or skewed, the AI model will make poor or biased predictions",
                  "Computers need to be recycled every year",
                  "AI only works when given random numbers"
                ],
                "correct_option_index": 1,
                "explanation": "An AI model can only learn from the examples it is given. Flawed or unrepresentative data leads to flawed predictions.",
                "position": 4
              },
              {
                "id": "q_aif_pre_5",
                "lesson_id": "les_aif_00_02",
                "question": "How does a Large Language Model (LLM) like ChatGPT or Gemini generate its replies?",
                "options": [
                  "By looking up verified answers in a locked encyclopedia",
                  "By thinking consciously with human feelings",
                  "By predicting the most statistically likely next word (or token) based on patterns in its training text",
                  "By asking a human worker to type every reply live"
                ],
                "correct_option_index": 2,
                "explanation": "LLMs are next-token prediction engines trained on vast text datasets, not conscious minds or fact-checked databases.",
                "position": 5
              },
              {
                "id": "q_aif_pre_6",
                "lesson_id": "les_aif_00_02",
                "question": "What is an AI \"hallucination\"?",
                "options": [
                  "A computer screen flickering due to low battery",
                  "When a chatbot confidently invents false facts, quotes, or sources that sound plausible",
                  "When an image generator uses bright colors",
                  "A virus that deletes files"
                ],
                "correct_option_index": 1,
                "explanation": "Because chatbots predict plausible-sounding words, they can fabricate details or citations with high confidence.",
                "position": 6
              },
              {
                "id": "q_aif_pre_7",
                "lesson_id": "les_aif_00_02",
                "question": "If a chatbot gives you a confident answer with an academic citation, what should you do before relying on it?",
                "options": [
                  "Trust it immediately because citations cannot be faked",
                  "Confirm that the source actually exists and says what the chatbot claims",
                  "Ask the same chatbot \"Are you sure?\" and accept its reply",
                  "Assume any long answer is 100% accurate"
                ],
                "correct_option_index": 1,
                "explanation": "Always cross-check and verify that cited sources exist and support the claim.",
                "position": 7
              },
              {
                "id": "q_aif_pre_8",
                "lesson_id": "les_aif_00_02",
                "question": "Which type of information should you NEVER paste into a public AI chatbot?",
                "options": [
                  "A request to brainstorm dinner ideas",
                  "Passwords, private medical records, or confidential customer data",
                  "A public news headline to summarize",
                  "A general question about world history"
                ],
                "correct_option_index": 1,
                "explanation": "Never share passwords, personal IDs, or private/confidential documents with public AI tools.",
                "position": 8
              },
              {
                "id": "q_aif_pre_9",
                "lesson_id": "les_aif_00_02",
                "question": "True or False: Today’s AI systems are conscious and understand the world the same way humans do.",
                "options": [
                  "True — modern chatbots have real feelings and self-awareness",
                  "False — AI systems process mathematical patterns without consciousness or true understanding"
                ],
                "correct_option_index": 1,
                "explanation": "AI can simulate fluent conversation, but it has no consciousness, beliefs, or lived understanding.",
                "position": 9
              },
              {
                "id": "q_aif_pre_10",
                "lesson_id": "les_aif_00_02",
                "question": "What is an example of Algorithmic Bias?",
                "options": [
                  "A face-recognition tool performing worse for people underrepresented in its training photos",
                  "A laptop running faster when plugged into power",
                  "A user preferring dark mode over light mode",
                  "A spreadsheet sorting numbers from smallest to largest"
                ],
                "correct_option_index": 0,
                "explanation": "When training data underrepresents certain groups, the resulting model often makes more errors for those groups.",
                "position": 10
              }
            ]
          }
        ]
      },
      {
        "id": "sec_aif_01",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 2 — Module 1: What Is AI? (0.75h)",
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
            "title": "1.3 Module 1 Knowledge Check (5 Questions from 10-Question Bank)",
            "type": "quiz",
            "summary": "5 questions randomly drawn from the 10-question Module 1 bank with instant feedback. Retake anytime for a fresh variation.",
            "duration_seconds": 600,
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
              }
            ]
          }
        
      ]
    },
    {
        "id": "sec_aif_02",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 3 — Module 2: How AI Learns (0.75h)",
        "position": 3,
        "lessons": [
          {
            "id": "les_aif_02_01",
            "section_id": "sec_aif_02",
            "title": "2.1 Written Lesson & Reading: How AI Learns & “Garbage In, Garbage Out”",
            "type": "article",
            "summary": "Learn the 4 steps of machine learning (data, training, model, prediction), the 3 ways machines learn (supervised, unsupervised, reinforcement), and the 8-minute reading “Garbage In, Garbage Out.”",
            "content": "> **What you will learn:** By the end of this lesson, you will be able to explain how a machine learning system learns from examples. You will know the four steps (data, training, model, prediction), and you will be able to name the three main ways machines learn.\n\n---\n\n### Part A: The Lesson (12 Minutes)\n\n#### 1. Learning from examples\nFirst, think about how a child learns what an apple is. Nobody gives the child a long list of rules, such as *“round, red or green, with a stem on top.”* Instead, you show the child many apples and say, *“This is an apple.”* After a while, the child can recognize an apple they have never seen before, even if it is a different color or size.\n\nMachine learning works in a similar way. In other words, instead of writing rules for the computer, we show it many examples, and the computer finds the patterns by itself. This is why machine learning is so useful. Some problems, like recognizing a face or a spoken word, are too complicated for anyone to write down as rules.\n\n#### 2. The four steps: data, training, model, prediction\nEvery machine learning system follows the same four steps:\n\n| 1. DATA | 2. TRAINING | 3. MODEL | 4. PREDICTION |\n| :--- | :--- | :--- | :--- |\n| Examples are collected | The computer studies the examples to find patterns | The patterns it learned are saved | The model makes a guess about something new |\n| *Spam example:* thousands of emails marked “spam” or “not spam” | The computer compares the spam emails with the normal ones | It saves patterns, such as pressure words, strange links, and requests for money | A new email arrives and is marked “probably spam” |\n\n> **Diagram Alt Text:** *A four-column left-to-right flow table showing the four steps of machine learning: 1. Data (examples collected), 2. Training (computer studies examples to find patterns), 3. Model (learned patterns saved), 4. Prediction (model makes a guess about something new), illustrated with an email spam filter example.*\n\n- **Step 1, Data:** Data is information, such as pictures, words, numbers, or sounds. The examples we use for learning are called **training data**.\n- **Step 2, Training:** Next, the computer studies the training data again and again. Each time, it adjusts itself to make fewer mistakes. This process is called **training**.\n- **Step 3, Model:** After training, what the computer has learned is saved as a **model**. You can think of the model as the “learned experience” of the system.\n- **Step 4, Prediction:** Finally, we give the model something new, and it makes a **prediction**. For example, it says, *“This email is probably spam,”* or *“This photo shows a cat.”*\n\n> **Remember:** The model is not a list of rules written by a person. It is a set of patterns that the computer found by itself.\n\n#### 3. Why predictions can be wrong\nBecause a model works with patterns, it makes a best guess, not a perfect answer. For instance, a spam filter may say an email is probably spam, but sometimes a normal email gets caught. Similarly, it may miss a new kind of spam that looks different from anything it has seen.\n\nTherefore, we should never think of AI as always right. Instead, we should think of it as very good at patterns it has seen before, and less reliable when something is new or unusual.\n\n#### 4. Three ways machines learn\nThere is more than one way to teach a machine. Fortunately, the three main ways are easy to picture with everyday examples:\n\n| Way of learning | Everyday picture | Example |\n| :--- | :--- | :--- |\n| **Supervised learning** | Studying with an answer key. Each example comes with the correct answer, called a **label**. | A spam filter learns from emails labeled “spam” or “not spam.” A photo tool learns from pictures labeled “cat” or “dog.” |\n| **Unsupervised learning** | Sorting a box of mixed buttons into piles. Nobody tells you the piles, so you group the buttons by how they look. | A shop groups customers with similar buying habits, without being told the groups in advance. |\n| **Reinforcement learning** | Training a dog with treats, or learning a video game by playing. You try something, get a reward or a penalty, and improve. | A program learns to play a game by trying moves and earning points. A robot learns to walk by trial and error. |\n\nIn short, supervised learning has answers, unsupervised learning finds groups, and reinforcement learning uses rewards.\n\n> **Key takeaways:**\n> - Machine learning means the computer finds patterns from examples instead of following only written rules.\n> - The four steps are **data → training → model → prediction**.\n> - A model makes best guesses, so it can be wrong, especially with new or unusual cases.\n> - The three main ways to learn are **supervised**, **unsupervised**, and **reinforcement learning**.\n\n#### New words in this lesson\n| Word | Meaning |\n| :--- | :--- |\n| **Data** | Information such as pictures, words, numbers, or sounds |\n| **Training data** | The examples a system learns from |\n| **Label** | The correct answer attached to an example, such as “spam” or “cat” |\n| **Training** | The process of studying examples to find patterns |\n| **Model** | What the system has learned, saved as patterns it can use |\n| **Prediction** | The model’s best guess about something new |\n| **Supervised learning** | Learning from examples that come with correct answers |\n| **Unsupervised learning** | Finding groups or patterns in data without answers |\n| **Reinforcement learning** | Learning by trial and error with rewards |\n\n---\n\n### Part B: Reading (8 Minutes): “Garbage In, Garbage Out”\nComputer experts have a short saying: **“garbage in, garbage out.”** It means that if the information we give a computer is poor, the results will be poor too. This idea is very important for AI, because a model is only as good as the data it learned from.\n\n#### Three questions to ask about data\n1. **Is there enough of it?** A child who has seen only one apple may not recognize a different apple. In the same way, a model with too few examples may not learn the pattern well.\n2. **Is it correct?** If many photos in the training data have the wrong label—for instance, dogs labeled as cats—the model will learn the wrong lesson.\n3. **Does it cover everyone and everything?** This is called being **representative**. If the data leaves out some groups or situations, the model will not work well for them.\n\n- **Example 1: The daylight camera** — Imagine a model that learns to recognize street signs, but all of its training photos were taken on sunny days. As a result, it may work well at noon, but it may make many mistakes at night or in the rain. The problem is not the computer. The problem is that the data did not show those situations.\n- **Example 2: Unfair results** — Now imagine a face recognition tool trained mostly on photos of one group of people. Because the data was not representative, the tool will probably work worse for people from other groups. This kind of unfair result is called **bias**. Importantly, bias often does not come from bad intentions; it often comes from data that is incomplete or unbalanced. Similarly, if a model learns from past decisions that were unfair, it can repeat those unfair patterns.\n\n#### What can we do?\n- Use data that is large, correct, and varied.\n- Test the model on different groups and situations before using it.\n- Keep a person in charge of important decisions, such as hiring or health.\n\n> **In short:** Better data leads to better AI. Poor or unbalanced data leads to poor or unfair results.",
            "duration_seconds": 1200,
            "position": 1,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_02_02",
            "section_id": "sec_aif_02",
            "title": "2.2 Activity: “Be the Algorithm” (Round 1 Good Data vs. Round 2 Poor Data)",
            "type": "article",
            "summary": "Act like a machine learning system: study 10 labeled email subject lines, predict labels for 5 new messages, and repeat with a narrow “FREE = spam” dataset.",
            "content": "> **What you will learn:** How a machine learning model learns patterns from training data—and how a narrow, skewed dataset causes avoidable mistakes.\n\n**Your goal:** Act like a machine learning system. You will learn from examples, make predictions, and then see what happens when the examples are poor.\n\n---\n\n### Round 1: Learn from good examples (7 minutes)\nFirst, study these **10 labeled email subject lines**. This is your training data. Look for patterns:\n\n| # | Subject line (training data) | Label |\n| :--- | :--- | :--- |\n| **1** | WIN a FREE prize now!!! | **Spam** |\n| **2** | Claim your reward: click here today | **Spam** |\n| **3** | Cheap pills, no prescription needed | **Spam** |\n| **4** | You have been selected: send your bank details | **Spam** |\n| **5** | Last chance: double your money in 24 hours | **Spam** |\n| **6** | Meeting moved to 3 pm tomorrow | **Not spam** |\n| **7** | Your library book is due Friday | **Not spam** |\n| **8** | Photos from the weekend trip | **Not spam** |\n| **9** | Invoice for October attached | **Not spam** |\n| **10** | Can you review my draft report? | **Not spam** |\n\nIn your **Personal Study Notes**, write in 1–2 sentences what the spam messages have in common, then predict the label and clue for these **5 new messages**:\n1. *Urgent: verify your password at this link*\n2. *Lunch on Thursday?*\n3. *Congratulations! You won a free vacation*\n4. *Notes from today’s class*\n5. *Free parking available at the venue*\n\n---\n\n### Round 2: Learn from poor examples (8 minutes)\nNow imagine a different system. It was trained on a much narrower set of examples. In this set, every spam message contained the word **“FREE,”** and no normal message did. Because of this, the system learned only one pattern: **“FREE = spam.”**\n\nUse only that rule and predict the labels for the same **5 messages** again, then reflect:\n- Which messages did the narrow system get wrong?\n- Why did the narrow system make those mistakes?\n- What kind of examples would you add to improve it?\n\n---\n\n### Answer Guide\n| # | New message | Best label (Round 1) | “FREE = spam” result | Right? |\n| :--- | :--- | :--- | :--- | :--- |\n| **1** | Urgent: verify your password at this link | **Spam** | Not spam | **Wrong** |\n| **2** | Lunch on Thursday? | **Not spam** | Not spam | Right |\n| **3** | Congratulations! You won a free vacation | **Spam** | Spam | Right |\n| **4** | Notes from today’s class | **Not spam** | Not spam | Right |\n| **5** | Free parking available at the venue | **Not spam** | Spam | **Wrong** |\n\n- **Round 1 pattern:** The spam messages use pressure and promises, such as *“now,” “last chance,” “click here,” “prize,”* and requests for money or private details. The normal messages are calm and about ordinary tasks. Message 5 is the tricky one: it contains *“free,”* but it is not spam.\n- **Round 2 lesson:** The narrow system missed message 1 because it did not contain *“free,”* and it wrongly blocked message 5 because it did. The problem was poor and narrow data, not a bad computer. Adding varied examples—including normal messages with *“free”* and spam without it—would improve the system.",
            "duration_seconds": 900,
            "position": 2,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_02_03",
            "section_id": "sec_aif_02",
            "title": "2.3 Module 2 Knowledge Check (5 Questions from 10-Question Bank)",
            "type": "quiz",
            "summary": "5 questions randomly drawn from the 10-question Module 2 bank with instant feedback.",
            "duration_seconds": 600,
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
              }
            ]
          }
        
      ]
    },
    {
        "id": "sec_aif_03",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 4 — Module 3: Generative AI and Chatbots (0.75h)",
        "position": 4,
        "lessons": [
          {
            "id": "les_aif_03_01",
            "section_id": "sec_aif_03",
            "title": "3.1 Written Lesson: Generative AI, Chatbots & The 4-Step Verification Habit",
            "type": "article",
            "summary": "How LLMs predict likely next words, how image generators work at a high level, strengths and limits of chatbots, and the 4-Step Verification Habit.",
            "content": "> **What you will learn:** How chatbots and image generators create new content, what they are great at, why they hallucinate, and the four-step habit for checking their output.\n\n---\n\n### 1. How Language Models Generate Text\nWhen you type a prompt into a chatbot like ChatGPT, Gemini, or Claude, it does **not** search a verified encyclopedia and copy-paste a guaranteed truth. Instead, a **Large Language Model (LLM)** works like an ultra-advanced autocomplete: it reads your prompt and predicts the **most statistically likely next word** (or word-piece), one step at a time.\n\nFor example, if you type *\"The capital of France is...\"*, the word *\"Paris\"* has appeared next to that phrase millions of times in its training text, so the model predicts *\"Paris\"*.\n\n---\n\n### 2. How Image Generators Work (High Level)\nImage generators (like DALL·E, Midjourney, or Imagen) learn patterns linking text descriptions to pixels across millions of captioned images. When you ask for *\"a watercolor painting of a red bicycle in the rain,\"* the model starts from random visual noise and gradually refines the pixels until they match the patterns for *watercolor*, *red bicycle*, and *rain*.\n\n---\n\n### 3. Strengths vs. Limits of Generative AI\n| What Generative AI Does Well (Strengths) | Where Generative AI Fails (Limits) |\n| :--- | :--- |\n| **Drafting**: Writing first-draft emails, outlines, and letters | **Hallucinations**: Inventing false facts, quotes, or fake citations |\n| **Summarizing**: Condensing long articles or meeting notes | **Outdated Knowledge**: Missing recent events after training |\n| **Translating**: Converting plain text across languages | **Bias**: Repeating stereotypes from web training data |\n| **Brainstorming**: Generating ideas, analogies, and study quizzes | **No Guarantee of Truth & Privacy Risks**: Anything you paste may be logged |\n\n> **Diagram Alt Text:** *A two-column comparison table titled \"Strengths vs. Limits of Generative AI.\" The left column lists Drafting, Summarizing, Translating, and Brainstorming. The right column lists Hallucinations, Outdated Knowledge, Bias, No Guarantee of Truth, and Privacy Risks.*\n\n---\n\n### 4. Reading: The Verification Habit in Four Steps\nBecause chatbots sound confident even when they are completely wrong, build this **4-Step Verification Habit** every time you rely on AI output:\n1. **Check it**: Read the answer critically—does anything look suspicious, vague, or too convenient?\n2. **Cross-check with a trusted source**: Confirm important facts (health, law, finance, dates) on an official website, textbook, or reputable news source.\n3. **Ask for sources and verify they exist**: If the chatbot gives you a book title, study, or link, search for it yourself to confirm the source exists *and* actually says what the chatbot claims.\n4. **Never paste in private information**: Keep passwords, bank details, medical records, and confidential work files out of public chatbots.\n\n---\n\n> **Key takeaways:**\n> - LLMs generate fluent text by predicting the most likely next word—not by checking facts.\n> - Chatbots excel at drafting, summarizing, translating, and brainstorming, because those tasks do not require perfect factual memory.\n> - Always apply the **4-Step Verification Habit**: Check it, Cross-check with a trusted source, Verify sources exist, and Never paste private info.\n\n#### New Words\n| Term | Plain-Language Meaning |\n| :--- | :--- |\n| **Generative AI** | AI that creates new text, images, or audio from patterns it learned. |\n| **Large Language Model (LLM)** | An AI model trained on massive text collections to predict and generate human-like language. |\n| **Hallucination** | A confident-sounding AI answer or citation that is factually false or invented. |",
            "duration_seconds": 1080,
            "position": 1,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_03_02",
            "section_id": "sec_aif_03",
            "title": "3.2 Activity: “Spot the Hallucination” (3 AI Answers — 1 Made-Up Claim)",
            "type": "article",
            "summary": "Inspect 3 AI chatbot answers where one contains a subtle made-up claim, investigate using web search, and explain how you caught it.",
            "content": "> **What you will learn:** How to investigate AI answers using search and spot a convincing hallucination hidden among accurate answers.\n\n### Your Task (17 Minutes)\nRead the **three AI answers** below. **Two are accurate**, and **one contains a made-up claim (a hallucination)**. Use a trusted search engine or reference site to investigate all three, then write in your **Personal Study Notes** which one is false and how you verified it.\n\n- **AI Answer A (Space History):**\n  *\"Apollo 11 landed on the Moon on July 20, 1969. Neil Armstrong and Buzz Aldrin walked on the lunar surface while Michael Collins piloted the command module in lunar orbit.\"*\n- **AI Answer B (Health & Nutrition):**\n  *\"Vitamin C helps support the immune system and aids in iron absorption. Common food sources include citrus fruits, bell peppers, strawberries, and broccoli.\"*\n- **AI Answer C (Literature Citation):**\n  *\"In his 1954 essay 'Why Machines Cannot Dream,' published in The Atlantic Monthly (Vol. 193, pp. 42–48), Alan Turing argued that computers would never write poetry.\"*\n\n---\n\n### Answer Key & Verification Notes\n- **AI Answer C is the Hallucination!**\n  - *How to verify:* Searching for *\"Why Machines Cannot Dream\"* by Alan Turing in *The Atlantic Monthly* (1954) turns up zero matching articles—the essay title, volume, and page numbers were completely fabricated! (In fact, Turing's famous paper was *\"Computing Machinery and Intelligence\"* in *Mind*, 1950, and he actually argued *for* machine intelligence, not against it.)\n- **AI Answer A & Answer B** are verified as accurate against NASA mission records and standard nutrition references.",
            "duration_seconds": 1020,
            "position": 2,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_03_03",
            "section_id": "sec_aif_03",
            "title": "3.3 Module 3 Knowledge Check (5 Questions from 10-Question Bank)",
            "type": "quiz",
            "summary": "5 questions randomly drawn from a 10-question Module 3 bank with instant feedback.",
            "duration_seconds": 600,
            "position": 3,
            "is_free_preview": false,
            "is_completed": false,
            "quiz_questions": [
              {
                "id": "q_aif_03_1",
                "lesson_id": "les_aif_03_03",
                "question": "A chatbot gives you a confident answer with a citation. What should you do before relying on it?",
                "options": [
                  "Confirm the source exists and says what the chatbot claims",
                  "Assume it is true because the citation has page numbers",
                  "Ask the chatbot if it promises it is telling the truth",
                  "Share it immediately without checking"
                ],
                "correct_option_index": 0,
                "explanation": "LLMs can invent realistic-looking titles, authors, and page numbers. Always verify the source exists and supports the claim.",
                "position": 1
              },
              {
                "id": "q_aif_03_2",
                "lesson_id": "les_aif_03_03",
                "question": "How does a Large Language Model (LLM) generate a sentence?",
                "options": [
                  "By predicting the most statistically likely next word (or token) based on patterns in its training text",
                  "By copying and pasting from a live human chat agent",
                  "By consulting a guaranteed-true internal fact table",
                  "By understanding the world consciously like a human"
                ],
                "correct_option_index": 0,
                "explanation": "LLMs are next-word prediction models trained on huge text datasets.",
                "position": 2
              },
              {
                "id": "q_aif_03_3",
                "lesson_id": "les_aif_03_03",
                "question": "Which task is Generative AI generally STRONGEST at?",
                "options": [
                  "Drafting, summarizing, translating, and brainstorming ideas",
                  "Guaranteeing 100% accurate medical diagnoses without a doctor",
                  "Providing real-time stock prices without web access",
                  "Keeping your pasted passwords completely offline"
                ],
                "correct_option_index": 0,
                "explanation": "Chatbots shine at language tasks like drafting, summarizing, and brainstorming, where a human reviews the output.",
                "position": 3
              },
              {
                "id": "q_aif_03_4",
                "lesson_id": "les_aif_03_03",
                "question": "What is Step 4 of the Verification Habit?",
                "options": [
                  "Never paste in private or confidential information",
                  "Always paste your bank PIN for faster verification",
                  "Delete your browser history after every prompt",
                  "Only use AI on Tuesdays"
                ],
                "correct_option_index": 0,
                "explanation": "Protecting privacy means never pasting passwords, private documents, or sensitive personal data into public chatbots.",
                "position": 4
              },
              {
                "id": "q_aif_03_5",
                "lesson_id": "les_aif_03_03",
                "question": "Why do AI hallucinations happen?",
                "options": [
                  "Because LLMs predict words that sound plausible together rather than checking whether a claim is true",
                  "Because the internet is broken",
                  "Because chatbots want to trick users on purpose",
                  "Because the screen resolution is too low"
                ],
                "correct_option_index": 0,
                "explanation": "Fluency is not truth: next-word prediction can produce smooth, confident falsehoods.",
                "position": 5
              },
              {
                "id": "q_aif_03_6",
                "lesson_id": "les_aif_03_03",
                "question": "At a high level, how does an AI image generator create a new picture from a text prompt?",
                "options": [
                  "It refines visual noise step by step into pixels that match patterns it learned from captioned images",
                  "It hires an artist behind the scenes",
                  "It takes a live screenshot of your webcam",
                  "It copies one single existing photo without changing anything"
                ],
                "correct_option_index": 0,
                "explanation": "Image generators learn text-to-pixel patterns and refine noise into an image matching the prompt.",
                "position": 6
              },
              {
                "id": "q_aif_03_7",
                "lesson_id": "les_aif_03_03",
                "question": "Which of these is a known LIMIT of standard chatbots?",
                "options": [
                  "Outdated knowledge if not connected to live search, plus hallucinations and bias",
                  "Inability to write in complete sentences",
                  "Inability to translate between English and Spanish",
                  "Refusal to summarize short paragraphs"
                ],
                "correct_option_index": 0,
                "explanation": "Standard LLMs have training cutoff dates, can hallucinate, and can reflect biases from web data.",
                "position": 7
              },
              {
                "id": "q_aif_03_8",
                "lesson_id": "les_aif_03_03",
                "question": "What is the best way to cross-check an AI answer about a medical or legal rule?",
                "options": [
                  "Check an official government, medical, or legal primary source independently",
                  "Ask the same chatbot a second time",
                  "Trust the answer if it uses bullet points",
                  "Assume longer answers are always verified"
                ],
                "correct_option_index": 0,
                "explanation": "High-stakes claims must be verified against trusted primary sources.",
                "position": 8
              },
              {
                "id": "q_aif_03_9",
                "lesson_id": "les_aif_03_03",
                "question": "In \"Spot the Hallucination,\" how can you catch a fake journal or magazine citation?",
                "options": [
                  "Search for the exact title, author, and volume/date on a trusted search engine or library catalog",
                  "Count the number of commas in the citation",
                  "Ask a friend if the title sounds academic",
                  "Check whether the font is bold"
                ],
                "correct_option_index": 0,
                "explanation": "Searching the exact title and publication quickly reveals whether a citation is real or fabricated.",
                "position": 9
              },
              {
                "id": "q_aif_03_10",
                "lesson_id": "les_aif_03_03",
                "question": "Why should you avoid pasting confidential client or family records into a free public chatbot?",
                "options": [
                  "Prompts may be stored or used for future model review and training, creating privacy risks",
                  "The chatbot will run out of battery",
                  "Private documents cannot be read by computers",
                  "It makes the chatbot talk slower"
                ],
                "correct_option_index": 0,
                "explanation": "Public AI tools often log prompts, so sensitive personal or work data should never be pasted in.",
                "position": 10
              }
            ]
          }
        ]
      },
      {
        "id": "sec_aif_04",
        "course_id": "crs_ai_basics_02",
        "title": "Segment 5 — Module 4: AI in Society (0.75h)",
        "position": 5,
        "lessons": [
          {
            "id": "les_aif_04_01",
            "section_id": "sec_aif_04",
            "title": "4.1 Written Lesson: AI in Society, 5 Risks & Responsible-Use Checklist",
            "type": "article",
            "summary": "Explore AI in health, banking, transport, entertainment, and education; five key societal risks (including energy use); the 5-point Responsible-Use Checklist; and where to go next.",
            "content": "> **What you will learn:** Where AI is used across major industries, five major societal risks to watch for, and how to use a 5-point Responsible-Use Checklist in daily life.\n\n---\n\n### 1. AI Across Five Everyday Industries\n- **Health**: Spotting signs of disease in X-rays or retinal scans, and drafting clinical visit summaries.\n- **Banking**: Detecting stolen credit-card transactions in milliseconds and flagging unusual account activity.\n- **Transport**: Predicting live traffic delays, optimizing delivery routes, and powering driver-assistance features.\n- **Entertainment**: Recommending movies, music, and videos tailored to your taste, and generating game worlds.\n- **Education**: Offering personalized study practice, instant language translation, and accessibility tools like live captions.\n\n---\n\n### 2. Five Major Risks of AI in Society\n1. **Bias**: Models trained on skewed data can treat some groups unfairly in hiring, lending, or policing.\n2. **Privacy**: Cameras, voice assistants, and chatbots collect vast amounts of personal behavior and biometric data.\n3. **Deepfakes and Misinformation**: Realistic fake voices, photos, and videos make scams and political misinformation harder to spot.\n4. **Energy Use**: Training and running massive AI data centers requires large amounts of electricity and cooling water.\n5. **Changes to Jobs**: Routine writing, data entry, and customer-support tasks are shifting, making AI literacy essential for workers.\n\n---\n\n### 3. Reading: The 5-Point Responsible-Use Checklist\nBefore you use an AI tool for school, work, or personal life, check these five points:\n\n| # | Checklist Question | What Responsible Use Looks Like |\n| :--- | :--- | :--- |\n| **1** | **Purpose** | Is AI actually helpful here, or would a simple tool or human conversation be better? |\n| **2** | **What data I share** | Am I keeping passwords, private IDs, and confidential files out of the prompt? |\n| **3** | **How I verify** | Have I checked key facts, numbers, and citations against a trusted source? |\n| **4** | **Whether I disclose AI use** | If I am submitting work or publishing content, am I honest about how AI helped? |\n| **5** | **Where a human stays in the loop** | Does a human make the final decision—especially for health, money, hiring, or grading? |\n\n> **Diagram Alt Text:** *A five-row checklist table titled \"The 5-Point Responsible-Use Checklist,\" covering: 1. Purpose, 2. What data I share, 3. How I verify, 4. Whether I disclose AI use, and 5. Where a human stays in the loop.*\n\n---\n\n### 4. Where to Go Next in the REACTJav Catalog\nOnce you finish Course 1 (*AI Foundations*), you can continue your pathway without any overwhelm:\n- **Want to master writing clear prompts?** → *Prompt Engineering & AI Workflows*\n- **Want to understand how chatbots work inside?** → *Intro to Large Language Models (LLM)*\n- **Want to build websites or code with AI?** → *Web Design with AI* or *Coding with AI*\n- **Want to explore machine learning deeper?** → *Machine Learning Essentials*\n\n---\n\n> **Key takeaways:**\n> - AI powers real systems in health, banking, transport, entertainment, and education.\n> - Five key societal risks are **bias**, **privacy**, **deepfakes/misinformation**, **energy use**, and **changes to jobs**.\n> - Use the **5-Point Responsible-Use Checklist** (purpose, data shared, verification, disclosure, human in the loop) before trusting AI.\n\n#### New Words\n| Term | Plain-Language Meaning |\n| :--- | :--- |\n| **Deepfake** | Realistic synthetic audio, photo, or video made by AI to imitate a real person. |\n| **Human in the Loop** | Keeping a person responsible for reviewing and making the final decision. |",
            "duration_seconds": 1200,
            "position": 1,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_04_02",
            "section_id": "sec_aif_04",
            "title": "4.2 Activity: “My Five Rules” (Write Your 5 Personal AI Rules)",
            "type": "article",
            "summary": "Draft five concrete personal rules for using AI responsibly in your daily life, work, and study.",
            "content": "> **What you will learn:** How to turn the 5-Point Responsible-Use Checklist into five clear personal rules you will actually follow.\n\n### Your Task (15 Minutes)\nIn your **Personal Study Notes** tab below, write **five personal rules** for how you will use AI from today onward. Each rule should be specific and actionable—not vague.\n\n#### Example Rules to Inspire Yours\n1. *\"I never share passwords, financial account numbers, or private documents with a public chatbot.\"*\n2. *\"I always verify dates, statistics, and citations from a chatbot against an official source before sharing them.\"*\n3. *\"I use AI to brainstorm and outline, never to submit work as my own without reviewing and disclosing when required.\"*\n4. *\"I never let AI make the final decision on health, legal, or hiring questions—a qualified human stays in the loop.\"*\n5. *\"I double-check unexpected voice calls or videos from family or banks to protect against deepfake scams.\"*",
            "duration_seconds": 900,
            "position": 2,
            "is_free_preview": false,
            "is_completed": false
          },
          {
            "id": "les_aif_04_03",
            "section_id": "sec_aif_04",
            "title": "4.3 Module 4 Knowledge Check (5 Questions from 10-Question Bank)",
            "type": "quiz",
            "summary": "5 questions randomly drawn from a 10-question Module 4 bank with instant feedback.",
            "duration_seconds": 600,
            "position": 3,
            "is_free_preview": false,
            "is_completed": false,
            "quiz_questions": [
              {
                "id": "q_aif_04_1",
                "lesson_id": "les_aif_04_03",
                "question": "Which five items make up the Responsible-Use Checklist?",
                "options": [
                  "Purpose, what data I share, how I verify, whether I disclose AI use, and where a human stays in the loop",
                  "Speed, font size, price, battery life, and color",
                  "Coding language, GPU brand, RAM size, monitor width, and Wi-Fi speed",
                  "Likes, shares, comments, subscribers, and views"
                ],
                "correct_option_index": 0,
                "explanation": "Responsible AI use checks purpose, data privacy, verification, transparency/disclosure, and human oversight.",
                "position": 1
              },
              {
                "id": "q_aif_04_2",
                "lesson_id": "les_aif_04_03",
                "question": "How is AI commonly used in banking today?",
                "options": [
                  "Flagging unusual or fraudulent card transactions in real time",
                  "Printing physical dollar bills at home",
                  "Replacing all bank vaults with chatbots",
                  "Deleting customer savings automatically"
                ],
                "correct_option_index": 0,
                "explanation": "Banks use ML models to spot unusual transaction patterns and stop fraud quickly.",
                "position": 2
              },
              {
                "id": "q_aif_04_3",
                "lesson_id": "les_aif_04_03",
                "question": "Why is \"energy use\" listed as a societal risk of modern AI?",
                "options": [
                  "Training and running large AI data centers consumes significant electricity and cooling water",
                  "AI chatbots drain smartphone screens even when turned off",
                  "AI models run on gasoline engines",
                  "AI prevents solar panels from working"
                ],
                "correct_option_index": 0,
                "explanation": "Large-scale AI training and inference require substantial data-center power and cooling.",
                "position": 3
              },
              {
                "id": "q_aif_04_4",
                "lesson_id": "les_aif_04_03",
                "question": "What does keeping a \"human in the loop\" mean?",
                "options": [
                  "A person reviews AI outputs and retains responsibility for final high-stakes decisions",
                  "Wiring a human to a computer monitor",
                  "Letting AI approve loans and medical treatments with zero human review",
                  "Asking a chatbot to grade itself"
                ],
                "correct_option_index": 0,
                "explanation": "Human-in-the-loop means humans stay accountable for judgment and final decisions.",
                "position": 4
              },
              {
                "id": "q_aif_04_5",
                "lesson_id": "les_aif_04_03",
                "question": "What is a \"deepfake\"?",
                "options": [
                  "Realistic AI-generated audio, image, or video that imitates a real person",
                  "A deep ocean submarine sensor",
                  "A broken keyboard key",
                  "A password longer than 16 characters"
                ],
                "correct_option_index": 0,
                "explanation": "Deepfakes use generative AI to mimic real people’s faces or voices, raising scam and misinformation risks.",
                "position": 5
              },
              {
                "id": "q_aif_04_6",
                "lesson_id": "les_aif_04_03",
                "question": "How is AI used constructively in healthcare?",
                "options": [
                  "Assisting doctors in spotting patterns on X-rays or retinal scans and summarizing notes",
                  "Replacing all doctors with unverified chatbots",
                  "Publishing private patient charts on social media",
                  "Guessing prescriptions without medical data"
                ],
                "correct_option_index": 0,
                "explanation": "AI assists clinicians with pattern detection and paperwork while doctors make clinical decisions.",
                "position": 6
              },
              {
                "id": "q_aif_04_7",
                "lesson_id": "les_aif_04_03",
                "question": "Why should you disclose AI use when required by a workplace, school, or publication?",
                "options": [
                  "Transparency builds trust and lets readers know how content was created and verified",
                  "Because AI models charge a fine otherwise",
                  "To make the document longer",
                  "Because computers cannot save files without a disclosure"
                ],
                "correct_option_index": 0,
                "explanation": "Honest disclosure supports accountability and academic/professional integrity.",
                "position": 7
              },
              {
                "id": "q_aif_04_8",
                "lesson_id": "les_aif_04_03",
                "question": "How is AI affecting jobs and careers?",
                "options": [
                  "Routine tasks are shifting, making AI literacy and human judgment more valuable across roles",
                  "Every single human job will vanish tomorrow",
                  "AI has zero impact on office or creative work",
                  "Only rocket scientists need to understand AI"
                ],
                "correct_option_index": 0,
                "explanation": "AI reshapes tasks within jobs, rewarding people who know how to use and verify AI responsibly.",
                "position": 8
              },
              {
                "id": "q_aif_04_9",
                "lesson_id": "les_aif_04_03",
                "question": "Which personal rule best protects your privacy when using chatbots?",
                "options": [
                  "I never paste passwords, IDs, or private documents into a public chatbot",
                  "I always use my full legal name and SSN in every prompt",
                  "I share my company’s private client list so the AI gives better advice",
                  "I post my chatbot transcripts publicly"
                ],
                "correct_option_index": 0,
                "explanation": "Keeping private and sensitive data out of public AI tools is the #1 privacy habit.",
                "position": 9
              },
              {
                "id": "q_aif_04_10",
                "lesson_id": "les_aif_04_03",
                "question": "How can AI improve accessibility in education?",
                "options": [
                  "By providing live text captions, translation, and personalized practice",
                  "By removing all teachers from schools",
                  "By making fonts smaller and harder to read",
                  "By blocking students from reading books"
                ],
                "correct_option_index": 0,
                "explanation": "AI powers translation, captions, and adaptive practice that help diverse learners.",
                "position": 10
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
            "title": "5.1 Lab Part A (35m): Train a 3-Category Image Classifier & Skew Test",
            "type": "article",
            "summary": "Use Google Teachable Machine (webcam or ready-made image set) to train a 3-category image classifier with 20–30 samples each, then intentionally skew one category and observe how errors change.",
            "implementation_tip": "No webcam? Download our ready-made image set (Pen, Mug, Phone — 25 photos each + dim-light test folder) using the Upload option in Teachable Machine!",
            "content": "> **What you will learn:** Hands-on proof of how training data variety—and skewed data—directly controls what an AI model learns and where it fails.\n\n### Part A: Train an Image Classifier (35 Minutes)\n**Tool:** Google Teachable Machine (`teachablemachine.withgoogle.com`) — free, browser-based, no login required.\n\n1. **Create 3 Categories**:\n   - Choose 3 everyday objects (for example: **Pen**, **Mug**, **Phone**) or 3 hand gestures (for example: **Thumbs Up**, **Open Palm**, **Fist**).\n2. **Collect 20–30 Samples per Category**:\n   - **With a Webcam**: Hold each object at slightly different angles and distances while recording 20–30 samples per class.\n   - **No Webcam? (Ready-Made Image Set Option)**: Click *Upload* in Teachable Machine and upload 20–30 images per category from the provided **Ready-Made Image Set** resource below.\n3. **Train & Test**:\n   - Click **Train Model** (takes ~15 seconds in your browser).\n   - Test all 3 objects in normal light and record your accuracy in your **Personal Study Notes**.\n4. **Intentionally Skew One Category**:\n   - Delete the varied samples for **one** category (e.g., Mug) and re-record all 25 samples **in dim light or from only one fixed angle**.\n   - Retrain the model and test that object again in bright light or from a different angle.\n   - **Observe & Record**: Watch how the confidence bars jump to the wrong category! That is *\"Garbage in, garbage out\"* happening live in front of you.",
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
            "title": "5.2 Lab Part B (20m) & Part C (5m): Probe a Chatbot & Debrief Worksheet",
            "type": "article",
            "summary": "Test a chatbot with three question types (well-known fact, obscure/tricky question, request for sources) and complete the 3-prompt Debrief Worksheet.",
            "content": "> **What you will learn:** How a chatbot behaves on easy facts vs. tricky prompts vs. citation requests—and how to record your findings for the Authentic Assessment.\n\n### Part B: Probe a Chatbot with Three Question Types (20 Minutes)\nOpen any free chatbot and ask **these three specific question types**, saving screenshots or notes for your Authentic Assessment:\n1. **Question 1 — A Well-Known Fact**:\n   - Example: *\"In plain language, what is the difference between Machine Learning and traditional rule-based programming?\"*\n   - Check the reply against Module 1.\n2. **Question 2 — An Obscure or Tricky Question**:\n   - Example: *\"Summarize the 2025 Supreme Court case 'United States v. NeuralNet Corp' and quote the dissenting opinion.\"* (Or a tricky local/obscure fact.)\n   - Check whether the chatbot invents details or admits it does not know.\n3. **Question 3 — A Request for Sources**:\n   - Example: *\"Give me 3 peer-reviewed studies on AI bias in healthcare with exact article titles, authors, and links.\"*\n   - Search each title and link yourself to confirm whether the sources actually exist and say what the chatbot claims!\n\n---\n\n### Part C: Debrief Worksheet (5 Minutes)\nIn your **Personal Study Notes** tab below, answer these **three prompts**:\n1. **What the model learned**: In Part A, what visual clues did your image classifier seem to rely on?\n2. **What caused errors**: How did skewing one category (dim light / one angle) or asking a tricky chatbot prompt cause errors?\n3. **What surprised you**: What was the biggest surprise from testing both tools hands-on?",
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
            "title": "7.2 Post-Check: Retake the 10-Question Check to Measure Growth",
            "type": "quiz",
            "summary": "Retake the exact 10 questions from the Orientation Pre-Check to see how much your understanding of AI has grown!",
            "duration_seconds": 600,
            "position": 2,
            "is_free_preview": false,
            "is_completed": false,
            "quiz_questions": [
              {
                "id": "q_aif_post_1",
                "lesson_id": "les_aif_07_02",
                "question": "Which statement best describes the relationship between Artificial Intelligence (AI) and Machine Learning (ML)?",
                "options": [
                  "Machine Learning is a subset of AI where systems learn patterns from data instead of following only hand-coded rules",
                  "AI and Machine Learning are completely unrelated fields",
                  "AI is a small subset inside Machine Learning",
                  "Machine Learning only works on physical robots, never on software"
                ],
                "correct_option_index": 0,
                "explanation": "AI is the broad umbrella; Machine Learning is a major approach inside AI that learns patterns from examples.",
                "position": 1
              },
              {
                "id": "q_aif_post_2",
                "lesson_id": "les_aif_07_02",
                "question": "Which everyday tool is an example of AI rather than a simple fixed-rule program?",
                "options": [
                  "A pocket calculator adding 2 + 2",
                  "A grocery store automatic sliding door",
                  "An email spam filter that adapts to new scam messages",
                  "A mechanical washing machine timer"
                ],
                "correct_option_index": 2,
                "explanation": "A spam filter learns patterns from millions of emails to classify new messages, whereas calculators and timers follow fixed rules.",
                "position": 2
              },
              {
                "id": "q_aif_post_3",
                "lesson_id": "les_aif_07_02",
                "question": "In Machine Learning, what is a \"model\"?",
                "options": [
                  "A human actor hired to demonstrate software",
                  "The finished pattern-recognition system produced after training on data",
                  "A physical 3D-printed microchip",
                  "The internet browser used to open a website"
                ],
                "correct_option_index": 1,
                "explanation": "During training, an algorithm learns from data to build a model—a mathematical recipe that makes predictions on new inputs.",
                "position": 3
              },
              {
                "id": "q_aif_post_4",
                "lesson_id": "les_aif_07_02",
                "question": "What does \"Garbage in, garbage out\" mean in AI?",
                "options": [
                  "AI systems clean up messy computer hard drives automatically",
                  "If training data is incomplete, inaccurate, or skewed, the AI model will make poor or biased predictions",
                  "Computers need to be recycled every year",
                  "AI only works when given random numbers"
                ],
                "correct_option_index": 1,
                "explanation": "An AI model can only learn from the examples it is given. Flawed or unrepresentative data leads to flawed predictions.",
                "position": 4
              },
              {
                "id": "q_aif_post_5",
                "lesson_id": "les_aif_07_02",
                "question": "How does a Large Language Model (LLM) like ChatGPT or Gemini generate its replies?",
                "options": [
                  "By looking up verified answers in a locked encyclopedia",
                  "By thinking consciously with human feelings",
                  "By predicting the most statistically likely next word (or token) based on patterns in its training text",
                  "By asking a human worker to type every reply live"
                ],
                "correct_option_index": 2,
                "explanation": "LLMs are next-token prediction engines trained on vast text datasets, not conscious minds or fact-checked databases.",
                "position": 5
              },
              {
                "id": "q_aif_post_6",
                "lesson_id": "les_aif_07_02",
                "question": "What is an AI \"hallucination\"?",
                "options": [
                  "A computer screen flickering due to low battery",
                  "When a chatbot confidently invents false facts, quotes, or sources that sound plausible",
                  "When an image generator uses bright colors",
                  "A virus that deletes files"
                ],
                "correct_option_index": 1,
                "explanation": "Because chatbots predict plausible-sounding words, they can fabricate details or citations with high confidence.",
                "position": 6
              },
              {
                "id": "q_aif_post_7",
                "lesson_id": "les_aif_07_02",
                "question": "If a chatbot gives you a confident answer with an academic citation, what should you do before relying on it?",
                "options": [
                  "Trust it immediately because citations cannot be faked",
                  "Confirm that the source actually exists and says what the chatbot claims",
                  "Ask the same chatbot \"Are you sure?\" and accept its reply",
                  "Assume any long answer is 100% accurate"
                ],
                "correct_option_index": 1,
                "explanation": "Always cross-check and verify that cited sources exist and support the claim.",
                "position": 7
              },
              {
                "id": "q_aif_post_8",
                "lesson_id": "les_aif_07_02",
                "question": "Which type of information should you NEVER paste into a public AI chatbot?",
                "options": [
                  "A request to brainstorm dinner ideas",
                  "Passwords, private medical records, or confidential customer data",
                  "A public news headline to summarize",
                  "A general question about world history"
                ],
                "correct_option_index": 1,
                "explanation": "Never share passwords, personal IDs, or private/confidential documents with public AI tools.",
                "position": 8
              },
              {
                "id": "q_aif_post_9",
                "lesson_id": "les_aif_07_02",
                "question": "True or False: Today’s AI systems are conscious and understand the world the same way humans do.",
                "options": [
                  "True — modern chatbots have real feelings and self-awareness",
                  "False — AI systems process mathematical patterns without consciousness or true understanding"
                ],
                "correct_option_index": 1,
                "explanation": "AI can simulate fluent conversation, but it has no consciousness, beliefs, or lived understanding.",
                "position": 9
              },
              {
                "id": "q_aif_post_10",
                "lesson_id": "les_aif_07_02",
                "question": "What is an example of Algorithmic Bias?",
                "options": [
                  "A face-recognition tool performing worse for people underrepresented in its training photos",
                  "A laptop running faster when plugged into power",
                  "A user preferring dark mode over light mode",
                  "A spreadsheet sorting numbers from smallest to largest"
                ],
                "correct_option_index": 0,
                "explanation": "When training data underrepresents certain groups, the resulting model often makes more errors for those groups.",
                "position": 10
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

