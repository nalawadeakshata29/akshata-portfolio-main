/**
 * All of the site's copy lives in this one file.
 * To update the portfolio, edit the values below — the page re-renders from them.
 */

export const profile = {
  name: { first: "Akshata", last: "Nalawade" },
  role: "Electronics & Computer Science engineer",
  location: "Mumbai, India",
  school: "Vidyalankar Institute of Technology",
  classOf: "2027",

  // Her own words, from her GitHub profile.
  thesis:
    "I like turning messy real-world workflows into systems that run on their own.",

  // Small uppercase line under the big headline.
  intro:
    "An engineering student who turns messy real-world workflows into systems that run on their own",

  // Profile picture in /public, shown in a gradient ring in the hero.
  // A square photo works best. Leave empty to show the gradient orb instead.
  avatar: "/akshata-portrait.jpg",

  about: [
    "I'm an Electronics & Computer Science engineering student at Vidyalankar Institute of Technology who builds across full-stack web, applied machine learning, and conversational AI.",
    "Most recently I built House Muse, an AI interior design platform that redesigns a room from a single photo, and shipped a lead-handling chatbot on Zoho SalesIQ during my internship at Trinetrini Quantum. I'm comfortable with Python, JavaScript, SQL, REST APIs, computer vision, and Linux and cloud fundamentals.",
  ],

  links: {
    email: "nalawadeakshata00@gmail.com",
    github: "https://github.com/nalawadeakshata29",
    linkedin: "https://www.linkedin.com/in/akshata-nalawade-b2297436b/",
    // To update the resume, replace this file in /public with the same name.
    resume: "/Akshata_Nalawade_Resume.pdf",
  },

  // Shown above the email address in the Contact section.
  contactNote:
    "I'm looking for internships in full-stack development and applied AI. If you're hiring, building something interesting, or just want to talk shop, my inbox is open.",
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Comparison = {
  label: string;
  before: ProjectImage;
  after: ProjectImage;
};

// Screenshots go in /public/projects; set image/images and the drawn visual is replaced automatically.
export type Project = {
  slug: string;
  title: string;
  kicker?: string; // short "cover line"
  context?: string; // e.g. "Internship · Trinetrini Quantum"
  summary: string;
  points?: string[];
  tech: string[];
  repo?: string;
  live?: string;
  featured?: boolean;
  image?: ProjectImage; // cover
  images?: ProjectImage[]; // extra screenshots; images[0] renders as an inset
  comparisons?: Comparison[];
  visual?: "chat-flow" | "sign" | "parlour"; // drawn artwork used when there is no image
};

const img = (
  src: string,
  alt: string,
  width: number,
  height: number,
): ProjectImage => ({ src, alt, width, height });

export const projects: Project[] = [
  {
    slug: "house-muse",
    title: "House Muse",
    kicker: "A room photo in, a photorealistic redesign out",
    summary:
      "An AI interior design platform that redesigns a room from one photo while keeping its walls, windows, and layout intact.",
    points: [
      "Generates redesigns with SDXL, Depth ControlNet, and style LoRAs, so the room's structure survives the restyle.",
      "Three services: a React + TypeScript frontend, a Django REST backend with token auth and Google OAuth, and a Flask ML microservice.",
      "Vision pipeline (YOLOv8, SAM, CLIP, K-Means) for object detection, room-type classification, lighting analysis, and colour palette extraction.",
      "Catalog-based budget breakdowns in ₹ across 7 categories with an interactive donut chart, plus chat-driven refinement using img2img.",
    ],
    tech: [
      "React",
      "TypeScript",
      "Django REST Framework",
      "Flask",
      "PostgreSQL",
      "PyTorch",
      "OpenCV",
      "Hugging Face",
    ],
    repo: "https://github.com/nalawadeakshata29/House-Muse",
    featured: true,
    comparisons: [
      {
        label: "Living room · Victorian",
        before: img(
          "/projects/house-muse-before-1.jpg",
          "The original photo: an empty room with a tall arched window",
          1024,
          640,
        ),
        after: img(
          "/projects/house-muse-after-1.jpg",
          "House Muse redesign of the same room in a Victorian style, with the arched window kept in place",
          1024,
          640,
        ),
      },
      {
        label: "Bedroom · Victorian",
        before: img(
          "/projects/house-muse-before-2.jpg",
          "The original photo: a plain bedroom",
          1024,
          640,
        ),
        after: img(
          "/projects/house-muse-after-2.jpg",
          "House Muse redesign of the same bedroom in a Victorian style",
          1024,
          640,
        ),
      },
      {
        label: "Living room · Eclectic",
        before: img(
          "/projects/house-muse-before-3.jpg",
          "The original photo: an empty living room",
          640,
          1024,
        ),
        after: img(
          "/projects/house-muse-after-3.jpg",
          "House Muse redesign of the same living room in an eclectic style",
          640,
          1024,
        ),
      },
    ],
  },
  {
    slug: "salesiq-chatbot",
    title: "Lead-handling chatbot",
    kicker: "A chatbot that answers visitors and captures leads",
    context: "Internship · Trinetrini Quantum",
    summary:
      "A conversion-focused chatbot for Trinetrini Quantum's website, built on Zoho SalesIQ to automate lead handling.",
    points: [
      "Mapped user intents and designed decision-tree conversation flows that guide visitors through common queries.",
      "Handled the Zoho integration, workflow automation, testing, and deployment.",
      "Structured interaction handling to cut repetitive manual responses.",
    ],
    tech: [
      "Zoho SalesIQ",
      "Conversational AI",
      "Workflow automation",
      "Decision trees",
      "JavaScript",
    ],
    visual: "chat-flow",
  },
  {
    slug: "netlab",
    title: "NetLab",
    summary:
      "A virtual network lab, now at v2.0, with six interactive experiments: Stop-and-Wait, Go-Back-N, Selective Repeat, Error Detection, Timeout ARQ, and Window Analysis.",
    tech: ["JavaScript", "Canvas", "Networking"],
    repo: "https://github.com/nalawadeakshata29/Net-lab",
    image: img(
      "/projects/netlab-home.jpg",
      "NetLab v2.0 home page listing its six experiments",
      1440,
      900,
    ),
    images: [
      img(
        "/projects/netlab-go-back-n.jpg",
        "NetLab's Go-Back-N timeline: frames and acknowledgements between sender and receiver, with a lost frame marked in red",
        1060,
        740,
      ),
    ],
  },
  {
    slug: "ishaara-speak",
    title: "IshaaraSpeak",
    kicker: "Speech in, 3D sign language out",
    summary:
      "An accessibility system that converts speech to text and renders it as 3D sign language.",
    points: [
      "Real-time audio processing and gesture mapping.",
      "Built with CNNs, OpenCV, and MediaPipe.",
    ],
    tech: [
      "Python",
      "JavaScript",
      "CNN",
      "OpenCV",
      "MediaPipe",
      "3D animation",
    ],
    repo: "https://github.com/nalawadeakshata29/ishaara_speak",
    visual: "sign",
  },
  {
    slug: "weather-classification",
    title: "Weather Classification",
    summary:
      "Classifies weather from sky images, comparing MobileNetV2, ResNet18, and a custom CNN, with Grad-CAM explanations and a Flask web app.",
    tech: ["PyTorch", "CNN", "Grad-CAM", "Flask"],
    repo: "https://github.com/nalawadeakshata29/Weather-Classification",
    image: img(
      "/projects/weather-gradcam.jpg",
      "Grad-CAM heatmap over a landscape photo, showing the regions the weather classifier relied on",
      640,
      427,
    ),
  },
  {
    slug: "creamy-bliss",
    title: "Creamy Bliss",
    kicker: "The day-to-day of an ice cream parlour, online",
    summary:
      "A responsive full-stack web application for an ice cream parlour.",
    points: [
      "Node.js backend and PostgreSQL database supporting day-to-day operations.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "PostgreSQL"],
    visual: "parlour",
  },
];

export const stats = [
  { value: "3", label: "services behind House Muse" },
  { value: "6", label: "interactive experiments in NetLab" },
  { value: "3", label: "models compared for weather classification" },
  { value: "60h", label: "cloud & Linux training at C-DAC" },
];

export const ui = {
  skipLink: "Skip to content",
  nav: [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ],
  greeting: "Hi, I'm",
  // Small floating tags around the profile picture in the hero.
  focus: ["Full-stack web", "Computer vision", "Conversational AI"],
  latestProject: "Latest project",
  availability: "Open to internships", // rendered as "{availability} · Class of {classOf}"
  contactCta: "Contact me",
  emailCta: "Email me",
  resumeCta: "Download resume",
  backToTop: "Back to top",
  sections: {
    about: { eyebrow: "Who I am", title: "About me" },
    projects: { eyebrow: "Selected work", title: "Projects" },
    experience: { eyebrow: "Internship & courses", title: "Experience" },
    skills: { eyebrow: "Toolkit", title: "Skills" },
    contact: { eyebrow: "Get in touch", title: "Let's talk" },
  },
  bento: {
    now: "What I build",
    education: "Education",
    basedIn: "Based in",
    numbers: "By the numbers",
    beyond: "Beyond code",
  },
  work: {
    flagship: "Flagship project",
    viewCode: "View the code",
    before: "Before",
    after: "After",
    dragHint: "Drag to compare",
    sliderLabel: "Compare the original photo with the redesign",
    pairsLabel: "Choose a room",
    countSuffix: "projects",
  },
  social: { github: "GitHub", linkedin: "LinkedIn" },
};

export const experience = [
  {
    title: "AI Chatbot Development Intern",
    org: "Trinetrini Quantum",
    when: "1 Dec – 15 Jan",
    points: [
      "Hands-on work in conversational AI, chatbot flow design, and workflow automation on Zoho SalesIQ.",
      "Built and shipped the company's lead-handling website chatbot.",
    ],
  },
  {
    title: "Certificate Course in Cloud Computing",
    org: "C-DAC ACTS, Pune",
    when: "5 June – 15 June",
    points: [
      "60 hours of training in cloud computing, basic and advanced Linux, and deployment.",
      "Practical exposure to cloud-based solutions, Linux environments, and DevOps fundamentals.",
    ],
  },
  {
    title: "Fundamentals of Machine Learning",
    org: "Infosys Springboard",
    when: "Completed",
    points: [],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"],
  },
  {
    group: "Frontend",
    items: ["React", "Vite", "Tailwind CSS", "Responsive UI", "Figma"],
  },
  {
    group: "Backend & APIs",
    items: [
      "Node.js",
      "Django",
      "Django REST Framework",
      "Flask",
      "REST APIs",
      "Token auth",
      "Google OAuth",
    ],
  },
  { group: "Databases", items: ["PostgreSQL", "SQLite"] },
  {
    group: "AI / ML & vision",
    items: [
      "CNN",
      "KNN",
      "YOLOv8",
      "OpenCV",
      "MediaPipe",
      "Stable Diffusion (SDXL, ControlNet)",
      "K-Means",
      "Pandas",
      "NumPy",
    ],
  },
  {
    group: "Cloud & tools",
    items: [
      "Linux",
      "Cloud computing",
      "Hugging Face Spaces",
      "Git & GitHub",
      "Jupyter",
      "Google Colab",
      "Zoho SalesIQ",
    ],
  },
];

export const education = [
  {
    school: "Vidyalankar Institute of Technology",
    detail: "B.Tech, Electronics & Computer Science",
    when: "2023 – 2027",
    score: "GPA 7.61 (through Sem V)",
  },
];

// From her GitHub profile.
export const beyondCode =
  "From styling outfits and exploring new flavours to embracing spirituality and mindful living, I find happiness in the things that let me express myself, stay grounded, and enjoy life beyond the digital world.";
