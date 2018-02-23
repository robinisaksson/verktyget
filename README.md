# Verktyget.js

> A vanilla javascript library with no dependencies (font-loader).

## Features

* ajax-loading
* json-loading
* image-loading
* video-loading
* font-loading
* video-player
* scroll-detection
* video-player
* dom tool

## Demo

Link to demo site [here](http://name.robinisaksson.com).

## Install

``` bash
# Using npm
npm install verktyget

```

Now include Verktyget and you should be good to go.

``` js
// es6
import {DOM} from 'verktyget';

-- // // TODO: commonjs
-- // const smoothie = require('smoothie');
```

Alternatively you can include a minified version of Verktyget via direct file.

``` html
<header>
  <script src="verktyget.min.js"></script>
</header>
```





---------------------------------------------------------------











## Usage

Here is a list if available classes

Device info - browser width/height, scroll x/y, isMobile, browser prefix


Can I write documentation right away?
dom                       - yes
event dispatcher          - yes        
font loader               - yes
image loader              - yes
responsive image loader   - yes
responsive video loader   - yes
video loader              - yes
video                     - yes
ajax request              - no
jsonp request             - no
url manager               - no
youtube player            - no

Remove?
video codec               - no
math                      - no
polyfill                  - no, object.assign, more - raf?
string manipulation       - no


#### DeviceInfo
``` js

// Device info
import {DeviceInfo} from 'verktyget';

var isMobile = DeviceInfo.IsMobile() // True/False
var prefix = DeviceInfo.GetPrefix() // {object} - {dom: "WebKit", lowercase: "webkit", css: "-webkit-", js: "Webkit"}

var viewportHeight = DeviceInfo.GetSize().y // {x: 1920, y: 1080}
var scrollTop = DeviceInfo.GetScroll().y // {x: 0, y: 999}

// NOTE - Make sure to update DeviceInfo. This is not done by the library
// window.addEventListener('resize', DeviceInfo.Resize);
// window.addEventListener('scroll', DeviceInfo.Scroll);

```

#### DOM
Wrapper for many common dom
``` js

// Device info
import {DOM} from 'verktyget';

var node = DOM.Qs();

```



### Todo List

* [ ] Documentation
* [x] Get started


## Contributing

If you feel like I missed something please do send me a message or, alternatively make a pull request/open an issue and we will go from there.

## License

Code released under the [MIT](LICENSE) license.
