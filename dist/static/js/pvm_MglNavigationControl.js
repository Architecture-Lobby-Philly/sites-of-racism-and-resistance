(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pvm_MglNavigationControl"],{"81e1":function(t,o,n){"use strict";n("4160"),n("caad"),n("b64b"),n("2532"),n("159b");var i=n("5530");o["a"]={methods:{$_emitSelfEvent:function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.$_emitMapEvent(t,Object(i["a"])({control:this.control},o))},$_bindSelfEvents:function(t,o){var n=this;Object.keys(this.$listeners).forEach((function(i){t.includes(i)&&o.on(i,n.$_emitSelfEvent)}))},$_unbindSelfEvents:function(t,o){var n=this;0!==t.length&&o&&t.forEach((function(t){o.off(t,n.$_emitSelfEvent)}))}}}},"9d95":function(t,o,n){"use strict";n.r(o);var i=n("aa65");o["default"]={name:"NavigationControl",mixins:[i["a"]],props:{showCompass:{type:Boolean,default:!0},showZoom:{type:Boolean,default:!0}},created:function(){this.control=new this.mapbox.NavigationControl(this.$props),this.$_addControl()}}},"9f0b":function(t,o,n){"use strict";n("d81d");var i=n("5530");o["a"]={methods:{$_emitEvent:function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.$emit(t,Object(i["a"])({map:this.map,component:this},o))},$_emitMapEvent:function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.$_emitEvent(t.type,Object(i["a"])({mapboxEvent:t},o))}}}},aa65:function(t,o,n){"use strict";n("d81d");var i=n("9f0b"),e=n("81e1");o["a"]={mixins:[i["a"],e["a"]],inject:["mapbox","map","actions"],props:{position:{type:String,default:"top-right"}},beforeDestroy:function(){this.map&&this.control&&this.map.removeControl(this.control)},methods:{$_addControl:function(){try{this.map.addControl(this.control,this.position)}catch(t){return void this.$_emitEvent("error",{error:t})}this.$_emitEvent("added",{control:this.control})}},render:function(){}}}}]);
//# sourceMappingURL=pvm_MglNavigationControl.js.map