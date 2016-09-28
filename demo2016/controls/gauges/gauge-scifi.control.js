//could extend gauge-demo --> unify id for rotation
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
  height: 100%;
}

.min-max-label {
  font-size: 0.4em;
}

#outer-circle {
  stroke: var(--gauge-border-color);
}

#outer-pointer-circle,
#pointer-circle {
  fill: var(--gauge-pointer-circle-background-color);
}

#pointer {
  fill: var(--gauge-cursor-color);
}

#rotationGroup {
    -webkit-transition: 1s ease-in-out;
    -moz-transition: 1s ease-in-out;
    -o-transition: 1s ease-in-out;
    transition: 1s ease-in-out;
    transform-origin: 50px 50px;
}
</style>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   viewBox="0 0 100 100"
   id="svg2"
   version="1.1"
   inkscape:version="0.91 r13725"
   sodipodi:docname="sci-fi-gauge.svg">
  <defs
     id="defs4" />
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="5.6"
     inkscape:cx="5.4822483"
     inkscape:cy="35.326288"
     inkscape:document-units="px"
     inkscape:current-layer="layer1"
     showgrid="false"
     inkscape:window-width="1920"
     inkscape:window-height="1138"
     inkscape:window-x="1912"
     inkscape:window-y="-8"
     inkscape:window-maximized="1"
     units="px" />
  <metadata
     id="metadata7">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Ebene 1"
     inkscape:groupmode="layer"
     id="layer1">
    <g
       id="rotationGroup">
      <circle
         style="opacity:1;fill:none;fill-opacity:1;stroke-width:2.56275749;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         id="outer-circle"
         cx="50"
         cy="50"
         r="42.46862" />
      <circle
         r="7.5"
         cy="7.5"
         cx="51.25"
         id="outer-pointer-circle"
         style="opacity:1;fill-opacity:1;stroke:none;stroke-width:10;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <circle
         style="opacity:1;fill-opacity:1;stroke:none;stroke-width:10;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         id="pointer"
         cx="51.25"
         cy="7.5"
         r="4.5" />
    </g>
    <circle
       style="opacity:1;stroke:none;stroke-width:10;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       id="pointer-circle"
       cx="50.000008"
       cy="50.000031"
       r="24.572361" />
    <text
       xml:space="preserve"
       style="font-style:normal;font-weight:normal;font-size:11.71545601px;line-height:125%;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       x="49.625404"
       y="54.258881"
       id="label"
       sodipodi:linespacing="125%"><tspan
         sodipodi:role="line"
         id="tspan4146"
         x="49.625404"
         y="54.258881"
         style="text-align:center;text-anchor:middle">{{value}}</tspan></text>
    <text
       sodipodi:linespacing="125%"
       id="text4148"
       y="98.750336"
       x="2.2037752"
       style="font-style:normal;font-weight:normal;line-height:125%;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#2c2c2c;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       class="min-max-label"
       xml:space="preserve"><tspan
         style="text-align:center;text-anchor:middle;fill:#2c2c2c;fill-opacity:1"
         y="98.750336"
         x="2.2037752"
         id="tspan4150"
         sodipodi:role="line">{{rangeHandler.minimum}}</tspan></text>
    <text
       xml:space="preserve"
       style="font-style:normal;font-weight:normal;line-height:125%;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#2c2c2c;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       class="min-max-label"
       x="100.58625"
       y="98.750336"
       id="text4152"
       sodipodi:linespacing="125%"><tspan
         sodipodi:role="line"
         id="tspan4154"
         x="100.58625"
         y="98.750336"
         style="text-align:end;text-anchor:end;fill:#2c2c2c;fill-opacity:1">{{rangeHandler.maximum}}</tspan></text>
  </g>
</svg>

`;
  }

  _updateValue(value) {
    this.value = value;
    this.$('#rotationGroup').css('transform', 'rotate(' + this.rangeHandler.mapRangeToRange(value,-136,136) + 'deg)');
  }
}
