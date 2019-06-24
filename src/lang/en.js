export default {
  route: {
    dashboard: 'Dashboard',
    addressType: 'Address Type',
    businessLine: 'Business Line',
    holiday: 'Holiday',
    document: 'Document',
    master: 'Master Setup',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    role: 'Role',
    directivePermission: 'Directive Permission',
    page401: '401',
    page404: '404',
    documentMatrix: 'Document Matrix',
    location: 'Location',
    tolerance: 'Tolerance',
    emailConfig: 'Email Config',
    feeType: 'Fee Type',
    productType: 'Product Type',
    bank: 'Bank',
    unitPrice: 'Unit Price',
    investmentType: 'Investment Type',
    dplkBank: 'DPLK Bank',
    benefitType: 'Benefit Type',
    subBenefit: 'Sub Benefit Type',
    subBenefitDocument: 'Sub Benefit Document',
    virtualAccount: 'Virtual Account',
    bca: 'BCA',
    cimb: 'CIMB',
    withdrawalRule: 'Benefit Rule',
    fundAdministration: 'Fund Administration',
    dplkConfiguration: 'DPLK Configuration',
    dplkInformation: 'DPLK Information',
    dplkAddress: 'DPLK Address',
    dplkBankAccount: 'DPLK Bank Account',
    dplkStaff: 'DPLK Staff',
    position: 'Position',
    department: 'Department',
    moneySource: 'Money Source',
    clientAdministration: 'Client Administration',
    company: 'Company',
    userManagement: 'User Management'
  },
  // GLOBAL
  validatorMessage: {
    isRequired: 'is required',
    isNumber: 'must be number'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    theme: 'Theme',
    size: 'Global Size',
    sizes: {
      default: 'default',
      medium: 'medium',
      small: 'small',
      mini: 'mini'
    }
  },

  table: {
    approve: 'Approve',
    reject: 'Reject',
    type: 'Type',
    save: 'Save',
    search: 'Search',
    add: 'Add',
    view: 'View',
    detail: 'Detail',
    export: 'Export',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    disable: 'Disable',
    cancel: 'Cancel',
    confirm: 'Confirm',
    successCaption: 'Success',
    successTitle: 'Operation Success',
    cancelCaption: 'Cancelled',
    cancelTitle: 'Operation Cancelled',
    searchPlaceholder: 'Find something',
    createdDate: 'Created Date',
    setDefault: 'Set as Default'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  modal: {
    addModalHeader: 'Add New Data',
    editModalHeader: 'Edit Data'
  },
  addressType: {
    type: 'Name',
    displayOnMember: 'Display on Member',
    displayOnCompany: 'Display on Company',
    active: 'Active',
    showActiveOnly: 'Show Active Only'
  },
  // SINGLE PAGE
  page404: {
    title: 'OOPS!',
    subTitle: 'Sorry, Page Not Found...',
    description: 'Please check that the URL you entered is correct, or click the button below to return to the homepage.',
    backToHome: 'Back to Home'
  },
  page401: {
    title: 'OOPS!',
    subTitle: 'Sorry, You Cannot Enter This Page',
    description: 'Please check account you are using, make sure it has right access',
    backToHome: 'Back to Home'
  },
  login: {
    title: 'Welcome',
    logIn: 'Login',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
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
  businessLine: {
    name: 'Business Line Name',
    code: 'Business Line Code'
  },
  document: {
    name: 'Document Name',
    code: 'Document Code',
    rejectionReason: 'Rejection Reason',
    reason: 'Reason',
    description: 'Information'
  },
  holiday: {
    date: 'Holiday Date',
    description: 'Description'
  },
  location: {
    country: 'Country',
    province: 'Province',
    city: 'City',
    name: 'Name'
  },
  emailConfig: {
    editTemplate: 'Edit Template',
    template: 'Template',
    attachments: 'Attachments',
    subject: 'Subject',
    selectFile: 'Select File',
    name: 'Attachment Name'
  },
  feeType: {
    name: 'Name',
    status: 'Status'
  },
  productType: {
    name: 'Name',
    code: 'Code',
    description: 'Description'
  },
  bank: {
    name: 'Name',
    swiftCode: 'Swift Code',
    transferCode: 'Transfer Code',
    branch: 'Branch',
    branchName: 'Name',
    branchAddress: 'Address',
    branchCountry: 'Country',
    codeName: 'Code Name'
  },
  dplkBank: {
    accountName: 'Account Name',
    bankName: 'Bank Name',
    accountNumber: 'Account Number',
    bankBranch: 'Bank Branch',
    bankAddress: 'Bank Address',
    country: 'Country'
  },
  benefitType: {
    name: 'Name',
    type: 'Type',
    code: 'Code',
    documentName: 'Document Name',
    documentCode: 'Document Code',
    document: 'Configure Document',
    required: 'Required'
  },
  virtualAccount: {
    name: 'Name',
    dplkBank: 'DPLK Bank',
    accountCode: 'Account Code',
    active: 'Active',
    inactive: 'Inactive'
  },
  withdrawalRule: {
    maxPerYear: 'Max Withdrawal Frequency per Year',
    minAmmount: 'Minimum Withdrawal Amount',
    minEffectiveYear: 'Minimum Effective Year',
    normalRetiringAge: 'Normal Retiring Age',
    differenceRetiringAge: 'Retiring Age Difference'
  },
  role: {
    roleKey: 'Role Code',
    roleName: 'Role Name',
    description: 'Description',
    menus: 'Page Permissions'
  },
  documentMatrix: {
    name: 'Document Name',
    type: 'Document Type',
    transactionType: 'Transaction Type'
  },
  investmentType: {
    fundName: 'Fund Name',
    code: 'Code',
    status: 'Status',
    effectiveDate: 'Effective Date',
    lastPrice: 'Last Price',
    addMultipleFundPrice: 'Add Multiple Fund Price',
    description: 'Description',
    pricing: 'Pricing',
    price: 'Price',
    unavailableMessage: 'All Status is UNAVAILABLE'
  },
  unitPrice: {
    fundName: 'Fund Name',
    effectiveDate: 'Effective Date',
    price: 'Price',
    status: 'Status'
  },
  dplkInformation: {
    name: 'DPLK Name',
    website: 'Website',
    email: 'Email',
    telpNumber: 'Telephones Number',
    fax: 'Fax'
  },
  dplkAddress: {
    name: 'Name',
    addressType: 'Address Type',
    country: 'Country',
    city: 'City',
    province: 'Province',
    postalCode: 'Postal Code',
    status: 'Status',
    setDefault: 'Set as Default'
  },
  dplkBankAccount: {
    name: 'Account Name',
    number: 'Account Number',
    bank: 'Bank',
    bankAddress: 'Bank Address',
    bankBranch: 'Bank Branch',
    bankCountry: 'Country'
  },
  dplkStaff: {
    nip: 'NIP',
    name: 'Name',
    email: 'Email',
    department: 'Department'
  },
  position: {
    code: 'Position Code',
    name: 'Position Name',
    description: 'Description'
  },
  department: {
    code: 'Code',
    name: 'Name',
    description: 'Description'
  },
  moneySource: {
    code: 'Code',
    name: 'Name'
  },
  companyInformation: {
    name: 'Name',
    code: 'Code',
    email: 'Email',
    website: 'Website',
    businessLine: 'Business Line',
    companyType: 'Company Type',
    npwp: 'TAX ID (NPWP)',
    deedEstablishmentNumber: 'Number of Deed of Establishment',
    articleAssociationNumber: 'Number of Article of Assosiation',
    latestAmendmentArticleAssociationNumber: 'Number of the Latest Amendment of Article of Assosiation',
    companyNumberRegistrationNumber: 'Number of the Company Number of Registration Certificate',
    domicilieCertificateNumber: 'Number of Domicilie Certificate',
    domicilieCertificateNumberExpiredDate: 'Domicilie Certificate Date',
    deedEstablishmentDate: `Deed of Establishment Date`,
    articleAssociationDate: `Article of Assosiation Date`,
    latestAmendmentArticleAssociationDate: `Amendment of Article of Assosiation Date`,
    companyNumberRegistrationExpiredDate: `Company's Number of Registration Certificate Date`,
    asset: `Asset (IDR)`,
    grossIncomePerYear: `Gross Income /Year (IDR)`,
    pensionProgramSubmissionPurpose: `Purpose of Pension Program submission`,
    moneySource: `Source of Fund`,
    office: `Office`,
    office2: `Office 2`,
    fax: `Fax`,
    home: `Home`
  },
  user: {
    staff: 'Staff',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    username: 'Username',
    name: 'Name',
    role: 'Role',
    email: 'Email',
    status: 'Status',
    authorities: 'Authorities',
    menu: 'Menu',
    updateMenu: 'Menu',
    updateRole: 'Role'
  },
  companyAddress: {
    addressType: 'Address Type',
    country: 'Country',
    city: 'City',
    province: 'Province',
    postalCode: 'Postal Code',
    status: 'Status',
    setDefault: 'Set as Default',
    address1: 'Address 1',
    address2: 'Address 2',
    district: 'District'
  },
  companyContactPerson: {
    name: 'Name',
    type: 'Contact Type',
    title: 'Title',
    identityType: 'Identity Type',
    identityNumber: 'Identity Number',
    gender: 'Gender',
    email: 'Email',
    phone: 'Phone',
    defaultContact: 'Default Contact',
    status: 'Status'
  },
  companyBankAccount: {
    bankName: 'Bank',
    accountName: 'Account Name',
    accountNumber: 'Account Number',
    currentBank: 'Default Bank',
    status: 'Status'
  }
}
