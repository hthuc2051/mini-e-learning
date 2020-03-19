using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using OnlineStudyWebAdmin.Models;

namespace OnlineStudyWebAdmin.Controllers
{
    public class tblCoursController : Controller
    {
        private dbLearningOnlineSystemEntities db = new dbLearningOnlineSystemEntities();

        // GET: tblCours
        public ActionResult Index()
        {
            return View(db.tblCourses.ToList().Where(t => t.active == true));
        }

        // GET: tblCours/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tblCours tblCours = db.tblCourses.Find(id);
            if (tblCours == null)
            {
                return HttpNotFound();
            }
            return View(tblCours);
        }

        // GET: tblCours/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: tblCours/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,name,description,active,icon")] tblCours tblCours)
        {
            if (ModelState.IsValid)
            {
                db.tblCourses.Add(tblCours);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tblCours);
        }

        // GET: tblCours/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tblCours tblCours = db.tblCourses.Find(id);
            if (tblCours == null)
            {
                return HttpNotFound();
            }
            return View(tblCours);
        }

        // POST: tblCours/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,name,description,active,icon")] tblCours tblCours)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tblCours).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tblCours);
        }

        // GET: tblCours/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tblCours tblCours = db.tblCourses.Find(id);
            if (tblCours == null)
            {
                return HttpNotFound();
            }
            return View(tblCours);
        }

        // POST: tblCours/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            tblCours tblCours = db.tblCourses.Find(id);
            tblCours.active = false;
            db.Entry(tblCours).State = EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        
        public ActionResult RemoveLesson( int lessonId, int CourseId)
        {
           IEnumerable<tblCourses_Lessons> courses_Lessons = db.tblCourses_Lessons.ToList().Where(t => t.lesson_id == lessonId && t.course_id == CourseId);
           foreach(tblCourses_Lessons item in courses_Lessons)
            {
                foreach (User_Lesson_Course items in item.User_Lesson_Course.ToList())
                {
                    db.User_Lesson_Course.Remove(items);
                    db.SaveChanges();
                }
                db.tblCourses_Lessons.Remove(item);
                db.SaveChanges();
            }

            return RedirectToAction("GetLessonList", "tblLessons", new { courseId = CourseId });
        }

        public ActionResult AddLesson(int lessonId, int courseId)
        {
            tblCourses_Lessons courses_Lessons = new tblCourses_Lessons();
            courses_Lessons.lesson_id = lessonId;
            courses_Lessons.course_id = courseId;
            db.tblCourses_Lessons.Add(courses_Lessons);
            db.SaveChanges();
            return RedirectToAction("GetLessonList", "tblLessons", new { courseId = courseId });
        }


    }
}
