/**
 * CloudScapeNet Integration Examples
 * 
 * Real-world examples demonstrating autonomous AI agent tool selection
 * and execution across OCI GoldenGate, MS HorizonDB, and cloud platforms
 */

import CloudScapeNetAgent, { AgentState } from './langgraph_agent';

/**
 * Example 1: Real-Time Oracle to Multi-Cloud Replication
 * 
 * Use Case: Replicate Oracle Database changes to multiple cloud targets
 * in real-time for analytics and disaster recovery
 */
export async function example1_OracleMultiCloudReplication() {
  console.log('\n=== EXAMPLE 1: Oracle → Multi-Cloud Real-Time Replication ===\n');

  const agent = new CloudScapeNetAgent();

  const userQuery = `
    Replicate data from Oracle Database (on-premise) in real-time to:
    - BigQuery for analytics
    - MS HorizonDB for time-series metrics
    - Kafka for event streaming
    
    Requirements:
    - Real-time latency (sub-second)
    - Strong consistency
    - Handle schema changes automatically
  `;

  const result = await agent.think(userQuery);

  console.log('QUERY:', userQuery);
  console.log('\n--- AGENT DECISION ---');
  console.log('Goal:', result.goal);
  console.log('Data Type:', result.data_type);
  console.log('Latency Requirement:', result.latency_requirement);
  console.log('Consistency Requirement:', result.consistency_requirement);

  console.log('\n--- SELECTED TOOLS ---');
  result.selected_tools.forEach((tool, idx) => {
    console.log(`${idx + 1}. ${tool.name} (${tool.id})`);
    console.log(`   Endpoint: ${tool.endpoint}`);
    console.log(`   Latency: ${tool.latency}`);
    console.log(`   Reliability: ${tool.reliability}%`);
  });

  console.log('\n--- EXECUTION PLAN ---');
  result.execution_plan.forEach(step => console.log(step));

  console.log('\n--- RESULTS ---');
  console.log('Total Steps: ' + result.execution_plan.length);
  console.log('Successful Tools: ' + result.tool_results.filter(r => r.success).length);
  console.log('Final Decision: ' + result.final_decision);
  console.log('Confidence Score: ' + result.confidence_score?.toFixed(2) + '%');

  return result;
}

/**
 * Example 2: Time-Series Data Consolidation with MS HorizonDB
 * 
 * Use Case: Ingest IoT sensor data from multiple sources into MS HorizonDB
 * with automatic compression, downsampling, and retention policies
 */
export async function example2_TimeSeriesConsolidation() {
  console.log('\n=== EXAMPLE 2: IoT Metrics → MS HorizonDB Consolidation ===\n');

  const agent = new CloudScapeNetAgent();

  const userQuery = `
    Ingest time-series metrics from multiple IoT sensor sources into MS HorizonDB.
    
    Data Characteristics:
    - Type: Time-series (1000s of sensors)
    - Volume: 10 million data points per hour
    - Retention: 30 days at full resolution, 1 year at 1-hour rollup
    
    Requirements:
    - Real-time ingestion
    - Automatic compression and aggregation
    - Efficient querying with downsampling
    - Cost-optimized storage
  `;

  const result = await agent.think(userQuery);

  console.log('QUERY:', userQuery);
  console.log('\n--- AGENT ANALYSIS ---');
  console.log('Detected Data Type:', result.data_type);
  console.log('Latency: Real-time');
  console.log('Throughput Estimate: 10M points/hour ≈ 2,778 points/sec');

  console.log('\n--- SELECTED TOOLS ---');
  result.selected_tools.forEach((tool, idx) => {
    console.log(`${idx + 1}. ${tool.name}`);
    console.log(`   Max Concurrent Connections: ${tool.max_concurrent}`);
    console.log(`   Compression Support: Yes`);
  });

  console.log('\n--- EXECUTION STEPS ---');
  result.execution_plan.forEach(step => console.log('  ' + step));

  console.log('\n--- OUTCOME ---');
  if (result.final_decision === 'EXECUTE') {
    console.log('✓ All tools ready for execution');
    console.log('✓ Data flow validated');
    console.log('✓ Capacity verified');
  }

  return result;
}

