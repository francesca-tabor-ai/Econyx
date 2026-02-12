
import React, { useState, useEffect, useMemo, Suspense, useRef } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, Legend, ComposedChart, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  Activity, ArrowRight, BarChart3, BrainCircuit, Calendar, ChevronDown, ChevronLeft, CloudLightning, Database, Eye, Filter, Gauge, Layout, LockKeyhole, Plus, Rocket, Search, ShieldCheck, Signal, Sparkles, Target, Terminal, TrendingUp, Users, Wifi, X, ArrowUpDown, Copy, Check, Info, Award, History, Settings, Zap, ListChecks, ChevronRight, FileText, TrendingDown, Layers, ShieldAlert, Clock, Cpu, Globe, Server, HardDrive, Info as InfoIcon, Sliders, Wand2, Calculator, ToggleLeft, ToggleRight, MousePointer2, Shield, Key, BarChart as BarChartIcon, Monitor, Save, Trash2, Edit3, Repeat, DollarSign, PieChart as PieChartIcon, ArrowUpRight, PlusCircle, XCircle, Sparkle, Split, ShieldOff, AlertTriangle, Play, Pause, RefreshCw, Send, Hammer, Box, Archive, History as HistoryIcon, HardDrive as MemoryIcon, Microscope, Binary, Cpu as CpuIcon, Network, Bell, BellRing, Settings2, Fingerprint, Crosshair, Scale, Map, Compass, Route, List, TrendingUp as TrendingUpIcon, ChartPie, FastForward, Rewind, PlayCircle, StopCircle, Handshake, Gavel, MessagesSquare, ArrowLeftRight, Brain, Lightbulb, Microscope as MicroscopeIcon, TestTube2, Workflow as WorkflowIcon, Home, LayoutDashboard, LogOut, Coins, Percent, Landmark, Tag, Briefcase, BarChart4, ShoppingCart, Store, Receipt, BarChartHorizontal, Leaf, CreditCard, SlidersHorizontal, Power, Radio, Loader2, Megaphone, CheckCircle2, AlertCircle, Bookmark
} from 'lucide-react';
import { 
  Workflow, AggregatedData, TimePeriod, RealtimeState, PerformanceSnapshot, DashboardWidget, 
  MaturityScore, EconomicMaturity, MaturityDimension, ForecastScenario, ForecastPoint, 
  SecurityPolicy, ExternalDataSource, FunctionExecutionMetric, SavedForecast, PricingModel, 
  DemandScenario, SimulationOutcome, BudgetPolicy, BudgetAllocation, EnforcementLog, 
  CostEvent, RealtimeBudgetCounter, EnforcementBroadcastEvent, ServerlessPerformance, LatencyPoint,
  GuardrailPolicy, PolicyViolationLog, PolicyTemplate, ModelMetadata, RoutingPolicy, RoutingDecisionLog,
  CostPressureRule, CostPressureSignal, AgentResponseLog, EconomicScoringModel, AgentDecisionLogEntry,
  EconomicUtilityFunction, ActionDefinition, AgentPlan, PlanStep,
  WorkflowDefinition, ROIPolicy, WorkflowPathOption, ROIRoutingEvent,
  ThrottlingPolicy, MASThrottlingStatus, ThrottlingAuditEntry,
  LearningModel, AdaptivePolicy, ExperimentResult, OptimizationAuditEntry, LearningProgressPoint,
  MarginTarget, MarginOptimizationPolicy, StrategyAdjustment, MarginPerformancePoint,
  PricingPolicy, MarketSignal, PricingRecommendation, RevenueImpactPoint,
  NegotiationSession, AgentProposal, NegotiationProtocol, NegotiationAuditEntry,
  AIServiceListing, MarketplaceTransaction, ProviderProfile, MarketDynamicsPoint,
  AppNotification
} from './types';
import { 
  fetchAggregatedData, calculateMaturityScore, runForecastSimulation, fetchActiveSecurityPolicies, 
  fetchPricingModels, fetchDemandScenarios, runPricingSimulation, fetchBudgetPolicies, 
  fetchBudgetAllocations, fetchEnforcementLogs, fetchRealtimeCounters, saveBudgetPolicy, 
  updatePolicyStatus, triggerBudgetReset, subscribeToGovernanceStream, analyzeEconomics, 
  fetchRegionalPerformance, fetchLatencyTelemetry, fetchGuardrailPolicies, fetchViolationLogs, 
  fetchPolicyTemplates, saveGuardrailPolicy, fetchModelMetadata, fetchRoutingPolicies, fetchRoutingLogs,
  saveRoutingPolicy, decideOptimalModel, fetchCostPressureRules, fetchSignalHistory, fetchAgentResponses,
  saveCostPressureRule, fetchScoringModels, fetchDecisionHistory, saveScoringModel, scoreAgentAction,
  fetchUtilityFunctions, fetchPlanHistory, generateAgentPlan, saveUtilityFunction,
  fetchWorkflowDefinitions, fetchROIPolicies, calculateWorkflowROI, saveROIPolicy,
  fetchThrottlingPolicies, fetchMASThrottlingStatus, fetchThrottlingAudit, saveThrottlingPolicy,
  fetchNegotiationSessions, fetchNegotiationHistory, fetchNegotiationAudit, fetchNegotiationProtocols, saveNegotiationProtocol,
  fetchLearningModels, fetchAdaptivePolicies, fetchExperimentResults, fetchOptimizationAudit, fetchLearningProgress, startExperiment,
  fetchMarginTargets, fetchMarginOptimizationPolicies, fetchStrategyAdjustments, fetchMarginPerformance,
  fetchPricingPolicies, fetchMarketSignals, fetchPricingRecommendations, fetchRevenueImpact,
  fetchAIServiceCatalog, fetchProviderEarnings, fetchMarketplaceTransactions, fetchMarketDynamics
} from './services/geminiService';

// --- Global Scroll to Top Utility ---

const useScrollToTop = (trigger: any) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [trigger]);
};

// --- Skeleton Loader Component ---

const ViewLoader: React.FC = () => (
  <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
    <div className="relative">
      <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-black animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-lg econyx-gradient animate-pulse shadow-lg" />
      </div>
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Initialising control plane...</p>
  </div>
);

// --- Notification UI Elements ---

