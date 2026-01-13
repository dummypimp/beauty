import { Contact, ContactStatus } from "../types";

// Static curated list from user requirements
const CURATED_CONTACTS = [
  // Local Makeup Artists & Parlours
  {
    name: "Monsoon Salon PRO",
    role: "Makeup & bridal services",
    phone: "+91 99806 95894",
    location: "Indiranagar, Bangalore",
    instagram: "@monsoonsalonpro",
    bio: "Expert bridal services and premium salon treatments."
  },
  {
    name: "Nudira Salon International",
    role: "Bridal & engagement makeup",
    phone: "+91 96062 32179",
    location: "Indiranagar",
    instagram: "@nudira_makeup_studio",
    bio: "International standard makeup studio for brides."
  },
  {
    name: "Makeover by Pooja Gowda",
    role: "Bridal & event makeup",
    phone: "+91 90350 38355",
    location: "Koramangala / Bangalore",
    instagram: "@makeoverbypoojagowda",
    bio: "Signature bridal looks and event styling."
  },
  {
    name: "Rogis Bridal Beauty Studio",
    role: "Makeup & bridal services",
    phone: "+91 73836 72291",
    location: "KR Puram, Bangalore",
    instagram: "@rogisbridal",
    bio: "Professional bridal beauty services."
  },
  {
    name: "Sara Banu Beauty Parlour",
    role: "Bridal makeup & grooming",
    phone: "+91 84604 70671",
    location: "Austin Town, Bangalore",
    instagram: "@sarabanumakeover",
    bio: "Academy and parlour for complete grooming."
  },
  {
    name: "Septora Salon & Makeover",
    role: "Bridal & party makeup",
    phone: "+91 74058 38360",
    location: "Kammanahalli",
    instagram: "@septorasalon",
    bio: "Trendy makeovers for parties and weddings."
  },
  {
    name: "Lakshyalatha Makeup Artist",
    role: "Makeup & event services",
    phone: "+91 97252 42087",
    location: "Bangalore",
    instagram: "@lakshyalatha_mua",
    bio: "Freelance artist for all your event needs."
  },
  {
    name: "Nuva Unisex Salon",
    role: "Makeup & hair styling",
    phone: "+91 81281 97972",
    location: "Bangalore",
    instagram: "@nuvasalon",
    bio: "Contemporary styling and makeup artistry."
  },
  {
    name: "Laxshekhar Bridal Makeup",
    role: "Bridal/party makeup",
    phone: "+91 84602 37040",
    location: "Bangalore",
    instagram: "@laxshekhar_mua",
    bio: "Specialized in traditional and modern bridal looks."
  },
  {
    name: "Female Makeup Artist",
    role: "Home/Event Services",
    phone: "+91 99807 40897",
    location: "Indiranagar",
    instagram: "@indiranagar_mua",
    bio: "Convenient doorstep makeup services."
  },
  
  // Influencers (Phone numbers are placeholders/synthetic where not provided in prompt for functionality)
  {
    name: "Gurmehar Kaur",
    role: "Makeup artist & influencer",
    phone: "+91 98765 43210",
    location: "Bangalore",
    instagram: "@blendedbymehar",
    bio: "Creative makeup artistry and tutorials."
  },
  {
    name: "Amitha Lekha",
    role: "Pro MUA & Educator",
    phone: "+91 98450 11223",
    location: "Bangalore",
    instagram: "@makeoversbyamitha_lekha",
    bio: "Professional makeup artist and educator."
  },
  {
    name: "Vinni K",
    role: "Bridal MUA",
    phone: "+91 99000 54321",
    location: "Bangalore",
    instagram: "@dejavumakeupbyvinni",
    bio: "Creating magic for brides across Bangalore."
  },
  {
    name: "Palak Bhandari",
    role: "Fashion & Beauty Creator",
    phone: "+91 98800 67890",
    location: "Bangalore",
    instagram: "@thestylemilaner",
    bio: "Lifestyle, fashion and beauty inspiration."
  },
  {
    name: "Manjula R",
    role: "Beauty Content Creator",
    phone: "+91 97400 33445",
    location: "Bangalore",
    instagram: "@glamup_by_manjula",
    bio: "Glamour and beauty tips for everyday looks."
  },
  {
    name: "Nisha Gaurav",
    role: "Beauty Influencer",
    phone: "+91 96320 98765",
    location: "Bangalore",
    instagram: "@nishagaurav",
    bio: "Major beauty trends and product reviews."
  },
  {
    name: "Shreya Jain",
    role: "Makeup & Beauty Influencer",
    phone: "+91 95910 56789",
    location: "Bangalore",
    instagram: "@shreyajain.mua",
    bio: "Honest reviews and creative makeup looks."
  },
  {
    name: "Namrata Soni",
    role: "Celebrity Makeup Artist",
    phone: "+91 99010 44556",
    location: "Bangalore/Mumbai",
    instagram: "@nams_makeup",
    bio: "Celebrity favorite for stunning makeovers."
  },
  {
    name: "Akanksha Redhu",
    role: "Luxury Beauty & Fashion",
    phone: "+91 98440 33221",
    location: "Bangalore",
    instagram: "@akanksharedhu",
    bio: "Curated luxury lifestyle and beauty content."
  },
  {
    name: "Shraddha Gurjar",
    role: "Makeup & Lifestyle",
    phone: "+91 99860 77889",
    location: "Bangalore",
    instagram: "@shraddhagurjar_",
    bio: "Relatable beauty and lifestyle content."
  },
  {
    name: "Lakshmi Menon",
    role: "Fashion & Beauty Icon",
    phone: "+91 97390 11002",
    location: "Bangalore",
    instagram: "@lakshmi.menon92",
    bio: "High fashion and beauty aesthetics."
  },
  {
    name: "Twinkle",
    role: "Makeup Influencer",
    phone: "+91 96110 22334",
    location: "Bangalore",
    instagram: "@black__n__white__soul",
    bio: "Artistic makeup and soul styling."
  },
  {
    name: "Priti Rao",
    role: "Beauty & Lifestyle",
    phone: "+91 98860 44551",
    location: "Bangalore",
    instagram: "@prilovesha",
    bio: "Love for beauty, travel and life."
  },
  {
    name: "Komal Verma",
    role: "Lifestyle & Beauty",
    phone: "+91 99450 66778",
    location: "Bangalore",
    instagram: "@mummaofthor",
    bio: "Motherhood and beauty combined."
  },
  {
    name: "Nishtha",
    role: "Skincare Influencer",
    phone: "+91 97410 88990",
    location: "Bangalore",
    instagram: "@fly_nishtha",
    bio: "Dedicated to skincare routines and tips."
  },
  {
    name: "Dr. Shuba Dharmana",
    role: "Aesthetic Doctor",
    phone: "+91 98450 99881",
    location: "Bangalore",
    instagram: "@drshuba",
    bio: "Expert aesthetic treatments and advice."
  },
  {
    name: "Anusha Patel",
    role: "Certified MUA",
    phone: "+91 99020 12341",
    location: "Bangalore",
    instagram: "@makeupby_anushapatel",
    bio: "Certified artistry for all occasions."
  },
  {
    name: "Ruchika Malviya",
    role: "Beauty Creator",
    phone: "+91 96860 54329",
    location: "Bangalore",
    instagram: "@damnprettyeyes",
    bio: "It's all about the eyes and beauty."
  },
  {
    name: "Niah Singh",
    role: "Beauty & Lifestyle",
    phone: "+91 97310 65432",
    location: "Bangalore",
    instagram: "@niahsingh",
    bio: "Fresh beauty perspectives."
  }
];

export const fetchInitialContacts = async (): Promise<Contact[]> => {
  // Simulate network delay for "loading" effect even with static data
  await new Promise(resolve => setTimeout(resolve, 800));

  return CURATED_CONTACTS.map((item, index) => ({
    id: `contact-static-${index}`,
    ...item,
    status: ContactStatus.PENDING,
    isVerified: false,
    avatarUrl: `https://picsum.photos/seed/${item.instagram.replace(/[@_.]/g, '')}/100/100`
  }));
};