// Google Analytics event tracking
// Safely calls gtag.event() if gtag is available

export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Resume download
export const trackResumeDownload = () => {
  trackEvent('file_download', {
    file_name: 'Ritu-Bhangale-Resume.pdf',
    file_type: 'pdf',
  });
};

// Scroll to section
export const trackSectionView = (sectionName) => {
  trackEvent('scroll_section', {
    section: sectionName,
    timestamp: new Date().toISOString(),
  });
};

// Landing page click
export const trackLandingPageClick = (elementType, label) => {
  trackEvent('landing_click', {
    element_type: elementType, // 'link', 'button', 'contact', 'text'
    label: label,
  });
};

// Link click with destination
export const trackLinkClick = (linkName, destination, context = '') => {
  trackEvent('link_click', {
    link_name: linkName,
    destination: destination,
    context: context,
  });
};

// Case study open
export const trackCaseStudyOpen = (caseStudyName) => {
  trackEvent('case_study_open', {
    case_study: caseStudyName,
    timestamp: new Date().toISOString(),
  });
};

// Case study section view
export const trackCaseStudySection = (caseStudyName, sectionName) => {
  trackEvent('case_study_section_view', {
    case_study: caseStudyName,
    section: sectionName,
  });
};

// Navigation
export const trackNavigation = (action, context = '') => {
  trackEvent('navigation', {
    action: action, // 'back', 'next', 'home'
    context: context,
  });
};

// External link click
export const trackExternalLink = (destination, label) => {
  trackEvent('external_link_click', {
    destination: destination,
    label: label,
  });
};

// Contact interaction
export const trackContactInteraction = (type, value) => {
  trackEvent('contact_interaction', {
    type: type, // 'email_click', 'linkedin_click', 'phone_hover'
    value: value,
  });
};

// Project interaction
export const trackProjectInteraction = (projectName, action) => {
  trackEvent('project_interaction', {
    project: projectName,
    action: action, // 'view', 'click', 'hover'
  });
};
