(function () {
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

  function formatProgressText(progress) {
    return `${progress.completedCount} of ${progress.totalLessons} lessons • ${progress.percent}%`;
  }

  function renderCourseCard(course) {
    const progress = window.ProgressStore.getCourseProgress(course);

    const progressBar = el("div", { className: "progress-bar", style: `width: ${progress.percent}%` });
    const progressEl = el("div", { className: "progress" }, progressBar);
    const progressLabel = el("div", { className: "progress-label" }, formatProgressText(progress));

    const viewBtn = el("a", { className: "btn btn-primary", href: `./course.html?id=${encodeURIComponent(course.id)}` }, "View course");
    const completeBtn = el("button", { className: "btn btn-success" }, progress.isCompleted ? "Completed ✓" : "Mark completed");

    completeBtn.addEventListener("click", () => {
      const updated = window.ProgressStore.completeCourse(course);
      progressBar.style.width = `${updated.percent}%`;
      progressLabel.textContent = formatProgressText(updated);
      completeBtn.textContent = "Completed ✓";
    });

    const card = el(
      "div",
      { className: "card course-card" },
      el("h3", null, course.title),
      el("p", null, course.description),
      el("div", { className: "meta" }, progress.isCompleted ? "Completed" : "In progress"),
      el("div", { className: "progress-wrap" }, progressEl, progressLabel),
      el("div", { className: "card-actions" }, viewBtn, completeBtn)
    );

    return card;
  }

  function renderCourses() {
    const grid = document.getElementById("course-grid");
    grid.innerHTML = "";
    for (const course of window.COURSES) {
      grid.appendChild(renderCourseCard(course));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    renderCourses();
  });
})();
