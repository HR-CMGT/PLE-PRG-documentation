export function countProjectsPerTag(projects) {
    let counts = {};

    for (const project of projects) {
        for (const tag of project.tags) {
            counts[tag.name] = !counts[tag.name] ? 1 : counts[tag.name] += 1;
        }
    }

    return Object.entries(counts)
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count);
}
