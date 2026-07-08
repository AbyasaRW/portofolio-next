// data/profile.ts
const profile = {
  name: "Abyasa Reksa Wibawadi",
  title: "Frontend Developer",
  location: "Surabaya, Jawa Timur",
  email: "abyasa.reksa.w@gmail.com",
  phone: "085158304429",

  description:
    "Mahasiswa Teknik Informatika di UPN Veteran Jawa Timur yang memiliki minat dalam Frontend Development, UI/UX Design, dan pengembangan aplikasi web. Berpengalaman mengembangkan website menggunakan HTML, PHP, MySQL, dan Next.js serta merancang antarmuka pengguna dengan Figma. Senang mempelajari teknologi baru, menyelesaikan masalah melalui kode, dan membangun aplikasi yang responsif, fungsional, serta memberikan pengalaman pengguna yang baik.",

  summary:
    "Mahasiswa Teknik Informatika UPN Veteran Jawa Timur semester 4 dengan pengalaman magang di dua stasiun televisi (MNCTV dan MUDIPAT TV) dalam bidang produksi konten digital, pengembangan web, dan desain grafis. Bersertifikasi BNSP Desain Komunikasi Visual dan Operator Audio Visual.",

  github: "https://github.com/AbyasaRW",
  linkedin: "https://linkedin.com/in/abyasa-reksa-wibawadi",

  buttons: [
    { type: "cv", label: "Download CV" },
    { type: "github", label: "Github" },
    { type: "linkedin", label: "LinkedIn" },
  ],

  education: [
    {
      school: "Universitas Pembangunan Nasional Veteran Jawa Timur (UPNVJT)",
      period: "2024 - Sekarang",
      detail: "Mahasiswa Teknik Informatika · Semester 4",
    },
    {
      school: "SMK Negeri 10 Surabaya",
      period: "2021 - 2024",
      detail: "Kompetensi Keahlian Multimedia",
    },
  ],

  projects: [
    {
        title: "Sistem Pemesanan Online Pitstop Vape",
        stack: "PHP, MySQL, HTML, CSS",
        description: "Website pemesanan online dan katalog produk vape dengan fitur manajemen produk, pemesanan pelanggan, serta pengelolaan data berbasis MySQL. Antarmuka responsif dan mudah digunakan.",
        link: "https://pitstopvape.netlify.app/",
        image: "/projects/pitstop-vape.png",
    },
    {
        title: "Desain UI Website Top Up MLBB",
        stack: "Figma",
        description: "Prototype UI website top up Mobile Legends dengan fitur pembelian diamond, pilihan nominal, metode pembayaran, dan riwayat transaksi. Alur navigasi intuitif dari pemilihan produk hingga konfirmasi.",
        link: "https://www.figma.com/proto/fRhtF3jEL9VQ5EYerpOSFW/NOIRPEDIA?node-id=92-2961",
        image: "/projects/mlbb-topup.png",
    },
    {
        title: "Nexa Projects — Company Profile & Jasa Web",
        stack: "HTML, CSS, JavaScript",
        description: "Membangun website company profile untuk layanan jasa pembuatan website, dilengkapi halaman portofolio dan informasi layanan.",
        link: "https://nexaprojects.netlify.app/",
        image: "/projects/nexa.png",
    },
    {
        title: "Desain UI Sistem Pemesanan Lapangan Olahraga",
        stack: "Figma",
        description: "Prototype UI aplikasi booking lapangan olahraga, mencakup alur reservasi, pemilihan jadwal, dan halaman konfirmasi.",
        link: "https://www.figma.com/proto/JOpUtmbQg0ZCQw0VHWKBQt/SIBOLANG-JIR",
        image: "/projects/sibolang.png",
    },
    {
        title: "Simulasi Jaringan Arena Esports",
        stack: "GNS3",
        description: "Merancang dan mensimulasikan topologi jaringan arena esports dengan 3 zona dinamis (gaming, streaming, broadcast) dan 1 area pengawasan CCTV.",
        link: null,
        image: null,
    },
],

  experience: [
    {
      role: "MCR Operator · Graphic Designer · Video Editor",
      company: "MNCTV · Surabaya",
      period: "Agustus - November 2023",
      points: [
        "Mengoperasikan Master Control Room (MCR) untuk mengelola siaran langsung secara real-time, mencakup manajemen grafis on-air, komposisi audio, dan aliran video live.",
        "Mendesain elemen grafis siaran seperti lower-third, bumper, dan overlay visual.",
        "Membuat dan mengedit konten visual untuk media sosial resmi MNCTV.",
        "Melakukan video editing untuk konten berita di kanal YouTube MNCTV.",
      ],
    },
    {
      role: "Web Developer · Graphic Designer · Video Editor · Asisten Head Social Media",
      company: "MUDIPAT TV (SD Muhammadiyah 4 Surabaya) · Surabaya",
      period: "Januari - Maret 2023",
      points: [
        "Merancang dan mengembangkan website company profile mudipat.co.",
        "Merencanakan dan mengelola ide konten untuk seluruh platform media sosial resmi MUDIPAT TV.",
        "Mendesain materi visual seperti poster, banner, dan konten promosi.",
        "Memproduksi dan mengedit video konten untuk platform digital resmi sekolah.",
      ],
    },
    {
      role: "Barista & Kasir",
      company: "Gerira Social Cafe · Surabaya",
      period: "November 2025 - Desember 2025",
      points: [
        "Menyajikan minuman berkualitas sesuai standar kafe dan menjaga konsistensi produk.",
        "Memberikan pelayanan pelanggan yang responsif dan menangani transaksi kasir.",
        "Mengoordinasikan kedatangan supplier operasional kafe.",
      ],
    },
    {
      role: "Vaporista, Kasir, & Sosial Media Manajemen",
      company: "Pitstop Vape · Surabaya",
      period: "Desember 2026 - Juli 2026",
      points: [
        "Bertanggung jawab atas pelayanan pelanggan, penjualan produk, dan transaksi kasir harian.",
        "Mengelola stok produk serta memastikan ketersediaan barang.",
        "Mengembangkan dan mengelola konten media sosial untuk brand awareness.",
      ],
    },
  ],

  skills: {
    languages: ["C++", "HTML", "PHP", "SQL", "Next.js"],
    tools: ["VS Code", "Figma", "GNS3", "Laragon", "Microsoft Excel"],
    multimedia: [
      "Desain Grafis",
      "Video Editing",
      "Produksi Konten Digital",
      "MCR Operation",
    ],
    soft: ["Komunikasi", "Teamwork", "Adaptif", "Problem Solving"],
  },

  certifications: [
    { name: "Desain Komunikasi Visual / Desain Grafis", org: "BNSP", year: "2024" },
    { name: "Skema Okupasi Operator Audio Visual", org: "BNSP", year: "2024" },
  ],
};

export default profile;