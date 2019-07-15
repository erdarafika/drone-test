import { shallowMount } from '@vue/test-utils'
import Delete from '@/components/AppContainer'
import { Row, Col } from 'element-ui'

describe('AppContainer', () => {
  const headerMessage = 'this is default header'
  const leftHeaderMessage = 'this is left header'
  const title = 'address-type'
  const wrapper = shallowMount(Delete, {
    slots: {
      header: headerMessage,
      'header-left': leftHeaderMessage
    },
    mocks: {
      $t: langPath => {
        return langPath === 'route.address-type' ? 'This Is Title' : null
      },
      $route: {
        meta: {
          title
        }
      }
    },
    stubs: {
      'el-row': Row,
      'el-col': Col
    }
  })

  it(`it should render it's default header`, () => {
    expect(wrapper.html()).toContain(headerMessage)
  })
  it(`it should render it's left header`, () => {
    expect(wrapper.html()).toContain(leftHeaderMessage)
  })
  it(`it should render it's Title`, () => {
    expect(wrapper.html()).toContain('This Is Title')
  })
})

