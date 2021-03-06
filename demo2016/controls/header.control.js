import formatDate from '../services/formatdate.service.js';

export default class {
  static parameters() {
    return {
      logoURL: {
        type: 'string'
      }
    }
  }

  static components() {
    return {
      formatDate
    };
  }

  static template() {
    return `
<style>
header {
  width: 100%;
  height: var(--header-height);
  display: flex;
  flex-direction: column;
  background-color: var(--header-bg);
  color: var(--header-top-bar-color);
  position: fixed;
  z-index: 1;
}

.top-bar {
  background-color: var(--header-top-bar-bg);
  text-align: center;
  font-size: 0.7em;
  padding: var(--header-top-bar-padding);
}

.main-bar {
  align-self: center;
  display: flex;
  height: 100%;
  max-width: var(--header-max-width-desktop);
  overflow: hidden; /* if too many elements are dropped in they will be hidden --> adjust variable: */
}

.logo {
  width: 150px;
  background-size: 85%;
  background-repeat: no-repeat;
  background-position: center;
}

nav {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.mobile-menu-trigger {
  display: none;
}

/* would be cool if this would work var(--header-mobile-max-width) */
@media screen and (max-width: 570px) {
  .main-bar {
    width: 100%;
    justify-content: space-between;
  }

  nav {
    background-color: var(--header-bg);
    position: absolute;
    top: var(--header-height);
    flex-direction: column;
    width: 100%;
    flex: none;
  }

  #headerButtons::slotted(*) {
    flex-direction: column;
  }

  .mobile-menu-trigger {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mobile-menu-trigger svg {
    width: 80%;
    height: 80%;
    fill: var(--header-mobile-menu-trigger-bg);
  }

  .desktop-helper {
    display: none;
  }
}
</style>
<div class="desktop-helper"></div>
<header>
  <div class="top-bar"></div>
  <div class="main-bar">
    <div class="logo"></div>
    <nav>
      <slot id="headerButtons" name="default">empty</slot>
    </nav>
    <div class="mobile-menu-trigger" on-click="toggleMobileMenu">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 302 302" style="enable-background:new 0 0 302 302;" xml:space="preserve">
        <g>
          <rect y="36" width="302" height="30"/>
          <rect y="236" width="302" height="30"/>
          <rect y="136" width="302" height="30"/>
        </g>
      </svg>
    </div>
  </div>
</header>
`;
  }

  createdCallback(){
    /*
    START - shoudl not be required
    expected to do: http://jsfiddle.net/n5Lot7a7/2/
    */
    this.$(window).on('resize', ()=> {
      if (this.$('.desktop-helper').is(':visible'))
        this.$('nav').css('display', 'flex');
      else
        this.$('nav').hide();
    });
    this.$(window).trigger('resize');
    /* END */


    setInterval(() => { this.$('.top-bar').text(this.formatDate.getFormattedDate(new Date())); }, 1000);
    /*
      binding in css nutzen?
    */
    this.$('.logo').css('background-image', 'url(' + this.logoURL + ')');
  }

  toggleMobileMenu() {
    this.$('nav').slideToggle();
  }
}
