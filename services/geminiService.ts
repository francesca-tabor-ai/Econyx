import { GoogleGenAI, Type } from "@google/genai";
import { 
  Workflow, TimePeriod, AggregatedData, MaturityScore, EconomicMaturity, 
  ForecastPoint, ForecastScenario, SecurityPolicy, ServerlessPerformance, 
  LatencyPoint, BudgetPolicy, BudgetAllocation, EnforcementLog, CostEvent, 
  EnforcementDecision, RealtimeBudgetCounter, EnforcementBroadcastEvent,
  GuardrailPolicy, PolicyViolationLog, PolicyTemplate, PricingModel, DemandScenario, SimulationOutcome,
  ModelMetadata, RoutingPolicy, RoutingDecisionLog, CostPressureRule, CostPressureSignal, AgentResponseLog,
  EconomicScoringModel, AgentDecisionLogEntry, ActionValueDefinition,
  EconomicUtilityFunction, ActionDefinition, AgentPlan, PlanStep,
  WorkflowDefinition, ROIPolicy, WorkflowPathOption, ROIRoutingEvent,
  ThrottlingPolicy, MASThrottlingStatus, ThrottlingAuditEntry,
  NegotiationSession, AgentProposal, NegotiationProtocol, NegotiationAuditEntry,
  LearningModel, AdaptivePolicy, ExperimentResult, OptimizationAuditEntry, LearningProgressPoint,
  MarginTarget, MarginOptimizationPolicy, StrategyAdjustment, MarginPerformancePoint,
  PricingPolicy, MarketSignal, PricingRecommendation, RevenueImpactPoint,
  AIServiceListing, MarketplaceTransaction, ProviderProfile, MarketDynamicsPoint
} from "../types";

const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const MOCK_ORG_ID = 'org_enterprise_01';

/**
 * RLS Wrapper Simulation
 */
const withRLS = <T extends { org_id?: string; orgId?: string }>(data: T[]): T[] => {
  return data.filter(item => (item.org_id || item.orgId) === MOCK_ORG_ID);
};

// --- Enterprise AI Marketplace Simulation ---

export const fetchAIServiceCatalog = async (): Promise<AIServiceListing[]> => [
  { id: 'srv_1', name: 'Legal Sentiment Scan', description: 'Deep analysis of risk signals in commercial contracts.', category: 'specialized', provider_name: 'LegalOps MAS', provider_id: 'p_1', base_unit_price: 0.15, dynamic_multiplier: 1.2, availability_score: 98, rating: 4.8, status: 'active', tags: ['legal', 'risk', 'nlp'] },
  { id: 'srv_2', name: 'Ultra-Fast Summarizer', description: 'Lowest latency summarization for real-time telemetry.', category: 'inference', provider_name: 'Core Infra MAS', provider_id: 'p_2', base_unit_price: 0.02, dynamic_multiplier: 1.0, availability_score: 99.9, rating: 4.9, status: 'active', tags: ['fast', 'flash', 'summarization'] },
  { id: 'srv_3', name: 'Customer Intent Map', description: 'Maps support queries to high-value product opportunities.', category: 'data', provider_name: 'Revenue Intelligence', provider_id: 'p_3', base_unit_price: 0.85, dynamic_multiplier: 1.4, availability_score: 92, rating: 4.5, status: 'active', tags: ['growth', 'sales', 'mapping'] },
  { id: 'srv_4', name: 'Python Code Auditor', description: 'Security and performance auditing for enterprise Python MAS.', category: 'tool', provider_name: 'DevX Sentinel', provider_id: 'p_4', base_unit_price: 0.45, dynamic_multiplier: 1.1, availability_score: 95, rating: 4.7, status: 'under_maintenance', tags: ['dev', 'code', 'audit'] }
];

export const fetchProviderEarnings = async (): Promise<ProviderProfile[]> => [
  { id: 'p_1', name: 'LegalOps MAS', services_count: 4, total_earnings: 12450.00, active_subscribers: 12, reliability_index: 94.2 },
  { id: 'p_2', name: 'Core Infra MAS', services_count: 8, total_earnings: 45200.00, active_subscribers: 45, reliability_index: 99.8 },
  { id: 'p_3', name: 'Revenue Intelligence', services_count: 2, total_earnings: 8900.50, active_subscribers: 5, reliability_index: 88.5 }
];

export const fetchMarketplaceTransactions = async (): Promise<MarketplaceTransaction[]> => {
  const now = new Date();
  return [
    { id: 'tx_1', timestamp: new Date(now.getTime() - 1000 * 60 * 5).toISOString(), service_id: 'srv_1', service_name: 'Legal Sentiment Scan', consumer_name: 'Onboarding Dept', units: 150, total_cost: 27.00, margin_earned: 8.50, status: 'completed' },
    { id: 'tx_2', timestamp: new Date(now.getTime() - 1000 * 60 * 15).toISOString(), service_id: 'srv_2', service_name: 'Ultra-Fast Summarizer', consumer_name: 'Edge Telemetry MAS', units: 4500, total_cost: 90.00, margin_earned: 22.40, status: 'completed' }
  ];
};

export const fetchMarketDynamics = async (): Promise<MarketDynamicsPoint[]> => {
  const points: MarketDynamicsPoint[] = [];
  const now = Date.now();
  for (let i = 24; i >= 0; i--) {
    points.push({
      timestamp: new Date(now - i * 3600000).toISOString(),
      total_demand: 1000 + Math.random() * 500,
      available_supply: 800 + Math.random() * 400,
      avg_price_per_unit: 0.12 + Math.random() * 0.05
    });
  }
  return points;
};

// --- Autonomous Pricing Simulation ---

export const fetchPricingPolicies = async (): Promise<PricingPolicy[]> => [
  { id: 'pp_1', name: 'Premium Market Leader', min_margin: 60, max_price: 1.50, competitive_position: 'premium', demand_elasticity_factor: 0.8, status: 'active', org_id: MOCK_ORG_ID },
  { id: 'pp_2', name: 'Aggressive Market Grab', min_margin: 20, max_price: 0.50, competitive_position: 'follower', demand_elasticity_factor: 1.2, status: 'testing', org_id: MOCK_ORG_ID }
];

export const fetchMarketSignals = async (): Promise<MarketSignal[]> => [
  { type: 'demand', value: 84, change_percent: 12.4, timestamp: new Date().toISOString() },
  { type: 'competitor_price', value: 0.85, change_percent: -4.2, timestamp: new Date().toISOString() },
  { type: 'token_cost', value: 0.015, change_percent: 8.5, timestamp: new Date().toISOString() }
];

