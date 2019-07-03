import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default class demo {
  constructor(options) {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.w = null
    this.h = null
    this.fov = 60
    this.near = 1
    this.far = 5000
    this.options = options || {}
    // 立方体
    this.cube = null
    this.controls = null
    this.cylinder = null
    this.sphere = null
    this.sphereArray = []
    this.group = []
  }
  createScene() {
    this.w = window.innerWidth
    this.h = window.innerHeight
    this.scene = new THREE.Scene()
    // this.scene.background = new THREE.Color(0xcccccc)
    // this.scene.fog = new THREE.FogExp2(0xcccccc, 0.002)
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.w / this.h,
      this.near,
      this.far
    )
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })
    this.renderer.setSize(this.w, this.h)
    this.camera.position.set(400, -50, 0)
    this.camera.lookAt(this.scene.position)
    document
      .querySelector(this.options.el)
      .appendChild(this.renderer.domElement)
    this.createControls()
    this.createLight()
    window.addEventListener('resize', this.handleReszie.bind(this), false)
  }
  handleReszie() {
    this.h = window.innerHeight
    this.w = window.innerWidth
    this.renderer.setSize(this.w, this.h)
    // 创建相机 纵横比不一致
    this.camera.aspectRatio = this.w / this.h
    this.camera.lookAt(this.scene.position)
    this.camera.updateProjectionMatrix()
    // this.createBackground()
  }
  createBackground() {
    let urls = [
      require('../../assets/images/rainFall/px.jpg'),
      require('../../assets/images/rainFall/nx.jpg'),
      require('../../assets/images/rainFall/py.jpg'),
      require('../../assets/images/rainFall/ny.jpg'),
      require('../../assets/images/rainFall/pz.jpg'),
      require('../../assets/images/rainFall/nz.jpg')
    ]
    let reflectionCube = new THREE.CubeTextureLoader().load(urls)
    this.scene.background = reflectionCube
    console.log(this.scene)
    this.renderer.render(this.scene, this.camera)
  }
  // light
  createLight() {
    var light = new THREE.PointLight(0xffffff)
    light.position.set(400, -50, 0)
    this.scene.add(light)
    var light1 = new THREE.DirectionalLight(0x888888)
    this.scene.add(light1)
    var light2 = new THREE.AmbientLight(0xffffff)
    this.scene.add(light2)
  }
  // 创建 小圆球
  createSphere() {
    let geometry = new THREE.SphereBufferGeometry(8, 8, 8)
    let metarial = new THREE.MeshBasicMaterial({
      envMap: this.scene.background
    })
    this.group = new THREE.Group()

    for (let i = 0; i < 10000; i++) {
      this.sphere = new THREE.Mesh(geometry, metarial)
      this.sphere.position.x = Math.random() * 10000 - 5000
      this.sphere.position.y = Math.random() * 10000 - 5000
      this.sphere.position.z = Math.random() * 10000 - 5000
      this.sphere.scale.x = this.sphere.scale.y = this.sphere.scale.z =
        Math.random() * 3 + 1
      this.sphereArray.push(this.sphere)
      this.sphere.updateMatrix()
      // this.sphere.matrixAutoUpdate = false
      this.group.add(this.sphere)
    }
    this.scene.add(this.group)
  }
  // 创建控制器
  createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // this.controls.target.set(0, 0, 0) // 设置控制器的焦点，使控制器围绕这个焦点进行旋转
    this.controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.25
    this.controls.screenSpacePanning = true
    this.controls.enableZoom = false
    this.controls.enablePan = false
    this.controls.minDistance = 10 // 设置移动的最短距离（默认为零）
    this.controls.maxDistance = 400 // 设置移动的最长距离（默认为无穷）
    this.controls.minPolarAngle = Math.PI / 4
    this.controls.maxPolarAngle = Math.PI / 1.5
    // this.controls.update() // 照相机转动时，必须更新该控制器
  }
  animate() {
    this.sphereArray.forEach(item => {
      item.position.y -= 10
      if (item.position.y < -3000) {
        item.position.y = Math.random() * 10000 - 5000
      }
    })
    requestAnimationFrame(this.animate.bind(this))
    this.controls.update()
    this.render()
  }
  render() {
    this.camera.updateProjectionMatrix()
    this.renderer.render(this.scene, this.camera)
  }
  async init() {
    await this.createScene()
    await this.createBackground()
    await this.createSphere()
    // await this.createCylinder()
    // await this.createCube()
    await this.animate()
  }
}
