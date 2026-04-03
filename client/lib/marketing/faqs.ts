export const FAQS = [
  {
    question: "How does Opal connect to my repositories?",
    answer:
      "Install our GitHub App on your org or account. We receive webhooks for pull requests and issues and run reviews using your configured rules—no need to paste tokens into chat.",
  },
  {
    question: "Can I customize review rules?",
    answer:
      "Yes. Define rules per installation, tune severity, and align feedback with your team’s style guide. Rules apply before AI summarization so output stays consistent.",
  },
  {
    question: "What’s included in Free vs Pro?",
    answer:
      "Free includes core PR/issue reviews and usage limits suitable for side projects. Pro raises limits for reviews, chat, and automation—exact limits are shown in the app after you sign in.",
  },
  {
    question: "Where is my code processed?",
    answer:
      "We index and review based on GitHub events you authorize. Use environment variables in production to point data stores and workers to regions that meet your policy.",
  },
  {
    question: "How do I get support?",
    answer:
      "Reach us through the contact page or your account email. Pro customers get priority responses for integration and billing questions.",
  },
];
