import path from 'path';
import { defineConfig } from 'vite';
import glslify from 'rollup-plugin-glslify';


const pageList = [
	{ name: 'index', path: '/' },
	{ name: 'ex1', path: 'examples/1' },
	{ name: 'ex2', path: 'examples/2' },
];

const input = {
	...( () => {

		const exEntryList = {};

		pageList.forEach( ( page ) => {

			exEntryList[ page.name || page.path ] = path.resolve( __dirname, 'src', page.path, 'index.html' );

		} );

		return exEntryList;

	} )(),
};


export default defineConfig( {
	root: 'src',
	server: {
		port: 3000,
		host: "0.0.0.0",
	},
	build: {
		rollupOptions: {
			input,
			output: {
				dir: './public',
			}
		}
	},
	resolve: {
		alias: {
			"@package-template": path.join( __dirname, "packages/package-template/src" )
		},
	},
	plugins: [
		{
			...glslify( {
				basedir: './src/glsl/',
				transform: [
					[ 'glslify-hex' ],
					[ 'glslify-import' ]
				],
			} ),
			enforce: 'pre'
		}
	]
} );
