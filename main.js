class BananasApp {
  container = document.querySelector('.container');
  main = document.querySelector('main');
  clouds = document.querySelector('.clouds');
  fallBtn = document.querySelector('.fall-button');
  bolts = document.querySelector('.bolts');
  warhol = document.querySelector('.warhol');
  rainAudio;

  constructor(numSkyIcons, numBananas) {
    this.numSkyIcons = numSkyIcons;
    this.numBananas = numBananas;

    this.init();
  }

  generateIcon(iconName, iconParent) {
    const randomDir = 180 * Math.round(Math.random());
    const randomSize = 5 + Math.round(Math.random() * 5);
    const randomOp = 1 - 0.5 / (randomSize - 3);
    const randomAnimationSec = 4 + Math.round(Math.random() * 6);
    const positionX = Math.round(iconParent.getBoundingClientRect().width * Math.random());
    const positionY = Math.round(iconParent.getBoundingClientRect().height * Math.random());
    const animationType = Math.round(Math.random()) + 1;
    const html = `
    <i class="fas fa-${iconName} fa-${randomSize}x" style="position:absolute; transform:rotateY(${randomDir}deg); opacity:${randomOp}; left:${positionX}px; top:${positionY}px; animation: iconMove${animationType} ${randomAnimationSec}s alternate infinite ease-in-out;"></i>
    `;
    iconParent.insertAdjacentHTML('beforeend', html);
  }

  toggleDarkMain(sec) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.main.classList.toggle('active'));
      }, sec * 1000);
    });
  }
  
  toggleBolts(sec) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.bolts.classList.toggle('hidden'));
      }, sec * 1000);
    });
  }

  generateBanana() {
    const randomSec = Math.random() * 5;
    const randomDuration = 3 + Math.round(Math.random() * 4);
    console.log(randomDuration)
    const banana = document.createElement('div');
    banana.classList.add('banana');
    banana.style.left = '' + Math.round(this.main.getBoundingClientRect().width * Math.random() - 100) + 'px';
    this.main.append(banana);
    setTimeout(() => {
      const rotationStyle = Math.round(Math.random()) + 1;
      banana.style.animation = `bananaFall${rotationStyle}`;
      banana.style.animationDuration = randomDuration + 's';
      banana.style.animationTimingFunction = 'linear';
    }, randomSec * 1000);
    banana.addEventListener('animationend', () => {
      this.main.removeChild(banana);
    });
  }

  async present() {
    this.fallBtn.style.opacity = '0';
    this.fallBtn.style.cursor = 'none';
    this.container.style.top = '-100vh';
    await this.toggleDarkMain(2.4);
    await this.toggleBolts(0.7);
    await this.toggleBolts(0.3);
    await this.toggleBolts(0.7);
    await this.toggleBolts(0.4);
    await this.toggleDarkMain(0.5);
    this.rainAudio = new Audio('./rain.mp3');
    this.warhol.classList.remove('hidden');
    for(let i = 0; i < this.numBananas; i++) {
      this.generateBanana();
    }
    // this.rainAudio.play();
  }

  init() {
    // create icons (clouds for example) to fill up the sky
    for (let i = 0; i < this.numSkyIcons; i++) this.generateIcon('cloud', this.clouds);
    // add click event listener
    this.fallBtn.addEventListener('click', this.present.bind(this));
  }
}

const bananasApp = new BananasApp(30, 130);