export const fetchPricingRecommendations = async (): Promise<PricingRecommendation[]> => [
  { 
    id: 'pr_1', timestamp: new Date().toISOString(), service_name: 'Smart Document Audit', 
    current_price: 0.85, recommended_price: 0.94, rationale: 'Input token costs surged by 8.5% and demand remains inelastic at current levels (+12% volume). Recommended 10% price lift to protect 60% margin target.', 
    expected_revenue_delta: 14500, expected_margin_delta: 4.2, confidence_score: 92, status: 'pending' 
  },
  { 
    id: 'pr_2', timestamp: new Date(Date.now() - 1000 * 3600 * 24).toISOString(), service_name: 'Customer Support Agent', 
    current_price: 0.12, recommended_price: 0.10, rationale: 'Competitor price drop detected. Reducing price to maintain market share. Expected volume increase (+25%) offset by lower unit margin.', 
    expected_revenue_delta: 2200, expected_margin_delta: -2.1, confidence_score: 85, status: 'accepted' 
  }
];

export const fetchRevenueImpact = async (): Promise<RevenueImpactPoint[]> => {
  const points: RevenueImpactPoint[] = [];
  const now = Date.now();
  for (let i = 30; i >= 0; i--) {
    const baseline = 5000 + Math.random() * 1000;
    const uplift = 400 + Math.random() * 800;
    points.push({
      timestamp: new Date(now - i * 86400000).toISOString(),
      baseline_revenue: baseline,
      actual_revenue: baseline + uplift,
      uplift: (uplift / baseline) * 100
    });
  }
  return points;
};

// --- Margin Optimisation Simulation ---

export const fetchMarginTargets = async (): Promise<MarginTarget[]> => [
  { id: 'mt_1', name: 'Core Infrastructure', target_percentage: 65, current_margin: 62.4, status: 'at_risk', org_id: MOCK_ORG_ID },
  { id: 'mt_2', name: 'Legal Compliance MAS', target_percentage: 40, current_margin: 48.2, status: 'achieved', org_id: MOCK_ORG_ID },
  { id: 'mt_3', name: 'Marketing Automations', target_percentage: 75, current_margin: 55.0, status: 'lagging', org_id: MOCK_ORG_ID }
];

export const fetchMarginOptimizationPolicies = async (): Promise<MarginOptimizationPolicy[]> => [
  { id: 'mp_1', name: 'Cost-Spike Triage', description: 'Switch to Flash-only during input price surges.', trigger_metric: 'unit_cost', action: 'downgrade_model', status: 'active', org_id: MOCK_ORG_ID },
  { id: 'mp_2', name: 'Latency-Margin Buffer', description: 'Batch non-urgent requests if latency < 100ms.', trigger_metric: 'latency_surge', action: 'batch_requests', status: 'active', org_id: MOCK_ORG_ID }
];

export const fetchStrategyAdjustments = async (): Promise<StrategyAdjustment[]> => [
  { 
    id: 'sa_1', timestamp: new Date().toISOString(), strategy_name: 'Aggressive Batching', 
    rationale: 'Unit cost per 1k tokens exceeded threshold $0.015. Batched 4.2k requests to improve efficiency.', 
    expected_uplift: 4.5, actual_impact: 3.8, status: 'applied', affected_mas: 'mas_core_infra' 
  },
  { 
    id: 'sa_2', timestamp: new Date(Date.now() - 1000 * 3600 * 2).toISOString(), strategy_name: 'Model Preference Shift', 
    rationale: 'Margin for Compliance MAS dipped below 40%. Forced model routing to Flash for summarization tasks.', 
    expected_uplift: 12.0, actual_impact: 10.2, status: 'applied', affected_mas: 'mas_legal_audit' 
  }
];

export const fetchMarginPerformance = async (): Promise<MarginPerformancePoint[]> => {
  const points: MarginPerformancePoint[] = [];
  const now = Date.now();
  for (let i = 24; i >= 0; i--) {
    const revenue = 1000 + Math.random() * 500;
    const cost = 400 + Math.random() * 200;
    points.push({
      timestamp: new Date(now - i * 3600000).toISOString(),
      revenue,
      cost,
      margin: ((revenue - cost) / revenue) * 100
    });
  }
  return points;
};

// --- Self-optimising MAS Simulation ---

export const fetchLearningModels = async (): Promise<LearningModel[]> => [
  { id: 'lm_1', name: 'Margin Maximizer v4', type: 'Reinforcement', status: 'active', last_trained: new Date().toISOString(), accuracy_score: 94.2, org_id: MOCK_ORG_ID },
  { id: 'lm_2', name: 'Price Sensitivity Predictor', type: 'Bayesian', status: 'training', last_trained: new Date().toISOString(), accuracy_score: 88.5, org_id: MOCK_ORG_ID }
];

export const fetchAdaptivePolicies = async (): Promise<AdaptivePolicy[]> => [
  { id: 'ap_1', name: 'Flash-Preferred Routing', target_feature: 'routing', change_description: 'Increased Flash model preference for low-importance reasoning.', confidence_score: 92, status: 'live', implemented_at: new Date(Date.now() - 1000 * 3600 * 48).toISOString(), expected_uplift: 12.4 },
  { id: 'ap_2', name: 'Dynamic Throttling Scale', target_feature: 'throttling', change_description: 'Aggressive throttling curve implemented for budget proximity > 90%.', confidence_score: 85, status: 'proposed', implemented_at: new Date().toISOString(), expected_uplift: 8.2 }
];

export const fetchExperimentResults = async (): Promise<ExperimentResult[]> => [
  { id: 'exp_1', name: 'Pro-Only vs Hybrid Routing', variant_a_performance: 42.5, variant_b_performance: 58.2, statistical_significance: 0.99, status: 'completed', start_date: new Date(Date.now() - 1000 * 3600 * 240).toISOString(), end_date: new Date().toISOString() },
  { id: 'exp_2', name: 'Aggressive vs Conservative Planning', variant_a_performance: 12.4, variant_b_performance: 14.8, statistical_significance: 0.72, status: 'running', start_date: new Date().toISOString() }
];

export const fetchOptimizationAudit = async (): Promise<OptimizationAuditEntry[]> => [
  { 
    id: 'oa_1', timestamp: new Date().toISOString(), policy_name: 'Flash-Preferred Routing', 
    trigger_data_points: ['Low regional token latency (SFO-1)', 'Success rate > 98%', 'Unit cost spike in Pro'], 
    rationale: 'Autonomous detection of 98%+ outcome stability with Flash for task categories [summary, triage]. Redirecting flows to optimize cost without margin erosion.', 
    economic_impact_estimate: 2450.00, impact_category: 'cost_reduction' 
  }
];

export const fetchLearningProgress = async (): Promise<LearningProgressPoint[]> => {
  const points: LearningProgressPoint[] = [];
  const now = Date.now();
  for (let i = 30; i >= 0; i--) {
    points.push({
      timestamp: new Date(now - i * 86400000).toISOString(),
      efficiency_score: 60 + (30 - i) * 1.2 + Math.random() * 5,
      cumulative_savings: (30 - i) * 150 + Math.random() * 100
    });
  }
  return points;
};

