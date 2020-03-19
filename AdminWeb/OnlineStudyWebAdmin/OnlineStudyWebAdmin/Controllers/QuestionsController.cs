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
    public class QuestionsController : Controller
    {
        private dbLearningOnlineSystemEntities db = new dbLearningOnlineSystemEntities();

        public ActionResult GetListQuestion(int lessonId)
        {
            var questions = from l in db.tblLessons
                            join lq in db.Question_Lesson on l.id equals lq.lessonId
                            join q in db.Questions on lq.questionId equals q.id
                            where l.id == lessonId
                            select q;
            List<Question> listQuestions = new List<Question>();
            foreach (var item in questions)
            {
                Question question = new Question();
                question.id = item.id;
                question.image_src = item.image_src;
                question.question1 = item.question1;
                question.active = item.active;
                listQuestions.Add(question);
            }
            ViewBag.LessonId = lessonId;
            return View("Index",listQuestions.ToList().Where(t => t.active == true));
        }
        public ActionResult AddQuestion(int lessonId)
        {
            IEnumerable<Question> questions = from l in db.tblLessons
                                              join lq in db.Question_Lesson on l.id equals lq.lessonId
                                              join q in db.Questions on lq.questionId equals q.id
                                              where l.id == lessonId
                                              select q;
            IEnumerable<Question> questionList = from l in db.Questions where l.active == true select l;
            List<Question> questionAvailable = new List<Question>();
            foreach (var item in questionList.ToList())
            {
                int id = item.id;
                bool isExist = false;
                foreach (var items in questions.ToList())
                {
                    if (items.id == id)
                    {
                        isExist = true;
                    }
                }
                if (!isExist)
                {
                    questionAvailable.Add(item);
                }
            }
            ViewBag.LessonId = lessonId;
            ViewBag.IsAddQuestion = true;
            return View("Index", questionAvailable);
        }
        public ActionResult RemoveAnswer(int answerId, int questionId)
        {
            IEnumerable<Question_Answer> question_Answers = db.Question_Answer.ToList().Where(t => t.questionId == questionId && t.answerId == answerId);
            foreach (Question_Answer item in question_Answers)
            {
                db.Question_Answer.Remove(item);
                db.SaveChanges();
            }

            return RedirectToAction("GetAnswers", "Answers", new { questionId = questionId });
        }

        public ActionResult AddAnswer(int answerId, int questionId,string isCorrect)
        {
            Question_Answer question_Answer = new Question_Answer();
            question_Answer.questionId = questionId;
            question_Answer.answerId = answerId;
            question_Answer.isCorrect = bool.Parse(isCorrect);
            db.Question_Answer.Add(question_Answer);
            db.SaveChanges();
            return RedirectToAction("GetAnswers", "Answers", new { questionId = questionId });
        }

        // GET: Questions
        public ActionResult Index()
        {
            return View(db.Questions.ToList().Where(t => t.active == true));
        }

        // GET: Questions/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Question question = db.Questions.Find(id);
            if (question == null)
            {
                return HttpNotFound();
            }
            return View(question);
        }

        // GET: Questions/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Questions/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,question1,image_src,active")] Question question)
        {
            if (ModelState.IsValid)
            {
                db.Questions.Add(question);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(question);
        }

        // GET: Questions/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Question question = db.Questions.Find(id);
            if (question == null)
            {
                return HttpNotFound();
            }
            return View(question);
        }

        // POST: Questions/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,question1,image_src,active")] Question question)
        {
            if (ModelState.IsValid)
            {
                db.Entry(question).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(question);
        }

        // GET: Questions/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Question question = db.Questions.Find(id);
            if (question == null)
            {
                return HttpNotFound();
            }
            return View(question);
        }

        // POST: Questions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Question question = db.Questions.Find(id);
            question.active = false;
            db.Entry(question).State = EntityState.Modified;
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
    }
}
