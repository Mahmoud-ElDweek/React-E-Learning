export function stripHtmlTags(htmlString) {
    return htmlString.replace(/<[^>]*>/g, '');
  }