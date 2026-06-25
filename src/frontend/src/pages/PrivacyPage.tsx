import Layout from "@/components/Layout";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide during registration (name, email address) and when submitting a help request (personal details, documents, location). We also collect usage data to improve the platform.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your information is used to verify help requests, enable Heroes to support you, communicate platform updates, and prevent fraud. We never sell your data to third parties.",
  },
  {
    title: "Document Storage",
    content:
      "Verification documents are stored securely and encrypted. Documents are only accessible to Heroes who have paid the case unlock fee and to our verification team.",
  },
  {
    title: "Data Retention",
    content:
      "Active case data is retained for the duration of the case plus 2 years. You may request deletion of your data at any time by contacting our support team, subject to legal obligations.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, correct, or delete your personal data. You may also request a copy of all data we hold about you. Contact us at privacy@givethra.com.",
  },
  {
    title: "Cookies",
    content:
      "We use essential cookies for authentication and session management, and analytics cookies to understand platform usage. You may disable non-essential cookies in your browser settings.",
  },
];

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        <div className="space-y-3">
          <h1 className="font-display text-4xl font-bold text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">Last updated: June 2026</p>
        </div>

        <div className="prose prose-sm max-w-none text-foreground">
          <p className="text-muted-foreground leading-relaxed">
            Givethra is committed to protecting your privacy. This policy
            explains how we collect, use, and safeguard your personal
            information when you use our platform.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map(({ title, content }) => (
            <section key={title} className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
