import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Progress } from './components/ui/progress';
import { Slider } from './components/ui/slider';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, ComposedChart
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Zap, 
  Globe, Target, Award, ChevronRight, BarChart3,
  Calculator, Settings, Layers, Clock, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import './App.css';

// Base financial data
const baseInvestmentData = [
  { phase: 'Phase 1', investment: 12, timeline: 'Months 1-6', focus: 'Infrastructure' },
  { phase: 'Phase 2', investment: 18, timeline: 'Months 7-12', focus: 'Customer Experience' },
  { phase: 'Phase 3', investment: 8, timeline: 'Months 13-18', focus: 'Analytics & AI' }
];

const baseRevenueData = [
  { year: 'Baseline', digital: 64, traditional: 3136, total: 3200 },
  { year: 'Year 1', digital: 192, traditional: 3292, total: 3484 },
  { year: 'Year 2', digital: 480, traditional: 3456, total: 3936 },
  { year: 'Year 3', digital: 800, traditional: 3628, total: 4428 }
];

const baseCostSavings = [
  { category: 'Labor Optimization', savings: 15, year1: 8, year2: 15, year3: 15 },
  { category: 'Inventory Management', savings: 12, year1: 6, year2: 12, year3: 12 },
  { category: 'Marketing Efficiency', savings: 8, year1: 4, year2: 8, year3: 8 },
  { category: 'Energy & Facilities', savings: 5, year1: 2, year2: 5, year3: 5 }
];

