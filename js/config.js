/* =====================================================================
   config.js — كل بيانات الشركة والأرقام ومعرّفات التتبع في مكان واحد
   عدّل هنا فقط، والصفحة تتحدث تلقائياً (الأرقام، الروابط، الفورم، التتبع).
   ===================================================================== */
window.NIBRAS_CONFIG = {

  company: {
    nameAr: "مؤسسة نبراس للعزل",
    nameEn: "Nibras Insulation",            // ⚠ غير موجود في اللوجو — راجعه قبل النشر
    tagline: "عزل مائي • كشف تسربات المياه", // مأخوذ من اللوجو
    country: "المملكة العربية السعودية"
  },

  // المدن التي تخدمها: اتركها فاضية [] لحد ما تتأكد. لو كتبتها هتظهر في الصفحة والفورم.
  // مثال: cities: ["الدمام", "الخبر"]
  cities: [],

  // العنوان/الفرع: اتركه فاضي لحد ما يتأكد. (لا توجد خريطة في الصفحة)
  address: "",

  // أرقام الهاتف (اكتبها بأي صيغة، الصفحة تحوّلها لصيغة +966 تلقائياً)
  phones: {
    primary: "055 638 7273",   // من اللوجو
    secondary: ""              // اختياري
  },

  website: "",                 // الدومين بعد الربط، مثال: https://example.com

  // حسابات التواصل: اتركها فاضية = تختفي من الصفحة
  social: {
    instagram: "",             // رابط كامل https://instagram.com/...
    x: "",
    tiktok: "",
    snapchat: ""
  },

  // ⚠ الإيميل مخفي لحد ما يتأكد. اكتبه ثم غيّر showEmail إلى true
  email: "",
  showEmail: false,

  // الخدمات (تُستخدم في قائمة الفورم ورسائل الواتساب). راجعها مع العميل.
  services: [
    { id: "roof",  name: "عزل الأسطح" },
    { id: "leak",  name: "كشف تسربات المياه" },
    { id: "bath",  name: "عزل الحمامات والمطابخ" },
    { id: "tank",  name: "عزل الخزانات" },
    { id: "other", name: "أخرى / لست متأكداً" }
  ],

  // نص رسالة الواتساب (الحقول الفاضية تُحذف تلقائياً)
  whatsapp: {
    greeting: "السلام عليكم ورحمة الله 👋",
    greetingSimple: "السلام عليكم، أرغب في الاستفسار عن خدمات العزل وكشف التسربات.",
    source: "(تم الإرسال من صفحة نبراس للعزل)"
  },

  // ===== التتبع: اتركها فاضية = لا يتم تحميل أي كود =====
  tracking: {
    gtm: "",          // مثال: GTM-XXXXXXX
    ga4: "",          // مثال: G-XXXXXXXXXX
    metaPixel: "",    // رقم البكسل
    tiktokPixel: ""   // مثال: CXXXXXXXXXXXXXXXXXXX
  },

  // آراء العملاء: أضف آراء حقيقية فقط بعد موافقة أصحابها: { text: "...", name: "..." }
  testimonials: [],
  showTestimonialSlots: false, // القسم يظهر تلقائياً فقط عند وجود آراء في testimonials

  // المعرض: يظهر تلقائياً فقط عند إضافة صور حقيقية (وإلا يختفي القسم كاملاً).
  // ضع الصورة في assets/projects ثم أضف سطراً هكذا (real:false = تظهر عليها "توضيحي"، real:true = صورة حقيقية لعمل الشركة):
  // { cat: "roof", title: "عزل سطح", src: "assets/projects/roof-01.webp", real: true }
  // التصنيفات: roof / bath / tank / leak
  gallery: [
    { cat: "roof", title: "سطح بعد العزل",           src: "assets/projects/project-roof-01.webp", real: false },
    { cat: "roof", title: "تركيب رولات العزل",        src: "assets/projects/project-roof-02.webp", real: false },
    { cat: "leak", title: "فحص بالتصوير الحراري",     src: "assets/projects/project-leak-01.webp", real: false },
    { cat: "leak", title: "قياس رطوبة السقف",         src: "assets/projects/project-leak-02.webp", real: false },
    { cat: "bath", title: "عزل أرضية حمّام",          src: "assets/projects/project-bath-01.webp", real: false },
    { cat: "bath", title: "عزل زاوية الجدار والأرضية", src: "assets/projects/project-bath-02.webp", real: false },
    { cat: "tank", title: "عزل خزان علوي",            src: "assets/projects/project-tank-02.webp", real: false },
    { cat: "tank", title: "عزل خزان من الداخل",       src: "assets/projects/project-tank-01.webp", real: false }
  ],
  galleryFilters: [
    { id: "all",  name: "الكل" },
    { id: "roof", name: "الأسطح" },
    { id: "bath", name: "الحمامات" },
    { id: "tank", name: "الخزانات" },
    { id: "leak", name: "كشف التسربات" }
  ]
};
