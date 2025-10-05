(function () {
  function qs(sel) { return document.querySelector(sel); }
  function el(tag, props, ...children) {
    const node = document.createElement(tag);
    if (props) Object.assign(node, props);
    for (const child of children) {
      if (child == null) continue;
      if (typeof child === "string") node.appendChild(document.createTextNode(child));
      else node.appendChild(child);
    }
    return node;
  }

  function findCourse(courseId) {
    return (window.COURSES || []).find((c) => c.id === courseId);
  }

  function updateProgressUI(course) {
    const progress = window.ProgressStore.getCourseProgress(course);
    const bar = qs("#progress-bar");
    const label = qs("#progress-label");
    if (bar) bar.style.width = `${progress.percent}%`;
    if (label) label.textContent = `${progress.percent}% complete`;
  }

  function renderLessons(course) {
    const list = qs("#lesson-list");
    list.innerHTML = "";
    const progress = window.ProgressStore.getCourseProgress(course);

    for (const lesson of course.lessons) {
      const checkbox = el("input", { type: "checkbox", checked: progress.completedIds.has(lesson.id), id: `chk-${lesson.id}` });
      checkbox.addEventListener("change", (e) => {
        const checked = e.currentTarget.checked;
        window.ProgressStore.toggleLesson(course, lesson.id, checked);
        updateProgressUI(course);
      });

      const item = el(
        "li",
        { className: "lesson-item" },
        checkbox,
        el("label", { htmlFor: `chk-${lesson.id}`, className: "lesson-title" }, lesson.title)
      );

      list.appendChild(item);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(location.search);
    const courseId = params.get("id");
    const course = findCourse(courseId);

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    if (!course) {
      const main = qs("main.container");
      if (main) main.innerHTML = "<p>Course not found. <a class=\"nav-link\" href=\"./index.html\">Back to courses</a></p>";
      const title = qs("#course-title");
      if (title) title.textContent = "Course not found";
      return;
    }

    const titleEl = qs("#course-title");
    const descEl = qs("#course-desc");
    if (titleEl) titleEl.textContent = course.title;
    if (descEl) descEl.textContent = course.description;

    renderLessons(course);
    updateProgressUI(course);

    const completeBtn = qs("#complete-btn");
    const resetBtn = qs("#reset-btn");

    if (completeBtn) {
      completeBtn.addEventListener("click", () => {
        window.ProgressStore.completeCourse(course);
        renderLessons(course);
        updateProgressUI(course);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        window.ProgressStore.resetCourse(course);
        renderLessons(course);
        updateProgressUI(course);
      });
    }
  });
})();
