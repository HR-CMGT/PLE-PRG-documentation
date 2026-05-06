const API_URL = "https://cmgt.hr.nl/api/projects/";

export async function fetchAllProjects() {

    const allProjects = [];

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`API-fout: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    const items = json.data ?? [];

    for (const item of items) {
        allProjects.push(item.project);
    }

    return allProjects;
}
