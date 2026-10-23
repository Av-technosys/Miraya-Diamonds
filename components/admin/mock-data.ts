export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  emailVerified: boolean;
  joinedDate: string;
}

export interface ProductDimensions {
  height: string;
  width: string;
  length: string;
}

export interface AdminProduct {
  id: string;
  sku: string;
  name: string;
  description: string;
  jewelleryType: "ring" | "necklace" | "earring" | "bracelet" | "solitaire" | string;
  diamondGrades: string[];
  goldPurities: string[];
  goldColours: string[];
  sizes: string[];
  grossWeight: string;
  netGoldWeight: string;
  diamondPieces: number;
  totalDiamondWeight: string;
  diamondPrice: string;
  makingCharge: string;
  dimensions: ProductDimensions;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image: string;
  bannerImage?: string;
  mediaUrls?: string[];
  categoryId?: string | null;
}

export interface AdminEnquiry {
  id: string;
  enquiryNumber: string;
  customerName: string;
  email: string;
  phone: string;
  type: "Custom Jewellery" | "Lab-Grown Consultation" | "Product Inquiry" | "Appointment Request";
  subject: string;
  message: string;
  budget?: string;
  date: string;
  status: "Pending" | "In Review" | "Resolved";
  assignedTo?: string;
}

export const mockStats = {
  totalRevenue: "₹48,92,400",
  revenueGrowth: "+18.4%",
  activeUsers: 1420,
  usersGrowth: "+12.2%",
  totalProducts: 184,
  inStockCount: 168,
  lowStockCount: 16,
  pendingEnquiries: 14,
  enquiriesGrowth: "+4 today",
};

export const initialUsers: AdminUser[] = [
  {
    id: "usr_01",
    name: "Aaditya Singhania",
    email: "aaditya.s@singhaniagroup.com",
    phone: "+91 98201 44521",
    address: "Juhu Tara Road, Mumbai, MH",
    emailVerified: true,
    joinedDate: "14 Jan 2026",
  },
  {
    id: "usr_02",
    name: "Dr. Meera Nambiar",
    email: "meera.nambiar@gmail.com",
    phone: "+91 98110 33490",
    address: "Indiranagar, Bengaluru, KA",
    emailVerified: true,
    joinedDate: "03 Feb 2026",
  },
  {
    id: "usr_03",
    name: "Nikhil Kumawat",
    email: "nikhilkumawat002@gmail.com",
    phone: "+91 99280 12044",
    address: "Malviya Nagar, Jaipur, RJ",
    emailVerified: true,
    joinedDate: "01 Jan 2026",
  },
  {
    id: "usr_04",
    name: "Rohan Varma",
    email: "rohan.v@varmajewels.in",
    phone: "+91 98450 78219",
    address: "Bandra West, Mumbai, MH",
    emailVerified: true,
    joinedDate: "18 Feb 2026",
  },
  {
    id: "usr_05",
    name: "Ananya Deshmukh",
    email: "ananya.d@outlook.com",
    phone: "+91 97690 41235",
    address: undefined,
    emailVerified: false,
    joinedDate: "27 Feb 2026",
  },
  {
    id: "usr_06",
    name: "Karan Joharvi",
    email: "karan.j@luxeliving.co",
    phone: "+91 99870 55102",
    address: "South Extension II, New Delhi",
    emailVerified: false,
    joinedDate: "19 Mar 2026",
  },
  {
    id: "usr_07",
    name: "Tanvi Shekhawat",
    email: "tanvi.s@gmail.com",
    phone: "+91 98290 89211",
    address: "Civil Lines, Jaipur, RJ",
    emailVerified: true,
    joinedDate: "02 Apr 2026",
  },
  {
    id: "usr_08",
    name: "Vikramaditya Roy",
    email: "roy.vikram@gmail.com",
    phone: "+91 98300 66782",
    address: undefined,
    emailVerified: false,
    joinedDate: "12 Apr 2026",
  },
];

