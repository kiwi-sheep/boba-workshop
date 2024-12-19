class Sheep {
  constructor(size, x, y) {
      this.size = size;
      this.posX = x;
      this.posY = y;
      this.isDragging = false;
      this.dragStartX = 0;
      this.dragStartY = 0;
  }
  
  get getX() {
      return this.posX;
  }
  
  get getY() {
      return this.posY;
  }
  
  isWithinBounds(newX, newY) {
      return (
          newX >= 0 && 
          newX + this.size <= window.innerWidth &&
          newY >= 0 && 
          newY + this.size <= window.innerHeight
      );
  }
  
  move(newX, newY) {
      if (this.isWithinBounds(newX, newY)) {
          this.posX = newX;
          this.posY = newY;
      }
  }
  
  startDrag(mouseX, mouseY) {
      this.isDragging = true;
      this.dragStartX = mouseX - this.posX;
      this.dragStartY = mouseY - this.posY;
  }
  
  endDrag() {
      this.isDragging = false;
  }
  
  render(ctx) {
      ctx.fillStyle = 'blue';
      ctx.fillRect(this.posX, this.posY, this.size, this.size);
  }

  isPointInside(x, y) {
      return (
          x > this.posX && 
          x < this.posX + this.size &&
          y > this.posY && 
          y < this.posY + this.size
      );
  }
}

class SheepManager {
  constructor() {
      this.sheep = [];
  }

        if (square.isDragging) {
  addSheep(size, x, y) {
      const newSheep = new Sheep(size, x, y);
      this.sheep.push(newSheep);
      return newSheep;
  }

  handleMouseDown(mouseX, mouseY) {
      // Check sheep in reverse order so we select the top-most sheep first
      for (let i = this.sheep.length - 1; i >= 0; i--) {
          const sheep = this.sheep[i];
          if (sheep.isPointInside(mouseX, mouseY)) {
              sheep.startDrag(mouseX, mouseY);
              // Move the selected sheep to the end of the array (top of render stack)
              this.sheep.splice(i, 1);
              this.sheep.push(sheep);
              break;
          }
      }
  }

  handleMouseMove(mouseX, mouseY) {
      this.sheep.forEach(sheep => {
          if (sheep.isDragging) {
              const newX = mouseX - sheep.dragStartX;
              const newY = mouseY - sheep.dragStartY;
              sheep.move(newX, newY);
          }
      });
  }

  handleMouseUp() {
      this.sheep.forEach(sheep => sheep.endDrag());
  }

  renderAll(ctx) {
      this.sheep.forEach(sheep => sheep.render(ctx));
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const kiwiElement = document.getElementById('kiwi');
  let width = kiwiElement.offsetWidth;
  let height = kiwiElement.offsetHeight;
  
  // Create sheep manager
  const sheepManager = new SheepManager();
  
  // Add some sample sheep
  sheepManager.addSheep(50, 100, 100);
  sheepManager.addSheep(50, 200, 200);
  sheepManager.addSheep(50, 300, 300);
  
  // Draw function
  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sheepManager.renderAll(ctx);
      requestAnimationFrame(draw);
  }
  
  // Mouse event handlers
  canvas.addEventListener('mousedown', (e) => {
      const mouseX = e.clientX - canvas.offsetLeft;
      const mouseY = e.clientY - canvas.offsetTop;
      sheepManager.handleMouseDown(mouseX, mouseY);
  });
  
  canvas.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX - canvas.offsetLeft;
      const mouseY = e.clientY - canvas.offsetTop;
      sheepManager.handleMouseMove(mouseX, mouseY);
  });
  
  canvas.addEventListener('mouseup', () => {
      sheepManager.handleMouseUp();
  });
  
  // Initialize canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Start animation
  draw();
  
  window.addEventListener('resize', () => {
      width = kiwiElement.offsetWidth;
      height = kiwiElement.offsetHeight;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('Width:', width);
      console.log('Height:', height);
  });
});