export const startExperiment = async (config: Partial<ExperimentResult>): Promise<ExperimentResult> => {
  await new Promise(r => setTimeout(r, 600));
  return { ...config, id: `exp_${Date.now()}`, status: 'running', start_date: new Date().toISOString() } as ExperimentResult;
};

// --- Multi-Agent Negotiation Simulation ---

export const fetchNegotiationProtocols = async (): Promise<NegotiationProtocol[]> => {
  const data: NegotiationProtocol[] = [
    { id: 'proto_1', name: 'Iterative Bargaining', description: 'Agents exchange counter-proposals to share surplus.', type: 'bargaining', max_rounds: 10, org_id: MOCK_ORG_ID, status: 'active' },
    { id: 'proto_2', name: 'Contract Net Protocol', description: 'Central orchestrator accepts bids from multiple MAS.', type: 'contract_net', max_rounds: 1, org_id: MOCK_ORG_ID, status: 'active' },
    { id: 'proto_3', name: 'Vickrey Auction', description: 'Highest bidder wins, pays second-highest price.', type: 'auction', max_rounds: 1, org_id: MOCK_ORG_ID, status: 'draft' }
  ];
  return withRLS(data);
};

export const fetchNegotiationSessions = async (): Promise<NegotiationSession[]> => [
  { 
    id: 'sess_1', task_type: 'Data Retrieval Pipeline', status: 'active', protocol_id: 'proto_1', protocol_name: 'Iterative Bargaining', 
    agents: [
      { id: 'agent_crawler_1', name: 'CrawlCore', avatar_seed: 'crawler' },
      { id: 'agent_indexer_1', name: 'IndexMaster', avatar_seed: 'index' }
    ], 
    start_time: new Date().toISOString(), system_surplus: 0.15 
  },
  { 
    id: 'sess_2', task_type: 'Legal Risk Scan', status: 'finalized', protocol_id: 'proto_2', protocol_name: 'Contract Net', 
    agents: [
      { id: 'agent_legal_1', name: 'LexGuard', avatar_seed: 'legal' },
      { id: 'agent_proc_1', name: 'ProcureBot', avatar_seed: 'proc' }
    ], 
    start_time: new Date(Date.now() - 1000 * 60 * 30).toISOString(), system_surplus: 1.45, current_deal_value: 4.50 
  }
];

export const fetchNegotiationHistory = async (sessionId: string): Promise<AgentProposal[]> => {
  const now = new Date();
  return [
    { id: 'prop_1', session_id: sessionId, agent_id: 'agent_crawler_1', agent_name: 'CrawlCore', type: 'offer', bid_value: 12, offered_cost: 0.85, economic_score: 82, rationale: 'Primary crawling offer based on standard bandwidth costs.', timestamp: new Date(now.getTime() - 1000 * 60 * 5).toISOString() },
    { id: 'prop_2', session_id: sessionId, agent_id: 'agent_indexer_1', agent_name: 'IndexMaster', type: 'counter', bid_value: 12, offered_cost: 0.65, economic_score: 91, rationale: 'Counter-offer: Willing to accept lower fee for priority resource access.', timestamp: new Date(now.getTime() - 1000 * 60 * 2).toISOString() }
  ];
};

export const fetchNegotiationAudit = async (): Promise<NegotiationAuditEntry[]> => {
  const now = new Date();
  return [
    { id: 'na_1', session_id: 'sess_2', timestamp: new Date(now.getTime() - 1000 * 60 * 45).toISOString(), event_type: 'DEAL_FINALIZED', involved_agents: ['LexGuard', 'ProcureBot'], economic_outcome: 'Optimal Surplus Found', savings_delta: 0.85 },
    { id: 'na_2', session_id: 'sess_1', timestamp: new Date(now.getTime() - 1000 * 60 * 120).toISOString(), event_type: 'ROUND_STARTED', involved_agents: ['CrawlCore', 'IndexMaster'], economic_outcome: 'Bargaining Initiated', savings_delta: 0 }
  ];
};

export const saveNegotiationProtocol = async (protocol: Partial<NegotiationProtocol>): Promise<NegotiationProtocol> => {
  await new Promise(r => setTimeout(r, 400));
  return { ...protocol, id: `proto_${Date.now()}`, org_id: MOCK_ORG_ID, status: 'active' } as NegotiationProtocol;
};

// --- Self-throttling MAS Simulation ---

export const fetchThrottlingPolicies = async (): Promise<ThrottlingPolicy[]> => {
  const data: ThrottlingPolicy[] = [
    { id: 'tp_1', name: 'Price Spike Governor', trigger_signal_type: 'price_spike', condition_threshold: 20, action_type: 'throttle_velocity', reduction_percentage: 50, status: 'active', org_id: MOCK_ORG_ID },
    { id: 'tp_2', name: 'Critical Budget Protection', trigger_signal_type: 'budget_proximity', condition_threshold: 95, action_type: 'defer_non_critical', reduction_percentage: 100, status: 'active', org_id: MOCK_ORG_ID }
  ];
  return withRLS(data);
};

export const fetchMASThrottlingStatus = async (): Promise<MASThrottlingStatus[]> => [
  { mas_id: 'mas_core', mas_name: 'Core Infrastructure MAS', current_velocity: 100, status: 'normal', active_directives: [], last_updated: new Date().toISOString() },
  { mas_id: 'mas_marketing', mas_name: 'Marketing Creative MAS', current_velocity: 40, status: 'throttled', active_directives: ['throttle_velocity', 'defer_non_critical'], last_updated: new Date().toISOString() },
  { mas_id: 'mas_legal', mas_name: 'Legal Audit MAS', current_velocity: 85, status: 'adapting', active_directives: ['switch_to_lite'], last_updated: new Date().toISOString() }
];

export const fetchThrottlingAudit = async (): Promise<ThrottlingAuditEntry[]> => {
  const now = new Date();
  return [
    { id: 'ta_1', timestamp: new Date(now.getTime() - 1000 * 60 * 20).toISOString(), mas_id: 'mas_marketing', policy_id: 'tp_1', triggering_signal: 'Input Token Price (+22%)', action_taken: 'Active Throttling (50% reduction)', economic_impact_saved: 142.50, velocity_change: '100% -> 40%' },
    { id: 'ta_2', timestamp: new Date(now.getTime() - 1000 * 60 * 55).toISOString(), mas_id: 'mas_legal', policy_id: 'tp_2', triggering_signal: 'Monthly Budget > 90%', action_taken: 'Model Downgrade (Lite)', economic_impact_saved: 88.20, velocity_change: '100% -> 85%' }
  ];
};

export const saveThrottlingPolicy = async (policy: Partial<ThrottlingPolicy>): Promise<ThrottlingPolicy> => {
  await new Promise(r => setTimeout(r, 500));
  return { ...policy, id: `tp_${Date.now()}`, org_id: MOCK_ORG_ID, status: 'active' } as ThrottlingPolicy;
};

// --- ROI-based Workflow Routing Simulation ---

