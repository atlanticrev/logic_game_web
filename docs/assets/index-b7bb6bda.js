var S=Object.defineProperty;var k=(r,c,t)=>c in r?S(r,c,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[c]=t;var h=(r,c,t)=>(k(r,typeof c!="symbol"?c+"":c,t),t);(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const z=`:host{display:block;position:relative;top:0;left:0}:host>canvas{--size: 0;width:var(--size);height:var(--size);background-color:#e0e0e0;border:0}
`;class n{constructor(c,t){h(this,"x");h(this,"y");this.x=c,this.y=t}static create(c,t){return new n(c,t)}}const g=400,v=320,m=500;class B extends HTMLElement{constructor(){super();h(this,"canvas");h(this,"ctx");h(this,"center");h(this,"bigFieldRectSize");h(this,"smallFieldRectSize");h(this,"checkerRadius");h(this,"regions");h(this,"activeCheckerType");h(this,"unitBlockSize");this.attachShadow({mode:"open"}),this.onMouseMove=this.onMouseMove.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.activeCheckerType=this.getAttribute("active-checker");const t=document.createElement("style");t.textContent=z,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d");let i;window.innerWidth<g?(i=v,this.canvas.style.setProperty("--size",`${i}px`),this.canvas.width=i,this.canvas.height=i):(i=m,this.canvas.style.setProperty("--size",`${i}px`),this.canvas.width=i,this.canvas.height=i),this.center=n.create(this.canvas.width*.5,this.canvas.height*.5),this.bigFieldRectSize=i-2,this.smallFieldRectSize=this.bigFieldRectSize*.5,this.checkerRadius=this.smallFieldRectSize/8,this.unitBlockSize=this.smallFieldRectSize*.5;const e=30,s=e*2;this.regions={big:{W:{checkerCoordinate:n.create(this.center.x-this.bigFieldRectSize*.5+this.smallFieldRectSize*.25,this.center.y),regionSettings:{path:new Path2D(`
                            M ${this.center.x-this.unitBlockSize} ${this.center.y-this.unitBlockSize*.5}
                            h ${-this.unitBlockSize}
                            v ${this.unitBlockSize}
                            h ${this.unitBlockSize}
                            Z
                        `),color:"#0048BA",isActive:!1}},N:{checkerCoordinate:n.create(this.center.x,this.center.y-this.bigFieldRectSize*.5+this.smallFieldRectSize*.25),regionSettings:{path:new Path2D(`
                        M ${this.center.x-this.unitBlockSize*.5} ${this.center.y-this.unitBlockSize}
                        v ${-this.unitBlockSize}
                        h ${this.unitBlockSize}
                        v ${this.unitBlockSize}
                        Z
                    `),color:"#0048BA",isActive:!1}},S:{checkerCoordinate:n.create(this.center.x+this.bigFieldRectSize*.5-this.smallFieldRectSize*.25,this.center.y),regionSettings:{path:new Path2D(`
                        M ${this.center.x+this.unitBlockSize} ${this.center.y-this.unitBlockSize*.5}
                        h ${this.unitBlockSize}
                        v ${this.unitBlockSize}
                        h ${-this.unitBlockSize}
                        Z
                    `),color:"#0048BA",isActive:!1}},E:{checkerCoordinate:n.create(this.center.x,this.center.y+this.bigFieldRectSize*.5-this.smallFieldRectSize*.25),regionSettings:{path:new Path2D(`
                        M ${this.center.x-this.unitBlockSize*.5} ${this.center.y+this.unitBlockSize}
                        v ${this.unitBlockSize}
                        h ${this.unitBlockSize}
                        v ${-this.unitBlockSize}
                        Z
                    `),color:"#0048BA",isActive:!1}},NW:{checkerCoordinate:n.create(this.center.x-this.bigFieldRectSize*.5+this.smallFieldRectSize*.25,this.center.y-this.bigFieldRectSize*.5+this.smallFieldRectSize*.25),regionSettings:{path:new Path2D(`
                        M ${this.center.x-this.unitBlockSize} ${this.center.y-this.unitBlockSize*.5}
                        v ${-(this.unitBlockSize-this.unitBlockSize*.5)}
                        h ${this.unitBlockSize-this.unitBlockSize*.5}
                        v ${-this.unitBlockSize}
                        h ${-(this.unitBlockSize*2-this.unitBlockSize*.5)}
                        v ${this.unitBlockSize*2-this.unitBlockSize*.5}
                        Z
                    `),color:"#0048BA",isActive:!1}},NE:{checkerCoordinate:n.create(this.center.x+this.bigFieldRectSize*.5-this.smallFieldRectSize*.25,this.center.y-this.bigFieldRectSize*.5+this.smallFieldRectSize*.25),regionSettings:{path:new Path2D(`
                        M ${this.center.x+this.unitBlockSize} ${this.center.y-this.unitBlockSize*.5}
                        v ${-(this.unitBlockSize-this.unitBlockSize*.5)}
                        h ${-(this.unitBlockSize-this.unitBlockSize*.5)}
                        v ${-this.unitBlockSize}
                        h ${this.unitBlockSize*2-this.unitBlockSize*.5}
                        v ${this.unitBlockSize*2-this.unitBlockSize*.5}
                        Z
                    `),color:"#0048BA",isActive:!1}},SE:{checkerCoordinate:n.create(this.center.x+this.bigFieldRectSize*.5-this.smallFieldRectSize*.25,this.center.y+this.bigFieldRectSize*.5-this.smallFieldRectSize*.25),regionSettings:{path:new Path2D(`
                        M ${this.center.x+this.unitBlockSize} ${this.center.y+this.unitBlockSize*.5}
                        v ${this.unitBlockSize-this.unitBlockSize*.5}
                        h ${-(this.unitBlockSize-this.unitBlockSize*.5)}
                        v ${this.unitBlockSize}
                        h ${this.unitBlockSize*2-this.unitBlockSize*.5}
                        v ${-(this.unitBlockSize*2-this.unitBlockSize*.5)}
                        Z
                    `),color:"#0048BA",isActive:!1}},SW:{checkerCoordinate:n.create(this.center.x-this.bigFieldRectSize*.5+this.smallFieldRectSize*.25,this.center.y+this.bigFieldRectSize*.5-this.smallFieldRectSize*.25),regionSettings:{path:new Path2D(`
                        M ${this.center.x-this.unitBlockSize} ${this.center.y+this.unitBlockSize*.5}
                        v ${this.unitBlockSize-this.unitBlockSize*.5}
                        h ${this.unitBlockSize-this.unitBlockSize*.5}
                        v ${this.unitBlockSize}
                        h ${-(this.unitBlockSize*2-this.unitBlockSize*.5)}
                        v ${-(this.unitBlockSize*2-this.unitBlockSize*.5)}
                        Z
                    `),color:"#0048BA",isActive:!1}}},small:{W:{checkerCoordinate:n.create(this.center.x-this.unitBlockSize*.5,this.center.y),regionSettings:{path:new Path2D(`
                            M ${this.center.x-e} ${this.center.y+e}
                            h ${-(this.unitBlockSize-e)}
                            v ${-s}
                            h ${this.unitBlockSize-e}
                            Z
                        `),color:"#0048BA",isActive:!1}},N:{checkerCoordinate:n.create(this.center.x,this.center.y-this.unitBlockSize*.5),regionSettings:{path:new Path2D(`
                            M ${this.center.x-e} ${this.center.y-e}
                            v ${-(this.unitBlockSize-e)}
                            h ${s}
                            v ${this.unitBlockSize-e}
                            Z
                        `),color:"#0048BA",isActive:!1}},E:{checkerCoordinate:n.create(this.center.x+this.unitBlockSize-this.smallFieldRectSize*.25,this.center.y),regionSettings:{path:new Path2D(`
                            M ${this.center.x+e} ${this.center.y-e}
                            h ${this.unitBlockSize-e}
                            v ${s}
                            h ${-(this.unitBlockSize-e)}
                            Z
                        `),color:"#0048BA",isActive:!1}},S:{checkerCoordinate:n.create(this.center.x,this.center.y+this.unitBlockSize-this.smallFieldRectSize*.25),regionSettings:{path:new Path2D(`
                            M ${this.center.x-e} ${this.center.y+e}
                            v ${this.unitBlockSize-e}
                            h ${s}
                            v ${-(this.unitBlockSize-e)}
                            Z
                        `),color:"#0048BA",isActive:!1}},NW:{checkerCoordinate:n.create(this.center.x-this.unitBlockSize+this.smallFieldRectSize*.25,this.center.y-this.unitBlockSize+this.smallFieldRectSize*.25),regionSettings:{path:new Path2D(`
                            M ${this.center.x-e} ${this.center.y-e}
                            h ${-(this.unitBlockSize-e)}
                            v ${-(this.unitBlockSize-e)}
                            h ${this.unitBlockSize-e}
                            Z
                        `),color:"#0048BA",isActive:!1}},NE:{checkerCoordinate:n.create(this.center.x+this.unitBlockSize-this.smallFieldRectSize*.25,this.center.y-this.unitBlockSize+this.smallFieldRectSize*.25),regionSettings:{path:new Path2D(`
                            M ${this.center.x+e} ${this.center.y-e}
                            h ${this.unitBlockSize-e}
                            v ${-(this.unitBlockSize-e)}
                            h ${-(this.unitBlockSize-e)}
                            Z
                        `),color:"#0048BA",isActive:!1}},SE:{checkerCoordinate:n.create(this.center.x+this.unitBlockSize-this.smallFieldRectSize*.25,this.center.y+this.unitBlockSize-this.smallFieldRectSize*.25),regionSettings:{path:new Path2D(`
                            M ${this.center.x+e} ${this.center.y+e}
                            h ${this.unitBlockSize-e}
                            v ${this.unitBlockSize-e}
                            h ${-(this.unitBlockSize-e)}
                            Z
                        `),color:"#0048BA",isActive:!1}},SW:{checkerCoordinate:n.create(this.center.x-this.unitBlockSize+this.smallFieldRectSize*.25,this.center.y+this.unitBlockSize-this.smallFieldRectSize*.25),regionSettings:{path:new Path2D(`
                            M ${this.center.x-e} ${this.center.y+e}
                            h ${-(this.unitBlockSize-e)}
                            v ${this.unitBlockSize-e}
                            h ${this.unitBlockSize-e}
                            Z
                        `),color:"#0048BA",isActive:!1}}}},this.shadowRoot.append(t,this.canvas)}static get observedAttributes(){return["active-checker"]}onMouseMove(t){const{offsetX:i,offsetY:e}=t;for(let s of Object.values(this.regions))for(let o of Object.values(s))t.target!==this?o.regionSettings.isActive=!1:o.regionSettings.isActive=this.ctx.isPointInPath(o.regionSettings.path,i,e)}onMouseDown(t){const{offsetX:i,offsetY:e}=t;for(let s of Object.values(this.regions))for(let o of Object.values(s)){if(t.target!==this)return;if(this.ctx.isPointInPath(o.regionSettings.path,i,e)){if(o.regionSettings.checker){o.regionSettings.checker=null;return}o.regionSettings.checker=this.activeCheckerType==="some"?{type:"some"}:{type:"empty"}}}}connectedCallback(){this.draw(),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mousedown",this.onMouseDown)}disconnectedCallback(){document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mousedown",this.onMouseDown)}attributeChangedCallback(t,i,e){i!==e&&t==="active-checker"&&(this.activeCheckerType=e)}draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawField(),this.drawCheckers(),this.drawTexts(),requestAnimationFrame(()=>{this.draw()})}drawTexts(){this.ctx.font="italic 28px sans-serif",this.ctx.fillStyle="black",this.ctx.fillText("x",this.center.x-18,this.center.y-this.unitBlockSize-6),this.ctx.fillText("x'",this.center.x-24,this.center.y+this.unitBlockSize+22),this.ctx.fillText("y",this.center.x-this.unitBlockSize-21,this.center.y+20),this.ctx.fillText("y'",this.center.x+this.unitBlockSize+6,this.center.y+22),this.ctx.fillText("m",this.center.x-28,this.center.y-6),this.ctx.fillText("m'",this.center.x-this.unitBlockSize*2+4,this.center.y+this.unitBlockSize*2-6)}drawField(){this.drawRectAtCenter(this.ctx,{width:this.bigFieldRectSize,height:this.bigFieldRectSize},this.center),this.drawRectAtCenter(this.ctx,{width:this.smallFieldRectSize,height:this.smallFieldRectSize},this.center),this.drawLine(this.ctx,n.create(this.center.x,this.center.y-this.bigFieldRectSize*.5),n.create(this.center.x,this.center.y+this.bigFieldRectSize*.5)),this.drawLine(this.ctx,n.create(this.center.x-this.bigFieldRectSize*.5,this.center.y),n.create(this.center.y+this.bigFieldRectSize*.5,this.center.y))}drawRegion(){for(let t of Object.values(this.regions))for(let i of Object.values(t)){if(!i.regionSettings.path)return;this.ctx.fillStyle=i.regionSettings.isActive?(i==null?void 0:i.regionSettings.color)??"transparent":"transparent",this.ctx.globalAlpha=.1,this.ctx.fill(i.regionSettings.path),this.ctx.globalAlpha=1}}drawCheckers(){var t,i;for(let e of Object.values(this.regions))for(let s of Object.values(e))s.regionSettings.checker&&this.drawCircleAtPoint(this.ctx,s.checkerCoordinate,this.checkerRadius,{color:((i=(t=s.regionSettings)==null?void 0:t.checker)==null?void 0:i.type)==="some"?"red":"black"})}drawLine(t,i,e){t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(e.x,e.y),t.lineWidth=1,t.stroke(),t.closePath()}drawRectAtCenter(t,{width:i,height:e},{x:s,y:o}){const d=s-i*.5,u=o-e*.5;t.beginPath(),t.rect(d,u,i,e),t.lineWidth=1,t.stroke(),t.closePath()}drawCircleAtPoint(t,i,e,s){t.beginPath(),t.arc(i.x,i.y,e,0,Math.PI*2,!1),t.fillStyle=(s==null?void 0:s.color)??"black",t.shadowColor="black",t.shadowBlur=3,t.fill(),t.shadowBlur=0,t.closePath()}}customElements.define("ui-game-board",B);const y=`:host{display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;gap:4px;margin-bottom:10px}:host>button{width:100px;height:32px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;font-size:.85rem;color:#000;padding:5px 10px;background-color:#d3d3d3;border:1px solid gray;border-radius:4px}:host>button:hover{background-color:#e0e0e0;cursor:pointer}:host .checker-icon{--size: 20px;display:inline-block;width:var(--size);height:var(--size);border-radius:50%}:host .checker-icon__some{background-color:red}:host .checker-icon__empty{background-color:#000}:host .active-checker-display{display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;gap:4px;margin-left:auto}
`;class p extends HTMLElement{static get observedAttributes(){return["active-checker"]}constructor(){super(),this.attachShadow({mode:"open"}),this.onMouseDown=this.onMouseDown.bind(this),this.onKeyDown=this.onKeyDown.bind(this);const c=document.createElement("style");c.textContent=y;const t=document.createElement("div");t.innerHTML=`
            <button class='btn-some'>
                <span>Some</span>
                <span class='checker-icon checker-icon__some'></span>
            </button>
            
            <button class='btn-empty'>
                <span>Empty</span>
                <span class='checker-icon checker-icon__empty'></span>
            </button>
            
            <div class="active-checker-display">
                <span>Active: </span>
                <span class='checker-icon'></span>
            </div>
        `,this.shadowRoot.append(c,...Array.from(t.children))}onMouseDown(){const c=this.shadowRoot.querySelector(".btn-some"),t=this.shadowRoot.querySelector(".btn-empty"),i=this;c.addEventListener("click",()=>{i.dispatchEvent(new CustomEvent("CHECKER_TYPE_CHANGED",{detail:"some"}))}),t.addEventListener("click",()=>{i.dispatchEvent(new CustomEvent("CHECKER_TYPE_CHANGED",{detail:"empty"}))})}onKeyDown(c){c.code==="Space"&&(this.getAttribute("active-checker")==="some"?this.dispatchEvent(new CustomEvent("CHECKER_TYPE_CHANGED",{detail:"empty"})):this.dispatchEvent(new CustomEvent("CHECKER_TYPE_CHANGED",{detail:"some"})))}connectedCallback(){document.addEventListener("mousedown",this.onMouseDown),document.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){document.removeEventListener("mousedown",this.onMouseDown),document.removeEventListener("keydown",this.onKeyDown)}attributeChangedCallback(c,t,i){if(t!==i&&c==="active-checker"){const s=this.shadowRoot.querySelector(".active-checker-display").querySelector(".checker-icon");s.classList.toggle("checker-icon__some",i==="some"),s.classList.toggle("checker-icon__empty",i==="empty")}}}customElements.define("ui-checker-selector",p);const l=document.querySelector("#app");l.innerHTML=`
    <ui-checker-selector active-checker='some'></ui-checker-selector>
    <ui-game-board active-checker='some'></ui-game-board>
`;const f=l.querySelector("ui-game-board"),a=l.querySelector("ui-checker-selector");a.addEventListener("CHECKER_TYPE_CHANGED",r=>{f.setAttribute("active-checker",r.detail),a.setAttribute("active-checker",r.detail)});
