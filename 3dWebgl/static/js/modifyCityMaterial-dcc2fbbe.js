import{C as r}from"./three.module-96598850.js";function n(a,o=0){const e=o?a.material[o]:a.material;e.onBeforeCompile=t=>{t.fragmentShader=t.fragmentShader.replace("#include <dithering_fragment>",`
        #include <dithering_fragment>
        //#end#
    `),l(t,a)}}function l(a,o){o.geometry.computeBoundingBox();let{min:e,max:t}=o.geometry.boundingBox,i=t.y-e.y;a.uniforms.uTopColor={value:new r("#aaaeff")},a.uniforms.uHeight={value:i},a.vertexShader=a.vertexShader.replace("#include <common>",`
      #include <common>
      varying vec3 vPosition;
      `),a.vertexShader=a.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      vPosition = position;
  `),a.fragmentShader=a.fragmentShader.replace("#include <common>",`
      #include <common>
      
      uniform vec3 uTopColor;
      uniform float uHeight;
      varying vec3 vPosition;
        `),a.fragmentShader=a.fragmentShader.replace("//#end#",`
      vec4 distGradColor = gl_FragColor;
      // 设置混合的百分比  vPosition.y和x是横向渐变 vPosition.z 是垂直渐变
      // float gradMix = (vPosition.y+uHeight/2.0)/uHeight;
      float gradMix = (vPosition.z+uHeight/1.1)/uHeight+.2;
      // 计算出混合颜色
      vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);
      gl_FragColor = vec4(gradMixColor,1);
        //#end#
      `)}const g=()=>({vertexShader:`
    precision highp float;
    varying vec3 fPosition;
    varying vec2 vUv;

    void main()
    {
      vec4 pos = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * pos;
      fPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      vUv = uv;
    }
  `,fragmentShader:`
    precision highp float;
    uniform float time;
    varying vec3 fPosition;
    varying vec2 vUv;
    uniform float interval;

    void d_color() {
      float dataY = fPosition.y;
      float dataI = interval;
      if (dataY <= -dataI) {
        // 蓝色-蓝绿
        // 0,0,1 -> 0,1,1
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
      } else if (dataY > -dataI && dataY <= 0.0) {
        float g = 1.0 - (-dataY / dataI);
        gl_FragColor = vec4(0.0, g, 1.0, 1.0);
      } else if (dataY > 0.0 && dataY <= dataI) {
        // 蓝绿-绿
        // 0,1,1 -> 0,1,0
        float g = 1.0 - dataY / dataI;
        // 这里改变颜色
        gl_FragColor = vec4(0.0, 1.0, g, 0.9);
      } else if (dataY > dataI && dataY <= 2.0 * dataI) {
        // 绿-浅绿
        // 0,1,0 -> 0.5,1,0
        float r = 0.5 * ((dataY - dataI) / dataI);
         gl_FragColor = vec4(r, 1.0, 0.0, 1.0);
      } else if (dataY > 2.0 * dataI && dataY <= 3.0 * dataI) {
        // 浅绿-黄
        // 0.5,1,0 -> 1,1,0
        float r = 0.5 + ((dataY - 2.0 * dataI) / dataI) * 0.5;
          gl_FragColor = vec4(r, 1.0, 0.0, 1.0);
      } else if (dataY > 3.0 * dataI && dataY <= 4.0 * dataI) {
        // 黄-土黄
        // 1,1,0 -> 1,0.76,0
        float g = 1.0 - ((dataY - 3.0 * dataI) / dataI) * (1.0 - 0.76);
           gl_FragColor = vec4(1.0, g, 0.0, 0.5);
      } else if (dataY > 4.0 * dataI && dataY <= 5.0 * dataI) {
        // 土黄-橙
        // 1,0.76,0 -> 1,0.58,0
        float g = 0.76 - ((dataY -  4.0 * dataI) / dataI) * (0.76 - 0.58);
          gl_FragColor = vec4(1.0, g, 0.0, 1.0);
      } else if (dataY > 5.0 * dataI && dataY <= 6.0 * dataI) {
        // 橙-红
        // 1,0.58,0 -> 1,0,0
        float g = 0.58 - ((dataY - 5.0 * dataI) / dataI) * 0.58;
        gl_FragColor = vec4(1.0, g, 0.0, 1.0);
      } else {
        // 红
        // 1.0,0.0,0.0
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    }

    void main(){
      d_color();
      //  gl_FragColor = vec4(0.0, 1.0, 1.0 - fPosition.y / interval, 0.9);
    }`});export{g as a,n as m};
