/*
Usage:
var isMobile = DeviceInfo.IsMobile();

Functions:
IsMobile      - True / False
GetPrefix     - Returns browser prefix {object} - {dom: "WebKit", lowercase: "webkit", css: "-webkit-", js: "Webkit"}

GetSize       - Returns {object} - {x: 1920, y: 1080}
GetScroll     - Returns {object} - {x: 0, y: 999}

Resize        - Set new size.             Make sure to listen for 'resize' - window.addEventListener('resize', Resize);
Scroll        - Set new scroll position.  Make sure to listen for 'scroll'  - window.addEventListener('resize', Resize);
*/

export const DeviceInfo = {

  Init () {
    this.SetPrefix();
    this.Scroll();
    this.Resize();

    // Moved to project code
    // window.addEventListener('resize', Resize);
    // window.addEventListener('scroll', this.Scroll.bind(this));

    return this;
  },

  SetPrefix () {

    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];

    var dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

    // Object containing browser prefixes
    // {dom: "WebKit", lowercase: "webkit", css: "-webkit-", js: "Webkit"}
    this.prefix = {
      dom: dom,
      lowercase: pre,
      css: '-' + pre + '-',
      js: pre[0].toUpperCase() + pre.substr(1)
    };

  },

  GetPrefix () {
    return this.prefix;
  },


  // Try to get all touch devices except "Desktop computers"
  IsMobile() {
    const isMobile = (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(BlackBerry)|(IEMobile)|(Windows Phone)|(kindle)|(Opera Mini)|(webOS)/i) !== null);
    return isMobile;
  },

  // http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
  Resize () {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    this.size = {x: w, y: h};
  },

  GetSize () {
    return this.size;
  },

  Scroll () {
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft; // || document.body.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop; // || document.body.scrollTop;

    this.scroll = {x: scrollX, y: scrollY};
  },

  GetScroll () {
    return this.scroll;
  },

}

// Run Init to set initial variables & sizes
DeviceInfo.Init();

// export default DeviceInfo;
