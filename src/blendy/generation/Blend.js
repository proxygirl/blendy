import { Tile } from './Tile.js';

export class Blend {
    
    constructor(start, end, size, index) {
        this.index = index;
        this.tiles = this.generate(start, end, size);
        this.contrast = this.contrast(start, end);
        this.similarity = this.deltaE(this.rgb2lab(start), this.rgb2lab(end));
        
    }
    
    generate(start, end, size) {

        let tiles = [];
        const d = this.dif(start, end);
        start.id = this.index;
        tiles.push(start);

        for (let t = 1; t < size-1; t++) {
            let m = t/(size-1);
            tiles.push(new Tile(
                {
                    r: start.color.r + Math.floor(d.x * m),
                    g: start.color.g + Math.floor(d.y * m),
                    b: start.color.b + Math.floor(d.z* m)
                },
                this.index + t
            ));
        }
        
        end.id = this.index + (size-1);
        tiles.push(end);

        return tiles;        

    }
    
    dif(start, end) {
        return {
            "x": end.color.r - start.color.r,
            "y": end.color.g - start.color.g,
            "z": end.color.b - start.color.b
        };
    }
    
    contrast(start, end) {
        var lum1 = this.luminance(start.color.x, start.color.y, start.color.z);
        var lum2 = this.luminance(end.color.x, end.color.y, end.color.z);
        var brightest = Math.max(lum1, lum2);
        var darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }    
    
    luminance(r, g, b) {
        var a = [r, g, b].map(function(v) {
        v /= 255;
        return v <= 0.03928 ?
          v / 12.92 :
          Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }
    
    rgb2lab(rgb){
      var r = rgb.color.r / 255,
          g = rgb.color.g / 255,
          b = rgb.color.b / 255,
          x, y, z;

      r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

      x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
      y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
      z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

      x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
      y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
      z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

      return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
    }

    // calculate the perceptual distance between colors in CIELAB
    // https://github.com/THEjoezack/ColorMine/blob/master/ColorMine/ColorSpaces/Comparisons/Cie94Comparison.cs

     deltaE(labA, labB){
      var deltaL = labA[0] - labB[0];
      var deltaA = labA[1] - labB[1];
      var deltaB = labA[2] - labB[2];
      var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
      var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
      var deltaC = c1 - c2;
      var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
      deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
      var sc = 1.0 + 0.045 * c1;
      var sh = 1.0 + 0.015 * c1;
      var deltaLKlsl = deltaL / (1.0);
      var deltaCkcsc = deltaC / (sc);
      var deltaHkhsh = deltaH / (sh);
      var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
      return i < 0 ? 0 : Math.sqrt(i);
    }    
    
}