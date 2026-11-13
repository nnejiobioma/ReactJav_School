'use client';

import React, { useState } from 'react';
import {
  Award,
  FileCheck,
  Copy,
  Check,
  Users,
} from 'lucide-react';

interface AISystemAuditRow {
  name: string;
  whatItDoes: string;
  dataUsed: string;
  howItLearned: string;
  benefit: string;
  risk: string;
}

interface HallucinationTestItem {
  questionType: string;
  questionAsked: string;
  chatbotResponse: string;
  screenshotEvidence: string;
  verificationMethod: string;
  findings: string;
}

const DEFAULT_SYSTEMS: AISystemAuditRow[] = [
  {
    name: 'Google Maps / Navigation ETA',
    whatItDoes: 'Predicts live traffic delays and recommends the fastest driving route.',
    dataUsed: 'Historical road speeds, live anonymized GPS phone signals, time of day, weather.',
    howItLearned: 'Trained on millions of past trips to spot patterns between traffic flow and arrival times.',
    benefit: 'Saves commuters time and reduces fuel waste by routing around accidents.',
    risk: 'Can route heavy commuter traffic through quiet residential streets or fail during sudden road closures.',
  },
  {
    name: 'Email Spam Filter (Gmail / Outlook)',
    whatItDoes: 'Automatically classifies incoming emails as Spam/Phishing or Legitimate Inbox mail.',
    dataUsed: 'Sender domain reputation, email text keywords, links, and millions of user "Report Spam" clicks.',
    howItLearned: 'Supervised learning on millions of labeled spam vs. non-spam emails.',
    benefit: 'Blocks phishing scams and keeps the inbox clean without manual sorting.',
    risk: 'False positives: important job offers, school receipts, or password resets can get buried in the spam folder.',
  },
  {
    name: 'Video Recommendation Feed (YouTube / Netflix)',
    whatItDoes: 'Suggests the next video or show a user is most likely to watch.',
    dataUsed: 'Watch history, pause/rewind behavior, likes, search queries, and viewing habits of similar users.',
    howItLearned: 'Trained to predict watch duration and click probability from billions of user interactions.',
    benefit: 'Helps users discover educational channels and movies tailored to their interests.',
    risk: 'Can create echo chambers or rabbit holes by optimizing for outrage and screen time over accuracy.',
  },
  {
    name: 'Smartphone Face Unlock / Photo Search',
    whatItDoes: 'Recognizes a user’s face to unlock the phone and groups photos by person or object.',
    dataUsed: '3D depth-sensor facial scans and labeled image datasets across lighting conditions.',
    howItLearned: 'Deep learning (convolutional neural networks) trained to map facial geometry into numerical vectors.',
    benefit: 'Fast, convenient biometric security and instant photo organization.',
    risk: 'Biometric privacy concerns and higher error rates if training data lacked diverse skin tones.',
  },
  {
    name: 'Conversational AI Chatbot (ChatGPT / Gemini / Claude)',
    whatItDoes: 'Generates plain-language answers, summaries, drafts, and translations from text prompts.',
    dataUsed: 'Billions of public web pages, books, articles, and human reviewer preference rankings (RLHF).',
    howItLearned: 'Pre-trained to predict the next token in text, then fine-tuned with human feedback to follow instructions.',
    benefit: 'Accelerates brainstorming, learning, summarizing long documents, and drafting communications.',
    risk: 'Can hallucinate plausible-sounding false facts or citations if the user does not verify the output.',
  },
];

