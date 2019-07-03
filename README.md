本文主要介绍使用 three.js 实现 3D 雨落场景
废话不多说，先上图 ([去看效果](http://www.55lover.com/democase?demoid=0))
![场景图.png](https://upload-images.jianshu.io/upload_images/8052888-f1e73e8a9e992f9a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
没做 gif，全是静态的，直接上代码，然后解释一下 几个关键点就行

```
import * as THREE from 'three'
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls'
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
  }
  createBackground() {
    let urls = [`px.jpg`, `nx.jpg`, `py.jpg`, `ny.jpg`, `pz.jpg`, `nz.jpg`]
    let reflectionCube = new THREE.CubeTextureLoader()
      .setPath('/images/app/')
      .load(urls)
    this.scene.background = reflectionCube
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

```

app.vue 页面 引入 并使用

```
import demo from './plugins/app/index.js'
let three = new demo({
  el: '#app'
})
export default {
  name: 'app',
  mounted() {
    three.init()
  }
}
```

下面就解释一下完成雨落的必要 API

```
createBackground() {
    let urls = [`px.jpg`, `nx.jpg`, `py.jpg`, `ny.jpg`, `pz.jpg`, `nz.jpg`]
    let reflectionCube = new THREE.CubeTextureLoader()
      .setPath('/images/app/')
      .load(urls)
    this.scene.background = reflectionCube
    this.renderer.render(this.scene, this.camera)
  }
```

首先创建一个场景，添加一个背景贴图，使用的是 CubeTextureLoader

```
createLight() {
    var light = new THREE.PointLight(0xffffff)
    light.position.set(400, -50, 0)
    this.scene.add(light)
    var light1 = new THREE.DirectionalLight(0x888888)
    this.scene.add(light1)
    var light2 = new THREE.AmbientLight(0xffffff)
    this.scene.add(light2)
  }
```

其次创建灯光效果，建议初学者挨着挨着试，总会有感觉的，我就是这么过来的，不知道是不是蠢

```
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
```

接着是创建 10000 个小圆球模拟雨滴，使用到的 api `SphereBufferGeometry` `MeshBasicMaterial` `Group` `Mesh`
为什么要使用 group API 呢？ 因为你创建 10000 个小圆球，你会去做下落，总会落出可视区域，所以你可以采用移除对象再添加对象，直接操作 group 不用去挨个挨个移除，但是体验不好。后面会讲到。

```
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
```

然后创建一个控制器，这个很帅气。需要用到 OrbitControls 对象，所以需要引入 OrbitControls 这个 js 文件，具体的 API 去看官网嘛

```
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
```

最后，你得循环渲染，所以肯定会用到 requestAnimationFrame，这串代码主要的点是 当然是雨落效果了

```
this.sphereArray.forEach(item => {
      item.position.y -= 10
      if (item.position.y < -3000) {
        item.position.y = Math.random() * 10000 - 5000
      }
 })
```

通过遍历对象数组，给每个元素 Y 轴设定 10 的偏移量 ，当元素到达一定界值得时候 将他的偏移量重新赋值，那么在循环执行 animate 方法，就可以达到非常完美的效果了。

[查看演示](http://www.55lover.com/democase?demoid=0)
[yyn 博客](http://www.55lover.com)

参考文章：[three.js 官网](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene) [three.js 中文文档](<https://techbrood.com/threejs/docs/#%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/%E5%85%A5%E9%97%A8%E4%BB%8B%E7%BB%8D/%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%9C%BA%E6%99%AF(Scene)>)
