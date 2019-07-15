import { shallowMount } from '@vue/test-utils'
import Edit from '@/components/ActionButtons/Edit.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { Tooltip } from 'element-ui'

describe('Action Button Edit.vue', () => {
  it('toggle click', () => {
    const wrapper = shallowMount(Edit, {
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
