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
  - image:       filename of the main image (used on the homepage and as
                  the All Work thumbnail, unless "thumbnail" is set below)
  - thumbnail:   OPTIONAL. A separate image filename used only for the All
                  Work grid. Use this if your main "image" doesn't crop well
                  into a portrait (4:5) box — add a dedicated crop instead.
                  Leave this out entirely if "image" already looks fine.
  - video:       set to true ONLY if "image" is actually a video file (.mp4)
  - date:        "YYYY-MM-DD" — used to sort newest-first. Doesn't need to be
                  exact, just needs to be more recent than older projects.

  Thumbnails with "2" at the end are the All Work section versions.

  GALLERY-TYPE ENTRIES (for things like a set of art pieces, with no
  individual write-up needed per image):
  - Instead of "slug", give it a "gallery" field: an array of every image
    filename. Clicking the All Work card opens a full-screen preview of
    all of them right on the page — it does not navigate anywhere.
  - Add "hideFromHome: true" so it doesn't compete with your real case
    studies for one of the 5 featured homepage spots. It will still show
    up in All Work like everything else.
  - Still give it "image" and "thumbnail" (usually just the first artwork,
    or whichever piece you want representing the set).
*/

const ART_GALLERY = [
  "heartart.png", "flowerart.heic", "pigeonhouseart.heic", "pigeonart2.heic", "pigeonart3.heic",
  "phoneart.heic", "beeart.heic", "turtleart.heic", "reefart.heic", "reedart1.heic",
  "beeart.heic", "sunflowerart.heic", "sunflowerart2.heic", "shoeart.heic"
];

const PROJECTS = [
  {
    slug: "taktisinfopage.html",
    title: "Taktis: Smart Pen",
    category: "Product Design",
    description: "Where every word moves with you.",
    image: "taktisthumbnail.png",
    thumbnail: "taktisthumbnail2.png",
    video: false,
    date: "2026-06-01"
  },
  {
    slug: "withloveinfopage.html",
    title: "With Love Market & Cafe",
    category: "Web Design",
    description: "Bringing healthy food to South LA.",
    image: "withlovethumbnail.png",
    thumbnail: "withlovethumbnail2.png",
    video: false,
    date: "2026-05-01"
  },
  {
    slug: "aroinfopage.html",
    title: "ARO",
    category: "Branding",
    description: "Wear a narrative.",
    image: "arothumbnail.png",
    thumbnail: "arothumbnail2.png",
    video: false,
    date: "2026-04-01"
  },
  {
    slug: "acasoinfopage.html",
    title: "ACASO",
    category: "Branding",
    description: "Built for the ambitious.",
    image: "acasothumbnail.png",
    thumbnail: "acasothumbnail2.png",
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
  },
  {
    title: "Art",
    category: "Art",
    description: "A collection of personal artwork.",
    image: heartart.png,
    thumbnail: heartart.png,
    gallery: ART_GALLERY,
    hideFromHome: true,
    date: "2024-01-01"
  }
];