export const fetchWorkflowDefinitions = async (): Promise<WorkflowDefinition[]> => [
  { id: 'wf_1', name: 'Smart Onboarding', description: 'Agent-led customer onboarding process.', category: 'onboarding', avg_cost: 0.12, avg_value: 0.85, historical_roi: 608 },
  { id: 'wf_2', name: 'Automated Tier-1 Support', description: 'Handles common support tickets autonomously.', category: 'support', avg_cost: 0.05, avg_value: 0.40, historical_roi: 700 },
  { id: 'wf_3', name: 'Legal Doc Compliance', description: 'Reviews legal documents for compliance gaps.', category: 'compliance', avg_cost: 0.85, avg_value: 5.20, historical_roi: 511 },
  { id: 'wf_4', name: 'Dynamic Content Engine', description: 'Generates personalized marketing assets.', category: 'generation', avg_cost: 0.15, avg_value: 0.65, historical_roi: 333 }
];

export const fetchROIPolicies = async (): Promise<ROIPolicy[]> => {
  const data: ROIPolicy[] = [
    { id: 'roi_1', name: 'Conservative Value First', min_roi_threshold: 300, priority_logic: 'max_roi', fallback_strategy: 'route_to_lite', status: 'active', org_id: MOCK_ORG_ID },
    { id: 'roi_2', name: 'Aggressive Growth Policy', min_roi_threshold: 150, priority_logic: 'max_value', fallback_strategy: 'notify', status: 'testing', org_id: MOCK_ORG_ID }
  ];
  return withRLS(data);
};

export const calculateWorkflowROI = async (taskType: string, potentialValue: number): Promise<WorkflowPathOption[]> => {
  await new Promise(r => setTimeout(r, 800)); 
  const paths: WorkflowPathOption[] = [
    { id: 'path_standard', name: 'Standard Pro-Only', steps: ['Reasoning (Pro)', 'Tools (Search)', 'Output'], projected_cost: 0.12, projected_value: potentialValue, net_roi: ((potentialValue - 0.12) / 0.12) * 100, confidence_score: 95, is_chosen: false },
    { id: 'path_optimized', name: 'ROI-Optimized Hybrid', steps: ['Classification (Lite)', 'Reasoning (Flash)', 'Tools (Local)', 'Review (Pro)'], projected_cost: 0.04, projected_value: potentialValue * 0.95, net_roi: (((potentialValue * 0.95) - 0.04) / 0.04) * 100, confidence_score: 92, is_chosen: true },
    { id: 'path_lite', name: 'Budget-Native', steps: ['Reasoning (Lite)', 'Tools (Lite)'], projected_cost: 0.005, projected_value: potentialValue * 0.70, net_roi: (((potentialValue * 0.70) - 0.005) / 0.005) * 100, confidence_score: 75, is_chosen: false }
  ];
  return paths.sort((a, b) => b.net_roi - a.net_roi);
};

export const saveROIPolicy = async (policy: Partial<ROIPolicy>): Promise<ROIPolicy> => {
  await new Promise(r => setTimeout(r, 500));
  return { ...policy, id: `roi_${Date.now()}`, org_id: MOCK_ORG_ID, status: 'active' } as ROIPolicy;
};

// --- Cost-aware Planning Engine Simulation ---

export const fetchActionDefinitions = async (): Promise<ActionDefinition[]> => [
  { id: 'act_1', name: 'Lite Inference (Flash)', base_cost: 0.005, base_value: 10, base_risk: 1, category: 'inference' },
  { id: 'act_2', name: 'Deep Reasoning (Pro)', base_cost: 0.08, base_value: 85, base_risk: 2, category: 'inference' },
  { id: 'act_3', name: 'Web Search Tool', base_cost: 0.02, base_value: 40, base_risk: 3, category: 'tool' },
  { id: 'act_4', name: 'Database Query', base_cost: 0.01, base_value: 30, base_risk: 1, category: 'storage' },
  { id: 'act_5', name: 'Vector RAG Retrieval', base_cost: 0.015, base_value: 50, base_risk: 2, category: 'storage' }
];

export const fetchUtilityFunctions = async (): Promise<EconomicUtilityFunction[]> => {
  const data: EconomicUtilityFunction[] = [
    { id: 'euf_1', name: 'Aggressive Efficiency', cost_weight: 0.7, value_weight: 0.2, risk_weight: 0.1, status: 'active', org_id: MOCK_ORG_ID },
    { id: 'euf_2', name: 'Maximum Accuracy', cost_weight: 0.1, value_weight: 0.8, risk_weight: 0.1, status: 'active', org_id: MOCK_ORG_ID },
    { id: 'euf_3', name: 'Balanced Risk-Averse', cost_weight: 0.3, value_weight: 0.3, risk_weight: 0.4, status: 'draft', org_id: MOCK_ORG_ID }
  ];
  return withRLS(data);
};

export const fetchPlanHistory = async (): Promise<AgentPlan[]> => {
  const now = new Date();
  return [
    { 
      id: 'plan_1', 
      goal: 'Audit 500 lines of legacy Python code for security flaws.', 
      timestamp: new Date(now.getTime() - 1000 * 60 * 120).toISOString(), 
      total_estimated_cost: 1.45, 
      total_estimated_value: 12.00, 
      overall_utility_score: 82, 
      steps: [
        { id: 's1', action_id: 'act_1', action_name: 'Lite Inference (Flash)', estimated_cost: 0.005, estimated_value: 5, risk_factor: 1, utility_score: 90, rationale: 'Initial code chunking and categorization.' },
        { id: 's2', action_id: 'act_2', action_name: 'Deep Reasoning (Pro)', estimated_cost: 0.85, estimated_value: 85, risk_factor: 2, utility_score: 75, rationale: 'Deep vulnerability scanning of critical blocks.' },
        { id: 's3', action_id: 'act_3', action_name: 'Web Search Tool', estimated_cost: 0.05, estimated_value: 15, risk_factor: 3, utility_score: 80, rationale: 'Cross-referencing detected patterns with CVE database.' }
      ], 
      utility_model_id: 'euf_1', 
      org_id: MOCK_ORG_ID 
    },
    { 
      id: 'plan_2', 
      goal: 'Autonomous market analysis for competitor token pricing.', 
      timestamp: new Date(now.getTime() - 1000 * 3600 * 2).toISOString(), 
      total_estimated_cost: 0.85, 
      total_estimated_value: 8.50, 
      overall_utility_score: 91, 
      steps: [
        { id: 's4', action_id: 'act_3', action_name: 'Web Search Tool', estimated_cost: 0.15, estimated_value: 40, risk_factor: 2, utility_score: 95, rationale: 'Gathering raw market pricing signals.' },
        { id: 's5', action_id: 'act_1', action_name: 'Lite Inference (Flash)', estimated_cost: 0.02, estimated_value: 10, risk_factor: 1, utility_score: 92, rationale: 'Fast summarization of search results.' }
      ], 
      utility_model_id: 'euf_2', 
      org_id: MOCK_ORG_ID 
    },
    { 
      id: 'plan_3', 
      goal: 'Dynamic rerouting of customer support flows during peak surge.', 
      timestamp: new Date(now.getTime() - 1000 * 3600 * 5).toISOString(), 
      total_estimated_cost: 2.10, 
      total_estimated_value: 18.20, 
      overall_utility_score: 74, 
      steps: [
        { id: 's6', action_id: 'act_4', action_name: 'Database Query', estimated_cost: 0.05, estimated_value: 20, risk_factor: 1, utility_score: 88, rationale: 'Retrieving historical surge patterns.' },
        { id: 's7', action_id: 'act_2', action_name: 'Deep Reasoning (Pro)', estimated_cost: 1.20, estimated_value: 90, risk_factor: 3, utility_score: 65, rationale: 'Generating complex routing graph for distributed MAS.' }
      ], 
      utility_model_id: 'euf_1', 
      org_id: MOCK_ORG_ID 
    }
  ];
};

