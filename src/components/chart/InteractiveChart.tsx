import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Candle } from '../../types';

interface InteractiveChartProps {
  candles: Candle[];
  symbol: string;
  currentPrice: number;
  decimals?: number;
  height?: number;
  showRSI?: boolean;
  showMA?: boolean;
  showEMA?: boolean;
  drawingMode?: 'none' | 'horizontal' | 'trendline';
}

interface Point {
  x: number;
  y: number;
}

interface DrawnLine {
  id: string;
  type: 'horizontal' | 'trendline';
  price?: number;
  start?: Point;
  end?: Point;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  candles,
  symbol,
  currentPrice,
  decimals = 2,
  height = 360,
  showRSI = false,
  showMA = true,
  showEMA = true,
  drawingMode = 'none',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Viewport / zoom state
  const [visibleCount, setVisibleCount] = useState<number>(45);
  const [offsetIndex, setOffsetIndex] = useState<number>(0);
  const [crosshair, setCrosshair] = useState<{ x: number; y: number; candle: Candle | null } | null>(null);
  const [lines, setLines] = useState<DrawnLine[]>([]);
  const [tempLine, setTempLine] = useState<Point | null>(null);

  // Dragging state
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);

  // Zoom controls
  const handleZoomIn = () => setVisibleCount((prev) => Math.max(15, prev - 8));
  const handleZoomOut = () => setVisibleCount((prev) => Math.min(candles.length, prev + 8));
  const handleReset = () => {
    setVisibleCount(45);
    setOffsetIndex(0);
  };

  // Slice visible candles
  const visibleCandles = useMemo(() => {
    const end = candles.length - offsetIndex;
    const start = Math.max(0, end - visibleCount);
    return candles.slice(start, end);
  }, [candles, visibleCount, offsetIndex]);

  // Calculate Moving Averages
  const ma20 = useMemo(() => {
    const period = 20;
    const result: (number | null)[] = [];
    for (let i = 0; i < candles.length; i++) {
      if (i < period - 1) {
        result.push(null);
      } else {
        let sum = 0;
        for (let j = 0; j < period; j++) {
          sum += candles[i - j].close;
        }
        result.push(sum / period);
      }
    }
    const end = candles.length - offsetIndex;
    const start = Math.max(0, end - visibleCount);
    return result.slice(start, end);
  }, [candles, visibleCount, offsetIndex]);

  const ema9 = useMemo(() => {
    const period = 9;
    const k = 2 / (period + 1);
    const result: (number | null)[] = [];
    let prevEma: number | null = null;
    for (let i = 0; i < candles.length; i++) {
      if (i === 0) {
        prevEma = candles[i].close;
        result.push(prevEma);
      } else {
        const currentEma: number = candles[i].close * k + (prevEma as number) * (1 - k);
        prevEma = currentEma;
        result.push(currentEma);
      }
    }
    const end = candles.length - offsetIndex;
    const start = Math.max(0, end - visibleCount);
    return result.slice(start, end);
  }, [candles, visibleCount, offsetIndex]);

  // Calculate RSI 14
  const rsiValues = useMemo(() => {
    const period = 14;
    const rsi: (number | null)[] = [];
    let gains = 0;
    let losses = 0;

    for (let i = 0; i < candles.length; i++) {
      if (i === 0) {
        rsi.push(null);
        continue;
      }
      const change = candles[i].close - candles[i - 1].close;
      if (i <= period) {
        if (change >= 0) gains += change;
        else losses += Math.abs(change);
        if (i === period) {
          let avgGain = gains / period;
          let avgLoss = losses / period;
          let rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
          rsi.push(100 - (100 / (1 + rs)));
        } else {
          rsi.push(null);
        }
      } else {
        let currentGain = change >= 0 ? change : 0;
        let currentLoss = change < 0 ? Math.abs(change) : 0;
        let prevRsi = rsi[i - 1];
        // simple smoothing
        let avgGain = (gains * (period - 1) + currentGain) / period;
        let avgLoss = (losses * (period - 1) + currentLoss) / period;
        gains = avgGain;
        losses = avgLoss;
        let rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        rsi.push(100 - (100 / (1 + rs)));
      }
    }
    const end = candles.length - offsetIndex;
    const start = Math.max(0, end - visibleCount);
    return rsi.slice(start, end);
  }, [candles, visibleCount, offsetIndex]);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || visibleCandles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    const priceScaleWidth = 62;
    const timeScaleHeight = 24;
    const rsiHeight = showRSI ? 70 : 0;
    const chartHeight = h - timeScaleHeight - rsiHeight;
    const chartWidth = w - priceScaleWidth;

    // 1. Background
    ctx.fillStyle = '#070A0F';
    ctx.fillRect(0, 0, w, h);

    // Subtle dark gradient in chart canvas
    const grad = ctx.createLinearGradient(0, 0, 0, chartHeight);
    grad.addColorStop(0, '#0A0E17');
    grad.addColorStop(1, '#06080D');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, chartWidth, chartHeight);

    // 2. High & Low bounds
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let maxVolume = 0;

    visibleCandles.forEach((c) => {
      if (c.low < minPrice) minPrice = c.low;
      if (c.high > maxPrice) maxPrice = c.high;
      if (c.volume > maxVolume) maxVolume = c.volume;
    });

    const priceRange = maxPrice - minPrice || 1;
    // Add 8% vertical padding
    const paddedMin = minPrice - priceRange * 0.05;
    const paddedMax = maxPrice + priceRange * 0.05;
    const paddedRange = paddedMax - paddedMin;

    const getY = (val: number) => {
      return chartHeight - ((val - paddedMin) / paddedRange) * chartHeight;
    };

    const getPriceFromY = (y: number) => {
      return paddedMin + ((chartHeight - y) / chartHeight) * paddedRange;
    };

    const candleWidth = chartWidth / visibleCandles.length;
    const barBodyWidth = Math.max(2, candleWidth * 0.72);

    // 3. Grid Lines (Horizontal & Price Labels)
    ctx.strokeStyle = '#151D2A';
    ctx.lineWidth = 1;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748B';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const priceGridSteps = 5;
    for (let i = 0; i <= priceGridSteps; i++) {
      const priceVal = paddedMin + (paddedRange / priceGridSteps) * i;
      const y = getY(priceVal);

      // Grid line
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartWidth, y);
      ctx.stroke();

      // Price scale text
      ctx.fillText(priceVal.toFixed(decimals), chartWidth + 6, y);
    }

    // 4. Volume Histogram (Bottom 20% of main chart)
    const volumeHeightMax = chartHeight * 0.22;
    visibleCandles.forEach((c, i) => {
      const x = i * candleWidth + candleWidth / 2;
      const isBull = c.close >= c.open;
      const volBarH = (c.volume / (maxVolume || 1)) * volumeHeightMax;
      const volY = chartHeight - volBarH;

      ctx.fillStyle = isBull ? 'rgba(0, 192, 135, 0.22)' : 'rgba(255, 59, 86, 0.22)';
      ctx.fillRect(x - barBodyWidth / 2, volY, barBodyWidth, volBarH);
    });

    // 5. Candlesticks
    visibleCandles.forEach((c, i) => {
      const x = i * candleWidth + candleWidth / 2;
      const isBull = c.close >= c.open;
      const color = isBull ? '#00C087' : '#FF3B56';

      const openY = getY(c.open);
      const closeY = getY(c.close);
      const highY = getY(c.high);
      const lowY = getY(c.low);

      // Wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Body
      ctx.fillStyle = color;
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.max(1.5, Math.abs(openY - closeY));
      ctx.fillRect(x - barBodyWidth / 2, bodyTop, barBodyWidth, bodyHeight);
    });

    // 6. Moving Averages
    if (showMA && ma20.length === visibleCandles.length) {
      ctx.strokeStyle = '#38BDF8'; // Electric blue MA20
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      let started = false;
      ma20.forEach((val, i) => {
        if (val !== null) {
          const x = i * candleWidth + candleWidth / 2;
          const y = getY(val);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();
    }

    if (showEMA && ema9.length === visibleCandles.length) {
      ctx.strokeStyle = '#F59E0B'; // Amber EMA9
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      let started = false;
      ema9.forEach((val, i) => {
        if (val !== null) {
          const x = i * candleWidth + candleWidth / 2;
          const y = getY(val);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();
    }

    // 7. Current Price Horizontal Marker
    const curY = getY(currentPrice);
    if (curY >= 0 && curY <= chartHeight) {
      ctx.strokeStyle = '#00E5FF';
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, curY);
      ctx.lineTo(chartWidth, curY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Current price tag in scale
      ctx.fillStyle = '#00E5FF';
      ctx.fillRect(chartWidth + 2, curY - 9, priceScaleWidth - 4, 18);
      ctx.fillStyle = '#05070A';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.fillText(currentPrice.toFixed(decimals), chartWidth + 6, curY);
    }

    // 8. Support & Resistance Reference Lines
    const supportLevel = minPrice + priceRange * 0.25;
    const resistLevel = maxPrice - priceRange * 0.22;
    
    // Support line (Green dashed)
    const supY = getY(supportLevel);
    ctx.strokeStyle = 'rgba(0, 192, 135, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, supY);
    ctx.lineTo(chartWidth, supY);
    ctx.stroke();
    ctx.fillStyle = '#00C087';
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillText(`SUPP ${supportLevel.toFixed(decimals)}`, 6, supY - 4);

    // Resistance line (Red dashed)
    const resY = getY(resistLevel);
    ctx.strokeStyle = 'rgba(255, 59, 86, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0, resY);
    ctx.lineTo(chartWidth, resY);
    ctx.stroke();
    ctx.fillStyle = '#FF3B56';
    ctx.fillText(`RESIST ${resistLevel.toFixed(decimals)}`, 6, resY - 4);
    ctx.setLineDash([]);

    // 9. User Drawn Lines
    lines.forEach((l) => {
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1.5;
      if (l.type === 'horizontal' && l.price) {
        const y = getY(l.price);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(chartWidth, y);
        ctx.stroke();
        ctx.fillStyle = '#CBD5E1';
        ctx.fillText(`RAY ${l.price.toFixed(decimals)}`, chartWidth - 55, y - 4);
      } else if (l.type === 'trendline' && l.start && l.end) {
        ctx.beginPath();
        ctx.moveTo(l.start.x, l.start.y);
        ctx.lineTo(l.end.x, l.end.y);
        ctx.stroke();
      }
    });

    // 10. Time Scale (Bottom axis)
    ctx.fillStyle = '#0D1117';
    ctx.fillRect(0, chartHeight, w, timeScaleHeight);
    ctx.fillStyle = '#64748B';
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';

    const timeSteps = 4;
    for (let i = 0; i <= timeSteps; i++) {
      const idx = Math.floor((visibleCandles.length - 1) * (i / timeSteps));
      const c = visibleCandles[idx];
      if (c) {
        const x = idx * candleWidth + candleWidth / 2;
        const d = new Date(c.time);
        const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
        ctx.fillText(timeStr, x, chartHeight + 14);
      }
    }

    // 11. RSI Panel (Optional Sub-Chart)
    if (showRSI) {
      const rsiTop = chartHeight + timeScaleHeight;
      ctx.fillStyle = '#06090E';
      ctx.fillRect(0, rsiTop, w, rsiHeight);

      // Separator line
      ctx.strokeStyle = '#1E293B';
      ctx.beginPath();
      ctx.moveTo(0, rsiTop);
      ctx.lineTo(w, rsiTop);
      ctx.stroke();

      // 70 and 30 reference lines
      const y70 = rsiTop + rsiHeight * 0.3;
      const y30 = rsiTop + rsiHeight * 0.7;

      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(0, y70);
      ctx.lineTo(chartWidth, y70);
      ctx.stroke();
      ctx.fillText('70', chartWidth + 14, y70);

      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.beginPath();
      ctx.moveTo(0, y30);
      ctx.lineTo(chartWidth, y30);
      ctx.stroke();
      ctx.fillText('30', chartWidth + 14, y30);
      ctx.setLineDash([]);

      // RSI Curve
      ctx.strokeStyle = '#A855F7'; // Purple RSI
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      let started = false;
      rsiValues.forEach((val, i) => {
        if (val !== null) {
          const x = i * candleWidth + candleWidth / 2;
          const clampedVal = Math.max(0, Math.min(100, val));
          const y = rsiTop + rsiHeight * (1 - clampedVal / 100);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();

      ctx.fillStyle = '#A855F7';
      ctx.textAlign = 'left';
      ctx.fillText(`RSI(14): ${rsiValues[rsiValues.length - 1]?.toFixed(1) || '52.4'}`, 6, rsiTop + 14);
    }

    // 12. Crosshair Overlay
    if (crosshair && crosshair.x < chartWidth && crosshair.y < chartHeight) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      // Vertical crosshair
      ctx.beginPath();
      ctx.moveTo(crosshair.x, 0);
      ctx.lineTo(crosshair.x, chartHeight);
      ctx.stroke();

      // Horizontal crosshair
      ctx.beginPath();
      ctx.moveTo(0, crosshair.y);
      ctx.lineTo(chartWidth, crosshair.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Price bubble on scale
      const hoverPrice = getPriceFromY(crosshair.y);
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(chartWidth + 1, crosshair.y - 8, priceScaleWidth - 2, 16);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(hoverPrice.toFixed(decimals), chartWidth + 6, crosshair.y + 1);
    }
  }, [
    visibleCandles,
    currentPrice,
    decimals,
    height,
    showRSI,
    showMA,
    showEMA,
    lines,
    crosshair,
    ma20,
    ema9,
    rsiValues,
  ]);

  // Mouse & Touch interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (drawingMode === 'horizontal') {
      const priceScaleWidth = 62;
      const chartWidth = rect.width - priceScaleWidth;
      const chartHeight = rect.height - 24 - (showRSI ? 70 : 0);
      let minPrice = Infinity;
      let maxPrice = -Infinity;
      visibleCandles.forEach((c) => {
        if (c.low < minPrice) minPrice = c.low;
        if (c.high > maxPrice) maxPrice = c.high;
      });
      const priceRange = maxPrice - minPrice || 1;
      const paddedMin = minPrice - priceRange * 0.05;
      const paddedMax = maxPrice + priceRange * 0.05;
      const clickedPrice = paddedMin + ((chartHeight - y) / chartHeight) * (paddedMax - paddedMin);

      setLines((prev) => [
        ...prev,
        { id: `line-${Date.now()}`, type: 'horizontal', price: clickedPrice },
      ]);
      return;
    }

    if (drawingMode === 'trendline') {
      if (!tempLine) {
        setTempLine({ x, y });
      } else {
        setLines((prev) => [
          ...prev,
          { id: `trend-${Date.now()}`, type: 'trendline', start: tempLine, end: { x, y } },
        ]);
        setTempLine(null);
      }
      return;
    }

    isDragging.current = true;
    lastMouseX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const priceScaleWidth = 62;
    const chartWidth = rect.width - priceScaleWidth;

    if (isDragging.current) {
      const deltaX = e.clientX - lastMouseX.current;
      if (Math.abs(deltaX) > 6) {
        const step = Math.sign(deltaX) * -1;
        setOffsetIndex((prev) => {
          const next = prev + step;
          return Math.max(0, Math.min(candles.length - visibleCount, next));
        });
        lastMouseX.current = e.clientX;
      }
    }

    // Update crosshair info
    if (x >= 0 && x <= chartWidth) {
      const candleWidth = chartWidth / visibleCandles.length;
      const index = Math.min(visibleCandles.length - 1, Math.max(0, Math.floor(x / candleWidth)));
      setCrosshair({
        x,
        y,
        candle: visibleCandles[index] || null,
      });
    } else {
      setCrosshair(null);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerLeave = () => {
    isDragging.current = false;
    setCrosshair(null);
  };

  const activeCandle = crosshair?.candle || visibleCandles[visibleCandles.length - 1];

  return (
    <div ref={containerRef} className="w-full flex flex-col bg-[#070A0F] select-none">
      {/* Top Crosshair / Candle Data Bar */}
      <div className="flex flex-wrap items-center justify-between px-3 py-1.5 bg-[#0C1017] border-b border-[#1A2230] text-[10px] font-terminal-mono text-slate-300">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-semibold">{symbol}</span>
          {activeCandle && (
            <div className="flex items-center gap-2 text-slate-400">
              <span>O: <span className="text-white">{activeCandle.open.toFixed(decimals)}</span></span>
              <span>H: <span className="text-emerald-400">{activeCandle.high.toFixed(decimals)}</span></span>
              <span>L: <span className="text-rose-400">{activeCandle.low.toFixed(decimals)}</span></span>
              <span>C: <span className={activeCandle.close >= activeCandle.open ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>{activeCandle.close.toFixed(decimals)}</span></span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span>Vol: <span className="text-slate-200">{activeCandle?.volume.toLocaleString() || '0'}</span></span>
          {showMA && <span className="text-[#38BDF8]">MA(20)</span>}
          {showEMA && <span className="text-[#F59E0B]">EMA(9)</span>}
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
        />

        {/* Floating Mini Zoom Controls */}
        <div className="absolute bottom-9 left-2 flex items-center gap-1 bg-[#101622]/90 backdrop-blur-md px-1.5 py-1 rounded-md border border-slate-700/50 shadow-md">
          <button
            onClick={handleZoomIn}
            className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded text-xs font-bold transition-colors"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded text-xs font-bold transition-colors"
            title="Zoom Out"
          >
            -
          </button>
          <button
            onClick={handleReset}
            className="px-1.5 h-6 flex items-center justify-center text-[10px] text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
            title="Reset View"
          >
            RESET
          </button>
          {lines.length > 0 && (
            <button
              onClick={() => setLines([])}
              className="px-1.5 h-6 flex items-center justify-center text-[10px] text-rose-400 hover:bg-rose-950/40 rounded transition-colors"
              title="Clear Lines"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
