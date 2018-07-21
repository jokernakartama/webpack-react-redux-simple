import React from 'react'

const AnyComponent = ({ clickHandler }) => {
  return (
    <div className='parent'>
      <div className='child'>
        <button onClick={ clickHandler }>the button</button>
      </div>
    </div>
  )
}

describe('<AnyComponent />', () => {
  it('should contain child element', () => {
    const wrapper =  enzyme.shallow(<AnyComponent />)
    expect(wrapper.find('.child').exists()).to.be.true
  })
  it('should handle button click', () => {
    const clickSpy = sinon.spy()
    const wrapper = enzyme.mount(<AnyComponent clickHandler={ clickSpy } />)
    wrapper.find('button').simulate('click')
    expect(clickSpy.callCount).to.be.equal(1)
  })
})
