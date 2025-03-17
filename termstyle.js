class Termstyle {
  constructor() {
    // Basic colors
    this.colors = {
      // Standard colors
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
      
      // Bright colors
      brightBlack: '\x1b[90m',
      brightRed: '\x1b[91m',
      brightGreen: '\x1b[92m',
      brightYellow: '\x1b[93m',
      brightBlue: '\x1b[94m',
      brightMagenta: '\x1b[95m',
      brightCyan: '\x1b[96m',
      brightWhite: '\x1b[97m',
      
      // Extended colors
      orange: '\x1b[38;2;255;165;0m',
      pink: '\x1b[38;2;255;192;203m',
      purple: '\x1b[38;2;128;0;128m',
      brown: '\x1b[38;2;165;42;42m',
      gold: '\x1b[38;2;255;215;0m',
      silver: '\x1b[38;2;192;192;192m',
      lime: '\x1b[38;2;0;255;0m',
      teal: '\x1b[38;2;0;128;128m',
      indigo: '\x1b[38;2;75;0;130m',
      violet: '\x1b[38;2;238;130;238m',
      
      // Precious stones
      emerald: '\x1b[38;2;46;204;113m',
      ruby: '\x1b[38;2;224;17;95m',
      sapphire: '\x1b[38;2;15;82;186m',
      amethyst: '\x1b[38;2;153;102;204m',
      jade: '\x1b[38;2;0;168;107m',
      amber: '\x1b[38;2;255;191;0m',
      topaz: '\x1b[38;2;255;200;124m',
      pearl: '\x1b[38;2;240;234;214m',
      opal: '\x1b[38;2;177;231;236m',
      garnet: '\x1b[38;2;179;27;27m',
      
      // Nature colors
      forest: '\x1b[38;2;34;139;34m',
      sky: '\x1b[38;2;135;206;235m',
      ocean: '\x1b[38;2;0;119;190m',
      grass: '\x1b[38;2;124;252;0m',
      sunset: '\x1b[38;2;255;111;89m',
      dawn: '\x1b[38;2;255;179;167m',
      earth: '\x1b[38;2;150;75;0m',
      sand: '\x1b[38;2;194;178;128m',
      
      // Additional colors
      coral: '\x1b[38;2;255;127;80m',
      crimson: '\x1b[38;2;220;20;60m',
      turquoise: '\x1b[38;2;64;224;208m',
      maroon: '\x1b[38;2;128;0;0m',
      navy: '\x1b[38;2;0;0;128m',
      olive: '\x1b[38;2;128;128;0m',
      salmon: '\x1b[38;2;250;128;114m',
      skyBlue: '\x1b[38;2;135;206;235m',
      plum: '\x1b[38;2;221;160;221m',
      khaki: '\x1b[38;2;240;230;140m',
      orchid: '\x1b[38;2;218;112;214m',
      steelBlue: '\x1b[38;2;70;130;180m',
      chocolate: '\x1b[38;2;210;105;30m',
      
      // Neon colors
      neonPink: '\x1b[38;2;255;0;255m',
      neonBlue: '\x1b[38;2;0;255;255m',
      neonGreen: '\x1b[38;2;57;255;20m',
      neonOrange: '\x1b[38;2;255;95;0m',
      neonYellow: '\x1b[38;2;255;255;0m',
      neonPurple: '\x1b[38;2;159;0;255m',
      
      // Pastel colors
      pastelPink: '\x1b[38;2;255;209;220m',
      pastelBlue: '\x1b[38;2;174;198;207m',
      pastelGreen: '\x1b[38;2;119;221;119m',
      pastelYellow: '\x1b[38;2;253;253;150m',
      pastelPurple: '\x1b[38;2;179;158;181m',
      pastelOrange: '\x1b[38;2;255;179;71m'
    };


    this.bg = {};
    Object.entries(this.colors).forEach(([name, value]) => {
      const code = value.match(/\d+(?:;\d+)*/)[0];
      this.bg[name] = code.startsWith('38') 
        ? `\x1b[48${code.slice(2)}m`
        : `\x1b[${parseInt(code) + 10}m`;
    });

    this.styles = {
      reset: '\x1b[0m',
      bold: '\x1b[1m',
      dim: '\x1b[2m',
      italic: '\x1b[3m',
      underline: '\x1b[4m',
      blink: '\x1b[5m',
      reverse: '\x1b[7m',
      hidden: '\x1b[8m',
      strikethrough: '\x1b[9m',
      doubleUnderline: '\x1b[21m',
      overline: '\x1b[53m'
    };


    Object.keys(this.colors).forEach(color => {
      this[color] = (text) => this.colors[color] + text + this.styles.reset;
    });

    Object.keys(this.bg).forEach(color => {
      this[`bg${color.charAt(0).toUpperCase() + color.slice(1)}`] = (text) => 
        this.bg[color] + text + this.styles.reset;
    });

    Object.keys(this.styles).forEach(style => {
      if (style !== 'reset') {
        this[style] = (text) => this.styles[style] + text + this.styles.reset;
      }
    });
  }

  rgb(r, g, b) {
    return (text) => `\x1b[38;2;${r};${g};${b}m${text}${this.styles.reset}`;
  }

  bgRgb(r, g, b) {
    return (text) => `\x1b[48;2;${r};${g};${b}m${text}${this.styles.reset}`;
  }

  hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  hsl(h, s, l) {
    const [r, g, b] = this.hslToRgb(h, s, l);
    return this.rgb(r, g, b);
  }

  bgHsl(h, s, l) {
    const [r, g, b] = this.hslToRgb(h, s, l);
    return this.bgRgb(r, g, b);
  }

  rainbow(text) {
    const colors = [
      'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'
    ];
    return text.split('').map((char, i) => {
      const color = colors[i % colors.length];
      return this.colors[color] + char;
    }).join('') + this.styles.reset;
  }

  gradient(text, startColor, endColor) {
    const chars = text.split('');
    const steps = chars.length;
    
    return chars.map((char, i) => {
      const r = Math.floor(startColor.r + (endColor.r - startColor.r) * (i / steps));
      const g = Math.floor(startColor.g + (endColor.g - startColor.g) * (i / steps));
      const b = Math.floor(startColor.b + (endColor.b - startColor.b) * (i / steps));
      
      return this.rgb(r, g, b)(char);
    }).join('');
  }

  multiGradient(text, colors) {
    const chars = text.split('');
    const segments = colors.length - 1;
    const charsPerSegment = Math.ceil(chars.length / segments);
    
    return chars.map((char, i) => {
      const segment = Math.min(Math.floor(i / charsPerSegment), segments - 1);
      const startColor = colors[segment];
      const endColor = colors[segment + 1];
      const segmentPosition = (i % charsPerSegment) / charsPerSegment;
      
      const r = Math.floor(startColor.r + (endColor.r - startColor.r) * segmentPosition);
      const g = Math.floor(startColor.g + (endColor.g - startColor.g) * segmentPosition);
      const b = Math.floor(startColor.b + (endColor.b - startColor.b) * segmentPosition);
      
      return this.rgb(r, g, b)(char);
    }).join('') + this.styles.reset;
  }

  neon(text, color = 'blue') {
    const neonColors = {
      blue: this.neonBlue,
      pink: this.neonPink,
      green: this.neonGreen,
      orange: this.neonOrange,
      yellow: this.neonYellow,
      purple: this.neonPurple
    };
    
    const colorFn = neonColors[color] || neonColors.blue;
    return this.bold(this.blink(colorFn(text)));
  }

  box(text, style = 'single') {
    const styles = {
      single: ['┌', '─', '┐', '│', '└', '┘'],
      double: ['╔', '═', '╗', '║', '╚', '╝'],
      round: ['╭', '─', '╮', '│', '╰', '╯'],
      bold: ['┏', '━', '┓', '┃', '┗', '┛']
    };

    const [tl, t, tr, v, bl, br] = styles[style] || styles.single;
    const width = text.length + 2;
    const top = `${tl}${t.repeat(width)}${tr}`;
    const middle = `${v} ${text} ${v}`;
    const bottom = `${bl}${t.repeat(width)}${br}`;

    return `${top}\n${middle}\n${bottom}`;
  }


  chain(...styles) {
    return (text) => styles.reduce((acc, style) => {
      if (typeof this[style] === 'function') {
        return this[style](acc);
      }
      return acc;
    }, text);
  }
}

const termstyle = new Termstyle();
module.exports = termstyle;