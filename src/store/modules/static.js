const state = {
  contribution: {
    billing: [
      { name: 'Name 1', code: 'Code 1', type: 'Type 1', status: 'active', created_at: new Date() }
    ]
  }
}

const mutations = {
  ADD_CONTRIBUTION_BILLING: (state, record) => {
    state.contribution.billing.push(record)
  }
}

const actions = {
  addContributionBilling({ commit }, record) {
    commit('ADD_CONTRIBUTION_BILLING', record)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
