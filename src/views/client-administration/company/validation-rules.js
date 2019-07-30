import { requiredValidator, emailValidator, numberValidator } from '@/global-function/formValidator'

export default {
  name: [requiredValidator],
  code: [],
  email: [requiredValidator, emailValidator],
  website: [requiredValidator],
  businessLineId: [requiredValidator],
  businessEntity: [requiredValidator],
  npwp: [requiredValidator],
  deedEstablishmentNumber: [requiredValidator],
  articleAssociationNumber: [],
  latestAmendmentArticleAssociationNumber: [],
  companyNumberRegistrationNumber: [],
  domicilieCertificateNumber: [],

  domicilieCertificateNumberExpiredDate: [],
  deedEstablishmentDate: [requiredValidator],
  articleAssociationDate: [],
  latestAmendmentArticleAssociationDate: [],
  companyNumberRegistrationExpiredDate: [],

  asset: [requiredValidator],
  grossIncomePerYear: [requiredValidator],
  pensionProgramSubmissionPurpose: [requiredValidator],
  moneySource: [requiredValidator],

  office: [numberValidator],
  office2: [numberValidator],
  fax: [numberValidator],
  home: [numberValidator]
}
