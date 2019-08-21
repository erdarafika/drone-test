import { requiredValidator, emailValidator, numberValidator, alphabeticValidator, alphanumericLineDotSlashValidator } from '@/global-function/formValidator'

export default {
  name: [requiredValidator, alphabeticValidator],
  code: [],
  email: [requiredValidator, emailValidator],
  website: [],
  businessLineId: [requiredValidator],
  businessEntity: [requiredValidator],
  npwp: [requiredValidator],

  deedEstablishmentNumber: [requiredValidator, alphanumericLineDotSlashValidator],
  articleAssociationNumber: [alphanumericLineDotSlashValidator],
  latestAmendmentArticleAssociationNumber: [alphanumericLineDotSlashValidator],
  companyNumberRegistrationNumber: [alphanumericLineDotSlashValidator],
  domicilieCertificateNumber: [alphanumericLineDotSlashValidator],

  domicilieCertificateNumberExpiredDate: [],
  deedEstablishmentDate: [requiredValidator],
  articleAssociationDate: [],
  latestAmendmentArticleAssociationDate: [],
  companyNumberRegistrationExpiredDate: [],

  asset: [requiredValidator],
  grossIncomePerYear: [requiredValidator],
  pensionProgramSubmissionPurpose: [requiredValidator],
  moneySource: [requiredValidator, alphabeticValidator],

  office: [numberValidator],
  office2: [numberValidator],
  fax: [numberValidator],
  home: [numberValidator],
  postalCode: [numberValidator]
}
