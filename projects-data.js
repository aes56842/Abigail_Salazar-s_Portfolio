/*
  PROJECTS DATA
  =============
  This is the only file you need to edit to add, remove, or reorder projects.

  TO ADD A NEW PROJECT:
  1. Copy one of the blocks below (the part between { and }).
  2. Paste it at the top or bottom of the list, add a comma above it if needed.
  3. Fill in your own title, category, description, image, and date.
  4. Duplicate "project-template.html", rename the copy to match the "slug"
     you used below (e.g. "mynewproject.html"), and fill in its placeholders.
  5. Save. The homepage automatically shows your 5 most recent projects
     (by "date"), and allwork.html automatically lists everything.

  FIELD GUIDE:
  - slug:        the filename of that project's detail page (e.g. "myproject.html")
  - title:       project title, shown as the heading
  - category:    short label like "Branding" or "Web Design" — also used for
                  the filter buttons on the All Work page
  - description: one short sentence/tagline
  - image:       filename of the thumbnail image (must be in the same folder)
  - video:       set to true ONLY if "image" is actually a video file (.mp4)
  - date:        "YYYY-MM-DD" — used to sort newest-first. Doesn't need to be
                  exact, just needs to be more recent than older projects.
*/

const PROJECTS = [
  {
    slug: "taktisinfopage.html",
    title: "Taktis: Smart Pen",
    category: "Product Design",
    description: "Where every word moves with you.",
    image: "taktisthumbnail.png",
    video: false,
    date: "2026-06-01"
  },
  {
    slug: "withloveinfopage.html",
    title: "With Love Market & Cafe",
    category: "Web Design",
    description: "Bringing healthy food to South LA.",
    image: "withlovethumbnail.png",
    video: false,
    date: "2026-05-01"
  },
  {
    slug: "aroinfopage.html",
    title: "ARO",
    category: "Branding",
    description: "Wear a narrative.",
    image: "arothumbnail.png",
    video: false,
    date: "2026-04-01"
  },
  {
    slug: "acasoinfopage.html",
    title: "ACASO",
    category: "Brand Identity",
    description: "Built for the ambitious.",
    image: "acasothumbnail.png",
    video: false,
    date: "2026-03-01"
  },
  {
    slug: "iyacyberpunkinfopage.html",
    title: "IYA \u00d7 Cyberpunk",
    category: "Concept / Motion",
    description: "A total redesign.",
    // Re-export the original .mov as .mp4 and update the filename below —
    // browsers don't reliably play .mov files.
    image: "IYACyberPunk_smallerfile.mp4",
    video: true,
    date: "2026-02-01"
  }
];
