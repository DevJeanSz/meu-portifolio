import type { Project } from "../data/projects";

const GITHUB_USERNAME = "DevJeanSz";

export async function fetchGitHubRepos(): Promise<Project[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories");
    }

    const repos = await response.json();

    // Map GitHub repos to our Project interface
    // Only show repos that are not forks and have a description
    return repos
      .filter((repo: any) => !repo.fork && repo.name !== GITHUB_USERNAME)
      .map((repo: any) => ({
        title: repo.name.replace(/-/g, " "),
        description: repo.description || "Sem descrição disponível.",
        tech: repo.topics && repo.topics.length > 0 
          ? repo.topics 
          : [repo.language].filter(Boolean),
        link: repo.html_url,
      }))
      .slice(0, 6); // Limiting to top 6 most recent
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
}
