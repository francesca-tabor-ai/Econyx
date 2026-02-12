
export interface MASMetrics {
  timestamp: string;
  costPerStep: number;
  margin: number;
  tokensUsed: number;
  roi: number;
}

export interface AppNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  viewTarget?: string;
}

export interface ServerlessPerformance {
  region: string;
  avgLatency: number;
  p95Latency: number;
  coldStartRate: number; // percentage
  invocationCount: number;
  errorRate: number;
}

export interface LatencyPoint {
  timestamp: string;
  latency: number;
  isColdStart: boolean;
}

export interface LearningModel {
  id: string;
  name: string;
  type: 'Reinforcement' | 'Bayesian' | 'Neural' | 'Heuristic';
  status: 'training' | 'active' | 'evaluating';
  last_trained: string;
  accuracy_score: number;
  org_id: string;
}

export interface AdaptivePolicy {
  id: string;
  name: string;
  target_feature: 'routing' | 'throttling' | 'planning' | 'scoring';
  change_description: string;
  confidence_score: number;
  status: 'proposed' | 'live' | 'rolled_back';
  implemented_at: string;
  expected_uplift: number;
}

export interface MarginTarget {
  id: string;
  name: string;
  target_percentage: number;
  current_margin: number;
  status: 'achieved' | 'at_risk' | 'lagging';
  org_id: string;
}

export interface MarginOptimizationPolicy {
  id: string;
  name: string;
  description: string;
  trigger_metric: 'unit_cost' | 'conversion_rate' | 'latency_surge';
  action: 'downgrade_model' | 'throttle_non_critical' | 'batch_requests';
  status: 'active' | 'draft';
  org_id: string;
}

export interface PricingPolicy {
  id: string;
  name: string;
  min_margin: number;
  max_price: number;
  competitive_position: 'leader' | 'follower' | 'premium';
  demand_elasticity_factor: number;
  status: 'active' | 'testing' | 'draft';
  org_id: string;
}

export interface MarketSignal {
  type: 'demand' | 'competitor_price' | 'token_cost' | 'sentiment';
  value: number;
  change_percent: number;
  timestamp: string;
}

export interface PricingRecommendation {
  id: string;
  timestamp: string;
  service_name: string;
  current_price: number;
  recommended_price: number;
  rationale: string;
  expected_revenue_delta: number;
  expected_margin_delta: number;
  confidence_score: number;
  status: 'pending' | 'accepted' | 'rejected' | 'auto_applied';
}

export interface AIServiceListing {
  id: string;
  name: string;
  description: string;
  category: 'inference' | 'data' | 'tool' | 'specialized';
  provider_name: string;
  provider_id: string;
  base_unit_price: number;
  dynamic_multiplier: number;
  availability_score: number;
  rating: number;
  status: 'active' | 'under_maintenance' | 'paused';
  tags: string[];
}

export interface MarketplaceTransaction {
  id: string;
  timestamp: string;
  service_id: string;
  service_name: string;
  consumer_name: string;
  units: number;
  total_cost: number;
  margin_earned: number;
  status: 'completed' | 'pending' | 'disputed';
}

export interface ProviderProfile {
  id: string;
  name: string;
  services_count: number;
  total_earnings: number;
  active_subscribers: number;
  reliability_index: number;
}

export interface MarketDynamicsPoint {
  timestamp: string;
  total_demand: number;
  available_supply: number;
  avg_price_per_unit: number;
}

export interface RevenueImpactPoint {
  timestamp: string;
  actual_revenue: number;
  baseline_revenue: number;
  uplift: number;
}

export interface StrategyAdjustment {
  id: string;
  timestamp: string;
  strategy_name: string;
  rationale: string;
  expected_uplift: number;
  actual_impact?: number;
  status: 'applied' | 'testing' | 'reverted';
  affected_mas: string;
}

export interface MarginPerformancePoint {
  timestamp: string;
  margin: number;
  revenue: number;
  cost: number;
}

export interface ExperimentResult {
  id: string;
  name: string;
  variant_a_performance: number; // e.g. margin %
  variant_b_performance: number;
  statistical_significance: number; // 0-1
  status: 'running' | 'completed' | 'failed';
  start_date: string;
  end_date?: string;
}

