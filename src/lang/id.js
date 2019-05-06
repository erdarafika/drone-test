export default {
  route: {
    dashboard: 'Dasbor',
    addressType: 'Jenis Alamat',
    businessLine: 'Jalur Bisnis',
    document: 'Dokumen',
    master: 'Pengaturan Master',
    permission: 'Permission',
    holiday: 'Hari Libur',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directive Permission',
    page401: '401',
    page404: '404',
    location: 'Lokasi',
    tolerance: 'Toleransi',
    emailConfig: 'Pengaturan Email',
    feeType: 'Jenis Biaya',
    productType: 'Jenis Produk',
    bank: 'Bank',
    dplkBank: 'Bank DPLK',
    benefitType: 'Jenis Manfaat',
    subBenefit: 'Sub Jenis Manfaat',
    subBenefitDocument: 'Dokumen Sub Manfaat',
    virtualAccount: 'Rekening Virtual',
    bca: 'BCA',
    cimb: 'CIMB',
    withdrawalRule: 'Aturan Penarikan'
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
    reason: 'Alasan'
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
    branchCountry: 'Negara'
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
  }
}