export const generateAgentPlan = async (goal: string, utilityId: string): Promise<AgentPlan> => {
  await new Promise(r => setTimeout(r, 1200)); 
  const actions = await fetchActionDefinitions();
  const utilities = await fetchUtilityFunctions();
  const activeUtility = utilities.find(u => u.id === utilityId) || utilities[0];
  const selectedSteps: PlanStep[] = [];
  const planSize = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < planSize; i++) {
    const action = actions[Math.floor(Math.random() * actions.length)];
    const score = (action.base_value * activeUtility.value_weight) - (action.base_cost * 100 * activeUtility.cost_weight) - (action.base_risk * 10 * activeUtility.risk_weight);
    selectedSteps.push({ id: `step_${i}_${Date.now()}`, action_id: action.id, action_name: action.name, estimated_cost: action.base_cost, estimated_value: action.base_value, risk_factor: action.base_risk, utility_score: Math.max(0, Math.floor(score)), rationale: `Optimal value/cost ratio for current objective.` });
  }
  const totalCost = selectedSteps.reduce((acc, s) => acc + s.estimated_cost, 0);
  const totalValue = selectedSteps.reduce((acc, s) => acc + s.estimated_value, 0);
  const avgUtility = selectedSteps.reduce((acc, s) => acc + s.utility_score, 0) / selectedSteps.length;
  return { id: `plan_${Date.now()}`, goal, timestamp: new Date().toISOString(), total_estimated_cost: totalCost, total_estimated_value: totalValue, overall_utility_score: Math.floor(avgUtility), steps: selectedSteps, utility_model_id: activeUtility.id, org_id: MOCK_ORG_ID };
};

export const saveUtilityFunction = async (func: Partial<EconomicUtilityFunction>): Promise<EconomicUtilityFunction> => {
  await new Promise(r => setTimeout(r, 400));
  return { ...func, id: `euf_${Date.now()}`, org_id: MOCK_ORG_ID, status: 'active' } as EconomicUtilityFunction;
};

// --- Economic Scoring Engine Simulation ---

export const fetchScoringModels = async (): Promise<EconomicScoringModel[]> => {
  const data: EconomicScoringModel[] = [
    { id: 'esm_1', name: 'Standard Utility Model', weight_ev: 0.6, weight_ec: 0.3, weight_risk: 0.1, status: 'active', org_id: MOCK_ORG_ID },
    { id: 'esm_2', name: 'High-Risk Conservative', weight_ev: 0.4, weight_ec: 0.2, weight_risk: 0.4, status: 'testing', org_id: MOCK_ORG_ID }
  ];
  return withRLS(data);
};

export const fetchDecisionHistory = async (): Promise<AgentDecisionLogEntry[]> => {
  const now = new Date();
  return [
    { id: 'ad_1', timestamp: new Date(now.getTime() - 1000 * 60 * 5).toISOString(), agent_id: 'agent_qa_01', agent_name: 'QA Sentinel', action_type: 'Deep Reasoning', score: 84, ev: 92, ec: 15, risk: 5, model_id: 'esm_1', context: 'High-value code audit initiated.' },
    { id: 'ad_2', timestamp: new Date(now.getTime() - 1000 * 60 * 12).toISOString(), agent_id: 'agent_coder_4', agent_name: 'CodeCraft', action_type: 'Model Swap', score: 92, ev: 95, ec: 2, risk: 2, model_id: 'esm_1', context: 'Switched to Flash to save $1.20.' },
    { id: 'ad_3', timestamp: new Date(now.getTime() - 1000 * 60 * 18).toISOString(), agent_id: 'agent_s_1', agent_name: 'StreamSync', action_type: 'Throttling', score: 65, ev: 40, ec: 10, risk: 20, model_id: 'esm_1', context: 'Deferred low-priority telemetry.' }
  ];
};

export const scoreAgentAction = async (action: { type: string; ev: number; ec: number; risk: number }): Promise<AgentDecisionLogEntry> => {
  await new Promise(r => setTimeout(r, 45)); 
  const models = await fetchScoringModels();
  const activeModel = models.find(m => m.status === 'active') || models[0];
  const score = (action.ev * activeModel.weight_ev) - (action.ec * activeModel.weight_ec) - (action.risk * activeModel.weight_risk);
  const normalizedScore = Math.max(0, Math.min(100, score));
  return { id: `ad_${Date.now()}`, timestamp: new Date().toISOString(), agent_id: 'agent_dynamic', agent_name: 'Dynamic Agent Proxy', action_type: action.type, score: normalizedScore, ev: action.ev, ec: action.ec, risk: action.risk, model_id: activeModel.id, context: 'Real-time adaptive scoring performed at edge.' };
};

export const saveScoringModel = async (model: Partial<EconomicScoringModel>): Promise<EconomicScoringModel> => {
  await new Promise(r => setTimeout(r, 400));
  return { ...model, id: `esm_${Date.now()}`, org_id: MOCK_ORG_ID, status: 'active' } as EconomicScoringModel;
};

// --- Cost Pressure Signals Engine Simulation ---

export const fetchCostPressureRules = async (): Promise<CostPressureRule[]> => {
  const data: CostPressureRule[] = [
    { id: 'cpr_1', name: 'Price Spike Alert', condition_type: 'token_price_spike', threshold: 15, severity: 'high', status: 'active', org_id: MOCK_ORG_ID },
    { id: 'cpr_2', name: 'Budget Critical Boundary', condition_type: 'budget_proximity', threshold: 95, severity: 'critical', status: 'active', org_id: MOCK_ORG_ID },
    { id: 'cpr_3', name: 'Compute Surge Monitor', condition_type: 'compute_surge', threshold: 200, severity: 'medium', status: 'active', org_id: MOCK_ORG_ID }
  ];
  return withRLS(data);
};

