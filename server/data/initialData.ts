import { hashPassword } from '../utils/auth';
import type {
  Project,
  Service,
  PageContent,
  CompanyInfo,
  HomepageContent,
  ContactMessage,
  User,
  SeoSettings,
  WebsiteSettings,
  MediaItem,
} from '~/types';

export function getInitialData() {
  const initialUsers: Array<User & { passwordHash: string }> = [
    {
      id: 'usr_super_admin',
      name: 'المدير العام',
      email: 'admin@me3raj.sa',
      role: 'super_admin',
      active: true,
      passwordHash: hashPassword('Admin@123456'),
      createdAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'usr_editor',
      name: 'محرر المحتوى',
      email: 'editor@me3raj.sa',
      role: 'editor',
      active: true,
      passwordHash: hashPassword('Editor@123456'),
      createdAt: '2026-01-10T00:00:00Z',
    },
  ];

  const initialCompanyInfo: CompanyInfo = {
    nameAr: 'معراج التشييد للمقاولات العامة',
    nameEn: "Me'raj Al-Tashyeed General Contracting Co.",
    tagline: 'نبني بثقة، ونشيّد للمستقبل بأعلى معايير الإتقان والجودة',
    description:
      'شركة معراج التشييد للمقاولات العامة هي إحدى الشركات الوطنية الرائدة في قطاع المقاولات والإنشاءات في المملكة العربية السعودية. نختص في تقديم حلول هندسية وإنشائية متكاملة تشمل المباني السكنية، التجارية، والمشاريع الحكومية والخاصة مع الالتزام الصارم بمعايير كود البناء السعودي.',
    vision:
      'أن نكون الخيار الأول والأكثر موثوقية في قطاع المقاولات والإنشاءات بالمملكة، ونموذجاً يحتذى به في الابتكار والجودة العالية.',
    mission:
      'تقديم خدمات مقاولات متكاملة تلبي تطلعات عملائنا من خلال استخدام أحدث التقنيات الهندسية، وفريق عمل مؤهل، مع الالتزام التام بالجودة والسلامة والجدول الزمني.',
    values: [
      'الجودة والإتقان في أدق التفاصيل',
      'الشفافية والنزاهة في التعامل',
      'الالتزام الصارم بمواعيد التسليم',
      'معايير السلامة المهنية والبيئية',
      'الابتكار والتطوير المستمر',
    ],
    address: 'المملكة العربية السعودية، الرياض، طريق الملك فهد',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    phone: '+966 11 456 7890',
    phoneSecondary: '+966 50 123 4567',
    whatsapp: '+966 50 123 4567',
    email: 'info@me3raj.sa',
    emailSupport: 'support@me3raj.sa',
    workingHours: 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Riyadh,Saudi+Arabia&t=&z=13&ie=UTF8&iwloc=&output=embed',
    crNumber: '1010894562',
    vatNumber: '310458921400003',
    socialLinks: {
      twitter: 'https://x.com/me3raj_sa',
      linkedin: 'https://linkedin.com/company/me3raj',
      instagram: 'https://instagram.com/me3raj_sa',
      whatsapp: 'https://wa.me/966501234567',
    },
  };

  const initialServices: Service[] = [
    {
      id: 'srv_1',
      title: 'المقاولات الإنشائية والمباني',
      slug: 'general-construction',
      icon: 'pi pi-building',
      shortDescription: 'تنفيذ أعمال العظم والخرسانات والهياكل الإنشائية للمشاريع السكنية والتجارية.',
      fullDescription:
        'نقدم خدمات شاملة في المقاولات الإنشائية تشمل أعمال الحفر والردم، صب القواعد والأساسات، الأعمدة والأسقف، والهياكل المعدنية والخرسانية، وفق كود البناء السعودي مع إشراف هندسي مستمر لضمان أعلى متانة وجودة.',
      coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
      features: [
        'تنفيذ الهياكل الخرسانية المسلحة والمعدنية',
        'اختبارات التربة ومطابقة الخرسانات',
        'إشراف هندسي ميداني يومي',
        'ضمانات شاملة على الهيكل الإنشائي',
      ],
      order: 1,
      active: true,
    },
    {
      id: 'srv_2',
      title: 'التشطيبات المعمارية والديكور',
      slug: 'finishing-and-interior',
      icon: 'pi pi-palette',
      shortDescription: 'تشطيبات داخلية وخارجية راقية بأعلى معايير الحرفية والتفاصيل الدقيقة.',
      fullDescription:
        'نحول التصاميم المعمارية إلى واقع ملموس من خلال أعمال اللياسة، الدهانات الفاخرة، تركيب الرخام والبورسلان، الأسقف المستعارة، وأعمال الديكورات الجبسية والخشبية والواجهات الزجاجية والكلادينج.',
      coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      features: [
        'واجهات حديثة بالحجر الطبيعي والكلادينج',
        'أعمال اللياسة والدهانات الحديثة',
        'تركيب أفضل أنواع الأرضيات والرخام',
        'ديكورات داخلية مبتكرة',
      ],
      order: 2,
      active: true,
    },
    {
      id: 'srv_3',
      title: 'الأعمال الكهروميكانيكية (MEP)',
      slug: 'electromechanical',
      icon: 'pi pi-bolt',
      shortDescription: 'تنفيذ شبكات الكهرباء، السباكة، التكييف، وأنظمة مكافحة الحريق بأحدث المواصفات.',
      fullDescription:
        'تنفيذ متكامل لكافة الأنظمة الكهروميكانيكية يشمل التمديدات الكهربائية، لوحات التوزيع، شبكات المياه والصرف الصحي، أنظمة التكييف المركزي والمخفي، وأنظمة مكافحة الحريق والإنذار المبكر المعتمدة من الدفاع المدني.',
      coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      features: [
        'تمديد شبكات الجهد المنخفض والمتوسط',
        'أنظمة التكييف والتهوية المركزية',
        'شبكات المياه وحلول الصرف الصحي الذكية',
        'أنظمة الأمن والسلامة ومكافحة الحريق',
      ],
      order: 3,
      active: true,
    },
    {
      id: 'srv_4',
      title: 'الترميم وإعادة التأهيل',
      slug: 'renovation-and-restoration',
      icon: 'pi pi-refresh',
      shortDescription: 'تجديد وترميم وتدعيم المباني القائمة وتحديث بنيتها التحتية وتصميمها.',
      fullDescription:
        'خدمات متخصصة في الكشف عن التصدعات، معالجة الخرسانات، تدعيم الأساسات، وتحديث الواجهات والمرافق القديمة لإعادة إحيائها بمظهر عصري وكفاءة طاقة أعلى.',
      coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      features: [
        'معالجة التشققات والتصدعات الخرسانية',
        'تجديد الواجهات الخارجية للمباني',
        'إعادة تخطيط المساحات الداخلية',
        'رفع كفاءة استهلاك الطاقة والعزل',
      ],
      order: 4,
      active: true,
    },
    {
      id: 'srv_5',
      title: 'أعمال البنية التحتية وتطوير المواقع',
      slug: 'infrastructure-and-site',
      icon: 'pi pi-compass',
      shortDescription: 'سفلتة، رصف، شبكات تصريف السيول، وتنسيق الحدائق والمواقع العامة.',
      fullDescription:
        'تنفيذ أعمال تمهيد الأراضي، الطرق والمواقف، تمديد شبكات المياه وشبكات تصريف مياه الأمطار والسيول، وأعمال الإنارة وتطوير المواقع المحيطة بالمشاريع.',
      coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      features: [
        'تسوية وتمهيد المواقع الإنشائية',
        'تنفيذ أعمال الأسفلت والأرصفة والإنترلوك',
        'شبكات تصريف مياه الأمطار والسيول',
        'إنارة الشوارع وتنسيق المسطحات',
      ],
      order: 5,
      active: true,
    },
  ];

  const initialProjects: Project[] = [
    {
      id: 'prj_1',
      title: 'مجمع واحة الأعمال التجاري',
      slug: 'oasis-business-complex',
      category: 'تجاري وإداري',
      client: 'شركة الاستثمار العقاري المتقدمة',
      location: 'الرياض - حي النرجس',
      year: '2025',
      area: '18,500 م²',
      cost: '34,000,000 ر.س',
      duration: '18 شهر',
      description: 'تنفيذ كامل لأعمال الإنشاءات والتشطيبات لمجمع مكتبي وتجاري حديث بمعايير استدامة عالمية.',
      fullDescription:
        'مشروع متكامل يضم برجين تجاريين بارتفاع 6 طوابق ومواقف تحت الأرض، مع واجهات زجاجية مزدوجة عازلة للحرارة وأنظمة تكييف ذكية ذات كفاءة طاقة عالية.',
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      ],
      features: ['واجهات معمارية زجاجية فاخرة', 'مواقف سيارات تتسع لـ 300 مركبة', 'أنظمة BMS ذكية لإدارة المبنى'],
      challenge: 'تنفيذ الحفر العميق في منطقة سكنية مجاورة مع الحفاظ التام على أمان المنشآت المجاورة.',
      solution: 'استخدام تقنية سند الجوانب بالأوتار المسبقة الإجهاد والستائر الخرسانية المسلحة مع مراقبة أجهزة الاستشعار على مدار الساعة.',
      status: 'completed',
      featured: true,
      order: 1,
    },
    {
      id: 'prj_2',
      title: 'كمبوند اليرموك السكني الفاخر',
      slug: 'yarmouk-luxury-compound',
      category: 'سكني فاخر',
      client: 'مجموعة المطورين المتحدة',
      location: 'الرياض - حي اليرموك',
      year: '2025',
      area: '24,000 م²',
      cost: '48,000,000 ر.س',
      duration: '22 شهر',
      description: 'بناء 36 فيلا سكنية فاخرة بتصميم معماري يجمع بين الأصالة النجدية والحداثة.',
      fullDescription:
        'مشروع سكني مغلق متكامل الخدمات يضم فلل سكنية مستقلة، نادٍ صحي، مسطحات خضراء، ومرافق ترفيهية متكاملة وفق كود وادي حنيفة المعماري.',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ],
      features: ['أنظمة المنازل الذكية الكاملة', 'تشطيبات رخامية إيطالية', 'مسطحات خضراء وبحيرات صناعية'],
      status: 'completed',
      featured: true,
      order: 2,
    },
    {
      id: 'prj_3',
      title: 'مستودعات اللوجستيات الحديثة',
      slug: 'modern-logistics-warehouses',
      category: 'صناعي ولوجستي',
      client: 'شركة الإمداد السريع اللوجستية',
      location: 'الرياض - المدينة الصناعية الثانية',
      year: '2026',
      area: '32,000 م²',
      cost: '26,000,000 ر.س',
      duration: '12 شهر',
      description: 'إنشاء هناجر ومستودعات مكيفة ومجهزة بنظم تبريد وتخزين متطورة للأدوية والأغذية.',
      fullDescription:
        'مجمع مستودعات متكامل بارتفاعات تخزينية تصل إلى 14 متراً مع أرضيات إيبوكسي عالية التحمل وأنظمة إطفاء حريق أوتوماتيكية معتمدة دولياً.',
      coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      ],
      features: ['أرضيات خرسانية مسلحة بالألياف الفولاذية', 'أنظمة تحكم بدرجات الحرارة والرطوبة', 'مواقف ومناطق مناولة شاحنات واسعة'],
      status: 'in_progress',
      featured: true,
      order: 3,
    },
    {
      id: 'prj_4',
      title: 'برج الأفق الطبي التخصصي',
      slug: 'horizon-medical-tower',
      category: 'طبي وصحي',
      client: 'شركة الرعاية الطبية الشاملة',
      location: 'الرياض - طريق التخصصي',
      year: '2024',
      area: '12,000 م²',
      cost: '29,000,000 ر.س',
      duration: '16 شهر',
      description: 'تشييد مركز طبي متكامل يضم غرف عمليات وعيادات تخصصية بأعلى مواصفات مكافحة العدوى.',
      fullDescription:
        'تنفيذ إنشائي وكهروميكانيكي عالي الدقة بمواصفات وزارة الصحة للمنشآت الطبية، يشمل غازات طبية مركزية وغرف عزل بالضغط السالب.',
      coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      ],
      features: ['شبكات غازات طبية مركزية', 'غرف عمليات بنظام التدفق الرقائقي', 'محطة طاقة احتياطية فائقة'],
      status: 'completed',
      featured: false,
      order: 4,
    },
  ];

  const initialHomepage: HomepageContent = {
    heroBadge: 'ريادة في المقاولات والبناء في المملكة العربية السعودية',
    heroTitle: 'نبني مستقبلاً مستداماً',
    heroHighlight: 'بإتقان هندسي رفيع',
    heroSubtitle:
      'شركة معراج التشييد تقدم حلولاً إنشائية ومعمارية متكاملة ترتقي بالمشاريع السكنية والتجارية والصناعية وفق كود البناء السعودي وأعلى معايير الجودة العالمية.',
    heroCtaText: 'استكشف مشاريعنا',
    heroCtaLink: '/projects',
    heroSecondaryCtaText: 'طلب عرض سعر',
    heroSecondaryCtaLink: '/contact',
    heroBackgroundImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
    aboutBadge: 'من نحن',
    aboutTitle: 'شريكك الهندسي الموثوق لتحويل الرؤى إلى منجزات شامخة',
    aboutDescription:
      'تأسست شركة معراج التشييد للمقاولات العامة ككيان وطني سعودي متخصص في تنفيذ أضخم المشاريع الإنشائية والتطويرية. نجمع بين الكفاءة الهندسية المتقدمة والتنفيذ الاحترافي الملتزم بالجداول الزمنية والميزانيات المحددة.',
    aboutYearsExperience: 15,
    aboutCompletedProjects: 140,
    aboutImage1: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    aboutImage2: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    stats: [
      { id: 'st_1', number: 140, suffix: '+', label: 'مشروع منجز بنجاح', icon: 'pi pi-check-circle' },
      { id: 'st_2', number: 15, suffix: '+', label: 'عاماً من الخبرة المتراكمة', icon: 'pi pi-calendar' },
      { id: 'st_3', number: 450, suffix: '+', label: 'مهندس وفني متخصص', icon: 'pi pi-users' },
      { id: 'st_4', number: 99, suffix: '%', label: 'نسبة رضا عملائنا', icon: 'pi pi-star' },
    ],
    whyUs: [
      {
        id: 'why_1',
        title: 'الالتزام الدقيق بالمواعيد',
        description: 'ندير مشاريعنا بجداول زمنية صارمة ورقابة حثيثة تضمن تسليم العمل في وقته المحدد دون تأخير.',
        icon: 'pi pi-clock',
      },
      {
        id: 'why_2',
        title: 'أعلى معايير الجودة والسلامة',
        description: 'نطبق كود البناء السعودي ومعايير ISO في إدارة الجودة والسلامة المهنية للحفاظ على المنشأة والعاملين.',
        icon: 'pi pi-shield',
      },
      {
        id: 'why_3',
        title: 'كوادر هندسية نخبوية',
        description: 'يضم فريقنا نخبة من الاستشاريين والمهندسين والكوادر الفنية ذوي الكفاءة العالية والتجربة الميدانية.',
        icon: 'pi pi-verified',
      },
      {
        id: 'why_4',
        title: 'عقود واضحة وضمانات معتمدة',
        description: 'نضمن شفافية تامة في التسعير والعقود، مع تقديم ضمانات شاملة على الهياكل والأعمال المنفذة.',
        icon: 'pi pi-file-check',
      },
    ],
    process: [
      { step: 1, title: 'الدراسة والاستشارة', description: 'تحليل المخططات الهندسية، تقييم الموقع، وتحديد المتطلبات الفنية بدقة.' },
      { step: 2, title: 'التخطيط والميزانية', description: 'إعداد الجدول الزمني المفصل وحساب الكميات وتحديد التكلفة الإجمالية بشفافية.' },
      { step: 3, title: 'التنفيذ والإشراف', description: 'بدء الأعمال الإنشائية مع إشراف هندسي يومي وتقارير دورية تطلعك على كل مرحلة.' },
      { step: 4, title: 'التسليم والضمان', description: 'فحص الجودة النهائي، تسليم المشروع متكاملاً، وتقديم شهادات الضمان المعتمدة.' },
    ],
    testimonials: [
      {
        id: 'test_1',
        clientName: 'م. فهد بن عبدالعزيز العتيبي',
        role: 'الرئيس التنفيذي',
        company: 'شركة الاستثمار العقاري المتقدمة',
        content:
          'تعاملنا مع شركة معراج التشييد في مشروع مجمع واحة الأعمال، وكان الالتزام بالمعايير الفنية وسرعة الإنجاز نموذجاً يحتذى به في قطاع المقاولات بالمملكة.',
        rating: 5,
      },
      {
        id: 'test_2',
        clientName: 'أ. سلطان الشمري',
        role: 'مدير المشاريع',
        company: 'مجموعة المطورين المتحدة',
        content:
          'دقة التنفيذ والاهتمام بأدق التفاصيل المعمارية والإنشائية في مشروع الفلل السكنية جعلت معراج التشييد شريكنا الاستراتيجي الدائم في جميع مشاريعنا القادمة.',
        rating: 5,
      },
    ],
    ctaTitle: 'جاهز للبدء في تشييد مشروعك القادم؟',
    ctaSubtitle: 'تواصل مع مستشارينا الهندسيين اليوم للحصول على دراسة فنية وعرض سعر مخصص لمشروعك.',
    ctaButtonText: 'تواصل معنا الآن',
    ctaButtonLink: '/contact',
  };

  const initialPages: PageContent[] = [
    {
      id: 'pg_about',
      slug: 'about',
      title: 'عن شركة معراج التشييد',
      subtitle: 'مسيرة ريادية في قطاع المقاولات والإنشاءات بالمملكة العربية السعودية',
      content: `
        <h3>من نحن</h3>
        <p>شركة معراج التشييد للمقاولات العامة هي شركة سعودية رائدة ومصنفة متخصصة في تنفيذ المشروعات الإنشائية الكبرى، وأعمال التشطيبات المعمارية الراقية، والأعمال الكهروميكانيكية والبنية التحتية.</p>
        <h3>رؤيتنا ورسالتنا</h3>
        <p>نعمل انسجاماً مع مستهدفات رؤية المملكة 2030 لتطوير قطاع التشييد والبناء، من خلال تبني تقنيات البناء الحديثة والإدارة الرقمية للمشاريع.</p>
        <h3>قيمنا المهنية</h3>
        <p>نؤمن بأن الثقة تبنى بالإتقان، لذا نحرص على تطبيق أعلى مواصفات الأمان والجودة والمتانة في كل متر نشيّده.</p>
      `,
      metaTitle: 'عن معراج التشييد | ريادة وجودة في المقاولات العامة',
      metaDescription: 'تعرف على قصة نجاح شركة معراج التشييد للمقاولات، رؤيتنا، رسالتنا، وخبراتنا الميدانية في تشييد كبرى المشاريع بالمملكة.',
      active: true,
      updatedAt: '2026-01-01',
    },
  ];

  const initialMessages: ContactMessage[] = [
    {
      id: 'msg_1',
      name: 'عبدالله السعدون',
      email: 'a.saadoun@example.com',
      phone: '0551234567',
      company: 'مجموعة الرياض التجارية',
      service: 'المقاولات الإنشائية والمباني',
      subject: 'طلب عرض سعر لبناء مجمع تجاري',
      message: 'نود الحصول على استشارة هندسية وعرض سعر لتنفيذ مبنى تجاري على مساحة 4000 متر مربع في شمال الرياض.',
      date: '2026-02-15 10:30',
      status: 'new',
    },
  ];

  const initialMedia: MediaItem[] = [
    {
      id: 'med_1',
      fileId: 'med_1',
      name: 'oasis-complex-main.jpg',
      mimeType: 'image/jpeg',
      size: 450200,
      webViewLink: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
      thumbnailLink: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80',
      downloadUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2026-01-15T09:00:00Z',
    },
    {
      id: 'med_2',
      fileId: 'med_2',
      name: 'construction-site-crane.jpg',
      mimeType: 'image/jpeg',
      size: 620100,
      webViewLink: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593',
      thumbnailLink: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=300&q=80',
      downloadUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2026-01-20T11:00:00Z',
    },
  ];

  const initialSeo: SeoSettings = {
    defaultTitle: 'معراج التشييد للمقاولات العامة | تميز في البناء وجودة في التنفيذ',
    titleTemplate: '%s | معراج التشييد للمقاولات',
    defaultDescription:
      'شركة معراج التشييد للمقاولات العامة بالرياض - تنفيذ متكامل لأعمال البناء والتشطيبات والمباني السكنية والتجارية والبنية التحتية بأعلى معايير الجودة.',
    defaultKeywords: 'مقاولات, تشييد, بناء, الرياض, تشطيبات, مقاول عام, فلل, كود البناء السعودي, معراج التشييد',
    ogImage: '/logo.png',
    twitterCard: 'summary_large_image',
  };

  const initialSettings: WebsiteSettings = {
    siteName: 'معراج التشييد للمقاولات العامة',
    maintenanceMode: false,
    contactEmail: 'info@me3raj.sa',
    notifyOnNewMessage: true,
    sheetsConnected: false,
    driveConnected: false,
  };

  return {
    users: initialUsers,
    company: initialCompanyInfo,
    services: initialServices,
    projects: initialProjects,
    homepage: initialHomepage,
    pages: initialPages,
    messages: initialMessages,
    media: initialMedia,
    seo: initialSeo,
    settings: initialSettings,
  };
}
