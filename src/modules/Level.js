import Line from './shapes/Line.js'
import Square from './shapes/Square.js'
import Pyramid from './shapes/Pyramid.js'
import Branches from './shapes/Branches.js'
import Rectangle from './shapes/Rectangle.js'
import DualPyramid from './shapes/DualPyramid.js'
import RectanglePyramid from './shapes/RectanglePyramid.js'

const SHAPES = ['line', 'square', 'branches', 'pyramid', 'rectangle', 'dualPyramid', 'rectanglePyramid']
// const SHAPES = ['line', 'square', 'pyramid','rectangle']
// const SHAPES = ['branches']
const DEBUGGING = false

export function createLevel() {

    const type = SHAPES[Math.floor(Math.random() * SHAPES.length)]

    let puzzle = {'tray': [], 'board': []}
    let solution = []
    let width, height, trayWidth

    switch(type) {
        case 'line': break;
        default: break;
    }

    return {
        type: type,
    }

}

export default class Level {
    
    constructor() {
        this.puzzle = {'tray': [], 'board': []}
        this.id = (Math.random() + 1).toString(36).substring(7)
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
        let width = Math.floor(Math.random() * 2) + 4;
        let height = Math.floor(Math.random() * 3) + 3;  

        // choose a generation model
        switch(this.type) {
            case 'line': tiles = Line(Math.floor(Math.random() * 2) + 5); break;
            case 'square': tiles = Square(); break;
            case 'branches': tiles = Branches(width); break;
            case 'pyramid': tiles = Pyramid(); break;
            case 'rectangle': tiles = Rectangle(width, height); break; 
            case 'dualPyramid': tiles = DualPyramid(); break;
            case 'rectanglePyramid': tiles = RectanglePyramid(); break;
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

        // let maxRows = 3
        // // this.trayWidth = (this.puzzle['tray'].length / this.width) > 2 ? this.width + 2 : this.width
        // this.trayWidth = (this.puzzle['tray'].length / this.width) > maxRows ? 
        //     2 * Math.floor((this.puzzle['tray'].length / maxRows) / 2) + 1 :
        //     this.width
        // console.log(this.trayWidth)

        let totalHeight = Math.ceil(this.puzzle['tray'].length/this.width)  + this.height
        console.log(totalHeight)
        this.trayWidth = this.width / totalHeight <= 0.625  ? this.width + 2 : this.width

        let remain = (Math.ceil(this.puzzle['tray'].length/this.trayWidth)*this.trayWidth) - this.puzzle['tray'].length
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
    
    // makeBranches(width, height) {
    //     let tiles = []
    //     let total = Math.floor(Math.random() * 5) + 2;
    //     let index = 0
        
    //     let dir = Math.random() < 0.5

    //     let start = new Blend(
    //         new Tile(),
    //         new Tile(),
    //         width, 0
    //     ).tiles
    //     start.forEach((tile, i) => {
    //         tile.coords = (dir) ? {x:i, y: 0} : {x:0, y: i}
    //     })
        
    //     tiles.push(start)
        
    //     index = start[start.length-1].id        
    //     for(let b = 1; b < total; b++) {
            
    //         let length = Math.floor(Math.random() * 3) + 3
            
    //         let rand = (b === 1) ?
    //             Math.floor(Math.random() * tiles[b-1].length) :
    //             (Math.floor(Math.random() * (tiles[b-1].length-2)) + 1)
            
    //         let branch = new Blend(
    //             new Tile(tiles[b-1][rand].color),
    //             new Tile(),
    //             length, index
    //         ).tiles
            
    //         branch.forEach((tile, i) => {
    //             if(dir) {
    //                 tile.coords = (b % 2 !== 0) ? 
    //                     {
    //                         x: rand + tiles[b-1][0].coords.x,
    //                         y: i + tiles[b-1][rand].coords.y
    //                     } : 
    //                     {
    //                         x: i + tiles[b-1][rand].coords.x,
    //                         y: rand + tiles[b-1][0].coords.y
    //                     }    
    //             } else {
    //                 tile.coords = (b % 2 !== 0) ? 
    //                     {
    //                         x: i + tiles[b-1][rand].coords.x,
    //                         y: rand + tiles[b-1][0].coords.y
    //                     } :                        
    //                     {
    //                         x: rand + tiles[b-1][0].coords.x,
    //                         y: i + tiles[b-1][rand].coords.y
    //                     } 
    //             }
    //         }) 
            
    //         branch.shift()
            
    //         index=branch[branch.length-1].id
    //         tiles.push(branch)
    //     }

    //     return tiles.flat()        
    // }   
    
}