export const fetchSignalHistory = async (): Promise<CostPressureSignal[]> => {
  const now = new Date();
  return [
    { id: 'cps_1', rule_id: 'cpr_1', rule_name: 'Price Spike Alert', severity: 'high', message: 'Input token prices surged by 18.2% in us-east-1.', timestamp: new Date(now.getTime() - 1000 * 60 * 15).toISOString(), affected_mas_id: 'mas_core_infra', current_value: 18.2 },
    { id: 'cps_2', rule_id: 'cpr_2', rule_name: 'Budget Critical Boundary', severity: 'critical', message: 'Monthly marketing MAS budget reached 96.4%. Throttling required.', timestamp: new Date(now.getTime() - 1000 * 60 * 45).toISOString(), affected_mas_id: 'mas_marketing', current_value: 96.4 }
  ];
};

export const fetchAgentResponses = async (): Promise<AgentResponseLog[]> => {
  const now = new Date();
  return [
    { id: 'arl_1', signal_id: 'cps_1', agent_id: 'agent_crawler_01', action_taken: 'switch_model', impact_delta: -0.85, timestamp: new Date(now.getTime() - 1000 * 60 * 14).toISOString() },
    { id: 'arl_2', signal_id: 'cps_2', agent_id: 'agent_social_post', action_taken: 'throttle', impact_delta: -1.20, timestamp: new Date(now.getTime() - 1000 * 60 * 42).toISOString() }
  ];
};

export const saveCostPressureRule = async (rule: Partial<CostPressureRule>): Promise<CostPressureRule> => {
  await new Promise(r => setTimeout(r, 400));
  return { ...rule, id: `cpr_${Date.now()}`, org_id: MOCK_ORG_ID, status: 'active' } as CostPressureRule;
};

// --- Model Routing Engine Simulation ---

