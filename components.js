// Apply theme synchronously (before paint) to avoid flash.
(function () {
  var theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();

class SiteNav extends HTMLElement {
  connectedCallback() {
    var active = this.getAttribute('active') || '';
    var cls = function (name) {
      return active === name ? ' class="active"' : '';
    };
    this.innerHTML = `
      <nav class="topbar">
        <a class="tb-logo" href="index.html">B <span>/</span> H &nbsp;</a>
        <div class="tb-nav">
          <a href="index.html"${cls('home')}>home</a>
          <a href="work.html"${cls('experience')}>experience</a>
          <a href="about.html"${cls('about')}>about</a>
        </div>
      </nav>
    `;
    var toggle = this.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme');
        var next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      });
    }
  }
}
customElements.define('site-nav', SiteNav);

class PageHero extends HTMLElement {
  connectedCallback() {
    var eyebrow = this.getAttribute('eyebrow') || '';
    var title = this.getAttribute('title') || '';
    var accent = this.getAttribute('accent') || '';
    var sub = this.getAttribute('sub') || '';
    var action = this.getAttribute('action') || '';
    var actionHref = this.getAttribute('action-href') || '#';
    var titleHtml = accent
      ? title + '<br><span class="accent">' + accent + '</span>'
      : title;
    var rightItems = [];
    if (sub) rightItems.push('<p class="page-sub">' + sub + '</p>');
    if (action) rightItems.push('<a class="page-action" href="' + actionHref + '" target="_blank" rel="noopener">' + action + '</a>');
    var rightHtml = rightItems.length
      ? '<div class="page-hero-right">' + rightItems.join('') + '</div>'
      : '';
    this.innerHTML = `
      <div class="page-hero">
        <div>
          ${eyebrow ? '<div class="page-eyebrow">' + eyebrow + '</div>' : ''}
          <div class="page-title">${titleHtml}</div>
        </div>
        ${rightHtml}
      </div>
    `;
  }
}
customElements.define('page-hero', PageHero);
