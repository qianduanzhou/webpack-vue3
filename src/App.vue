<script setup>
import { ref, onMounted } from "vue";
import CreateImgLineFlow from "flow-chart-canvas";
import logoPic from "@/assets/img/logo.png";
let canvas = ref();
let flowCanvas = ref();
onMounted(() => {
  let { clientHeight, clientWidth } = canvas.value;
  let {
    clientHeight: flowClientHeight,
    clientWidth: flowClientWidth
  } = flowCanvas.value;
  canvas.value.width = clientWidth;
  canvas.value.height = clientHeight;
  flowCanvas.value.width = flowClientWidth;
  flowCanvas.value.height = flowClientHeight;
  let ctx = canvas.value.getContext("2d");
  let flowCtx = flowCanvas.value.getContext("2d");
  ctx.clearRect(0, 0, 500, 500);
  flowCtx.clearRect(0, 0, 500, 500);
  let imgData = [
    {
      imgUrl: logoPic,
      textOption: {
        text: "测试1",
        show: true,
        style: {
          fontWeight: "600",
          position: "bottom"
        }
      },
      x: 200,
      y: 200,
      width: 50,
      height: 50
    },
    {
      imgUrl: logoPic,
      textOption: {
        text: "测试2",
        show: true,
        style: {
          fontWeight: "600",
          position: "bottom"
        }
      },
      x: 800,
      y: 200,
      width: 50,
      height: 50
    },
    {
      imgUrl: logoPic,
      textOption: {
        text: "测试3",
        show: true,
        style: {
          fontWeight: "600",
          position: "bottom"
        }
      },
      x: 500,
      y: 600,
      width: 50,
      height: 50
    }
  ];
  let lineData = [
    {
      points: [
        {
          x: 260,
          y: 225
        },
        {
          x: 790,
          y: 225
        }
      ],
      arrowDirection: "right"
    },
    {
      points: [
        {
          x: 225,
          y: 280
        },
        {
          x: 225,
          y: 450
        },
        {
          x: 525,
          y: 450
        },
        {
          x: 525,
          y: 600
        }
      ],
      arrowDirection: "down"
    }
  ];
  let createImgLineFlow = new CreateImgLineFlow({
    lineData,
    imgData,
    canvas: canvas.value,
    flowCanvas: flowCanvas.value,
    ctx,
    flowCtx
  });
  createImgLineFlow.draw();
});
</script>

<template>
  <div class="flowChart">
    <canvas
      id="canvas"
      ref="canvas"
    ></canvas>
    <canvas
      id="flowCanvas"
      ref="flowCanvas"
    ></canvas>
  </div>
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  font-size: 16px;
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#flowCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
