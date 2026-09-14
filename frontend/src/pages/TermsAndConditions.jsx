import siteConfig from "../data/siteConfig";
import { Mail, Phone, MapPin } from "lucide-react";
import "../styles/home/Terms.css";

const sections = [
  {
    title: "1. Who We Are",
    body: [
      `${siteConfig.companyName} is a technology and growth studio that designs, builds, markets, and scales digital products and businesses. Our services include web and mobile app development, software development, AI and automation solutions (including chatbots, AI voice agents, and business process automation), CRM and sales automation, WhatsApp/Email/SMS marketing automation, SEO and local SEO, paid ads and performance marketing, social media management, content-based services, branding, lead generation, conversion rate optimization, e-commerce development, and related digital marketing and consulting services, operating out of Nashik, Maharashtra, India.`,
    ],
  },
  {
    title: "2. Acceptance of Terms",
    body: [
      `By using our website, submitting an inquiry, or entering into a service agreement with ${siteConfig.companyName}, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions, along with our Privacy Policy. If you do not agree, please discontinue use of our website and services.`,
    ],
  },
  {
    title: "3. Our Services",
    body: [
      `We offer a range of development, AI/automation, and digital marketing services, including but not limited to those listed on our website. Specific deliverables, scope, timelines, pricing, and milestones for any project or campaign are defined in a separate written proposal, quotation, service order, or contract agreed upon between ${siteConfig.companyName} and the client before work begins. In case of any conflict between that document and these general Terms, the signed project agreement will take precedence.`,
      "Certain services are ongoing or retainer-based in nature (for example, SEO, paid ads management, social media management, CRM/automation upkeep, and maintenance). For these, deliverables are reviewed periodically as per the agreed scope, and results depend on factors outside our control, as described in Section 5A below.",
    ],
  },
  {
    title: "4. Client Responsibilities",
    list: [
      "Provide accurate, complete, and timely information, content, brand assets, and access (including but not limited to website, hosting, domain, ad accounts, social media accounts, CRM, and third-party platform credentials) required for the project.",
      "Review and respond to deliverables, drafts, and approval requests within the timeframes agreed upon, to avoid project or campaign delays.",
      "Ensure that any material, brand assets, data, or content provided to us does not infringe on third-party rights and complies with applicable laws (including data protection and consumer protection laws).",
      "Maintain compliance with the terms of service, advertising policies, and acceptable use policies of any third-party platform used in the project (e.g., Meta, Google, WhatsApp Business API, email/SMS providers).",
      "Make payments as per the agreed schedule in the project contract or invoice, including any separate ad spend or third-party platform costs.",
    ],
  },
  {
    title: "5. Payments and Refunds",
    body: [
      "Payment terms, including advance amounts, milestone payments, retainer fees, and final settlement, will be specified in the project agreement or invoice. Once work has commenced on a milestone or a billing cycle has begun, amounts paid for that milestone or cycle are generally non-refundable, except where otherwise agreed in writing. Delayed payments may result in a pause of ongoing work, campaigns, or automation services until dues are cleared.",
      "For services involving paid advertising, ad spend or media budget is separate from our service/management fees, is paid directly to the relevant advertising platform (e.g., Google, Meta) unless otherwise agreed in writing, and is non-refundable once spent by the platform.",
    ],
  },
  {
    title: "5A. Marketing, SEO, AI & Automation Disclaimers",
    body: [
      `${siteConfig.companyName} applies industry best practices for SEO, paid advertising, social media, CRM/sales automation, chatbot, AI voice agent, and lead generation services. However, we do not guarantee specific rankings, ad performance, lead volume, conversion rates, follower growth, revenue outcomes, or the uptime, accuracy, or behavior of any third-party AI model, platform, or algorithm, as these depend on factors beyond our control, including search engine and platform algorithm changes, market conditions, competitor activity, and client-provided inputs.`,
      "Where our services involve AI-generated content, chatbot responses, or AI voice agent interactions, the client is responsible for reviewing and approving such outputs before public or customer-facing use, unless a review process is otherwise agreed in writing. AI-based tools may occasionally produce inaccurate or unexpected outputs, and the client agrees to apply reasonable human oversight, particularly for regulated, sensitive, or customer-facing communications.",
    ],
  },
  {
    title: "6. Intellectual Property",
    body: [
      `Upon full and final payment, ownership of the final deliverables (excluding any pre-existing tools, frameworks, libraries, templates, AI models/prompts, automation workflows, or other proprietary components used to build or run them) transfers to the client. Access to third-party or subscription-based tools, platforms, or licenses used in delivering the service remains subject to those third parties' own terms and does not transfer to the client. ${siteConfig.companyName} retains the right to showcase completed work, campaigns, and results (excluding confidential or sensitive data) in its portfolio, case studies, and marketing materials, unless the client requests confidentiality in writing.`,
    ],
  },
  {
    title: "7. Confidentiality & Data Handling",
    body: [
      "Both parties agree to keep confidential any proprietary business information, credentials, customer data, or other data shared during the course of a project or campaign, and to use it solely for the purpose of delivering the agreed services. Where our services involve access to customer or lead data (e.g., via CRM, WhatsApp, email/SMS marketing, or chatbot tools), we will handle such data in accordance with applicable data protection laws and use it only for the agreed purpose.",
    ],
  },
  {
    title: "8. Limitation of Liability",
    body: [
      `${siteConfig.companyName} will make every reasonable effort to deliver quality work and campaigns on time. However, we are not liable for indirect, incidental, or consequential damages arising from the use of our services, including but not limited to loss of revenue, data, business opportunities, ad account suspension or restriction by a third-party platform, or outcomes of AI-generated or automated interactions, except where such liability cannot be excluded under applicable law.`,
    ],
  },
  {
    title: "9. Third-Party Services & Platforms",
    body: [
      `Projects and campaigns may involve third-party tools, platforms, hosting providers, advertising networks, marketplaces, CRMs, messaging providers (e.g., WhatsApp Business API), or APIs, including AI/LLM providers. ${siteConfig.companyName} is not responsible for outages, pricing changes, policy changes, account suspensions, or service discontinuation by such third parties, though we will assist in finding reasonable workarounds where possible.`,
    ],
  },
  {
    title: "10. Termination",
    body: [
      "Either party may terminate an ongoing project, campaign, or retainer with written notice, as outlined in the specific project agreement. In the event of termination, the client is responsible for payment for all work completed, and any ad spend or third-party costs incurred, up to the termination date.",
    ],
  },
  {
    title: "11. Governing Law",
    body: [
      "These Terms are governed by the laws of India, and any disputes arising out of or in connection with them will be subject to the exclusive jurisdiction of the courts in Nashik, Maharashtra.",
    ],
  },
  {
    title: "12. Changes to These Terms",
    body: [
      'We may update these Terms and Conditions from time to time to reflect changes in our services or legal requirements. The updated version will be posted on this page with a revised "Last updated" date. Continued use of our website or services after changes are posted constitutes acceptance of the revised terms.',
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <div className="terms">
      <div className="container terms__wrap">
        <h1 className="terms__title">
          Terms and <span className="terms__title-accent">Conditions</span>
        </h1>
        <p className="terms__updated">Last updated: September 12, 2026</p>

        <p className="terms__intro">
          These Terms and Conditions govern your use of {siteConfig.companyName}'s
          website and services. By accessing our website or engaging{" "}
          {siteConfig.companyName} for any project, campaign, or service, you
          agree to the terms set out below. Please read them carefully.
        </p>

        {sections.map((section) => (
          <section key={section.title} className="terms__section">
            <h2 className="terms__section-title">{section.title}</h2>

            {section.body?.map((para, i) => (
              <p key={i} className="terms__text">
                {para}
              </p>
            ))}

            {section.list && (
              <ul className="terms__list">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="terms__section">
          <h2 className="terms__section-title">13. Contact Us</h2>
          <p className="terms__text">
            If you have any questions about these Terms and Conditions, reach
            out to us:
          </p>

          <ul className="terms__contact">
            <li>
              <Mail size={16} />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            {siteConfig.phone && (
              <li>
                <Phone size={16} />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                  {siteConfig.phone}
                </a>
              </li>
            )}
            <li>
              <MapPin size={16} />
              <span>
                {siteConfig.address.line1}, {siteConfig.address.line2}
              </span>
            </li>
            <li className="terms__gst">GSTIN: {siteConfig.gstNumber}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}