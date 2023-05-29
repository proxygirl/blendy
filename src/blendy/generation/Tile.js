export class Tile {
    
    constructor(rgb = {r: this.rand(), g: this.rand(), b: this.rand()}, id = null) {
        this.color = {r: rgb.r, g: rgb.g, b: rgb.b};
        this.rgb = `rgb(${rgb.r},${rgb.g},${rgb.b})` 
        this.id = id;
    }
    
    rand() {
        return Math.floor(Math.random() * 256);
    }
    
}