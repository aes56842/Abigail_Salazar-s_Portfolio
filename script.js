/*
  Renders projects from projects-data.js into:
  - #project-spreads on index.html (5 newest, editorial spread layout)
  - #work-grid on allwork.html (everything, card grid, with filters)
  You shouldn't need to edit this file — edit projects-data.js instead.
*/

// Always load at the top of the page, don't let the browser restore
// a previous scroll position on refresh.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);
window.addEventListener("load", () => window.scrollTo(0, 0));

function sortByNewest(list) {
  return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function folio(index) {
  return String(index + 1).padStart(2, "0");
}

function mediaMarkup(project, srcOverride) {
  const src = srcOverride || project.image;
  if (project.video && !srcOverride) {
    return `
      <video autoplay muted loop playsinline aria-label="${project.title} preview">
        <source src="${src}" type="video/mp4" />
      </video>`;
  }
  return `<img src="${src}" alt="${project.title}" loading="lazy" />`;
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
          <div class="work-card-media">${mediaMarkup(project, project.thumbnail)}</div>
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

/* ---------- Project detail page: prev/next nav ---------- */
function renderProjectNav() {
  const container = document.getElementById("project-nav");
  if (!container) return;

  const ordered = sortByNewest(PROJECTS);
  const currentFile = location.pathname.split("/").pop();
  const index = ordered.findIndex((p) => p.slug === currentFile);
  if (index === -1) return;

  const prev = ordered[index - 1];
  const next = ordered[index + 1];

  container.innerHTML = `
    ${
      prev
        ? `<a href="${prev.slug}" class="prev"><span class="nav-label">&larr; Previous</span><span class="nav-title">${prev.title}</span></a>`
        : "<span></span>"
    }
    ${
      next
        ? `<a href="${next.slug}" class="next"><span class="nav-label">Next &rarr;</span><span class="nav-title">${next.title}</span></a>`
        : "<span></span>"
    }
  `;
}

/* ---------- Project detail page: image carousel ---------- */
function initCarousels() {
  document.querySelectorAll(".project-carousel").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");
    const dotsWrap = carousel.querySelector(".carousel-dots");

    if (slides.length <= 1) {
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      return;
    }

    let index = 0;
    const dots = slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Go to image ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
      return dot;
    });

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    prevBtn?.addEventListener("click", () => goTo(index - 1));
    nextBtn?.addEventListener("click", () => goTo(index + 1));
    slides.forEach((slide) => slide.addEventListener("click", () => goTo(index + 1)));
  });
}

renderSpreads();
renderWorkGrid();
initNavToggle();
renderProjectNav();
initCarousels();
