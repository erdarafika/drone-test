export default {
  route: {
    dashboard: 'Dasbor',
    addressType: 'Tipe Alamat',
    businessLine: 'Jalur Bisnis',
    document: 'Dokumen',
    master: 'Pengaturan Master',
    permission: 'Permission',
    holiday: 'Hari Libur',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directive Permission',
    role: 'Jabatan',
    page401: '401',
    page404: '404',
    documentMatrix: 'Matriks Dokumen',
    location: 'Lokasi',
    tolerance: 'Toleransi',
    emailConfig: 'Pengaturan Email',
    feeType: 'Tipe Biaya',
    productType: 'Tipe Produk',
    bank: 'Bank',
    unitPrice: 'Harga Unit',
    investmentType: 'Tipe Investasi',
    dplkBank: 'Bank DPLK',
    benefitType: 'Tipe Manfaat',
    subBenefit: 'Sub Tipe Manfaat',
    subBenefitDocument: 'Dokumen Sub Manfaat',
    virtualAccount: 'Rekening Virtual',
    bca: 'BCA',
    cimb: 'CIMB',
    withdrawalRule: 'Aturan Manfaat',
    fundAdministration: 'Administrasi Dana',
    dplkConfiguration: 'DPLK Konfigurasi',
    dplkInformation: 'DPLK Informasi',
    dplkAddress: 'DPLK Alamat',
    dplkBankAccount: 'DPLK Bank Akun',
    dplkStaff: 'DPLK Staff',
    position: 'Jabatan'
  },
  // GLOBAL
  validatorMessage: {
    isRequired: 'wajib diisi',
    isNumber: 'harus berupa angka'
  },
  navbar: {
    logOut: 'Keluar',
    dashboard: 'Dasbor',
    github: 'Github',
    theme: 'Tema',
    size: 'Ukuran Huruf',
    sizes: {
      default: 'standar',
      medium: 'sedang',
      small: 'kecil',
      mini: 'sangat kecil'
    }
  },
  table: {
    type: 'Tipe',
    save: 'Simpan',
    search: 'Pencarian',
    add: 'Tambah',
    export: 'Export',
    view: 'Lihat',
    status: 'Status',
    detail: 'Detail',
    actions: 'Aksi',
    edit: 'Ubah',
    delete: 'Hapus',
    cancel: 'Batal',
    confirm: 'Konfirmasi',
    successCaption: 'Operasi Berhasil',
    successTitle: 'Berhasil',
    searchPlaceholder: 'Cari Sesuatu',
    createdDate: 'Tanggal dibuat'
  },
  settings: {
    title: 'Pengaturan Tampilan',
    theme: 'Warna Tampilan',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  modal: {
    addModalHeader: 'Tambah Data Baru',
    editModalHeader: 'Ubah Data'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Tutup',
    closeOthers: 'Tutup Lainnya',
    closeAll: 'Tutup Semua'
  },
  // SINGLE PAGE
  page404: {
    title: 'OOPS!',
    subTitle: 'Maaf, Halamn Tidak Ditemukan...',
    description: 'Pastikan url yang anda masukan benar, atau tekan tombol dibawah untuk kembali ke halaman utama',
    backToHome: 'Kembali'
  },
  page401: {
    title: 'OOPS!',
    subTitle: 'Maaf, Anda Tidak Bisa Masuk Ke Halaman Ini',
    description: 'Tolong pastikan anda menggunakan akun dengan hak akses yang sesuai',
    backToHome: 'Kembali'
  },
  login: {
    title: 'Selamat Datang',
    logIn: 'Masuk',
    username: 'Username',
    password: 'Sandi',
    any: 'bebas',
    thirdparty: 'Atau masuk dengan',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  addressType: {
    type: 'Nama',
    displayOnMember: 'Tampilkan dipelanggan',
    displayOnCompany: 'Tampilkan diperusahaan',
    active: 'Aktif',
    showActiveOnly: 'Tampilkan yang aktif'
  },
  businessLine: {
    name: 'Nama Jalur Bisnis',
    code: 'Kode Jalur Bisnis'
  },
  document: {
    name: 'Nama Dokumen',
    code: 'Kode Dokumen',
    rejectionReason: 'Alasan Penolakan',
    reason: 'Alasan',
    description: 'Keterangan'
  },
  holiday: {
    date: 'Tanggal Libur',
    description: 'Deskripsi'
  },
  location: {
    country: 'Negara',
    province: 'Provinsi',
    city: 'Kota',
    name: 'Nama'
  },
  emailConfig: {
    editTemplate: 'Ubah Templat',
    template: 'Templat',
    attachments: 'Lampiran',
    subject: 'Judul',
    selectFile: 'Pilih Berkas',
    name: 'Nama Lampiran'
  },
  feeType: {
    name: 'Nama',
    status: 'Status'
  },
  productType: {
    name: 'Nama',
    code: 'Kode'
  },
  bank: {
    name: 'Nama',
    swiftCode: 'Kode Swift',
    transferCode: 'Kode Transfer',
    branch: 'Cabang',
    branchName: 'Nama',
    branchAddress: 'Alamat',
    branchCountry: 'Negara',
    codeName: 'Kode Nama'
  },
  dplkBank: {
    accountName: 'Nama Pemilik',
    bankName: 'Nama Bank',
    accountNumber: 'Nomor Rekening',
    bankBranch: 'Cabang Bank',
    bankAddress: 'Alamat Bank',
    country: 'Negara'
  },
  benefitType: {
    name: 'Nama',
    type: 'Tipe',
    code: 'Kode',
    documentName: 'Nama Dokumen',
    documentCode: 'Kode Dokumen',
    document: 'Atur Dokumen',
    required: 'Wajib'
  },
  virtualAccount: {
    name: 'Nama',
    dplkBank: 'Bank DPLK',
    accountCode: 'Kode Akun',
    active: 'Aktif',
    inactive: 'Tidak Aktif'
  },
  withdrawalRule: {
    maxPerYear: 'Maksimal Penarikan Pertahun',
    minAmmount: 'Minimal Penarikan Nominal',
    minEffectiveYear: 'Minimal Tahun Kepesertaan',
    normalRetiringAge: 'Usia Pensiun Normal',
    differenceRetiringAge: 'Selisih Usia Pensiun'
  },
  role: {
    roleKey: 'Kode Jabatan',
    roleName: 'Nama Jabatan',
    description: 'Deskripsi',
    menus: 'Izin Halaman'
  },
  documentMatrix: {
    name: 'Nama Dokumen',
    type: 'Tipe Dokumen',
    transactionType: 'Jenis Transaksi'
  },
  investmentType: {
    fundName: 'Nama Dana',
    code: 'Kode',
    status: 'Status',
    effectiveDate: 'Tanggal Efektif',
    lastPrice: 'Harga Terakhir',
    addMultipleFundPrice: 'Tambah Semua Harga Dana',
    description: 'Deskripri',
    pricing: 'Harga',
    price: 'Harga'
  },
  unitPrice: {
    fundName: 'Nama Dana',
    effectiveDate: 'Tanggal Efektif',
    price: 'Harga',
    status: 'Status'
  },
  dplkInformation: {
    name: 'Nama DPLK',
    website: 'Situs',
    email: 'Email',
    telpNumber: 'Nomor Telepon',
    fax: 'Fax'
  },
  dplkAddress: {
    addressType: 'Address Type',
    country: 'Country',
    city: 'City',
    postalCode: 'Postal Code',
    status: 'Status',
    setDefault: 'Atur sebagai Default'
  },
  dplkBankAccount: {
    name: 'Nama Akun',
    number: 'Nomor Akun',
    bank: 'Bank',
    bankAddress: 'Alamat Bank',
    bankBranch: 'Cabang Bank',
    bankCountry: 'Negara'
  },
  dplkStaff: {
    nip: 'NIP',
    name: 'Nama',
    email: 'Email',
    role: 'Jabatan'
  },
  position: {
    code: 'Kode Jabatan',
    name: 'Nama Jabatan',
    description: 'Deskripsi'
  }
}
