import { GITHUB_USER } from "@/lib/site";

export interface RepoSummary {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  pushedAt: string;
  stars: number;
}

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

/** 24 h: la página se regenera como máximo una vez al día (ISR) y el cron de rebuild la refresca. */
export const GITHUB_REVALIDATE_SECONDS = 60 * 60 * 24;

/**
 * Repos públicos propios (sin forks ni archivados) ordenados por último push.
 * Si la API falla o hay rate limit, devuelve [] y la sección se muestra sin repos (fallback silencioso).
 * GITHUB_TOKEN es opcional: solo sube el límite de peticiones en el build.
 */
export async function getRecentRepos(limit = 3): Promise<RepoSummary[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?type=owner&sort=pushed&per_page=30`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: GITHUB_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const repos = (await res.json()) as GitHubRepo[];
    if (!Array.isArray(repos)) return [];
    return repos
      .filter((repo) => !repo.fork && !repo.archived && !repo.private)
      .slice(0, limit)
      .map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        language: repo.language,
        pushedAt: repo.pushed_at,
        stars: repo.stargazers_count,
      }));
  } catch {
    return [];
  }
}
