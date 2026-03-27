/* ===== Mobile Nav Toggle ===== */
(function(){
  var toggle=document.querySelector('.nav-toggle');
  var nav=document.querySelector('.main-nav');
  if(!toggle||!nav)return;
  toggle.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',open);
  });
  document.querySelectorAll('.dropdown > a').forEach(function(a){
    a.addEventListener('click',function(e){
      if(window.innerWidth<992){
        e.preventDefault();
        this.parentElement.classList.toggle('open');
      }
    });
  });
})();

/* ===== Before/After Slider ===== */
(function(){
  var slider=document.getElementById('baSlider');
  if(!slider)return;
  var after=slider.querySelector('.ba-after');
  var handle=slider.querySelector('.ba-handle');
  var active=false;
  function move(x){
    var rect=slider.getBoundingClientRect();
    var pct=((x-rect.left)/rect.width)*100;
    pct=Math.max(0,Math.min(100,pct));
    after.style.clipPath='inset(0 0 0 '+pct+'%)';
    handle.style.left=pct+'%';
  }
  slider.addEventListener('mousedown',function(){active=true});
  window.addEventListener('mouseup',function(){active=false});
  slider.addEventListener('mousemove',function(e){if(active)move(e.clientX)});
  slider.addEventListener('touchstart',function(){active=true},{passive:true});
  window.addEventListener('touchend',function(){active=false});
  slider.addEventListener('touchmove',function(e){move(e.touches[0].clientX)},{passive:true});
  slider.addEventListener('click',function(e){move(e.clientX)});
})();

/* ===== FAQ Accordion ===== */
document.querySelectorAll('.faq-question').forEach(function(btn){
  btn.addEventListener('click',function(){
    var item=this.parentElement;
    var wasOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function(el){el.classList.remove('open')});
    if(!wasOpen)item.classList.add('open');
  });
});

/* ===== Scroll Fade-Up Animation ===== */
(function(){
  var els=document.querySelectorAll('.fade-up');
  if(!els.length||!('IntersectionObserver' in window))return;
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}});
  },{threshold:0.15});
  els.forEach(function(el){obs.observe(el)});
})();

/* ===== Contact Form (Web3Forms AJAX) ===== */
(function(){
  var form=document.getElementById('contactForm');
  if(!form)return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=form.querySelector('button[type="submit"]');
    var status=document.getElementById('formStatus');
    btn.disabled=true;
    btn.innerHTML='<i class="ph ph-spinner"></i> Sending...';
    fetch('https://api.web3forms.com/submit',{
      method:'POST',
      body:new FormData(form)
    }).then(function(r){return r.json()}).then(function(d){
      if(d.success){
        status.className='form-status success';
        status.textContent='Thank you! We\u2019ll be in touch shortly.';
        status.style.display='block';
        form.reset();
      }else{
        status.className='form-status error';
        status.textContent='Something went wrong. Please call us instead.';
        status.style.display='block';
      }
    }).catch(function(){
      status.className='form-status error';
      status.textContent='Something went wrong. Please call us instead.';
      status.style.display='block';
    }).finally(function(){
      btn.disabled=false;
      btn.innerHTML='<i class="ph ph-paper-plane-tilt"></i> Send Request';
    });
  });
})();
