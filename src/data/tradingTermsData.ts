import { TradingTerm } from '../types';

export const TRADING_TERMS: TradingTerm[] = [
  {
    symbol: 'SL',
    name: 'Stop Loss',
    category: 'Execution',
    shortDef: 'A predefined risk-limit order that closes a losing trade automatically.',
    inDepth: 'An order placed with a broker to sell (or buy to cover) once the asset reaches a specified price level, capping the maximum dollar loss on the position.',
    practicalRule: 'Always position your SL beyond technical market structure (e.g., beyond the invalidation swing high/low), never at an arbitrary round number.',
    example: 'Long SOL at $152.00, SL set at $149.20. Risk is strictly $2.80 per unit.'
  },
  {
    symbol: 'TP',
    name: 'Take Profit',
    category: 'Execution',
    shortDef: 'A pre-set target price where an open position is automatically closed for a gain.',
    inDepth: 'A limit order placed to lock in profits when the market reaches an intended objective, such as opposing liquidity pools, previous session highs, or institutional order blocks.',
    practicalRule: 'Scale out 50% to 75% of your position at TP1 and trail the remainder to Break Even.',
    example: 'Short ETH at $2,680, TP set at $2,620 (prior equal lows).'
  },
  {
    symbol: 'BE',
    name: 'Break Even',
    category: 'Execution',
    shortDef: 'Moving your stop loss to the exact entry price after price moves in your favor.',
    inDepth: 'Eliminates dollar risk on an open trade once intermediate structural confirmation or TP1 has been achieved.',
    practicalRule: 'Do not move to BE too eagerly; give the trade breathing room to withstand normal liquidity pullbacks.',
    example: 'Entry on BTC at $63,500. After BTC breaks $64,200, SL is adjusted to $63,500.'
  },
  {
    symbol: 'KZ',
    name: 'Killzone',
    category: 'Price Action',
    shortDef: 'High-volatility time windows where institutional algorithms execute orders.',
    inDepth: 'Specific trading hours (London Open KZ: 2:00–5:00 AM EST, New York Open KZ: 7:00–10:00 AM EST, Asian KZ: 8:00 PM–12:00 AM EST) with maximum algorithmic volume expansion.',
    practicalRule: 'Focus your high-risk scalps strictly during Killzones for clean directional follow-through.',
    example: 'Anticipate the London Open low of the day formation between 02:00 and 04:00 AM EST.'
  },
  {
    symbol: 'OB',
    name: 'Order Block',
    category: 'Order Blocks',
    shortDef: 'The last opposing candle prior to a strong displacement breaking structure.',
    inDepth: 'Represents institutional footprint where smart money accumulated massive positions. The 50% midpoint (Mean Threshold) acts as powerful dynamic support/resistance.',
    practicalRule: 'A valid bullish OB is confirmed only after subsequent candles close with displacement above the recent swing high.',
    example: 'Last red 15m candle before a 40-pip impulsive green surge that breaks prior highs.'
  },
  {
    symbol: 'BB',
    name: 'Breaker Block',
    category: 'Order Blocks',
    shortDef: 'A failed Order Block that violently flips into opposing support or resistance.',
    inDepth: 'Occurs when an initial order block sweeps liquidity (creates a higher high or lower low) but then fails, causing price to smash through it. The retest turns it into a Breaker.',
    practicalRule: 'Retests of a Breaker Block offer higher probability than ordinary OB retests because liquidity has already been cleared.',
    example: 'Bullish OB penetrated aggressively downward becomes a Bearish Breaker on the retest.'
  },
  {
    symbol: 'MB',
    name: 'Mitigation Block',
    category: 'Order Blocks',
    shortDef: 'An order block that did not sweep liquidity before price reversed through it.',
    inDepth: 'Similar to a breaker block, but formed without sweeping previous swing points. Institutions return to this zone to close lingering losing positions at breakeven.',
    practicalRule: 'Look for mitigation retests during strong trending phases where shallow pullbacks occur.',
    example: 'Retest of the mitigation level allows smart money to exit trapped inventory.'
  },
  {
    symbol: 'RB',
    name: 'Rejection Block',
    category: 'Order Blocks',
    shortDef: 'The long candle wick where aggressive price rejection and absorption took place.',
    inDepth: 'Focuses on the high/low of the wick rather than the candle body. Price frequently sweeps into the upper 50% of a rejection wick before reversing.',
    practicalRule: 'Target entries at the midpoint (Consequent Encroachment) of long rejection wicks.',
    example: 'A massive 4H rejection wick at $158.00; entry triggers when price re-taps $156.50.'
  },
  {
    symbol: 'FVG',
    name: 'Fair Value Gap',
    category: 'Liquidity',
    shortDef: 'A 3-candle imbalance where candle 1 and candle 3 wicks do not overlap.',
    inDepth: 'Created by rapid one-sided algorithmic buying or selling. The market views this gap as inefficient delivery and often returns to fill (rebalance) it.',
    practicalRule: 'Look for FVGs created during Killzones that align with higher-timeframe order flow.',
    example: 'Candle 1 high is $150, Candle 3 low is $153. The gap between $150 and $153 is the FVG.'
  },
  {
    symbol: 'IFVG',
    name: 'Inversion Fair Value Gap',
    category: 'Liquidity',
    shortDef: 'A Fair Value Gap that was invalidated and now acts as inverse support/resistance.',
    inDepth: 'When price cleanly disrespects an existing FVG and closes through it, the old bullish FVG becomes a bearish resistance zone on the retest (and vice versa).',
    practicalRule: 'Use IFVGs to confirm trend reversals when standard market structure remains choppy.',
    example: 'Price crashes through a bullish FVG; upon pullback, the bottom of that gap rejects price downward.'
  },
  {
    symbol: 'BOS',
    name: 'Break of Structure',
    category: 'Structure',
    shortDef: 'A clean candle body close beyond the previous structural high or low.',
    inDepth: 'Confirms the continuation of the prevailing trend. In an uptrend, a BOS is printed when price closes above the prior higher high.',
    practicalRule: 'Ensure the break is confirmed by a candle body close, not just a wick (which could be a liquidity sweep).',
    example: 'SOL closes a 1H candle above $154.50, confirming a bullish BOS.'
  },
  {
    symbol: 'CHOCH',
    name: 'Change of Character',
    category: 'Structure',
    shortDef: 'The first break of the internal market structure against the active trend.',
    inDepth: 'Often the earliest mechanical warning that a trend is losing momentum and preparing to reverse into an opposing directional cycle.',
    practicalRule: 'Trade CHOCH only when it occurs at higher-timeframe key levels of supply or demand.',
    example: 'After a multi-day downtrend, price prints a higher high on the 15m chart, creating a CHOCH.'
  },
  {
    symbol: 'VI',
    name: 'Volume Imbalance',
    category: 'Liquidity',
    shortDef: 'A gap between candle bodies where wicks overlap but bodies do not meet.',
    inDepth: 'A micro-structural imperfection where price opened with a leap or slippage, leaving a thin slice of untraded price space between bodies.',
    practicalRule: 'Price frequently seeks out volume imbalances to deliver fair pricing before continuing.',
    example: 'Candle 1 close: $151.20, Candle 2 open: $151.80, with tiny overlapping wicks.'
  },
  {
    symbol: 'LV',
    name: 'Liquidity Void',
    category: 'Liquidity',
    shortDef: 'A large, multi-candle vacuum of one-sided directional price displacement.',
    inDepth: 'Created during explosive market news or institutional liquidation cascades. These voids are typically filled completely in subsequent sessions.',
    practicalRule: 'Expect swift re-traversals through liquidity voids because minimal resting limit orders exist inside them.',
    example: 'A 200-point sudden vertical drop on Gold following an unexpected CPI spike.'
  },
  {
    symbol: 'SMT',
    name: 'Smart Money Technique',
    category: 'Price Action',
    shortDef: 'Intermarket divergence between correlated assets (e.g. BTC vs ETH).',
    inDepth: 'When Asset A makes a higher high, but correlated Asset B fails to make a higher high, indicating underlying institutional distribution or accumulation.',
    practicalRule: 'Trade in the direction of the asset displaying relative strength/weakness at major session inflection points.',
    example: 'BTC makes a new daily high while ETH fails to break its high; signals institutional selling.'
  },
  {
    symbol: 'LS',
    name: 'Liquidity Sweep',
    category: 'Liquidity',
    shortDef: 'Price briefly penetrates past a key level to trigger stop orders before reversing.',
    inDepth: 'Institutional algorithms engineer sweeps beyond obvious swing points to collect the liquidity needed to enter their massive counter positions.',
    practicalRule: 'Never place your stop directly at obvious swing highs; institutional algorithms hunt those levels.',
    example: 'Price wicks $0.50 above the Asian Session High, triggers retail breakout buys, and then collapses.'
  },
  {
    symbol: 'BSL',
    name: 'Buyside Liquidity',
    category: 'Liquidity',
    shortDef: 'Resting buy stop orders accumulated above old swing highs and equal highs.',
    inDepth: 'Contains buy stop orders from short sellers protecting their positions, as well as breakout buyers waiting for new highs.',
    practicalRule: 'Target BSL as your Take Profit when you are in a long position.',
    example: 'A cluster of clean swing highs at $158.40 holds significant resting BSL.'
  },
  {
    symbol: 'SSL',
    name: 'Sell Side Liquidity',
    category: 'Liquidity',
    shortDef: 'Resting sell stop orders accumulated beneath old swing lows and equal lows.',
    inDepth: 'Contains stop-loss market sell orders from long traders and breakdown sell orders from momentum participants.',
    practicalRule: 'Look for institutional buying after an aggressive sweep of Sell Side Liquidity.',
    example: 'Double bottoms at $147.10 contain resting SSL stop orders.'
  },
  {
    symbol: 'EQH',
    name: 'Equal Highs',
    category: 'Structure',
    shortDef: 'Two or more swing highs peaking at virtually the identical price level.',
    inDepth: 'Acts as an irresistible liquidity magnet for algorithmic order delivery because retail traders view it as strong resistance with stops clustered right above.',
    practicalRule: 'Never short equal highs; expect price to sweep clean through them.',
    example: 'Two peaks at $65,400.00 within $5 of each other create an obvious EQH target.'
  },
  {
    symbol: 'EQL',
    name: 'Equal Lows',
    category: 'Structure',
    shortDef: 'Two or more swing lows bottoming at virtually the identical price level.',
    inDepth: 'A major liquidity pool where stop losses are concentrated. Smart money frequently drives price below EQL before starting a significant rally.',
    practicalRule: 'Wait for the sweep of EQL and a structural shift (CHOCH) before entering long.',
    example: 'Triple bottom at $2,615 represents vulnerable liquidity to be purged.'
  },
  {
    symbol: 'PDH',
    name: 'Previous Day High',
    category: 'Price Action',
    shortDef: 'The highest price reached during the preceding 24-hour daily trading candle.',
    inDepth: 'A benchmark liquidity level monitored by all market participants. Sweeps of PDH during the London or NY session often establish daily reversal points.',
    practicalRule: 'Monitor price reaction at PDH: rejection wicks imply a potential day-high reversal.',
    example: 'Yesterday high of $158.45 serves as immediate BSL target for today session.'
  },
  {
    symbol: 'PDL',
    name: 'Previous Day Low',
    category: 'Price Action',
    shortDef: 'The lowest price reached during the preceding 24-hour daily trading candle.',
    inDepth: 'Key baseline of sell-side liquidity. A sweep below PDL followed by an energetic recovery often provides the setup for the daily low formation.',
    practicalRule: 'Look for a false breakdown of PDL in the New York open session to trigger high R:R longs.',
    example: 'SOL drops under PDL ($147.10), wicks to $146.80, and immediately surges back into the range.'
  },
  {
    symbol: 'IRL',
    name: 'Internal Range Liquidity',
    category: 'Liquidity',
    shortDef: 'Liquidity located inside the established trading range (FVGs and Order Blocks).',
    inDepth: 'Price oscillates between External Range Liquidity (swing highs/lows) and Internal Range Liquidity (FVGs and OBs inside the dealing range).',
    practicalRule: 'When external liquidity is swept, anticipate price to deliver back toward Internal Range Liquidity.',
    example: 'After sweeping the daily high, price pulls back to rebalance a 15m internal FVG.'
  },
  {
    symbol: 'ERL',
    name: 'External Range Liquidity',
    category: 'Liquidity',
    shortDef: 'Liquidity resting outside the range boundaries (major swing highs and lows).',
    inDepth: 'The outermost boundaries of the current market cycle. Once internal imbalances are mitigated, price expands outward toward External Range Liquidity.',
    practicalRule: 'Enter inside the internal range (discount/premium) and target the external range extremes.',
    example: 'Enter long on an internal OB at $150 and target the external swing high at $158.50.'
  }
];
