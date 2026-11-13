/*
  EDIT THIS FILE to change what the site says.
  Everything on the page (name, roles, experience, projects, links) comes from here.
*/
window.PORTFOLIO = {
  name: "Syed Madad Ali",
  initials: "SMA",
  photo: "profile.jpg", // set to "" to show the initials instead
  location: "Sahiwal, Pakistan",
  roles: ["Data Scientist", "Data Analyst", "Dashboard Builder"],
  summary:
    "I’m a data scientist and computer science student in Sahiwal, Pakistan. I work with Python, pandas, scikit-learn and Power BI. My churn classifier reached 86.1% accuracy and my insurance claim regression an R² of 0.807.",
  lookingFor:
    "I’m looking for a Data Analyst or Data Science role, and I take freelance projects.",

  links: {
    github: "https://github.com/smadadali4-create",
    linkedin: "https://www.linkedin.com/in/syed-madad-ali-6760192a4/",
    instagram: "https://www.instagram.com/syed_maddy1/",
    email: "smadadali4@gmail.com"
  },

  /*
    experience: "details" are the lines that appear when someone hovers (or taps) a card.
    Keep each line short. "tags" are the small chips.
  */
  /*
    CONTACT FORM
    endpoint: paste a Formspree (or Web3Forms) address here, for example "https://formspree.io/f/xxxxxxx",
              and submissions are emailed to you without opening the visitor's mail app.
              Leave it empty and the form opens the visitor's email app with their details filled in.
  */
  form: {
    endpoint: "",
    subject: "Portfolio message from {name}"
  },

  /* ABOUT ME: edit the paragraphs, quick facts and counters here */
  about: {
    paragraphs: [
      "I’m Syed Madad Ali, but most people call me Ali. I’m a computer science student from Sahiwal, Pakistan, building a career in **data science and analytics**. I like the whole journey of a data problem: taking a messy dataset, cleaning it, finding out what is really going on, and turning it into something a person can act on.",
      "I work as a data analyst at IT Virtual House, and I have also done an internship there on the UI/UX side. I completed a data science internship at DevelopersHub Corporation too, where I delivered projects end to end: a customer churn classifier that reached **86.1% accuracy**, an insurance claim regression with an **R² of 0.807**, K-Means customer segments explained with SHAP, and a Streamlit dashboard on the Superstore data.",
      "Alongside that I freelance. Since October 2026 I have been selling **Power BI dashboards** and data cleaning and analysis on Fiverr. My earlier freelance work in UI/UX design is why I care about how a dashboard looks and reads, not only whether the numbers are right.",
      "I also write up what I find. My articles on the Superstore discount problem and on Pakistan’s population data show how I work: start with a question, check the quality of the data, and explain the answer in **plain language**. I keep learning through Stanford’s Code in Place program, and I have built desktop apps in Java and Python and a home services web platform called ProServe X.",
      "I’m looking for a **Data Analyst or Data Science role** where I can keep working with real data, learn from a strong team and ship work that people actually use. I’m open to freelance projects as well."
    ],
    stats: [
      { label: "Projects", of: "projects" },
      { label: "Data articles", value: 2 },
      { label: "Work experiences", of: "experience" }
    ],
    facts: [
      { label: "Based in", value: "Sahiwal, Pakistan" },
      { label: "Studying", value: "Computer Science" },
      { label: "Focus", value: "Data science and analytics" },
      { label: "Right now", value: "Data Analyst at IT Virtual House" },
      { label: "Open to", value: "Data Analyst and Data Science roles, and freelance projects" }
    ]
  },

  /* SKILLS: one card per group. "icon" is a short badge text. */
  skillsIntro: "The tools and methods I use to take a dataset from raw to finished.",
  skills: [
    { icon: "</>", title: "Programming", blurb: "The languages I build with.", items: ["Python", "SQL (SQLite)", "JavaScript", "pandas", "NumPy"] },
    { icon: "DA", title: "Data analysis", blurb: "From messy file to trusted data.", items: ["pandas", "NumPy", "Exploratory analysis", "Data cleaning", "Data profiling", "Excel"] },
    { icon: "ML", title: "Machine learning", blurb: "Models I can explain, not just run.", items: ["scikit-learn", "K-Means clustering", "Logistic Regression", "Random Forest", "Regression", "SHAP"] },
    { icon: "BI", title: "Dashboards and charts", blurb: "Making the answer easy to see.", items: ["Power BI", "Tableau", "matplotlib", "Data storytelling"] },
    { icon: "DEV", title: "Tools", blurb: "How I analyze, ship and share my work.", items: ["Jupyter Notebook", "Anaconda", "GitHub", "Power BI", "Excel", "Tableau"] },
    { icon: "UX", title: "Design and writing", blurb: "How the work looks and reads.", items: ["UI/UX design", "Data articles", "Plain-language reporting"] }
  ],

  experience: [
    {
      badge: "IT", title: "Data Analyst", org: "IT Virtual House, employee",
      tags: ["Data analysis", "Reporting"],
      details: [
        "A full employee role as a data analyst, not an internship",
        "Turns raw business data into clear findings for the team"
      ]
    },
    {
      badge: "IT", title: "UI/UX Intern", org: "IT Virtual House, internship",
      tags: ["UI/UX", "Design"],
      details: [
        "Internship at IT Virtual House focused on UI/UX design",
        "Worked on how interfaces look, flow and feel for users"
      ]
    },
    {
      badge: "DH", title: "Data Analyst Intern", org: "DevelopersHub Corporation",
      tags: ["Python", "scikit-learn", "SHAP", "Streamlit"],
      details: [
        "Iris dataset EDA, then an insurance claim regression with R² of 0.807",
        "Customer churn classifier that reached 86.1% accuracy",
        "K-Means customer segments explained with SHAP",
        "Term deposit prediction and a Streamlit BI dashboard"
      ]
    },
    {
      badge: "Fi", title: "Freelance Data Analyst", org: "Fiverr, since October 2026",
      tags: ["Power BI", "Excel", "Data cleaning"],
      details: [
        "Power BI dashboards built from your Excel data",
        "Data analysis, cleaning and visualization",
        "Excel and CSV data cleaning for messy files"
      ]
    },
    {
      badge: "UX", title: "Freelance UI/UX Designer", org: "Independent",
      tags: ["UI/UX", "Freelance"],
      details: [
        "Designed interfaces for clients as an independent designer",
        "Brings the same design eye to dashboards and reports"
      ]
    }
  ],


  /*
    preview: "bars" | "line" | "scatter" | "layout"  (drawn illustrations)
    image:   "my-screenshot.png"               (optional, replaces the illustration)
  */
  projects: [
    {
      title: "Superstore: the discount problem",
      description: "Analysis of 9,994 order lines from the Sample Superstore data (2014 to 2017). A healthy 12.5% margin hid a pattern: 96.8% of lines discounted above 20% lost money.",
      tags: ["Python", "pandas", "EDA", "Retail analytics"],
      preview: "bars", image: "superstore-discounts.png",
      links: [{ label: "Read the article", url: "Superstore_Data_Article.pdf" }]
    },
    {
      title: "Pakistan population data profiling",
      description: "Data profiling of 528 sub-divisions across Pakistan. Urban population grew 75.8% since 1998 against 47.1% for rural, and zero missing cells still hid 33 data quality alerts.",
      tags: ["Python", "Data profiling", "EDA"],
      preview: "bars", image: "pakistan-population.png",
      links: [{ label: "Read the article", url: "Pakistan_Population_Data_Article.pdf" }]
    },
    {
      title: "Tips dataset analysis",
      description: "Exploratory analysis of the Tips dataset, visualized in Power BI to show what affects tipping.",
      tags: ["Power BI", "EDA"],
      preview: "bars", image: "tips-dashboard.png",
      links: [{ label: "View on GitHub", url: "https://github.com/smadadali4-create/Tips_Visulization_PowerBI" }]
    },
    {
      title: "Titanic dataset analysis",
      description: "Exploratory analysis of passenger data from the Titanic dataset, visualized in Power BI.",
      tags: ["Power BI", "EDA"],
      preview: "line", image: "titanic-dashboard.png",
      links: [{ label: "View on GitHub", url: "https://github.com/smadadali4-create/Titanic_Visulization_PowerBI" }]
    },
    {
      title: "Churn and insurance models",
      description: "DevelopersHub internship, phase 1: Iris dataset EDA, a customer churn classifier that reached 86.1% accuracy, and an insurance claim regression with an R² of 0.807.",
      tags: ["Python", "scikit-learn", "Random Forest"],
      preview: "scatter", image: "internship-churn-model.png",
      links: [{ label: "View on GitHub", url: "https://github.com/smadadali4-create/DATA-SCIENCE-INTERNSHIP-DEVELPORSHUB-CORPORATION" }]
    },
    {
      title: "Customer segmentation and prediction",
      description: "DevelopersHub internship, phase 2: K-Means customer segments explained with SHAP, term deposit prediction with Logistic Regression and Random Forest, and a Streamlit dashboard on the Superstore data.",
      tags: ["K-Means", "SHAP", "Streamlit"],
      preview: "scatter", image: "internship-customer-segments.png",
      links: [{ label: "View on GitHub", url: "https://github.com/smadadali4-create/DATA-SCIENCE-INTERNSHIP-DEVELPORSHUB-CORPORATION-PHASE-2" }]
    },
    {
      title: "Iris flower classification",
      description: "Oasis Infobyte internship: five classifiers compared on the Iris dataset, with EDA and cross-validation to pick the winner. An SVM came out best at 96.7% accuracy, and petal size drives almost every prediction.",
      tags: ["Python", "scikit-learn", "Classification"],
      preview: "scatter", image: "oasis-iris-classification.png",
      links: [{ label: "View on GitHub", url: "https://github.com/smadadali4-create/OIBSIP/tree/main/DataScience-Task1-IrisClassification" }]
    },
    {
      title: "Email and SMS spam detection",
      description: "Oasis Infobyte internship: a TF-IDF text classifier that separates spam from legitimate messages. After removing 403 duplicates, a Linear SVM reached 98.1% accuracy and a spam F1 of 0.92.",
      tags: ["Python", "NLP", "TF-IDF", "scikit-learn"],
      preview: "bars", image: "oasis-spam-detection.png",
      links: [{ label: "View on GitHub", url: "https://github.com/smadadali4-create/OIBSIP/tree/main/DataScience-Task4-EmailSpamDetection" }]
    },
    {
      title: "Sales prediction from ad spend",
      description: "Oasis Infobyte internship: predicting sales from TV, Radio and Newspaper spend. Polynomial regression reached an R² of 0.987 and showed that TV and Radio work best together while Newspaper adds almost nothing.",
      tags: ["Python", "scikit-learn", "Regression"],
      preview: "line", image: "oasis-sales-prediction.png",
      links: [{ label: "View on GitHub", url: "https://github.com/smadadali4-create/OIBSIP/tree/main/DataScience-Task5-SalesPrediction" }]
    },
    {
      title: "ProServe X",
      description: "A web platform where customers find carpenters, plumbers, electricians and other home services in one place.",
      tags: ["Python", "Web app"],
      preview: "layout", image: "proservex-flow.png",
      links: [{ label: "View on GitHub", url: "https://github.com/smadadali4-create/PROSERVE-X" }]
    }
  ],

  more: [
    { label: "snackkk", url: "https://github.com/smadadali4-create/snackkk" },
    { label: "Bin_Saeed", url: "https://github.com/smadadali4-create/Bin_Saeed" },
    { label: "webpage.html", url: "https://github.com/smadadali4-create/webpage.html" }
  ]
};
