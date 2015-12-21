var path = require('path');

module.exports = {
	entry: './public/app/App.js',
	output: {
		filename: "public/bundle.js"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				plugins: ['transform-decorators-legacy'],
				presets: ['react', 'es2015', 'stage-0']
			},
		},
		{
				test: /\.scss$/,
				// loaders: ["style", "css", "sass"]
				loader: "style-loader!css!sass?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
		}]
	},
	sassLoader: {
		file: './public/assets/scss/screen.scss',
		includePaths: './public/assets/scss/',
		outputStyle: 'compressed',
		outFile: './public/css/main.css'
	}
};