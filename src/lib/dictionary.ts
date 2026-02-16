export const dict = {
  profile: { ko: "프로필", en: "Profile" },
  techStack: { ko: "기술 스택", en: "Tech Stack" },
  experience: { ko: "경력", en: "Experience" },
  projects: { ko: "프로젝트", en: "Projects" },
  education: { ko: "학력", en: "Education" },
  certifications: { ko: "자격증", en: "Certifications" },
  present: { ko: "현재", en: "Present" },
  relatedProjects: { ko: "관련 프로젝트", en: "Related Projects" },
  others: { ko: "기타", en: "Others" },
  home: { ko: "홈", en: "Home" },
  backToResume: { ko: "이력서로 돌아가기", en: "Back to Resume" },
  projectsAtCompany: { ko: "수행 프로젝트", en: "Projects" },
  role: { ko: "역할", en: "Role" },
  teamSize: { ko: "팀 규모", en: "Team Size" },
  period: { ko: "기간", en: "Period" },
  viewDetail: { ko: "상세 보기", en: "View Detail" },
  downloadPdf: { ko: "PDF 다운로드", en: "Download PDF" },
  resume: { ko: "이력서", en: "Resume" },
  careerDescription: { ko: "경력기술서", en: "Career Description" },
  contact: { ko: "연락처", en: "Contact" },
  siteTitle: {
    ko: "김기정 | 백엔드 엔지니어",
    en: "Kijung Kim | Software Engineer",
  },
  siteDescription: {
    ko: "Kotlin, Spring 기반 백엔드 엔지니어 김기정의 포트폴리오입니다.",
    en: "Portfolio of Kijung Kim, a software engineer specializing in Kotlin and Spring.",
  },
} as const;

export type DictEntry = { ko: string; en: string };
