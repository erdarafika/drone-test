<template lang="pug">
div
  .filter-container
    el-button.filter-item.add-button(v-if="dialogStatus !== 'detail'" style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
  el-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style='width: 80%')
  el-form-item(:label="$t('membership.certificateNumber')", prop='certificateNumber' )
    el-input(v-model='temp.certificateNumber',  name='certificateNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail')
</template>

<script>
export default {
  name: 'Billing'
}
</script>

