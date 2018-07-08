module.exports = {
    entry: './src/main.js',
		// entry: {
	  //   dom: './src/utils/dom.js',
	  //   deviceInfo: './src/utils/device-info.js',
	  //   eventDispatcher: './src/utils/event-dispatcher.js'
	  // },
    target: 'node',
    output: {
        path: './dist',
        filename: 'build.js',
				library: 'verktyget',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }]
    }
}
