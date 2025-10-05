(function () {
  const STORAGE_PREFIX = "elearn:course:";

  function getStorageKey(courseId) {
    return `${STORAGE_PREFIX}${courseId}`;
  }

  function readCompletedLessonIds(courseId) {
    try {
      const raw = localStorage.getItem(getStorageKey(courseId));
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((x) => typeof x === "string");
    } catch (_e) {
      return [];
    }
  }

  function writeCompletedLessonIds(courseId, lessonIds) {
    try {
      const arr = Array.from(new Set(lessonIds));
      localStorage.setItem(getStorageKey(courseId), JSON.stringify(arr));
    } catch (_e) {
      // ignore
    }
  }

  function getCourseProgress(course) {
    const totalLessons = course.lessons.length;
    const completedIds = new Set(readCompletedLessonIds(course.id));
    const completedCount = course.lessons.reduce(
      (acc, lesson) => acc + (completedIds.has(lesson.id) ? 1 : 0),
      0
    );
    const percent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
    const isCompleted = totalLessons > 0 && completedCount === totalLessons;
    return { completedIds, completedCount, totalLessons, percent, isCompleted };
  }

  function toggleLesson(course, lessonId, isCompleted) {
    const current = new Set(readCompletedLessonIds(course.id));
    if (isCompleted) current.add(lessonId);
    else current.delete(lessonId);
    writeCompletedLessonIds(course.id, Array.from(current));
    return getCourseProgress(course);
  }

  function completeCourse(course) {
    const allIds = course.lessons.map((l) => l.id);
    writeCompletedLessonIds(course.id, allIds);
    return getCourseProgress(course);
  }

  function resetCourse(course) {
    writeCompletedLessonIds(course.id, []);
    return getCourseProgress(course);
  }

  window.ProgressStore = {
    readCompletedLessonIds,
    writeCompletedLessonIds,
    getCourseProgress,
    toggleLesson,
    completeCourse,
    resetCourse,
  };
})();
