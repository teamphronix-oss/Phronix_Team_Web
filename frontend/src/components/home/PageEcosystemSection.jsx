import "../../styles/home/page-ecosystem.css";

const pageEcosystemItems = [
  { type: "culture", tag: "Culture", title: "Work. Play. Repeat." },
  { type: "team", tag: "Team", title: "A Team That Cares, Builds, and Grows" },
  { type: "faq", tag: "FAQ", title: "Got Questions? We've Got Answers." },
  { type: "contact", tag: "Contact", title: "Let's Talk. We're All Ears." },
];


export default function PageEcosystemSection() {
  return (
    <>
      <section className="section page-ecosystem">
        <div className="container page-ecosystem__intro">
          <span className="eyebrow-badge">Complete Page Ecosystem</span>
          <h2 className="page-ecosystem__title">
            <span className="page-ecosystem__grad">15+ Essential Pages</span><br />
            Crafted for Business Success
          </h2>
          <p>
            From onboarding flows to support policies, every essential page is
            built-in and fully customizable — saving you time, boosting trust,
            and getting you live faster.
          </p>
        </div>

        <div className="page-ecosystem-marquee">
          <div className="page-ecosystem-marquee__track">
            {[...pageEcosystemItems, ...pageEcosystemItems].map((item, i) => (
              <div className="page-ecosystem-card" key={`${item.type}-${i}`}>
                <span className="page-ecosystem-card__tag">{item.tag}</span>

                {item.type === "culture" && (
                  <div className="pe-culture">
                    <div className="pe-culture__grid">
                      <span /><span /><span /><span />
                    </div>
                    <div className="pe-culture__stat">
                      <strong>5,200+</strong>
                      <em>Inside Jokes &amp; Team Moments</em>
                    </div>
                  </div>
                )}

                {item.type === "team" && (
                  <div className="pe-team">
                    <div className="pe-team__avatars">
                      <span /><span /><span /><span /><span />
                    </div>
                  </div>
                )}

                {item.type === "faq" && (
                  <div className="pe-faq">
                    <div className="pe-faq__row pe-faq__row--open">
                      What kind of support is included?
                    </div>
                    <div className="pe-faq__row">Can I switch plans later?</div>
                    <div className="pe-faq__row">Do you offer discounts?</div>
                  </div>
                )}

                {item.type === "contact" && (
                  <div className="pe-contact">
                    <span className="pe-contact__field" />
                    <span className="pe-contact__field" />
                    <span className="pe-contact__field pe-contact__field--tall" />
                    <span className="pe-contact__btn" />
                  </div>
                )}

                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
        <div className="page-ecosystem-marquee page-ecosystem-marquee--reverse">
  <div className="page-ecosystem-marquee__track page-ecosystem-marquee__track--reverse">
    {[...pageEcosystemItems, ...pageEcosystemItems].map((item, i) => (
      <div className="page-ecosystem-card" key={`reverse-${item.type}-${i}`}>
        <span className="page-ecosystem-card__tag">{item.tag}</span>

        {item.type === "culture" && (
          <div className="pe-culture">
            <div className="pe-culture__grid">
              <span /><span /><span /><span />
            </div>

            <div className="pe-culture__stat">
              <strong>5,200+</strong>
              <em>Inside Jokes & Team Moments</em>
            </div>
          </div>
        )}

        {item.type === "team" && (
          <div className="pe-team">
            <div className="pe-team__avatars">
              <span /><span /><span /><span /><span />
            </div>
          </div>
        )}

        {item.type === "faq" && (
          <div className="pe-faq">
            <div className="pe-faq__row pe-faq__row--open">
              What kind of support is included?
            </div>
            <div className="pe-faq__row">
              Can I switch plans later?
            </div>
            <div className="pe-faq__row">
              Do you offer discounts?
            </div>
          </div>
        )}

        {item.type === "contact" && (
          <div className="pe-contact">
            <span className="pe-contact__field" />
            <span className="pe-contact__field" />
            <span className="pe-contact__field pe-contact__field--tall" />
            <span className="pe-contact__btn" />
          </div>
        )}

        <h4>{item.title}</h4>
      </div>
    ))}
  </div>
</div>
      </section>

    </>
  );
}
