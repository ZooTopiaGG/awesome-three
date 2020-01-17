export default class Parallax {
  constructor(props) {
    this.props = props || {}
    this.mX = 0
    this.mY = 0
    this.X = 0
    this.Y = 0
    this.speed = 0
    this.timer = null
    this.scheduledAnimationFrame = false
  }
  init() {
    console.log(this.props.childrenNode)
    document.addEventListener('mousemove', this.handleMove.bind(this), false)
  }
  handleMove(e) {
    let x = e.clientX // 取得横坐标
    let y = e.clientY // 取得纵坐标
    // this.step(x, y)
    if (this.scheduledAnimationFrame) {
      return
    }
    this.scheduledAnimationFrame = true
    window.requestAnimationFrame(() => {
      console.log(x, y)
      this.scheduledAnimationFrame = false
      this.step(x, y)
    })
    this.X = x
    this.Y = y
  }
  step(x, y) {
    let ch = this.props.childrenNode
    for (let i = 0, len = ch.length; i < len; i++) {
      ch[i].style.cssText = `transform: translate3d(-${(x *
        ch[i].dataset.depth) /
        5}px, -${(y * ch[i].dataset.depth) / 5}px, 0px);`
    }
  }
}
