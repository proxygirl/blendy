import { Tile } from './Tile.js';
import { Blend } from './Blend.js';

const SHAPES = ['line', 'rectangle', 'square', 'branches']
//const SHAPES = ['square']
const DEBUGGING = false

export default class Level {
    
    constructor() {
        this.puzzle = {'tray': [], 'board': []}
        this.solution = []
        this.width = 0
        this.height = 0
        this.type = SHAPES[Math.floor(Math.random() * SHAPES.length)]
        this.debugging = DEBUGGING
        
        this.generate()
    }
    
    generate() {
        let tiles = [];
        
        // initialze random variables
        const width = Math.floor(Math.random() * 2) + 4;
        const height = Math.floor(Math.random() * 3) + 3;        

        // choose a generation model
        switch(this.type) {
            case 'line': tiles = this.makeLine(Math.floor(Math.random() * 2) + 5); break;
            case 'rectangle': tiles = this.makeRectangle(width, height); break; 
            case 'branches': tiles = this.makeBranches(width, height); break;
            case 'square': tiles = this.makeSquare(); break;
            default: tiles = this.makeLine(Math.floor(Math.random() * 2) + 5); break;
        }
        
        // locked tiles: list of random tiles out of every x tiles
        let locked = [];
        let freq = 6
        
        if(this.type !== 'line') {
            for(let l = 0; l < Math.floor(tiles.length/freq); l++) {
        
                let max = (l*freq)+freq
                let min = l*freq

                locked.push(Math.floor(Math.random() * (max-min)) + min);
            }
        }
        
        this.width = Math.max(...tiles.map(tile => tile.coords.x)) + 1;
        this.height = Math.max(...tiles.map(tile => tile.coords.y)) + 1;
        
        this.solution = tiles.map(tile => tile.id);        
        
        this.puzzle['tray'] = [...tiles].filter((tile,index) => !locked.includes(index))
        this.puzzle['tray'] = this.randomize([...this.puzzle['tray']])
            .map(tile => {
                return {
                    parent: 'tray',
                    coords: null,
                    tile: tile
                }
        });
        
        let remain = (Math.ceil(this.puzzle['tray'].length/this.width)*this.width) - this.puzzle['tray'].length
        for(let r = 0; r < remain; r++) {
            this.puzzle['tray'].push(
                {
                    parent: 'tray',
                    coords: null,
                    tile: null
                }
            )
        }
        
        this.height += Math.floor(this.puzzle['tray'].length/(this.width))
        
        
        this.puzzle['board'] = tiles.map((tile, index) => {return {
            parent: 'board',
            coords: tile.coords,
            tile: (locked.includes(index) || DEBUGGING) ? tiles[index] : null,
            locked: (locked.includes(index)) ? true : false
            
        }});
        
        this.reset = JSON.parse(JSON.stringify(this.puzzle))
        
    }
    
