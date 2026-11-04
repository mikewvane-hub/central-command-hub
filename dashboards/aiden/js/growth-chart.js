/**
 * ANTIGRAVITY NRMC // WHO GROWTH STANDARDS INTERACTIVE CHART ENGINE
 * Boys 0-12 Months Percentiles (P3, P15, P50, P85, P97)
 */

export class WhoGrowthChart {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.metricType = options.metricType || 'weight'; // 'weight', 'length', 'head_circ'
    this.unitMode = options.unitMode || 'imperial'; // 'imperial' or 'metric'
    this.dataPoints = [];
    this.whoStandards = null;
    this.hoverPoint = null;

    this.setupCanvasDPI();
    this.attachEvents();
  }

  setupCanvasDPI() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.displayWidth = rect.width;
    this.displayHeight = rect.height;
  }

  setData(standards, measurements, unitMode) {
    this.whoStandards = standards;
    this.dataPoints = measurements || [];
    if (unitMode) this.unitMode = unitMode;
    this.render();
  }

  attachEvents() {
    window.addEventListener('resize', () => {
      this.setupCanvasDPI();
      this.render();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.checkHover(x, y);
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.hoverPoint = null;
      this.render();
    });
  }

  checkHover(mouseX, mouseY) {
    if (!this.dataPoints.length) return;
    const padding = { top: 30, right: 30, bottom: 40, left: 55 };
    const chartW = this.displayWidth - padding.left - padding.right;
    const chartH = this.displayHeight - padding.top - padding.bottom;

    const bounds = this.getYBounds();
    let closest = null;
    let minDistance = 18;

    this.dataPoints.forEach((pt) => {
      const px = padding.left + (pt.age_months / 12) * chartW;
      const val = this.getMeasurementValue(pt);
      const py = padding.top + chartH - ((val - bounds.min) / (bounds.max - bounds.min)) * chartH;
      const dist = Math.hypot(mouseX - px, mouseY - py);
      if (dist < minDistance) {
        minDistance = dist;
        closest = { pt, px, py, val };
      }
    });

    if (this.hoverPoint !== closest) {
      this.hoverPoint = closest;
      this.render();
    }
  }

  getMeasurementValue(pt) {
    if (this.metricType === 'weight') {
      return this.unitMode === 'imperial' ? pt.weight_lbs : pt.weight_lbs * 0.453592;
    } else if (this.metricType === 'length') {
      return this.unitMode === 'imperial' ? pt.length_in : pt.length_in * 2.54;
    } else {
      return this.unitMode === 'imperial' ? pt.head_circ_in : pt.head_circ_in * 2.54;
    }
  }

  getYBounds() {
    if (this.metricType === 'weight') {
      return this.unitMode === 'imperial'
        ? { min: 4, max: 28, unit: 'lbs', label: 'Weight (lbs)' }
        : { min: 2, max: 13, unit: 'kg', label: 'Weight (kg)' };
    } else if (this.metricType === 'length') {
      return this.unitMode === 'imperial'
        ? { min: 18, max: 34, unit: 'in', label: 'Length (in)' }
        : { min: 45, max: 85, unit: 'cm', label: 'Length (cm)' };
    } else {
      return this.unitMode === 'imperial'
        ? { min: 12, max: 20, unit: 'in', label: 'Head Circ (in)' }
        : { min: 30, max: 50, unit: 'cm', label: 'Head Circ (cm)' };
    }
  }

  getStandardCurve(percentileKey) {
    if (!this.whoStandards) return [];
    let sourceKey = 'weight_kg';
    let conversion = 1;
    if (this.metricType === 'weight') {
      sourceKey = 'weight_kg';
      conversion = this.unitMode === 'imperial' ? 2.20462 : 1;
    } else if (this.metricType === 'length') {
      sourceKey = 'length_cm';
      conversion = this.unitMode === 'imperial' ? 1 / 2.54 : 1;
    } else {
      sourceKey = 'head_circ_cm';
      conversion = this.unitMode === 'imperial' ? 1 / 2.54 : 1;
    }

    const table = this.whoStandards[sourceKey] || {};
    const months = [0, 1, 2, 3, 4, 6, 9, 12];
    return months.map((m) => {
      const row = table[m] || {};
      const rawVal = row[percentileKey] || 0;
      return { month: m, value: rawVal * conversion };
    });
  }

  render() {
    const ctx = this.ctx;
    const w = this.displayWidth;
    const h = this.displayHeight;
    ctx.clearRect(0, 0, w, h);

    const padding = { top: 30, right: 30, bottom: 40, left: 55 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const bounds = this.getYBounds();

    // Background Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;

    // Y Axis Grid
    const ySteps = 5;
    ctx.fillStyle = '#64748b';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= ySteps; i++) {
      const yVal = bounds.min + (i / ySteps) * (bounds.max - bounds.min);
      const yPos = padding.top + chartH - (i / ySteps) * chartH;
      ctx.beginPath();
      ctx.moveTo(padding.left, yPos);
      ctx.lineTo(padding.left + chartW, yPos);
      ctx.stroke();
      ctx.fillText(`${yVal.toFixed(1)} ${bounds.unit}`, padding.left - 8, yPos);
    }

    // X Axis Grid (Months 0 to 12)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let m = 0; m <= 12; m += 2) {
      const xPos = padding.left + (m / 12) * chartW;
      ctx.beginPath();
      ctx.moveTo(xPos, padding.top);
      ctx.lineTo(xPos, padding.top + chartH);
      ctx.stroke();
      ctx.fillText(`${m}M`, xPos, padding.top + chartH + 8);
    }

    // Axis Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px "Rajdhani", sans-serif';
    ctx.fillText('INFANT AGE (MONTHS)', padding.left + chartW / 2, padding.top + chartH + 24);

    // Draw WHO Percentile Reference Curves (P3, P50, P97)
    this.drawCurve('p50', 'rgba(0, 229, 255, 0.45)', 2, false);
    this.drawCurve('p97', 'rgba(255, 255, 255, 0.18)', 1, true);
    this.drawCurve('p3', 'rgba(255, 255, 255, 0.18)', 1, true);

    // Draw Aiden's Recorded Growth Trajectory
    if (this.dataPoints && this.dataPoints.length > 0) {
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 3;
      ctx.beginPath();

      this.dataPoints.forEach((pt, idx) => {
        const px = padding.left + (pt.age_months / 12) * chartW;
        const val = this.getMeasurementValue(pt);
        const py = padding.top + chartH - ((val - bounds.min) / (bounds.max - bounds.min)) * chartH;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Point dots
      this.dataPoints.forEach((pt) => {
        const px = padding.left + (pt.age_months / 12) * chartW;
        const val = this.getMeasurementValue(pt);
        const py = padding.top + chartH - ((val - bounds.min) / (bounds.max - bounds.min)) * chartH;

        ctx.fillStyle = '#0a0a0c';
        ctx.strokeStyle = '#00E5FF';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Hover Tooltip
    if (this.hoverPoint) {
      const { pt, px, py, val } = this.hoverPoint;
      ctx.fillStyle = 'rgba(18, 19, 24, 0.95)';
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 1;

      const text = `${pt.date} | ${val.toFixed(1)} ${bounds.unit} (${pt.age_days}d)`;
      ctx.font = '11px "JetBrains Mono", monospace';
      const textW = ctx.measureText(text).width + 16;
      const boxX = Math.min(px - textW / 2, w - textW - 10);
      const boxY = Math.max(py - 38, 10);

      ctx.fillRect(boxX, boxY, textW, 26);
      ctx.strokeRect(boxX, boxY, textW, 26);

      ctx.fillStyle = '#00E5FF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, boxX + textW / 2, boxY + 13);
    }
  }

  drawCurve(percentileKey, color, lineWidth, dashed) {
    const pts = this.getStandardCurve(percentileKey);
    if (!pts.length) return;

    const ctx = this.ctx;
    const padding = { top: 30, right: 30, bottom: 40, left: 55 };
    const chartW = this.displayWidth - padding.left - padding.right;
    const chartH = this.displayHeight - padding.top - padding.bottom;
    const bounds = this.getYBounds();

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    if (dashed) ctx.setLineDash([4, 4]);

    ctx.beginPath();
    pts.forEach((pt, i) => {
      const px = padding.left + (pt.month / 12) * chartW;
      const py = padding.top + chartH - ((pt.value - bounds.min) / (bounds.max - bounds.min)) * chartH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Label curve end
    const last = pts[pts.length - 1];
    if (last) {
      const lx = padding.left + (last.month / 12) * chartW;
      const ly = padding.top + chartH - ((last.value - bounds.min) / (bounds.max - bounds.min)) * chartH;
      ctx.fillStyle = color;
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(percentileKey.toUpperCase(), lx + 4, ly);
    }
    ctx.restore();
  }
}
