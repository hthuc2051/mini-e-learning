//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OnlineStudyWebAdmin.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class User_Lesson_Course
    {
        public int id { get; set; }
        public Nullable<int> user_id { get; set; }
        public Nullable<int> lesson_course_id { get; set; }
        public string status { get; set; }
    
        public virtual tblCourses_Lessons tblCourses_Lessons { get; set; }
        public virtual tblUser tblUser { get; set; }
    }
}
