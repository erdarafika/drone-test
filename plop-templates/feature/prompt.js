const { notEmpty } = require('../utils.js')
const srcPath = 'test-plop'

module.exports = {
  description: 'generate CCC Feature/Page',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'feature name please',
    validate: notEmpty('name')
  },
  {
    type: 'input',
    name: 'parent',
    message: 'feature parent name please',
    validate: notEmpty('parent')
  },
  // {
  //   type: 'input',
  //   name: 'api',
  //   message: 'api name please',
  //   validate: notEmpty('api')
  // },
  // {
  //   type: 'input',
  //   name: 'api-url',
  //   message: 'api url name please',
  //   validate: notEmpty('api-url')
  // },
  {
    type: 'checkbox',
    name: 'crud',
    message: 'Feature:',
    choices: [{
      name: 'Create',
      value: 'create',
      checked: true
    },
    {
      name: 'Update',
      value: 'update',
      checked: true
    },
    {
      name: 'Delete',
      value: 'delete',
      checked: true
    }
    ]
    // validate(value) {
    //   if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
    //     return 'Components require at least a <script> or <template> tag.'
    //   }
    //   return true
    // }
  }
  ],
  actions: data => {
    const name = '{{properCase name}}'
    const parent = '{{dashCase parent}}'
    // const api = '{{dashCase name}}'
    const actions = [{
      type: 'add',
      path: `${srcPath}/view/${parent}/${name}/index.vue`,
      templateFile: 'plop-templates/feature/index.hbs',
      data: {
        name: name,
        disableUpdateDelete: (!data.crud.includes('update') && !data.crud.includes('delete')),
        disableCreateUpdate: (!data.crud.includes('create') && !data.crud.includes('update')),
        create: data.crud.includes('create'),
        update: data.crud.includes('update'),
        delete: data.crud.includes('delete')
      }
    }]

    return actions
  }
}
