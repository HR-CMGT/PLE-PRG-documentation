import { fetchAllProjects } from "./data.js";
import { countProjectsPerTag } from "./statistics.js";

function setLoading(visible) {
    const loader = document.querySelector('#loading');
    loader.hidden = !visible;
}

function showError(message) {
    const errorEl = document.querySelector('#error');
    errorEl.textContent = message;
    errorEl.hidden = false;
}

function renderBarChart(containerId, data, labelHeader) {
    const container = document.querySelector(`#${containerId}`);
    const maxCount = data[0]?.count ?? 1;

    const rows = data
        .map(({ label, count }) => {
            const percentage = Math.round((count / maxCount) * 100);
            return `
        <tr>
          <td class="label-cell">${label}</td>
          <td class="bar-cell">
            <div class="bar" style="width: ${percentage}%"></div>
          </td>
          <td class="count-cell">${count}</td>
        </tr>`;
        })
        .join("");

    container.innerHTML = `
    <table class="chart-table">
      <thead>
        <tr>
          <th>${labelHeader}</th>
          <th>Aantal</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function renderProjectTable(containerId, data, valueKey, valueHeader) {
    const container = document.querySelector(`#${containerId}`);

    // Toon maximaal de top 50 om de pagina leesbaar te houden
    const top = data.slice(0, 50);

    const rows = top
        .map(
            (item, index) => `
      <tr>
        <td class="rank-cell">${index + 1}</td>
        <td>${item.title}</td>
        <td class="value-cell">${item[valueKey]}</td>
      </tr>`
        )
        .join("");

    container.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Project</th>
          <th>${valueHeader}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

async function init() {
    setLoading(true);

    try {
        const projects = await fetchAllProjects();

        // Statistieken berekenen
        const perTag = countProjectsPerTag(projects);
        // const perYear = countProjectsPerYear(projects);
        // const perPhotos = countPhotosPerProject(projects);
        // const perWords = countWordsInDescription(projects);

        // Totaalteller bijwerken
        document.querySelector("#total-count").textContent = projects.length.toString();

        // Grafieken renderen
        renderBarChart("chart-tags", perTag, "Tag");
        // renderBarChart("chart-years", perYear, "Jaar");
        // renderProjectTable("table-photos", perPhotos, "screenshotCount", "Foto's");
        // renderProjectTable("table-words", perWords, "wordCount", "Woorden");

        // Hoofdinhoud tonen
        document.querySelector("#dashboard").hidden = false;
    } catch (error) {
        showError(`Kon de projecten niet laden: ${error.message}`);
    } finally {
        setLoading(false);
    }
}

// Start de applicatie zodra de DOM volledig geladen is
document.addEventListener("DOMContentLoaded", init);