import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Home from './Home.vue'
import {createStore} from './store'

import * as mockData from './mocks'
jest.mock('axios', () => ({
  get: (url: string) => ({
    data: [mockData.thisWeek, mockData.todayPost, mockData.thisMonth]
  })
}))

const createHome = () => {
  return mount(Home, {
    global: {
      provide: {
        store: createStore()
      },
      components: {
        RouterLink: {
          template: '<div />'
        }
      }
    }
  })
}

describe('Timeline', () => {
  it('renders a loader', () => {
    const wrapper = createHome()
    expect(wrapper.find('[data-test="progress"]').exists()).toBe(true)
  })

  it('render 3 time periods', async () => {
    const wrapper = createHome()
    await flushPromises()
    expect(wrapper.findAll('[data-test="period"]')).toHaveLength(3)
  })

  it('updates the period when clicked', async () => {
    const wrapper = createHome()
    await flushPromises()
    const $today = wrapper.findAll('[data-test="period"]')[0]
    expect($today.classes()).toContain('is-active')
    //
    const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
    await $thisWeek.trigger('click')

    expect($today.classes()).not.toContain('is-active')
    expect($thisWeek.classes()).toContain('is-active')
    //
    const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
    await $thisMonth.trigger('click')

    expect($thisWeek.classes()).not.toContain('is-active')
    expect($thisMonth.classes()).toContain('is-active')
  })

  it('renders todays post by default', async () => {
    const wrapper = createHome()
    await flushPromises()
    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(1)
    //
    const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
    await $thisWeek.trigger('click')
    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(2)
    //
    const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
    await $thisMonth.trigger('click')
    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(3)
  })
})
