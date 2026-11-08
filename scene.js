/* 3D scatter plot of three clusters (three.js). Safe to remove: the page works without it. */
(function () {
  "use strict";
  var canvas = document.getElementById("scene");
  if (!canvas || typeof THREE === "undefined") return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches, renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true }); } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  /* everything we draw sits inside a sphere of this radius (the rings are the widest part) */
  var RADIUS = 6.5;
  function fitCamera() {
    var vf = camera.fov * Math.PI / 180;
    var hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
    var d = RADIUS / Math.sin(Math.min(vf, hf) / 2);
    camera.position.set(0, d * 0.2, d * 0.98);
    camera.lookAt(0, 0, 0);
  }
  fitCamera();

  var seed = 7;
  function rnd() { seed = seed * 16807 % 2147483647; return seed / 2147483647; }
  function gauss() { return (rnd() + rnd() + rnd() - 1.5) * 1.3; }

  var centers = [[-2.6, 0.8, 0], [2.4, 1.4, -1.2], [0.2, -1.9, 2.1]];
  var colors = [0xA855F7, 0xE879F9, 0x38BDF8], perCluster = 80;
  var group = new THREE.Group();
  var dots = new THREE.InstancedMesh(new THREE.SphereGeometry(0.14, 12, 12), new THREE.MeshBasicMaterial(), perCluster * 3);
  var m = new THREE.Matrix4(), col = new THREE.Color(), k = 0;

  centers.forEach(function (c, ci) {
    for (var i = 0; i < perCluster; i++) {
      m.setPosition(c[0] + gauss(), c[1] + gauss(), c[2] + gauss());
      dots.setMatrixAt(k, m);
      dots.setColorAt(k, col.setHex(colors[ci]));
      k++;
    }
    var centroid = new THREE.Mesh(new THREE.OctahedronGeometry(0.36), new THREE.MeshBasicMaterial({ color: colors[ci], wireframe: true }));
    centroid.position.set(c[0], c[1], c[2]);
    group.add(centroid);
  });
  group.add(dots);

  [[1.25, 0], [1.25, 1.1]].forEach(function (r) {
    var ring = new THREE.Mesh(new THREE.TorusGeometry(6, 0.025, 8, 120), new THREE.MeshBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.75 }));
    ring.rotation.x = r[0]; ring.rotation.y = r[1];
    group.add(ring);
  });
  scene.add(group);

  var mx = 0, my = 0, smx = 0, smy = 0, visible = true;
  window.addEventListener("pointermove", function (e) { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });

  function resize() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    fitCamera();
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  function frame(t) {
    t = t / 1000;
    smx += (mx - smx) * 0.05; smy += (my - smy) * 0.05;
    group.rotation.y = t * 0.22 + smx * 1.2;
    group.rotation.x = smy * 0.35;
    renderer.render(scene, camera);
  }
  if (reduce) { frame(2000); return; }
  new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(canvas);
  (function loop(t) { requestAnimationFrame(loop); if (visible) frame(t); })(0);
})();