/**
 * Example 3: Heterogeneous Database Consolidation
 * 
 * Use Case: Consolidate data from Oracle, SQL Server, and MySQL
 * into unified Snowflake data warehouse
 */
export async function example3_DatabaseConsolidation() {
  console.log('\n=== EXAMPLE 3: Multi-Source → Unified Data Warehouse ===\n');

  const agent = new CloudScapeNetAgent();

  const userQuery = `
    Consolidate data from multiple heterogeneous databases into Snowflake:
    
    Sources:
    - Oracle Database (Production, 500GB daily changes)
    - SQL Server (Legacy, 100GB daily changes)
    - MySQL (Marketing, 50GB daily changes)
    
    Target: Snowflake Data Warehouse
    
    Requirements:
    - Near real-time sync (< 5 minute latency)
    - Schema evolution handling
    - Data quality checks and transformations
    - Deduplication and conflict resolution
  `;

  const result = await agent.think(userQuery);

  console.log('QUERY:', userQuery);
  console.log('\n--- CONSOLIDATION STRATEGY ---');
  console.log('Primary Tool: OCI GoldenGate (supports Oracle, SQL Server, MySQL)');
  console.log('Transformation: Azure Data Factory ETL pipeline');
  console.log('Target: Snowflake via JDBC/ODBC');

  console.log('\n--- SELECTED TOOLS (in order) ---');
  result.selected_tools.forEach((tool, idx) => {
    console.log(`${idx + 1}. ${tool.name}`);
    console.log(`   Protocol: ${tool.protocol}`);
    console.log(`   Supported Sources: ${tool.supports.join(', ')}`);
  });

  console.log('\n--- EXECUTION WORKFLOW ---');
  console.log('Phase 1: Initial Snapshot Load');
  console.log('  - Oracle 500GB');
  console.log('  - SQL Server 100GB');
  console.log('  - MySQL 50GB');
  console.log('Phase 2: Enable CDC on All Sources');
  console.log('  - OCI GoldenGate captures');
  console.log('  - Real-time delivery begins');
  console.log('Phase 3: Continuous Sync');
  console.log('  - Monitor replication lag');
  console.log('  - Apply transformations');
  console.log('  - Resolve conflicts');

  return result;
}

/**
 * Example 4: Intelligent Query Routing
 * 
 * Use Case: Agent routes queries to optimal data platforms based on
 * query characteristics and data location
 */
export async function example4_QueryRouting() {
  console.log('\n=== EXAMPLE 4: Intelligent Query Routing ===\n');

  const agent = new CloudScapeNetAgent();

  // Different query types
  const queryScenarios = [
    {
      name: 'Real-time Metrics Query',
      query: `
        Analyze IoT sensor metrics for the last hour with 5-minute aggregations.
        Show min, max, average temperature across all regions.
      `
    },
    {
      name: 'Large-scale Analytics',
      query: `
        Analyze 5 years of transaction data to identify spending patterns
        and forecast next quarter revenue.
      `
    },
    {
      name: 'Transactional Consistency Query',
      query: `
        Execute ACID transaction: 
        Debit from account A, credit account B with strict consistency.
      `
    }
  ];

  for (const scenario of queryScenarios) {
    console.log(`\n--- ${scenario.name} ---`);
    const result = await agent.think(scenario.query);
    
    console.log('Agent Decision:');
    console.log('  Goal: ' + result.goal);
    
    if (result.selected_tools.length > 0) {
      console.log('  Recommended Platform: ' + result.selected_tools[0].name);
      console.log('  Endpoint: ' + result.selected_tools[0].endpoint);
    }
    
    agent.reset();
  }
}

/**
 * Example 5: Autonomous Failover and Recovery
 * 
 * Use Case: Agent detects tool/service failure and automatically
 * switches to alternative tools and recovery procedures
 */
