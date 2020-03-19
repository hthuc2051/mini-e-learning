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
    public class AnswersController : Controller
    {
        private dbLearningOnlineSystemEntities db = new dbLearningOnlineSystemEntities();

        public ActionResult GetAnswers(int questionId)
        {
            var answers = from q in db.Questions
                            join qa in db.Question_Answer on q.id equals qa.questionId
                            join a in db.Answers on qa.answerId equals a.id
                            where q.id == questionId && a.active == true 
                            select new AnswerDTO { answer = a, isCorrect = qa.isCorrect};
            //List<Answer> listAnswers = new List<Answer>();
            //foreach (var item in answers)
            //{
            //    Answer answer = new Answer();
            //    answer.id = item.id;
            //    answer.answer1 = item.answer1;
            //    answer.active = item.active;
            //    listAnswers.Add(answer);
            //}
            Question question = db.Questions.Find(questionId);
            ViewBag.QuestionId = questionId;
            ViewBag.Question = question.question1;
            Session.Add("QUESTION", questionId);
            return View("Index",answers.ToList());
        }

        public ActionResult AddAnswer(int questionId)
        {
            var answers = from q in db.Questions
                          join qa in db.Question_Answer on q.id equals qa.questionId
                          join a in db.Answers on qa.answerId equals a.id
                          where q.id == questionId
                          select a;
            Question question = db.Questions.Find(questionId);
            IEnumerable<Answer> answerList = from l in db.Answers where l.active == true select l;
            List<AnswerDTO> answerAvailable = new List<AnswerDTO>();
            foreach (var item in answerList.ToList())
            {
                int id = item.id;
                bool isExist = false;
                foreach (var items in answers.ToList())
                {
                    if (items.id == id)
                    {
                        isExist = true;
                    }
                }
                if (!isExist)
                {
                    AnswerDTO dto = new AnswerDTO();
                    dto.answer = item;
                    dto.isCorrect = false;
                    answerAvailable.Add(dto);
                }
            }
            ViewBag.QuestionId = questionId;
            ViewBag.Question = question.question1;
            ViewBag.IsAddAnswer = true;
            return View("Index", answerAvailable);
        }
        // GET: Answers
        public ActionResult Index()
        {
            return View(db.Answers.ToList().Where(t => t.active == true));
        }

        // GET: Answers/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Answer answer = db.Answers.Find(id);
            if (answer == null)
            {
                return HttpNotFound();
            }
            return View(answer);
        }

        // GET: Answers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Answers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,answer1")] Answer answer)
        {
            if (ModelState.IsValid)
            {
                answer.active = true;
                db.Answers.Add(answer);
                db.SaveChanges();
                string questionId = Session["QUESTION"].ToString();
                return RedirectToAction("GetAnswers",new { questionId = questionId});
            }

            return View(answer);
        }

        // GET: Answers/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Answer answer = db.Answers.Find(id);
            if (answer == null)
            {
                return HttpNotFound();
            }
            return View(answer);
        }

        // POST: Answers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,answer1")] Answer answer)
        {
            if (ModelState.IsValid)
            {
                answer.active = true;
                db.Entry(answer).State = EntityState.Modified;
                db.SaveChanges();
                string questionId = Session["QUESTION"].ToString();
                return RedirectToAction("GetAnswers", new { questionId = questionId });
            }
            return View(answer);
        }

        // GET: Answers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Answer answer = db.Answers.Find(id);
            if (answer == null)
            {
                return HttpNotFound();
            }
            return View(answer);
        }

        // POST: Answers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Answer answer = db.Answers.Find(id);
            answer.active = false;
            db.Entry(answer).State = EntityState.Modified;
            db.SaveChanges();
            string questionId = Session["QUESTION"].ToString();
            return RedirectToAction("GetAnswers", new { questionId = questionId });
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
