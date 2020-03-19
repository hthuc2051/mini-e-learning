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
    public class tblLessonsController : Controller
    {
        private dbLearningOnlineSystemEntities db = new dbLearningOnlineSystemEntities();

        // GET: tblLessons
        public ActionResult Index()
        {
            return View(db.tblLessons.ToList().Where(t => t.active == true));
        }

        // GET: tblLessons/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tblLesson tblLesson = db.tblLessons.Find(id);
            if (tblLesson == null)
            {
                return HttpNotFound();
            }
            return View(tblLesson);
        }

        // GET: tblLessons/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: tblLessons/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,name,description,video_link,active")] tblLesson tblLesson)
        {
            if (ModelState.IsValid)
            {
                db.tblLessons.Add(tblLesson);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tblLesson);
        }

        // GET: tblLessons/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tblLesson tblLesson = db.tblLessons.Find(id);
            if (tblLesson == null)
            {
                return HttpNotFound();
            }
            return View(tblLesson);
        }

        // POST: tblLessons/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,name,description,video_link,active")] tblLesson tblLesson)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tblLesson).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tblLesson);
        }

        // GET: tblLessons/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tblLesson tblLesson = db.tblLessons.Find(id);
            if (tblLesson == null)
            {
                return HttpNotFound();
            }
            return View(tblLesson);
        }

        // POST: tblLessons/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            tblLesson tblLesson = db.tblLessons.Find(id);
            tblLesson.active = false;
            db.Entry(tblLesson).State = EntityState.Modified;
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
        public ActionResult GetLessonList(int courseId)
        {
            var listLesson = from c in db.tblCourses
                             join cle in db.tblCourses_Lessons on c.id equals cle.course_id
                             join l in db.tblLessons on cle.lesson_id equals l.id
                             where c.id == courseId
                             select l;
            List<tblLesson> lessons = new List<tblLesson>();
          foreach(var item in listLesson)
            {
                tblLesson lesson = new tblLesson();
                lesson.id = item.id;
                lesson.name = item.name;
                lesson.video_link = item.video_link;
                lesson.description = item.description;
                lesson.active = item.active;
                lessons.Add(lesson);
            }
            ViewBag.CourseId = courseId;
            return View("Index", lessons.ToList().Where(t => t.active == true));
        }

        public ActionResult AddLesson(int courseId)
        {
            IEnumerable<tblLesson> lessons = from c in db.tblCourses
                                             join cle in db.tblCourses_Lessons on c.id equals cle.course_id
                                             join l in db.tblLessons on cle.lesson_id equals l.id
                                             where c.id == courseId
                                             select l;
            IEnumerable<tblLesson> lessonList = from l in db.tblLessons where l.active == true select l;
            List<tblLesson> lessonAvailable = new List<tblLesson>();
            foreach (var item in lessonList.ToList())
            {
                int id = item.id;
                bool isExist = false;
                foreach (var items in lessons.ToList())
                {
                    if(items.id == id)
                    {
                        isExist = true;
                    }
                }
                if (!isExist)
                {
                    lessonAvailable.Add(item);
                }
            }
            ViewBag.CourseId = courseId;
            ViewBag.IsAddLesson = true;
            return View("Index", lessonAvailable);
        }

        public ActionResult RemoveQuestion(int questionId, int lessonId)
        {
            IEnumerable<Question_Lesson> question_Lessons = db.Question_Lesson.ToList().Where(t => t.questionId == questionId && t.lessonId == lessonId);
            foreach (Question_Lesson item in question_Lessons)
            {
                db.Question_Lesson.Remove(item);
                db.SaveChanges();
            }

            return RedirectToAction("GetListQuestion", "Questions", new { lessonId = lessonId });
        }

        public ActionResult AddQuestion(int questionId, int lessonId)
        {
            Question_Lesson question_Lesson = new Question_Lesson();
            question_Lesson.lessonId = lessonId;
            question_Lesson.questionId = questionId;
            db.Question_Lesson.Add(question_Lesson);
            db.SaveChanges();
            return RedirectToAction("GetListQuestion", "Questions", new { lessonId = lessonId });
        }

    }
}
