import GaugeDefault from '../../../default/controls/output-gauge.control.js';

export default class extends GaugeDefault {
  static parameters() {
    return {
      base: {
        type: 'address'
      },
      minimum: {
        type: 'number'
      },
      maximum: {
        type: 'number'
      },
      unit: {
        type: 'string'
      }
    };
  }

  static template() {
    return `
<style>
  :host {
    --gauge-background-color: white;
    --gauge-scale-color: black;
    --gauge-border-color: #272727;
    --gauge-pointer-circle-background-color: #272727;
    --gauge-cursor-color: #ff9955; /* should be set from outside as this is demo specific */
  }

  svg {
    width: 100%;
    height: auto;
  }

	text {
		fill: white;
	}

	#cursor {
	    -webkit-transition: 1s ease-in-out;
	    -moz-transition: 1s ease-in-out;
	    -o-transition: 1s ease-in-out;
	    transition: 1s ease-in-out;
      transform-origin: 150px 150px;
	}

  .st0{fill:var(--gauge-background-color);stroke:var(--gauge-border-color);stroke-width:11.9178;}
  .st1{fill:none;stroke:var(--gauge-scale-color);stroke-width:1.164;}
  .st2{fill:var(--gauge-pointer-circle-background-color);}
  .st3{filter:url(#filter4258);}
  .st4{fill:none;stroke:url(#SVGID_1_);stroke-width:3.907;}
  .st5{fill:black;}
  .st6{font-family:'ArialMT';}
  .st7{font-size:17.4597px;}
  .st8{font-size:33.4892px;}
  .st9{font-size:13.8976px;}
  .st10{fill:none;stroke:black;stroke-width:1.9863;}
  .st11{fill:var(--gauge-cursor-color);}
</style>
<svg version="1.1"
	 id="svg5254" inkscape:version="0.91 r13725" sodipodi:docname="test.svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"
	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300"
	 style="enable-background:new 0 0 300 300;" xml:space="preserve">
<g id="layer1" inkscape:groupmode="layer" inkscape:label="Ebene 1">
	<circle id="path4192" class="st0" cx="150" cy="150" r="138.9"/>

		<path id="path4138" inkscape:connector-curvature="0" inkscape:original-d="m 84.32055,899.45836 c 0,8.6073 0,17.2145 0,25.8218 m 10.924605,-25.8218 0,12.9109 m 10.924595,-12.9109 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,25.8218 m 10.92461,-25.8218 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,25.8218 m 10.92461,-25.8218 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,25.8218 m 10.9246,-25.8218 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,25.8218 m 10.92461,-25.8218 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,25.8218 m 10.9246,-25.8218 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,25.8218 m 10.9246,-25.8218 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,25.8218 m 10.92461,-25.8218 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,25.8218 m 10.9246,-25.8218 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,12.9109 m 10.92461,-12.9109 0,12.9109 m 10.9246,-12.9109 0,25.8218" inkscape:path-effect="#path-effect4185-6" class="st1" d="
		M61.1,238.3l18.4-18.1 M52.4,228.6l10-8.2 M44.5,218.1l10.7-7.2 M37.6,206.8l11.3-6.2 M31.8,195l11.9-5.1 M27.2,182.5l24.7-7.6
		 M24,169.4l12.7-2.4 M22.4,156l12.9-0.7 M22.5,142.3l12.9,1 M24.4,128.9l12.7,2.6 M27.8,116l24.6,7.9 M32.5,103.6l11.8,5.2
		 M38.3,91.8L49.6,98 M45.2,80.6l10.7,7.3 M53.1,70.1l10,8.2 M61.9,60.4l18.4,18.2 M71.5,51.5l8.3,9.9 M82,43.5l7.3,10.6 M93.3,36.5
		l6.2,11.3 M105.3,30.7l5,11.9 M117.9,26.3l7.3,24.8 M131,23.3l2.2,12.7 M144.3,21.8l0.7,12.9 M157.7,21.8L157,34.7 M170.9,23.2
		L168.8,36 M183.9,26L177.1,51 M196.5,30.2l-4.6,12 M208.6,35.6l-5.9,11.5 M220.1,42.2l-7,10.8 M230.9,50l-8.1,10 M240.8,58.9
		l-18.2,18.3 M249.7,68.7l-10,8.2 M257.5,79.4l-10.8,7.1 M264.2,90.9l-11.5,5.9 M269.7,103l-12,4.7 M273.9,115.6l-24.9,6.8
		 M276.8,128.6l-12.7,2.1 M278.3,141.8l-12.9,0.8 M278.4,155.1l-12.9-0.6 M277.1,168.3l-12.8-1.9 M274.5,181.3l-25-6.4 M270.6,193.9
		l-12.1-4.5 M265.4,206.1l-11.6-5.7 M258.9,217.7l-11-6.8 M251.4,228.6l-10.2-7.9 M242.7,238.7l-18.6-17.9"/>
	<circle id="path4194" class="st2" cx="150" cy="150" r="24.6"/>
	<g id="path4212" inkscape:connector-curvature="0" sodipodi:nodetypes="csssc" class="st3">

			<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="309.1353" y1="-445.1615" x2="309.1353" y2="-393.0813" gradientTransform="matrix(1.2404 -2.347919e-002 -2.347919e-002 -1.2404 -242.6139 -346.3656)">
			<stop  offset="0" style="stop-color:#FA0000"/>
			<stop  offset="0.8" style="stop-color:#EAFF00"/>
			<stop  offset="1" style="stop-color:#00BCD4"/>
		</linearGradient>
		<path class="st4" d="M67.4,230.1c-22-22.4-36-52-36.5-80.2C29.8,93.7,82.1,29.5,148.1,28.3s120.5,51.2,121.7,117.2
			c0.6,33-12.2,63.1-33.4,85.1"/>
	</g>
	<text transform="matrix(1 0 0 1 130.5111 264.5687)" class="st5 st6 st7" id="unit">{{unit}}</text>
	<text transform="matrix(1 0 0 1 129.249 244.5701)" class="st5 st6 st8" id="label">{{value}}</text>
	<text transform="matrix(1 0 0 1 81.2887 221.3407)" class="st5 st6 st9">{{rangeHandler.minimum}}</text>
	<text transform="matrix(1 0 0 1 206.425 221.3407)" class="st5 st6 st9">{{rangeHandler.maximum}}</text>
	<path id="path4329" inkscape:connector-curvature="0" sodipodi:nodetypes="csssc" class="st10" d="M60.8,239.3
		C37,215.2,22,183.2,21.4,152.8C20.2,92,76.5,22.7,147.5,21.3s129.8,55.2,131.2,126.4c0.7,35.6-13.1,68.1-35.9,91.9"/>
	<path id="cursor" inkscape:connector-curvature="0" class="st11" d="M150,49.3l-4.4,141h4.4h4.4C154.4,190.3,150,49.3,150,49.3z"/>
</g>
</svg>
`;
  }

  _updateValue(value) {
    this.value = value;
    this.$('#cursor').css('transform', 'rotate(' + this.rangeHandler.mapRangeToRange(value,-136,136) + 'deg)');
  }
}
