/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Precision Date & Countdown Calculation Engine (date-utils.js)
 * Isomorphic utility (Node.js & Browser) for calendar-accurate day differentials,
 * milestone tracking, warranty expirations, and overdue status without timezone skew.
 */

/**
 * Safely parses a date input (YYYY-MM-DD, ISO string, or Date) into a midnight Date object.
 * Avoids UTC-to-local timezone shift (e.g., '2026-11-01' shifting to Oct 31 in Western timezones).
 * @param {string|Date} input 
 * @returns {Date|null} Date at midnight local time or null if invalid
 */
export function parseDateSafe(input) {
  if (!input) return null;
  if (input instanceof Date && !isNaN(input.getTime())) {
    return new Date(input.getFullYear(), input.getMonth(), input.getDate());
  }

  if (typeof input === 'string') {
    const trimmed = input.trim();
    // Match YYYY-MM-DD at start of string
    const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1; // 0-indexed
      const day = parseInt(match[3], 10);
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) return d;
    }

    // Fallback: standard Date parse
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
      return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    }
  }

  return null;
}

/**
 * Calculates calendar day differential between a target date and reference date.
 * Positive = future (due in N days)
 * Zero = today
 * Negative = past (overdue / expired by N days)
 * @param {string|Date} targetDateInput 
 * @param {string|Date} [refDateInput=new Date()]
 * @returns {number|null} Signed integer days, or null if targetDate is invalid
 */
export function calculateDaysRemaining(targetDateInput, refDateInput = new Date()) {
  const target = parseDateSafe(targetDateInput);
  const ref = parseDateSafe(refDateInput);

  if (!target || !ref) return null;

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const diffMs = target.getTime() - ref.getTime();
  return Math.round(diffMs / MS_PER_DAY);
}

/**
 * Formats a days differential into a clean, human-readable countdown label.
 * @param {number|null} days 
 * @param {Object} [options]
 * @param {boolean} [options.isWarranty=false] - Use "Expiring in" vs "Due in"
 * @param {string} [options.futurePrefix] - Override future prefix
 * @param {string} [options.overduePrefix] - Override overdue prefix
 * @returns {string} e.g. "Due in 6d", "Due today", "Overdue by 14d", "Expiring in 145d"
 */
export function formatCountdownLabel(days, options = {}) {
  if (days === null || isNaN(days)) return '';

  const isWarranty = options.isWarranty || false;
  const futurePrefix = options.futurePrefix || (isWarranty ? 'Expiring in' : 'Due in');
  const overduePrefix = options.overduePrefix || (isWarranty ? 'Expired' : 'Overdue by');

  if (days > 0) {
    return `${futurePrefix} ${days}d`;
  }
  if (days === 0) {
    return isWarranty ? 'Expires today' : 'Due today';
  }
  // Past date
  const absDays = Math.abs(days);
  return isWarranty ? `${overduePrefix} ${absDays}d ago` : `${overduePrefix} ${absDays}d`;
}

/**
 * Computes dynamic title and message for an alert item based on its verified due date.
 * Replaces hardcoded "(0d)", "(20d)", "(159d)" with live mathematical days.
 * @param {Object} item - Alert record with code, title, message, dueDate, statute
 * @param {Date} [refDate=new Date()]
 * @returns {Object} Updated item with live title, message, and calculated days
 */
export function enrichAlertCountdown(item, refDate = new Date()) {
  if (!item) return item;

  // Determine target date from dueDate, statute, or message
  let targetDate = item.dueDate || item.due_date;
  if (!targetDate && typeof item.statute === 'string') {
    const match = item.statute.match(/(\d{4}-\d{2}-\d{2})/);
    if (match) targetDate = match[1];
  }
  if (!targetDate && typeof item.message === 'string') {
    const match = item.message.match(/(\d{4}-\d{2}-\d{2})/);
    if (match) targetDate = match[1];
  }

  if (!targetDate) return item;

  const days = calculateDaysRemaining(targetDate, refDate);
  if (days === null) return item;

  const isWarranty = (item.code || '').includes('WARRANTY') || (item.title || '').toLowerCase().includes('warranty');
  const label = formatCountdownLabel(days, { isWarranty });

  let dynamicTitle = item.title;
  let dynamicMessage = item.message;

  // Pattern replace hardcoded "Expiring in \d+d" or "Due in \d+d" or "Due \(\d+d\)"
  if (typeof dynamicTitle === 'string') {
    const beforeReplace = dynamicTitle;
    dynamicTitle = dynamicTitle
      .replace(/Expiring in \d+d/gi, label)
      .replace(/Due in \d+d/gi, label)
      .replace(/Due \(\d+d\)/gi, label)
      .replace(/Overdue \(\d+d\)/gi, label)
      .replace(/Overdue by \d+d/gi, label);
      
    // If no countdown placeholder was present, enrich title with countdown status
    if (beforeReplace === dynamicTitle && !dynamicTitle.includes(label) && !dynamicTitle.toLowerCase().includes('due') && !dynamicTitle.toLowerCase().includes('expir')) {
      dynamicTitle = `${dynamicTitle} (${label})`;
    }
  }

  if (typeof dynamicMessage === 'string') {
    dynamicMessage = dynamicMessage
      .replace(/Expiring in \d+d/gi, label)
      .replace(/Due in \d+d/gi, label)
      .replace(/Due \(\d+d\)/gi, label)
      .replace(/Overdue \(\d+d\)/gi, label)
      .replace(/Overdue by \d+d/gi, label);
  }

  return {
    ...item,
    dueDate: targetDate,
    daysRemaining: days,
    countdownLabel: label,
    title: dynamicTitle,
    message: dynamicMessage
  };
}
