export type bannerType = {
  title: string;
  color: string;
  description: string;
  expiration?: string; // Optional expiration date
  v3: boolean;
  v4: boolean;
};

type bannerResponseContentType = {
  color: string;
  desc: string;
  expiration?: string; // Optional expiration date
  v3: boolean;
  v4: boolean;
};

type BannerResponseType = {
  [key: string]: bannerResponseContentType;
};

export default async function getBanner() {
  const raw_data = await fetch(
    "https://banners-alerts.pages.dev/banner.json"
  );
  const data: BannerResponseType = await raw_data.json();

  const banners: bannerType[] = Object.entries(data).map(
    ([key, value]) => ({
      title: key, // Use the key as the title
      color: value.color, // Map color directly
      description: value.desc, // Map 'desc' to 'description'
      expiration: value.expiration, // Map optional expiration if it exists
      v3: value.v3, // Map v3 if it exists
      v4: value.v4, // Map v4 if it exists
    })
  );

  // Filter banners to ensure v3 is true and not expired
  const currentDate = new Date(); // Get current date
  const filteredBanners = banners.filter(banner => {
    const isV3Available = banner.v3 === true; // Ensure v3 is true
    const isNotExpired = !banner.expiration || new Date(banner.expiration) > currentDate; // Check expiration
    return isV3Available && isNotExpired; // Return true if both conditions are met
  });

  console.log(filteredBanners);
  return filteredBanners; // Return the filtered banners
}
