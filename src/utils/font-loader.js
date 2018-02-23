import WebFont from "webfontloader";
import EventDispatcher from './event-dispatcher';

export class FontLoader extends EventDispatcher {

	constructor(families = [], cssUrl) {
		super();
		this.cssUrl = cssUrl;

		if (typeof families === 'string') {
			this.families = families.split(",");
		} else {
			this.families = families;
		}


		// FONT LOADING
    // loading - This event is triggered when all fonts have been requested.
    // active - This event is triggered when the fonts have rendered.
    // inactive - This event is triggered when the browser does not support linked fonts or if none of the fonts could be loaded.
    // fontloading - This event is triggered once for each font that's loaded.
    // fontactive - This event is triggered once for each font that renders.
    // fontinactive - This event is triggered if the font can't be loaded.
    var config = {
      fontinactive: (familyName, fvd) => {
        this.onFontFail(familyName, fvd);
      },
      fontactive: (familyName, fvd) => {
          this.onFontComplete(familyName, fvd);
      },
      active: () => {
          this.OnAllFontsComplete();
      },
      // GOOGLE FONTS
      // google: {
      //   families: ['Rozha One', 'Roboto Condensed'],
      // },
      // FROM CSS
      custom: {
        // families: ['No5', 'Home Text', 'Barrio', 'Baloo', 'Amaranth', 'Aladin', 'Advent', 'Acme'],
        families: this.families,
        urls: [this.cssUrl]
      }
    };
    WebFont.load(config);
	}

	onFontFail(familyName, fvd) {
    // console.log(familyName, fvd,' failed to load');
		this.dispatchEvent({type: 'fontFailed', target:this});
  }

  onFontComplete(familyName, fvd) {
    // console.log(familyName,' loaded');
    this.dispatchEvent({type: 'fontComplete', target:this});
  }

  OnAllFontsComplete() {
    this.dispatchEvent({type: 'complete', target:this});
  }

	destroy() {
		this.families = null;
		this.cssUrl = null;
	}
}

export default FontLoader;