export interface OptimizationAuditEntry {
  id: string;
  timestamp: string;
  policy_name: string;
  trigger_data_points: string[];
  rationale: string;
  economic_impact_estimate: number;
  impact_category: 'cost_reduction' | 'margin_uplift' | 'risk_mitigation';
}

export interface LearningProgressPoint {
  timestamp: string;
  efficiency_score: number;
  cumulative_savings: number;
}

export interface NegotiationSession {
  id: string;
  task_type: string;
  status: 'active' | 'finalized' | 'failed';
  agents: { id: string; name: string; avatar_seed: string }[];
  protocol_id: string;
  protocol_name: string;
  start_time: string;
  system_surplus: number; // Value created through negotiation
  current_deal_value?: number;
}

export interface AgentProposal {
  id: string;
  session_id: string;
  agent_id: string;
  agent_name: string;
  type: 'offer' | 'counter' | 'accept' | 'reject';
  bid_value: number; // Expected outcome value
  offered_cost: number; // Proposed budget/cost
  economic_score: number; // From scoring engine
  rationale: string;
  timestamp: string;
}

export interface NegotiationProtocol {
  id: string;
  name: string;
  description: string;
  type: 'auction' | 'bargaining' | 'contract_net' | 'surplus_sharing';
  max_rounds: number;
  org_id: string;
  status: 'active' | 'draft';
}

export interface NegotiationAuditEntry {
  id: string;
  session_id: string;
  timestamp: string;
  event_type: string;
  involved_agents: string[];
  economic_outcome: string;
  savings_delta: number;
}

export interface ThrottlingPolicy {
  id: string;
  name: string;
  trigger_signal_type: 'price_spike' | 'budget_proximity' | 'compute_surge' | 'margin_drop';
  condition_threshold: number;
  action_type: 'throttle_velocity' | 'defer_non_critical' | 'switch_to_lite' | 'hard_pause';
  reduction_percentage: number;
  status: 'active' | 'draft';
  org_id: string;
}

export interface MASThrottlingStatus {
  mas_id: string;
  mas_name: string;
  current_velocity: number; // 0-100%
  status: 'normal' | 'throttled' | 'paused' | 'adapting';
  active_directives: string[];
  last_updated: string;
}

export interface ThrottlingAuditEntry {
  id: string;
  timestamp: string;
  mas_id: string;
  policy_id: string;
  triggering_signal: string;
  action_taken: string;
  economic_impact_saved: number;
  velocity_change: string; // e.g. "100% -> 50%"
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  category: 'onboarding' | 'support' | 'compliance' | 'generation';
  avg_cost: number;
  avg_value: number;
  historical_roi: number;
}

export interface ROIPolicy {
  id: string;
  name: string;
  min_roi_threshold: number;
  priority_logic: 'max_value' | 'min_cost' | 'max_roi';
  fallback_strategy: 'notify' | 'route_to_human' | 'route_to_lite';
  status: 'active' | 'testing';
  org_id: string;
}

export interface WorkflowPathOption {
  id: string;
  name: string;
  steps: string[];
  projected_cost: number;
  projected_value: number;
  net_roi: number;
  confidence_score: number;
  is_chosen: boolean;
}

export interface ROIRoutingEvent {
  id: string;
  timestamp: string;
  task_type: string;
  chosen_path_id: string;
  projected_margin: number;
  savings_vs_standard: number;
  rationale: string;
}

export interface EconomicUtilityFunction {
  id: string;
  name: string;
  cost_weight: number; // 0-1
  value_weight: number; // 0-1
  risk_weight: number; // 0-1
  org_id: string;
  status: 'active' | 'draft';
}

export interface ActionDefinition {
  id: string;
  name: string;
  base_cost: number;
  base_value: number;
  base_risk: number;
  category: 'inference' | 'tool' | 'search' | 'storage';
}

export interface PlanStep {
  id: string;
  action_id: string;
  action_name: string;
  estimated_cost: number;
  estimated_value: number;
  risk_factor: number;
  utility_score: number;
  rationale: string;
}

export interface AgentPlan {
  id: string;
  goal: string;
  timestamp: string;
  total_estimated_cost: number;
  total_estimated_value: number;
  overall_utility_score: number;
  steps: PlanStep[];
  utility_model_id: string;
  org_id: string;
}

