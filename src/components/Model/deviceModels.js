import iphone11 from 'assets/iphone-11.glb';
import macbookPro from 'assets/macbook-pro.glb';
import goldenIphone from 'assets/golden-iphone.glb';

export const ModelAnimationType = {
  SpringUp: 'spring-up',
  LaptopOpen: 'laptop-open',
};

export const deviceModels = {
  phone: {
    url: goldenIphone, // replace old phone completely
    width: 374,
    height: 512,
    // 👇 adjust positioning for this model
    position: { x: 0, y: 0, z: 0 },

    // 👇 rotate to show front instead of back
    rotation: { x: 0, y: Math.PI, z: 0 },

    // 👇 scale up because this model is smaller in unit space
    scale: 1.6,
    animation: ModelAnimationType.SpringUp,
  },

  laptop: {
    url: macbookPro,
    width: 1280,
    height: 800,
    position: { x: 0, y: 0, z: 0 },
    animation: ModelAnimationType.LaptopOpen,
  },
};
