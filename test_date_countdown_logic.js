/**
 * Precision Test Suite: Date & Countdown Logic Verification
 * Tests overdue, due today, future dates, month boundaries, year boundaries,
 * leap years, and dynamic title/message enrichment.
 */

import assert from 'assert';
import { parseDateSafe, calculateDaysRemaining, formatCountdownLabel, enrichAlertCountdown } from './js/date-utils.js';

console.log('🧪 ========================================================');
console.log('🧪 TESTING PRECISION DATE & COUNTDOWN CALCULATION ENGINE');
console.log('🧪 ========================================================\n');

// Reference date: October 26, 2026
const refOct26 = new Date(2026, 9, 26); // Note: month 9 is October (0-indexed)

// 1. Test Overdue Date: Oct 12, 2026 on Oct 26, 2026 (Expired 14 days ago)
console.log('▶ [1/6] Testing Overdue Date (Oct 12, 2026 vs Oct 26, 2026)...');
const daysOverdue = calculateDaysRemaining('2026-10-12', refOct26);
assert.strictEqual(daysOverdue, -14, 'Oct 12, 2026 must be exactly -14 days relative to Oct 26, 2026');
const warrantyOverdueLabel = formatCountdownLabel(daysOverdue, { isWarranty: true });
assert.strictEqual(warrantyOverdueLabel, 'Expired 14d ago');
const taskOverdueLabel = formatCountdownLabel(daysOverdue, { isWarranty: false });
assert.strictEqual(taskOverdueLabel, 'Overdue by 14d');
console.log(`  ✓ Past date correctly calculated: ${daysOverdue} days -> "${warrantyOverdueLabel}" / "${taskOverdueLabel}"`);

// 2. Test Due Today: Oct 26, 2026 on Oct 26, 2026
console.log('\n▶ [2/6] Testing Due Today (Oct 26, 2026 vs Oct 26, 2026)...');
const daysToday = calculateDaysRemaining('2026-10-26', refOct26);
assert.strictEqual(daysToday, 0, 'Today must be exactly 0 days differential');
assert.strictEqual(formatCountdownLabel(daysToday, { isWarranty: false }), 'Due today');
assert.strictEqual(formatCountdownLabel(daysToday, { isWarranty: true }), 'Expires today');
console.log('  ✓ Due today correctly formatted: "Due today" / "Expires today"');

// 3. Test Month Boundary: Nov 1, 2026 on Oct 26, 2026 (6 days away)
console.log('\n▶ [3/6] Testing Month Boundary (Nov 1, 2026 vs Oct 26, 2026)...');
const daysNov1 = calculateDaysRemaining('2026-11-01', refOct26);
assert.strictEqual(daysNov1, 6, 'Nov 1, 2026 must be exactly 6 days away from Oct 26, 2026 (not 20d!)');
const nov1Label = formatCountdownLabel(daysNov1, { isWarranty: false });
assert.strictEqual(nov1Label, 'Due in 6d');
console.log(`  ✓ Month boundary correctly calculated: ${daysNov1} days -> "${nov1Label}"`);

// 4. Test Year Boundary: March 20, 2027 on Oct 26, 2026 (145 days away)
console.log('\n▶ [4/6] Testing Year Boundary (March 20, 2027 vs Oct 26, 2026)...');
const daysMar20 = calculateDaysRemaining('2027-03-20', refOct26);
assert.strictEqual(daysMar20, 145, 'March 20, 2027 must be exactly 145 days away from Oct 26, 2026 (not 159d!)');
const mar20Label = formatCountdownLabel(daysMar20, { isWarranty: true });
assert.strictEqual(mar20Label, 'Expiring in 145d');
console.log(`  ✓ Year boundary correctly calculated: ${daysMar20} days -> "${mar20Label}"`);

// Year end cutoff: Dec 31, 2026 on Oct 26, 2026
const daysDec31 = calculateDaysRemaining('2026-12-31', refOct26);
assert.strictEqual(daysDec31, 66, 'Dec 31, 2026 must be exactly 66 days away from Oct 26, 2026');
console.log(`  ✓ Year-end cutoff correctly calculated: ${daysDec31} days -> "Due in 66d"`);