const DEFAULT_HALLUCINATION_TESTS: HallucinationTestItem[] = [
  {
    questionType: '1. Well-Known Fact (Baseline Verification)',
    questionAsked: 'What is the difference between Artificial Intelligence and Machine Learning in plain English?',
    chatbotResponse: 'AI is the broad goal of making machines perform tasks that require human-like intelligence, while Machine Learning is a specific subset of AI where systems learn patterns from data instead of following hand-coded rules.',
    screenshotEvidence: 'screenshot_test1_well_known_fact.png',
    verificationMethod: 'Step 1 & 2 of Verification Habit: Cross-checked against the Course Glossary and Stanford AI Index definitions.',
    findings: 'Accurate and clear. The chatbot handled foundational definitions well because they appear thousands of times in its training data.',
  },
  {
    questionType: '2. Obscure or Tricky Question (Hallucination Stress-Test)',
    questionAsked: 'Summarize the 2025 Supreme Court ruling in "United States v. NeuralNet Corp" and explain why the dissenting justices disagreed.',
    chatbotResponse: 'In the first test without web search, the chatbot invented a fictional 6-3 ruling and fabricated a docket number before admitting on follow-up that no such case exists.',
    screenshotEvidence: 'screenshot_test2_obscure_tricky_caught.png',
    verificationMethod: 'Searched official Supreme Court docket records and Google Scholar Case Law; confirmed the case name was fictional.',
    findings: 'Caught a classic hallucination! Because LLMs predict plausible next words, a leading question about a fake legal case caused it to invent convincing legal details.',
  },
  {
    questionType: '3. Request for Sources & Citations (Source Existence Check)',
    questionAsked: 'Give me 3 peer-reviewed studies on algorithmic bias in healthcare with exact article titles, authors, and DOI links.',
    chatbotResponse: 'Provided one real 2019 Science study by Obermeyer et al., alongside two plausible-sounding paper titles whose DOI links led to 404 errors or completely unrelated journals.',
    screenshotEvidence: 'screenshot_test3_sources_check.png',
    verificationMethod: 'Step 3 of Verification Habit: Searched each exact paper title and DOI on PubMed and Google Scholar to verify the source exists and says what the chatbot claims.',
    findings: '1 real study confirmed; 2 citations were "Frankenstein" hallucinations combining real researcher names with invented article titles.',
  },
];

const REQUIRED_GLOSSARY_TERMS = [
  'ai',
  'algorithm',
  'data',
  'model',
  'training',
  'prediction',
  'machine learning',
  'generative ai',
  'hallucination',
  'bias',
];

interface AIFoundationsAssessmentWorkspaceProps {
  courseId: string;
  lessonId: string;
  userName?: string;
  onCompleteLesson: () => void;
}

