import{S as h,a as b,i as c}from"./assets/vendor-5401a4b0.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();const y=new h(".gallery a",{aptions:!0,captionType:"attr",captionsData:"alt",captionPosition:"bottom",fadeSpeed:150,captionSelector:"img",captionDelay:250});y.on("show.simplelightbox");function q(o,i,n,s){const t=o.hits.map(e=>`
                <li class="gallery-item"><a href="${e.largeImageURL}">
                <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}"></a>
                <ul class="gallery-image-data">
                <li class="data-quantity"><b>Likes </b>${e.likes}</li>
                <li class="data-quantity"><b>Views </b>${e.views}</li>
                <li class="data-quantity"><b>Comments </b>${e.comments}</li>
                <li class="data-quantity"><b>Downloads </b>${e.downloads}</li>
                </ul>
                </li>`).join("");i.insertAdjacentHTML("beforeend",t),n*15<=s?document.querySelector(".btn-more-container").style.display="flex":document.querySelector(".btn-more-container").style.display="none",y.refresh()}async function L(o,i){const n="https://pixabay.com/api/",s={key:"42469788-7d7013196b534fb1bad6f4ac3",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:i};return(await b.get(n,{params:s})).data}const S=document.querySelector("form"),m=document.querySelector("input"),u=document.querySelector(".gallery"),f=document.querySelector(".loader-container"),p=document.querySelector(".loader-more"),w=document.querySelector(".btn-more");let d="",r=1,a=0;S.addEventListener("submit",o=>{if(o.preventDefault(),d=m.value.trim(),!d){c.error({timeout:1e3,message:"Please enter a search value",position:"topRight"});return}m.value="",u.innerHTML="",r=1,a=0,g()});w.addEventListener("click",o=>{r=r+1,g()});async function g(){v();const o=await L(d,r);if(o.hits.length===0)c.error({timeout:1e3,message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});else{if(r==1&&(a=o.totalHits),q(o,u,r,a),r>1){const i=u.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}r*15>a&&a>15&&c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}P()}function v(){r==1?f.style.display="flex":p.style.display="inline-block"}function P(){r==1?f.style.display="none":p.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
