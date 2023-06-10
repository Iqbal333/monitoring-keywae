const exportDefault = {
  showSettings: true,
  // Jika Anda hanya ingin menampilkan panel pengaturan sistem di lingkungan pengembangan, tetapi tidak di lingkungan produksi, buka baris kode berikut
  // showSettings: process.env.NODE_ENV === "development",
  sidebarLogo: true,
  fixedHeader: false,
  tagsView: true,
}

export default exportDefault;
