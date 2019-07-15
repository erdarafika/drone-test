import { shallowMount } from '@vue/test-utils'
import Back from '@/components/ActionButtons/Back.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { Tooltip } from 'element-ui'

describe('Action Button Back.vue', () => {
  it('toggle click', () => {
    const wrapper = shallowMount(Back, {
      mocks: {
        $t: () => {}
      },
      stubs: {
        'svg-icon': SvgIcon,
        'el-tooltip': Tooltip
      }
    })
    const mockFn = jest.fn()
    wrapper.setProps({ action: mockFn })
    wrapper.find('.backButton').trigger('click')
    expect(mockFn).toBeCalled()
  })
})
