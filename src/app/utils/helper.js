import React from "react";

export function calculateDayDifference(date) {
    const dateInDays = new Date(date);
    const currentDate = new Date();
    const difference = currentDate - dateInDays
    return Math.round(difference / (1000 * 3600 * 24));
}

export function formatTimestampToDate(date) {
    // from timestamp to Thu Aug 29 2024 00:16:32 GMT+0300 (GMT+03:00) use toDate()
    // from this (Thu Aug 29 2024 00:16:32 GMT+0300 (GMT+03:00) ) to this (Thu, Aug 29, 2024) use the rest
    return date.toDate().toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export function timeAgo(dateString) {
    const givenDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now - givenDate;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 30) {
        return `${days} days ago`;
    } else if (months < 12) {
        return `${months} months ago`;
    } else {
        return `${years} years ago`;
    }
}

export function processObjectReturnTruthy(obj) {
    let n = Object.keys(obj).filter(function (key) {
      return obj[key]
    });
    return n.map(item => item.replace(/_/g, ' '));
  }


export function convertHtmlToReactNoStyle(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString;

  const parseNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    const children = Array.from(node.childNodes).map(parseNode);
    return React.createElement(node.nodeName.toLowerCase(), {}, ...children);
  };

  return Array.from(div.childNodes).map(parseNode);
}

function styleStringToObject(styleString, ignoredStyles = []) {
  return styleString.split(';').reduce((styleObject, styleProperty) => {
    if (styleProperty.trim()) {
      const [property, value] = styleProperty.split(':');
      const camelCaseProperty = property.trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase());

      if (!ignoredStyles.includes(camelCaseProperty)) {
        styleObject[camelCaseProperty] = value.trim();
      }
    }
    return styleObject;
  }, {});
}

export function convertHtmlToReact(htmlString, ignoredStyles = []) {
  const div = document.createElement('div');
  div.innerHTML = htmlString;

  const parseNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    const props = {};
    // Copy attributes to props
    for (const { name, value } of Array.from(node.attributes)) {
      if (name === 'class') {
        props.className = value;
      } else if (name === 'style') {
        props.style = styleStringToObject(value, ignoredStyles);
      } else {
        props[name] = value;
      }
    }

    const children = Array.from(node.childNodes).map(parseNode);
    return React.createElement(node.nodeName.toLowerCase(), props, ...children);
  };

  return Array.from(div.childNodes).map(parseNode);
}