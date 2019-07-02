<template>
  <app-container>
    <el-alert title="Informasi" description="Fitur Sementara Sampai Feature" type="info" show-icon style="font-size:16px" />
    <div class="upload-section">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    </div>

    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </app-container>
</template>

<style>
.upload-section {
  background: white;
  padding: 10px;
}
</style>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
