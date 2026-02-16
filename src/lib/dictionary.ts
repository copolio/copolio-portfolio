export const dict = {
  profile: { ko: "프로필", en: "Profile" },
  techStack: { ko: "기술 스택", en: "Tech Stack" },
  experience: { ko: "경력", en: "Experience" },
  projects: { ko: "프로젝트", en: "Projects" },
  education: { ko: "학력", en: "Education" },
  certifications: { ko: "자격증", en: "Certifications" },
  present: { ko: "현재", en: "Present" },
} as const;

export type DictEntry = { ko: string; en: string };
