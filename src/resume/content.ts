import type { ResumeContent } from "./types";

export const resumeContent: ResumeContent = {
  profile: {
    name: {
      ko: "류아영",
      en: "Ahyoung Ryu",
    },
    role: {
      ko: "Senior Software Engineer · Front-end",
      en: "Senior Software Engineer · Front-end",
    },
    location: {
      ko: "대한민국 서울",
      en: "Seoul, South Korea",
    },
    summary: {
      ko: "제 손으로 만든 제품이 실제 사용자의 문제를 해결할 때 가장 큰 보람을 느낍니다. 지금은 Sendbird에서 AI Agent Messenger SDK와 Chat UIKit을 개발하고 있습니다.",
      en: "I care most about building products that solve a real problem for the people using them. I currently work on the AI Agent Messenger SDK and Chat UIKit at Sendbird.",
    },
    email: "ahyoungryu93@gmail.com",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/AhyoungRyu",
      },
      {
        label: "GitHub",
        href: "https://github.com/AhyoungRyu",
      },
    ],
  },
  capabilities: [
    {
      id: "sdk-dx",
      title: {
        ko: "SDK · 개발자 경험",
        en: "SDK · Developer Experience",
      },
      description: {
        ko: "외부 개발자가 최소한의 구현 비용으로 제품을 도입할 수 있는 API와 컴포넌트 구조를 설계합니다.",
        en: "Designs APIs and component systems that let external developers integrate products with minimal implementation cost.",
      },
    },
    {
      id: "architecture",
      title: {
        ko: "제품 아키텍처",
        en: "Product Architecture",
      },
      description: {
        ko: "복잡한 상태와 장기 운영을 견디는 React 아키텍처를 만들고 대규모 레거시 전환을 주도합니다.",
        en: "Builds React architectures for complex state and long-term operation, including large-scale legacy migrations.",
      },
    },
    {
      id: "performance-quality",
      title: {
        ko: "성능 · 품질",
        en: "Performance · Quality",
      },
      description: {
        ko: "측정 가능한 지표를 기준으로 번들, 렌더링, 테스트, 배포 파이프라인을 개선합니다.",
        en: "Improves bundles, rendering, testing, and delivery pipelines against measurable product metrics.",
      },
    },
    {
      id: "leadership",
      title: {
        ko: "기술 리딩",
        en: "Technical Leadership",
      },
      description: {
        ko: "문제를 정의하고 프로젝트를 끝까지 이끌며 코드 리뷰, 온보딩, 멘토링으로 팀의 실행력을 높입니다.",
        en: "Defines problems, leads projects to completion, and raises team execution through reviews, onboarding, and mentoring.",
      },
    },
  ],
  experiences: [
    {
      id: "sendbird",
      company: "Sendbird",
      companyUrl: "https://sendbird.com/",
      role: {
        ko: "Senior Software Engineer",
        en: "Senior Software Engineer",
      },
      team: {
        ko: "Client Platform · AI Agent",
        en: "Client Platform · AI Agent",
      },
      start: "2023-04",
      end: null,
      summary: {
        ko: "Sendbird에서 AI Agent Messenger SDK와 Chat UIKit을 개발하고 있습니다. 고객사 도입 지원과 오래된 UIKit 구조 개선도 함께 맡았습니다.",
        en: "At Sendbird, I build the AI Agent Messenger SDK and Chat UIKit. I also work directly with customers adopting the SDK and maintain the older UIKit codebase.",
      },
      highlights: {
        ko: [
          "초기 고객사가 각자의 서비스에서 바로 시험할 수 있도록 React SDK와 PoC 환경을 만들었습니다.",
          "5년간 축적된 Chat UIKit 레거시 구조를 개편하고 테스트 커버리지를 22.51%에서 50%로 높였습니다.",
          "AI Chatbot 번들 크기를 약 25% 줄여 고객 사이트 Lighthouse 성능 점수를 약 15% 개선했습니다.",
        ],
        en: [
          "Built the React SDK and proof-of-concept environments that early customers used in their own services.",
          "Modernized five years of Chat UIKit legacy code and raised test coverage from 22.51% to 50%.",
          "Reduced the AI Chatbot bundle by about 25%, improving customer-site Lighthouse performance scores by about 15%.",
        ],
      },
      technologies: [
        "TypeScript",
        "React",
        "Vite",
        "pnpm",
        "Yarn Berry",
        "GitHub Actions",
        "CircleCI",
      ],
      projectIds: [
        "ai-agent-messenger",
        "chat-uikit-modernization",
        "ai-chatbot-performance",
      ],
    },
    {
      id: "tossbank",
      company: "TossBank",
      companyUrl: "https://www.tossbank.com/",
      role: {
        ko: "Front-end Engineer",
        en: "Front-end Engineer",
      },
      team: {
        ko: "Loan Tribe · Personal Loan",
        en: "Loan Tribe · Personal Loan",
      },
      start: "2021-04",
      end: "2023-02",
      summary: {
        ko: "토스뱅크 오픈 전부터 개인대출 신청과 관리에 필요한 모든 웹뷰 화면을 혼자 맡았습니다.",
        en: "I was the sole front-end engineer for TossBank's personal-loan application and management screens before the bank launched.",
      },
      highlights: {
        ko: [
          "개인대출 상품의 웹뷰 화면과 앱 브리지, 웹 스크래핑 통신 모듈을 설계했습니다.",
          "준법감시 심의필을 단일 소스로 관리하는 API, React 컴포넌트, 만료 알림 시스템을 구축했습니다.",
          "모바일 E2E 테스트 환경을 구축하고 온보딩, 멘토링, 오프라인 코드 리뷰를 이끌었습니다.",
        ],
        en: [
          "Designed webview screens, app-bridge abstractions, and web-scraping communication modules for personal loans.",
          "Built a single-source compliance-label system with an API, React component, and expiration alerts.",
          "Established mobile E2E testing and led onboarding, mentoring, and in-person code reviews.",
        ],
      },
      technologies: [
        "TypeScript",
        "React",
        "Next.js",
        "React Query",
        "Recoil",
        "WebdriverIO",
        "Appium",
        "GitHub Actions",
      ],
      projectIds: ["tossbank-personal-loan", "compliance-single-source"],
    },
    {
      id: "lunit",
      company: "Lunit",
      companyUrl: "https://www.lunit.io/en",
      role: {
        ko: "Front-end Engineer",
        en: "Front-end Engineer",
      },
      start: "2020-03",
      end: "2021-04",
      summary: {
        ko: "디지털 병리 제품의 Annotation Tool과 AI 분석 결과 시각화 도구를 설계·개발했습니다.",
        en: "Designed and built digital-pathology annotation and AI-result visualization tools.",
      },
      highlights: {
        ko: [
          "기술 부채가 큰 기존 Annotation Tool을 한 달 반 안에 새로운 스택으로 재개발했습니다.",
          "AI 분석 결과를 대규모 병리 이미지 위에 표현하기 위해 Web Worker와 OffscreenCanvas를 활용했습니다.",
        ],
        en: [
          "Rebuilt a debt-heavy annotation tool with a new stack in six weeks.",
          "Used Web Workers and OffscreenCanvas to visualize AI results over large pathology images.",
        ],
      },
      technologies: [
        "TypeScript",
        "React",
        "Redux",
        "Redux Saga",
        "Web Worker",
        "OffscreenCanvas",
        "Cypress",
      ],
      projectIds: ["lunit-annotation-tools"],
    },
    {
      id: "zepl-frontend",
      company: "Zepl",
      companyUrl:
        "https://www.datarobot.com/newsroom/press/datarobot-acquires-zepl-to-enhance-enterprise-ai-platform-capabilities-for-advanced-data-scientists/",
      role: {
        ko: "Front-end Engineer",
        en: "Front-end Engineer",
      },
      start: "2017-08",
      end: "2020-03",
      summary: {
        ko: "Apache Zeppelin 기반 SaaS의 핵심 노트북 경험과 데이터 시각화 성능을 개선했습니다.",
        en: "Improved the core notebook experience and data-visualization performance of an Apache Zeppelin-based SaaS product.",
      },
      highlights: {
        ko: [
          "노트북 상호작용 반응 속도를 100~300% 개선하고 핵심 AngularJS 컴포넌트를 React로 재개발했습니다.",
          "대용량 시각화 파이프라인에 Web Worker와 Canvas 차트를 도입해 페이지 멈춤 현상을 해결했습니다.",
        ],
        en: [
          "Improved notebook interaction responsiveness by 100% to 300% and rebuilt the core AngularJS notebook in React.",
          "Introduced Web Workers and canvas charts to remove page freezes from large visualization pipelines.",
        ],
      },
      technologies: [
        "JavaScript",
        "React",
        "AngularJS",
        "Redux Saga",
        "Web Worker",
        "D3",
        "Nivo",
        "Webpack",
      ],
      projectIds: ["zepl-performance"],
    },
    {
      id: "zepl-engineer",
      company: "Zepl",
      companyUrl:
        "https://www.datarobot.com/newsroom/press/datarobot-acquires-zepl-to-enhance-enterprise-ai-platform-capabilities-for-advanced-data-scientists/",
      role: {
        ko: "Software Development Engineer",
        en: "Software Development Engineer",
      },
      start: "2016-02",
      end: "2017-08",
      summary: {
        ko: "Apache Zeppelin 오픈소스와 Zepl 제품의 프론트엔드, 문서, 패키지 저장소를 개발했습니다.",
        en: "Built front-end features, documentation, and a package registry for Apache Zeppelin and Zepl.",
      },
      highlights: {
        ko: [
          "Apache Zeppelin 커미터와 PMC로 활동하며 100개 이상의 커밋을 기여했습니다.",
          "NPM과 Maven API를 집계하는 Helium 패키지 저장소를 AWS Lambda와 S3로 설계·개발했습니다.",
        ],
        en: [
          "Became an Apache Zeppelin committer and PMC member, contributing more than 100 commits.",
          "Designed and built the Helium package registry on AWS Lambda and S3 by aggregating NPM and Maven APIs.",
        ],
      },
      technologies: [
        "AngularJS",
        "Node.js",
        "AWS Lambda",
        "S3",
        "Jekyll",
        "Webpack",
      ],
      projectIds: ["apache-zeppelin"],
    },
    {
      id: "zepl-intern",
      company: "Zepl",
      companyUrl:
        "https://www.datarobot.com/newsroom/press/datarobot-acquires-zepl-to-enhance-enterprise-ai-platform-capabilities-for-advanced-data-scientists/",
      role: {
        ko: "Software Development Engineer Intern",
        en: "Software Development Engineer Intern",
      },
      start: "2015-08",
      end: "2016-02",
      summary: {
        ko: "Apache Zeppelin의 UI와 공식 문서를 개선하며 오픈소스 개발 경력을 시작했습니다.",
        en: "Started an open-source engineering career by improving Apache Zeppelin's UI and official documentation.",
      },
      highlights: {
        ko: [
          "인터프리터 관리, 노트북 권한 설정, 문서 검색과 자동 목차 기능에 기여했습니다.",
        ],
        en: [
          "Contributed interpreter management, notebook permissions, documentation search, and automatic tables of contents.",
        ],
      },
      technologies: ["AngularJS", "Bootstrap", "Jekyll", "JavaScript"],
      projectIds: ["apache-zeppelin"],
    },
  ],
  projects: [
    {
      id: "ai-agent-messenger",
      slug: "ai-agent-messenger",
      companyId: "sendbird",
      title: {
        ko: "AI Agent Messenger SDK",
        en: "AI Agent Messenger SDK",
      },
      period: "2025-01 — Present",
      summary: {
        ko: "고객사의 웹과 웹뷰에 AI Agent를 빠르게 도입·검증할 수 있는 React 기반 Messenger SDK입니다.",
        en: "A React-based Messenger SDK that lets customers integrate and validate AI agents across web and webview environments.",
      },
      context: {
        ko: "AI Chatbot Self-service의 B2B 스핀오프로, 고객지원 시스템을 AI 중심으로 전환하려는 기업을 위한 제품입니다.",
        en: "A B2B spin-off from AI Chatbot Self-service for companies transitioning customer support toward AI-first workflows.",
      },
      problem: {
        ko: [
          "초기 고객별 PoC 요구사항을 빠르게 수용하면서도 고객 수 증가에 견디는 구조가 필요했습니다.",
          "외부 개발자가 각기 다른 UI와 서비스 환경에 제품을 낮은 비용으로 통합해야 했습니다.",
        ],
        en: [
          "The product needed to absorb customer-specific PoC requirements quickly without creating a scaling bottleneck.",
          "External developers needed a low-cost way to integrate the product into different UIs and service environments.",
        ],
      },
      contributions: {
        ko: [
          "고객사 환경에서 바로 검증할 수 있는 React SDK의 API와 컴포넌트 구조를 설계하고 고도화했습니다.",
          "글로벌 스트리밍 기업의 Client 엔지니어와 요구사항 정의부터 기능 설계, A/B 테스트 현장 지원까지 직접 협업했습니다.",
          "고객별 요청을 최소한의 인력으로 관리할 수 있도록 빌드와 배포 시스템을 설계했습니다.",
        ],
        en: [
          "Designed and evolved the React SDK API and component architecture for direct validation in customer environments.",
          "Worked directly with client engineers at a global streaming company from requirements and design through on-site A/B-test support.",
          "Designed build and deployment workflows intended to scale customer-specific requests with a small team.",
        ],
      },
      outcomes: {
        ko: [
          "초기 고객사들의 PoC와 단기 성능 검증 환경을 제공하고 제품 피드백 주기를 단축했습니다.",
          "실제 사용자 A/B 테스트 기간 동안 미국 오피스에서 기술 지원과 실시간 이슈 대응을 수행했습니다.",
        ],
        en: [
          "Enabled proof-of-concept and short-cycle performance validation for early customers, shortening the feedback loop.",
          "Provided on-site technical support and real-time issue response during a live U.S. A/B test.",
        ],
      },
      technologies: ["TypeScript", "React", "Vite", "pnpm", "CircleCI"],
      links: [{ label: "Delight AI", href: "https://delight.ai/" }],
      selected: true,
    },
    {
      id: "chat-uikit-modernization",
      slug: "chat-uikit-modernization",
      companyId: "sendbird",
      title: {
        ko: "Chat UIKit 레거시 현대화",
        en: "Chat UIKit Modernization",
      },
      period: "2024-06 — 2024-12",
      summary: {
        ko: "5년간 쌓인 React 레거시 코드를 고치고 테스트 커버리지를 22.51%에서 50%로 높였습니다.",
        en: "Reworked five years of React legacy code and raised test coverage from 22.51% to 50%.",
      },
      context: {
        ko: "고객사가 손쉽게 인앱 채팅을 구축하도록 제공하는 zero-dependency React UIKit입니다.",
        en: "A zero-dependency React UIKit that helps customer developers build in-app chat experiences.",
      },
      problem: {
        ko: [
          "지난 2년간의 이슈와 VOC에서 복잡한 상태 관리와 누적된 레거시가 반복적인 고객 문제를 만들고 있었습니다.",
          "테스트 커버리지가 22.51%에 머물러 대규모 변경의 안정성을 담보하기 어려웠습니다.",
        ],
        en: [
          "Two years of issue reports and VOC showed recurring customer problems rooted in complex state management and accumulated legacy code.",
          "Test coverage of 22.51% made large-scale changes risky.",
        ],
      },
      contributions: {
        ko: [
          "문제를 정의하고 대규모 리팩터링과 새로운 상태 관리 구조 도입을 주도했습니다.",
          "유닛·통합 테스트 전략을 수립하고 경쟁 제품 분석을 바탕으로 Quick Tour를 기획·개발했습니다.",
          "프로젝트를 함께한 주니어 엔지니어 2명의 셀프 매니지먼트 성장을 지원했습니다.",
        ],
        en: [
          "Defined the problem and led a large-scale refactor with a new state-management architecture.",
          "Established unit and integration test strategy and designed a Quick Tour after analyzing competing products.",
          "Helped two junior engineers improve their self-management through project ownership.",
        ],
      },
      outcomes: {
        ko: [
          "테스트 커버리지를 22.51%에서 50%로 높였습니다.",
          "고객 이슈 리포트가 이전 대비 약 30% 감소했습니다.",
          "복잡한 상태 업데이트로 발생하던 불필요한 리렌더링을 줄였습니다.",
        ],
        en: [
          "Raised test coverage from 22.51% to 50%.",
          "Reduced customer issue reports by about 30%.",
          "Reduced unnecessary re-renders caused by complex state updates.",
        ],
      },
      technologies: ["TypeScript", "React", "Jest", "Testing Library"],
      links: [
        {
          label: "Sendbird Chat SDK Tour",
          href: "https://sendbird.com/products/chat-messaging/sdk-tour",
        },
      ],
      selected: true,
    },
    {
      id: "ai-chatbot-performance",
      slug: "ai-chatbot-performance",
      companyId: "sendbird",
      title: {
        ko: "AI Chatbot Self-service 성능 개선",
        en: "AI Chatbot Self-service Performance",
      },
      period: "2023-07 — 2024-02",
      summary: {
        ko: "몇 줄의 스크립트로 웹사이트에 AI Chatbot을 붙일 수 있는 초기 제품의 클라이언트를 혼자 개발했습니다.",
        en: "Built the client side alone for an early product that adds an AI chatbot to a website with a few lines of script.",
      },
      context: {
        ko: "초기 PMF를 찾는 단계에서 다양한 고객 웹사이트와 Shopify에 안정적으로 통합되어야 했습니다.",
        en: "While searching for product-market fit, the product needed reliable integration across customer websites and Shopify.",
      },
      problem: {
        ko: [
          "초기 로딩 과정의 큰 JavaScript 번들과 UI 깜빡임이 고객 사이트의 SEO와 사용자 경험을 해쳤습니다.",
        ],
        en: [
          "A large JavaScript bundle and visual flicker during initial load hurt customer-site SEO and user experience.",
        ],
      },
      contributions: {
        ko: [
          "VOC와 Lighthouse 지표를 분석해 문제를 정의하고 번들과 로딩 프로세스를 최적화했습니다.",
          "불필요한 UI 변화를 제거하고 Shopify 플러그인 환경까지 지원했습니다.",
        ],
        en: [
          "Analyzed VOC and Lighthouse metrics, then optimized the bundle and loading pipeline.",
          "Removed unnecessary visual changes and extended support to a Shopify plugin environment.",
        ],
      },
      outcomes: {
        ko: [
          "JavaScript 번들 크기를 약 25% 줄였습니다.",
          "고객 사이트의 Lighthouse 페이지 속도 점수를 약 15% 개선했습니다.",
        ],
        en: [
          "Reduced the JavaScript bundle by about 25%.",
          "Improved customer-site Lighthouse page-speed scores by about 15%.",
        ],
      },
      technologies: ["TypeScript", "React", "Lighthouse", "Shopify"],
      links: [],
      selected: false,
    },
    {
      id: "tossbank-personal-loan",
      slug: "tossbank-personal-loan",
      companyId: "tossbank",
      title: {
        ko: "토스뱅크 개인대출 퍼널",
        en: "TossBank Personal-loan Funnel",
      },
      period: "2021-04 — 2023-02",
      summary: {
        ko: "토스뱅크 오픈 전부터 개인대출 상품 신청과 관리에 필요한 모든 웹뷰 화면을 담당했습니다.",
        en: "Owned every webview screen required to apply for and manage personal-loan products from before TossBank's launch.",
      },
      context: {
        ko: "1인 프론트엔드 엔지니어로 백엔드, 데이터 분석가, 프로덕트 디자이너와 개인대출 퍼널을 만들었습니다.",
        en: "Worked as the sole front-end engineer with backend engineers, a data analyst, and a product designer.",
      },
      problem: {
        ko: [
          "은행 앱의 웹뷰는 앱 브리지, 웹 스크래핑, 준법 요구사항을 함께 만족해야 했습니다.",
          "출시 전 빠른 제품 개발과 출시 후 안정적인 운영을 동시에 준비해야 했습니다.",
        ],
        en: [
          "Banking webviews had to coordinate app bridges, web scraping, and compliance requirements.",
          "The team had to deliver quickly before launch while preparing for reliable production operation.",
        ],
      },
      contributions: {
        ko: [
          "웹과 앱 간 프로토콜을 추상화하고 웹 스크래핑 통신 모듈을 개발했습니다.",
          "데이터 분석가와 프로덕트 디자이너와 실험을 설계해 퍼널을 지속적으로 개선했습니다.",
          "모바일 E2E 환경과 트라이브의 프론트엔드 개발 문화를 구축했습니다.",
        ],
        en: [
          "Abstracted web-to-app protocols and built the web-scraping communication module.",
          "Designed experiments with data and product-design partners to improve the funnel.",
          "Established mobile E2E testing and front-end engineering practices within the tribe.",
        ],
      },
      outcomes: {
        ko: [
          "토스뱅크 정식 오픈에 맞춰 개인대출 신청·관리 경험을 출시하고 지속 운영했습니다.",
          "신규 입사자 온보딩, 신입 멘토링, 코드 리뷰와 스터디를 팀의 반복 가능한 활동으로 만들었습니다.",
        ],
        en: [
          "Launched and operated the personal-loan application and management experience with TossBank's public opening.",
          "Turned onboarding, mentoring, code review, and study sessions into repeatable team practices.",
        ],
      },
      technologies: [
        "TypeScript",
        "React",
        "Next.js",
        "React Query",
        "Recoil",
        "WebdriverIO",
        "Appium",
      ],
      links: [
        {
          label: "Toss Front-end Chapter Interview",
          href: "https://blog.toss.im/article/toss-frontend-chapter",
        },
      ],
      selected: true,
    },
    {
      id: "compliance-single-source",
      slug: "compliance-single-source",
      companyId: "tossbank",
      title: {
        ko: "준법감시 심의필 단일 소스 시스템",
        en: "Compliance-label Single-source System",
      },
      period: "2021 — 2022",
      summary: {
        ko: "여러 프론트엔드 서비스에 흩어진 심의필과 만료일을 한 곳에서 관리하는 시스템입니다.",
        en: "A system for managing compliance labels and expiration dates across multiple front-end services from one source.",
      },
      context: {
        ko: "단순 문구 수정에도 모든 서비스의 승인·빌드·배포가 필요했고 만료일 관리가 되지 않았습니다.",
        en: "A simple copy update required approval, build, and deployment across services, while expiration dates were unmanaged.",
      },
      problem: {
        ko: [
          "규제 문구 변경의 운영 비용이 크고 만료된 심의필이 노출될 위험이 있었습니다.",
        ],
        en: [
          "Regulatory copy changes were operationally expensive and expired labels could remain visible.",
        ],
      },
      contributions: {
        ko: [
          "S3 파일을 단일 데이터 소스로 삼아 Node.js CRUD API와 공용 React 컴포넌트를 개발했습니다.",
          "만료 예정 심의필을 Slack으로 자동 알리는 작업을 구현했습니다.",
        ],
        en: [
          "Used an S3 file as the source of truth and built a Node.js CRUD API plus shared React component.",
          "Implemented automated Slack alerts for labels approaching expiration.",
        ],
      },
      outcomes: {
        ko: [
          "단순 심의필 변경을 전체 서비스 재배포 과정에서 분리하고 만료일을 선제적으로 관리할 수 있게 했습니다.",
        ],
        en: [
          "Decoupled simple compliance changes from full service deployments and enabled proactive expiration management.",
        ],
      },
      technologies: ["TypeScript", "React", "Node.js", "AWS S3", "Slack API"],
      links: [],
      selected: false,
    },
    {
      id: "lunit-annotation-tools",
      slug: "lunit-annotation-tools",
      companyId: "lunit",
      title: {
        ko: "디지털 병리 Annotation & Visualization",
        en: "Digital Pathology Annotation & Visualization",
      },
      period: "2020-03 — 2021-04",
      summary: {
        ko: "병리 슬라이드에 학습 데이터를 추가하고 AI 분석 결과를 시각화하는 브라우저 도구 모음입니다.",
        en: "A set of browser tools for annotating pathology slides and visualizing AI-analysis results.",
      },
      context: {
        ko: "연구자와 병리 전문가가 대형 슬라이드 이미지를 다루면서 AI 보조 기능을 사용할 수 있어야 했습니다.",
        en: "Researchers and pathology specialists needed to work with large slide images while using AI-assisted features.",
      },
      problem: {
        ko: [
          "기존 Annotation Tool은 기술 부채와 담당자 변경으로 유지보수 비용이 과도했습니다.",
          "대규모 이미지 시각화가 메인 스레드의 성능에 영향을 줄 수 있었습니다.",
        ],
        en: [
          "The existing annotation tool had become expensive to maintain because of technical debt and ownership changes.",
          "Large-image visualization risked blocking the browser's main thread.",
        ],
      },
      contributions: {
        ko: [
          "기술 스택과 아키텍처를 결정하고 기존 기능, AI-Assisted mode, UI/UX 개선을 포함해 한 달 반 만에 재개발했습니다.",
          "Web Worker와 OffscreenCanvas를 활용한 분석 결과 시각화 구조를 만들었습니다.",
        ],
        en: [
          "Selected the stack and architecture, then rebuilt the tool in six weeks with existing features, AI-Assisted mode, and UX improvements.",
          "Built an analysis-visualization architecture using Web Workers and OffscreenCanvas.",
        ],
      },
      outcomes: {
        ko: [
          "기술 부채가 큰 기존 툴을 대체하고 이후 기능 개발과 유지보수의 기반을 새로 마련했습니다.",
        ],
        en: [
          "Replaced a debt-heavy tool and created a new foundation for continued feature development and maintenance.",
        ],
      },
      technologies: [
        "TypeScript",
        "React",
        "Redux Saga",
        "Immer",
        "Web Worker",
        "OffscreenCanvas",
        "Cypress",
      ],
      links: [{ label: "Lunit SCOPE", href: "https://www.lunit.io/en" }],
      selected: true,
    },
    {
      id: "apache-zeppelin",
      slug: "apache-zeppelin",
      companyId: "zepl-engineer",
      title: {
        ko: "Apache Zeppelin 오픈소스 기여",
        en: "Apache Zeppelin Open-source Contributions",
      },
      period: "2015 — Present",
      summary: {
        ko: "웹 기반 데이터 분석·시각화 도구 Apache Zeppelin의 커미터와 PMC로 제품, 문서, 커뮤니티에 기여했습니다.",
        en: "Contributed product code, documentation, and community leadership as an Apache Zeppelin committer and PMC member.",
      },
      context: {
        ko: "Apache Software Foundation의 top-level 프로젝트로 전 세계 기여자와 협업하는 오픈소스 제품입니다.",
        en: "An Apache Software Foundation top-level project developed with contributors around the world.",
      },
      problem: {
        ko: [
          "인터프리터 관리와 권한 설정 UI, 공식 문서, 플러그인 유통 구조를 함께 개선할 필요가 있었습니다.",
        ],
        en: [
          "Interpreter management, permissions UI, official documentation, and plugin distribution all needed improvement.",
        ],
      },
      contributions: {
        ko: [
          "인터프리터 관리, 노트북 권한 설정, Helium 패키지 관리 UI를 개발했습니다.",
          "공식 문서의 검색, 자동 목차와 주요 가이드를 작성·개선했습니다.",
          "NPM과 Maven 패키지 정보를 집계하는 Helium 온라인 저장소를 AWS Lambda와 S3로 설계·개발했습니다.",
        ],
        en: [
          "Built interpreter management, notebook permissions, and Helium package-management interfaces.",
          "Added search and automatic tables of contents and authored key official guides.",
          "Designed and built the Helium online registry on AWS Lambda and S3 by aggregating NPM and Maven package data.",
        ],
      },
      outcomes: {
        ko: [
          "100개 이상의 커밋으로 프로젝트 주요 기여자 중 한 명이 되었고 커미터와 PMC로 선임되었습니다.",
          "ApacheCon Europe와 ApacheCon North America에서 프로젝트 교육과 발표를 진행했습니다.",
        ],
        en: [
          "Became a leading contributor with more than 100 commits and was elected committer and PMC member.",
          "Taught and presented the project at ApacheCon Europe and ApacheCon North America.",
        ],
      },
      technologies: [
        "AngularJS",
        "Node.js",
        "Jekyll",
        "AWS Lambda",
        "S3",
        "Webpack",
      ],
      links: [
        {
          label: "Apache Zeppelin",
          href: "https://zeppelin.apache.org/",
        },
        {
          label: "GitHub contributions",
          href: "https://github.com/apache/zeppelin/commits?author=AhyoungRyu",
        },
      ],
      selected: true,
    },
    {
      id: "zepl-performance",
      slug: "zepl-performance",
      companyId: "zepl-frontend",
      title: {
        ko: "Zepl 노트북·시각화 성능 개선",
        en: "Zepl Notebook & Visualization Performance",
      },
      period: "2018-06 — 2019-03",
      summary: {
        ko: "Zepl 핵심 노트북의 렌더링 구조와 대용량 차트 파이프라인을 현대화했습니다.",
        en: "Modernized the rendering architecture and large-chart pipeline of Zepl's core notebook experience.",
      },
      context: {
        ko: "Apache Zeppelin 기반 SaaS에서 노트북 크기와 시각화 데이터가 증가하면서 전체 페이지 반응성이 저하됐습니다.",
        en: "As notebook size and visualization data grew in the Apache Zeppelin-based SaaS, the entire page became less responsive.",
      },
      problem: {
        ko: [
          "복잡한 prop 전달, 객체 변환, 중복 액션과 API 호출로 노트북 상호작용이 느렸습니다.",
          "수백 개 SVG 요소와 동기식 데이터 변환이 메인 스레드를 멈췄습니다.",
        ],
        en: [
          "Complex prop passing, object conversion, duplicate actions, and API calls slowed notebook interactions.",
          "Hundreds of SVG elements and synchronous data transformations blocked the main thread.",
        ],
      },
      contributions: {
        ko: [
          "state selector와 컴포넌트 재구성으로 불필요한 렌더링과 호출을 제거했습니다.",
          "Web Worker 기반 데이터 파이프라인과 Canvas 기반 Nivo 차트 7종을 도입했습니다.",
          "핵심 AngularJS 노트북 컴포넌트를 React로 재개발했습니다.",
        ],
        en: [
          "Used state selectors and component restructuring to remove unnecessary rendering and calls.",
          "Introduced a Web Worker data pipeline and seven canvas-based Nivo chart types.",
          "Rebuilt the core AngularJS notebook component in React.",
        ],
      },
      outcomes: {
        ko: [
          "노트북 주요 상호작용의 반응 속도를 100~300% 개선했습니다.",
          "대용량 그래프 렌더링 중 페이지가 멈추는 현상을 해결했습니다.",
          "Nivo 오픈소스 차트 라이브러리에도 개선 사항을 기여했습니다.",
        ],
        en: [
          "Improved key notebook interaction responsiveness by 100–300%.",
          "Eliminated page freezes during large-chart rendering.",
          "Contributed improvements back to the open-source Nivo chart library.",
        ],
      },
      technologies: [
        "React",
        "AngularJS",
        "Redux Saga",
        "Web Worker",
        "Nivo",
        "D3",
      ],
      links: [
        {
          label: "Nivo",
          href: "https://nivo.rocks/",
        },
      ],
      selected: true,
    },
  ],
  archiveGroups: [
    {
      id: "zepl-product",
      title: {
        ko: "Zepl 제품 개발",
        en: "Zepl Product Development",
      },
      description: {
        ko: "노트북 협업과 데이터 분석 SaaS를 만들며 담당한 주요 기능입니다.",
        en: "Additional product work for the collaborative notebook and data-analysis SaaS.",
      },
      entries: [
        {
          id: "plotly-editor",
          title: {
            ko: "Plotly 차트 편집기 도입",
            en: "Plotly Chart Editor Integration",
          },
          period: "2019-10",
          description: {
            ko: "Plotly Chart Editor와 React Plotly Chart를 제품에 통합했습니다.",
            en: "Integrated Plotly Chart Editor and React Plotly Chart into the product.",
          },
          bullets: {
            ko: ["리서치, 설계, 개발을 1인으로 수행했습니다."],
            en: ["Solely owned research, architecture, and implementation."],
          },
          links: [
            {
              label: "Plotly React Chart Editor",
              href: "https://github.com/plotly/react-chart-editor",
            },
          ],
        },
        {
          id: "snowflake",
          title: {
            ko: "Snowflake 데이터 연동",
            en: "Snowflake Data Integration",
          },
          period: "2019-04 — 2019-06",
          description: {
            ko: "Snowflake 데이터와 Zepl 노트북을 연결하는 프론트엔드를 개발했습니다.",
            en: "Built the front end connecting Snowflake data to Zepl notebooks.",
          },
          bullets: {
            ko: ["2인 팀에서 리서치, 설계, 개발을 담당했습니다."],
            en: ["Owned research, design, and implementation in a two-person team."],
          },
          links: [{ label: "Snowflake", href: "https://www.snowflake.com/" }],
        },
        {
          id: "stripe",
          title: {
            ko: "Stripe 결제 시스템",
            en: "Stripe Payment System",
          },
          period: "2018-03 — 2018-05",
          description: {
            ko: "Stripe 기반 구독 결제 시스템의 프론트엔드를 1인 개발했습니다.",
            en: "Solely built the front end for a Stripe-based subscription system.",
          },
          bullets: {
            ko: ["리서치, 설계, 개발 전반을 담당했습니다."],
            en: ["Owned research, architecture, and implementation."],
          },
          links: [{ label: "Stripe", href: "https://stripe.com/" }],
        },
        {
          id: "resource-routing",
          title: {
            ko: "라우팅·실행 리소스 관리",
            en: "Routing & Execution Resources",
          },
          period: "2017-08 — 2017-12",
          description: {
            ko: "라우팅 시스템을 Universal Router로 이전하고 노트북 실행 리소스 관리 화면을 개발했습니다.",
            en: "Migrated routing to Universal Router and built notebook execution-resource management.",
          },
          bullets: {
            ko: ["각 프로젝트에서 리서치, 설계, 개발을 담당했습니다."],
            en: ["Owned research, architecture, and implementation across both projects."],
          },
          links: [],
        },
      ],
    },
    {
      id: "open-source",
      title: {
        ko: "오픈소스·문서",
        en: "Open Source & Documentation",
      },
      description: {
        ko: "Apache Zeppelin 커미터·PMC로서 제품 코드와 공식 문서에 기여했습니다.",
        en: "Product and documentation contributions as an Apache Zeppelin committer and PMC member.",
      },
      entries: [
        {
          id: "zeppelin-docs",
          title: {
            ko: "Apache Zeppelin 공식 문서",
            en: "Apache Zeppelin Official Documentation",
          },
          description: {
            ko: "인증, 인터프리터, JDBC, 권한, 기여 가이드 등 핵심 문서를 작성하고 전체 문서 사이트를 리뷰했습니다.",
            en: "Authored core guides on authentication, interpreters, JDBC, permissions, and contribution, and reviewed the broader documentation site.",
          },
          bullets: {
            ko: [
              "주요 문서 페이지의 90% 이상을 작성했습니다.",
              "Jekyll 기반 사이트에 검색과 자동 목차 기능을 추가했습니다.",
            ],
            en: [
              "Authored more than 90% of several key documentation pages.",
              "Added search and automatic tables of contents to the Jekyll site.",
            ],
          },
          links: [
            {
              label: "Apache Zeppelin Documentation",
              href: "https://zeppelin.apache.org/docs/latest/",
            },
          ],
        },
        {
          id: "zeppelin-helium",
          title: {
            ko: "Helium 패키지 생태계",
            en: "Helium Package Ecosystem",
          },
          period: "2016-12 — 2017-02",
          description: {
            ko: "시각화 플러그인의 온라인 저장소와 관리 UI를 개발했습니다.",
            en: "Built the online registry and management UI for visualization plugins.",
          },
          bullets: {
            ko: [
              "NPM·Maven 공개 API의 패키지 정보를 AWS Lambda로 취합해 S3에 저장했습니다.",
              "리서치, 설계, 개발을 1인으로 수행했습니다.",
            ],
            en: [
              "Aggregated package data from NPM and Maven APIs with AWS Lambda and stored it in S3.",
              "Solely owned research, architecture, and implementation.",
            ],
          },
          links: [
            {
              label: "Helium packages",
              href: "https://zeppelin.apache.org/helium_packages.html",
            },
          ],
        },
      ],
    },
    {
      id: "teaching-speaking",
      title: {
        ko: "강의·발표",
        en: "Teaching & Speaking",
      },
      description: {
        ko: "Apache Zeppelin과 오픈소스 경험을 국내외 개발자 커뮤니티에서 공유했습니다.",
        en: "Shared Apache Zeppelin and open-source experience with developer communities in Korea and abroad.",
      },
      entries: [
        {
          id: "fast-campus",
          title: {
            ko: "Fast Campus 빅데이터 시각화 CAMP",
            en: "Fast Campus Big-data Visualization CAMP",
          },
          period: "2018-05",
          description: {
            ko: "Apache Zeppelin을 이용한 빅데이터 시각화를 4회, 총 11시간 강의했습니다.",
            en: "Taught 11 hours across four sessions on big-data visualization with Apache Zeppelin.",
          },
          bullets: {
            ko: ["실습 자료를 GitHub에 공개했습니다."],
            en: ["Published the workshop materials on GitHub."],
          },
          links: [
            {
              label: "Course materials",
              href: "https://github.com/AhyoungRyu/slide-materials/tree/master/2018/FastCampus-ApacheZeppelinTraining",
            },
          ],
        },
        {
          id: "apachecon-europe",
          title: {
            ko: "Apache Zeppelin Training",
            en: "Apache Zeppelin Training",
          },
          period: "ApacheCon Europe 2016",
          description: {
            ko: "ApacheCon Europe에서 Apache Zeppelin 핸즈온 세션을 진행했습니다.",
            en: "Delivered a hands-on Apache Zeppelin session at ApacheCon Europe.",
          },
          bullets: {
            ko: ["글로벌 참가자를 대상으로 제품 설치와 활용을 교육했습니다."],
            en: ["Taught installation and practical use to an international audience."],
          },
          links: [],
        },
        {
          id: "apachecon-miami",
          title: {
            ko: "Helium makes Zeppelin Fly",
            en: "Helium Makes Zeppelin Fly",
          },
          period: "ApacheCon North America 2017",
          description: {
            ko: "Helium의 개념, 사용 방법과 온라인 패키지 저장소 구현 경험을 발표했습니다.",
            en: "Presented the Helium concept, usage, and implementation of its online package registry.",
          },
          bullets: {
            ko: ["미국 마이애미에서 영어로 발표했습니다."],
            en: ["Presented in English in Miami, Florida."],
          },
          links: [],
        },
        {
          id: "community-talks",
          title: {
            ko: "오픈소스 커뮤니티 발표",
            en: "Open-source Community Talks",
          },
          description: {
            ko: "Zeppelin 한국 사용자 모임, 9XD와 국내 4개 대학에서 커미터 경험과 오픈소스 기여 방법을 공유했습니다.",
            en: "Shared the path to becoming a committer and practical contribution methods with the Korean Zeppelin community, 9XD, and four universities.",
          },
          bullets: {
            ko: [
              "학생들이 오픈소스 사용자를 넘어 실제 기여자가 되도록 동기를 전달했습니다.",
            ],
            en: [
              "Encouraged students to move from open-source users to active contributors.",
            ],
          },
          links: [
            {
              label: "Presentation materials",
              href: "https://github.com/AhyoungRyu/slide-materials",
            },
          ],
        },
      ],
    },
  ],
  education: [
    {
      school: "Sookmyung Women's University",
      degree: {
        ko: "컴퓨터과학 학사",
        en: "B.S. in Computer Science",
      },
      period: "2012-03 — 2016-08",
    },
  ],
  languages: [
    {
      name: {
        ko: "한국어",
        en: "Korean",
      },
      proficiency: {
        ko: "원어민",
        en: "Native",
      },
    },
    {
      name: {
        ko: "영어",
        en: "English",
      },
      proficiency: {
        ko: "업무상 원활한 소통",
        en: "Professional working proficiency",
      },
    },
  ],
};
