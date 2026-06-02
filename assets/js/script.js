/* ============================================
   LA FRANCESA EXPORT — Landing JS
   ============================================ */

(function () {
  'use strict';

  /* ---------- Año dinámico en footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menú mobile ---------- */
  var burger = document.querySelector('.nav__burger');
  var menu = document.querySelector('.nav__menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(
    '.section__title, .market__body, .market__close, .card, .variant, .stat, .step, .log-card, .about__figure, .product__showcase, .product__specs, .proposal__close, .about__close, .cta__title, .cta__form'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Sticky CTA: ocultar cuando se llega al formulario ---------- */
  var stickyCta = document.querySelector('.sticky-cta');
  var contactSection = document.getElementById('contacto');
  if (stickyCta && contactSection && 'IntersectionObserver' in window) {
    var ctaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          stickyCta.classList.add('is-hidden');
        } else {
          stickyCta.classList.remove('is-hidden');
        }
      });
    }, { threshold: 0.15 });
    ctaObserver.observe(contactSection);
  }

  /* ---------- Formulario: validación + envío ---------- */
  var form = document.getElementById('dossier-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var requiredFields = form.querySelectorAll('[required]');
      var valid = true;

      requiredFields.forEach(function (field) {
        field.classList.remove('is-error');
        if (!field.value || (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value))) {
          field.classList.add('is-error');
          valid = false;
        }
      });

      if (!valid) {
        var firstError = form.querySelector('.is-error');
        if (firstError) firstError.focus();
        return;
      }

      // Recolectar datos (para integración con backend)
      var formData = new FormData(form);
      var payload = {};
      formData.forEach(function (value, key) { payload[key] = value; });

      // ============================================
      // INTEGRACIÓN BACKEND:
      // Reemplazar el bloque de abajo por el envío real al CRM o endpoint.
      // Ejemplo:
      // fetch('/api/leads', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // }).then(function(){ /* success */ });
      // ============================================
      console.log('Lead capturado:', payload);

      // UI de éxito
      var success = form.querySelector('.form__success');
      var button = form.querySelector('button[type="submit"]');
      if (success) success.hidden = false;
      if (button) {
        button.disabled = true;
        button.style.opacity = '0.6';
        button.innerHTML = 'Procesando...';
      }

      // Iniciar descarga del dossier (placeholder)
      setTimeout(function () {
        var link = document.createElement('a');
        link.href = 'assets/dossier/dossier-lafrancesa.pdf';
        link.download = 'Dossier-Comercial-LaFrancesa.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (button) {
          button.innerHTML = '✓ Descarga iniciada';
        }
      }, 800);
    });

    // Limpiar error al escribir
    form.querySelectorAll('input, select').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('is-error');
      });
    });
  }

  /* ---------- Smooth scroll mejorado para links internos ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('.nav').offsetHeight || 0;
        var offset = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

})();