    randomize(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }  
        return array

    }
    
    makeLine(width) {
        let tiles = []
        let line = new Blend(new Tile(), new Tile(), width, 0).tiles;
        line.forEach((tile, i) => {
            tile.coords = {x:i, y: 0}
        })
        tiles.push(line)
        return tiles.flat()
    }
    
    makeBranches(width, height) {
        let tiles = []
        let total = Math.floor(Math.random() * 5) + 2;
        let index = 0
        
        let dir = Math.random() < 0.5

        let start = new Blend(
            new Tile(),
            new Tile(),
            width, 0
        ).tiles
        start.forEach((tile, i) => {
            tile.coords = (dir) ? {x:i, y: 0} : {x:0, y: i}
        })
        
        tiles.push(start)
        
        index = start[start.length-1].id        
        for(let b = 1; b < total; b++) {
            
            let length = Math.floor(Math.random() * 3) + 3
            
            let rand = (b === 1) ?
                Math.floor(Math.random() * tiles[b-1].length) :
                (Math.floor(Math.random() * (tiles[b-1].length-2)) + 1)
            
            let branch = new Blend(
                new Tile(tiles[b-1][rand].color),
                new Tile(),
                length, index
            ).tiles
            
            branch.forEach((tile, i) => {
                if(dir) {
                    tile.coords = (b % 2 !== 0) ? 
                        {
                            x: rand + tiles[b-1][0].coords.x,
                            y: i + tiles[b-1][rand].coords.y
                        } : 
                        {
                            x: i + tiles[b-1][rand].coords.x,
                            y: rand + tiles[b-1][0].coords.y
                        }    
                } else {
                    tile.coords = (b % 2 !== 0) ? 
                        {
                            x: i + tiles[b-1][rand].coords.x,
                            y: rand + tiles[b-1][0].coords.y
                        } :                        
                        {
                            x: rand + tiles[b-1][0].coords.x,
                            y: i + tiles[b-1][rand].coords.y
                        } 
                }
            }) 
            
            branch.shift()
            
            index=branch[branch.length-1].id
            tiles.push(branch)
        }

        return tiles.flat()        
    }   
    
    makeRectangle(width, height) {
        let tiles = []
        let index = 0

        let top = new Blend(
            new Tile(),
            new Tile(),
            width, 0
        ).tiles
        top.forEach((tile, i) => {tile.coords = {x:i, y: 0}})

        index = top[top.length-1].id

        let right = new Blend(
            new Tile(top[top.length-1].color),
            new Tile(),
            height, index
        ).tiles
        right.forEach((tile, i) => {tile.coords = {x: width-1, y: i}})            
        right.shift()

        index = right[right.length-1].id

        let bottom = new Blend(
            new Tile(right[right.length-1].color),
            new Tile(),
            width, index
        ).tiles
        bottom.forEach((tile, i) => {tile.coords = {x: (width-1)-i, y: height-1}})
        bottom.shift()

        index = bottom[bottom.length-1].id

        let left = new Blend(
            new Tile(bottom[bottom.length-1].color),
            new Tile(top[0].color),
            height, index
        ).tiles
        left.forEach((tile, i) => {tile.coords = {x: 0, y: (height-1)-i}})
        left.shift()
        left.pop()

        tiles.push(top)
        tiles.push(right)
        tiles.push(bottom)
        tiles.push(left)         

        return tiles.flat()       
    }
    
    makeSquare() {
        let size = 3
        let tiles = []
        let index = 0
        
        let topLeft = new Tile()
        let topRight = new Tile()
        let bottomRight = new Tile()
        let bottomLeft = new Tile()
        
        let top = new Blend(
            topLeft,
            topRight,
            size, 0
        ).tiles
        top.forEach((tile, i) => {tile.coords = {x:i, y: 0}})

        index = top[top.length-1].id

        let right = new Blend(
            topRight,
            bottomRight,
            size, index
        ).tiles
        right.forEach((tile, i) => {tile.coords = {x: size-1, y: i}})            
        right.shift()

        index = right[right.length-1].id

        let bottom = new Blend(
            bottomRight,
            bottomLeft,
            size, index
        ).tiles
        bottom.forEach((tile, i) => {tile.coords = {x: (size-1)-i, y: size-1}})
        bottom.shift()

        index = bottom[bottom.length-1].id

        let left = new Blend(
            bottomLeft,
            topLeft,
            size, index
        ).tiles
        left.forEach((tile, i) => {tile.coords = {x: 0, y: (size-1)-i}})
        left.shift()
        left.pop()

        tiles.push(top)
        tiles.push(right)
        tiles.push(bottom)
        tiles.push(left)         
        tiles = tiles.flat()
          
        let r = 0,g = 0, b = 0
        tiles.forEach(tile => {
            
            r += tile.color.r
            g += tile.color.g
            b += tile.color.b
        })

        let center = new Tile({
            r: (r/8),
            g: (g/8),
            b: (b/8)
            
        }, 8)
        center.coords = {x: 1, y: 1}
        
        tiles.push(center)

        return tiles
    }
    
    
    similarTo(color) {
        let bracket = 40
        let rand = Math.floor(Math.random() * 3)
        console.log(rand)
        let r = (rand === 0) ?
            color.r : this.randomRange(color.r-bracket, color.r+bracket)
        let g = (rand === 1) ? 
            color.g : this.randomRange(color.g-bracket, color.g+bracket)
        let b = (rand === 2) ?
            color.b : this.randomRange(color.b-bracket, color.b+bracket)
        return new Tile({r: r, b: b, g: g})
    }
    
    randomRange(min, max) {
        let rand = (Math.random() * (max - min) + min) + 50
        if (rand < 0 ) {
            rand = 0
        }
        if (rand > 255) {
            rand = 255
        }
        return rand
    }
    
    
}