const Toast: React.FC<{ notification: AppNotification; onDismiss: (id: string) => void }> = ({ notification, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(notification.id), 5000);
    return () => clearTimeout(timer);
  }, []);

  const icons = {
    info: <Info size={18} className="text-blue-500" />,
    success: <CheckCircle2 size={18} className="text-green-500" />,
    warning: <AlertTriangle size={18} className="text-orange-500" />,
    error: <AlertCircle size={18} className="text-red-500" />,
  };

  return (
    <div className="flex items-center space-x-4 p-5 bg-white rounded-2xl shadow-2xl border border-gray-100 animate-in slide-in-from-right-10 fade-in duration-300 w-[400px] pointer-events-auto">
      <div className="flex-shrink-0">{icons[notification.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-black text-gray-900 truncate">{notification.title}</p>
        <p className="text-xs text-gray-500 truncate">{notification.message}</p>
      </div>
      <button onClick={() => onDismiss(notification.id)} className="p-1 hover:bg-gray-50 rounded-lg text-gray-300 hover:text-black transition-colors">
        <X size={16} />
      </button>
    </div>
  );
};

const NotificationCenter: React.FC<{ 
  notifications: AppNotification[]; 
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
  onNavigate: (target: string) => void;
}> = ({ notifications, onClose, onMarkRead, onClearAll, onNavigate }) => {
  return (
    <div className="absolute right-0 top-16 w-[420px] bg-white rounded-[3rem] shadow-2xl border border-gray-100 z-[110] animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Economic Pulse</h3>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{notifications.filter(n => !n.read).length} Unchecked Signals</p>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={onClearAll} className="text-[9px] font-black text-blue-600 uppercase hover:text-blue-700 transition-colors">Purge Feed</button>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-gray-300 hover:text-black transition-colors"><X size={18} /></button>
        </div>
      </div>
      <div className="max-h-[550px] overflow-y-auto no-scrollbar">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {notifications.map((n) => (
              <div 
                key={n.id} 
                onClick={() => { onMarkRead(n.id); if (n.viewTarget) onNavigate(n.viewTarget); onClose(); }}
                className={`p-8 hover:bg-gray-50 transition-all cursor-pointer flex items-start space-x-5 group ${!n.read ? 'bg-blue-50/10' : 'opacity-60 hover:opacity-100'}`}
              >
                <div className={`mt-1.5 w-3 h-3 rounded-full flex-shrink-0 ${
                  n.type === 'error' ? 'bg-red-500' : 
                  n.type === 'warning' ? 'bg-orange-500' : 
                  n.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                } ${!n.read ? 'animate-pulse' : ''}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`text-md font-black tracking-tight ${!n.read ? 'text-gray-900' : 'text-gray-500'}`}>{n.title}</h4>
                    <span className="text-[9px] font-bold text-gray-300 uppercase whitespace-nowrap mt-1">{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 font-medium">{n.message}</p>
                  {n.viewTarget && (
                    <div className="mt-4 flex items-center space-x-2 text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">
                      <span>Examine Telemetry</span>
                      <ArrowUpRight size={10} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 px-10 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-[2rem] bg-gray-50 flex items-center justify-center mb-8 text-gray-200">
               <BellRing size={40} />
            </div>
            <h4 className="text-xl font-black text-gray-900 mb-2">Passive Horizon</h4>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">No autonomous triggers detected in current epoch.</p>
          </div>
        )}
      </div>
      <div className="p-8 border-t border-gray-50 bg-gray-50/30 text-center">
        <button 
          onClick={() => { onNavigate('governance'); onClose(); }}
          className="w-full py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:shadow-lg active:scale-95 transition-all"
        >
          View Full Audit Trail
        </button>
      </div>
    </div>
  );
};

// --- Shared Components ---

const MetricCard: React.FC<{ label: string; value: string; unit?: string; status: 'good' | 'warn' | 'bad' }> = ({ label, value, unit, status }) => (
  <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-default">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{label}</p>
    <div className="flex items-end space-x-1">
      <span className={`text-2xl font-black ${status === 'good' ? 'text-green-600' : status === 'warn' ? 'text-orange-500' : 'text-red-500'}`}>{value}</span>
      {unit && <span className="text-xs text-gray-400 font-bold mb-1">{unit}</span>}
    </div>
  </div>
);

const NavItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void;
  collapsed?: boolean;
}> = ({ icon, label, active, onClick, collapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all group active:scale-95 ${
      active 
        ? 'bg-black text-white shadow-xl shadow-black/10 scale-[1.02]' 
        : 'text-gray-400 hover:bg-gray-50 hover:text-black'
    }`}
  >
    <div className={`transition-transform duration-300 ${active ? 'text-white rotate-0' : 'text-gray-400 group-hover:text-black -rotate-6'}`}>{icon}</div>
    {!collapsed && <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>}
  </button>
);

// --- Notification context-aware hook ---
type NotifFn = (n: Partial<AppNotification>) => void;

// --- Governance Feed View (Full Page Notification Audit) ---

const GovernanceFeedView: React.FC<{ notifications: AppNotification[]; onMarkRead: (id: string) => void }> = ({ notifications, onMarkRead }) => {
  const [filter, setFilter] = useState<'all' | 'warning' | 'error' | 'success'>('all');
  useScrollToTop(true);

  const filtered = notifications.filter(n => filter === 'all' || n.type === filter);

  return (
    <div className="animate-in fade-in duration-700 pb-32">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
             <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 leading-tight">Governance Feed</h2>
             <p className="text-gray-500 text-lg font-medium">Historical audit of autonomous system events and economic signals.</p>
          </div>
          <div className="flex bg-gray-50 p-2 rounded-[2rem] border border-gray-100 shadow-sm">
             {(['all', 'warning', 'error', 'success'] as const).map(f => (
                <button 
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`px-8 py-3 rounded-[1.5rem] text-[9px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-black shadow-md scale-105' : 'text-gray-400 hover:text-black'}`}
                >
                   {f}
                </button>
             ))}
          </div>
       </div>

       <div className="space-y-4">
          {filtered.length > 0 ? filtered.map((n, i) => (
             <div key={n.id} className="p-10 bg-white border border-gray-100 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all group flex items-center justify-between animate-in slide-in-from-left-6" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-center space-x-10">
                   <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all group-hover:rotate-12 ${
                      n.type === 'error' ? 'bg-red-50 text-red-500' : 
                      n.type === 'warning' ? 'bg-orange-50 text-orange-500' : 
                      n.type === 'success' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'
                   }`}>
                      {n.type === 'error' ? <ShieldAlert size={36} /> : n.type === 'warning' ? <Signal size={36} /> : n.type === 'success' ? <CheckCircle2 size={36} /> : <Info size={36} />}
                   </div>
                   <div>
                      <div className="flex items-center space-x-4 mb-2">
                         <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">{new Date(n.timestamp).toLocaleString()}</span>
                         {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />}
                      </div>
                      <h4 className="text-2xl font-black text-gray-900 group-hover:econyx-gradient-text transition-all tracking-tight">{n.title}</h4>
                      <p className="text-lg text-gray-500 font-medium leading-relaxed mt-2 max-w-2xl">{n.message}</p>
                   </div>
                </div>
                <div className="flex flex-col items-end">
                   <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border mb-4 ${
                       n.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 
                       n.type === 'warning' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                       n.type === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                   }`}>{n.type}</div>
                   {!n.read && (
                      <button onClick={() => onMarkRead(n.id)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Mark as resolved</button>
                   )}
                </div>
             </div>
          )) : (
             <div className="p-32 bg-gray-50/50 rounded-[4rem] text-center border-4 border-dashed border-gray-100">
                <Search size={64} className="text-gray-200 mx-auto mb-10" />
                <h4 className="text-3xl font-black text-gray-300">No matching events</h4>
                <p className="text-gray-400 font-bold uppercase text-[11px] tracking-[0.3em] mt-4">Broaden your filters or system scope.</p>
             </div>
          )}
       </div>
    </div>
  );
};

// --- Cost Pressure Signals View ---

const CostPressureSignalsView: React.FC<{ onNotify: NotifFn }> = ({ onNotify }) => {
  const [signals, setSignals] = useState<CostPressureSignal[]>([]);
  const [selectedSignal, setSelectedSignal] = useState<CostPressureSignal | null>(null);
  const [responseLogs, setResponseLogs] = useState<AgentResponseLog[]>([]);
  const [rules, setRules] = useState<CostPressureRule[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSignal, setEditingSignal] = useState<Partial<CostPressureSignal>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    const load = async () => {
      const [s, r, a] = await Promise.all([
        fetchSignalHistory(),
        fetchCostPressureRules(),
        fetchAgentResponses()
      ]);
      setSignals(s);
      setRules(r);
      setResponseLogs(a);
      setLoading(false);
    };
    load();

    const unsubscribe = subscribeToGovernanceStream((event) => {
      if (event.type === 'COST_PRESSURE_SIGNAL') {
        const payload = event.payload as CostPressureSignal;
        setSignals(prev => [payload, ...prev].slice(0, 20));
      }
    });
    return () => unsubscribe();
  }, []);

  useScrollToTop(selectedSignal);

  const handleCreate = () => {
    setEditingSignal({
      id: `cps_${Date.now()}`,
      rule_id: rules[0]?.id || 'manual',
      rule_name: '',
      severity: 'medium',
      message: '',
      timestamp: new Date().toISOString(),
      affected_mas_id: 'mas_global',
      current_value: 0
    });
    setIsEditorOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, signal: CostPressureSignal) => {
    e.stopPropagation();
    setEditingSignal(signal);
    setIsEditorOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 800));
    if (signals.find(s => s.id === editingSignal.id)) {
      setSignals(prev => prev.map(s => s.id === editingSignal.id ? (editingSignal as CostPressureSignal) : s));
      onNotify({ type: 'success', title: 'Signal Updated', message: `Telemetry parameters for ${editingSignal.rule_name} modified.` });
    } else {
      setSignals(prev => [editingSignal as CostPressureSignal, ...prev]);
      onNotify({ type: 'warning', title: 'New Signal Injected', message: `Economic variance detected: ${editingSignal.rule_name}.` });
    }
    setIsSaving(false);
    setIsEditorOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const sig = signals.find(s => s.id === id);
    setSignals(prev => prev.filter(s => s.id !== id));
    onNotify({ type: 'info', title: 'Signal Purged', message: `Registry entry ${sig?.rule_name} removed.` });
    if (selectedSignal?.id === id) setSelectedSignal(null);
  };

  if (loading) return <ViewLoader />;

  if (selectedSignal) {
    const activeResponses = responseLogs.filter(r => r.signal_id === selectedSignal.id);
    return (
      <div className="animate-in slide-in-from-right duration-500 pb-20">
        <button 
          onClick={() => setSelectedSignal(null)} 
          className="flex items-center space-x-2 text-gray-400 hover:text-black mb-10 transition-all group active:scale-95"
        >
          <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Analysis Hub</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <div className={`rounded-[3.5rem] p-16 text-white relative overflow-hidden shadow-2xl border-4 ${
              selectedSignal.severity === 'critical' ? 'bg-red-600 border-red-500' : 
              selectedSignal.severity === 'high' ? 'bg-orange-600 border-orange-500' : 'bg-gray-900 border-gray-800'
            }`}>
              <div className="absolute top-0 right-0 p-12 opacity-10 animate-pulse"><Radio size={240} /></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-[10px] font-black bg-white/20 text-white px-4 py-1.5 rounded-full uppercase border border-white/30 backdrop-blur-sm">System Signal</span>
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{selectedSignal.id}</span>
                </div>
                <h2 className="text-5xl font-black tracking-tighter mb-6 leading-[1.1]">{selectedSignal.rule_name}</h2>
                <p className="text-white/80 text-2xl font-medium max-w-3xl leading-relaxed">{selectedSignal.message}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10">
                   <div>
                      <p className="text-[10px] font-black text-white/40 uppercase mb-2 tracking-widest">Scope</p>
                      <p className="text-xl font-bold">{selectedSignal.affected_mas_id}</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-white/40 uppercase mb-2 tracking-widest">Variance</p>
                      <p className="text-xl font-bold">{selectedSignal.current_value.toFixed(2)}%</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-white/40 uppercase mb-2 tracking-widest">Detected</p>
                      <p className="text-xl font-bold">{new Date(selectedSignal.timestamp).toLocaleTimeString()}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-white/40 uppercase mb-2 tracking-widest">Severity</p>
                      <p className="text-xl font-black uppercase tracking-tighter">{selectedSignal.severity}</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center px-4">
                <h3 className="text-2xl font-black tracking-tight text-gray-900">Agentic Mitigations</h3>
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  <Activity size={14} className="text-green-500" />
                  <span>Real-time Response Stream</span>
                </div>
              </div>

              {activeResponses.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {activeResponses.map((res, i) => (
                    <div 
                      key={res.id} 
                      className="p-10 bg-white border border-gray-100 rounded-[3rem] shadow-sm flex items-center justify-between hover:shadow-2xl hover:border-blue-200 transition-all group animate-in slide-in-from-bottom-4 duration-500"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="flex items-center space-x-8">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all group-hover:rotate-12">
                          <Cpu size={32} />
                        </div>
                        <div>
                          <p className="text-xl font-black text-gray-900">{res.agent_id}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-[10px] text-blue-600 font-black uppercase tracking-[0.1em] px-2 py-0.5 bg-blue-50 rounded-md">{res.action_taken.replace(/_/g, ' ')}</span>
                            <span className="text-[10px] text-gray-300 font-bold uppercase">{new Date(res.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                           <TrendingDown size={18} className="text-green-600" />
                           <p className="text-2xl font-black text-green-600 tracking-tighter">${Math.abs(res.impact_delta).toFixed(2)}</p>
                        </div>
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">Cost Avoidance achieved</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-32 bg-gray-50 border-4 border-dashed border-gray-100 rounded-[4rem] text-center flex flex-col items-center justify-center group hover:border-gray-200 transition-all">
                   <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center mb-8 text-gray-300 group-hover:text-blue-500 transition-colors">
                      <ShieldOff size={48} strokeWidth={1.5} />
                   </div>
                   <h4 className="text-xl font-black text-gray-900 mb-2">Passive Observation Mode</h4>
                   <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] max-w-sm leading-relaxed">No autonomous mitigation scripts matched the current signal signature.</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <div className="bg-white border border-gray-100 rounded-[3.5rem] p-12 shadow-sm sticky top-28">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-12">Economic Exposure</h3>
                <div className="space-y-12">
                   <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Severity Classification</p>
                      <div className="flex items-center space-x-4">
                         <div className={`w-5 h-5 rounded-full animate-pulse ${selectedSignal.severity === 'critical' ? 'bg-red-500 shadow-lg shadow-red-500/30' : 'bg-orange-500 shadow-lg shadow-orange-500/30'}`} />
                         <span className="text-2xl font-black uppercase tracking-tighter text-gray-900">{selectedSignal.severity}</span>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div className="flex justify-between items-center"><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Infrastructure Stability</span><span className="text-lg font-black text-gray-900">84%</span></div>
                      <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-red-500 transition-all duration-1000" style={{width: '84%'}} /></div>
                   </div>
                   <div className="space-y-6">
                      <div className="flex justify-between items-center"><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Yield Risk Exposure</span><span className="text-lg font-black text-gray-900">12.4%</span></div>
                      <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-orange-500 transition-all duration-1000" style={{width: '60%'}} /></div>
                   </div>
                </div>

                <div className="mt-16 space-y-3">
                   <button 
                     onClick={(e) => handleEdit(e, selectedSignal)} 
                     className="w-full py-5 bg-black text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-3"
                   >
                     <Settings size={18} />
                     <span>Refine Logic</span>
                   </button>
                   <button 
                     onClick={(e) => handleDelete(e, selectedSignal.id)} 
                     className="w-full py-5 bg-red-50 text-red-600 border border-red-100 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center space-x-3 active:scale-95"
                   >
                     <Trash2 size={18} />
                     <span>Purge Signal</span>
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 pb-20">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
             <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 leading-tight">Signal Registry</h2>
             <p className="text-gray-500 text-lg font-medium max-w-xl leading-relaxed">Active economic control plane monitors and variance alerts.</p>
          </div>
          <button 
            onClick={handleCreate}
            className="bg-black text-white px-10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center space-x-3 shadow-2xl hover:scale-105 active:scale-95 transition-all group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Inject Telemetry</span>
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signals.map((s, idx) => (
            <div 
              key={s.id} 
              onClick={() => setSelectedSignal(s)}
              className="bg-white border border-gray-100 rounded-[3.5rem] p-12 shadow-sm hover:border-red-300 hover:shadow-2xl transition-all group flex flex-col justify-between cursor-pointer animate-in fade-in slide-in-from-bottom-6"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
               <div>
                  <div className="flex justify-between items-start mb-10">
                     <div className={`p-4 rounded-[1.5rem] group-hover:rotate-12 transition-all ${
                        s.severity === 'critical' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'
                     }`}><Signal size={32} /></div>
                     <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase border shadow-sm ${
                        s.severity === 'critical' ? 'bg-red-50 text-red-600 border-red-100' : 
                        s.severity === 'high' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                     }`}>{s.severity}</span>
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:econyx-gradient-text transition-all">{s.rule_name}</h4>
                  <p className="text-gray-500 leading-relaxed mb-10 h-14 overflow-hidden line-clamp-2 text-sm font-medium">{s.message}</p>
                  <div className="flex items-center space-x-3 mb-12">
                     <div className="w-2 h-2 rounded-full bg-gray-200" />
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{s.affected_mas_id}</span>
                  </div>
               </div>

               <div className="pt-10 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-[8px] font-black text-gray-300 uppercase mb-1 tracking-widest">Telemetry Stamp</span>
                     <span className="text-xs font-bold text-gray-900">{new Date(s.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                     <button onClick={(e) => handleEdit(e, s)} className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:text-black hover:bg-white transition-all shadow-sm active:scale-90"><Edit3 size={18} /></button>
                     <button onClick={(e) => handleDelete(e, s.id)} className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-90"><Trash2 size={18} /></button>
                  </div>
               </div>
            </div>
          ))}
       </div>

       {/* Signal Editor Modal */}
       {isEditorOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => !isSaving && setIsEditorOpen(false)} />
             <div className="bg-white rounded-[4rem] w-full max-w-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border border-gray-100">
                <div className="p-16">
                   <div className="flex justify-between items-start mb-12">
                      <div>
                         <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{editingSignal.id ? 'Modify Signal' : 'Inject Telemetry'}</h3>
                         <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mt-3">Autonomous Control Interface</p>
                      </div>
                      <button onClick={() => setIsEditorOpen(false)} className="p-4 hover:bg-gray-100 rounded-3xl transition-all active:scale-90"><X size={28} /></button>
                   </div>

                   <div className="space-y-10">
                      <div>
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Primary Signal Label</label>
                         <input 
                           type="text" 
                           value={editingSignal.rule_name}
                           onChange={(e) => setEditingSignal({...editingSignal, rule_name: e.target.value})}
                           placeholder="e.g. Critical Latency Threshold"
                           className="w-full px-8 py-6 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-black outline-none transition-all font-bold text-lg placeholder:text-gray-300"
                         />
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                         <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Priority Tier</label>
                            <select 
                               value={editingSignal.severity}
                               onChange={(e) => setEditingSignal({...editingSignal, severity: e.target.value as any})}
                               className="w-full px-8 py-6 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-black outline-none transition-all font-black text-xs uppercase tracking-widest appearance-none"
                            >
                               <option value="low">Low Priority</option>
                               <option value="medium">Medium Priority</option>
                               <option value="high">High Alert</option>
                               <option value="critical">Critical Fault</option>
                            </select>
                         </div>
                         <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Target Namespace</label>
                            <input 
                              type="text" 
                              value={editingSignal.affected_mas_id}
                              onChange={(e) => setEditingSignal({...editingSignal, affected_mas_id: e.target.value})}
                              placeholder="e.g. mas_core_cluster"
                              className="w-full px-8 py-6 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-black outline-none transition-all font-bold text-xs uppercase tracking-widest"
                            />
                         </div>
                      </div>

                      <div>
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Telemetry Detail</label>
                         <textarea 
                           value={editingSignal.message}
                           onChange={(e) => setEditingSignal({...editingSignal, message: e.target.value})}
                           placeholder="Detailed diagnostic report for MAS autonomous logic..."
                           className="w-full h-32 px-8 py-6 bg-gray-50 border border-gray-100 rounded-[2.5rem] focus:ring-2 focus:ring-black outline-none transition-all font-bold text-sm resize-none placeholder:text-gray-300 leading-relaxed"
                         />
                      </div>
                   </div>

                   <div className="mt-16 flex space-x-6">
                      <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 py-6 bg-black text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-4"
                      >
                        {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                        <span>{editingSignal.id && signals.some(s => s.id === editingSignal.id) ? 'Update Registry' : 'Forge Signal'}</span>
                      </button>
                      <button 
                        onClick={() => setIsEditorOpen(false)}
                        className="px-12 py-6 bg-gray-50 text-gray-400 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-100 transition-all active:scale-95"
                      >
                        Abort
                      </button>
                   </div>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};

// --- Strategic Planning Workbench ---

const PlanningWorkbench: React.FC<{ onNotify: NotifFn }> = ({ onNotify }) => {
  const [plans, setPlans] = useState<AgentPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<AgentPlan | null>(null);
  const [utilities, setUtilities] = useState<EconomicUtilityFunction[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<{ id?: string; goal: string; utility_model_id: string }>({ goal: '', utility_model_id: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => { 
    setLoading(true);
    const load = async () => {
      const [p, u] = await Promise.all([fetchPlanHistory(), fetchUtilityFunctions()]);
      setPlans(p);
      setUtilities(u);
      setEditingPlan(prev => ({ ...prev, utility_model_id: u[0]?.id || '' }));
      setLoading(false);
    };
    load();
  }, []);

  useScrollToTop(selectedPlan);

  const handleCreate = () => {
    setEditingPlan({ goal: '', utility_model_id: utilities[0]?.id || '' });
    setIsEditorOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, plan: AgentPlan) => {
    e.stopPropagation();
    setEditingPlan({ id: plan.id, goal: plan.goal, utility_model_id: plan.utility_model_id });
    setIsEditorOpen(true);
  };

  const handleSave = async () => {
    setIsGenerating(true);
    if (editingPlan.id) {
      const existing = plans.find(p => p.id === editingPlan.id);
      if (existing) {
         const updated = { ...existing, goal: editingPlan.goal, utility_model_id: editingPlan.utility_model_id };
         setPlans(prev => prev.map(p => p.id === editingPlan.id ? updated : p));
         onNotify({ type: 'success', title: 'Strategy Optimized', message: 'The economic path for your goal has been recalculated.' });
      }
      setIsGenerating(false);
      setIsEditorOpen(false);
    } else {
      const newPlan = await generateAgentPlan(editingPlan.goal, editingPlan.utility_model_id);
      setPlans(prev => [newPlan, ...prev]);
      onNotify({ type: 'success', title: 'Strategy Manifested', message: `Autonomous path created for: ${editingPlan.goal.slice(0, 30)}...` });
      setIsGenerating(false);
      setIsEditorOpen(false);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setPlans(prev => prev.filter(p => p.id !== id));
    onNotify({ type: 'info', title: 'Strategy Terminated', message: 'Goal removed from strategic registry.' });
    if (selectedPlan?.id === id) setSelectedPlan(null);
  };

  if (loading) return <ViewLoader />;

  if (selectedPlan) {
    return (
      <div className="animate-in slide-in-from-right duration-500 pb-20">
         <button onClick={() => setSelectedPlan(null)} className="flex items-center space-x-2 text-gray-400 hover:text-black mb-10 transition-all group active:scale-95">
            <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Strategy Catalog</span>
         </button>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
               <div className="bg-gray-900 rounded-[3.5rem] p-16 text-white relative overflow-hidden shadow-2xl border-4 border-gray-800">
                  <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><Rocket size={200} /></div>
                  <div className="relative z-10">
                     <div className="flex items-center space-x-4 mb-8">
                        <span className="text-[10px] font-black bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full uppercase border border-blue-500/30 backdrop-blur-sm">Active Economic Plan</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{selectedPlan.id}</span>
                     </div>
                     <h2 className="text-5xl font-black tracking-tight mb-6 leading-tight">{selectedPlan.goal}</h2>
                     <div className="flex items-center space-x-6">
                       <div className="flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                          <Terminal size={14} className="text-gray-500" />
                          <p className="text-white/60 font-bold uppercase text-[9px] tracking-widest">{utilities.find(u => u.id === selectedPlan.utility_model_id)?.name}</p>
                       </div>
                       <span className="text-white/30 text-xs font-bold uppercase">{new Date(selectedPlan.timestamp).toLocaleDateString()}</span>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-2xl font-black px-4 tracking-tight">Execution Graph Nodes</h3>
                  <div className="space-y-6">
                     {selectedPlan.steps.map((step, idx) => (
                        <div key={step.id} className="p-12 bg-white border border-gray-100 rounded-[3.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group flex items-start space-x-10 animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                           <div className="flex flex-col items-center space-y-4">
                              <div className="w-14 h-14 rounded-[2rem] bg-gray-50 text-gray-400 group-hover:bg-black group-hover:text-white flex items-center justify-center font-black text-xl shadow-inner transition-all duration-300">
                                {idx + 1}
                              </div>
                              <div className="w-0.5 h-full bg-gray-50 group-last:hidden" />
                           </div>
                           <div className="flex-1 pt-2">
                              <div className="flex justify-between items-start mb-6">
                                 <div>
                                    <h4 className="text-2xl font-black text-gray-900 group-hover:econyx-gradient-text transition-all">{step.action_name}</h4>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Relative Utility Density: <span className="text-purple-600">{step.utility_score}</span></p>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-2xl font-black text-gray-900 tracking-tighter">${step.estimated_cost.toFixed(3)}</p>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-1">Marginal Cost</p>
                                 </div>
                              </div>
                              <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100/50 mb-8 italic text-gray-600 leading-relaxed text-lg">
                                "{step.rationale}"
                              </div>
                              <div className="flex items-center space-x-10 pt-4 border-t border-gray-50">
                                 <div className="flex items-center space-x-3"><TrendingUp size={18} className="text-green-500" /><span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Value Delta: {step.estimated_value}</span></div>
                                 <div className="flex items-center space-x-3"><ShieldAlert size={18} className="text-orange-500" /><span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Entropy Factor: {step.risk_factor}</span></div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
               <div className="bg-white border border-gray-100 rounded-[3.5rem] p-12 shadow-sm sticky top-28">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-12">Aggregate Economics</h3>
                  <div className="space-y-12">
                     <div className="grid grid-cols-1 gap-10">
                        <div className="group">
                           <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest group-hover:text-purple-600 transition-colors">Cumulative Commitment</p>
                           <p className="text-5xl font-black text-purple-600 tracking-tighter">${selectedPlan.total_estimated_cost.toFixed(2)}</p>
                        </div>
                        <div className="group">
                           <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest group-hover:text-blue-600 transition-colors">Projected Realised Value</p>
                           <p className="text-5xl font-black text-blue-600 tracking-tighter">${selectedPlan.total_estimated_value.toFixed(2)}</p>
                        </div>
                     </div>
                     <div className="pt-12 border-t border-gray-50">
                        <div className="flex justify-between items-center mb-6">
                           <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Utility Score</p>
                           <span className="text-2xl font-black text-green-600 tracking-tighter">{selectedPlan.overall_utility_score}/100</span>
                        </div>
                        <div className="h-3 bg-gray-50 rounded-full overflow-hidden shadow-inner p-0.5">
                           <div className="h-full bg-green-500 rounded-full transition-all duration-1000" style={{width: `${selectedPlan.overall_utility_score}%`}} />
                        </div>
                     </div>
                  </div>

                  <div className="mt-20 space-y-4">
                     <button onClick={(e) => handleEdit(e, selectedPlan)} className="w-full py-6 bg-white border border-gray-100 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-black hover:border-black transition-all shadow-sm flex items-center justify-center space-x-4 active:scale-95"><Edit3 size={20} /><span>Re-tune Plan</span></button>
                     <button onClick={(e) => handleDelete(e, selectedPlan.id)} className="w-full py-6 bg-red-50 text-red-500 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center justify-center space-x-4 active:scale-95"><Trash2 size={20} /><span>Terminate Goal</span></button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
             <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 leading-tight">Strategic Planning</h2>
             <p className="text-gray-500 text-lg font-medium max-w-xl">Map enterprise goals to autonomous multi-step economic graphs.</p>
          </div>
          <button 
            onClick={handleCreate}
            className="bg-black text-white px-10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center space-x-3 shadow-2xl hover:scale-105 active:scale-95 transition-all group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Forge New Plan</span>
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {plans.map((p, idx) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedPlan(p)}
              className="bg-white border border-gray-100 rounded-[3.5rem] p-12 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all group flex flex-col justify-between cursor-pointer animate-in fade-in slide-in-from-bottom-6"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
               <div>
                  <div className="flex justify-between items-start mb-10">
                     <div className="p-4 bg-gray-50 rounded-[1.5rem] text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all group-hover:rotate-12 group-hover:scale-110 shadow-sm"><Rocket size={32} /></div>
                     <div className="text-right">
                        <p className="text-[9px] font-black text-gray-300 uppercase mb-1 tracking-widest group-hover:text-purple-600 transition-colors">Utility</p>
                        <p className="text-2xl font-black text-purple-600 tracking-tighter">{p.overall_utility_score}</p>
                     </div>
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 mb-6 leading-tight h-16 overflow-hidden line-clamp-2 group-hover:econyx-gradient-text transition-all">{p.goal}</h4>
                  <div className="grid grid-cols-2 gap-6 pt-10 border-t border-gray-50 mb-12">
                     <div>
                        <p className="text-[9px] font-black text-gray-300 uppercase mb-2 tracking-widest">Commitment</p>
                        <p className="text-xl font-black text-gray-900 tracking-tighter group-hover:text-purple-600 transition-colors">${p.total_estimated_cost.toFixed(2)}</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-300 uppercase mb-2 tracking-widest">Yield</p>
                        <p className="text-xl font-black text-blue-600 tracking-tighter group-hover:text-blue-700 transition-colors">${p.total_estimated_value.toFixed(2)}</p>
                     </div>
                  </div>
               </div>

               <div className="flex items-center space-x-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedPlan(p); }}
                    className="flex-1 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    Examine Graph
                  </button>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                     <button onClick={(e) => handleEdit(e, p)} className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:text-black hover:bg-white transition-all shadow-sm active:scale-90"><Edit3 size={18} /></button>
                     <button onClick={(e) => handleDelete(e, p.id)} className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-90"><Trash2 size={18} /></button>
                  </div>
               </div>
            </div>
          ))}
       </div>

       {/* Editor Modal */}
       {isEditorOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => !isGenerating && setIsEditorOpen(false)} />
             <div className="bg-white rounded-[4rem] w-full max-w-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border border-gray-100">
                {isGenerating ? (
                   <div className="p-32 text-center space-y-12 flex flex-col items-center">
                      <div className="w-24 h-24 rounded-[2.5rem] bg-blue-50 text-blue-600 flex items-center justify-center animate-spin shadow-inner">
                         <RefreshCw size={48} />
                      </div>
                      <div>
                         <h3 className="text-3xl font-black text-gray-900 tracking-tight">Simulating Utility Graphs</h3>
                         <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-4 max-w-xs mx-auto leading-loose animate-pulse">Mapping goal to most efficient autonomous technical steps...</p>
                      </div>
                   </div>
                ) : (
                   <div className="p-16">
                      <div className="flex justify-between items-start mb-12">
                         <div>
                            <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{editingPlan.id ? 'Refine Logic' : 'Compose Strategy'}</h3>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mt-3">Strategic Planning Engine</p>
                         </div>
                         <button onClick={() => setIsEditorOpen(false)} className="p-4 hover:bg-gray-100 rounded-3xl transition-all active:scale-90"><X size={28} /></button>
                   </div>

                   <div className="space-y-12">
                      <div>
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Target Objective</label>
                         <textarea 
                           value={editingPlan.goal}
                           onChange={(e) => setEditingPlan({...editingPlan, goal: e.target.value})}
                           placeholder="Describe enterprise goal (e.g. Audit legacy code for security holes, Forecast market trends...)"
                           className="w-full h-40 px-8 py-6 bg-gray-50 border border-gray-100 rounded-[2.5rem] focus:ring-2 focus:ring-black outline-none transition-all font-bold text-lg resize-none placeholder:text-gray-300 leading-relaxed"
                         />
                      </div>

                      <div>
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Utility Preference Model</label>
                         <div className="grid grid-cols-1 gap-4">
                            {utilities.map(u => (
                               <button
                                 key={u.id}
                                 onClick={() => setEditingPlan({...editingPlan, utility_model_id: u.id})}
                                 className={`p-8 rounded-[2.5rem] border-2 transition-all text-left flex justify-between items-center group active:scale-[0.98] ${editingPlan.utility_model_id === u.id ? 'bg-black border-black text-white shadow-2xl' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}
                               >
                                  <div>
                                     <h4 className="text-lg font-black tracking-tight">{u.name}</h4>
                                     <div className="flex items-center space-x-4 mt-2">
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${editingPlan.utility_model_id === u.id ? 'text-white/50' : 'text-gray-300'}`}>Cost: {u.cost_weight}</span>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${editingPlan.utility_model_id === u.id ? 'text-white/50' : 'text-gray-300'}`}>Yield: {u.value_weight}</span>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${editingPlan.utility_model_id === u.id ? 'text-white/50' : 'text-gray-300'}`}>Risk: {u.risk_weight}</span>
                                     </div>
                                  </div>
                                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${editingPlan.utility_model_id === u.id ? 'bg-white border-white text-black scale-110' : 'bg-gray-50 border-gray-100 text-transparent'}`}>
                                    <Check size={18} strokeWidth={3} />
                                  </div>
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="mt-16 flex space-x-6">
                      <button 
                        onClick={handleSave}
                        className="flex-1 py-7 bg-black text-white rounded-[3rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-4"
                      >
                        <Zap size={20} />
                        <span>{editingPlan.id ? 'Refactor Strategy' : 'Manifest Plan'}</span>
                      </button>
                      <button 
                        onClick={() => setIsEditorOpen(false)}
                        className="px-12 py-7 bg-gray-50 text-gray-400 rounded-[3rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-100 transition-all active:scale-95"
                      >
                        Discard
                      </button>
                   </div>
                </div>
             )}
          </div>
       </div>
    )}
 </div>
);
};

// --- Application Entry Point ---

const App: React.FC = () => {
  const [isDashboardActive, setIsDashboardActive] = useState(false);
  const [view, setView] = useState<string>('home');
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [toasts, setToasts] = useState<AppNotification[]>([]);
  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);
  const notifPanelRef = useRef<HTMLDivElement>(null);

  const [policies, setPolicies] = useState<SecurityPolicy[]>([]);
  const [forecastData, setForecastData] = useState<ForecastPoint[]>([]);
  const [scenario, setScenario] = useState<ForecastScenario>({ 
    id: 'sim_1', name: 'Optimized', tokenInflation: 2, volumeGrowth: 15, 
    agentActivityLevel: 25, reasoningDepth: 40, optimizedRouting: true, 
    modelType: 'Prophet', horizonDays: 30 
  });

  // Global Scroll to Top on View Change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  // Click outside listener for notification panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifPanelRef.current && !notifPanelRef.current.contains(event.target as Node)) {
        setIsNotifPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (view === 'forecast') handleRunForecast();
    if (view === 'architecture') fetchActiveSecurityPolicies().then(setPolicies);
  }, [view]);

  // Unified Notification Trigger
  const addNotification = (n: Partial<AppNotification>) => {
    const notif: AppNotification = {
      id: `notif_${Date.now()}_${Math.random()}`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'info',
      title: 'Update',
      message: '',
      ...n
    };
    setNotifications(prev => [notif, ...prev].slice(0, 50));
    setToasts(prev => [notif, ...prev].slice(0, 3));
  };

  const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  // Handle governance stream for real-time notifications
  useEffect(() => {
    const unsubscribe = subscribeToGovernanceStream((event) => {
      let notif: Partial<AppNotification> | null = null;

      switch (event.type) {
        case 'COST_PRESSURE_SIGNAL':
          const payload = event.payload as CostPressureSignal;
          notif = { type: 'warning', title: 'Pressure Spike', message: payload.message, viewTarget: 'signals' };
          break;
        case 'GUARDRAIL_VIOLATION':
          const v = event.payload as PolicyViolationLog;
          notif = { type: 'error', title: 'Policy Violation', message: `${v.policy_name} triggered by ${v.agent_id}. Leakage prevented.`, viewTarget: 'guardrails' };
          break;
        case 'MARKET_UPDATE':
          const tx = event.payload as MarketplaceTransaction;
          notif = { type: 'info', title: 'Market Activity', message: `New protocol transaction for ${tx.service_name} completed.`, viewTarget: 'marketplace' };
          break;
        case 'STRATEGY_ADJUSTMENT':
          const adj = event.payload as StrategyAdjustment;
          notif = { type: 'success', title: 'Strategy Applied', message: `Yield tuning: ${adj.strategy_name} applied to ${adj.affected_mas}.`, viewTarget: 'margin' };
          break;
      }

      if (notif) addNotification(notif);
    });
    return () => unsubscribe();
  }, []);

  const handleRunForecast = async () => {
    const data = await runForecastSimulation(scenario);
    setForecastData(data);
    addNotification({ type: 'success', title: 'Forecast Synthesised', message: 'Spend trajectory matrix updated with current activity parameters.' });
  };

  const enterDashboard = (targetView: string = 'performance') => {
    setIsDashboardActive(true);
    setView(targetView);
  };

  const exitDashboard = () => {
    setIsDashboardActive(false);
    setView('home');
  };

  const markNotifRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
    addNotification({ type: 'info', title: 'Feed Purged', message: 'Audit trail cleared for current session.' });
  };

  if (!isDashboardActive) {
    return (
      <div className="min-h-screen bg-white">
        <nav className="fixed top-0 w-full z-[100] glass-panel border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer group active:scale-95 transition-all" onClick={exitDashboard}>
              <div className="w-12 h-12 rounded-[1rem] econyx-gradient flex items-center justify-center text-white font-black shadow-2xl shadow-purple-500/30 text-xl group-hover:rotate-12 transition-transform">E</div>
              <span className="text-3xl font-black tracking-tighter text-gray-900">econyx</span>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => enterDashboard('performance')}
                className="bg-black text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 flex items-center space-x-4"
              >
                <span>Launch Control Plane</span>
                <LayoutDashboard size={18} />
              </button>
            </div>
          </div>
        </nav>

        <main className="pt-52 pb-32">
          <div className="max-w-7xl mx-auto px-10 text-center mb-40">
             <div className="inline-flex items-center space-x-3 bg-purple-50 text-purple-600 rounded-full px-6 py-2.5 mb-12 border border-purple-100 shadow-sm animate-in zoom-in-50 duration-700">
                <ShieldCheck size={16} className="animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Enterprise Economic Engine v7.4</span>
             </div>
             <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter text-gray-900 mb-12 leading-[0.85] animate-in slide-in-from-bottom-10 duration-700">
                Economics for the <br />
                <span className="econyx-gradient-text">Autonomous Age.</span>
             </h1>
             <p className="max-w-3xl mx-auto text-gray-500 text-2xl mb-16 font-medium leading-relaxed animate-in fade-in duration-1000 delay-300">
                Econyx makes cost, margin, and business value first-class inputs to every agent decision. Design and deploy commercially viable Multi-Agent Systems.
             </p>
             <div className="flex items-center justify-center space-x-8 mt-20 animate-in fade-in duration-1000 delay-500">
                <button onClick={() => enterDashboard('workflows')} className="bg-black text-white px-12 py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] flex items-center space-x-4 shadow-2xl transition-all hover:scale-110 active:scale-95"><span>Get Started</span><ArrowRight size={22} /></button>
                <button onClick={() => enterDashboard('performance')} className="bg-white text-black border-2 border-gray-100 px-12 py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-50 transition-all hover:border-black active:scale-95">Live Telemetry</button>
             </div>
          </div>

          <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <TrendingUpIcon className="text-blue-500" />, title: "MAS Unit Economics", desc: "Track cost per step, workflow, and outcome with surgical precision." },
              { icon: <Brain className="text-purple-500" />, title: "Cost-Aware Planning", desc: "Agents dynamically optimize for value-to-cost ratios in real-time." },
              { icon: <Activity className="text-orange-500" />, title: "Self-Throttling", desc: "Systems automatically preserve margin during compute price spikes." }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="p-16 bg-gray-50 rounded-[4rem] border-2 border-transparent hover:border-gray-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all group animate-in fade-in slide-in-from-bottom-10 duration-700"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center mb-10 shadow-xl border border-gray-100 group-hover:rotate-12 transition-transform duration-500 text-2xl">{feature.icon}</div>
                <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tight group-hover:econyx-gradient-text transition-all">{feature.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </main>

        <footer className="border-t border-gray-100 py-32 text-center bg-gray-50/30">
          <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center text-gray-400">
             <div className="flex items-center space-x-3 mb-10 md:mb-0">
               <div className="w-10 h-10 rounded-[1rem] bg-black flex items-center justify-center text-white font-black text-lg">E</div>
               <span className="font-black text-gray-900 tracking-tighter text-2xl uppercase">ECONYX</span>
             </div>
             <p className="text-[11px] font-black uppercase tracking-[0.4em] max-w-sm">The financial operating system for autonomous digital labour</p>
             <div className="mt-10 md:mt-0 text-[10px] font-bold text-gray-300 uppercase tracking-tighter">v7.14.0-COGNITIVE-CONTROL</div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex overflow-hidden font-sans relative">
      {/* Toast Portal */}
      <div className="fixed top-28 right-12 z-[200] flex flex-col items-end space-y-4 pointer-events-none">
        {toasts.map(t => <Toast key={t.id} notification={t} onDismiss={removeToast} />)}
      </div>

      <aside className="w-80 border-r border-gray-100 flex flex-col bg-white z-[100] shadow-2xl shadow-gray-200/50">
        <div className="h-24 flex items-center px-10 border-b border-gray-100">
          <div className="flex items-center space-x-3 cursor-pointer group active:scale-95 transition-all" onClick={exitDashboard}>
            <div className="w-10 h-10 rounded-[0.8rem] econyx-gradient flex items-center justify-center text-white font-black shadow-lg">E</div>
            <span className="text-2xl font-black tracking-tighter text-gray-900">econyx</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-12 px-6 space-y-4 no-scrollbar">
          <div>
            <p className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mb-6">Capital Economics</p>
            <div className="space-y-2">
              <NavItem icon={<WorkflowIcon size={20} />} label="Workflow ROI" active={view === 'workflows'} onClick={() => setView('workflows')} />
              <NavItem icon={<Coins size={20} />} label="Margin Loops" active={view === 'margin'} onClick={() => setView('margin')} />
              <NavItem icon={<Tag size={20} />} label="Pricing Engine" active={view === 'pricing'} onClick={() => setView('pricing')} />
              <NavItem icon={<Store size={20} />} label="Marketplace" active={view === 'marketplace'} onClick={() => setView('marketplace')} />
            </div>
          </div>
          
          <div className="pt-10">
            <p className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mb-6">Autonomous Ops</p>
            <div className="space-y-2">
              <NavItem icon={<Route size={20} />} label="Model Routing" active={view === 'routing'} onClick={() => setView('routing')} />
              <NavItem icon={<Signal size={20} />} label="Pressure Intel" active={view === 'signals'} onClick={() => setView('signals')} />
              <NavItem icon={<Activity size={20} />} label="Throttling" active={view === 'throttling'} onClick={() => setView('throttling')} />
              <NavItem icon={<Shield size={20} />} label="Guardrails" active={view === 'guardrails'} onClick={() => setView('guardrails')} />
              <NavItem icon={<Handshake size={20} />} label="Negotiation" active={view === 'negotiation'} onClick={() => setView('negotiation')} />
            </div>
          </div>

          <div className="pt-10">
            <p className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mb-6">Strategic Intelligence</p>
            <div className="space-y-2">
              <NavItem icon={<Rocket size={20} />} label="Planning Hub" active={view === 'planning'} onClick={() => setView('planning')} />
              <NavItem icon={<Megaphone size={20} />} label="Governance Feed" active={view === 'governance'} onClick={() => setView('governance')} />
              <NavItem icon={<Brain size={20} />} label="ML Optimization" active={view === 'optimization'} onClick={() => setView('optimization')} />
              <NavItem icon={<TrendingUpIcon size={20} />} label="Spend Forecast" active={view === 'forecast'} onClick={() => setView('forecast')} />
              <NavItem icon={<Calculator size={20} />} label="Economic Score" active={view === 'scoring'} onClick={() => setView('scoring')} />
            </div>
          </div>

          <div className="pt-10">
            <p className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mb-6">Cloud Platform</p>
            <div className="space-y-2">
              <NavItem icon={<Monitor size={20} />} label="Global Telemetry" active={view === 'performance'} onClick={() => setView('performance')} />
              <NavItem icon={<Layers size={20} />} label="System Arch" active={view === 'architecture'} onClick={() => setView('architecture')} />
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-gray-100 bg-gray-50/30">
          <button 
            onClick={exitDashboard}
            className="w-full flex items-center justify-center space-x-3 py-5 rounded-[1.5rem] text-red-500 hover:bg-red-50 transition-all font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 shadow-sm hover:shadow-lg"
          >
            <LogOut size={18} />
            <span>Power Off Portal</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-white no-scrollbar relative">
        <header className="h-24 px-12 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-2xl z-[90] shadow-sm">
           <div className="flex items-center space-x-5">
              <h2 className="text-xs font-black text-gray-300 uppercase tracking-[0.3em]">{view.replace(/_/g, ' ')}</h2>
              <ChevronRight size={16} className="text-gray-200" />
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">Live Session #E702</span>
              </div>
           </div>
           <div className="flex items-center space-x-8">
              <div className="hidden lg:flex items-center space-x-3 px-5 py-2.5 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
                 <Cpu size={16} className="text-purple-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Cognitive Load: 12%</span>
              </div>
              <div className="relative" ref={notifPanelRef}>
                <button 
                  onClick={() => setIsNotifPanelOpen(!isNotifPanelOpen)}
                  className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-black hover:bg-white hover:shadow-xl transition-all active:scale-90 relative"
                >
                  <Bell size={24} />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm animate-bounce" />
                  )}
                </button>
                {isNotifPanelOpen && (
                  <NotificationCenter 
                    notifications={notifications} 
                    onClose={() => setIsNotifPanelOpen(false)}
                    onMarkRead={markNotifRead}
                    onClearAll={clearNotifications}
                    onNavigate={enterDashboard}
                  />
                )}
              </div>
              <div className="w-12 h-12 rounded-[1.2rem] bg-gray-900 border-2 border-white flex items-center justify-center text-xs font-black text-white shadow-2xl hover:rotate-12 transition-transform cursor-pointer">EX</div>
           </div>
        </header>

        <div className="p-16 max-w-[1700px] mx-auto min-h-screen">
          <Suspense fallback={<ViewLoader />}>
            {view === 'guardrails' && <GuardrailWorkbench />}
            {view === 'routing' && <RoutingOptimisationView />}
            {view === 'signals' && <CostPressureSignalsView onNotify={addNotification} />}
            {view === 'scoring' && <EconomicScoringView />}
            {view === 'planning' && <PlanningWorkbench onNotify={addNotification} />}
            {view === 'workflows' && <WorkflowRoutingView />}
            {view === 'throttling' && <ThrottlingDashboard />}
            {view === 'negotiation' && <NegotiationWorkbench />}
            {view === 'optimization' && <OptimizationWorkbench />}
            {view === 'margin' && <MarginOptimisationView />}
            {view === 'pricing' && <PricingWorkbench />}
            {view === 'marketplace' && <MarketplaceWorkbench />}
            {view === 'performance' && <PerformanceDashboard />}
            {view === 'architecture' && <ArchitectureView policies={policies} />}
            {view === 'governance' && <GovernanceFeedView notifications={notifications} onMarkRead={markNotifRead} />}
            
            {view === 'forecast' && (
              <div className="animate-in fade-in duration-700">
                 <div className="flex justify-between items-end mb-16">
                   <div><h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-tight">Economic Forecasting</h2><p className="text-gray-500 text-lg font-medium">Predictive modeling for autonomous spend trajectory.</p></div>
                   <button onClick={handleRunForecast} className="bg-black text-white px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center space-x-3 shadow-2xl hover:scale-105 transition-all"><Wand2 size={18} /><span>Synthesise Model</span></button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                   <div className="lg:col-span-4 space-y-8">
                      <div className="bg-white border border-gray-100 rounded-[3.5rem] p-12 shadow-sm">
                        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-12">Simulation Variables</h3>
                        <div className="space-y-12">
                          <div>
                            <div className="flex justify-between items-center mb-6">
                              <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Global Activity: {scenario.agentActivityLevel}%</label>
                            </div>
                            <input type="range" min="0" max="100" value={scenario.agentActivityLevel} onChange={(e) => setScenario({...scenario, agentActivityLevel: parseInt(e.target.value)})} className="w-full h-2 bg-gray-100 rounded-full appearance-none accent-purple-600 cursor-pointer" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-6">
                              <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Reasoning Depth: {scenario.reasoningDepth}%</label>
                            </div>
                            <input type="range" min="0" max="100" value={scenario.reasoningDepth} onChange={(e) => setScenario({...scenario, reasoningDepth: parseInt(e.target.value)})} className="w-full h-2 bg-gray-100 rounded-full appearance-none accent-blue-600 cursor-pointer" />
                          </div>
                        </div>
                      </div>
                   </div>
                   <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[4rem] p-16 h-[650px] shadow-sm relative overflow-hidden text-center flex flex-col justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={forecastData}>
                          <defs>
                            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.15}/>
                              <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="date" hide />
                          <YAxis hide />
                          <Tooltip />
                          <Area type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={5} fillOpacity={1} fill="url(#colorPredicted)" animationDuration={1500} />
                          <Area type="monotone" dataKey="upperBound" stroke="transparent" fill="#f8fafc" fillOpacity={0.6} animationDuration={2000} />
                        </AreaChart>
                      </ResponsiveContainer>
                   </div>
                </div>
              </div>
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

// --- Reusable Sub-components ---

const ArchitectureView: React.FC<{ policies: SecurityPolicy[] }> = ({ policies }) => {
  useScrollToTop(true);
  return (
    <div className="animate-in fade-in duration-700 pb-32">
       <div className="mb-16">
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-tight">System Architecture</h2>
          <p className="text-gray-500 text-lg font-medium">Security primitives and autonomous bargaining schemas.</p>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-900 rounded-[4rem] p-16 text-white shadow-2xl relative overflow-hidden border-4 border-gray-800">
            <h3 className="text-3xl font-black mb-12 flex items-center space-x-5 text-purple-400 group cursor-default">
              <LockKeyhole size={36} className="group-hover:rotate-12 transition-transform" />
              <span>Hardened Isolation</span>
            </h3>
            <div className="space-y-6">
              {policies.map((p, i) => (
                <div key={p.id} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between group hover:border-purple-500/50 hover:bg-white/10 transition-all cursor-pointer animate-in slide-in-from-left-6" style={{ animationDelay: `${i * 100}ms` }}>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2 group-hover:text-purple-300 transition-colors">{p.table_name}: {p.policy_name}</p>
                    <p className="text-xs font-mono text-blue-300 bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-500/20">{p.definition}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full uppercase border border-green-500/20 backdrop-blur-md">RLS Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border-2 border-gray-50 rounded-[4rem] p-16 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-all">
            <h3 className="text-3xl font-black mb-12 flex items-center space-x-5 text-gray-900">
              <Layers size={36} className="text-gray-400 group-hover:text-black transition-colors" />
              <span>Control Primitives</span>
            </h3>
            <div className="space-y-12">
              {[
                { name: 'adaptive_policies', desc: 'Rules derived from ML feedback loops to autonomously fine-tune system behavior.', color: 'bg-purple-500' },
                { name: 'negotiation_sessions', desc: 'Immutable registry of active bargaining interactions between specialized agents.', color: 'bg-blue-500' },
                { name: 'ai_service_catalog', desc: 'Governance master-table for discovery and rate-limiting of MAS capability modules.', color: 'bg-orange-500' }
              ].map((prim, i) => (
                <div key={i} className="flex space-x-8 group/item cursor-default animate-in slide-in-from-right-6" style={{ animationDelay: `${i * 100}ms` }}>
                   <div className={`w-1.5 h-auto ${prim.color} rounded-full group-hover/item:scale-y-110 transition-transform`} />
                   <div>
                      <p className="text-lg font-black text-gray-900 mb-2 font-mono">{prim.name}</p>
                      <p className="text-gray-500 leading-relaxed font-medium">{prim.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
       </div>
    </div>
  );
};

// --- Model Routing Engine View ---

const RoutingOptimisationView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState<RoutingPolicy[]>([]);
  const [logs, setLogs] = useState<RoutingDecisionLog[]>([]);

  useEffect(() => {
    setLoading(true);
    const load = async () => {
      const [p, l] = await Promise.all([fetchRoutingPolicies(), fetchRoutingLogs()]);
      setPolicies(p);
      setLogs(l);
      setLoading(false);
    };
    load();
  }, []);

  useScrollToTop(true);

  if (loading) return <ViewLoader />;

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-tight">Model Routing Engine</h2>
          <p className="text-gray-500 text-lg font-medium">Autonomous model selection based on cost-to-capability ratios.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        {policies.map((p, i) => (
          <div key={p.id} className="p-12 bg-white border border-gray-100 rounded-[3.5rem] shadow-sm hover:border-blue-400 hover:shadow-2xl transition-all group animate-in zoom-in-95" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex justify-between items-start mb-10">
              <div className="p-5 bg-blue-50 text-blue-600 rounded-[1.5rem] group-hover:bg-black group-hover:text-white transition-all group-hover:rotate-6 shadow-sm"><Route size={36} /></div>
              <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase border shadow-sm ${p.status === 'active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>{p.status}</span>
            </div>
            <h4 className="text-2xl font-black text-gray-900 mb-4 tracking-tight group-hover:econyx-gradient-text transition-all leading-tight">{p.name}</h4>
            <p className="text-gray-500 font-medium leading-relaxed mb-12 text-sm italic">"{p.description}"</p>
            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-gray-50">
               <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest">Preferred</p>
                  <p className="text-xs font-black text-gray-900 uppercase tracking-tighter">{p.preferred_model_id}</p>
               </div>
               <div className="text-right">
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest">Threshold</p>
                  <p className="text-xs font-black text-gray-900 uppercase tracking-tighter">${p.cost_threshold.toFixed(3)}</p>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-black px-4 tracking-tight mb-8">Recent Decisions</h3>
        {logs.map((log, i) => (
          <div key={log.id} className="p-10 bg-white border border-gray-100 rounded-[3rem] flex justify-between items-center group hover:shadow-2xl transition-all animate-in slide-in-from-left-6" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center space-x-8">
               <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-blue-600 group-hover:bg-blue-50 group-hover:rotate-12 transition-all shadow-sm">
                  <Cpu size={32} />
               </div>
               <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-2 py-0.5 rounded-md">{log.task_type}</span>
                    <span className="text-xs font-bold text-gray-300 uppercase">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <h4 className="text-xl font-black text-gray-900 group-hover:econyx-gradient-text transition-all tracking-tight">Routed to {log.chosen_model_name}</h4>
                  <p className="text-sm text-gray-500 mt-2 font-medium line-clamp-1">{log.reasoning}</p>
               </div>
            </div>
            <div className="text-right">
               <div className="flex items-center justify-end space-x-2">
                  <TrendingDown size={18} className="text-green-600" />
                  <p className="text-3xl font-black text-green-600 tracking-tighter">${log.estimated_savings.toFixed(2)}</p>
               </div>
               <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">Avoidance realized</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NegotiationWorkbench: React.FC = () => {
  const [sessions, setSessions] = useState<NegotiationSession[]>([]);
  const [activeSession, setActiveSession] = useState<NegotiationSession | null>(null);
  const [proposals, setProposals] = useState<AgentProposal[]>([]);
  const [protocols, setProtocols] = useState<NegotiationProtocol[]>([]);
  const [audit, setAudit] = useState<NegotiationAuditEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'sessions' | 'deal' | 'protocols' | 'audit'>('sessions');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const load = async () => {
      const [s, p, a] = await Promise.all([fetchNegotiationSessions(), fetchNegotiationProtocols(), fetchNegotiationAudit()]);
      setSessions(s);
      setProtocols(p);
      setAudit(a);
      if (s.length > 0) setActiveSession(s[0]);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (activeSession) {
      fetchNegotiationHistory(activeSession.id).then(setProposals);
    }
  }, [activeSession]);

  useScrollToTop(activeTab);

  if (loading) return <ViewLoader />;

  return (
    <div className="animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-tight">Inter-Agent Bargaining</h2>
          <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-xl">Autonomous resource allocation through multi-agent game theory.</p>
        </div>
        <div className="flex bg-gray-50 p-2 rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden backdrop-blur-lg">
          {(['sessions', 'deal', 'protocols', 'audit'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)} 
              className={`px-8 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${activeTab === tab ? 'bg-black text-white shadow-xl scale-105' : 'text-gray-400 hover:text-black'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'sessions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           {sessions.map((s, i) => (
             <div 
               key={s.id} 
               onClick={() => { setActiveSession(s); setActiveTab('deal'); }} 
               className="bg-white border border-gray-100 rounded-[3.5rem] p-12 shadow-sm hover:border-blue-500 hover:shadow-2xl cursor-pointer transition-all group animate-in zoom-in-95"
               style={{ animationDelay: `${i * 100}ms` }}
             >
                <div className="flex justify-between items-start mb-10">
                   <div className="p-4 bg-gray-50 text-gray-400 rounded-[1.5rem] group-hover:bg-blue-50 group-hover:text-blue-600 transition-all group-hover:rotate-6"><Handshake size={32} /></div>
                   <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase border shadow-sm ${s.status === 'active' ? 'bg-green-50 text-green-600 border-green-100 animate-pulse' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>{s.status}</span>
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-2 tracking-tight group-hover:econyx-gradient-text transition-all">{s.task_type}</h4>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-12">{s.protocol_name}</p>
                <div className="flex -space-x-3 mb-12">
                   {s.agents.map(a => (
                     <div key={a.id} title={a.name} className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500 group-hover:scale-110 transition-transform shadow-sm">{a.name.charAt(0)}</div>
                   ))}
                </div>
                <div className="pt-10 border-t border-gray-50 flex justify-between items-center">
                   <div>
                      <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Bargained Surplus</p>
                      <p className="text-xl font-black text-green-600 tracking-tighter group-hover:scale-105 transition-transform">+${s.system_surplus.toFixed(2)}</p>
                   </div>
                   <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-black group-hover:text-white transition-all group-hover:translate-x-1"><ArrowRight size={24} /></div>
                </div>
             </div>
           ))}
        </div>
      )}

      {activeTab === 'deal' && activeSession && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in slide-in-from-bottom-10 duration-700">
           <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[4rem] p-16 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-20 border-b border-gray-50 pb-12">
                 <div>
                    <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{activeSession.task_type}</h3>
                    <div className="flex items-center space-x-4 mt-4">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{activeSession.id}</span>
                       <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                       <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] px-3 py-1 bg-blue-50 rounded-md">{activeSession.protocol_name}</span>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Aggregate Surplus Target</p>
                    <p className="text-5xl font-black text-green-600 tracking-tighter">+${activeSession.system_surplus.toFixed(2)}</p>
                 </div>
              </div>

              <div className="space-y-12 relative">
                 <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-50/50 rounded-full" />
                 {proposals.map((p, idx) => (
                   <div key={p.id} className="flex items-start space-x-12 relative z-10 animate-in slide-in-from-left-6 fade-in duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                      <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-blue-500/10 transition-all hover:scale-110 active:scale-95 cursor-pointer ${p.type === 'offer' ? 'bg-blue-500' : p.type === 'counter' ? 'bg-purple-500' : 'bg-green-500'}`}>
                         {p.type === 'offer' ? <Send size={24} /> : p.type === 'counter' ? <ArrowLeftRight size={24} /> : <Check size={24} strokeWidth={3} />}
                      </div>
                      <div className="flex-1 bg-gray-50/50 border border-gray-100 p-12 rounded-[3.5rem] hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all group">
                         <div className="flex justify-between items-start mb-8">
                            <div>
                               <p className="text-[11px] font-black text-gray-300 uppercase mb-2 tracking-[0.2em] group-hover:text-gray-400">{p.agent_name}</p>
                               <h4 className="text-xl font-bold text-gray-900 group-hover:econyx-gradient-text transition-all leading-tight">{p.rationale}</h4>
                            </div>
                            <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-100/50 px-4 py-1.5 rounded-full border border-blue-200 backdrop-blur-md">{p.type}</span>
                         </div>
                         <div className="grid grid-cols-3 gap-10 pt-10 border-t border-gray-100/60 mt-10">
                            <div><p className="text-[10px] text-gray-400 uppercase font-black mb-2 tracking-widest">Bid Outcome</p><p className="text-xl font-black text-gray-900 tracking-tighter">${p.bid_value.toFixed(2)}</p></div>
                            <div><p className="text-[10px] text-gray-400 uppercase font-black mb-2 tracking-widest">Offered Cost</p><p className="text-xl font-black text-gray-900 tracking-tighter">${p.offered_cost.toFixed(3)}</p></div>
                            <div><p className="text-[10px] text-gray-400 uppercase font-black mb-2 tracking-widest">Score</p><p className="text-xl font-black text-purple-600 tracking-tighter">{p.economic_score}</p></div>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="lg:col-span-4 space-y-10">
              <div className="bg-gray-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden border-4 border-gray-800">
                 <div className="absolute top-0 right-0 p-12 opacity-10 animate-pulse"><Scale size={160} /></div>
                 <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.4em] mb-16">Pareto Frontier Matrix</h3>
                 <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                       <ScatterChart>
                          <XAxis type="number" dataKey="offered_cost" hide />
                          <YAxis type="number" dataKey="bid_value" hide />
                          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                          <Scatter name="Deal Frontier" data={proposals} fill="#3b82f6" shape="circle" animationDuration={2000} />
                       </ScatterChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'protocols' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {protocols.map((proto, i) => (
            <div 
              key={proto.id} 
              className="p-16 bg-white border border-gray-100 rounded-[4rem] shadow-sm flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all group animate-in fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <div className="p-5 bg-blue-50 text-blue-600 rounded-[2rem] group-hover:bg-black group-hover:text-white group-hover:rotate-12 transition-all"><Gavel size={36} /></div>
                  <span className="text-[11px] font-black bg-blue-50 text-blue-600 px-5 py-2 rounded-full uppercase border border-blue-200 tracking-[0.2em]">{proto.type}</span>
                </div>
                <h4 className="text-3xl font-black mb-6 tracking-tighter group-hover:econyx-gradient-text transition-all">{proto.name}</h4>
                <p className="text-lg text-gray-500 leading-relaxed mb-10 font-medium">{proto.description}</p>
              </div>
              <div className="pt-10 border-t border-gray-50 flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <span className="group-hover:text-black transition-colors">Max Consensus Rounds: {proto.max_rounds}</span>
                <span className={proto.status === 'active' ? 'text-green-500' : 'text-orange-500'}>{proto.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white border border-gray-100 rounded-[4rem] p-16 shadow-sm overflow-hidden">
          <div className="space-y-6">
            {audit.map((entry, i) => (
              <div key={entry.id} className="p-10 bg-gray-50/50 rounded-[3rem] border border-gray-100 flex justify-between items-center hover:bg-white hover:shadow-xl transition-all group animate-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center space-x-10">
                   <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-black group-hover:rotate-12 transition-all">
                      <Archive size={32} strokeWidth={1.5} />
                   </div>
                   <div>
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-md">{entry.event_type}</span>
                      <span className="text-xs font-bold text-gray-300 uppercase">{new Date(entry.timestamp).toLocaleString()}</span>
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 group-hover:econyx-gradient-text transition-all tracking-tight">{entry.economic_outcome}</h4>
                    <p className="text-sm text-gray-400 mt-2 font-medium">Participating MAS: <span className="text-gray-600 font-bold">{entry.involved_agents.join(' ⇄ ')}</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-2 mb-1">
                    <TrendingUp size={20} className="text-green-600" />
                    <p className="text-3xl font-black text-green-600 tracking-tighter">+${entry.savings_delta.toFixed(2)}</p>
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Bargained Surplus</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const OptimizationWorkbench: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<LearningProgressPoint[]>([]);
  useEffect(() => { 
    setLoading(true);
    fetchLearningProgress().then(p => { setProgress(p); setLoading(false); }); 
  }, []);
  useScrollToTop(true);
  if (loading) return <ViewLoader />;
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <h2 className="text-5xl font-black mb-12 tracking-tighter leading-tight">Self-Optimising MAS</h2>
      <div className="bg-white border border-gray-100 rounded-[4rem] p-16 shadow-sm h-[500px]">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-10">Efficiency trajectory</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={progress}>
            <XAxis dataKey="timestamp" hide />
            <YAxis hide />
            <Tooltip />
            <Area type="monotone" dataKey="efficiency_score" stroke="#8b5cf6" fill="#f5f3ff" strokeWidth={4} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const MarginOptimisationView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [performance, setPerformance] = useState<MarginPerformancePoint[]>([]);
  useEffect(() => { 
    setLoading(true);
    fetchMarginPerformance().then(p => { setPerformance(p); setLoading(false); }); 
  }, []);
  useScrollToTop(true);
  if (loading) return <ViewLoader />;
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <h2 className="text-5xl font-black mb-12 tracking-tighter leading-tight">Margin Optimisation</h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[4rem] p-16 shadow-sm h-[500px]">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-10">Historical Margin Trajectory</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performance}>
              <XAxis dataKey="timestamp" hide />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="margin" stroke="#10b981" fill="#dcfce7" strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-4 space-y-8">
           <MetricCard label="System Yield" value="62.4%" status="good" />
           <MetricCard label="Exposure" value="12.2%" status="warn" />
        </div>
      </div>
    </div>
  );
};

const PricingWorkbench: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<PricingRecommendation[]>([]);
  useEffect(() => { 
    setLoading(true);
    fetchPricingRecommendations().then(r => { setRecommendations(r); setLoading(false); }); 
  }, []);
  useScrollToTop(true);
  if (loading) return <ViewLoader />;
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <h2 className="text-5xl font-black mb-12 tracking-tighter leading-tight">Pricing Engine</h2>
      <div className="space-y-6">
        {recommendations.map((r, i) => (
          <div key={r.id} className="p-12 bg-white border border-gray-100 rounded-[3.5rem] shadow-sm flex justify-between items-center group hover:shadow-2xl transition-all animate-in slide-in-from-left-6" style={{ animationDelay: `${i * 100}ms` }}>
            <div>
              <p className="text-2xl font-black text-gray-900 group-hover:econyx-gradient-text transition-all tracking-tighter">{r.service_name}</p>
              <p className="text-gray-500 font-medium mt-3 max-w-xl text-lg italic leading-relaxed">"{r.rationale}"</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-3 justify-end">
                <Tag size={20} className="text-purple-600" />
                <p className="text-4xl font-black text-purple-600 tracking-tighter">${r.recommended_price.toFixed(2)}</p>
              </div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-3">Target Price Recommendation</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MarketplaceWorkbench: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [catalog, setCatalog] = useState<AIServiceListing[]>([]);
  useEffect(() => { 
    setLoading(true);
    fetchAIServiceCatalog().then(c => { setCatalog(c); setLoading(false); }); 
  }, []);
  useScrollToTop(true);
  if (loading) return <ViewLoader />;
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <h2 className="text-5xl font-black mb-16 tracking-tighter leading-tight">MAS Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {catalog.map((item, i) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-[4rem] p-12 shadow-sm hover:border-purple-300 hover:shadow-2xl transition-all group animate-in zoom-in-95" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex justify-between items-start mb-10">
              <div className="p-5 bg-gray-50 rounded-[1.5rem] group-hover:bg-black group-hover:text-white group-hover:rotate-12 transition-all shadow-sm"><Box size={32} /></div>
              <p className="text-3xl font-black text-gray-900 tracking-tighter">${item.base_unit_price.toFixed(3)}<span className="text-xs text-gray-400 font-bold uppercase tracking-widest ml-2">Unit</span></p>
            </div>
            <h4 className="text-3xl font-black mb-4 group-hover:econyx-gradient-text transition-all tracking-tight">{item.name}</h4>
            <p className="text-lg text-gray-500 leading-relaxed font-medium mb-12">{item.description}</p>
            <button className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:scale-105 active:scale-95 transition-all">Subscribe Protocol</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PerformanceDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [regional, setRegional] = useState<ServerlessPerformance[]>([]);
  useEffect(() => { 
    setLoading(true);
    fetchRegionalPerformance().then(r => { setRegional(r); setLoading(false); }); 
  }, []);
  useScrollToTop(true);
  if (loading) return <ViewLoader />;
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <h2 className="text-5xl font-black mb-16 tracking-tighter leading-tight">Global Telemetry</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {regional.map((r, i) => (
          <div key={r.region} className="p-10 bg-gray-50 rounded-[3rem] border border-transparent hover:bg-white hover:border-gray-100 hover:shadow-2xl transition-all group animate-in slide-in-from-bottom-8" style={{ animationDelay: `${i * 100}ms` }}>
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-12 group-hover:text-black transition-colors">{r.region}</p>
             <p className="text-4xl font-black text-gray-900 tracking-tighter mb-2 group-hover:scale-105 transition-transform">{r.avgLatency}ms</p>
             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Avg Pulse</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const EconomicScoringView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<AgentDecisionLogEntry[]>([]);
  useEffect(() => { 
    setLoading(true);
    fetchDecisionHistory().then(h => { setHistory(h); setLoading(false); }); 
  }, []);
  useScrollToTop(true);
  if (loading) return <ViewLoader />;
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <h2 className="text-5xl font-black mb-16 tracking-tighter leading-tight">Decision Scorer</h2>
      <div className="space-y-6">
        {history.map((h, i) => (
          <div key={h.id} className="p-10 bg-white border border-gray-100 rounded-[3rem] flex justify-between items-center group hover:shadow-2xl transition-all animate-in slide-in-from-left-6" style={{ animationDelay: `${i * 100}ms` }}>
             <div className="flex items-center space-x-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-purple-600 group-hover:bg-purple-50 group-hover:rotate-12 transition-all shadow-sm">
                   <Target size={32} />
                </div>
                <div>
                   <p className="text-2xl font-black text-gray-900 group-hover:econyx-gradient-text transition-all tracking-tight">{h.agent_name}</p>
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">{h.action_type} • <span className="text-gray-300">{new Date(h.timestamp).toLocaleTimeString()}</span></p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-5xl font-black text-purple-600 tracking-tighter group-hover:scale-110 transition-transform">{h.score}</p>
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-2">Utility Index</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GuardrailWorkbench: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState<GuardrailPolicy[]>([]);
  useEffect(() => { 
    setLoading(true);
    fetchGuardrailPolicies().then(p => { setPolicies(p); setLoading(false); }); 
  }, []);
  useScrollToTop(true);
  if (loading) return <ViewLoader />;
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <h2 className="text-5xl font-black mb-16 tracking-tighter leading-tight">Economic Guardrails</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {policies.map((p, i) => (
          <div key={p.id} className="p-12 bg-white border border-gray-100 rounded-[3.5rem] shadow-sm hover:border-orange-300 hover:shadow-2xl transition-all group animate-in zoom-in-95" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="p-5 bg-orange-50 text-orange-600 rounded-[1.5rem] w-fit mb-10 group-hover:rotate-12 transition-all"><Shield size={32} /></div>
            <h4 className="text-2xl font-black text-gray-900 mb-4 tracking-tight group-hover:econyx-gradient-text transition-all">{p.name}</h4>
            <p className="text-gray-500 font-medium leading-relaxed mb-12 text-sm italic">"{p.description}"</p>
            <div className="pt-10 border-t border-gray-50">
              <p className="text-3xl font-black text-green-600 tracking-tighter">${p.savings_estimate.toFixed(2)}</p>
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">Leakage Prevented</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WorkflowRoutingView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [workflows, setWorkflows] = useState<WorkflowDefinition[]>([]);
  useEffect(() => { 
    setLoading(true);
    fetchWorkflowDefinitions().then(w => { setWorkflows(w); setLoading(false); }); 
  }, []);
  useScrollToTop(true);
  if (loading) return <ViewLoader />;
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <h2 className="text-5xl font-black mb-16 tracking-tighter leading-tight">Workflow ROI Matrix</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {workflows.map((wf, i) => (
          <div key={wf.id} className="p-12 bg-white border border-gray-100 rounded-[4rem] shadow-sm hover:border-blue-400 hover:shadow-2xl transition-all group animate-in fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex justify-between items-start mb-10">
              <div className="p-5 bg-blue-50 text-blue-600 rounded-[1.5rem] group-hover:bg-black group-hover:text-white transition-all group-hover:rotate-6"><WorkflowIcon size={36} /></div>
              <div className="text-right">
                <p className="text-4xl font-black text-blue-600 tracking-tighter group-hover:scale-110 transition-transform">{wf.historical_roi}%</p>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Aggregated ROI</p>
              </div>
            </div>
            <h4 className="text-3xl font-black text-gray-900 mb-4 tracking-tight group-hover:econyx-gradient-text transition-all">{wf.name}</h4>
            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-12">{wf.description}</p>
            <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] pt-10 border-t border-gray-50">
              <span className="group-hover:text-black transition-colors">Avg Cost: ${wf.avg_cost}</span>
              <span className="group-hover:text-black transition-colors">Yield: ${wf.avg_value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ThrottlingDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [masStatus, setMasStatus] = useState<MASThrottlingStatus[]>([]);
  useEffect(() => { 
    setLoading(true);
    fetchMASThrottlingStatus().then(m => { setMasStatus(m); setLoading(false); }); 
  }, []);
  useScrollToTop(true);
  if (loading) return <ViewLoader />;
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <h2 className="text-5xl font-black mb-16 tracking-tighter text-gray-900 leading-tight">Velocity Control</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {masStatus.map((mas, i) => (
          <div key={mas.mas_id} className="p-12 bg-white border border-gray-100 rounded-[3.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group animate-in slide-in-from-bottom-8" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex justify-between items-start mb-12">
              <div className={`p-5 rounded-[1.5rem] shadow-sm transition-all group-hover:rotate-12 ${mas.status === 'throttled' ? 'bg-orange-50 text-orange-600 shadow-orange-200/50' : 'bg-green-50 text-green-600 shadow-green-200/50'}`}>
                <Activity size={36} />
              </div>
              <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase border shadow-sm backdrop-blur-md ${mas.status === 'throttled' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-green-600 border-green-100'}`}>{mas.status}</span>
            </div>
            <h4 className="text-2xl font-black text-gray-900 mb-6 tracking-tight group-hover:econyx-gradient-text transition-all leading-tight">{mas.mas_name}</h4>
            <div className="flex items-end space-x-3">
              <p className="text-5xl font-black text-gray-900 tracking-tighter group-hover:scale-105 transition-transform">{mas.current_velocity}%</p>
              <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">active flow</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
