
var colorMatrix = document.getElementById( "colorMatrix" );
var ctxMatrix = colorMatrix.getContext( "2d" );
var levelSlider = document.getElementById( "topLevel" );



function makePicker() {
	var ctx = ctxMatrix;


	var ppcd = {
        	nGreen : 128,
                alpha : 1.0,
                /*
		PSI_CONTROL frame;
		struct {
			BIT_FIELD bSettingShade : 1;
			BIT_FIELD bMatrixChanged : 1;
		} flags;
		CDATA CurrentColor;
		CDATA Presets[36];
		PSI_CONTROL LastPreset;
		PSI_CONTROL pcZoom;
		PSI_CONTROL psw, pShadeRed, pShadeBlue, pShadeGreen; // shade well data...
		int bSetPreset;
		int ColorDialogDone, ColorDialogOkay;
		Image pColorMatrix; // fixed size image in local memory that is block copied for output.
                */
	};// PICK_COLOR_DATA, *PPICK_COLOR_DATA;


	const nScale = 1


	const xbias = 1
	const ybias =  1
	const xsize = 133
	const ysize = 133

	//#define COLOR Color( (255-red)*nScale, (255-green)*nScale, (blue)*nScale )

levelSlider.addEventListener( "input", (a)=>{
	//console.log( "A:", a );
	//console.log( levelSlider.value );
	UpdateImage( 255-levelSlider.value );
} );

//----------------------------------------------------------------------------

function clamp(r) { return ((r<0)?0:(r>255)?255:r) }

function setColor(red,green,blue ) {
	
                	ctx.fillStyle=`rgb(${red},${green},${blue})`;
return;//
	var h = (green * 720 / 255)|0;
	var s = (red * 200 / 255)|0;
	var l = (blue * 200 / 255)|0;
//	console.log( "HSL:", h,s,l);
                	ctx.fillStyle=`hsl(${h},${s}%,${l}%)`;

}


function UpdateImage( nGreen )
{
	var red, blue, green=0;
                          //fe0000, 7f7f00, and 00fe00.
	var colors0 = [ [0xfe,0,0], [0x7f, 0x7f, 0], [0, 0xfe, 0 ] ];
	var colors1 = [ [0xfe,0,0], [0, 0xfe, 0 ] ];
	var colors2 = [ [0xfe,0,0], [0xfe, 0xfe, 0 ], [0, 0xfe, 0 ] ];

	let colors = colors0;

	ctxMatrix.clearRect( 0, 0, colorMatrix.width, colorMatrix.height );
	for( let ybias = 0; ybias < 32; ybias++ ) {
		let d = [colors[1][0] - colors[0][0],colors[1][1] - colors[0][1],colors[1][2] - colors[0][2]]
		for( let blend = 0; blend < 128; blend++ ) {
			var r = colors[0][0] + d[0] * (blend/128);
			var g = colors[0][1] + d[1] * (blend/128);
			var b = colors[0][2] + d[2] * (blend/128);
			setColor(r,g,b );
                	//ctx.fillStyle=`rgb(${clamp(255-red*nScale)},${clamp(255-green*nScale)},${clamp(blue*nScale)})`;
                        ctx.fillRect( 0+blend, ybias, 1, 1 );
			
		}
		d = [colors[2][0] - colors[1][0],colors[2][1] - colors[1][1],colors[2][2] - colors[1][2]]
		for( let blend = 0; blend < 128; blend++ ) {
			var r = colors[1][0] + d[0] * (blend/128);
			var g = colors[1][1] + d[1] * (blend/128);
			var b = colors[1][2] + d[2] * (blend/128);
			setColor(r,g,b );
                	//ctx.fillStyle=`rgb(${clamp(255-red*nScale)},${clamp(255-green*nScale)},${clamp(blue*nScale)})`;
                        ctx.fillRect( 128+blend, ybias, 1, 1 );
			
		}
	}

	colors = colors1;
	for( let ybias = 32; ybias < 64; ybias++ ) {
		let d = [colors[1][0] - colors[0][0],colors[1][1] - colors[0][1],colors[1][2] - colors[0][2]]
		for( let blend = 0; blend < 256; blend++ ) {
			var r = colors[0][0] + d[0] * (blend/256);
			var g = colors[0][1] + d[1] * (blend/256);
			var b = colors[0][2] + d[2] * (blend/256);
			setColor(r,g,b );
                	//ctx.fillStyle=`rgb(${clamp(255-red*nScale)},${clamp(255-green*nScale)},${clamp(blue*nScale)})`;
                        ctx.fillRect( 0+blend, ybias, 1, 1 );
			
		}
	}

	colors = colors2;
	for( let ybias = 64; ybias < 96; ybias++ ) {
		let d = [colors[1][0] - colors[0][0],colors[1][1] - colors[0][1],colors[1][2] - colors[0][2]]
		for( let blend = 0; blend < 128; blend++ ) {
			var r = colors[0][0] + d[0] * (blend/128);
			var g = colors[0][1] + d[1] * (blend/128);
			var b = colors[0][2] + d[2] * (blend/128);
			setColor(r,g,b );
                	//ctx.fillStyle=`rgb(${clamp(255-red*nScale)},${clamp(255-green*nScale)},${clamp(blue*nScale)})`;
                        ctx.fillRect( 0+blend, ybias, 1, 1 );
			
		}
		d = [colors[2][0] - colors[1][0],colors[2][1] - colors[1][1],colors[2][2] - colors[1][2]]
		for( let blend = 0; blend < 128; blend++ ) {
			var r = colors[1][0] + d[0] * (blend/128);
			var g = colors[1][1] + d[1] * (blend/128);
			var b = colors[1][2] + d[2] * (blend/128);
			setColor(r,g,b );

                	//ctx.fillStyle=`rgb(${clamp(255-red*nScale)},${clamp(255-green*nScale)},${clamp(blue*nScale)})`;
                        ctx.fillRect( 128+blend, ybias, 1, 1 );
		}
	}

}




function drawMatrix() {
	if( ppcd.flags.bMatrixChanged )
	{
		UpdateImage(  ppcd.nGreen );
		ppcd.flags.bMatrixChanged = 0;
	}
}
	UpdateImage( 128) ;

}

makePicker();
