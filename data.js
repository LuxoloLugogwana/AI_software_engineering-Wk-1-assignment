(function () {
  // Simple in-memory course catalog
  // You can freely edit or extend this list
  const COURSES = [
    {
      id: "js-basics",
      title: "JavaScript Basics",
      description: "Foundational concepts to get productive with JavaScript fast.",
      lessons: [
        { id: "js-1", title: "Intro & Setup" },
        { id: "js-2", title: "Variables & Types" },
        { id: "js-3", title: "Functions & Scope" },
        { id: "js-4", title: "Arrays & Objects" },
        { id: "js-5", title: "DOM Basics" },
      ],
    },
    {
      id: "html-css",
      title: "HTML & CSS Essentials",
      description: "Build solid, responsive pages with semantic HTML and modern CSS.",
      lessons: [
        { id: "hc-1", title: "Semantic HTML" },
        { id: "hc-2", title: "CSS Selectors" },
        { id: "hc-3", title: "Flexbox & Grid" },
        { id: "hc-4", title: "Responsive Design" },
        { id: "hc-5", title: "Accessibility Basics" },
      ],
    },
    {
      id: "web-accessibility",
      title: "Web Accessibility",
      description: "Design and build inclusive experiences that work for everyone.",
      lessons: [
        { id: "a11y-1", title: "Why Accessibility Matters" },
        { id: "a11y-2", title: "Keyboard Navigation" },
        { id: "a11y-3", title: "Color & Contrast" },
        { id: "a11y-4", title: "ARIA Landmarks" },
        { id: "a11y-5", title: "Forms & Labels" },
      ],
    },
  ];

  window.COURSES = COURSES;
})();