export interface EconomicScoringModel {
  id: string;
  name: string;
  weight_ev: number; // 0-1
  weight_ec: number; // 0-1
  weight_risk: number; // 0-1
  status: 'active' | 'testing' | 'archived';
  org_id: string;
}

export interface AgentDecisionLogEntry {
  id: string;
  timestamp: string;
  agent_id: string;
  agent_name: string;
  action_type: string;
  score: number;
  ev: number; // Expected Value
  ec: number; // Expected Cost
  risk: number; // Risk level
  model_id: string;
  context: string;
}

export interface ActionValueDefinition {
  id: string;
  action_type: string;
  base_value: number;
  risk_multiplier: number;
}

export interface ModelMetadata {
  id: string;
  name: string;
  provider: string;
  cost_per_1k_tokens: number;
  latency_score: number; // 0-100 (higher is faster)
  capability_score: number; // 0-100
  status: 'available' | 'overloaded' | 'offline';
}

export interface RoutingPolicy {
  id: string;
  name: string;
  description: string;
  task_type: 'reasoning' | 'summarization' | 'extraction' | 'creative' | 'code';
  priority_threshold: 'low' | 'medium' | 'high';
  cost_threshold: number;
  preferred_model_id: string;
  fallback_model_id: string;
  status: 'active' | 'testing' | 'disabled';
  org_id: string;
}

export interface RoutingDecisionLog {
  id: string;
  timestamp: string;
  task_type: string;
  chosen_model_id: string;
  chosen_model_name: string;
  alternative_model_id: string;
  alternative_model_name: string;
  estimated_savings: number;
  reasoning: string;
  latency_ms: number;
  status: 'success' | 'fallback_used' | 'failed';
}

export interface CostPressureRule {
  id: string;
  name: string;
  condition_type: 'token_price_spike' | 'budget_proximity' | 'compute_surge' | 'margin_drop';
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'inactive';
  org_id: string;
}

export interface CostPressureSignal {
  id: string;
  rule_id: string;
  rule_name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  affected_mas_id: string;
  current_value: number;
}

export interface AgentResponseLog {
  id: string;
  signal_id: string;
  agent_id: string;
  action_taken: 'throttle' | 'switch_model' | 'defer' | 'optimize_depth';
  impact_delta: number; // e.g. -0.45 cost reduction
  timestamp: string;
}

export interface GuardrailPolicy {
  id: string;
  name: string;
  description: string;
  condition_type: 'max_cost_per_call' | 'model_restriction' | 'rate_limit' | 'budget_threshold';
  condition_value: number | string;
  action: 'block' | 'throttle' | 'notify' | 'route_to_lite';
  status: 'active' | 'testing' | 'disabled';
  org_id: string;
  created_at: string;
  triggered_count: number;
  savings_estimate: number;
}

export interface PolicyViolationLog {
  id: string;
  policy_id: string;
  policy_name: string;
  agent_id: string;
  workflow_id: string;
  attempted_action: string;
  actual_outcome: 'blocked' | 'throttled' | 'redirected';
  cost_saved: number;
  timestamp: string;
  reason: string;
  metadata?: any;
}

export interface PolicyTemplate {
  id: string;
  name: string;
  description: string;
  category: 'Safety' | 'Economics' | 'Performance';
  config: Partial<GuardrailPolicy>;
}

export interface BudgetPolicy {
  id: string;
  name: string;
  target_dimension: 'workflow' | 'agent' | 'model' | 'org';
  target_id?: string;
  time_window: 'daily' | 'weekly' | 'monthly' | 'per_execution';
  limit_value: number;
  action: 'warn' | 'throttle' | 'stop';
  status: 'active' | 'draft' | 'paused' | 'archived';
  org_id: string;
  last_reset_at?: string;
}

export interface RealtimeBudgetCounter {
  id: string;
  name: string;
  current_spent: number;
  limit: number;
  percentage: number;
  last_updated: string;
  trend: number[]; // For sparklines
}

export interface BudgetAllocation {
  id: string;
  department: string;
  allocated: number;
  spent: number;
  remaining: number;
  usage_percentage: number;
  org_id: string;
}

export interface EnforcementLog {
  id: string;
  timestamp: string;
  policy_name: string;
  decision: 'ALLOW' | 'WARN' | 'BLOCK' | 'THROTTLE';
  cost_value: number;
  reason: string;
  agent_id: string;
  org_id: string;
  execution_ms: number; // Latency telemetry
}

