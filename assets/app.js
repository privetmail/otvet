const menu=document.querySelector('#mobile-menu');
const burger=document.querySelector('[data-menu-open]');
const dialog=document.querySelector('#modal-lead');
const form=document.querySelector('#lead-form');
let opener=null;
let context='lead';
function lock(){const gap=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty('--scrollbar-width',gap+'px');document.documentElement.classList.add('is-scroll-locked')}
function unlock(){document.documentElement.classList.remove('is-scroll-locked');document.documentElement.style.removeProperty('--scrollbar-width')}
function closeMenu(restore=true){if(!menu)return;menu.hidden=true;burger?.setAttribute('aria-expanded','false');unlock();if(restore)burger?.focus()}
burger?.addEventListener('click',()=>{menu.hidden=false;burger.setAttribute('aria-expanded','true');lock();menu.querySelector('.menu__close')?.focus()});
document.querySelectorAll('[data-menu-close]').forEach(button=>button.addEventListener('click',()=>closeMenu()));
menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeMenu(false)));
document.querySelectorAll('[data-modal-open]').forEach(button=>button.addEventListener('click',()=>{opener=button;context=button.dataset.context==='pricing'?'pricing':'lead';closeMenu(false);document.querySelector('#modal-lead-title').textContent=context==='pricing'?'Тарифы для команды':'Хочу подключить Otvet';document.querySelector('#modal-lead-description').textContent=context==='pricing'?'Стоимость коробочного решения и тарифа — по запросу. Условия подключения обсудим в переписке.':'Оставьте запрос на подключение корпоративной почты. Мы уточним потребности вашей компании и предложим коробочное решение Otvet и тариф.';dialog.showModal();lock()}));
document.querySelectorAll('[data-modal-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog?.addEventListener('click',event=>{const rect=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom))dialog.close()});
dialog?.addEventListener('close',()=>{unlock();if(opener?.getClientRects().length)opener.focus();else burger?.focus()});
document.addEventListener('keydown',event=>{if(menu&&!menu.hidden){if(event.key==='Escape'){event.preventDefault();closeMenu()}else if(event.key==='Tab'){const elements=[...menu.querySelectorAll('button,a[href]')].filter(x=>x.getClientRects().length);const first=elements[0],last=elements.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}}});
const email=document.querySelector('#lead-email');
const name=document.querySelector('#lead-name');
const submit=form?.querySelector('[type=submit]');
function validate(){if(submit)submit.disabled=!(name.value.trim()&&email.validity.valid&&email.value.trim())}
form?.addEventListener('input',validate);validate();
form?.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const fields=new FormData(form);const subject=context==='pricing'?'Тарифы Otvet для команды':'Подключение Otvet для команды';const body=(context==='pricing'?'Здравствуйте! Хотим узнать стоимость Otvet для команды':'Здравствуйте! Хотим подключить Otvet для команды')+'\n\nИмя: '+fields.get('name')+'\nРабочая почта: '+fields.get('email');window.location.href='mailto:hello@mobileotvet.ru?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)});
