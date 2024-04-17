const elementSelectorLinkedinConstants = {
  INPUT_PASSWORD: "input#password",
  INPUT_LOGIN: "input#username",
  BUTTON_LOGIN_SUBMIT: "button[data-litms-control-urn='login-submit']",

  BUTTON_POPUP_SUBMIT_CONNECTION_INVITE:
    ".artdeco-modal__actionbar button:nth-child(2)",
  TEXT_AREA_POPUP_CONNECTION_INVITE: "textarea.ember-text-area",
  BUTTON_CLOSE_POPUP_ADD_NOTE_CONNECTION_INVITE:
    ".artdeco-modal-overlay button[data-test-modal-close-btn]",
  TITLE_POPUP_ADD_NOTE_CONNECTION_INVITE:
    ".artdeco-modal-overlay .upsell-modal__header h2",
  BUTTON_POPUP_SEND_WITHOUT_A_NOTE_CONNECTION_INVITE:
    ".artdeco-modal-overlay .artdeco-modal__actionbar button:nth-child(2)",
  BUTTON_POPUP_ADD_NOTE_CONNECTION_INVITE:
    ".artdeco-modal-overlay .artdeco-modal__actionbar button:nth-child(1)",
  USERNAME_PERSON_LIST_CONNECTION_INVITE:
    ".entity-result__title-text a.app-aware-link",
  PERSON_LIST_CONNECTION_INVITE:
    ".reusable-search__entity-result-list .reusable-search__result-container .linked-area",
  POSTS_RESULT_HASHTAG_PAGE:
    ".scaffold-finite-scroll__content .update-components-actor",
  FOLLOWERS_HASHTAG_PAGE: ".feed-hashtag-feed__artdeco-card p",
  BUTTON_CLOSE_MENU_MESSAGES:
    ".msg-overlay-bubble-header .msg-overlay-bubble-header__controls button:nth-child(3)",
  BUTTON_SEE_MORE_POSTS_HASHTAG_PAGE:
    ".feed-hashtag-feed__update-list .artdeco-button.artdeco-button--muted.artdeco-button--1.artdeco-button--full.artdeco-button--secondary.ember-view.scaffold-finite-scroll__load-button",
  NAME_PROFILE_ABOUT_PAGE:
    "section.artdeco-card:nth-child(1) .pv-text-details__about-this-profile-entrypoint h1",
  TITLE_PROFILE_ABOUT_PAGE:
    "section.artdeco-card:nth-child(1) .text-body-medium",
  DESCRIPTION_PROFILE_ABOUT_PAGE:
    "section.artdeco-card:nth-child(3) .pv-shared-text-with-see-more div span:nth-child(1)",
  DESCRIPTION_ME_PROFILE_ABOUT_PAGE:
    "section.artdeco-card:nth-child(5) .pv-shared-text-with-see-more div span:nth-child(1)",
};

export default elementSelectorLinkedinConstants;