export interface CostEvent {
  agent_id: string;
  workflow_id: string;
  estimated_cost: number;
  tokens_requested: number;
  timestamp: string;
}

export interface EnforcementBroadcastEvent {
  type: 'ENFORCEMENT_DECISION' | 'BUDGET_UPDATE' | 'GUARDRAIL_VIOLATION' | 'ROUTING_DECISION' | 'COST_PRESSURE_SIGNAL' | 'DECISION_SCORE' | 'PLAN_UPDATE' | 'WORKFLOW_ROUTE' | 'THROTTLING_DIRECTIVE' | 'NEGOTIATION_UPDATE' | 'OPTIMIZATION_EVENT' | 'STRATEGY_ADJUSTMENT' | 'PRICING_RECOMMENDATION' | 'MARKET_UPDATE';
  payload: EnforcementLog | RealtimeBudgetCounter | PolicyViolationLog | RoutingDecisionLog | CostPressureSignal | AgentDecisionLogEntry | AgentPlan | ROIRoutingEvent | MASThrottlingStatus | AgentProposal | AdaptivePolicy | StrategyAdjustment | PricingRecommendation | MarketplaceTransaction;
  org_id: string;
}

export type EnforcementDecision = 'ALLOW' | 'WARN' | 'BLOCK' | 'THROTTLE';

export interface EconomicMaturityStats {
  policies_triggered: number;
  cost_savings_prevented: number;
  active_guardrails: number;
}

export enum EconomicMaturity {
  Visibility = 'Stage 1 — Visibility',
  Control = 'Stage 2 — Control',
  Optimisation = 'Stage 3 — Optimisation',
  Autonomous = 'Stage 4 — Autonomous Economics'
}

export interface MaturityScore {
  overallScore: number;
  stage: EconomicMaturity;
  dimensions: MaturityDimension[];
  lastCalculated: string;
}

export interface MaturityDimension {
  name: string;
  score: number;
  weight: number;
  status: 'critical' | 'stable' | 'optimal';
  description: string;
  explanation?: {
    title: string;
    description: string;
    criteria: string[];
    howToImprove: string;
  };
}

export interface ForecastPoint {
  date: string;
  actual?: number;
  predicted: number;
  upperBound: number;
  lowerBound: number;
}

export interface ForecastScenario {
  id: string;
  name: string;
  tokenInflation: number;
  volumeGrowth: number;
  modelType: 'ARIMA' | 'Prophet' | 'LSTM';
  horizonDays: number;
  agentActivityLevel: number;
  reasoningDepth: number;
  optimizedRouting: boolean;
}

export interface PricingModel {
  id: string;
  name: string;
  type: 'tiered' | 'usage_based' | 'flat';
  basePrice: number;
  unitPrice?: number;
  platformFee?: number;
  discountPercentage?: number;
  tiers?: { threshold: number; price: number }[];
  orgId: string;
}

export interface DemandScenario {
  id: string;
  name: string;
  projectedMonthlySteps: number;
  growthRate: number;
}

export interface SimulationOutcome {
  timestamp: string;
  projectedRevenue: number;
  projectedCost: number;
  projectedMargin: number;
  projectedProfit: number;
  breakEvenSteps: number;
  trend: { month: string; revenue: number; cost: number; profit: number }[];
}

export interface SecurityPolicy {
  id: string;
  table_name: string;
  policy_name: string;
  definition: string;
  status: 'active' | 'testing' | 'disabled';
}

export interface Workflow {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'failed';
}

export type TimePeriod = '24h' | '7d' | '30d' | '90d';

export interface AggregatedData {
  timestamp: string;
  cost: number;
  tokens: number;
}

export interface RealtimeState {
  activeSessions: number;
  requestRate: number;
  latencyMs: number;
}

export interface PerformanceSnapshot {
  timestamp: string;
  latency: number;
  errorRate: number;
}

export interface DashboardWidget {
  id: string;
  type: string;
  title: string;
}

export interface ExternalDataSource {
  id: string;
  name: string;
  type: string;
}

export interface FunctionExecutionMetric {
  functionName: string;
  count: number;
}

export interface SavedForecast {
  id: string;
  name: string;
  date: string;
}
