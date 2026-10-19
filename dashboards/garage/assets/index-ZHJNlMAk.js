(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function sg(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Ld={exports:{}},Ho={},Dd={exports:{}},St={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hm;function Fv(){if(Hm)return St;Hm=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),d=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),S=Symbol.iterator;function v(I){return I===null||typeof I!="object"?null:(I=S&&I[S]||I["@@iterator"],typeof I=="function"?I:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,C={};function x(I,q,xe){this.props=I,this.context=q,this.refs=C,this.updater=xe||M}x.prototype.isReactComponent={},x.prototype.setState=function(I,q){if(typeof I!="object"&&typeof I!="function"&&I!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,I,q,"setState")},x.prototype.forceUpdate=function(I){this.updater.enqueueForceUpdate(this,I,"forceUpdate")};function _(){}_.prototype=x.prototype;function D(I,q,xe){this.props=I,this.context=q,this.refs=C,this.updater=xe||M}var z=D.prototype=new _;z.constructor=D,w(z,x.prototype),z.isPureReactComponent=!0;var R=Array.isArray,P=Object.prototype.hasOwnProperty,L={current:null},B={key:!0,ref:!0,__self:!0,__source:!0};function b(I,q,xe){var we,Ve={},$e=null,ae=null;if(q!=null)for(we in q.ref!==void 0&&(ae=q.ref),q.key!==void 0&&($e=""+q.key),q)P.call(q,we)&&!B.hasOwnProperty(we)&&(Ve[we]=q[we]);var de=arguments.length-2;if(de===1)Ve.children=xe;else if(1<de){for(var Se=Array(de),Ze=0;Ze<de;Ze++)Se[Ze]=arguments[Ze+2];Ve.children=Se}if(I&&I.defaultProps)for(we in de=I.defaultProps,de)Ve[we]===void 0&&(Ve[we]=de[we]);return{$$typeof:s,type:I,key:$e,ref:ae,props:Ve,_owner:L.current}}function N(I,q){return{$$typeof:s,type:I.type,key:q,ref:I.ref,props:I.props,_owner:I._owner}}function O(I){return typeof I=="object"&&I!==null&&I.$$typeof===s}function V(I){var q={"=":"=0",":":"=2"};return"$"+I.replace(/[=:]/g,function(xe){return q[xe]})}var Y=/\/+/g;function Q(I,q){return typeof I=="object"&&I!==null&&I.key!=null?V(""+I.key):q.toString(36)}function G(I,q,xe,we,Ve){var $e=typeof I;($e==="undefined"||$e==="boolean")&&(I=null);var ae=!1;if(I===null)ae=!0;else switch($e){case"string":case"number":ae=!0;break;case"object":switch(I.$$typeof){case s:case e:ae=!0}}if(ae)return ae=I,Ve=Ve(ae),I=we===""?"."+Q(ae,0):we,R(Ve)?(xe="",I!=null&&(xe=I.replace(Y,"$&/")+"/"),G(Ve,q,xe,"",function(Ze){return Ze})):Ve!=null&&(O(Ve)&&(Ve=N(Ve,xe+(!Ve.key||ae&&ae.key===Ve.key?"":(""+Ve.key).replace(Y,"$&/")+"/")+I)),q.push(Ve)),1;if(ae=0,we=we===""?".":we+":",R(I))for(var de=0;de<I.length;de++){$e=I[de];var Se=we+Q($e,de);ae+=G($e,q,xe,Se,Ve)}else if(Se=v(I),typeof Se=="function")for(I=Se.call(I),de=0;!($e=I.next()).done;)$e=$e.value,Se=we+Q($e,de++),ae+=G($e,q,xe,Se,Ve);else if($e==="object")throw q=String(I),Error("Objects are not valid as a React child (found: "+(q==="[object Object]"?"object with keys {"+Object.keys(I).join(", ")+"}":q)+"). If you meant to render a collection of children, use an array instead.");return ae}function F(I,q,xe){if(I==null)return I;var we=[],Ve=0;return G(I,we,"","",function($e){return q.call(xe,$e,Ve++)}),we}function ce(I){if(I._status===-1){var q=I._result;q=q(),q.then(function(xe){(I._status===0||I._status===-1)&&(I._status=1,I._result=xe)},function(xe){(I._status===0||I._status===-1)&&(I._status=2,I._result=xe)}),I._status===-1&&(I._status=0,I._result=q)}if(I._status===1)return I._result.default;throw I._result}var Z={current:null},J={transition:null},W={ReactCurrentDispatcher:Z,ReactCurrentBatchConfig:J,ReactCurrentOwner:L};function ee(){throw Error("act(...) is not supported in production builds of React.")}return St.Children={map:F,forEach:function(I,q,xe){F(I,function(){q.apply(this,arguments)},xe)},count:function(I){var q=0;return F(I,function(){q++}),q},toArray:function(I){return F(I,function(q){return q})||[]},only:function(I){if(!O(I))throw Error("React.Children.only expected to receive a single React element child.");return I}},St.Component=x,St.Fragment=t,St.Profiler=o,St.PureComponent=D,St.StrictMode=r,St.Suspense=p,St.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W,St.act=ee,St.cloneElement=function(I,q,xe){if(I==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+I+".");var we=w({},I.props),Ve=I.key,$e=I.ref,ae=I._owner;if(q!=null){if(q.ref!==void 0&&($e=q.ref,ae=L.current),q.key!==void 0&&(Ve=""+q.key),I.type&&I.type.defaultProps)var de=I.type.defaultProps;for(Se in q)P.call(q,Se)&&!B.hasOwnProperty(Se)&&(we[Se]=q[Se]===void 0&&de!==void 0?de[Se]:q[Se])}var Se=arguments.length-2;if(Se===1)we.children=xe;else if(1<Se){de=Array(Se);for(var Ze=0;Ze<Se;Ze++)de[Ze]=arguments[Ze+2];we.children=de}return{$$typeof:s,type:I.type,key:Ve,ref:$e,props:we,_owner:ae}},St.createContext=function(I){return I={$$typeof:d,_currentValue:I,_currentValue2:I,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},I.Provider={$$typeof:l,_context:I},I.Consumer=I},St.createElement=b,St.createFactory=function(I){var q=b.bind(null,I);return q.type=I,q},St.createRef=function(){return{current:null}},St.forwardRef=function(I){return{$$typeof:h,render:I}},St.isValidElement=O,St.lazy=function(I){return{$$typeof:y,_payload:{_status:-1,_result:I},_init:ce}},St.memo=function(I,q){return{$$typeof:m,type:I,compare:q===void 0?null:q}},St.startTransition=function(I){var q=J.transition;J.transition={};try{I()}finally{J.transition=q}},St.unstable_act=ee,St.useCallback=function(I,q){return Z.current.useCallback(I,q)},St.useContext=function(I){return Z.current.useContext(I)},St.useDebugValue=function(){},St.useDeferredValue=function(I){return Z.current.useDeferredValue(I)},St.useEffect=function(I,q){return Z.current.useEffect(I,q)},St.useId=function(){return Z.current.useId()},St.useImperativeHandle=function(I,q,xe){return Z.current.useImperativeHandle(I,q,xe)},St.useInsertionEffect=function(I,q){return Z.current.useInsertionEffect(I,q)},St.useLayoutEffect=function(I,q){return Z.current.useLayoutEffect(I,q)},St.useMemo=function(I,q){return Z.current.useMemo(I,q)},St.useReducer=function(I,q,xe){return Z.current.useReducer(I,q,xe)},St.useRef=function(I){return Z.current.useRef(I)},St.useState=function(I){return Z.current.useState(I)},St.useSyncExternalStore=function(I,q,xe){return Z.current.useSyncExternalStore(I,q,xe)},St.useTransition=function(){return Z.current.useTransition()},St.version="18.3.1",St}var jm;function ch(){return jm||(jm=1,Dd.exports=Fv()),Dd.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wm;function kv(){if(Wm)return Ho;Wm=1;var s=ch(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,o=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(h,p,m){var y,S={},v=null,M=null;m!==void 0&&(v=""+m),p.key!==void 0&&(v=""+p.key),p.ref!==void 0&&(M=p.ref);for(y in p)r.call(p,y)&&!l.hasOwnProperty(y)&&(S[y]=p[y]);if(h&&h.defaultProps)for(y in p=h.defaultProps,p)S[y]===void 0&&(S[y]=p[y]);return{$$typeof:e,type:h,key:v,ref:M,props:S,_owner:o.current}}return Ho.Fragment=t,Ho.jsx=d,Ho.jsxs=d,Ho}var Xm;function Bv(){return Xm||(Xm=1,Ld.exports=kv()),Ld.exports}var u=Bv(),De=ch();const zv=sg(De);var cc={},Id={exports:{}},ui={},Ud={exports:{}},Od={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ym;function Vv(){return Ym||(Ym=1,(function(s){function e(J,W){var ee=J.length;J.push(W);e:for(;0<ee;){var I=ee-1>>>1,q=J[I];if(0<o(q,W))J[I]=W,J[ee]=q,ee=I;else break e}}function t(J){return J.length===0?null:J[0]}function r(J){if(J.length===0)return null;var W=J[0],ee=J.pop();if(ee!==W){J[0]=ee;e:for(var I=0,q=J.length,xe=q>>>1;I<xe;){var we=2*(I+1)-1,Ve=J[we],$e=we+1,ae=J[$e];if(0>o(Ve,ee))$e<q&&0>o(ae,Ve)?(J[I]=ae,J[$e]=ee,I=$e):(J[I]=Ve,J[we]=ee,I=we);else if($e<q&&0>o(ae,ee))J[I]=ae,J[$e]=ee,I=$e;else break e}}return W}function o(J,W){var ee=J.sortIndex-W.sortIndex;return ee!==0?ee:J.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var d=Date,h=d.now();s.unstable_now=function(){return d.now()-h}}var p=[],m=[],y=1,S=null,v=3,M=!1,w=!1,C=!1,x=typeof setTimeout=="function"?setTimeout:null,_=typeof clearTimeout=="function"?clearTimeout:null,D=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function z(J){for(var W=t(m);W!==null;){if(W.callback===null)r(m);else if(W.startTime<=J)r(m),W.sortIndex=W.expirationTime,e(p,W);else break;W=t(m)}}function R(J){if(C=!1,z(J),!w)if(t(p)!==null)w=!0,ce(P);else{var W=t(m);W!==null&&Z(R,W.startTime-J)}}function P(J,W){w=!1,C&&(C=!1,_(b),b=-1),M=!0;var ee=v;try{for(z(W),S=t(p);S!==null&&(!(S.expirationTime>W)||J&&!V());){var I=S.callback;if(typeof I=="function"){S.callback=null,v=S.priorityLevel;var q=I(S.expirationTime<=W);W=s.unstable_now(),typeof q=="function"?S.callback=q:S===t(p)&&r(p),z(W)}else r(p);S=t(p)}if(S!==null)var xe=!0;else{var we=t(m);we!==null&&Z(R,we.startTime-W),xe=!1}return xe}finally{S=null,v=ee,M=!1}}var L=!1,B=null,b=-1,N=5,O=-1;function V(){return!(s.unstable_now()-O<N)}function Y(){if(B!==null){var J=s.unstable_now();O=J;var W=!0;try{W=B(!0,J)}finally{W?Q():(L=!1,B=null)}}else L=!1}var Q;if(typeof D=="function")Q=function(){D(Y)};else if(typeof MessageChannel<"u"){var G=new MessageChannel,F=G.port2;G.port1.onmessage=Y,Q=function(){F.postMessage(null)}}else Q=function(){x(Y,0)};function ce(J){B=J,L||(L=!0,Q())}function Z(J,W){b=x(function(){J(s.unstable_now())},W)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(J){J.callback=null},s.unstable_continueExecution=function(){w||M||(w=!0,ce(P))},s.unstable_forceFrameRate=function(J){0>J||125<J?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):N=0<J?Math.floor(1e3/J):5},s.unstable_getCurrentPriorityLevel=function(){return v},s.unstable_getFirstCallbackNode=function(){return t(p)},s.unstable_next=function(J){switch(v){case 1:case 2:case 3:var W=3;break;default:W=v}var ee=v;v=W;try{return J()}finally{v=ee}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(J,W){switch(J){case 1:case 2:case 3:case 4:case 5:break;default:J=3}var ee=v;v=J;try{return W()}finally{v=ee}},s.unstable_scheduleCallback=function(J,W,ee){var I=s.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?I+ee:I):ee=I,J){case 1:var q=-1;break;case 2:q=250;break;case 5:q=1073741823;break;case 4:q=1e4;break;default:q=5e3}return q=ee+q,J={id:y++,callback:W,priorityLevel:J,startTime:ee,expirationTime:q,sortIndex:-1},ee>I?(J.sortIndex=ee,e(m,J),t(p)===null&&J===t(m)&&(C?(_(b),b=-1):C=!0,Z(R,ee-I))):(J.sortIndex=q,e(p,J),w||M||(w=!0,ce(P))),J},s.unstable_shouldYield=V,s.unstable_wrapCallback=function(J){var W=v;return function(){var ee=v;v=W;try{return J.apply(this,arguments)}finally{v=ee}}}})(Od)),Od}var qm;function Gv(){return qm||(qm=1,Ud.exports=Vv()),Ud.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $m;function Hv(){if($m)return ui;$m=1;var s=ch(),e=Gv();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,o={};function l(n,i){d(n,i),d(n+"Capture",i)}function d(n,i){for(o[n]=i,n=0;n<i.length;n++)r.add(i[n])}var h=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),p=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,y={},S={};function v(n){return p.call(S,n)?!0:p.call(y,n)?!1:m.test(n)?S[n]=!0:(y[n]=!0,!1)}function M(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function w(n,i,a,c){if(i===null||typeof i>"u"||M(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function C(n,i,a,c,f,g,T){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=f,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=g,this.removeEmptyString=T}var x={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){x[n]=new C(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];x[i]=new C(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){x[n]=new C(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){x[n]=new C(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){x[n]=new C(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){x[n]=new C(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){x[n]=new C(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){x[n]=new C(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){x[n]=new C(n,5,!1,n.toLowerCase(),null,!1,!1)});var _=/[\-:]([a-z])/g;function D(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(_,D);x[i]=new C(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(_,D);x[i]=new C(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(_,D);x[i]=new C(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){x[n]=new C(n,1,!1,n.toLowerCase(),null,!1,!1)}),x.xlinkHref=new C("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){x[n]=new C(n,1,!1,n.toLowerCase(),null,!0,!0)});function z(n,i,a,c){var f=x.hasOwnProperty(i)?x[i]:null;(f!==null?f.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(w(i,a,f,c)&&(a=null),c||f===null?v(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):f.mustUseProperty?n[f.propertyName]=a===null?f.type===3?!1:"":a:(i=f.attributeName,c=f.attributeNamespace,a===null?n.removeAttribute(i):(f=f.type,a=f===3||f===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var R=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,P=Symbol.for("react.element"),L=Symbol.for("react.portal"),B=Symbol.for("react.fragment"),b=Symbol.for("react.strict_mode"),N=Symbol.for("react.profiler"),O=Symbol.for("react.provider"),V=Symbol.for("react.context"),Y=Symbol.for("react.forward_ref"),Q=Symbol.for("react.suspense"),G=Symbol.for("react.suspense_list"),F=Symbol.for("react.memo"),ce=Symbol.for("react.lazy"),Z=Symbol.for("react.offscreen"),J=Symbol.iterator;function W(n){return n===null||typeof n!="object"?null:(n=J&&n[J]||n["@@iterator"],typeof n=="function"?n:null)}var ee=Object.assign,I;function q(n){if(I===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);I=i&&i[1]||""}return`
`+I+n}var xe=!1;function we(n,i){if(!n||xe)return"";xe=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(fe){var c=fe}Reflect.construct(n,[],i)}else{try{i.call()}catch(fe){c=fe}n.call(i.prototype)}else{try{throw Error()}catch(fe){c=fe}n()}}catch(fe){if(fe&&c&&typeof fe.stack=="string"){for(var f=fe.stack.split(`
`),g=c.stack.split(`
`),T=f.length-1,k=g.length-1;1<=T&&0<=k&&f[T]!==g[k];)k--;for(;1<=T&&0<=k;T--,k--)if(f[T]!==g[k]){if(T!==1||k!==1)do if(T--,k--,0>k||f[T]!==g[k]){var j=`
`+f[T].replace(" at new "," at ");return n.displayName&&j.includes("<anonymous>")&&(j=j.replace("<anonymous>",n.displayName)),j}while(1<=T&&0<=k);break}}}finally{xe=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?q(n):""}function Ve(n){switch(n.tag){case 5:return q(n.type);case 16:return q("Lazy");case 13:return q("Suspense");case 19:return q("SuspenseList");case 0:case 2:case 15:return n=we(n.type,!1),n;case 11:return n=we(n.type.render,!1),n;case 1:return n=we(n.type,!0),n;default:return""}}function $e(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case B:return"Fragment";case L:return"Portal";case N:return"Profiler";case b:return"StrictMode";case Q:return"Suspense";case G:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case V:return(n.displayName||"Context")+".Consumer";case O:return(n._context.displayName||"Context")+".Provider";case Y:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case F:return i=n.displayName||null,i!==null?i:$e(n.type)||"Memo";case ce:i=n._payload,n=n._init;try{return $e(n(i))}catch{}}return null}function ae(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return $e(i);case 8:return i===b?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function de(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Se(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ze(n){var i=Se(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var f=a.get,g=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return f.call(this)},set:function(T){c=""+T,g.call(this,T)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(T){c=""+T},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function je(n){n._valueTracker||(n._valueTracker=Ze(n))}function Ie(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=Se(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function at(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Ae(n,i){var a=i.checked;return ee({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Oe(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=de(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Be(n,i){i=i.checked,i!=null&&z(n,"checked",i,!1)}function qe(n,i){Be(n,i);var a=de(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?Dt(n,i.type,a):i.hasOwnProperty("defaultValue")&&Dt(n,i.type,de(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function xt(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function Dt(n,i,a){(i!=="number"||at(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var kt=Array.isArray;function Mt(n,i,a,c){if(n=n.options,i){i={};for(var f=0;f<a.length;f++)i["$"+a[f]]=!0;for(a=0;a<n.length;a++)f=i.hasOwnProperty("$"+n[a].value),n[a].selected!==f&&(n[a].selected=f),f&&c&&(n[a].defaultSelected=!0)}else{for(a=""+de(a),i=null,f=0;f<n.length;f++){if(n[f].value===a){n[f].selected=!0,c&&(n[f].defaultSelected=!0);return}i!==null||n[f].disabled||(i=n[f])}i!==null&&(i.selected=!0)}}function jt(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return ee({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function $(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(kt(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:de(a)}}function mn(n,i){var a=de(i.value),c=de(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function Ft(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function U(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function E(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?U(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var te,oe=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,f){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,f)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(te=te||document.createElement("div"),te.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=te.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function he(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var be={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Re=["Webkit","ms","Moz","O"];Object.keys(be).forEach(function(n){Re.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),be[i]=be[n]})});function pe(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||be.hasOwnProperty(n)&&be[n]?(""+i).trim():i+"px"}function me(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,f=pe(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,f):n[a]=f}}var Ue=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function nt(n,i){if(i){if(Ue[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function Ne(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Te=null;function et(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var lt=null,dt=null,H=null;function Pe(n){if(n=Ro(n)){if(typeof lt!="function")throw Error(t(280));var i=n.stateNode;i&&(i=El(i),lt(n.stateNode,n.type,i))}}function ge(n){dt?H?H.push(n):H=[n]:dt=n}function Ce(){if(dt){var n=dt,i=H;if(H=dt=null,Pe(n),i)for(n=0;n<i.length;n++)Pe(i[n])}}function ze(n,i){return n(i)}function ve(){}var rt=!1;function Qe(n,i,a){if(rt)return n(i,a);rt=!0;try{return ze(n,i,a)}finally{rt=!1,(dt!==null||H!==null)&&(ve(),Ce())}}function At(n,i){var a=n.stateNode;if(a===null)return null;var c=El(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var Rt=!1;if(h)try{var yn={};Object.defineProperty(yn,"passive",{get:function(){Rt=!0}}),window.addEventListener("test",yn,yn),window.removeEventListener("test",yn,yn)}catch{Rt=!1}function Yn(n,i,a,c,f,g,T,k,j){var fe=Array.prototype.slice.call(arguments,3);try{i.apply(a,fe)}catch(ye){this.onError(ye)}}var Ct=!1,Di=null,gn=!1,Zi=null,xs={onError:function(n){Ct=!0,Di=n}};function vs(n,i,a,c,f,g,T,k,j){Ct=!1,Di=null,Yn.apply(xs,arguments)}function _s(n,i,a,c,f,g,T,k,j){if(vs.apply(this,arguments),Ct){if(Ct){var fe=Di;Ct=!1,Di=null}else throw Error(t(198));gn||(gn=!0,Zi=fe)}}function Rn(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function Ii(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function Br(n){if(Rn(n)!==n)throw Error(t(188))}function ys(n){var i=n.alternate;if(!i){if(i=Rn(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var f=a.return;if(f===null)break;var g=f.alternate;if(g===null){if(c=f.return,c!==null){a=c;continue}break}if(f.child===g.child){for(g=f.child;g;){if(g===a)return Br(f),n;if(g===c)return Br(f),i;g=g.sibling}throw Error(t(188))}if(a.return!==c.return)a=f,c=g;else{for(var T=!1,k=f.child;k;){if(k===a){T=!0,a=f,c=g;break}if(k===c){T=!0,c=f,a=g;break}k=k.sibling}if(!T){for(k=g.child;k;){if(k===a){T=!0,a=g,c=f;break}if(k===c){T=!0,c=g,a=f;break}k=k.sibling}if(!T)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function mr(n){return n=ys(n),n!==null?zr(n):null}function zr(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=zr(n);if(i!==null)return i;n=n.sibling}return null}var gr=e.unstable_scheduleCallback,Ss=e.unstable_cancelCallback,Vr=e.unstable_shouldYield,co=e.unstable_requestPaint,Jt=e.unstable_now,aa=e.unstable_getCurrentPriorityLevel,Gr=e.unstable_ImmediatePriority,Hr=e.unstable_UserBlockingPriority,A=e.unstable_NormalPriority,X=e.unstable_LowPriority,ue=e.unstable_IdlePriority,re=null,ie=null;function ke(n){if(ie&&typeof ie.onCommitFiberRoot=="function")try{ie.onCommitFiberRoot(re,n,void 0,(n.current.flags&128)===128)}catch{}}var Le=Math.clz32?Math.clz32:it,Fe=Math.log,Ke=Math.LN2;function it(n){return n>>>=0,n===0?32:31-(Fe(n)/Ke|0)|0}var ht=64,vt=4194304;function Xe(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function bt(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,f=n.suspendedLanes,g=n.pingedLanes,T=a&268435455;if(T!==0){var k=T&~f;k!==0?c=Xe(k):(g&=T,g!==0&&(c=Xe(g)))}else T=a&~f,T!==0?c=Xe(T):g!==0&&(c=Xe(g));if(c===0)return 0;if(i!==0&&i!==c&&(i&f)===0&&(f=c&-c,g=i&-i,f>=g||f===16&&(g&4194240)!==0))return i;if((c&4)!==0&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-Le(i),f=1<<a,c|=n[a],i&=~f;return c}function en(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xt(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,f=n.expirationTimes,g=n.pendingLanes;0<g;){var T=31-Le(g),k=1<<T,j=f[T];j===-1?((k&a)===0||(k&c)!==0)&&(f[T]=en(k,i)):j<=i&&(n.expiredLanes|=k),g&=~k}}function It(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function cn(){var n=ht;return ht<<=1,(ht&4194240)===0&&(ht=64),n}function We(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function nn(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-Le(i),n[i]=a}function Et(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var f=31-Le(a),g=1<<f;i[f]=0,c[f]=-1,n[f]=-1,a&=~g}}function Sn(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-Le(a),f=1<<c;f&i|n[c]&i&&(n[c]|=i),a&=~f}}var ft=0;function qn(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var pi,Nt,Kt,mi,Gt,$n=!1,ii=[],ri=null,Kn=null,Ji=null,Ms=new Map,bs=new Map,Qi=[],oa="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function cl(n,i){switch(n){case"focusin":case"focusout":ri=null;break;case"dragenter":case"dragleave":Kn=null;break;case"mouseover":case"mouseout":Ji=null;break;case"pointerover":case"pointerout":Ms.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":bs.delete(i.pointerId)}}function Es(n,i,a,c,f,g){return n===null||n.nativeEvent!==g?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:g,targetContainers:[f]},i!==null&&(i=Ro(i),i!==null&&Nt(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),n)}function ws(n,i,a,c,f){switch(i){case"focusin":return ri=Es(ri,n,i,a,c,f),!0;case"dragenter":return Kn=Es(Kn,n,i,a,c,f),!0;case"mouseover":return Ji=Es(Ji,n,i,a,c,f),!0;case"pointerover":var g=f.pointerId;return Ms.set(g,Es(Ms.get(g)||null,n,i,a,c,f)),!0;case"gotpointercapture":return g=f.pointerId,bs.set(g,Es(bs.get(g)||null,n,i,a,c,f)),!0}return!1}function xr(n){var i=Us(n.target);if(i!==null){var a=Rn(i);if(a!==null){if(i=a.tag,i===13){if(i=Ii(a),i!==null){n.blockedOn=i,Gt(n.priority,function(){Kt(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Ts(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=Rs(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);Te=c,a.target.dispatchEvent(c),Te=null}else return i=Ro(a),i!==null&&Nt(i),n.blockedOn=a,!1;i.shift()}return!0}function uo(n,i,a){Ts(n)&&a.delete(i)}function fo(){$n=!1,ri!==null&&Ts(ri)&&(ri=null),Kn!==null&&Ts(Kn)&&(Kn=null),Ji!==null&&Ts(Ji)&&(Ji=null),Ms.forEach(uo),bs.forEach(uo)}function vr(n,i){n.blockedOn===i&&(n.blockedOn=null,$n||($n=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,fo)))}function Zt(n){function i(f){return vr(f,n)}if(0<ii.length){vr(ii[0],n);for(var a=1;a<ii.length;a++){var c=ii[a];c.blockedOn===n&&(c.blockedOn=null)}}for(ri!==null&&vr(ri,n),Kn!==null&&vr(Kn,n),Ji!==null&&vr(Ji,n),Ms.forEach(i),bs.forEach(i),a=0;a<Qi.length;a++)c=Qi[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<Qi.length&&(a=Qi[0],a.blockedOn===null);)xr(a),a.blockedOn===null&&Qi.shift()}var Ui=R.ReactCurrentBatchConfig,la=!0;function ca(n,i,a,c){var f=ft,g=Ui.transition;Ui.transition=null;try{ft=1,As(n,i,a,c)}finally{ft=f,Ui.transition=g}}function cu(n,i,a,c){var f=ft,g=Ui.transition;Ui.transition=null;try{ft=4,As(n,i,a,c)}finally{ft=f,Ui.transition=g}}function As(n,i,a,c){if(la){var f=Rs(n,i,a,c);if(f===null)Mu(n,i,c,ua,a),cl(n,c);else if(ws(f,n,i,a,c))c.stopPropagation();else if(cl(n,c),i&4&&-1<oa.indexOf(n)){for(;f!==null;){var g=Ro(f);if(g!==null&&pi(g),g=Rs(n,i,a,c),g===null&&Mu(n,i,c,ua,a),g===f)break;f=g}f!==null&&c.stopPropagation()}else Mu(n,i,c,null,a)}}var ua=null;function Rs(n,i,a,c){if(ua=null,n=et(c),n=Us(n),n!==null)if(i=Rn(n),i===null)n=null;else if(a=i.tag,a===13){if(n=Ii(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return ua=n,null}function ul(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(aa()){case Gr:return 1;case Hr:return 4;case A:case X:return 16;case ue:return 536870912;default:return 16}default:return 16}}var Oi=null,ho=null,jr=null;function dl(){if(jr)return jr;var n,i=ho,a=i.length,c,f="value"in Oi?Oi.value:Oi.textContent,g=f.length;for(n=0;n<a&&i[n]===f[n];n++);var T=a-n;for(c=1;c<=T&&i[a-c]===f[g-c];c++);return jr=f.slice(n,1<c?1-c:void 0)}function da(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Wr(){return!0}function fa(){return!1}function Dn(n){function i(a,c,f,g,T){this._reactName=a,this._targetInst=f,this.type=c,this.nativeEvent=g,this.target=T,this.currentTarget=null;for(var k in n)n.hasOwnProperty(k)&&(a=n[k],this[k]=a?a(g):g[k]);return this.isDefaultPrevented=(g.defaultPrevented!=null?g.defaultPrevented:g.returnValue===!1)?Wr:fa,this.isPropagationStopped=fa,this}return ee(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Wr)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Wr)},persist:function(){},isPersistent:Wr}),i}var Xr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Cs=Dn(Xr),Ns=ee({},Xr,{view:0,detail:0}),po=Dn(Ns),mo,ha,Ps,pa=ee({},Ns,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ga,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Ps&&(Ps&&n.type==="mousemove"?(mo=n.screenX-Ps.screenX,ha=n.screenY-Ps.screenY):ha=mo=0,Ps=n),mo)},movementY:function(n){return"movementY"in n?n.movementY:ha}}),go=Dn(pa),uu=ee({},pa,{dataTransfer:0}),du=Dn(uu),fl=ee({},Ns,{relatedTarget:0}),ma=Dn(fl),hl=ee({},Xr,{animationName:0,elapsedTime:0,pseudoElement:0}),xo=Dn(hl),vo=ee({},Xr,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),Fi=Dn(vo),Yr=ee({},Xr,{data:0}),Ls=Dn(Yr),_o={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},pl={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ml={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gl(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=ml[n])?!!i[n]:!1}function ga(){return gl}var wt=ee({},Ns,{key:function(n){if(n.key){var i=_o[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=da(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?pl[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ga,charCode:function(n){return n.type==="keypress"?da(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?da(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),Wt=Dn(wt),rn=ee({},pa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ut=Dn(rn),Zn=ee({},Ns,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ga}),Qt=Dn(Zn),gi=ee({},Xr,{propertyName:0,elapsedTime:0,pseudoElement:0}),kn=Dn(gi),Ds=ee({},pa,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Is=Dn(Ds),ki=[9,13,27,32],er=h&&"CompositionEvent"in window,_r=null;h&&"documentMode"in document&&(_r=document.documentMode);var fu=h&&"TextEvent"in window&&!_r,xa=h&&(!er||_r&&8<_r&&11>=_r),Oh=" ",Fh=!1;function kh(n,i){switch(n){case"keyup":return ki.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bh(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var va=!1;function Ix(n,i){switch(n){case"compositionend":return Bh(i);case"keypress":return i.which!==32?null:(Fh=!0,Oh);case"textInput":return n=i.data,n===Oh&&Fh?null:n;default:return null}}function Ux(n,i){if(va)return n==="compositionend"||!er&&kh(n,i)?(n=dl(),jr=ho=Oi=null,va=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return xa&&i.locale!=="ko"?null:i.data;default:return null}}var Ox={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function zh(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!Ox[n.type]:i==="textarea"}function Vh(n,i,a,c){ge(c),i=Sl(i,"onChange"),0<i.length&&(a=new Cs("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var yo=null,So=null;function Fx(n){sp(n,0)}function xl(n){var i=ba(n);if(Ie(i))return n}function kx(n,i){if(n==="change")return i}var Gh=!1;if(h){var hu;if(h){var pu="oninput"in document;if(!pu){var Hh=document.createElement("div");Hh.setAttribute("oninput","return;"),pu=typeof Hh.oninput=="function"}hu=pu}else hu=!1;Gh=hu&&(!document.documentMode||9<document.documentMode)}function jh(){yo&&(yo.detachEvent("onpropertychange",Wh),So=yo=null)}function Wh(n){if(n.propertyName==="value"&&xl(So)){var i=[];Vh(i,So,n,et(n)),Qe(Fx,i)}}function Bx(n,i,a){n==="focusin"?(jh(),yo=i,So=a,yo.attachEvent("onpropertychange",Wh)):n==="focusout"&&jh()}function zx(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return xl(So)}function Vx(n,i){if(n==="click")return xl(i)}function Gx(n,i){if(n==="input"||n==="change")return xl(i)}function Hx(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var Bi=typeof Object.is=="function"?Object.is:Hx;function Mo(n,i){if(Bi(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var f=a[c];if(!p.call(i,f)||!Bi(n[f],i[f]))return!1}return!0}function Xh(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Yh(n,i){var a=Xh(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Xh(a)}}function qh(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?qh(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function $h(){for(var n=window,i=at();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=at(n.document)}return i}function mu(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function jx(n){var i=$h(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&qh(a.ownerDocument.documentElement,a)){if(c!==null&&mu(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var f=a.textContent.length,g=Math.min(c.start,f);c=c.end===void 0?g:Math.min(c.end,f),!n.extend&&g>c&&(f=c,c=g,g=f),f=Yh(a,g);var T=Yh(a,c);f&&T&&(n.rangeCount!==1||n.anchorNode!==f.node||n.anchorOffset!==f.offset||n.focusNode!==T.node||n.focusOffset!==T.offset)&&(i=i.createRange(),i.setStart(f.node,f.offset),n.removeAllRanges(),g>c?(n.addRange(i),n.extend(T.node,T.offset)):(i.setEnd(T.node,T.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Wx=h&&"documentMode"in document&&11>=document.documentMode,_a=null,gu=null,bo=null,xu=!1;function Kh(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;xu||_a==null||_a!==at(c)||(c=_a,"selectionStart"in c&&mu(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),bo&&Mo(bo,c)||(bo=c,c=Sl(gu,"onSelect"),0<c.length&&(i=new Cs("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=_a)))}function vl(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var ya={animationend:vl("Animation","AnimationEnd"),animationiteration:vl("Animation","AnimationIteration"),animationstart:vl("Animation","AnimationStart"),transitionend:vl("Transition","TransitionEnd")},vu={},Zh={};h&&(Zh=document.createElement("div").style,"AnimationEvent"in window||(delete ya.animationend.animation,delete ya.animationiteration.animation,delete ya.animationstart.animation),"TransitionEvent"in window||delete ya.transitionend.transition);function _l(n){if(vu[n])return vu[n];if(!ya[n])return n;var i=ya[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in Zh)return vu[n]=i[a];return n}var Jh=_l("animationend"),Qh=_l("animationiteration"),ep=_l("animationstart"),tp=_l("transitionend"),np=new Map,ip="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function qr(n,i){np.set(n,i),l(i,[n])}for(var _u=0;_u<ip.length;_u++){var yu=ip[_u],Xx=yu.toLowerCase(),Yx=yu[0].toUpperCase()+yu.slice(1);qr(Xx,"on"+Yx)}qr(Jh,"onAnimationEnd"),qr(Qh,"onAnimationIteration"),qr(ep,"onAnimationStart"),qr("dblclick","onDoubleClick"),qr("focusin","onFocus"),qr("focusout","onBlur"),qr(tp,"onTransitionEnd"),d("onMouseEnter",["mouseout","mouseover"]),d("onMouseLeave",["mouseout","mouseover"]),d("onPointerEnter",["pointerout","pointerover"]),d("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Eo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qx=new Set("cancel close invalid load scroll toggle".split(" ").concat(Eo));function rp(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,_s(c,i,void 0,n),n.currentTarget=null}function sp(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],f=c.event;c=c.listeners;e:{var g=void 0;if(i)for(var T=c.length-1;0<=T;T--){var k=c[T],j=k.instance,fe=k.currentTarget;if(k=k.listener,j!==g&&f.isPropagationStopped())break e;rp(f,k,fe),g=j}else for(T=0;T<c.length;T++){if(k=c[T],j=k.instance,fe=k.currentTarget,k=k.listener,j!==g&&f.isPropagationStopped())break e;rp(f,k,fe),g=j}}}if(gn)throw n=Zi,gn=!1,Zi=null,n}function sn(n,i){var a=i[Ru];a===void 0&&(a=i[Ru]=new Set);var c=n+"__bubble";a.has(c)||(ap(i,n,2,!1),a.add(c))}function Su(n,i,a){var c=0;i&&(c|=4),ap(a,n,c,i)}var yl="_reactListening"+Math.random().toString(36).slice(2);function wo(n){if(!n[yl]){n[yl]=!0,r.forEach(function(a){a!=="selectionchange"&&(qx.has(a)||Su(a,!1,n),Su(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[yl]||(i[yl]=!0,Su("selectionchange",!1,i))}}function ap(n,i,a,c){switch(ul(i)){case 1:var f=ca;break;case 4:f=cu;break;default:f=As}a=f.bind(null,i,a,n),f=void 0,!Rt||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),c?f!==void 0?n.addEventListener(i,a,{capture:!0,passive:f}):n.addEventListener(i,a,!0):f!==void 0?n.addEventListener(i,a,{passive:f}):n.addEventListener(i,a,!1)}function Mu(n,i,a,c,f){var g=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var T=c.tag;if(T===3||T===4){var k=c.stateNode.containerInfo;if(k===f||k.nodeType===8&&k.parentNode===f)break;if(T===4)for(T=c.return;T!==null;){var j=T.tag;if((j===3||j===4)&&(j=T.stateNode.containerInfo,j===f||j.nodeType===8&&j.parentNode===f))return;T=T.return}for(;k!==null;){if(T=Us(k),T===null)return;if(j=T.tag,j===5||j===6){c=g=T;continue e}k=k.parentNode}}c=c.return}Qe(function(){var fe=g,ye=et(a),Me=[];e:{var _e=np.get(n);if(_e!==void 0){var Ye=Cs,tt=n;switch(n){case"keypress":if(da(a)===0)break e;case"keydown":case"keyup":Ye=Wt;break;case"focusin":tt="focus",Ye=ma;break;case"focusout":tt="blur",Ye=ma;break;case"beforeblur":case"afterblur":Ye=ma;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Ye=go;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Ye=du;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Ye=Qt;break;case Jh:case Qh:case ep:Ye=xo;break;case tp:Ye=kn;break;case"scroll":Ye=po;break;case"wheel":Ye=Is;break;case"copy":case"cut":case"paste":Ye=Fi;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Ye=Ut}var st=(i&4)!==0,xn=!st&&n==="scroll",se=st?_e!==null?_e+"Capture":null:_e;st=[];for(var K=fe,le;K!==null;){le=K;var Ee=le.stateNode;if(le.tag===5&&Ee!==null&&(le=Ee,se!==null&&(Ee=At(K,se),Ee!=null&&st.push(To(K,Ee,le)))),xn)break;K=K.return}0<st.length&&(_e=new Ye(_e,tt,null,a,ye),Me.push({event:_e,listeners:st}))}}if((i&7)===0){e:{if(_e=n==="mouseover"||n==="pointerover",Ye=n==="mouseout"||n==="pointerout",_e&&a!==Te&&(tt=a.relatedTarget||a.fromElement)&&(Us(tt)||tt[yr]))break e;if((Ye||_e)&&(_e=ye.window===ye?ye:(_e=ye.ownerDocument)?_e.defaultView||_e.parentWindow:window,Ye?(tt=a.relatedTarget||a.toElement,Ye=fe,tt=tt?Us(tt):null,tt!==null&&(xn=Rn(tt),tt!==xn||tt.tag!==5&&tt.tag!==6)&&(tt=null)):(Ye=null,tt=fe),Ye!==tt)){if(st=go,Ee="onMouseLeave",se="onMouseEnter",K="mouse",(n==="pointerout"||n==="pointerover")&&(st=Ut,Ee="onPointerLeave",se="onPointerEnter",K="pointer"),xn=Ye==null?_e:ba(Ye),le=tt==null?_e:ba(tt),_e=new st(Ee,K+"leave",Ye,a,ye),_e.target=xn,_e.relatedTarget=le,Ee=null,Us(ye)===fe&&(st=new st(se,K+"enter",tt,a,ye),st.target=le,st.relatedTarget=xn,Ee=st),xn=Ee,Ye&&tt)t:{for(st=Ye,se=tt,K=0,le=st;le;le=Sa(le))K++;for(le=0,Ee=se;Ee;Ee=Sa(Ee))le++;for(;0<K-le;)st=Sa(st),K--;for(;0<le-K;)se=Sa(se),le--;for(;K--;){if(st===se||se!==null&&st===se.alternate)break t;st=Sa(st),se=Sa(se)}st=null}else st=null;Ye!==null&&op(Me,_e,Ye,st,!1),tt!==null&&xn!==null&&op(Me,xn,tt,st,!0)}}e:{if(_e=fe?ba(fe):window,Ye=_e.nodeName&&_e.nodeName.toLowerCase(),Ye==="select"||Ye==="input"&&_e.type==="file")var ot=kx;else if(zh(_e))if(Gh)ot=Gx;else{ot=zx;var ct=Bx}else(Ye=_e.nodeName)&&Ye.toLowerCase()==="input"&&(_e.type==="checkbox"||_e.type==="radio")&&(ot=Vx);if(ot&&(ot=ot(n,fe))){Vh(Me,ot,a,ye);break e}ct&&ct(n,_e,fe),n==="focusout"&&(ct=_e._wrapperState)&&ct.controlled&&_e.type==="number"&&Dt(_e,"number",_e.value)}switch(ct=fe?ba(fe):window,n){case"focusin":(zh(ct)||ct.contentEditable==="true")&&(_a=ct,gu=fe,bo=null);break;case"focusout":bo=gu=_a=null;break;case"mousedown":xu=!0;break;case"contextmenu":case"mouseup":case"dragend":xu=!1,Kh(Me,a,ye);break;case"selectionchange":if(Wx)break;case"keydown":case"keyup":Kh(Me,a,ye)}var ut;if(er)e:{switch(n){case"compositionstart":var gt="onCompositionStart";break e;case"compositionend":gt="onCompositionEnd";break e;case"compositionupdate":gt="onCompositionUpdate";break e}gt=void 0}else va?kh(n,a)&&(gt="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(gt="onCompositionStart");gt&&(xa&&a.locale!=="ko"&&(va||gt!=="onCompositionStart"?gt==="onCompositionEnd"&&va&&(ut=dl()):(Oi=ye,ho="value"in Oi?Oi.value:Oi.textContent,va=!0)),ct=Sl(fe,gt),0<ct.length&&(gt=new Ls(gt,n,null,a,ye),Me.push({event:gt,listeners:ct}),ut?gt.data=ut:(ut=Bh(a),ut!==null&&(gt.data=ut)))),(ut=fu?Ix(n,a):Ux(n,a))&&(fe=Sl(fe,"onBeforeInput"),0<fe.length&&(ye=new Ls("onBeforeInput","beforeinput",null,a,ye),Me.push({event:ye,listeners:fe}),ye.data=ut))}sp(Me,i)})}function To(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Sl(n,i){for(var a=i+"Capture",c=[];n!==null;){var f=n,g=f.stateNode;f.tag===5&&g!==null&&(f=g,g=At(n,a),g!=null&&c.unshift(To(n,g,f)),g=At(n,i),g!=null&&c.push(To(n,g,f))),n=n.return}return c}function Sa(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function op(n,i,a,c,f){for(var g=i._reactName,T=[];a!==null&&a!==c;){var k=a,j=k.alternate,fe=k.stateNode;if(j!==null&&j===c)break;k.tag===5&&fe!==null&&(k=fe,f?(j=At(a,g),j!=null&&T.unshift(To(a,j,k))):f||(j=At(a,g),j!=null&&T.push(To(a,j,k)))),a=a.return}T.length!==0&&n.push({event:i,listeners:T})}var $x=/\r\n?/g,Kx=/\u0000|\uFFFD/g;function lp(n){return(typeof n=="string"?n:""+n).replace($x,`
`).replace(Kx,"")}function Ml(n,i,a){if(i=lp(i),lp(n)!==i&&a)throw Error(t(425))}function bl(){}var bu=null,Eu=null;function wu(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Tu=typeof setTimeout=="function"?setTimeout:void 0,Zx=typeof clearTimeout=="function"?clearTimeout:void 0,cp=typeof Promise=="function"?Promise:void 0,Jx=typeof queueMicrotask=="function"?queueMicrotask:typeof cp<"u"?function(n){return cp.resolve(null).then(n).catch(Qx)}:Tu;function Qx(n){setTimeout(function(){throw n})}function Au(n,i){var a=i,c=0;do{var f=a.nextSibling;if(n.removeChild(a),f&&f.nodeType===8)if(a=f.data,a==="/$"){if(c===0){n.removeChild(f),Zt(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=f}while(a);Zt(i)}function $r(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function up(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var Ma=Math.random().toString(36).slice(2),tr="__reactFiber$"+Ma,Ao="__reactProps$"+Ma,yr="__reactContainer$"+Ma,Ru="__reactEvents$"+Ma,ev="__reactListeners$"+Ma,tv="__reactHandles$"+Ma;function Us(n){var i=n[tr];if(i)return i;for(var a=n.parentNode;a;){if(i=a[yr]||a[tr]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=up(n);n!==null;){if(a=n[tr])return a;n=up(n)}return i}n=a,a=n.parentNode}return null}function Ro(n){return n=n[tr]||n[yr],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function ba(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function El(n){return n[Ao]||null}var Cu=[],Ea=-1;function Kr(n){return{current:n}}function an(n){0>Ea||(n.current=Cu[Ea],Cu[Ea]=null,Ea--)}function tn(n,i){Ea++,Cu[Ea]=n.current,n.current=i}var Zr={},Bn=Kr(Zr),si=Kr(!1),Os=Zr;function wa(n,i){var a=n.type.contextTypes;if(!a)return Zr;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var f={},g;for(g in a)f[g]=i[g];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=f),f}function ai(n){return n=n.childContextTypes,n!=null}function wl(){an(si),an(Bn)}function dp(n,i,a){if(Bn.current!==Zr)throw Error(t(168));tn(Bn,i),tn(si,a)}function fp(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var f in c)if(!(f in i))throw Error(t(108,ae(n)||"Unknown",f));return ee({},a,c)}function Tl(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Zr,Os=Bn.current,tn(Bn,n),tn(si,si.current),!0}function hp(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=fp(n,i,Os),c.__reactInternalMemoizedMergedChildContext=n,an(si),an(Bn),tn(Bn,n)):an(si),tn(si,a)}var Sr=null,Al=!1,Nu=!1;function pp(n){Sr===null?Sr=[n]:Sr.push(n)}function nv(n){Al=!0,pp(n)}function Jr(){if(!Nu&&Sr!==null){Nu=!0;var n=0,i=ft;try{var a=Sr;for(ft=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}Sr=null,Al=!1}catch(f){throw Sr!==null&&(Sr=Sr.slice(n+1)),gr(Gr,Jr),f}finally{ft=i,Nu=!1}}return null}var Ta=[],Aa=0,Rl=null,Cl=0,Ei=[],wi=0,Fs=null,Mr=1,br="";function ks(n,i){Ta[Aa++]=Cl,Ta[Aa++]=Rl,Rl=n,Cl=i}function mp(n,i,a){Ei[wi++]=Mr,Ei[wi++]=br,Ei[wi++]=Fs,Fs=n;var c=Mr;n=br;var f=32-Le(c)-1;c&=~(1<<f),a+=1;var g=32-Le(i)+f;if(30<g){var T=f-f%5;g=(c&(1<<T)-1).toString(32),c>>=T,f-=T,Mr=1<<32-Le(i)+f|a<<f|c,br=g+n}else Mr=1<<g|a<<f|c,br=n}function Pu(n){n.return!==null&&(ks(n,1),mp(n,1,0))}function Lu(n){for(;n===Rl;)Rl=Ta[--Aa],Ta[Aa]=null,Cl=Ta[--Aa],Ta[Aa]=null;for(;n===Fs;)Fs=Ei[--wi],Ei[wi]=null,br=Ei[--wi],Ei[wi]=null,Mr=Ei[--wi],Ei[wi]=null}var xi=null,vi=null,on=!1,zi=null;function gp(n,i){var a=Ci(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function xp(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,xi=n,vi=$r(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,xi=n,vi=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Fs!==null?{id:Mr,overflow:br}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=Ci(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,xi=n,vi=null,!0):!1;default:return!1}}function Du(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Iu(n){if(on){var i=vi;if(i){var a=i;if(!xp(n,i)){if(Du(n))throw Error(t(418));i=$r(a.nextSibling);var c=xi;i&&xp(n,i)?gp(c,a):(n.flags=n.flags&-4097|2,on=!1,xi=n)}}else{if(Du(n))throw Error(t(418));n.flags=n.flags&-4097|2,on=!1,xi=n}}}function vp(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;xi=n}function Nl(n){if(n!==xi)return!1;if(!on)return vp(n),on=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!wu(n.type,n.memoizedProps)),i&&(i=vi)){if(Du(n))throw _p(),Error(t(418));for(;i;)gp(n,i),i=$r(i.nextSibling)}if(vp(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){vi=$r(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}vi=null}}else vi=xi?$r(n.stateNode.nextSibling):null;return!0}function _p(){for(var n=vi;n;)n=$r(n.nextSibling)}function Ra(){vi=xi=null,on=!1}function Uu(n){zi===null?zi=[n]:zi.push(n)}var iv=R.ReactCurrentBatchConfig;function Co(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var f=c,g=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===g?i.ref:(i=function(T){var k=f.refs;T===null?delete k[g]:k[g]=T},i._stringRef=g,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Pl(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function yp(n){var i=n._init;return i(n._payload)}function Sp(n){function i(se,K){if(n){var le=se.deletions;le===null?(se.deletions=[K],se.flags|=16):le.push(K)}}function a(se,K){if(!n)return null;for(;K!==null;)i(se,K),K=K.sibling;return null}function c(se,K){for(se=new Map;K!==null;)K.key!==null?se.set(K.key,K):se.set(K.index,K),K=K.sibling;return se}function f(se,K){return se=as(se,K),se.index=0,se.sibling=null,se}function g(se,K,le){return se.index=le,n?(le=se.alternate,le!==null?(le=le.index,le<K?(se.flags|=2,K):le):(se.flags|=2,K)):(se.flags|=1048576,K)}function T(se){return n&&se.alternate===null&&(se.flags|=2),se}function k(se,K,le,Ee){return K===null||K.tag!==6?(K=Td(le,se.mode,Ee),K.return=se,K):(K=f(K,le),K.return=se,K)}function j(se,K,le,Ee){var ot=le.type;return ot===B?ye(se,K,le.props.children,Ee,le.key):K!==null&&(K.elementType===ot||typeof ot=="object"&&ot!==null&&ot.$$typeof===ce&&yp(ot)===K.type)?(Ee=f(K,le.props),Ee.ref=Co(se,K,le),Ee.return=se,Ee):(Ee=tc(le.type,le.key,le.props,null,se.mode,Ee),Ee.ref=Co(se,K,le),Ee.return=se,Ee)}function fe(se,K,le,Ee){return K===null||K.tag!==4||K.stateNode.containerInfo!==le.containerInfo||K.stateNode.implementation!==le.implementation?(K=Ad(le,se.mode,Ee),K.return=se,K):(K=f(K,le.children||[]),K.return=se,K)}function ye(se,K,le,Ee,ot){return K===null||K.tag!==7?(K=Xs(le,se.mode,Ee,ot),K.return=se,K):(K=f(K,le),K.return=se,K)}function Me(se,K,le){if(typeof K=="string"&&K!==""||typeof K=="number")return K=Td(""+K,se.mode,le),K.return=se,K;if(typeof K=="object"&&K!==null){switch(K.$$typeof){case P:return le=tc(K.type,K.key,K.props,null,se.mode,le),le.ref=Co(se,null,K),le.return=se,le;case L:return K=Ad(K,se.mode,le),K.return=se,K;case ce:var Ee=K._init;return Me(se,Ee(K._payload),le)}if(kt(K)||W(K))return K=Xs(K,se.mode,le,null),K.return=se,K;Pl(se,K)}return null}function _e(se,K,le,Ee){var ot=K!==null?K.key:null;if(typeof le=="string"&&le!==""||typeof le=="number")return ot!==null?null:k(se,K,""+le,Ee);if(typeof le=="object"&&le!==null){switch(le.$$typeof){case P:return le.key===ot?j(se,K,le,Ee):null;case L:return le.key===ot?fe(se,K,le,Ee):null;case ce:return ot=le._init,_e(se,K,ot(le._payload),Ee)}if(kt(le)||W(le))return ot!==null?null:ye(se,K,le,Ee,null);Pl(se,le)}return null}function Ye(se,K,le,Ee,ot){if(typeof Ee=="string"&&Ee!==""||typeof Ee=="number")return se=se.get(le)||null,k(K,se,""+Ee,ot);if(typeof Ee=="object"&&Ee!==null){switch(Ee.$$typeof){case P:return se=se.get(Ee.key===null?le:Ee.key)||null,j(K,se,Ee,ot);case L:return se=se.get(Ee.key===null?le:Ee.key)||null,fe(K,se,Ee,ot);case ce:var ct=Ee._init;return Ye(se,K,le,ct(Ee._payload),ot)}if(kt(Ee)||W(Ee))return se=se.get(le)||null,ye(K,se,Ee,ot,null);Pl(K,Ee)}return null}function tt(se,K,le,Ee){for(var ot=null,ct=null,ut=K,gt=K=0,Pn=null;ut!==null&&gt<le.length;gt++){ut.index>gt?(Pn=ut,ut=null):Pn=ut.sibling;var Ht=_e(se,ut,le[gt],Ee);if(Ht===null){ut===null&&(ut=Pn);break}n&&ut&&Ht.alternate===null&&i(se,ut),K=g(Ht,K,gt),ct===null?ot=Ht:ct.sibling=Ht,ct=Ht,ut=Pn}if(gt===le.length)return a(se,ut),on&&ks(se,gt),ot;if(ut===null){for(;gt<le.length;gt++)ut=Me(se,le[gt],Ee),ut!==null&&(K=g(ut,K,gt),ct===null?ot=ut:ct.sibling=ut,ct=ut);return on&&ks(se,gt),ot}for(ut=c(se,ut);gt<le.length;gt++)Pn=Ye(ut,se,gt,le[gt],Ee),Pn!==null&&(n&&Pn.alternate!==null&&ut.delete(Pn.key===null?gt:Pn.key),K=g(Pn,K,gt),ct===null?ot=Pn:ct.sibling=Pn,ct=Pn);return n&&ut.forEach(function(os){return i(se,os)}),on&&ks(se,gt),ot}function st(se,K,le,Ee){var ot=W(le);if(typeof ot!="function")throw Error(t(150));if(le=ot.call(le),le==null)throw Error(t(151));for(var ct=ot=null,ut=K,gt=K=0,Pn=null,Ht=le.next();ut!==null&&!Ht.done;gt++,Ht=le.next()){ut.index>gt?(Pn=ut,ut=null):Pn=ut.sibling;var os=_e(se,ut,Ht.value,Ee);if(os===null){ut===null&&(ut=Pn);break}n&&ut&&os.alternate===null&&i(se,ut),K=g(os,K,gt),ct===null?ot=os:ct.sibling=os,ct=os,ut=Pn}if(Ht.done)return a(se,ut),on&&ks(se,gt),ot;if(ut===null){for(;!Ht.done;gt++,Ht=le.next())Ht=Me(se,Ht.value,Ee),Ht!==null&&(K=g(Ht,K,gt),ct===null?ot=Ht:ct.sibling=Ht,ct=Ht);return on&&ks(se,gt),ot}for(ut=c(se,ut);!Ht.done;gt++,Ht=le.next())Ht=Ye(ut,se,gt,Ht.value,Ee),Ht!==null&&(n&&Ht.alternate!==null&&ut.delete(Ht.key===null?gt:Ht.key),K=g(Ht,K,gt),ct===null?ot=Ht:ct.sibling=Ht,ct=Ht);return n&&ut.forEach(function(Ov){return i(se,Ov)}),on&&ks(se,gt),ot}function xn(se,K,le,Ee){if(typeof le=="object"&&le!==null&&le.type===B&&le.key===null&&(le=le.props.children),typeof le=="object"&&le!==null){switch(le.$$typeof){case P:e:{for(var ot=le.key,ct=K;ct!==null;){if(ct.key===ot){if(ot=le.type,ot===B){if(ct.tag===7){a(se,ct.sibling),K=f(ct,le.props.children),K.return=se,se=K;break e}}else if(ct.elementType===ot||typeof ot=="object"&&ot!==null&&ot.$$typeof===ce&&yp(ot)===ct.type){a(se,ct.sibling),K=f(ct,le.props),K.ref=Co(se,ct,le),K.return=se,se=K;break e}a(se,ct);break}else i(se,ct);ct=ct.sibling}le.type===B?(K=Xs(le.props.children,se.mode,Ee,le.key),K.return=se,se=K):(Ee=tc(le.type,le.key,le.props,null,se.mode,Ee),Ee.ref=Co(se,K,le),Ee.return=se,se=Ee)}return T(se);case L:e:{for(ct=le.key;K!==null;){if(K.key===ct)if(K.tag===4&&K.stateNode.containerInfo===le.containerInfo&&K.stateNode.implementation===le.implementation){a(se,K.sibling),K=f(K,le.children||[]),K.return=se,se=K;break e}else{a(se,K);break}else i(se,K);K=K.sibling}K=Ad(le,se.mode,Ee),K.return=se,se=K}return T(se);case ce:return ct=le._init,xn(se,K,ct(le._payload),Ee)}if(kt(le))return tt(se,K,le,Ee);if(W(le))return st(se,K,le,Ee);Pl(se,le)}return typeof le=="string"&&le!==""||typeof le=="number"?(le=""+le,K!==null&&K.tag===6?(a(se,K.sibling),K=f(K,le),K.return=se,se=K):(a(se,K),K=Td(le,se.mode,Ee),K.return=se,se=K),T(se)):a(se,K)}return xn}var Ca=Sp(!0),Mp=Sp(!1),Ll=Kr(null),Dl=null,Na=null,Ou=null;function Fu(){Ou=Na=Dl=null}function ku(n){var i=Ll.current;an(Ll),n._currentValue=i}function Bu(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function Pa(n,i){Dl=n,Ou=Na=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(oi=!0),n.firstContext=null)}function Ti(n){var i=n._currentValue;if(Ou!==n)if(n={context:n,memoizedValue:i,next:null},Na===null){if(Dl===null)throw Error(t(308));Na=n,Dl.dependencies={lanes:0,firstContext:n}}else Na=Na.next=n;return i}var Bs=null;function zu(n){Bs===null?Bs=[n]:Bs.push(n)}function bp(n,i,a,c){var f=i.interleaved;return f===null?(a.next=a,zu(i)):(a.next=f.next,f.next=a),i.interleaved=a,Er(n,c)}function Er(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var Qr=!1;function Vu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ep(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function wr(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function es(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(Bt&2)!==0){var f=c.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),c.pending=i,Er(n,a)}return f=c.interleaved,f===null?(i.next=i,zu(c)):(i.next=f.next,f.next=i),c.interleaved=i,Er(n,a)}function Il(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,Sn(n,a)}}function wp(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var f=null,g=null;if(a=a.firstBaseUpdate,a!==null){do{var T={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};g===null?f=g=T:g=g.next=T,a=a.next}while(a!==null);g===null?f=g=i:g=g.next=i}else f=g=i;a={baseState:c.baseState,firstBaseUpdate:f,lastBaseUpdate:g,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Ul(n,i,a,c){var f=n.updateQueue;Qr=!1;var g=f.firstBaseUpdate,T=f.lastBaseUpdate,k=f.shared.pending;if(k!==null){f.shared.pending=null;var j=k,fe=j.next;j.next=null,T===null?g=fe:T.next=fe,T=j;var ye=n.alternate;ye!==null&&(ye=ye.updateQueue,k=ye.lastBaseUpdate,k!==T&&(k===null?ye.firstBaseUpdate=fe:k.next=fe,ye.lastBaseUpdate=j))}if(g!==null){var Me=f.baseState;T=0,ye=fe=j=null,k=g;do{var _e=k.lane,Ye=k.eventTime;if((c&_e)===_e){ye!==null&&(ye=ye.next={eventTime:Ye,lane:0,tag:k.tag,payload:k.payload,callback:k.callback,next:null});e:{var tt=n,st=k;switch(_e=i,Ye=a,st.tag){case 1:if(tt=st.payload,typeof tt=="function"){Me=tt.call(Ye,Me,_e);break e}Me=tt;break e;case 3:tt.flags=tt.flags&-65537|128;case 0:if(tt=st.payload,_e=typeof tt=="function"?tt.call(Ye,Me,_e):tt,_e==null)break e;Me=ee({},Me,_e);break e;case 2:Qr=!0}}k.callback!==null&&k.lane!==0&&(n.flags|=64,_e=f.effects,_e===null?f.effects=[k]:_e.push(k))}else Ye={eventTime:Ye,lane:_e,tag:k.tag,payload:k.payload,callback:k.callback,next:null},ye===null?(fe=ye=Ye,j=Me):ye=ye.next=Ye,T|=_e;if(k=k.next,k===null){if(k=f.shared.pending,k===null)break;_e=k,k=_e.next,_e.next=null,f.lastBaseUpdate=_e,f.shared.pending=null}}while(!0);if(ye===null&&(j=Me),f.baseState=j,f.firstBaseUpdate=fe,f.lastBaseUpdate=ye,i=f.shared.interleaved,i!==null){f=i;do T|=f.lane,f=f.next;while(f!==i)}else g===null&&(f.shared.lanes=0);Gs|=T,n.lanes=T,n.memoizedState=Me}}function Tp(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],f=c.callback;if(f!==null){if(c.callback=null,c=a,typeof f!="function")throw Error(t(191,f));f.call(c)}}}var No={},nr=Kr(No),Po=Kr(No),Lo=Kr(No);function zs(n){if(n===No)throw Error(t(174));return n}function Gu(n,i){switch(tn(Lo,i),tn(Po,n),tn(nr,No),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:E(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=E(i,n)}an(nr),tn(nr,i)}function La(){an(nr),an(Po),an(Lo)}function Ap(n){zs(Lo.current);var i=zs(nr.current),a=E(i,n.type);i!==a&&(tn(Po,n),tn(nr,a))}function Hu(n){Po.current===n&&(an(nr),an(Po))}var un=Kr(0);function Ol(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ju=[];function Wu(){for(var n=0;n<ju.length;n++)ju[n]._workInProgressVersionPrimary=null;ju.length=0}var Fl=R.ReactCurrentDispatcher,Xu=R.ReactCurrentBatchConfig,Vs=0,dn=null,Mn=null,Cn=null,kl=!1,Do=!1,Io=0,rv=0;function zn(){throw Error(t(321))}function Yu(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!Bi(n[a],i[a]))return!1;return!0}function qu(n,i,a,c,f,g){if(Vs=g,dn=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Fl.current=n===null||n.memoizedState===null?lv:cv,n=a(c,f),Do){g=0;do{if(Do=!1,Io=0,25<=g)throw Error(t(301));g+=1,Cn=Mn=null,i.updateQueue=null,Fl.current=uv,n=a(c,f)}while(Do)}if(Fl.current=Vl,i=Mn!==null&&Mn.next!==null,Vs=0,Cn=Mn=dn=null,kl=!1,i)throw Error(t(300));return n}function $u(){var n=Io!==0;return Io=0,n}function ir(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Cn===null?dn.memoizedState=Cn=n:Cn=Cn.next=n,Cn}function Ai(){if(Mn===null){var n=dn.alternate;n=n!==null?n.memoizedState:null}else n=Mn.next;var i=Cn===null?dn.memoizedState:Cn.next;if(i!==null)Cn=i,Mn=n;else{if(n===null)throw Error(t(310));Mn=n,n={memoizedState:Mn.memoizedState,baseState:Mn.baseState,baseQueue:Mn.baseQueue,queue:Mn.queue,next:null},Cn===null?dn.memoizedState=Cn=n:Cn=Cn.next=n}return Cn}function Uo(n,i){return typeof i=="function"?i(n):i}function Ku(n){var i=Ai(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=Mn,f=c.baseQueue,g=a.pending;if(g!==null){if(f!==null){var T=f.next;f.next=g.next,g.next=T}c.baseQueue=f=g,a.pending=null}if(f!==null){g=f.next,c=c.baseState;var k=T=null,j=null,fe=g;do{var ye=fe.lane;if((Vs&ye)===ye)j!==null&&(j=j.next={lane:0,action:fe.action,hasEagerState:fe.hasEagerState,eagerState:fe.eagerState,next:null}),c=fe.hasEagerState?fe.eagerState:n(c,fe.action);else{var Me={lane:ye,action:fe.action,hasEagerState:fe.hasEagerState,eagerState:fe.eagerState,next:null};j===null?(k=j=Me,T=c):j=j.next=Me,dn.lanes|=ye,Gs|=ye}fe=fe.next}while(fe!==null&&fe!==g);j===null?T=c:j.next=k,Bi(c,i.memoizedState)||(oi=!0),i.memoizedState=c,i.baseState=T,i.baseQueue=j,a.lastRenderedState=c}if(n=a.interleaved,n!==null){f=n;do g=f.lane,dn.lanes|=g,Gs|=g,f=f.next;while(f!==n)}else f===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function Zu(n){var i=Ai(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,f=a.pending,g=i.memoizedState;if(f!==null){a.pending=null;var T=f=f.next;do g=n(g,T.action),T=T.next;while(T!==f);Bi(g,i.memoizedState)||(oi=!0),i.memoizedState=g,i.baseQueue===null&&(i.baseState=g),a.lastRenderedState=g}return[g,c]}function Rp(){}function Cp(n,i){var a=dn,c=Ai(),f=i(),g=!Bi(c.memoizedState,f);if(g&&(c.memoizedState=f,oi=!0),c=c.queue,Ju(Lp.bind(null,a,c,n),[n]),c.getSnapshot!==i||g||Cn!==null&&Cn.memoizedState.tag&1){if(a.flags|=2048,Oo(9,Pp.bind(null,a,c,f,i),void 0,null),Nn===null)throw Error(t(349));(Vs&30)!==0||Np(a,i,f)}return f}function Np(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=dn.updateQueue,i===null?(i={lastEffect:null,stores:null},dn.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function Pp(n,i,a,c){i.value=a,i.getSnapshot=c,Dp(i)&&Ip(n)}function Lp(n,i,a){return a(function(){Dp(i)&&Ip(n)})}function Dp(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!Bi(n,a)}catch{return!0}}function Ip(n){var i=Er(n,1);i!==null&&ji(i,n,1,-1)}function Up(n){var i=ir();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Uo,lastRenderedState:n},i.queue=n,n=n.dispatch=ov.bind(null,dn,n),[i.memoizedState,n]}function Oo(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=dn.updateQueue,i===null?(i={lastEffect:null,stores:null},dn.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function Op(){return Ai().memoizedState}function Bl(n,i,a,c){var f=ir();dn.flags|=n,f.memoizedState=Oo(1|i,a,void 0,c===void 0?null:c)}function zl(n,i,a,c){var f=Ai();c=c===void 0?null:c;var g=void 0;if(Mn!==null){var T=Mn.memoizedState;if(g=T.destroy,c!==null&&Yu(c,T.deps)){f.memoizedState=Oo(i,a,g,c);return}}dn.flags|=n,f.memoizedState=Oo(1|i,a,g,c)}function Fp(n,i){return Bl(8390656,8,n,i)}function Ju(n,i){return zl(2048,8,n,i)}function kp(n,i){return zl(4,2,n,i)}function Bp(n,i){return zl(4,4,n,i)}function zp(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function Vp(n,i,a){return a=a!=null?a.concat([n]):null,zl(4,4,zp.bind(null,i,n),a)}function Qu(){}function Gp(n,i){var a=Ai();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&Yu(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function Hp(n,i){var a=Ai();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&Yu(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function jp(n,i,a){return(Vs&21)===0?(n.baseState&&(n.baseState=!1,oi=!0),n.memoizedState=a):(Bi(a,i)||(a=cn(),dn.lanes|=a,Gs|=a,n.baseState=!0),i)}function sv(n,i){var a=ft;ft=a!==0&&4>a?a:4,n(!0);var c=Xu.transition;Xu.transition={};try{n(!1),i()}finally{ft=a,Xu.transition=c}}function Wp(){return Ai().memoizedState}function av(n,i,a){var c=rs(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},Xp(n))Yp(i,a);else if(a=bp(n,i,a,c),a!==null){var f=Qn();ji(a,n,c,f),qp(a,i,c)}}function ov(n,i,a){var c=rs(n),f={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(Xp(n))Yp(i,f);else{var g=n.alternate;if(n.lanes===0&&(g===null||g.lanes===0)&&(g=i.lastRenderedReducer,g!==null))try{var T=i.lastRenderedState,k=g(T,a);if(f.hasEagerState=!0,f.eagerState=k,Bi(k,T)){var j=i.interleaved;j===null?(f.next=f,zu(i)):(f.next=j.next,j.next=f),i.interleaved=f;return}}catch{}finally{}a=bp(n,i,f,c),a!==null&&(f=Qn(),ji(a,n,c,f),qp(a,i,c))}}function Xp(n){var i=n.alternate;return n===dn||i!==null&&i===dn}function Yp(n,i){Do=kl=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function qp(n,i,a){if((a&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,Sn(n,a)}}var Vl={readContext:Ti,useCallback:zn,useContext:zn,useEffect:zn,useImperativeHandle:zn,useInsertionEffect:zn,useLayoutEffect:zn,useMemo:zn,useReducer:zn,useRef:zn,useState:zn,useDebugValue:zn,useDeferredValue:zn,useTransition:zn,useMutableSource:zn,useSyncExternalStore:zn,useId:zn,unstable_isNewReconciler:!1},lv={readContext:Ti,useCallback:function(n,i){return ir().memoizedState=[n,i===void 0?null:i],n},useContext:Ti,useEffect:Fp,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,Bl(4194308,4,zp.bind(null,i,n),a)},useLayoutEffect:function(n,i){return Bl(4194308,4,n,i)},useInsertionEffect:function(n,i){return Bl(4,2,n,i)},useMemo:function(n,i){var a=ir();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=ir();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=av.bind(null,dn,n),[c.memoizedState,n]},useRef:function(n){var i=ir();return n={current:n},i.memoizedState=n},useState:Up,useDebugValue:Qu,useDeferredValue:function(n){return ir().memoizedState=n},useTransition:function(){var n=Up(!1),i=n[0];return n=sv.bind(null,n[1]),ir().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=dn,f=ir();if(on){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),Nn===null)throw Error(t(349));(Vs&30)!==0||Np(c,i,a)}f.memoizedState=a;var g={value:a,getSnapshot:i};return f.queue=g,Fp(Lp.bind(null,c,g,n),[n]),c.flags|=2048,Oo(9,Pp.bind(null,c,g,a,i),void 0,null),a},useId:function(){var n=ir(),i=Nn.identifierPrefix;if(on){var a=br,c=Mr;a=(c&~(1<<32-Le(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=Io++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=rv++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},cv={readContext:Ti,useCallback:Gp,useContext:Ti,useEffect:Ju,useImperativeHandle:Vp,useInsertionEffect:kp,useLayoutEffect:Bp,useMemo:Hp,useReducer:Ku,useRef:Op,useState:function(){return Ku(Uo)},useDebugValue:Qu,useDeferredValue:function(n){var i=Ai();return jp(i,Mn.memoizedState,n)},useTransition:function(){var n=Ku(Uo)[0],i=Ai().memoizedState;return[n,i]},useMutableSource:Rp,useSyncExternalStore:Cp,useId:Wp,unstable_isNewReconciler:!1},uv={readContext:Ti,useCallback:Gp,useContext:Ti,useEffect:Ju,useImperativeHandle:Vp,useInsertionEffect:kp,useLayoutEffect:Bp,useMemo:Hp,useReducer:Zu,useRef:Op,useState:function(){return Zu(Uo)},useDebugValue:Qu,useDeferredValue:function(n){var i=Ai();return Mn===null?i.memoizedState=n:jp(i,Mn.memoizedState,n)},useTransition:function(){var n=Zu(Uo)[0],i=Ai().memoizedState;return[n,i]},useMutableSource:Rp,useSyncExternalStore:Cp,useId:Wp,unstable_isNewReconciler:!1};function Vi(n,i){if(n&&n.defaultProps){i=ee({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function ed(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:ee({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var Gl={isMounted:function(n){return(n=n._reactInternals)?Rn(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=Qn(),f=rs(n),g=wr(c,f);g.payload=i,a!=null&&(g.callback=a),i=es(n,g,f),i!==null&&(ji(i,n,f,c),Il(i,n,f))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=Qn(),f=rs(n),g=wr(c,f);g.tag=1,g.payload=i,a!=null&&(g.callback=a),i=es(n,g,f),i!==null&&(ji(i,n,f,c),Il(i,n,f))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=Qn(),c=rs(n),f=wr(a,c);f.tag=2,i!=null&&(f.callback=i),i=es(n,f,c),i!==null&&(ji(i,n,c,a),Il(i,n,c))}};function $p(n,i,a,c,f,g,T){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,g,T):i.prototype&&i.prototype.isPureReactComponent?!Mo(a,c)||!Mo(f,g):!0}function Kp(n,i,a){var c=!1,f=Zr,g=i.contextType;return typeof g=="object"&&g!==null?g=Ti(g):(f=ai(i)?Os:Bn.current,c=i.contextTypes,g=(c=c!=null)?wa(n,f):Zr),i=new i(a,g),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Gl,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=f,n.__reactInternalMemoizedMaskedChildContext=g),i}function Zp(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&Gl.enqueueReplaceState(i,i.state,null)}function td(n,i,a,c){var f=n.stateNode;f.props=a,f.state=n.memoizedState,f.refs={},Vu(n);var g=i.contextType;typeof g=="object"&&g!==null?f.context=Ti(g):(g=ai(i)?Os:Bn.current,f.context=wa(n,g)),f.state=n.memoizedState,g=i.getDerivedStateFromProps,typeof g=="function"&&(ed(n,i,g,a),f.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(i=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),i!==f.state&&Gl.enqueueReplaceState(f,f.state,null),Ul(n,a,f,c),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308)}function Da(n,i){try{var a="",c=i;do a+=Ve(c),c=c.return;while(c);var f=a}catch(g){f=`
Error generating stack: `+g.message+`
`+g.stack}return{value:n,source:i,stack:f,digest:null}}function nd(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function id(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var dv=typeof WeakMap=="function"?WeakMap:Map;function Jp(n,i,a){a=wr(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){$l||($l=!0,vd=c),id(n,i)},a}function Qp(n,i,a){a=wr(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var f=i.value;a.payload=function(){return c(f)},a.callback=function(){id(n,i)}}var g=n.stateNode;return g!==null&&typeof g.componentDidCatch=="function"&&(a.callback=function(){id(n,i),typeof c!="function"&&(ns===null?ns=new Set([this]):ns.add(this));var T=i.stack;this.componentDidCatch(i.value,{componentStack:T!==null?T:""})}),a}function em(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new dv;var f=new Set;c.set(i,f)}else f=c.get(i),f===void 0&&(f=new Set,c.set(i,f));f.has(a)||(f.add(a),n=wv.bind(null,n,i,a),i.then(n,n))}function tm(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function nm(n,i,a,c,f){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=wr(-1,1),i.tag=2,es(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=f,n)}var fv=R.ReactCurrentOwner,oi=!1;function Jn(n,i,a,c){i.child=n===null?Mp(i,null,a,c):Ca(i,n.child,a,c)}function im(n,i,a,c,f){a=a.render;var g=i.ref;return Pa(i,f),c=qu(n,i,a,c,g,f),a=$u(),n!==null&&!oi?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~f,Tr(n,i,f)):(on&&a&&Pu(i),i.flags|=1,Jn(n,i,c,f),i.child)}function rm(n,i,a,c,f){if(n===null){var g=a.type;return typeof g=="function"&&!wd(g)&&g.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=g,sm(n,i,g,c,f)):(n=tc(a.type,null,c,i,i.mode,f),n.ref=i.ref,n.return=i,i.child=n)}if(g=n.child,(n.lanes&f)===0){var T=g.memoizedProps;if(a=a.compare,a=a!==null?a:Mo,a(T,c)&&n.ref===i.ref)return Tr(n,i,f)}return i.flags|=1,n=as(g,c),n.ref=i.ref,n.return=i,i.child=n}function sm(n,i,a,c,f){if(n!==null){var g=n.memoizedProps;if(Mo(g,c)&&n.ref===i.ref)if(oi=!1,i.pendingProps=c=g,(n.lanes&f)!==0)(n.flags&131072)!==0&&(oi=!0);else return i.lanes=n.lanes,Tr(n,i,f)}return rd(n,i,a,c,f)}function am(n,i,a){var c=i.pendingProps,f=c.children,g=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},tn(Ua,_i),_i|=a;else{if((a&1073741824)===0)return n=g!==null?g.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,tn(Ua,_i),_i|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=g!==null?g.baseLanes:a,tn(Ua,_i),_i|=c}else g!==null?(c=g.baseLanes|a,i.memoizedState=null):c=a,tn(Ua,_i),_i|=c;return Jn(n,i,f,a),i.child}function om(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function rd(n,i,a,c,f){var g=ai(a)?Os:Bn.current;return g=wa(i,g),Pa(i,f),a=qu(n,i,a,c,g,f),c=$u(),n!==null&&!oi?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~f,Tr(n,i,f)):(on&&c&&Pu(i),i.flags|=1,Jn(n,i,a,f),i.child)}function lm(n,i,a,c,f){if(ai(a)){var g=!0;Tl(i)}else g=!1;if(Pa(i,f),i.stateNode===null)jl(n,i),Kp(i,a,c),td(i,a,c,f),c=!0;else if(n===null){var T=i.stateNode,k=i.memoizedProps;T.props=k;var j=T.context,fe=a.contextType;typeof fe=="object"&&fe!==null?fe=Ti(fe):(fe=ai(a)?Os:Bn.current,fe=wa(i,fe));var ye=a.getDerivedStateFromProps,Me=typeof ye=="function"||typeof T.getSnapshotBeforeUpdate=="function";Me||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(k!==c||j!==fe)&&Zp(i,T,c,fe),Qr=!1;var _e=i.memoizedState;T.state=_e,Ul(i,c,T,f),j=i.memoizedState,k!==c||_e!==j||si.current||Qr?(typeof ye=="function"&&(ed(i,a,ye,c),j=i.memoizedState),(k=Qr||$p(i,a,k,c,_e,j,fe))?(Me||typeof T.UNSAFE_componentWillMount!="function"&&typeof T.componentWillMount!="function"||(typeof T.componentWillMount=="function"&&T.componentWillMount(),typeof T.UNSAFE_componentWillMount=="function"&&T.UNSAFE_componentWillMount()),typeof T.componentDidMount=="function"&&(i.flags|=4194308)):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=j),T.props=c,T.state=j,T.context=fe,c=k):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{T=i.stateNode,Ep(n,i),k=i.memoizedProps,fe=i.type===i.elementType?k:Vi(i.type,k),T.props=fe,Me=i.pendingProps,_e=T.context,j=a.contextType,typeof j=="object"&&j!==null?j=Ti(j):(j=ai(a)?Os:Bn.current,j=wa(i,j));var Ye=a.getDerivedStateFromProps;(ye=typeof Ye=="function"||typeof T.getSnapshotBeforeUpdate=="function")||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(k!==Me||_e!==j)&&Zp(i,T,c,j),Qr=!1,_e=i.memoizedState,T.state=_e,Ul(i,c,T,f);var tt=i.memoizedState;k!==Me||_e!==tt||si.current||Qr?(typeof Ye=="function"&&(ed(i,a,Ye,c),tt=i.memoizedState),(fe=Qr||$p(i,a,fe,c,_e,tt,j)||!1)?(ye||typeof T.UNSAFE_componentWillUpdate!="function"&&typeof T.componentWillUpdate!="function"||(typeof T.componentWillUpdate=="function"&&T.componentWillUpdate(c,tt,j),typeof T.UNSAFE_componentWillUpdate=="function"&&T.UNSAFE_componentWillUpdate(c,tt,j)),typeof T.componentDidUpdate=="function"&&(i.flags|=4),typeof T.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof T.componentDidUpdate!="function"||k===n.memoizedProps&&_e===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||k===n.memoizedProps&&_e===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=tt),T.props=c,T.state=tt,T.context=j,c=fe):(typeof T.componentDidUpdate!="function"||k===n.memoizedProps&&_e===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||k===n.memoizedProps&&_e===n.memoizedState||(i.flags|=1024),c=!1)}return sd(n,i,a,c,g,f)}function sd(n,i,a,c,f,g){om(n,i);var T=(i.flags&128)!==0;if(!c&&!T)return f&&hp(i,a,!1),Tr(n,i,g);c=i.stateNode,fv.current=i;var k=T&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&T?(i.child=Ca(i,n.child,null,g),i.child=Ca(i,null,k,g)):Jn(n,i,k,g),i.memoizedState=c.state,f&&hp(i,a,!0),i.child}function cm(n){var i=n.stateNode;i.pendingContext?dp(n,i.pendingContext,i.pendingContext!==i.context):i.context&&dp(n,i.context,!1),Gu(n,i.containerInfo)}function um(n,i,a,c,f){return Ra(),Uu(f),i.flags|=256,Jn(n,i,a,c),i.child}var ad={dehydrated:null,treeContext:null,retryLane:0};function od(n){return{baseLanes:n,cachePool:null,transitions:null}}function dm(n,i,a){var c=i.pendingProps,f=un.current,g=!1,T=(i.flags&128)!==0,k;if((k=T)||(k=n!==null&&n.memoizedState===null?!1:(f&2)!==0),k?(g=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(f|=1),tn(un,f&1),n===null)return Iu(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(T=c.children,n=c.fallback,g?(c=i.mode,g=i.child,T={mode:"hidden",children:T},(c&1)===0&&g!==null?(g.childLanes=0,g.pendingProps=T):g=nc(T,c,0,null),n=Xs(n,c,a,null),g.return=i,n.return=i,g.sibling=n,i.child=g,i.child.memoizedState=od(a),i.memoizedState=ad,n):ld(i,T));if(f=n.memoizedState,f!==null&&(k=f.dehydrated,k!==null))return hv(n,i,T,c,k,f,a);if(g){g=c.fallback,T=i.mode,f=n.child,k=f.sibling;var j={mode:"hidden",children:c.children};return(T&1)===0&&i.child!==f?(c=i.child,c.childLanes=0,c.pendingProps=j,i.deletions=null):(c=as(f,j),c.subtreeFlags=f.subtreeFlags&14680064),k!==null?g=as(k,g):(g=Xs(g,T,a,null),g.flags|=2),g.return=i,c.return=i,c.sibling=g,i.child=c,c=g,g=i.child,T=n.child.memoizedState,T=T===null?od(a):{baseLanes:T.baseLanes|a,cachePool:null,transitions:T.transitions},g.memoizedState=T,g.childLanes=n.childLanes&~a,i.memoizedState=ad,c}return g=n.child,n=g.sibling,c=as(g,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function ld(n,i){return i=nc({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function Hl(n,i,a,c){return c!==null&&Uu(c),Ca(i,n.child,null,a),n=ld(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function hv(n,i,a,c,f,g,T){if(a)return i.flags&256?(i.flags&=-257,c=nd(Error(t(422))),Hl(n,i,T,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(g=c.fallback,f=i.mode,c=nc({mode:"visible",children:c.children},f,0,null),g=Xs(g,f,T,null),g.flags|=2,c.return=i,g.return=i,c.sibling=g,i.child=c,(i.mode&1)!==0&&Ca(i,n.child,null,T),i.child.memoizedState=od(T),i.memoizedState=ad,g);if((i.mode&1)===0)return Hl(n,i,T,null);if(f.data==="$!"){if(c=f.nextSibling&&f.nextSibling.dataset,c)var k=c.dgst;return c=k,g=Error(t(419)),c=nd(g,c,void 0),Hl(n,i,T,c)}if(k=(T&n.childLanes)!==0,oi||k){if(c=Nn,c!==null){switch(T&-T){case 4:f=2;break;case 16:f=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:f=32;break;case 536870912:f=268435456;break;default:f=0}f=(f&(c.suspendedLanes|T))!==0?0:f,f!==0&&f!==g.retryLane&&(g.retryLane=f,Er(n,f),ji(c,n,f,-1))}return Ed(),c=nd(Error(t(421))),Hl(n,i,T,c)}return f.data==="$?"?(i.flags|=128,i.child=n.child,i=Tv.bind(null,n),f._reactRetry=i,null):(n=g.treeContext,vi=$r(f.nextSibling),xi=i,on=!0,zi=null,n!==null&&(Ei[wi++]=Mr,Ei[wi++]=br,Ei[wi++]=Fs,Mr=n.id,br=n.overflow,Fs=i),i=ld(i,c.children),i.flags|=4096,i)}function fm(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),Bu(n.return,i,a)}function cd(n,i,a,c,f){var g=n.memoizedState;g===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:f}:(g.isBackwards=i,g.rendering=null,g.renderingStartTime=0,g.last=c,g.tail=a,g.tailMode=f)}function hm(n,i,a){var c=i.pendingProps,f=c.revealOrder,g=c.tail;if(Jn(n,i,c.children,a),c=un.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&fm(n,a,i);else if(n.tag===19)fm(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(tn(un,c),(i.mode&1)===0)i.memoizedState=null;else switch(f){case"forwards":for(a=i.child,f=null;a!==null;)n=a.alternate,n!==null&&Ol(n)===null&&(f=a),a=a.sibling;a=f,a===null?(f=i.child,i.child=null):(f=a.sibling,a.sibling=null),cd(i,!1,f,a,g);break;case"backwards":for(a=null,f=i.child,i.child=null;f!==null;){if(n=f.alternate,n!==null&&Ol(n)===null){i.child=f;break}n=f.sibling,f.sibling=a,a=f,f=n}cd(i,!0,a,null,g);break;case"together":cd(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function jl(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Tr(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),Gs|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=as(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=as(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function pv(n,i,a){switch(i.tag){case 3:cm(i),Ra();break;case 5:Ap(i);break;case 1:ai(i.type)&&Tl(i);break;case 4:Gu(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,f=i.memoizedProps.value;tn(Ll,c._currentValue),c._currentValue=f;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(tn(un,un.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?dm(n,i,a):(tn(un,un.current&1),n=Tr(n,i,a),n!==null?n.sibling:null);tn(un,un.current&1);break;case 19:if(c=(a&i.childLanes)!==0,(n.flags&128)!==0){if(c)return hm(n,i,a);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),tn(un,un.current),c)break;return null;case 22:case 23:return i.lanes=0,am(n,i,a)}return Tr(n,i,a)}var pm,ud,mm,gm;pm=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},ud=function(){},mm=function(n,i,a,c){var f=n.memoizedProps;if(f!==c){n=i.stateNode,zs(nr.current);var g=null;switch(a){case"input":f=Ae(n,f),c=Ae(n,c),g=[];break;case"select":f=ee({},f,{value:void 0}),c=ee({},c,{value:void 0}),g=[];break;case"textarea":f=jt(n,f),c=jt(n,c),g=[];break;default:typeof f.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=bl)}nt(a,c);var T;a=null;for(fe in f)if(!c.hasOwnProperty(fe)&&f.hasOwnProperty(fe)&&f[fe]!=null)if(fe==="style"){var k=f[fe];for(T in k)k.hasOwnProperty(T)&&(a||(a={}),a[T]="")}else fe!=="dangerouslySetInnerHTML"&&fe!=="children"&&fe!=="suppressContentEditableWarning"&&fe!=="suppressHydrationWarning"&&fe!=="autoFocus"&&(o.hasOwnProperty(fe)?g||(g=[]):(g=g||[]).push(fe,null));for(fe in c){var j=c[fe];if(k=f!=null?f[fe]:void 0,c.hasOwnProperty(fe)&&j!==k&&(j!=null||k!=null))if(fe==="style")if(k){for(T in k)!k.hasOwnProperty(T)||j&&j.hasOwnProperty(T)||(a||(a={}),a[T]="");for(T in j)j.hasOwnProperty(T)&&k[T]!==j[T]&&(a||(a={}),a[T]=j[T])}else a||(g||(g=[]),g.push(fe,a)),a=j;else fe==="dangerouslySetInnerHTML"?(j=j?j.__html:void 0,k=k?k.__html:void 0,j!=null&&k!==j&&(g=g||[]).push(fe,j)):fe==="children"?typeof j!="string"&&typeof j!="number"||(g=g||[]).push(fe,""+j):fe!=="suppressContentEditableWarning"&&fe!=="suppressHydrationWarning"&&(o.hasOwnProperty(fe)?(j!=null&&fe==="onScroll"&&sn("scroll",n),g||k===j||(g=[])):(g=g||[]).push(fe,j))}a&&(g=g||[]).push("style",a);var fe=g;(i.updateQueue=fe)&&(i.flags|=4)}},gm=function(n,i,a,c){a!==c&&(i.flags|=4)};function Fo(n,i){if(!on)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function Vn(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var f=n.child;f!==null;)a|=f.lanes|f.childLanes,c|=f.subtreeFlags&14680064,c|=f.flags&14680064,f.return=n,f=f.sibling;else for(f=n.child;f!==null;)a|=f.lanes|f.childLanes,c|=f.subtreeFlags,c|=f.flags,f.return=n,f=f.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function mv(n,i,a){var c=i.pendingProps;switch(Lu(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Vn(i),null;case 1:return ai(i.type)&&wl(),Vn(i),null;case 3:return c=i.stateNode,La(),an(si),an(Bn),Wu(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Nl(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,zi!==null&&(Sd(zi),zi=null))),ud(n,i),Vn(i),null;case 5:Hu(i);var f=zs(Lo.current);if(a=i.type,n!==null&&i.stateNode!=null)mm(n,i,a,c,f),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return Vn(i),null}if(n=zs(nr.current),Nl(i)){c=i.stateNode,a=i.type;var g=i.memoizedProps;switch(c[tr]=i,c[Ao]=g,n=(i.mode&1)!==0,a){case"dialog":sn("cancel",c),sn("close",c);break;case"iframe":case"object":case"embed":sn("load",c);break;case"video":case"audio":for(f=0;f<Eo.length;f++)sn(Eo[f],c);break;case"source":sn("error",c);break;case"img":case"image":case"link":sn("error",c),sn("load",c);break;case"details":sn("toggle",c);break;case"input":Oe(c,g),sn("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!g.multiple},sn("invalid",c);break;case"textarea":$(c,g),sn("invalid",c)}nt(a,g),f=null;for(var T in g)if(g.hasOwnProperty(T)){var k=g[T];T==="children"?typeof k=="string"?c.textContent!==k&&(g.suppressHydrationWarning!==!0&&Ml(c.textContent,k,n),f=["children",k]):typeof k=="number"&&c.textContent!==""+k&&(g.suppressHydrationWarning!==!0&&Ml(c.textContent,k,n),f=["children",""+k]):o.hasOwnProperty(T)&&k!=null&&T==="onScroll"&&sn("scroll",c)}switch(a){case"input":je(c),xt(c,g,!0);break;case"textarea":je(c),Ft(c);break;case"select":case"option":break;default:typeof g.onClick=="function"&&(c.onclick=bl)}c=f,i.updateQueue=c,c!==null&&(i.flags|=4)}else{T=f.nodeType===9?f:f.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=U(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=T.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=T.createElement(a,{is:c.is}):(n=T.createElement(a),a==="select"&&(T=n,c.multiple?T.multiple=!0:c.size&&(T.size=c.size))):n=T.createElementNS(n,a),n[tr]=i,n[Ao]=c,pm(n,i,!1,!1),i.stateNode=n;e:{switch(T=Ne(a,c),a){case"dialog":sn("cancel",n),sn("close",n),f=c;break;case"iframe":case"object":case"embed":sn("load",n),f=c;break;case"video":case"audio":for(f=0;f<Eo.length;f++)sn(Eo[f],n);f=c;break;case"source":sn("error",n),f=c;break;case"img":case"image":case"link":sn("error",n),sn("load",n),f=c;break;case"details":sn("toggle",n),f=c;break;case"input":Oe(n,c),f=Ae(n,c),sn("invalid",n);break;case"option":f=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},f=ee({},c,{value:void 0}),sn("invalid",n);break;case"textarea":$(n,c),f=jt(n,c),sn("invalid",n);break;default:f=c}nt(a,f),k=f;for(g in k)if(k.hasOwnProperty(g)){var j=k[g];g==="style"?me(n,j):g==="dangerouslySetInnerHTML"?(j=j?j.__html:void 0,j!=null&&oe(n,j)):g==="children"?typeof j=="string"?(a!=="textarea"||j!=="")&&he(n,j):typeof j=="number"&&he(n,""+j):g!=="suppressContentEditableWarning"&&g!=="suppressHydrationWarning"&&g!=="autoFocus"&&(o.hasOwnProperty(g)?j!=null&&g==="onScroll"&&sn("scroll",n):j!=null&&z(n,g,j,T))}switch(a){case"input":je(n),xt(n,c,!1);break;case"textarea":je(n),Ft(n);break;case"option":c.value!=null&&n.setAttribute("value",""+de(c.value));break;case"select":n.multiple=!!c.multiple,g=c.value,g!=null?Mt(n,!!c.multiple,g,!1):c.defaultValue!=null&&Mt(n,!!c.multiple,c.defaultValue,!0);break;default:typeof f.onClick=="function"&&(n.onclick=bl)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return Vn(i),null;case 6:if(n&&i.stateNode!=null)gm(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=zs(Lo.current),zs(nr.current),Nl(i)){if(c=i.stateNode,a=i.memoizedProps,c[tr]=i,(g=c.nodeValue!==a)&&(n=xi,n!==null))switch(n.tag){case 3:Ml(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ml(c.nodeValue,a,(n.mode&1)!==0)}g&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[tr]=i,i.stateNode=c}return Vn(i),null;case 13:if(an(un),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(on&&vi!==null&&(i.mode&1)!==0&&(i.flags&128)===0)_p(),Ra(),i.flags|=98560,g=!1;else if(g=Nl(i),c!==null&&c.dehydrated!==null){if(n===null){if(!g)throw Error(t(318));if(g=i.memoizedState,g=g!==null?g.dehydrated:null,!g)throw Error(t(317));g[tr]=i}else Ra(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Vn(i),g=!1}else zi!==null&&(Sd(zi),zi=null),g=!0;if(!g)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(un.current&1)!==0?bn===0&&(bn=3):Ed())),i.updateQueue!==null&&(i.flags|=4),Vn(i),null);case 4:return La(),ud(n,i),n===null&&wo(i.stateNode.containerInfo),Vn(i),null;case 10:return ku(i.type._context),Vn(i),null;case 17:return ai(i.type)&&wl(),Vn(i),null;case 19:if(an(un),g=i.memoizedState,g===null)return Vn(i),null;if(c=(i.flags&128)!==0,T=g.rendering,T===null)if(c)Fo(g,!1);else{if(bn!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(T=Ol(n),T!==null){for(i.flags|=128,Fo(g,!1),c=T.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)g=a,n=c,g.flags&=14680066,T=g.alternate,T===null?(g.childLanes=0,g.lanes=n,g.child=null,g.subtreeFlags=0,g.memoizedProps=null,g.memoizedState=null,g.updateQueue=null,g.dependencies=null,g.stateNode=null):(g.childLanes=T.childLanes,g.lanes=T.lanes,g.child=T.child,g.subtreeFlags=0,g.deletions=null,g.memoizedProps=T.memoizedProps,g.memoizedState=T.memoizedState,g.updateQueue=T.updateQueue,g.type=T.type,n=T.dependencies,g.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return tn(un,un.current&1|2),i.child}n=n.sibling}g.tail!==null&&Jt()>Oa&&(i.flags|=128,c=!0,Fo(g,!1),i.lanes=4194304)}else{if(!c)if(n=Ol(T),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),Fo(g,!0),g.tail===null&&g.tailMode==="hidden"&&!T.alternate&&!on)return Vn(i),null}else 2*Jt()-g.renderingStartTime>Oa&&a!==1073741824&&(i.flags|=128,c=!0,Fo(g,!1),i.lanes=4194304);g.isBackwards?(T.sibling=i.child,i.child=T):(a=g.last,a!==null?a.sibling=T:i.child=T,g.last=T)}return g.tail!==null?(i=g.tail,g.rendering=i,g.tail=i.sibling,g.renderingStartTime=Jt(),i.sibling=null,a=un.current,tn(un,c?a&1|2:a&1),i):(Vn(i),null);case 22:case 23:return bd(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(_i&1073741824)!==0&&(Vn(i),i.subtreeFlags&6&&(i.flags|=8192)):Vn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function gv(n,i){switch(Lu(i),i.tag){case 1:return ai(i.type)&&wl(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return La(),an(si),an(Bn),Wu(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Hu(i),null;case 13:if(an(un),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Ra()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return an(un),null;case 4:return La(),null;case 10:return ku(i.type._context),null;case 22:case 23:return bd(),null;case 24:return null;default:return null}}var Wl=!1,Gn=!1,xv=typeof WeakSet=="function"?WeakSet:Set,Je=null;function Ia(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){hn(n,i,c)}else a.current=null}function dd(n,i,a){try{a()}catch(c){hn(n,i,c)}}var xm=!1;function vv(n,i){if(bu=la,n=$h(),mu(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var f=c.anchorOffset,g=c.focusNode;c=c.focusOffset;try{a.nodeType,g.nodeType}catch{a=null;break e}var T=0,k=-1,j=-1,fe=0,ye=0,Me=n,_e=null;t:for(;;){for(var Ye;Me!==a||f!==0&&Me.nodeType!==3||(k=T+f),Me!==g||c!==0&&Me.nodeType!==3||(j=T+c),Me.nodeType===3&&(T+=Me.nodeValue.length),(Ye=Me.firstChild)!==null;)_e=Me,Me=Ye;for(;;){if(Me===n)break t;if(_e===a&&++fe===f&&(k=T),_e===g&&++ye===c&&(j=T),(Ye=Me.nextSibling)!==null)break;Me=_e,_e=Me.parentNode}Me=Ye}a=k===-1||j===-1?null:{start:k,end:j}}else a=null}a=a||{start:0,end:0}}else a=null;for(Eu={focusedElem:n,selectionRange:a},la=!1,Je=i;Je!==null;)if(i=Je,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,Je=n;else for(;Je!==null;){i=Je;try{var tt=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(tt!==null){var st=tt.memoizedProps,xn=tt.memoizedState,se=i.stateNode,K=se.getSnapshotBeforeUpdate(i.elementType===i.type?st:Vi(i.type,st),xn);se.__reactInternalSnapshotBeforeUpdate=K}break;case 3:var le=i.stateNode.containerInfo;le.nodeType===1?le.textContent="":le.nodeType===9&&le.documentElement&&le.removeChild(le.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Ee){hn(i,i.return,Ee)}if(n=i.sibling,n!==null){n.return=i.return,Je=n;break}Je=i.return}return tt=xm,xm=!1,tt}function ko(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var f=c=c.next;do{if((f.tag&n)===n){var g=f.destroy;f.destroy=void 0,g!==void 0&&dd(i,a,g)}f=f.next}while(f!==c)}}function Xl(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function fd(n){var i=n.ref;if(i!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof i=="function"?i(n):i.current=n}}function vm(n){var i=n.alternate;i!==null&&(n.alternate=null,vm(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[tr],delete i[Ao],delete i[Ru],delete i[ev],delete i[tv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function _m(n){return n.tag===5||n.tag===3||n.tag===4}function ym(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||_m(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function hd(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=bl));else if(c!==4&&(n=n.child,n!==null))for(hd(n,i,a),n=n.sibling;n!==null;)hd(n,i,a),n=n.sibling}function pd(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(pd(n,i,a),n=n.sibling;n!==null;)pd(n,i,a),n=n.sibling}var In=null,Gi=!1;function ts(n,i,a){for(a=a.child;a!==null;)Sm(n,i,a),a=a.sibling}function Sm(n,i,a){if(ie&&typeof ie.onCommitFiberUnmount=="function")try{ie.onCommitFiberUnmount(re,a)}catch{}switch(a.tag){case 5:Gn||Ia(a,i);case 6:var c=In,f=Gi;In=null,ts(n,i,a),In=c,Gi=f,In!==null&&(Gi?(n=In,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):In.removeChild(a.stateNode));break;case 18:In!==null&&(Gi?(n=In,a=a.stateNode,n.nodeType===8?Au(n.parentNode,a):n.nodeType===1&&Au(n,a),Zt(n)):Au(In,a.stateNode));break;case 4:c=In,f=Gi,In=a.stateNode.containerInfo,Gi=!0,ts(n,i,a),In=c,Gi=f;break;case 0:case 11:case 14:case 15:if(!Gn&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){f=c=c.next;do{var g=f,T=g.destroy;g=g.tag,T!==void 0&&((g&2)!==0||(g&4)!==0)&&dd(a,i,T),f=f.next}while(f!==c)}ts(n,i,a);break;case 1:if(!Gn&&(Ia(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(k){hn(a,i,k)}ts(n,i,a);break;case 21:ts(n,i,a);break;case 22:a.mode&1?(Gn=(c=Gn)||a.memoizedState!==null,ts(n,i,a),Gn=c):ts(n,i,a);break;default:ts(n,i,a)}}function Mm(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new xv),i.forEach(function(c){var f=Av.bind(null,n,c);a.has(c)||(a.add(c),c.then(f,f))})}}function Hi(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var f=a[c];try{var g=n,T=i,k=T;e:for(;k!==null;){switch(k.tag){case 5:In=k.stateNode,Gi=!1;break e;case 3:In=k.stateNode.containerInfo,Gi=!0;break e;case 4:In=k.stateNode.containerInfo,Gi=!0;break e}k=k.return}if(In===null)throw Error(t(160));Sm(g,T,f),In=null,Gi=!1;var j=f.alternate;j!==null&&(j.return=null),f.return=null}catch(fe){hn(f,i,fe)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)bm(i,n),i=i.sibling}function bm(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Hi(i,n),rr(n),c&4){try{ko(3,n,n.return),Xl(3,n)}catch(st){hn(n,n.return,st)}try{ko(5,n,n.return)}catch(st){hn(n,n.return,st)}}break;case 1:Hi(i,n),rr(n),c&512&&a!==null&&Ia(a,a.return);break;case 5:if(Hi(i,n),rr(n),c&512&&a!==null&&Ia(a,a.return),n.flags&32){var f=n.stateNode;try{he(f,"")}catch(st){hn(n,n.return,st)}}if(c&4&&(f=n.stateNode,f!=null)){var g=n.memoizedProps,T=a!==null?a.memoizedProps:g,k=n.type,j=n.updateQueue;if(n.updateQueue=null,j!==null)try{k==="input"&&g.type==="radio"&&g.name!=null&&Be(f,g),Ne(k,T);var fe=Ne(k,g);for(T=0;T<j.length;T+=2){var ye=j[T],Me=j[T+1];ye==="style"?me(f,Me):ye==="dangerouslySetInnerHTML"?oe(f,Me):ye==="children"?he(f,Me):z(f,ye,Me,fe)}switch(k){case"input":qe(f,g);break;case"textarea":mn(f,g);break;case"select":var _e=f._wrapperState.wasMultiple;f._wrapperState.wasMultiple=!!g.multiple;var Ye=g.value;Ye!=null?Mt(f,!!g.multiple,Ye,!1):_e!==!!g.multiple&&(g.defaultValue!=null?Mt(f,!!g.multiple,g.defaultValue,!0):Mt(f,!!g.multiple,g.multiple?[]:"",!1))}f[Ao]=g}catch(st){hn(n,n.return,st)}}break;case 6:if(Hi(i,n),rr(n),c&4){if(n.stateNode===null)throw Error(t(162));f=n.stateNode,g=n.memoizedProps;try{f.nodeValue=g}catch(st){hn(n,n.return,st)}}break;case 3:if(Hi(i,n),rr(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{Zt(i.containerInfo)}catch(st){hn(n,n.return,st)}break;case 4:Hi(i,n),rr(n);break;case 13:Hi(i,n),rr(n),f=n.child,f.flags&8192&&(g=f.memoizedState!==null,f.stateNode.isHidden=g,!g||f.alternate!==null&&f.alternate.memoizedState!==null||(xd=Jt())),c&4&&Mm(n);break;case 22:if(ye=a!==null&&a.memoizedState!==null,n.mode&1?(Gn=(fe=Gn)||ye,Hi(i,n),Gn=fe):Hi(i,n),rr(n),c&8192){if(fe=n.memoizedState!==null,(n.stateNode.isHidden=fe)&&!ye&&(n.mode&1)!==0)for(Je=n,ye=n.child;ye!==null;){for(Me=Je=ye;Je!==null;){switch(_e=Je,Ye=_e.child,_e.tag){case 0:case 11:case 14:case 15:ko(4,_e,_e.return);break;case 1:Ia(_e,_e.return);var tt=_e.stateNode;if(typeof tt.componentWillUnmount=="function"){c=_e,a=_e.return;try{i=c,tt.props=i.memoizedProps,tt.state=i.memoizedState,tt.componentWillUnmount()}catch(st){hn(c,a,st)}}break;case 5:Ia(_e,_e.return);break;case 22:if(_e.memoizedState!==null){Tm(Me);continue}}Ye!==null?(Ye.return=_e,Je=Ye):Tm(Me)}ye=ye.sibling}e:for(ye=null,Me=n;;){if(Me.tag===5){if(ye===null){ye=Me;try{f=Me.stateNode,fe?(g=f.style,typeof g.setProperty=="function"?g.setProperty("display","none","important"):g.display="none"):(k=Me.stateNode,j=Me.memoizedProps.style,T=j!=null&&j.hasOwnProperty("display")?j.display:null,k.style.display=pe("display",T))}catch(st){hn(n,n.return,st)}}}else if(Me.tag===6){if(ye===null)try{Me.stateNode.nodeValue=fe?"":Me.memoizedProps}catch(st){hn(n,n.return,st)}}else if((Me.tag!==22&&Me.tag!==23||Me.memoizedState===null||Me===n)&&Me.child!==null){Me.child.return=Me,Me=Me.child;continue}if(Me===n)break e;for(;Me.sibling===null;){if(Me.return===null||Me.return===n)break e;ye===Me&&(ye=null),Me=Me.return}ye===Me&&(ye=null),Me.sibling.return=Me.return,Me=Me.sibling}}break;case 19:Hi(i,n),rr(n),c&4&&Mm(n);break;case 21:break;default:Hi(i,n),rr(n)}}function rr(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(_m(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var f=c.stateNode;c.flags&32&&(he(f,""),c.flags&=-33);var g=ym(n);pd(n,g,f);break;case 3:case 4:var T=c.stateNode.containerInfo,k=ym(n);hd(n,k,T);break;default:throw Error(t(161))}}catch(j){hn(n,n.return,j)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function _v(n,i,a){Je=n,Em(n)}function Em(n,i,a){for(var c=(n.mode&1)!==0;Je!==null;){var f=Je,g=f.child;if(f.tag===22&&c){var T=f.memoizedState!==null||Wl;if(!T){var k=f.alternate,j=k!==null&&k.memoizedState!==null||Gn;k=Wl;var fe=Gn;if(Wl=T,(Gn=j)&&!fe)for(Je=f;Je!==null;)T=Je,j=T.child,T.tag===22&&T.memoizedState!==null?Am(f):j!==null?(j.return=T,Je=j):Am(f);for(;g!==null;)Je=g,Em(g),g=g.sibling;Je=f,Wl=k,Gn=fe}wm(n)}else(f.subtreeFlags&8772)!==0&&g!==null?(g.return=f,Je=g):wm(n)}}function wm(n){for(;Je!==null;){var i=Je;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:Gn||Xl(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!Gn)if(a===null)c.componentDidMount();else{var f=i.elementType===i.type?a.memoizedProps:Vi(i.type,a.memoizedProps);c.componentDidUpdate(f,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var g=i.updateQueue;g!==null&&Tp(i,g,c);break;case 3:var T=i.updateQueue;if(T!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}Tp(i,T,a)}break;case 5:var k=i.stateNode;if(a===null&&i.flags&4){a=k;var j=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":j.autoFocus&&a.focus();break;case"img":j.src&&(a.src=j.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var fe=i.alternate;if(fe!==null){var ye=fe.memoizedState;if(ye!==null){var Me=ye.dehydrated;Me!==null&&Zt(Me)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}Gn||i.flags&512&&fd(i)}catch(_e){hn(i,i.return,_e)}}if(i===n){Je=null;break}if(a=i.sibling,a!==null){a.return=i.return,Je=a;break}Je=i.return}}function Tm(n){for(;Je!==null;){var i=Je;if(i===n){Je=null;break}var a=i.sibling;if(a!==null){a.return=i.return,Je=a;break}Je=i.return}}function Am(n){for(;Je!==null;){var i=Je;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{Xl(4,i)}catch(j){hn(i,a,j)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var f=i.return;try{c.componentDidMount()}catch(j){hn(i,f,j)}}var g=i.return;try{fd(i)}catch(j){hn(i,g,j)}break;case 5:var T=i.return;try{fd(i)}catch(j){hn(i,T,j)}}}catch(j){hn(i,i.return,j)}if(i===n){Je=null;break}var k=i.sibling;if(k!==null){k.return=i.return,Je=k;break}Je=i.return}}var yv=Math.ceil,Yl=R.ReactCurrentDispatcher,md=R.ReactCurrentOwner,Ri=R.ReactCurrentBatchConfig,Bt=0,Nn=null,vn=null,Un=0,_i=0,Ua=Kr(0),bn=0,Bo=null,Gs=0,ql=0,gd=0,zo=null,li=null,xd=0,Oa=1/0,Ar=null,$l=!1,vd=null,ns=null,Kl=!1,is=null,Zl=0,Vo=0,_d=null,Jl=-1,Ql=0;function Qn(){return(Bt&6)!==0?Jt():Jl!==-1?Jl:Jl=Jt()}function rs(n){return(n.mode&1)===0?1:(Bt&2)!==0&&Un!==0?Un&-Un:iv.transition!==null?(Ql===0&&(Ql=cn()),Ql):(n=ft,n!==0||(n=window.event,n=n===void 0?16:ul(n.type)),n)}function ji(n,i,a,c){if(50<Vo)throw Vo=0,_d=null,Error(t(185));nn(n,a,c),((Bt&2)===0||n!==Nn)&&(n===Nn&&((Bt&2)===0&&(ql|=a),bn===4&&ss(n,Un)),ci(n,c),a===1&&Bt===0&&(i.mode&1)===0&&(Oa=Jt()+500,Al&&Jr()))}function ci(n,i){var a=n.callbackNode;Xt(n,i);var c=bt(n,n===Nn?Un:0);if(c===0)a!==null&&Ss(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&Ss(a),i===1)n.tag===0?nv(Cm.bind(null,n)):pp(Cm.bind(null,n)),Jx(function(){(Bt&6)===0&&Jr()}),a=null;else{switch(qn(c)){case 1:a=Gr;break;case 4:a=Hr;break;case 16:a=A;break;case 536870912:a=ue;break;default:a=A}a=Fm(a,Rm.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function Rm(n,i){if(Jl=-1,Ql=0,(Bt&6)!==0)throw Error(t(327));var a=n.callbackNode;if(Fa()&&n.callbackNode!==a)return null;var c=bt(n,n===Nn?Un:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=ec(n,c);else{i=c;var f=Bt;Bt|=2;var g=Pm();(Nn!==n||Un!==i)&&(Ar=null,Oa=Jt()+500,js(n,i));do try{bv();break}catch(k){Nm(n,k)}while(!0);Fu(),Yl.current=g,Bt=f,vn!==null?i=0:(Nn=null,Un=0,i=bn)}if(i!==0){if(i===2&&(f=It(n),f!==0&&(c=f,i=yd(n,f))),i===1)throw a=Bo,js(n,0),ss(n,c),ci(n,Jt()),a;if(i===6)ss(n,c);else{if(f=n.current.alternate,(c&30)===0&&!Sv(f)&&(i=ec(n,c),i===2&&(g=It(n),g!==0&&(c=g,i=yd(n,g))),i===1))throw a=Bo,js(n,0),ss(n,c),ci(n,Jt()),a;switch(n.finishedWork=f,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:Ws(n,li,Ar);break;case 3:if(ss(n,c),(c&130023424)===c&&(i=xd+500-Jt(),10<i)){if(bt(n,0)!==0)break;if(f=n.suspendedLanes,(f&c)!==c){Qn(),n.pingedLanes|=n.suspendedLanes&f;break}n.timeoutHandle=Tu(Ws.bind(null,n,li,Ar),i);break}Ws(n,li,Ar);break;case 4:if(ss(n,c),(c&4194240)===c)break;for(i=n.eventTimes,f=-1;0<c;){var T=31-Le(c);g=1<<T,T=i[T],T>f&&(f=T),c&=~g}if(c=f,c=Jt()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*yv(c/1960))-c,10<c){n.timeoutHandle=Tu(Ws.bind(null,n,li,Ar),c);break}Ws(n,li,Ar);break;case 5:Ws(n,li,Ar);break;default:throw Error(t(329))}}}return ci(n,Jt()),n.callbackNode===a?Rm.bind(null,n):null}function yd(n,i){var a=zo;return n.current.memoizedState.isDehydrated&&(js(n,i).flags|=256),n=ec(n,i),n!==2&&(i=li,li=a,i!==null&&Sd(i)),n}function Sd(n){li===null?li=n:li.push.apply(li,n)}function Sv(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var f=a[c],g=f.getSnapshot;f=f.value;try{if(!Bi(g(),f))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function ss(n,i){for(i&=~gd,i&=~ql,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-Le(i),c=1<<a;n[a]=-1,i&=~c}}function Cm(n){if((Bt&6)!==0)throw Error(t(327));Fa();var i=bt(n,0);if((i&1)===0)return ci(n,Jt()),null;var a=ec(n,i);if(n.tag!==0&&a===2){var c=It(n);c!==0&&(i=c,a=yd(n,c))}if(a===1)throw a=Bo,js(n,0),ss(n,i),ci(n,Jt()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,Ws(n,li,Ar),ci(n,Jt()),null}function Md(n,i){var a=Bt;Bt|=1;try{return n(i)}finally{Bt=a,Bt===0&&(Oa=Jt()+500,Al&&Jr())}}function Hs(n){is!==null&&is.tag===0&&(Bt&6)===0&&Fa();var i=Bt;Bt|=1;var a=Ri.transition,c=ft;try{if(Ri.transition=null,ft=1,n)return n()}finally{ft=c,Ri.transition=a,Bt=i,(Bt&6)===0&&Jr()}}function bd(){_i=Ua.current,an(Ua)}function js(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,Zx(a)),vn!==null)for(a=vn.return;a!==null;){var c=a;switch(Lu(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&wl();break;case 3:La(),an(si),an(Bn),Wu();break;case 5:Hu(c);break;case 4:La();break;case 13:an(un);break;case 19:an(un);break;case 10:ku(c.type._context);break;case 22:case 23:bd()}a=a.return}if(Nn=n,vn=n=as(n.current,null),Un=_i=i,bn=0,Bo=null,gd=ql=Gs=0,li=zo=null,Bs!==null){for(i=0;i<Bs.length;i++)if(a=Bs[i],c=a.interleaved,c!==null){a.interleaved=null;var f=c.next,g=a.pending;if(g!==null){var T=g.next;g.next=f,c.next=T}a.pending=c}Bs=null}return n}function Nm(n,i){do{var a=vn;try{if(Fu(),Fl.current=Vl,kl){for(var c=dn.memoizedState;c!==null;){var f=c.queue;f!==null&&(f.pending=null),c=c.next}kl=!1}if(Vs=0,Cn=Mn=dn=null,Do=!1,Io=0,md.current=null,a===null||a.return===null){bn=1,Bo=i,vn=null;break}e:{var g=n,T=a.return,k=a,j=i;if(i=Un,k.flags|=32768,j!==null&&typeof j=="object"&&typeof j.then=="function"){var fe=j,ye=k,Me=ye.tag;if((ye.mode&1)===0&&(Me===0||Me===11||Me===15)){var _e=ye.alternate;_e?(ye.updateQueue=_e.updateQueue,ye.memoizedState=_e.memoizedState,ye.lanes=_e.lanes):(ye.updateQueue=null,ye.memoizedState=null)}var Ye=tm(T);if(Ye!==null){Ye.flags&=-257,nm(Ye,T,k,g,i),Ye.mode&1&&em(g,fe,i),i=Ye,j=fe;var tt=i.updateQueue;if(tt===null){var st=new Set;st.add(j),i.updateQueue=st}else tt.add(j);break e}else{if((i&1)===0){em(g,fe,i),Ed();break e}j=Error(t(426))}}else if(on&&k.mode&1){var xn=tm(T);if(xn!==null){(xn.flags&65536)===0&&(xn.flags|=256),nm(xn,T,k,g,i),Uu(Da(j,k));break e}}g=j=Da(j,k),bn!==4&&(bn=2),zo===null?zo=[g]:zo.push(g),g=T;do{switch(g.tag){case 3:g.flags|=65536,i&=-i,g.lanes|=i;var se=Jp(g,j,i);wp(g,se);break e;case 1:k=j;var K=g.type,le=g.stateNode;if((g.flags&128)===0&&(typeof K.getDerivedStateFromError=="function"||le!==null&&typeof le.componentDidCatch=="function"&&(ns===null||!ns.has(le)))){g.flags|=65536,i&=-i,g.lanes|=i;var Ee=Qp(g,k,i);wp(g,Ee);break e}}g=g.return}while(g!==null)}Dm(a)}catch(ot){i=ot,vn===a&&a!==null&&(vn=a=a.return);continue}break}while(!0)}function Pm(){var n=Yl.current;return Yl.current=Vl,n===null?Vl:n}function Ed(){(bn===0||bn===3||bn===2)&&(bn=4),Nn===null||(Gs&268435455)===0&&(ql&268435455)===0||ss(Nn,Un)}function ec(n,i){var a=Bt;Bt|=2;var c=Pm();(Nn!==n||Un!==i)&&(Ar=null,js(n,i));do try{Mv();break}catch(f){Nm(n,f)}while(!0);if(Fu(),Bt=a,Yl.current=c,vn!==null)throw Error(t(261));return Nn=null,Un=0,bn}function Mv(){for(;vn!==null;)Lm(vn)}function bv(){for(;vn!==null&&!Vr();)Lm(vn)}function Lm(n){var i=Om(n.alternate,n,_i);n.memoizedProps=n.pendingProps,i===null?Dm(n):vn=i,md.current=null}function Dm(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=mv(a,i,_i),a!==null){vn=a;return}}else{if(a=gv(a,i),a!==null){a.flags&=32767,vn=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{bn=6,vn=null;return}}if(i=i.sibling,i!==null){vn=i;return}vn=i=n}while(i!==null);bn===0&&(bn=5)}function Ws(n,i,a){var c=ft,f=Ri.transition;try{Ri.transition=null,ft=1,Ev(n,i,a,c)}finally{Ri.transition=f,ft=c}return null}function Ev(n,i,a,c){do Fa();while(is!==null);if((Bt&6)!==0)throw Error(t(327));a=n.finishedWork;var f=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var g=a.lanes|a.childLanes;if(Et(n,g),n===Nn&&(vn=Nn=null,Un=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||Kl||(Kl=!0,Fm(A,function(){return Fa(),null})),g=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||g){g=Ri.transition,Ri.transition=null;var T=ft;ft=1;var k=Bt;Bt|=4,md.current=null,vv(n,a),bm(a,n),jx(Eu),la=!!bu,Eu=bu=null,n.current=a,_v(a),co(),Bt=k,ft=T,Ri.transition=g}else n.current=a;if(Kl&&(Kl=!1,is=n,Zl=f),g=n.pendingLanes,g===0&&(ns=null),ke(a.stateNode),ci(n,Jt()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)f=i[a],c(f.value,{componentStack:f.stack,digest:f.digest});if($l)throw $l=!1,n=vd,vd=null,n;return(Zl&1)!==0&&n.tag!==0&&Fa(),g=n.pendingLanes,(g&1)!==0?n===_d?Vo++:(Vo=0,_d=n):Vo=0,Jr(),null}function Fa(){if(is!==null){var n=qn(Zl),i=Ri.transition,a=ft;try{if(Ri.transition=null,ft=16>n?16:n,is===null)var c=!1;else{if(n=is,is=null,Zl=0,(Bt&6)!==0)throw Error(t(331));var f=Bt;for(Bt|=4,Je=n.current;Je!==null;){var g=Je,T=g.child;if((Je.flags&16)!==0){var k=g.deletions;if(k!==null){for(var j=0;j<k.length;j++){var fe=k[j];for(Je=fe;Je!==null;){var ye=Je;switch(ye.tag){case 0:case 11:case 15:ko(8,ye,g)}var Me=ye.child;if(Me!==null)Me.return=ye,Je=Me;else for(;Je!==null;){ye=Je;var _e=ye.sibling,Ye=ye.return;if(vm(ye),ye===fe){Je=null;break}if(_e!==null){_e.return=Ye,Je=_e;break}Je=Ye}}}var tt=g.alternate;if(tt!==null){var st=tt.child;if(st!==null){tt.child=null;do{var xn=st.sibling;st.sibling=null,st=xn}while(st!==null)}}Je=g}}if((g.subtreeFlags&2064)!==0&&T!==null)T.return=g,Je=T;else e:for(;Je!==null;){if(g=Je,(g.flags&2048)!==0)switch(g.tag){case 0:case 11:case 15:ko(9,g,g.return)}var se=g.sibling;if(se!==null){se.return=g.return,Je=se;break e}Je=g.return}}var K=n.current;for(Je=K;Je!==null;){T=Je;var le=T.child;if((T.subtreeFlags&2064)!==0&&le!==null)le.return=T,Je=le;else e:for(T=K;Je!==null;){if(k=Je,(k.flags&2048)!==0)try{switch(k.tag){case 0:case 11:case 15:Xl(9,k)}}catch(ot){hn(k,k.return,ot)}if(k===T){Je=null;break e}var Ee=k.sibling;if(Ee!==null){Ee.return=k.return,Je=Ee;break e}Je=k.return}}if(Bt=f,Jr(),ie&&typeof ie.onPostCommitFiberRoot=="function")try{ie.onPostCommitFiberRoot(re,n)}catch{}c=!0}return c}finally{ft=a,Ri.transition=i}}return!1}function Im(n,i,a){i=Da(a,i),i=Jp(n,i,1),n=es(n,i,1),i=Qn(),n!==null&&(nn(n,1,i),ci(n,i))}function hn(n,i,a){if(n.tag===3)Im(n,n,a);else for(;i!==null;){if(i.tag===3){Im(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(ns===null||!ns.has(c))){n=Da(a,n),n=Qp(i,n,1),i=es(i,n,1),n=Qn(),i!==null&&(nn(i,1,n),ci(i,n));break}}i=i.return}}function wv(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=Qn(),n.pingedLanes|=n.suspendedLanes&a,Nn===n&&(Un&a)===a&&(bn===4||bn===3&&(Un&130023424)===Un&&500>Jt()-xd?js(n,0):gd|=a),ci(n,i)}function Um(n,i){i===0&&((n.mode&1)===0?i=1:(i=vt,vt<<=1,(vt&130023424)===0&&(vt=4194304)));var a=Qn();n=Er(n,i),n!==null&&(nn(n,i,a),ci(n,a))}function Tv(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),Um(n,a)}function Av(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,f=n.memoizedState;f!==null&&(a=f.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),Um(n,a)}var Om;Om=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||si.current)oi=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return oi=!1,pv(n,i,a);oi=(n.flags&131072)!==0}else oi=!1,on&&(i.flags&1048576)!==0&&mp(i,Cl,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;jl(n,i),n=i.pendingProps;var f=wa(i,Bn.current);Pa(i,a),f=qu(null,i,c,n,f,a);var g=$u();return i.flags|=1,typeof f=="object"&&f!==null&&typeof f.render=="function"&&f.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,ai(c)?(g=!0,Tl(i)):g=!1,i.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,Vu(i),f.updater=Gl,i.stateNode=f,f._reactInternals=i,td(i,c,n,a),i=sd(null,i,c,!0,g,a)):(i.tag=0,on&&g&&Pu(i),Jn(null,i,f,a),i=i.child),i;case 16:c=i.elementType;e:{switch(jl(n,i),n=i.pendingProps,f=c._init,c=f(c._payload),i.type=c,f=i.tag=Cv(c),n=Vi(c,n),f){case 0:i=rd(null,i,c,n,a);break e;case 1:i=lm(null,i,c,n,a);break e;case 11:i=im(null,i,c,n,a);break e;case 14:i=rm(null,i,c,Vi(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:Vi(c,f),rd(n,i,c,f,a);case 1:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:Vi(c,f),lm(n,i,c,f,a);case 3:e:{if(cm(i),n===null)throw Error(t(387));c=i.pendingProps,g=i.memoizedState,f=g.element,Ep(n,i),Ul(i,c,null,a);var T=i.memoizedState;if(c=T.element,g.isDehydrated)if(g={element:c,isDehydrated:!1,cache:T.cache,pendingSuspenseBoundaries:T.pendingSuspenseBoundaries,transitions:T.transitions},i.updateQueue.baseState=g,i.memoizedState=g,i.flags&256){f=Da(Error(t(423)),i),i=um(n,i,c,a,f);break e}else if(c!==f){f=Da(Error(t(424)),i),i=um(n,i,c,a,f);break e}else for(vi=$r(i.stateNode.containerInfo.firstChild),xi=i,on=!0,zi=null,a=Mp(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ra(),c===f){i=Tr(n,i,a);break e}Jn(n,i,c,a)}i=i.child}return i;case 5:return Ap(i),n===null&&Iu(i),c=i.type,f=i.pendingProps,g=n!==null?n.memoizedProps:null,T=f.children,wu(c,f)?T=null:g!==null&&wu(c,g)&&(i.flags|=32),om(n,i),Jn(n,i,T,a),i.child;case 6:return n===null&&Iu(i),null;case 13:return dm(n,i,a);case 4:return Gu(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=Ca(i,null,c,a):Jn(n,i,c,a),i.child;case 11:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:Vi(c,f),im(n,i,c,f,a);case 7:return Jn(n,i,i.pendingProps,a),i.child;case 8:return Jn(n,i,i.pendingProps.children,a),i.child;case 12:return Jn(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,f=i.pendingProps,g=i.memoizedProps,T=f.value,tn(Ll,c._currentValue),c._currentValue=T,g!==null)if(Bi(g.value,T)){if(g.children===f.children&&!si.current){i=Tr(n,i,a);break e}}else for(g=i.child,g!==null&&(g.return=i);g!==null;){var k=g.dependencies;if(k!==null){T=g.child;for(var j=k.firstContext;j!==null;){if(j.context===c){if(g.tag===1){j=wr(-1,a&-a),j.tag=2;var fe=g.updateQueue;if(fe!==null){fe=fe.shared;var ye=fe.pending;ye===null?j.next=j:(j.next=ye.next,ye.next=j),fe.pending=j}}g.lanes|=a,j=g.alternate,j!==null&&(j.lanes|=a),Bu(g.return,a,i),k.lanes|=a;break}j=j.next}}else if(g.tag===10)T=g.type===i.type?null:g.child;else if(g.tag===18){if(T=g.return,T===null)throw Error(t(341));T.lanes|=a,k=T.alternate,k!==null&&(k.lanes|=a),Bu(T,a,i),T=g.sibling}else T=g.child;if(T!==null)T.return=g;else for(T=g;T!==null;){if(T===i){T=null;break}if(g=T.sibling,g!==null){g.return=T.return,T=g;break}T=T.return}g=T}Jn(n,i,f.children,a),i=i.child}return i;case 9:return f=i.type,c=i.pendingProps.children,Pa(i,a),f=Ti(f),c=c(f),i.flags|=1,Jn(n,i,c,a),i.child;case 14:return c=i.type,f=Vi(c,i.pendingProps),f=Vi(c.type,f),rm(n,i,c,f,a);case 15:return sm(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:Vi(c,f),jl(n,i),i.tag=1,ai(c)?(n=!0,Tl(i)):n=!1,Pa(i,a),Kp(i,c,f),td(i,c,f,a),sd(null,i,c,!0,n,a);case 19:return hm(n,i,a);case 22:return am(n,i,a)}throw Error(t(156,i.tag))};function Fm(n,i){return gr(n,i)}function Rv(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ci(n,i,a,c){return new Rv(n,i,a,c)}function wd(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Cv(n){if(typeof n=="function")return wd(n)?1:0;if(n!=null){if(n=n.$$typeof,n===Y)return 11;if(n===F)return 14}return 2}function as(n,i){var a=n.alternate;return a===null?(a=Ci(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function tc(n,i,a,c,f,g){var T=2;if(c=n,typeof n=="function")wd(n)&&(T=1);else if(typeof n=="string")T=5;else e:switch(n){case B:return Xs(a.children,f,g,i);case b:T=8,f|=8;break;case N:return n=Ci(12,a,i,f|2),n.elementType=N,n.lanes=g,n;case Q:return n=Ci(13,a,i,f),n.elementType=Q,n.lanes=g,n;case G:return n=Ci(19,a,i,f),n.elementType=G,n.lanes=g,n;case Z:return nc(a,f,g,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case O:T=10;break e;case V:T=9;break e;case Y:T=11;break e;case F:T=14;break e;case ce:T=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=Ci(T,a,i,f),i.elementType=n,i.type=c,i.lanes=g,i}function Xs(n,i,a,c){return n=Ci(7,n,c,i),n.lanes=a,n}function nc(n,i,a,c){return n=Ci(22,n,c,i),n.elementType=Z,n.lanes=a,n.stateNode={isHidden:!1},n}function Td(n,i,a){return n=Ci(6,n,null,i),n.lanes=a,n}function Ad(n,i,a){return i=Ci(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Nv(n,i,a,c,f){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=We(0),this.expirationTimes=We(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=We(0),this.identifierPrefix=c,this.onRecoverableError=f,this.mutableSourceEagerHydrationData=null}function Rd(n,i,a,c,f,g,T,k,j){return n=new Nv(n,i,a,k,j),i===1?(i=1,g===!0&&(i|=8)):i=0,g=Ci(3,null,null,i),n.current=g,g.stateNode=n,g.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Vu(g),n}function Pv(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:L,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function km(n){if(!n)return Zr;n=n._reactInternals;e:{if(Rn(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(ai(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(ai(a))return fp(n,a,i)}return i}function Bm(n,i,a,c,f,g,T,k,j){return n=Rd(a,c,!0,n,f,g,T,k,j),n.context=km(null),a=n.current,c=Qn(),f=rs(a),g=wr(c,f),g.callback=i??null,es(a,g,f),n.current.lanes=f,nn(n,f,c),ci(n,c),n}function ic(n,i,a,c){var f=i.current,g=Qn(),T=rs(f);return a=km(a),i.context===null?i.context=a:i.pendingContext=a,i=wr(g,T),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=es(f,i,T),n!==null&&(ji(n,f,T,g),Il(n,f,T)),T}function rc(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function zm(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Cd(n,i){zm(n,i),(n=n.alternate)&&zm(n,i)}function Lv(){return null}var Vm=typeof reportError=="function"?reportError:function(n){console.error(n)};function Nd(n){this._internalRoot=n}sc.prototype.render=Nd.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));ic(n,i,null,null)},sc.prototype.unmount=Nd.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Hs(function(){ic(null,n,null,null)}),i[yr]=null}};function sc(n){this._internalRoot=n}sc.prototype.unstable_scheduleHydration=function(n){if(n){var i=mi();n={blockedOn:null,target:n,priority:i};for(var a=0;a<Qi.length&&i!==0&&i<Qi[a].priority;a++);Qi.splice(a,0,n),a===0&&xr(n)}};function Pd(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function ac(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Gm(){}function Dv(n,i,a,c,f){if(f){if(typeof c=="function"){var g=c;c=function(){var fe=rc(T);g.call(fe)}}var T=Bm(i,c,n,0,null,!1,!1,"",Gm);return n._reactRootContainer=T,n[yr]=T.current,wo(n.nodeType===8?n.parentNode:n),Hs(),T}for(;f=n.lastChild;)n.removeChild(f);if(typeof c=="function"){var k=c;c=function(){var fe=rc(j);k.call(fe)}}var j=Rd(n,0,!1,null,null,!1,!1,"",Gm);return n._reactRootContainer=j,n[yr]=j.current,wo(n.nodeType===8?n.parentNode:n),Hs(function(){ic(i,j,a,c)}),j}function oc(n,i,a,c,f){var g=a._reactRootContainer;if(g){var T=g;if(typeof f=="function"){var k=f;f=function(){var j=rc(T);k.call(j)}}ic(i,T,n,f)}else T=Dv(a,i,n,f,c);return rc(T)}pi=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=Xe(i.pendingLanes);a!==0&&(Sn(i,a|1),ci(i,Jt()),(Bt&6)===0&&(Oa=Jt()+500,Jr()))}break;case 13:Hs(function(){var c=Er(n,1);if(c!==null){var f=Qn();ji(c,n,1,f)}}),Cd(n,1)}},Nt=function(n){if(n.tag===13){var i=Er(n,134217728);if(i!==null){var a=Qn();ji(i,n,134217728,a)}Cd(n,134217728)}},Kt=function(n){if(n.tag===13){var i=rs(n),a=Er(n,i);if(a!==null){var c=Qn();ji(a,n,i,c)}Cd(n,i)}},mi=function(){return ft},Gt=function(n,i){var a=ft;try{return ft=n,i()}finally{ft=a}},lt=function(n,i,a){switch(i){case"input":if(qe(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var f=El(c);if(!f)throw Error(t(90));Ie(c),qe(c,f)}}}break;case"textarea":mn(n,a);break;case"select":i=a.value,i!=null&&Mt(n,!!a.multiple,i,!1)}},ze=Md,ve=Hs;var Iv={usingClientEntryPoint:!1,Events:[Ro,ba,El,ge,Ce,Md]},Go={findFiberByHostInstance:Us,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Uv={bundleType:Go.bundleType,version:Go.version,rendererPackageName:Go.rendererPackageName,rendererConfig:Go.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:R.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=mr(n),n===null?null:n.stateNode},findFiberByHostInstance:Go.findFiberByHostInstance||Lv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var lc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!lc.isDisabled&&lc.supportsFiber)try{re=lc.inject(Uv),ie=lc}catch{}}return ui.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Iv,ui.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Pd(i))throw Error(t(200));return Pv(n,i,null,a)},ui.createRoot=function(n,i){if(!Pd(n))throw Error(t(299));var a=!1,c="",f=Vm;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(f=i.onRecoverableError)),i=Rd(n,1,!1,null,null,a,!1,c,f),n[yr]=i.current,wo(n.nodeType===8?n.parentNode:n),new Nd(i)},ui.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=mr(i),n=n===null?null:n.stateNode,n},ui.flushSync=function(n){return Hs(n)},ui.hydrate=function(n,i,a){if(!ac(i))throw Error(t(200));return oc(null,n,i,!0,a)},ui.hydrateRoot=function(n,i,a){if(!Pd(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,f=!1,g="",T=Vm;if(a!=null&&(a.unstable_strictMode===!0&&(f=!0),a.identifierPrefix!==void 0&&(g=a.identifierPrefix),a.onRecoverableError!==void 0&&(T=a.onRecoverableError)),i=Bm(i,null,n,1,a??null,f,!1,g,T),n[yr]=i.current,wo(n),c)for(n=0;n<c.length;n++)a=c[n],f=a._getVersion,f=f(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,f]:i.mutableSourceEagerHydrationData.push(a,f);return new sc(i)},ui.render=function(n,i,a){if(!ac(i))throw Error(t(200));return oc(null,n,i,!1,a)},ui.unmountComponentAtNode=function(n){if(!ac(n))throw Error(t(40));return n._reactRootContainer?(Hs(function(){oc(null,null,n,!1,function(){n._reactRootContainer=null,n[yr]=null})}),!0):!1},ui.unstable_batchedUpdates=Md,ui.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!ac(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return oc(n,i,a,!1,c)},ui.version="18.3.1-next-f1338f8080-20240426",ui}var Km;function jv(){if(Km)return Id.exports;Km=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Id.exports=Hv(),Id.exports}var Zm;function Wv(){if(Zm)return cc;Zm=1;var s=jv();return cc.createRoot=s.createRoot,cc.hydrateRoot=s.hydrateRoot,cc}var Xv=Wv();const Yv=sg(Xv);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const uh="186",to={ROTATE:0,DOLLY:1,PAN:2},Ja={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},qv=0,Jm=1,$v=2,Oc=1,ag=2,Jo=3,ta=0,hi=1,Li=2,Ur=0,el=1,Qm=2,e0=3,t0=4,Kv=5,Za=100,Zv=101,Jv=102,Qv=103,e_=104,t_=200,n_=201,i_=202,r_=203,og=204,lg=205,s_=206,a_=207,o_=208,l_=209,c_=210,u_=211,d_=212,f_=213,h_=214,_f=0,yf=1,Sf=2,tl=3,Mf=4,bf=5,Ef=6,wf=7,cg=0,p_=1,m_=2,dr=0,ug=1,dg=2,fg=3,dh=4,hg=5,pg=6,mg=7,gg=300,na=301,ro=302,Fd=303,kd=304,nu=306,nl=1e3,Ir=1001,Tf=1002,Fn=1003,g_=1004,uc=1005,Wn=1006,Bd=1007,Qs=1008,bi=1009,xg=1010,vg=1011,il=1012,fh=1013,fr=1014,cr=1015,hr=1016,hh=1017,ph=1018,rl=1020,_g=35902,yg=35899,Sg=1021,Mg=1022,$i=1023,kr=1026,ea=1027,bg=1028,mh=1029,ia=1030,gh=1031,xh=1033,Fc=33776,kc=33777,Bc=33778,zc=33779,Af=35840,Rf=35841,Cf=35842,Nf=35843,Pf=36196,Lf=37492,Df=37496,If=37488,Uf=37489,Hc=37490,Of=37491,Ff=37808,kf=37809,Bf=37810,zf=37811,Vf=37812,Gf=37813,Hf=37814,jf=37815,Wf=37816,Xf=37817,Yf=37818,qf=37819,$f=37820,Kf=37821,Zf=36492,Jf=36494,Qf=36495,eh=36283,th=36284,jc=36285,nh=36286,x_=3200,ih=0,v_=1,hs="",Pi="srgb",Wc="srgb-linear",Xc="linear",qt="srgb",zd=7680,__=519,y_=512,S_=513,M_=514,vh=515,b_=516,E_=517,_h=518,w_=519,T_=35044,n0="300 es",ur=2e3,sl=2001;function A_(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Yc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function R_(){const s=Yc("canvas");return s.style.display="block",s}const i0={};function r0(...s){const e="THREE."+s.shift();console.log(e,...s)}function Eg(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function pt(...s){s=Eg(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function zt(...s){s=Eg(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function no(...s){const e=s.join(" ");e in i0||(i0[e]=!0,pt(...s))}function C_(s,e,t){return new Promise(function(r,o){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:o();break;case s.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:r()}}setTimeout(l,t)})}const N_={[_f]:yf,[Sf]:Ef,[Mf]:wf,[tl]:bf,[yf]:_f,[Ef]:Sf,[wf]:Mf,[bf]:tl};class gs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){const r=this._listeners;if(r===void 0)return;const o=r[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const r=t[e.type];if(r!==void 0){e.target=this;const o=r.slice(0);for(let l=0,d=o.length;l<d;l++)o[l].call(this,e);e.target=null}}}const Hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vc=Math.PI/180,qc=180/Math.PI;function ol(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Hn[s&255]+Hn[s>>8&255]+Hn[s>>16&255]+Hn[s>>24&255]+"-"+Hn[e&255]+Hn[e>>8&255]+"-"+Hn[e>>16&15|64]+Hn[e>>24&255]+"-"+Hn[t&63|128]+Hn[t>>8&255]+"-"+Hn[t>>16&255]+Hn[t>>24&255]+Hn[r&255]+Hn[r>>8&255]+Hn[r>>16&255]+Hn[r>>24&255]).toLowerCase()}function Tt(s,e,t){return Math.max(e,Math.min(t,s))}function P_(s,e){return(s%e+e)%e}function Vd(s,e,t){return(1-t)*s+t*e}function jo(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function di(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const L_={DEG2RAD:Vc},Ph=class Ph{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,o=e.elements;return this.x=o[0]*t+o[3]*r+o[6],this.y=o[1]*t+o[4]*r+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Tt(this.x,e.x,t.x),this.y=Tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Tt(this.x,e,t),this.y=Tt(this.y,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Tt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Tt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),o=Math.sin(t),l=this.x-e.x,d=this.y-e.y;return this.x=l*r-d*o+e.x,this.y=l*o+d*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ph.prototype.isVector2=!0;let mt=Ph;class ps{constructor(e=0,t=0,r=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=o}static slerpFlat(e,t,r,o,l,d,h){let p=r[o+0],m=r[o+1],y=r[o+2],S=r[o+3],v=l[d+0],M=l[d+1],w=l[d+2],C=l[d+3];if(S!==C||p!==v||m!==M||y!==w){let x=p*v+m*M+y*w+S*C;x<0&&(v=-v,M=-M,w=-w,C=-C,x=-x);let _=1-h;if(x<.9995){const D=Math.acos(x),z=Math.sin(D);_=Math.sin(_*D)/z,h=Math.sin(h*D)/z,p=p*_+v*h,m=m*_+M*h,y=y*_+w*h,S=S*_+C*h}else{p=p*_+v*h,m=m*_+M*h,y=y*_+w*h,S=S*_+C*h;const D=1/Math.sqrt(p*p+m*m+y*y+S*S);p*=D,m*=D,y*=D,S*=D}}e[t]=p,e[t+1]=m,e[t+2]=y,e[t+3]=S}static multiplyQuaternionsFlat(e,t,r,o,l,d){const h=r[o],p=r[o+1],m=r[o+2],y=r[o+3],S=l[d],v=l[d+1],M=l[d+2],w=l[d+3];return e[t]=h*w+y*S+p*M-m*v,e[t+1]=p*w+y*v+m*S-h*M,e[t+2]=m*w+y*M+h*v-p*S,e[t+3]=y*w-h*S-p*v-m*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,o){return this._x=e,this._y=t,this._z=r,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,o=e._y,l=e._z,d=e._order,h=Math.cos,p=Math.sin,m=h(r/2),y=h(o/2),S=h(l/2),v=p(r/2),M=p(o/2),w=p(l/2);switch(d){case"XYZ":this._x=v*y*S+m*M*w,this._y=m*M*S-v*y*w,this._z=m*y*w+v*M*S,this._w=m*y*S-v*M*w;break;case"YXZ":this._x=v*y*S+m*M*w,this._y=m*M*S-v*y*w,this._z=m*y*w-v*M*S,this._w=m*y*S+v*M*w;break;case"ZXY":this._x=v*y*S-m*M*w,this._y=m*M*S+v*y*w,this._z=m*y*w+v*M*S,this._w=m*y*S-v*M*w;break;case"ZYX":this._x=v*y*S-m*M*w,this._y=m*M*S+v*y*w,this._z=m*y*w-v*M*S,this._w=m*y*S+v*M*w;break;case"YZX":this._x=v*y*S+m*M*w,this._y=m*M*S+v*y*w,this._z=m*y*w-v*M*S,this._w=m*y*S-v*M*w;break;case"XZY":this._x=v*y*S-m*M*w,this._y=m*M*S-v*y*w,this._z=m*y*w+v*M*S,this._w=m*y*S+v*M*w;break;default:pt("Quaternion: .setFromEuler() encountered an unknown order: "+d)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,o=Math.sin(r);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],o=t[4],l=t[8],d=t[1],h=t[5],p=t[9],m=t[2],y=t[6],S=t[10],v=r+h+S;if(v>0){const M=.5/Math.sqrt(v+1);this._w=.25/M,this._x=(y-p)*M,this._y=(l-m)*M,this._z=(d-o)*M}else if(r>h&&r>S){const M=2*Math.sqrt(1+r-h-S);this._w=(y-p)/M,this._x=.25*M,this._y=(o+d)/M,this._z=(l+m)/M}else if(h>S){const M=2*Math.sqrt(1+h-r-S);this._w=(l-m)/M,this._x=(o+d)/M,this._y=.25*M,this._z=(p+y)/M}else{const M=2*Math.sqrt(1+S-r-h);this._w=(d-o)/M,this._x=(l+m)/M,this._y=(p+y)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const o=Math.min(1,t/r);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,o=e._y,l=e._z,d=e._w,h=t._x,p=t._y,m=t._z,y=t._w;return this._x=r*y+d*h+o*m-l*p,this._y=o*y+d*p+l*h-r*m,this._z=l*y+d*m+r*p-o*h,this._w=d*y-r*h-o*p-l*m,this._onChangeCallback(),this}slerp(e,t){let r=e._x,o=e._y,l=e._z,d=e._w,h=this.dot(e);h<0&&(r=-r,o=-o,l=-l,d=-d,h=-h);let p=1-t;if(h<.9995){const m=Math.acos(h),y=Math.sin(m);p=Math.sin(p*m)/y,t=Math.sin(t*m)/y,this._x=this._x*p+r*t,this._y=this._y*p+o*t,this._z=this._z*p+l*t,this._w=this._w*p+d*t,this._onChangeCallback()}else this._x=this._x*p+r*t,this._y=this._y*p+o*t,this._z=this._z*p+l*t,this._w=this._w*p+d*t,this.normalize();return this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),o=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(o*Math.sin(e),o*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Lh=class Lh{constructor(e=0,t=0,r=0){this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(s0.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(s0.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*o,this.y=l[1]*t+l[4]*r+l[7]*o,this.z=l[2]*t+l[5]*r+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=e.elements,d=1/(l[3]*t+l[7]*r+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*o+l[12])*d,this.y=(l[1]*t+l[5]*r+l[9]*o+l[13])*d,this.z=(l[2]*t+l[6]*r+l[10]*o+l[14])*d,this}applyQuaternion(e){const t=this.x,r=this.y,o=this.z,l=e.x,d=e.y,h=e.z,p=e.w,m=2*(d*o-h*r),y=2*(h*t-l*o),S=2*(l*r-d*t);return this.x=t+p*m+d*S-h*y,this.y=r+p*y+h*m-l*S,this.z=o+p*S+l*y-d*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*o,this.y=l[1]*t+l[5]*r+l[9]*o,this.z=l[2]*t+l[6]*r+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Tt(this.x,e.x,t.x),this.y=Tt(this.y,e.y,t.y),this.z=Tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Tt(this.x,e,t),this.y=Tt(this.y,e,t),this.z=Tt(this.z,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Tt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,o=e.y,l=e.z,d=t.x,h=t.y,p=t.z;return this.x=o*p-l*h,this.y=l*d-r*p,this.z=r*h-o*d,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Gd.copy(this).projectOnVector(e),this.sub(Gd)}reflect(e){return this.sub(Gd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Tt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,o=this.z-e.z;return t*t+r*r+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const o=Math.sin(t)*e;return this.x=o*Math.sin(r),this.y=Math.cos(t)*e,this.z=o*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Lh.prototype.isVector3=!0;let ne=Lh;const Gd=new ne,s0=new ps,Dh=class Dh{constructor(e,t,r,o,l,d,h,p,m){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,d,h,p,m)}set(e,t,r,o,l,d,h,p,m){const y=this.elements;return y[0]=e,y[1]=o,y[2]=h,y[3]=t,y[4]=l,y[5]=p,y[6]=r,y[7]=d,y[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,d=r[0],h=r[3],p=r[6],m=r[1],y=r[4],S=r[7],v=r[2],M=r[5],w=r[8],C=o[0],x=o[3],_=o[6],D=o[1],z=o[4],R=o[7],P=o[2],L=o[5],B=o[8];return l[0]=d*C+h*D+p*P,l[3]=d*x+h*z+p*L,l[6]=d*_+h*R+p*B,l[1]=m*C+y*D+S*P,l[4]=m*x+y*z+S*L,l[7]=m*_+y*R+S*B,l[2]=v*C+M*D+w*P,l[5]=v*x+M*z+w*L,l[8]=v*_+M*R+w*B,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],h=e[5],p=e[6],m=e[7],y=e[8];return t*d*y-t*h*m-r*l*y+r*h*p+o*l*m-o*d*p}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],h=e[5],p=e[6],m=e[7],y=e[8],S=y*d-h*m,v=h*p-y*l,M=m*l-d*p,w=t*S+r*v+o*M;if(w===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/w;return e[0]=S*C,e[1]=(o*m-y*r)*C,e[2]=(h*r-o*d)*C,e[3]=v*C,e[4]=(y*t-o*p)*C,e[5]=(o*l-h*t)*C,e[6]=M*C,e[7]=(r*p-m*t)*C,e[8]=(d*t-r*l)*C,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,o,l,d,h){const p=Math.cos(l),m=Math.sin(l);return this.set(r*p,r*m,-r*(p*d+m*h)+d+e,-o*m,o*p,-o*(-m*d+p*h)+h+t,0,0,1),this}scale(e,t){return no("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Hd.makeScale(e,t)),this}rotate(e){return no("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Hd.makeRotation(-e)),this}translate(e,t){return no("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Hd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<9;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Dh.prototype.isMatrix3=!0;let _t=Dh;const Hd=new _t,a0=new _t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),o0=new _t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function D_(){const s={enabled:!0,workingColorSpace:Wc,spaces:{},convert:function(o,l,d){return this.enabled===!1||l===d||!l||!d||(this.spaces[l].transfer===qt&&(o.r=Or(o.r),o.g=Or(o.g),o.b=Or(o.b)),this.spaces[l].primaries!==this.spaces[d].primaries&&(o.applyMatrix3(this.spaces[l].toXYZ),o.applyMatrix3(this.spaces[d].fromXYZ)),this.spaces[d].transfer===qt&&(o.r=io(o.r),o.g=io(o.g),o.b=io(o.b))),o},workingToColorSpace:function(o,l){return this.convert(o,this.workingColorSpace,l)},colorSpaceToWorking:function(o,l){return this.convert(o,l,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===hs?Xc:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,l=this.workingColorSpace){return o.fromArray(this.spaces[l].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,l,d){return o.copy(this.spaces[l].toXYZ).multiply(this.spaces[d].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,l){return no("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(o,l)},toWorkingColorSpace:function(o,l){return no("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(o,l)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Wc]:{primaries:e,whitePoint:r,transfer:Xc,toXYZ:a0,fromXYZ:o0,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Pi},outputColorSpaceConfig:{drawingBufferColorSpace:Pi}},[Pi]:{primaries:e,whitePoint:r,transfer:qt,toXYZ:a0,fromXYZ:o0,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Pi}}}),s}const Ot=D_();function Or(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function io(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ka;class I_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{ka===void 0&&(ka=Yc("canvas")),ka.width=e.width,ka.height=e.height;const o=ka.getContext("2d");e instanceof ImageData?o.putImageData(e,0,0):o.drawImage(e,0,0,e.width,e.height),r=ka}return r.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Yc("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const o=r.getImageData(0,0,e.width,e.height),l=o.data;for(let d=0;d<l.length;d++)l[d]=Or(l[d]/255)*255;return r.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(Or(t[r]/255)*255):t[r]=Or(t[r]);return{data:t,width:e.width,height:e.height}}else return pt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let U_=0;class yh{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:U_++}),this.uuid=ol(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let d=0,h=o.length;d<h;d++)o[d].isDataTexture?l.push(jd(o[d].image)):l.push(jd(o[d]))}else l=jd(o);r.url=l}return t||(e.images[this.uuid]=r),r}}function jd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?I_.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(pt("Texture: Unable to serialize Texture."),{})}let O_=0;const Wd=new ne;class Xn extends gs{constructor(e=Xn.DEFAULT_IMAGE,t=Xn.DEFAULT_MAPPING,r=Ir,o=Ir,l=Wn,d=Qs,h=$i,p=bi,m=Xn.DEFAULT_ANISOTROPY,y=hs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=ol(),this.name="",this.source=new yh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=o,this.magFilter=l,this.minFilter=d,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new _t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=y,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Wd).x}get height(){return this.source.getSize(Wd).y}get depth(){return this.source.getSize(Wd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const r=e[t];if(r===void 0){pt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){pt(`Texture.setValues(): property '${t}' does not exist.`);continue}o&&r&&o.isVector2&&r.isVector2||o&&r&&o.isVector3&&r.isVector3||o&&r&&o.isMatrix3&&r.isMatrix3?o.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nl:e.x=e.x-Math.floor(e.x);break;case Ir:e.x=e.x<0?0:1;break;case Tf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case nl:e.y=e.y-Math.floor(e.y);break;case Ir:e.y=e.y<0?0:1;break;case Tf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Xn.DEFAULT_IMAGE=null;Xn.DEFAULT_MAPPING=gg;Xn.DEFAULT_ANISOTROPY=1;const Ih=class Ih{constructor(e=0,t=0,r=0,o=1){this.x=e,this.y=t,this.z=r,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,o){return this.x=e,this.y=t,this.z=r,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=this.w,d=e.elements;return this.x=d[0]*t+d[4]*r+d[8]*o+d[12]*l,this.y=d[1]*t+d[5]*r+d[9]*o+d[13]*l,this.z=d[2]*t+d[6]*r+d[10]*o+d[14]*l,this.w=d[3]*t+d[7]*r+d[11]*o+d[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,o,l;const p=e.elements,m=p[0],y=p[4],S=p[8],v=p[1],M=p[5],w=p[9],C=p[2],x=p[6],_=p[10];if(Math.abs(y-v)<.01&&Math.abs(S-C)<.01&&Math.abs(w-x)<.01){if(Math.abs(y+v)<.1&&Math.abs(S+C)<.1&&Math.abs(w+x)<.1&&Math.abs(m+M+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const z=(m+1)/2,R=(M+1)/2,P=(_+1)/2,L=(y+v)/4,B=(S+C)/4,b=(w+x)/4;return z>R&&z>P?z<.01?(r=0,o=.707106781,l=.707106781):(r=Math.sqrt(z),o=L/r,l=B/r):R>P?R<.01?(r=.707106781,o=0,l=.707106781):(o=Math.sqrt(R),r=L/o,l=b/o):P<.01?(r=.707106781,o=.707106781,l=0):(l=Math.sqrt(P),r=B/l,o=b/l),this.set(r,o,l,t),this}let D=Math.sqrt((x-w)*(x-w)+(S-C)*(S-C)+(v-y)*(v-y));return Math.abs(D)<.001&&(D=1),this.x=(x-w)/D,this.y=(S-C)/D,this.z=(v-y)/D,this.w=Math.acos((m+M+_-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Tt(this.x,e.x,t.x),this.y=Tt(this.y,e.y,t.y),this.z=Tt(this.z,e.z,t.z),this.w=Tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Tt(this.x,e,t),this.y=Tt(this.y,e,t),this.z=Tt(this.z,e,t),this.w=Tt(this.w,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Tt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ih.prototype.isVector4=!0;let fn=Ih;class F_ extends gs{constructor(e=1,t=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},r),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=r.depth,this.scissor=new fn(0,0,e,t),this.scissorTest=!1,this.viewport=new fn(0,0,e,t),this.textures=[];const o={width:e,height:t,depth:r.depth},l=new Xn(o),d=r.count;for(let h=0;h<d;h++)this.textures[h]=l.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveColorBuffer=r.resolveColorBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.storeMultisampledColorBuffer=r.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=r.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=r.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview,this.useArrayDepthTexture=r.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Wn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let o=0,l=this.textures.length;o<l;o++)this.textures[o].image.width=e,this.textures[o].image.height=t,this.textures[o].image.depth=r,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,r=e.textures.length;t<r;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const o=Object.assign({},e.textures[t].image);this.textures[t].source=new yh(o)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ki extends F_{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class wg extends Xn{constructor(e=null,t=1,r=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class k_ extends Xn{constructor(e=null,t=1,r=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const tu=class tu{constructor(e,t,r,o,l,d,h,p,m,y,S,v,M,w,C,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,d,h,p,m,y,S,v,M,w,C,x)}set(e,t,r,o,l,d,h,p,m,y,S,v,M,w,C,x){const _=this.elements;return _[0]=e,_[4]=t,_[8]=r,_[12]=o,_[1]=l,_[5]=d,_[9]=h,_[13]=p,_[2]=m,_[6]=y,_[10]=S,_[14]=v,_[3]=M,_[7]=w,_[11]=C,_[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tu().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),r.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,r=e.elements,o=1/Ba.setFromMatrixColumn(e,0).length(),l=1/Ba.setFromMatrixColumn(e,1).length(),d=1/Ba.setFromMatrixColumn(e,2).length();return t[0]=r[0]*o,t[1]=r[1]*o,t[2]=r[2]*o,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*d,t[9]=r[9]*d,t[10]=r[10]*d,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,o=e.y,l=e.z,d=Math.cos(r),h=Math.sin(r),p=Math.cos(o),m=Math.sin(o),y=Math.cos(l),S=Math.sin(l);if(e.order==="XYZ"){const v=d*y,M=d*S,w=h*y,C=h*S;t[0]=p*y,t[4]=-p*S,t[8]=m,t[1]=M+w*m,t[5]=v-C*m,t[9]=-h*p,t[2]=C-v*m,t[6]=w+M*m,t[10]=d*p}else if(e.order==="YXZ"){const v=p*y,M=p*S,w=m*y,C=m*S;t[0]=v+C*h,t[4]=w*h-M,t[8]=d*m,t[1]=d*S,t[5]=d*y,t[9]=-h,t[2]=M*h-w,t[6]=C+v*h,t[10]=d*p}else if(e.order==="ZXY"){const v=p*y,M=p*S,w=m*y,C=m*S;t[0]=v-C*h,t[4]=-d*S,t[8]=w+M*h,t[1]=M+w*h,t[5]=d*y,t[9]=C-v*h,t[2]=-d*m,t[6]=h,t[10]=d*p}else if(e.order==="ZYX"){const v=d*y,M=d*S,w=h*y,C=h*S;t[0]=p*y,t[4]=w*m-M,t[8]=v*m+C,t[1]=p*S,t[5]=C*m+v,t[9]=M*m-w,t[2]=-m,t[6]=h*p,t[10]=d*p}else if(e.order==="YZX"){const v=d*p,M=d*m,w=h*p,C=h*m;t[0]=p*y,t[4]=C-v*S,t[8]=w*S+M,t[1]=S,t[5]=d*y,t[9]=-h*y,t[2]=-m*y,t[6]=M*S+w,t[10]=v-C*S}else if(e.order==="XZY"){const v=d*p,M=d*m,w=h*p,C=h*m;t[0]=p*y,t[4]=-S,t[8]=m*y,t[1]=v*S+C,t[5]=d*y,t[9]=M*S-w,t[2]=w*S-M,t[6]=h*y,t[10]=C*S+v}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(B_,e,z_)}lookAt(e,t,r){const o=this.elements;return yi.subVectors(e,t),yi.lengthSq()===0&&(yi.z=1),yi.normalize(),ls.crossVectors(r,yi),ls.lengthSq()===0&&(Math.abs(r.z)===1?yi.x+=1e-4:yi.z+=1e-4,yi.normalize(),ls.crossVectors(r,yi)),ls.normalize(),dc.crossVectors(yi,ls),o[0]=ls.x,o[4]=dc.x,o[8]=yi.x,o[1]=ls.y,o[5]=dc.y,o[9]=yi.y,o[2]=ls.z,o[6]=dc.z,o[10]=yi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,d=r[0],h=r[4],p=r[8],m=r[12],y=r[1],S=r[5],v=r[9],M=r[13],w=r[2],C=r[6],x=r[10],_=r[14],D=r[3],z=r[7],R=r[11],P=r[15],L=o[0],B=o[4],b=o[8],N=o[12],O=o[1],V=o[5],Y=o[9],Q=o[13],G=o[2],F=o[6],ce=o[10],Z=o[14],J=o[3],W=o[7],ee=o[11],I=o[15];return l[0]=d*L+h*O+p*G+m*J,l[4]=d*B+h*V+p*F+m*W,l[8]=d*b+h*Y+p*ce+m*ee,l[12]=d*N+h*Q+p*Z+m*I,l[1]=y*L+S*O+v*G+M*J,l[5]=y*B+S*V+v*F+M*W,l[9]=y*b+S*Y+v*ce+M*ee,l[13]=y*N+S*Q+v*Z+M*I,l[2]=w*L+C*O+x*G+_*J,l[6]=w*B+C*V+x*F+_*W,l[10]=w*b+C*Y+x*ce+_*ee,l[14]=w*N+C*Q+x*Z+_*I,l[3]=D*L+z*O+R*G+P*J,l[7]=D*B+z*V+R*F+P*W,l[11]=D*b+z*Y+R*ce+P*ee,l[15]=D*N+z*Q+R*Z+P*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],o=e[8],l=e[12],d=e[1],h=e[5],p=e[9],m=e[13],y=e[2],S=e[6],v=e[10],M=e[14],w=e[3],C=e[7],x=e[11],_=e[15],D=p*M-m*v,z=h*M-m*S,R=h*v-p*S,P=d*M-m*y,L=d*v-p*y,B=d*S-h*y;return t*(C*D-x*z+_*R)-r*(w*D-x*P+_*L)+o*(w*z-C*P+_*B)-l*(w*R-C*L+x*B)}determinantAffine(){const e=this.elements,t=e[0],r=e[4],o=e[8],l=e[1],d=e[5],h=e[9],p=e[2],m=e[6],y=e[10];return t*(d*y-h*m)-r*(l*y-h*p)+o*(l*m-d*p)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],h=e[5],p=e[6],m=e[7],y=e[8],S=e[9],v=e[10],M=e[11],w=e[12],C=e[13],x=e[14],_=e[15],D=t*h-r*d,z=t*p-o*d,R=t*m-l*d,P=r*p-o*h,L=r*m-l*h,B=o*m-l*p,b=y*C-S*w,N=y*x-v*w,O=y*_-M*w,V=S*x-v*C,Y=S*_-M*C,Q=v*_-M*x,G=D*Q-z*Y+R*V+P*O-L*N+B*b;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/G;return e[0]=(h*Q-p*Y+m*V)*F,e[1]=(o*Y-r*Q-l*V)*F,e[2]=(C*B-x*L+_*P)*F,e[3]=(v*L-S*B-M*P)*F,e[4]=(p*O-d*Q-m*N)*F,e[5]=(t*Q-o*O+l*N)*F,e[6]=(x*R-w*B-_*z)*F,e[7]=(y*B-v*R+M*z)*F,e[8]=(d*Y-h*O+m*b)*F,e[9]=(r*O-t*Y-l*b)*F,e[10]=(w*L-C*R+_*D)*F,e[11]=(S*R-y*L-M*D)*F,e[12]=(h*N-d*V-p*b)*F,e[13]=(t*V-r*N+o*b)*F,e[14]=(C*z-w*P-x*D)*F,e[15]=(y*P-S*z+v*D)*F,this}scale(e){const t=this.elements,r=e.x,o=e.y,l=e.z;return t[0]*=r,t[4]*=o,t[8]*=l,t[1]*=r,t[5]*=o,t[9]*=l,t[2]*=r,t[6]*=o,t[10]*=l,t[3]*=r,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,o))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),o=Math.sin(t),l=1-r,d=e.x,h=e.y,p=e.z,m=l*d,y=l*h;return this.set(m*d+r,m*h-o*p,m*p+o*h,0,m*h+o*p,y*h+r,y*p-o*d,0,m*p-o*h,y*p+o*d,l*p*p+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,o,l,d){return this.set(1,r,l,0,e,1,d,0,t,o,1,0,0,0,0,1),this}compose(e,t,r){const o=this.elements,l=t._x,d=t._y,h=t._z,p=t._w,m=l+l,y=d+d,S=h+h,v=l*m,M=l*y,w=l*S,C=d*y,x=d*S,_=h*S,D=p*m,z=p*y,R=p*S,P=r.x,L=r.y,B=r.z;return o[0]=(1-(C+_))*P,o[1]=(M+R)*P,o[2]=(w-z)*P,o[3]=0,o[4]=(M-R)*L,o[5]=(1-(v+_))*L,o[6]=(x+D)*L,o[7]=0,o[8]=(w+z)*B,o[9]=(x-D)*B,o[10]=(1-(v+C))*B,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,r){const o=this.elements;e.x=o[12],e.y=o[13],e.z=o[14];const l=this.determinantAffine();if(l===0)return r.set(1,1,1),t.identity(),this;let d=Ba.set(o[0],o[1],o[2]).length();const h=Ba.set(o[4],o[5],o[6]).length(),p=Ba.set(o[8],o[9],o[10]).length();l<0&&(d=-d),Wi.copy(this);const m=1/d,y=1/h,S=1/p;return Wi.elements[0]*=m,Wi.elements[1]*=m,Wi.elements[2]*=m,Wi.elements[4]*=y,Wi.elements[5]*=y,Wi.elements[6]*=y,Wi.elements[8]*=S,Wi.elements[9]*=S,Wi.elements[10]*=S,t.setFromRotationMatrix(Wi),r.x=d,r.y=h,r.z=p,this}makePerspective(e,t,r,o,l,d,h=ur,p=!1){const m=this.elements,y=2*l/(t-e),S=2*l/(r-o),v=(t+e)/(t-e),M=(r+o)/(r-o);let w,C;if(p)w=l/(d-l),C=d*l/(d-l);else if(h===ur)w=-(d+l)/(d-l),C=-2*d*l/(d-l);else if(h===sl)w=-d/(d-l),C=-d*l/(d-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return m[0]=y,m[4]=0,m[8]=v,m[12]=0,m[1]=0,m[5]=S,m[9]=M,m[13]=0,m[2]=0,m[6]=0,m[10]=w,m[14]=C,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(e,t,r,o,l,d,h=ur,p=!1){const m=this.elements,y=2/(t-e),S=2/(r-o),v=-(t+e)/(t-e),M=-(r+o)/(r-o);let w,C;if(p)w=1/(d-l),C=d/(d-l);else if(h===ur)w=-2/(d-l),C=-(d+l)/(d-l);else if(h===sl)w=-1/(d-l),C=-l/(d-l);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return m[0]=y,m[4]=0,m[8]=0,m[12]=v,m[1]=0,m[5]=S,m[9]=0,m[13]=M,m[2]=0,m[6]=0,m[10]=w,m[14]=C,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<16;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}};tu.prototype.isMatrix4=!0;let ln=tu;const Ba=new ne,Wi=new ln,B_=new ne(0,0,0),z_=new ne(1,1,1),ls=new ne,dc=new ne,yi=new ne,l0=new ln,c0=new ps;class ms{constructor(e=0,t=0,r=0,o=ms.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,o=this._order){return this._x=e,this._y=t,this._z=r,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const o=e.elements,l=o[0],d=o[4],h=o[8],p=o[1],m=o[5],y=o[9],S=o[2],v=o[6],M=o[10];switch(t){case"XYZ":this._y=Math.asin(Tt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-y,M),this._z=Math.atan2(-d,l)):(this._x=Math.atan2(v,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(h,M),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-S,l),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-S,M),this._z=Math.atan2(-d,m)):(this._y=0,this._z=Math.atan2(p,l));break;case"ZYX":this._y=Math.asin(-Tt(S,-1,1)),Math.abs(S)<.9999999?(this._x=Math.atan2(v,M),this._z=Math.atan2(p,l)):(this._x=0,this._z=Math.atan2(-d,m));break;case"YZX":this._z=Math.asin(Tt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-y,m),this._y=Math.atan2(-S,l)):(this._x=0,this._y=Math.atan2(h,M));break;case"XZY":this._z=Math.asin(-Tt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(v,m),this._y=Math.atan2(h,l)):(this._x=Math.atan2(-y,M),this._y=0);break;default:pt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return l0.makeRotationFromQuaternion(e),this.setFromRotationMatrix(l0,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return c0.setFromEuler(this),this.setFromQuaternion(c0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ms.DEFAULT_ORDER="XYZ";class Sh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let V_=0;const u0=new ne,za=new ps,Rr=new ln,fc=new ne,Wo=new ne,G_=new ne,H_=new ps,d0=new ne(1,0,0),f0=new ne(0,1,0),h0=new ne(0,0,1),p0={type:"added"},j_={type:"removed"},Va={type:"childadded",child:null},Xd={type:"childremoved",child:null};class wn extends gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:V_++}),this.uuid=ol(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wn.DEFAULT_UP.clone();const e=new ne,t=new ms,r=new ps,o=new ne(1,1,1);function l(){r.setFromEuler(t,!1)}function d(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new ln},normalMatrix:{value:new _t}}),this.matrix=new ln,this.matrixWorld=new ln,this.matrixAutoUpdate=wn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return za.setFromAxisAngle(e,t),this.quaternion.multiply(za),this}rotateOnWorldAxis(e,t){return za.setFromAxisAngle(e,t),this.quaternion.premultiply(za),this}rotateX(e){return this.rotateOnAxis(d0,e)}rotateY(e){return this.rotateOnAxis(f0,e)}rotateZ(e){return this.rotateOnAxis(h0,e)}translateOnAxis(e,t){return u0.copy(e).applyQuaternion(this.quaternion),this.position.add(u0.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(d0,e)}translateY(e){return this.translateOnAxis(f0,e)}translateZ(e){return this.translateOnAxis(h0,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rr.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?fc.copy(e):fc.set(e,t,r);const o=this.parent;this.updateWorldMatrix(!0,!1),Wo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rr.lookAt(Wo,fc,this.up):Rr.lookAt(fc,Wo,this.up),this.quaternion.setFromRotationMatrix(Rr),o&&(Rr.extractRotation(o.matrixWorld),za.setFromRotationMatrix(Rr),this.quaternion.premultiply(za.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(zt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(p0),Va.child=e,this.dispatchEvent(Va),Va.child=null):zt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(j_),Xd.child=e,this.dispatchEvent(Xd),Xd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(p0),Va.child=e,this.dispatchEvent(Va),Va.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,o=this.children.length;r<o;r++){const d=this.children[r].getObjectByProperty(e,t);if(d!==void 0)return d}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const o=this.children;for(let l=0,d=o.length;l<d;l++)o[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wo,e,G_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wo,H_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,r=e.y,o=e.z,l=this.matrix.elements;l[12]+=t-l[0]*t-l[4]*r-l[8]*o,l[13]+=r-l[1]*t-l[5]*r-l[9]*o,l[14]+=o-l[2]*t-l[6]*r-l[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t,r=!1){const o=this.parent;if(e===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),t===!0){const l=this.children;for(let d=0,h=l.length;d<h;d++)l[d].updateWorldMatrix(!1,!0,r)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,o.name=this.name,o.castShadow=this.castShadow,o.receiveShadow=this.receiveShadow,o.visible=this.visible,o.frustumCulled=this.frustumCulled,o.renderOrder=this.renderOrder,o.static=this.static,o.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(h=>({...h})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(e),o.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function l(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,y=p.length;m<y;m++){const S=p[m];l(e.shapes,S)}else l(e.shapes,p)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(l(e.materials,this.material[p]));o.material=h}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let h=0;h<this.children.length;h++)o.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];o.animations.push(l(e.animations,p))}}if(t){const h=d(e.geometries),p=d(e.materials),m=d(e.textures),y=d(e.images),S=d(e.shapes),v=d(e.skeletons),M=d(e.animations),w=d(e.nodes);h.length>0&&(r.geometries=h),p.length>0&&(r.materials=p),m.length>0&&(r.textures=m),y.length>0&&(r.images=y),S.length>0&&(r.shapes=S),v.length>0&&(r.skeletons=v),M.length>0&&(r.animations=M),w.length>0&&(r.nodes=w)}return r.object=o,r;function d(h){const p=[];for(const m in h){const y=h[m];delete y.metadata,p.push(y)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const o=e.children[r];this.add(o.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}wn.DEFAULT_UP=new ne(0,1,0);wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ti extends wn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const W_={type:"move"};class Yd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ti,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ti,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ne,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ne),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ti,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ne,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ne,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let o=null,l=null,d=null;const h=this._targetRay,p=this._grip,m=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(m&&e.hand){d=!0;for(const C of e.hand.values()){const x=t.getJointPose(C,r),_=this._getHandJoint(m,C);x!==null&&(_.matrix.fromArray(x.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=x.radius),_.visible=x!==null}const y=m.joints["index-finger-tip"],S=m.joints["thumb-tip"],v=y.position.distanceTo(S.position),M=.02,w=.005;m.inputState.pinching&&v>M+w?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&v<=M-w&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,p.eventsEnabled&&p.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(o=t.getPose(e.targetRaySpace,r),o===null&&l!==null&&(o=l),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(W_)))}return h!==null&&(h.visible=o!==null),p!==null&&(p.visible=l!==null),m!==null&&(m.visible=d!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new ti;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const Tg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cs={h:0,s:0,l:0},hc={h:0,s:0,l:0};function qd(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Lt{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ot.colorSpaceToWorking(this,t),this}setRGB(e,t,r,o=Ot.workingColorSpace){return this.r=e,this.g=t,this.b=r,Ot.colorSpaceToWorking(this,o),this}setHSL(e,t,r,o=Ot.workingColorSpace){if(e=P_(e,1),t=Tt(t,0,1),r=Tt(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,d=2*r-l;this.r=qd(d,l,e+1/3),this.g=qd(d,l,e),this.b=qd(d,l,e-1/3)}return Ot.colorSpaceToWorking(this,o),this}setStyle(e,t=Pi){function r(l){l!==void 0&&parseFloat(l)<1&&pt("Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const d=o[1],h=o[2];switch(d){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:pt("Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],d=l.length;if(d===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(d===6)return this.setHex(parseInt(l,16),t);pt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pi){const r=Tg[e.toLowerCase()];return r!==void 0?this.setHex(r,t):pt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Or(e.r),this.g=Or(e.g),this.b=Or(e.b),this}copyLinearToSRGB(e){return this.r=io(e.r),this.g=io(e.g),this.b=io(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pi){return Ot.workingToColorSpace(jn.copy(this),e),Math.round(Tt(jn.r*255,0,255))*65536+Math.round(Tt(jn.g*255,0,255))*256+Math.round(Tt(jn.b*255,0,255))}getHexString(e=Pi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ot.workingColorSpace){Ot.workingToColorSpace(jn.copy(this),t);const r=jn.r,o=jn.g,l=jn.b,d=Math.max(r,o,l),h=Math.min(r,o,l);let p,m;const y=(h+d)/2;if(h===d)p=0,m=0;else{const S=d-h;switch(m=y<=.5?S/(d+h):S/(2-d-h),d){case r:p=(o-l)/S+(o<l?6:0);break;case o:p=(l-r)/S+2;break;case l:p=(r-o)/S+4;break}p/=6}return e.h=p,e.s=m,e.l=y,e}getRGB(e,t=Ot.workingColorSpace){return Ot.workingToColorSpace(jn.copy(this),t),e.r=jn.r,e.g=jn.g,e.b=jn.b,e}getStyle(e=Pi){Ot.workingToColorSpace(jn.copy(this),e);const t=jn.r,r=jn.g,o=jn.b;return e!==Pi?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(o*255)})`}offsetHSL(e,t,r){return this.getHSL(cs),this.setHSL(cs.h+e,cs.s+t,cs.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(cs),e.getHSL(hc);const r=Vd(cs.h,hc.h,t),o=Vd(cs.s,hc.s,t),l=Vd(cs.l,hc.l,t);return this.setHSL(r,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*o,this.g=l[1]*t+l[4]*r+l[7]*o,this.b=l[2]*t+l[5]*r+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const jn=new Lt;Lt.NAMES=Tg;class Mh{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Lt(e),this.density=t}clone(){return new Mh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class X_ extends wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ms,this.environmentIntensity=1,this.environmentRotation=new ms,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Xi=new ne,Cr=new ne,$d=new ne,Nr=new ne,Ga=new ne,Ha=new ne,m0=new ne,Kd=new ne,Zd=new ne,Jd=new ne,Qd=new fn,ef=new fn,tf=new fn;class qi{constructor(e=new ne,t=new ne,r=new ne){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,o){o.subVectors(r,t),Xi.subVectors(e,t),o.cross(Xi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,r,o,l){Xi.subVectors(o,t),Cr.subVectors(r,t),$d.subVectors(e,t);const d=Xi.dot(Xi),h=Xi.dot(Cr),p=Xi.dot($d),m=Cr.dot(Cr),y=Cr.dot($d),S=d*m-h*h;if(S===0)return l.set(0,0,0),null;const v=1/S,M=(m*p-h*y)*v,w=(d*y-h*p)*v;return l.set(1-M-w,w,M)}static containsPoint(e,t,r,o){return this.getBarycoord(e,t,r,o,Nr)===null?!1:Nr.x>=0&&Nr.y>=0&&Nr.x+Nr.y<=1}static getInterpolation(e,t,r,o,l,d,h,p){return this.getBarycoord(e,t,r,o,Nr)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(l,Nr.x),p.addScaledVector(d,Nr.y),p.addScaledVector(h,Nr.z),p)}static getInterpolatedAttribute(e,t,r,o,l,d){return Qd.setScalar(0),ef.setScalar(0),tf.setScalar(0),Qd.fromBufferAttribute(e,t),ef.fromBufferAttribute(e,r),tf.fromBufferAttribute(e,o),d.setScalar(0),d.addScaledVector(Qd,l.x),d.addScaledVector(ef,l.y),d.addScaledVector(tf,l.z),d}static isFrontFacing(e,t,r,o){return Xi.subVectors(r,t),Cr.subVectors(e,t),Xi.cross(Cr).dot(o)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,o){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,r,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xi.subVectors(this.c,this.b),Cr.subVectors(this.a,this.b),Xi.cross(Cr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return qi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,o,l){return qi.getInterpolation(e,this.a,this.b,this.c,t,r,o,l)}containsPoint(e){return qi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,o=this.b,l=this.c;let d,h;Ga.subVectors(o,r),Ha.subVectors(l,r),Kd.subVectors(e,r);const p=Ga.dot(Kd),m=Ha.dot(Kd);if(p<=0&&m<=0)return t.copy(r);Zd.subVectors(e,o);const y=Ga.dot(Zd),S=Ha.dot(Zd);if(y>=0&&S<=y)return t.copy(o);const v=p*S-y*m;if(v<=0&&p>=0&&y<=0)return d=p/(p-y),t.copy(r).addScaledVector(Ga,d);Jd.subVectors(e,l);const M=Ga.dot(Jd),w=Ha.dot(Jd);if(w>=0&&M<=w)return t.copy(l);const C=M*m-p*w;if(C<=0&&m>=0&&w<=0)return h=m/(m-w),t.copy(r).addScaledVector(Ha,h);const x=y*w-M*S;if(x<=0&&S-y>=0&&M-w>=0)return m0.subVectors(l,o),h=(S-y)/(S-y+(M-w)),t.copy(o).addScaledVector(m0,h);const _=1/(x+C+v);return d=C*_,h=v*_,t.copy(r).addScaledVector(Ga,d).addScaledVector(Ha,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ll{constructor(e=new ne(1/0,1/0,1/0),t=new ne(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(Yi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(Yi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=Yi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let d=0,h=l.count;d<h;d++)e.isMesh===!0?e.getVertexPosition(d,Yi):Yi.fromBufferAttribute(l,d),Yi.applyMatrix4(e.matrixWorld),this.expandByPoint(Yi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pc.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),pc.copy(r.boundingBox)),pc.applyMatrix4(e.matrixWorld),this.union(pc)}const o=e.children;for(let l=0,d=o.length;l<d;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yi),Yi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xo),mc.subVectors(this.max,Xo),ja.subVectors(e.a,Xo),Wa.subVectors(e.b,Xo),Xa.subVectors(e.c,Xo),us.subVectors(Wa,ja),ds.subVectors(Xa,Wa),Ys.subVectors(ja,Xa);let t=[0,-us.z,us.y,0,-ds.z,ds.y,0,-Ys.z,Ys.y,us.z,0,-us.x,ds.z,0,-ds.x,Ys.z,0,-Ys.x,-us.y,us.x,0,-ds.y,ds.x,0,-Ys.y,Ys.x,0];return!nf(t,ja,Wa,Xa,mc)||(t=[1,0,0,0,1,0,0,0,1],!nf(t,ja,Wa,Xa,mc))?!1:(gc.crossVectors(us,ds),t=[gc.x,gc.y,gc.z],nf(t,ja,Wa,Xa,mc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Pr=[new ne,new ne,new ne,new ne,new ne,new ne,new ne,new ne],Yi=new ne,pc=new ll,ja=new ne,Wa=new ne,Xa=new ne,us=new ne,ds=new ne,Ys=new ne,Xo=new ne,mc=new ne,gc=new ne,qs=new ne;function nf(s,e,t,r,o){for(let l=0,d=s.length-3;l<=d;l+=3){qs.fromArray(s,l);const h=o.x*Math.abs(qs.x)+o.y*Math.abs(qs.y)+o.z*Math.abs(qs.z),p=e.dot(qs),m=t.dot(qs),y=r.dot(qs);if(Math.max(-Math.max(p,m,y),Math.min(p,m,y))>h)return!1}return!0}const _n=new ne,xc=new mt;let Y_=0;class Fr extends gs{constructor(e,t,r=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Y_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=T_,this.updateRanges=[],this.gpuType=cr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[r+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)xc.fromBufferAttribute(this,t),xc.applyMatrix3(e),this.setXY(t,xc.x,xc.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)_n.fromBufferAttribute(this,t),_n.applyMatrix3(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)_n.fromBufferAttribute(this,t),_n.applyMatrix4(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)_n.fromBufferAttribute(this,t),_n.applyNormalMatrix(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)_n.fromBufferAttribute(this,t),_n.transformDirection(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=jo(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=di(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=jo(t,this.array)),t}setX(e,t){return this.normalized&&(t=di(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=jo(t,this.array)),t}setY(e,t){return this.normalized&&(t=di(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=jo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=di(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=jo(t,this.array)),t}setW(e,t){return this.normalized&&(t=di(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=di(t,this.array),r=di(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,o){return e*=this.itemSize,this.normalized&&(t=di(t,this.array),r=di(r,this.array),o=di(o,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this}setXYZW(e,t,r,o,l){return e*=this.itemSize,this.normalized&&(t=di(t,this.array),r=di(r,this.array),o=di(o,this.array),l=di(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ag extends Fr{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Rg extends Fr{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class pn extends Fr{constructor(e,t,r){super(new Float32Array(e),t,r)}}const q_=new ll,Yo=new ne,rf=new ne;class iu{constructor(e=new ne,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):q_.setFromPoints(e).getCenter(r);let o=0;for(let l=0,d=e.length;l<d;l++)o=Math.max(o,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Yo.subVectors(e,this.center);const t=Yo.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),o=(r-this.radius)*.5;this.center.addScaledVector(Yo,o/r),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(rf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Yo.copy(e.center).add(rf)),this.expandByPoint(Yo.copy(e.center).sub(rf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let $_=0;const Ni=new ln,sf=new wn,Ya=new ne,Si=new ll,qo=new ll,Ln=new ne;class ni extends gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$_++}),this.uuid=ol(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(A_(e)?Rg:Ag)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new _t().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ni.makeRotationFromQuaternion(e),this.applyMatrix4(Ni),this}rotateX(e){return Ni.makeRotationX(e),this.applyMatrix4(Ni),this}rotateY(e){return Ni.makeRotationY(e),this.applyMatrix4(Ni),this}rotateZ(e){return Ni.makeRotationZ(e),this.applyMatrix4(Ni),this}translate(e,t,r){return Ni.makeTranslation(e,t,r),this.applyMatrix4(Ni),this}scale(e,t,r){return Ni.makeScale(e,t,r),this.applyMatrix4(Ni),this}lookAt(e){return sf.lookAt(e),sf.updateMatrix(),this.applyMatrix4(sf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ya).negate(),this.translate(Ya.x,Ya.y,Ya.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let o=0,l=e.length;o<l;o++){const d=e[o];r.push(d.x,d.y,d.z||0)}this.setAttribute("position",new pn(r,3))}else{const r=Math.min(e.length,t.count);for(let o=0;o<r;o++){const l=e[o];t.setXYZ(o,l.x,l.y,l.z||0)}e.length>t.count&&pt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ll);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){zt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ne(-1/0,-1/0,-1/0),new ne(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const l=t[r];Si.setFromBufferAttribute(l),this.morphTargetsRelative?(Ln.addVectors(this.boundingBox.min,Si.min),this.boundingBox.expandByPoint(Ln),Ln.addVectors(this.boundingBox.max,Si.max),this.boundingBox.expandByPoint(Ln)):(this.boundingBox.expandByPoint(Si.min),this.boundingBox.expandByPoint(Si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&zt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new iu);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){zt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ne,1/0);return}if(e){const r=this.boundingSphere.center;if(Si.setFromBufferAttribute(e),t)for(let l=0,d=t.length;l<d;l++){const h=t[l];qo.setFromBufferAttribute(h),this.morphTargetsRelative?(Ln.addVectors(Si.min,qo.min),Si.expandByPoint(Ln),Ln.addVectors(Si.max,qo.max),Si.expandByPoint(Ln)):(Si.expandByPoint(qo.min),Si.expandByPoint(qo.max))}Si.getCenter(r);let o=0;for(let l=0,d=e.count;l<d;l++)Ln.fromBufferAttribute(e,l),o=Math.max(o,r.distanceToSquared(Ln));if(t)for(let l=0,d=t.length;l<d;l++){const h=t[l],p=this.morphTargetsRelative;for(let m=0,y=h.count;m<y;m++)Ln.fromBufferAttribute(h,m),p&&(Ya.fromBufferAttribute(e,m),Ln.add(Ya)),o=Math.max(o,r.distanceToSquared(Ln))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&zt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){zt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,o=t.normal,l=t.uv;let d=this.getAttribute("tangent");(d===void 0||d.count!==r.count)&&(d=new Fr(new Float32Array(4*r.count),4),this.setAttribute("tangent",d));const h=[],p=[];for(let b=0;b<r.count;b++)h[b]=new ne,p[b]=new ne;const m=new ne,y=new ne,S=new ne,v=new mt,M=new mt,w=new mt,C=new ne,x=new ne;function _(b,N,O){m.fromBufferAttribute(r,b),y.fromBufferAttribute(r,N),S.fromBufferAttribute(r,O),v.fromBufferAttribute(l,b),M.fromBufferAttribute(l,N),w.fromBufferAttribute(l,O),y.sub(m),S.sub(m),M.sub(v),w.sub(v);const V=1/(M.x*w.y-w.x*M.y);isFinite(V)&&(C.copy(y).multiplyScalar(w.y).addScaledVector(S,-M.y).multiplyScalar(V),x.copy(S).multiplyScalar(M.x).addScaledVector(y,-w.x).multiplyScalar(V),h[b].add(C),h[N].add(C),h[O].add(C),p[b].add(x),p[N].add(x),p[O].add(x))}let D=this.groups;D.length===0&&(D=[{start:0,count:e.count}]);for(let b=0,N=D.length;b<N;++b){const O=D[b],V=O.start,Y=O.count;for(let Q=V,G=V+Y;Q<G;Q+=3)_(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const z=new ne,R=new ne,P=new ne,L=new ne;function B(b){P.fromBufferAttribute(o,b),L.copy(P);const N=h[b];z.copy(N),z.sub(P.multiplyScalar(P.dot(N))).normalize(),R.crossVectors(L,N);const V=R.dot(p[b])<0?-1:1;d.setXYZW(b,z.x,z.y,z.z,V)}for(let b=0,N=D.length;b<N;++b){const O=D[b],V=O.start,Y=O.count;for(let Q=V,G=V+Y;Q<G;Q+=3)B(e.getX(Q+0)),B(e.getX(Q+1)),B(e.getX(Q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0||r.count!==t.count)r=new Fr(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let v=0,M=r.count;v<M;v++)r.setXYZ(v,0,0,0);const o=new ne,l=new ne,d=new ne,h=new ne,p=new ne,m=new ne,y=new ne,S=new ne;if(e)for(let v=0,M=e.count;v<M;v+=3){const w=e.getX(v+0),C=e.getX(v+1),x=e.getX(v+2);o.fromBufferAttribute(t,w),l.fromBufferAttribute(t,C),d.fromBufferAttribute(t,x),y.subVectors(d,l),S.subVectors(o,l),y.cross(S),h.fromBufferAttribute(r,w),p.fromBufferAttribute(r,C),m.fromBufferAttribute(r,x),h.add(y),p.add(y),m.add(y),r.setXYZ(w,h.x,h.y,h.z),r.setXYZ(C,p.x,p.y,p.z),r.setXYZ(x,m.x,m.y,m.z)}else for(let v=0,M=t.count;v<M;v+=3)o.fromBufferAttribute(t,v+0),l.fromBufferAttribute(t,v+1),d.fromBufferAttribute(t,v+2),y.subVectors(d,l),S.subVectors(o,l),y.cross(S),r.setXYZ(v+0,y.x,y.y,y.z),r.setXYZ(v+1,y.x,y.y,y.z),r.setXYZ(v+2,y.x,y.y,y.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)Ln.fromBufferAttribute(e,t),Ln.normalize(),e.setXYZ(t,Ln.x,Ln.y,Ln.z)}toNonIndexed(){function e(h,p){const m=h.array,y=h.itemSize,S=h.normalized,v=new m.constructor(p.length*y);let M=0,w=0;for(let C=0,x=p.length;C<x;C++){h.isInterleavedBufferAttribute?M=p[C]*h.data.stride+h.offset:M=p[C]*y;for(let _=0;_<y;_++)v[w++]=m[M++]}return new Fr(v,y,S)}if(this.index===null)return pt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ni,r=this.index.array,o=this.attributes;for(const h in o){const p=o[h],m=e(p,r);t.setAttribute(h,m)}const l=this.morphAttributes;for(const h in l){const p=[],m=l[h];for(let y=0,S=m.length;y<S;y++){const v=m[y],M=e(v,r);p.push(M)}t.morphAttributes[h]=p}t.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let h=0,p=d.length;h<p;h++){const m=d[h];t.addGroup(m.start,m.count,m.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const p in r){const m=r[p];e.data.attributes[p]=m.toJSON(e.data)}const o={};let l=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],y=[];for(let S=0,v=m.length;S<v;S++){const M=m[S];y.push(M.toJSON(e.data))}y.length>0&&(o[p]=y,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const o=e.attributes;for(const m in o){const y=o[m];this.setAttribute(m,y.clone(t))}const l=e.morphAttributes;for(const m in l){const y=[],S=l[m];for(let v=0,M=S.length;v<M;v++)y.push(S[v].clone(t));this.morphAttributes[m]=y}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let m=0,y=d.length;m<y;m++){const S=d[m];this.addGroup(S.start,S.count,S.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const af=new ne,K_=new ne,Z_=new _t;class Dr{constructor(e=new ne(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,o){return this.normal.set(e,t,r),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const o=af.subVectors(r,t).cross(K_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,r=!0){const o=e.delta(af),l=this.normal.dot(o);if(l===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const d=-(e.start.dot(this.normal)+this.constant)/l;return r===!0&&(d<0||d>1)?null:t.copy(e.start).addScaledVector(o,d)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||Z_.getNormalMatrix(e),o=this.coplanarPoint(af).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let J_=0;class oo extends gs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:J_++}),this.uuid=ol(),this.name="",this.type="Material",this.blending=el,this.side=ta,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=og,this.blendDst=lg,this.blendEquation=Za,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Lt(0,0,0),this.blendAlpha=0,this.depthFunc=tl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=__,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zd,this.stencilZFail=zd,this.stencilZPass=zd,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){pt(`Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){pt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(r):o&&o.isVector2&&r&&r.isVector2||o&&o.isEuler&&r&&r.isEuler||o&&o.isVector3&&r&&r.isVector3?o.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,r.blending=this.blending,r.side=this.side,r.shadowSide=this.shadowSide,r.vertexColors=this.vertexColors,r.opacity=this.opacity,r.transparent=this.transparent,r.blendSrc=this.blendSrc,r.blendDst=this.blendDst,r.blendEquation=this.blendEquation,r.blendSrcAlpha=this.blendSrcAlpha,r.blendDstAlpha=this.blendDstAlpha,r.blendEquationAlpha=this.blendEquationAlpha,r.blendColor=this.blendColor.getHex(),r.blendAlpha=this.blendAlpha,r.depthFunc=this.depthFunc,r.depthTest=this.depthTest,r.depthWrite=this.depthWrite,r.colorWrite=this.colorWrite,r.clipIntersection=this.clipIntersection,r.clipShadows=this.clipShadows,r.stencilWriteMask=this.stencilWriteMask,r.stencilFunc=this.stencilFunc,r.stencilRef=this.stencilRef,r.stencilFuncMask=this.stencilFuncMask,r.stencilFail=this.stencilFail,r.stencilZFail=this.stencilZFail,r.stencilZPass=this.stencilZPass,r.stencilWrite=this.stencilWrite,r.polygonOffset=this.polygonOffset,r.polygonOffsetFactor=this.polygonOffsetFactor,r.polygonOffsetUnits=this.polygonOffsetUnits,r.dithering=this.dithering,r.alphaTest=this.alphaTest,r.alphaHash=this.alphaHash,r.alphaToCoverage=this.alphaToCoverage,r.premultipliedAlpha=this.premultipliedAlpha,r.forceSinglePass=this.forceSinglePass,r.allowOverride=this.allowOverride,r.visible=this.visible,r.toneMapped=this.toneMapped,r.name=this.name,this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(r.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(r.clippingPlanes=this.clippingPlanes.map(l=>l.toJSON())),this.rotation!==void 0&&(r.rotation=this.rotation),this.depthPacking!==void 0&&(r.depthPacking=this.depthPacking),this.linewidth!==void 0&&(r.linewidth=this.linewidth),this.linecap!==void 0&&(r.linecap=this.linecap),this.linejoin!==void 0&&(r.linejoin=this.linejoin),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.wireframe!==void 0&&(r.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(r.flatShading=this.flatShading),this.fog!==void 0&&(r.fog=this.fog),Object.keys(this.userData).length>0&&(r.userData=this.userData);function o(l){const d=[];for(const h in l){const p=l[h];delete p.metadata,d.push(p)}return d}if(t){const l=o(e.textures),d=o(e.images);l.length>0&&(r.textures=l),d.length>0&&(r.images=d)}return r}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Lt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(r=>new Dr().fromJSON(r))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),this.normalScale=new mt().fromArray(r)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new mt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const o=t.length;r=new Array(o);for(let l=0;l!==o;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Lr=new ne,of=new ne,vc=new ne,_c=new ne;class ru{constructor(e=new ne,t=new ne(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Lr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Lr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Lr.copy(this.origin).addScaledVector(this.direction,t),Lr.distanceToSquared(e))}distanceSqToSegment(e,t,r,o){of.copy(e).add(t).multiplyScalar(.5),vc.copy(t).sub(e).normalize(),_c.copy(this.origin).sub(of);const l=e.distanceTo(t)*.5,d=-this.direction.dot(vc),h=_c.dot(this.direction),p=-_c.dot(vc),m=_c.lengthSq(),y=Math.abs(1-d*d);let S,v,M,w;if(y>0)if(S=d*p-h,v=d*h-p,w=l*y,S>=0)if(v>=-w)if(v<=w){const C=1/y;S*=C,v*=C,M=S*(S+d*v+2*h)+v*(d*S+v+2*p)+m}else v=l,S=Math.max(0,-(d*v+h)),M=-S*S+v*(v+2*p)+m;else v=-l,S=Math.max(0,-(d*v+h)),M=-S*S+v*(v+2*p)+m;else v<=-w?(S=Math.max(0,-(-d*l+h)),v=S>0?-l:Math.min(Math.max(-l,-p),l),M=-S*S+v*(v+2*p)+m):v<=w?(S=0,v=Math.min(Math.max(-l,-p),l),M=v*(v+2*p)+m):(S=Math.max(0,-(d*l+h)),v=S>0?l:Math.min(Math.max(-l,-p),l),M=-S*S+v*(v+2*p)+m);else v=d>0?-l:l,S=Math.max(0,-(d*v+h)),M=-S*S+v*(v+2*p)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,S),o&&o.copy(of).addScaledVector(vc,v),M}intersectSphere(e,t){if(e.radius<0)return null;Lr.subVectors(e.center,this.origin);const r=Lr.dot(this.direction),o=Lr.dot(Lr)-r*r,l=e.radius*e.radius;if(o>l)return null;const d=Math.sqrt(l-o),h=r-d,p=r+d;return p<0?null:h<0?this.at(p,t):this.at(h,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,o,l,d,h,p;const m=1/this.direction.x,y=1/this.direction.y,S=1/this.direction.z,v=this.origin;return m>=0?(r=(e.min.x-v.x)*m,o=(e.max.x-v.x)*m):(r=(e.max.x-v.x)*m,o=(e.min.x-v.x)*m),y>=0?(l=(e.min.y-v.y)*y,d=(e.max.y-v.y)*y):(l=(e.max.y-v.y)*y,d=(e.min.y-v.y)*y),r>d||l>o||((l>r||isNaN(r))&&(r=l),(d<o||isNaN(o))&&(o=d),S>=0?(h=(e.min.z-v.z)*S,p=(e.max.z-v.z)*S):(h=(e.max.z-v.z)*S,p=(e.min.z-v.z)*S),r>p||h>o)||((h>r||r!==r)&&(r=h),(p<o||o!==o)&&(o=p),o<0)?null:this.at(r>=0?r:o,t)}intersectsBox(e){return this.intersectBox(e,Lr)!==null}intersectTriangle(e,t,r,o,l){const d=this.origin,h=this.direction,p=h.x,m=h.y,y=h.z,S=e.x-d.x,v=e.y-d.y,M=e.z-d.z,w=t.x-d.x,C=t.y-d.y,x=t.z-d.z,_=r.x-d.x,D=r.y-d.y,z=r.z-d.z,R=Math.abs(p),P=Math.abs(m),L=Math.abs(y);let B,b,N,O,V,Y,Q,G,F,ce,Z,J;if(R>=P&&R>=L?(N=p,Y=S,F=w,J=_,p>=0?(B=m,b=y,O=v,V=M,Q=C,G=x,ce=D,Z=z):(B=y,b=m,O=M,V=v,Q=x,G=C,ce=z,Z=D)):P>=L?(N=m,Y=v,F=C,J=D,m>=0?(B=y,b=p,O=M,V=S,Q=x,G=w,ce=z,Z=_):(B=p,b=y,O=S,V=M,Q=w,G=x,ce=_,Z=z)):(N=y,Y=M,F=x,J=z,y>=0?(B=p,b=m,O=S,V=v,Q=w,G=C,ce=_,Z=D):(B=m,b=p,O=v,V=S,Q=C,G=w,ce=D,Z=_)),N===0)return null;const W=B/N,ee=b/N,I=1/N,q=O-W*Y,xe=V-ee*Y,we=Q-W*F,Ve=G-ee*F,$e=ce-W*J,ae=Z-ee*J,de=$e*Ve-ae*we,Se=q*ae-xe*$e,Ze=we*xe-Ve*q;if(o){if(de<0||Se<0||Ze<0)return null}else if((de<0||Se<0||Ze<0)&&(de>0||Se>0||Ze>0))return null;const je=de+Se+Ze;if(je===0)return null;const Ie=I*(de*Y+Se*F+Ze*J);return(je>0?Ie<0:Ie>0)?null:this.at(Ie/je,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qa extends oo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ms,this.combine=cg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const g0=new ln,$s=new ru,yc=new iu,x0=new ne,Sc=new ne,Mc=new ne,bc=new ne,lf=new ne,Ec=new ne,v0=new ne,wc=new ne;class He extends wn{constructor(e=new ni,t=new Qa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=o.length;l<d;l++){const h=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=l}}}}getVertexPosition(e,t){const r=this.geometry,o=r.attributes.position,l=r.morphAttributes.position,d=r.morphTargetsRelative;t.fromBufferAttribute(o,e);const h=this.morphTargetInfluences;if(l&&h){Ec.set(0,0,0);for(let p=0,m=l.length;p<m;p++){const y=h[p],S=l[p];y!==0&&(lf.fromBufferAttribute(S,e),d?Ec.addScaledVector(lf,y):Ec.addScaledVector(lf.sub(t),y))}t.add(Ec)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const r=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),yc.copy(r.boundingSphere),yc.applyMatrix4(l),$s.copy(e.ray).recast(e.near),!(yc.containsPoint($s.origin)===!1&&($s.intersectSphere(yc,x0)===null||$s.origin.distanceToSquared(x0)>(e.far-e.near)**2))&&(g0.copy(l).invert(),$s.copy(e.ray).applyMatrix4(g0),!(r.boundingBox!==null&&$s.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,$s)))}_computeIntersections(e,t,r){let o;const l=this.geometry,d=this.material,h=l.index,p=l.attributes.position,m=l.attributes.uv,y=l.attributes.uv1,S=l.attributes.normal,v=l.groups,M=l.drawRange;if(h!==null)if(Array.isArray(d))for(let w=0,C=v.length;w<C;w++){const x=v[w],_=d[x.materialIndex],D=Math.max(x.start,M.start),z=Math.min(h.count,Math.min(x.start+x.count,M.start+M.count));for(let R=D,P=z;R<P;R+=3){const L=h.getX(R),B=h.getX(R+1),b=h.getX(R+2);o=Tc(this,_,e,r,m,y,S,L,B,b),o&&(o.faceIndex=Math.floor(R/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const w=Math.max(0,M.start),C=Math.min(h.count,M.start+M.count);for(let x=w,_=C;x<_;x+=3){const D=h.getX(x),z=h.getX(x+1),R=h.getX(x+2);o=Tc(this,d,e,r,m,y,S,D,z,R),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}else if(p!==void 0)if(Array.isArray(d))for(let w=0,C=v.length;w<C;w++){const x=v[w],_=d[x.materialIndex],D=Math.max(x.start,M.start),z=Math.min(p.count,Math.min(x.start+x.count,M.start+M.count));for(let R=D,P=z;R<P;R+=3){const L=R,B=R+1,b=R+2;o=Tc(this,_,e,r,m,y,S,L,B,b),o&&(o.faceIndex=Math.floor(R/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const w=Math.max(0,M.start),C=Math.min(p.count,M.start+M.count);for(let x=w,_=C;x<_;x+=3){const D=x,z=x+1,R=x+2;o=Tc(this,d,e,r,m,y,S,D,z,R),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}}}function Q_(s,e,t,r,o,l,d,h){let p;if(e.side===hi?p=r.intersectTriangle(d,l,o,!0,h):p=r.intersectTriangle(o,l,d,e.side===ta,h),p===null)return null;wc.copy(h),wc.applyMatrix4(s.matrixWorld);const m=t.ray.origin.distanceTo(wc);return m<t.near||m>t.far?null:{distance:m,point:wc.clone(),object:s}}function Tc(s,e,t,r,o,l,d,h,p,m){s.getVertexPosition(h,Sc),s.getVertexPosition(p,Mc),s.getVertexPosition(m,bc);const y=Q_(s,e,t,r,Sc,Mc,bc,v0);if(y){const S=new ne;qi.getBarycoord(v0,Sc,Mc,bc,S),o&&(y.uv=qi.getInterpolatedAttribute(o,h,p,m,S,new mt)),l&&(y.uv1=qi.getInterpolatedAttribute(l,h,p,m,S,new mt)),d&&(y.normal=qi.getInterpolatedAttribute(d,h,p,m,S,new ne),y.normal.dot(r.direction)>0&&y.normal.multiplyScalar(-1));const v={a:h,b:p,c:m,normal:new ne,materialIndex:0};qi.getNormal(Sc,Mc,bc,v.normal),y.face=v,y.barycoord=S}return y}class ey extends Xn{constructor(e=null,t=1,r=1,o,l,d,h,p,m=Fn,y=Fn,S,v){super(null,d,h,p,m,y,o,l,S,v),this.isDataTexture=!0,this.image={data:e,width:t,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ks=new iu,ty=new mt(.5,.5),Ac=new ne;class bh{constructor(e=new Dr,t=new Dr,r=new Dr,o=new Dr,l=new Dr,d=new Dr){this.planes=[e,t,r,o,l,d]}set(e,t,r,o,l,d){const h=this.planes;return h[0].copy(e),h[1].copy(t),h[2].copy(r),h[3].copy(o),h[4].copy(l),h[5].copy(d),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=ur,r=!1){const o=this.planes,l=e.elements,d=l[0],h=l[1],p=l[2],m=l[3],y=l[4],S=l[5],v=l[6],M=l[7],w=l[8],C=l[9],x=l[10],_=l[11],D=l[12],z=l[13],R=l[14],P=l[15];if(o[0].setComponents(m-d,M-y,_-w,P-D).normalize(),o[1].setComponents(m+d,M+y,_+w,P+D).normalize(),o[2].setComponents(m+h,M+S,_+C,P+z).normalize(),o[3].setComponents(m-h,M-S,_-C,P-z).normalize(),r)o[4].setComponents(p,v,x,R).normalize(),o[5].setComponents(m-p,M-v,_-x,P-R).normalize();else if(o[4].setComponents(m-p,M-v,_-x,P-R).normalize(),t===ur)o[5].setComponents(m+p,M+v,_+x,P+R).normalize();else if(t===sl)o[5].setComponents(p,v,x,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ks.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ks.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ks)}intersectsSprite(e){Ks.center.set(0,0,0);const t=ty.distanceTo(e.center);return Ks.radius=.7071067811865476+t,Ks.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ks)}intersectsSphere(e){const t=this.planes,r=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const o=t[r];if(Ac.x=o.normal.x>0?e.max.x:e.min.x,Ac.y=o.normal.y>0?e.max.y:e.min.y,Ac.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Ac)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cg extends oo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const $c=new ne,Kc=new ne,_0=new ln,$o=new ru,Rc=new iu,cf=new ne,y0=new ne;class ny extends wn{constructor(e=new ni,t=new Cg){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let o=1,l=t.count;o<l;o++)$c.fromBufferAttribute(t,o-1),Kc.fromBufferAttribute(t,o),r[o]=r[o-1],r[o]+=$c.distanceTo(Kc);e.setAttribute("lineDistance",new pn(r,1))}else pt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const r=this.geometry,o=this.matrixWorld,l=e.params.Line.threshold,d=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Rc.copy(r.boundingSphere),Rc.applyMatrix4(o),Rc.radius+=l,e.ray.intersectsSphere(Rc)===!1)return;_0.copy(o).invert(),$o.copy(e.ray).applyMatrix4(_0);const h=l/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=this.isLineSegments?2:1,y=r.index,v=r.attributes.position;if(y!==null){const M=Math.max(0,d.start),w=Math.min(y.count,d.start+d.count);for(let C=M,x=w-1;C<x;C+=m){const _=y.getX(C),D=y.getX(C+1),z=Cc(this,e,$o,p,_,D,C);z&&t.push(z)}if(this.isLineLoop){const C=y.getX(w-1),x=y.getX(M),_=Cc(this,e,$o,p,C,x,w-1);_&&t.push(_)}}else{const M=Math.max(0,d.start),w=Math.min(v.count,d.start+d.count);for(let C=M,x=w-1;C<x;C+=m){const _=Cc(this,e,$o,p,C,C+1,C);_&&t.push(_)}if(this.isLineLoop){const C=Cc(this,e,$o,p,w-1,M,w-1);C&&t.push(C)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=o.length;l<d;l++){const h=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=l}}}}}function Cc(s,e,t,r,o,l,d){const h=s.geometry.attributes.position;if($c.fromBufferAttribute(h,o),Kc.fromBufferAttribute(h,l),t.distanceSqToSegment($c,Kc,cf,y0)>r)return;cf.applyMatrix4(s.matrixWorld);const m=e.ray.origin.distanceTo(cf);if(!(m<e.near||m>e.far))return{distance:m,point:y0.clone().applyMatrix4(s.matrixWorld),index:d,face:null,faceIndex:null,barycoord:null,object:s}}class Ng extends Xn{constructor(e=[],t=na,r,o,l,d,h,p,m,y){super(e,t,r,o,l,d,h,p,m,y),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class iy extends Xn{constructor(e,t,r,o,l,d,h,p,m){super(e,t,r,o,l,d,h,p,m),this.isCanvasTexture=!0,this.needsUpdate=!0}}class al extends Xn{constructor(e,t,r=fr,o,l,d,h=Fn,p=Fn,m,y=kr,S=1){if(y!==kr&&y!==ea)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:e,height:t,depth:S};super(v,o,l,d,h,p,y,r,m),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new yh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class ry extends al{constructor(e,t=fr,r=na,o,l,d=Fn,h=Fn,p,m=kr){const y={width:e,height:e,depth:1},S=[y,y,y,y,y,y];super(e,e,t,r,o,l,d,h,p,m),this.image=S,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Pg extends Xn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Pt extends ni{constructor(e=1,t=1,r=1,o=1,l=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:o,heightSegments:l,depthSegments:d};const h=this;o=Math.floor(o),l=Math.floor(l),d=Math.floor(d);const p=[],m=[],y=[],S=[];let v=0,M=0;w("z","y","x",-1,-1,r,t,e,d,l,0),w("z","y","x",1,-1,r,t,-e,d,l,1),w("x","z","y",1,1,e,r,t,o,d,2),w("x","z","y",1,-1,e,r,-t,o,d,3),w("x","y","z",1,-1,e,t,r,o,l,4),w("x","y","z",-1,-1,e,t,-r,o,l,5),this.setIndex(p),this.setAttribute("position",new pn(m,3)),this.setAttribute("normal",new pn(y,3)),this.setAttribute("uv",new pn(S,2));function w(C,x,_,D,z,R,P,L,B,b,N){const O=R/B,V=P/b,Y=R/2,Q=P/2,G=L/2,F=B+1,ce=b+1;let Z=0,J=0;const W=new ne;for(let ee=0;ee<ce;ee++){const I=ee*V-Q;for(let q=0;q<F;q++){const xe=q*O-Y;W[C]=xe*D,W[x]=I*z,W[_]=G,m.push(W.x,W.y,W.z),W[C]=0,W[x]=0,W[_]=L>0?1:-1,y.push(W.x,W.y,W.z),S.push(q/B),S.push(1-ee/b),Z+=1}}for(let ee=0;ee<b;ee++)for(let I=0;I<B;I++){const q=v+I+F*ee,xe=v+I+F*(ee+1),we=v+(I+1)+F*(ee+1),Ve=v+(I+1)+F*ee;p.push(q,xe,Ve),p.push(xe,we,Ve),J+=6}h.addGroup(M,J,N),M+=J,v+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class On extends ni{constructor(e=1,t=1,r=1,o=32,l=1,d=!1,h=0,p=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:o,heightSegments:l,openEnded:d,thetaStart:h,thetaLength:p};const m=this;o=Math.floor(o),l=Math.floor(l);const y=[],S=[],v=[],M=[];let w=0;const C=[],x=r/2;let _=0;D(),d===!1&&(e>0&&z(!0),t>0&&z(!1)),this.setIndex(y),this.setAttribute("position",new pn(S,3)),this.setAttribute("normal",new pn(v,3)),this.setAttribute("uv",new pn(M,2));function D(){const R=new ne,P=new ne;let L=0;const B=(t-e)/r;for(let b=0;b<=l;b++){const N=[],O=b/l,V=O*(t-e)+e;for(let Y=0;Y<=o;Y++){const Q=Y/o,G=Q*p+h,F=Math.sin(G),ce=Math.cos(G);P.x=V*F,P.y=-O*r+x,P.z=V*ce,S.push(P.x,P.y,P.z),R.set(F,B,ce).normalize(),v.push(R.x,R.y,R.z),M.push(Q,1-O),N.push(w++)}C.push(N)}for(let b=0;b<o;b++)for(let N=0;N<l;N++){const O=C[N][b],V=C[N+1][b],Y=C[N+1][b+1],Q=C[N][b+1];(e>0||N!==0)&&(y.push(O,V,Q),L+=3),(t>0||N!==l-1)&&(y.push(V,Y,Q),L+=3)}m.addGroup(_,L,0),_+=L}function z(R){const P=w,L=new mt,B=new ne;let b=0;const N=R===!0?e:t,O=R===!0?1:-1;for(let Y=1;Y<=o;Y++)S.push(0,x*O,0),v.push(0,O,0),M.push(.5,.5),w++;const V=w;for(let Y=0;Y<=o;Y++){const G=Y/o*p+h,F=Math.cos(G),ce=Math.sin(G);B.x=N*ce,B.y=x*O,B.z=N*F,S.push(B.x,B.y,B.z),v.push(0,O,0),L.x=F*.5+.5,L.y=ce*.5*O+.5,M.push(L.x,L.y),w++}for(let Y=0;Y<o;Y++){const Q=P+Y,G=V+Y;R===!0?y.push(G,G+1,Q):y.push(G+1,G,Q),b+=3}m.addGroup(_,b,R===!0?1:2),_+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new On(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Eh extends On{constructor(e=1,t=1,r=32,o=1,l=!1,d=0,h=Math.PI*2){super(0,e,t,r,o,l,d,h),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:r,heightSegments:o,openEnded:l,thetaStart:d,thetaLength:h}}static fromJSON(e){return new Eh(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class or extends ni{constructor(e=1,t=1,r=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:o};const l=e/2,d=t/2,h=Math.floor(r),p=Math.floor(o),m=h+1,y=p+1,S=e/h,v=t/p,M=[],w=[],C=[],x=[];for(let _=0;_<y;_++){const D=_*v-d;for(let z=0;z<m;z++){const R=z*S-l;w.push(R,-D,0),C.push(0,0,1),x.push(z/h),x.push(1-_/p)}}for(let _=0;_<p;_++)for(let D=0;D<h;D++){const z=D+m*_,R=D+m*(_+1),P=D+1+m*(_+1),L=D+1+m*_;M.push(z,R,L),M.push(R,P,L)}this.setIndex(M),this.setAttribute("position",new pn(w,3)),this.setAttribute("normal",new pn(C,3)),this.setAttribute("uv",new pn(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new or(e.width,e.height,e.widthSegments,e.heightSegments)}}class Zc extends ni{constructor(e=.5,t=1,r=32,o=1,l=0,d=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:r,phiSegments:o,thetaStart:l,thetaLength:d},r=Math.max(3,r),o=Math.max(1,o);const h=[],p=[],m=[],y=[];let S=e;const v=(t-e)/o,M=new ne,w=new mt;for(let C=0;C<=o;C++){for(let x=0;x<=r;x++){const _=l+x/r*d;M.x=S*Math.cos(_),M.y=S*Math.sin(_),p.push(M.x,M.y,M.z),m.push(0,0,1),w.x=(M.x/t+1)/2,w.y=(M.y/t+1)/2,y.push(w.x,w.y)}S+=v}for(let C=0;C<o;C++){const x=C*(r+1);for(let _=0;_<r;_++){const D=_+x,z=D,R=D+r+1,P=D+r+2,L=D+1;h.push(z,R,L),h.push(R,P,L)}}this.setIndex(h),this.setAttribute("position",new pn(p,3)),this.setAttribute("normal",new pn(m,3)),this.setAttribute("uv",new pn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class wh extends ni{constructor(e=1,t=32,r=16,o=0,l=Math.PI*2,d=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:o,phiLength:l,thetaStart:d,thetaLength:h},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const p=Math.min(d+h,Math.PI);let m=0;const y=[],S=new ne,v=new ne,M=[],w=[],C=[],x=[];for(let _=0;_<=r;_++){const D=[],z=_/r,R=d+z*h,P=e*Math.cos(R),L=Math.sqrt(e*e-P*P);let B=0;_===0&&d===0?B=.5/t:_===r&&p===Math.PI&&(B=-.5/t);for(let b=0;b<=t;b++){const N=b/t,O=o+N*l;S.x=-L*Math.cos(O),S.y=P,S.z=L*Math.sin(O),w.push(S.x,S.y,S.z),v.copy(S).normalize(),C.push(v.x,v.y,v.z),x.push(N+B,1-z),D.push(m++)}y.push(D)}for(let _=0;_<r;_++)for(let D=0;D<t;D++){const z=y[_][D+1],R=y[_][D],P=y[_+1][D],L=y[_+1][D+1];(_!==0||d>0)&&M.push(z,R,L),(_!==r-1||p<Math.PI)&&M.push(R,P,L)}this.setIndex(M),this.setAttribute("position",new pn(w,3)),this.setAttribute("normal",new pn(C,3)),this.setAttribute("uv",new pn(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Jc extends ni{constructor(e=1,t=.4,r=12,o=48,l=Math.PI*2,d=0,h=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:r,tubularSegments:o,arc:l,thetaStart:d,thetaLength:h},r=Math.floor(r),o=Math.floor(o);const p=[],m=[],y=[],S=[],v=new ne,M=new ne,w=new ne;for(let C=0;C<=r;C++){const x=d+C/r*h;for(let _=0;_<=o;_++){const D=_/o*l;M.x=(e+t*Math.cos(x))*Math.cos(D),M.y=(e+t*Math.cos(x))*Math.sin(D),M.z=t*Math.sin(x),m.push(M.x,M.y,M.z),v.x=e*Math.cos(D),v.y=e*Math.sin(D),w.subVectors(M,v).normalize(),y.push(w.x,w.y,w.z),S.push(_/o),S.push(C/r)}}for(let C=1;C<=r;C++)for(let x=1;x<=o;x++){const _=(o+1)*C+x-1,D=(o+1)*(C-1)+x-1,z=(o+1)*(C-1)+x,R=(o+1)*C+x;p.push(_,D,R),p.push(D,z,R)}this.setIndex(p),this.setAttribute("position",new pn(m,3)),this.setAttribute("normal",new pn(y,3)),this.setAttribute("uv",new pn(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function so(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const o=s[t][r];if(S0(o))o.isRenderTargetTexture?(pt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=o.clone();else if(Array.isArray(o))if(S0(o[0])){const l=[];for(let d=0,h=o.length;d<h;d++)l[d]=o[d].clone();e[t][r]=l}else e[t][r]=o.slice();else e[t][r]=o}}return e}function ei(s){const e={};for(let t=0;t<s.length;t++){const r=so(s[t]);for(const o in r)e[o]=r[o]}return e}function S0(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function sy(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Lg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ot.workingColorSpace}const ay={clone:so,merge:ei};var oy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ly=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pr extends oo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=oy,this.fragmentShader=ly,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=so(e.uniforms),this.uniformsGroups=sy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const d=this.uniforms[o].value;d&&d.isTexture?t.uniforms[o]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?t.uniforms[o]={type:"c",value:d.getHex()}:d&&d.isVector2?t.uniforms[o]={type:"v2",value:d.toArray()}:d&&d.isVector3?t.uniforms[o]={type:"v3",value:d.toArray()}:d&&d.isVector4?t.uniforms[o]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?t.uniforms[o]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?t.uniforms[o]={type:"m4",value:d.toArray()}:t.uniforms[o]={value:d}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const o in this.extensions)this.extensions[o]===!0&&(r[o]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const r in e.uniforms){const o=e.uniforms[r];switch(this.uniforms[r]={},o.type){case"t":this.uniforms[r].value=t[o.value]||null;break;case"c":this.uniforms[r].value=new Lt().setHex(o.value);break;case"v2":this.uniforms[r].value=new mt().fromArray(o.value);break;case"v3":this.uniforms[r].value=new ne().fromArray(o.value);break;case"v4":this.uniforms[r].value=new fn().fromArray(o.value);break;case"m3":this.uniforms[r].value=new _t().fromArray(o.value);break;case"m4":this.uniforms[r].value=new ln().fromArray(o.value);break;default:this.uniforms[r].value=o.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)this.extensions[r]=e.extensions[r];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class cy extends pr{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Yt extends oo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ih,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ms,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class uy extends oo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=x_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class dy extends oo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Th extends wn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Lt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const uf=new ln,M0=new ne,b0=new ne;class Dg{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.mapType=bi,this.map=null,this.mapPass=null,this.matrix=new ln,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bh,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new fn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;M0.setFromMatrixPosition(e.matrixWorld),t.position.copy(M0),b0.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(b0),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,r,o){uf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),r.setFromProjectionMatrix(uf,e.coordinateSystem,e.reversedDepth);const l=this._frameExtents,d=o?o.z/l.x:1,h=o?o.w/l.y:1,p=o?o.x/l.x:0,m=o?o.y/l.y:0;e.coordinateSystem===sl||e.reversedDepth?t.set(.5*d,0,0,.5*d+p,0,.5*h,0,.5*h+m,0,0,1,0,0,0,0,1):t.set(.5*d,0,0,.5*d+p,0,.5*h,0,.5*h+m,0,0,.5,.5,0,0,0,1),t.multiply(uf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Nc=new ne,Pc=new ps,sr=new ne;let Ig=class extends wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ln,this.projectionMatrix=new ln,this.projectionMatrixInverse=new ln,this.coordinateSystem=ur,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Nc,Pc,sr),sr.x===1&&sr.y===1&&sr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Nc,Pc,sr.set(1,1,1)).invert()}updateWorldMatrix(e,t,r=!1){super.updateWorldMatrix(e,t,r),this.matrixWorld.decompose(Nc,Pc,sr),sr.x===1&&sr.y===1&&sr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Nc,Pc,sr.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}};const fs=new ne,E0=new mt,w0=new mt;class Mi extends Ig{constructor(e=50,t=1,r=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=qc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Vc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qc*2*Math.atan(Math.tan(Vc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){fs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fs.x,fs.y).multiplyScalar(-e/fs.z),fs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(fs.x,fs.y).multiplyScalar(-e/fs.z)}getViewSize(e,t){return this.getViewBounds(e,E0,w0),t.subVectors(w0,E0)}setViewOffset(e,t,r,o,l,d){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Vc*.5*this.fov)/this.zoom,r=2*t,o=this.aspect*r,l=-.5*o;const d=this.view;if(this.view!==null&&this.view.enabled){const p=d.fullWidth,m=d.fullHeight;l+=d.offsetX*o/p,t-=d.offsetY*r/m,o*=d.width/p,r*=d.height/m}const h=this.filmOffset;h!==0&&(l+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class fy extends Dg{constructor(){super(new Mi(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,r=qc*2*e.angle*this.focus,o=this.mapSize.width/this.mapSize.height*this.aspect,l=e.distance||t.far;(r!==t.fov||o!==t.aspect||l!==t.far)&&(t.fov=r,t.aspect=o,t.far=l,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){const e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}}class T0 extends Th{constructor(e,t,r=0,o=Math.PI/3,l=0,d=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(wn.DEFAULT_UP),this.updateMatrix(),this.target=new wn,this.distance=r,this.angle=o,this.penumbra=l,this.decay=d,this.map=null,this.shadow=new fy}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Ah extends Ig{constructor(e=-1,t=1,r=1,o=-1,l=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=o,this.near=l,this.far=d,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,o,l,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=r-e,d=r+e,h=o+t,p=o-t;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,y=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=m*this.view.offsetX,d=l+m*this.view.width,h-=y*this.view.offsetY,p=h-y*this.view.height}this.projectionMatrix.makeOrthographic(l,d,h,p,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class hy extends Dg{constructor(){super(new Ah(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class py extends Th{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wn.DEFAULT_UP),this.updateMatrix(),this.target=new wn,this.shadow=new hy}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class my extends Th{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const qa=-90,$a=1;class gy extends wn{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new Mi(qa,$a,e,t);o.layers=this.layers,this.add(o);const l=new Mi(qa,$a,e,t);l.layers=this.layers,this.add(l);const d=new Mi(qa,$a,e,t);d.layers=this.layers,this.add(d);const h=new Mi(qa,$a,e,t);h.layers=this.layers,this.add(h);const p=new Mi(qa,$a,e,t);p.layers=this.layers,this.add(p);const m=new Mi(qa,$a,e,t);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,o,l,d,h,p]=t;for(const m of t)this.remove(m);if(e===ur)r.up.set(0,1,0),r.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===sl)r.up.set(0,-1,0),r.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of t)this.add(m),m.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,d,h,p,m,y]=this.children,S=e.getRenderTarget(),v=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),w=e.xr.enabled;e.xr.enabled=!1;const C=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(r,0,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(r,1,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(r,2,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(r,3,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,p),e.setRenderTarget(r,4,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,m),r.texture.generateMipmaps=C,e.setRenderTarget(r,5,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,y),e.setRenderTarget(S,v,M),e.xr.enabled=w,r.texture.needsPMREMUpdate=!0}}class xy extends Mi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const A0=new ln;class vy{constructor(e,t,r=0,o=1/0){this.ray=new ru(e,t),this.near=r,this.far=o,this.camera=null,this.layers=new Sh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):zt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return A0.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(A0),this}intersectObject(e,t=!0,r=[]){return rh(e,this,r,t),r.sort(R0),r}intersectObjects(e,t=!0,r=[]){for(let o=0,l=e.length;o<l;o++)rh(e[o],this,r,t);return r.sort(R0),r}}function R0(s,e){return s.distance-e.distance}function rh(s,e,t,r){let o=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(o=!1),o===!0&&r===!0){const l=s.children;for(let d=0,h=l.length;d<h;d++)rh(l[d],e,t,!0)}}class _y{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,pt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class C0{constructor(e=1,t=0,r=0){this.radius=e,this.phi=t,this.theta=r}set(e,t,r){return this.radius=e,this.phi=t,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Tt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,r){return this.radius=Math.sqrt(e*e+t*t+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(Tt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Uh=class Uh{constructor(e,t,r,o){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,r,o)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let r=0;r<4;r++)this.elements[r]=e[r+t];return this}set(e,t,r,o){const l=this.elements;return l[0]=e,l[2]=t,l[1]=r,l[3]=o,this}};Uh.prototype.isMatrix2=!0;let N0=Uh;class yy extends gs{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function P0(s,e,t,r){const o=Sy(r);switch(t){case Sg:return s*e;case bg:return s*e/o.components*o.byteLength;case mh:return s*e/o.components*o.byteLength;case ia:return s*e*2/o.components*o.byteLength;case gh:return s*e*2/o.components*o.byteLength;case Mg:return s*e*3/o.components*o.byteLength;case $i:return s*e*4/o.components*o.byteLength;case xh:return s*e*4/o.components*o.byteLength;case Fc:case kc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Bc:case zc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Rf:case Nf:return Math.max(s,16)*Math.max(e,8)/4;case Af:case Cf:return Math.max(s,8)*Math.max(e,8)/2;case Pf:case Lf:case If:case Uf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Df:case Hc:case Of:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ff:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case kf:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Bf:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case zf:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Vf:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Gf:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Hf:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case jf:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Wf:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Xf:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Yf:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case qf:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case $f:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Kf:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Zf:case Jf:case Qf:return Math.ceil(s/4)*Math.ceil(e/4)*16;case eh:case th:return Math.ceil(s/4)*Math.ceil(e/4)*8;case jc:case nh:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Sy(s){switch(s){case bi:case xg:return{byteLength:1,components:1};case il:case vg:case hr:return{byteLength:2,components:1};case hh:case ph:return{byteLength:2,components:4};case fr:case fh:case cr:return{byteLength:4,components:1};case _g:case yg:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uh}}));typeof window<"u"&&(window.__THREE__?pt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ug(){let s=null,e=!1,t=null,r=null;function o(l,d){r=s.requestAnimationFrame(o),t(l,d)}return{start:function(){e!==!0&&t!==null&&s!==null&&(r=s.requestAnimationFrame(o),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function My(s){const e=new WeakMap;function t(h,p){const m=h.array,y=h.usage,S=m.byteLength,v=s.createBuffer();s.bindBuffer(p,v),s.bufferData(p,m,y),h.onUploadCallback();let M;if(m instanceof Float32Array)M=s.FLOAT;else if(typeof Float16Array<"u"&&m instanceof Float16Array)M=s.HALF_FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?M=s.HALF_FLOAT:M=s.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=s.SHORT;else if(m instanceof Uint32Array)M=s.UNSIGNED_INT;else if(m instanceof Int32Array)M=s.INT;else if(m instanceof Int8Array)M=s.BYTE;else if(m instanceof Uint8Array)M=s.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:v,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:S}}function r(h,p,m){const y=p.array,S=p.updateRanges;if(s.bindBuffer(m,h),S.length===0)s.bufferSubData(m,0,y);else{S.sort((M,w)=>M.start-w.start);let v=0;for(let M=1;M<S.length;M++){const w=S[v],C=S[M];C.start<=w.start+w.count+1?w.count=Math.max(w.count,C.start+C.count-w.start):(++v,S[v]=C)}S.length=v+1;for(let M=0,w=S.length;M<w;M++){const C=S[M];s.bufferSubData(m,C.start*y.BYTES_PER_ELEMENT,y,C.start,C.count)}p.clearUpdateRanges()}p.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function l(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=e.get(h);p&&(s.deleteBuffer(p.buffer),e.delete(h))}function d(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const y=e.get(h);(!y||y.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=e.get(h);if(m===void 0)e.set(h,t(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,h,p),m.version=h.version}}return{get:o,remove:l,update:d}}var by=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ey=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ty=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ay=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ry=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ny=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Py=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ly=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Iy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Uy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Oy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Fy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ky=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,By=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Hy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,jy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Wy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Xy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,$y=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ky=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qy="gl_FragColor = linearToOutputTexel( gl_FragColor );",eS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,nS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,iS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,rS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,aS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,oS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,uS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,dS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,mS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,gS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_S=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,SS=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,MS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ES=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wS=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,TS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,AS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,RS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,CS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,NS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,PS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,LS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,DS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,IS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,US=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,OS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,FS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,BS=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,zS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,VS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,GS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,HS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,WS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,XS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,YS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$S=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,KS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ZS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,JS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,QS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,e1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,t1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,n1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,i1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,r1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,s1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,a1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,o1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,l1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,c1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,u1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,d1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,f1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,h1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,p1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,m1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,g1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,x1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,v1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,y1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,S1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,M1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const b1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,E1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,R1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,N1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,P1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,L1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,D1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,I1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,O1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,F1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,k1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,z1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,G1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,j1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,W1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,X1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,q1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,K1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,J1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Q1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,yt={alphahash_fragment:by,alphahash_pars_fragment:Ey,alphamap_fragment:wy,alphamap_pars_fragment:Ty,alphatest_fragment:Ay,alphatest_pars_fragment:Ry,aomap_fragment:Cy,aomap_pars_fragment:Ny,batching_pars_vertex:Py,batching_vertex:Ly,begin_vertex:Dy,beginnormal_vertex:Iy,bsdfs:Uy,iridescence_fragment:Oy,bumpmap_pars_fragment:Fy,clipping_planes_fragment:ky,clipping_planes_pars_fragment:By,clipping_planes_pars_vertex:zy,clipping_planes_vertex:Vy,color_fragment:Gy,color_pars_fragment:Hy,color_pars_vertex:jy,color_vertex:Wy,common:Xy,cube_uv_reflection_fragment:Yy,defaultnormal_vertex:qy,displacementmap_pars_vertex:$y,displacementmap_vertex:Ky,emissivemap_fragment:Zy,emissivemap_pars_fragment:Jy,colorspace_fragment:Qy,colorspace_pars_fragment:eS,envmap_fragment:tS,envmap_common_pars_fragment:nS,envmap_pars_fragment:iS,envmap_pars_vertex:rS,envmap_physical_pars_fragment:mS,envmap_vertex:sS,fog_vertex:aS,fog_pars_vertex:oS,fog_fragment:lS,fog_pars_fragment:cS,gradientmap_pars_fragment:uS,lightmap_pars_fragment:dS,lights_lambert_fragment:fS,lights_lambert_pars_fragment:hS,lights_pars_begin:pS,lights_toon_fragment:gS,lights_toon_pars_fragment:xS,lights_phong_fragment:vS,lights_phong_pars_fragment:_S,lights_physical_fragment:yS,lights_physical_pars_fragment:SS,lights_fragment_begin:MS,lights_fragment_maps:bS,lights_fragment_end:ES,lightprobes_pars_fragment:wS,logdepthbuf_fragment:TS,logdepthbuf_pars_fragment:AS,logdepthbuf_pars_vertex:RS,logdepthbuf_vertex:CS,map_fragment:NS,map_pars_fragment:PS,map_particle_fragment:LS,map_particle_pars_fragment:DS,metalnessmap_fragment:IS,metalnessmap_pars_fragment:US,morphinstance_vertex:OS,morphcolor_vertex:FS,morphnormal_vertex:kS,morphtarget_pars_vertex:BS,morphtarget_vertex:zS,normal_fragment_begin:VS,normal_fragment_maps:GS,normal_pars_fragment:HS,normal_pars_vertex:jS,normal_vertex:WS,normalmap_pars_fragment:XS,clearcoat_normal_fragment_begin:YS,clearcoat_normal_fragment_maps:qS,clearcoat_pars_fragment:$S,iridescence_pars_fragment:KS,opaque_fragment:ZS,packing:JS,premultiplied_alpha_fragment:QS,project_vertex:e1,dithering_fragment:t1,dithering_pars_fragment:n1,roughnessmap_fragment:i1,roughnessmap_pars_fragment:r1,shadowmap_pars_fragment:s1,shadowmap_pars_vertex:a1,shadowmap_vertex:o1,shadowmask_pars_fragment:l1,skinbase_vertex:c1,skinning_pars_vertex:u1,skinning_vertex:d1,skinnormal_vertex:f1,specularmap_fragment:h1,specularmap_pars_fragment:p1,tonemapping_fragment:m1,tonemapping_pars_fragment:g1,transmission_fragment:x1,transmission_pars_fragment:v1,uv_pars_fragment:_1,uv_pars_vertex:y1,uv_vertex:S1,worldpos_vertex:M1,background_vert:b1,background_frag:E1,backgroundCube_vert:w1,backgroundCube_frag:T1,cube_vert:A1,cube_frag:R1,depth_vert:C1,depth_frag:N1,distance_vert:P1,distance_frag:L1,equirect_vert:D1,equirect_frag:I1,linedashed_vert:U1,linedashed_frag:O1,meshbasic_vert:F1,meshbasic_frag:k1,meshlambert_vert:B1,meshlambert_frag:z1,meshmatcap_vert:V1,meshmatcap_frag:G1,meshnormal_vert:H1,meshnormal_frag:j1,meshphong_vert:W1,meshphong_frag:X1,meshphysical_vert:Y1,meshphysical_frag:q1,meshtoon_vert:$1,meshtoon_frag:K1,points_vert:Z1,points_frag:J1,shadow_vert:Q1,shadow_frag:eM,sprite_vert:tM,sprite_frag:nM},Ge={common:{diffuse:{value:new Lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new _t},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new _t}},envmap:{envMap:{value:null},envMapRotation:{value:new _t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new _t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new _t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new _t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new _t},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new _t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new _t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new _t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new _t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ne},probesMax:{value:new ne},probesResolution:{value:new ne}},points:{diffuse:{value:new Lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0},uvTransform:{value:new _t}},sprite:{diffuse:{value:new Lt(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new _t},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0}}},lr={basic:{uniforms:ei([Ge.common,Ge.specularmap,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.fog]),vertexShader:yt.meshbasic_vert,fragmentShader:yt.meshbasic_frag},lambert:{uniforms:ei([Ge.common,Ge.specularmap,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.fog,Ge.lights,{emissive:{value:new Lt(0)},envMapIntensity:{value:1}}]),vertexShader:yt.meshlambert_vert,fragmentShader:yt.meshlambert_frag},phong:{uniforms:ei([Ge.common,Ge.specularmap,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.fog,Ge.lights,{emissive:{value:new Lt(0)},specular:{value:new Lt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:yt.meshphong_vert,fragmentShader:yt.meshphong_frag},standard:{uniforms:ei([Ge.common,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.roughnessmap,Ge.metalnessmap,Ge.fog,Ge.lights,{emissive:{value:new Lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag},toon:{uniforms:ei([Ge.common,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.gradientmap,Ge.fog,Ge.lights,{emissive:{value:new Lt(0)}}]),vertexShader:yt.meshtoon_vert,fragmentShader:yt.meshtoon_frag},matcap:{uniforms:ei([Ge.common,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.fog,{matcap:{value:null}}]),vertexShader:yt.meshmatcap_vert,fragmentShader:yt.meshmatcap_frag},points:{uniforms:ei([Ge.points,Ge.fog]),vertexShader:yt.points_vert,fragmentShader:yt.points_frag},dashed:{uniforms:ei([Ge.common,Ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:yt.linedashed_vert,fragmentShader:yt.linedashed_frag},depth:{uniforms:ei([Ge.common,Ge.displacementmap]),vertexShader:yt.depth_vert,fragmentShader:yt.depth_frag},normal:{uniforms:ei([Ge.common,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,{opacity:{value:1}}]),vertexShader:yt.meshnormal_vert,fragmentShader:yt.meshnormal_frag},sprite:{uniforms:ei([Ge.sprite,Ge.fog]),vertexShader:yt.sprite_vert,fragmentShader:yt.sprite_frag},background:{uniforms:{uvTransform:{value:new _t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:yt.background_vert,fragmentShader:yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new _t}},vertexShader:yt.backgroundCube_vert,fragmentShader:yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:yt.cube_vert,fragmentShader:yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:yt.equirect_vert,fragmentShader:yt.equirect_frag},distance:{uniforms:ei([Ge.common,Ge.displacementmap,{referencePosition:{value:new ne},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:yt.distance_vert,fragmentShader:yt.distance_frag},shadow:{uniforms:ei([Ge.lights,Ge.fog,{color:{value:new Lt(0)},opacity:{value:1}}]),vertexShader:yt.shadow_vert,fragmentShader:yt.shadow_frag}};lr.physical={uniforms:ei([lr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new _t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new _t},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new _t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new _t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new _t},sheen:{value:0},sheenColor:{value:new Lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new _t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new _t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new _t},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new _t},attenuationDistance:{value:0},attenuationColor:{value:new Lt(0)},specularColor:{value:new Lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new _t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new _t},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new _t}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag};const Lc={r:0,b:0,g:0},iM=new ln,Og=new _t;Og.set(-1,0,0,0,1,0,0,0,1);function rM(s,e,t,r,o,l){const d=new Lt(0);let h=o===!0?0:1,p,m,y=null,S=0,v=null;function M(D){let z=D.isScene===!0?D.background:null;if(z&&z.isTexture){const R=D.backgroundBlurriness>0;z=e.get(z,R)}return z}function w(D){let z=!1;const R=M(D);R===null?x(d,h):R&&R.isColor&&(x(R,1),z=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?t.buffers.color.setClear(0,0,0,1,l):P==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,l),(s.autoClear||z)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function C(D,z){const R=M(z);R&&(R.isCubeTexture||R.mapping===nu)?(m===void 0&&(m=new He(new Pt(1,1,1),new pr({name:"BackgroundCubeMaterial",uniforms:so(lr.backgroundCube.uniforms),vertexShader:lr.backgroundCube.vertexShader,fragmentShader:lr.backgroundCube.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(P,L,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(m)),m.material.uniforms.envMap.value=R,m.material.uniforms.backgroundBlurriness.value=z.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(iM.makeRotationFromEuler(z.backgroundRotation)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.material.uniforms.backgroundRotation.value.premultiply(Og),m.material.toneMapped=Ot.getTransfer(R.colorSpace)!==qt,(y!==R||S!==R.version||v!==s.toneMapping)&&(m.material.needsUpdate=!0,y=R,S=R.version,v=s.toneMapping),m.layers.enableAll(),D.unshift(m,m.geometry,m.material,0,0,null)):R&&R.isTexture&&(p===void 0&&(p=new He(new or(2,2),new pr({name:"BackgroundMaterial",uniforms:so(lr.background.uniforms),vertexShader:lr.background.vertexShader,fragmentShader:lr.background.fragmentShader,side:ta,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(p)),p.material.uniforms.t2D.value=R,p.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,p.material.toneMapped=Ot.getTransfer(R.colorSpace)!==qt,R.matrixAutoUpdate===!0&&R.updateMatrix(),p.material.uniforms.uvTransform.value.copy(R.matrix),(y!==R||S!==R.version||v!==s.toneMapping)&&(p.material.needsUpdate=!0,y=R,S=R.version,v=s.toneMapping),p.layers.enableAll(),D.unshift(p,p.geometry,p.material,0,0,null))}function x(D,z){D.getRGB(Lc,Lg(s)),t.buffers.color.setClear(Lc.r,Lc.g,Lc.b,z,l)}function _(){m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(D,z=1){d.set(D),h=z,x(d,h)},getClearAlpha:function(){return h},setClearAlpha:function(D){h=D,x(d,h)},render:w,addToRenderList:C,dispose:_}}function sM(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},o=v(null);let l=o,d=!1;function h(V,Y,Q,G,F){let ce=!1;const Z=S(V,G,Q,Y);l!==Z&&(l=Z,m(l.object)),ce=M(V,G,Q,F),ce&&w(V,G,Q,F),F!==null&&e.update(F,s.ELEMENT_ARRAY_BUFFER),(ce||d)&&(d=!1,R(V,Y,Q,G),F!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function p(){return s.createVertexArray()}function m(V){return s.bindVertexArray(V)}function y(V){return s.deleteVertexArray(V)}function S(V,Y,Q,G){const F=G.wireframe===!0;let ce=r[Y.id];ce===void 0&&(ce={},r[Y.id]=ce);const Z=V.isInstancedMesh===!0?V.id:0;let J=ce[Z];J===void 0&&(J={},ce[Z]=J);let W=J[Q.id];W===void 0&&(W={},J[Q.id]=W);let ee=W[F];return ee===void 0&&(ee=v(p()),W[F]=ee),ee}function v(V){const Y=[],Q=[],G=[];for(let F=0;F<t;F++)Y[F]=0,Q[F]=0,G[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:Q,attributeDivisors:G,object:V,attributes:{},index:null}}function M(V,Y,Q,G){const F=l.attributes,ce=Y.attributes;let Z=0;const J=Q.getAttributes();for(const W in J)if(J[W].location>=0){const I=F[W];let q=ce[W];if(q===void 0&&(W==="instanceMatrix"&&V.instanceMatrix&&(q=V.instanceMatrix),W==="instanceColor"&&V.instanceColor&&(q=V.instanceColor)),I===void 0||I.attribute!==q||q&&I.data!==q.data)return!0;Z++}return l.attributesNum!==Z||l.index!==G}function w(V,Y,Q,G){const F={},ce=Y.attributes;let Z=0;const J=Q.getAttributes();for(const W in J)if(J[W].location>=0){let I=ce[W];I===void 0&&(W==="instanceMatrix"&&V.instanceMatrix&&(I=V.instanceMatrix),W==="instanceColor"&&V.instanceColor&&(I=V.instanceColor));const q={};q.attribute=I,I&&I.data&&(q.data=I.data),F[W]=q,Z++}l.attributes=F,l.attributesNum=Z,l.index=G}function C(){const V=l.newAttributes;for(let Y=0,Q=V.length;Y<Q;Y++)V[Y]=0}function x(V){_(V,0)}function _(V,Y){const Q=l.newAttributes,G=l.enabledAttributes,F=l.attributeDivisors;Q[V]=1,G[V]===0&&(s.enableVertexAttribArray(V),G[V]=1),F[V]!==Y&&(s.vertexAttribDivisor(V,Y),F[V]=Y)}function D(){const V=l.newAttributes,Y=l.enabledAttributes;for(let Q=0,G=Y.length;Q<G;Q++)Y[Q]!==V[Q]&&(s.disableVertexAttribArray(Q),Y[Q]=0)}function z(V,Y,Q,G,F,ce,Z){Z===!0?s.vertexAttribIPointer(V,Y,Q,F,ce):s.vertexAttribPointer(V,Y,Q,G,F,ce)}function R(V,Y,Q,G){C();const F=G.attributes,ce=Q.getAttributes(),Z=Y.defaultAttributeValues;for(const J in ce){const W=ce[J];if(W.location>=0){let ee=F[J];if(ee===void 0&&(J==="instanceMatrix"&&V.instanceMatrix&&(ee=V.instanceMatrix),J==="instanceColor"&&V.instanceColor&&(ee=V.instanceColor)),ee!==void 0){const I=ee.normalized,q=ee.itemSize,xe=e.get(ee);if(xe===void 0)continue;const we=xe.buffer,Ve=xe.type,$e=xe.bytesPerElement,ae=Ve===s.INT||Ve===s.UNSIGNED_INT||ee.gpuType===fh;if(ee.isInterleavedBufferAttribute){const de=ee.data,Se=de.stride,Ze=ee.offset;if(de.isInstancedInterleavedBuffer){for(let je=0;je<W.locationSize;je++)_(W.location+je,de.meshPerAttribute);V.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let je=0;je<W.locationSize;je++)x(W.location+je);s.bindBuffer(s.ARRAY_BUFFER,we);for(let je=0;je<W.locationSize;je++)z(W.location+je,q/W.locationSize,Ve,I,Se*$e,(Ze+q/W.locationSize*je)*$e,ae)}else{if(ee.isInstancedBufferAttribute){for(let de=0;de<W.locationSize;de++)_(W.location+de,ee.meshPerAttribute);V.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let de=0;de<W.locationSize;de++)x(W.location+de);s.bindBuffer(s.ARRAY_BUFFER,we);for(let de=0;de<W.locationSize;de++)z(W.location+de,q/W.locationSize,Ve,I,q*$e,q/W.locationSize*de*$e,ae)}}else if(Z!==void 0){const I=Z[J];if(I!==void 0)switch(I.length){case 2:s.vertexAttrib2fv(W.location,I);break;case 3:s.vertexAttrib3fv(W.location,I);break;case 4:s.vertexAttrib4fv(W.location,I);break;default:s.vertexAttrib1fv(W.location,I)}}}}D()}function P(){N();for(const V in r){const Y=r[V];for(const Q in Y){const G=Y[Q];for(const F in G){const ce=G[F];for(const Z in ce)y(ce[Z].object),delete ce[Z];delete G[F]}}delete r[V]}}function L(V){if(r[V.id]===void 0)return;const Y=r[V.id];for(const Q in Y){const G=Y[Q];for(const F in G){const ce=G[F];for(const Z in ce)y(ce[Z].object),delete ce[Z];delete G[F]}}delete r[V.id]}function B(V){for(const Y in r){const Q=r[Y];for(const G in Q){const F=Q[G];if(F[V.id]===void 0)continue;const ce=F[V.id];for(const Z in ce)y(ce[Z].object),delete ce[Z];delete F[V.id]}}}function b(V){for(const Y in r){const Q=r[Y],G=V.isInstancedMesh===!0?V.id:0,F=Q[G];if(F!==void 0){for(const ce in F){const Z=F[ce];for(const J in Z)y(Z[J].object),delete Z[J];delete F[ce]}delete Q[G],Object.keys(Q).length===0&&delete r[Y]}}}function N(){O(),d=!0,l!==o&&(l=o,m(l.object))}function O(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:h,reset:N,resetDefaultState:O,dispose:P,releaseStatesOfGeometry:L,releaseStatesOfObject:b,releaseStatesOfProgram:B,initAttributes:C,enableAttribute:x,disableUnusedAttributes:D}}function aM(s,e,t){let r;function o(p){r=p}function l(p,m){s.drawArrays(r,p,m),t.update(m,r,1)}function d(p,m,y){y!==0&&(s.drawArraysInstanced(r,p,m,y),t.update(m,r,y))}function h(p,m,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,m,0,y);let v=0;for(let M=0;M<y;M++)v+=m[M];t.update(v,r,1)}this.setMode=o,this.render=l,this.renderInstances=d,this.renderMultiDraw=h}function oM(s,e,t,r){let o;function l(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");o=s.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function d(B){return!(B!==$i&&r.convert(B)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(B){const b=B===hr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(B!==bi&&B!==cr&&!b&&r.convert(B)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function p(B){if(B==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=t.precision!==void 0?t.precision:"highp";const y=p(m);y!==m&&(pt("WebGLRenderer:",m,"not supported, using",y,"instead."),m=y);const S=t.logarithmicDepthBuffer===!0,v=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&v===!1&&pt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const M=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),w=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=s.getParameter(s.MAX_TEXTURE_SIZE),x=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),D=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),z=s.getParameter(s.MAX_VARYING_VECTORS),R=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),P=s.getParameter(s.MAX_SAMPLES),L=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:p,textureFormatReadable:d,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:S,reversedDepthBuffer:v,maxTextures:M,maxVertexTextures:w,maxTextureSize:C,maxCubemapSize:x,maxAttributes:_,maxVertexUniforms:D,maxVaryings:z,maxFragmentUniforms:R,maxSamples:P,samples:L}}function lM(s){const e=this;let t=null,r=0,o=!1,l=!1;const d=new Dr,h=new _t,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(S,v){const M=S.length!==0||v||r!==0||o;return o=v,r=S.length,M},this.beginShadows=function(){l=!0,y(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(S,v){t=y(S,v,0)},this.setState=function(S,v,M){const w=S.clippingPlanes,C=S.clipIntersection,x=S.clipShadows,_=s.get(S);if(!o||w===null||w.length===0||l&&!x)l?y(null):m();else{const D=l?0:r,z=D*4;let R=_.clippingState||null;p.value=R,R=y(w,v,z,M);for(let P=0;P!==z;++P)R[P]=t[P];_.clippingState=R,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=D}};function m(){p.value!==t&&(p.value=t,p.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function y(S,v,M,w){const C=S!==null?S.length:0;let x=null;if(C!==0){if(x=p.value,w!==!0||x===null){const _=M+C*4,D=v.matrixWorldInverse;h.getNormalMatrix(D),(x===null||x.length<_)&&(x=new Float32Array(_));for(let z=0,R=M;z!==C;++z,R+=4)d.copy(S[z]).applyMatrix4(D,h),d.normal.toArray(x,R),x[R+3]=d.constant}p.value=x,p.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,x}}const eo=4,cM=6,uM=20,dM=256,Ko=new Ah,L0=new Lt;let df=null,ff=0,hf=0,pf=!1;const fM=new ne,Zs=new ne;class D0{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,r=.1,o=100,l={}){const{size:d=256,position:h=fM}=l;df=this._renderer.getRenderTarget(),ff=this._renderer.getActiveCubeFace(),hf=this._renderer.getActiveMipmapLevel(),pf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,r,o,p,h),t>0&&this._blur(p,0,0,t),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=O0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=U0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(df,ff,hf),this._renderer.xr.enabled=pf,e.scissorTest=!1,Ka(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===na||e.mapping===ro?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),df=this._renderer.getRenderTarget(),ff=this._renderer.getActiveCubeFace(),hf=this._renderer.getActiveMipmapLevel(),pf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Wn,minFilter:Wn,generateMipmaps:!1,type:hr,format:$i,colorSpace:Wc,depthBuffer:!1},o=I0(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=I0(e,t,r);const{_lodMax:l}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=hM(l)),this._blurMaterial=mM(l,e,t),this._ggxMaterial=pM(l,e,t)}return o}_compileMaterial(e){const t=new He(new ni,e);this._renderer.compile(t,Ko)}_sceneToCubeUV(e,t,r,o,l){const p=new Mi(90,1,t,r),m=[1,-1,1,1,1,1],y=[1,1,1,-1,-1,-1],S=this._renderer,v=S.autoClear,M=S.toneMapping;S.getClearColor(L0),S.toneMapping=dr,S.autoClear=!1,S.state.buffers.depth.getReversed()&&(S.setRenderTarget(o),S.clearDepth(),S.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new He(new Pt,new Qa({name:"PMREM.Background",side:hi,depthWrite:!1,depthTest:!1})));const C=this._backgroundBox,x=C.material;let _=!1;const D=e.background;D?D.isColor&&(x.color.copy(D),e.background=null,_=!0):(x.color.copy(L0),_=!0);for(let z=0;z<6;z++){const R=z%3;R===0?(p.up.set(0,m[z],0),p.position.set(l.x,l.y,l.z),p.lookAt(l.x+y[z],l.y,l.z)):R===1?(p.up.set(0,0,m[z]),p.position.set(l.x,l.y,l.z),p.lookAt(l.x,l.y+y[z],l.z)):(p.up.set(0,m[z],0),p.position.set(l.x,l.y,l.z),p.lookAt(l.x,l.y,l.z+y[z]));const P=this._cubeSize;Ka(o,R*P,z>2?P:0,P,P),S.setRenderTarget(o),_&&S.render(C,p),S.render(e,p)}S.toneMapping=M,S.autoClear=v,e.background=D}_textureToCubeUV(e,t){const r=this._renderer,o=e.mapping===na||e.mapping===ro;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=O0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=U0());const l=o?this._cubemapMaterial:this._equirectMaterial,d=this._lodMeshes[0];d.material=l;const h=l.uniforms;h.envMap.value=e;const p=this._cubeSize;Ka(t,0,0,3*p,2*p),r.setRenderTarget(t),r.render(d,Ko)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const o=this._lodMeshes.length;for(let l=1;l<o;l++)this._applyGGXFilter(e,l-1,l);t.autoClear=r}_applyGGXFilter(e,t,r){const o=this._renderer,l=this._pingPongRenderTarget,d=this._ggxMaterial,h=this._lodMeshes[r];h.material=d;const p=d.uniforms,m=r/(this._lodMeshes.length-1),y=t/(this._lodMeshes.length-1),S=Math.sqrt(m*m-y*y),v=m*1.25,M=S*v,{_lodMax:w}=this,C=this._sizeLods[r],x=3*C*(r>w-eo?r-w+eo:0),_=4*(this._cubeSize-C);p.envMap.value=e.texture,p.roughness.value=M,p.mipInt.value=w-t,Ka(l,x,_,3*C,2*C),o.setRenderTarget(l),o.render(h,Ko),p.envMap.value=l.texture,p.roughness.value=0,p.mipInt.value=w-r,Ka(e,x,_,3*C,2*C),o.setRenderTarget(e),o.render(h,Ko)}_blur(e,t,r,o){const l=this._pingPongRenderTarget,d=Math.min(o,Math.PI)/Math.SQRT2;this._blurPass(e,l,t,r,d),this._blurPass(l,e,r,r,d)}_blurPass(e,t,r,o,l){const d=this._renderer,h=this._blurMaterial,p=this._lodMeshes[o];p.material=h;const m=h.uniforms;m.envMap.value=e.texture,m.sigma.value=l,m.mipInt.value=this._lodMax-r;const y=this._sizeLods[o],S=3*y*(o>this._lodMax-eo?o-this._lodMax+eo:0),v=4*(this._cubeSize-y);Ka(t,S,v,3*y,2*y),d.setRenderTarget(t),d.render(p,Ko)}}function hM(s){const e=[],t=[];let r=s;const o=s-eo+1+cM;for(let l=0;l<o;l++){const d=Math.pow(2,r);e.push(d);const h=1/(d-2),p=-h,m=1+h,y=[p,p,m,p,m,m,p,p,m,m,p,m],S=6,v=6,M=3,w=new Float32Array(M*v*S),C=new Float32Array(M*v*S);for(let _=0;_<S;_++){const D=_%3*2/3-1,z=_>2?0:-1,R=[D,z,0,D+2/3,z,0,D+2/3,z+1,0,D,z,0,D+2/3,z+1,0,D,z+1,0];w.set(R,M*v*_);for(let P=0;P<v;P++){const L=y[P*2]*2-1,B=y[P*2+1]*2-1;_===0?Zs.set(1,B,L):_===1?Zs.set(-L,1,-B):_===2?Zs.set(-L,B,1):_===3?Zs.set(-1,B,-L):_===4?Zs.set(-L,-1,B):Zs.set(L,B,-1),Zs.toArray(C,(_*v+P)*M)}}const x=new ni;x.setAttribute("position",new Fr(w,M)),x.setAttribute("outputDirection",new Fr(C,M)),t.push(new He(x,null)),r>eo&&r--}return{lodMeshes:t,sizeLods:e}}function I0(s,e,t){const r=new Ki(s,e,t);return r.texture.mapping=nu,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Ka(s,e,t,r,o){s.viewport.set(e,t,r,o),s.scissor.set(e,t,r,o)}function pM(s,e,t){return new pr({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:su(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ur,depthTest:!1,depthWrite:!1})}function mM(s,e,t){return new pr({name:"SphericalGaussianBlur",defines:{SAMPLES:uM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:su(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ur,depthTest:!1,depthWrite:!1})}function U0(){return new pr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:su(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ur,depthTest:!1,depthWrite:!1})}function O0(){return new pr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:su(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ur,depthTest:!1,depthWrite:!1})}function su(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Fg extends Ki{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},o=[r,r,r,r,r,r];this.texture=new Ng(o),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new Pt(5,5,5),l=new pr({name:"CubemapFromEquirect",uniforms:so(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:hi,blending:Ur});l.uniforms.tEquirect.value=t;const d=new He(o,l),h=t.minFilter;return t.minFilter===Qs&&(t.minFilter=Wn),new gy(1,10,this).update(e,d),t.minFilter=h,d.geometry.dispose(),d.material.dispose(),this}clear(e,t=!0,r=!0,o=!0){const l=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(t,r,o);e.setRenderTarget(l)}}function gM(s){let e=new WeakMap,t=new WeakMap,r=null;function o(v,M=!1){return v==null?null:M?d(v):l(v)}function l(v){if(v&&v.isTexture){const M=v.mapping;if(M===Fd||M===kd)if(e.has(v)){const w=e.get(v).texture;return h(w,v.mapping)}else{const w=v.image;if(w&&w.height>0){const C=new Fg(w.height);return C.fromEquirectangularTexture(s,v),e.set(v,C),v.addEventListener("dispose",m),h(C.texture,v.mapping)}else return null}}return v}function d(v){if(v&&v.isTexture){const M=v.mapping,w=M===Fd||M===kd,C=M===na||M===ro;if(w||C){let x=t.get(v);const _=x!==void 0?x.texture.pmremVersion:0;if(v.isRenderTargetTexture&&v.pmremVersion!==_)return r===null&&(r=new D0(s)),x=w?r.fromEquirectangular(v,x):r.fromCubemap(v,x),x.texture.pmremVersion=v.pmremVersion,t.set(v,x),x.texture;if(x!==void 0)return x.texture;{const D=v.image;return w&&D&&D.height>0||C&&D&&p(D)?(r===null&&(r=new D0(s)),x=w?r.fromEquirectangular(v):r.fromCubemap(v),x.texture.pmremVersion=v.pmremVersion,t.set(v,x),v.addEventListener("dispose",y),x.texture):null}}}return v}function h(v,M){return M===Fd?v.mapping=na:M===kd&&(v.mapping=ro),v}function p(v){let M=0;const w=6;for(let C=0;C<w;C++)v[C]!==void 0&&M++;return M===w}function m(v){const M=v.target;M.removeEventListener("dispose",m);const w=e.get(M);w!==void 0&&(e.delete(M),w.dispose())}function y(v){const M=v.target;M.removeEventListener("dispose",y);const w=t.get(M);w!==void 0&&(t.delete(M),w.dispose())}function S(){e=new WeakMap,t=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:o,dispose:S}}function xM(s){const e={};function t(r){if(e[r]!==void 0)return e[r];const o=s.getExtension(r);return e[r]=o,o}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const o=t(r);return o===null&&no("WebGLRenderer: "+r+" extension not supported."),o}}}function vM(s,e,t,r){const o={},l=new WeakMap;function d(S){const v=S.target;v.index!==null&&e.remove(v.index);for(const w in v.attributes)e.remove(v.attributes[w]);v.removeEventListener("dispose",d),delete o[v.id];const M=l.get(v);M&&(e.remove(M),l.delete(v)),r.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,t.memory.geometries--}function h(S,v){return o[v.id]===!0||(v.addEventListener("dispose",d),o[v.id]=!0,t.memory.geometries++),v}function p(S){const v=S.attributes;for(const M in v)e.update(v[M],s.ARRAY_BUFFER)}function m(S){const v=[],M=S.index,w=S.attributes.position;let C=0;if(w===void 0)return;if(M!==null){const D=M.array;C=M.version;for(let z=0,R=D.length;z<R;z+=3){const P=D[z+0],L=D[z+1],B=D[z+2];v.push(P,L,L,B,B,P)}}else{const D=w.array;C=w.version;for(let z=0,R=D.length/3-1;z<R;z+=3){const P=z+0,L=z+1,B=z+2;v.push(P,L,L,B,B,P)}}const x=new(w.count>=65535?Rg:Ag)(v,1);x.version=C;const _=l.get(S);_&&e.remove(_),l.set(S,x)}function y(S){const v=l.get(S);if(v){const M=S.index;M!==null&&v.version<M.version&&m(S)}else m(S);return l.get(S)}return{get:h,update:p,getWireframeAttribute:y}}function _M(s,e,t){let r;function o(S){r=S}let l,d;function h(S){l=S.type,d=S.bytesPerElement}function p(S,v){s.drawElements(r,v,l,S*d),t.update(v,r,1)}function m(S,v,M){M!==0&&(s.drawElementsInstanced(r,v,l,S*d,M),t.update(v,r,M))}function y(S,v,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,v,0,l,S,0,M);let C=0;for(let x=0;x<M;x++)C+=v[x];t.update(C,r,1)}this.setMode=o,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=y}function yM(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,d,h){switch(t.calls++,d){case s.TRIANGLES:t.triangles+=h*(l/3);break;case s.LINES:t.lines+=h*(l/2);break;case s.LINE_STRIP:t.lines+=h*(l-1);break;case s.LINE_LOOP:t.lines+=h*l;break;case s.POINTS:t.points+=h*l;break;default:zt("WebGLInfo: Unknown draw mode:",d);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:r}}function SM(s,e,t){const r=new WeakMap,o=new fn;function l(d,h,p){const m=d.morphTargetInfluences,y=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,S=y!==void 0?y.length:0;let v=r.get(h);if(v===void 0||v.count!==S){let O=function(){b.dispose(),r.delete(h),h.removeEventListener("dispose",O)};var M=O;v!==void 0&&v.texture.dispose();const w=h.morphAttributes.position!==void 0,C=h.morphAttributes.normal!==void 0,x=h.morphAttributes.color!==void 0,_=h.morphAttributes.position||[],D=h.morphAttributes.normal||[],z=h.morphAttributes.color||[];let R=0;w===!0&&(R=1),C===!0&&(R=2),x===!0&&(R=3);let P=h.attributes.position.count*R,L=1;P>e.maxTextureSize&&(L=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const B=new Float32Array(P*L*4*S),b=new wg(B,P,L,S);b.type=cr,b.needsUpdate=!0;const N=R*4;for(let V=0;V<S;V++){const Y=_[V],Q=D[V],G=z[V],F=P*L*4*V;for(let ce=0;ce<Y.count;ce++){const Z=ce*N;w===!0&&(o.fromBufferAttribute(Y,ce),B[F+Z+0]=o.x,B[F+Z+1]=o.y,B[F+Z+2]=o.z,B[F+Z+3]=0),C===!0&&(o.fromBufferAttribute(Q,ce),B[F+Z+4]=o.x,B[F+Z+5]=o.y,B[F+Z+6]=o.z,B[F+Z+7]=0),x===!0&&(o.fromBufferAttribute(G,ce),B[F+Z+8]=o.x,B[F+Z+9]=o.y,B[F+Z+10]=o.z,B[F+Z+11]=G.itemSize===4?o.w:1)}}v={count:S,texture:b,size:new mt(P,L)},r.set(h,v),h.addEventListener("dispose",O)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)p.getUniforms().setValue(s,"morphTexture",d.morphTexture,t);else{let w=0;for(let x=0;x<m.length;x++)w+=m[x];const C=h.morphTargetsRelative?1:1-w;p.getUniforms().setValue(s,"morphTargetBaseInfluence",C),p.getUniforms().setValue(s,"morphTargetInfluences",m)}p.getUniforms().setValue(s,"morphTargetsTexture",v.texture,t),p.getUniforms().setValue(s,"morphTargetsTextureSize",v.size)}return{update:l}}function MM(s,e,t,r,o){let l=new WeakMap;function d(m){const y=o.render.frame,S=m.geometry,v=e.get(m,S);if(l.get(v)!==y&&(e.update(v),l.set(v,y)),m.isInstancedMesh&&(m.hasEventListener("dispose",p)===!1&&m.addEventListener("dispose",p),l.get(m)!==y&&(t.update(m.instanceMatrix,s.ARRAY_BUFFER),m.instanceColor!==null&&t.update(m.instanceColor,s.ARRAY_BUFFER),l.set(m,y))),m.isSkinnedMesh){const M=m.skeleton;l.get(M)!==y&&(M.update(),l.set(M,y))}return v}function h(){l=new WeakMap}function p(m){const y=m.target;y.removeEventListener("dispose",p),r.releaseStatesOfObject(y),t.remove(y.instanceMatrix),y.instanceColor!==null&&t.remove(y.instanceColor)}return{update:d,dispose:h}}const bM={[ug]:"LINEAR_TONE_MAPPING",[dg]:"REINHARD_TONE_MAPPING",[fg]:"CINEON_TONE_MAPPING",[dh]:"ACES_FILMIC_TONE_MAPPING",[pg]:"AGX_TONE_MAPPING",[mg]:"NEUTRAL_TONE_MAPPING",[hg]:"CUSTOM_TONE_MAPPING"};function EM(s,e,t,r,o,l){const d=new Ki(e,t,{type:s,depthBuffer:o,stencilBuffer:l,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let h=null,p=null;const m=new ni;m.setAttribute("position",new pn([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new pn([0,2,0,0,2,0],2));const y=new cy({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),S=new He(m,y),v=new Ah(-1,1,1,-1,0,1);let M=null,w=null,C=!1,x,_=null,D=[],z=!1;this.setSize=function(R,P){d.setSize(R,P),h!==null&&h.setSize(R,P),p!==null&&p.setSize(R,P);for(let L=0;L<D.length;L++){const B=D[L];B.setSize&&B.setSize(R,P)}},this.setEffects=function(R){D=R,z=D.length>0&&D[0].isRenderPass===!0;const P=d.width,L=d.height;D.length>0&&h===null&&(h=new Ki(P,L,{type:hr,depthBuffer:!1,stencilBuffer:!1}),p=new Ki(P,L,{type:hr,depthBuffer:!1,stencilBuffer:!1}));for(let B=0;B<D.length;B++){const b=D[B];b.setSize&&b.setSize(P,L)}},this.begin=function(R,P){if(C||R.toneMapping===dr&&D.length===0)return!1;if(_=P,P!==null){const L=P.width,B=P.height;(d.width!==L||d.height!==B)&&this.setSize(L,B)}return z===!1&&R.setRenderTarget(d),x=R.toneMapping,R.toneMapping=dr,!0},this.hasRenderPass=function(){return z},this.end=function(R,P){R.toneMapping=x,C=!0;let L=d,B=h;for(let b=0;b<D.length;b++){const N=D[b];N.enabled!==!1&&(N.render(R,B,L,P),N.needsSwap!==!1&&(L=B,B=B===h?p:h))}if(M!==R.outputColorSpace||w!==R.toneMapping){M=R.outputColorSpace,w=R.toneMapping,y.defines={},Ot.getTransfer(M)===qt&&(y.defines.SRGB_TRANSFER="");const b=bM[w];b&&(y.defines[b]=""),y.needsUpdate=!0}y.uniforms.tDiffuse.value=L.texture,R.setRenderTarget(_),R.render(S,v),_=null,C=!1},this.isCompositing=function(){return C},this.dispose=function(){d.dispose(),h!==null&&h.dispose(),p!==null&&p.dispose(),m.dispose(),y.dispose()}}const kg=new Xn,sh=new al(1,1),Bg=new wg,zg=new k_,Vg=new Ng,F0=[],k0=[],B0=new Float32Array(16),z0=new Float32Array(9),V0=new Float32Array(4);function lo(s,e,t){const r=s[0];if(r<=0||r>0)return s;const o=e*t;let l=F0[o];if(l===void 0&&(l=new Float32Array(o),F0[o]=l),e!==0){r.toArray(l,0);for(let d=1,h=0;d!==e;++d)h+=t,s[d].toArray(l,h)}return l}function Tn(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function An(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function au(s,e){let t=k0[e];t===void 0&&(t=new Int32Array(e),k0[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function wM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function TM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tn(t,e))return;s.uniform2fv(this.addr,e),An(t,e)}}function AM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tn(t,e))return;s.uniform3fv(this.addr,e),An(t,e)}}function RM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tn(t,e))return;s.uniform4fv(this.addr,e),An(t,e)}}function CM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(Tn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),An(t,e)}else{if(Tn(t,r))return;V0.set(r),s.uniformMatrix2fv(this.addr,!1,V0),An(t,r)}}function NM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(Tn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),An(t,e)}else{if(Tn(t,r))return;z0.set(r),s.uniformMatrix3fv(this.addr,!1,z0),An(t,r)}}function PM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(Tn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),An(t,e)}else{if(Tn(t,r))return;B0.set(r),s.uniformMatrix4fv(this.addr,!1,B0),An(t,r)}}function LM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function DM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tn(t,e))return;s.uniform2iv(this.addr,e),An(t,e)}}function IM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tn(t,e))return;s.uniform3iv(this.addr,e),An(t,e)}}function UM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tn(t,e))return;s.uniform4iv(this.addr,e),An(t,e)}}function OM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function FM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tn(t,e))return;s.uniform2uiv(this.addr,e),An(t,e)}}function kM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tn(t,e))return;s.uniform3uiv(this.addr,e),An(t,e)}}function BM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tn(t,e))return;s.uniform4uiv(this.addr,e),An(t,e)}}function zM(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o);let l;this.type===s.SAMPLER_2D_SHADOW?(sh.compareFunction=t.isReversedDepthBuffer()?_h:vh,l=sh):l=kg,t.setTexture2D(e||l,o)}function VM(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture3D(e||zg,o)}function GM(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTextureCube(e||Vg,o)}function HM(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture2DArray(e||Bg,o)}function jM(s){switch(s){case 5126:return wM;case 35664:return TM;case 35665:return AM;case 35666:return RM;case 35674:return CM;case 35675:return NM;case 35676:return PM;case 5124:case 35670:return LM;case 35667:case 35671:return DM;case 35668:case 35672:return IM;case 35669:case 35673:return UM;case 5125:return OM;case 36294:return FM;case 36295:return kM;case 36296:return BM;case 35678:case 36198:case 36298:case 36306:case 35682:return zM;case 35679:case 36299:case 36307:return VM;case 35680:case 36300:case 36308:case 36293:return GM;case 36289:case 36303:case 36311:case 36292:return HM}}function WM(s,e){s.uniform1fv(this.addr,e)}function XM(s,e){const t=lo(e,this.size,2);s.uniform2fv(this.addr,t)}function YM(s,e){const t=lo(e,this.size,3);s.uniform3fv(this.addr,t)}function qM(s,e){const t=lo(e,this.size,4);s.uniform4fv(this.addr,t)}function $M(s,e){const t=lo(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function KM(s,e){const t=lo(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function ZM(s,e){const t=lo(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function JM(s,e){s.uniform1iv(this.addr,e)}function QM(s,e){s.uniform2iv(this.addr,e)}function eb(s,e){s.uniform3iv(this.addr,e)}function tb(s,e){s.uniform4iv(this.addr,e)}function nb(s,e){s.uniform1uiv(this.addr,e)}function ib(s,e){s.uniform2uiv(this.addr,e)}function rb(s,e){s.uniform3uiv(this.addr,e)}function sb(s,e){s.uniform4uiv(this.addr,e)}function ab(s,e,t){const r=this.cache,o=e.length,l=au(t,o);Tn(r,l)||(s.uniform1iv(this.addr,l),An(r,l));let d;this.type===s.SAMPLER_2D_SHADOW?d=sh:d=kg;for(let h=0;h!==o;++h)t.setTexture2D(e[h]||d,l[h])}function ob(s,e,t){const r=this.cache,o=e.length,l=au(t,o);Tn(r,l)||(s.uniform1iv(this.addr,l),An(r,l));for(let d=0;d!==o;++d)t.setTexture3D(e[d]||zg,l[d])}function lb(s,e,t){const r=this.cache,o=e.length,l=au(t,o);Tn(r,l)||(s.uniform1iv(this.addr,l),An(r,l));for(let d=0;d!==o;++d)t.setTextureCube(e[d]||Vg,l[d])}function cb(s,e,t){const r=this.cache,o=e.length,l=au(t,o);Tn(r,l)||(s.uniform1iv(this.addr,l),An(r,l));for(let d=0;d!==o;++d)t.setTexture2DArray(e[d]||Bg,l[d])}function ub(s){switch(s){case 5126:return WM;case 35664:return XM;case 35665:return YM;case 35666:return qM;case 35674:return $M;case 35675:return KM;case 35676:return ZM;case 5124:case 35670:return JM;case 35667:case 35671:return QM;case 35668:case 35672:return eb;case 35669:case 35673:return tb;case 5125:return nb;case 36294:return ib;case 36295:return rb;case 36296:return sb;case 35678:case 36198:case 36298:case 36306:case 35682:return ab;case 35679:case 36299:case 36307:return ob;case 35680:case 36300:case 36308:case 36293:return lb;case 36289:case 36303:case 36311:case 36292:return cb}}class db{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=jM(t.type)}}class fb{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ub(t.type)}}class hb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const o=this.seq;for(let l=0,d=o.length;l!==d;++l){const h=o[l];h.setValue(e,t[h.id],r)}}}const mf=/(\w+)(\])?(\[|\.)?/g;function G0(s,e){s.seq.push(e),s.map[e.id]=e}function pb(s,e,t){const r=s.name,o=r.length;for(mf.lastIndex=0;;){const l=mf.exec(r),d=mf.lastIndex;let h=l[1];const p=l[2]==="]",m=l[3];if(p&&(h=h|0),m===void 0||m==="["&&d+2===o){G0(t,m===void 0?new db(h,s,e):new fb(h,s,e));break}else{let S=t.map[h];S===void 0&&(S=new hb(h),G0(t,S)),t=S}}}class Gc{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let d=0;d<r;++d){const h=e.getActiveUniform(t,d),p=e.getUniformLocation(t,h.name);pb(h,p,this)}const o=[],l=[];for(const d of this.seq)d.type===e.SAMPLER_2D_SHADOW||d.type===e.SAMPLER_CUBE_SHADOW||d.type===e.SAMPLER_2D_ARRAY_SHADOW?o.push(d):l.push(d);o.length>0&&(this.seq=o.concat(l))}setValue(e,t,r,o){const l=this.map[t];l!==void 0&&l.setValue(e,r,o)}setOptional(e,t,r){const o=t[r];o!==void 0&&this.setValue(e,r,o)}static upload(e,t,r,o){for(let l=0,d=t.length;l!==d;++l){const h=t[l],p=r[h.id];p.needsUpdate!==!1&&h.setValue(e,p.value,o)}}static seqWithValue(e,t){const r=[];for(let o=0,l=e.length;o!==l;++o){const d=e[o];d.id in t&&r.push(d)}return r}}function H0(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const mb=37297;let gb=0;function xb(s,e){const t=s.split(`
`),r=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let d=o;d<l;d++){const h=d+1;r.push(`${h===e?">":" "} ${h}: ${t[d]}`)}return r.join(`
`)}const j0=new _t;function vb(s){Ot._getMatrix(j0,Ot.workingColorSpace,s);const e=`mat3( ${j0.elements.map(t=>t.toFixed(4))} )`;switch(Ot.getTransfer(s)){case Xc:return[e,"LinearTransferOETF"];case qt:return[e,"sRGBTransferOETF"];default:return pt("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function W0(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),l=(s.getShaderInfoLog(e)||"").trim();if(r&&l==="")return"";const d=/ERROR: 0:(\d+)/.exec(l);if(d){const h=parseInt(d[1]);return t.toUpperCase()+`

`+l+`

`+xb(s.getShaderSource(e),h)}else return l}function _b(s,e){const t=vb(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const yb={[ug]:"Linear",[dg]:"Reinhard",[fg]:"Cineon",[dh]:"ACESFilmic",[pg]:"AgX",[mg]:"Neutral",[hg]:"Custom"};function Sb(s,e){const t=yb[e];return t===void 0?(pt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Dc=new ne;function Mb(){Ot.getLuminanceCoefficients(Dc);const s=Dc.x.toFixed(4),e=Dc.y.toFixed(4),t=Dc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bb(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qo).join(`
`)}function Eb(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function wb(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let o=0;o<r;o++){const l=s.getActiveAttrib(e,o),d=l.name;let h=1;l.type===s.FLOAT_MAT2&&(h=2),l.type===s.FLOAT_MAT3&&(h=3),l.type===s.FLOAT_MAT4&&(h=4),t[d]={type:l.type,location:s.getAttribLocation(e,d),locationSize:h}}return t}function Qo(s){return s!==""}function X0(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Y0(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Tb=/^[ \t]*#include +<([\w\d./]+)>/gm;function ah(s){return s.replace(Tb,Rb)}const Ab=new Map;function Rb(s,e){let t=yt[e];if(t===void 0){const r=Ab.get(e);if(r!==void 0)t=yt[r],pt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ah(t)}const Cb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function q0(s){return s.replace(Cb,Nb)}function Nb(s,e,t,r){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function $0(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Pb={[Oc]:"SHADOWMAP_TYPE_PCF",[Jo]:"SHADOWMAP_TYPE_VSM"};function Lb(s){return Pb[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Db={[na]:"ENVMAP_TYPE_CUBE",[ro]:"ENVMAP_TYPE_CUBE",[nu]:"ENVMAP_TYPE_CUBE_UV"};function Ib(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Db[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const Ub={[ro]:"ENVMAP_MODE_REFRACTION"};function Ob(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Ub[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Fb={[cg]:"ENVMAP_BLENDING_MULTIPLY",[p_]:"ENVMAP_BLENDING_MIX",[m_]:"ENVMAP_BLENDING_ADD"};function kb(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Fb[s.combine]||"ENVMAP_BLENDING_NONE"}function Bb(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function zb(s,e,t,r){const o=s.getContext(),l=t.defines;let d=t.vertexShader,h=t.fragmentShader;const p=Lb(t),m=Ib(t),y=Ob(t),S=kb(t),v=Bb(t),M=bb(t),w=Eb(l),C=o.createProgram();let x,_,D=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w].filter(Qo).join(`
`),x.length>0&&(x+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w].filter(Qo).join(`
`),_.length>0&&(_+=`
`)):(x=[$0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+y:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+p:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qo).join(`
`),_=[$0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.envMap?"#define "+y:"",t.envMap?"#define "+S:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+p:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==dr?"#define TONE_MAPPING":"",t.toneMapping!==dr?yt.tonemapping_pars_fragment:"",t.toneMapping!==dr?Sb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",yt.colorspace_pars_fragment,_b("linearToOutputTexel",t.outputColorSpace),Mb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qo).join(`
`)),d=ah(d),d=X0(d,t),d=Y0(d,t),h=ah(h),h=X0(h,t),h=Y0(h,t),d=q0(d),h=q0(h),t.isRawShaderMaterial!==!0&&(D=`#version 300 es
`,x=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,_=["#define varying in",t.glslVersion===n0?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===n0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const z=D+x+d,R=D+_+h,P=H0(o,o.VERTEX_SHADER,z),L=H0(o,o.FRAGMENT_SHADER,R);o.attachShader(C,P),o.attachShader(C,L),t.index0AttributeName!==void 0?o.bindAttribLocation(C,0,t.index0AttributeName):t.hasPositionAttribute===!0&&o.bindAttribLocation(C,0,"position"),o.linkProgram(C);function B(V){if(s.debug.checkShaderErrors){const Y=o.getProgramInfoLog(C)||"",Q=o.getShaderInfoLog(P)||"",G=o.getShaderInfoLog(L)||"",F=Y.trim(),ce=Q.trim(),Z=G.trim();let J=!0,W=!0;if(o.getProgramParameter(C,o.LINK_STATUS)===!1)if(J=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(o,C,P,L);else{const ee=W0(o,P,"vertex"),I=W0(o,L,"fragment");zt("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(C,o.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+F+`
`+ee+`
`+I)}else F!==""?pt("WebGLProgram: Program Info Log:",F):(ce===""||Z==="")&&(W=!1);W&&(V.diagnostics={runnable:J,programLog:F,vertexShader:{log:ce,prefix:x},fragmentShader:{log:Z,prefix:_}})}o.deleteShader(P),o.deleteShader(L),b=new Gc(o,C),N=wb(o,C)}let b;this.getUniforms=function(){return b===void 0&&B(this),b};let N;this.getAttributes=function(){return N===void 0&&B(this),N};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=o.getProgramParameter(C,mb)),O},this.destroy=function(){r.releaseStatesOfProgram(this),o.deleteProgram(C),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gb++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=P,this.fragmentShader=L,this}let Vb=0;class Gb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,r){const o=this._getShaderCacheForMaterial(e);return o.has(t)===!1&&(o.add(t),t.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new Hb(e),t.set(e,r)),r}}class Hb{constructor(e){this.id=Vb++,this.code=e,this.usedTimes=0}}function jb(s){return s===ia||s===Hc||s===jc}function Wb(s,e,t,r,o,l){const d=new Sh,h=new Gb,p=new Set,m=[],y=new Map,S=r.logarithmicDepthBuffer;let v=r.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(b){return p.add(b),b===0?"uv":`uv${b}`}function C(b,N,O,V,Y,Q){const G=V.fog,F=Y.geometry,ce=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?V.environment:null,Z=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,J=e.get(b.envMap||ce,Z),W=J&&J.mapping===nu?J.image.height:null,ee=M[b.type];b.precision!==null&&(v=r.getMaxPrecision(b.precision),v!==b.precision&&pt("WebGLProgram.getParameters:",b.precision,"not supported, using",v,"instead."));const I=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,q=I!==void 0?I.length:0;let xe=0;F.morphAttributes.position!==void 0&&(xe=1),F.morphAttributes.normal!==void 0&&(xe=2),F.morphAttributes.color!==void 0&&(xe=3);let we,Ve,$e,ae;if(ee){const At=lr[ee];we=At.vertexShader,Ve=At.fragmentShader}else{we=b.vertexShader,Ve=b.fragmentShader;const At=h.getVertexShaderStage(b),Rt=h.getFragmentShaderStage(b);h.update(b,At,Rt),$e=At.id,ae=Rt.id}const de=s.getRenderTarget(),Se=s.state.buffers.depth.getReversed(),Ze=Y.isInstancedMesh===!0,je=Y.isBatchedMesh===!0,Ie=!!b.map,at=!!b.matcap,Ae=!!J,Oe=!!b.aoMap,Be=!!b.lightMap,qe=!!b.bumpMap&&b.wireframe===!1,xt=!!b.normalMap,Dt=!!b.displacementMap,kt=!!b.emissiveMap,Mt=!!b.metalnessMap,jt=!!b.roughnessMap,$=b.anisotropy>0,mn=b.clearcoat>0,Ft=b.dispersion>0,U=b.retroreflectivity>0,E=b.iridescence>0,te=b.sheen>0,oe=b.transmission>0,he=$&&!!b.anisotropyMap,be=mn&&!!b.clearcoatMap,Re=mn&&!!b.clearcoatNormalMap,pe=mn&&!!b.clearcoatRoughnessMap,me=E&&!!b.iridescenceMap,Ue=E&&!!b.iridescenceThicknessMap,nt=te&&!!b.sheenColorMap,Ne=te&&!!b.sheenRoughnessMap,Te=!!b.specularMap,et=!!b.specularColorMap,lt=!!b.specularIntensityMap,dt=oe&&!!b.transmissionMap,H=oe&&!!b.thicknessMap,Pe=!!b.gradientMap,ge=!!b.alphaMap,Ce=b.alphaTest>0,ze=!!b.alphaHash,ve=!!b.extensions;let rt=dr;b.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(rt=s.toneMapping);const Qe={shaderID:ee,shaderType:b.type,shaderName:b.name,vertexShader:we,fragmentShader:Ve,defines:b.defines,customVertexShaderID:$e,customFragmentShaderID:ae,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:v,batching:je,batchingColor:je&&Y._colorsTexture!==null,instancing:Ze,instancingColor:Ze&&Y.instanceColor!==null,instancingMorph:Ze&&Y.morphTexture!==null,outputColorSpace:de===null?s.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:Ot.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Ie,matcap:at,envMap:Ae,envMapMode:Ae&&J.mapping,envMapCubeUVHeight:W,aoMap:Oe,lightMap:Be,bumpMap:qe,normalMap:xt,displacementMap:Dt,emissiveMap:kt,normalMapObjectSpace:xt&&b.normalMapType===v_,normalMapTangentSpace:xt&&b.normalMapType===ih,packedNormalMap:xt&&b.normalMapType===ih&&jb(b.normalMap.format),metalnessMap:Mt,roughnessMap:jt,anisotropy:$,anisotropyMap:he,clearcoat:mn,clearcoatMap:be,clearcoatNormalMap:Re,clearcoatRoughnessMap:pe,dispersion:Ft,retroreflection:U,iridescence:E,iridescenceMap:me,iridescenceThicknessMap:Ue,sheen:te,sheenColorMap:nt,sheenRoughnessMap:Ne,specularMap:Te,specularColorMap:et,specularIntensityMap:lt,transmission:oe,transmissionMap:dt,thicknessMap:H,gradientMap:Pe,opaque:b.transparent===!1&&b.blending===el&&b.alphaToCoverage===!1,alphaMap:ge,alphaTest:Ce,alphaHash:ze,combine:b.combine,mapUv:Ie&&w(b.map.channel),aoMapUv:Oe&&w(b.aoMap.channel),lightMapUv:Be&&w(b.lightMap.channel),bumpMapUv:qe&&w(b.bumpMap.channel),normalMapUv:xt&&w(b.normalMap.channel),displacementMapUv:Dt&&w(b.displacementMap.channel),emissiveMapUv:kt&&w(b.emissiveMap.channel),metalnessMapUv:Mt&&w(b.metalnessMap.channel),roughnessMapUv:jt&&w(b.roughnessMap.channel),anisotropyMapUv:he&&w(b.anisotropyMap.channel),clearcoatMapUv:be&&w(b.clearcoatMap.channel),clearcoatNormalMapUv:Re&&w(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&w(b.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&w(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ue&&w(b.iridescenceThicknessMap.channel),sheenColorMapUv:nt&&w(b.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&w(b.sheenRoughnessMap.channel),specularMapUv:Te&&w(b.specularMap.channel),specularColorMapUv:et&&w(b.specularColorMap.channel),specularIntensityMapUv:lt&&w(b.specularIntensityMap.channel),transmissionMapUv:dt&&w(b.transmissionMap.channel),thicknessMapUv:H&&w(b.thicknessMap.channel),alphaMapUv:ge&&w(b.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(xt||$),vertexNormals:!!F.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!F.attributes.uv&&(Ie||ge),fog:!!G,useFog:b.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||F.attributes.normal===void 0&&xt===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:S,reversedDepthBuffer:Se,skinning:Y.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:xe,numSunLights:N.sun.length,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numSunLightShadows:N.sunShadowMap.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numLightProbes:N.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&O.length>0,shadowMapType:s.shadowMap.type,toneMapping:rt,decodeVideoTexture:Ie&&b.map.isVideoTexture===!0&&Ot.getTransfer(b.map.colorSpace)===qt,decodeVideoTextureEmissive:kt&&b.emissiveMap.isVideoTexture===!0&&Ot.getTransfer(b.emissiveMap.colorSpace)===qt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Li,flipSided:b.side===hi,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ve&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&b.extensions.multiDraw===!0||je)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Qe.vertexUv1s=p.has(1),Qe.vertexUv2s=p.has(2),Qe.vertexUv3s=p.has(3),p.clear(),Qe}function x(b){const N=[];if(b.shaderID?N.push(b.shaderID):(N.push(b.customVertexShaderID),N.push(b.customFragmentShaderID)),b.defines!==void 0)for(const O in b.defines)N.push(O),N.push(b.defines[O]);return b.isRawShaderMaterial===!1&&(_(N,b),D(N,b),N.push(s.outputColorSpace)),N.push(b.customProgramCacheKey),N.join()}function _(b,N){b.push(N.precision),b.push(N.outputColorSpace),b.push(N.envMapMode),b.push(N.envMapCubeUVHeight),b.push(N.mapUv),b.push(N.alphaMapUv),b.push(N.lightMapUv),b.push(N.aoMapUv),b.push(N.bumpMapUv),b.push(N.normalMapUv),b.push(N.displacementMapUv),b.push(N.emissiveMapUv),b.push(N.metalnessMapUv),b.push(N.roughnessMapUv),b.push(N.anisotropyMapUv),b.push(N.clearcoatMapUv),b.push(N.clearcoatNormalMapUv),b.push(N.clearcoatRoughnessMapUv),b.push(N.iridescenceMapUv),b.push(N.iridescenceThicknessMapUv),b.push(N.sheenColorMapUv),b.push(N.sheenRoughnessMapUv),b.push(N.specularMapUv),b.push(N.specularColorMapUv),b.push(N.specularIntensityMapUv),b.push(N.transmissionMapUv),b.push(N.thicknessMapUv),b.push(N.combine),b.push(N.fogExp2),b.push(N.sizeAttenuation),b.push(N.morphTargetsCount),b.push(N.morphAttributeCount),b.push(N.numSunLights),b.push(N.numDirLights),b.push(N.numPointLights),b.push(N.numSpotLights),b.push(N.numSpotLightMaps),b.push(N.numHemiLights),b.push(N.numRectAreaLights),b.push(N.numSunLightShadows),b.push(N.numDirLightShadows),b.push(N.numPointLightShadows),b.push(N.numSpotLightShadows),b.push(N.numSpotLightShadowsWithMaps),b.push(N.numLightProbes),b.push(N.shadowMapType),b.push(N.toneMapping),b.push(N.numClippingPlanes),b.push(N.numClipIntersection),b.push(N.depthPacking)}function D(b,N){d.disableAll(),N.instancing&&d.enable(0),N.instancingColor&&d.enable(1),N.instancingMorph&&d.enable(2),N.matcap&&d.enable(3),N.envMap&&d.enable(4),N.normalMapObjectSpace&&d.enable(5),N.normalMapTangentSpace&&d.enable(6),N.clearcoat&&d.enable(7),N.iridescence&&d.enable(8),N.alphaTest&&d.enable(9),N.vertexColors&&d.enable(10),N.vertexAlphas&&d.enable(11),N.vertexUv1s&&d.enable(12),N.vertexUv2s&&d.enable(13),N.vertexUv3s&&d.enable(14),N.vertexTangents&&d.enable(15),N.anisotropy&&d.enable(16),N.alphaHash&&d.enable(17),N.batching&&d.enable(18),N.dispersion&&d.enable(19),N.retroreflection&&d.enable(24),N.batchingColor&&d.enable(20),N.gradientMap&&d.enable(21),N.packedNormalMap&&d.enable(22),N.vertexNormals&&d.enable(23),b.push(d.mask),d.disableAll(),N.fog&&d.enable(0),N.useFog&&d.enable(1),N.flatShading&&d.enable(2),N.logarithmicDepthBuffer&&d.enable(3),N.reversedDepthBuffer&&d.enable(4),N.skinning&&d.enable(5),N.morphTargets&&d.enable(6),N.morphNormals&&d.enable(7),N.morphColors&&d.enable(8),N.premultipliedAlpha&&d.enable(9),N.shadowMapEnabled&&d.enable(10),N.doubleSided&&d.enable(11),N.flipSided&&d.enable(12),N.useDepthPacking&&d.enable(13),N.dithering&&d.enable(14),N.transmission&&d.enable(15),N.sheen&&d.enable(16),N.opaque&&d.enable(17),N.pointsUvs&&d.enable(18),N.decodeVideoTexture&&d.enable(19),N.decodeVideoTextureEmissive&&d.enable(20),N.alphaToCoverage&&d.enable(21),N.numLightProbeGrids>0&&d.enable(22),N.hasPositionAttribute&&d.enable(23),b.push(d.mask)}function z(b){const N=M[b.type];let O;if(N){const V=lr[N];O=ay.clone(V.uniforms)}else O=b.uniforms;return O}function R(b,N){let O=y.get(N);return O!==void 0?++O.usedTimes:(O=new zb(s,N,b,o),m.push(O),y.set(N,O)),O}function P(b){if(--b.usedTimes===0){const N=m.indexOf(b);m[N]=m[m.length-1],m.pop(),y.delete(b.cacheKey),b.destroy()}}function L(b){h.remove(b)}function B(){h.dispose()}return{getParameters:C,getProgramCacheKey:x,getUniforms:z,acquireProgram:R,releaseProgram:P,releaseShaderCache:L,programs:m,dispose:B}}function Xb(){let s=new WeakMap;function e(d){return s.has(d)}function t(d){let h=s.get(d);return h===void 0&&(h={},s.set(d,h)),h}function r(d){s.delete(d)}function o(d,h,p){s.get(d)[h]=p}function l(){s=new WeakMap}return{has:e,get:t,remove:r,update:o,dispose:l}}function Yb(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function K0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Z0(){const s=[];let e=0;const t=[],r=[],o=[];function l(){e=0,t.length=0,r.length=0,o.length=0}function d(v){let M=0;return v.isInstancedMesh&&(M+=2),v.isSkinnedMesh&&(M+=1),M}function h(v,M,w,C,x,_){let D=s[e];return D===void 0?(D={id:v.id,object:v,geometry:M,material:w,materialVariant:d(v),groupOrder:C,renderOrder:v.renderOrder,z:x,group:_},s[e]=D):(D.id=v.id,D.object=v,D.geometry=M,D.material=w,D.materialVariant=d(v),D.groupOrder=C,D.renderOrder=v.renderOrder,D.z=x,D.group=_),e++,D}function p(v,M,w,C,x,_,D){D.reversedDepth===!0&&(x=-x);const z=h(v,M,w,C,x,_);w.transmission>0?r.push(z):w.transparent===!0?o.push(z):t.push(z)}function m(v,M,w,C,x,_){const D=h(v,M,w,C,x,_);w.transmission>0?r.unshift(D):w.transparent===!0?o.unshift(D):t.unshift(D)}function y(v,M){t.length>1&&t.sort(v||Yb),r.length>1&&r.sort(M||K0),o.length>1&&o.sort(M||K0)}function S(){for(let v=e,M=s.length;v<M;v++){const w=s[v];if(w.id===null)break;w.id=null,w.object=null,w.geometry=null,w.material=null,w.group=null}}return{opaque:t,transmissive:r,transparent:o,init:l,push:p,unshift:m,finish:S,sort:y}}function qb(){let s=new WeakMap;function e(r,o){const l=s.get(r);let d;return l===void 0?(d=new Z0,s.set(r,[d])):o>=l.length?(d=new Z0,l.push(d)):d=l[o],d}function t(){s=new WeakMap}return{get:e,dispose:t}}function $b(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new ne,color:new Lt};break;case"SpotLight":t={position:new ne,direction:new ne,color:new Lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ne,color:new Lt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ne,skyColor:new Lt,groundColor:new Lt};break;case"RectAreaLight":t={color:new Lt,position:new ne,halfWidth:new ne,halfHeight:new ne};break}return s[e.id]=t,t}}}function Kb(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Zb=0;function Jb(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Qb(s){const e=new $b,t=Kb(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new ne);const o=new ne,l=new ln,d=new ln;function h(m){let y=0,S=0,v=0;for(let Y=0;Y<9;Y++)r.probe[Y].set(0,0,0);let M=0,w=0,C=0,x=0,_=0,D=0,z=0,R=0,P=0,L=0,B=0,b=0,N=0,O=0;m.sort(Jb);for(let Y=0,Q=m.length;Y<Q;Y++){const G=m[Y],F=G.color,ce=G.intensity,Z=G.distance;let J=null;if(G.shadow&&G.shadow.map&&(G.shadow.map.texture.format===ia?J=G.shadow.map.texture:J=G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)y+=F.r*ce,S+=F.g*ce,v+=F.b*ce;else if(G.isLightProbe){for(let W=0;W<9;W++)r.probe[W].addScaledVector(G.sh.coefficients[W],ce);O++}else if(G.isSunLight){const W=e.get(G);if(W.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const ee=G.shadow,I=t.get(G);I.shadowIntensity=ee.intensity,I.shadowBias=ee.bias,I.shadowNormalBias=ee.normalBias,I.shadowRadius=ee.radius,I.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),r.sunShadow[w]=I,r.sunShadowMap[w]=J;const q=ee.getViewportCount();for(let xe=0;xe<q;xe++)r.sunShadowMatrix[C+xe]=ee.getMatrix(xe),r.sunShadowCascade[C+xe]=ee._cascadeData[xe];C+=q,w++}r.sun[M]=W,M++}else if(G.isDirectionalLight){const W=e.get(G);if(W.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const ee=G.shadow,I=t.get(G);I.shadowIntensity=ee.intensity,I.shadowBias=ee.bias,I.shadowNormalBias=ee.normalBias,I.shadowRadius=ee.radius,I.shadowMapSize=ee.mapSize,r.directionalShadow[x]=I,r.directionalShadowMap[x]=J,r.directionalShadowMatrix[x]=G.shadow.matrix,P++}r.directional[x]=W,x++}else if(G.isSpotLight){const W=e.get(G);W.position.setFromMatrixPosition(G.matrixWorld),W.color.copy(F).multiplyScalar(ce),W.distance=Z,W.coneCos=Math.cos(G.angle),W.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),W.decay=G.decay,r.spot[D]=W;const ee=G.shadow;if(G.map&&(r.spotLightMap[b]=G.map,b++,ee.updateMatrices(G),G.castShadow&&N++),r.spotLightMatrix[D]=ee.matrix,G.castShadow){const I=t.get(G);I.shadowIntensity=ee.intensity,I.shadowBias=ee.bias,I.shadowNormalBias=ee.normalBias,I.shadowRadius=ee.radius,I.shadowMapSize=ee.mapSize,r.spotShadow[D]=I,r.spotShadowMap[D]=J,B++}D++}else if(G.isRectAreaLight){const W=e.get(G);W.color.copy(F).multiplyScalar(ce),W.halfWidth.set(G.width*.5,0,0),W.halfHeight.set(0,G.height*.5,0),r.rectArea[z]=W,z++}else if(G.isPointLight){const W=e.get(G);if(W.color.copy(G.color).multiplyScalar(G.intensity),W.distance=G.distance,W.decay=G.decay,G.castShadow){const ee=G.shadow,I=t.get(G);I.shadowIntensity=ee.intensity,I.shadowBias=ee.bias,I.shadowNormalBias=ee.normalBias,I.shadowRadius=ee.radius,I.shadowMapSize=ee.mapSize,I.shadowCameraNear=ee.camera.near,I.shadowCameraFar=ee.camera.far,r.pointShadow[_]=I,r.pointShadowMap[_]=J,r.pointShadowMatrix[_]=G.shadow.matrix,L++}r.point[_]=W,_++}else if(G.isHemisphereLight){const W=e.get(G);W.skyColor.copy(G.color).multiplyScalar(ce),W.groundColor.copy(G.groundColor).multiplyScalar(ce),r.hemi[R]=W,R++}}z>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ge.LTC_FLOAT_1,r.rectAreaLTC2=Ge.LTC_FLOAT_2):(r.rectAreaLTC1=Ge.LTC_HALF_1,r.rectAreaLTC2=Ge.LTC_HALF_2)),r.ambient[0]=y,r.ambient[1]=S,r.ambient[2]=v;const V=r.hash;(V.sunLength!==M||V.directionalLength!==x||V.pointLength!==_||V.spotLength!==D||V.rectAreaLength!==z||V.hemiLength!==R||V.numSunShadows!==w||V.numDirectionalShadows!==P||V.numPointShadows!==L||V.numSpotShadows!==B||V.numSpotMaps!==b||V.numLightProbes!==O)&&(r.sun.length=M,r.directional.length=x,r.spot.length=D,r.rectArea.length=z,r.point.length=_,r.hemi.length=R,r.sunShadow.length=w,r.sunShadowMap.length=w,r.sunShadowMatrix.length=C,r.sunShadowCascade.length=C,r.directionalShadow.length=P,r.directionalShadowMap.length=P,r.directionalShadowMatrix.length=P,r.pointShadow.length=L,r.pointShadowMap.length=L,r.pointShadowMatrix.length=L,r.spotShadow.length=B,r.spotShadowMap.length=B,r.spotLightMatrix.length=B+b-N,r.spotLightMap.length=b,r.numSpotLightShadowsWithMaps=N,r.numLightProbes=O,V.sunLength=M,V.directionalLength=x,V.pointLength=_,V.spotLength=D,V.rectAreaLength=z,V.hemiLength=R,V.numSunShadows=w,V.numDirectionalShadows=P,V.numPointShadows=L,V.numSpotShadows=B,V.numSpotMaps=b,V.numLightProbes=O,r.version=Zb++)}function p(m,y){let S=0,v=0,M=0,w=0,C=0,x=0;const _=y.matrixWorldInverse;for(let D=0,z=m.length;D<z;D++){const R=m[D];if(R.isSunLight){const P=r.sun[S];P.direction.setFromMatrixPosition(R.matrixWorld),P.direction.transformDirection(_),S++}else if(R.isDirectionalLight){const P=r.directional[v];P.direction.setFromMatrixPosition(R.matrixWorld),o.setFromMatrixPosition(R.target.matrixWorld),P.direction.sub(o),P.direction.transformDirection(_),v++}else if(R.isSpotLight){const P=r.spot[w];P.position.setFromMatrixPosition(R.matrixWorld),P.position.applyMatrix4(_),P.direction.setFromMatrixPosition(R.matrixWorld),o.setFromMatrixPosition(R.target.matrixWorld),P.direction.sub(o),P.direction.transformDirection(_),w++}else if(R.isRectAreaLight){const P=r.rectArea[C];P.position.setFromMatrixPosition(R.matrixWorld),P.position.applyMatrix4(_),d.identity(),l.copy(R.matrixWorld),l.premultiply(_),d.extractRotation(l),P.halfWidth.set(R.width*.5,0,0),P.halfHeight.set(0,R.height*.5,0),P.halfWidth.applyMatrix4(d),P.halfHeight.applyMatrix4(d),C++}else if(R.isPointLight){const P=r.point[M];P.position.setFromMatrixPosition(R.matrixWorld),P.position.applyMatrix4(_),M++}else if(R.isHemisphereLight){const P=r.hemi[x];P.direction.setFromMatrixPosition(R.matrixWorld),P.direction.transformDirection(_),x++}}}return{setup:h,setupView:p,state:r}}function J0(s){const e=new Qb(s),t=[],r=[],o=[];function l(v){S.camera=v,t.length=0,r.length=0,o.length=0}function d(v){t.push(v)}function h(v){r.push(v)}function p(v){o.push(v)}function m(){e.setup(t)}function y(v){e.setupView(t,v)}const S={lightsArray:t,shadowsArray:r,lightProbeGridArray:o,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:l,state:S,setupLights:m,setupLightsView:y,pushLight:d,pushShadow:h,pushLightProbeGrid:p}}function eE(s){let e=new WeakMap;function t(o,l=0){const d=e.get(o);let h;return d===void 0?(h=new J0(s),e.set(o,[h])):l>=d.length?(h=new J0(s),d.push(h)):h=d[l],h}function r(){e=new WeakMap}return{get:t,dispose:r}}const tE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,iE=[new ne(1,0,0),new ne(-1,0,0),new ne(0,1,0),new ne(0,-1,0),new ne(0,0,1),new ne(0,0,-1)],rE=[new ne(0,-1,0),new ne(0,-1,0),new ne(0,0,1),new ne(0,0,-1),new ne(0,-1,0),new ne(0,-1,0)],Q0=new ln,Zo=new ne,gf=new ne;function sE(s,e,t){let r=new bh;const o=new mt,l=new mt,d=new fn,h=new uy,p=new dy,m={},y=t.maxTextureSize,S={[ta]:hi,[hi]:ta,[Li]:Li},v=new pr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:tE,fragmentShader:nE}),M=v.clone();M.defines.HORIZONTAL_PASS=1;const w=new ni;w.setAttribute("position",new Fr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new He(w,v),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Oc;let _=this.type;this.render=function(L,B,b){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||L.length===0)return;this.type===ag&&(pt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Oc);const N=s.getRenderTarget(),O=s.getActiveCubeFace(),V=s.getActiveMipmapLevel(),Y=s.state;Y.setBlending(Ur),Y.buffers.depth.getReversed()===!0?Y.buffers.color.setClear(0,0,0,0):Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const Q=_!==this.type;Q&&B.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(F=>F.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,F=L.length;G<F;G++){const ce=L[G],Z=ce.shadow;if(Z===void 0){pt("WebGLShadowMap:",ce,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;o.copy(Z.mapSize);const J=Z.getFrameExtents();o.multiply(J),l.copy(Z.mapSize),(o.x>y||o.y>y)&&(o.x>y&&(l.x=Math.floor(y/J.x),o.x=l.x*J.x,Z.mapSize.x=l.x),o.y>y&&(l.y=Math.floor(y/J.y),o.y=l.y*J.y,Z.mapSize.y=l.y));const W=s.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=W,Z.map===null||Q===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===Jo){if(ce.isPointLight){pt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new Ki(o.x,o.y,{format:ia,type:hr,minFilter:Wn,magFilter:Wn,generateMipmaps:!1}),Z.map.texture.name=ce.name+".shadowMap",Z.map.depthTexture=new al(o.x,o.y,cr),Z.map.depthTexture.name=ce.name+".shadowMapDepth",Z.map.depthTexture.format=kr,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Fn,Z.map.depthTexture.magFilter=Fn}else ce.isPointLight?(Z.map=new Fg(o.x),Z.map.depthTexture=new ry(o.x,fr)):(Z.map=new Ki(o.x,o.y),Z.map.depthTexture=new al(o.x,o.y,fr)),Z.map.depthTexture.name=ce.name+".shadowMap",Z.map.depthTexture.format=kr,this.type===Oc?(Z.map.depthTexture.compareFunction=W?_h:vh,Z.map.depthTexture.minFilter=Wn,Z.map.depthTexture.magFilter=Wn):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Fn,Z.map.depthTexture.magFilter=Fn);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==o.x||Z.map.height!==o.y)&&Z.map.setSize(o.x,o.y);const ee=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();ce.isPointLight!==!0&&Z.updateMatrices(ce,b);for(let I=0;I<ee;I++){const q=Z.getCamera(I);if(ce.isPointLight){const xe=Z.camera,we=Z.matrix,Ve=ce.distance||xe.far;Ve!==xe.far&&(xe.far=Ve,xe.updateProjectionMatrix()),Zo.setFromMatrixPosition(ce.matrixWorld),xe.position.copy(Zo),gf.copy(xe.position),gf.add(iE[I]),xe.up.copy(rE[I]),xe.lookAt(gf),xe.updateMatrixWorld(),we.makeTranslation(-Zo.x,-Zo.y,-Zo.z),Q0.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(Q0,xe.coordinateSystem,xe.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)s.setRenderTarget(Z.map,I),s.clear();else{I===0&&(s.setRenderTarget(Z.map),s.clear());const xe=Z.getViewport(I);d.set(l.x*xe.x,l.y*xe.y,l.x*xe.z,l.y*xe.w),Y.viewport(d)}r=Z.getFrustum(I),R(B,b,q,ce,this.type)}Z.isPointLightShadow!==!0&&this.type===Jo&&D(Z,b),Z.needsUpdate=!1}_=this.type,x.needsUpdate=!1,s.setRenderTarget(N,O,V)};function D(L,B){const b=e.update(C);v.defines.VSM_SAMPLES!==L.blurSamples&&(v.defines.VSM_SAMPLES=L.blurSamples,M.defines.VSM_SAMPLES=L.blurSamples,v.needsUpdate=!0,M.needsUpdate=!0),L.mapPass===null?L.mapPass=new Ki(o.x,o.y,{format:ia,type:hr}):(L.mapPass.width!==L.map.width||L.mapPass.height!==L.map.height)&&L.mapPass.setSize(L.map.width,L.map.height),v.uniforms.shadow_pass.value=L.map.depthTexture,v.uniforms.resolution.value.set(L.map.width,L.map.height),v.uniforms.radius.value=L.radius,s.setRenderTarget(L.mapPass),s.clear(),s.renderBufferDirect(B,null,b,v,C,null),M.uniforms.shadow_pass.value=L.mapPass.texture,M.uniforms.resolution.value.set(L.map.width,L.map.height),M.uniforms.radius.value=L.radius,s.setRenderTarget(L.map),s.clear(),s.renderBufferDirect(B,null,b,M,C,null)}function z(L,B,b,N){let O=null;const V=b.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(V!==void 0)O=V;else if(O=b.isPointLight===!0?p:h,s.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){const Y=O.uuid,Q=B.uuid;let G=m[Y];G===void 0&&(G={},m[Y]=G);let F=G[Q];F===void 0&&(F=O.clone(),G[Q]=F,B.addEventListener("dispose",P)),O=F}if(O.visible=B.visible,O.wireframe=B.wireframe,N===Jo?O.side=B.shadowSide!==null?B.shadowSide:B.side:O.side=B.shadowSide!==null?B.shadowSide:S[B.side],O.alphaMap=B.alphaMap,O.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,O.map=B.map,O.clipShadows=B.clipShadows,O.clippingPlanes=B.clippingPlanes,O.clipIntersection=B.clipIntersection,O.displacementMap=B.displacementMap,O.displacementScale=B.displacementScale,O.displacementBias=B.displacementBias,O.wireframeLinewidth=B.wireframeLinewidth,O.linewidth=B.linewidth,b.isPointLight===!0&&O.isMeshDistanceMaterial===!0){const Y=s.properties.get(O);Y.light=b}return O}function R(L,B,b,N,O){if(L.visible===!1)return;if(L.layers.test(B.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&O===Jo)&&(!L.frustumCulled||L.intersectsFrustum(r))){L.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,L.matrixWorld);const Q=e.update(L),G=L.material;if(Array.isArray(G)){const F=Q.groups;for(let ce=0,Z=F.length;ce<Z;ce++){const J=F[ce],W=G[J.materialIndex];if(W&&W.visible){const ee=z(L,W,N,O);L.onBeforeShadow(s,L,B,b,Q,ee,J),s.renderBufferDirect(b,null,Q,ee,L,J),L.onAfterShadow(s,L,B,b,Q,ee,J)}}}else if(G.visible){const F=z(L,G,N,O);L.onBeforeShadow(s,L,B,b,Q,F,null),s.renderBufferDirect(b,null,Q,F,L,null),L.onAfterShadow(s,L,B,b,Q,F,null)}}const Y=L.children;for(let Q=0,G=Y.length;Q<G;Q++)R(Y[Q],B,b,N,O)}function P(L){L.target.removeEventListener("dispose",P);for(const b in m){const N=m[b],O=L.target.uuid;O in N&&(N[O].dispose(),delete N[O])}}}function aE(s,e){function t(){let H=!1;const Pe=new fn;let ge=null;const Ce=new fn(0,0,0,0);return{setMask:function(ze){ge!==ze&&!H&&(s.colorMask(ze,ze,ze,ze),ge=ze)},setLocked:function(ze){H=ze},setClear:function(ze,ve,rt,Qe,At){At===!0&&(ze*=Qe,ve*=Qe,rt*=Qe),Pe.set(ze,ve,rt,Qe),Ce.equals(Pe)===!1&&(s.clearColor(ze,ve,rt,Qe),Ce.copy(Pe))},reset:function(){H=!1,ge=null,Ce.set(-1,0,0,0)}}}function r(){let H=!1,Pe=!1,ge=null,Ce=null,ze=null;return{setReversed:function(ve){if(Pe!==ve){const rt=e.get("EXT_clip_control");ve?rt.clipControlEXT(rt.LOWER_LEFT_EXT,rt.ZERO_TO_ONE_EXT):rt.clipControlEXT(rt.LOWER_LEFT_EXT,rt.NEGATIVE_ONE_TO_ONE_EXT),Pe=ve;const Qe=ze;ze=null,this.setClear(Qe)}},getReversed:function(){return Pe},setTest:function(ve){ve?de(s.DEPTH_TEST):Se(s.DEPTH_TEST)},setMask:function(ve){ge!==ve&&!H&&(s.depthMask(ve),ge=ve)},setFunc:function(ve){if(Pe&&(ve=N_[ve]),Ce!==ve){switch(ve){case _f:s.depthFunc(s.NEVER);break;case yf:s.depthFunc(s.ALWAYS);break;case Sf:s.depthFunc(s.LESS);break;case tl:s.depthFunc(s.LEQUAL);break;case Mf:s.depthFunc(s.EQUAL);break;case bf:s.depthFunc(s.GEQUAL);break;case Ef:s.depthFunc(s.GREATER);break;case wf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ce=ve}},setLocked:function(ve){H=ve},setClear:function(ve){ze!==ve&&(ze=ve,Pe&&(ve=1-ve),s.clearDepth(ve))},reset:function(){H=!1,ge=null,Ce=null,ze=null,Pe=!1}}}function o(){let H=!1,Pe=null,ge=null,Ce=null,ze=null,ve=null,rt=null,Qe=null,At=null;return{setTest:function(Rt){H||(Rt?de(s.STENCIL_TEST):Se(s.STENCIL_TEST))},setMask:function(Rt){Pe!==Rt&&!H&&(s.stencilMask(Rt),Pe=Rt)},setFunc:function(Rt,yn,Yn){(ge!==Rt||Ce!==yn||ze!==Yn)&&(s.stencilFunc(Rt,yn,Yn),ge=Rt,Ce=yn,ze=Yn)},setOp:function(Rt,yn,Yn){(ve!==Rt||rt!==yn||Qe!==Yn)&&(s.stencilOp(Rt,yn,Yn),ve=Rt,rt=yn,Qe=Yn)},setLocked:function(Rt){H=Rt},setClear:function(Rt){At!==Rt&&(s.clearStencil(Rt),At=Rt)},reset:function(){H=!1,Pe=null,ge=null,Ce=null,ze=null,ve=null,rt=null,Qe=null,At=null}}}const l=new t,d=new r,h=new o,p=new WeakMap,m=new WeakMap;let y={},S={},v={},M=new WeakMap,w=[],C=null,x=!1,_=null,D=null,z=null,R=null,P=null,L=null,B=null,b=new Lt(0,0,0),N=0,O=!1,V=null,Y=null,Q=null,G=null,F=null;const ce=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,J=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(W)[1]),Z=J>=1):W.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Z=J>=2);let ee=null,I={};const q=s.getParameter(s.SCISSOR_BOX),xe=s.getParameter(s.VIEWPORT),we=new fn().fromArray(q),Ve=new fn().fromArray(xe);function $e(H,Pe,ge,Ce){const ze=new Uint8Array(4),ve=s.createTexture();s.bindTexture(H,ve),s.texParameteri(H,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(H,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let rt=0;rt<ge;rt++)H===s.TEXTURE_3D||H===s.TEXTURE_2D_ARRAY?s.texImage3D(Pe,0,s.RGBA,1,1,Ce,0,s.RGBA,s.UNSIGNED_BYTE,ze):s.texImage2D(Pe+rt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ze);return ve}const ae={};ae[s.TEXTURE_2D]=$e(s.TEXTURE_2D,s.TEXTURE_2D,1),ae[s.TEXTURE_CUBE_MAP]=$e(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[s.TEXTURE_2D_ARRAY]=$e(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ae[s.TEXTURE_3D]=$e(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),d.setClear(1),h.setClear(0),de(s.DEPTH_TEST),d.setFunc(tl),qe(!1),xt(Jm),de(s.CULL_FACE),Oe(Ur);function de(H){y[H]!==!0&&(s.enable(H),y[H]=!0)}function Se(H){y[H]!==!1&&(s.disable(H),y[H]=!1)}function Ze(H,Pe){return v[H]!==Pe?(s.bindFramebuffer(H,Pe),v[H]=Pe,H===s.DRAW_FRAMEBUFFER&&(v[s.FRAMEBUFFER]=Pe),H===s.FRAMEBUFFER&&(v[s.DRAW_FRAMEBUFFER]=Pe),!0):!1}function je(H,Pe){let ge=w,Ce=!1;if(H){ge=M.get(Pe),ge===void 0&&(ge=[],M.set(Pe,ge));const ze=H.textures;if(ge.length!==ze.length||ge[0]!==s.COLOR_ATTACHMENT0){for(let ve=0,rt=ze.length;ve<rt;ve++)ge[ve]=s.COLOR_ATTACHMENT0+ve;ge.length=ze.length,Ce=!0}}else ge[0]!==s.BACK&&(ge[0]=s.BACK,Ce=!0);Ce&&s.drawBuffers(ge)}function Ie(H){return C!==H?(s.useProgram(H),C=H,!0):!1}const at={[Za]:s.FUNC_ADD,[Zv]:s.FUNC_SUBTRACT,[Jv]:s.FUNC_REVERSE_SUBTRACT};at[Qv]=s.MIN,at[e_]=s.MAX;const Ae={[t_]:s.ZERO,[n_]:s.ONE,[i_]:s.SRC_COLOR,[og]:s.SRC_ALPHA,[c_]:s.SRC_ALPHA_SATURATE,[o_]:s.DST_COLOR,[s_]:s.DST_ALPHA,[r_]:s.ONE_MINUS_SRC_COLOR,[lg]:s.ONE_MINUS_SRC_ALPHA,[l_]:s.ONE_MINUS_DST_COLOR,[a_]:s.ONE_MINUS_DST_ALPHA,[u_]:s.CONSTANT_COLOR,[d_]:s.ONE_MINUS_CONSTANT_COLOR,[f_]:s.CONSTANT_ALPHA,[h_]:s.ONE_MINUS_CONSTANT_ALPHA};function Oe(H,Pe,ge,Ce,ze,ve,rt,Qe,At,Rt){if(H===Ur){x===!0&&(Se(s.BLEND),x=!1);return}if(x===!1&&(de(s.BLEND),x=!0),H!==Kv){if(H!==_||Rt!==O){if((D!==Za||P!==Za)&&(s.blendEquation(s.FUNC_ADD),D=Za,P=Za),Rt)switch(H){case el:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qm:s.blendFunc(s.ONE,s.ONE);break;case e0:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case t0:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:zt("WebGLState: Invalid blending: ",H);break}else switch(H){case el:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qm:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case e0:zt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case t0:zt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:zt("WebGLState: Invalid blending: ",H);break}z=null,R=null,L=null,B=null,b.set(0,0,0),N=0,_=H,O=Rt}return}ze=ze||Pe,ve=ve||ge,rt=rt||Ce,(Pe!==D||ze!==P)&&(s.blendEquationSeparate(at[Pe],at[ze]),D=Pe,P=ze),(ge!==z||Ce!==R||ve!==L||rt!==B)&&(s.blendFuncSeparate(Ae[ge],Ae[Ce],Ae[ve],Ae[rt]),z=ge,R=Ce,L=ve,B=rt),(Qe.equals(b)===!1||At!==N)&&(s.blendColor(Qe.r,Qe.g,Qe.b,At),b.copy(Qe),N=At),_=H,O=!1}function Be(H,Pe){H.side===Li?Se(s.CULL_FACE):de(s.CULL_FACE);let ge=H.side===hi;Pe&&(ge=!ge),qe(ge),H.blending===el&&H.transparent===!1?Oe(Ur):Oe(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),d.setFunc(H.depthFunc),d.setTest(H.depthTest),d.setMask(H.depthWrite),l.setMask(H.colorWrite);const Ce=H.stencilWrite;h.setTest(Ce),Ce&&(h.setMask(H.stencilWriteMask),h.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),h.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),kt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?de(s.SAMPLE_ALPHA_TO_COVERAGE):Se(s.SAMPLE_ALPHA_TO_COVERAGE)}function qe(H){V!==H&&(H?s.frontFace(s.CW):s.frontFace(s.CCW),V=H)}function xt(H){H!==qv?(de(s.CULL_FACE),H!==Y&&(H===Jm?s.cullFace(s.BACK):H===$v?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Se(s.CULL_FACE),Y=H}function Dt(H){H!==Q&&(Z&&s.lineWidth(H),Q=H)}function kt(H,Pe,ge){H?(de(s.POLYGON_OFFSET_FILL),(G!==Pe||F!==ge)&&(G=Pe,F=ge,d.getReversed()&&(Pe=-Pe),s.polygonOffset(Pe,ge))):Se(s.POLYGON_OFFSET_FILL)}function Mt(H){H?de(s.SCISSOR_TEST):Se(s.SCISSOR_TEST)}function jt(H){H===void 0&&(H=s.TEXTURE0+ce-1),ee!==H&&(s.activeTexture(H),ee=H)}function $(H,Pe,ge){ge===void 0&&(ee===null?ge=s.TEXTURE0+ce-1:ge=ee);let Ce=I[ge];Ce===void 0&&(Ce={type:void 0,texture:void 0},I[ge]=Ce),(Ce.type!==H||Ce.texture!==Pe)&&(ee!==ge&&(s.activeTexture(ge),ee=ge),s.bindTexture(H,Pe||ae[H]),Ce.type=H,Ce.texture=Pe)}function mn(){const H=I[ee];H!==void 0&&H.type!==void 0&&(s.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Ft(){try{s.compressedTexImage2D(...arguments)}catch(H){zt("WebGLState:",H)}}function U(){try{s.compressedTexImage3D(...arguments)}catch(H){zt("WebGLState:",H)}}function E(){try{s.texSubImage2D(...arguments)}catch(H){zt("WebGLState:",H)}}function te(){try{s.texSubImage3D(...arguments)}catch(H){zt("WebGLState:",H)}}function oe(){try{s.compressedTexSubImage2D(...arguments)}catch(H){zt("WebGLState:",H)}}function he(){try{s.compressedTexSubImage3D(...arguments)}catch(H){zt("WebGLState:",H)}}function be(){try{s.texStorage2D(...arguments)}catch(H){zt("WebGLState:",H)}}function Re(){try{s.texStorage3D(...arguments)}catch(H){zt("WebGLState:",H)}}function pe(){try{s.texImage2D(...arguments)}catch(H){zt("WebGLState:",H)}}function me(){try{s.texImage3D(...arguments)}catch(H){zt("WebGLState:",H)}}function Ue(H){return S[H]!==void 0?S[H]:s.getParameter(H)}function nt(H,Pe){S[H]!==Pe&&(s.pixelStorei(H,Pe),S[H]=Pe)}function Ne(H){we.equals(H)===!1&&(s.scissor(H.x,H.y,H.z,H.w),we.copy(H))}function Te(H){Ve.equals(H)===!1&&(s.viewport(H.x,H.y,H.z,H.w),Ve.copy(H))}function et(H,Pe){let ge=m.get(Pe);ge===void 0&&(ge=new WeakMap,m.set(Pe,ge));let Ce=ge.get(H);Ce===void 0&&(Ce=s.getUniformBlockIndex(Pe,H.name),ge.set(H,Ce))}function lt(H,Pe){const Ce=m.get(Pe).get(H);p.get(Pe)!==Ce&&(s.uniformBlockBinding(Pe,Ce,H.__bindingPointIndex),p.set(Pe,Ce))}function dt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),d.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),y={},S={},ee=null,I={},v={},M=new WeakMap,w=[],C=null,x=!1,_=null,D=null,z=null,R=null,P=null,L=null,B=null,b=new Lt(0,0,0),N=0,O=!1,V=null,Y=null,Q=null,G=null,F=null,we.set(0,0,s.canvas.width,s.canvas.height),Ve.set(0,0,s.canvas.width,s.canvas.height),l.reset(),d.reset(),h.reset()}return{buffers:{color:l,depth:d,stencil:h},enable:de,disable:Se,bindFramebuffer:Ze,drawBuffers:je,useProgram:Ie,setBlending:Oe,setMaterial:Be,setFlipSided:qe,setCullFace:xt,setLineWidth:Dt,setPolygonOffset:kt,setScissorTest:Mt,activeTexture:jt,bindTexture:$,unbindTexture:mn,compressedTexImage2D:Ft,compressedTexImage3D:U,texImage2D:pe,texImage3D:me,pixelStorei:nt,getParameter:Ue,updateUBOMapping:et,uniformBlockBinding:lt,texStorage2D:be,texStorage3D:Re,texSubImage2D:E,texSubImage3D:te,compressedTexSubImage2D:oe,compressedTexSubImage3D:he,scissor:Ne,viewport:Te,reset:dt}}function oE(s,e,t,r,o,l,d){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new mt,y=new WeakMap,S=new Set;let v;const M=new WeakMap;let w=!1;try{w=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function C(U,E){return w?new OffscreenCanvas(U,E):Yc("canvas")}function x(U,E,te){let oe=1;const he=Ft(U);if((he.width>te||he.height>te)&&(oe=te/Math.max(he.width,he.height)),oe<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const be=Math.floor(oe*he.width),Re=Math.floor(oe*he.height);v===void 0&&(v=C(be,Re));const pe=E?C(be,Re):v;return pe.width=be,pe.height=Re,pe.getContext("2d").drawImage(U,0,0,be,Re),pt("WebGLRenderer: Texture has been resized from ("+he.width+"x"+he.height+") to ("+be+"x"+Re+")."),pe}else return"data"in U&&pt("WebGLRenderer: Image in DataTexture is too big ("+he.width+"x"+he.height+")."),U;return U}function _(U){return U.generateMipmaps}function D(U){s.generateMipmap(U)}function z(U){return U.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?s.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function R(U,E,te,oe,he,be=!1){if(U!==null){if(s[U]!==void 0)return s[U];pt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let Re;oe&&(Re=e.get("EXT_texture_norm16"),Re||pt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let pe=E;if(E===s.RED&&(te===s.FLOAT&&(pe=s.R32F),te===s.HALF_FLOAT&&(pe=s.R16F),te===s.UNSIGNED_BYTE&&(pe=s.R8),te===s.UNSIGNED_SHORT&&Re&&(pe=Re.R16_EXT),te===s.SHORT&&Re&&(pe=Re.R16_SNORM_EXT)),E===s.RED_INTEGER&&(te===s.UNSIGNED_BYTE&&(pe=s.R8UI),te===s.UNSIGNED_SHORT&&(pe=s.R16UI),te===s.UNSIGNED_INT&&(pe=s.R32UI),te===s.BYTE&&(pe=s.R8I),te===s.SHORT&&(pe=s.R16I),te===s.INT&&(pe=s.R32I)),E===s.RG&&(te===s.FLOAT&&(pe=s.RG32F),te===s.HALF_FLOAT&&(pe=s.RG16F),te===s.UNSIGNED_BYTE&&(pe=s.RG8),te===s.UNSIGNED_SHORT&&Re&&(pe=Re.RG16_EXT),te===s.SHORT&&Re&&(pe=Re.RG16_SNORM_EXT)),E===s.RG_INTEGER&&(te===s.UNSIGNED_BYTE&&(pe=s.RG8UI),te===s.UNSIGNED_SHORT&&(pe=s.RG16UI),te===s.UNSIGNED_INT&&(pe=s.RG32UI),te===s.BYTE&&(pe=s.RG8I),te===s.SHORT&&(pe=s.RG16I),te===s.INT&&(pe=s.RG32I)),E===s.RGB_INTEGER&&(te===s.UNSIGNED_BYTE&&(pe=s.RGB8UI),te===s.UNSIGNED_SHORT&&(pe=s.RGB16UI),te===s.UNSIGNED_INT&&(pe=s.RGB32UI),te===s.BYTE&&(pe=s.RGB8I),te===s.SHORT&&(pe=s.RGB16I),te===s.INT&&(pe=s.RGB32I)),E===s.RGBA_INTEGER&&(te===s.UNSIGNED_BYTE&&(pe=s.RGBA8UI),te===s.UNSIGNED_SHORT&&(pe=s.RGBA16UI),te===s.UNSIGNED_INT&&(pe=s.RGBA32UI),te===s.BYTE&&(pe=s.RGBA8I),te===s.SHORT&&(pe=s.RGBA16I),te===s.INT&&(pe=s.RGBA32I)),E===s.RGB&&(te===s.UNSIGNED_SHORT&&Re&&(pe=Re.RGB16_EXT),te===s.SHORT&&Re&&(pe=Re.RGB16_SNORM_EXT),te===s.UNSIGNED_INT_5_9_9_9_REV&&(pe=s.RGB9_E5),te===s.UNSIGNED_INT_10F_11F_11F_REV&&(pe=s.R11F_G11F_B10F)),E===s.RGBA){const me=be?Xc:Ot.getTransfer(he);te===s.FLOAT&&(pe=s.RGBA32F),te===s.HALF_FLOAT&&(pe=s.RGBA16F),te===s.UNSIGNED_BYTE&&(pe=me===qt?s.SRGB8_ALPHA8:s.RGBA8),te===s.UNSIGNED_SHORT&&Re&&(pe=Re.RGBA16_EXT),te===s.SHORT&&Re&&(pe=Re.RGBA16_SNORM_EXT),te===s.UNSIGNED_SHORT_4_4_4_4&&(pe=s.RGBA4),te===s.UNSIGNED_SHORT_5_5_5_1&&(pe=s.RGB5_A1)}return(pe===s.R16F||pe===s.R32F||pe===s.RG16F||pe===s.RG32F||pe===s.RGBA16F||pe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),pe}function P(U,E){let te;return U?E===null||E===fr||E===rl?te=s.DEPTH24_STENCIL8:E===cr?te=s.DEPTH32F_STENCIL8:E===il&&(te=s.DEPTH24_STENCIL8,pt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===fr||E===rl?te=s.DEPTH_COMPONENT24:E===cr?te=s.DEPTH_COMPONENT32F:E===il&&(te=s.DEPTH_COMPONENT16),te}function L(U,E){return _(U)===!0||U.isFramebufferTexture&&U.minFilter!==Fn&&U.minFilter!==Wn?Math.log2(Math.max(E.width,E.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?E.mipmaps.length:1}function B(U){const E=U.target;E.removeEventListener("dispose",B),N(E),E.isVideoTexture&&y.delete(E),E.isHTMLTexture&&S.delete(E)}function b(U){const E=U.target;E.removeEventListener("dispose",b),V(E)}function N(U){const E=r.get(U);if(E.__webglInit===void 0)return;const te=U.source,oe=M.get(te);if(oe){const he=oe[E.__cacheKey];he.usedTimes--,he.usedTimes===0&&O(U),Object.keys(oe).length===0&&M.delete(te)}r.remove(U)}function O(U){const E=r.get(U);s.deleteTexture(E.__webglTexture);const te=U.source,oe=M.get(te);delete oe[E.__cacheKey],d.memory.textures--}function V(U){const E=r.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),r.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(E.__webglFramebuffer[oe]))for(let he=0;he<E.__webglFramebuffer[oe].length;he++)s.deleteFramebuffer(E.__webglFramebuffer[oe][he]);else s.deleteFramebuffer(E.__webglFramebuffer[oe]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[oe])}else{if(Array.isArray(E.__webglFramebuffer))for(let oe=0;oe<E.__webglFramebuffer.length;oe++)s.deleteFramebuffer(E.__webglFramebuffer[oe]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let oe=0;oe<E.__webglColorRenderbuffer.length;oe++)E.__webglColorRenderbuffer[oe]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[oe]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const te=U.textures;for(let oe=0,he=te.length;oe<he;oe++){const be=r.get(te[oe]);be.__webglTexture&&(s.deleteTexture(be.__webglTexture),d.memory.textures--),r.remove(te[oe])}r.remove(U)}let Y=0;function Q(){Y=0}function G(){return Y}function F(U){Y=U}function ce(){const U=Y;return U>=o.maxTextures&&pt("WebGLTextures: Trying to use "+(U+1)+" texture units while this GPU supports only "+o.maxTextures),Y+=1,U}function Z(U){const E=[];return E.push(U.wrapS),E.push(U.wrapT),E.push(U.wrapR||0),E.push(U.magFilter),E.push(U.minFilter),E.push(U.anisotropy),E.push(U.internalFormat),E.push(U.format),E.push(U.type),E.push(U.generateMipmaps),E.push(U.premultiplyAlpha),E.push(U.flipY),E.push(U.unpackAlignment),E.push(U.colorSpace),E.join()}function J(U,E){const te=r.get(U);if(U.isVideoTexture&&$(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&te.__version!==U.version){const oe=U.image;if(oe===null)pt("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)pt("WebGLRenderer: Texture marked for update but image is incomplete");else{Se(te,U,E);return}}else U.isExternalTexture&&(te.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,te.__webglTexture,s.TEXTURE0+E)}function W(U,E){const te=r.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&te.__version!==U.version){Se(te,U,E);return}else U.isExternalTexture&&(te.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,te.__webglTexture,s.TEXTURE0+E)}function ee(U,E){const te=r.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&te.__version!==U.version){Se(te,U,E);return}t.bindTexture(s.TEXTURE_3D,te.__webglTexture,s.TEXTURE0+E)}function I(U,E){const te=r.get(U);if(U.isCubeDepthTexture!==!0&&U.version>0&&te.__version!==U.version){Ze(te,U,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,te.__webglTexture,s.TEXTURE0+E)}const q={[nl]:s.REPEAT,[Ir]:s.CLAMP_TO_EDGE,[Tf]:s.MIRRORED_REPEAT},xe={[Fn]:s.NEAREST,[g_]:s.NEAREST_MIPMAP_NEAREST,[uc]:s.NEAREST_MIPMAP_LINEAR,[Wn]:s.LINEAR,[Bd]:s.LINEAR_MIPMAP_NEAREST,[Qs]:s.LINEAR_MIPMAP_LINEAR},we={[y_]:s.NEVER,[w_]:s.ALWAYS,[S_]:s.LESS,[vh]:s.LEQUAL,[M_]:s.EQUAL,[_h]:s.GEQUAL,[b_]:s.GREATER,[E_]:s.NOTEQUAL};function Ve(U,E){if(E.type===cr&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Wn||E.magFilter===Bd||E.magFilter===uc||E.magFilter===Qs||E.minFilter===Wn||E.minFilter===Bd||E.minFilter===uc||E.minFilter===Qs)&&pt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(U,s.TEXTURE_WRAP_S,q[E.wrapS]),s.texParameteri(U,s.TEXTURE_WRAP_T,q[E.wrapT]),(U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY)&&s.texParameteri(U,s.TEXTURE_WRAP_R,q[E.wrapR]),s.texParameteri(U,s.TEXTURE_MAG_FILTER,xe[E.magFilter]),s.texParameteri(U,s.TEXTURE_MIN_FILTER,xe[E.minFilter]),E.compareFunction&&(s.texParameteri(U,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(U,s.TEXTURE_COMPARE_FUNC,we[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Fn||E.minFilter!==uc&&E.minFilter!==Qs||E.type===cr&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const te=e.get("EXT_texture_filter_anisotropic");s.texParameterf(U,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,o.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function $e(U,E){let te=!1;U.__webglInit===void 0&&(U.__webglInit=!0,E.addEventListener("dispose",B));const oe=E.source;let he=M.get(oe);he===void 0&&(he={},M.set(oe,he));const be=Z(E);if(be!==U.__cacheKey){he[be]===void 0&&(he[be]={texture:s.createTexture(),usedTimes:0},d.memory.textures++,te=!0),he[be].usedTimes++;const Re=he[U.__cacheKey];Re!==void 0&&(he[U.__cacheKey].usedTimes--,Re.usedTimes===0&&O(E)),U.__cacheKey=be,U.__webglTexture=he[be].texture}return te}function ae(U,E,te){return Math.floor(Math.floor(U/te)/E)}function de(U,E,te,oe){const be=U.updateRanges;if(be.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,te,oe,E.data);else{be.sort((nt,Ne)=>nt.start-Ne.start);let Re=0;for(let nt=1;nt<be.length;nt++){const Ne=be[Re],Te=be[nt],et=Ne.start+Ne.count,lt=ae(Te.start,E.width,4),dt=ae(Ne.start,E.width,4);Te.start<=et+1&&lt===dt&&ae(Te.start+Te.count-1,E.width,4)===lt?Ne.count=Math.max(Ne.count,Te.start+Te.count-Ne.start):(++Re,be[Re]=Te)}be.length=Re+1;const pe=t.getParameter(s.UNPACK_ROW_LENGTH),me=t.getParameter(s.UNPACK_SKIP_PIXELS),Ue=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let nt=0,Ne=be.length;nt<Ne;nt++){const Te=be[nt],et=Math.floor(Te.start/4),lt=Math.ceil(Te.count/4),dt=et%E.width,H=Math.floor(et/E.width),Pe=lt,ge=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,dt),t.pixelStorei(s.UNPACK_SKIP_ROWS,H),t.texSubImage2D(s.TEXTURE_2D,0,dt,H,Pe,ge,te,oe,E.data)}U.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,pe),t.pixelStorei(s.UNPACK_SKIP_PIXELS,me),t.pixelStorei(s.UNPACK_SKIP_ROWS,Ue)}}function Se(U,E,te){let oe=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(oe=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(oe=s.TEXTURE_3D);const he=$e(U,E),be=E.source;t.bindTexture(oe,U.__webglTexture,s.TEXTURE0+te);const Re=r.get(be);if(be.version!==Re.__version||he===!0){if(t.activeTexture(s.TEXTURE0+te),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const ge=Ot.getPrimaries(Ot.workingColorSpace),Ce=E.colorSpace===hs?null:Ot.getPrimaries(E.colorSpace),ze=E.colorSpace===hs||ge===Ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze)}t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment);let me=x(E.image,!1,o.maxTextureSize);me=mn(E,me);const Ue=l.convert(E.format,E.colorSpace),nt=l.convert(E.type);let Ne=R(E.internalFormat,Ue,nt,E.normalized,E.colorSpace,E.isVideoTexture);Ve(oe,E);let Te;const et=E.mipmaps,lt=E.isVideoTexture!==!0,dt=Re.__version===void 0||he===!0,H=be.dataReady,Pe=L(E,me);if(E.isDepthTexture)Ne=P(E.format===ea,E.type),dt&&(lt?t.texStorage2D(s.TEXTURE_2D,1,Ne,me.width,me.height):t.texImage2D(s.TEXTURE_2D,0,Ne,me.width,me.height,0,Ue,nt,null));else if(E.isDataTexture)if(et.length>0){lt&&dt&&t.texStorage2D(s.TEXTURE_2D,Pe,Ne,et[0].width,et[0].height);for(let ge=0,Ce=et.length;ge<Ce;ge++)Te=et[ge],lt?H&&t.texSubImage2D(s.TEXTURE_2D,ge,0,0,Te.width,Te.height,Ue,nt,Te.data):t.texImage2D(s.TEXTURE_2D,ge,Ne,Te.width,Te.height,0,Ue,nt,Te.data);E.generateMipmaps=!1}else lt?(dt&&t.texStorage2D(s.TEXTURE_2D,Pe,Ne,me.width,me.height),H&&de(E,me,Ue,nt)):t.texImage2D(s.TEXTURE_2D,0,Ne,me.width,me.height,0,Ue,nt,me.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){lt&&dt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,Ne,et[0].width,et[0].height,me.depth);for(let ge=0,Ce=et.length;ge<Ce;ge++)if(Te=et[ge],E.format!==$i)if(Ue!==null)if(lt){if(H)if(E.layerUpdates.size>0){const ze=P0(Te.width,Te.height,E.format,E.type);for(const ve of E.layerUpdates){const rt=Te.data.subarray(ve*ze/Te.data.BYTES_PER_ELEMENT,(ve+1)*ze/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ge,0,0,ve,Te.width,Te.height,1,Ue,rt)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ge,0,0,0,Te.width,Te.height,me.depth,Ue,Te.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ge,Ne,Te.width,Te.height,me.depth,0,Te.data,0,0);else pt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else lt?H&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ge,0,0,0,Te.width,Te.height,me.depth,Ue,nt,Te.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ge,Ne,Te.width,Te.height,me.depth,0,Ue,nt,Te.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{lt&&dt&&t.texStorage2D(s.TEXTURE_2D,Pe,Ne,et[0].width,et[0].height);for(let ge=0,Ce=et.length;ge<Ce;ge++)Te=et[ge],E.format!==$i?Ue!==null?lt?H&&t.compressedTexSubImage2D(s.TEXTURE_2D,ge,0,0,Te.width,Te.height,Ue,Te.data):t.compressedTexImage2D(s.TEXTURE_2D,ge,Ne,Te.width,Te.height,0,Te.data):pt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?H&&t.texSubImage2D(s.TEXTURE_2D,ge,0,0,Te.width,Te.height,Ue,nt,Te.data):t.texImage2D(s.TEXTURE_2D,ge,Ne,Te.width,Te.height,0,Ue,nt,Te.data)}else if(E.isDataArrayTexture)if(lt){if(dt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,Ne,me.width,me.height,me.depth),H)if(E.layerUpdates.size>0){const ge=P0(me.width,me.height,E.format,E.type);for(const Ce of E.layerUpdates){const ze=me.data.subarray(Ce*ge/me.data.BYTES_PER_ELEMENT,(Ce+1)*ge/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Ce,me.width,me.height,1,Ue,nt,ze)}E.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,Ue,nt,me.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ne,me.width,me.height,me.depth,0,Ue,nt,me.data);else if(E.isData3DTexture)lt?(dt&&t.texStorage3D(s.TEXTURE_3D,Pe,Ne,me.width,me.height,me.depth),H&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,Ue,nt,me.data)):t.texImage3D(s.TEXTURE_3D,0,Ne,me.width,me.height,me.depth,0,Ue,nt,me.data);else if(E.isFramebufferTexture){if(dt)if(lt)t.texStorage2D(s.TEXTURE_2D,Pe,Ne,me.width,me.height);else{let ge=me.width,Ce=me.height;for(let ze=0;ze<Pe;ze++)t.texImage2D(s.TEXTURE_2D,ze,Ne,ge,Ce,0,Ue,nt,null),ge>>=1,Ce>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in s){const ge=s.canvas;if(ge.hasAttribute("layoutsubtree")||ge.setAttribute("layoutsubtree","true"),me.parentNode!==ge){ge.appendChild(me),S.add(E),ge.onpaint=Ce=>{const ze=Ce.changedElements;for(const ve of S)ze.includes(ve.image)&&(ve.needsUpdate=!0)},ge.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,me);else{const ze=s.RGBA,ve=s.RGBA,rt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,ze,ve,rt,me)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(et.length>0){if(lt&&dt){const ge=Ft(et[0]);t.texStorage2D(s.TEXTURE_2D,Pe,Ne,ge.width,ge.height)}for(let ge=0,Ce=et.length;ge<Ce;ge++)Te=et[ge],lt?H&&t.texSubImage2D(s.TEXTURE_2D,ge,0,0,Ue,nt,Te):t.texImage2D(s.TEXTURE_2D,ge,Ne,Ue,nt,Te);E.generateMipmaps=!1}else if(lt){if(dt){const ge=Ft(me);t.texStorage2D(s.TEXTURE_2D,Pe,Ne,ge.width,ge.height)}H&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ue,nt,me)}else t.texImage2D(s.TEXTURE_2D,0,Ne,Ue,nt,me);_(E)&&D(oe),Re.__version=be.version,E.onUpdate&&E.onUpdate(E)}U.__version=E.version}function Ze(U,E,te){if(E.image.length!==6)return;const oe=$e(U,E),he=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,U.__webglTexture,s.TEXTURE0+te);const be=r.get(he);if(he.version!==be.__version||oe===!0){t.activeTexture(s.TEXTURE0+te);const Re=Ot.getPrimaries(Ot.workingColorSpace),pe=E.colorSpace===hs?null:Ot.getPrimaries(E.colorSpace),me=E.colorSpace===hs||Re===pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Ue=E.isCompressedTexture||E.image[0].isCompressedTexture,nt=E.image[0]&&E.image[0].isDataTexture,Ne=[];for(let ve=0;ve<6;ve++)!Ue&&!nt?Ne[ve]=x(E.image[ve],!0,o.maxCubemapSize):Ne[ve]=nt?E.image[ve].image:E.image[ve],Ne[ve]=mn(E,Ne[ve]);const Te=Ne[0],et=l.convert(E.format,E.colorSpace),lt=l.convert(E.type),dt=R(E.internalFormat,et,lt,E.normalized,E.colorSpace),H=E.isVideoTexture!==!0,Pe=be.__version===void 0||oe===!0,ge=he.dataReady;let Ce=L(E,Te);Ve(s.TEXTURE_CUBE_MAP,E);let ze;if(Ue){H&&Pe&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,dt,Te.width,Te.height);for(let ve=0;ve<6;ve++){ze=Ne[ve].mipmaps;for(let rt=0;rt<ze.length;rt++){const Qe=ze[rt];E.format!==$i?et!==null?H?ge&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,rt,0,0,Qe.width,Qe.height,et,Qe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,rt,dt,Qe.width,Qe.height,0,Qe.data):pt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ge&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,rt,0,0,Qe.width,Qe.height,et,lt,Qe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,rt,dt,Qe.width,Qe.height,0,et,lt,Qe.data)}}}else{if(ze=E.mipmaps,H&&Pe){ze.length>0&&Ce++;const ve=Ft(Ne[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,dt,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(nt){H?ge&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,Ne[ve].width,Ne[ve].height,et,lt,Ne[ve].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,dt,Ne[ve].width,Ne[ve].height,0,et,lt,Ne[ve].data);for(let rt=0;rt<ze.length;rt++){const At=ze[rt].image[ve].image;H?ge&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,rt+1,0,0,At.width,At.height,et,lt,At.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,rt+1,dt,At.width,At.height,0,et,lt,At.data)}}else{H?ge&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,et,lt,Ne[ve]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,dt,et,lt,Ne[ve]);for(let rt=0;rt<ze.length;rt++){const Qe=ze[rt];H?ge&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,rt+1,0,0,et,lt,Qe.image[ve]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,rt+1,dt,et,lt,Qe.image[ve])}}}_(E)&&D(s.TEXTURE_CUBE_MAP),be.__version=he.version,E.onUpdate&&E.onUpdate(E)}U.__version=E.version}function je(U,E,te,oe,he,be){const Re=l.convert(te.format,te.colorSpace),pe=l.convert(te.type),me=R(te.internalFormat,Re,pe,te.normalized,te.colorSpace),Ue=r.get(E),nt=r.get(te);if(nt.__renderTarget=E,!Ue.__hasExternalTextures){const Ne=Math.max(1,E.width>>be),Te=Math.max(1,E.height>>be);he===s.TEXTURE_3D||he===s.TEXTURE_2D_ARRAY?t.texImage3D(he,be,me,Ne,Te,E.depth,0,Re,pe,null):t.texImage2D(he,be,me,Ne,Te,0,Re,pe,null)}t.bindFramebuffer(s.FRAMEBUFFER,U),jt(E)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,oe,he,nt.__webglTexture,0,Mt(E)):(he===s.TEXTURE_2D||he>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&he<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,oe,he,nt.__webglTexture,be),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ie(U,E,te){if(s.bindRenderbuffer(s.RENDERBUFFER,U),E.depthBuffer){const oe=E.depthTexture,he=oe&&oe.isDepthTexture?oe.type:null,be=P(E.stencilBuffer,he),Re=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;jt(E)?h.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Mt(E),be,E.width,E.height):te?s.renderbufferStorageMultisample(s.RENDERBUFFER,Mt(E),be,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,be,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Re,s.RENDERBUFFER,U)}else{const oe=E.textures;for(let he=0;he<oe.length;he++){const be=oe[he],Re=l.convert(be.format,be.colorSpace),pe=l.convert(be.type),me=R(be.internalFormat,Re,pe,be.normalized,be.colorSpace);jt(E)?h.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Mt(E),me,E.width,E.height):te?s.renderbufferStorageMultisample(s.RENDERBUFFER,Mt(E),me,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,me,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function at(U,E,te){const oe=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,U),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const he=r.get(E.depthTexture);if(he.__renderTarget=E,(!he.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),oe){if(he.__webglInit===void 0&&(he.__webglInit=!0,E.depthTexture.addEventListener("dispose",B)),he.__webglTexture===void 0){he.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,he.__webglTexture),Ve(s.TEXTURE_CUBE_MAP,E.depthTexture);const Ue=l.convert(E.depthTexture.format),nt=l.convert(E.depthTexture.type);let Ne;E.depthTexture.format===kr?Ne=s.DEPTH_COMPONENT24:E.depthTexture.format===ea&&(Ne=s.DEPTH24_STENCIL8);for(let Te=0;Te<6;Te++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Ne,E.width,E.height,0,Ue,nt,null)}}else J(E.depthTexture,0);const be=he.__webglTexture,Re=Mt(E),pe=oe?s.TEXTURE_CUBE_MAP_POSITIVE_X+te:s.TEXTURE_2D,me=E.depthTexture.format===ea?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(E.depthTexture.format===kr)jt(E)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,me,pe,be,0,Re):s.framebufferTexture2D(s.FRAMEBUFFER,me,pe,be,0);else if(E.depthTexture.format===ea)jt(E)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,me,pe,be,0,Re):s.framebufferTexture2D(s.FRAMEBUFFER,me,pe,be,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ae(U){const E=r.get(U),te=U.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==U.depthTexture){const oe=U.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),oe){const he=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,oe.removeEventListener("dispose",he)};oe.addEventListener("dispose",he),E.__depthDisposeCallback=he}E.__boundDepthTexture=oe}if(U.depthTexture&&!E.__autoAllocateDepthBuffer)if(te)for(let oe=0;oe<6;oe++)at(E.__webglFramebuffer[oe],U,oe);else{const oe=U.texture.mipmaps;oe&&oe.length>0?at(E.__webglFramebuffer[0],U,0):at(E.__webglFramebuffer,U,0)}else if(te){E.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[oe]),E.__webglDepthbuffer[oe]===void 0)E.__webglDepthbuffer[oe]=s.createRenderbuffer(),Ie(E.__webglDepthbuffer[oe],U,!1);else{const he=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=E.__webglDepthbuffer[oe];s.bindRenderbuffer(s.RENDERBUFFER,be),s.framebufferRenderbuffer(s.FRAMEBUFFER,he,s.RENDERBUFFER,be)}}else{const oe=U.texture.mipmaps;if(oe&&oe.length>0?t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),Ie(E.__webglDepthbuffer,U,!1);else{const he=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,be),s.framebufferRenderbuffer(s.FRAMEBUFFER,he,s.RENDERBUFFER,be)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Oe(U,E,te){const oe=r.get(U);E!==void 0&&je(oe.__webglFramebuffer,U,U.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),te!==void 0&&Ae(U)}function Be(U){const E=U.texture,te=r.get(U),oe=r.get(E);U.addEventListener("dispose",b);const he=U.textures,be=U.isWebGLCubeRenderTarget===!0,Re=he.length>1;if(Re||(oe.__webglTexture===void 0&&(oe.__webglTexture=s.createTexture()),oe.__version=E.version,d.memory.textures++),be){te.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(E.mipmaps&&E.mipmaps.length>0){te.__webglFramebuffer[pe]=[];for(let me=0;me<E.mipmaps.length;me++)te.__webglFramebuffer[pe][me]=s.createFramebuffer()}else te.__webglFramebuffer[pe]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){te.__webglFramebuffer=[];for(let pe=0;pe<E.mipmaps.length;pe++)te.__webglFramebuffer[pe]=s.createFramebuffer()}else te.__webglFramebuffer=s.createFramebuffer();if(Re)for(let pe=0,me=he.length;pe<me;pe++){const Ue=r.get(he[pe]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=s.createTexture(),d.memory.textures++)}if(U.samples>0&&jt(U)===!1){te.__webglMultisampledFramebuffer=s.createFramebuffer(),te.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,te.__webglMultisampledFramebuffer);for(let pe=0;pe<he.length;pe++){const me=he[pe];te.__webglColorRenderbuffer[pe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,te.__webglColorRenderbuffer[pe]);const Ue=l.convert(me.format,me.colorSpace),nt=l.convert(me.type),Ne=R(me.internalFormat,Ue,nt,me.normalized,me.colorSpace,U.isXRRenderTarget===!0),Te=Mt(U);s.renderbufferStorageMultisample(s.RENDERBUFFER,Te,Ne,U.width,U.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.RENDERBUFFER,te.__webglColorRenderbuffer[pe])}s.bindRenderbuffer(s.RENDERBUFFER,null),U.depthBuffer&&(te.__webglDepthRenderbuffer=s.createRenderbuffer(),Ie(te.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(be){t.bindTexture(s.TEXTURE_CUBE_MAP,oe.__webglTexture),Ve(s.TEXTURE_CUBE_MAP,E);for(let pe=0;pe<6;pe++)if(E.mipmaps&&E.mipmaps.length>0)for(let me=0;me<E.mipmaps.length;me++)je(te.__webglFramebuffer[pe][me],U,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,me);else je(te.__webglFramebuffer[pe],U,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);_(E)&&D(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let pe=0,me=he.length;pe<me;pe++){const Ue=he[pe],nt=r.get(Ue);let Ne=s.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Ne=U.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Ne,nt.__webglTexture),Ve(Ne,Ue),je(te.__webglFramebuffer,U,Ue,s.COLOR_ATTACHMENT0+pe,Ne,0),_(Ue)&&D(Ne)}t.unbindTexture()}else{let pe=s.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(pe=U.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(pe,oe.__webglTexture),Ve(pe,E),E.mipmaps&&E.mipmaps.length>0)for(let me=0;me<E.mipmaps.length;me++)je(te.__webglFramebuffer[me],U,E,s.COLOR_ATTACHMENT0,pe,me);else je(te.__webglFramebuffer,U,E,s.COLOR_ATTACHMENT0,pe,0);_(E)&&D(pe),t.unbindTexture()}U.depthBuffer&&Ae(U)}function qe(U){const E=U.textures;for(let te=0,oe=E.length;te<oe;te++){const he=E[te];if(_(he)){const be=z(U),Re=r.get(he).__webglTexture;t.bindTexture(be,Re),D(be),t.unbindTexture()}}}const xt=[],Dt=[];function kt(U){if(U.samples>0){if(jt(U)===!1){const E=U.textures,te=U.width,oe=U.height;let he=s.COLOR_BUFFER_BIT;const be=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Re=r.get(U),pe=E.length>1;if(pe)for(let Ue=0;Ue<E.length;Ue++)t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer);const me=U.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Ue=0;Ue<E.length;Ue++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(he|=s.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(he|=s.STENCIL_BUFFER_BIT)),pe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Re.__webglColorRenderbuffer[Ue]);const nt=r.get(E[Ue]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,nt,0)}s.blitFramebuffer(0,0,te,oe,0,0,te,oe,he,s.NEAREST),p===!0&&(xt.length=0,Dt.length=0,xt.push(s.COLOR_ATTACHMENT0+Ue),U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&(xt.push(be),Dt.push(be),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Dt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),pe)for(let Ue=0;Ue<E.length;Ue++){t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.RENDERBUFFER,Re.__webglColorRenderbuffer[Ue]);const nt=r.get(E[Ue]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.TEXTURE_2D,nt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&p){const E=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function Mt(U){return Math.min(o.maxSamples,U.samples)}function jt(U){const E=r.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function $(U){const E=d.render.frame;y.get(U)!==E&&(y.set(U,E),U.update())}function mn(U,E){const te=U.colorSpace,oe=U.format,he=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||te!==Wc&&te!==hs&&(Ot.getTransfer(te)===qt?(oe!==$i||he!==bi)&&pt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):zt("WebGLTextures: Unsupported texture color space:",te)),E}function Ft(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(m.width=U.naturalWidth||U.width,m.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(m.width=U.displayWidth,m.height=U.displayHeight):(m.width=U.width,m.height=U.height),m}this.allocateTextureUnit=ce,this.resetTextureUnits=Q,this.getTextureUnits=G,this.setTextureUnits=F,this.setTexture2D=J,this.setTexture2DArray=W,this.setTexture3D=ee,this.setTextureCube=I,this.rebindTextures=Oe,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=qe,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=je,this.useMultisampledRTT=jt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function lE(s,e){function t(r,o=hs){let l;const d=Ot.getTransfer(o);if(r===bi)return s.UNSIGNED_BYTE;if(r===hh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===ph)return s.UNSIGNED_SHORT_5_5_5_1;if(r===_g)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===yg)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===xg)return s.BYTE;if(r===vg)return s.SHORT;if(r===il)return s.UNSIGNED_SHORT;if(r===fh)return s.INT;if(r===fr)return s.UNSIGNED_INT;if(r===cr)return s.FLOAT;if(r===hr)return s.HALF_FLOAT;if(r===Sg)return s.ALPHA;if(r===Mg)return s.RGB;if(r===$i)return s.RGBA;if(r===kr)return s.DEPTH_COMPONENT;if(r===ea)return s.DEPTH_STENCIL;if(r===bg)return s.RED;if(r===mh)return s.RED_INTEGER;if(r===ia)return s.RG;if(r===gh)return s.RG_INTEGER;if(r===xh)return s.RGBA_INTEGER;if(r===Fc||r===kc||r===Bc||r===zc)if(d===qt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===Fc)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===kc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Bc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===zc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===Fc)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===kc)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Bc)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===zc)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Af||r===Rf||r===Cf||r===Nf)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===Af)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Rf)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Cf)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Nf)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Pf||r===Lf||r===Df||r===If||r===Uf||r===Hc||r===Of)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===Pf||r===Lf)return d===qt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===Df)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC;if(r===If)return l.COMPRESSED_R11_EAC;if(r===Uf)return l.COMPRESSED_SIGNED_R11_EAC;if(r===Hc)return l.COMPRESSED_RG11_EAC;if(r===Of)return l.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===Ff||r===kf||r===Bf||r===zf||r===Vf||r===Gf||r===Hf||r===jf||r===Wf||r===Xf||r===Yf||r===qf||r===$f||r===Kf)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===Ff)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===kf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Bf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===zf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Vf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Gf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Hf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===jf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Wf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Xf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Yf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===qf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===$f)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Kf)return d===qt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Zf||r===Jf||r===Qf)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===Zf)return d===qt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Jf)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Qf)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===eh||r===th||r===jc||r===nh)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===eh)return l.COMPRESSED_RED_RGTC1_EXT;if(r===th)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===jc)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===nh)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===rl?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:t}}const cE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class dE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const r=new Pg(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new pr({vertexShader:cE,fragmentShader:uE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new He(new or(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fE extends gs{constructor(e,t){super();const r=this;let o=null,l=1,d=null,h="local-floor",p=1,m=null,y=null,S=null,v=null,M=null,w=null;const C=typeof XRWebGLBinding<"u",x=new dE,_={},D=t.getContextAttributes();let z=null,R=null;const P=[],L=[],B=new mt;let b=null,N=null;const O=new Mi;O.viewport=new fn;const V=new Mi;V.viewport=new fn;const Y=[O,V],Q=new xy;let G=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let de=P[ae];return de===void 0&&(de=new Yd,P[ae]=de),de.getTargetRaySpace()},this.getControllerGrip=function(ae){let de=P[ae];return de===void 0&&(de=new Yd,P[ae]=de),de.getGripSpace()},this.getHand=function(ae){let de=P[ae];return de===void 0&&(de=new Yd,P[ae]=de),de.getHandSpace()};function ce(ae){const de=L.indexOf(ae.inputSource);if(de===-1)return;const Se=P[de];Se!==void 0&&(Se.update(ae.inputSource,ae.frame,m||d),Se.dispatchEvent({type:ae.type,data:ae.inputSource}))}function Z(){o.removeEventListener("select",ce),o.removeEventListener("selectstart",ce),o.removeEventListener("selectend",ce),o.removeEventListener("squeeze",ce),o.removeEventListener("squeezestart",ce),o.removeEventListener("squeezeend",ce),o.removeEventListener("end",Z),o.removeEventListener("inputsourceschange",J);for(let ae=0;ae<P.length;ae++){const de=L[ae];de!==null&&(L[ae]=null,P[ae].disconnect(de))}G=null,F=null,x.reset();for(const ae in _)delete _[ae];if(e.setRenderTarget(z),M=null,v=null,S=null,o=null,R=null,$e.stop(),r.isPresenting=!1,e.setPixelRatio(b),e.setSize(B.width,B.height,!1),N!==null){const ae=N.camera;ae.fov=N.fov,ae.zoom=N.zoom,ae.updateProjectionMatrix(),N=null}r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){l=ae,r.isPresenting===!0&&pt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){h=ae,r.isPresenting===!0&&pt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||d},this.setReferenceSpace=function(ae){m=ae},this.getBaseLayer=function(){return v!==null?v:M},this.getBinding=function(){return S===null&&C&&(S=new XRWebGLBinding(o,t)),S},this.getFrame=function(){return w},this.getSession=function(){return o},this.setSession=async function(ae){if(o=ae,o!==null){if(z=e.getRenderTarget(),o.addEventListener("select",ce),o.addEventListener("selectstart",ce),o.addEventListener("selectend",ce),o.addEventListener("squeeze",ce),o.addEventListener("squeezestart",ce),o.addEventListener("squeezeend",ce),o.addEventListener("end",Z),o.addEventListener("inputsourceschange",J),D.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(B),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,Ze=null,je=null;D.depth&&(je=D.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Se=D.stencil?ea:kr,Ze=D.stencil?rl:fr);const Ie={colorFormat:t.RGBA8,depthFormat:je,scaleFactor:l};S=this.getBinding(),v=S.createProjectionLayer(Ie),o.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),R=new Ki(v.textureWidth,v.textureHeight,{format:$i,type:bi,depthTexture:new al(v.textureWidth,v.textureHeight,Ze,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:D.stencil,colorSpace:e.outputColorSpace,samples:D.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1,storeMultisampledDepthBuffer:v.ignoreDepthValues===!1,storeMultisampledStencilBuffer:v.ignoreDepthValues===!1})}else{const Se={antialias:D.antialias,alpha:!0,depth:D.depth,stencil:D.stencil,framebufferScaleFactor:l};M=new XRWebGLLayer(o,t,Se),o.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),R=new Ki(M.framebufferWidth,M.framebufferHeight,{format:$i,type:bi,colorSpace:e.outputColorSpace,stencilBuffer:D.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1,storeMultisampledDepthBuffer:M.ignoreDepthValues===!1,storeMultisampledStencilBuffer:M.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(p),m=null,d=await o.requestReferenceSpace(h),$e.setContext(o),$e.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function J(ae){for(let de=0;de<ae.removed.length;de++){const Se=ae.removed[de],Ze=L.indexOf(Se);Ze>=0&&(L[Ze]=null,P[Ze].disconnect(Se))}for(let de=0;de<ae.added.length;de++){const Se=ae.added[de];let Ze=L.indexOf(Se);if(Ze===-1){for(let Ie=0;Ie<P.length;Ie++)if(Ie>=L.length){L.push(Se),Ze=Ie;break}else if(L[Ie]===null){L[Ie]=Se,Ze=Ie;break}if(Ze===-1)break}const je=P[Ze];je&&je.connect(Se)}}const W=new ne,ee=new ne;function I(ae,de,Se){W.setFromMatrixPosition(de.matrixWorld),ee.setFromMatrixPosition(Se.matrixWorld);const Ze=W.distanceTo(ee),je=de.projectionMatrix.elements,Ie=Se.projectionMatrix.elements,at=je[14]/(je[10]-1),Ae=je[14]/(je[10]+1),Oe=(je[9]+1)/je[5],Be=(je[9]-1)/je[5],qe=(je[8]-1)/je[0],xt=(Ie[8]+1)/Ie[0],Dt=at*qe,kt=at*xt,Mt=Ze/(-qe+xt),jt=Mt*-qe;if(de.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(jt),ae.translateZ(Mt),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),je[10]===-1)ae.projectionMatrix.copy(de.projectionMatrix),ae.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const $=at+Mt,mn=Ae+Mt,Ft=Dt-jt,U=kt+(Ze-jt),E=Oe*Ae/mn*$,te=Be*Ae/mn*$;ae.projectionMatrix.makePerspective(Ft,U,E,te,$,mn),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function q(ae,de){de===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(de.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(o===null)return;let de=ae.near,Se=ae.far;x.texture!==null&&(x.depthNear>0&&(de=x.depthNear),x.depthFar>0&&(Se=x.depthFar)),Q.near=V.near=O.near=de,Q.far=V.far=O.far=Se,(G!==Q.near||F!==Q.far)&&(o.updateRenderState({depthNear:Q.near,depthFar:Q.far}),G=Q.near,F=Q.far),Q.layers.mask=ae.layers.mask|6,O.layers.mask=Q.layers.mask&-5,V.layers.mask=Q.layers.mask&-3;const Ze=ae.parent,je=Q.cameras;q(Q,Ze);for(let Ie=0;Ie<je.length;Ie++)q(je[Ie],Ze);je.length===2?I(Q,O,V):Q.projectionMatrix.copy(O.projectionMatrix),N===null&&ae.isPerspectiveCamera&&(N={camera:ae,fov:ae.fov,zoom:ae.zoom}),xe(ae,Q,Ze)};function xe(ae,de,Se){Se===null?ae.matrix.copy(de.matrixWorld):(ae.matrix.copy(Se.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(de.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(de.projectionMatrix),ae.projectionMatrixInverse.copy(de.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=qc*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return Q},this.getFoveation=function(){if(!(v===null&&M===null))return p},this.setFoveation=function(ae){p=ae,v!==null&&(v.fixedFoveation=ae),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=ae)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(Q)},this.getCameraTexture=function(ae){return _[ae]};let we=null;function Ve(ae,de){if(y=de.getViewerPose(m||d),w=de,y!==null){const Se=y.views;M!==null&&(e.setRenderTargetFramebuffer(R,M.framebuffer),e.setRenderTarget(R));let Ze=!1;Se.length!==Q.cameras.length&&(Q.cameras.length=0,Ze=!0);for(let Ae=0;Ae<Se.length;Ae++){const Oe=Se[Ae];let Be=null;if(M!==null)Be=M.getViewport(Oe);else{const xt=S.getViewSubImage(v,Oe);Be=xt.viewport,Ae===0&&(e.setRenderTargetTextures(R,xt.colorTexture,xt.depthStencilTexture),e.setRenderTarget(R))}let qe=Y[Ae];qe===void 0&&(qe=new Mi,qe.layers.enable(Ae),qe.viewport=new fn,Y[Ae]=qe),qe.matrix.fromArray(Oe.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(Oe.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(Be.x,Be.y,Be.width,Be.height),Ae===0&&(Q.matrix.copy(qe.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale)),Ze===!0&&Q.cameras.push(qe)}const je=o.enabledFeatures;if(je&&je.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&C){S=r.getBinding();const Ae=S.getDepthInformation(Se[0]);Ae&&Ae.isValid&&Ae.texture&&x.init(Ae,o.renderState)}if(je&&je.includes("camera-access")&&C){e.state.unbindTexture(),S=r.getBinding();for(let Ae=0;Ae<Se.length;Ae++){const Oe=Se[Ae].camera;if(Oe){let Be=_[Oe];Be||(Be=new Pg,_[Oe]=Be);const qe=S.getCameraImage(Oe);Be.sourceTexture=qe}}}}for(let Se=0;Se<P.length;Se++){const Ze=L[Se],je=P[Se];Ze!==null&&je!==void 0&&je.update(Ze,de,m||d)}we&&we(ae,de),de.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:de}),w=null}const $e=new Ug;$e.setAnimationLoop(Ve),this.setAnimationLoop=function(ae){we=ae},this.dispose=function(){}}}const hE=new ln,Gg=new _t;Gg.set(-1,0,0,0,1,0,0,0,1);function pE(s,e){function t(x,_){x.matrixAutoUpdate===!0&&x.updateMatrix(),_.value.copy(x.matrix)}function r(x,_){_.color.getRGB(x.fogColor.value,Lg(s)),_.isFog?(x.fogNear.value=_.near,x.fogFar.value=_.far):_.isFogExp2&&(x.fogDensity.value=_.density)}function o(x,_,D,z,R){_.isNodeMaterial?_.uniformsNeedUpdate=!1:_.isMeshBasicMaterial?l(x,_):_.isMeshLambertMaterial?(l(x,_),_.envMap&&(x.envMapIntensity.value=_.envMapIntensity)):_.isMeshToonMaterial?(l(x,_),S(x,_)):_.isMeshPhongMaterial?(l(x,_),y(x,_),_.envMap&&(x.envMapIntensity.value=_.envMapIntensity)):_.isMeshStandardMaterial?(l(x,_),v(x,_),_.isMeshPhysicalMaterial&&M(x,_,R)):_.isMeshMatcapMaterial?(l(x,_),w(x,_)):_.isMeshDepthMaterial?l(x,_):_.isMeshDistanceMaterial?(l(x,_),C(x,_)):_.isMeshNormalMaterial?l(x,_):_.isLineBasicMaterial?(d(x,_),_.isLineDashedMaterial&&h(x,_)):_.isPointsMaterial?p(x,_,D,z):_.isSpriteMaterial?m(x,_):_.isShadowMaterial?(x.color.value.copy(_.color),x.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function l(x,_){x.opacity.value=_.opacity,_.color&&x.diffuse.value.copy(_.color),_.emissive&&x.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(x.map.value=_.map,t(_.map,x.mapTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,t(_.alphaMap,x.alphaMapTransform)),_.bumpMap&&(x.bumpMap.value=_.bumpMap,t(_.bumpMap,x.bumpMapTransform),x.bumpScale.value=_.bumpScale,_.side===hi&&(x.bumpScale.value*=-1)),_.normalMap&&(x.normalMap.value=_.normalMap,t(_.normalMap,x.normalMapTransform),x.normalScale.value.copy(_.normalScale),_.side===hi&&x.normalScale.value.negate()),_.displacementMap&&(x.displacementMap.value=_.displacementMap,t(_.displacementMap,x.displacementMapTransform),x.displacementScale.value=_.displacementScale,x.displacementBias.value=_.displacementBias),_.emissiveMap&&(x.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,x.emissiveMapTransform)),_.specularMap&&(x.specularMap.value=_.specularMap,t(_.specularMap,x.specularMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest);const D=e.get(_),z=D.envMap,R=D.envMapRotation;z&&(x.envMap.value=z,x.envMapRotation.value.setFromMatrix4(hE.makeRotationFromEuler(R)).transpose(),z.isCubeTexture&&z.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(Gg),x.reflectivity.value=_.reflectivity,x.ior.value=_.ior,x.refractionRatio.value=_.refractionRatio),_.lightMap&&(x.lightMap.value=_.lightMap,x.lightMapIntensity.value=_.lightMapIntensity,t(_.lightMap,x.lightMapTransform)),_.aoMap&&(x.aoMap.value=_.aoMap,x.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,x.aoMapTransform))}function d(x,_){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,_.map&&(x.map.value=_.map,t(_.map,x.mapTransform))}function h(x,_){x.dashSize.value=_.dashSize,x.totalSize.value=_.dashSize+_.gapSize,x.scale.value=_.scale}function p(x,_,D,z){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,x.size.value=_.size*D,x.scale.value=z*.5,_.map&&(x.map.value=_.map,t(_.map,x.uvTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,t(_.alphaMap,x.alphaMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest)}function m(x,_){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,x.rotation.value=_.rotation,_.map&&(x.map.value=_.map,t(_.map,x.mapTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,t(_.alphaMap,x.alphaMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest)}function y(x,_){x.specular.value.copy(_.specular),x.shininess.value=Math.max(_.shininess,1e-4)}function S(x,_){_.gradientMap&&(x.gradientMap.value=_.gradientMap)}function v(x,_){x.metalness.value=_.metalness,_.metalnessMap&&(x.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,x.metalnessMapTransform)),x.roughness.value=_.roughness,_.roughnessMap&&(x.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,x.roughnessMapTransform)),_.envMap&&(x.envMapIntensity.value=_.envMapIntensity)}function M(x,_,D){x.ior.value=_.ior,_.sheen>0&&(x.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),x.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(x.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,x.sheenColorMapTransform)),_.sheenRoughnessMap&&(x.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,x.sheenRoughnessMapTransform))),_.clearcoat>0&&(x.clearcoat.value=_.clearcoat,x.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(x.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,x.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(x.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===hi&&x.clearcoatNormalScale.value.negate())),_.dispersion>0&&(x.dispersion.value=_.dispersion),_.retroreflectivity>0&&(x.retroreflectivity.value=_.retroreflectivity),_.iridescence>0&&(x.iridescence.value=_.iridescence,x.iridescenceIOR.value=_.iridescenceIOR,x.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(x.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,x.iridescenceMapTransform)),_.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),_.transmission>0&&(x.transmission.value=_.transmission,x.transmissionSamplerMap.value=D.texture,x.transmissionSamplerSize.value.set(D.width,D.height),_.transmissionMap&&(x.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,x.transmissionMapTransform)),x.thickness.value=_.thickness,_.thicknessMap&&(x.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=_.attenuationDistance,x.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(x.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(x.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=_.specularIntensity,x.specularColor.value.copy(_.specularColor),_.specularColorMap&&(x.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,x.specularColorMapTransform)),_.specularIntensityMap&&(x.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,x.specularIntensityMapTransform))}function w(x,_){_.matcap&&(x.matcap.value=_.matcap)}function C(x,_){const D=e.get(_).light;x.referencePosition.value.setFromMatrixPosition(D.matrixWorld),x.nearDistance.value=D.shadow.camera.near,x.farDistance.value=D.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:o}}function mE(s,e,t,r){let o={},l={},d=[];const h=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function p(R,P){const L=P.program;r.uniformBlockBinding(R,L)}function m(R,P){let L=o[R.id];L===void 0&&(x(R),L=y(R),o[R.id]=L,R.addEventListener("dispose",D));const B=P.program;r.updateUBOMapping(R,B);const b=e.render.frame;l[R.id]!==b&&(v(R),l[R.id]=b)}function y(R){const P=S();R.__bindingPointIndex=P;const L=s.createBuffer(),B=R.__size,b=R.usage;return s.bindBuffer(s.UNIFORM_BUFFER,L),s.bufferData(s.UNIFORM_BUFFER,B,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,P,L),L}function S(){for(let R=0;R<h;R++)if(d.indexOf(R)===-1)return d.push(R),R;return zt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(R){const P=o[R.id],L=R.uniforms,B=R.__cache;s.bindBuffer(s.UNIFORM_BUFFER,P);for(let b=0,N=L.length;b<N;b++){const O=L[b];if(Array.isArray(O))for(let V=0,Y=O.length;V<Y;V++)M(O[V],b,V,B);else M(O,b,0,B)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function M(R,P,L,B){if(C(R,P,L,B)===!0){const b=R.__offset,N=R.value;if(Array.isArray(N)){let O=0;for(let V=0;V<N.length;V++){const Y=N[V],Q=_(Y);w(Y,R.__data,O),typeof Y!="number"&&typeof Y!="boolean"&&!Y.isMatrix3&&!ArrayBuffer.isView(Y)&&(O+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}}else w(N,R.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,b,R.__data)}}function w(R,P,L){typeof R=="number"||typeof R=="boolean"?P[0]=R:R.isMatrix3?(P[0]=R.elements[0],P[1]=R.elements[1],P[2]=R.elements[2],P[3]=0,P[4]=R.elements[3],P[5]=R.elements[4],P[6]=R.elements[5],P[7]=0,P[8]=R.elements[6],P[9]=R.elements[7],P[10]=R.elements[8],P[11]=0):ArrayBuffer.isView(R)?P.set(new R.constructor(R.buffer,R.byteOffset,P.length)):R.toArray(P,L)}function C(R,P,L,B){const b=R.value,N=P+"_"+L;if(B[N]===void 0)return typeof b=="number"||typeof b=="boolean"?B[N]=b:ArrayBuffer.isView(b)?B[N]=b.slice():B[N]=b.clone(),!0;{const O=B[N];if(typeof b=="number"||typeof b=="boolean"){if(O!==b)return B[N]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(O.equals(b)===!1)return O.copy(b),!0}}return!1}function x(R){const P=R.uniforms;let L=0;const B=16;for(let N=0,O=P.length;N<O;N++){const V=Array.isArray(P[N])?P[N]:[P[N]];for(let Y=0,Q=V.length;Y<Q;Y++){const G=V[Y],F=Array.isArray(G.value)?G.value:[G.value];for(let ce=0,Z=F.length;ce<Z;ce++){const J=F[ce],W=_(J),ee=L%B,I=ee%W.boundary,q=ee+I;L+=I,q!==0&&B-q<W.storage&&(L+=B-q),G.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=L,L+=W.storage}}}const b=L%B;return b>0&&(L+=B-b),R.__size=L,R.__cache={},this}function _(R){const P={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(P.boundary=4,P.storage=4):R.isVector2?(P.boundary=8,P.storage=8):R.isVector3||R.isColor?(P.boundary=16,P.storage=12):R.isVector4?(P.boundary=16,P.storage=16):R.isMatrix3?(P.boundary=48,P.storage=48):R.isMatrix4?(P.boundary=64,P.storage=64):R.isTexture?pt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(R)?(P.boundary=16,P.storage=R.byteLength):pt("WebGLRenderer: Unsupported uniform value type.",R),P}function D(R){const P=R.target;P.removeEventListener("dispose",D);const L=d.indexOf(P.__bindingPointIndex);d.splice(L,1),s.deleteBuffer(o[P.id]),delete o[P.id],delete l[P.id]}function z(){for(const R in o)s.deleteBuffer(o[R]);d=[],o={},l={}}return{bind:p,update:m,dispose:z}}const gE=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ar=null;function xE(){return ar===null&&(ar=new ey(gE,16,16,ia,hr),ar.name="DFG_LUT",ar.minFilter=Wn,ar.magFilter=Wn,ar.wrapS=Ir,ar.wrapT=Ir,ar.generateMipmaps=!1,ar.needsUpdate=!0),ar}class vE{constructor(e={}){const{canvas:t=R_(),context:r=null,depth:o=!0,stencil:l=!1,alpha:d=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:y="default",failIfMajorPerformanceCaveat:S=!1,reversedDepthBuffer:v=!1,outputBufferType:M=bi}=e;this.isWebGLRenderer=!0;let w;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");w=r.getContextAttributes().alpha}else w=d;const C=M,x=new Set([xh,gh,mh]),_=new Set([bi,fr,il,rl,hh,ph]),D=new Uint32Array(4),z=new Int32Array(4),R=new ne;let P=null,L=null;const B=[],b=[];let N=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=dr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const O=this;let V=!1,Y=null,Q=null,G=null,F=null;this._outputColorSpace=Pi;let ce=0,Z=0,J=null,W=-1,ee=null;const I=new fn,q=new fn;let xe=null;const we=new Lt(0);let Ve=0,$e=t.width,ae=t.height,de=1,Se=null,Ze=null;const je=new fn(0,0,$e,ae),Ie=new fn(0,0,$e,ae);let at=!1;const Ae=new bh;let Oe=!1,Be=!1;const qe=new ln,xt=new ne,Dt=new fn,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Mt=!1;function jt(){return J===null?de:1}let $=r;function mn(A,X){return t.getContext(A,X)}let Ft,U,E,te,oe,he,be,Re,pe,me,Ue,nt,Ne,Te,et,lt,dt,H,Pe,ge,Ce,ze,ve;try{const A={alpha:!0,depth:o,stencil:l,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:y,failIfMajorPerformanceCaveat:S};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${uh}`),t.addEventListener("webglcontextlost",At,!1),t.addEventListener("webglcontextrestored",Rt,!1),t.addEventListener("webglcontextcreationerror",yn,!1),$===null){const X="webgl2";if($=mn(X,A),$===null)throw mn(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}rt()}catch(A){throw t.removeEventListener("webglcontextlost",At,!1),t.removeEventListener("webglcontextrestored",Rt,!1),t.removeEventListener("webglcontextcreationerror",yn,!1),zt("WebGLRenderer: "+A.message),A}function rt(){Ft=new xM($),Ft.init(),Ce=new lE($,Ft),U=new oM($,Ft,e,Ce),E=new aE($,Ft),U.reversedDepthBuffer&&v&&E.buffers.depth.setReversed(!0),Q=$.createFramebuffer(),G=$.createFramebuffer(),F=$.createFramebuffer(),te=new yM($),oe=new Xb,he=new oE($,Ft,E,oe,U,Ce,te),be=new gM(O),Re=new My($),ze=new sM($,Re),pe=new vM($,Re,te,ze),me=new MM($,pe,Re,ze,te),H=new SM($,U,he),et=new lM(oe),Ue=new Wb(O,be,Ft,U,ze,et),nt=new pE(O,oe),Ne=new qb,Te=new eE(Ft),dt=new rM(O,be,E,me,w,p),lt=new sE(O,me,U),ve=new mE($,te,U,E),Pe=new aM($,Ft,te),ge=new _M($,Ft,te),te.programs=Ue.programs,O.capabilities=U,O.extensions=Ft,O.properties=oe,O.renderLists=Ne,O.shadowMap=lt,O.state=E,O.info=te}C!==bi&&(N=new EM(C,t.width,t.height,h,o,l));const Qe=new fE(O,$);this.xr=Qe,this.getContext=function(){return $},this.getContextAttributes=function(){return $.getContextAttributes()},this.forceContextLoss=function(){const A=Ft.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Ft.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(A){A!==void 0&&(de=A,this.setSize($e,ae,!1))},this.getSize=function(A){return A.set($e,ae)},this.setSize=function(A,X,ue=!0){if(Qe.isPresenting){pt("WebGLRenderer: Can't change size while VR device is presenting.");return}$e=A,ae=X,t.width=Math.floor(A*de),t.height=Math.floor(X*de),ue===!0&&(t.style.width=A+"px",t.style.height=X+"px"),N!==null&&N.setSize(t.width,t.height),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set($e*de,ae*de).floor()},this.setDrawingBufferSize=function(A,X,ue){$e=A,ae=X,de=ue,t.width=Math.floor(A*ue),t.height=Math.floor(X*ue),this.setViewport(0,0,A,X)},this.setEffects=function(A){if(C===bi){zt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let X=0;X<A.length;X++)if(A[X].isOutputPass===!0){pt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(I)},this.getViewport=function(A){return A.copy(je)},this.setViewport=function(A,X,ue,re){A.isVector4?je.set(A.x,A.y,A.z,A.w):je.set(A,X,ue,re),E.viewport(I.copy(je).multiplyScalar(de).round())},this.getScissor=function(A){return A.copy(Ie)},this.setScissor=function(A,X,ue,re){A.isVector4?Ie.set(A.x,A.y,A.z,A.w):Ie.set(A,X,ue,re),E.scissor(q.copy(Ie).multiplyScalar(de).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(A){E.setScissorTest(at=A)},this.setOpaqueSort=function(A){Se=A},this.setTransparentSort=function(A){Ze=A},this.getClearColor=function(A){return A.copy(dt.getClearColor())},this.setClearColor=function(){dt.setClearColor(...arguments)},this.getClearAlpha=function(){return dt.getClearAlpha()},this.setClearAlpha=function(){dt.setClearAlpha(...arguments)},this.clear=function(A=!0,X=!0,ue=!0){let re=0;if(A){let ie=!1;if(J!==null){const ke=J.texture.format;ie=x.has(ke)}if(ie){const ke=J.texture.type,Le=_.has(ke),Fe=dt.getClearColor(),Ke=dt.getClearAlpha(),it=Fe.r,ht=Fe.g,vt=Fe.b;Le?(D[0]=it,D[1]=ht,D[2]=vt,D[3]=Ke,$.clearBufferuiv($.COLOR,0,D)):(z[0]=it,z[1]=ht,z[2]=vt,z[3]=Ke,$.clearBufferiv($.COLOR,0,z))}else re|=$.COLOR_BUFFER_BIT}X&&(re|=$.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ue&&(re|=$.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),re!==0&&$.clear(re)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),Y=A},this.dispose=function(){t.removeEventListener("webglcontextlost",At,!1),t.removeEventListener("webglcontextrestored",Rt,!1),t.removeEventListener("webglcontextcreationerror",yn,!1),dt.dispose(),Ne.dispose(),Te.dispose(),oe.dispose(),be.dispose(),me.dispose(),ze.dispose(),ve.dispose(),Ue.dispose(),Qe.dispose(),Qe.removeEventListener("sessionstart",vs),Qe.removeEventListener("sessionend",_s),Rn.stop()};function At(A){A.preventDefault(),r0("WebGLRenderer: Context Lost."),V=!0}function Rt(){r0("WebGLRenderer: Context Restored."),V=!1;const A=te.autoReset,X=lt.enabled,ue=lt.autoUpdate,re=lt.needsUpdate,ie=lt.type;rt(),te.autoReset=A,lt.enabled=X,lt.autoUpdate=ue,lt.needsUpdate=re,lt.type=ie}function yn(A){zt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Yn(A){const X=A.target;X.removeEventListener("dispose",Yn),Ct(X)}function Ct(A){Di(A),oe.remove(A)}function Di(A){const X=oe.get(A).programs;X!==void 0&&(X.forEach(function(ue){Ue.releaseProgram(ue)}),A.isShaderMaterial&&Ue.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,ue,re,ie,ke){X===null&&(X=kt);const Le=ie.isMesh&&ie.matrixWorld.determinantAffine()<0,Fe=Jt(A,X,ue,re,ie);E.setMaterial(re,Le);let Ke=ue.index,it=1;if(re.wireframe===!0){if(Ke=pe.getWireframeAttribute(ue),Ke===void 0)return;it=2}const ht=ue.drawRange,vt=ue.attributes.position;let Xe=ht.start*it,bt=(ht.start+ht.count)*it;ke!==null&&(Xe=Math.max(Xe,ke.start*it),bt=Math.min(bt,(ke.start+ke.count)*it)),Ke!==null?(Xe=Math.max(Xe,0),bt=Math.min(bt,Ke.count)):vt!=null&&(Xe=Math.max(Xe,0),bt=Math.min(bt,vt.count));const en=bt-Xe;if(en<0||en===1/0)return;ze.setup(ie,re,Fe,ue,Ke);let Xt,It=Pe;if(Ke!==null&&(Xt=Re.get(Ke),It=ge,It.setIndex(Xt)),ie.isMesh)re.wireframe===!0?(E.setLineWidth(re.wireframeLinewidth*jt()),It.setMode($.LINES)):It.setMode($.TRIANGLES);else if(ie.isLine){let cn=re.linewidth;cn===void 0&&(cn=1),E.setLineWidth(cn*jt()),ie.isLineSegments?It.setMode($.LINES):ie.isLineLoop?It.setMode($.LINE_LOOP):It.setMode($.LINE_STRIP)}else ie.isPoints?It.setMode($.POINTS):ie.isSprite&&It.setMode($.TRIANGLES);if(ie.isBatchedMesh)if(Ft.get("WEBGL_multi_draw"))It.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{const cn=ie._multiDrawStarts,We=ie._multiDrawCounts,nn=ie._multiDrawCount,Et=Ke?Re.get(Ke).bytesPerElement:1,Sn=oe.get(re).currentProgram.getUniforms();for(let ft=0;ft<nn;ft++)Sn.setValue($,"_gl_DrawID",ft),It.render(cn[ft]/Et,We[ft])}else if(ie.isInstancedMesh)It.renderInstances(Xe,en,ie.count);else if(ue.isInstancedBufferGeometry){const cn=ue._maxInstanceCount!==void 0?ue._maxInstanceCount:1/0,We=Math.min(ue.instanceCount,cn);It.renderInstances(Xe,en,We)}else It.render(Xe,en)};function gn(A,X,ue,re){Y!==null&&A.isNodeMaterial&&Y.setObject(re,A),Oe===!0&&et.setState(A,ue,!1),A.transparent===!0&&A.side===Li&&A.forceSinglePass===!1?(A.side=hi,A.needsUpdate=!0,gr(A,X,re),A.side=ta,A.needsUpdate=!0,gr(A,X,re),A.side=Li):gr(A,X,re)}this.compile=function(A,X,ue=null){ue===null&&(ue=A),Y!==null&&Y.renderStart(A,X,ue),L=Te.get(ue),L.init(X),b.push(L),ue.traverseVisible(function(ie){ie.isLight&&ie.layers.test(X.layers)&&(L.pushLight(ie),ie.castShadow&&L.pushShadow(ie))}),A!==ue&&A.traverseVisible(function(ie){ie.isLight&&ie.layers.test(X.layers)&&(L.pushLight(ie),ie.castShadow&&L.pushShadow(ie))}),L.setupLights(),Y!==null&&Y.updateLights(L.state.lightsArray),Be=this.localClippingEnabled,Oe=et.init(this.clippingPlanes,Be),Oe===!0&&et.setGlobalState(this.clippingPlanes,X),Y!==null&&lt.render(L.state.shadowsArray,ue,X);const re=new Set;return A.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;const ke=ie.material;if(ke)if(Array.isArray(ke))for(let Le=0;Le<ke.length;Le++){const Fe=ke[Le];gn(Fe,ue,X,ie),re.add(Fe)}else gn(ke,ue,X,ie),re.add(ke)}),L=b.pop(),Y!==null&&Y.renderEnd(),re},this.compileAsync=function(A,X,ue=null){const re=this.compile(A,X,ue);return new Promise(ie=>{function ke(){if(re.forEach(function(Le){const Ke=oe.get(Le).currentProgram;(Ke===void 0||Ke.isReady())&&re.delete(Le)}),re.size===0){ie(A);return}setTimeout(ke,10)}Ft.get("KHR_parallel_shader_compile")!==null?ke():setTimeout(ke,10)})};let Zi=null;function xs(A){Zi&&Zi(A)}function vs(){Rn.stop()}function _s(){Rn.start()}const Rn=new Ug;Rn.setAnimationLoop(xs),typeof self<"u"&&Rn.setContext(self),this.setAnimationLoop=function(A){Zi=A,Qe.setAnimationLoop(A),A===null?Rn.stop():Rn.start()},Qe.addEventListener("sessionstart",vs),Qe.addEventListener("sessionend",_s),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){zt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;Y!==null&&Y.renderStart(A,X);const ue=Qe.enabled===!0&&Qe.isPresenting===!0,re=N!==null&&(J===null||ue)&&N.begin(O,J);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Qe.enabled===!0&&Qe.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(Qe.cameraAutoUpdate===!0&&Qe.updateCamera(X),X=Qe.getCamera()),A.isScene===!0&&A.onBeforeRender(O,A,X,J),L=Te.get(A,b.length),L.init(X),L.state.textureUnits=he.getTextureUnits(),b.push(L),qe.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Ae.setFromProjectionMatrix(qe,ur,X.reversedDepth),Be=this.localClippingEnabled,Oe=et.init(this.clippingPlanes,Be),P=Ne.get(A,B.length),P.init(),B.push(P),Qe.enabled===!0&&Qe.isPresenting===!0){const Le=O.xr.getDepthSensingMesh();Le!==null&&Ii(Le,X,-1/0,O.sortObjects)}Ii(A,X,0,O.sortObjects),P.finish(),Y!==null&&Y.updateLights(L.state.lightsArray),O.sortObjects===!0&&P.sort(Se,Ze),Mt=Qe.enabled===!1||Qe.isPresenting===!1||Qe.hasDepthSensing()===!1,Mt&&dt.addToRenderList(P,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Oe===!0&&et.beginShadows();const ie=L.state.shadowsArray;if(lt.render(ie,A,X),Oe===!0&&et.endShadows(),(re&&N.hasRenderPass())===!1){const Le=P.opaque,Fe=P.transmissive;if(L.setupLights(),X.isArrayCamera){const Ke=X.cameras;if(Fe.length>0)for(let it=0,ht=Ke.length;it<ht;it++){const vt=Ke[it];ys(Le,Fe,A,vt)}Mt&&dt.render(A);for(let it=0,ht=Ke.length;it<ht;it++){const vt=Ke[it];Br(P,A,vt,vt.viewport)}}else Fe.length>0&&ys(Le,Fe,A,X),Mt&&dt.render(A),Br(P,A,X)}J!==null&&Z===0&&(he.updateMultisampleRenderTarget(J),he.updateRenderTargetMipmap(J)),re&&N.end(O),A.isScene===!0&&A.onAfterRender(O,A,X),ze.resetDefaultState(),W=-1,ee=null,b.pop(),b.length>0?(L=b[b.length-1],he.setTextureUnits(L.state.textureUnits),Oe===!0&&et.setGlobalState(O.clippingPlanes,L.state.camera)):L=null,B.pop(),B.length>0?P=B[B.length-1]:P=null,Y!==null&&Y.renderEnd()};function Ii(A,X,ue,re){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)ue=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLightProbeGrid)L.pushLightProbeGrid(A);else if(A.isLight)L.pushLight(A),A.castShadow&&L.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(Ae)){re&&Dt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(qe);const Le=me.update(A),Fe=A.material;Fe.visible&&P.push(A,Le,Fe,ue,Dt.z,null,X)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(Ae))){const Le=me.update(A),Fe=A.material;if(re&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Dt.copy(A.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Dt.copy(Le.boundingSphere.center)),Dt.applyMatrix4(A.matrixWorld).applyMatrix4(qe)),Array.isArray(Fe)){const Ke=Le.groups;for(let it=0,ht=Ke.length;it<ht;it++){const vt=Ke[it],Xe=Fe[vt.materialIndex];Xe&&Xe.visible&&P.push(A,Le,Xe,ue,Dt.z,vt,X)}}else Fe.visible&&P.push(A,Le,Fe,ue,Dt.z,null,X)}}const ke=A.children;for(let Le=0,Fe=ke.length;Le<Fe;Le++)Ii(ke[Le],X,ue,re)}function Br(A,X,ue,re){const{opaque:ie,transmissive:ke,transparent:Le}=A;L.setupLightsView(ue),Oe===!0&&et.setGlobalState(O.clippingPlanes,ue),re&&E.viewport(I.copy(re)),ie.length>0&&mr(ie,X,ue),ke.length>0&&mr(ke,X,ue),Le.length>0&&mr(Le,X,ue),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function ys(A,X,ue,re){if((ue.isScene===!0?ue.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[re.id]===void 0){const Xe=Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[re.id]=new Ki(1,1,{generateMipmaps:!0,type:Xe?hr:bi,minFilter:Qs,samples:Math.max(4,U.samples),stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ot.workingColorSpace})}const ke=L.state.transmissionRenderTarget[re.id],Le=re.viewport||I;ke.setSize(Le.z*O.transmissionResolutionScale,Le.w*O.transmissionResolutionScale);const Fe=O.getRenderTarget(),Ke=O.getActiveCubeFace(),it=O.getActiveMipmapLevel();O.setRenderTarget(ke),O.getClearColor(we),Ve=O.getClearAlpha(),Ve<1&&O.setClearColor(16777215,.5),O.clear(),Mt&&dt.render(ue);const ht=O.toneMapping;O.toneMapping=dr;const vt=re.viewport;if(re.viewport!==void 0&&(re.viewport=void 0),L.setupLightsView(re),Oe===!0&&et.setGlobalState(O.clippingPlanes,re),mr(A,ue,re),he.updateMultisampleRenderTarget(ke),he.updateRenderTargetMipmap(ke),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let bt=0,en=X.length;bt<en;bt++){const Xt=X[bt],{object:It,geometry:cn,material:We,group:nn}=Xt;if(We.side===Li&&It.layers.test(re.layers)){const Et=We.side;We.side=hi,We.needsUpdate=!0,zr(It,ue,re,cn,We,nn),We.side=Et,We.needsUpdate=!0,Xe=!0}}Xe===!0&&(he.updateMultisampleRenderTarget(ke),he.updateRenderTargetMipmap(ke))}O.setRenderTarget(Fe,Ke,it),O.setClearColor(we,Ve),vt!==void 0&&(re.viewport=vt),O.toneMapping=ht}function mr(A,X,ue){const re=X.isScene===!0?X.overrideMaterial:null;for(let ie=0,ke=A.length;ie<ke;ie++){const Le=A[ie],{object:Fe,geometry:Ke,group:it}=Le;let ht=Le.material;ht.allowOverride===!0&&re!==null&&(ht=re),Fe.layers.test(ue.layers)&&zr(Fe,X,ue,Ke,ht,it)}}function zr(A,X,ue,re,ie,ke){Y!==null&&ie.isNodeMaterial&&Y.setObject(A,ie),A.onBeforeRender(O,X,ue,re,ie,ke),A.modelViewMatrix.multiplyMatrices(ue.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ie.onBeforeRender(O,X,ue,re,A,ke),ie.transparent===!0&&ie.side===Li&&ie.forceSinglePass===!1?(ie.side=hi,ie.needsUpdate=!0,O.renderBufferDirect(ue,X,re,ie,A,ke),ie.side=ta,ie.needsUpdate=!0,O.renderBufferDirect(ue,X,re,ie,A,ke),ie.side=Li):O.renderBufferDirect(ue,X,re,ie,A,ke),A.onAfterRender(O,X,ue,re,ie,ke)}function gr(A,X,ue){X.isScene!==!0&&(X=kt);const re=oe.get(A),ie=L.state.lights,ke=L.state.shadowsArray,Le=ie.state.version,Fe=Ue.getParameters(A,ie.state,ke,X,ue,L.state.lightProbeGridArray),Ke=Ue.getProgramCacheKey(Fe);let it=re.programs;re.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?X.environment:null,re.fog=X.fog;const ht=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;re.envMap=be.get(A.envMap||re.environment,ht),re.envMapRotation=re.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,it===void 0&&(A.addEventListener("dispose",Yn),it=new Map,re.programs=it);let vt=it.get(Ke);if(vt!==void 0){if(re.currentProgram===vt&&re.lightsStateVersion===Le)return Vr(A,Fe),vt}else Fe.uniforms=Ue.getUniforms(A),Y!==null&&A.isNodeMaterial&&Y.build(A,ue,Fe),A.onBeforeCompile(Fe,O),vt=Ue.acquireProgram(Fe,Ke),it.set(Ke,vt),re.uniforms=Fe.uniforms;const Xe=re.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Xe.clippingPlanes=et.uniform),Vr(A,Fe),re.needsLights=Gr(A),re.lightsStateVersion=Le,re.needsLights&&(Xe.ambientLightColor.value=ie.state.ambient,Xe.lightProbe.value=ie.state.probe,Xe.sunLights.value=ie.state.sun,Xe.sunLightShadows.value=ie.state.sunShadow,Xe.directionalLights.value=ie.state.directional,Xe.directionalLightShadows.value=ie.state.directionalShadow,Xe.spotLights.value=ie.state.spot,Xe.spotLightShadows.value=ie.state.spotShadow,Xe.rectAreaLights.value=ie.state.rectArea,Xe.ltc_1.value=ie.state.rectAreaLTC1,Xe.ltc_2.value=ie.state.rectAreaLTC2,Xe.pointLights.value=ie.state.point,Xe.pointLightShadows.value=ie.state.pointShadow,Xe.hemisphereLights.value=ie.state.hemi,Xe.sunShadowMatrix.value=ie.state.sunShadowMatrix,Xe.sunShadowCascade.value=ie.state.sunShadowCascade,Xe.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,Xe.spotLightMatrix.value=ie.state.spotLightMatrix,Xe.spotLightMap.value=ie.state.spotLightMap,Xe.pointShadowMatrix.value=ie.state.pointShadowMatrix),re.lightProbeGrid=L.state.lightProbeGridArray.length>0,re.currentProgram=vt,re.uniformsList=null,vt}function Ss(A){if(A.uniformsList===null){const X=A.currentProgram.getUniforms();A.uniformsList=Gc.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function Vr(A,X){const ue=oe.get(A);ue.outputColorSpace=X.outputColorSpace,ue.batching=X.batching,ue.batchingColor=X.batchingColor,ue.instancing=X.instancing,ue.instancingColor=X.instancingColor,ue.instancingMorph=X.instancingMorph,ue.skinning=X.skinning,ue.morphTargets=X.morphTargets,ue.morphNormals=X.morphNormals,ue.morphColors=X.morphColors,ue.morphTargetsCount=X.morphTargetsCount,ue.numClippingPlanes=X.numClippingPlanes,ue.numIntersection=X.numClipIntersection,ue.vertexAlphas=X.vertexAlphas,ue.vertexTangents=X.vertexTangents,ue.toneMapping=X.toneMapping}function co(A,X){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;R.setFromMatrixPosition(X.matrixWorld);for(let ue=0,re=A.length;ue<re;ue++){const ie=A[ue];if(ie.texture!==null&&ie.boundingBox.containsPoint(R))return ie}return null}function Jt(A,X,ue,re,ie){X.isScene!==!0&&(X=kt),he.resetTextureUnits();const ke=X.fog,Le=re.isMeshStandardMaterial||re.isMeshLambertMaterial||re.isMeshPhongMaterial?X.environment:null,Fe=J===null?O.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ot.workingColorSpace,Ke=re.isMeshStandardMaterial||re.isMeshLambertMaterial&&!re.envMap||re.isMeshPhongMaterial&&!re.envMap,it=be.get(re.envMap||Le,Ke),ht=re.vertexColors===!0&&!!ue.attributes.color&&ue.attributes.color.itemSize===4,vt=!!ue.attributes.tangent&&(!!re.normalMap||re.anisotropy>0),Xe=!!ue.morphAttributes.position,bt=!!ue.morphAttributes.normal,en=!!ue.morphAttributes.color;let Xt=dr;re.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Xt=O.toneMapping);const It=ue.morphAttributes.position||ue.morphAttributes.normal||ue.morphAttributes.color,cn=It!==void 0?It.length:0,We=oe.get(re),nn=L.state.lights;if(Oe===!0&&(Be===!0||A!==ee)){const Gt=A===ee&&re.id===W;et.setState(re,A,Gt)}let Et=!1;re.version===We.__version?(We.needsLights&&We.lightsStateVersion!==nn.state.version||We.outputColorSpace!==Fe||ie.isBatchedMesh&&We.batching===!1||!ie.isBatchedMesh&&We.batching===!0||ie.isBatchedMesh&&We.batchingColor===!0&&ie._colorsTexture===null||ie.isBatchedMesh&&We.batchingColor===!1&&ie._colorsTexture!==null||ie.isInstancedMesh&&We.instancing===!1||!ie.isInstancedMesh&&We.instancing===!0||ie.isSkinnedMesh&&We.skinning===!1||!ie.isSkinnedMesh&&We.skinning===!0||ie.isInstancedMesh&&We.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&We.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&We.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&We.instancingMorph===!1&&ie.morphTexture!==null||We.envMap!==it||re.fog===!0&&We.fog!==ke||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==et.numPlanes||We.numIntersection!==et.numIntersection)||We.vertexAlphas!==ht||We.vertexTangents!==vt||We.morphTargets!==Xe||We.morphNormals!==bt||We.morphColors!==en||We.toneMapping!==Xt||We.morphTargetsCount!==cn||!!We.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(Et=!0):(Et=!0,We.__version=re.version);let Sn=We.currentProgram;Et===!0&&(Sn=gr(re,X,ie),Y&&re.isNodeMaterial&&Y.onUpdateProgram(re,Sn,We));let ft=!1,qn=!1,pi=!1;const Nt=Sn.getUniforms(),Kt=We.uniforms;if(E.useProgram(Sn.program)&&(ft=!0,qn=!0,pi=!0),re.id!==W&&(W=re.id,qn=!0),We.needsLights){const Gt=co(L.state.lightProbeGridArray,ie);We.lightProbeGrid!==Gt&&(We.lightProbeGrid=Gt,qn=!0)}if(ft||ee!==A){E.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Nt.setValue($,"projectionMatrix",A.projectionMatrix),Nt.setValue($,"viewMatrix",A.matrixWorldInverse);const $n=Nt.map.cameraPosition;$n!==void 0&&$n.setValue($,xt.setFromMatrixPosition(A.matrixWorld)),U.logarithmicDepthBuffer&&Nt.setValue($,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(re.isMeshPhongMaterial||re.isMeshToonMaterial||re.isMeshLambertMaterial||re.isMeshBasicMaterial||re.isMeshStandardMaterial||re.isShaderMaterial)&&Nt.setValue($,"isOrthographic",A.isOrthographicCamera===!0),ee!==A&&(ee=A,qn=!0,pi=!0)}if(We.needsLights&&(nn.state.sunShadowMap.length>0&&Nt.setValue($,"sunShadowMap",nn.state.sunShadowMap,he),nn.state.directionalShadowMap.length>0&&Nt.setValue($,"directionalShadowMap",nn.state.directionalShadowMap,he),nn.state.spotShadowMap.length>0&&Nt.setValue($,"spotShadowMap",nn.state.spotShadowMap,he),nn.state.pointShadowMap.length>0&&Nt.setValue($,"pointShadowMap",nn.state.pointShadowMap,he)),ie.isSkinnedMesh){Nt.setOptional($,ie,"bindMatrix"),Nt.setOptional($,ie,"bindMatrixInverse");const Gt=ie.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),Nt.setValue($,"boneTexture",Gt.boneTexture,he))}ie.isBatchedMesh&&(Nt.setOptional($,ie,"batchingTexture"),Nt.setValue($,"batchingTexture",ie._matricesTexture,he),Nt.setOptional($,ie,"batchingIdTexture"),Nt.setValue($,"batchingIdTexture",ie._indirectTexture,he),Nt.setOptional($,ie,"batchingColorTexture"),ie._colorsTexture!==null&&Nt.setValue($,"batchingColorTexture",ie._colorsTexture,he));const mi=ue.morphAttributes;if((mi.position!==void 0||mi.normal!==void 0||mi.color!==void 0)&&H.update(ie,ue,Sn),(qn||We.receiveShadow!==ie.receiveShadow)&&(We.receiveShadow=ie.receiveShadow,Nt.setValue($,"receiveShadow",ie.receiveShadow)),(re.isMeshStandardMaterial||re.isMeshLambertMaterial||re.isMeshPhongMaterial)&&re.envMap===null&&X.environment!==null&&(Kt.envMapIntensity.value=X.environmentIntensity),Kt.dfgLUT!==void 0&&(Kt.dfgLUT.value=xE()),qn){if(Nt.setValue($,"toneMappingExposure",O.toneMappingExposure),We.needsLights&&aa(Kt,pi),ke&&re.fog===!0&&nt.refreshFogUniforms(Kt,ke),nt.refreshMaterialUniforms(Kt,re,de,ae,L.state.transmissionRenderTarget[A.id]),We.needsLights&&We.lightProbeGrid){const Gt=We.lightProbeGrid;Kt.probesSH.value=Gt.texture,Kt.probesMin.value.copy(Gt.boundingBox.min),Kt.probesMax.value.copy(Gt.boundingBox.max),Kt.probesResolution.value.copy(Gt.resolution)}Gc.upload($,Ss(We),Kt,he)}if(re.isShaderMaterial&&re.uniformsNeedUpdate===!0&&(Gc.upload($,Ss(We),Kt,he),re.uniformsNeedUpdate=!1),re.isSpriteMaterial&&Nt.setValue($,"center",ie.center),Nt.setValue($,"modelViewMatrix",ie.modelViewMatrix),Nt.setValue($,"normalMatrix",ie.normalMatrix),Nt.setValue($,"modelMatrix",ie.matrixWorld),re.uniformsGroups!==void 0){const Gt=re.uniformsGroups;for(let $n=0,ii=Gt.length;$n<ii;$n++){const ri=Gt[$n];ve.update(ri,Sn),ve.bind(ri,Sn)}}return Sn}function aa(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.sunLights.needsUpdate=X,A.sunLightShadows.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function Gr(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return ce},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(A,X,ue){const re=oe.get(A);re.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,re.__autoAllocateDepthBuffer===!1&&(re.__useRenderToTexture=!1),oe.get(A.texture).__webglTexture=X,oe.get(A.depthTexture).__webglTexture=re.__autoAllocateDepthBuffer?void 0:ue,re.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,X){const ue=oe.get(A);ue.__webglFramebuffer=X,ue.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,ue=0){J=A,ce=X,Z=ue;let re=null,ie=!1,ke=!1;if(A){const Fe=oe.get(A);if(Fe.__useDefaultFramebuffer!==void 0){E.bindFramebuffer($.FRAMEBUFFER,Fe.__webglFramebuffer),I.copy(A.viewport),q.copy(A.scissor),xe=A.scissorTest,E.viewport(I),E.scissor(q),E.setScissorTest(xe),W=-1;return}else if(Fe.__webglFramebuffer===void 0)he.setupRenderTarget(A);else if(Fe.__hasExternalTextures)he.rebindTextures(A,oe.get(A.texture).__webglTexture,oe.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const ht=A.depthTexture;if(Fe.__boundDepthTexture!==ht){if(ht!==null&&oe.has(ht)&&(A.width!==ht.image.width||A.height!==ht.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");he.setupDepthRenderbuffer(A)}}const Ke=A.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(ke=!0);const it=oe.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(it[X])?re=it[X][ue]:re=it[X],ie=!0):A.samples>0&&he.useMultisampledRTT(A)===!1?re=oe.get(A).__webglMultisampledFramebuffer:Array.isArray(it)?re=it[ue]:re=it,I.copy(A.viewport),q.copy(A.scissor),xe=A.scissorTest}else I.copy(je).multiplyScalar(de).floor(),q.copy(Ie).multiplyScalar(de).floor(),xe=at;if(ue!==0&&(re=Q),E.bindFramebuffer($.FRAMEBUFFER,re)&&E.drawBuffers(A,re),E.viewport(I),E.scissor(q),E.setScissorTest(xe),ie){const Fe=oe.get(A.texture);$.framebufferTexture2D($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_CUBE_MAP_POSITIVE_X+X,Fe.__webglTexture,ue)}else if(ke){const Fe=X;for(let Ke=0;Ke<A.textures.length;Ke++){const it=oe.get(A.textures[Ke]);$.framebufferTextureLayer($.FRAMEBUFFER,$.COLOR_ATTACHMENT0+Ke,it.__webglTexture,ue,Fe)}}else if(A!==null&&ue!==0){const Fe=oe.get(A.texture);$.framebufferTexture2D($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_2D,Fe.__webglTexture,ue)}W=-1};function Hr(A){const X=oe.get(A);return(X.__readFormat!==A.format||X.__readType!==A.type)&&(X.__readFormat=A.format,X.__readType=A.type,X.__formatReadable=U.textureFormatReadable(A.format),X.__typeReadable=U.textureTypeReadable(A.type)),X}this.readRenderTargetPixels=function(A,X,ue,re,ie,ke,Le,Fe=0){if(!(A&&A.isWebGLRenderTarget)){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ke=oe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(Ke=Ke[Le]),Ke){E.bindFramebuffer($.FRAMEBUFFER,Ke);try{const it=A.textures[Fe],ht=it.format,vt=it.type;A.textures.length>1&&$.readBuffer($.COLOR_ATTACHMENT0+Fe);const Xe=Hr(it);if(Xe.__formatReadable===!1){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Xe.__typeReadable===!1){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-re&&ue>=0&&ue<=A.height-ie&&$.readPixels(X,ue,re,ie,Ce.convert(ht),Ce.convert(vt),ke)}finally{const it=J!==null?oe.get(J).__webglFramebuffer:null;E.bindFramebuffer($.FRAMEBUFFER,it)}}},this.readRenderTargetPixelsAsync=async function(A,X,ue,re,ie,ke,Le,Fe=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ke=oe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(Ke=Ke[Le]),Ke)if(X>=0&&X<=A.width-re&&ue>=0&&ue<=A.height-ie){E.bindFramebuffer($.FRAMEBUFFER,Ke);const it=A.textures[Fe],ht=it.format,vt=it.type;A.textures.length>1&&$.readBuffer($.COLOR_ATTACHMENT0+Fe);const Xe=Hr(it);if(Xe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Xe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const bt=$.createBuffer();$.bindBuffer($.PIXEL_PACK_BUFFER,bt),$.bufferData($.PIXEL_PACK_BUFFER,ke.byteLength,$.STREAM_READ),$.readPixels(X,ue,re,ie,Ce.convert(ht),Ce.convert(vt),0),$.bindBuffer($.PIXEL_PACK_BUFFER,null);const en=J!==null?oe.get(J).__webglFramebuffer:null;E.bindFramebuffer($.FRAMEBUFFER,en);const Xt=$.fenceSync($.SYNC_GPU_COMMANDS_COMPLETE,0);return $.flush(),await C_($,Xt,4),$.bindBuffer($.PIXEL_PACK_BUFFER,bt),$.getBufferSubData($.PIXEL_PACK_BUFFER,0,ke),$.bindBuffer($.PIXEL_PACK_BUFFER,null),$.deleteBuffer(bt),$.deleteSync(Xt),ke}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,X=null,ue=0){const re=Math.pow(2,-ue),ie=Math.floor(A.image.width*re),ke=Math.floor(A.image.height*re),Le=X!==null?X.x:0,Fe=X!==null?X.y:0;he.setTexture2D(A,0),$.copyTexSubImage2D($.TEXTURE_2D,ue,0,0,Le,Fe,ie,ke),E.unbindTexture()},this.copyTextureToTexture=function(A,X,ue=null,re=null,ie=0,ke=0){let Le,Fe,Ke,it,ht,vt,Xe,bt,en;const Xt=A.isCompressedTexture?A.mipmaps[ke]:A.image;if(ue!==null)Le=ue.max.x-ue.min.x,Fe=ue.max.y-ue.min.y,Ke=ue.isBox3?ue.max.z-ue.min.z:1,it=ue.min.x,ht=ue.min.y,vt=ue.isBox3?ue.min.z:0;else{const Kt=Math.pow(2,-ie);Le=Math.floor(Xt.width*Kt),Fe=Math.floor(Xt.height*Kt),A.isDataArrayTexture?Ke=Xt.depth:A.isData3DTexture?Ke=Math.floor(Xt.depth*Kt):Ke=1,it=0,ht=0,vt=0}re!==null?(Xe=re.x,bt=re.y,en=re.z):(Xe=0,bt=0,en=0);const It=Ce.convert(X.format),cn=Ce.convert(X.type);let We;X.isData3DTexture?(he.setTexture3D(X,0),We=$.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(he.setTexture2DArray(X,0),We=$.TEXTURE_2D_ARRAY):(he.setTexture2D(X,0),We=$.TEXTURE_2D),E.activeTexture($.TEXTURE0),E.pixelStorei($.UNPACK_FLIP_Y_WEBGL,X.flipY),E.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),E.pixelStorei($.UNPACK_ALIGNMENT,X.unpackAlignment);const nn=E.getParameter($.UNPACK_ROW_LENGTH),Et=E.getParameter($.UNPACK_IMAGE_HEIGHT),Sn=E.getParameter($.UNPACK_SKIP_PIXELS),ft=E.getParameter($.UNPACK_SKIP_ROWS),qn=E.getParameter($.UNPACK_SKIP_IMAGES);E.pixelStorei($.UNPACK_ROW_LENGTH,Xt.width),E.pixelStorei($.UNPACK_IMAGE_HEIGHT,Xt.height),E.pixelStorei($.UNPACK_SKIP_PIXELS,it),E.pixelStorei($.UNPACK_SKIP_ROWS,ht),E.pixelStorei($.UNPACK_SKIP_IMAGES,vt);const pi=A.isDataArrayTexture||A.isData3DTexture,Nt=X.isDataArrayTexture||X.isData3DTexture;if(A.isDepthTexture){const Kt=oe.get(A),mi=oe.get(X),Gt=oe.get(Kt.__renderTarget),$n=oe.get(mi.__renderTarget);E.bindFramebuffer($.READ_FRAMEBUFFER,Gt.__webglFramebuffer),E.bindFramebuffer($.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let ii=0;ii<Ke;ii++)pi&&($.framebufferTextureLayer($.READ_FRAMEBUFFER,$.COLOR_ATTACHMENT0,oe.get(A).__webglTexture,ie,vt+ii),$.framebufferTextureLayer($.DRAW_FRAMEBUFFER,$.COLOR_ATTACHMENT0,oe.get(X).__webglTexture,ke,en+ii)),$.blitFramebuffer(it,ht,Le,Fe,Xe,bt,Le,Fe,$.DEPTH_BUFFER_BIT,$.NEAREST);E.bindFramebuffer($.READ_FRAMEBUFFER,null),E.bindFramebuffer($.DRAW_FRAMEBUFFER,null)}else if(ie!==0||A.isRenderTargetTexture||oe.has(A)){const Kt=oe.get(A),mi=oe.get(X);E.bindFramebuffer($.READ_FRAMEBUFFER,G),E.bindFramebuffer($.DRAW_FRAMEBUFFER,F);for(let Gt=0;Gt<Ke;Gt++)pi?$.framebufferTextureLayer($.READ_FRAMEBUFFER,$.COLOR_ATTACHMENT0,Kt.__webglTexture,ie,vt+Gt):$.framebufferTexture2D($.READ_FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_2D,Kt.__webglTexture,ie),Nt?$.framebufferTextureLayer($.DRAW_FRAMEBUFFER,$.COLOR_ATTACHMENT0,mi.__webglTexture,ke,en+Gt):$.framebufferTexture2D($.DRAW_FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_2D,mi.__webglTexture,ke),ie!==0?$.blitFramebuffer(it,ht,Le,Fe,Xe,bt,Le,Fe,$.COLOR_BUFFER_BIT,$.NEAREST):Nt?$.copyTexSubImage3D(We,ke,Xe,bt,en+Gt,it,ht,Le,Fe):$.copyTexSubImage2D(We,ke,Xe,bt,it,ht,Le,Fe);E.bindFramebuffer($.READ_FRAMEBUFFER,null),E.bindFramebuffer($.DRAW_FRAMEBUFFER,null)}else Nt?A.isDataTexture||A.isData3DTexture?$.texSubImage3D(We,ke,Xe,bt,en,Le,Fe,Ke,It,cn,Xt.data):X.isCompressedArrayTexture?$.compressedTexSubImage3D(We,ke,Xe,bt,en,Le,Fe,Ke,It,Xt.data):$.texSubImage3D(We,ke,Xe,bt,en,Le,Fe,Ke,It,cn,Xt):A.isDataTexture?$.texSubImage2D($.TEXTURE_2D,ke,Xe,bt,Le,Fe,It,cn,Xt.data):A.isCompressedTexture?$.compressedTexSubImage2D($.TEXTURE_2D,ke,Xe,bt,Xt.width,Xt.height,It,Xt.data):$.texSubImage2D($.TEXTURE_2D,ke,Xe,bt,Le,Fe,It,cn,Xt);E.pixelStorei($.UNPACK_ROW_LENGTH,nn),E.pixelStorei($.UNPACK_IMAGE_HEIGHT,Et),E.pixelStorei($.UNPACK_SKIP_PIXELS,Sn),E.pixelStorei($.UNPACK_SKIP_ROWS,ft),E.pixelStorei($.UNPACK_SKIP_IMAGES,qn),ke===0&&X.generateMipmaps&&$.generateMipmap(We),E.unbindTexture()},this.initRenderTarget=function(A){oe.get(A).__webglFramebuffer===void 0&&he.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?he.setTextureCube(A,0):A.isData3DTexture?he.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?he.setTexture2DArray(A,0):he.setTexture2D(A,0),E.unbindTexture()},this.resetState=function(){ce=0,Z=0,J=null,E.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ur}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ot._getUnpackColorSpace()}}const eg={type:"change"},Rh={type:"start"},Hg={type:"end"},Ic=new ru,tg=new Dr,_E=Math.cos(70*L_.DEG2RAD),En=new ne,fi=2*Math.PI,$t={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},xf=1e-6;class yE extends yy{constructor(e,t=null){super(e,t),this.state=$t.NONE,this.target=new ne,this.cursor=new ne,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:to.ROTATE,MIDDLE:to.DOLLY,RIGHT:to.PAN},this.touches={ONE:Ja.ROTATE,TWO:Ja.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new ne,this._lastQuaternion=new ps,this._lastTargetPosition=new ne,this._quat=new ps().setFromUnitVectors(e.up,new ne(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new C0,this._sphericalDelta=new C0,this._scale=1,this._panOffset=new ne,this._rotateStart=new mt,this._rotateEnd=new mt,this._rotateDelta=new mt,this._panStart=new mt,this._panEnd=new mt,this._panDelta=new mt,this._dollyStart=new mt,this._dollyEnd=new mt,this._dollyDelta=new mt,this._dollyDirection=new ne,this._mouse=new mt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ME.bind(this),this._onPointerDown=SE.bind(this),this._onPointerUp=bE.bind(this),this._onContextMenu=NE.bind(this),this._onMouseWheel=TE.bind(this),this._onKeyDown=AE.bind(this),this._onTouchStart=RE.bind(this),this._onTouchMove=CE.bind(this),this._onMouseDown=EE.bind(this),this._onMouseMove=wE.bind(this),this._interceptControlDown=PE.bind(this),this._interceptControlUp=LE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=$t.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(eg),this.update(),this.state=$t.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;En.copy(t).sub(this.target),En.applyQuaternion(this._quat),this._spherical.setFromVector3(En),this.autoRotate&&this.state===$t.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,o=this.maxAzimuthAngle;isFinite(r)&&isFinite(o)&&(r<-Math.PI?r+=fi:r>Math.PI&&(r-=fi),o<-Math.PI?o+=fi:o>Math.PI&&(o-=fi),r<=o?this._spherical.theta=Math.max(r,Math.min(o,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+o)/2?Math.max(r,this._spherical.theta):Math.min(o,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let l=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const d=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),l=d!=this._spherical.radius}if(En.setFromSpherical(this._spherical),En.applyQuaternion(this._quatInverse),t.copy(this.target).add(En),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let d=null;if(this.object.isPerspectiveCamera){const h=En.length();d=this._clampDistance(h*this._scale);const p=h-d;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),l=!!p}else if(this.object.isOrthographicCamera){const h=new ne(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),l=p!==this.object.zoom;const m=new ne(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(h),this.object.updateMatrixWorld(),d=En.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;d!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(d).add(this.object.position):(Ic.origin.copy(this.object.position),Ic.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ic.direction))<_E?this.object.lookAt(this.target):(tg.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ic.intersectPlane(tg,this.target))))}else if(this.object.isOrthographicCamera){const d=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),d!==this.object.zoom&&(this.object.updateProjectionMatrix(),l=!0)}return this._scale=1,this._performCursorZoom=!1,l||this._lastPosition.distanceToSquared(this.object.position)>xf||8*(1-this._lastQuaternion.dot(this.object.quaternion))>xf||this._lastTargetPosition.distanceToSquared(this.target)>xf?(this.dispatchEvent(eg),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?fi/60*this.autoRotateSpeed*e:fi/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){En.setFromMatrixColumn(t,0),En.multiplyScalar(-e),this._panOffset.add(En)}_panUp(e,t){this.screenSpacePanning===!0?En.setFromMatrixColumn(t,1):(En.setFromMatrixColumn(t,0),En.crossVectors(this.object.up,En)),En.multiplyScalar(e),this._panOffset.add(En)}_pan(e,t){const r=this.domElement;if(this.object.isPerspectiveCamera){const o=this.object.position;En.copy(o).sub(this.target);let l=En.length();l*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*l/r.clientHeight,this.object.matrix),this._panUp(2*t*l/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),o=e-r.left,l=t-r.top,d=r.width,h=r.height;this._mouse.x=o/d*2-1,this._mouse.y=-(l/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(fi*this._rotateDelta.x/t.clientHeight),this._rotateUp(fi*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(fi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-fi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(fi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-fi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);this._rotateStart.set(r,o)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);this._panStart.set(r,o)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),r=e.pageX-t.x,o=e.pageY-t.y,l=Math.sqrt(r*r+o*o);this._dollyStart.set(0,l)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),o=.5*(e.pageX+r.x),l=.5*(e.pageY+r.y);this._rotateEnd.set(o,l)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(fi*this._rotateDelta.x/t.clientHeight),this._rotateUp(fi*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);this._panEnd.set(r,o)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),r=e.pageX-t.x,o=e.pageY-t.y,l=Math.sqrt(r*r+o*o);this._dollyEnd.set(0,l),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const d=(e.pageX+t.x)*.5,h=(e.pageY+t.y)*.5;this._updateZoomParameters(d,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new mt,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function SE(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function ME(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function bE(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Hg),this.state=$t.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function EE(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case to.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=$t.DOLLY;break;case to.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=$t.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=$t.ROTATE}break;case to.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=$t.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=$t.PAN}break;default:this.state=$t.NONE}this.state!==$t.NONE&&this.dispatchEvent(Rh)}function wE(s){switch(this.state){case $t.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case $t.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case $t.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function TE(s){this.enabled===!1||this.enableZoom===!1||this.state!==$t.NONE||(s.preventDefault(),this.dispatchEvent(Rh),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Hg))}function AE(s){this.enabled!==!1&&this._handleKeyDown(s)}function RE(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Ja.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=$t.TOUCH_ROTATE;break;case Ja.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=$t.TOUCH_PAN;break;default:this.state=$t.NONE}break;case 2:switch(this.touches.TWO){case Ja.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=$t.TOUCH_DOLLY_PAN;break;case Ja.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=$t.TOUCH_DOLLY_ROTATE;break;default:this.state=$t.NONE}break;default:this.state=$t.NONE}this.state!==$t.NONE&&this.dispatchEvent(Rh)}function CE(s){switch(this._trackPointer(s),this.state){case $t.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case $t.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case $t.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case $t.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=$t.NONE}}function NE(s){this.enabled!==!1&&s.preventDefault()}function PE(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function LE(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DE=s=>s==null?void 0:s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function IE(s,e,t=[]){if(e==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:DE(s),size:24,node:e,...t.length>0?{aliases:t}:{}}}/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UE=s=>{let e="",t=!1;for(const r of s){if(r==="-"||r==="_"||r<=" "){t=e.length>0;continue}e.length===0?e+=r.toLowerCase():e+=t?r.toUpperCase():r,t=!1}return e};/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OE=s=>{const e=UE(s);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oh=(...s)=>s.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Js={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function vf(s){return s!=null}function FE(s,e={}){var v,M;const t=e.attributeNames??{},r=w=>t[w]??w,o=s.size??s.width??Js.width,l=s.size??s.height??Js.height,d=((v=s.aliases)==null?void 0:v.filter(w=>typeof w=="string"&&w.trim()!=="").map(w=>`lucide-${w}`))??[],h=[...s.name?[`lucide-${s.name}`]:[],...d],p=((M=e.className)==null?void 0:M.split(" ").filter(Boolean))??[],m=e.includeDefaultClasses===!1?oh(...p):oh("lucide",...h,...p),y=e.absoluteStrokeWidth?Number(e.strokeWidth??Js["stroke-width"])*Number(s.size??s.width??Js.width)/Number(e.size??e.width??Js.width):e.strokeWidth??Js["stroke-width"];return["svg",{...Object.entries(Js).reduce((w,[C,x])=>(w[r(C)]=x,w),{}),..."color"in e&&e.color&&{[r("stroke")]:e.color},..."size"in e&&vf(e.size)&&{[r("width")]:e.size,[r("height")]:e.size},..."width"in e&&vf(e.width)&&{[r("width")]:e.width},..."height"in e&&vf(e.height)&&{[r("height")]:e.height},[r("stroke-width")]:y,...m&&{[r("class")]:m},[r("viewBox")]:`0 0 ${o} ${l}`,...e.hasA11yProp===!1?{[r("aria-hidden")]:"true"}:{},..."attributes"in e&&e.attributes},s.node.map(w=>{const[C,x,_]=w,D=e.nonScalingStroke?{[r("vector-effect")]:"non-scaling-stroke",...x}:x;return _?[C,D,_]:[C,D]})]}/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function kE(s,e={}){return FE(s,{...e,attributeNames:{...e.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BE=s=>{for(const e in s)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},zE=De.createContext({}),VE=()=>De.useContext(zE),GE=De.forwardRef(({color:s,size:e,width:t,height:r,strokeWidth:o,absoluteStrokeWidth:l,nonScalingStroke:d,className:h="",children:p,iconNode:m=[],icon:y={node:m,aliases:[],size:24},...S},v)=>{const{size:M=24,strokeWidth:w=2,absoluteStrokeWidth:C=!1,nonScalingStroke:x=!1,color:_="currentColor",className:D=""}=VE()??{},z=!!p||BE(S),[R,P,L=[]]=kE(y,{color:s??_,width:t??e??M,height:r??e??M,strokeWidth:o??w,absoluteStrokeWidth:l??C,nonScalingStroke:d??x,className:oh(D,h),hasA11yProp:z,attributes:S});return De.createElement(R,{ref:v,...P},[...L.map(([B,b])=>De.createElement(B,b)),...Array.isArray(p)?p:[p]])});/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Vt(s,e=[],t=[]){const r=typeof s=="string"?IE(s,e,t):s,o=De.forwardRef(({className:l,...d},h)=>De.createElement(GE,{ref:h,icon:r,className:l,...d}));return r.name&&(o.displayName=OE(r.name)),o}/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jg={name:"box",size:24,node:[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]};jg.node;const ng=Vt(jg);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wg={name:"camera",size:24,node:[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]};Wg.node;const HE=Vt(Wg);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xg={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};Xg.node;const Yg=Vt(Xg);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qg={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};qg.node;const jE=Vt(qg);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $g={name:"chevron-right",size:24,node:[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]};$g.node;const WE=Vt($g);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kg={name:"chevron-up",size:24,node:[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]};Kg.node;const XE=Vt(Kg);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zg={name:"circle-check",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],aliases:["check-circle-2"]};Zg.node;const Jg=Vt(Zg);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qg={name:"compass",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}]]};Qg.node;const YE=Vt(Qg);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ex={name:"copy",size:24,node:[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]};ex.node;const tx=Vt(ex);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nx={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};nx.node;const qE=Vt(nx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ix={name:"droplet",size:24,node:[["path",{d:"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",key:"c7niix"}]]};ix.node;const rx=Vt(ix);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sx={name:"external-link",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]};sx.node;const Ch=Vt(sx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ax={name:"eye",size:24,node:[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]};ax.node;const $E=Vt(ax);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ox={name:"eye-off",size:24,node:[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]};ox.node;const KE=Vt(ox);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lx={name:"flame",size:24,node:[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]]};lx.node;const cx=Vt(lx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ux={name:"gauge",size:24,node:[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]]};ux.node;const ZE=Vt(ux);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dx={name:"moon",size:24,node:[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]};dx.node;const fx=Vt(dx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hx={name:"phone",size:24,node:[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]};hx.node;const JE=Vt(hx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const px={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};px.node;const mx=Vt(px);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gx={name:"refresh-cw",size:24,node:[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]};gx.node;const QE=Vt(gx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xx={name:"rotate-cw",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]};xx.node;const lh=Vt(xx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vx={name:"send",size:24,node:[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]};vx.node;const ew=Vt(vx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _x={name:"shield-check",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]};_x.node;const tw=Vt(_x);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yx={name:"shield",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]};yx.node;const Nh=Vt(yx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sx={name:"sliders-vertical",size:24,node:[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]],aliases:["sliders"]};Sx.node;const Qc=Vt(Sx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mx={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};Mx.node;const bx=Vt(Mx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ex={name:"sun",size:24,node:[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]};Ex.node;const wx=Vt(Ex);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tx={name:"trash",size:24,node:[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],aliases:["trash-2"]};Tx.node;const nw=Vt(Tx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ax={name:"triangle-alert",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle"]};Ax.node;const eu=Vt(Ax);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx={name:"volume-2",size:24,node:[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]};Rx.node;const Cx=Vt(Rx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nx={name:"volume-x",size:24,node:[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z",key:"1p7khw"}],["path",{d:"m16.5 14.5 5-5",key:"cul3yw"}],["path",{d:"m16.5 9.5 5 5",key:"1akey5"}]]};Nx.node;const Px=Vt(Nx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lx={name:"wrench",size:24,node:[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",key:"1ngwbx"}]]};Lx.node;const ra=Vt(Lx);/**
 * @license lucide-react v1.59.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dx={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};Dx.node;const ou=Vt(Dx),Uc=[{id:"colorado-zr2",name:"2021 Chevrolet Colorado ZR2",tagline:"Overland Expedition Rig",year:2021,make:"Chevrolet",model:"Colorado ZR2 Crew Cab",trim:"ZR2 Off-Road Package (Factory Lift + DSSV + CBI Bed Bars + Rooftop Tent)",vin:"1GCGTEEN6M1198421",plate:"BXY8924",state:"WA",color:"Black Metallic (Overland Blackout Edition)",overlandSetup:"CBI Offroad Overland Bed Bars w/ Hardshell RTT Rooftop Tent",engine:"3.6L V6 DOHC DI VVT (LGZ)",horsepower:"308 hp @ 6,800 RPM",torque:"275 lb-ft @ 4,000 RPM",transmission:"Hydra-Matic 8-Speed Automatic (8L45)",drivetrain:"AutoTrac 2-Speed 4WD with Front & Rear Eaton E-Lockers",suspension:"Multimatic Dynamic Suspensions Spool Valve (DSSV) Dampers",tires:'Goodyear Wrangler DuraTrac 265/65R17 (31" All-Terrain)',currentMileage:42850,annualAverageMiles:8500,specs:{oilType:"Mobil 1 5W-30 Full Synthetic (dexos1 Gen 3 Certified)",oilCapacity:"6.0 Quarts (with filter)",oilFilter:"ACDelco PF63 (OEM) / Mobil 1 M1-212A",frontDiffFluid:"75W-90 Synthetic Gear Oil (1.5 qts)",rearDiffFluid:"75W-90 Synthetic Axle Lubricant + Friction Modifier (2.0 qts)",transferCaseFluid:"DEXRON-VI Automatic Transmission / Transfer Case Fluid (1.6 qts)",airFilter:"Donaldson PowerCore Heavy Duty High-Capacity Air Filter (A3232C)",cabinFilter:"ACDelco CF188 Carbon Activated Cabin Filter",sparkPlugs:"ACDelco 12622561 Iridium (100,000 mi interval)",coolant:"GM DEX-COOL 50/50 Premix (150,000 mi / 5 yr)",fuelCapacity:"21.0 Gallons"},oilLife:{intervalMiles:7500,intervalMonths:12,lastServiceMileage:41950,lastServiceDate:"2026-06-15",manualOverridePct:12},tireRotation:{type:"5-Tire Full-Size Spare Rotation Cycle",intervalMiles:5e3,lastRotationMileage:38300,lastRotationDate:"2026-04-12",currentPattern:"Modified Rearward Cross w/ Spare to Right Rear (RR)",treadDepth32nds:{fl:9,fr:9,rl:8,rr:9,spare:10}},platformMilestones:[{id:"zr2-dssv",title:"Multimatic DSSV Spool-Valve Damper Inspection",description:"Inspect front coilovers & rear piggyback reservoir shocks for shaft scoring, seal weeping, and nitrogen valve integrity.",intervalMiles:1e4,lastMileage:35e3,dueMileage:45e3,status:"NOMINAL",badge:"DSSV SUSPENSION"},{id:"zr2-diffs",title:"Front & Rear E-Locker Differential Gear Oils",description:"Drain & refill 75W-90 Synthetic Gear Lubricant; inspect magnetic drain plugs for metallic swarf and verify Eaton locker engagement.",intervalMiles:3e4,lastMileage:3e4,dueMileage:6e4,status:"GOOD",badge:"DRIVETRAIN"},{id:"zr2-tcase",title:"AutoTrac Transfer Case Fluid & Actuator Test",description:"DEXRON-VI fluid change and cycle 2WD, Auto, 4Hi, and 4Lo transfer case push-button actuator motor.",intervalMiles:45e3,lastMileage:3e4,dueMileage:75e3,status:"GOOD",badge:"4WD SERVICE"},{id:"zr2-intake",title:"Heavy-Duty Overland Air Filter Inspection",description:"Check Donaldson high-capacity air box for trail dust, silt ingestion, and debris accumulation.",intervalMiles:15e3,lastMileage:35e3,dueMileage:5e4,status:"NOMINAL",badge:"FILTRATION"}],compliance:{tabsExpiryDate:"2027-02-28",tabsCost:285.5,registeredOwner:"Michael & Family",county:"Thurston County, WA",dolRenewalUrl:"https://www.dol.wa.gov/vehiclerob/renew-tabs",insurance:{carrier:"USAA Casualty Insurance Company",policyNumber:"USAA-AUT-948102-WA",period:"Aug 15, 2026 – Feb 15, 2027",status:"ACTIVE // AUTO-PAY",comprehensiveDeductible:"$500",collisionDeductible:"$500",bodilyInjury:"$250k / $500k",propertyDamage:"$100k",roadsideAssistance:"24/7 Unlimited Towing (1-800-531-8722)",emergencyRoadsidePhone:"1-800-531-8722"},nhtsaRecalls:{activeCount:0,lastCheckedDate:"2026-10-18",status:"CLEAN // NO OPEN SAFETY RECALLS",monitoredTsbs:["TSB 18-NA-355: GM 8-Speed 8L45 Transmission Torque Converter Shudder (Resolved w/ Mobil 1 Synthetic LV ATF HP)","TSB 20-NA-198: Front Sway Bar Link Bushing Noise Check"]}}},{id:"murano-midnight",name:"2021 Nissan Murano Midnight Edition",tagline:"Family Executive Crossover",year:2021,make:"Nissan",model:"Murano AWD",trim:'Midnight Edition (Black 20" Alloys, Black Badging, Roof Rails)',vin:"5N1AZ2MH8MC829104",plate:"CDE4108",state:"WA",color:"Magnetic Black Pearl w/ Midnight Blackout Trim",engine:"3.5L DOHC 24-Valve V6 (VQ35DE)",horsepower:"260 hp @ 6,000 RPM",torque:"240 lb-ft @ 4,400 RPM",transmission:"Xtronic Continuously Variable Transmission (CVT)",drivetrain:"Intelligent All-Wheel Drive (AWD)",suspension:"Independent Front Struts & Multi-Link Rear Suspension",tires:'Bridgestone Dueler H/P Sport AS 235/55R20 on 20" Gloss Black Alloy',currentMileage:38420,annualAverageMiles:9200,specs:{oilType:"Mobil 1 0W-20 Advanced Fuel Economy Full Synthetic",oilCapacity:"5.1 Quarts (with filter)",oilFilter:"Nissan OEM 15208-65F0E / Mobil 1 M1-110A",cvtFluid:"Nissan Genuine NS-3 CVT Fluid (OEM Spec Only - Never Universal)",cvtCapacity:"9.0 Quarts (drain & fill ~4.5 qts)",brakeFluid:"Genuine Nissan DOT 3 / DOT 4 Brake Fluid",battery:"OEM / Interstate Group 35 AGM 12V 650 CCA",cabinFilter:"Nissan 27277-4BA0A Charcoal Anti-Allergen Pollen Microfilter",engineAirFilter:"Nissan 16546-3JA0J Engine Air Filter Element",sparkPlugs:"Laser Iridium FXE22HR11 (105,000 mi interval)",coolant:"Nissan Long Life Blue 50/50 Prediluted Antifreeze (105,000 mi / 7 yr)",fuelCapacity:"19.0 Gallons (Premium Recommended for Max Performance)"},oilLife:{intervalMiles:5e3,intervalMonths:6,lastServiceMileage:35800,lastServiceDate:"2026-07-20",manualOverridePct:48},tireRotation:{type:"4-Tire Modified Forward Cross & High-Speed Road-Force Balance",intervalMiles:5e3,lastRotationMileage:35800,lastRotationDate:"2026-07-20",currentPattern:"Modified Forward Cross (Drive Axle Priority)",treadDepth32nds:{fl:7,fr:7,rl:7,rr:7,spare:10}},platformMilestones:[{id:"murano-cvt",title:"Xtronic CVT Fluid Degradation Check & Thermal Deterioration Count",description:"Crucial preventative interval for Nissan CVTs: scan CVT fluid deterioration date value and schedule NS-3 flush to avoid chain slippage and valve body wear.",intervalMiles:3e4,lastMileage:3e4,dueMileage:6e4,status:"MONITORED",badge:"XTRONIC CVT"},{id:"murano-brake-fluid",title:"Brake Fluid Moisture Testing & Flush Interval",description:"Test DOT 3/4 brake fluid boiling point and moisture content; complete 24-month hydrostatic brake system flush.",intervalMonths:24,lastDate:"2025-09-10",dueDate:"2027-09-10",status:"GOOD",badge:"HYDRAULIC BRAKES"},{id:"murano-battery",title:"12V AGM Battery Health & Alternator Voltage Output",description:"Conduct conductance CCA test and test alternator load charging voltage (13.8V – 14.5V) to protect Intelligent AWD and ABS computer modules.",intervalMonths:12,lastDate:"2026-08-14",dueDate:"2027-08-14",status:"GOOD",badge:"ELECTRICAL 12V"},{id:"murano-filters",title:"Charcoal Cabin Microfilter & Engine Air Filter Replacement",description:"Swap Nissan cabin pollen air filter and check VQ35DE dual-path air intake box.",intervalMiles:15e3,lastMileage:3e4,dueMileage:45e3,status:"NOMINAL",badge:"FILTRATION"}],compliance:{tabsExpiryDate:"2026-11-02",tabsCost:312,registeredOwner:"Michael & Family",county:"Thurston County, WA",dolRenewalUrl:"https://www.dol.wa.gov/vehiclerob/renew-tabs",insurance:{carrier:"USAA Casualty Insurance Company",policyNumber:"USAA-AUT-948102-WA",period:"Aug 15, 2026 – Feb 15, 2027",status:"ACTIVE // AUTO-PAY",comprehensiveDeductible:"$500",collisionDeductible:"$500",bodilyInjury:"$250k / $500k",propertyDamage:"$100k",roadsideAssistance:"24/7 Unlimited Towing (1-800-531-8722)",emergencyRoadsidePhone:"1-800-531-8722"},nhtsaRecalls:{activeCount:0,lastCheckedDate:"2026-10-18",status:"CLEAN // NO OPEN SAFETY RECALLS",monitoredTsbs:["TSB NTB20-034: Nissan Intelligent Emergency Braking (IEB) Sensor Calibration","TSB NTB21-018: Panoramic Sunroof Track Lubrication & Drain Clearing"]}}}],ig=[{id:"log-001",vehicleId:"colorado-zr2",date:"2026-06-15",mileage:41950,title:"Full Synthetic dexos1 Oil Change & PF63 Filter",category:"Oil & Filter",providerType:"DIY",shopName:"Home Garage Workshop",cost:48.75,dealerEstimatedCost:119,partsUsed:[{name:"Mobil 1 5W-30 dexos1 Gen 3 Full Synthetic (5 Qt Jug + 1 Qt)",partNumber:"Mobil 1 124315",qty:6,unit:"qt",cost:38.5},{name:"ACDelco Gold PF63 Engine Oil Filter",partNumber:"PF63 / 19433604",qty:1,unit:"ea",cost:7.25},{name:"Dorman M12-1.75 Copper Oil Drain Plug Gasket",partNumber:"Dorman 095-147",qty:1,unit:"ea",cost:3}],notes:"Torqued drain plug to 18 lb-ft. Lubed filter O-ring with fresh oil. Reset GM Oil Life Monitor in instrument cluster.",verified:!0},{id:"log-002",vehicleId:"colorado-zr2",date:"2026-04-12",mileage:38300,title:"5-Tire Full-Size Spare Rotation & Pressure Calibrate",category:"Tires & Wheels",providerType:"DIY",shopName:"Home Garage Workshop",cost:0,dealerEstimatedCost:45,partsUsed:[{name:"Tire Pressure Adjustment & Tread Depth Gauge Audit",partNumber:"TPMS Calibrate",qty:5,unit:"wheels",cost:0}],notes:"Rotated full-size spare into Right Rear. Rearward cross pattern. Set cold pressures to 35 PSI. Reset TPMS sensor positions via OBD relearn tool.",verified:!0},{id:"log-003",vehicleId:"colorado-zr2",date:"2025-10-18",mileage:35e3,title:"Multimatic DSSV Dampers 35k Inspection & Air Filter",category:"Suspension",providerType:"Independent",shopName:"Northwest 4x4 & Off-Road Specialists",cost:85,dealerEstimatedCost:185,partsUsed:[{name:"ACDelco Heavy Duty Air Filter Element",partNumber:"A3232C",qty:1,unit:"ea",cost:28.5},{name:"DSSV Multimatic Visual & Seal Ultrasonic Inspection",partNumber:"INSP-DSSV-01",qty:4,unit:"shocks",cost:56.5}],notes:"No weeping on spool valve bodies. Shaft micro-polish in pristine shape. Zero pitting. Replaced engine air filter.",verified:!0},{id:"log-004",vehicleId:"colorado-zr2",date:"2025-05-14",mileage:3e4,title:"30,000-Mile Major 4WD & Differential Fluid Service",category:"Fluids & Drivetrain",providerType:"Dealership",shopName:"Chevrolet Certified Service",cost:412.5,dealerEstimatedCost:412.5,partsUsed:[{name:"ACDelco Dexron 75W-90 Synthetic Axle Lubricant",partNumber:"GM 88900401",qty:4,unit:"qt",cost:135},{name:"ACDelco DEXRON-VI AutoTrac T-Case Fluid",partNumber:"GM 88861003",qty:2,unit:"qt",cost:42},{name:"Dealership Certified Drivetrain Labor & Inspection",partNumber:"LABOR-30K-4WD",qty:1,unit:"job",cost:235.5}],notes:"Front and rear differential fluid flushed. Transfer case drained and refilled. Tested front and rear E-Lockers on lift under load.",verified:!0},{id:"log-005",vehicleId:"murano-midnight",date:"2026-07-20",mileage:35800,title:"0W-20 Full Synthetic Oil Change & 4-Tire Balance",category:"Oil & Filter",providerType:"Independent",shopName:"Evergreen Automotive Specialists",cost:98.4,dealerEstimatedCost:145,partsUsed:[{name:"Mobil 1 Advanced Fuel Economy 0W-20 Synthetic",partNumber:"Mobil 1 120760",qty:5.1,unit:"qt",cost:44},{name:"Nissan Genuine Oil Filter",partNumber:"15208-65F0E",qty:1,unit:"ea",cost:11.4},{name:"Road Force 4-Wheel High Speed Balance",partNumber:"RF-BAL-4",qty:4,unit:"wheels",cost:43}],notes:"Oil changed, tire balance verified on Hunter Road Force machine. Set 33 PSI cold on all four tires. Reset Nissan maintenance display.",verified:!0},{id:"log-006",vehicleId:"murano-midnight",date:"2025-09-10",mileage:3e4,title:"30,000-Mile Factory CVT Fluid Flush & Brake Fluid Drain",category:"Fluids & Drivetrain",providerType:"Dealership",shopName:"Nissan Certified Master Service",cost:445,dealerEstimatedCost:445,partsUsed:[{name:"Nissan Genuine NS-3 CVT Fluid (Strict OEM)",partNumber:"999MP-NS300P",qty:5,unit:"qt",cost:138},{name:"Nissan Genuine DOT 3/4 Brake Fluid Flush",partNumber:"999MP-A4100P",qty:2,unit:"pint",cost:32},{name:"CVT Fluid Degradation Counter Reset & Test",partNumber:"CONSULT-III-DIAG",qty:1,unit:"scan",cost:65},{name:"Factory Master Technician Labor",partNumber:"LAB-CVT-BRK-30K",qty:1,unit:"job",cost:210}],notes:"Full flush of CVT fluid with genuine OEM NS-3 fluid. Reset deterioration date counter with CONSULT-III scanner. Bled brake system with fresh fluid.",verified:!0}];function ao(s,e=new Date){const{oilLife:t,currentMileage:r}=s;if(!t)return{percent:100,status:"good",milesLeft:7500,daysLeft:365};if(typeof t.manualOverridePct=="number"){const w=t.manualOverridePct;let C="good";w<=15?C="critical":w<=40&&(C="warning");const x=r-t.lastServiceMileage,_=Math.max(0,Math.round(t.intervalMiles*(w/100)));return{percent:w,status:C,milesLeft:_,milesDriven:x,intervalMiles:t.intervalMiles}}const o=Math.max(0,r-t.lastServiceMileage),l=Math.max(0,1-o/t.intervalMiles)*100,d=new Date(t.lastServiceDate),h=Math.max(0,Math.floor((e-d)/(1e3*60*60*24))),p=(t.intervalMonths||12)*30.4375,m=Math.max(0,1-h/p)*100,y=Math.round(Math.min(l,m));let S="good";y<=15?S="critical":y<=40&&(S="warning");const v=Math.max(0,t.intervalMiles-o),M=Math.max(0,Math.round(p-h));return{percent:y,status:S,milesLeft:v,daysLeft:M,milesDriven:o,daysSinceService:h,intervalMiles:t.intervalMiles}}function sa(s,e=new Date("2026-10-19")){const t=new Date(s),r=t-e,o=Math.ceil(r/(1e3*60*60*24));let l="good";return o<=15?l="critical":o<=45&&(l="warning"),{daysRemaining:o,expiryFormatted:t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),status:l,isExpired:o<0}}function lu(s){const{tireRotation:e,currentMileage:t}=s;if(!e)return{milesRemaining:5e3,status:"good"};const r=t-e.lastRotationMileage,o=Math.max(0,e.intervalMiles-r);let l="good";return o<=500&&(l="warning"),o===0&&(l="critical"),{milesRemaining:o,milesSince:r,status:l,type:e.type}}function iw(s){const e=[];s.forEach(l=>{const d=sa(l.compliance.tabsExpiryDate);d.daysRemaining<=30&&e.push({severity:d.daysRemaining<=15?"CRITICAL":"WARNING",code:`FLEET_TABS_EXPIRY_${l.id.toUpperCase()}`,statute:"WA DOL RCW 46.16A",title:`${l.name.includes("Colorado")?"Colorado ZR2":"Murano"} WA State Vehicle Tabs Expire in ${d.daysRemaining} Days`,message:`Washington State Vehicle Tabs for plate ${l.plate} expire on ${d.expiryFormatted}. Renew via WA License eXpress to avoid state penalties.`});const h=ao(l);h.percent<=20&&e.push({severity:h.percent<=15?"WARNING":"INFO",code:`FLEET_OIL_LIFE_${l.id.toUpperCase()}`,statute:`${l.name.includes("Colorado")?"GM dexos1":"Nissan"} Service Timer`,title:`${l.name.includes("Colorado")?"Colorado ZR2":"Murano"} Oil Life at ${h.percent}% (Service Due)`,message:`Oil degradation threshold reached (${h.percent}% remaining, ~${h.milesLeft} mi left). Recommended: ${l.specs.oilType} and ${l.specs.oilFilter}.`});const p=lu(l);if(p.milesRemaining<=500&&e.push({severity:"INFO",code:`FLEET_TIRE_ROTATION_${l.id.toUpperCase()}`,statute:l.tireRotation.type.includes("5-Tire")?"5-Tire Overland Rotation":"4-Tire Cross Rotation",title:`${l.name.includes("Colorado")?"Colorado ZR2":"Murano"} ${l.tireRotation.type.includes("5-Tire")?"5-Tire":"4-Tire"} Rotation Due in ${p.milesRemaining} mi`,message:`Cycle pattern: ${l.tireRotation.currentPattern}. Preserves uniform tread depth and road force alignment.`}),l.id==="colorado-zr2"){const m=l.platformMilestones.find(y=>y.id==="zr2-dssv");m&&l.currentMileage-m.lastMileage>=m.intervalMiles-1e3&&e.push({severity:"INFO",code:"FLEET_ZR2_DSSV_INSPECTION",statute:"Multimatic Factory Service Manual",title:"Colorado ZR2 DSSV Damper Check Approaching (10k Interval)",message:"Inspect spool-valve body seals, piggyback reservoirs, and coilover lower eyelet bushings."})}if(l.id==="murano-midnight"){const m=l.platformMilestones.find(y=>y.id==="murano-cvt");m&&l.currentMileage-m.lastMileage>=28e3&&e.push({severity:"WARNING",code:"FLEET_MURANO_CVT_MONITOR",statute:"Nissan Factory Technical Service Spec",title:"Murano Xtronic CVT Degradation Warning",message:"CVT fluid degradation counter is approaching interval limit. Strictly OEM NS-3 fluid flush recommended."})}});const t=e.filter(l=>l.severity==="CRITICAL").length,r=e.filter(l=>l.severity==="WARNING").length;let o="info";return t>0?o="critical":r>0&&(o="warning"),{garage:{deckName:"Garage & Fleet Command",deckIcon:"🛞",count:e.length,severity:o,title:`${t>0?`${t} Critical (Tabs Due) + `:""}${r} Warning / Maintenance Due`,items:e}}}function rw({vehicles:s,activeVehicleId:e,onSelectVehicle:t,onOpenLogModal:r,onResetOilLife:o,onRotateTires:l,onOpenStatutory:d,onOpenVault:h,onOpenTelemetry:p}){const m=De.useRef(null),y=De.useRef(null),S=De.useRef(null),v=De.useRef(null),M=De.useRef(null),w=De.useRef(null),C=De.useRef(null),x=De.useRef(null),_=De.useRef(null),D=De.useRef(null),z=De.useRef(null),R=De.useRef(null),P=De.useRef(null),L=De.useRef(null),B=De.useRef(null),b=De.useRef(null),N=De.useRef(new ne(0,4.8,12)),O=De.useRef(new ne(0,1.2,0)),[V,Y]=De.useState("highlux"),[Q,G]=De.useState(100),[F,ce]=De.useState(!1),[Z,J]=De.useState(!1),[W,ee]=De.useState(!0),[I,q]=De.useState("dual"),[xe,we]=De.useState(null),[Ve,$e]=De.useState(!0),ae=s.find(Ie=>Ie.id==="colorado-zr2")||s[0],de=s.find(Ie=>Ie.id==="murano-midnight")||s[1];ao(ae),ao(de),sa(ae.compliance.tabsExpiryDate),sa(de.compliance.tabsExpiryDate),lu(ae);const Se=Ie=>{if(!(!Ve||typeof window>"u"))try{const at=new(window.AudioContext||window.webkitAudioContext),Ae=at.createOscillator(),Oe=at.createGain();Ae.connect(Oe),Oe.connect(at.destination);const Be=at.currentTime;Ie==="relay"?(Ae.type="square",Ae.frequency.setValueAtTime(160,Be),Ae.frequency.exponentialRampToValueAtTime(40,Be+.08),Oe.gain.setValueAtTime(.2,Be),Oe.gain.exponentialRampToValueAtTime(.01,Be+.08),Ae.start(Be),Ae.stop(Be+.08)):Ie==="ratchet"?(Ae.type="triangle",Ae.frequency.setValueAtTime(900,Be),Ae.frequency.setValueAtTime(1400,Be+.02),Oe.gain.setValueAtTime(.18,Be),Oe.gain.exponentialRampToValueAtTime(.01,Be+.05),Ae.start(Be),Ae.stop(Be+.05)):Ie==="tent"?(Ae.type="sine",Ae.frequency.setValueAtTime(320,Be),Ae.frequency.exponentialRampToValueAtTime(140,Be+.3),Oe.gain.setValueAtTime(.22,Be),Oe.gain.exponentialRampToValueAtTime(.01,Be+.3),Ae.start(Be),Ae.stop(Be+.3)):Ie==="camera"&&(Ae.type="sine",Ae.frequency.setValueAtTime(540,Be),Ae.frequency.setValueAtTime(720,Be+.04),Oe.gain.setValueAtTime(.15,Be),Oe.gain.exponentialRampToValueAtTime(.01,Be+.08),Ae.start(Be),Ae.stop(Be+.08))}catch{}},Ze=Ie=>{Se("camera"),q(Ie),Ie==="dual"?(N.current.set(0,4.6,11.5),O.current.set(0,1.2,0),t("all")):Ie==="zr2"?(N.current.set(-3.8,2.4,5.2),O.current.set(-3.8,1.1,0),t("colorado-zr2")):Ie==="murano"&&(N.current.set(3.8,2.4,5.2),O.current.set(3.8,1.1,0),t("murano-midnight"))},je=()=>{const Ie=document.createElement("canvas");Ie.width=1024,Ie.height=1024;const at=Ie.getContext("2d");at.fillStyle="#0a0d14",at.fillRect(0,0,1024,1024);const Ae=128;for(let Be=0;Be<1024;Be+=Ae)for(let qe=0;qe<1024;qe+=Ae){const xt=(Be/Ae+qe/Ae)%2===0;if(at.fillStyle=xt?"#121620":"#171c28",at.fillRect(Be+2,qe+2,Ae-4,Ae-4),at.strokeStyle=xt?"#242c3d":"#2b3447",at.lineWidth=3,xt)for(let Dt=12;Dt<Ae-4;Dt+=12)at.beginPath(),at.moveTo(Be+8,qe+Dt),at.lineTo(Be+Ae-8,qe+Dt),at.stroke();else for(let Dt=12;Dt<Ae-4;Dt+=12)at.beginPath(),at.moveTo(Be+Dt,qe+8),at.lineTo(Be+Dt,qe+Ae-8),at.stroke();at.strokeStyle="#05070a",at.lineWidth=4,at.strokeRect(Be+2,qe+2,Ae-4,Ae-4)}const Oe=new iy(Ie);return Oe.wrapS=nl,Oe.wrapT=nl,Oe.repeat.set(12,12),Oe};return De.useEffect(()=>{const Ie=m.current;if(!Ie)return;const at=Ie.clientWidth||window.innerWidth,Ae=Ie.clientHeight||window.innerHeight,Oe=new X_;y.current=Oe,Oe.background=new Lt(263690),Oe.fog=new Mh(263690,.024);const Be=new Mi(45,at/Ae,.1,80);Be.position.set(0,4.6,11.5),v.current=Be;const qe=new vE({antialias:!0,powerPreference:"high-performance"});qe.setSize(at,Ae),qe.setPixelRatio(Math.min(window.devicePixelRatio,2)),qe.shadowMap.enabled=!0,qe.shadowMap.type=ag,qe.toneMapping=dh,qe.toneMappingExposure=1.05,S.current=qe,Ie.appendChild(qe.domElement);const xt=new yE(Be,qe.domElement);xt.enableDamping=!0,xt.dampingFactor=.05,xt.maxPolarAngle=Math.PI/2-.03,xt.minDistance=2.8,xt.maxDistance=24,xt.target.set(0,1.2,0),M.current=xt;const Dt=new my(16777215,.65);Oe.add(Dt),P.current=Dt;const kt=new py(16777215,.8);kt.position.set(5,12,8),kt.castShadow=!0,kt.shadow.mapSize.width=2048,kt.shadow.mapSize.height=2048,kt.shadow.camera.near=.5,kt.shadow.camera.far=30,kt.shadow.camera.left=-12,kt.shadow.camera.right=12,kt.shadow.camera.top=12,kt.shadow.camera.bottom=-12,kt.shadow.bias=-5e-4,Oe.add(kt);const Mt=new T0(16777215,1.8,18,Math.PI/3,.4,1.2);Mt.position.set(-3.8,5.2,0),Mt.target.position.set(-3.8,0,0),Mt.castShadow=!0,Oe.add(Mt),Oe.add(Mt.target),L.current=Mt;const jt=new T0(16777215,1.8,18,Math.PI/3,.4,1.2);jt.position.set(3.8,5.2,0),jt.target.position.set(3.8,0,0),jt.castShadow=!0,Oe.add(jt),Oe.add(jt.target),B.current=jt;const $=je(),mn=new or(36,28),Ft=new Yt({map:$,roughness:.28,metalness:.25}),U=new He(mn,Ft);U.rotation.x=-Math.PI/2,U.receiveShadow=!0,Oe.add(U);const E=(wt,Wt,rn,Ut,Zn=16096779)=>{const Qt=new or(rn,Ut),gi=new Qa({color:Zn,opacity:.65,transparent:!0}),kn=new He(Qt,gi);kn.rotation.x=-Math.PI/2,kn.position.set(wt,.005,Wt),Oe.add(kn)};E(-3.8,3.4,3.4,.12,16096779),E(-3.8,-3.4,3.4,.12,16096779),E(-5.5,0,.12,6.8,16096779),E(-2.1,0,.12,6.8,16096779),E(3.8,3.4,3.4,.12,3718648),E(3.8,-3.4,3.4,.12,3718648),E(2.1,0,.12,6.8,3718648),E(5.5,0,.12,6.8,3718648);const te=new Yt({color:592914,roughness:.85,metalness:.2}),oe=new or(36,10),he=new He(oe,te);he.position.set(0,5,-8),he.receiveShadow=!0,Oe.add(he);const be=new or(28,10),Re=new He(be,te);Re.rotation.y=Math.PI/2,Re.position.set(-14,5,0),Re.receiveShadow=!0,Oe.add(Re);const pe=new or(28,10),me=new He(pe,te);me.rotation.y=-Math.PI/2,me.position.set(14,5,0),me.receiveShadow=!0,Oe.add(me);const Ue=new or(36,28),nt=new Yt({color:197896,roughness:.95}),Ne=new He(Ue,nt);Ne.position.set(0,6.8,0),Ne.rotation.x=Math.PI/2,Oe.add(Ne);const Te=new ti;Te.position.set(0,6.3,0);const et=.85,lt=(wt,Wt,rn=16777215)=>{const Ut=[];for(let gi=0;gi<=6;gi++){const kn=gi*60*(Math.PI/180);Ut.push(new ne(wt+et*Math.cos(kn),0,Wt+et*Math.sin(kn)))}const Zn=new ni().setFromPoints(Ut),Qt=new Cg({color:rn,linewidth:2.5});return new ny(Zn,Qt)},dt=16777215;for(let wt=-4;wt<=4;wt++)for(let Wt=-2;Wt<=3;Wt++){const rn=wt*1.5,Ut=Wt*1.732+(wt%2!==0?.866:0),Zn=lt(rn,Ut,dt);Te.add(Zn)}Oe.add(Te),R.current=Te;const H=new ti;H.position.set(0,0,-7.2);const Pe=new Pt(3.6,2.2,1.2),ge=new Yt({color:10033947,roughness:.35,metalness:.75}),Ce=new He(Pe,ge);Ce.position.set(-4.5,1.1,0),Ce.castShadow=!0,H.add(Ce);for(let wt=0;wt<5;wt++){const Wt=new Pt(3.4,.08,.08),rn=new Yt({color:13948120,metalness:.9,roughness:.1}),Ut=new He(Wt,rn);Ut.position.set(-4.5,.4+wt*.38,.61),H.add(Ut)}const ze=new Yt({color:1579035,roughness:.35,metalness:.8}),ve=new He(Pe,ze);ve.position.set(4.5,1.1,0),ve.castShadow=!0,H.add(ve);for(let wt=0;wt<5;wt++){const Wt=new Pt(3.4,.08,.08),rn=new Yt({color:3718648,metalness:.9,roughness:.1}),Ut=new He(Wt,rn);Ut.position.set(4.5,.4+wt*.38,.61),H.add(Ut)}const rt=new Pt(3.8,1.4,1.2),Qe=new Yt({color:2565930,roughness:.4,metalness:.6}),At=new He(rt,Qe);At.position.set(0,.7,0),At.castShadow=!0,H.add(At);const Rt=new Pt(6.4,.8,.12),yn=new Yt({color:988970,emissive:16096779,emissiveIntensity:.25,roughness:.2}),Yn=new He(Rt,yn);Yn.position.set(0,3.8,0),H.add(Yn),Oe.add(H);const Ct=new ti;Ct.position.set(-3.8,0,0);const Di=new Yt({color:526604,roughness:.15,metalness:.88}),gn=new Yt({color:1579035,roughness:.7,metalness:.3}),Zi=new Yt({color:329482,roughness:.05,metalness:.95}),xs=new Yt({color:1184791,roughness:.85,metalness:.1}),vs=new Yt({color:0,roughness:.25,metalness:.85}),_s=new Yt({color:16096779,emissive:14251782,emissiveIntensity:.4,metalness:.95,roughness:.15}),Rn=new Yt({color:15680580,roughness:.3,metalness:.5}),Ii=(wt,Wt,rn)=>{const Ut=new ti;Ut.position.set(wt,Wt,rn);const Zn=new On(.44,.44,.3,24),Qt=new He(Zn,xs);Qt.rotation.z=Math.PI/2,Qt.castShadow=!0,Ut.add(Qt);for(let er=0;er<16;er++){const _r=er*22.5*(Math.PI/180),fu=new Pt(.32,.05,.08),xa=new He(fu,xs);xa.position.set(0,.45*Math.sin(_r),.45*Math.cos(_r)),xa.rotation.x=_r,Ut.add(xa)}const gi=new On(.28,.28,.31,16),kn=new He(gi,vs);kn.rotation.z=Math.PI/2,Ut.add(kn);const Ds=new On(.21,.21,.06,16),Is=new Yt({color:9741240,metalness:.9,roughness:.2}),ki=new He(Ds,Is);return ki.rotation.z=Math.PI/2,ki.position.x=wt<0?.08:-.08,Ut.add(ki),Ut};Ct.add(Ii(-1.05,.44,1.55)),Ct.add(Ii(1.05,.44,1.55)),Ct.add(Ii(-1.05,.44,-1.6)),Ct.add(Ii(1.05,.44,-1.6));const Br=new He(new On(.045,.045,.38,12),_s);Br.position.set(-.85,.72,1.55),Ct.add(Br);const ys=new He(new On(.045,.045,.38,12),_s);ys.position.set(.85,.72,1.55),Ct.add(ys);const mr=new Pt(1.6,.16,4.8),zr=new He(mr,gn);zr.position.set(0,.52,0),Ct.add(zr);const gr=new Pt(1.2,.08,.7),Ss=new Yt({color:12895428,metalness:.8,roughness:.25}),Vr=new He(gr,Ss);Vr.rotation.x=-Math.PI/5,Vr.position.set(0,.45,2.45),Ct.add(Vr);const co=new Pt(2.02,.28,.34),Jt=new He(co,gn);Jt.position.set(0,.62,2.5),Jt.castShadow=!0,Ct.add(Jt);const aa=new Jc(.065,.02,8,12),Gr=new He(aa,Rn);Gr.position.set(-.55,.58,2.68),Ct.add(Gr);const Hr=new He(aa,Rn);Hr.position.set(.55,.58,2.68),Ct.add(Hr);const A=new Pt(1.94,.35,1.6),X=new He(A,Di);X.position.set(0,1.05,1.7),X.castShadow=!0,Ct.add(X);const ue=new Pt(.85,.07,.95),re=new He(ue,gn);re.position.set(0,1.25,1.65),Ct.add(re);const ie=new Pt(1.82,.32,.08),ke=new He(ie,gn);ke.position.set(0,.92,2.52),Ct.add(ke);const Le=new Yt({color:16777215,emissive:16777215,emissiveIntensity:.8}),Fe=new He(new Pt(.28,.16,.06),Le);Fe.position.set(-.84,.92,2.53),Ct.add(Fe);const Ke=new He(new Pt(.28,.16,.06),Le);Ke.position.set(.84,.92,2.53),Ct.add(Ke);const it=new Pt(1.94,.5,1.8),ht=new He(it,Di);ht.position.set(0,.95,.1),ht.castShadow=!0,Ct.add(ht);const vt=new Pt(1.76,.68,1.65),Xe=new He(vt,Zi);Xe.position.set(0,1.48,.08),Xe.castShadow=!0,Ct.add(Xe);const bt=new Pt(1.8,.06,1.7),en=new He(bt,Di);en.position.set(0,1.84,.08),en.castShadow=!0,Ct.add(en);const Xt=new On(.04,.04,1.9,12),It=new He(Xt,gn);It.rotation.x=Math.PI/2,It.position.set(-1.02,.52,.1),Ct.add(It);const cn=new He(Xt,gn);cn.rotation.x=Math.PI/2,cn.position.set(1.02,.52,.1),Ct.add(cn);const We=new Pt(1.94,.52,1.85),nn=new He(We,Di);nn.position.set(0,.95,-1.65),nn.castShadow=!0,Ct.add(nn);const Et=new Pt(1.5,.44,1.7),Sn=new He(Et,gn);Sn.position.set(0,1.05,-1.62),Ct.add(Sn);const ft=new ti;ft.position.set(0,1.25,-1.62);const qn=new On(.035,.035,1.65,12),pi=new He(qn,gn);pi.rotation.z=Math.PI/2,pi.position.set(0,.48,.65),ft.add(pi);const Nt=new He(qn,gn);Nt.rotation.z=Math.PI/2,Nt.position.set(0,.48,0),ft.add(Nt);const Kt=new He(qn,gn);Kt.rotation.z=Math.PI/2,Kt.position.set(0,.48,-.65),ft.add(Kt);const mi=new On(.03,.03,.5,12);[-.8,.8].forEach(wt=>{[.65,0,-.65].forEach(Wt=>{const rn=new He(mi,gn);rn.position.set(wt,.24,Wt),ft.add(rn)})});const Gt=new Pt(.02,.2,1.3),$n=new Yt({color:1976635,metalness:.8,roughness:.3}),ii=new He(Gt,$n);ii.position.set(-.82,.28,0),ft.add(ii);const ri=new He(Gt,$n);ri.position.set(.82,.28,0),ft.add(ri);const Kn=new ti;Kn.position.set(0,.52,0);const Ji=new Pt(1.48,.1,1.6),Ms=new He(Ji,gn);Kn.add(Ms);const bs=new Pt(1.5,.08,1.62),Qi=new Yt({color:592139,roughness:.3,metalness:.8}),oa=new He(bs,Qi);oa.position.set(0,.09,0),oa.castShadow=!0,Kn.add(oa),_.current=oa;const cl=new Eh(.9,.9,4),Es=new Yt({color:3359061,roughness:.9,metalness:.05,side:Li}),ws=new He(cl,Es);ws.rotation.y=Math.PI/4,ws.position.set(0,.5,0),ws.visible=!1,Kn.add(ws),D.current=ws;const xr=new ti,Ts=new On(.02,.02,2.2,8),uo=new Yt({color:9741240,metalness:.9,roughness:.2}),fo=new He(Ts,uo);fo.position.set(-.25,-.9,.4),fo.rotation.x=Math.PI/7,xr.add(fo);const vr=new He(Ts,uo);vr.position.set(.25,-.9,.4),vr.rotation.x=Math.PI/7,xr.add(vr),xr.position.set(.85,0,0),xr.visible=!1,Kn.add(xr),z.current=xr,ft.add(Kn),Ct.add(ft),Oe.add(Ct),C.current=Ct;const Zt=new ti;Zt.position.set(3.8,0,0);const Ui=new Yt({color:329482,roughness:.12,metalness:.94}),la=new Yt({color:2042167,metalness:.95,roughness:.1}),ca=(wt,Wt,rn)=>{const Ut=new ti;Ut.position.set(wt,Wt,rn);const Zn=new On(.38,.38,.26,24),Qt=new He(Zn,xs);Qt.rotation.z=Math.PI/2,Qt.castShadow=!0,Ut.add(Qt);const gi=new On(.27,.27,.27,16),kn=new He(gi,vs);kn.rotation.z=Math.PI/2,Ut.add(kn);const Ds=new On(.2,.2,.05,16),Is=new Yt({color:13358561,metalness:.9,roughness:.15}),ki=new He(Ds,Is);return ki.rotation.z=Math.PI/2,ki.position.x=wt<0?.07:-.07,Ut.add(ki),Ut};Zt.add(ca(-.98,.38,1.45)),Zt.add(ca(.98,.38,1.45)),Zt.add(ca(-.98,.38,-1.45)),Zt.add(ca(.98,.38,-1.45));const cu=new Pt(1.92,.52,4.6),As=new He(cu,Ui);As.position.set(0,.65,0),As.castShadow=!0,Zt.add(As);const ua=new Pt(1.84,.28,1.55),Rs=new He(ua,Ui);Rs.position.set(0,.88,1.45),Rs.castShadow=!0,Zt.add(Rs);const ul=new Pt(1.3,.35,.08),Oi=new He(ul,gn);Oi.position.set(0,.68,2.32),Zt.add(Oi);const ho=new Jc(.35,.04,8,12,Math.PI),jr=new He(ho,la);jr.rotation.z=Math.PI,jr.position.set(0,.68,2.34),Zt.add(jr);const dl=new On(.09,.09,.03,16),da=new Yt({color:9741240,metalness:.95,roughness:.1}),Wr=new He(dl,da);Wr.rotation.x=Math.PI/2,Wr.position.set(0,.72,2.36),Zt.add(Wr);const fa=new He(new Pt(.34,.14,.1),Le);fa.position.set(-.76,.82,2.25),fa.rotation.y=-Math.PI/10,Zt.add(fa);const Dn=new He(new Pt(.34,.14,.1),Le);Dn.position.set(.76,.82,2.25),Dn.rotation.y=Math.PI/10,Zt.add(Dn);const Xr=new Pt(1.68,.62,2.4),Cs=new He(Xr,Zi);Cs.position.set(0,1.25,-.2),Cs.castShadow=!0,Zt.add(Cs);const Ns=new Pt(1.72,.06,2.45),po=new He(Ns,Ui);po.position.set(0,1.57,-.2),po.castShadow=!0,Zt.add(po);const mo=new Pt(1.74,.06,.32),ha=new He(mo,Ui);ha.position.set(0,1.61,-1.5),Zt.add(ha);const Ps=new Pt(.48,.22,.04),pa=new Yt({color:16777215,roughness:.3}),go=new He(Ps,pa);go.position.set(0,.44,2.34),Zt.add(go);const uu=new Zc(.12,.18,16),du=new Qa({color:15680580,side:Li,transparent:!0,opacity:.95}),fl=new He(uu,du);fl.position.set(.18,.48,2.37),Zt.add(fl);const ma=new On(.06,.06,.16,16),hl=new Yt({color:14870768,metalness:.95,roughness:.1}),xo=new He(ma,hl);xo.rotation.x=Math.PI/2,xo.position.set(-.62,.34,-2.32),Zt.add(xo);const vo=new He(ma,hl);vo.rotation.x=Math.PI/2,vo.position.set(.62,.34,-2.32),Zt.add(vo),Oe.add(Zt),x.current=Zt;const Fi=new ti,Yr=(wt,Wt,rn,Ut,Zn=16096779)=>{const Qt=new ti;Qt.position.set(Wt,rn,Ut),Qt.userData={hotspotId:wt};const gi=new wh(.12,16,16),kn=new Qa({color:Zn}),Ds=new He(gi,kn);Qt.add(Ds);const Is=new Zc(.16,.24,16),ki=new Qa({color:Zn,side:Li,transparent:!0,opacity:.75}),er=new He(Is,ki);return er.rotation.x=-Math.PI/2,Qt.add(er),Qt};Fi.add(Yr("zr2-oil",-3.8,1.5,1.7,15680580)),Fi.add(Yr("zr2-rtt",-3.8,2.2,-1.6,1096065)),Fi.add(Yr("zr2-dssv",-4.8,.75,1.55,16096779)),Fi.add(Yr("murano-tabs",3.8,.65,2.45,15680580)),Fi.add(Yr("murano-oil",3.8,1.25,1.45,3718648)),Fi.add(Yr("murano-cvt",3.8,.55,.2,16096779)),Oe.add(Fi),b.current=Fi;const Ls=new vy,_o=new mt,pl=wt=>{if(wt.target.closest(".tactical-hud-overlay"))return;const Wt=qe.domElement.getBoundingClientRect();_o.x=(wt.clientX-Wt.left)/Wt.width*2-1,_o.y=-((wt.clientY-Wt.top)/Wt.height)*2+1,Ls.setFromCamera(_o,Be);const rn=Ls.intersectObjects(Fi.children,!0);if(rn.length>0){let Qt=rn[0].object;for(;Qt.parent&&!Qt.userData.hotspotId;)Qt=Qt.parent;if(Qt.userData&&Qt.userData.hotspotId){Se("ratchet"),we(Qt.userData.hotspotId);return}}if(Ls.intersectObjects(Ct.children,!0).length>0){Ze("zr2");return}if(Ls.intersectObjects(Zt.children,!0).length>0){Ze("murano");return}};window.addEventListener("pointerdown",pl);const ml=()=>{if(!Ie||!qe||!Be)return;const wt=Ie.clientWidth||window.innerWidth,Wt=Ie.clientHeight||window.innerHeight;Be.aspect=wt/Wt,Be.updateProjectionMatrix(),qe.setSize(wt,Wt)};window.addEventListener("resize",ml);let gl=new _y;const ga=()=>{w.current=requestAnimationFrame(ga),gl.getDelta();const wt=gl.getElapsedTime();Be.position.lerp(N.current,.05),xt.target.lerp(O.current,.05),Z?(xt.autoRotate=!0,xt.autoRotateSpeed=1.2):xt.autoRotate=!1,xt.update(),b.current&&b.current.children.forEach((Wt,rn)=>{const Ut=1+.25*Math.sin(wt*4+rn);Wt.scale.set(Ut,Ut,Ut)}),qe.render(Oe,Be)};return ga(),()=>{w.current&&cancelAnimationFrame(w.current),window.removeEventListener("pointerdown",pl),window.removeEventListener("resize",ml),qe.domElement&&qe.domElement.parentNode&&qe.domElement.parentNode.removeChild(qe.domElement),qe.dispose()}},[]),De.useEffect(()=>{const Ie=Q/100;let at=16777215,Ae=.65*Ie,Oe=1.8*Ie;V==="highlux"?(at=16777215,Ae=.75*Ie,Oe=2*Ie):V==="warm"?(at=16096779,Ae=.6*Ie,Oe=1.6*Ie):V==="stealth"?(at=61695,Ae=.4*Ie,Oe=1.4*Ie):V==="red"&&(at=15680580,Ae=.5*Ie,Oe=1.8*Ie),P.current&&(P.current.color.setHex(at),P.current.intensity=Ae),L.current&&(L.current.color.setHex(at),L.current.intensity=Oe),B.current&&(B.current.color.setHex(at),B.current.intensity=Oe),R.current&&R.current.children.forEach(Be=>{Be.material&&Be.material.color.setHex(at)})},[V,Q]),De.useEffect(()=>{_.current&&D.current&&z.current&&(F?(_.current.rotation.x=-Math.PI/6,_.current.position.y=.35,D.current.visible=!0,z.current.visible=!0):(_.current.rotation.x=0,_.current.position.y=.09,D.current.visible=!1,z.current.visible=!1))},[F]),u.jsxs("div",{className:"relative w-screen h-screen overflow-hidden bg-black select-none font-sans",children:[u.jsx("div",{ref:m,className:"absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"}),W&&u.jsxs("div",{className:"tactical-hud-overlay pointer-events-none absolute inset-0 flex flex-col justify-between p-3 sm:p-5",children:[u.jsxs("div",{className:"pointer-events-auto flex items-center justify-between flex-wrap gap-2 bg-obsidian-950/85 backdrop-blur-md border border-slate-800/90 rounded-2xl px-4 py-2.5 shadow-2xl",children:[u.jsxs("div",{className:"flex items-center space-x-3",children:[u.jsx("div",{className:"w-3 h-3 rounded-full bg-amber-400 animate-pulse shadow-lg shadow-amber-400/50"}),u.jsxs("div",{children:[u.jsx("span",{className:"font-display font-bold text-xs sm:text-sm tracking-wider text-white",children:"GARAGE & FLEET ASSET COMMAND // 3D CENTRAL BAY"}),u.jsx("span",{className:"hidden md:inline-block ml-3 font-mono text-[10px] text-slate-400",children:"ORBIT 06 • DUAL SHOWROOM & LIVE TELEMETRY"})]})]}),u.jsxs("div",{className:"flex items-center space-x-2 font-mono text-xs",children:[u.jsxs("button",{onClick:()=>{Ze("zr2"),we("zr2-oil")},className:"px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-center space-x-1.5 hover:bg-rose-500/25 transition-colors",children:[u.jsx(rx,{className:"w-3.5 h-3.5 text-rose-400"}),u.jsx("span",{className:"font-bold",children:"ZR2 OIL: 12%"})]}),u.jsxs("button",{onClick:()=>{Ze("murano"),we("murano-tabs")},className:"px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/60 text-rose-300 font-bold flex items-center space-x-1.5 animate-pulse hover:bg-rose-500/30 transition-colors",children:[u.jsx(eu,{className:"w-3.5 h-3.5 text-rose-400"}),u.jsx("span",{children:"MURANO TABS: 14d!"})]}),u.jsx("button",{onClick:()=>$e(!Ve),className:"p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white",title:"Toggle Mechanical SFX",children:Ve?u.jsx(Cx,{className:"w-3.5 h-3.5"}):u.jsx(Px,{className:"w-3.5 h-3.5 text-slate-600"})}),u.jsxs("button",{onClick:()=>ee(!1),className:"px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold hover:bg-amber-500/30 transition-colors flex items-center space-x-1",title:"Hide All UI for 100% Fullscreen 3D View",children:[u.jsx(KE,{className:"w-3.5 h-3.5"}),u.jsx("span",{className:"hidden sm:inline",children:"HIDE HUD"})]})]})]}),u.jsxs("div",{className:"pointer-events-auto self-end flex flex-col space-y-2 mt-2 bg-obsidian-950/85 backdrop-blur-md border border-slate-800/90 rounded-2xl p-2.5 shadow-2xl font-mono text-xs max-w-xs",children:[u.jsxs("div",{className:"flex items-center justify-between text-[11px] text-slate-400 px-1 font-bold",children:[u.jsx("span",{children:"3D CAMERA SELECTOR"}),u.jsx(YE,{className:"w-3.5 h-3.5 text-amber-400"})]}),u.jsxs("div",{className:"grid grid-cols-3 gap-1",children:[u.jsx("button",{onClick:()=>Ze("dual"),className:`px-2 py-1.5 rounded-lg font-bold text-[10px] transition-all ${I==="dual"?"bg-amber-500 text-obsidian-950 shadow-md":"bg-slate-900 text-slate-400 hover:text-white border border-slate-800"}`,children:"🏬 DUAL BAY"}),u.jsx("button",{onClick:()=>Ze("zr2"),className:`px-2 py-1.5 rounded-lg font-bold text-[10px] transition-all ${I==="zr2"?"bg-amber-500 text-obsidian-950 shadow-md":"bg-slate-900 text-slate-400 hover:text-white border border-slate-800"}`,children:"🛻 BAY 1: ZR2"}),u.jsx("button",{onClick:()=>Ze("murano"),className:`px-2 py-1.5 rounded-lg font-bold text-[10px] transition-all ${I==="murano"?"bg-amber-500 text-obsidian-950 shadow-md":"bg-slate-900 text-slate-400 hover:text-white border border-slate-800"}`,children:"🚘 BAY 2: MURANO"})]}),u.jsx("button",{onClick:()=>{Se("tent"),ce(!F)},className:`w-full py-1.5 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center space-x-1.5 ${F?"bg-emerald-500 text-obsidian-950 shadow-lg shadow-emerald-500/20":"bg-slate-900 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10"}`,children:u.jsx("span",{children:F?"⛺ STOW ROOFTOP TENT":"⛺ POP ROOFTOP TENT"})}),u.jsxs("button",{onClick:()=>{Se("camera"),J(!Z)},className:`w-full py-1.5 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center space-x-1.5 ${Z?"bg-amber-500 text-obsidian-950 shadow-lg shadow-amber-500/20":"bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"}`,children:[u.jsx(lh,{className:`w-3.5 h-3.5 ${Z?"animate-spin":""}`}),u.jsx("span",{children:Z?"AUTO-ORBIT: ACTIVE":"AUTO-ORBIT: OFF"})]}),u.jsxs("div",{className:"pt-1 border-t border-slate-800 flex items-center justify-between",children:[u.jsx("span",{className:"text-[10px] text-slate-400",children:"HONEYCOMB LEDS:"}),u.jsxs("div",{className:"flex items-center space-x-1",children:[u.jsx("button",{onClick:()=>{Se("relay"),Y("highlux")},title:"6500K Pure White Showroom Detailing",className:`p-1 rounded ${V==="highlux"?"bg-white text-black":"text-slate-500 hover:text-white"}`,children:u.jsx(wx,{className:"w-3.5 h-3.5"})}),u.jsx("button",{onClick:()=>{Se("relay"),Y("warm")},title:"3500K Warm Shop Amber",className:`p-1 rounded ${V==="warm"?"bg-amber-500 text-black":"text-slate-500 hover:text-white"}`,children:u.jsx(cx,{className:"w-3.5 h-3.5"})}),u.jsx("button",{onClick:()=>{Se("relay"),Y("stealth")},title:"Tactical Stealth Cyan",className:`p-1 rounded ${V==="stealth"?"bg-cyan-500 text-black":"text-slate-500 hover:text-white"}`,children:u.jsx(fx,{className:"w-3.5 h-3.5"})}),u.jsx("button",{onClick:()=>{Se("relay"),Y("red")},title:"Emergency Red Alert",className:`p-1 rounded ${V==="red"?"bg-rose-500 text-black":"text-slate-500 hover:text-white"}`,children:u.jsx(eu,{className:"w-3.5 h-3.5"})})]})]}),u.jsxs("div",{className:"flex items-center space-x-2 pt-1 text-[10px]",children:[u.jsx(Qc,{className:"w-3 h-3 text-slate-400"}),u.jsx("input",{type:"range",min:"30",max:"150",value:Q,onChange:Ie=>G(Number(Ie.target.value)),className:"w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"}),u.jsxs("span",{className:"text-amber-300 font-bold w-6 text-right",children:[Q,"%"]})]})]}),u.jsxs("div",{className:"pointer-events-auto flex items-center justify-between flex-wrap gap-2 bg-obsidian-950/85 backdrop-blur-md border border-slate-800/90 rounded-2xl px-4 py-3 shadow-2xl font-mono text-xs",children:[u.jsxs("div",{className:"flex items-center space-x-2 flex-wrap",children:[u.jsxs("button",{onClick:p,className:"px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 hover:text-white text-slate-300 font-bold flex items-center space-x-1.5 transition-all",children:[u.jsx(Qc,{className:"w-3.5 h-3.5 text-amber-400"}),u.jsx("span",{children:"FLEET TELEMETRY"})]}),u.jsxs("button",{onClick:d,className:"px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-400 hover:text-white text-slate-300 font-bold flex items-center space-x-1.5 transition-all",children:[u.jsx(Nh,{className:"w-3.5 h-3.5 text-sky-400"}),u.jsx("span",{children:"STATUTORY & WA TABS"})]}),u.jsxs("button",{onClick:h,className:"px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-400 hover:text-white text-slate-300 font-bold flex items-center space-x-1.5 transition-all",children:[u.jsx(ra,{className:"w-3.5 h-3.5 text-emerald-400"}),u.jsx("span",{children:"SERVICE VAULT"})]})]}),u.jsx("button",{onClick:()=>r(null),className:"px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold shadow-lg shadow-amber-500/20 flex items-center space-x-1.5 transition-all",children:u.jsx("span",{children:"+ LOG SERVICE RECORD"})})]})]}),!W&&u.jsxs("button",{onClick:()=>ee(!0),className:"absolute top-4 right-4 z-50 px-3.5 py-2 rounded-xl bg-obsidian-950/90 backdrop-blur-md border border-amber-500/50 text-amber-300 font-mono text-xs font-bold shadow-2xl flex items-center space-x-2 hover:bg-amber-500 hover:text-black transition-all",children:[u.jsx($E,{className:"w-4 h-4"}),u.jsx("span",{children:"SHOW HUD"})]}),xe&&u.jsx("div",{className:"absolute bottom-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 pointer-events-auto font-mono text-xs",children:u.jsxs("div",{className:"bg-obsidian-950/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-4 shadow-2xl animate-fadeIn",children:[u.jsxs("div",{className:"flex items-start justify-between",children:[u.jsxs("div",{className:"flex items-start space-x-3",children:[u.jsx("div",{className:"p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400",children:u.jsx(ra,{className:"w-5 h-5"})}),u.jsxs("div",{children:[xe==="zr2-oil"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-rose-400 block font-bold text-sm",children:"2021 COLORADO ZR2: OIL DECAY ALERT (12% REMAINING)"}),u.jsx("p",{className:"text-slate-300 text-xs mt-1",children:"Mobil 1 5W-30 dexos1 Gen 3 (6.0 qts) & ACDelco PF63 oil filter change required within 450 mi."})]}),xe==="zr2-rtt"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-emerald-400 block font-bold text-sm",children:"2021 COLORADO ZR2: CBI BED BARS & ROOFTOP TENT"}),u.jsxs("p",{className:"text-slate-300 text-xs mt-1",children:["Heavy-duty tubular steel bed rack bolted to bed rails. Clamshell RTT is currently ",F?"DEPLOYED (Camp Ready)":"STOWED (Aerodynamic Road Mode)","."]})]}),xe==="zr2-dssv"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-amber-400 block font-bold text-sm",children:"2021 COLORADO ZR2: MULTIMATIC DSSV DAMPER INTEGRITY"}),u.jsx("p",{className:"text-slate-300 text-xs mt-1",children:"Spool-valve nitrogen seals, front coilover shafts, and rear piggyback reservoirs nominal. Check high-pressure nitrogen charge every 50k mi."})]}),xe==="murano-tabs"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-rose-400 block font-bold text-sm",children:"2021 NISSAN MURANO: WA DOL TABS EXPIRE IN 14 DAYS! (RCW 46.16A)"}),u.jsx("p",{className:"text-slate-300 text-xs mt-1",children:"Plate CDE4108 tabs expire on Nov 2, 2026. Renew immediately via Washington License eXpress to avoid state penalties."})]}),xe==="murano-oil"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-sky-400 block font-bold text-sm",children:"2021 NISSAN MURANO: 0W-20 FULL SYNTHETIC OIL LIFE (48%)"}),u.jsx("p",{className:"text-slate-300 text-xs mt-1",children:"Mobil 1 Advanced Fuel Economy 0W-20 (5.1 qts) and Nissan OEM 15208-65F0E filter. Next oil service due in 3,250 mi."})]}),xe==="murano-cvt"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-amber-400 block font-bold text-sm",children:"2021 NISSAN MURANO: XTRONIC CVT FLUID DEGRADATION MONITOR"}),u.jsx("p",{className:"text-slate-300 text-xs mt-1",children:"Strictly OEM Genuine Nissan NS-3 CVT Fluid only. Prevents high-torque push-belt wear. Inspection interval: 30,000 mi."})]})]})]}),u.jsx("button",{onClick:()=>we(null),className:"p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white",children:u.jsx(ou,{className:"w-4 h-4"})})]}),u.jsxs("div",{className:"flex items-center justify-end space-x-2 mt-3 pt-3 border-t border-slate-800",children:[xe==="murano-tabs"?u.jsxs("a",{href:"https://www.dol.wa.gov/vehiclerob/renew-tabs",target:"_blank",rel:"noopener noreferrer",className:"px-4 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold flex items-center space-x-1.5 shadow-lg",children:[u.jsx("span",{children:"RENEW WA TABS (DOL eXPRESS)"}),u.jsx(Ch,{className:"w-3.5 h-3.5"})]}):xe==="zr2-rtt"?u.jsx("button",{onClick:()=>{Se("tent"),ce(!F)},className:"px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-obsidian-950 font-bold shadow-lg",children:F?"STOW ROOFTOP TENT":"POP ROOFTOP TENT"}):u.jsx("button",{onClick:()=>{r({vehicleId:xe.startsWith("zr2")?"colorado-zr2":"murano-midnight",title:xe.includes("oil")?"Full Synthetic Oil Change":"Preventative Inspection"}),we(null)},className:"px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold shadow-lg",children:"LOG THIS SERVICE"}),u.jsx("button",{onClick:()=>we(null),className:"px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300",children:"CLOSE"})]})]})})]})}function sw({vehicles:s,activeVehicleId:e,onSelectVehicle:t,onOpenLogModal:r,onResetOilLife:o,onRotateTires:l}){const[d,h]=De.useState("highlux"),[p,m]=De.useState(100),[y,S]=De.useState(!1),[v,M]=De.useState(null),[w,C]=De.useState(!0),[x,_]=De.useState("garage"),[D,z]=De.useState("photo"),R=s.find(F=>F.id==="colorado-zr2")||s[0],P=s.find(F=>F.id==="murano-midnight")||s[1],L=ao(R),B=ao(P);sa(R.compliance.tabsExpiryDate);const b=sa(P.compliance.tabsExpiryDate),N=lu(R),O=F=>{if(!(!w||typeof window>"u"))try{const ce=new(window.AudioContext||window.webkitAudioContext),Z=ce.createOscillator(),J=ce.createGain();Z.connect(J),J.connect(ce.destination);const W=ce.currentTime;F==="relay"?(Z.type="square",Z.frequency.setValueAtTime(140,W),Z.frequency.exponentialRampToValueAtTime(40,W+.08),J.gain.setValueAtTime(.25,W),J.gain.exponentialRampToValueAtTime(.01,W+.08),Z.start(W),Z.stop(W+.08)):F==="ratchet"?(Z.type="triangle",Z.frequency.setValueAtTime(850,W),Z.frequency.setValueAtTime(1300,W+.02),J.gain.setValueAtTime(.2,W),J.gain.exponentialRampToValueAtTime(.01,W+.05),Z.start(W),Z.stop(W+.05)):F==="tent"?(Z.type="sine",Z.frequency.setValueAtTime(340,W),Z.frequency.exponentialRampToValueAtTime(160,W+.25),J.gain.setValueAtTime(.22,W),J.gain.exponentialRampToValueAtTime(.01,W+.25),Z.start(W),Z.stop(W+.25)):F==="toggle"&&(Z.type="sine",Z.frequency.setValueAtTime(600,W),J.gain.setValueAtTime(.12,W),J.gain.exponentialRampToValueAtTime(.01,W+.04),Z.start(W),Z.stop(W+.04))}catch{}},V=F=>{O("relay"),h(F)},Y=F=>{F.stopPropagation(),O("tent"),S(!y)},Q=()=>{const F=p/100;return d==="highlux"?`brightness(${F*1.05}) contrast(1.12) saturate(1.02)`:d==="warm"?`brightness(${F*.98}) contrast(1.1) sepia(0.24) hue-rotate(-12deg)`:d==="stealth"?`brightness(${F*.72}) contrast(1.22) hue-rotate(185deg) saturate(0.85)`:d==="red"?`brightness(${F*.85}) contrast(1.25) sepia(0.35) hue-rotate(320deg)`:`brightness(${F})`},G=()=>d==="highlux"?"#ffffff":d==="warm"?"#fbbf24":d==="stealth"?"#38bdf8":d==="red"?"#ef4444":"#ffffff";return u.jsxs("div",{className:"relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-obsidian-950 shadow-2xl transition-all duration-500 font-sans",children:[u.jsxs("div",{className:"relative w-full h-32 sm:h-36 overflow-hidden bg-gradient-to-b from-black via-obsidian-950 to-obsidian-900 border-b border-slate-800/90",children:[u.jsx("div",{className:"absolute inset-0 transition-opacity duration-700",style:{opacity:p/100*(d==="stealth"?.45:.92)},children:u.jsxs("svg",{className:"w-full h-full",xmlns:"http://www.w3.org/2000/svg",children:[u.jsxs("defs",{children:[u.jsxs("pattern",{id:"realistic-honeycomb",width:"64",height:"110",patternUnits:"userSpaceOnUse",patternTransform:"scale(0.8)",children:[u.jsx("path",{d:"M32 0 L64 18.5 L64 55.5 L32 74 L0 55.5 L0 18.5 Z M32 55.5 L64 74 L64 111 L32 129.5 L0 111 L0 74 Z",fill:"none",stroke:G(),strokeWidth:"2.8",strokeLinecap:"round",strokeLinejoin:"round",className:"transition-colors duration-500"}),u.jsx("path",{d:"M32 0 L64 18.5 L64 55.5 L32 74 L0 55.5 L0 18.5 Z M32 55.5 L64 74 L64 111 L32 129.5 L0 111 L0 74 Z",fill:"none",stroke:"#ffffff",strokeWidth:"1.2",opacity:"0.9"}),u.jsx("circle",{cx:"32",cy:"18.5",r:"2",fill:G()}),u.jsx("circle",{cx:"32",cy:"74",r:"2",fill:G()}),u.jsx("circle",{cx:"64",cy:"55.5",r:"2",fill:G()})]}),u.jsxs("filter",{id:"honeycomb-bloom",x:"-30%",y:"-30%",width:"160%",height:"160%",children:[u.jsx("feGaussianBlur",{stdDeviation:d==="highlux"?"4":"2.5",result:"blur"}),u.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),u.jsx("rect",{width:"100%",height:"100%",fill:"url(#realistic-honeycomb)",filter:"url(#honeycomb-bloom)"})]})}),u.jsx("div",{className:`absolute inset-0 pointer-events-none transition-all duration-700 ${d==="highlux"?"bg-gradient-to-b from-white/15 via-white/5 to-transparent":d==="warm"?"bg-gradient-to-b from-amber-500/20 via-orange-500/5 to-transparent":d==="red"?"bg-gradient-to-b from-rose-500/20 via-red-500/5 to-transparent":"bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent"}`,style:{opacity:p/100}}),u.jsxs("div",{className:"relative z-10 flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 h-full font-mono gap-2",children:[u.jsxs("div",{children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx("span",{className:"text-xs px-2.5 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40",children:"REALISTIC FLEET GARAGE // STAGE 01"}),u.jsxs("span",{className:"hidden sm:inline-flex items-center space-x-1.5 text-[11px] text-slate-300",children:[u.jsx("span",{className:"w-2 h-2 rounded-full bg-emerald-400 animate-pulse"}),u.jsx("span",{children:"6500K MODULAR LED GRID"})]})]}),u.jsx("p",{className:"text-[11px] text-slate-400 mt-1",children:"Bay 01: 2021 Colorado ZR2 (CBI Bed Bars & RTT) • Bay 02: 2021 Murano Midnight (WA Tabs Due)"})]}),u.jsxs("div",{className:"flex items-center space-x-3 self-end sm:self-auto flex-wrap gap-y-2",children:[u.jsxs("div",{className:"hidden md:flex items-center space-x-1.5 bg-black/70 px-2.5 py-1 rounded-lg border border-slate-800 text-[10px]",children:[u.jsx(Qc,{className:"w-3 h-3 text-slate-400"}),u.jsx("span",{className:"text-slate-400",children:"DIMMER:"}),u.jsx("input",{type:"range",min:"30",max:"120",value:p,onChange:F=>m(Number(F.target.value)),className:"w-16 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"}),u.jsxs("span",{className:"text-amber-300 font-bold w-7 text-right",children:[p,"%"]})]}),u.jsxs("div",{className:"flex items-center bg-black/80 p-1 rounded-lg border border-slate-700/80 shadow-inner",children:[u.jsxs("button",{onClick:()=>V("highlux"),title:"6500K Pure White Showroom Detailing Lights",className:`px-2.5 py-1 rounded text-[10px] font-bold transition-all flex items-center space-x-1 ${d==="highlux"?"bg-white text-black shadow-md":"text-slate-400 hover:text-white"}`,children:[u.jsx(wx,{className:"w-3 h-3"}),u.jsx("span",{children:"HIGH LUX"})]}),u.jsxs("button",{onClick:()=>V("warm"),title:"3500K Warm Shop Amber Incandescent",className:`px-2.5 py-1 rounded text-[10px] font-bold transition-all flex items-center space-x-1 ${d==="warm"?"bg-amber-500 text-black shadow-md":"text-slate-400 hover:text-white"}`,children:[u.jsx(cx,{className:"w-3 h-3"}),u.jsx("span",{children:"WARM SHOP"})]}),u.jsxs("button",{onClick:()=>V("stealth"),title:"Night Stealth Blue / Ambient",className:`px-2.5 py-1 rounded text-[10px] font-bold transition-all flex items-center space-x-1 ${d==="stealth"?"bg-sky-500 text-black shadow-md":"text-slate-400 hover:text-white"}`,children:[u.jsx(fx,{className:"w-3 h-3"}),u.jsx("span",{children:"STEALTH"})]})]}),u.jsx("button",{onClick:()=>C(!w),title:"Toggle Mechanical Sound Effects",className:"p-1.5 rounded-lg bg-black/70 border border-slate-700 text-slate-400 hover:text-amber-400 transition-colors",children:w?u.jsx(Cx,{className:"w-3.5 h-3.5"}):u.jsx(Px,{className:"w-3.5 h-3.5 text-slate-600"})})]})]})]}),u.jsxs("div",{className:"relative p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-obsidian-950 via-slate-950 to-black overflow-hidden select-none",children:[u.jsxs("div",{className:"absolute inset-x-0 top-0 h-44 opacity-20 pointer-events-none flex justify-between px-6",children:[u.jsxs("div",{className:"w-56 h-36 border-2 border-slate-700/60 rounded-t-lg bg-obsidian-900/90 flex flex-col p-2 space-y-1",children:[u.jsx("div",{className:"h-4 bg-slate-800 rounded border border-slate-700 flex items-center px-2",children:u.jsx("div",{className:"w-16 h-1 bg-amber-500/90 rounded"})}),u.jsx("div",{className:"h-4 bg-slate-800 rounded border border-slate-700 flex items-center px-2",children:u.jsx("div",{className:"w-16 h-1 bg-amber-500/90 rounded"})}),u.jsx("div",{className:"h-4 bg-slate-800 rounded border border-slate-700 flex items-center px-2",children:u.jsx("div",{className:"w-16 h-1 bg-amber-500/90 rounded"})}),u.jsx("div",{className:"h-4 bg-slate-800 rounded border border-slate-700 flex items-center px-2",children:u.jsx("div",{className:"w-16 h-1 bg-amber-500/90 rounded"})}),u.jsx("div",{className:"h-10 bg-slate-800/90 rounded border border-slate-700 flex items-center justify-center",children:u.jsx("span",{className:"text-[8px] font-mono text-slate-500 tracking-wider",children:"MODULAR STORAGE // MILWAUKEE STEEL"})})]}),u.jsxs("div",{className:"hidden lg:flex flex-col items-center justify-center p-3 border border-amber-500/30 rounded-lg bg-black/60 shadow-lg h-24",children:[u.jsx("span",{className:"text-[11px] font-mono font-bold text-amber-400 tracking-widest",children:"ANTIGRAVITY FLEET COMMAND"}),u.jsx("span",{className:"text-[9px] font-mono text-slate-400",children:"OVERLAND RIG & EXECUTIVE CROSSOVER // WA"})]}),u.jsxs("div",{className:"w-56 h-36 border-2 border-slate-700/60 rounded-t-lg bg-obsidian-900/90 flex flex-col p-2 space-y-1",children:[u.jsx("div",{className:"h-4 bg-slate-800 rounded border border-slate-700 flex items-center px-2",children:u.jsx("div",{className:"w-16 h-1 bg-sky-500/90 rounded"})}),u.jsx("div",{className:"h-4 bg-slate-800 rounded border border-slate-700 flex items-center px-2",children:u.jsx("div",{className:"w-16 h-1 bg-sky-500/90 rounded"})}),u.jsx("div",{className:"h-4 bg-slate-800 rounded border border-slate-700 flex items-center px-2",children:u.jsx("div",{className:"w-16 h-1 bg-sky-500/90 rounded"})}),u.jsx("div",{className:"h-14 bg-slate-800/90 rounded border border-slate-700 flex items-center justify-center",children:u.jsx("span",{className:"text-[8px] font-mono text-slate-500 tracking-wider",children:"FLUIDS & DIAGNOSTIC TERMINAL"})})]})]}),u.jsx("div",{className:"absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-900/50 via-slate-950/30 to-transparent pointer-events-none border-t border-slate-800/50"}),u.jsxs("div",{className:"relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-end",children:[u.jsxs("div",{onClick:()=>t("colorado-zr2"),className:`group relative rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer overflow-hidden ${e==="colorado-zr2"?"bg-obsidian-900/90 border-amber-500/80 shadow-2xl shadow-amber-500/20":"bg-obsidian-950/70 border-slate-800/80 hover:border-slate-700"}`,children:[u.jsxs("div",{className:"flex items-center justify-between mb-3 font-mono text-xs",children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-amber-400 beacon-pulse"}),u.jsx("span",{className:"font-bold text-amber-400",children:"BAY 01 // OVERLAND EXPEDITION RIG"})]}),u.jsxs("div",{className:"flex items-center bg-black/80 rounded-md p-0.5 border border-slate-700",children:[u.jsx("button",{type:"button",onClick:F=>{F.stopPropagation(),O("toggle"),_("garage")},className:`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${x==="garage"?"bg-amber-500 text-black shadow-sm":"text-slate-400 hover:text-white"}`,children:"📸 3/4 HERO"}),u.jsx("button",{type:"button",onClick:F=>{F.stopPropagation(),O("toggle"),_("overland")},className:`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${x==="overland"?"bg-amber-500 text-black shadow-sm":"text-slate-400 hover:text-white"}`,children:"⛺ RIG PROFILE"}),u.jsx("button",{type:"button",onClick:F=>{F.stopPropagation(),O("toggle"),_("blueprint")},className:`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${x==="blueprint"?"bg-amber-500 text-black shadow-sm":"text-slate-400 hover:text-white"}`,children:"📐 BLUEPRINT"})]})]}),u.jsxs("div",{className:"flex items-baseline justify-between mb-3",children:[u.jsxs("div",{children:[u.jsx("h3",{className:"text-lg sm:text-xl font-bold font-display text-white tracking-wide",children:"2021 CHEVY COLORADO ZR2"}),u.jsx("span",{className:"text-[11px] font-mono text-amber-300/80",children:"Overland Blackout Edition • Multimatic DSSV"})]}),u.jsxs("span",{className:"text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700",children:[R.currentMileage.toLocaleString()," mi"]})]}),x==="garage"?u.jsxs("div",{className:"relative w-full h-64 sm:h-80 flex items-center justify-center my-2 overflow-hidden rounded-xl bg-gradient-to-b from-black via-slate-950 to-black border border-slate-800/80 shadow-2xl group/truck",children:[u.jsx("img",{src:"./images/zr2_garage_front.jpg",onError:F=>{F.target.dataset.tried||(F.target.dataset.tried="1",F.target.src="/dashboards/garage/images/zr2_garage_front.jpg")},alt:"2021 Chevrolet Colorado ZR2 in Honeycomb LED Garage",className:"w-full h-full object-contain object-center transition-all duration-700",style:{filter:Q()}}),u.jsx("div",{className:"absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-700",style:{opacity:d==="stealth"?.35:p/100*.9},children:u.jsxs("svg",{className:"w-full h-full",viewBox:"0 0 600 400",preserveAspectRatio:"none",children:[u.jsx("defs",{children:u.jsxs("radialGradient",{id:"hood-glare-zr2",cx:"50%",cy:"30%",r:"45%",children:[u.jsx("stop",{offset:"0%",stopColor:G(),stopOpacity:"0.75"}),u.jsx("stop",{offset:"50%",stopColor:G(),stopOpacity:"0.25"}),u.jsx("stop",{offset:"100%",stopColor:"transparent",stopOpacity:"0"})]})}),u.jsx("ellipse",{cx:"295",cy:"130",rx:"190",ry:"70",fill:"url(#hood-glare-zr2)"})]})}),u.jsx("div",{className:"absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("ratchet"),M("zr2-oil")},className:"absolute top-[42%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsxs("span",{className:"relative flex h-6 w-6 items-center justify-center",children:[u.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"}),u.jsx("span",{className:"relative inline-flex rounded-full h-4 w-4 bg-rose-600 border-2 border-white shadow-lg"})]}),u.jsx("span",{className:"absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/90 border border-rose-500 text-rose-300 font-mono text-[9px] font-bold shadow-xl opacity-90 group-hover/pin:opacity-100 transition-opacity",children:"OIL 12% // DUE"})]}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("ratchet"),M("zr2-dssv")},className:"absolute top-[72%] left-[43%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsx("span",{className:"relative flex h-5 w-5 items-center justify-center",children:u.jsx("span",{className:"relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-white shadow-lg"})}),u.jsx("span",{className:"absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 border border-amber-500 text-amber-300 font-mono text-[8px] font-bold opacity-80 group-hover/pin:opacity-100 transition-opacity",children:"DSSV & SKID"})]}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("ratchet"),M("zr2-tires")},className:"absolute top-[68%] left-[72%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsx("span",{className:"relative flex h-5 w-5 items-center justify-center",children:u.jsx("span",{className:"relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500 border border-white shadow-lg"})}),u.jsx("span",{className:"absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 border border-sky-500 text-sky-300 font-mono text-[8px] font-bold opacity-80 group-hover/pin:opacity-100 transition-opacity",children:"5-TIRE (450 mi)"})]}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("tent"),M("zr2-cbi")},className:"absolute top-[28%] left-[84%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsx("span",{className:"relative flex h-5 w-5 items-center justify-center",children:u.jsx("span",{className:"relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white shadow-lg"})}),u.jsx("span",{className:"absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 border border-emerald-500 text-emerald-300 font-mono text-[8px] font-bold opacity-80 group-hover/pin:opacity-100 transition-opacity",children:"CBI BARS & RTT"})]})]}):x==="overland"?u.jsxs("div",{className:"relative w-full h-64 sm:h-80 flex items-center justify-center my-2 overflow-hidden rounded-xl bg-gradient-to-b from-black via-slate-950 to-black border border-slate-800/80 shadow-2xl group/truck",children:[u.jsx("img",{src:"./images/zr2_overland_side.jpg",onError:F=>{F.target.dataset.tried||(F.target.dataset.tried="1",F.target.src="/dashboards/garage/images/zr2_overland_side.jpg")},alt:"2021 Chevrolet Colorado ZR2 Overland Rig Profile with CBI Bed Rack and RTT",className:"w-full h-full object-contain object-center transition-all duration-700",style:{filter:Q()}}),u.jsx("div",{className:"absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-700",style:{opacity:d==="stealth"?.3:p/100*.75},children:u.jsx("div",{className:"absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/15 via-white/5 to-transparent"})}),u.jsx("div",{className:"absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("tent"),M("zr2-cbi")},className:"absolute top-[28%] left-[72%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsxs("span",{className:"relative flex h-6 w-6 items-center justify-center",children:[u.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),u.jsx("span",{className:"relative inline-flex rounded-full h-4 w-4 bg-emerald-600 border-2 border-white shadow-lg"})]}),u.jsx("span",{className:"absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/90 border border-emerald-500 text-emerald-300 font-mono text-[9px] font-bold shadow-xl opacity-90 group-hover/pin:opacity-100 transition-opacity",children:"⛺ CBI BARS & RTT"})]}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("ratchet"),M("zr2-tires")},className:"absolute top-[70%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsx("span",{className:"relative flex h-5 w-5 items-center justify-center",children:u.jsx("span",{className:"relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500 border border-white shadow-lg"})}),u.jsx("span",{className:"absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 border border-sky-500 text-sky-300 font-mono text-[8px] font-bold opacity-80 group-hover/pin:opacity-100 transition-opacity",children:'31" WRANGLER (450mi)'})]}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("ratchet"),M("zr2-dssv")},className:"absolute top-[70%] left-[78%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsx("span",{className:"relative flex h-5 w-5 items-center justify-center",children:u.jsx("span",{className:"relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-white shadow-lg"})}),u.jsx("span",{className:"absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 border border-amber-500 text-amber-300 font-mono text-[8px] font-bold opacity-80 group-hover/pin:opacity-100 transition-opacity",children:"MULTIMATIC DSSV"})]}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("ratchet"),M("zr2-oil")},className:"absolute top-[48%] left-[16%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsxs("span",{className:"relative flex h-5 w-5 items-center justify-center",children:[u.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"}),u.jsx("span",{className:"relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600 border border-white shadow-lg"})]}),u.jsx("span",{className:"absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 border border-rose-500 text-rose-300 font-mono text-[8px] font-bold opacity-80 group-hover/pin:opacity-100 transition-opacity",children:"OIL 12% // DUE"})]})]}):u.jsxs("div",{className:"relative w-full h-64 sm:h-76 flex items-center justify-center my-2",children:[u.jsx("div",{className:"absolute bottom-2 inset-x-6 h-6 rounded-full bg-amber-500/10 blur-xl pointer-events-none"}),u.jsxs("svg",{viewBox:"0 0 540 280",className:"w-full h-full drop-shadow-2xl",children:[u.jsxs("defs",{children:[u.jsxs("linearGradient",{id:"zr2-black-paint-v2",x1:"0%",y1:"0%",x2:"100%",y2:"50%",children:[u.jsx("stop",{offset:"0%",stopColor:"#1e293b"}),u.jsx("stop",{offset:"35%",stopColor:"#0f172a"}),u.jsx("stop",{offset:"70%",stopColor:"#020617"}),u.jsx("stop",{offset:"100%",stopColor:"#0f172a"})]}),u.jsxs("linearGradient",{id:"window-tint-dark-v2",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[u.jsx("stop",{offset:"0%",stopColor:"#020617",stopOpacity:"0.95"}),u.jsx("stop",{offset:"100%",stopColor:"#0f172a",stopOpacity:"0.85"})]}),u.jsxs("radialGradient",{id:"tire-rubber-v2",cx:"50%",cy:"50%",r:"50%",children:[u.jsx("stop",{offset:"60%",stopColor:"#111827"}),u.jsx("stop",{offset:"85%",stopColor:"#1f2937"}),u.jsx("stop",{offset:"100%",stopColor:"#030712"})]}),u.jsxs("linearGradient",{id:"multimatic-gold-v2",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[u.jsx("stop",{offset:"0%",stopColor:"#f59e0b"}),u.jsx("stop",{offset:"50%",stopColor:"#fbbf24"}),u.jsx("stop",{offset:"100%",stopColor:"#d97706"})]})]}),u.jsxs("g",{id:"cbi-bed-rack-and-tent",children:[u.jsx("line",{x1:"312",y1:"156",x2:"315",y2:"112",stroke:"#475569",strokeWidth:"6",strokeLinecap:"round"}),u.jsx("line",{x1:"312",y1:"156",x2:"315",y2:"112",stroke:"#0f172a",strokeWidth:"3",strokeLinecap:"round"}),u.jsx("line",{x1:"380",y1:"156",x2:"380",y2:"112",stroke:"#475569",strokeWidth:"6",strokeLinecap:"round"}),u.jsx("line",{x1:"380",y1:"156",x2:"380",y2:"112",stroke:"#0f172a",strokeWidth:"3",strokeLinecap:"round"}),u.jsx("line",{x1:"448",y1:"156",x2:"445",y2:"112",stroke:"#475569",strokeWidth:"6",strokeLinecap:"round"}),u.jsx("line",{x1:"448",y1:"156",x2:"445",y2:"112",stroke:"#0f172a",strokeWidth:"3",strokeLinecap:"round"}),u.jsx("rect",{x:"302",y:"108",width:"154",height:"6",rx:"2",fill:"#1e293b",stroke:"#475569",strokeWidth:"1.2"}),u.jsx("rect",{x:"324",y:"126",width:"108",height:"20",rx:"3",fill:"#0b1120",stroke:"#334155",strokeWidth:"1.4"}),u.jsx("line",{x1:"334",y1:"136",x2:"354",y2:"136",stroke:"#475569",strokeWidth:"2.5",strokeLinecap:"round"}),u.jsx("line",{x1:"364",y1:"136",x2:"384",y2:"136",stroke:"#475569",strokeWidth:"2.5",strokeLinecap:"round"}),u.jsx("line",{x1:"394",y1:"136",x2:"414",y2:"136",stroke:"#475569",strokeWidth:"2.5",strokeLinecap:"round"}),u.jsx("rect",{x:"362",y:"109",width:"28",height:"4.5",rx:"1",fill:"#f59e0b"}),u.jsx("text",{x:"376",y:"112.5",fill:"#030712",fontSize:"3.5",fontFamily:"monospace",fontWeight:"900",textAnchor:"middle",children:"CBI OFFROAD"}),y?u.jsxs("g",{id:"tent-deployed",children:[u.jsx("rect",{x:"298",y:"102",width:"162",height:"7",rx:"2",fill:"#0f172a",stroke:"#475569",strokeWidth:"1.5"}),u.jsx("polygon",{points:"304,102 454,102 448,34 314,48",fill:"#334155",stroke:"#475569",strokeWidth:"1.5"}),u.jsx("polygon",{points:"302,102 452,28 457,32 306,106",fill:"#020617",stroke:"#64748b",strokeWidth:"2"}),u.jsx("polygon",{points:"340,96 426,96 422,54 346,62",fill:"#1e293b",stroke:"#f59e0b",strokeWidth:"1",opacity:"0.9"}),u.jsx("line",{x1:"384",y1:"58",x2:"384",y2:"96",stroke:"#f59e0b",strokeWidth:"0.8",strokeDasharray:"2,2"}),u.jsx("line",{x1:"438",y1:"104",x2:"478",y2:"238",stroke:"#94a3b8",strokeWidth:"3"}),u.jsx("line",{x1:"443",y1:"104",x2:"483",y2:"238",stroke:"#94a3b8",strokeWidth:"3"}),[120,142,164,186,208,228].map((F,ce)=>u.jsx("line",{x1:438+ce*6.5,y1:F,x2:443+ce*6.5,y2:F,stroke:"#cbd5e1",strokeWidth:"2.5"},ce))]}):u.jsxs("g",{id:"tent-stowed",children:[u.jsx("rect",{x:"298",y:"102",width:"162",height:"7",rx:"2",fill:"#0f172a",stroke:"#334155",strokeWidth:"1.2"}),u.jsx("rect",{x:"299",y:"93",width:"160",height:"10",rx:"3",fill:"#020617",stroke:"#475569",strokeWidth:"1.8"}),u.jsx("line",{x1:"305",y1:"98",x2:"453",y2:"98",stroke:"#1e293b",strokeWidth:"1.5"}),u.jsx("circle",{cx:"314",cy:"103",r:"2",fill:"#f59e0b"}),u.jsx("circle",{cx:"446",cy:"103",r:"2",fill:"#f59e0b"}),u.jsx("text",{x:"380",y:"100.5",fill:"#64748b",fontSize:"4.5",fontFamily:"monospace",fontWeight:"800",textAnchor:"middle",letterSpacing:"1",children:"OVERLAND RTT // HARDSHELL"})]})]}),u.jsx("rect",{x:"135",y:"180",width:"10",height:"24",rx:"2",fill:"url(#multimatic-gold-v2)",stroke:"#78350f",strokeWidth:"1"}),u.jsx("rect",{x:"396",y:"180",width:"10",height:"24",rx:"2",fill:"url(#multimatic-gold-v2)",stroke:"#78350f",strokeWidth:"1"}),u.jsx("circle",{cx:"140",cy:"186",r:"2",fill:"#00f0ff"}),u.jsx("circle",{cx:"401",cy:"186",r:"2",fill:"#00f0ff"}),u.jsx("path",{d:"M44,198 L48,172 L70,166 L140,150 L184,112 L282,112 L284,198 L186,198 A42,42 0 0,0 102,198 Z",fill:"url(#zr2-black-paint-v2)",stroke:"#334155",strokeWidth:"2.2"}),u.jsx("path",{d:"M72,166 L138,150 L136,146 L78,160 Z",fill:"#020617",stroke:"#475569",strokeWidth:"1"}),u.jsx("polygon",{points:"44,212 66,212 60,226 40,226",fill:"#94a3b8",stroke:"#cbd5e1",strokeWidth:"1"}),u.jsx("rect",{x:"38",y:"215",width:"9",height:"4.5",rx:"1.5",fill:"#ef4444",stroke:"#dc2626",strokeWidth:"1"}),u.jsx("polygon",{points:"142,148 182,116 226,116 224,148",fill:"url(#window-tint-dark-v2)",stroke:"#334155",strokeWidth:"1.2"}),u.jsx("polygon",{points:"234,148 236,116 278,116 278,148",fill:"url(#window-tint-dark-v2)",stroke:"#334155",strokeWidth:"1.2"}),u.jsx("rect",{x:"226",y:"115",width:"8",height:"34",fill:"#020617"}),u.jsx("line",{x1:"282",y1:"112",x2:"284",y2:"198",stroke:"#020617",strokeWidth:"3"}),u.jsx("rect",{x:"182",y:"202",width:"104",height:"6",rx:"3",fill:"#1e293b",stroke:"#475569",strokeWidth:"1.5"}),u.jsx("rect",{x:"284",y:"114",width:"8",height:"86",fill:"#030712",opacity:"0.9"}),u.jsx("path",{d:"M292,198 L292,158 L466,158 L468,198 L448,198 A42,42 0 0,0 364,198 Z",fill:"url(#zr2-black-paint-v2)",stroke:"#334155",strokeWidth:"2.2"}),u.jsx("rect",{x:"290",y:"155",width:"178",height:"5",rx:"1.5",fill:"#0f172a",stroke:"#475569",strokeWidth:"1.2"}),u.jsx("polygon",{points:"464,160 468,160 468,184 463,182",fill:"#ef4444",opacity:"0.95"}),u.jsx("text",{x:"442",y:"171",fill:"#f59e0b",fontSize:"6.5",fontFamily:"monospace",fontWeight:"900",letterSpacing:"0.5",children:"ZR2"}),u.jsxs("g",{id:"front-wheel-v2",children:[u.jsx("circle",{cx:"143",cy:"202",r:"38",fill:"url(#tire-rubber-v2)",stroke:"#334155",strokeWidth:"3",strokeDasharray:"6,3"}),u.jsx("circle",{cx:"143",cy:"202",r:"23",fill:"#0f172a",stroke:"#64748b",strokeWidth:"2"}),u.jsx("circle",{cx:"143",cy:"202",r:"14",fill:"#020617",stroke:"#d97706",strokeWidth:"1.5"})]}),u.jsxs("g",{id:"rear-wheel-v2",children:[u.jsx("circle",{cx:"406",cy:"202",r:"38",fill:"url(#tire-rubber-v2)",stroke:"#334155",strokeWidth:"3",strokeDasharray:"6,3"}),u.jsx("circle",{cx:"406",cy:"202",r:"23",fill:"#0f172a",stroke:"#64748b",strokeWidth:"2"}),u.jsx("circle",{cx:"406",cy:"202",r:"14",fill:"#020617",stroke:"#d97706",strokeWidth:"1.5"})]}),u.jsxs("g",{className:"cursor-pointer hover:scale-105 transition-transform",onClick:Y,children:[u.jsx("rect",{x:"350",y:"78",width:"60",height:"14",rx:"7",fill:"#f59e0b",stroke:"#ffffff",strokeWidth:"1"}),u.jsx("text",{x:"380",y:"88",fill:"#030712",fontSize:"6.5",fontFamily:"monospace",fontWeight:"900",textAnchor:"middle",children:y?"⛺ PACK RTT":"⛺ POP RTT"})]})]})]}),u.jsxs("div",{className:"grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-800/80 font-mono text-[11px]",children:[u.jsxs("div",{className:"bg-obsidian-950/80 p-2 rounded border border-slate-800",children:[u.jsx("span",{className:"text-[9px] text-slate-500 block uppercase",children:"OIL LIFE"}),u.jsxs("span",{className:"text-rose-400 font-bold",children:[L.percent,"% (Service Due)"]})]}),u.jsxs("div",{className:"bg-obsidian-950/80 p-2 rounded border border-slate-800",children:[u.jsx("span",{className:"text-[9px] text-slate-500 block uppercase",children:"5-TIRE ROTATION"}),u.jsxs("span",{className:"text-amber-400 font-bold",children:["Due in ",N.milesRemaining," mi"]})]}),u.jsxs("div",{className:"bg-obsidian-950/80 p-2 rounded border border-slate-800 flex items-center justify-between",children:[u.jsxs("div",{children:[u.jsx("span",{className:"text-[9px] text-slate-500 block uppercase",children:"OVERLAND SETUP"}),u.jsx("span",{className:"text-emerald-400 font-bold",children:y?"CAMP READY":"RTT STOWED"})]}),u.jsx("button",{onClick:Y,className:"px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[9px] font-bold",children:y?"STOW":"POP"})]})]})]}),u.jsxs("div",{onClick:()=>t("murano-midnight"),className:`group relative rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer overflow-hidden ${e==="murano-midnight"?"bg-obsidian-900/90 border-sky-500/80 shadow-2xl shadow-sky-500/20":"bg-obsidian-950/70 border-slate-800/80 hover:border-slate-700"}`,children:[u.jsxs("div",{className:"flex items-center justify-between mb-3 font-mono text-xs flex-wrap gap-2",children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-sky-400 beacon-pulse"}),u.jsx("span",{className:"font-bold text-sky-400",children:"BAY 02 // EXECUTIVE CROSSOVER"})]}),u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsxs("span",{className:"text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/50 animate-pulse font-bold",children:["TABS: ",b.daysRemaining,"d!"]}),u.jsxs("div",{className:"flex items-center bg-black/80 rounded-md p-0.5 border border-slate-700",children:[u.jsx("button",{type:"button",onClick:F=>{F.stopPropagation(),O("toggle"),z("photo")},className:`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${D==="photo"?"bg-sky-500 text-black shadow-sm":"text-slate-400 hover:text-white"}`,children:"📸 PHOTO"}),u.jsx("button",{type:"button",onClick:F=>{F.stopPropagation(),O("toggle"),z("blueprint")},className:`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${D==="blueprint"?"bg-sky-500 text-black shadow-sm":"text-slate-400 hover:text-white"}`,children:"📐 BLUEPRINT"})]})]})]}),u.jsxs("div",{className:"flex items-baseline justify-between mb-3",children:[u.jsxs("div",{children:[u.jsx("h3",{className:"text-lg sm:text-xl font-bold font-display text-white tracking-wide",children:"2021 NISSAN MURANO MIDNIGHT"}),u.jsx("span",{className:"text-[11px] font-mono text-sky-300/80",children:'Magnetic Black Pearl • 20" Black Alloys'})]}),u.jsxs("span",{className:"text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700",children:[P.currentMileage.toLocaleString()," mi"]})]}),D==="photo"?u.jsxs("div",{className:"relative w-full h-64 sm:h-80 flex items-center justify-center my-2 overflow-hidden rounded-xl bg-gradient-to-b from-black via-slate-950 to-black border border-slate-800/80 shadow-2xl group/car",children:[u.jsx("img",{src:"./images/murano_midnight_front.jpg",onError:F=>{F.target.dataset.tried||(F.target.dataset.tried="1",F.target.src="/dashboards/garage/images/murano_midnight_front.jpg")},alt:"2021 Nissan Murano Midnight Edition in Gloss Magnetic Black Pearl",className:"w-full h-full object-contain object-center transition-all duration-700",style:{filter:Q()}}),u.jsx("div",{className:"absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-700",style:{opacity:d==="stealth"?.25:p/100*.8},children:u.jsx("div",{className:"absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/20 via-white/5 to-transparent"})}),u.jsx("div",{className:"absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("ratchet"),M("murano-tabs")},className:"absolute top-[65%] left-[24%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsxs("span",{className:"relative flex h-6 w-6 items-center justify-center",children:[u.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80"}),u.jsx("span",{className:"relative inline-flex rounded-full h-4 w-4 bg-rose-600 border-2 border-white shadow-lg"})]}),u.jsx("span",{className:"absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/90 border border-rose-500 text-rose-300 font-mono text-[9px] font-bold shadow-xl opacity-90 group-hover/pin:opacity-100 transition-opacity",children:"⚠️ TABS: 14 DAYS!"})]}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("ratchet"),M("murano-oil")},className:"absolute top-[48%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsx("span",{className:"relative flex h-5 w-5 items-center justify-center",children:u.jsx("span",{className:"relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500 border border-white shadow-lg"})}),u.jsx("span",{className:"absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 border border-sky-500 text-sky-300 font-mono text-[8px] font-bold opacity-80 group-hover/pin:opacity-100 transition-opacity",children:"0W-20 OIL (48%)"})]}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("ratchet"),M("murano-cvt")},className:"absolute top-[58%] left-[38%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsx("span",{className:"relative flex h-5 w-5 items-center justify-center",children:u.jsx("span",{className:"relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-white shadow-lg"})}),u.jsx("span",{className:"absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 border border-amber-500 text-amber-300 font-mono text-[8px] font-bold opacity-80 group-hover/pin:opacity-100 transition-opacity",children:"XTRONIC CVT"})]}),u.jsxs("button",{type:"button",onClick:F=>{F.stopPropagation(),O("ratchet"),M("murano-tires")},className:"absolute top-[68%] left-[54%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin",children:[u.jsx("span",{className:"relative flex h-5 w-5 items-center justify-center",children:u.jsx("span",{className:"relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white shadow-lg"})}),u.jsx("span",{className:"absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 border border-emerald-500 text-emerald-300 font-mono text-[8px] font-bold opacity-80 group-hover/pin:opacity-100 transition-opacity",children:'20" MIDNIGHT'})]})]}):u.jsxs("div",{className:"relative w-full h-64 sm:h-80 flex items-center justify-center my-2",children:[u.jsx("div",{className:"absolute bottom-2 inset-x-6 h-6 rounded-full bg-sky-500/10 blur-xl pointer-events-none"}),u.jsxs("svg",{viewBox:"0 0 540 280",className:"w-full h-full drop-shadow-2xl",children:[u.jsxs("defs",{children:[u.jsxs("linearGradient",{id:"murano-black-pearl",x1:"0%",y1:"0%",x2:"100%",y2:"50%",children:[u.jsx("stop",{offset:"0%",stopColor:"#0f172a"}),u.jsx("stop",{offset:"40%",stopColor:"#020617"}),u.jsx("stop",{offset:"75%",stopColor:"#1e293b"}),u.jsx("stop",{offset:"100%",stopColor:"#020617"})]}),u.jsxs("linearGradient",{id:"murano-glass-tint",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[u.jsx("stop",{offset:"0%",stopColor:"#030712",stopOpacity:"0.95"}),u.jsx("stop",{offset:"100%",stopColor:"#1e293b",stopOpacity:"0.8"})]}),u.jsxs("radialGradient",{id:"murano-wheel-rubber",cx:"50%",cy:"50%",r:"50%",children:[u.jsx("stop",{offset:"65%",stopColor:"#111827"}),u.jsx("stop",{offset:"90%",stopColor:"#1f2937"}),u.jsx("stop",{offset:"100%",stopColor:"#030712"})]})]}),u.jsx("path",{d:"M50,198 L56,176 L86,170 L146,146 L216,120 L360,120 L440,154 L476,178 L480,198 L440,198 A38,38 0 0,0 364,198 L180,198 A38,38 0 0,0 104,198 Z",fill:"url(#murano-black-pearl)",stroke:"#38bdf8",strokeWidth:"1.8"}),u.jsx("path",{d:"M52,182 L80,172 L78,198 Z",fill:"#020617",stroke:"#38bdf8",strokeWidth:"1"}),u.jsx("polygon",{points:"56,178 74,178 72,186 54,186",fill:"#38bdf8",opacity:"0.8"}),u.jsx("polygon",{points:"152,144 214,124 286,124 284,144",fill:"url(#murano-glass-tint)",stroke:"#475569",strokeWidth:"1"}),u.jsx("polygon",{points:"292,144 294,124 358,124 416,144",fill:"url(#murano-glass-tint)",stroke:"#475569",strokeWidth:"1"}),u.jsx("polygon",{points:"420,144 362,124 430,144",fill:"url(#murano-glass-tint)",stroke:"#475569",strokeWidth:"1"}),u.jsx("polygon",{points:"426,144 438,136 444,148 432,154",fill:"#020617"}),u.jsx("path",{d:"M148,146 L216,122 L360,122 L442,154",fill:"none",stroke:"#94a3b8",strokeWidth:"1.2"}),u.jsx("line",{x1:"142",y1:"202",x2:"402",y2:"202",stroke:"#38bdf8",strokeWidth:"2.5",strokeDasharray:"4,3"}),u.jsx("circle",{cx:"272",cy:"202",r:"6",fill:"#020617",stroke:"#38bdf8",strokeWidth:"1.5"}),u.jsx("text",{x:"272",y:"218",fill:"#38bdf8",fontSize:"4.5",fontFamily:"monospace",fontWeight:"bold",textAnchor:"middle",children:"INTELLIGENT AWD // ELECTROMAGNETIC COUPLING"}),u.jsxs("g",{id:"murano-front-wheel",children:[u.jsx("circle",{cx:"142",cy:"200",r:"35",fill:"url(#murano-wheel-rubber)",stroke:"#38bdf8",strokeWidth:"1.5"}),u.jsx("circle",{cx:"142",cy:"200",r:"23",fill:"#020617",stroke:"#64748b",strokeWidth:"1.8"}),u.jsx("line",{x1:"142",y1:"178",x2:"142",y2:"222",stroke:"#1e293b",strokeWidth:"3"}),u.jsx("line",{x1:"120",y1:"200",x2:"164",y2:"200",stroke:"#1e293b",strokeWidth:"3"}),u.jsx("line",{x1:"126",y1:"184",x2:"158",y2:"216",stroke:"#1e293b",strokeWidth:"3"}),u.jsx("line",{x1:"126",y1:"216",x2:"158",y2:"184",stroke:"#1e293b",strokeWidth:"3"}),u.jsx("circle",{cx:"142",cy:"200",r:"6",fill:"#0f172a",stroke:"#38bdf8",strokeWidth:"1"})]}),u.jsxs("g",{id:"murano-rear-wheel",children:[u.jsx("circle",{cx:"402",cy:"200",r:"35",fill:"url(#murano-wheel-rubber)",stroke:"#38bdf8",strokeWidth:"1.5"}),u.jsx("circle",{cx:"402",cy:"200",r:"23",fill:"#020617",stroke:"#64748b",strokeWidth:"1.8"}),u.jsx("line",{x1:"402",y1:"178",x2:"402",y2:"222",stroke:"#1e293b",strokeWidth:"3"}),u.jsx("line",{x1:"380",y1:"200",x2:"424",y2:"200",stroke:"#1e293b",strokeWidth:"3"}),u.jsx("line",{x1:"386",y1:"184",x2:"418",y2:"216",stroke:"#1e293b",strokeWidth:"3"}),u.jsx("line",{x1:"386",y1:"216",x2:"418",y2:"184",stroke:"#1e293b",strokeWidth:"3"}),u.jsx("circle",{cx:"402",cy:"200",r:"6",fill:"#0f172a",stroke:"#38bdf8",strokeWidth:"1"})]}),u.jsxs("g",{className:"cursor-pointer hover:scale-105 transition-transform",onClick:()=>M("murano-tabs"),children:[u.jsx("rect",{x:"52",y:"152",width:"76",height:"12",rx:"3",fill:"#ef4444",stroke:"#ffffff",strokeWidth:"0.8"}),u.jsx("text",{x:"90",y:"160.5",fill:"#ffffff",fontSize:"5",fontFamily:"monospace",fontWeight:"bold",textAnchor:"middle",children:"⚠️ TABS: 14 DAYS!"})]}),u.jsxs("g",{className:"cursor-pointer hover:scale-105 transition-transform",onClick:()=>M("murano-cvt"),children:[u.jsx("rect",{x:"220",y:"160",width:"70",height:"12",rx:"3",fill:"#0f172a",stroke:"#38bdf8",strokeWidth:"1"}),u.jsx("text",{x:"255",y:"168.5",fill:"#38bdf8",fontSize:"5",fontFamily:"monospace",fontWeight:"bold",textAnchor:"middle",children:"XTRONIC CVT NS-3"})]})]})]}),u.jsxs("div",{className:"grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-800/80 font-mono text-[11px]",children:[u.jsxs("div",{className:"bg-obsidian-950/80 p-2 rounded border border-rose-500/40 bg-rose-950/20",children:[u.jsx("span",{className:"text-[9px] text-rose-300 block uppercase",children:"WA STATE TABS"}),u.jsxs("span",{className:"text-rose-400 font-bold",children:[b.daysRemaining,"d Left (RENEW)"]})]}),u.jsxs("div",{className:"bg-obsidian-950/80 p-2 rounded border border-slate-800",children:[u.jsx("span",{className:"text-[9px] text-slate-500 block uppercase",children:"0W-20 SYNTH OIL"}),u.jsxs("span",{className:"text-sky-400 font-bold",children:[B.percent,"% Nominal"]})]}),u.jsxs("div",{className:"bg-obsidian-950/80 p-2 rounded border border-slate-800",children:[u.jsx("span",{className:"text-[9px] text-slate-500 block uppercase",children:"XTRONIC CVT"}),u.jsx("span",{className:"text-emerald-400 font-bold",children:"NS-3 Monitored"})]})]})]})]})]}),v&&u.jsxs("div",{className:"p-4 bg-obsidian-900 border-t border-slate-800 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn",children:[u.jsxs("div",{className:"flex items-center space-x-3",children:[u.jsx("div",{className:"p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400",children:u.jsx(ra,{className:"w-4 h-4"})}),u.jsxs("div",{children:[v==="zr2-oil"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-rose-400 block font-bold text-sm",children:"2021 COLORADO ZR2: OIL DECAY ALERT (12% REMAINING)"}),u.jsx("span",{className:"text-slate-300 text-xs",children:"Mobil 1 5W-30 dexos1 Gen 3 (6.0 qts) & ACDelco PF63 oil filter change required within 450 mi."})]}),v==="zr2-dssv"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-amber-400 block font-bold text-sm",children:"2021 COLORADO ZR2: MULTIMATIC DSSV DAMPER INTEGRITY"}),u.jsx("span",{className:"text-slate-300 text-xs",children:"Spool-valve nitrogen seals, front coilover shafts, and rear piggyback reservoirs nominal."})]}),v==="zr2-tires"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-sky-400 block font-bold text-sm",children:"2021 COLORADO ZR2: 5-TIRE OVERLAND ROTATION (DUE IN 450 MI)"}),u.jsx("span",{className:"text-slate-300 text-xs",children:'Cycle full-size bed spare into Right Rear (RR) position for uniform 31" DuraTrac tread wear.'})]}),v==="zr2-cbi"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-emerald-400 block font-bold text-sm",children:"2021 COLORADO ZR2: CBI BED BARS & HARDSHELL ROOFTOP TENT"}),u.jsxs("span",{className:"text-slate-300 text-xs",children:["Tubular steel bed rack bolted to bed rails. Clamshell pop-up tent is currently ",y?"DEPLOYED (Camp Ready)":"STOWED (Aerodynamic Road Mode)","."]})]}),v==="murano-tabs"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-rose-400 block font-bold text-sm",children:"2021 NISSAN MURANO: WA DOL TABS EXPIRE IN 14 DAYS! (RCW 46.16A)"}),u.jsx("span",{className:"text-slate-300 text-xs",children:"Plate CDE4108 tabs expire on Nov 2, 2026. Renew immediately via Washington License eXpress to avoid state penalties."})]}),v==="murano-oil"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-sky-400 block font-bold text-sm",children:"2021 NISSAN MURANO: 0W-20 FULL SYNTHETIC OIL LIFE (48%)"}),u.jsx("span",{className:"text-slate-300 text-xs",children:"Mobil 1 Advanced Fuel Economy 0W-20 (5.1 qts) and Nissan OEM 15208-65F0E filter."})]}),v==="murano-cvt"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-amber-400 block font-bold text-sm",children:"2021 NISSAN MURANO: XTRONIC CVT FLUID DEGRADATION MONITOR"}),u.jsx("span",{className:"text-slate-300 text-xs",children:"Strictly OEM Genuine Nissan NS-3 CVT Fluid only. Prevents high-torque push-belt wear."})]}),v==="murano-tires"&&u.jsxs("div",{children:[u.jsx("strong",{className:"text-emerald-400 block font-bold text-sm",children:'2021 NISSAN MURANO: 20" MIDNIGHT WHEELS & TIRES'}),u.jsx("span",{className:"text-slate-300 text-xs",children:"Gloss black multispoke alloys with 235/55R20 all-season tires. 4-tire forward cross pattern."})]})]})]}),u.jsxs("div",{className:"flex items-center space-x-2",children:[v==="murano-tabs"?u.jsxs("a",{href:"https://www.dol.wa.gov/vehiclerob/renew-tabs",target:"_blank",rel:"noopener noreferrer",className:"px-3.5 py-1.5 rounded bg-rose-500 hover:bg-rose-400 text-white font-bold flex items-center space-x-1.5 shadow-lg",children:[u.jsx("span",{children:"RENEW WA TABS"}),u.jsx(Ch,{className:"w-3.5 h-3.5"})]}):v==="zr2-cbi"?u.jsx("button",{onClick:Y,className:"px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold shadow-lg",children:y?"STOW TENT":"POP ROOFTOP TENT"}):u.jsx("button",{onClick:()=>r({vehicleId:v.startsWith("zr2")?"colorado-zr2":"murano-midnight",title:v.includes("oil")?"Full Synthetic Oil Change":"Tire Rotation Service"}),className:"px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold shadow-lg",children:"LOG THIS SERVICE"}),u.jsx("button",{onClick:()=>M(null),className:"px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300",children:"CLOSE"})]})]})]})}function aw({vehicle:s,onRotateTires:e}){const t=s.tireRotation.type.includes("5-Tire"),{treadDepth32nds:r,currentPattern:o}=s.tireRotation;return u.jsxs("div",{className:"bg-obsidian-900/80 rounded-xl p-4 border border-slate-800",children:[u.jsxs("div",{className:"flex items-center justify-between mb-3",children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(lh,{className:"w-4 h-4 text-amber-400"}),u.jsx("h4",{className:"text-xs font-mono font-bold tracking-wide text-slate-200 uppercase",children:t?"5-Tire Overland Rotation Cycle":"4-Tire Road-Force Balance Pattern"})]}),u.jsx("span",{className:"text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700",children:t?"FULL-SIZE SPARE ACTIVE":"AXLE-CROSS PRIORITY"})]}),u.jsx("p",{className:"text-[11px] text-slate-400 mb-4 font-mono leading-relaxed",children:o}),u.jsxs("div",{className:"relative w-full max-w-sm mx-auto h-56 bg-obsidian-950/70 rounded-lg border border-slate-800/80 p-3 flex flex-col justify-between overflow-hidden",children:[u.jsx("div",{className:"absolute inset-y-4 left-1/2 w-[1px] bg-slate-800 border-l border-dashed border-slate-700"}),u.jsxs("div",{className:"absolute top-2 left-1/2 -translate-x-1/2 flex items-center space-x-1 text-[9px] font-mono text-slate-500 uppercase",children:[u.jsx("span",{children:"▲"}),u.jsx("span",{children:"FRONT AXLE"}),u.jsx("span",{children:"▲"})]}),u.jsxs("div",{className:"flex justify-between items-center z-10 pt-4",children:[u.jsxs("div",{className:"flex flex-col items-center",children:[u.jsxs("div",{className:"w-12 h-14 rounded-md bg-slate-800 border-2 border-slate-600 flex flex-col items-center justify-center shadow-lg relative group",children:[u.jsx("span",{className:"text-[10px] font-bold font-mono text-white",children:"FL"}),u.jsxs("span",{className:"text-[9px] font-mono text-emerald-400",children:[(r==null?void 0:r.fl)||8,'/32"']})]}),u.jsx("span",{className:"text-[9px] font-mono text-slate-400 mt-1",children:"FRONT LEFT"})]}),u.jsx("div",{className:"px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-center",children:u.jsx("span",{className:"text-[9px] font-mono text-amber-400 font-semibold block",children:s.drivetrain.includes("E-Lockers")?"FRONT E-LOCKER":"INTELLIGENT AWD"})}),u.jsxs("div",{className:"flex flex-col items-center",children:[u.jsxs("div",{className:"w-12 h-14 rounded-md bg-slate-800 border-2 border-slate-600 flex flex-col items-center justify-center shadow-lg relative group",children:[u.jsx("span",{className:"text-[10px] font-bold font-mono text-white",children:"FR"}),u.jsxs("span",{className:"text-[9px] font-mono text-emerald-400",children:[(r==null?void 0:r.fr)||8,'/32"']})]}),u.jsx("span",{className:"text-[9px] font-mono text-slate-400 mt-1",children:"FRONT RIGHT"})]})]}),u.jsxs("div",{className:"flex justify-between items-center z-10",children:[u.jsxs("div",{className:"flex flex-col items-center",children:[u.jsxs("div",{className:"w-12 h-14 rounded-md bg-slate-800 border-2 border-slate-600 flex flex-col items-center justify-center shadow-lg relative group",children:[u.jsx("span",{className:"text-[10px] font-bold font-mono text-white",children:"RL"}),u.jsxs("span",{className:"text-[9px] font-mono text-emerald-400",children:[(r==null?void 0:r.rl)||8,'/32"']})]}),u.jsx("span",{className:"text-[9px] font-mono text-slate-400 mt-1",children:"REAR LEFT"})]}),u.jsx("div",{className:"flex flex-col items-center",children:t?u.jsxs("div",{className:"flex flex-col items-center",children:[u.jsxs("div",{className:"w-12 h-14 rounded-md bg-amber-500/15 border-2 border-amber-500/60 flex flex-col items-center justify-center shadow-lg shadow-amber-500/10 animate-pulse",children:[u.jsx("span",{className:"text-[10px] font-bold font-mono text-amber-300",children:"SPARE"}),u.jsxs("span",{className:"text-[9px] font-mono text-amber-400",children:[(r==null?void 0:r.spare)||10,'/32"']})]}),u.jsx("span",{className:"text-[8px] font-mono text-amber-400 mt-1",children:"➔ ROTATES TO RR"})]}):u.jsx("div",{className:"px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-center",children:u.jsx("span",{className:"text-[9px] font-mono text-slate-400 block",children:"REAR DRIVE"})})}),u.jsxs("div",{className:"flex flex-col items-center",children:[u.jsxs("div",{className:"w-12 h-14 rounded-md bg-slate-800 border-2 border-slate-600 flex flex-col items-center justify-center shadow-lg relative group",children:[u.jsx("span",{className:"text-[10px] font-bold font-mono text-white",children:"RR"}),u.jsxs("span",{className:"text-[9px] font-mono text-emerald-400",children:[(r==null?void 0:r.rr)||8,'/32"']})]}),u.jsx("span",{className:"text-[9px] font-mono text-slate-400 mt-1",children:"REAR RIGHT"})]})]}),u.jsxs("div",{className:"flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1",children:[u.jsxs("span",{children:["SPEC: ",t?'265/65R17 31" AT':"235/55R20 AS"]}),u.jsx("span",{children:"TARGET: 35 PSI COLD"})]})]}),u.jsxs("div",{className:"mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60",children:[u.jsxs("span",{className:"text-[11px] font-mono text-slate-400",children:["Last Rotated: ",u.jsx("strong",{className:"text-slate-200",children:s.tireRotation.lastRotationDate})," @ ",s.tireRotation.lastRotationMileage.toLocaleString()," mi"]}),u.jsxs("button",{onClick:()=>e(s.id),className:"px-2.5 py-1 text-[11px] font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-amber-500/40 transition-all flex items-center space-x-1",children:[u.jsx(lh,{className:"w-3 h-3 text-amber-400"}),u.jsx("span",{children:"LOG ROTATION"})]})]})]})}function ow({vehicle:s,onUpdateMileage:e,onResetOilLife:t,onRotateTires:r,onOpenLogModal:o}){const[l,d]=De.useState(!1),[h,p]=De.useState(!1),[m,y]=De.useState(!1),[S,v]=De.useState(s.currentMileage),[M,w]=De.useState("garage"),C=ao(s),x=sa(s.compliance.tabsExpiryDate);lu(s);const _=()=>{navigator.clipboard.writeText(s.vin),d(!0),setTimeout(()=>d(!1),2e3)},D=()=>{const R=parseInt(S,10);!isNaN(R)&&R>0&&e(s.id,R),y(!1)},z=R=>{e(s.id,s.currentMileage+R),v(s.currentMileage+R)};return u.jsxs("div",{className:"hud-card rounded-2xl border border-slate-800/80 p-5 lg:p-6 transition-all duration-300 relative overflow-hidden",children:[u.jsx("div",{className:`absolute top-0 left-0 right-0 h-1.5 ${s.id==="colorado-zr2"?"bg-gradient-to-r from-amber-500 via-orange-500 to-copper-600":"bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600"}`}),u.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/70",children:[u.jsxs("div",{className:"flex items-start space-x-3.5",children:[u.jsx("div",{className:`p-3 rounded-xl border flex items-center justify-center text-2xl shadow-inner ${s.id==="colorado-zr2"?"bg-amber-500/10 border-amber-500/30 text-amber-400":"bg-sky-500/10 border-sky-500/30 text-sky-400"}`,children:s.id==="colorado-zr2"?"🛻":"🚘"}),u.jsxs("div",{children:[u.jsxs("div",{className:"flex items-center space-x-2 flex-wrap",children:[u.jsx("h2",{className:"text-lg sm:text-xl font-bold font-display tracking-tight text-white",children:s.name}),u.jsx("span",{className:`text-[10px] font-mono px-2 py-0.5 rounded border ${s.id==="colorado-zr2"?"bg-amber-500/15 text-amber-300 border-amber-500/40":"bg-sky-500/15 text-sky-300 border-sky-500/40"}`,children:s.tagline})]}),u.jsxs("div",{className:"flex items-center space-x-3 mt-1 text-xs font-mono text-slate-400 flex-wrap",children:[u.jsxs("span",{className:"flex items-center space-x-1",children:[u.jsx("span",{className:"text-slate-500",children:"PLATE:"}),u.jsxs("strong",{className:"text-slate-200 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700",children:[s.state," ",s.plate]})]}),u.jsxs("span",{className:"flex items-center space-x-1 cursor-pointer hover:text-amber-400 transition-colors",onClick:_,title:"Click to copy VIN",children:[u.jsx("span",{className:"text-slate-500",children:"VIN:"}),u.jsx("span",{className:"text-slate-300",children:s.vin}),l?u.jsx(Yg,{className:"w-3 h-3 text-emerald-400"}):u.jsx(tx,{className:"w-3 h-3"})]})]})]})]}),u.jsxs("div",{className:"flex sm:flex-col items-center sm:items-end justify-between sm:justify-center",children:[u.jsx("div",{className:"text-[11px] font-mono text-slate-400",children:"WA DOL REGISTRATION"}),u.jsxs("div",{className:"flex items-center space-x-1.5 mt-0.5",children:[u.jsx("span",{className:`w-2 h-2 rounded-full ${x.status==="critical"?"bg-rose-500 beacon-pulse":x.status==="warning"?"bg-amber-500":"bg-emerald-500"}`}),u.jsx("span",{className:`text-xs font-mono font-bold ${x.status==="critical"?"text-rose-400":x.status==="warning"?"text-amber-400":"text-emerald-400"}`,children:x.isExpired?"EXPIRED":`${x.daysRemaining}d REMAINING`})]}),u.jsxs("span",{className:"text-[10px] font-mono text-slate-500",children:["Exp: ",x.expiryFormatted]})]})]}),u.jsx("div",{className:"relative mb-6 rounded-xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-black via-slate-950 to-black shadow-xl group/cardphoto",children:u.jsxs("div",{className:"relative w-full h-44 sm:h-52 flex items-center justify-center p-2",children:[u.jsx("img",{src:s.id==="colorado-zr2"?M==="overland"?"./images/zr2_overland_side.jpg":"./images/zr2_garage_front.jpg":"./images/murano_midnight_front.jpg",onError:R=>{R.target.dataset.tried||(R.target.dataset.tried="1",R.target.src=s.id==="colorado-zr2"?M==="overland"?"/dashboards/garage/images/zr2_overland_side.jpg":"/dashboards/garage/images/zr2_garage_front.jpg":"/dashboards/garage/images/murano_midnight_front.jpg")},alt:s.name,className:"w-full h-full object-contain object-center transition-all duration-500 group-hover/cardphoto:scale-[1.02]"}),u.jsx("div",{className:"absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"}),s.id==="colorado-zr2"&&u.jsxs("div",{className:"absolute top-2.5 right-2.5 flex items-center bg-black/85 rounded-lg p-0.5 border border-slate-700 font-mono text-[9px] shadow-lg z-10",children:[u.jsx("button",{type:"button",onClick:()=>w("garage"),className:`px-2 py-0.5 rounded font-bold transition-all ${M==="garage"?"bg-amber-500 text-black shadow-sm":"text-slate-400 hover:text-white"}`,children:"📸 3/4 HERO"}),u.jsx("button",{type:"button",onClick:()=>w("overland"),className:`px-2 py-0.5 rounded font-bold transition-all ${M==="overland"?"bg-amber-500 text-black shadow-sm":"text-slate-400 hover:text-white"}`,children:"⛺ RIG SIDE"})]}),u.jsxs("div",{className:"absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono pointer-events-none z-10",children:[u.jsx("span",{className:"px-2 py-0.5 rounded bg-black/85 border border-slate-700/80 text-slate-300 backdrop-blur-sm",children:s.id==="colorado-zr2"?"OVERLAND BLACKOUT • MULTIMATIC DSSV":'MAGNETIC BLACK PEARL • 20" GLOSS BLACK'}),u.jsx("span",{className:`px-2 py-0.5 rounded font-bold backdrop-blur-sm border ${s.id==="colorado-zr2","bg-rose-950/80 border-rose-500/60 text-rose-300"}`,children:s.id==="colorado-zr2"?"OIL 12% DUE":"TABS: 14 DAYS"})]})]})}),u.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[u.jsxs("div",{className:"bg-obsidian-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between",children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(ZE,{className:"w-4 h-4 text-amber-400"}),u.jsx("span",{className:"text-xs font-mono font-semibold text-slate-300 uppercase tracking-wide",children:"Current Odometer"})]}),u.jsx("button",{onClick:()=>y(!m),className:"text-[11px] font-mono text-amber-400 hover:text-amber-300 underline",children:m?"Cancel":"Edit Mileage"})]}),u.jsx("div",{className:"my-3",children:m?u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx("input",{type:"number",value:S,onChange:R=>v(R.target.value),className:"bg-obsidian-950 border border-amber-500/60 rounded px-3 py-1.5 text-xl font-mono text-white font-bold w-full focus:outline-none focus:ring-1 focus:ring-amber-500"}),u.jsx("button",{onClick:D,className:"px-3 py-1.5 rounded bg-amber-500 text-obsidian-950 font-mono text-xs font-bold hover:bg-amber-400",children:"SAVE"})]}):u.jsxs("div",{className:"flex items-baseline space-x-2",children:[u.jsx("span",{className:"text-3xl font-extrabold font-mono text-white tracking-tight",children:s.currentMileage.toLocaleString()}),u.jsx("span",{className:"text-sm font-mono text-slate-400",children:"MILES"})]})}),u.jsxs("div",{className:"pt-2 border-t border-slate-800/80 flex items-center justify-between",children:[u.jsx("span",{className:"text-[10px] font-mono text-slate-500",children:"QUICK LOG:"}),u.jsx("div",{className:"flex items-center space-x-1.5",children:[50,250,500,1e3].map(R=>u.jsxs("button",{onClick:()=>z(R),className:"px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/90 text-slate-300 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-700 transition-all active:scale-95",children:["+",R]},R))})]})]}),u.jsxs("div",{className:"bg-obsidian-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between",children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(rx,{className:`w-4 h-4 ${C.status==="critical"?"text-rose-500 animate-bounce":C.status==="warning"?"text-amber-400":"text-emerald-400"}`}),u.jsx("span",{className:"text-xs font-mono font-semibold text-slate-300 uppercase tracking-wide",children:"Oil Life Decay Monitor"})]}),u.jsx("button",{onClick:()=>t(s.id),className:"text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-amber-500/50 transition-colors",children:"RESET OIL LIFE"})]}),u.jsxs("div",{className:"my-2.5",children:[u.jsxs("div",{className:"flex items-baseline justify-between mb-1.5",children:[u.jsxs("div",{className:"flex items-baseline space-x-1.5",children:[u.jsxs("span",{className:`text-2xl font-mono font-extrabold ${C.status==="critical"?"text-rose-400":C.status==="warning"?"text-amber-400":"text-emerald-400"}`,children:[C.percent,"%"]}),u.jsx("span",{className:"text-xs font-mono text-slate-400",children:"REMAINING"})]}),u.jsx("span",{className:`text-xs font-mono font-medium ${C.status==="critical"?"text-rose-400 font-bold":C.status==="warning"?"text-amber-400":"text-slate-400"}`,children:C.milesLeft!==void 0?`~${C.milesLeft.toLocaleString()} mi left`:""})]}),u.jsx("div",{className:"w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700/60",children:u.jsx("div",{className:`h-full rounded-full transition-all duration-700 ${C.status==="critical"?"bg-gradient-to-r from-rose-600 to-rose-400 shadow-lg shadow-rose-500/50":C.status==="warning"?"bg-gradient-to-r from-amber-600 to-amber-400 shadow-lg shadow-amber-500/40":"bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-500/30"}`,style:{width:`${Math.max(5,C.percent)}%`}})})]}),u.jsxs("div",{className:"pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400 flex-wrap gap-1",children:[u.jsxs("span",{title:s.specs.oilType,children:["OIL: ",u.jsxs("strong",{className:"text-slate-200",children:[s.specs.oilType.split(" ")[0]," ",s.specs.oilType.split(" ")[1]]})]}),u.jsxs("span",{title:s.specs.oilFilter,children:["FILTER: ",u.jsx("strong",{className:"text-slate-200",children:s.specs.oilFilter.split(" ")[1]||s.specs.oilFilter})]}),u.jsxs("span",{children:["CAP: ",u.jsxs("strong",{className:"text-slate-200",children:[s.specs.oilCapacity.split(" ")[0]," Qt"]})]})]})]})]}),u.jsx("div",{className:"mb-6",children:u.jsx(aw,{vehicle:s,onRotateTires:r})}),u.jsxs("div",{className:"bg-obsidian-900/60 rounded-xl p-4 border border-slate-800 mb-6",children:[u.jsxs("div",{className:"flex items-center justify-between mb-3",children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(ra,{className:"w-4 h-4 text-amber-400"}),u.jsx("h3",{className:"text-xs font-mono font-bold tracking-wide text-slate-200 uppercase",children:"Platform-Specific Service Milestones"})]}),u.jsx("span",{className:"text-[10px] font-mono text-slate-400",children:s.id==="colorado-zr2"?"OVERLAND 4WD SPEC":"XTRONIC CVT / SAFETY SPEC"})]}),u.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:s.platformMilestones.map(R=>{const P=R.dueMileage?R.dueMileage-s.currentMileage:null;return u.jsxs("div",{className:"p-3 rounded-lg bg-obsidian-950/70 border border-slate-800 hover:border-slate-700 transition-colors",children:[u.jsxs("div",{className:"flex items-start justify-between gap-2",children:[u.jsxs("div",{className:"flex items-center space-x-1.5",children:[u.jsx("span",{className:"text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700",children:R.badge}),u.jsx("h4",{className:"text-xs font-semibold text-slate-200",children:R.title})]}),u.jsx("span",{className:`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${R.status==="CRITICAL"?"bg-rose-500/20 text-rose-400":"bg-emerald-500/10 text-emerald-400"}`,children:R.status})]}),u.jsx("p",{className:"text-[11px] text-slate-400 mt-1.5 leading-snug",children:R.description}),u.jsxs("div",{className:"flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 pt-1.5 border-t border-slate-800/60",children:[R.dueMileage&&u.jsxs("span",{children:["Due @ ",R.dueMileage.toLocaleString()," mi (",P>0?`${P.toLocaleString()} mi left`:"Due Now",")"]}),R.dueDate&&u.jsxs("span",{children:["Due Date: ",R.dueDate]}),u.jsx("button",{onClick:()=>o({vehicleId:s.id,title:R.title,category:R.badge}),className:"text-amber-400 hover:text-amber-300 font-semibold",children:"Log Service →"})]})]},R.id)})})]}),u.jsxs("div",{className:"border-t border-slate-800/80 pt-3",children:[u.jsxs("button",{onClick:()=>p(!h),className:"w-full flex items-center justify-between text-xs font-mono text-slate-400 hover:text-slate-200 py-1",children:[u.jsxs("span",{className:"flex items-center space-x-1.5",children:[u.jsx(bx,{className:"w-3.5 h-3.5 text-amber-400"}),u.jsx("span",{children:"FULL POWERTRAIN, FLUID & RECALL TECHNICAL SPECIFICATIONS"})]}),h?u.jsx(XE,{className:"w-4 h-4"}):u.jsx(jE,{className:"w-4 h-4"})]}),h&&u.jsxs("div",{className:"mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono bg-obsidian-950/80 p-3.5 rounded-xl border border-slate-800",children:[u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block text-[10px]",children:"ENGINE"}),u.jsx("strong",{className:"text-slate-200",children:s.engine})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block text-[10px]",children:"OUTPUT"}),u.jsx("strong",{className:"text-slate-200",children:s.horsepower})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block text-[10px]",children:"TRANSMISSION"}),u.jsx("strong",{className:"text-slate-200",children:s.transmission})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block text-[10px]",children:"DRIVETRAIN"}),u.jsx("strong",{className:"text-slate-200",children:s.drivetrain})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block text-[10px]",children:"TIRES"}),u.jsx("strong",{className:"text-slate-200",children:s.tires})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block text-[10px]",children:"OIL CAPACITY"}),u.jsx("strong",{className:"text-slate-200",children:s.specs.oilCapacity})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block text-[10px]",children:"OIL FILTER"}),u.jsx("strong",{className:"text-slate-200",children:s.specs.oilFilter})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block text-[10px]",children:"AIR FILTER"}),u.jsx("strong",{className:"text-slate-200",children:s.specs.airFilter||s.specs.engineAirFilter})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block text-[10px]",children:"NHTSA RECALLS"}),u.jsx("strong",{className:"text-emerald-400",children:s.compliance.nhtsaRecalls.status})]})]})]})]})}function lw({vehicles:s,onRenewTabs:e}){const[t,r]=De.useState("colorado-zr2"),[o,l]=De.useState(!1),[d,h]=De.useState("VERIFIED // ALL NOMINAL (0 RECALLS)"),p=()=>{l(!0),setTimeout(()=>{l(!1),h("VERIFIED WITH NHTSA // 0 OPEN SAFETY RECALLS FOUND")},1200)},m=s.find(y=>y.id===t)||s[0];return u.jsxs("div",{className:"space-y-6",children:[u.jsxs("div",{className:"hud-card rounded-2xl p-6 border border-slate-800",children:[u.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800",children:[u.jsxs("div",{children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx("span",{className:"text-xl",children:"📋"}),u.jsx("h3",{className:"text-base font-bold font-display tracking-wide text-white",children:"WA STATE VEHICLE TABS & REGISTRATION REGISTRY"})]}),u.jsx("p",{className:"text-xs font-mono text-slate-400 mt-0.5",children:"Statutory Compliance under RCW 46.16A // Thurston County, Washington"})]}),u.jsxs("a",{href:"https://www.dol.wa.gov/vehiclerob/renew-tabs",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-obsidian-950 transition-all shadow-md active:scale-95",children:[u.jsx("span",{children:"WA LICENSE EXPRESS PORTAL"}),u.jsx(Ch,{className:"w-3.5 h-3.5"})]})]}),u.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:s.map(y=>{const S=sa(y.compliance.tabsExpiryDate);return u.jsxs("div",{className:`p-4 rounded-xl border transition-all ${S.status==="critical"?"bg-rose-950/20 border-rose-500/50 shadow-lg shadow-rose-950/40":"bg-obsidian-900/80 border-slate-800"}`,children:[u.jsxs("div",{className:"flex items-start justify-between",children:[u.jsxs("div",{className:"flex items-center space-x-2.5",children:[u.jsx("span",{className:"text-2xl",children:y.id==="colorado-zr2"?"🛻":"🚘"}),u.jsxs("div",{children:[u.jsx("h4",{className:"text-sm font-bold text-white font-mono",children:y.name}),u.jsxs("div",{className:"flex items-center space-x-2 text-xs font-mono text-slate-400",children:[u.jsxs("span",{children:["Plate: ",u.jsx("strong",{className:"text-slate-200",children:y.plate})]}),u.jsx("span",{children:"•"}),u.jsxs("span",{children:["Fee: $",y.compliance.tabsCost.toFixed(2)]})]})]})]}),u.jsx("span",{className:`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${S.status==="critical"?"bg-rose-500/20 text-rose-300 border border-rose-500/50 animate-pulse":"bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"}`,children:S.isExpired?"EXPIRED":`${S.daysRemaining} DAYS LEFT`})]}),u.jsxs("div",{className:"mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono",children:[u.jsxs("span",{className:"text-slate-400",children:["Expiry Date: ",u.jsx("strong",{className:S.status==="critical"?"text-rose-400":"text-slate-200",children:S.expiryFormatted})]}),u.jsx("button",{onClick:()=>e(y.id),className:"px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-700 hover:border-amber-500/40 transition-colors",children:"MARK RENEWED (+1 YR)"})]})]},y.id)})})]}),u.jsxs("div",{className:"hud-card rounded-2xl p-6 border border-slate-800",children:[u.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800",children:[u.jsxs("div",{children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(Nh,{className:"w-5 h-5 text-amber-400"}),u.jsx("h3",{className:"text-base font-bold font-display tracking-wide text-white",children:"AUTO INSURANCE POLICY CARDS & DECLARATIONS"})]}),u.jsx("p",{className:"text-xs font-mono text-slate-400 mt-0.5",children:"USAA Casualty Insurance Company // Active Semi-Annual Policy"})]}),u.jsx("div",{className:"flex items-center space-x-1.5 p-1 rounded-lg bg-obsidian-950 border border-slate-800",children:s.map(y=>u.jsx("button",{onClick:()=>r(y.id),className:`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${t===y.id?"bg-amber-500/20 text-amber-300 border border-amber-500/40":"text-slate-400 hover:text-white"}`,children:y.id==="colorado-zr2"?"🛻 ZR2":"🚘 MURANO"},y.id))})]}),u.jsxs("div",{className:"max-w-xl mx-auto rounded-xl p-5 bg-gradient-to-br from-slate-900 via-obsidian-900 to-slate-950 border-2 border-slate-700/80 shadow-2xl relative overflow-hidden font-mono",children:[u.jsx("div",{className:"absolute top-0 right-0 px-3 py-1 bg-amber-500 text-obsidian-950 font-bold text-[10px] uppercase tracking-wider rounded-bl-lg",children:"OFFICIAL DIGITAL ID CARD"}),u.jsxs("div",{className:"flex items-center space-x-3 mb-4",children:[u.jsx("div",{className:"w-9 h-9 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow",children:"USAA"}),u.jsxs("div",{children:[u.jsx("h4",{className:"text-sm font-bold text-white tracking-wide",children:"USAA CASUALTY INSURANCE COMPANY"}),u.jsx("p",{className:"text-[10px] text-slate-400",children:"SAN ANTONIO, TEXAS • WA REGULATED POLICY"})]})]}),u.jsxs("div",{className:"grid grid-cols-2 gap-3 text-xs mb-4 pt-3 border-t border-slate-800",children:[u.jsxs("div",{children:[u.jsx("span",{className:"text-[10px] text-slate-500 block",children:"POLICY NUMBER"}),u.jsx("strong",{className:"text-white text-sm",children:m.compliance.insurance.policyNumber})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-[10px] text-slate-500 block",children:"POLICY PERIOD"}),u.jsx("strong",{className:"text-slate-200",children:m.compliance.insurance.period})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-[10px] text-slate-500 block",children:"INSURED VEHICLE"}),u.jsx("strong",{className:"text-amber-400",children:m.name})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-[10px] text-slate-500 block",children:"VEHICLE IDENTIFICATION NO (VIN)"}),u.jsx("strong",{className:"text-slate-200 text-[11px]",children:m.vin})]})]}),u.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] bg-obsidian-950/80 p-2.5 rounded-lg border border-slate-800 mb-4",children:[u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block",children:"COMP DEDUCTIBLE"}),u.jsx("strong",{className:"text-slate-200",children:m.compliance.insurance.comprehensiveDeductible})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block",children:"COLL DEDUCTIBLE"}),u.jsx("strong",{className:"text-slate-200",children:m.compliance.insurance.collisionDeductible})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block",children:"BODILY INJURY"}),u.jsx("strong",{className:"text-slate-200",children:m.compliance.insurance.bodilyInjury})]}),u.jsxs("div",{children:[u.jsx("span",{className:"text-slate-500 block",children:"PROPERTY DAMAGE"}),u.jsx("strong",{className:"text-slate-200",children:m.compliance.insurance.propertyDamage})]})]}),u.jsxs("div",{className:"flex items-center justify-between text-xs pt-2 border-t border-slate-800",children:[u.jsxs("div",{className:"flex items-center space-x-1.5 text-amber-400 font-semibold",children:[u.jsx(JE,{className:"w-3.5 h-3.5"}),u.jsxs("span",{children:["ROADSIDE: ",m.compliance.insurance.emergencyRoadsidePhone]})]}),u.jsx("span",{className:"text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20",children:m.compliance.insurance.status})]})]})]}),u.jsxs("div",{className:"hud-card rounded-2xl p-6 border border-slate-800",children:[u.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800",children:[u.jsxs("div",{children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(eu,{className:"w-5 h-5 text-amber-400"}),u.jsx("h3",{className:"text-base font-bold font-display tracking-wide text-white",children:"NHTSA SAFETY RECALL & FACTORY TSB RADAR"})]}),u.jsx("p",{className:"text-xs font-mono text-slate-400 mt-0.5",children:"Live National Highway Traffic Safety Administration Database Cross-Reference"})]}),u.jsxs("button",{onClick:p,disabled:o,className:"inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-amber-500/40 transition-all",children:[u.jsx(QE,{className:`w-3.5 h-3.5 ${o?"animate-spin text-amber-400":""}`}),u.jsx("span",{children:o?"QUERYING NHTSA...":"CHECK RECALL DATABASE"})]})]}),u.jsxs("div",{className:"bg-obsidian-900/90 rounded-xl p-4 border border-slate-800 text-xs font-mono space-y-3",children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsx("span",{className:"text-slate-400",children:"DATABASE STATUS:"}),u.jsxs("span",{className:"text-emerald-400 font-bold flex items-center space-x-1.5",children:[u.jsx(Jg,{className:"w-4 h-4"}),u.jsx("span",{children:d})]})]}),u.jsxs("div",{className:"pt-3 border-t border-slate-800 space-y-2",children:[u.jsx("span",{className:"text-slate-400 font-bold block text-[11px]",children:"ACTIVE TECHNICAL BULLETINS (TSBs) UNDER AUDIT:"}),s.flatMap(y=>y.compliance.nhtsaRecalls.monitoredTsbs.map(S=>({vName:y.name,text:S}))).map((y,S)=>u.jsxs("div",{className:"p-2.5 rounded-lg bg-obsidian-950/80 border border-slate-800/80 text-[11px] text-slate-300 flex items-start space-x-2",children:[u.jsx("span",{className:"text-amber-400 font-bold",children:"ℹ"}),u.jsxs("div",{children:[u.jsxs("span",{className:"text-slate-500 font-semibold",children:[y.vName,": "]}),u.jsx("span",{children:y.text})]})]},S))]})]})]})]})}function cw({logs:s,vehicles:e,onOpenLogModal:t}){const[r,o]=De.useState("all"),[l,d]=De.useState("all"),[h,p]=De.useState("all"),[m,y]=De.useState(null),S=s.filter(x=>!(r!=="all"&&x.vehicleId!==r||l!=="all"&&x.category!==l||h!=="all"&&x.providerType!==h)),v=S.reduce((x,_)=>x+(_.cost||0),0),M=S.reduce((x,_)=>x+(_.dealerEstimatedCost||_.cost||0),0),w=Math.max(0,M-v),C=["all","Oil & Filter","Tires & Wheels","Suspension","Fluids & Drivetrain","Brakes"];return u.jsxs("div",{className:"space-y-6",children:[u.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-4",children:[u.jsxs("div",{className:"hud-card rounded-xl p-4 border border-slate-800",children:[u.jsx("span",{className:"text-[10px] font-mono text-slate-400 block uppercase",children:"Total Service Investment"}),u.jsxs("div",{className:"flex items-baseline space-x-1.5 mt-1",children:[u.jsxs("span",{className:"text-2xl font-bold font-mono text-white",children:["$",v.toFixed(2)]}),u.jsx("span",{className:"text-xs font-mono text-slate-400",children:"USD"})]}),u.jsxs("span",{className:"text-[10px] font-mono text-slate-500 mt-1 block",children:["Across ",S.length," logged maintenance events"]})]}),u.jsxs("div",{className:"hud-card rounded-xl p-4 border border-slate-800",children:[u.jsx("span",{className:"text-[10px] font-mono text-slate-400 block uppercase",children:"Dealer Equivalent Estimate"}),u.jsxs("div",{className:"flex items-baseline space-x-1.5 mt-1",children:[u.jsxs("span",{className:"text-2xl font-bold font-mono text-slate-300",children:["$",M.toFixed(2)]}),u.jsx("span",{className:"text-xs font-mono text-slate-400",children:"USD"})]}),u.jsx("span",{className:"text-[10px] font-mono text-slate-500 mt-1 block",children:"Certified GM & Nissan dealer labor rates"})]}),u.jsxs("div",{className:"hud-card rounded-xl p-4 border border-amber-500/30 bg-amber-500/5",children:[u.jsxs("span",{className:"text-[10px] font-mono text-amber-400 block uppercase flex items-center space-x-1",children:[u.jsx(bx,{className:"w-3 h-3"}),u.jsx("span",{children:"DIY & Independent Savings"})]}),u.jsxs("div",{className:"flex items-baseline space-x-1.5 mt-1",children:[u.jsxs("span",{className:"text-2xl font-bold font-mono text-emerald-400",children:["$",w.toFixed(2)]}),u.jsx("span",{className:"text-xs font-mono text-emerald-500",children:"SAVED"})]}),u.jsx("span",{className:"text-[10px] font-mono text-slate-400 mt-1 block",children:"Realized cost reduction via garage maintenance"})]})]}),u.jsxs("div",{className:"hud-card rounded-2xl p-6 border border-slate-800",children:[u.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800",children:[u.jsxs("div",{children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(ra,{className:"w-5 h-5 text-amber-400"}),u.jsx("h3",{className:"text-base font-bold font-display tracking-wide text-white",children:"CHRONOLOGICAL MAINTENANCE VAULT & EXPENSE LEDGER"})]}),u.jsx("p",{className:"text-xs font-mono text-slate-400 mt-0.5",children:"Verified parts catalogue, torque specifications, fluid specs & receipts"})]}),u.jsxs("button",{onClick:()=>t({}),className:"inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-obsidian-950 transition-all shadow-md active:scale-95",children:[u.jsx(mx,{className:"w-4 h-4 stroke-[2.5]"}),u.jsx("span",{children:"LOG NEW SERVICE RECORD"})]})]}),u.jsxs("div",{className:"flex flex-wrap items-center gap-2 mb-6 font-mono text-xs",children:[u.jsxs("div",{className:"flex items-center space-x-1 bg-obsidian-950 p-1 rounded-lg border border-slate-800",children:[u.jsx("button",{onClick:()=>o("all"),className:`px-2.5 py-1 rounded transition-colors ${r==="all"?"bg-amber-500/20 text-amber-300 font-bold":"text-slate-400 hover:text-white"}`,children:"ALL FLEET"}),u.jsx("button",{onClick:()=>o("colorado-zr2"),className:`px-2.5 py-1 rounded transition-colors ${r==="colorado-zr2"?"bg-amber-500/20 text-amber-300 font-bold":"text-slate-400 hover:text-white"}`,children:"🛻 ZR2"}),u.jsx("button",{onClick:()=>o("murano-midnight"),className:`px-2.5 py-1 rounded transition-colors ${r==="murano-midnight"?"bg-amber-500/20 text-amber-300 font-bold":"text-slate-400 hover:text-white"}`,children:"🚘 MURANO"})]}),u.jsx("div",{className:"flex items-center space-x-1 bg-obsidian-950 p-1 rounded-lg border border-slate-800 overflow-x-auto",children:C.map(x=>u.jsx("button",{onClick:()=>d(x),className:`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${l===x?"bg-slate-800 text-amber-300 font-semibold":"text-slate-400 hover:text-white"}`,children:x.toUpperCase()},x))}),u.jsx("div",{className:"flex items-center space-x-1 bg-obsidian-950 p-1 rounded-lg border border-slate-800",children:["all","DIY","Dealership","Independent"].map(x=>u.jsx("button",{onClick:()=>p(x),className:`px-2 py-1 rounded transition-colors ${h===x?"bg-slate-800 text-amber-300 font-semibold":"text-slate-400 hover:text-white"}`,children:x.toUpperCase()},x))})]}),u.jsx("div",{className:"space-y-3 font-mono",children:S.length===0?u.jsx("div",{className:"p-8 text-center bg-obsidian-950/60 rounded-xl border border-slate-800/80 text-slate-500 text-xs",children:"No service logs matching current filter criteria."}):S.map(x=>{const _=e.find(z=>z.id===x.vehicleId),D=m===x.id;return u.jsxs("div",{className:"bg-obsidian-950/80 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all overflow-hidden",children:[u.jsxs("div",{onClick:()=>y(D?null:x.id),className:"p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none",children:[u.jsxs("div",{className:"flex items-start space-x-3",children:[u.jsx("div",{className:"p-2 rounded-lg bg-slate-900 border border-slate-800 text-lg",children:x.vehicleId==="colorado-zr2"?"🛻":"🚘"}),u.jsxs("div",{children:[u.jsxs("div",{className:"flex items-center space-x-2 flex-wrap",children:[u.jsx("h4",{className:"text-sm font-bold text-white tracking-wide",children:x.title}),u.jsx("span",{className:"text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700",children:x.category}),u.jsx("span",{className:`text-[10px] px-1.5 py-0.5 rounded font-bold ${x.providerType==="DIY"?"bg-emerald-500/15 text-emerald-300 border border-emerald-500/30":x.providerType==="Dealership"?"bg-blue-500/15 text-blue-300 border border-blue-500/30":"bg-amber-500/15 text-amber-300 border border-amber-500/30"}`,children:x.providerType})]}),u.jsxs("div",{className:"flex items-center space-x-3 text-xs text-slate-400 mt-1",children:[u.jsx("span",{children:_?_.name:x.vehicleId}),u.jsx("span",{children:"•"}),u.jsx("span",{children:x.date}),u.jsx("span",{children:"•"}),u.jsxs("span",{children:[x.mileage.toLocaleString()," mi"]}),u.jsx("span",{children:"•"}),u.jsx("span",{className:"text-slate-500",children:x.shopName})]})]})]}),u.jsxs("div",{className:"flex items-center justify-between sm:justify-end space-x-4",children:[u.jsxs("div",{className:"text-right",children:[u.jsxs("span",{className:"text-sm font-bold text-white block",children:["$",x.cost.toFixed(2)]}),x.dealerEstimatedCost>x.cost&&u.jsxs("span",{className:"text-[10px] text-emerald-400",children:["Saved $",(x.dealerEstimatedCost-x.cost).toFixed(2)]})]}),u.jsx(WE,{className:`w-4 h-4 text-slate-500 transition-transform ${D?"rotate-90":""}`})]})]}),D&&u.jsxs("div",{className:"px-4 pb-4 pt-2 border-t border-slate-800/80 bg-obsidian-900/60 text-xs",children:[x.notes&&u.jsxs("div",{className:"mb-3 p-3 rounded-lg bg-obsidian-950/80 border border-slate-800 text-slate-300",children:[u.jsx("span",{className:"text-[10px] text-slate-500 block font-bold mb-1",children:"TECHNICIAN / DIY NOTES:"}),u.jsx("p",{className:"leading-relaxed",children:x.notes})]}),x.partsUsed&&x.partsUsed.length>0&&u.jsxs("div",{className:"space-y-1.5",children:[u.jsx("span",{className:"text-[10px] text-slate-500 block font-bold",children:"PARTS, FLUIDS & QUANTITIES:"}),u.jsx("div",{className:"rounded-lg border border-slate-800 overflow-hidden",children:u.jsxs("table",{className:"w-full text-left text-[11px]",children:[u.jsx("thead",{className:"bg-obsidian-950 text-slate-400 border-b border-slate-800",children:u.jsxs("tr",{children:[u.jsx("th",{className:"py-1.5 px-3",children:"Part Description"}),u.jsx("th",{className:"py-1.5 px-3",children:"Part Number"}),u.jsx("th",{className:"py-1.5 px-3",children:"Qty"}),u.jsx("th",{className:"py-1.5 px-3 text-right",children:"Cost"})]})}),u.jsx("tbody",{className:"divide-y divide-slate-800/60 text-slate-300",children:x.partsUsed.map((z,R)=>u.jsxs("tr",{className:"hover:bg-slate-800/20",children:[u.jsx("td",{className:"py-1.5 px-3 font-semibold text-slate-200",children:z.name}),u.jsx("td",{className:"py-1.5 px-3 text-amber-400/90",children:z.partNumber}),u.jsxs("td",{className:"py-1.5 px-3",children:[z.qty," ",z.unit]}),u.jsxs("td",{className:"py-1.5 px-3 text-right",children:["$",z.cost.toFixed(2)]})]},R))})]})})]}),u.jsxs("div",{className:"flex items-center justify-between text-[10px] text-slate-500 mt-3 pt-2 border-t border-slate-800/60",children:[u.jsxs("span",{children:["Record ID: ",x.id]}),u.jsxs("span",{className:"flex items-center space-x-1 text-emerald-400",children:[u.jsx(Jg,{className:"w-3.5 h-3.5"}),u.jsx("span",{children:"VERIFIED SERVICE ENTRY"})]})]})]})]},x.id)})})]})]})}function uw({isOpen:s,onClose:e,vehicles:t,initialData:r,onSaveLog:o}){var ee,I;if(!s)return null;const[l,d]=De.useState((r==null?void 0:r.vehicleId)||"colorado-zr2"),h=t.find(q=>q.id===l)||t[0],[p,m]=De.useState(new Date().toISOString().split("T")[0]),[y,S]=De.useState((h==null?void 0:h.currentMileage)||4e4),[v,M]=De.useState((r==null?void 0:r.title)||"Full Synthetic Oil Change & Filter Replacement"),[w,C]=De.useState((r==null?void 0:r.category)||"Oil & Filter"),[x,_]=De.useState("DIY"),[D,z]=De.useState("Home Garage Workshop"),[R,P]=De.useState("52.00"),[L,B]=De.useState("125.00"),[b,N]=De.useState("Torqued drain plug to factory spec. Checked fluid levels and inspected chassis."),[O,V]=De.useState(w==="Oil & Filter"),[Y,Q]=De.useState(w==="Tires & Wheels"),[G,F]=De.useState([{name:((ee=h==null?void 0:h.specs)==null?void 0:ee.oilType)||"Full Synthetic Motor Oil",partNumber:"OEM-SPEC",qty:6,unit:"qt",cost:42},{name:((I=h==null?void 0:h.specs)==null?void 0:I.oilFilter)||"Engine Oil Filter",partNumber:"PF63 / 15208",qty:1,unit:"ea",cost:10}]),ce=()=>{F([...G,{name:"",partNumber:"",qty:1,unit:"ea",cost:0}])},Z=q=>{F(G.filter((xe,we)=>we!==q))},J=(q,xe,we)=>{const Ve=[...G];if(Ve[q][xe]=xe==="qty"||xe==="cost"?parseFloat(we)||0:we,F(Ve),xe==="cost"){const $e=Ve.reduce((ae,de)=>ae+(de.cost||0),0);P($e.toFixed(2))}},W=q=>{q.preventDefault();const xe={id:`log-${Date.now()}`,vehicleId:l,date:p,mileage:parseInt(y,10),title:v,category:w,providerType:x,shopName:D,cost:parseFloat(R)||0,dealerEstimatedCost:parseFloat(L)||0,partsUsed:G.filter(we=>we.name.trim()!==""),notes:b,verified:!0};o(xe,{resetOilLife:O,updateTireRotation:Y}),e()};return u.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm overflow-y-auto",children:u.jsxs("div",{className:"hud-card w-full max-w-2xl rounded-2xl border border-slate-700/80 bg-obsidian-900 shadow-2xl p-6 font-mono text-xs",children:[u.jsxs("div",{className:"flex items-center justify-between pb-4 mb-4 border-b border-slate-800",children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(ra,{className:"w-5 h-5 text-amber-400"}),u.jsx("h3",{className:"text-sm font-bold text-white font-display tracking-wide uppercase",children:"LOG FLEET MAINTENANCE RECORD"})]}),u.jsx("button",{onClick:e,className:"p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800",children:u.jsx(ou,{className:"w-5 h-5"})})]}),u.jsxs("form",{onSubmit:W,className:"space-y-4",children:[u.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-3",children:[u.jsxs("div",{children:[u.jsx("label",{className:"text-[10px] text-slate-400 block mb-1",children:"SELECT VEHICLE"}),u.jsx("select",{value:l,onChange:q=>d(q.target.value),className:"w-full bg-obsidian-950 border border-slate-700 rounded-lg p-2 text-white font-semibold",children:t.map(q=>u.jsxs("option",{value:q.id,children:[q.name," (",q.plate,")"]},q.id))})]}),u.jsxs("div",{children:[u.jsx("label",{className:"text-[10px] text-slate-400 block mb-1",children:"SERVICE DATE"}),u.jsx("input",{type:"date",value:p,onChange:q=>m(q.target.value),className:"w-full bg-obsidian-950 border border-slate-700 rounded-lg p-2 text-white",required:!0})]}),u.jsxs("div",{children:[u.jsx("label",{className:"text-[10px] text-slate-400 block mb-1",children:"ODOMETER MILES"}),u.jsx("input",{type:"number",value:y,onChange:q=>S(q.target.value),className:"w-full bg-obsidian-950 border border-slate-700 rounded-lg p-2 text-white font-bold",required:!0})]})]}),u.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[u.jsxs("div",{children:[u.jsx("label",{className:"text-[10px] text-slate-400 block mb-1",children:"SERVICE TITLE / WORK PERFORMED"}),u.jsx("input",{type:"text",value:v,onChange:q=>M(q.target.value),className:"w-full bg-obsidian-950 border border-slate-700 rounded-lg p-2 text-white",required:!0})]}),u.jsxs("div",{children:[u.jsx("label",{className:"text-[10px] text-slate-400 block mb-1",children:"SERVICE CATEGORY"}),u.jsxs("select",{value:w,onChange:q=>{C(q.target.value),q.target.value==="Oil & Filter"&&V(!0),q.target.value==="Tires & Wheels"&&Q(!0)},className:"w-full bg-obsidian-950 border border-slate-700 rounded-lg p-2 text-white",children:[u.jsx("option",{value:"Oil & Filter",children:"Oil & Filter"}),u.jsx("option",{value:"Tires & Wheels",children:"Tires & Wheels"}),u.jsx("option",{value:"Suspension",children:"Suspension & Dampers"}),u.jsx("option",{value:"Fluids & Drivetrain",children:"Fluids & Drivetrain"}),u.jsx("option",{value:"Brakes",children:"Brakes & Hydraulics"}),u.jsx("option",{value:"Inspection",children:"Inspection & Compliance"})]})]})]}),u.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-3",children:[u.jsxs("div",{children:[u.jsx("label",{className:"text-[10px] text-slate-400 block mb-1",children:"SERVICE PROVIDER"}),u.jsxs("select",{value:x,onChange:q=>_(q.target.value),className:"w-full bg-obsidian-950 border border-slate-700 rounded-lg p-2 text-white",children:[u.jsx("option",{value:"DIY",children:"DIY (Home Garage Workshop)"}),u.jsx("option",{value:"Dealership",children:"Dealership (GM / Nissan OEM)"}),u.jsx("option",{value:"Independent",children:"Independent Specialist"})]})]}),u.jsxs("div",{children:[u.jsx("label",{className:"text-[10px] text-slate-400 block mb-1",children:"ACTUAL COST ($ USD)"}),u.jsx("input",{type:"number",step:"0.01",value:R,onChange:q=>P(q.target.value),className:"w-full bg-obsidian-950 border border-slate-700 rounded-lg p-2 text-emerald-400 font-bold",required:!0})]}),u.jsxs("div",{children:[u.jsx("label",{className:"text-[10px] text-slate-400 block mb-1",children:"DEALER ESTIMATE ($ USD)"}),u.jsx("input",{type:"number",step:"0.01",value:L,onChange:q=>B(q.target.value),className:"w-full bg-obsidian-950 border border-slate-700 rounded-lg p-2 text-slate-300"})]})]}),u.jsxs("div",{className:"p-3 rounded-lg bg-obsidian-950/90 border border-slate-800 space-y-2",children:[u.jsx("span",{className:"text-[10px] text-amber-400 font-bold block uppercase tracking-wide",children:"AUTOMATED TELEMETRY TRIGGERS"}),u.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-3",children:[u.jsxs("label",{className:"flex items-center space-x-2 cursor-pointer",children:[u.jsx("input",{type:"checkbox",checked:O,onChange:q=>V(q.target.checked),className:"rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"}),u.jsx("span",{className:"text-slate-200",children:"Reset Oil Life Monitor to 100%"})]}),u.jsxs("label",{className:"flex items-center space-x-2 cursor-pointer",children:[u.jsx("input",{type:"checkbox",checked:Y,onChange:q=>Q(q.target.checked),className:"rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"}),u.jsx("span",{className:"text-slate-200",children:"Update Last Tire Rotation Mileage"})]})]})]}),u.jsxs("div",{className:"space-y-2",children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsx("span",{className:"text-[10px] text-slate-400 uppercase font-bold",children:"PARTS & FLUIDS SPECIFICATION"}),u.jsxs("button",{type:"button",onClick:ce,className:"text-amber-400 hover:text-amber-300 text-[11px] flex items-center space-x-1",children:[u.jsx(mx,{className:"w-3 h-3"}),u.jsx("span",{children:"Add Item"})]})]}),u.jsx("div",{className:"space-y-2 max-h-36 overflow-y-auto pr-1",children:G.map((q,xe)=>u.jsxs("div",{className:"flex items-center space-x-2 bg-obsidian-950 p-2 rounded-lg border border-slate-800",children:[u.jsx("input",{type:"text",placeholder:"Part Name",value:q.name,onChange:we=>J(xe,"name",we.target.value),className:"flex-1 bg-transparent text-white border-b border-slate-800 pb-0.5"}),u.jsx("input",{type:"text",placeholder:"Part #",value:q.partNumber,onChange:we=>J(xe,"partNumber",we.target.value),className:"w-24 bg-transparent text-amber-300 border-b border-slate-800 pb-0.5"}),u.jsx("input",{type:"number",placeholder:"Qty",value:q.qty,onChange:we=>J(xe,"qty",we.target.value),className:"w-12 bg-transparent text-white border-b border-slate-800 pb-0.5 text-center"}),u.jsx("input",{type:"number",step:"0.01",placeholder:"$",value:q.cost,onChange:we=>J(xe,"cost",we.target.value),className:"w-16 bg-transparent text-emerald-400 border-b border-slate-800 pb-0.5 text-right font-bold"}),u.jsx("button",{type:"button",onClick:()=>Z(xe),className:"text-slate-500 hover:text-rose-400 p-1",children:u.jsx(nw,{className:"w-3.5 h-3.5"})})]},xe))})]}),u.jsxs("div",{children:[u.jsx("label",{className:"text-[10px] text-slate-400 block mb-1",children:"DIY / INVOICE NOTES & TORQUE SPECS"}),u.jsx("textarea",{rows:2,value:b,onChange:q=>N(q.target.value),className:"w-full bg-obsidian-950 border border-slate-700 rounded-lg p-2 text-slate-200"})]}),u.jsxs("div",{className:"flex items-center justify-end space-x-3 pt-3 border-t border-slate-800",children:[u.jsx("button",{type:"button",onClick:e,className:"px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors",children:"CANCEL"}),u.jsx("button",{type:"submit",className:"px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold font-mono transition-all shadow-lg active:scale-95",children:"SAVE TO MAINTENANCE VAULT"})]})]})]})})}function dw({isOpen:s,onClose:e,hubAlerts:t,onPushToHub:r,vehicles:o,logs:l}){var C;if(!s)return null;const[d,h]=De.useState(!1),[p,m]=De.useState(!1),y=JSON.stringify(t,null,2),S=()=>{navigator.clipboard.writeText(y),h(!0),setTimeout(()=>h(!1),2e3)},v=()=>{r(),m(!0),setTimeout(()=>m(!1),2500)},M=()=>{const x={timestamp:new Date().toISOString(),vehicles:o,logs:l,hubAlerts:t},_=new Blob([JSON.stringify(x,null,2)],{type:"application/json"}),D=URL.createObjectURL(_),z=document.createElement("a");z.href=D,z.download=`fleet_garage_backup_${new Date().toISOString().split("T")[0]}.json`,z.click(),URL.revokeObjectURL(D)},w=((C=t==null?void 0:t.garage)==null?void 0:C.items)||[];return u.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-sm overflow-y-auto",children:u.jsxs("div",{className:"hud-card w-full max-w-2xl rounded-2xl border border-slate-700 bg-obsidian-900 shadow-2xl p-6 font-mono text-xs",children:[u.jsxs("div",{className:"flex items-center justify-between pb-4 mb-4 border-b border-slate-800",children:[u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx("span",{className:"text-xl",children:"📡"}),u.jsxs("div",{children:[u.jsx("h3",{className:"text-sm font-bold text-white font-display tracking-wide uppercase",children:"CENTRAL COMMAND HUB // TACTICAL ALERT BRIDGE"}),u.jsx("p",{className:"text-[11px] text-slate-400",children:"Direct Telemetry & Compliance Bridge into Orbit 06 Tactical Alert Registry"})]})]}),u.jsx("button",{onClick:e,className:"p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800",children:u.jsx(ou,{className:"w-5 h-5"})})]}),u.jsxs("div",{className:"mb-4",children:[u.jsxs("div",{className:"flex items-center justify-between mb-2",children:[u.jsxs("span",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-wide",children:["CURRENTLY BROADCASTING (",w.length," ACTIVE ALERTS)"]}),u.jsxs("span",{className:"text-[10px] text-emerald-400 font-semibold flex items-center space-x-1",children:[u.jsx(tw,{className:"w-3.5 h-3.5"}),u.jsx("span",{children:"LIVE TELEMETRY STREAM"})]})]}),u.jsx("div",{className:"space-y-2 max-h-48 overflow-y-auto pr-1",children:w.map((x,_)=>u.jsxs("div",{className:`p-3 rounded-lg border flex items-start space-x-2.5 ${x.severity==="CRITICAL"?"bg-rose-950/30 border-rose-500/50 text-rose-200":x.severity==="WARNING"?"bg-amber-950/30 border-amber-500/50 text-amber-200":"bg-slate-900/80 border-slate-700 text-slate-200"}`,children:[u.jsx(eu,{className:`w-4 h-4 shrink-0 mt-0.5 ${x.severity==="CRITICAL"?"text-rose-400 animate-pulse":x.severity==="WARNING"?"text-amber-400":"text-sky-400"}`}),u.jsxs("div",{className:"flex-1",children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsx("span",{className:"font-bold text-xs",children:x.title}),u.jsx("span",{className:"text-[9px] px-1.5 py-0.2 rounded font-bold uppercase border border-current opacity-80",children:x.severity})]}),u.jsx("p",{className:"text-[11px] opacity-85 mt-0.5 leading-snug",children:x.message}),u.jsxs("span",{className:"text-[9px] opacity-60 block mt-1",children:["Ref: ",x.statute," • Code: ",x.code]})]})]},_))})]}),u.jsxs("div",{className:"mb-4",children:[u.jsxs("div",{className:"flex items-center justify-between mb-1",children:[u.jsx("span",{className:"text-[10px] text-slate-400 font-bold uppercase",children:"HUB TELEMETRY PAYLOAD (JSON)"}),u.jsxs("button",{onClick:S,className:"text-amber-400 hover:text-amber-300 text-[11px] flex items-center space-x-1",children:[d?u.jsx(Yg,{className:"w-3 h-3 text-emerald-400"}):u.jsx(tx,{className:"w-3 h-3"}),u.jsx("span",{children:d?"Copied!":"Copy JSON"})]})]}),u.jsx("pre",{className:"bg-obsidian-950 p-3 rounded-lg border border-slate-800 text-[10px] text-amber-300/90 max-h-36 overflow-y-auto leading-relaxed select-all",children:y})]}),u.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800",children:[u.jsxs("button",{onClick:M,className:"w-full sm:w-auto px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center space-x-1.5 border border-slate-700 transition-colors",children:[u.jsx(qE,{className:"w-3.5 h-3.5"}),u.jsx("span",{children:"EXPORT FLEET BACKUP JSON"})]}),u.jsxs("div",{className:"flex items-center space-x-2 w-full sm:w-auto justify-end",children:[u.jsx("button",{onClick:e,className:"px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors",children:"CLOSE"}),u.jsxs("button",{onClick:v,className:"px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold flex items-center space-x-1.5 shadow-lg active:scale-95 transition-all",children:[u.jsx(ew,{className:"w-3.5 h-3.5 stroke-[2.5]"}),u.jsx("span",{children:p?"PUSHED TO HUB! ✓":"PUSH ALERTS TO HUB"})]})]})]})]})})}const rg="v4_3d_interactive_garage";function fw(){const[s,e]=De.useState(()=>{try{if(localStorage.getItem("fleet_schema_version")!==rg)return localStorage.setItem("fleet_schema_version",rg),localStorage.setItem("fleet_vehicles_state",JSON.stringify(Uc)),Uc;const N=localStorage.getItem("fleet_vehicles_state");return N?JSON.parse(N):Uc}catch{return Uc}}),[t,r]=De.useState(()=>{try{const b=localStorage.getItem("fleet_maintenance_logs");return b?JSON.parse(b):ig}catch{return ig}}),[o,l]=De.useState("3d"),[d,h]=De.useState(null),[p,m]=De.useState("all"),[y,S]=De.useState(!1),[v,M]=De.useState(null),[w,C]=De.useState(!1),x=iw(s);De.useEffect(()=>{try{localStorage.setItem("fleet_vehicles_state",JSON.stringify(s))}catch{}},[s]),De.useEffect(()=>{try{localStorage.setItem("fleet_maintenance_logs",JSON.stringify(t))}catch{}},[t]);const _=()=>{try{const b=localStorage.getItem("hub_alerts");let N=b?JSON.parse(b):{};if(N.garage=x.garage,localStorage.setItem("hub_alerts",JSON.stringify(N)),window.parent&&window.parent!==window&&window.parent.postMessage({type:"FLEET_ALERTS_UPDATED",payload:x.garage},"*"),"BroadcastChannel"in window){const O=new BroadcastChannel("antigravity_hub");O.postMessage({type:"FLEET_ALERTS_UPDATED",payload:x.garage}),O.close()}}catch(b){console.warn("Hub sync notice:",b)}};De.useEffect(()=>{_()},[s]);const D=(b,N)=>{e(O=>O.map(V=>V.id===b?{...V,currentMileage:N}:V))},z=b=>{e(N=>N.map(O=>O.id===b?{...O,oilLife:{...O.oilLife,manualOverridePct:100,lastServiceMileage:O.currentMileage,lastServiceDate:new Date().toISOString().split("T")[0]}}:O)),M({vehicleId:b,title:"dexos / Full Synthetic Oil Change & Filter Replacement",category:"Oil & Filter"}),S(!0)},R=b=>{var V;const N=s.find(Y=>Y.id===b),O=(V=N==null?void 0:N.tireRotation)==null?void 0:V.type.includes("5-Tire");e(Y=>Y.map(Q=>Q.id===b?{...Q,tireRotation:{...Q.tireRotation,lastRotationMileage:Q.currentMileage,lastRotationDate:new Date().toISOString().split("T")[0]}}:Q)),M({vehicleId:b,title:O?"5-Tire Spare Cycle Rotation & Pressure Calibrate":"4-Tire Modified Forward Cross & Balance",category:"Tires & Wheels"}),S(!0)},P=b=>{e(N=>N.map(O=>{if(O.id===b){const V=new Date(O.compliance.tabsExpiryDate);V.setFullYear(V.getFullYear()+1);const Y=V.toISOString().split("T")[0];return{...O,compliance:{...O.compliance,tabsExpiryDate:Y}}}return O}))},L=(b,{resetOilLife:N,updateTireRotation:O})=>{r(V=>[b,...V]),e(V=>V.map(Y=>{if(Y.id===b.vehicleId){let Q={...Y};return b.mileage>Y.currentMileage&&(Q.currentMileage=b.mileage),N&&(Q.oilLife={...Q.oilLife,manualOverridePct:100,lastServiceMileage:b.mileage,lastServiceDate:b.date}),O&&(Q.tireRotation={...Q.tireRotation,lastRotationMileage:b.mileage,lastRotationDate:b.date}),Q}return Y}))},B=p==="all"?s:s.filter(b=>b.id===p);return u.jsxs("div",{className:"relative w-screen h-screen overflow-hidden bg-black text-slate-100 font-sans select-none",children:[o==="3d"?u.jsx(rw,{vehicles:s,activeVehicleId:p,onSelectVehicle:b=>m(b),onOpenLogModal:b=>{M(b),S(!0)},onResetOilLife:z,onRotateTires:R,onOpenStatutory:()=>h("compliance"),onOpenVault:()=>h("vault"),onOpenTelemetry:()=>h("telemetry")}):u.jsx("div",{className:"w-full h-full overflow-y-auto p-4 sm:p-6 bg-obsidian-950",children:u.jsxs("div",{className:"max-w-7xl mx-auto space-y-6",children:[u.jsxs("div",{className:"flex items-center justify-between bg-obsidian-900 border border-slate-800 rounded-2xl p-4",children:[u.jsxs("div",{children:[u.jsx("h2",{className:"text-lg font-bold text-white",children:"2D PHOTOGRAPHIC SHOWROOM"}),u.jsx("p",{className:"text-xs text-slate-400 font-mono",children:"Original reference photos & technical blueprint view"})]}),u.jsxs("button",{onClick:()=>l("3d"),className:"px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold font-mono text-xs shadow-lg flex items-center space-x-2",children:[u.jsx(ng,{className:"w-4 h-4"}),u.jsx("span",{children:"ENTER 3D INTERACTIVE GARAGE"})]})]}),u.jsx(sw,{vehicles:s,activeVehicleId:p,onSelectVehicle:m,onOpenLogModal:b=>{M(b),S(!0)},onResetOilLife:z,onRotateTires:R})]})}),u.jsx("div",{className:"absolute top-4 left-4 z-40 pointer-events-auto",children:u.jsx("button",{onClick:()=>l(o==="3d"?"2d":"3d"),className:"px-3 py-1.5 rounded-xl bg-obsidian-950/90 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white font-mono text-[11px] font-bold shadow-2xl flex items-center space-x-1.5 transition-all",title:"Switch between 3D Interactive Garage and 2D Photo Studio",children:o==="3d"?u.jsxs(u.Fragment,{children:[u.jsx(HE,{className:"w-3.5 h-3.5 text-amber-400"}),u.jsx("span",{className:"hidden sm:inline",children:"2D PHOTOS"})]}):u.jsxs(u.Fragment,{children:[u.jsx(ng,{className:"w-3.5 h-3.5 text-amber-400"}),u.jsx("span",{className:"hidden sm:inline",children:"3D GARAGE"})]})})}),d&&u.jsx("div",{className:"absolute inset-0 z-50 bg-black/75 backdrop-blur-xl flex flex-col justify-end sm:justify-center p-2 sm:p-6 overflow-hidden animate-fadeIn",children:u.jsxs("div",{className:"relative w-full max-w-6xl max-h-[90vh] mx-auto bg-obsidian-950/95 border-2 border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden",children:[u.jsxs("div",{className:"flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-obsidian-900/90 font-mono",children:[u.jsxs("div",{className:"flex items-center space-x-3",children:[u.jsxs("span",{className:"p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400",children:[d==="telemetry"&&u.jsx(Qc,{className:"w-5 h-5"}),d==="compliance"&&u.jsx(Nh,{className:"w-5 h-5"}),d==="vault"&&u.jsx(ra,{className:"w-5 h-5"})]}),u.jsxs("div",{children:[u.jsxs("h3",{className:"font-bold text-base text-white tracking-wide",children:[d==="telemetry"&&"FLEET TELEMETRY & COMPONENT STATUS",d==="compliance"&&"STATUTORY, WA DOL & ASSET COMPLIANCE",d==="vault"&&"CHRONOLOGICAL SERVICE VAULT & EXPENSE LEDGER"]}),u.jsxs("span",{className:"text-[11px] text-slate-400",children:[d==="telemetry"&&"Full fluid specs, oil decay breakdown, and tire rotations",d==="compliance"&&"WA State tab expiration countdown & direct renewal link",d==="vault"&&"Receipts, part numbers, and maintenance history log"]})]})]}),u.jsxs("button",{onClick:()=>h(null),className:"px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold flex items-center space-x-1.5 transition-all",children:[u.jsx(ou,{className:"w-4 h-4"}),u.jsx("span",{className:"text-xs",children:"CLOSE DRAWER"})]})]}),u.jsxs("div",{className:"p-6 overflow-y-auto space-y-6 flex-1",children:[d==="telemetry"&&u.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:B.map(b=>u.jsx(ow,{vehicle:b,onUpdateMileage:D,onResetOilLife:z,onRotateTires:R,onOpenLogModal:N=>{M(N),S(!0)}},b.id))}),d==="compliance"&&u.jsx(lw,{vehicles:s,onRenewTabs:P}),d==="vault"&&u.jsx(cw,{logs:t,vehicles:s,onOpenLogModal:b=>{M(b),S(!0)}})]}),u.jsxs("div",{className:"px-6 py-3 border-t border-slate-800 bg-obsidian-900/60 font-mono text-xs text-slate-400 flex items-center justify-between",children:[u.jsx("span",{children:"ANTIGRAVITY FLEET COMMAND // TACTICAL OVERLAY"}),u.jsx("button",{onClick:()=>h(null),className:"text-amber-400 hover:underline font-bold",children:"← Return to 3D Garage"})]})]})}),u.jsx(uw,{isOpen:y,onClose:()=>S(!1),vehicles:s,initialData:v,onSaveLog:L}),u.jsx(dw,{isOpen:w,onClose:()=>C(!1),hubAlerts:x,onPushToHub:_,vehicles:s,logs:t})]})}Yv.createRoot(document.getElementById("root")).render(u.jsx(zv.StrictMode,{children:u.jsx(fw,{})}));
