import { EducationalTopic, LessonDetail } from '../types';

export const TOPICS_LIST: EducationalTopic[] = [
  { id: 1, number: 1, title: 'Trading Psychology', subtitle: 'Emotional discipline, greed, fear & cognitive bias', category: 'Psychology', readTime: '6 min', completed: true },
  { id: 2, number: 2, title: 'Risk Management', subtitle: 'The 1% rule, capital preservation & drawdown control', category: 'Risk & Basics', readTime: '5 min', completed: true },
  { id: 3, number: 3, title: 'Position Sizing', subtitle: 'Calculating contracts, lots & portfolio risk exposure', category: 'Risk & Basics', readTime: '4 min' },
  { id: 4, number: 4, title: 'Technical Analysis Basics', subtitle: 'Charts, bid/ask dynamics, timeframes & candlestick mechanics', category: 'Technical Analysis', readTime: '7 min' },
  { id: 5, number: 5, title: 'Price Action Mastery', subtitle: 'Reading naked charts without indicator lag', category: 'Technical Analysis', readTime: '8 min' },
  { id: 6, number: 6, title: 'Candlestick Patterns', subtitle: 'Pin bars, engulfing candles, inside bars & rejection wicks', category: 'Technical Analysis', readTime: '6 min' },
  { id: 7, number: 7, title: 'Support & Resistance', subtitle: 'Horizontal levels, dynamic bands, flips & retests', category: 'Technical Analysis', readTime: '5 min' },
  { id: 8, number: 8, title: 'Trend Following', subtitle: 'Identifying higher-highs/higher-lows & riding momentum', category: 'Technical Analysis', readTime: '6 min' },
  { id: 9, number: 9, title: 'Breakout Trading', subtitle: 'Validating volume expansion vs fakeouts & bull/bear traps', category: 'Technical Analysis', readTime: '7 min' },
  { id: 10, number: 10, title: 'Volume Analysis', subtitle: 'Volume delta, absorption, climax spikes & exhaustion', category: 'Technical Analysis', readTime: '8 min' },
  { id: 11, number: 11, title: 'Chart Patterns', subtitle: 'Head & Shoulders, Flags, Wedges, Triangles & Double Tops', category: 'Technical Analysis', readTime: '6 min' },
  { id: 12, number: 12, title: 'VWAP Strategies', subtitle: 'Volume Weighted Average Price, standard deviation bands', category: 'Execution', readTime: '7 min' },
  { id: 13, number: 13, title: 'RSI & Momentum Indicators', subtitle: 'Divergence, overbought/oversold resets & failure swings', category: 'Technical Analysis', readTime: '6 min' },
  { id: 14, number: 14, title: 'Market Structure', subtitle: 'BOS (Break of Structure), CHOCH & internal vs swing legs', category: 'Advanced SMC', readTime: '9 min' },
  { id: 15, number: 15, title: 'Timeframe Correlation', subtitle: 'HTF bias (Daily/4H) to LTF execution (15m/5m/1m)', category: 'Execution', readTime: '7 min' },
  { id: 16, number: 16, title: 'Entry / Exit Strategies', subtitle: 'Limit fill techniques, trigger confirmations & scale-outs', category: 'Execution', readTime: '6 min' },
  { id: 17, number: 17, title: 'Trade Journaling', subtitle: 'Tracking setups, mistakes, emotional state & R-multiples', category: 'Psychology', readTime: '5 min' },
  { id: 18, number: 18, title: 'Backtesting', subtitle: 'Systematic sample sizing, win-rate vs expectancy modeling', category: 'Execution', readTime: '8 min' },
  { id: 19, number: 19, title: 'Trading Plan Creation', subtitle: 'Pre-flight checklist, rules of engagement & session limits', category: 'Risk & Basics', readTime: '6 min' },
  { id: 20, number: 20, title: 'News & Events Impact', subtitle: 'FOMC, CPI, NFP volatility, slippage & spread widening', category: 'Execution', readTime: '5 min' },
  { id: 21, number: 21, title: 'Economic Indicators', subtitle: 'Interest rates, DXY correlations, yield curves & liquidity', category: 'Technical Analysis', readTime: '7 min' },
  { id: 22, number: 22, title: 'Order Flow & Liquidity', subtitle: 'Order book depth, limit orders vs aggressive market orders', category: 'Advanced SMC', readTime: '8 min' },
  { id: 23, number: 23, title: 'Institutional Footprints', subtitle: 'Smart money accumulation, manipulation & distribution', category: 'Advanced SMC', readTime: '9 min' },
  { id: 24, number: 24, title: 'Smart Money Concepts', subtitle: 'Order blocks (OB), mitigation blocks & breaker blocks', category: 'Advanced SMC', readTime: '10 min' },
  { id: 25, number: 25, title: 'Liquidity Concepts', subtitle: 'Buy-side liquidity (BSL), sell-side liquidity (SSL) & sweeps', category: 'Advanced SMC', readTime: '9 min' },
  { id: 26, number: 26, title: 'Market Sessions', subtitle: 'Asian consolidation, London open expansion, NY reversal', category: 'Execution', readTime: '6 min' },
  { id: 27, number: 27, title: 'Trade Psychology Advanced', subtitle: 'Overcoming revenge trading, FOMO, tilt & sizing anxiety', category: 'Psychology', readTime: '7 min' },
  { id: 28, number: 28, title: 'Risk / Reward', subtitle: 'Asymmetric 1:3+ setups, mathematical expectancy & breakeven', category: 'Risk & Basics', readTime: '5 min' },
  { id: 29, number: 29, title: 'Trade Review', subtitle: 'Post-market auditing, tagging playbook setups & grading execution', category: 'Execution', readTime: '6 min' },
  { id: 30, number: 30, title: 'Building a Trading Routine', subtitle: 'Pre-market prep, focus hygiene, debrief & sustainable longevity', category: 'Psychology', readTime: '6 min' }
];

