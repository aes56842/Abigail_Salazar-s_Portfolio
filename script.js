/*
  Renders projects from projects-data.js into:
  - #project-spreads on index.html (5 newest, editorial spread layout)
  - #work-grid on allwork.html (everything, card grid, with filters)
  You shouldn't need to edit this file — edit projects-data.js instead.
*/

function sortByNewest(list) {
  return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function folio(index) {
  return String(index + 1).padStart(2, "0");
}

function mediaMarkup(project) {
  if (project.video) {
    return `
      <video autoplay muted loop playsinline aria-label="${project.title} preview">
        <source src="${project.image}" type="video/mp4" />
      </video>`;
  }
  return `<img src="${project.image}" alt="${project.title}" loading="lazy" />`;
}

/* ---------- Homepage: editorial spreads (top 5 newest) ---------- */
function renderSpreads() {
  const container = document.getElementById("project-spreads");
  if (!container) return;

  const featured = sortByNewest(PROJECTS).slice(0, 5);

  container.innerHTML = featured
    .map(
      (project, i) => `
      <article class="project-spread">
        <div class="spread-media">
          <a href="${project.slug}">${mediaMarkup(project)}</a>
        </div>
        <div class="spread-text">
          <p class="folio">${folio(i)}</p>
          <p class="category">${project.category}</p>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a class="view-link" href="${project.slug}">View project &rarr;</a>
        </div>
      </article>`
    )
    .join("");

  // Scroll-reveal for the freshly rendered spreads
  const spreads = container.querySelectorAll(".project-spread");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    spreads.forEach((el) => observer.observe(el));
  } else {
    spreads.forEach((el) => el.classList.add("is-visible"));
  }
}

/* ---------- All Work page: full grid with category filters ---------- */
function renderWorkGrid() {
  const grid = document.getElementById("work-grid");
  if (!grid) return;

  const all = sortByNewest(PROJECTS);

  function draw(list) {
    grid.innerHTML = list
      .map(
        (project, i) => `
        <a class="work-card" href="${project.slug}" data-category="${project.category}">
          <div class="work-card-media">${mediaMarkup(project)}</div>
          <div class="work-card-info">
            <p class="category">${project.category}</p>
            <h3>${project.title}</h3>
          </div>
        </a>`
      )
      .join("");
  }

  draw(all);

  // Build filter chips from whatever categories actually exist
  const filterBar = document.getElementById("filter-bar");
  if (filterBar) {
    const categories = ["All", ...new Set(all.map((p) => p.category))];
    filterBar.innerHTML = categories
      .map(
        (cat, i) =>
          `<button class="filter-chip${i === 0 ? " is-active" : ""}" data-filter="${cat}">${cat}</button>`
      )
      .join("");

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;

      filterBar
        .querySelectorAll(".filter-chip")
        .forEach((c) => c.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter;
      draw(filter === "All" ? all : all.filter((p) => p.category === filter));
    });
  }
}

function initNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

renderSpreads();
renderWorkGrid();
initNavToggle();
