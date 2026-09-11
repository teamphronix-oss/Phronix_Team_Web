import "../styles/privacy-policy.css";

export default function PrivacyPolicy() {
  return (
    <section className="section privacy-policy">
      <div className="container privacy-policy__container">
        <div className="privacy-policy__header">
          <span className="eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="privacy-policy__updated">
            Last updated: September 11, 2026
          </p>
        </div>

        <div className="privacy-policy__content">
          <p>
            At Phronix, we respect your privacy and are committed to protecting
            your personal information. This Privacy Policy explains how we
            collect, use, and protect information when you use our website and
            services.
          </p>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">01</span>
            <div>
              <h2>Information We Collect</h2>
              <p>
                We may collect information that you voluntarily provide to us,
                including your name, email address, phone number, and information
                submitted through our contact forms, project requests, career
                applications, and other interactions with Phronix.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">02</span>
            <div>
              <h2>Google Sign-In</h2>
              <p>
                If you choose to sign in using Google, we may receive basic
                account information such as your name and email address from
                Google for authentication purposes.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">03</span>
            <div>
              <h2>Google Calendar Access</h2>
              <p>
                If you authorize Phronix to access your Google Calendar, we use
                the requested Google Calendar permissions only for the
                functionality described to you during authorization.
              </p>
              <p>
                We do not sell your Google Calendar data. We do not use Google
                Calendar data for advertising or unrelated purposes.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">04</span>
            <div>
              <h2>How We Use Information</h2>
              <p>
                We may use collected information to provide and improve our
                services, respond to enquiries, process project requests,
                manage applications, authenticate users, communicate with
                users, and maintain the security of our services.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">05</span>
            <div>
              <h2>Data Sharing</h2>
              <p>
                We do not sell your personal information. Information may be
                shared with service providers when necessary to operate our
                website and services, subject to appropriate safeguards.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">06</span>
            <div>
              <h2>Data Security</h2>
              <p>
                We take reasonable technical and organizational measures to
                protect personal information against unauthorized access,
                alteration, disclosure, or destruction.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">07</span>
            <div>
              <h2>Data Retention</h2>
              <p>
                We retain information only for as long as reasonably necessary
                for the purposes described in this Privacy Policy or as required
                by applicable law.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">08</span>
            <div>
              <h2>Your Rights</h2>
              <p>
                You may contact us to request information about the personal
                data we hold about you or to request correction or deletion
                where applicable.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section">
            <span className="privacy-policy__number">09</span>
            <div>
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be reflected on this page with an updated revision date.
              </p>
            </div>
          </div>

          <div className="privacy-policy__section privacy-policy__section--contact">
            <span className="privacy-policy__number">10</span>
            <div>
              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or your personal
                information, you can contact us at:
              </p>
              <a href="mailto:teamphronix@gmail.com">
                teamphronix@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}