const riskFactors = [
  { name: 'Technology Integration', probability: 25, impact: 7.5, mitigation: 'Phased implementation' },
  { name: 'Customer Adoption', probability: 30, impact: 6.0, mitigation: 'Training & incentives' },
  { name: 'Competitive Response', probability: 70, impact: 14.0, mitigation: 'Continuous innovation' },
  { name: 'Talent Acquisition', probability: 40, impact: 8.0, mitigation: 'Competitive packages' },
  { name: 'Cybersecurity', probability: 20, impact: 6.0, mitigation: 'Robust security' }
];

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [investmentMultiplier, setInvestmentMultiplier] = useState([1]);
  const [revenueMultiplier, setRevenueMultiplier] = useState([1]);
  const [costSavingsMultiplier, setCostSavingsMultiplier] = useState([1]);
  const [discountRate, setDiscountRate] = useState([10]);
  const [calculatedROI, setCalculatedROI] = useState(2216);
  const [calculatedNPV, setCalculatedNPV] = useState(685);
  const [calculatedPayback, setCalculatedPayback] = useState(4.2);

  // Calculate dynamic financial metrics
  useEffect(() => {
    const totalInvestment = 38 * investmentMultiplier[0];
    const totalRevenueBenefit = 2248 * revenueMultiplier[0];
    const totalCostSavings = 100 * costSavingsMultiplier[0];
    const totalBenefit = totalRevenueBenefit + totalCostSavings;
    
    const roi = ((totalBenefit - totalInvestment) / totalInvestment) * 100;
    const npv = totalBenefit * (1 - (1 / Math.pow(1 + discountRate[0]/100, 3))) - totalInvestment;
    const payback = (totalInvestment / (totalBenefit / 3)) * 12; // months
    
    setCalculatedROI(Math.round(roi));
    setCalculatedNPV(Math.round(npv));
    setCalculatedPayback(Math.round(payback * 10) / 10);
  }, [investmentMultiplier, revenueMultiplier, costSavingsMultiplier, discountRate]);

  // Dynamic data based on multipliers
  const adjustedInvestmentData = baseInvestmentData.map(item => ({
    ...item,
    investment: item.investment * investmentMultiplier[0]
  }));

  const adjustedRevenueData = baseRevenueData.map(item => ({
    ...item,
    digital: item.digital * revenueMultiplier[0],
    total: item.traditional + (item.digital * revenueMultiplier[0])
  }));

  const adjustedCostSavings = baseCostSavings.map(item => ({
    ...item,
    savings: item.savings * costSavingsMultiplier[0]
  }));

  const roiTimelineData = [
    { year: 'Year 1', roi: Math.round(calculatedROI * 0.33), cumulative: Math.round(calculatedROI * 0.33) },
    { year: 'Year 2', roi: Math.round(calculatedROI * 0.45), cumulative: Math.round(calculatedROI * 0.78) },
    { year: 'Year 3', roi: Math.round(calculatedROI * 0.22), cumulative: calculatedROI }
  ];

  const StatCard = ({ title, value, change, icon: Icon, trend, color = "blue" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className={`h-4 w-4 text-${color}-500`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            {trend === 'up' ? (
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
            )}
            {change}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const ControlPanel = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Financial Model Controls</span>
        </CardTitle>
        <CardDescription>
          Adjust parameters to explore different scenarios
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label>Investment Scale: {investmentMultiplier[0]}x</Label>
            <Slider
              value={investmentMultiplier}
              onValueChange={setInvestmentMultiplier}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Total: ${Math.round(38 * investmentMultiplier[0])}M
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Revenue Impact: {revenueMultiplier[0]}x</Label>
            <Slider
              value={revenueMultiplier}
              onValueChange={setRevenueMultiplier}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              3-Year: ${Math.round(2248 * revenueMultiplier[0])}M
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Cost Savings: {costSavingsMultiplier[0]}x</Label>
            <Slider
              value={costSavingsMultiplier}
              onValueChange={setCostSavingsMultiplier}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Annual: ${Math.round(40 * costSavingsMultiplier[0])}M
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Discount Rate: {discountRate[0]}%</Label>
            <Slider
              value={discountRate}
              onValueChange={setDiscountRate}
              max={20}
              min={5}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              NPV: ${calculatedNPV}M
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calculator className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Digital Transformation ROI
                </h1>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Financial Model Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">RetailMax Case Study</Badge>
              <Button variant="ghost" size="sm">
                <Target className="h-4 w-4 mr-2" />
                McKinsey 7-S
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Dynamic Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="ROI (3-Year)"
            value={`${calculatedROI.toLocaleString()}%`}
            change="Dynamic calculation"
            icon={TrendingUp}
            trend="up"
            color="green"
          />
          <StatCard
            title="NPV (10% discount)"
            value={`$${calculatedNPV}M`}
            change="Net present value"
            icon={DollarSign}
            trend="up"
            color="blue"
          />
          <StatCard
            title="Payback Period"
            value={`${calculatedPayback} months`}
            change="Break-even point"
            icon={Clock}
            trend="up"
            color="purple"
          />
          <StatCard
            title="Total Investment"
            value={`$${Math.round(38 * investmentMultiplier[0])}M`}
            change="18-month program"
            icon={Layers}
            trend="up"
            color="orange"
          />
        </div>

        {/* Interactive Controls */}
        <ControlPanel />

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="investment" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Investment</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Revenue</span>
            </TabsTrigger>
            <TabsTrigger value="roi-analysis" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>ROI Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Risk Assessment</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transformation Timeline & ROI</CardTitle>
                  <CardDescription>
                    ROI progression over the 3-year transformation period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={roiTimelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [`${value}%`, name === 'roi' ? 'Annual ROI' : 'Cumulative ROI']} />
                      <Bar dataKey="roi" fill="#8884d8" name="Annual ROI" />
                      <Line type="monotone" dataKey="cumulative" stroke="#82ca9d" strokeWidth={3} name="Cumulative ROI" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>McKinsey 7-S Framework Progress</CardTitle>
                  <CardDescription>
                    Organizational transformation across seven key dimensions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { dimension: 'Strategy', progress: 95, status: 'Complete' },
                    { dimension: 'Structure', progress: 90, status: 'Complete' },
                    { dimension: 'Systems', progress: 85, status: 'In Progress' },
                    { dimension: 'Shared Values', progress: 80, status: 'In Progress' },
                    { dimension: 'Skills', progress: 75, status: 'In Progress' },
                    { dimension: 'Style', progress: 85, status: 'In Progress' },
                    { dimension: 'Staff', progress: 70, status: 'In Progress' }
                  ].map((item, index) => (
                    <div key={item.dimension} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className={`h-4 w-4 ${item.progress >= 90 ? 'text-green-500' : 'text-yellow-500'}`} />
                        <span className="font-medium">{item.dimension}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={item.progress} className="w-24" />
                        <span className="text-sm font-medium w-16">{item.progress}%</span>
                        <Badge variant={item.progress >= 90 ? "default" : "secondary"} className="w-20 text-center">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Investment Tab */}
          <TabsContent value="investment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment by Phase</CardTitle>
                  <CardDescription>
                    Phased investment approach over 18 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={adjustedInvestmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="phase" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}M`, 'Investment']} />
                      <Bar dataKey="investment" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Investment Breakdown</CardTitle>
                  <CardDescription>
                    Detailed allocation across transformation phases
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {adjustedInvestmentData.map((phase, index) => (
                    <div key={phase.phase} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{phase.phase}</h4>
                        <span className="text-lg font-bold">${phase.investment}M</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {phase.timeline}
                      </div>
                      <div className="text-sm">
                        <strong>Focus:</strong> {phase.focus}
                      </div>
                      <Progress value={(phase.investment / (38 * investmentMultiplier[0])) * 100} className="mt-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Growth Projection</CardTitle>
                  <CardDescription>
                    Digital vs traditional revenue evolution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={adjustedRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}M`, 'Revenue']} />
                      <Area type="monotone" dataKey="traditional" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="digital" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Savings Analysis</CardTitle>
                  <CardDescription>
                    Annual operational cost reductions by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={adjustedCostSavings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}M`, 'Annual Savings']} />
                      <Bar dataKey="savings" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ROI Analysis Tab */}
          <TabsContent value="roi-analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive ROI Analysis</CardTitle>
                <CardDescription>
                  Financial impact assessment with scenario modeling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Conservative Scenario</h3>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {Math.round(calculatedROI * 0.75).toLocaleString()}%
                    </div>
                    <p className="text-sm text-muted-foreground">75% success rate</p>
                  </div>
                  
                  <div className="text-center p-6 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="text-lg font-semibold mb-2">Most Likely Scenario</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {calculatedROI.toLocaleString()}%
                    </div>
                    <p className="text-sm text-muted-foreground">100% success rate</p>
                  </div>
                  
                  <div className="text-center p-6 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Optimistic Scenario</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {Math.round(calculatedROI * 1.25).toLocaleString()}%
                    </div>
                    <p className="text-sm text-muted-foreground">125% success rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Assessment Tab */}
          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Matrix</CardTitle>
                <CardDescription>
                  Comprehensive risk analysis with mitigation strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskFactors.map((risk, index) => (
                    <div key={risk.name} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{risk.name}</h4>
                        <Badge variant={risk.impact > 10 ? "destructive" : risk.impact > 7 ? "secondary" : "default"}>
                          Risk Score: {risk.impact}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Probability:</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <Progress value={risk.probability * 2} className="flex-1" />
                            <span className="font-medium">{risk.probability}%</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <Progress value={risk.impact * 10} className="flex-1" />
                            <span className="font-medium">{risk.impact}/10</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Mitigation:</span>
                          <p className="mt-1">{risk.mitigation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Strategic Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Key Strategic Insights</span>
            </CardTitle>
            <CardDescription>
              Critical success factors for digital transformation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Customer-Centric Approach</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Focus on customer value creation drives 45% increase in digital revenue and 32% improvement in satisfaction.
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Phased Implementation</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  18-month phased approach reduces risk while enabling quick wins and continuous learning cycles.
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Data-Driven Decisions</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Advanced analytics and real-time monitoring enable 28% operational cost reduction and optimized performance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

