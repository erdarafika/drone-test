<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel company-card">
        <el-row class="card-wrapper">
          <el-col :span="12">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="dashboard-company" class-name="card-panel-icon" />
              <div class="card-panel-text">
                {{ $t('dashboard.totalCompany') }}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-panel-description">
              <count-to :start-val="0" :end-val="totalActiveMember" :duration="2600" class="card-panel-num" />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel member-card">
        <el-row class="card-wrapper">
          <el-col :span="12">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="dashboard-member" class-name="card-panel-icon" />
              <div class="card-panel-text">
                {{ $t('dashboard.totalMember') }}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-panel-description">
              <count-to :start-val="0" :end-val="totalActiveMember" :duration="2600" class="card-panel-num" />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel status-card">
        <el-row class="card-wrapper">
          <el-col :span="12">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="dashboard-status" class-name="card-panel-icon" />
              <div class="card-panel-text">
                {{ $t('dashboard.totalStatus') }}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-panel-description">
              <h1 class="card-panel-num">{{ $t('dashboard.active') }}</h1>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { fetchDashboardPanelData } from '@/api/dashboard'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      userStatus: 'active',
      totalActiveCompany: 0,
      totalActiveMember: 0
    }
  },
  computed: {
    dashboardStatus() {
      return this.userStatus.charAt(0).toUpperCase() + this.userStatus.slice(1)
    }
  },
  created() {
    fetchDashboardPanelData().then(res => {
      this.userStatus = res.userStatus
      this.totalActiveCompany = res.totalActiveCompany
      this.totalActiveMember = res.totalActiveMember
    })
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .status-card {
    background: linear-gradient(90deg, #57bfd9 0%, #52b3e5 100%) !important;
  }
  .member-card {
    background: linear-gradient(90deg, #63d8bb 0%, #5cc9cb 100%) !important;
  }
  .company-card {
    background: linear-gradient(90deg, #8bdd8b 0%, #69e4aa 100%) !important;
  }

  .card-wrapper {
    margin: 16px;
    border-bottom: 4px solid #ffffff87;
  }
  .card-panel {
    border-radius: 10px;
    height: 140px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #fff;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    .card-panel-icon-wrapper {
      margin: 14px 0 0 14px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      .card-panel-text {
        line-height: 18px;
        display: block;
        font-weight: bold;
        font-size: 18px;
        margin-top: 12px;
      }
    }
    .card-panel-icon {
      display: block;
      font-size: 48px;
    }
    .card-panel-description {
      font-weight: bold;
      margin: 26px;
      text-align: right;
      .card-panel-num {
        font-size: 45px;
      }
    }
  }
}
</style>
