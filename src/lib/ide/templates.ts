import { IDETemplate } from '@/types/ide';

export const IDE_TEMPLATES: IDETemplate[] = [
  // ----------------------------------------------------
  // PYTHON CHALLENGES & TEMPLATES
  // ----------------------------------------------------
  {
    id: 'py-analytics',
    title: 'Python • Student Grade Analytics & Quartiles',
    description: 'Calculate mean, median, standard deviation, and letter grade distributions from raw exam datasets.',
    language: 'python',
    difficulty: 'Beginner',
    category: 'Data Science & Algorithms',
    instructions: `### Objective
Analyze an array of student numerical scores (0-100), computing:
1. Mean, median, and max scores.
2. Percentage of scholars scoring Distinction (>= 80), Merit (65-79), and Pass (50-64).
3. Identify top performers.

Run the code to see your formatted executive report in the output console!`,
    expectedOutcome: 'Print summary statistics table and distinction honors list.',
    files: [
      {
        id: 'main-py',
        name: 'main.py',
        language: 'python',
        content: `# ==============================================================================
# REACTJav Campus Intranet: Python Data Science Practice
# Challenge: Student Grade Analytics & Statistical Metrics
# ==============================================================================

import statistics

# Raw cohort examination scores
scores = [92, 85, 78, 64, 91, 53, 44, 88, 72, 95, 68, 81, 74, 89, 97, 60]

def analyze_cohort_performance(data):
    print("--------------------------------------------------")
    print("      REACTJav ACADEMY: COHORT SCORE AUDIT        ")
    print("--------------------------------------------------")
    
    total_students = len(data)
    mean_score = statistics.mean(data)
    median_score = statistics.median(data)
    highest_score = max(data)
    lowest_score = min(data)
    
    print(f"Total Exam Submissions : {total_students}")
    print(f"Cohort Average (Mean)  : {mean_score:.2f}%")
    print(f"Cohort Median Score    : {median_score:.2f}%")
    print(f"Score Range            : [{lowest_score}% -> {highest_score}%]")
    print("--------------------------------------------------")
    
    # Grade classification
    distinction = [s for s in data if s >= 80]
    merit = [s for s in data if 65 <= s < 80]
    pass_mark = [s for s in data if 50 <= s < 65]
    needs_review = [s for s in data if s < 50]
    
    print("GRADE BAND DISTRIBUTION:")
    print(f"  [A] Distinction (80-100%) : {len(distinction)} ({len(distinction)/total_students*100:.1f}%)")
    print(f"  [B] Merit       (65-79%)  : {len(merit)} ({len(merit)/total_students*100:.1f}%)")
    print(f"  [C] Pass        (50-64%)  : {len(pass_mark)} ({len(pass_mark)/total_students*100:.1f}%)")
    print(f"  [D] Attention   (<50%)    : {len(needs_review)} ({len(needs_review)/total_students*100:.1f}%)")
    print("--------------------------------------------------")
    print("Top Distinction Honors Scores:", sorted(distinction, reverse=True))

if __name__ == "__main__":
    analyze_cohort_performance(scores)
`
      }
    ]
  },
  {
    id: 'py-oop',
    title: 'Python • Object-Oriented Campus Registry',
    description: 'Implement an OOP class hierarchy for Scholars, Instructors, and Course Enrollments.',
    language: 'python',
    difficulty: 'Intermediate',
    category: 'Software Engineering & OOP',
    instructions: `### Objective
Build a modern Object-Oriented model representing:
- Base class \`Person\` with email and identification.
- \`Student\` subclass tracking completed credit hours and GPA.
- \`Course\` class that maintains an active roster and enrolls students.`,
    expectedOutcome: 'Print detailed roster summaries and enrollment statuses.',
    files: [
      {
        id: 'main-py',
        name: 'main.py',
        language: 'python',
        content: `# ==============================================================================
# REACTJav Campus Intranet: OOP Student & Course Registry
# ==============================================================================

class Person:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def get_details(self):
        return f"{self.name} <{self.email}>"

class Student(Person):
    def __init__(self, name: str, email: str, matric_no: str, gpa: float):
        super().__init__(name, email)
        self.matric_no = matric_no
        self.gpa = gpa
        self.completed_credits = 0

    def add_credits(self, credits: int):
        self.completed_credits += credits

    def is_honor_roll(self) -> bool:
        return self.gpa >= 3.75

class Course:
    def __init__(self, code: str, title: str, capacity: int = 3):
        self.code = code
        self.title = title
        self.capacity = capacity
        self.roster = []

    def enroll(self, student: Student) -> bool:
        if len(self.roster) >= self.capacity:
            print(f"[ERROR] Cannot enroll {student.name}: Course {self.code} is at capacity!")
            return False
        self.roster.append(student)
        print(f"[SUCCESS] Enrolled {student.name} ({student.matric_no}) in {self.code}")
        return True

    def display_roster(self):
        print(f"\\n================ ROSTER: {self.code} - {self.title} ================")
        print(f"Enrolled: {len(self.roster)} / {self.capacity}")
        for idx, student in enumerate(self.roster, 1):
            honor_tag = "[★ HONOR ROLL]" if student.is_honor_roll() else ""
            print(f"  {idx}. {student.name} (GPA: {student.gpa:.2f}) {honor_tag}")

# --- Demonstration Run ---
s1 = Student("Ahmed Mansouri", "ahmed@reactjav.edu", "RJ-2026-001", 3.92)
s2 = Student("Chris Okoth", "chris@reactjav.edu", "RJ-2026-002", 3.84)
s3 = Student("Amina Bello", "amina@reactjav.edu", "RJ-2026-003", 3.65)
s4 = Student("David Chen", "david@reactjav.edu", "RJ-2026-004", 3.78)

course = Course("CS-301", "Full-Stack Web Architecture & Cloud Systems", capacity=3)
course.enroll(s1)
course.enroll(s2)
course.enroll(s3)
course.enroll(s4) # Should trigger capacity limit

course.display_roster()
`
      }
    ]
  },
  {
    id: 'py-algorithms',
    title: 'Python • Recursion & Binary Search Benchmark',
    description: 'Implement logarithmic binary search and recursive divide-and-conquer algorithms.',
    language: 'python',
    difficulty: 'Intermediate',
    category: 'Algorithms & Data Structures',
    instructions: `### Objective
Explore time complexity differences between linear O(n) search and binary O(log n) search on sorted arrays.`,
    expectedOutcome: 'Comparison of iterations required to locate values in large datasets.',
    files: [
      {
        id: 'main-py',
        name: 'main.py',
        language: 'python',
        content: `# ==============================================================================
# Binary Search vs Linear Search: Algorithmic Complexity Demo
# ==============================================================================

def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    steps = 0

    while low <= high:
        steps += 1
        mid = (low + high) // 2
        guess = arr[mid]

        if guess == target:
            return mid, steps
        elif guess > target:
            high = mid - 1
        else:
            low = mid + 1

    return -1, steps

# Create a sorted dataset of 100,000 items
data = list(range(1, 100001))
target_value = 78923

print(f"Searching for target {target_value} in dataset of {len(data):,} items...")
index, steps = binary_search(data, target_value)

print(f"Target found at index : {index}")
print(f"Binary Search steps   : {steps} iterations (Logarithmic O(log n))")
print(f"Worst Linear Search   : {target_value:,} iterations (Linear O(n))")
print(f"Efficiency Gain       : ~{target_value / steps:.0f}x faster!")
`
      }
    ]
  },
  {
    id: 'py-blank',
    title: 'Python • Scratchpad & Free Practice',
    description: 'Clean blank Python 3 environment for experiments, math, loops, and scripting.',
    language: 'python',
    difficulty: 'Beginner',
    category: 'Free Practice',
    instructions: 'Write any custom Python 3 code. Click "Run Code" or press Ctrl+Enter to execute.',
    files: [
      {
        id: 'main-py',
        name: 'main.py',
        language: 'python',
        content: `# Welcome to the REACTJav Python Sandbox!
# Write your code here and press Run Code (or Ctrl+Enter)

def greeting(name):
    return f"Welcome to REACTJav Campus Sandbox, {name}!"

for i in range(1, 6):
    print(f"Step {i}: {greeting('Scholar')}")
`
      }
    ]
  },

  // ----------------------------------------------------
  // JAVASCRIPT CHALLENGES
  // ----------------------------------------------------
  {
    id: 'js-async-pipeline',
    title: 'JavaScript • Async/Await & Promise Chaining',
    description: 'Simulate microservice API fetches, retries, and concurrent Promise.all execution.',
    language: 'javascript',
    difficulty: 'Intermediate',
    category: 'Frontend & Full-Stack',
    instructions: 'Execute asynchronous workflows with error simulation and batch processing.',
    files: [
      {
        id: 'main-js',
        name: 'main.js',
        language: 'javascript',
        content: `// ==============================================================================
// JavaScript: Async/Await & Concurrent API Resolution
// ==============================================================================

async function fetchCourseData(courseId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: courseId,
        title: "Cloud Infrastructure on Supabase",
        enrolledScholars: 245,
        rating: 4.9
      });
    }, 120);
  });
}

async function fetchInstructor(instructorId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: instructorId,
        name: "Dr. Farida K.",
        role: "Principal Systems Architect"
      });
    }, 150);
  });
}

async function runCampusPipeline() {
  console.log("--> Initiating Concurrent Campus API Requests...");
  const startTime = performance.now();

  try {
    const [course, instructor] = await Promise.all([
      fetchCourseData("crs_001"),
      fetchInstructor("ins_99")
    ]);

    const duration = (performance.now() - startTime).toFixed(2);
    console.log(\`✓ Both services resolved concurrently in \${duration}ms\\n\`);

    console.log("--- Summary Report ---");
    console.log(\`Course    : \${course.title}\`);
    console.log(\`Enrolled  : \${course.enrolledScholars} fellows\`);
    console.log(\`Rating    : \${course.rating} ★\`);
    console.log(\`Instructor: \${instructor.name} (\${instructor.role})\`);
  } catch (err) {
    console.error("Pipeline failure:", err.message);
  }
}

runCampusPipeline();
`
      }
    ]
  },
  {
    id: 'js-blank',
    title: 'JavaScript • Modern ES6+ Scratchpad',
    description: 'Interactive JavaScript workspace with console logging and object inspections.',
    language: 'javascript',
    difficulty: 'Beginner',
    category: 'Free Practice',
    instructions: 'Write modern ES6+ code. Objects and console methods output to the interactive terminal.',
    files: [
      {
        id: 'main-js',
        name: 'main.js',
        language: 'javascript',
        content: `// JavaScript ES6+ Sandbox
const scholars = [
  { name: "Ahmed", track: "Software Engineering", score: 94 },
  { name: "Chris", track: "AI Career Essentials", score: 88 },
  { name: "Amina", track: "Data Analytics", score: 96 }
];

const topPerformers = scholars
  .filter(s => s.score >= 90)
  .map(s => \`\${s.name} (\${s.track}) - \${s.score}%\`);

console.log("Top Performers Cohort 2026:");
topPerformers.forEach(item => console.log("  ★ " + item));
`
      }
    ]
  },

  // ----------------------------------------------------
  // HTML / CSS / WEB APP PREVIEWS
  // ----------------------------------------------------
  {
    id: 'web-glassmorphism',
    title: 'Web App • Glassmorphism Scholar ID Badge',
    description: 'Design a responsive, frosted-glass digital student identification card with interactive effects.',
    language: 'html',
    difficulty: 'Beginner',
    category: 'Web Design & UI/UX',
    instructions: 'Edit the HTML and CSS. The live web preview pane renders your interface in real time!',
    files: [
      {
        id: 'index-html',
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
    body {
      background: radial-gradient(circle at 10% 20%, #4f46e5 0%, #0f172a 90%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .card {
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 1.5rem;
      padding: 2rem;
      width: 100%;
      max-width: 360px;
      color: white;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
      transition: transform 0.3s ease;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }
    .brand {
      font-weight: 900;
      font-size: 1.1rem;
      letter-spacing: -0.02em;
    }
    .badge {
      background: rgba(16, 185, 129, 0.25);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
      padding: 0.25rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.7rem;
      font-weight: 700;
    }
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 2px solid #818cf8;
      margin-bottom: 1rem;
      object-fit: cover;
    }
    h2 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.25rem; }
    .track { color: #cbd5e1; font-size: 0.85rem; margin-bottom: 1.25rem; }
    .meta-row {
      display: flex;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      font-size: 0.75rem;
    }
    .btn-verify {
      width: 100%;
      margin-top: 1.25rem;
      background: #4f46e5;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-verify:hover { background: #4338ca; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="brand">React<span style="color: #38bdf8;">Jav</span></span>
      <span class="badge">CLEARED FELLOW</span>
    </div>
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" class="avatar" alt="Scholar">
    <h2>Ahmed El-Mansouri</h2>
    <p class="track">Software Engineering • Cohort 2026</p>
    <div class="meta-row">
      <div>
        <div style="opacity: 0.7;">MATRIC NO.</div>
        <strong>RJ-2026-089</strong>
      </div>
      <div style="text-align: right;">
        <div style="opacity: 0.7;">STATUS</div>
        <strong style="color: #34d399;">Active Clearance</strong>
      </div>
    </div>
    <button class="btn-verify" onclick="alert('Credential cryptographically verified by REACTJav Campus Registry!')">
      Verify Credentials
    </button>
  </div>
</body>
</html>
`
      }
    ]
  },

  // ----------------------------------------------------
  // SQL QUERY SANDBOX
  // ----------------------------------------------------
  {
    id: 'sql-honor-roll',
    title: 'SQL • Query Honor Roll Scholars & Transcripts',
    description: 'Write relational SQL queries with SELECT, WHERE, ORDER BY, and aggregates.',
    language: 'sql',
    difficulty: 'Beginner',
    category: 'Database Systems',
    instructions: `### Objective
Query the in-memory \`students\` table to list scholars who have achieved GPA >= 3.75, sorted in descending order.`,
    expectedOutcome: 'Tabular database result with columns for id, full_name, track, gpa, and credits.',
    files: [
      {
        id: 'query-sql',
        name: 'query.sql',
        language: 'sql',
        content: `-- ==============================================================================
-- REACTJav Database Systems: Query Honor Roll Students
-- Available tables: students, courses, cbt_results
-- ==============================================================================

SELECT 
  id, 
  full_name, 
  track, 
  gpa, 
  completed_credits, 
  cohort 
FROM students 
WHERE gpa >= 3.70 
ORDER BY gpa DESC;
`
      }
    ]
  },
  {
    id: 'sql-enrollment-stats',
    title: 'SQL • Course Enrollments & Capacity Analysis',
    description: 'Aggregate course statistics and analyze student distribution across academic tracks.',
    language: 'sql',
    difficulty: 'Intermediate',
    category: 'Database Systems',
    instructions: 'Query the courses catalog table to inspect level distributions and pricing.',
    files: [
      {
        id: 'query-sql',
        name: 'query.sql',
        language: 'sql',
        content: `-- ==============================================================================
-- Course Enrollment & Capacity Analysis
-- ==============================================================================

SELECT 
  code, 
  title, 
  level, 
  instructor, 
  enrolled_count, 
  capacity,
  ROUND((enrolled_count * 100.0 / capacity), 1) AS fill_rate_percent
FROM courses
ORDER BY fill_rate_percent DESC;
`
      }
    ]
  }
];
