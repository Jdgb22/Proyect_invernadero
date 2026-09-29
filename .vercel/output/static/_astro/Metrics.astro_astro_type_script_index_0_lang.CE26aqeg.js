var e=[];try{let t=document.getElementById(`plants-data-source`)?.textContent;t&&(e=JSON.parse(t))}catch(e){console.error(`Error al cargar datos de plantas:`,e)}var t=document.getElementById(`plant-metrics-modal`),n=document.getElementById(`plant-modal-backdrop`),r=document.getElementById(`btn-close-plant-modal`),i=document.getElementById(`btn-close-plant-modal-bottom`),a=document.getElementById(`btn-measure-this-plant`),o=document.getElementById(`modal-plant-icon`),s=document.getElementById(`modal-plant-title`),c=document.getElementById(`modal-plant-subtitle`),l=document.getElementById(`modal-plant-health`),u=document.getElementById(`modal-plant-phase`);document.getElementById(`modal-plant-time`),document.getElementById(`modal-plant-resp`);var d=document.getElementById(`modal-plant-obs`),f=document.getElementById(`modal-kpi-ph`),p=document.getElementById(`modal-kpi-ph-desc`),m=document.getElementById(`modal-kpi-tin`),h=document.getElementById(`modal-kpi-tsoil`),g=document.getElementById(`modal-kpi-tout`),_=document.getElementById(`modal-kpi-growth`),v=document.getElementById(`modal-kpi-growth-bar`),y=document.getElementById(`modal-kpi-prod`),b=document.getElementById(`modal-growth-gain`),x=document.getElementById(`modal-svg-ph`),S=document.getElementById(`modal-svg-tin`),C=document.getElementById(`modal-svg-tout`),w=document.getElementById(`modal-svg-tsoil`),ee=document.getElementById(`modal-svg-growth`),T=document.getElementById(`modal-svg-health`),E=document.getElementById(`modal-health-badge-chart`),D=null;function O(){t?.classList.add(`hidden`)}r?.addEventListener(`click`,O),i?.addEventListener(`click`,O),n?.addEventListener(`click`,O);function te(e){if(!x||!e||e.length===0)return;let t=e=>76-(e-5)/3*52,n=t=>24+t/(e.length-1||1)*232,r=t(6.8),i=t(6),a=Math.abs(i-r),o=``,s=[];e.forEach((e,r)=>{let i=n(r),a=t(e.phSuelo);s.push({x:i,y:a,val:e.phSuelo}),o+=r===0?`M ${i},${a}`:` L ${i},${a}`});let c=``;s.forEach(e=>{let t=e.val>=6&&e.val<=6.8?`#10B981`:e.val>=5.5&&e.val<=7.2?`#F59E0B`:`#EF4444`;c+=`
        <circle cx="${e.x}" cy="${e.y}" r="4.5" fill="${t}" stroke="#ffffff" stroke-width="2">
          <title>${e.val} pH</title>
        </circle>
        <text x="${e.x}" y="${e.y-6}" fill="#374151" class="dark:fill-green-200" font-size="8.5" font-weight="bold" text-anchor="middle">
          ${e.val}
        </text>
      `}),x.innerHTML=`
      <rect x="24" y="${r}" width="232" height="${a}" fill="rgba(16, 185, 129, 0.15)" rx="3" />
      <text x="28" y="${r+8}" fill="#10B981" font-size="7" font-weight="bold">Óptimo (6.0 - 6.8)</text>
      
      <line x1="24" y1="${t(7.5)}" x2="256" y2="${t(7.5)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />
      <line x1="24" y1="${t(6.5)}" x2="256" y2="${t(6.5)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />
      <line x1="24" y1="${t(5.5)}" x2="256" y2="${t(5.5)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />

      <path d="${o}" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      ${c}
    `}function ne(e){if(!S||!e||e.length===0)return;let t=e=>76-(e-20)/12*52,n=t=>24+t/(e.length-1||1)*232,r=t(26),i=t(23),a=Math.abs(i-r),o=``,s=[];e.forEach((e,r)=>{let i=n(r),a=t(e.tempInterna);s.push({x:i,y:a,val:e.tempInterna}),o+=r===0?`M ${i},${a}`:` L ${i},${a}`});let c=``;s.forEach(e=>{c+=`
        <circle cx="${e.x}" cy="${e.y}" r="4" fill="#F59E0B" stroke="#ffffff" stroke-width="2">
          <title>${e.val}°C</title>
        </circle>
        <text x="${e.x}" y="${e.y-6}" fill="#B45309" class="dark:fill-green-300" font-size="8.5" font-weight="bold" text-anchor="middle">
          ${e.val}°
        </text>
      `}),S.innerHTML=`
      <rect x="24" y="${r}" width="232" height="${a}" fill="rgba(245, 158, 11, 0.12)" rx="3" />
      <text x="28" y="${r+8}" fill="#D97706" font-size="7" font-weight="bold">Confort (23° - 26°C)</text>
      
      <line x1="24" y1="${t(30)}" x2="256" y2="${t(30)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />
      <line x1="24" y1="${t(26)}" x2="256" y2="${t(26)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />
      <line x1="24" y1="${t(22)}" x2="256" y2="${t(22)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />

      <path d="${o}" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      ${c}
    `}function re(e){if(!C||!e||e.length===0)return;let t=e=>76-(e-16)/10*52,n=t=>24+t/(e.length-1||1)*232,r=``,i=[];e.forEach((e,a)=>{let o=n(a),s=t(e.tempExterna);i.push({x:o,y:s,val:e.tempExterna}),r+=a===0?`M ${o},${s}`:` L ${o},${s}`});let a=``;i.forEach(e=>{a+=`
        <circle cx="${e.x}" cy="${e.y}" r="3.5" fill="#0EA5E9" stroke="#ffffff" stroke-width="2">
          <title>${e.val}°C</title>
        </circle>
        <text x="${e.x}" y="${e.y-6}" fill="#0369A1" class="dark:fill-sky-300" font-size="8.5" font-weight="bold" text-anchor="middle">
          ${e.val}°
        </text>
      `}),C.innerHTML=`
      <line x1="24" y1="${t(24)}" x2="256" y2="${t(24)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />
      <line x1="24" y1="${t(20)}" x2="256" y2="${t(20)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />

      <path d="${r}" fill="none" stroke="#0EA5E9" stroke-width="2" stroke-dasharray="4,2" stroke-linecap="round" stroke-linejoin="round" />
      ${a}
    `}function ie(e){if(!w||!e||e.length===0)return;let t=e=>76-(e-16)/12*52,n=t=>24+t/(e.length-1||1)*232,r=t(22),i=t(19),a=Math.abs(i-r),o=``,s=[];e.forEach((e,r)=>{let i=n(r),a=t(e.tempSuelo);s.push({x:i,y:a,val:e.tempSuelo}),o+=r===0?`M ${i},${a}`:` L ${i},${a}`});let c=``;s.forEach(e=>{let t=e.val>=19&&e.val<=22.5;c+=`
        <circle cx="${e.x}" cy="${e.y}" r="4" fill="${t?`#10B981`:`#EF4444`}" stroke="#ffffff" stroke-width="2">
          <title>${e.val}°C</title>
        </circle>
        <text x="${e.x}" y="${e.y-6}" fill="#047857" class="dark:fill-lime-300" font-size="8.5" font-weight="bold" text-anchor="middle">
          ${e.val}°
        </text>
      `}),w.innerHTML=`
      <rect x="24" y="${r}" width="232" height="${a}" fill="rgba(16, 185, 129, 0.12)" rx="3" />
      <text x="28" y="${r+8}" fill="#10B981" font-size="7" font-weight="bold">Radicular Óptimo (19° - 22°C)</text>

      <line x1="24" y1="${t(26)}" x2="256" y2="${t(26)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />
      <line x1="24" y1="${t(22)}" x2="256" y2="${t(22)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />
      <line x1="24" y1="${t(18)}" x2="256" y2="${t(18)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />

      <path d="${o}" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      ${c}
    `}function ae(e){if(!ee||!e||e.length===0)return;let t=e=>76-(e-0)/100*52,n=t=>24+t/(e.length-1||1)*232,r=``,i=``;e.forEach((e,a)=>{let o=n(a),s=t(e.crecimiento);a===0?(r+=`M ${o},${s}`,i+=`M ${o},76 L ${o},${s}`):(r+=` L ${o},${s}`,i+=` L ${o},${s}`)});let a=n(e.length-1);i+=` L ${a},76 Z`;let o=e[0].crecimiento,s=e[e.length-1].crecimiento,c=s-o;b&&(b.textContent=`${c>=0?`+`:``}${c}% este ciclo`),ee.innerHTML=`
      <defs>
        <linearGradient id="modalGrowthGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#14B8A6" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#14B8A6" stop-opacity="0.0"/>
        </linearGradient>
      </defs>

      <line x1="24" y1="${t(80)}" x2="256" y2="${t(80)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />
      <text x="4" y="${t(80)+3}" fill="#9CA3AF" font-size="7.5">80%</text>
      <line x1="24" y1="${t(50)}" x2="256" y2="${t(50)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />
      <text x="4" y="${t(50)+3}" fill="#9CA3AF" font-size="7.5">50%</text>
      <line x1="24" y1="${t(20)}" x2="256" y2="${t(20)}" stroke="#E5E7EB" stroke-dasharray="2,2" stroke-width="1" />
      <text x="4" y="${t(20)+3}" fill="#9CA3AF" font-size="7.5">20%</text>

      <path d="${i}" fill="url(#modalGrowthGrad)" />
      <path d="${r}" fill="none" stroke="#0D9488" stroke-width="2.5" stroke-linecap="round" />

      <circle cx="${a}" cy="${t(s)}" r="4.5" fill="#0D9488" stroke="#fff" stroke-width="2">
        <title>Crecimiento actual: ${s}%</title>
      </circle>
      <text x="${a}" y="${t(s)-6}" fill="#0D9488" font-size="8.5" font-weight="bold" text-anchor="middle">
        ${s}%
      </text>
    `}function oe(e){if(!T||!e||e.length===0)return;let t=t=>24+t/(e.length-1||1)*232,n=``;e.forEach((e,r)=>{let i=t(r),a=e.sanidad===`Excelente`||e.sanidad===`Saludable`,o=e.sanidad===`Crítica`?`#EF4444`:a?`#10B981`:`#F59E0B`,s=e.productividad===`Alta`?48:e.productividad===`Media`?32:16,c=76-s;n+=`
        <rect x="${i-9}" y="${c}" width="18" height="${s}" rx="4" fill="${o}" opacity="0.85">
          <title>${e.fecha}: ${e.sanidad} • Prod ${e.productividad}</title>
        </rect>
        <text x="${i}" y="${c-4}" fill="${o}" font-size="8" font-weight="bold" text-anchor="middle">
          ${e.productividad}
        </text>
      `});let r=e[e.length-1];E&&(E.textContent=`${r.sanidad} • ${r.productividad}`),T.innerHTML=`
      <line x1="24" y1="76" x2="256" y2="76" stroke="#E5E7EB" stroke-width="1.5" />
      ${n}
    `}function k(n,r){let i=e.find(e=>e.fila===n&&e.columna===r);if(!i)return;D=i;let a=i.latestMetric;s&&(s.textContent=`Planta ${i.plantId} (Fila ${i.fila} • ${i.columna})`),c&&(c.innerHTML=`Medición de hoy registrada a las <strong id="modal-plant-time">${a.hora}</strong> (${a.fecha}) • Responsable: <strong id="modal-plant-resp">${a.responsable}</strong>`);let b=a.sanidad===`Crítica`,x=a.sanidad===`Vulnerable`;if(o&&(o.textContent=b?`🥀`:x?`🌿`:`🪴`),l&&(l.textContent=`${b?`🔴`:x?`🟡`:`🟢`} ${a.sanidad}`,l.className=`px-2.5 py-0.5 rounded-full text-xs font-bold border ${b?`bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800`:x?`bg-green-50 text-green-700 border-green-200 dark:bg-stone-950/40 dark:text-stone-300 dark:border-stone-800`:`bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-950/40 dark:text-lime-300 dark:border-lime-800`}`),u&&(u.textContent=a.faseCrecimiento),d&&(d.textContent=a.observaciones||`Sin observaciones adicionales registradas hoy.`),f&&(f.textContent=a.phSuelo.toFixed(1)),p){let e=a.phSuelo>=6&&a.phSuelo<=6.8;p.textContent=e?`Óptimo (6.0-6.8)`:a.phSuelo<6?`Ácido (<6.0)`:`Alcalino (>6.8)`,p.className=`block text-[10px] font-bold mt-0.5 ${e?`text-lime-600`:`text-green-600`}`}m&&(m.textContent=`${a.tempInterna.toFixed(1)}°C`),h&&(h.textContent=`${a.tempSuelo.toFixed(1)}°C`),g&&(g.textContent=`${a.tempExterna.toFixed(1)}°C`),_&&(_.textContent=`${a.crecimiento}%`),v&&(v.style.width=`${a.crecimiento}%`),y&&(y.textContent=a.productividad),t?.classList.remove(`hidden`),te(i.history),ne(i.history),re(i.history),ie(i.history),ae(i.history),oe(i.history)}var A=document.getElementById(`chart-maximize-modal`),se=document.getElementById(`chart-max-backdrop`),ce=document.getElementById(`btn-close-chart-max`),le=document.getElementById(`btn-close-chart-max-bottom`),j=document.getElementById(`max-chart-icon`),M=document.getElementById(`max-chart-title`),N=document.getElementById(`max-chart-subtitle`),P=document.getElementById(`max-chart-badge`),F=document.getElementById(`max-chart-svg-container`),I=document.getElementById(`max-chart-footer`),L=document.getElementById(`max-chart-info-text`);function R(){A?.classList.add(`hidden`)}ce?.addEventListener(`click`,R),le?.addEventListener(`click`,R),se?.addEventListener(`click`,R);function ue(e){let t=e.dataset.chartTitle||`Gráfico Agronómico`,n=e.dataset.chartSubtitle||`Visualización detallada de la medición`,r=e.dataset.chartIcon||`📊`,i=e.dataset.chartBadge||`Métrica`,a=e.dataset.chartInfo||`Detalle agronómico ampliado de los parámetros evaluados.`;M&&(M.textContent=t),N&&(N.textContent=n),j&&(j.textContent=r),P&&(P.textContent=i),L&&(L.textContent=a);let o=e.querySelector(`svg`);if(o&&F){let e=o.cloneNode(!0);e.removeAttribute(`id`),e.setAttribute(`class`,`w-full h-full max-h-[320px] overflow-visible`),F.innerHTML=``,F.appendChild(e)}let s=e.querySelector(`.flex.justify-between:last-child`);s&&I&&(I.innerHTML=s.innerHTML),A?.classList.remove(`hidden`)}document.querySelectorAll(`.chart-card-maximizable`).forEach(e=>{e.addEventListener(`click`,t=>{let n=t.target;n.closest(`button`)&&!n.closest(`.chart-card-maximizable`)||ue(e)})}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&(A&&!A.classList.contains(`hidden`)?(R(),e.stopPropagation()):t&&!t.classList.contains(`hidden`)&&O())}),document.querySelectorAll(`.plant-card-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.fila,r=e.dataset.columna;n&&r&&k(n,r)})}),document.querySelectorAll(`.plant-table-row`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.fila,n=e.dataset.columna;t&&n&&k(t,n)})}),a?.addEventListener(`click`,()=>{if(D){O();let e=document.getElementById(`input-fila`),t=document.getElementById(`input-columna`);e&&(e.value=D.fila),t&&(t.value=D.columna),Z?.classList.remove(`hidden`)}});var de=document.getElementById(`btn-toggle-charts`),fe=document.getElementById(`btn-toggle-charts-inline`),z=document.getElementById(`general-charts-collapsible`),B=document.getElementById(`charts-toggle-text`),V=document.getElementById(`charts-inline-toggle-icon`),pe=document.getElementById(`charts-inline-toggle-text`),H=!1;function U(){H=!H,z?.classList.toggle(`hidden`,!H),B&&(B.textContent=H?`Minimizar Gráficas Globales`:`Ver Gráficas Globales`),V&&(V.textContent=H?`⌃`:`⤢`),pe&&(pe.textContent=H?`Minimizar Gráficos`:`Ampliar Gráficos Globales`),H&&z?.scrollIntoView({behavior:`smooth`,block:`nearest`})}de?.addEventListener(`click`,U),fe?.addEventListener(`click`,U);var me=document.getElementById(`btn-toggle-excel-table`),he=document.getElementById(`btn-toggle-table-top`),W=document.getElementById(`excel-table-collapsible`),G=document.getElementById(`excel-toggle-icon`),K=document.getElementById(`excel-toggle-text`),q=document.getElementById(`top-table-toggle-text`),J=!1;function Y(){J=!J,W?.classList.toggle(`hidden`,!J),G&&(G.textContent=J?`⌃`:`⤢`),K&&(K.textContent=J?`Minimizar Tabla`:`Ampliar Tabla Completa`),q&&(q.textContent=J?`Minimizar Tabla Excel`:`Ampliar Tabla Excel`),J&&W?.scrollIntoView({behavior:`smooth`,block:`nearest`})}me?.addEventListener(`click`,Y),he?.addEventListener(`click`,Y);var ge=document.getElementById(`table-search`),_e=document.getElementById(`filter-row-select`),ve=document.getElementById(`filter-health-select`),ye=document.getElementById(`plants-showing-count`);function X(){let e=ge?.value.toLowerCase().trim()||``,t=_e?.value||`all`,n=ve?.value||`all`,r=document.querySelectorAll(`.plant-table-row`),i=0;r.forEach(r=>{let a=r.dataset.fila||``,o=r.dataset.columna||``,s=r.dataset.plantid?.toLowerCase()||``,c=r.dataset.resp?.toLowerCase()||``,l=r.dataset.health||``;(!e||s.includes(e)||a.toLowerCase().includes(e)||o.toLowerCase().includes(e)||c.includes(e))&&(t===`all`||a===t)&&(n===`all`||l===n)?(r.style.display=``,i++):r.style.display=`none`}),ye&&(ye.textContent=i.toString())}ge?.addEventListener(`input`,X),_e?.addEventListener(`change`,X),ve?.addEventListener(`change`,X);var be=async t=>{let n=t?t.innerHTML:``;t&&(t.style.pointerEvents=`none`,t.innerHTML=`
        <svg class="animate-spin w-4 h-4 text-lime-700 dark:text-lime-300" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Generando Excel...</span>
      `);try{let r=await fetch(`/api/export-excel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({plants:e})});if(!r.ok)throw Error(`Error en servidor (${r.status})`);let i=await r.blob(),a=`Macollo_Mediciones_Invernadero_${new Date().toISOString().slice(0,10)}.xlsx`,o=URL.createObjectURL(i),s=document.createElement(`a`);s.href=o,s.download=a,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o),t&&(t.innerHTML=`
          <svg class="w-4 h-4 text-lime-600 dark:text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>¡Excel Descargado!</span>
        `,setTimeout(()=>{t.innerHTML=n,t.style.pointerEvents=``},2200))}catch(r){console.error(`Error al exportar Excel:`,r);let i=`PlantaID;Invernadero;Fila;Columna;Fecha;Hora;pH Suelo;Temp Interna (°C);Temp Externa (°C);Temp Suelo (°C);Crecimiento (%);Productividad;Sanidad;Responsable;Observaciones
`;e.forEach(e=>{let t=e.latestMetric;i+=`"${e.plantId}";"Invernadero Macollo";"${e.fila}";"${e.columna}";"${t.fecha}";"${t.hora}";${t.phSuelo};${t.tempInterna};${t.tempExterna};${t.tempSuelo};${t.crecimiento}%;"${t.productividad}";"${t.sanidad}";"${t.responsable}";"${t.observaciones||``}"\n`});let a=new Blob([`﻿`+i],{type:`text/csv;charset=utf-8;`}),o=URL.createObjectURL(a),s=document.createElement(`a`);s.href=o,s.download=`Macollo_Mediciones_Invernadero_${new Date().toISOString().slice(0,10)}.csv`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o),t&&(t.innerHTML=n,t.style.pointerEvents=``)}},xe=document.getElementById(`btn-export-csv`);xe?.addEventListener(`click`,()=>be(xe));var Se=document.getElementById(`btn-export-excel-table`);Se?.addEventListener(`click`,()=>be(Se));var Z=document.getElementById(`modal-add`),Ce=document.getElementById(`btn-open-modal`),we=document.getElementById(`btn-close-modal`),Te=document.getElementById(`btn-cancel-modal`),Q=document.getElementById(`form-new-metric`);Ce?.addEventListener(`click`,()=>Z?.classList.remove(`hidden`));var $=()=>Z?.classList.add(`hidden`);we?.addEventListener(`click`,$),Te?.addEventListener(`click`,$),Q?.addEventListener(`submit`,t=>{t.preventDefault();let n=document.getElementById(`input-fila`).value,r=document.getElementById(`input-columna`).value,i=parseFloat(document.getElementById(`input-ph`).value),a=parseFloat(document.getElementById(`input-tin`).value),o=parseFloat(document.getElementById(`input-tout`).value),s=parseFloat(document.getElementById(`input-tsoil`).value),c=parseInt(document.getElementById(`input-growth`).value,10),l=document.getElementById(`input-prod`).value,u=document.getElementById(`input-health`).value,d=document.getElementById(`input-obs`).value||`Nueva toma de datos.`,f=document.getElementById(`session-user-name`)?.textContent?.trim()||`Usuario Activo`,p=document.getElementById(`session-user-role`)?.textContent?.trim()||`Personal de Campo`,m=new Date().toISOString().slice(0,10),h=new Date().toLocaleTimeString(`es-CO`,{hour:`2-digit`,minute:`2-digit`}),g=e.find(e=>e.fila===n&&e.columna===r);if(g){let e={id:`MET-${n}-${r.replace(` `,``)}-${Date.now()}`,invernadero:`Invernadero Macollo`,fila:n,columna:r,plantId:g.plantId,fecha:m,hora:h,timestampTexto:`Hoy, ${h}`,phSuelo:i,tempInterna:a,tempExterna:o,tempSuelo:s,crecimiento:c,faseCrecimiento:g.latestMetric.faseCrecimiento,productividad:l,sanidad:u,responsable:f,responsableRol:p,avatarColor:g.latestMetric.avatarColor,observaciones:d};g.latestMetric=e,g.history.push(e);let t=Array.from(document.querySelectorAll(`.plant-table-row`)).find(e=>e.dataset.fila===n&&e.dataset.columna===r);if(t){t.dataset.ph=i.toString(),t.dataset.tin=a.toString(),t.dataset.tout=o.toString(),t.dataset.tsoil=s.toString(),t.dataset.growth=c.toString(),t.dataset.prod=l,t.dataset.health=u,t.dataset.resp=f,t.dataset.hora=h,t.dataset.fecha=m,t.dataset.obs=d;let e=t.querySelectorAll(`td`);e[2]&&(e[2].innerHTML=`<span class="font-semibold text-green-950 dark:text-white block text-xs">${m}</span><span class="text-[11px] text-green-600 font-mono">${h}</span>`),e[3]&&(e[3].innerHTML=`<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-black border bg-lime-100 text-lime-800 border-lime-300"><span>${i.toFixed(1)}</span><span class="text-[9px] opacity-75">pH</span></span>`),e[4]&&(e[4].innerHTML=`<span class="px-2 py-0.5 rounded bg-green-50 font-mono font-bold text-green-700">${a.toFixed(1)}°C</span>`),e[5]&&(e[5].innerHTML=`<span class="px-2 py-0.5 rounded bg-blue-50 font-mono font-bold text-blue-700">${o.toFixed(1)}°C</span>`),e[6]&&(e[6].innerHTML=`<span class="px-2 py-0.5 rounded bg-lime-50 font-mono font-bold text-lime-700">${s.toFixed(1)}°C</span>`),e[7]&&(e[7].innerHTML=`<div class="flex items-center justify-between text-xs font-bold text-green-800 mb-1"><span>${g.latestMetric.faseCrecimiento}</span><span class="text-lime-600 font-mono">${c}%</span></div><div class="w-full bg-green-200 h-1.5 rounded-full overflow-hidden"><div class="bg-gradient-to-r from-teal-500 to-lime-500 h-full rounded-full" style="width: ${c}%"></div></div>`)}k(n,r)}$(),Q?.reset()});