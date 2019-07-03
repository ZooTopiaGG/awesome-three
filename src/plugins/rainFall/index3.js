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
    this.far = 1000
    console.log(options)
    this.options = options || {}
    // 立方体
    this.cube = null
    this.controls = null
    this.cylinder = null
  }
  createScene() {
    this.w = window.innerWidth
    this.h = window.innerHeight
    this.scene = new THREE.Scene()
    // this.scene.background = new THREE.Color(0xcccccc)
    this.scene.fog = new THREE.FogExp2(0xcccccc, 0.002)
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
    this.camera.position.set(400, 200, 0)
    this.camera.lookAt(this.scene.position)
    document
      .querySelector(this.options.el)
      .appendChild(this.renderer.domElement)
    this.createControls()
    this.createLight()
  }
  createBackground() {
    let urls = [`px.jpg`, `nx.jpg`, `py.jpg`, `ny.jpg`, `pz.jpg`, `nz.jpg`]
    console.log(urls)
    let reflectionCube = new THREE.CubeTextureLoader()
      .setPath('/images/rainFall/')
      .load(urls)
    // reflectionCube.format = THREE.RGBFormat
    // let refractionCube = new THREE.CubeTextureLoader().load(urls)
    // refractionCube.mapping = THREE.CubeRefractionMapping
    // refractionCube.format = THREE.RGBFormat
    console.log(reflectionCube)
    this.scene.background = reflectionCube
    console.log(this.scene)
    this.renderer.render(this.scene, this.camera)
  }
  // light
  createLight() {
    var light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1)
    this.scene.add(light)
    var light1 = new THREE.DirectionalLight(0x002288)
    light1.position.set(-1, -1, -1)
    this.scene.add(light1)
    var light2 = new THREE.AmbientLight(0x222222)
    this.scene.add(light2)
  }
  // 创建立方体
  createCube() {
    let geometry = new THREE.BoxGeometry(10, 10, 10)
    let material = new THREE.MeshLambertMaterial({
      color: 0xffff00,
      flatShading: true
    })
    for (var i = 0; i < 500; i++) {
      this.cube = new THREE.Mesh(geometry, material)
      this.scene.add(this.cube)
      this.cube.position.x = Math.random() * 1600 - 800
      this.cube.position.y = 0
      this.cube.position.z = Math.random() * 1600 - 800
      this.cube.updateMatrix()
      this.cube.matrixAutoUpdate = false
      this.cube.castShadow = true
      this.scene.add(this.cube)
    }
  }
  createCylinder() {
    var geometry = new THREE.CylinderBufferGeometry(0, 10, 30, 4, 1)
    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true
    })
    for (var i = 0; i < 500; i++) {
      this.cylinder = new THREE.Mesh(geometry, material)
      this.scene.add(this.cylinder)
      this.cylinder.position.x = Math.random() * 1600 - 800
      this.cylinder.position.y = 0
      this.cylinder.position.z = Math.random() * 1600 - 800
      this.cylinder.updateMatrix()
      this.cylinder.matrixAutoUpdate = false
      this.scene.add(this.cylinder)
    }
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
    // this.controls.minDistance = 10 // 设置移动的最短距离（默认为零）
    // this.controls.maxDistance = 500 // 设置移动的最长距离（默认为无穷）
    this.controls.minPolarAngle = Math.PI / 4
    this.controls.maxPolarAngle = Math.PI / 1.5
    this.controls.update() // 照相机转动时，必须更新该控制器
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this))
    // this.cube.rotation.x += 0.01
    // this.cube.rotation.y += 0.01
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
    // await this.createCylinder()
    await this.createCube()
    await this.animate()
  }
}
