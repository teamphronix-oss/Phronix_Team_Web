import { useEffect, useState } from "react";
import siteConfig from "../data/siteConfig";

// Fetches the current site logo URL from the backend (set via the admin
// panel's "Site Logo" upload). Both Navbar and Footer use this so an admin
// upload updates both places at once, without duplicating the fetch logic.
export default function useSiteLogo() {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    fetch(`${siteConfig.apiBaseUrl}/settings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.logoUrl) setLogoUrl(data.settings.logoUrl);
      })
      .catch((err) => console.error("Failed to load site logo:", err));
  }, []);

  return logoUrl;
}
