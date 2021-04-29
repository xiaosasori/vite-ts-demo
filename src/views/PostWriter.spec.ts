import { mount } from '@vue/test-utils'
import { basePost } from './mocks'
import PostWriter from './PostWriter.vue'

describe('PostWriter', () => {
  it('composes a post and emits the new data', (done) => {
    const wrapper = mount(PostWriter, {
      props: {
        post: {
          ...basePost
        }
      }
    })

    wrapper.find('[data-test="post-title"]').setValue('New post title')
    wrapper.find<HTMLDivElement>('[data-test="markdown"]').element.innerText = '### Content'
    wrapper.find<HTMLDivElement>('[data-test="markdown"]').trigger('input')
    
    setTimeout(() => {
      wrapper.find('[data-test="submit-post"]').trigger('click')
      
      // @ts-ignore
      const post: Post = wrapper.emitted().save[0][0]
      expect(post.title).toBe('New post title')
      expect(post.markdown).toBe('### Content')
      done()
    }, 550)
  })
})
