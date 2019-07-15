import { shallowMount } from '@vue/test-utils'
import Authorization from '@/components/ActionButtons/Authorization.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { Tooltip } from 'element-ui'

describe('Action Button Authorization.vue', () => {
  it('toggle click', () => {
    const wrapper = shallowMount(Authorization, {
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
