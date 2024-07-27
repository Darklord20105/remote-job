

Home Page Job item structure

id: String random, 

company:String, /* company name */

role: String, 
/* job role dsecription */

createdAt: Date String, 
/* date when the entry is created */

logo: null || url String,  /* in case of null the first letters of the company name String will be rendered */

jobClass: String probably has predefined option in DB to avoid confusion
/* industry where role is offered IT, translate ...etc */

location: String probably has predefined option in DB to select specific countries
/* job location availability */

salaryRange: {min: Number, max: Number}, Object with two properties min and max both has values as Numbers 
/* salary range offered */

verified: Boolean *optional not required*
/* indicator that company has trusted info , not scam */

hot: Boolean *optional not required*
/* indicator that the job has high demand by users */

jobType: String  *optional not required*
/* indicator job state , full time , contract, temporary

tagList: ['developer', 'javascript', 'react', 'backend', 'mongodb'],
Array of Strings 
/* job tags so it cqn be found easily */

*optional not required*
priority: String with 3 options (high, medium, normal) *optional not required*
/*  used to change background color of important jobs or good jobs or normal jobs */