// Rich curriculum content for lessons
export const LESSONS_DATABASE: Record<number, LessonDetail> = {
  1: {
    topicId: 1,
    title: 'Trading Psychology',
    tagline: 'Mastering the inner game before the outer market',
    intro: 'Trading is not merely a game of statistical probability; it is an intense mirror into human behavior. Most traders fail not because they cannot find technical setups, but because they cannot manage fear, greed, hope, and regret under financial uncertainty.',
    whatIsIt: 'Trading psychology encompasses your mental and emotional state while navigating the financial markets. It dictates how you respond to winning streaks, devastating losses, missed opportunities (FOMO), and the urge to break rules (revenge trading).',
    keyConcepts: [
      {
        heading: 'Emotional Neutrality (The Zen State)',
        description: 'Treat every individual trade as simply one random outcome out of the next 1,000 trades. Detach your self-worth from whether a single setup hit Take Profit or Stop Loss.'
      },
      {
        heading: 'The Fallacy of Revenge Trading',
        description: 'Immediately increasing position size after a loss to "make it back" triggers dopamine-fueled gambles. Professional traders pause or close the terminal after two consecutive losses.'
      },
      {
        heading: 'FOMO (Fear of Missing Out)',
        description: 'Entering a trade after price has already made a parabolic impulse. Chasing green candles results in buying at institutional resistance or right into a liquidity sweep.'
      },
      {
        heading: 'Loss Aversion Bias',
        description: 'Humans feel the psychological pain of a loss twice as intensely as the pleasure of an equivalent gain. This bias causes amateurs to hold losing trades and cut winners too quickly.'
      }
    ],
    commonMistakes: [
      'Moving your Stop Loss further away when price approaches it, hoping it will reverse.',
      'Checking your P&L every 10 seconds on your mobile phone instead of observing the chart structure.',
      'Over-trading out of boredom during low-volume Asian or mid-day consolidation sessions.',
      'Believing you can outsmart the market through sheer stubbornness.'
    ],
    practicalExample: {
      scenario: 'You planned a long setup on SOL at $150.00 with a stop at $147.00 (3% risk). Price drops quickly to $147.10 on heavy news volume.',
      action: 'Amateur reaction: Widens stop to $142.00 to avoid taking a $300 loss. Result: SOL flushes to $138.00, wiping out 25% of account balance.',
      lesson: 'Rule: Respect your original invalidated level unconditionally. A stopped-out trade is a successful execution of your risk rule.'
    },
    recap: [
      'Accept that uncertainty is guaranteed on every individual execution.',
      'Preserve emotional capital just as rigorously as dollar capital.',
      'Set hard daily loss limits: 2 strikes and step away from the screens.'
    ]
  },
  2: {
    topicId: 2,
    title: 'Risk Management',
    tagline: 'The absolute foundation of long-term trader survival',
    intro: 'If you take away all chart analysis, Fibonacci retracements, and indicators, risk management alone is what keeps you in the game. Without strict risk control, a 90% win-rate strategy will still inevitably blow up an account.',
    whatIsIt: 'Risk management is the systematic process of protecting your trading capital from catastrophic loss through predefined position sizing, stop-loss orders, max portfolio drawdown thresholds, and asymmetrical risk-to-reward ratios.',
    keyConcepts: [
      {
        heading: 'The 1% Risk Rule',
        description: 'Never risk more than 1% to 2% of your total account balance on any single trade idea. If you have a $50,000 account, your maximum loss on an invalidated trade should never exceed $500.'
      },
      {
        heading: 'Asymmetric Risk to Reward (R:R)',
        description: 'Aim for setups offering at least 1:2 or 1:3 R:R. With a 1:3 ratio, you only need to win 33% of your trades to generate steady net profitability.'
      },
      {
        heading: 'The Math of Drawdown',
        description: 'A 10% account drawdown requires an 11% gain to recover. A 50% drawdown requires a 100% gain to breakeven! Preservation of principal is paramount.'
      }
    ],
    commonMistakes: [
      'Using a fixed lot size without calculating how many dollars are at risk to the stop price.',
      'Trading with high margin leverage (e.g. 50x) without understanding liquidation price proximity.',
      'Risking 10% on a "sure thing" tip heard on social media.'
    ],
    practicalExample: {
      scenario: 'You have a $10,000 demo trading account. You wish to buy BTC at $64,000 with a stop loss at $63,000 ($1,000 per BTC stop distance).',
      action: 'Calculation: 1% risk of $10,000 = $100 max risk. Max position = $100 / $1,000 = 0.10 BTC.',
      lesson: 'Position size must adapt to the stop-loss distance, never the other way around!'
    },
    recap: [
      'Risk 1% per trade maximum.',
      'Never trade without a pre-calculated hard Stop Loss.',
      'Calculate position size = (Account Equity × Risk %) / Stop Distance.'
    ]
  },
  5: {
    topicId: 5,
    title: 'Price Action Mastery',
    tagline: 'Understanding raw market intent without indicator lag',
    intro: 'All indicators (MACD, RSI, Stochastics) are lagging mathematical derivatives of price and volume. Price action is the direct recording of transactions between buyers and sellers in real time.',
    whatIsIt: 'Price action trading is the discipline of analyzing raw candlestick formations, swing highs, swing lows, and price delivery without relying on lagging secondary indicators.',
    keyConcepts: [
      {
        heading: 'Swing Highs & Swing Lows',
        description: 'A bullish trend consists of consecutive Higher Highs (HH) and Higher Lows (HL). A bearish trend consists of Lower Highs (LH) and Lower Lows (LL).'
      },
      {
        heading: 'Wick Rejections (Shadows)',
        description: 'Long wicks signify aggressive price rejection and absorption. A long lower wick indicates buyers absorbed all market sell orders at that level.'
      },
      {
        heading: 'Momentum vs Compression',
        description: 'Large body candles represent aggressive institutional participants. Small overlapping candles (compression) represent equilibrium preceding an explosive expansion.'
      }
    ],
    commonMistakes: [
      'Cluttering the screen with 7 indicators that contradict one another.',
      'Trading single candlestick patterns without understanding the higher timeframe market structure.',
      'Failing to notice compression right below key resistance before an upward breakout.'
    ],
    practicalExample: {
      scenario: 'SOL is pushing up into a 4H resistance zone at $155.00. The 15m chart prints a massive pin bar with a 3x upper wick and tiny lower body.',
      action: 'Interpretation: Buyers attempted to push higher, but were violently absorbed by institutional resting limit sell orders. A short scalp setup is validated.',
      lesson: 'Candle wicks tell you who lost the immediate battle at key price points.'
    },
    recap: [
      'Price is the only true leading indicator in the market.',
      'Look for momentum shifts through candle body size and displacement.',
      'Combine HTF location with LTF price action triggers.'
    ]
  },
  24: {
    topicId: 24,
    title: 'Smart Money Concepts',
    tagline: 'Decoding institutional delivery, liquidity and order blocks',
    intro: 'Retail traders often believe markets move randomly. Smart Money Concepts (SMC) views the market through the lens of algorithmic price delivery designed to seek liquidity and mitigate institutional exposure.',
    whatIsIt: 'SMC is an institutional trading framework that focuses on Order Blocks (OB), Fair Value Gaps (FVG), Breaker Blocks, and liquidity engineering rather than retail patterns like double tops or head and shoulders.',
    keyConcepts: [
      {
        heading: 'Order Blocks (OB)',
        description: 'The last opposing candle before a violent displacement of price that breaks market structure. It contains unmitigated institutional resting orders.'
      },
      {
        heading: 'Fair Value Gap (FVG)',
        description: 'A 3-candle price imbalance where candle 1 high and candle 3 low do not overlap, leaving an inefficient price gap that the algorithm often returns to fill.'
      },
      {
        heading: 'Break of Structure (BOS)',
        description: 'A clean candle body close beyond the prior swing high (in an uptrend) or swing low (in a downtrend), confirming trend continuation.'
      },
      {
        heading: 'Change of Character (CHOCH)',
        description: 'The initial shift in market structure when price breaks the internal swing low in an uptrend, signaling a potential trend reversal.'
      }
    ],
    commonMistakes: [
      'Marking every single candle as an Order Block without waiting for displacement.',
      'Trading FVGs in the middle of no-man’s land instead of at key discount/premium levels.',
      'Ignoring the Higher Timeframe (Daily/4H) directional draw on liquidity.'
    ],
    practicalExample: {
      scenario: 'ETH sweeps previous day low at $2,615, aggressively rejects, and creates an impulsive green candle closing above the 15m swing high with an FVG between $2,625 and $2,632.',
      action: 'Entry: Place limit buy order at the top of the FVG ($2,632), stop loss below the swept swing low ($2,612), target the buy-side liquidity resting at $2,700.',
      lesson: 'Institutions create displacement to trap sellers, then retest imbalances before expanding toward opposing liquidity.'
    },
    recap: [
      'Institutions require counter-party liquidity to fill massive orders.',
      'Look for displacement candles that break structure leaving FVGs.',
      'Target obvious liquidity pools (Equal Highs and Lows).'
    ]
  }
};