export const initialProducts: AdminProduct[] = [
  {
    id: "product_001",
    sku: "MIR-001",
    name: "Gold Diamond Ring",
    description: "A rose gold ring with round diamonds.",
    jewelleryType: "ring",
    diamondGrades: ["EF-VVS", "IJ-SI"],
    goldPurities: ["14KT", "18KT"],
    goldColours: ["yellow", "rose", "white"],
    sizes: ["10", "11", "12", "13"],
    grossWeight: "3.10",
    netGoldWeight: "3.00",
    diamondPieces: 12,
    totalDiamondWeight: "0.500",
    diamondPrice: "15000.00",
    makingCharge: "3000.00",
    dimensions: {
      height: "5.20",
      width: "8.00",
      length: "20.00",
    },
    price: 48250,
    stock: 12,
    status: "In Stock",
    image: "/customize/custom1.png",
  },
  {
    id: "product_002",
    sku: "MIR-002",
    name: "Celeste Cushion Halo Diamond Pendant",
    description: "Lab-grown cushion solitaire with sparkling micro-pavé halo setting.",
    jewelleryType: "necklace",
    diamondGrades: ["VVS2-DE", "VVS1-EF"],
    goldPurities: ["18KT"],
    goldColours: ["white", "yellow"],
    sizes: ["16 inch", "18 inch"],
    grossWeight: "4.50",
    netGoldWeight: "4.20",
    diamondPieces: 28,
    totalDiamondWeight: "1.200",
    diamondPrice: "48000.00",
    makingCharge: "6500.00",
    dimensions: {
      height: "14.50",
      width: "12.00",
      length: "450.00",
    },
    price: 89500,
    stock: 5,
    status: "In Stock",
    image: "/customize/custom4.png",
  },
  {
    id: "product_003",
    sku: "MIR-003",
    name: "Elysian Solitaire Tennis Diamond Bracelet",
    description: "Classic continuous row of brilliant round cut natural diamonds.",
    jewelleryType: "bracelet",
    diamondGrades: ["VS1-FG", "VVS2-EF"],
    goldPurities: ["18KT"],
    goldColours: ["yellow", "white", "rose"],
    sizes: ["6.5 inch", "7 inch"],
    grossWeight: "12.80",
    netGoldWeight: "11.90",
    diamondPieces: 54,
    totalDiamondWeight: "3.500",
    diamondPrice: "165000.00",
    makingCharge: "14000.00",
    dimensions: {
      height: "3.20",
      width: "4.10",
      length: "180.00",
    },
    price: 245000,
    stock: 2,
    status: "Low Stock",
    image: "/customize/custom1.png",
  },
  {
    id: "product_004",
    sku: "MIR-004",
    name: "Aura Butterfly Motif Diamond Drop Earrings",
    description: "Delicate feminine butterfly silhouette adorned with pave diamonds.",
    jewelleryType: "earring",
    diamondGrades: ["VVS1-DF", "VS-GH"],
    goldPurities: ["14KT", "18KT"],
    goldColours: ["rose", "yellow"],
    sizes: ["Standard"],
    grossWeight: "5.40",
    netGoldWeight: "5.10",
    diamondPieces: 36,
    totalDiamondWeight: "0.900",
    diamondPrice: "34000.00",
    makingCharge: "4500.00",
    dimensions: {
      height: "22.00",
      width: "11.50",
      length: "14.00",
    },
    price: 64900,
    stock: 8,
    status: "In Stock",
    image: "/customize/custom2.png",
  },
  {
    id: "product_005",
    sku: "MIR-005",
    name: "The Royal Mirage 2.05ct Oval Solitaire Ring",
    description: "Magnificent single oval solitaire set with hidden diamond gallery.",
    jewelleryType: "solitaire",
    diamondGrades: ["IF-D", "VVS1-EF"],
    goldPurities: ["18KT", "950 Platinum"],
    goldColours: ["white", "yellow"],
    sizes: ["11", "12", "13", "14"],
    grossWeight: "6.20",
    netGoldWeight: "5.70",
    diamondPieces: 1,
    totalDiamondWeight: "2.050",
    diamondPrice: "240000.00",
    makingCharge: "18000.00",
    dimensions: {
      height: "8.10",
      width: "9.50",
      length: "24.00",
    },
    price: 310000,
    stock: 1,
    status: "Low Stock",
    image: "/lab-grown/grownbanner.png",
  },
  {
    id: "product_006",
    sku: "MIR-006",
    name: "Seraphina Open Cuff Diamond Bangle",
    description: "Flexible modern cuff with micro-pave diamond terminals.",
    jewelleryType: "bracelet",
    diamondGrades: ["VVS2-EF"],
    goldPurities: ["18KT"],
    goldColours: ["yellow", "rose"],
    sizes: ["2.4", "2.6"],
    grossWeight: "9.80",
    netGoldWeight: "9.30",
    diamondPieces: 42,
    totalDiamondWeight: "1.450",
    diamondPrice: "78000.00",
    makingCharge: "9500.00",
    dimensions: {
      height: "4.50",
      width: "60.00",
      length: "55.00",
    },
    price: 138000,
    stock: 0,
    status: "Out of Stock",
    image: "/customize/custom3.png",
  },
];

