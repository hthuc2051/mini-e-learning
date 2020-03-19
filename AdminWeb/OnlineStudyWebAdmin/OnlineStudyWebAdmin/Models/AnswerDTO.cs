using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineStudyWebAdmin.Models
{
    public class AnswerDTO
    {
        public Answer answer { get; set; }
        public bool? isCorrect { get; set; }
    }
}