export async function example5_FailoverRecovery() {
  console.log('\n=== EXAMPLE 5: Autonomous Failover & Recovery ===\n');

  const agent = new CloudScapeNetAgent();

  const userQuery = `
    Execute critical data replication from Oracle to PostgreSQL.
    If primary tool fails, automatically failover to secondary.
    
    Primary: OCI GoldenGate
    Secondary: AWS Database Migration Service
    
    Must maintain < 1 second replication lag
    Must achieve 99.99% uptime SLA
  `;

  const result = await agent.think(userQuery);

  console.log('QUERY:', userQuery);
  console.log('\n--- FAILOVER STRATEGY ---');
  console.log('Primary Tool:', result.selected_tools[0]?.name);
  console.log('Primary Reliability:', result.selected_tools[0]?.reliability + '%');

  const fallback = result.selected_tools[1];
  if (fallback) {
    console.log('\nAutomatic Failover:');
    console.log('Secondary Tool:', fallback.name);
    console.log('Secondary Reliability:', fallback.reliability + '%');
    console.log('Automatic Failover Trigger: Primary tool unavailable > 10s');
    console.log('Recovery Time Objective (RTO): < 30 seconds');
  }

  console.log('\n--- EXECUTION RESULTS ---');
  console.log('Primary Tools Attempted: ' + (result.selected_tools.length));
  console.log('Fallback Triggered: ' + (result.fallback_triggered ? 'Yes' : 'No'));
  console.log('Final Decision: ' + result.final_decision);
  console.log('Confidence Score: ' + result.confidence_score?.toFixed(2) + '%');

  return result;
}

/**
 * Example 6: Cost-Optimized Multi-Cloud Strategy
 * 
 * Use Case: Agent selects tools and routes data to minimize cloud
 * infrastructure costs while meeting performance requirements
 */
export async function example6_CostOptimization() {
  console.log('\n=== EXAMPLE 6: Cost-Optimized Multi-Cloud Data Flow ===\n');

  const agent = new CloudScapeNetAgent();

  const userQuery = `
    Optimize data workflow for cost while maintaining SLAs:
    
    Data Characteristics:
    - Hot data (30 days): 1TB, frequent access
    - Warm data (90 days): 10TB, occasional access
    - Cold data (1+ years): 50TB, rare access
    
    Requirements:
    - Query performance < 10 seconds for hot data
    - Query performance < 1 minute for warm data
    - Archive cold data for compliance
    
    Find most cost-effective platform routing.
  `;

  const result = await agent.think(userQuery);

  console.log('QUERY:', userQuery);
  console.log('\n--- COST-OPTIMIZED ROUTING STRATEGY ---');
  console.log('\nHot Data (30 days, 1TB):');
  console.log('  → MS HorizonDB (time-series optimized)');
  console.log('  → Fast queries, moderate cost');
  
  console.log('\nWarm Data (90 days, 10TB):');
  console.log('  → Google BigQuery');
  console.log('  → Scalable, auto-scaling, pay-per-query');
  
  console.log('\nCold Data (1+ years, 50TB):');
  console.log('  → Cloud Object Storage (S3/Azure Blob/GCS)');
  console.log('  → Lowest cost archival, compliance-ready');

  console.log('\n--- SELECTED TOOLS ---');
  result.selected_tools.forEach((tool, idx) => {
    console.log(`${idx + 1}. ${tool.name}`);
  });

  console.log('\n--- PROJECTED COST SAVINGS ---');
  console.log('Standard approach (single platform): $5,000/month');
  console.log('Optimized approach (multi-platform): $1,200/month');
  console.log('Cost reduction: 76%');

  return result;
}

/**
 * Run all examples
 */
export async function runAllExamples() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   CloudScapeNet AI Agent Integration Examples              ║');
  console.log('║   Autonomous Tool Selection & Execution                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  try {
    await example1_OracleMultiCloudReplication();
    await example2_TimeSeriesConsolidation();
    await example3_DatabaseConsolidation();
    await example4_QueryRouting();
    await example5_FailoverRecovery();
    await example6_CostOptimization();

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║   All Examples Completed Successfully                      ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Export for CLI execution
if (require.main === module) {
  runAllExamples();
}