export const initialEnquiries: AdminEnquiry[] = [
  {
    id: "enq_01",
    enquiryNumber: "ENQ-2026-084",
    customerName: "Radhika Kirloskar",
    email: "radhika.kirloskar@gmail.com",
    phone: "+91 98201 44521",
    type: "Custom Jewellery",
    subject: "Bespoke 2.5ct Cushion Cut Engagement Ring with Hidden Halo",
    message:
      "Looking for a lab-grown cushion diamond with an 18KT yellow gold band and micro-pavé bridge. Want to schedule a design consultation this Saturday.",
    budget: "₹2,50,000 - ₹3,00,000",
    date: "21 Oct 2026, 09:15 AM",
    status: "Pending",
    assignedTo: "Kavita R.",
  },
  {
    id: "enq_02",
    enquiryNumber: "ENQ-2026-083",
    customerName: "Siddharth Oberoi",
    email: "siddharth.oberoi@oberoihotels.com",
    phone: "+91 99100 88234",
    type: "Lab-Grown Consultation",
    subject: "Certification verification for 3ct Oval Solitaire",
    message:
      "Need IGI certificate details and laser inscription numbers for the solitaire collection before placing the final order for anniversary gifting.",
    budget: "₹4,00,000+",
    date: "20 Oct 2026, 06:40 PM",
    status: "In Review",
    assignedTo: "Rohan V.",
  },
  {
    id: "enq_03",
    enquiryNumber: "ENQ-2026-082",
    customerName: "Pooja Hegde-Patel",
    email: "pooja.patel@modernarch.in",
    phone: "+91 98450 12903",
    type: "Appointment Request",
    subject: "Bridal Jewellery Suite Preview in Bandra Boutique",
    message:
      "Requesting an in-person viewing of bridal chokers and chandelier earrings for our upcoming December wedding.",
    budget: "₹6,00,000+",
    date: "19 Oct 2026, 02:10 PM",
    status: "Pending",
    assignedTo: "Unassigned",
  },
  {
    id: "enq_04",
    enquiryNumber: "ENQ-2026-081",
    customerName: "Amitabh Sen",
    email: "amitabh.sen@senconsulting.com",
    phone: "+91 97112 34509",
    type: "Product Inquiry",
    subject: "Ring sizing customization for SKU MR-84920",
    message:
      "Is size 14 Indian standard immediately available in Rose Gold with express delivery to Delhi NCR?",
    budget: "₹48,250",
    date: "18 Oct 2026, 11:05 AM",
    status: "Resolved",
    assignedTo: "Support Team",
  },
  {
    id: "enq_05",
    enquiryNumber: "ENQ-2026-080",
    customerName: "Dr. Sneha Trivedi",
    email: "sneha.trivedi@fortis.com",
    phone: "+91 98721 99014",
    type: "Custom Jewellery",
    subject: "Heirloom Diamond Remounting into Modern Tennis Bracelet",
    message:
      "I have 24 vintage round diamonds from my grandmother's necklace that I want reset into a contemporary 18KT white gold tennis bracelet.",
    budget: "₹1,20,000",
    date: "17 Oct 2026, 04:22 PM",
    status: "Resolved",
    assignedTo: "Master Karigar Team",
  },
];

