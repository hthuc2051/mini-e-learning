﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class dbLearningOnlineSystemEntities : DbContext
    {
        public dbLearningOnlineSystemEntities()
            : base("name=dbLearningOnlineSystemEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Answer> Answers { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Question_Answer> Question_Answer { get; set; }
        public virtual DbSet<Question_Lesson> Question_Lesson { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<tblCours> tblCourses { get; set; }
        public virtual DbSet<tblCourses_Lessons> tblCourses_Lessons { get; set; }
        public virtual DbSet<tblLesson> tblLessons { get; set; }
        public virtual DbSet<tblUser> tblUsers { get; set; }
        public virtual DbSet<User_Lesson_Course> User_Lesson_Course { get; set; }
    }
}