// 5. Test Leap Year & Safe Parsing
console.log('\n▶ [5/6] Testing Leap Year & Malformed Input Handling...');
const leapDate = calculateDaysRemaining('2028-02-29', new Date(2028, 1, 1)); // Feb 1 2028 to Feb 29 2028
assert.strictEqual(leapDate, 28, '2028 is a leap year; Feb 1 to Feb 29 must be 28 days');
assert.strictEqual(calculateDaysRemaining(null), null);
assert.strictEqual(calculateDaysRemaining('invalid-date-string'), null);
assert.strictEqual(parseDateSafe('not-a-date'), null);
console.log('  ✓ Leap year calculation and safe null fallbacks verified.');

// 6. Test enrichAlertCountdown() on the 3 live inconsistency examples flagged by ChatGPT
console.log('\n▶ [6/6] Verifying Dynamic Alert Enrichment (Fixing Live Inconsistencies)...');

// Case A: Fence Warranty (previously hardcoded "0d")
const fenceItem = {
  severity: 'CRITICAL',
  code: 'WARRANTY_EXPIRING_PM_FENCE_WASH_GATE',
  statute: 'Superior Fence & Rail (Clause Q)',
  dueDate: '2026-10-12',
  title: 'Workmanship Warranty Expiring in 0d: 187 LF Dark Sequoia Vinyl Fence & 4 Gates',
  message: 'Vendor 3-Yr Workmanship Warranty expires on 2026-10-12. Inspect all 4 gates immediately.'
};
const enrichedFence = enrichAlertCountdown(fenceItem, refOct26);
assert.strictEqual(enrichedFence.daysRemaining, -14);
assert(enrichedFence.title.includes('Expired 14d ago'), `Title should state "Expired 14d ago", got: "${enrichedFence.title}"`);
console.log(`  ✓ Case A fixed: "${fenceItem.title}" -> "${enrichedFence.title}"`);

// Case B: Gutter Cleanout (previously hardcoded "20d")
const gutterItem = {
  severity: 'WARNING',
  code: 'PM_DUE_SOON_PM_GUTTER_ROOF_MOSS',
  statute: 'Semi-Annual Cleanout (2026-11-01)',
  dueDate: '2026-11-01',
  title: 'Gutter Cleanout & Roof Moss Treatment Due',
  message: 'Preventative Maintenance Due in 20d: PNW Gutter Cleanout & Roof Moss Zinc/Oxygen Solution Treatment.'
};
const enrichedGutter = enrichAlertCountdown(gutterItem, refOct26);
assert.strictEqual(enrichedGutter.daysRemaining, 6);
assert(enrichedGutter.message.includes('Due in 6d'), `Message should state "Due in 6d", got: "${enrichedGutter.message}"`);
console.log(`  ✓ Case B fixed: "${gutterItem.message}" -> "${enrichedGutter.message}"`);

// Case C: Refrigerator Store Warranty (previously hardcoded "159d")
const fridgeItem = {
  severity: 'WARNING',
  code: 'WARRANTY_EXPIRING_CAPEX_REFRIGERATOR',
  statute: "Lowe's Warranty (WRF555SDFZ)",
  dueDate: '2027-03-20',
  title: 'Whirlpool Refrigerator Store Warranty Expiring',
  message: 'Warranty Expiring in 159d (2027-03-20): Whirlpool 24.7-cu ft French Door Refrigerator Replacement.'
};
const enrichedFridge = enrichAlertCountdown(fridgeItem, refOct26);
assert.strictEqual(enrichedFridge.daysRemaining, 145);
assert(enrichedFridge.message.includes('Expiring in 145d'), `Message should state "Expiring in 145d", got: "${enrichedFridge.message}"`);
console.log(`  ✓ Case C fixed: "${fridgeItem.message}" -> "${enrichedFridge.message}"`);

console.log('\n🎉 ALL 6 DATE COUNTDOWN LOGIC TESTS PASSED 100%!\n');
