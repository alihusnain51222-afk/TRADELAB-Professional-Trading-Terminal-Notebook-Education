/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  BottomTab, 
  Asset, 
  Candle, 
  Timeframe, 
  Position, 
  EducationalTopic, 
  TradingTerm 
} from './types';
import { INITIAL_ASSETS, generateCandles } from './data/mockAssets';
import { TOPICS_LIST } from './data/educationData';
import { TRADING_TERMS } from './data/tradingTermsData';
import { AndroidFrame } from './components/AndroidFrame';
import { BottomNav } from './components/BottomNav';
import { MarketsScreen } from './components/screens/MarketsScreen';
import { ChartScreen } from './components/screens/ChartScreen';
import { AssetDetailsScreen } from './components/screens/AssetDetailsScreen';
import { TradeScreen } from './components/screens/TradeScreen';
import { LearnScreen } from './components/screens/LearnScreen';
import { LessonDetailScreen } from './components/screens/LessonDetailScreen';
import { TradingTermsScreen } from './components/screens/TradingTermsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { SearchModal } from './components/modals/SearchModal';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer';

export default function App() {
  // Navigation & Screen View State
  const [activeTab, setActiveTab] = useState<BottomTab>('markets');
  const [screenView, setScreenView] = useState<
    'tabs' | 'asset-details' | 'lesson-details' | 'trading-terms'
  >('tabs');

  // Selected entities
  const [selectedAssetId, setSelectedAssetId] = useState<string>('sol-usd');
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1);
  const [tradeInitialSide, setTradeInitialSide] = useState<'BUY' | 'SELL'>('BUY');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isPhoneMockup, setIsPhoneMockup] = useState<boolean>(() => {
    return window.innerWidth > 640;
  });

  // Assets & Candles State
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [timeframe, setTimeframe] = useState<Timeframe>('15m');
  const [currency, setCurrency] = useState<string>('USD');

  // Watchlist state (saved in localStorage)
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tradelab_watchlist');
      return saved ? JSON.parse(saved) : ['sol-usd', 'btc-usd', 'eth-usd'];
    } catch {
      return ['sol-usd', 'btc-usd', 'eth-usd'];
    }
  });

  // Paper Trading State
  const [demoBalance, setDemoBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('tradelab_balance');
      return saved ? parseFloat(saved) : 50000;
    } catch {
      return 50000;
    }
  });

  const [positions, setPositions] = useState<Position[]>(() => {
    try {
      const saved = localStorage.getItem('tradelab_positions');
      return saved ? JSON.parse(saved) : [
        {
          id: 'pos-init-1',
          assetId: 'sol-usd',
          symbol: 'SOL/USD',
          side: 'BUY',
          type: 'Market',
          entryPrice: 151.40,
          currentPrice: 154.28,
          amount: 5.0,
          leverage: 5,
          margin: 151.40,
          pnl: 14.40,
          pnlPercent: 9.51,
          timestamp: Date.now() - 3600000,
        }
      ];
    } catch {
      return [];
    }
  });

  // Learning Progress State
  const [completedTopicIds, setCompletedTopicIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('tradelab_completed_topics');
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  const [bookmarkedTopicIds, setBookmarkedTopicIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('tradelab_bookmarks');
      return saved ? JSON.parse(saved) : [5, 24];
    } catch {
      return [5, 24];
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tradelab_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('tradelab_balance', demoBalance.toString());
  }, [demoBalance]);

  useEffect(() => {
    localStorage.setItem('tradelab_positions', JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem('tradelab_completed_topics', JSON.stringify(completedTopicIds));
  }, [completedTopicIds]);

  useEffect(() => {
    localStorage.setItem('tradelab_bookmarks', JSON.stringify(bookmarkedTopicIds));
  }, [bookmarkedTopicIds]);

  // Current active asset
  const currentAsset = useMemo(() => {
    return assets.find((a) => a.id === selectedAssetId) || assets[0];
  }, [assets, selectedAssetId]);

  // Generate Candlestick series for the active asset and timeframe
  const candles = useMemo(() => {
    return generateCandles(currentAsset.price, timeframe, 50);
  }, [currentAsset.id, currentAsset.price, timeframe]);

  // Live Demo Price Fluctuation Simulation (Ticks every 3.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((asset) => {
          const deltaPct = (Math.random() - 0.495) * 0.003;
          const newPrice = Math.max(0.0001, asset.price * (1 + deltaPct));
          const roundedPrice = Number(newPrice.toFixed(asset.decimals));
          const newSparkline = [...asset.sparkline.slice(1), roundedPrice];

          return {
            ...asset,
            price: roundedPrice,
            sparkline: newSparkline,
            high24h: Math.max(asset.high24h, roundedPrice),
            low24h: Math.min(asset.low24h, roundedPrice),
          };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Update position P&L in real-time as market prices fluctuate
  useEffect(() => {
    setPositions((prevPositions) =>
      prevPositions.map((pos) => {
        const liveAsset = assets.find((a) => a.id === pos.assetId);
        if (!liveAsset) return pos;

        const currentPrice = liveAsset.price;
        const priceDiff = pos.side === 'BUY'
          ? currentPrice - pos.entryPrice
          : pos.entryPrice - currentPrice;
        const pnl = priceDiff * pos.amount * pos.leverage;
        const pnlPercent = (pnl / pos.margin) * 100;

        return {
          ...pos,
          currentPrice,
          pnl: Number(pnl.toFixed(2)),
          pnlPercent: Number(pnlPercent.toFixed(2)),
        };
      })
    );
  }, [assets]);

  // Handlers
  const handleToggleWatchlist = (assetId: string) => {
    setWatchlist((prev) =>
      prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
    );
  };

  const handleSelectAsset = (assetId: string) => {
    setSelectedAssetId(assetId);
    setScreenView('asset-details');
  };

  const handleNavigateToTrade = (side: 'BUY' | 'SELL') => {
    setTradeInitialSide(side);
    setScreenView('tabs');
    setActiveTab('trade');
  };

  const handleSelectTopic = (topicId: number) => {
    setSelectedTopicId(topicId);
    setScreenView('lesson-details');
  };

  const handleToggleComplete = (topicId: number) => {
    setCompletedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleToggleBookmark = (topicId: number) => {
    setBookmarkedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleOpenPosition = (
    newPosData: Omit<Position, 'id' | 'timestamp' | 'pnl' | 'pnlPercent'>
  ) => {
    const newPos: Position = {
      ...newPosData,
      id: `pos-${Date.now()}`,
      pnl: 0,
      pnlPercent: 0,
      timestamp: Date.now(),
    };
    setPositions((prev) => [newPos, ...prev]);
  };

  const handleClosePosition = (positionId: string) => {
    const pos = positions.find((p) => p.id === positionId);
    if (pos) {
      setDemoBalance((prev) => prev + pos.pnl);
      setPositions((prev) => prev.filter((p) => p.id !== positionId));
    }
  };

  const handleResetBalance = (amount: number = 50000) => {
    setDemoBalance(amount);
    setPositions([]);
  };

  const handleResetLearningProgress = () => {
    setCompletedTopicIds([]);
    setBookmarkedTopicIds([]);
  };

  // Determine current active theme (cream for notebook screens, dark for terminal)
  const isCreamView = 
    screenView === 'lesson-details' || 
    screenView === 'trading-terms' || 
    (screenView === 'tabs' && activeTab === 'learn');

  return (
    <AndroidFrame
      theme={isCreamView ? 'cream' : 'dark'}
      isPhoneMockup={isPhoneMockup}
      onToggleMockup={() => setIsPhoneMockup(!isPhoneMockup)}
    >
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        assets={assets}
        topics={TOPICS_LIST}
        terms={TRADING_TERMS}
        onSelectAsset={(id) => {
          setSelectedAssetId(id);
          setScreenView('asset-details');
        }}
        onSelectTopic={(id) => {
          setSelectedTopicId(id);
          setScreenView('lesson-details');
        }}
        onSelectTerm={(term) => {
          setScreenView('trading-terms');
        }}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Active Screen Router */}
      <div className="flex-1 flex flex-col w-full h-full relative">
        {screenView === 'asset-details' && (
          <AssetDetailsScreen
            asset={currentAsset}
            candles={candles}
            timeframe={timeframe}
            onChangeTimeframe={setTimeframe}
            onBack={() => setScreenView('tabs')}
            onTrade={(side) => handleNavigateToTrade(side)}
            inWatchlist={watchlist.includes(currentAsset.id)}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {screenView === 'lesson-details' && (
          <LessonDetailScreen
            topicId={selectedTopicId}
            totalTopics={TOPICS_LIST.length}
            onBack={() => setScreenView('tabs')}
            onNavigateTopic={(newId) => setSelectedTopicId(newId)}
            isCompleted={completedTopicIds.includes(selectedTopicId)}
            onToggleComplete={handleToggleComplete}
            isBookmarked={bookmarkedTopicIds.includes(selectedTopicId)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {screenView === 'trading-terms' && (
          <TradingTermsScreen onBack={() => setScreenView('tabs')} />
        )}

        {screenView === 'tabs' && (
          <>
            {activeTab === 'markets' && (
              <MarketsScreen
                assets={assets}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
                onSelectAsset={handleSelectAsset}
                onOpenSearch={() => setIsSearchOpen(true)}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
                demoBalance={demoBalance}
              />
            )}

            {activeTab === 'learn' && (
              <LearnScreen
                topics={TOPICS_LIST}
                onSelectTopic={handleSelectTopic}
                onOpenTradingTerms={() => setScreenView('trading-terms')}
                completedTopicIds={completedTopicIds}
                bookmarkedTopicIds={bookmarkedTopicIds}
              />
            )}

            {activeTab === 'chart' && (
              <ChartScreen
                currentAsset={currentAsset}
                assets={assets}
                onSelectAsset={setSelectedAssetId}
                candles={candles}
                timeframe={timeframe}
                onChangeTimeframe={setTimeframe}
                onNavigateToTrade={handleNavigateToTrade}
              />
            )}

            {activeTab === 'trade' && (
              <TradeScreen
                currentAsset={currentAsset}
                assets={assets}
                onSelectAsset={setSelectedAssetId}
                initialSide={tradeInitialSide}
                demoBalance={demoBalance}
                positions={positions}
                onOpenPosition={handleOpenPosition}
                onClosePosition={handleClosePosition}
                onResetBalance={() => handleResetBalance(50000)}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsScreen
                demoBalance={demoBalance}
                onResetBalance={handleResetBalance}
                completedTopicsCount={completedTopicIds.length}
                bookmarkedTopicsCount={bookmarkedTopicIds.length}
                onResetLearningProgress={handleResetLearningProgress}
                currency={currency}
                onChangeCurrency={setCurrency}
                defaultTimeframe={timeframe}
                onChangeDefaultTimeframe={setTimeframe}
              />
            )}
          </>
        )}
      </div>

      {/* Fixed Android Bottom Navigation Bar */}
      <BottomNav
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setScreenView('tabs');
        }}
        isCreamTheme={isCreamView}
      />
    </AndroidFrame>
  );
}