// Generates fallback lesson content for any topic without explicit manual entry
export function getLessonContent(topicId: number): LessonDetail {
  if (LESSONS_DATABASE[topicId]) {
    return LESSONS_DATABASE[topicId];
  }

  const topic = TOPICS_LIST.find(t => t.id === topicId) || TOPICS_LIST[0];

  return {
    topicId: topic.id,
    title: topic.title,
    tagline: topic.subtitle,
    intro: `Mastering ${topic.title} is a critical milestone for every independent market participant. This module breaks down the mechanical foundations, strategic execution rules, and practical market applications used by elite institutional and prop-firm traders.`,
    whatIsIt: `${topic.title} represents a core pillar of trading proficiency. By understanding how this concept influences market liquidity, price delivery, and trader decision-making, you can systematically identify high-probability trading opportunities while strictly containing downside exposure.`,
    keyConcepts: [
      {
        heading: '1. Theoretical Framework & Mechanics',
        description: `How ${topic.title.toLowerCase()} operates within real-world auction mechanics, market depth, and algorithmic delivery protocols.`
      },
      {
        heading: '2. Identification & Timeframe Rules',
        description: 'Locating high-probability conditions on the Higher Timeframe (4H / Daily) before zooming in for precision Lower Timeframe execution.'
      },
      {
        heading: '3. Invalidation & Risk Parameters',
        description: 'Knowing exactly where the setup is proven wrong so you can define an uncompromising stop-loss before entering the order.'
      }
    ],
    commonMistakes: [
      'Executing without waiting for confirmed candle close validation.',
      'Misinterpreting normal consolidation for an explosive directional signal.',
      'Over-leveraging and violating your account maximum risk tolerance.'
    ],
    practicalExample: {
      scenario: `A typical market cycle unfolds where ${topic.title} signals a shift in institutional order flow on the asset chart.`,
      action: 'A disciplined trader prepares their order parameters in advance, waits for the price to retrace into the designated level, and executes with a predefined 1:3 Risk/Reward target.',
      lesson: 'Patience and strict adherence to rule-based execution consistently outperform impulse-driven trading.'
    },
    recap: [
      `Always analyze ${topic.title.toLowerCase()} in the context of the dominant trend.`,
      'Confirm setups across at least two correlated timeframes.',
      'Document every setup in your trading journal for post-session analysis.'
    ]
  };
}
