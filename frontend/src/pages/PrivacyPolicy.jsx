import siteConfig from "../data/siteConfig";
import "../styles/privacy-policy.css";

export default function PrivacyPolicy() {
  return (
    <section className="section privacy-policy">
      <div className="container privacy-policy__container">
        <div className="privacy-policy__header">
          <span className="eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="privacy-policy__updated">
            Last updated: September 12, 2026
          </p>
        </div>

        <div className="privacy-policy__content">
          <p>
            At {siteConfig.companyName}, we respect your privacy and are
            committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, share, and protect
            information when you use our website, or engage us for our
            services, which include web and mobile app development, software
            development, AI and automation solutions (including chatbots and
            AI voice agents), CRM and sales automation, WhatsApp/Email/SMS
            marketing automation, SEO, paid advertising, social media
            management, content and branding services, lead generation, and
            related digital marketing services ("Services").
          </p>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">01</span>
            <div>
              <h2>Information We Collect</h2>
              <p>
                We may collect information that you or your business
                voluntarily provide to us, including your name, email address,
                phone number, company details, billing information, and
                information submitted through our contact forms, project
                requests, career applications, and other interactions with{" "}
                {siteConfig.companyName}.
              </p>
              <p>
                Where we deliver marketing, CRM, chatbot, WhatsApp, email/SMS,
                or AI voice agent services on a client's behalf, we may also
                process personal data of the client's own customers or leads
                (such as names, phone numbers, email addresses, and message or
                call content) strictly as needed to provide the agreed
                service. In such cases, the client remains responsible for
                having a lawful basis to share that data with us.
              </p>
              <p>
                We may also automatically collect limited technical
                information when you visit our website, such as your IP
                address, browser type, device information, and pages visited,
                typically through cookies and similar tracking technologies
                (see Section 5 below).
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">02</span>
            <div>
              <h2>Google Sign-In & Google Calendar Access</h2>
              <p>
                If you choose to sign in using Google, we may receive basic
                account information such as your name and email address from
                Google for authentication purposes.
              </p>
              <p>
                If you authorize {siteConfig.companyName} to access your
                Google Calendar, we use the requested permissions only for the
                functionality described to you during authorization. We do
                not sell your Google Calendar data, and we do not use it for
                advertising or any purpose unrelated to that functionality.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">03</span>
            <div>
              <h2>WhatsApp, CRM, Chatbot & AI Voice Agent Data</h2>
              <p>
                Where our Services involve WhatsApp Business automation,
                chatbot integration, AI voice agents, or CRM setup, we process
                messages, call transcripts/recordings, and contact data only
                to build, configure, test, and operate the relevant automation
                or system for the client, and for a limited period to
                troubleshoot or improve it as agreed with the client. We do
                not use this data to train third-party AI models beyond what
                is required for the service, and we do not sell this data.
              </p>
              <p>
                AI-based tools used in our Services may be provided by
                third-party AI/LLM providers. Data passed through these tools
                is subject to our agreements with those providers and, where
                applicable, their own data handling terms; we take reasonable
                steps to select providers with appropriate data protection
                commitments.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">04</span>
            <div>
              <h2>Cookies, Pixels & Advertising Technologies</h2>
              <p>
                Our website, and campaigns we may run on behalf of clients,
                may use cookies, tags, and pixels (such as Google Analytics,
                Google Ads, and Meta/Facebook Pixel) to understand website
                usage, measure campaign performance, and deliver relevant
                advertising. You can control or disable cookies through your
                browser settings; doing so may affect some website
                functionality.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">05</span>
            <div>
              <h2>How We Use Information</h2>
              <p>
                We may use collected information to provide and improve our
                Services, respond to enquiries, prepare proposals, process
                project requests, manage applications, authenticate users,
                run and report on marketing/advertising campaigns, operate
                CRM, chatbot, WhatsApp, email/SMS, and AI voice agent systems,
                communicate with users, send service-related or (with consent
                or as otherwise permitted by law) promotional communications,
                and maintain the security of our Services.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">06</span>
            <div>
              <h2>Data Sharing</h2>
              <p>
                We do not sell your personal information. Information may be
                shared with:
              </p>
              <ul>
                <li>
                  Service providers and sub-processors who help us operate
                  our website and deliver our Services (e.g., hosting
                  providers, CRM platforms, WhatsApp Business API providers,
                  email/SMS platforms, AI/LLM providers, and advertising
                  platforms such as Google and Meta), subject to appropriate
                  safeguards;
                </li>
                <li>
                  Professional advisors (such as accountants or legal
                  counsel) where necessary; and
                </li>
                <li>
                  Authorities, where required by applicable law, regulation,
                  or a valid legal process.
                </li>
              </ul>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">07</span>
            <div>
              <h2>International Data Transfers</h2>
              <p>
                Some of the third-party tools and platforms we use (including
                cloud hosting, CRM, email/SMS, and AI/LLM providers) may store
                or process data outside India. Where this occurs, we take
                reasonable steps to work with providers that maintain
                appropriate security and data protection standards.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">08</span>
            <div>
              <h2>Data Security</h2>
              <p>
                We take reasonable technical and organizational measures to
                protect personal information against unauthorized access,
                alteration, disclosure, or destruction. However, no method of
                transmission or storage is completely secure, and we cannot
                guarantee absolute security.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">09</span>
            <div>
              <h2>Data Retention</h2>
              <p>
                We retain personal information only for as long as reasonably
                necessary for the purposes described in this Privacy Policy,
                for the duration of the relevant client engagement, or as
                required by applicable law, after which it is deleted or
                anonymized. Data processed on behalf of a client while
                delivering CRM, chatbot, WhatsApp, or marketing automation
                services is generally retained in line with the client's
                instructions and our service agreement with them.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">10</span>
            <div>
              <h2>Your Rights & Choices</h2>
              <p>
                Subject to applicable law, you may contact us to request
                access to, correction of, or deletion of the personal data we
                hold about you, to object to certain processing, or to
                withdraw consent where processing is based on consent. If you
                no longer wish to receive marketing or promotional
                communications from us, you can opt out using the unsubscribe
                link provided or by contacting us directly. If your personal
                data was provided to us by one of our clients (for example,
                as their customer or lead), please direct such requests to
                that business in the first instance, as they control that
                data.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">11</span>
            <div>
              <h2>Children's Privacy</h2>
              <p>
                Our website and Services are not directed at children, and we
                do not knowingly collect personal information from children.
                If you believe a child has provided us with personal
                information, please contact us so we can take appropriate
                action.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">12</span>
            <div>
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to
                reflect changes in our Services or legal requirements. Any
                changes will be reflected on this page with an updated
                revision date. Continued use of our website or Services after
                changes are posted constitutes acceptance of the revised
                policy.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section privacy-policy__section--contact">
            <span className="privacy-policy__number">13</span>
            <div>
              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or your
                personal information, or wish to exercise any of your rights,
                you can contact us at:
              </p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              {siteConfig.address && (
                <p className="privacy-policy__address">
                  {siteConfig.address.line1}, {siteConfig.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}