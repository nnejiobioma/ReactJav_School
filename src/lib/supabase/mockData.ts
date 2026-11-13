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
    id: 'crs_ai_basics_02',
    instructor_id: 'usr_instructor_001',
    title: 'AI Foundations: Getting Started with AI',
    slug: 'ai-basics-getting-started-with-ai',
    previous_slugs: ['ai-foundations', 'data-analytics-career-accelerator'],
    description: 'After this course, anyone can explain what AI is, how it learns, what it can and can’t do, and how to use it responsibly. Features 4 structured modules with question-bank knowledge checks, a 1-hour no-code Guided Lab, and the 2-hour “AI in My Life” Authentic Assessment with Open Badge credentials.',
    category: 'AI Foundations',
    track: 'AI Foundations',
    level: 'Beginner',
    outcome_hook: 'After this course, anyone can explain what AI is, how it learns, what it can and can’t do, and how to use it responsibly.',
    duration_weeks: 1,
    weekly_hours: '7 hours total (No Coding | No Prerequisites)',
    skills: [
      'AI vs. ML vs. DL vs. GenAI',
      'How AI Learns from Data',
      'Everyday AI Systems Audit',
      'LLM Hallucination Verification',
      'Responsible AI & Ethics',
      'No-Code Image Classification',
    ],
    sponsorship_note: 'Fully Funded / Free Access (No-Login Tools)',
    is_now_open: true,
    is_popular: true,
    cohort_date: 'Self-Paced (7 Hours)',
    price: 0.00,
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    created_at: '2026-03-05T10:00:00Z',
    enrollments_count: 6320,
    average_rating: 4.95,
    reviews_count: 890,
    instructor: DEFAULT_INSTRUCTOR_PROFILE,
    sections: [
      {
        id: 'sec_aif_00',
        course_id: 'crs_ai_basics_02',
        title: 'Segment 1: Orientation and Self-Check (0.5h)',
        position: 1,
        lessons: [
          {
            id: 'les_aif_00_01',
            section_id: 'sec_aif_00',
            title: '0.1 Course Map, Learning Outcomes, Grading & Core Glossary',
            type: 'article',
            summary: 'Welcome to AI Foundations! Review the 7-hour course map, the 5 core learning outcomes, the mixed-model grading structure (70% to pass, 90% for Distinction), and the foundational glossary of AI terms.',
            implementation_tip: 'Bookmark the Glossary of Key Terms in this lesson—your Authentic Assessment explainer is automatically checked for at least 5 of these core terms.',
            content: `### Welcome to Course 1: AI Foundations
**Level:** Beginner | **Length:** 7 Hours | **Coding Required:** None | **Prerequisites:** None

> **Course Promise:** *After this course, anyone can explain what AI is, how it learns, what it can and can’t do, and how to use it responsibly.*

---

### Learning Outcomes
By the end of this course, you will be able to:
1. **Define AI** and distinguish between Artificial Intelligence (AI), Machine Learning (ML), Deep Learning (DL), and Generative AI (GenAI).
2. **Explain in plain language** how an AI system learns from data to make predictions.
3. **Identify AI systems in everyday life** and describe their inputs, outputs, benefits, and risks.
4. **Describe what large language models (LLMs) do well**, where they fail (hallucinations, bias), and how to check their output.
5. **Make informed decisions** about when and how to use AI responsibly.

---

### 7-Hour Course Time Plan
| Segment | Time | What You Will Do |
| :--- | :--- | :--- |
| **Orientation & Self-Check** | **0.5h (30m)** | Course map, a short "What do I already know?" quiz, and a glossary of key terms |
| **Module 1: What is AI?** | **0.75h (45m)** | Short history, definitions, the AI/ML/DL/GenAI map, common myths + Activity + 5-Question Check |
| **Module 2: How AI Learns** | **0.75h (45m)** | Data, training, models, prediction, and why data quality matters, with simple analogies + Activity + 5-Question Check |
| **Module 3: Generative AI & Chatbots** | **0.75h (45m)** | How LLMs generate text and images, strengths, limits, hallucinations + Activity + 5-Question Check |
| **Module 4: AI in Society** | **0.75h (45m)** | Everyday and industry uses, bias, privacy, jobs and careers, where to go next + Activity + 5-Question Check |
| **Guided Lab** | **1.0h (60m)** | Train a simple image classifier with a free no-code tool, then test a chatbot on easy and tricky questions |
| **Authentic Assessment** | **2.0h (120m)** | **"AI in My Life" Audit** (5 systems audit, 3-question hallucination test, plain-language explainer or model card critique, and reflection) |
| **Reflection & Review** | **0.5h (30m)** | Short reflection, feedback survey, Certificate of Completion, and Open Badge |

*Each of the 4 core modules follows the same predictable rhythm: a **Reading**, a **Short Activity**, and a **5-Question Knowledge Check** with instant feedback drawn from a randomized question bank.*

---

### Mixed-Model Grading & Credentials
Your grade combines **Automated Checks (50%)** and a **4-Level Rubric (50%)**:
- **Automated Checks (50% total)**:
  - **Module Knowledge Checks (25%)**: Drawn from a module question bank so retakes vary.
  - **Submission Validation (25%)**: Confirms all 5 everyday AI systems have every field filled, the hallucination test includes screenshot references and a verification note, glossary terms appear in your explainer, and your explainer & reflection meet length/duration limits.
- **4-Level Rubric (50% total — Beginning, Developing, Proficient, Advanced)**:
  - **Accuracy of AI concepts**: Definitions and explanations are correct, with AI/ML/GenAI distinctions clear.
  - **Clarity for the audience**: A non-technical reader could understand the explainer without extra help.
  - **Critical thinking about risks**: Risks are specific to each system, not generic, and verification of chatbot output is credible.
  - **Reflection**: Connects learning to personal decisions about future AI use.
- **Pass Rule**: Score **70% or higher in BOTH** the automated and rubric components (students who fall short can revise and resubmit).
- **Certificate with Distinction**: Score **90% or higher in BOTH** components.
- **Credentials Earned**:
  - **Certificate**: *"AI Foundations: Certificate of Completion"*
  - **Open Badge**: *"AI Foundations"* Open Badge v3.0 containing your verified skills and assessment evidence metadata for LinkedIn or your CV.

---

### Glossary of Key Terms
1. **Artificial Intelligence (AI)**: Any computer system designed to perform tasks that typically require human intelligence—such as recognizing speech, making decisions, translating languages, or spotting visual patterns.
2. **Algorithm**: A step-by-step set of rules or mathematical instructions a computer follows to solve a problem or make a calculation.
3. **Machine Learning (ML)**: A subset of AI where computers learn patterns from data examples rather than following hand-written \`if/then\` rules programmed by humans.
4. **Training Data**: The collection of examples (text, photos, numbers, audio) fed into a machine learning algorithm so it can discover patterns.
5. **Training**: The process where an algorithm adjusts its internal mathematical settings over thousands or millions of examples to minimize errors.
6. **Model**: The finished mathematical "engine" produced after training is complete, capable of making predictions on brand-new inputs.
7. **Prediction (Inference)**: The output a trained AI model produces when given a new input it hasn't seen before (e.g., predicting whether an email is spam, or predicting the next word in a sentence).
8. **Deep Learning (DL)**: A specialized subset of Machine Learning inspired by the human brain's structure, using multi-layered **Artificial Neural Networks** to learn complex patterns from massive datasets (like raw images, voice, and natural language).
9. **Generative AI (GenAI)**: A subset of Deep Learning that creates *brand-new* content—such as text, images, audio, or video—rather than simply classifying or labeling existing data.
10. **Large Language Model (LLM)**: A Generative AI system trained on vast amounts of text that generates human-like writing by predicting the most statistically likely next word (token) in a sequence.
11. **Token**: A chunk of text (roughly three-quarters of a word, a whole word, or a punctuation mark) that an LLM reads and generates one step at a time.
12. **Hallucination**: When a Generative AI model confidently fabricates false facts, nonexistent quotes, or fake citations because those words sound statistically plausible together.
13. **Algorithmic Bias**: Systematic and unfair errors in an AI system's output caused by unrepresentative, skewed, or historically prejudiced training data.
14. **Model Card**: A standardized documentation sheet published alongside an AI model that transparently explains what data it was trained on, its intended uses, its known limitations, and its safety evaluations.`,
            duration_seconds: 1200,
            position: 1,
            is_free_preview: true,
            is_completed: false,
            resources: [
              {
                id: 'res_aif_glossary',
                name: 'AI_Foundations_Glossary_and_Course_Map.txt',
                size: '24 KB',
                type: 'TXT',
                description: 'Complete AI Foundations Glossary (14 key terms), 7-hour study planner, and mixed-model grading checklist.',
              },
            ],
          },
          {
            id: 'les_aif_00_02',
            section_id: 'sec_aif_00',
            title: '0.2 Self-Check: “What Do I Already Know?” Diagnostic Quiz',
            type: 'quiz',
            duration_seconds: 600,
            position: 2,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_aif_00_1',
                lesson_id: 'les_aif_00_02',
                question: 'Which statement best describes the relationship between Artificial Intelligence (AI), Machine Learning (ML), and Generative AI?',
                options: [
                  'Machine Learning is a subset of AI, and Generative AI is a specialized subset within Machine Learning and Deep Learning',
                  'Generative AI was invented in the 1950s and Machine Learning was invented in 2022',
                  'AI, Machine Learning, and Generative AI are three completely unrelated technologies',
                  'All AI systems are chatbots that generate text',
                ],
                correct_option_index: 0,
                explanation: 'Think of them as nesting dolls: AI is the broadest field, Machine Learning is a subset that learns from data, Deep Learning uses neural networks inside ML, and Generative AI is a subset of Deep Learning that creates new content.',
                position: 1,
              },
              {
                id: 'q_aif_00_2',
                lesson_id: 'les_aif_00_02',
                question: 'How does a Machine Learning spam filter learn to block unwanted emails?',
                options: [
                  'By analyzing thousands of example emails labeled "spam" or "not spam" to discover statistical patterns',
                  'A human employee reads every incoming email in real time before it reaches your inbox',
                  'It understands human emotions and feels annoyed by sales pitches',
                  'It blocks all emails that contain more than 50 words',
                ],
                correct_option_index: 0,
                explanation: 'Machine learning systems learn from training data—in this case, thousands of historical emails labeled spam or legitimate—to predict how to classify new messages.',
                position: 2,
              },
              {
                id: 'q_aif_00_3',
                lesson_id: 'les_aif_00_02',
                question: 'In the context of chatbots and Large Language Models (LLMs), what is a "hallucination"?',
                options: [
                  'When the AI confidently generates false or fabricated information that sounds believable',
                  'When the computer screen flickers due to a graphics card bug',
                  'When an AI model becomes self-aware and dreams',
                  'When a user types a typo into the chat box',
                ],
                correct_option_index: 0,
                explanation: 'Because LLMs predict the next plausible-sounding word rather than looking up verified facts in a database, they can invent fake facts, dates, or citations with complete confidence.',
                position: 3,
              },
              {
                id: 'q_aif_00_4',
                lesson_id: 'les_aif_00_02',
                question: 'Which of the following everyday tools relies on AI to personalize its output for you?',
                options: [
                  'All of these: video streaming recommendations, GPS traffic routing, and phone face unlock',
                  'A standard pocket calculator multiplying 12 by 15',
                  'A static printed restaurant menu',
                  'A basic kitchen timer counting down 5 minutes',
                ],
                correct_option_index: 0,
                explanation: 'Streaming recommendations, live GPS route prediction, and biometric face recognition all use trained machine learning models to make predictions from data.',
                position: 4,
              },
              {
                id: 'q_aif_00_5',
                lesson_id: 'les_aif_00_02',
                question: 'Which practice is essential when using a public AI chatbot for work or study?',
                options: [
                  'Never paste sensitive personal data (like medical records, passwords, or private client info) and always verify important factual claims',
                  'Trust every citation and statistic the chatbot provides without checking outside sources',
                  'Share your private banking passwords so the chatbot can verify your identity',
                  'Copy and paste AI outputs directly as legal or medical advice',
                ],
                correct_option_index: 0,
                explanation: 'Responsible AI use requires protecting private data and keeping a human in the loop to verify facts, citations, and high-stakes decisions.',
                position: 5,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_aif_01',
        course_id: 'crs_ai_basics_02',
        title: 'Module 1: What is AI? (0.75h)',
        position: 2,
        lessons: [
          {
            id: 'les_aif_01_01',
            section_id: 'sec_aif_01',
            title: '1.1 Reading: Short History, Definitions, the AI/ML/DL/GenAI Map & Common Myths',
            type: 'article',
            summary: 'Explore the 70-year journey of Artificial Intelligence, master the nesting-doll map of AI, Machine Learning, Deep Learning, and Generative AI, and separate science-fiction myths from real-world technology.',
            implementation_tip: 'When explaining AI to a non-technical friend, use the Russian nesting-doll analogy: AI is the outer doll, Machine Learning is inside it, Deep Learning is inside ML, and Generative AI is the innermost doll.',
            content: `### Module 1 Reading: What is Artificial Intelligence?

#### 1. A Plain-Language Definition of AI
**Artificial Intelligence (AI)** is an umbrella term for any computer software that performs tasks that previously required human intelligence—such as recognizing faces, translating spoken languages, spotting fraud, or drafting an email.

Crucially, **not all software is AI**:
- **Traditional Rule-Based Software (Not AI / Classic Automation)**: A payroll spreadsheet that calculates \`Hours Worked × Hourly Rate = Paycheck\` is following strict, fixed formulas written by a human programmer. It never adapts or learns from experience.
- **AI Systems**: Systems that either apply complex decision logic or—in almost all modern AI—**learn patterns directly from data** so they can handle messy, real-world inputs (like a blurry photo of a stop sign in the rain).

---

#### 2. A Short History of AI: From Rules to Generative AI
- **1950s – The Birth of AI**: Alan Turing proposes the famous question *"Can machines think?"* (1950), and John McCarthy coins the term **"Artificial Intelligence"** at the 1956 Dartmouth Workshop. Early pioneers believed human-level AI was just a decade away.
- **1960s–1980s – Symbolic AI ("Good Old-Fashioned AI") & AI Winters**: Early AI relied on **Expert Systems**—thousands of hand-written \`IF/THEN\` rules crafted by human doctors or engineers. When these brittle rulebooks failed to handle the messy real world, funding dried up during periods known as **AI Winters**.
- **1990s–2000s – The Rise of Machine Learning**: Instead of writing rules by hand, researchers fed large datasets into statistical algorithms so computers could discover patterns themselves. In 1997, IBM's Deep Blue defeated world chess champion Garry Kasparov.
- **2010s – The Deep Learning Revolution**: Powered by massive internet datasets and fast graphics chips (GPUs), multi-layered **Artificial Neural Networks (Deep Learning)** achieved breakthroughs in image recognition, voice assistants (Siri, Alexa), and real-time translation.
- **2020s – Generative AI Goes Mainstream**: With the invention of the **Transformer** architecture (2017) and the launch of consumer chatbots and image generators, AI shifted from merely *classifying* existing data to *generating* brand-new essays, code, art, and audio.

---

#### 3. The AI / ML / DL / GenAI Map (The 4 Concentric Circles)
People often use "AI," "Machine Learning," and "ChatGPT" as if they mean the exact same thing. In reality, they fit inside one another like four concentric circles:

\`\`\`
+-------------------------------------------------------------------+
| 1. ARTIFICIAL INTELLIGENCE (AI)                                   |
|    Any system that mimics human tasks (including rule systems)    |
|  +-------------------------------------------------------------+  |
|  | 2. MACHINE LEARNING (ML)                                    |  |
|  |    Systems that learn statistical patterns from DATA        |  |
|  |    (e.g., Spam filters, Netflix recommendations, Fraud)     |  |
|  |  +-------------------------------------------------------+  |  |
|  |  | 3. DEEP LEARNING (DL)                                 |  |  |
|  |  |    ML using multi-layered Neural Networks             |  |  |
|  |  |    (e.g., Face ID, Medical scan diagnostics, Voice)   |  |  |
|  |  |  +-------------------------------------------------+  |  |  |
|  |  |  | 4. GENERATIVE AI (GenAI)                        |  |  |  |
|  |  |  |    DL models that CREATE new text, images, code |  |  |  |
|  |  |  |    (e.g., ChatGPT, Claude, Gemini, Midjourney)  |  |  |  |
|  |  |  +-------------------------------------------------+  |  |  |
|  |  +-------------------------------------------------------+  |  |
|  +-------------------------------------------------------------+  |
+-------------------------------------------------------------------+
\`\`\`

---

#### 4. Busting 4 Common Myths About AI
| Common Myth | The Reality |
| :--- | :--- |
| **Myth 1: "AI thinks and feels like a human brain."** | **Reality:** AI has zero consciousness, feelings, beliefs, or intentions. It is a high-speed mathematical pattern-matching engine. |
| **Myth 2: "All AI is Generative AI (like ChatGPT)."** | **Reality:** Most AI you interact with daily is *predictive* or *classification* ML—like credit card fraud alerts, GPS route timing, and spam filters—not chatbots. |
| **Myth 3: "Because AI uses math, it is 100% objective and unbiased."** | **Reality:** AI learns from human-created data. If historical data contains human biases or gaps, the AI will learn and amplify those exact biases. |
| **Myth 4: "AI is always right if it sounds confident."** | **Reality:** Generative AI is designed to produce fluent, confident-sounding language even when it is completely guessing (**hallucinating**). |

---

#### Accessible Video Companion Transcript (Captions & Audio Text)
> **[Transcript – "The 3-Minute Map of AI"]**: *"Imagine teaching a child to recognize a dog. You don't hand them a geometry textbook measuring ear angles; you show them hundreds of dogs at the park until they spot the pattern. That shift—from rigid rulebooks to learning from examples—is how modern Machine Learning works..."*`,
            duration_seconds: 1200,
            position: 1,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_aif_01_02',
            section_id: 'sec_aif_01',
            title: '1.2 Short Activity: Sorting Everyday Tech & Myth-Busting Scenarios',
            type: 'article',
            summary: 'Hands-on 15-minute classification activity: sort 6 real-world tools into Traditional Software, Predictive Machine Learning, Deep Learning, or Generative AI.',
            implementation_tip: 'Ask yourself two questions to classify any tool: (1) Did it learn from data examples, or does it follow fixed rules? (2) Does it output a label/score (Predictive ML) or create brand-new content (Generative AI)?',
            content: `### Module 1 Short Activity (15 Minutes): Sort the Technology!

Before taking the Module 1 Knowledge Check, complete this quick sorting exercise in your study notes or mentally check your answers against the key below.

#### Part A: Which Circle on the Map Does Each Tool Belong To?
For each of the 6 tools below, decide whether it is:
- **(A) Traditional Rule-Based Software (Not AI)**
- **(B) Predictive / Classification Machine Learning (ML)**
- **(C) Deep Learning (DL) for Perception**
- **(D) Generative AI (GenAI)**

1. **A digital thermostat set to turn on the heater whenever the room drops below 68°F (20°C).**
2. **Your bank's fraud detector that flags an unusual card swipe in another country based on millions of past transactions.**
3. **A smartphone camera feature that unlocks the screen by recognizing your 3D facial features even when you wear glasses.**
4. **An AI assistant that writes a 3-paragraph cover letter and creates a custom illustration from a text prompt.**
5. **An Excel spreadsheet formula \`=SUM(A1:A50)\` that totals your monthly grocery receipts.**
6. **A music app's "Discover Weekly" playlist that predicts which songs you'll enjoy based on listening patterns of millions of users.**

---

#### Part B: Instant Self-Check Answer Key
1. **Thermostat → (A) Traditional Rule-Based Software**: It follows a single fixed rule (\`IF temp < 68 THEN heat ON\`). It does not learn from data.
2. **Bank Fraud Detector → (B) Predictive Machine Learning**: It analyzes historical transaction data to output a probability score ("94% likely fraud").
3. **Smartphone Face Unlock → (C) Deep Learning**: It uses multi-layered neural networks to process raw pixel and depth sensor data.
4. **Cover Letter & Illustration Creator → (D) Generative AI**: It generates brand-new text and pixels that did not previously exist.
5. **Excel \`=SUM()\` Formula → (A) Traditional Rule-Based Software**: Pure deterministic arithmetic—no learning involved.
6. **Music Recommendation Engine → (B) Predictive Machine Learning**: It predicts which existing songs match your taste profile.`,
            duration_seconds: 900,
            position: 2,
            is_free_preview: true,
            is_completed: false,
          },
          {
            id: 'les_aif_01_03',
            section_id: 'sec_aif_01',
            title: '1.3 Module 1 Knowledge Check (5 Questions Drawn from Question Bank)',
            type: 'quiz',
            duration_seconds: 600,
            position: 3,
            is_free_preview: true,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_aif_01_1',
                lesson_id: 'les_aif_01_03',
                question: 'What is the key difference between traditional rule-based software and Machine Learning (ML)?',
                options: [
                  'Traditional software follows explicit rules written by programmers, while ML discovers patterns from example data',
                  'Traditional software only runs on desktop computers, while ML only runs on phones',
                  'Machine Learning never uses math, whereas traditional software uses math',
                  'Traditional software can write original poetry, while ML only adds numbers',
                ],
                correct_option_index: 0,
                explanation: 'In traditional programming, humans write the rules. In Machine Learning, humans provide example data and the algorithm learns the patterns.',
                position: 1,
              },
              {
                id: 'q_aif_01_2',
                lesson_id: 'les_aif_01_03',
                question: 'In the AI/ML/DL/GenAI map, how does Generative AI differ from traditional predictive Machine Learning?',
                options: [
                  'Generative AI creates brand-new content (text, images, audio), whereas predictive ML labels, scores, or classifies existing data',
                  'Generative AI was created in 1956, whereas predictive ML was created last year',
                  'Predictive ML requires no data at all, while Generative AI uses no electricity',
                  'Generative AI is the outer circle that contains all of computer science',
                ],
                correct_option_index: 0,
                explanation: 'Predictive ML answers questions like "Is this email spam?" (a label), while Generative AI creates new artifacts like an original paragraph or image.',
                position: 2,
              },
              {
                id: 'q_aif_01_3',
                lesson_id: 'les_aif_01_03',
                question: 'Which of the following is an example of Traditional Software (NOT Artificial Intelligence)?',
                options: [
                  'A spreadsheet formula that calculates 15% sales tax on a list of prices',
                  'A voice assistant transcribing your spoken words into a text message',
                  'An email filter that adapts to new types of phishing scams',
                  'A chatbot summarizing a 20-page PDF report',
                ],
                correct_option_index: 0,
                explanation: 'A fixed arithmetic formula (price × 0.15) does not learn from data or adapt to patterns—it is classic deterministic software.',
                position: 3,
              },
              {
                id: 'q_aif_01_4',
                lesson_id: 'les_aif_01_03',
                question: 'What is Deep Learning (DL)?',
                options: [
                  'A subset of Machine Learning that uses multi-layered artificial neural networks to learn complex patterns from large datasets',
                  'When a human student studies late at night for an exam',
                  'A database that stores files at the bottom of the ocean',
                  'Any computer program written before 1970',
                ],
                correct_option_index: 0,
                explanation: 'Deep Learning gets the word "deep" from the many stacked layers of artificial neural networks used to process complex inputs like images, audio, and text.',
                position: 4,
              },
              {
                id: 'q_aif_01_5',
                lesson_id: 'les_aif_01_03',
                question: 'Why did early "Expert Systems" of the 1970s and 1980s struggle with tasks like recognizing objects in photos?',
                options: [
                  'Because humans could not manually write enough IF/THEN rules to cover every lighting angle, background, and variation in the real world',
                  'Because cameras had not been invented yet',
                  'Because computers refused to follow IF/THEN rules',
                  'Because Expert Systems were only allowed to play chess',
                ],
                correct_option_index: 0,
                explanation: 'Real-world perception has too many variations for hand-coded rulebooks; it required Machine Learning and Deep Learning to learn visual features directly from millions of photos.',
                position: 5,
              },
              {
                id: 'q_aif_01_6',
                lesson_id: 'les_aif_01_03',
                question: 'Which statement accurately busts a common myth about Artificial Intelligence?',
                options: [
                  'AI does not possess human feelings, consciousness, or personal beliefs—it is a mathematical pattern-recognition system',
                  'Because AI runs on computers, its decisions are guaranteed to be 100% free of bias',
                  'If an AI chatbot states a fact in a confident tone, that fact is guaranteed to be true',
                  'Every AI system in the world is a Large Language Model',
                ],
                correct_option_index: 0,
                explanation: 'Even when an AI chatbot uses polite or conversational words like "I think," it has no consciousness or feelings—it is calculating statistical word patterns.',
                position: 6,
              },
              {
                id: 'q_aif_01_7',
                lesson_id: 'les_aif_01_03',
                question: 'When Netflix or YouTube recommends a video you might like, which category of AI is primarily at work?',
                options: [
                  'Machine Learning (specifically a recommendation/prediction model)',
                  'A 1970s hand-coded calculator',
                  'A human employee manually picking videos for your account',
                  'Hardware cooling automation',
                ],
                correct_option_index: 0,
                explanation: 'Recommendation engines use Machine Learning to analyze viewing histories and predict which existing videos you are most likely to watch next.',
                position: 7,
              },
              {
                id: 'q_aif_01_8',
                lesson_id: 'les_aif_01_03',
                question: 'Where was the term "Artificial Intelligence" first coined in 1956?',
                options: [
                  'At the Dartmouth Summer Research Project workshop led by John McCarthy and colleagues',
                  'At the launch of the first iPhone in 2007',
                  'During the release of ChatGPT in 2022',
                  'In an ancient Roman mathematics scroll',
                ],
                correct_option_index: 0,
                explanation: 'John McCarthy and fellow researchers coined "Artificial Intelligence" for the 1956 Dartmouth conference, launching AI as an academic field.',
                position: 8,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_aif_02',
        course_id: 'crs_ai_basics_02',
        title: 'Module 2: How AI Learns (0.75h)',
        position: 3,
        lessons: [
          {
            id: 'les_aif_02_01',
            section_id: 'sec_aif_02',
            title: '2.1 Reading: Data, Training, Models, Prediction & Why Data Quality Matters',
            type: 'article',
            summary: 'Understand the 4-stage lifecycle of how AI learns (Data → Training → Model → Prediction), compare Supervised, Unsupervised, and Reinforcement Learning using kitchen-table analogies, and see why data quality makes or breaks any AI system.',
            implementation_tip: 'Remember the Cooking Analogy: Training Data = raw ingredients, Training = practicing the recipe in the kitchen, the Model = the perfected recipe card, and Prediction = serving a dish to a new guest.',
            content: `### Module 2 Reading: How AI Learns from Data

#### 1. The 4-Step Loop of Machine Learning
How does a computer go from knowing nothing to recognizing speech or predicting housing prices? Every machine learning system follows a four-step pipeline:

1. **Data (The Examples)**: We gather thousands or millions of examples—such as past house sales (square footage, neighborhood, bedrooms, and final sale price) or labeled photos of cats and dogs.
2. **Training (Finding the Pattern)**: During **training**, the learning algorithm looks at the examples, makes an initial guess, checks how far off its guess was, and slightly adjusts its internal mathematical dials (**weights/parameters**). It repeats this millions of times until its guesses become highly accurate.
3. **Model (The Saved Pattern Engine)**: Once training finishes, we freeze those tuned mathematical dials into a file called a **Model**. Training takes massive time and computing power, but once the model is saved, it is ready to use.
4. **Prediction / Inference (Using the Model)**: When you give the trained **model** a brand-new input it has never seen before (e.g., a photo you just snapped with your phone), it runs the input through its learned patterns and outputs a **prediction** (e.g., *"98% Golden Retriever"*).

---

#### 2. A Simple Everyday Analogy: Learning to Spot Ripe Avocados
Imagine learning how to pick a ripe avocado at the grocery store:
- **Data**: Over a year, you squeeze 100 avocados (firmness, skin color, stem) and cut them open at home to see if they were unripe, perfect, or overripe.
- **Training**: Each time you cut one open, your brain updates its mental rule of thumb (*"Dark green with a gentle yield = ripe; mushy = overripe"*).
- **Model**: Your seasoned intuition after 100 avocados is your mental **model**.
- **Prediction**: Next Tuesday at the store, you pick up a brand-new avocado you've never seen before, feel its firmness, and **predict** it is ready for guacamole tonight.

---

#### 3. The Three Main Ways Machines Learn
| Learning Style | Simple Analogy | How It Works | Everyday Example |
| :--- | :--- | :--- | :--- |
| **1. Supervised Learning** | **Flashcards with an Answer Key** | Every training example comes with a human-verified **label** (the right answer). The AI learns to map inputs to labels. | Email spam filters (\`spam\` vs. \`not spam\`), medical X-ray classifiers. |
| **2. Unsupervised Learning** | **Sorting a Box of Mixed Lego Bricks without Instructions** | The data has **no labels**. The AI groups items together based on hidden similarities or spots unusual outliers. | Grouping shoppers with similar buying habits; spotting abnormal network traffic. |
| **3. Reinforcement Learning** | **Training a Puppy with Treats** | The AI learns by trial and error in an environment, receiving a **reward** (+1) for good moves and a **penalty** (-1) for mistakes. | Game-playing AI (AlphaGo), warehouse robotics, and tuning chatbots via human thumbs-up/thumbs-down feedback (RLHF). |

---

#### 4. Why Data Quality Matters: "Garbage In, Garbage Out"
An AI model is only as good as the data it learned from. Four common data traps cause AI models to fail in the real world:
1. **Too Little Data**: Training an image recognizer on only 5 photos of dogs means it will fail the moment it sees a different breed.
2. **Unrepresentative / Biased Data**: Imagine training a voice recognition system using only recordings of adults in quiet rooms. When a child speaks or someone uses it on a noisy bus, the system fails.
3. **Mislabeled Data**: If human annotators accidentally label blurry photos of muffins as Chihuahuas, the model learns the wrong pattern.
4. **Overfitting ("Memorizing the Practice Test")**: If a student memorizes the exact order of answers (*A, C, B, D*) on a practice sheet without understanding the math, they score 100% in practice but fail the real exam. When an AI memorizes noise in its training data instead of learning the real pattern, we call it **overfitting** (for example, an AI trained to spot wolves that only looks for *snow in the background* because every wolf photo in the training set happened to be taken in winter!).

---

#### Accessible Video Companion Transcript
> **[Transcript – "The Wolf in the Snow Trap"]**: *"In a famous computer vision experiment, researchers trained a model to tell Huskies apart from Wolves. It got 90% accuracy—until they inspected what the model actually looked at. Every wolf photo had snow in the background, and every husky photo was on grass. They hadn't built a wolf detector; they had accidentally built a snow detector! That is why diverse, high-quality training data matters..."*`,
            duration_seconds: 1200,
            position: 1,
            is_free_preview: false,
            is_completed: false,
          },
          {
            id: 'les_aif_02_02',
            section_id: 'sec_aif_02',
            title: '2.2 Short Activity: Spot the Dataset Flaw & Build Your Own Analogy',
            type: 'article',
            summary: 'Practice diagnosing why 3 flawed AI training datasets fail in the real world, and draft a plain-language analogy you can reuse in your Authentic Assessment.',
            implementation_tip: 'The plain-language analogy you draft in Part B of this activity can be pasted directly into Part 3 of your Authentic Assessment explainer!',
            content: `### Module 2 Short Activity (15 Minutes): Diagnose the Dataset Flaw

#### Part A: Why Did These 3 AI Models Fail?
Read each scenario below and identify: **(1) What was wrong with the training data?** and **(2) How would you fix it?**

- **Scenario 1 (The Sunny-Day Self-Driving Camera)**: A company trains a pedestrian-detection camera using 500,000 street photos taken exclusively in Phoenix, Arizona at noon in clear summer weather. When deployed in Seattle during a rainy November evening, the camera misses pedestrians holding umbrellas.
- **Scenario 2 (The Resume Screening Bot)**: A tech company trains an AI hiring tool on 10 years of past resumes hired by the company. Because 85% of past hires were men from three specific universities, the AI automatically downgrades qualified women and graduates from community colleges.
- **Scenario 3 (The Plant Disease App)**: A gardening app trains an AI to spot sick tomato leaves. All "sick leaf" photos were taken indoors on a white kitchen counter, while all "healthy leaf" photos were taken outdoors in soil. Users take photos of healthy leaves on their kitchen counter, and the app declares every single one diseased.

---

#### Answer Key for Part A
- **Scenario 1 Diagnosis**: **Unrepresentative Data (Lack of environmental diversity)**. Fix: Collect balanced training photos across rain, fog, snow, night glare, and diverse clothing/umbrellas.
- **Scenario 2 Diagnosis**: **Historical Bias in Training Data**. Fix: Audit and rebalance the training data, remove proxy features linked to gender or school prestige, and test outcomes across demographic groups.
- **Scenario 3 Diagnosis**: **Shortcut Learning / Spurious Correlation (Overfitting to the background)**. Just like the "Wolf in the Snow," the model learned \`White Counter = Sick\` instead of leaf spots! Fix: Photograph both healthy and sick leaves across identical indoor and outdoor backgrounds.

---

#### Part B: Draft Your 2-Sentence Plain-Language Analogy
In your **Personal Study Notes** tab below, write a 2-sentence analogy comparing **Data → Training → Model → Prediction** to an everyday skill (such as learning to bake bread, learning to hit a baseball, or learning a friend's handwriting). You will use this in your final explainer!`,
            duration_seconds: 900,
            position: 2,
            is_free_preview: false,
            is_completed: false,
          },
          {
            id: 'les_aif_02_03',
            section_id: 'sec_aif_02',
            title: '2.3 Module 2 Knowledge Check (5 Questions Drawn from Question Bank)',
            type: 'quiz',
            duration_seconds: 600,
            position: 3,
            is_free_preview: false,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_aif_02_1',
                lesson_id: 'les_aif_02_03',
                question: 'In Machine Learning, what is the difference between "Training" and "Prediction (Inference)"?',
                options: [
                  'Training is the process of learning patterns from example data; Prediction is using the finished model to evaluate a new, unseen input',
                  'Training happens after the user deletes the app; Prediction happens before any data is collected',
                  'Training and Prediction mean the exact same thing',
                  'Prediction requires rewriting the computer operating system by hand',
                ],
                correct_option_index: 0,
                explanation: 'During training, the algorithm learns from examples to build a model. During prediction (inference), the trained model is used on new inputs.',
                position: 1,
              },
              {
                id: 'q_aif_02_2',
                lesson_id: 'les_aif_02_03',
                question: 'Which learning method is like studying with flashcards where every training example has a verified "right answer" label attached?',
                options: [
                  'Supervised Learning',
                  'Unsupervised Learning',
                  'Reinforcement Learning',
                  'Manual Calculator Mode',
                ],
                correct_option_index: 0,
                explanation: 'Supervised learning trains a model on labeled examples (e.g., photos labeled "cat" or "dog") so it learns to predict labels for new inputs.',
                position: 2,
              },
              {
                id: 'q_aif_02_3',
                lesson_id: 'les_aif_02_03',
                question: 'An AI model trained to detect wolves vs. huskies accidentally learns to look only for snow in the background. What is this flaw called?',
                options: [
                  'Overfitting / learning a spurious shortcut from biased training data',
                  'Perfect generalization',
                  'Quantum encryption',
                  'Hardware overheating',
                ],
                correct_option_index: 0,
                explanation: 'When a model memorizes an accidental quirk of its training set (like snow in wolf photos) instead of the true subject, it overfits and fails on real-world photos.',
                position: 3,
              },
              {
                id: 'q_aif_02_4',
                lesson_id: 'les_aif_02_03',
                question: 'An online store uses AI to group millions of shoppers into clusters based on purchasing habits, without any pre-existing labels. What type of learning is this?',
                options: [
                  'Unsupervised Learning',
                  'Supervised Learning',
                  'Rule-based IF/THEN programming',
                  'Spell-checking',
                ],
                correct_option_index: 0,
                explanation: 'Discovering hidden groups or clusters in unlabeled data is the hallmark of Unsupervised Learning.',
                position: 4,
              },
              {
                id: 'q_aif_02_5',
                lesson_id: 'les_aif_02_03',
                question: 'How does Reinforcement Learning train an AI system?',
                options: [
                  'Through trial and error, receiving reward signals for desirable actions and penalties for mistakes',
                  'By only reading dictionary definitions in alphabetical order',
                  'By copying and pasting spreadsheets without feedback',
                  'By turning off the computer monitor',
                ],
                correct_option_index: 0,
                explanation: 'Reinforcement Learning agents interact with an environment and optimize their behavior to maximize cumulative rewards—just like training with treats.',
                position: 5,
              },
              {
                id: 'q_aif_02_6',
                lesson_id: 'les_aif_02_03',
                question: 'What does the phrase "Garbage In, Garbage Out" mean in AI development?',
                options: [
                  'If an AI is trained on inaccurate, biased, or low-quality data, its predictions will also be inaccurate or biased',
                  'AI models can only be used to sort recycling bins',
                  'Even if training data is completely wrong, a bigger computer chip will automatically fix all errors',
                  'You should delete your training data immediately after collecting it',
                ],
                correct_option_index: 0,
                explanation: 'Because ML models learn patterns directly from their training data, flawed or unrepresentative input data inevitably produces flawed outputs.',
                position: 6,
              },
              {
                id: 'q_aif_02_7',
                lesson_id: 'les_aif_02_03',
                question: 'In our cooking analogy for Machine Learning, what does the finished "Model" represent?',
                options: [
                  'The perfected recipe / trained mathematical engine that is ready to produce predictions on new inputs',
                  'The raw unwashed vegetables at the farm',
                  'The grocery store receipt',
                  'The kitchen sink',
                ],
                correct_option_index: 0,
                explanation: 'Training data is the raw ingredients, training is practicing in the kitchen, the Model is the perfected recipe, and prediction is serving the dish.',
                position: 7,
              },
              {
                id: 'q_aif_02_8',
                lesson_id: 'les_aif_02_03',
                question: 'If a voice assistant is trained only on recordings of adults speaking in quiet offices, what is most likely to happen in the real world?',
                options: [
                  'It will struggle to accurately understand children, diverse accents, or people speaking in noisy environments',
                  'It will work equally well for every person and environment on Earth',
                  'It will automatically record its own training data of children without needing updates',
                  'It will refuse to turn on in quiet offices',
                ],
                correct_option_index: 0,
                explanation: 'Models perform poorly on data distributions they never saw during training—a classic example of unrepresentative training data.',
                position: 8,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_aif_03',
        course_id: 'crs_ai_basics_02',
        title: 'Module 3: Generative AI and Chatbots (0.75h)',
        position: 4,
        lessons: [
          {
            id: 'les_aif_03_01',
            section_id: 'sec_aif_03',
            title: '3.1 Reading: How LLMs Generate Text & Images, Strengths, Limits & Hallucinations',
            type: 'article',
            summary: 'Demystify how Large Language Models (next-token prediction) and image diffusion models actually work, where chatbots shine, why they hallucinate, and how to verify their outputs.',
            implementation_tip: 'Never ask a chatbot "Are you sure?" to verify a fact—it will often apologize or double down with another hallucination! Always verify claims using an external search engine or primary source.',
            content: `### Module 3 Reading: Generative AI and Chatbots

#### 1. How Large Language Models (LLMs) Actually Generate Text
When you type a question into a chatbot like ChatGPT, Claude, or Gemini, it feels like you are talking to a person looking up facts in an encyclopedia. **That is not what is happening.**

An LLM is a **Next-Token Prediction Engine**:
1. **Breaking Text into Tokens**: The model breaks your prompt into small chunks called **tokens** (words or word pieces, like \`"un"\` + \`"believ"\` + \`"able"\`).
2. **Calculating Probabilities**: Based on patterns learned from reading billions of web pages, books, and articles during training, the model asks a single mathematical question: *"Given the words written so far, what is the most statistically likely next token?"*
   - Example: If the prompt is *"Peanut butter and ___"*, the model calculates: \`jelly (89%)\`, \`jam (6%)\`, \`banana (3%)\`, \`honey (2%)\`.
3. **One Token at a Time**: Once it picks a token, it adds that word to the sentence and repeats the calculation for the *next* token, hundreds of times per second.

> **Key Takeaway**: An LLM is like the autocomplete bar on your smartphone keyboard—scaled up a million times so it can track context across whole books rather than just the last two words.

---

#### 2. How AI Image Generators Work (Diffusion in Plain Language)
How do tools like Midjourney, DALL-E, or Imagen create a picture of *"an astronaut riding a bicycle on Mars in watercolor style"*?
- During **training**, researchers take millions of captioned images and gradually add static **noise** (like television snow) until the picture is pure random dots.
- The AI model learns to reverse that process (**denoising / diffusion**).
- When you type a text prompt, the model starts with a canvas of random static and sculpts away the noise step-by-step until the image matches the visual patterns of *"astronaut"* + *"bicycle"* + *"Mars"* + *"watercolor"*.

---

#### 3. What LLMs Do Well vs. Where They Fail
| What LLMs Do Exceptionally Well (Strengths) | Where LLMs Struggle or Fail (Limits) |
| :--- | :--- |
| **Summarization & Rewriting**: Condensing a long article you paste into bullet points or changing tone from casual to professional. | **Factual Recall on Niche/Recent Topics**: Inventing dates, biographies, or obscure court cases when they don't know the answer. |
| **Brainstorming & Drafting**: Generating 10 project ideas, email templates, or interview practice questions. | **Exact Counting & Multi-Step Math**: Counting letters in a word (like how many \`r\`s are in *"strawberry"*) because they read in token chunks, not individual letters! |
| **Translation & Explaining Concepts**: Explaining complex jargon at a 5th-grade reading level or translating between languages. | **Fake Citations & URLs**: Fabricating plausible-looking academic paper titles, authors, and web links that do not exist. |
| **Formatting & Pattern Transformation**: Turning messy meeting notes into a clean table or checklist. | **Biased Stereotypes**: Defaulting to cultural or gender stereotypes present in internet training text. |

---

#### 4. Why Do Chatbots "Hallucinate"?
A **hallucination** occurs when an AI states a falsehood with total confidence. Why does this happen?
Because the model's goal is **statistical plausibility**, not **truth verification**. It does not have an internal truth meter that distinguishes a real 2019 Supreme Court case from a fake case name that *sounds* exactly like a real legal citation.

#### 5. The 3-Step Verification Habit (How to Check AI Output)
Whenever an AI gives you a factual claim, date, statistic, quote, or legal/medical statement:
1. **Spot Check Specifics**: Highlight every proper noun, number, quote, URL, and date.
2. **Search Outside the Chatbot**: Open a separate search engine, library database, or official website (do *not* just ask the chatbot *"Is that true?"*).
3. **Provide Grounding Text**: Instead of asking the AI to recall facts from memory, **paste the trusted source article directly into your prompt** and say: *"Using ONLY the text below, summarize the 3 main findings."*

---

#### Accessible Video Companion Transcript
> **[Transcript – "Why Autocomplete on Steroids Invents Fake Books"]**: *"If you ask an LLM for five books by a real author, it might know three famous ones and—because you asked for five—assemble two fake book titles out of words that author frequently uses. It isn't lying to trick you; it is completing the pattern you asked for..."*`,
            duration_seconds: 1200,
            position: 1,
            is_free_preview: false,
            is_completed: false,
          },
          {
            id: 'les_aif_03_02',
            section_id: 'sec_aif_03',
            title: '3.2 Short Activity: Hallucination Detective & Output Verification',
            type: 'article',
            summary: 'Practice spotting hidden hallucinations in a realistic chatbot response and decide which tasks are safe to delegate to an LLM vs. which require strict verification.',
            implementation_tip: 'Notice how hallucinations blend 80% real facts with 20% invented details. That mixture is what makes them tricky to spot without external verification!',
            content: `### Module 3 Short Activity (15 Minutes): Hallucination Detective

#### Part A: Spot the 3 Red Flags in This Chatbot Response
A student asked a chatbot: *"Give me a short paragraph with a published study and URL about the history of the Eiffel Tower."*
The chatbot replied:
> *"The Eiffel Tower was completed in Paris in 1889 for the World's Fair and stands roughly 330 meters tall today. However, in 1927 it was temporarily disassembled and shipped to London for six months to celebrate the Anglo-French Engineering Treaty, as documented in Dr. Henri Moreau's landmark paper 'Iron Across the Channel' (Journal of European Monuments, 1998, https://www.europeanmonuments.org/articles/1998/eiffel-london-transfer.pdf)."*

**Questions to Answer:**
1. Which facts in the response are **true**?
2. Which claims are **hallucinations** (or suspicious red flags)?
3. How would you verify this in 30 seconds?

---

#### Answer Key for Part A
1. **True Facts**: Completed in Paris in 1889 for the World's Fair; stands roughly 330 meters tall today.
2. **Hallucinations & Red Flags**:
   - **Fake Historical Event**: The Eiffel Tower was *never* disassembled and shipped to London in 1927!
   - **Fabricated Citation**: "Dr. Henri Moreau's *Iron Across the Channel* (1998)" is an invented paper title designed to sound academic.
   - **Fabricated URL**: LLMs routinely invent realistic-looking URLs (\`/articles/1998/eiffel-london-transfer.pdf\`) that lead to \`404 Not Found\`.
3. **Verification Method**: Search \`"Eiffel Tower shipped to London 1927"\` and \`"Iron Across the Channel" "Henri Moreau"\` in a standard web search engine and check the official Eiffel Tower history archive (\`toureiffel.paris\`).`,
            duration_seconds: 900,
            position: 2,
            is_free_preview: false,
            is_completed: false,
          },
          {
            id: 'les_aif_03_03',
            section_id: 'sec_aif_03',
            title: '3.3 Module 3 Knowledge Check (5 Questions Drawn from Question Bank)',
            type: 'quiz',
            duration_seconds: 600,
            position: 3,
            is_free_preview: false,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_aif_03_1',
                lesson_id: 'les_aif_03_03',
                question: 'How does a Large Language Model (LLM) generate a response to your prompt?',
                options: [
                  'By predicting the most statistically likely next token (word piece) one step at a time based on patterns learned during training',
                  'By emailing a team of human writers in the background',
                  'By copying and pasting an entire web page verbatim from a live library catalog',
                  'By consciously pondering the philosophical meaning of your question',
                ],
                correct_option_index: 0,
                explanation: 'LLMs are next-token prediction engines that generate text sequentially based on statistical probabilities learned from vast text datasets.',
                position: 1,
              },
              {
                id: 'q_aif_03_2',
                lesson_id: 'les_aif_03_03',
                question: 'Why do Large Language Models sometimes "hallucinate" fake facts or nonexistent book citations?',
                options: [
                  'Because they are designed to generate statistically plausible-sounding word sequences rather than verifying facts against a truth database',
                  'Because the AI is intentionally trying to prank the user',
                  'Because the user typed the prompt too slowly',
                  'Because hallucinations only happen when the battery is below 10%',
                ],
                correct_option_index: 0,
                explanation: 'An LLM optimizes for fluent, probable-sounding language. If it lacks exact knowledge, it strings together words that sound like a real citation or fact.',
                position: 2,
              },
              {
                id: 'q_aif_03_3',
                lesson_id: 'les_aif_03_03',
                question: 'What is the most reliable way to verify a specific statistic, quote, or citation produced by a chatbot?',
                options: [
                  'Cross-check the claim outside the chatbot using an independent search engine, official website, or primary source document',
                  'Ask the chatbot "Are you 100% sure that is true?" and trust it if it says yes',
                  'Assume it is accurate if the grammar and formatting look professional',
                  'Ask the same chatbot to repeat the answer in bold font',
                ],
                correct_option_index: 0,
                explanation: 'Asking a chatbot to verify itself can produce another confident hallucination. Always verify facts using external primary sources.',
                position: 3,
              },
              {
                id: 'q_aif_03_4',
                lesson_id: 'les_aif_03_03',
                question: 'Which task is a Large Language Model generally BEST suited for without risking factual hallucinations?',
                options: [
                  'Rewriting a rough draft email you wrote to make it more polite and concise',
                  'Providing unverified medical dosages for a prescription drug',
                  'Generating a list of 10 real court case citations from memory without web search',
                  'Predicting next week’s exact lottery numbers',
                ],
                correct_option_index: 0,
                explanation: 'Transforming, summarizing, or polishing text that you provide directly in the prompt plays to an LLM’s core strength in language patterns.',
                position: 4,
              },
              {
                id: 'q_aif_03_5',
                lesson_id: 'les_aif_03_03',
                question: 'Why do standard LLMs sometimes miscount the number of letters in a word (like counting the letter "r" in "strawberry")?',
                options: [
                  'Because LLMs process text in chunks called "tokens" rather than seeing individual letters one by one like humans do',
                  'Because LLMs are programmed to ignore the letter R',
                  'Because "strawberry" is a secret password that disables AI',
                  'Because computers cannot store words longer than 5 letters',
                ],
                correct_option_index: 0,
                explanation: 'Tokenization groups common sub-words together into numeric IDs, meaning the model does not naturally inspect character-by-character spelling unless prompted to spell it out.',
                position: 5,
              },
              {
                id: 'q_aif_03_6',
                lesson_id: 'les_aif_03_03',
                question: 'How do AI diffusion image generators (like Midjourney or Imagen) create an image from a text prompt?',
                options: [
                  'They start with random static noise and iteratively refine (denoise) the pixels to match visual patterns associated with the words in your prompt',
                  'They search Google Images and crop a single photograph without changing a pixel',
                  'They hire a freelance illustrator to draw the picture in 5 seconds',
                  'They only change the brightness of your computer wallpaper',
                ],
                correct_option_index: 0,
                explanation: 'Diffusion models learn to reverse visual noise step-by-step, guided by the text prompt, until a coherent image emerges.',
                position: 6,
              },
              {
                id: 'q_aif_03_7',
                lesson_id: 'les_aif_03_03',
                question: 'What is "grounding" when prompting a chatbot?',
                options: [
                  'Pasting the trusted source text directly into your prompt and instructing the AI to answer using only that provided text',
                  'Plugging your laptop into a wall outlet',
                  'Asking the chatbot to make up a fictional story',
                  'Deleting your browser history',
                ],
                correct_option_index: 0,
                explanation: 'Supplying the reference document directly in your prompt (grounding) dramatically reduces hallucinations because the model does not have to rely on memory.',
                position: 7,
              },
              {
                id: 'q_aif_03_8',
                lesson_id: 'les_aif_03_03',
                question: 'What is a "token" in the context of Large Language Models?',
                options: [
                  'A chunk of text (such as a word, part of a word, or punctuation mark) that the model reads and generates one step at a time',
                  'A physical brass coin you insert into a computer USB port',
                  'A verified government ID card',
                  'A type of computer monitor cable',
                ],
                correct_option_index: 0,
                explanation: 'LLMs break input and output text into tokens—on average, 1 token is roughly 3/4 of an English word.',
                position: 8,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_aif_04',
        course_id: 'crs_ai_basics_02',
        title: 'Module 4: AI in Society (0.75h)',
        position: 5,
        lessons: [
          {
            id: 'les_aif_04_01',
            section_id: 'sec_aif_04',
            title: '4.1 Reading: Everyday & Industry Uses, Bias, Privacy, Jobs & Where to Go Next',
            type: 'article',
            summary: 'Examine how AI operates across everyday apps and major industries, analyze real risks (bias, privacy, deepfakes, environmental & workplace impacts), and learn a 4-question framework for using AI responsibly.',
            implementation_tip: 'When identifying risks for your Authentic Assessment, avoid generic phrases like "it might go wrong." Name the specific harm—for example, "GPS routing might send heavy commuter traffic down a narrow school zone street."',
            content: `### Module 4 Reading: AI in Society & Responsible Use

#### 1. AI in Your Everyday Life (Inputs, Outputs, Benefits & Risks)
Before you even open a chatbot, you likely interact with half a dozen AI systems before breakfast:

| Everyday AI System | Input Data It Uses | Output / Prediction | Key Benefit | Specific Risk to Watch |
| :--- | :--- | :--- | :--- | :--- |
| **1. GPS Navigation (Google Maps / Waze)** | Live GPS speeds from phones, historical traffic by hour, road closures | Fastest route & estimated arrival time (ETA) | Saves commute time and routes around accidents | Can divert heavy commuter traffic onto quiet residential streets or fail when offline |
| **2. Email Spam & Phishing Filter** | Sender reputation, message text patterns, links, your past spam reports | Classifies email as \`Inbox\`, \`Promotions\`, or \`Spam\` | Blocks 99%+ of scams and malware automatically | **False positives**: A critical job offer or medical bill gets silently buried in the Spam folder |
| **3. Streaming Recommendations (Netflix / Spotify / YouTube)** | Watch/listen history, pause/skip behavior, similar user profiles | Ranked feed of videos or songs you are likely to click | Helps discover new music or shows from millions of options | **Filter bubbles / rabbit holes**: Optimizes for screen time and outrage rather than balance |
| **4. Phone Face Unlock & Photo Search** | 3D infrared depth map or camera library pixels | Unlocks phone or finds all photos of "beach" or "dog" | Fast biometric security and instant photo organization | Biometric privacy concerns; historical accuracy gaps across skin tones if poorly trained |
| **5. Voice Assistants & Autocorrect** | Spoken audio waveforms or typing keystrokes | Transcribed text, smart home action, or next-word suggestion | Hands-free accessibility for users with visual or motor impairments | Accidental audio recording of private conversations; embarrassing autocorrect substitutions |

---

#### 2. How Industries Use AI Today
- **Healthcare**: Spotting early-stage tumors in radiology scans, predicting hospital readmission risk, and accelerating drug molecule discovery (*always paired with a licensed doctor reviewing the scan*).
- **Finance**: Real-time credit card fraud detection and algorithmic loan underwriting (*heavily regulated to prevent discriminatory lending*).
- **Agriculture & Climate**: Satellite crop health monitoring, precision watering that cuts water waste by 30%, and extreme weather forecasting.
- **Education & Accessibility**: Real-time closed captioning for deaf/hard-of-hearing learners, screen-reader image descriptions for blind users, and personalized practice tutors.

---

#### 3. Four Critical Societal Challenges: Bias, Privacy, Truth & Work
1. **Algorithmic Bias & Fairness**: When AI systems are used in high-stakes decisions—hiring, credit scores, healthcare triage, or policing—biased training data can systematically disadvantage underrepresented groups.
2. **Data Privacy & Confidentiality**: Many free consumer AI tools use the prompts you type to train future models unless you opt out. **Never paste private medical records, passwords, student grades, confidential company financials, or someone else's personal information into a public AI tool.**
3. **Misinformation & Deepfakes**: Generative AI makes it cheap and fast to create realistic fake audio clones, synthetic photos, and automated spam accounts. Verifying source provenance is now a civic survival skill.
4. **Jobs, Careers & Human Agency**: AI rarely replaces an entire profession overnight; instead, it **reshapes specific tasks** (drafting, summarizing, routine coding, data entry). Workers who understand *when to delegate to AI*, *how to verify its output*, and *when human empathy and judgment are irreplaceable* hold a major career advantage.

---

#### 4. The 4-Question Responsible AI Checklist
Before using AI for any task at work, school, or home, ask:
1. **Privacy**: *Does my prompt contain private, confidential, or sensitive personal data?* (If yes → do not paste it into a public tool.)
2. **Stakes**: *What happens if the AI is wrong?* (Low stakes: brainstorming dinner recipes. High stakes: medical, legal, financial, or grading decisions → require human expert control.)
3. **Verification**: *Can I independently verify the output before sharing or acting on it?* (Always check facts, links, and calculations.)
4. **Transparency**: *Should I disclose that AI assisted with this work?* (Follow your school, workplace, or client disclosure norms honestly.)

---

#### 5. Where to Go Next After AI Foundations
- **Next Recommended Courses on REACTJav**:
  - **AI Prompting and Data Annotation**: Master structured prompting frameworks and how human evaluators train and score LLMs.
  - **Generative AI and Prompt Engineering**: Deepen your command of multi-step workflows, system prompts, and multimodal AI.
  - **AI Ethics, Safety, and Responsible Use**: Dive deeper into governance, model cards, red-teaming, and regulatory compliance.

---

#### Accessible Video Companion Transcript
> **[Transcript – "Human-in-the-Loop is Not Optional"]**: *"Think of AI as an eager, fast-reading intern who works at lightning speed but has zero real-world accountability. You wouldn't let an intern sign a legal contract or diagnose a patient without reviewing their work line by line. Keeping a knowledgeable human in the loop is the foundation of responsible AI..."*`,
            duration_seconds: 1200,
            position: 1,
            is_free_preview: false,
            is_completed: false,
          },
          {
            id: 'les_aif_04_02',
            section_id: 'sec_aif_04',
            title: '4.2 Short Activity: The Responsible AI Decision Matrix',
            type: 'article',
            summary: 'Apply the 4-Question Responsible AI Checklist to 4 real-world workplace and personal dilemmas.',
            implementation_tip: 'Notice how the right answer isn’t always "Never use AI" or "Always use AI"—often it is "Use AI with anonymized data and strict human verification."',
            content: `### Module 4 Short Activity (15 Minutes): Responsible AI Decision Matrix

For each of the 4 scenarios below, decide whether the proposed AI use is:
- **GREEN LIGHT (Safe & Effective as proposed)**
- **YELLOW LIGHT (Safe ONLY if modified—state what must change)**
- **RED LIGHT (Unsafe / Unethical—do not use AI this way)**

#### The 4 Scenarios
1. **The Clinic Receptionist**: A medical receptionist wants to paste a patient's full name, date of birth, and lab test results into a free public chatbot to draft a friendly explanation letter for the patient.
2. **The Job Seeker**: A graduate pastes a public job description and their own resume skills (with phone number/address removed) into a chatbot and asks for 5 practice interview questions tailored to the role.
3. **The Small Business Owner**: A bakery owner uses an AI image tool to brainstorm 3 poster layout ideas for a weekend croissant sale, then checks that all prices and allergen labels on the final poster are typed by hand.
4. **The Hiring Manager**: A manager configures an unverified AI script to automatically reject job applicants without human review based on their zip code and the acoustic tone of their voice in a recorded video.

---

#### Self-Check Answer Key
1. **Scenario 1 → RED / YELLOW LIGHT**: Never paste Protected Health Information (patient name, DOB, lab results) into a public consumer chatbot (**Privacy violation**). *Safe modification*: Ask the chatbot for a generic template explaining what a standard cholesterol test measures using zero patient data, then have the doctor review it.
2. **Scenario 2 → GREEN LIGHT**: Removing personal contact details and using a public job post to generate practice interview questions is a low-risk, high-benefit use of Generative AI.
3. **Scenario 3 → GREEN LIGHT**: Creative layout brainstorming combined with human control over critical safety facts (allergens and prices) is responsible AI use.
4. **Scenario 4 → RED LIGHT**: High-stakes automated rejection using zip codes (a well-known proxy for race/income) and voice tone without human review or validation is discriminatory and unsafe.`,
            duration_seconds: 900,
            position: 2,
            is_free_preview: false,
            is_completed: false,
          },
          {
            id: 'les_aif_04_03',
            section_id: 'sec_aif_04',
            title: '4.3 Module 4 Knowledge Check (5 Questions Drawn from Question Bank)',
            type: 'quiz',
            duration_seconds: 600,
            position: 3,
            is_free_preview: false,
            is_completed: false,
            quiz_questions: [
              {
                id: 'q_aif_04_1',
                lesson_id: 'les_aif_04_03',
                question: 'What is a specific, realistic risk of relying on an AI email spam filter?',
                options: [
                  'False positives: an important legitimate email (like a job interview invite or bill) can be mistakenly routed to the Spam folder',
                  'The spam filter will physically unplug your keyboard',
                  'The spam filter will delete your operating system if you receive a newsletter',
                  'Spam filters never use any training data',
                ],
                correct_option_index: 0,
                explanation: 'Every classification model balances catching bad items against falsely flagging good items (false positives), which is why checking your spam folder periodically matters.',
                position: 1,
              },
              {
                id: 'q_aif_04_2',
                lesson_id: 'les_aif_04_03',
                question: 'Why should you avoid pasting private customer records, medical data, or passwords into a free public chatbot?',
                options: [
                  'Public consumer AI tools may log inputs for human review or future model training, creating a serious privacy and security risk',
                  'Because chatbots cannot read numbers or names',
                  'Because typing more than 20 words breaks the internet',
                  'Because chatbots charge $100 per password typed',
                ],
                correct_option_index: 0,
                explanation: 'Unless you are using an enterprise-approved tool with zero-data-retention guarantees, inputs to public chatbots can be stored and used for training.',
                position: 2,
              },
              {
                id: 'q_aif_04_3',
                lesson_id: 'les_aif_04_03',
                question: 'How does "Algorithmic Bias" typically enter an AI system?',
                options: [
                  'From historical inequities, unrepresentative samples, or human prejudices present in the data used to train the model',
                  'From cosmic rays hitting the computer monitor',
                  'From the AI consciously choosing to dislike certain people',
                  'Only when the computer is older than 5 years',
                ],
                correct_option_index: 0,
                explanation: 'AI models learn statistical patterns from their training data; if the data underrepresents a group or reflects past biased decisions, the model reproduces that bias.',
                position: 3,
              },
              {
                id: 'q_aif_04_4',
                lesson_id: 'les_aif_04_03',
                question: 'What does keeping a "Human-in-the-Loop" mean when using AI in healthcare, law, or finance?',
                options: [
                  'A qualified human professional reviews, verifies, and takes final accountability for high-stakes decisions rather than letting AI act unchecked',
                  'A human must sit inside the server room 24 hours a day',
                  'Humans must write all code in binary zeros and ones',
                  'AI is banned from even summarizing a public article',
                ],
                correct_option_index: 0,
                explanation: 'In high-stakes domains, AI can assist with pattern detection or drafting, but a qualified human must verify accuracy and make the final decision.',
                position: 4,
              },
              {
                id: 'q_aif_04_5',
                lesson_id: 'les_aif_04_03',
                question: 'What is a specific risk of AI recommendation algorithms on social media and video platforms?',
                options: [
                  'Filter bubbles: optimizing solely for watch time can trap users in narrow or polarizing content loops',
                  'They force every user in the world to watch the exact same video at the same time',
                  'They erase videos from the creator’s hard drive',
                  'They only work on black-and-white screens',
                ],
                correct_option_index: 0,
                explanation: 'Recommendation models trained to maximize engagement often amplify sensational content and narrow the range of viewpoints a user sees.',
                position: 5,
              },
              {
                id: 'q_aif_04_6',
                lesson_id: 'les_aif_04_03',
                question: 'What is a "Model Card" in responsible AI documentation?',
                options: [
                  'A standardized transparency report explaining what data an AI model was trained on, its intended use cases, and its known limitations and risks',
                  'A gift card used to buy computer monitors',
                  'A business card printed by a fashion agency',
                  'A graphics card plugged into a gaming PC',
                ],
                correct_option_index: 0,
                explanation: 'Model Cards provide essential transparency so users and auditors understand where a model works well and where it should not be used.',
                position: 6,
              },
              {
                id: 'q_aif_04_7',
                lesson_id: 'les_aif_04_03',
                question: 'How is AI most accurately affecting most jobs and careers today?',
                options: [
                  'It automates or speeds up specific tasks (like drafting, summarizing, or sorting data), making human judgment, verification, and domain expertise even more important',
                  'It has completely eliminated the need for humans in healthcare, education, and engineering',
                  'It has zero impact on any office or creative task',
                  'It only affects astronauts',
                ],
                correct_option_index: 0,
                explanation: 'Most jobs are bundles of tasks. AI transforms how routine drafting and analysis tasks are done while elevating human oversight, ethics, and problem-solving.',
                position: 7,
              },
              {
                id: 'q_aif_04_8',
                lesson_id: 'les_aif_04_03',
                question: 'Before submitting work that was drafted or assisted by Generative AI at school or work, what is the responsible practice?',
                options: [
                  'Verify all facts yourself, ensure no confidential data was leaked, and follow your organization’s policy on disclosing AI assistance',
                  'Hide the use of AI even if your school or client explicitly requires disclosure',
                  'Leave any hallucinated citations in the document so you can blame the computer later',
                  'Never read the draft before hitting send',
                ],
                correct_option_index: 0,
                explanation: 'Responsible AI use combines privacy protection, human verification of every claim, and honest transparency about how AI was used.',
                position: 8,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_aif_05',
        course_id: 'crs_ai_basics_02',
        title: 'Segment 6: Guided Lab — No-Code Image Classifier & Chatbot Test (1.0h)',
        position: 6,
        lessons: [
          {
            id: 'les_aif_05_01',
            section_id: 'sec_aif_05',
            title: '5.1 Guided Lab Part 1 (30m): Train a Simple Image Classifier with a Free No-Code Tool',
            type: 'article',
            summary: 'Experience Data → Training → Model → Prediction firsthand in 30 minutes using Google Teachable Machine (100% free, runs in your browser, no login or coding required).',
            implementation_tip: 'Try holding your object in a shadow or against a different background during Step 4. Seeing the confidence bar drop in real time is the clearest way to understand why diverse training data matters!',
            content: `### Guided Lab Part 1 (30 Minutes): Train Your Own Image Classifier (No Coding, No Login)

In Module 2, you read about **Data → Training → Model → Prediction**. Now you will build and test a working Machine Learning image classifier yourself in under 30 minutes!

- **Tool Used**: [Google Teachable Machine](https://teachablemachine.withgoogle.com/train/image) (100% free, runs locally in your browser, **no account or login required**, and images stay on your device).
- **Accessibility / No-Webcam Alternative**: If you do not have a webcam or prefer not to use one, you can drag-and-drop sample image files or use the **Audio Project** mode (clapping vs. snapping vs. background noise).

---

#### Step-by-Step Lab Instructions

##### Step 1: Collect Your Training Data (10 Minutes)
1. Open [teachablemachine.withgoogle.com/train/image](https://teachablemachine.withgoogle.com/train/image) and choose **Standard Image Model**.
2. Rename **Class 1** to \`Thumbs Up\` (or \`Coffee Mug\`) and **Class 2** to \`Open Palm\` (or \`Pen / Notebook\`).
3. Click **Webcam** (or **Upload**) under **Class 1** and record **25–30 sample images** of your object or hand gesture at slightly different angles.
4. Repeat for **Class 2** with **25–30 sample images** of your second object or gesture.

##### Step 2: Train the Model (5 Minutes)
1. Click the **"Train Model"** button in the middle column.
2. Keep the browser tab open for 15–30 seconds while your computer adjusts the neural network weights across your training examples.
3. Once finished, you have created a trained **Model**!

##### Step 3: Test Predictions on New Inputs (5 Minutes)
1. Look at the **Preview (Output)** panel on the right.
2. Hold up Class 1, then Class 2. Watch the confidence bars (e.g., \`99% Thumbs Up\` vs. \`1% Open Palm\`). That live bar is your model's **Prediction**!

##### Step 4: Deliberately Break Your Model & Fix It! (10 Minutes)
1. **The Edge-Case Test**: Hold the object much closer/farther away, tilt it upside down, or move to a dimmer corner of the room. Does the model get confused?
2. **Why It Happened**: Your training data only showed one distance and lighting condition!
3. **Fix the Dataset**: Add 15 new images to Class 1 and Class 2 at different distances and angles, click **Train Model** again, and observe how much more reliable your predictions become.

Record 2–3 sentences in your **Personal Study Notes** tab below about what tricked your classifier before you retrained it.`,
            duration_seconds: 1800,
            position: 1,
            is_free_preview: false,
            is_completed: false,
            resources: [
              {
                id: 'res_aif_lab_guide',
                name: 'Guided_Lab_Teachable_Machine_and_Chatbot_Worksheet.txt',
                size: '18 KB',
                type: 'TXT',
                description: 'Step-by-step worksheet for training your no-code image classifier and recording your 3-question chatbot stress test.',
                url: 'https://teachablemachine.withgoogle.com/train/image',
              },
            ],
          },
          {
            id: 'les_aif_05_02',
            section_id: 'sec_aif_05',
            title: '5.2 Guided Lab Part 2 (30m): Test a Chatbot on Easy and Tricky Questions',
            type: 'article',
            summary: 'Test a free chatbot on 3 easy questions and 3 tricky edge-case prompts (letter counting, false-premise questions, and citation checks) to prepare directly for Part 2 of your Authentic Assessment.',
            implementation_tip: 'Save your screenshots and verification notes from this lab—you can use your 3 favorite test questions directly in Part 2 of the Authentic Assessment in the next segment!',
            content: `### Guided Lab Part 2 (30 Minutes): Test a Chatbot on Easy & Tricky Questions

Now that you have trained a predictive classifier, let's stress-test a **Generative AI Chatbot**!
- **Free, No-Login Tools You Can Use**: DuckDuckGo AI Chat ([duck.ai](https://duck.ai) — free, private, no account required), HuggingChat, Perplexity, ChatGPT Free, Claude, or Google Gemini.

---

#### Round 1: 2 "Easy" Questions (Where LLMs Shine — 10 Minutes)
Ask the chatbot these two prompts and observe how well it handles them:
1. **Summarization & Tone Shift**: *"Explain how a bicycle gear works in 3 bullet points aimed at a 10-year-old, using a friendly analogy."*
2. **Structured Brainstorming**: *"Give me a 3-day beginner meal-prep plan using only 6 common grocery ingredients, formatted as a table."*
- **What to Notice**: Fluent structure, helpful analogies, and instant formatting.

---

#### Round 2: 2 "Tricky" Questions Designed to Trigger Errors or Hallucinations (20 Minutes)
Now test the chatbot on prompts where next-token prediction often stumbles. Pick at least **one** or **two** of these categories:

1. **The False-Premise / Fake Historical Event Trap**:
   - *Example Prompt*: *"Tell me about the 1964 underwater marathon held in the Grand Canyon and who won first place."* (Or ask about a fictional feature of your local hometown.)
   - **What to Watch For**: Does the chatbot politely point out that no such event happened, or does it invent a winner's name and race time?
2. **The Niche Citation / URL Verification Trap**:
   - *Example Prompt*: *"Give me 3 peer-reviewed journal articles published between 2018 and 2021 about the history of left-handed scissors, including exact paper titles, authors, and direct web URLs."*
   - **What to Watch For**: Copy each article title and URL into a separate search engine. Are the papers real, or did the LLM assemble plausible-sounding words into fake titles?
3. **The Tokenization / Constraints Trap**:
   - *Example Prompt*: *"Write a 4-sentence explanation of photosynthesis where every single sentence has esattamente 8 words and does not use the letter 'e'."*
   - **What to Watch For**: Count the words per sentence and look for the letter \`e\`. Because LLMs predict token-by-token without a built-in character counter, they almost always break strict character/word-count rules!

---

#### Prepare for Your Authentic Assessment
Take a screenshot of your **3 favorite questions** (at least 1 easy and 1 tricky/error-inducing question) and write down **how you verified the answers**. In the next lesson, you will enter them into the interactive **"AI in My Life" Authentic Assessment Workspace**!`,
            duration_seconds: 1800,
            position: 2,
            is_free_preview: false,
            is_completed: false,
          },
        ],
      },
      {
        id: 'sec_aif_06',
        course_id: 'crs_ai_basics_02',
        title: 'Segment 7: Authentic Assessment — “AI in My Life” Audit (2.0h)',
        position: 7,
        lessons: [
          {
            id: 'les_aif_06_01',
            section_id: 'sec_aif_06',
            title: '6.1 Authentic Assessment: “AI in My Life” Audit, Hallucination Test & Explainer Workspace',
            type: 'article',
            summary: 'Complete and validate your 2-hour Authentic Assessment right inside the interactive workspace below. Includes automated submission validation (25%), module quiz integration (25%), and 4-level rubric grading (50%).',
            implementation_tip: 'Use the interactive workspace directly below the instructions to fill in your 5 AI Systems, 3 Hallucination Test questions, Plain-Language Explainer (or Model Card Critique stretch option), and 150–200 word Reflection. Click "Run Automated Validation & Rubric Evaluation" at any time to see your live score!',
            content: `### Authentic Assessment: “AI in My Life” Audit (2.0 Hours)

#### Scenario
A friend or relative says: **“Everyone talks about AI, but I don’t get what it actually is.”**
Your task is to produce an **“AI in My Life” Audit and Plain-Language Explainer** that helps that non-technical person understand what AI is, how it learns, where it shows up in daily life, where chatbots fail, and how to use AI responsibly.

---

#### The 4 Required Task Components
1. **Audit of 5 Everyday AI Systems**:
   - Pick **5 AI systems you actually use** (such as GPS maps, streaming recommendations, email spam filters, voice assistants, face unlock, or chatbots).
   - For each system, state: **(a) What it does**, **(b) What data it uses**, **(c) How it likely learned**, **(d) One real benefit**, and **(e) One specific risk**.
2. **3-Question Chatbot Hallucination Test**:
   - Ask a chatbot **3 questions**, including **at least one tricky question likely to produce an error or hallucination**.
   - Record your **screenshot filename/link**, state **how you independently verified the answers**, and note **what you found**.
3. **Plain-Language Explainer (OR Advanced Stretch Option)**:
   - **Standard Option**: Create a **one-page infographic outline** or a **3-minute video script** aimed at a non-technical friend or relative, explaining what AI is, how it learns from data, and how AI/ML/GenAI differ. Include at least **5 core glossary terms** (*AI, machine learning, data, training, model, prediction, generative, hallucination, bias*).
   - **Stretch Option for Advanced Users (Objective 3)**: Instead of the basic explainer, read a **published AI Model Card or system documentation** (e.g., OpenAI GPT-4o System Card, Anthropic Claude Model Card, or Google Gemma Model Card) and write a **one-page critique** analyzing what it reveals about training data, limitations, and intended use.
4. **Personal Reflection (150–200 Words)**:
   - Write **150 to 200 words** reflecting on what surprised you most during this course and audit, and what specific habits you will change in how you use AI going forward.

---

#### Mixed-Model Grading & Pass Rules
- **Automated Checks (50% of Grade)**:
  - **Module Knowledge Checks (25%)**: Your completion across Modules 1–4 knowledge checks.
  - **Submission Validation (25%)**: Automatically checks that all 5 systems have every field completed, all 3 hallucination tests include screenshot references and verification notes, at least 5 glossary terms appear in your explainer, and your explainer & reflection (150–200 words) meet length/duration limits.
- **4-Level Rubric (50% of Grade — Beginning, Developing, Proficient, Advanced)**:
  - **Accuracy of AI concepts**: Definitions and explanations are correct, with AI/ML/GenAI distinctions clear.
  - **Clarity for the audience**: A non-technical reader could understand the explainer without extra help.
  - **Critical thinking about risks**: Risks are specific to each system (not generic), and verification of chatbot output is credible.
  - **Reflection**: Connects learning to personal decisions about future AI use.
- **Pass Rule**: **70% or higher in BOTH** the automated and rubric components (you may revise and resubmit directly in the workspace below).
- **Certificate with Distinction**: **90% or higher in BOTH** components.`,
            duration_seconds: 7200,
            position: 1,
            is_free_preview: false,
            is_completed: false,
          },
        ],
      },
      {
        id: 'sec_aif_07',
        course_id: 'crs_ai_basics_02',
        title: 'Segment 8: Reflection, Review & Credentials (0.5h)',
        position: 8,
        lessons: [
          {
            id: 'les_aif_07_01',
            section_id: 'sec_aif_07',
            title: '7.1 Course Review, Learner Feedback Survey & Open Badge Credentials',
            type: 'article',
            summary: 'Review your mastery of all 5 AI Foundations learning outcomes, complete the quick learner reflection check, and download your Open Badge v3.0 JSON metadata and Certificate of Completion.',
            implementation_tip: 'Once your Authentic Assessment passes (≥70% in both components, or ≥90% for Distinction), use the Credential panel below to copy your Open Badge v3.0 JSON metadata for LinkedIn or your CV!',
            content: `### Segment 8: Reflection, Review & Credentials (0.5 Hours)

Congratulations on reaching the final segment of **Course 1: AI Foundations**!

#### 1. Look How Far You Have Come (The 5 Learning Outcomes)
Take a moment to verify that you can confidently do each of the following:
- **Outcome 1 (The AI Map)**: Define Artificial Intelligence and clearly distinguish between **AI**, **Machine Learning (ML)**, **Deep Learning (DL)**, and **Generative AI (GenAI)**.
- **Outcome 2 (How AI Learns)**: Explain in plain, everyday language how an AI system uses **training data** during **training** to build a **model** that makes **predictions**—and why data quality matters.
- **Outcome 3 (Everyday AI Audit)**: Spot AI systems in daily life (maps, spam filters, recommendation feeds, voice assistants) and articulate their inputs, outputs, benefits, and specific risks.
- **Outcome 4 (LLMs & Verification)**: Explain how Large Language Models predict tokens, why they **hallucinate**, and how to independently verify their outputs.
- **Outcome 5 (Responsible AI)**: Apply the 4-question Responsible AI checklist (Privacy, Stakes, Verification, Transparency) to decide when and how to use AI safely.

---

#### 2. Learner Feedback & Course Review Survey
In your **Personal Study Notes** tab (or Discussion / Q&A tab below), share a quick note on:
1. **Most Valuable Segment**: Which part of the 7-hour course helped things "click" the most for you (the Nesting-Doll Map, the Wolf-in-the-Snow story, the Google Teachable Machine lab, or the Hallucination Test)?
2. **Tools & Accessibility Check**: Were all free, no-login tools and video transcripts easy to access on your device?
3. **Next Course Goal**: Which course in the REACTJav AI curriculum are you tackling next (*AI Prompting & Data Annotation*, *Generative AI & Prompt Engineering*, or *AI Ethics, Safety & Responsible Use*)?

---

#### 3. Claiming Your Credentials Below
In the interactive workspace below, navigate to **Step 5: Grading & Badge** to:
- View your **Automated Validation (50%)** + **Rubric Evaluation (50%)** score breakdown.
- Claim your **"AI Foundations: Certificate of Completion"** (or **Certificate with Distinction** at ≥90% in both components).
- Copy or download your **"AI Foundations" Open Badge v3.0 JSON** containing your verified skills and assessment evidence metadata for LinkedIn and your CV.`,
            duration_seconds: 1800,
            position: 1,
            is_free_preview: false,
            is_completed: false,
          },
        ],
      },
    ],
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

