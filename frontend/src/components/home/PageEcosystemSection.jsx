  import SectionHeading from "../SectionHeading";
  import sweeterjoy from "../../assets/projects/sweeter-joy.png";
  import sweeterJoy1 from "../../assets/projects/sweeter-joy1.png";
  import sweeterJoy2 from "../../assets/projects/sweeter-joy2.png";
  import sweeterJoy3 from "../../assets/projects/sweeter-joy3.png";
  import sweeterJoy4 from "../../assets/projects/sweeter-joy4.png";
  import sweeterJoy5 from "../../assets/projects/sweeter-joy5.png";
  import sweeterJoy6 from "../../assets/projects/sweeter-joy6.png";
  import sweeterJoy7 from "../../assets/projects/sweeter-joy7.png";
  import sweeterJoy8 from "../../assets/projects/sweeter-joy8.png";
  import sweeterJoy9 from "../../assets/projects/sweeter-joy9.png";
  import sweeterJoy10 from "../../assets/projects/sweeter-joy10.png";
  import "../../styles/home/page-ecosystem.css";

  const row1Pages = [
  { tag: "Home Page", image: sweeterjoy, num: "01" },
  { tag: "Products & Catalog", image: sweeterJoy3, num: "02" },
  { tag: "About & Team", image: sweeterJoy1, num: "03" },
  { tag: "Product Highlights", image: sweeterJoy5, num: "04" },
  { tag: "Customer Reviews", image: sweeterJoy6, num: "05" },
  { tag: "FAQ & Help Center", image: sweeterJoy8, num: "06" },
  { tag: "Pricing & Plans", image: sweeterJoy2, num: "07" },
  { tag: "Blog & Insights", image: sweeterJoy4, num: "08" },
  { tag: "Case Studies", image: sweeterJoy7, num: "09" },
  { tag: "Careers", image: sweeterJoy9, num: "10" },
  { tag: "Support Center", image: sweeterJoy10, num: "11" },
  { tag: "Newsletter Signup", image: sweeterjoy, num: "12" },
  { tag: "Live Chat Widget", image: sweeterJoy3, num: "13" },
  { tag: "Order Tracking", image: sweeterJoy1, num: "14" },
  { tag: "Loyalty Program", image: sweeterJoy5, num: "15" },
];

const row2Pages = [
  { tag: "Our Story & Vision", image: sweeterJoy2, num: "16" },
  { tag: "Video & Media", image: sweeterJoy4, num: "17" },
  { tag: "Visual Gallery", image: sweeterJoy7, num: "18" },
  { tag: "Contact & Intake", image: sweeterJoy9, num: "19" },
  { tag: "Footer & Legal", image: sweeterJoy10, num: "20" },
  { tag: "1-Tap Checkout", image: sweeterJoy3, num: "21" },
  { tag: "Reviews & Ratings", image: sweeterJoy6, num: "22" },
  { tag: "Referral Program", image: sweeterJoy8, num: "23" },
  { tag: "Search & Filters", image: sweeterjoy, num: "24" },
  { tag: "Wishlist", image: sweeterJoy1, num: "25" },
  { tag: "Account Dashboard", image: sweeterJoy5, num: "26" },
  { tag: "Notifications Center", image: sweeterJoy2, num: "27" },
  { tag: "Privacy & Security", image: sweeterJoy4, num: "28" },
  { tag: "Multi-language", image: sweeterJoy7, num: "29" },
  { tag: "Analytics Dashboard", image: sweeterJoy9, num: "30" },
];

  function EcosystemCard({ item }) {
    return (
      <div className="pe-card">
        <div className="pe-card__header">
          <span className="pe-card__tag">{item.tag}</span>
          <span className="pe-card__num">{item.num}</span>
        </div>

        <div className="pe-card__viewport">
          <img src={item.image} alt={item.tag} loading="lazy" />
        </div>
      </div>
    );
  }

  export default function PageEcosystemSection() {
    return (
      <section className="section page-ecosystem">
        <div className="container">
          <SectionHeading
            eyebrow="Complete Page Architecture"
            title="15+ Essential pages crafted for business success"
            description="From high-converting landing pages to customer portals and support centers — every screen is designed to build trust and drive conversions."
          />
        </div>

        {/* Row 1 — Forward Marquee */}
        <div className="pe-marquee">
          <div className="pe-marquee__track">
            {[...row1Pages, ...row1Pages].map((item, i) => (
              <EcosystemCard item={item} key={`row1-${i}`} />
            ))}
          </div>
        </div>

        {/* Row 2 — Reverse Marquee */}
        <div className="pe-marquee pe-marquee--reverse">
          <div className="pe-marquee__track pe-marquee__track--reverse">
            {[...row2Pages, ...row2Pages].map((item, i) => (
              <EcosystemCard item={item} key={`row2-${i}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }