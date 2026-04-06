# 🎨 VeriQ Master Brand Colors & Typography

## Typography
* **Font Family:** **Sora** (Available on Google Fonts)
* **Weights Used:** Regular (400) for standard readability, Semi-Bold (600) for buttons and minor headers, Bold (700) for massive hero headers.

## Exact Hex Color Palette
* **Deepest Background (Page Base):** `#070d14` (Used as the absolute root background color of the body).
* **Surface Background (Cards / Panels):** `#0d1722` (Used for floating elements, drop-zones, and test cards to create depth).
* **Primary Brand Accent (Neon Cyan):** `#00d4d4` (Used for primary action buttons, loading bars, and glowing shadow effects).
* **Secondary Text / Muted Subtitles:** `#8a9ab0` (Used for paragraphs and structural instructions so they don't distract).
* **Primary Text (Headers / Main text):** `#ffffff` (Pure White).
* **Subtle Glass Borders / Dividers:** `rgba(255, 255, 255, 0.1)` (Used for card borders to give the glassmorphism effect).

---

# 📄 Detailed Technical PDF Content

## Part 1: Comprehensive Technology Stack

VeriQ is constructed on a bleeding-edge, serverless Full-Stack ecosystem. By leveraging edge computing and native AI SDKs, the platform completely eliminates the need for legacy database polling and heavy monolithic Java/Python servers, vastly increasing speed while virtually eliminating latency.

### 1. Frontend & Client-Side Engineering
* **Next.js 14+ (App Router):** The bedrock of the application. Next.js was chosen because it allows for hybrid rendering—meaning complex recruiter dashboards can be securely generated on the server (SSR) while highly interactive candidate test interfaces can be offloaded to the client browser (CSR) for instant interactions without reloading.
* **TypeScript:** VeriQ utilizes strict TypeScript to enforce data structures. Everything from the exact structure of an incoming Resume object to the array of generated AI questions is strictly typed, heavily mitigating runtime crashes and preventing fraudulent data payloads.
* **Tailwind CSS v4:** The platform's dark, "glassmorphism" aesthetic is engineered entirely with Tailwind utility classes. This allows developers to build intricate hover animations and responsive mobile grids directly inside the React components, drastically speeding up design iteration.
* **Framer Motion:** Used to inject premium, GPU-accelerated physics into the application. Micro-interactions like the bouncing cloud icon during PDF upload or the smooth fading transition between test questions are powered by this library, providing a high-end application "feel."
* **Clerk Authentication (`@clerk/nextjs`):** A zero-trust identity management provider. Clerk handles session security, multi-factor logins, and route protection natively, completely removing the massive security liability of storing raw passwords in local databases.

### 2. Backend API & Processing Infrastructure
* **Next.js Serverless Routes:** Instead of spinning up a dedicated Express.js or Python server, VeriQ's backend endpoints (like `/api/parse-resume`) operate natively inside Next.js as serverless edge functions. They immediately scale up on demand to process a request and scale to zero when idle, minimizing infrastructure costs.
* **pdf-parse Array Buffer Module:** When a candidate uploads a resume, the platform uses this deeply integrated Node.js library to rip the raw string text sequentially straight out of the binary PDF file payload. This happens instantaneously purely in memory, ensuring no candidate data is ever permanently saved to a disk or exposed to a third-party server prior to evaluation.

### 3. Google Artificial Intelligence Core
* **Google Generative AI SDK (`@google/generative-ai`):** VeriQ bypassing standard ATS (Applicant Tracking Systems) keyword scanners by feeding the extracted text directly into Google's foundational AI infrastructure. 
* **The `gemini-pro` Model:** This sophisticated model acts as the **Resume Parser**. Using highly specialized "Anti-Hallucination" prompt engineering, it is strictly forbidden from guessing. It reads the raw PDF strings, identifies explicit hard-skills, and surgically outputs them as structured JSON objects (Name, Email, Skills). 
* **The `gemini-1.5-flash` Model:** This lightning-fast model acts as the **Assessment Engine**. It dynamically compiles custom Multiple Choice Questions (MCQs) in real time based strictly on the exact skills gemini-pro discovered, making it impossible to predict or pre-game the test.

---

## Part 2: Detailed System Architecture & Application Flow

The VeriQ platform automates the entire candidate vetting cycle—from the second an applicant lands on the recruiting page to the exact moment their final technical score flashes on the HR dashboard. 

### Step 1: Secure Onboarding & Identity Mapping
When a candidate clicks to enter the assessment portal, the application intercepts them via the Clerk Authentication middleware. Candidates are required to create a verifiable session via Email OTP (One Time Password) or a connected GitHub/Google account. Only authenticated users can trigger the underlying Next.js API endpoints, protecting the system from bot-net spam targeting the AI engine.

### Step 2: The Document Extraction Pipeline
Once authenticated, the candidate is presented with a sleek drag-and-drop zone. When a PDF is uploaded, the browser converts the file into an encoded `FormData` array buffer and transmits it securely to the `/api/parse-resume` server route. 
Here, the Node.js `pdf-parse` module converts the binary file chunk into contiguous string data. The server then packages this string alongside a critical instruction set and transmits it to the **gemini-pro** AI. The AI searches the raw data exclusively for empirical technical skills (e.g., React, Go, Docker) while filtering out superficial fluff phrases (e.g., "Hard worker"). 

### Step 3: Real-Time Assessment Compilation
The frontend UI updates instantly, proudly displaying the exact skills the AI stripped from the resume. When the Candidate approves the skill list and clicks "Proceed", the application triggers `/api/generate-test`.
The **gemini-1.5-flash** AI engine intercepts the specific list of skills. Relying on its massive underlying coding intellect, it instantly weaves together 10 difficult, technically accurate Multiple Choice Questions designed to test the specific limits of those declared tools. It embeds the correct mathematical answers inside a hidden JSON payload transmitted invisibly to the client.

### Step 4: Live Execution & Fraud-Proof Scoring
The candidate enters the test dashboard and begins executing the exam. 
Because the exam was compiled dynamically literally three seconds ago, the questions are completely unique and cannot be copy-pasted into Google or ChatGPT easily without failing time-limits. 
As the candidate makes their selections, the React state engine stores their inputs. Upon final submission, the application cross-references their answers rapidly against the hidden AI truth payload. 
The system algorithmically calculates their final technical capability tier. This generated score provides recruiters with empirical, undeniable proof of a candidate's abilities, completely eliminating the guesswork from the hiring pipeline.