export const fetchModelMetadata = async (): Promise<ModelMetadata[]> => {
  return [
    { id: 'gemini-3-pro', name: 'Gemini 3 Pro', provider: 'Google', cost_per_1k_tokens: 0.015, latency_score: 85, capability_score: 95, status: 'available' },
    { id: 'gemini-3-flash', name: 'Gemini 3 Flash', provider: 'Google', cost_per_1k_tokens: 0.0001, latency_score: 98, capability_score: 75, status: 'available' },
    { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite', provider: 'Google', cost_per_1k_tokens: 0.00005, latency_score: 99, capability_score: 60, status: 'available' },
    { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', cost_per_1k_tokens: 0.003, latency_score: 90, capability_score: 92, status: 'available' }
  ];
};

export const fetchRoutingPolicies = async (): Promise<RoutingPolicy[]> => {
  const data: RoutingPolicy[] = [
    { id: 'rp_1', name: 'Default Reasoning Route', description: 'Routes complex reasoning to high-capability models.', task_type: 'reasoning', priority_threshold: 'medium', cost_threshold: 0.05, preferred_model_id: 'gemini-3-pro', fallback_model_id: 'claude-3.5-sonnet', status: 'active', org_id: MOCK_ORG_ID },
    { id: 'rp_2', name: 'Cost-First Summarization', description: 'Prioritizes speed and low cost for mass text processing.', task_type: 'summarization', priority_threshold: 'low', cost_threshold: 0.001, preferred_model_id: 'gemini-3-flash', fallback_model_id: 'gemini-2.5-flash-lite', status: 'active', org_id: MOCK_ORG_ID }
  ];
  return withRLS(data);
};

export const fetchRoutingLogs = async (): Promise<RoutingDecisionLog[]> => {
  const now = new Date();
  return [
    { id: 'rd_1', timestamp: new Date(now.getTime() - 1000 * 60 * 5).toISOString(), task_type: 'reasoning', chosen_model_id: 'gemini-3-pro', chosen_model_name: 'Gemini 3 Pro', alternative_model_id: 'claude-3.5-sonnet', alternative_model_name: 'Claude 3.5 Sonnet', estimated_savings: 0.45, reasoning: 'Optimal balance of capability and current regional latency.', latency_ms: 42, status: 'success' },
    { id: 'rd_2', timestamp: new Date(now.getTime() - 1000 * 60 * 12).toISOString(), task_type: 'summarization', chosen_model_id: 'gemini-3-flash', chosen_model_name: 'Gemini 3 Flash', alternative_model_id: 'gemini-3-pro', alternative_model_name: 'Gemini 3 Pro', estimated_savings: 2.10, reasoning: 'Low-priority summarization task routed to cost-optimized model.', latency_ms: 18, status: 'success' }
  ];
};

export const decideOptimalModel = async (task: { type: string; importance: string; priority: string }): Promise<RoutingDecisionLog> => {
  const start = performance.now();
  await new Promise(r => setTimeout(r, 85)); 
  const models = await fetchModelMetadata();
  const policies = await fetchRoutingPolicies();
  const policy = policies.find(p => p.task_type === task.type) || policies[0];
  const chosenModel = models.find(m => m.id === policy.preferred_model_id) || models[0];
  const altModel = models.find(m => m.id === policy.fallback_model_id) || models[1];
  const execution_ms = performance.now() - start;
  return { id: `rd_${Date.now()}`, timestamp: new Date().toISOString(), task_type: task.type, chosen_model_id: chosenModel.id, chosen_model_name: chosenModel.name, alternative_model_id: altModel.id, alternative_model_name: altModel.name, estimated_savings: Math.random() * 2, reasoning: `Policy '${policy.name}' applied.`, latency_ms: execution_ms, status: 'success' };
};

export const saveRoutingPolicy = async (policy: Partial<RoutingPolicy>): Promise<RoutingPolicy> => {
  await new Promise(r => setTimeout(r, 500));
  return { ...policy, id: `rp_${Date.now()}`, org_id: MOCK_ORG_ID, status: 'active' } as RoutingPolicy;
};

// --- Guardrail Engine Simulation ---

export const fetchGuardrailPolicies = async (): Promise<GuardrailPolicy[]> => {
  const data: GuardrailPolicy[] = [
    { id: 'gp_1', name: 'High-Cost Prevention', description: 'Blocks any single agent call exceeding $2.00.', condition_type: 'max_cost_per_call', condition_value: 2.0, action: 'block', status: 'active', org_id: MOCK_ORG_ID, created_at: new Date().toISOString(), triggered_count: 142, savings_estimate: 850.40 },
    { id: 'gp_2', name: 'Model Downgrade Policy', description: 'Redirects non-critical reasoning to Flash if cost is high.', condition_type: 'model_restriction', condition_value: 'gemini-pro', action: 'route_to_lite', status: 'active', org_id: MOCK_ORG_ID, created_at: new Date().toISOString(), triggered_count: 56, savings_estimate: 1240.20 },
    { id: 'gp_3', name: 'Aggressive Throttling', description: 'Slows down agents when monthly budget exceeds 90%.', condition_type: 'budget_threshold', condition_value: 90, action: 'throttle', status: 'testing', org_id: MOCK_ORG_ID, created_at: new Date().toISOString(), triggered_count: 0, savings_estimate: 0 }
  ];
  return withRLS(data);
};

export const fetchPolicyTemplates = async (): Promise<PolicyTemplate[]> => [
  { id: 'pt_1', name: 'The Sentinel', description: 'Strict hard-cap on per-call costs.', category: 'Safety', config: { action: 'block', condition_type: 'max_cost_per_call' } },
  { id: 'pt_2', name: 'The Optimizer', description: 'Intelligent routing based on value density.', category: 'Economics', config: { action: 'route_to_lite', condition_type: 'model_restriction' } }
];

export const fetchViolationLogs = async (): Promise<PolicyViolationLog[]> => {
  const now = new Date();
  return [
    { id: 'v_1', policy_id: 'gp_1', policy_name: 'High-Cost Prevention', agent_id: 'agent_qa_01', workflow_id: 'wf_prod_sum', attempted_action: 'Inference (Ultra)', actual_outcome: 'blocked', cost_saved: 4.50, timestamp: new Date(now.getTime() - 1000 * 60 * 10).toISOString(), reason: 'Attempted $6.50 call on $2.00 limit.' },
    { id: 'v_2', policy_id: 'gp_2', policy_name: 'Model Downgrade Policy', agent_id: 'agent_coder_4', workflow_id: 'wf_dev_test', attempted_action: 'Inference (Pro)', actual_outcome: 'redirected', cost_saved: 0.85, timestamp: new Date(now.getTime() - 1000 * 60 * 45).toISOString(), reason: 'Non-critical reasoning task redirected to Flash.' }
  ];
};

export const saveGuardrailPolicy = async (policy: Partial<GuardrailPolicy>): Promise<GuardrailPolicy> => {
  await new Promise(r => setTimeout(r, 400));
  return { ...policy, id: `gp_${Date.now()}`, org_id: MOCK_ORG_ID, created_at: new Date().toISOString(), triggered_count: 0, savings_estimate: 0 } as GuardrailPolicy;
};

// --- Telemetry and Simulation Services ---

export const fetchRegionalPerformance = async (): Promise<ServerlessPerformance[]> => {
  await new Promise(r => setTimeout(r, 400));
  return [
    { region: 'sfo1', avgLatency: 42, p95Latency: 68, coldStartRate: 1.2, invocationCount: 14200, errorRate: 0.01 },
    { region: 'iad1', avgLatency: 45, p95Latency: 72, coldStartRate: 0.8, invocationCount: 18500, errorRate: 0.02 },
    { region: 'lhr1', avgLatency: 52, p95Latency: 85, coldStartRate: 1.5, invocationCount: 9200, errorRate: 0.01 },
    { region: 'sin1', avgLatency: 64, p95Latency: 110, coldStartRate: 2.1, invocationCount: 4500, errorRate: 0.05 },
    { region: 'gru1', avgLatency: 88, p95Latency: 145, coldStartRate: 3.2, invocationCount: 2100, errorRate: 0.08 }
  ];
};

export const fetchLatencyTelemetry = async (): Promise<LatencyPoint[]> => {
  const now = Date.now();
  return Array.from({ length: 24 }).map((_, i) => ({
    timestamp: new Date(now - (23 - i) * 3600000).toISOString(),
    latency: 35 + Math.random() * 20 + (i % 8 === 0 ? 150 : 0),
    isColdStart: i % 8 === 0
  }));
};

export const subscribeToGovernanceStream = (callback: (event: EnforcementBroadcastEvent) => void) => {
  const interval = setInterval(() => {
    if (Math.random() > 0.8) {
      const rand = Math.random();
      let type: EnforcementBroadcastEvent['type'] = 'ENFORCEMENT_DECISION';
      let payload: any;

      if (rand > 0.998) {
        type = 'MARKET_UPDATE';
        payload = { id: `tx_${Date.now()}`, timestamp: new Date().toISOString(), service_id: 'srv_1', service_name: 'Legal Sentiment Scan', consumer_name: 'Compliance MAS', units: 50, total_cost: 9.50, margin_earned: 2.45, status: 'completed' };
      } else if (rand > 0.995) {
        type = 'PRICING_RECOMMENDATION';
        payload = { id: `pr_${Date.now()}`, timestamp: new Date().toISOString(), service_name: 'Adaptive Query MAS', current_price: 0.45, recommended_price: 0.48, rationale: 'Market demand signals indicate 12% price tolerance lift in premium segment.', expected_revenue_delta: 2400, expected_margin_delta: 1.5, confidence_score: 88, status: 'pending' };
      } else if (rand > 0.99) {
        type = 'STRATEGY_ADJUSTMENT';
        payload = { id: `sa_${Date.now()}`, timestamp: new Date().toISOString(), strategy_name: 'Dynamic Margin Re-tune', rationale: 'Detected 12% drift in support MAS margin. Re-routing non-critical queries.', expected_uplift: 8.5, status: 'applied', affected_mas: 'mas_support_global' };
      } else if (rand > 0.98) {
        type = 'OPTIMIZATION_EVENT';
        payload = { id: `ap_${Date.now()}`, name: 'Adaptive Reasoning v2', target_feature: 'routing', change_description: 'Auto-switched reasoning category to latency-first.', confidence_score: 95, status: 'live', implemented_at: new Date().toISOString(), expected_uplift: 4.2 };
      } else if (rand > 0.95) {
        type = 'NEGOTIATION_UPDATE';
        payload = { id: `prop_${Date.now()}`, session_id: 'sess_1', agent_id: 'agent_crawler_1', agent_name: 'CrawlCore', type: 'counter', bid_value: 12, offered_cost: 0.70 + Math.random() * 0.1, economic_score: 85, rationale: 'Automated counter-proposal generated by bargaining agent.', timestamp: new Date().toISOString() };
      } else if (rand > 0.9) {
        type = 'THROTTLING_DIRECTIVE';
        payload = { mas_id: 'mas_core', mas_name: 'Core Infrastructure MAS', current_velocity: 50 + Math.random() * 50, status: 'throttled', active_directives: ['throttle_velocity'], last_updated: new Date().toISOString() };
      } else if (rand > 0.8) {
        type = 'WORKFLOW_ROUTE';
        payload = { id: `wr_${Date.now()}`, timestamp: new Date().toISOString(), task_type: 'Compliance Audit', chosen_path_id: 'path_optimized', projected_margin: 72, savings_vs_standard: 0.42, rationale: 'Optimized path selected for margin target.' };
      } else if (rand > 0.7) {
        type = 'DECISION_SCORE';
        payload = { id: `ad_${Date.now()}`, timestamp: new Date().toISOString(), agent_id: 'agent_s_1', agent_name: 'StreamSync', action_type: 'Adaptive Reasoning', score: 70 + Math.random() * 30, ev: 80 + Math.random() * 20, ec: 10 + Math.random() * 10, risk: 5 + Math.random() * 10, model_id: 'esm_1', context: 'Live decision audit.' };
      } else if (rand > 0.6) {
        type = 'COST_PRESSURE_SIGNAL';
        payload = { id: `cps_${Date.now()}`, rule_id: 'cpr_1', rule_name: 'Real-time Spike', severity: 'high', message: 'Token costs fluctuating in SFO-1 region.', timestamp: new Date().toISOString(), affected_mas_id: 'mas_global', current_value: 12.5 };
      } else if (rand > 0.4) {
        type = 'GUARDRAIL_VIOLATION';
        payload = { id: `v_${Date.now()}`, policy_id: 'gp_1', policy_name: 'High-Cost Prevention', agent_id: 'agent_s_1', workflow_id: 'wf_stream', attempted_action: 'Inference', actual_outcome: 'blocked', cost_saved: 12.00, timestamp: new Date().toISOString(), reason: 'Attempted $14.50 call.' };
      } else {
        payload = { id: `e_${Date.now()}`, timestamp: new Date().toISOString(), policy_name: 'Dynamic Budget Guard', decision: 'ALLOW', cost_value: Math.random() * 5, reason: 'Live check.', agent_id: 'agent_s_1', org_id: MOCK_ORG_ID, execution_ms: 45 };
      }

      callback({ type, org_id: MOCK_ORG_ID, payload });
    }
  }, 5000);
  return () => clearInterval(interval);
};

export const updatePolicyStatus = async (id: string, status: string): Promise<boolean> => {
  await new Promise(r => setTimeout(r, 600));
  return true;
};

export const runForecastSimulation = async (scenario: ForecastScenario): Promise<ForecastPoint[]> => {
  await new Promise(r => setTimeout(r, 950)); 
  const points: ForecastPoint[] = [];
  const now = new Date();
  for (let i = 14; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i);
    const base = 100 + Math.random() * 20;
    points.push({ date: d.toISOString().split('T')[0], actual: base, predicted: base, upperBound: base + 5, lowerBound: base - 5 });
  }
  let lastVal = points[points.length - 1].actual || 100;
  for (let i = 1; i <= scenario.horizonDays; i++) {
    const d = new Date(now); d.setDate(d.getDate() + i);
    const predicted = lastVal * (1.05 + Math.random() * 0.1);
    points.push({ date: d.toISOString().split('T')[0], predicted: predicted, upperBound: predicted * 1.1, lowerBound: predicted * 0.9 });
    lastVal = predicted;
  }
  return points;
};

export const calculateMaturityScore = async (orgId: string): Promise<MaturityScore> => {
  await new Promise(r => setTimeout(r, 600));
  return {
    overallScore: 68,
    stage: EconomicMaturity.Control,
    lastCalculated: new Date().toISOString(),
    dimensions: [
      { name: 'Visibility', score: 92, weight: 0.3, status: 'optimal', description: '92% attributed.', explanation: { title: 'MAS Visibility', description: 'Mapping tokens.', criteria: ['Coverage > 95%'], howToImprove: 'Audit tools.' } }
    ]
  };
};

export const fetchPricingModels = async (): Promise<PricingModel[]> => [
  { id: 'pm_1', name: 'Standard Usage', type: 'usage_based', basePrice: 0, unitPrice: 0.05, platformFee: 49, orgId: MOCK_ORG_ID }
];

export const fetchDemandScenarios = async (): Promise<DemandScenario[]> => [
  { id: 'ds_low', name: 'Conservative Growth', projectedMonthlySteps: 5000, growthRate: 5 }
];

export const runPricingSimulation = async (model: PricingModel, demand: DemandScenario, costPerStep: number): Promise<SimulationOutcome> => {
  await new Promise(r => setTimeout(r, 800));
  const trend = Array.from({ length: 6 }).map((_, i) => ({ month: `Month ${i+1}`, revenue: 5000 + i*1000, cost: 2000 + i*500, profit: 3000 + i*500 }));
  return { timestamp: new Date().toISOString(), projectedRevenue: 30000, projectedCost: 10000, projectedMargin: 66, projectedProfit: 20000, breakEvenSteps: 5000, trend };
};

export const analyzeEconomics = async (outcome: SimulationOutcome): Promise<string> => {
  const ai = getAI();
  const prompt = `MAS Simulation analysis: Margin ${outcome.projectedMargin}%. 2 sentences on sustainability.`;
  const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
  return response.text || "Analysis complete.";
};

export const fetchActiveSecurityPolicies = async (): Promise<SecurityPolicy[]> => [
  { id: 'pol_1', table_name: 'budget_policies', policy_name: 'Org Isolation', definition: 'org_id = auth.uid()', status: 'active' }
];

export const fetchAggregatedData = async (period: TimePeriod): Promise<AggregatedData[]> => {
  await new Promise(r => setTimeout(r, 400));
  const now = Date.now();
  return Array.from({ length: 12 }).map((_, i) => ({
    timestamp: new Date(now - (11 - i) * 3600000).toISOString(),
    cost: Math.random() * 100,
    tokens: Math.floor(Math.random() * 50000)
  }));
};

export const fetchBudgetPolicies = async (): Promise<BudgetPolicy[]> => {
  await new Promise(r => setTimeout(r, 300));
  return withRLS([
    { id: 'bp_1', name: 'Monthly Org Cap', target_dimension: 'org', time_window: 'monthly', limit_value: 1000, action: 'stop', status: 'active', org_id: MOCK_ORG_ID }
  ]);
};

export const fetchBudgetAllocations = async (): Promise<BudgetAllocation[]> => {
  await new Promise(r => setTimeout(r, 300));
  return withRLS([
    { id: 'ba_1', department: 'Engineering', allocated: 5000, spent: 2400, remaining: 2600, usage_percentage: 48, org_id: MOCK_ORG_ID }
  ]);
};

export const fetchEnforcementLogs = async (): Promise<EnforcementLog[]> => {
  await new Promise(r => setTimeout(r, 300));
  return [
    { id: 'el_1', timestamp: new Date().toISOString(), policy_name: 'Hard Stop', decision: 'BLOCK', cost_value: 0, reason: 'Budget exceeded', agent_id: 'agent_01', org_id: MOCK_ORG_ID, execution_ms: 12 }
  ];
};

export const fetchRealtimeCounters = async (): Promise<RealtimeBudgetCounter[]> => {
  await new Promise(r => setTimeout(r, 300));
  return [
    { id: 'rbc_1', name: 'Daily Workflow A', current_spent: 45.2, limit: 100, percentage: 45.2, last_updated: new Date().toISOString(), trend: [10, 20, 30, 45] }
  ];
};

export const saveBudgetPolicy = async (policy: Partial<BudgetPolicy>): Promise<BudgetPolicy> => {
  await new Promise(r => setTimeout(r, 500));
  return { ...policy, id: `bp_${Date.now()}`, org_id: MOCK_ORG_ID, status: 'active' } as BudgetPolicy;
};

export const triggerBudgetReset = async (id: string): Promise<boolean> => {
  await new Promise(r => setTimeout(r, 400));
  return true;
};