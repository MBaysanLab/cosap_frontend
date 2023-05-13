import { useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";
import { loadCanvasMaskPlugin } from "tsparticles-plugin-canvas-mask";
import * as React from "react";
import "../assets/styles/styles.css";

const ParticlesComponent = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
    await loadCanvasMaskPlugin(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
        },
        smooth: true,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
              parallax: {
                enable: false,
                force: 2,
                smooth: 10,
              },
            },
          },
          modes: {
            bubble: {
              distance: 30,
              duration: 2,
              opacity: 8,
              size: 7,
            },
          },
        },
        particles: {
          move: {
            direction: "none",
            distance: 10,
            enable: true,
            outModes: "none",
            speed: 1,
          },
          number: {
            value: 600,
          },
          shape: {
            type: ["circle"],
          },
          size: {
            value: {
              min: 3,
              max: 5,
            },
          },
        },
        canvasMask: {
          enable: true,
          scale: 0.55,
          pixels: {
            filter: "pixelFilter",
          },
          image: {
            src: "https://raw.githubusercontent.com/MBaysanLab/cosap_frontend/develop/src/assets/images/banner.png",
          },
        },
      }}
    />
  );
};

export default ParticlesComponent;
