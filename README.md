# Verktyget.js

> A vanilla javascript library.

## Features

* Ajax loading
* Json loading
* Image loading
* Video loading
* Video player
* Dom tool
* Event dispatcher
* URL Manager
* Device info (viewport size, scroll position, browser prefix)
* (scroll-detection - coming soon)


## Demo

I'm building a demo site, that will demonstrate the different features in real life.

## Install

``` bash
# Using npm
npm install verktyget

```

Verktyget is written in ES6 (named modules). You import them like this: 

``` js
// es6
import {DOM} from 'verktyget';
```

Verktyget is bundled with Rollup to these formats

```text
dist/
├── verktyget.js        (UMD, default)
├── verktyget.cjs.js    (CommonJS)
└── verktyget.esm.js    (ES Module)
```



## List of modules

Documentation for each of this is in progress...
* EventDispatcher  
* DOM  
* DeviceInfo  
* ImageLoader  
* ResponsiveImageLoader  
* VideoLoader  
* ResponsiveVideoLoader  
* Video  
* JSONPRequest  
* AjaxRequest  
* URLManager


#### DeviceInfo
``` js

// Device info
import {DeviceInfo} from 'verktyget';

var isMobile = DeviceInfo.IsMobile() // True/False
var prefix = DeviceInfo.GetPrefix() // {object} - {dom: "WebKit", lowercase: "webkit", css: "-webkit-", js: "Webkit"}

var viewportSize = DeviceInfo.GetSize(); // {x: 1920, y: 1080}
var scrollPosition = DeviceInfo.GetScroll(); // {x: 0, y: 999}

// NOTE - Make sure to update DeviceInfo. This is not done by the library
// window.addEventListener('resize', DeviceInfo.Resize);
// window.addEventListener('scroll', DeviceInfo.Scroll);

```

#### DOM
``` js

// DOM
import {DOM} from 'verktyget';

var node = DOM.Qs('.parent-node'); // class selector, scope node
var childNode = DOM.Qs('.child-node', node);

```



### Todo List

* [x] First version
* [ ] Documentation
* [ ] Example site


## Contributing

If you feel like I missed something please do send me a message or, alternatively make a pull request/open an issue and we will go from there.

## License

Code released under the [MIT](LICENSE) license.
