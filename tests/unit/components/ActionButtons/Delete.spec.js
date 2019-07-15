import { shallowMount } from '@vue/test-utils'
import Delete from '@/components/ActionButtons/Delete.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { Tooltip } from 'element-ui'

describe('Action Button Delete.vue', () => {
  it('toggle click', () => {
    const wrapper = shallowMount(Delete, {
      mocks: {
        $t: () => {}
      },
      stubs: {
        'svg-icon': SvgIcon,
        'el-tooltip': Tooltip
      }
    })
    const mockFn = jest.fn()
    wrapper.setProps({ data: 'dummy-payload', action: mockFn })
    wrapper.find('.actionButton').trigger('click')
    expect(mockFn).toBeCalled()
  })
})