export default function AIFoundationsAssessmentWorkspace({
  courseId,
  lessonId,
  userName = 'AI Foundations Scholar',
  onCompleteLesson,
}: AIFoundationsAssessmentWorkspaceProps) {
  const [audiencePerson, setAudiencePerson] = useState(
    'My Aunt Clara — a retired nurse who hears about AI on the news every day and wants a plain-language guide without technical jargon.'
  );
  const [systems, setSystems] = useState<AISystemAuditRow[]>(DEFAULT_SYSTEMS);
  const [hallucinationTests, setHallucinationTests] = useState<HallucinationTestItem[]>(
    DEFAULT_HALLUCINATION_TESTS
  );
  const [explainerMode, setExplainerMode] = useState<'standard' | 'stretch'>('standard');
  const [explainerFormat, setExplainerFormat] = useState<'written' | 'infographic'>('written');
  const [explainerMediaUrl, setExplainerMediaUrl] = useState(
    'https://reactjav.com/portfolio/ai-foundations-one-page-explainer.pdf'
  );
  const [explainerContent, setExplainerContent] = useState(
    `What is AI and How Does It Actually Learn? (A One-Page Plain-Language Guide for Aunt Clara)

1. The Big Picture (AI vs. Machine Learning vs. Generative AI):
Artificial Intelligence (AI) is any computer system designed to perform tasks that normally require human intelligence—like recognizing speech, navigating traffic, or answering questions. Instead of following a fixed step-by-step Algorithm written by hand, modern Machine Learning (ML) lets the computer learn patterns from examples. Deep Learning uses multi-layered neural networks, and Generative AI goes a step further by creating brand-new text, images, or audio.

2. How AI Learns from Data:
Think of teaching a child to recognize apples vs. oranges from examples. First, we gather thousands of labeled examples (Data). During Training, the computer adjusts its internal math until it builds a Model—a pattern-recognition recipe. When you show the model a new photo it has never seen, it outputs a Prediction. However, if the training data is incomplete or skewed, the model inherits Bias ("Garbage In, Garbage Out").

3. Why Chatbots Sometimes Hallucinate:
Large Language Models generate replies by predicting the next most likely word. Because they do not verify facts like a human librarian, they can produce a Hallucination—a confident, fluent answer or citation that is completely made up. Always cross-check important medical, legal, or financial claims with trusted sources, and never paste private information into a chatbot!`
  );

  const [reflectionText, setReflectionText] = useState(
    `Completing the "AI in My Life" audit opened my eyes to how many invisible AI systems I interact with before 9:00 AM every day—from my smartphone's biometric face unlock and Gmail's supervised spam filter to Google Maps' traffic prediction models. Before this course, I tended to think of AI only as conversational chatbots, and I underestimated how strongly training data quality shapes every prediction a model makes.

What surprised me most during the hallucination stress-test was how confidently a chatbot can invent a fake citation when asked a leading question. Moving forward, I will apply three habits whenever I use AI at work or home: first, I will treat generative AI as a first-draft brainstorming partner rather than an infallible authority; second, I will verify specific dates, citations, and high-stakes claims against primary sources; and third, I will never paste private personal or client data into public AI tools.`
  );

  const [selfCheckConfirmed, setSelfCheckConfirmed] = useState(true);
  const [surveyFeedback, setSurveyFeedback] = useState(
    'The written lessons, "Be the Algorithm" activity, and Teachable Machine lab made how AI learns from data crystal clear.'
  );
  const [submitted, setSubmitted] = useState(false);
  const [copiedBadge, setCopiedBadge] = useState(false);

  // Word count helper
  const reflectionWords = reflectionText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // Check glossary coverage in explainer
  const matchedGlossaryTerms = REQUIRED_GLOSSARY_TERMS.filter((term) =>
    explainerContent.toLowerCase().includes(term)
  );

  // Check all 5 systems filled
  const completeSystemsCount = systems.filter(
    (s) =>
      s.name.trim().length > 2 &&
      s.whatItDoes.trim().length > 5 &&
      s.dataUsed.trim().length > 5 &&
      s.howItLearned.trim().length > 5 &&
      s.benefit.trim().length > 5 &&
      s.risk.trim().length > 5
  ).length;

  // Check all 3 hallucination tests filled
  const completeHallucinationCount = hallucinationTests.filter(
    (h) =>
      h.questionAsked.trim().length > 5 &&
      h.chatbotResponse.trim().length > 5 &&
      h.screenshotEvidence.trim().length > 3 &&
      h.verificationMethod.trim().length > 5 &&
      h.findings.trim().length > 5
  ).length;

  // Automated Score (out of 100%)
  // 50% from Module Knowledge Checks (25% of total course grade) + 50% from Submission Validation (25% of total course grade)
  const systemsScore = (completeSystemsCount / 5) * 30; // 30 pts
  const hallucinationScore = (completeHallucinationCount / 3) * 25; // 25 pts
  const glossaryScore = Math.min(1, matchedGlossaryTerms.length / 7) * 25; // 25 pts
  const reflectionValid = reflectionWords >= 120 && reflectionWords <= 300;
  const reflectionValidationScore = reflectionValid ? 20 : Math.min(15, (reflectionWords / 150) * 20); // 20 pts

  const submissionValidationPercent = Math.round(
    systemsScore + hallucinationScore + glossaryScore + reflectionValidationScore
  );
  const moduleQuizzesPercent = 95; // 4 Module Knowledge Checks (5 questions drawn from 10-question banks)
  const automatedCompositePercent = Math.round(
    moduleQuizzesPercent * 0.5 + submissionValidationPercent * 0.5
  );

  // 4-Level Rubric Evaluation (Beginning = 55%, Developing = 70%, Proficient = 88%, Advanced = 96%)
  const rubricAccuracy = matchedGlossaryTerms.length >= 8 ? 96 : matchedGlossaryTerms.length >= 6 ? 88 : 70;
  const rubricClarity = explainerContent.trim().length >= 400 && audiencePerson.trim().length > 5 ? 95 : 78;
  const rubricCriticalThinking =
    completeSystemsCount === 5 && completeHallucinationCount === 3 ? 96 : 75;
  const rubricReflection = reflectionWords >= 150 ? 95 : 72;

  const rubricCompositePercent = Math.round(
    (rubricAccuracy + rubricClarity + rubricCriticalThinking + rubricReflection) / 4
  );

  const overallGradePercent = Math.round(
    automatedCompositePercent * 0.5 + rubricCompositePercent * 0.5
  );
  const passedBoth = automatedCompositePercent >= 70 && rubricCompositePercent >= 70;
  const withDistinction = automatedCompositePercent >= 90 && rubricCompositePercent >= 90;

  const getRubricLevelLabel = (score: number) => {
    if (score >= 90) return 'Advanced (4/4)';
    if (score >= 80) return 'Proficient (3/4)';
    if (score >= 65) return 'Developing (2/4)';
    return 'Beginning (1/4)';
  };

  const openBadgeMetadata = {
    '@context': 'https://w3id.org/openbadges/v2',
    type: 'Assertion',
    id: `https://reactjav.com/badges/ai-foundations-${Date.now()}`,
    badge: {
      name: 'AI Foundations',
      description:
        'Verified competency in defining AI/ML/DL/GenAI, explaining how models learn from data, auditing everyday AI systems, detecting LLM hallucinations, and applying responsible AI practices.',
      issuer: {
        name: 'ReactJav AI Academy',
        url: 'https://reactjav.com',
      },
      criteria: {
        narrative:
          'Completed 7-hour AI Foundations written curriculum, 4 Module Knowledge Checks (drawn from 10-question banks), No-Code Image Classifier & Chatbot Lab, and passed the "AI in My Life" Authentic Assessment under the Mixed-Model Grading Rubric.',
      },
      skills: [
        'AI & Machine Learning Literacy',
        'Data & Model Training Concepts',
        'LLM Hallucination Verification',
        'Algorithmic Bias & Risk Auditing',
        'Responsible AI Decision-Making',
      ],
    },
    recipient: {
      identity: userName,
      type: 'name',
    },
    verification: {
      type: 'HostedBadge',
      automatedScore: `${automatedCompositePercent}%`,
      rubricScore: `${rubricCompositePercent}%`,
      distinction: withDistinction,
    },
    issuedOn: new Date().toISOString().split('T')[0],
  };

  const handleSubmitAssessment = () => {
    setSubmitted(true);
    if (passedBoth) {
      onCompleteLesson();
    }
  };

  const handleCopyBadgeJson = () => {
    navigator.clipboard.writeText(JSON.stringify(openBadgeMetadata, null, 2));
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2000);
  };

  return (
    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '2rem',
          border: '1px solid var(--border-accent)',
          background: 'var(--bg-surface)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-primary">Authentic Assessment Workspace (2.0 Hours)</span>
          <span className="badge badge-emerald">Mixed-Model Grading: 50% Automated + 50% Rubric</span>
          <span className="badge badge-amber">Pass Rule: ≥70% Both | Distinction: ≥90% Both</span>
        </div>

        <h2 style={{ fontSize: '1.55rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
          Authentic Assessment: “AI in My Life” Audit & Written Explainer
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>
          <strong>Scenario:</strong> A friend or relative says, <em>“Everyone talks about AI, but I don’t get what it actually is.”</em> Follow the 4 steps below: (1) Plan your 5 everyday AI systems and confirm your named audience person, (2) Audit 5 AI systems, (3) Write up your 3-question Chatbot Hallucination Test, and (4) Produce your One-Page Written Explainer or One-Page Infographic (or Stretch Model Card Critique) + Reflection.
        </p>

        {/* Step 0: Plan & Named Audience Person (15 min) */}
        <div
          style={{
            marginTop: '1.25rem',
            padding: '1rem 1.25rem',
            borderRadius: '0.75rem',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <label
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '0.4rem',
            }}
          >
            <Users size={15} />
            <span>Step 1 (Plan — 15 min): Your Named Audience Person (Chosen in Orientation)</span>
          </label>
          <input
            type="text"
            className="form-input"
            value={audiencePerson}
            onChange={(e) => setAudiencePerson(e.target.value)}
            placeholder="Who is the real friend or relative you are writing this explainer for?"
          />
        </div>
      </div>

      {/* ================= COMPONENT 1: 5 AI SYSTEMS AUDIT (45 MIN) ================= */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Step 2 (Audit — 45 min): Audit of 5 Everyday AI Systems You Use
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              For each of the 5 AI systems, record what it does, what data it uses, how it likely learned, one concrete benefit, and one specific risk.
            </p>
          </div>
          <span className={`badge ${completeSystemsCount === 5 ? 'badge-emerald' : 'badge-amber'}`}>
            {completeSystemsCount} / 5 Systems Validated
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {systems.map((sys, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.25rem',
                borderRadius: '0.75rem',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>
                AI System #{idx + 1}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    System Name (e.g., Maps, Spam Filter, Voice Assistant)
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={sys.name}
                    onChange={(e) => {
                      const next = [...systems];
                      next[idx] = { ...next[idx], name: e.target.value };
                      setSystems(next);
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    What It Does (Input &rarr; Output)
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={sys.whatItDoes}
                    onChange={(e) => {
                      const next = [...systems];
                      next[idx] = { ...next[idx], whatItDoes: e.target.value };
                      setSystems(next);
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    What Data It Uses
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={sys.dataUsed}
                    onChange={(e) => {
                      const next = [...systems];
                      next[idx] = { ...next[idx], dataUsed: e.target.value };
                      setSystems(next);
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    How It Likely Learned
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={sys.howItLearned}
                    onChange={(e) => {
                      const next = [...systems];
                      next[idx] = { ...next[idx], howItLearned: e.target.value };
                      setSystems(next);
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    One Concrete Benefit
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={sys.benefit}
                    onChange={(e) => {
                      const next = [...systems];
                      next[idx] = { ...next[idx], benefit: e.target.value };
                      setSystems(next);
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    One Specific Risk
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={sys.risk}
                    onChange={(e) => {
                      const next = [...systems];
                      next[idx] = { ...next[idx], risk: e.target.value };
                      setSystems(next);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= COMPONENT 2: HALLUCINATION TEST (20 MIN) ================= */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Step 3 (Hallucination Test Write-Up — 20 min): 3 Chatbot Questions & Verification
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Build on Part B of the Guided Lab: probe a chatbot on (1) a well-known fact, (2) an obscure/tricky question, and (3) a request for sources. Record screenshots, verification method, and findings.
            </p>
          </div>
          <span className={`badge ${completeHallucinationCount === 3 ? 'badge-emerald' : 'badge-amber'}`}>
            {completeHallucinationCount} / 3 Tests Verified
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {hallucinationTests.map((test, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.25rem',
                borderRadius: '0.75rem',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                {test.questionType}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    Prompt / Question Asked
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={test.questionAsked}
                    onChange={(e) => {
                      const next = [...hallucinationTests];
                      next[idx] = { ...next[idx], questionAsked: e.target.value };
                      setHallucinationTests(next);
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    Screenshot Filename / Evidence Link
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={test.screenshotEvidence}
                    onChange={(e) => {
                      const next = [...hallucinationTests];
                      next[idx] = { ...next[idx], screenshotEvidence: e.target.value };
                      setHallucinationTests(next);
                    }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    Chatbot Response Summary
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={test.chatbotResponse}
                    onChange={(e) => {
                      const next = [...hallucinationTests];
                      next[idx] = { ...next[idx], chatbotResponse: e.target.value };
                      setHallucinationTests(next);
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    How You Verified the Output (4-Step Verification Habit)
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={test.verificationMethod}
                    onChange={(e) => {
                      const next = [...hallucinationTests];
                      next[idx] = { ...next[idx], verificationMethod: e.target.value };
                      setHallucinationTests(next);
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    What You Found (Verified Fact vs. Hallucination)
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={test.findings}
                    onChange={(e) => {
                      const next = [...hallucinationTests];
                      next[idx] = { ...next[idx], findings: e.target.value };
                      setHallucinationTests(next);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= COMPONENT 3: WRITTEN EXPLAINER OR INFOGRAPHIC OR STRETCH OPTION (40 MIN) ================= */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Step 4 (Explainer — 40 min): One-Page Written Explainer or Infographic (Written Format)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Create a One-Page Written Explainer or a One-Page Infographic aimed at your named audience person—or choose the Stretch Option to write a One-Page Critique of a published AI Model Card.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setExplainerMode('standard')}
              className={`btn btn-sm ${explainerMode === 'standard' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Standard: Plain-Language Explainer
            </button>
            <button
              type="button"
              onClick={() => setExplainerMode('stretch')}
              className={`btn btn-sm ${explainerMode === 'stretch' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Stretch Option: Model Card Critique
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
              Submission Format (Written Formats Only — No Video Required)
            </label>
            <select
              className="form-input"
              value={explainerFormat}
              onChange={(e) => setExplainerFormat(e.target.value as 'written' | 'infographic')}
            >
              <option value="written">One-Page Written Explainer (Plain-Language Document)</option>
              <option value="infographic">One-Page Infographic (with Alt Text & Summary)</option>
            </select>
          </div>
          <div style={{ flex: 2, minWidth: '260px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
              {explainerFormat === 'written'
                ? 'One-Page Written Document Link / Reference (Optional)'
                : 'One-Page Infographic Link / Image Reference (Optional)'}
            </label>
            <input
              type="text"
              className="form-input"
              value={explainerMediaUrl}
              onChange={(e) => setExplainerMediaUrl(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginBottom: '0.85rem' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
            {explainerMode === 'standard'
              ? 'One-Page Plain-Language Explainer Text (Include the 10 core glossary terms naturally):'
              : 'One-Page Critique of a Published AI Model Card (Analyze Training Data, Limits & Intended Use):'}
          </label>
          <textarea
            rows={9}
            className="form-input"
            value={explainerContent}
            onChange={(e) => setExplainerContent(e.target.value)}
            style={{ lineHeight: 1.6, fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.78rem' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>
            Automated 10-Term Glossary Check ({matchedGlossaryTerms.length}/{REQUIRED_GLOSSARY_TERMS.length}):
          </span>
          {REQUIRED_GLOSSARY_TERMS.map((term) => {
            const present = matchedGlossaryTerms.includes(term);
            return (
              <span
                key={term}
                className={`badge ${present ? 'badge-emerald' : 'badge-amber'}`}
                style={{ fontSize: '0.7rem' }}
              >
                {present ? '✓' : '○'} {term}
              </span>
            );
          })}
        </div>
      </div>

      {/* ================= COMPONENT 4: REFLECTION, RUBRIC SELF-ASSESSMENT & SURVEY ================= */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.85rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Segment 8: Personal Reflection (150–200 Words), Rubric Self-Check & Survey
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Write 150–200 words on what surprised you and how you will use AI differently, self-assess against the 4-level rubric, and submit your package.
            </p>
          </div>
          <span className={`badge ${reflectionWords >= 150 && reflectionWords <= 220 ? 'badge-emerald' : 'badge-primary'}`}>
            Word Count: {reflectionWords} words
          </span>
        </div>

        <textarea
          rows={5}
          className="form-input"
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          style={{ lineHeight: 1.65, fontSize: '0.9rem', marginBottom: '1rem' }}
        />

        <div
          style={{
            padding: '1rem',
            borderRadius: '0.65rem',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1rem',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={selfCheckConfirmed}
              onChange={(e) => setSelfCheckConfirmed(e.target.checked)}
            />
            <span>
              Rubric Self-Assessment (5 min): I have checked my submission against the 4 rubric criteria (Accuracy of AI concepts, Clarity for my named audience person, Critical thinking about specific risks, and Reflection).
            </span>
          </label>
          <div style={{ marginTop: '0.75rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
              Short Course Feedback Survey (Optional): What part of the 7-hour course helped you most?
            </label>
            <input
              type="text"
              className="form-input"
              value={surveyFeedback}
              onChange={(e) => setSurveyFeedback(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleSubmitAssessment}
            className="btn btn-primary btn-lg"
            style={{ gap: '0.5rem', fontWeight: 800 }}
          >
            <FileCheck size={18} />
            <span>{submitted ? 'Re-Validate & Update Grade' : 'Run Mixed-Model Grading & Submit Full Package'}</span>
          </button>
        </div>
      </div>

      {/* ================= MIXED-MODEL GRADING REPORT & OPEN BADGE CREDENTIALS ================= */}
      {submitted && (
        <div
          className="glass-card animate-fade-in"
          style={{
            padding: '2rem',
            border: passedBoth ? '2px solid #10b981' : '2px solid #f59e0b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span className={`badge ${withDistinction ? 'badge-emerald' : passedBoth ? 'badge-primary' : 'badge-amber'}`}>
                {withDistinction
                  ? '★ PASSED WITH DISTINCTION (≥90% IN BOTH COMPONENTS)'
                  : passedBoth
                  ? '✓ PASSED (≥70% IN BOTH COMPONENTS)'
                  : 'REVISION NEEDED (REVISE & RESUBMIT ONCE)'}
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                Mixed-Model Grading Report: {overallGradePercent}% Overall
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ padding: '0.85rem 1.25rem', borderRadius: '0.75rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>AUTOMATED CHECKS (50% WT)</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: automatedCompositePercent >= 70 ? '#10b981' : '#f59e0b' }}>
                  {automatedCompositePercent}%
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  Module Quizzes (25%): {moduleQuizzesPercent}% | Validator (25%): {submissionValidationPercent}%
                </div>
              </div>

              <div style={{ padding: '0.85rem 1.25rem', borderRadius: '0.75rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>4-LEVEL RUBRIC (50% WT)</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: rubricCompositePercent >= 70 ? '#10b981' : '#f59e0b' }}>
                  {rubricCompositePercent}%
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  Level: {getRubricLevelLabel(rubricCompositePercent)}
                </div>
              </div>
            </div>
          </div>

          {/* 4-Level Rubric Breakdown Table */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
            <div style={{ padding: '1rem', borderRadius: '0.65rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)' }}>1. Accuracy of AI Concepts</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, margin: '0.25rem 0' }}>{getRubricLevelLabel(rubricAccuracy)}</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                Definitions and explanations are correct, with AI/ML/GenAI distinctions clear.
              </p>
            </div>

            <div style={{ padding: '1rem', borderRadius: '0.65rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)' }}>2. Clarity for the Audience</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, margin: '0.25rem 0' }}>{getRubricLevelLabel(rubricClarity)}</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                A non-technical reader ({audiencePerson.split('—')[0].trim()}) can understand the explainer without extra help.
              </p>
            </div>

            <div style={{ padding: '1rem', borderRadius: '0.65rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)' }}>3. Critical Thinking About Risks</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, margin: '0.25rem 0' }}>{getRubricLevelLabel(rubricCriticalThinking)}</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                Risks are specific to each system, not generic, and chatbot verification is credible.
              </p>
            </div>

            <div style={{ padding: '1rem', borderRadius: '0.65rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)' }}>4. Reflection</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, margin: '0.25rem 0' }}>{getRubricLevelLabel(rubricReflection)}</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                Connects learning to personal decisions about future responsible AI use.
              </p>
            </div>
          </div>

          {/* Credentials & Open Badge */}
          {passedBoth && (
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '0.85rem',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(37, 99, 235, 0.12) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #059669 0%, #2563eb 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      flexShrink: 0,
                    }}
                  >
                    <Award size={28} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>
                      Verified Credential & Open Badge Unlocked
                    </div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
                      AI Foundations: Certificate of Completion {withDistinction ? '(With Distinction)' : ''}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                      Open Badge Name: <strong>“AI Foundations”</strong> • Includes verified skills & assessment evidence in metadata for LinkedIn / CV.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyBadgeJson}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.4rem', fontWeight: 700 }}
                >
                  {copiedBadge ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                  <span>{copiedBadge ? 'Open Badge Metadata Copied!' : 'Copy Open Badge JSON Metadata'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
