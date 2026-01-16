/**
 * CloudScapeNet Agent Tools Registry
 * 
 * Defines all available tools for the LangGraph-based AI agent
 * including OCI GoldenGate, MS HorizonDB, and cloud provider endpoints
 */

export interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  description: string;
  enum?: string[];
}

export interface AgentTool {
  id: string;
  name: string;
  description: string;
  category: 'data_integration' | 'time_series' | 'migration' | 'query' | 'analytics' | 'ml';
  endpoint: string;
  protocol: 'REST' | 'gRPC' | 'SDK';
  latency: 'real-time' | 'sub-second' | 'seconds' | 'minutes';
  reliability: number; // 0-100 SLA percentage
  parameters: ToolParameter[];
  requires_auth: boolean;
  supports: string[]; // Supported databases/platforms
  max_concurrent: number;
}

/**
 * OCI GoldenGate Tools
 */
export const ociGoldenGateTools: AgentTool[] = [
  {
    id: 'oci_goldengate_capture',
    name: 'OCI GoldenGate Capture',
    description: 'Enable Change Data Capture (CDC) on source database',
    category: 'data_integration',
    endpoint: 'https://goldengate-api.oracle.cloud/capture',
    protocol: 'REST',
    latency: 'real-time',
    reliability: 99.95,
    parameters: [
      {
        name: 'source_db',
        type: 'string',
        required: true,
        description: 'Connection string or identifier for source database'
      },
      {
        name: 'capture_group',
        type: 'string',
        required: true,
        description: 'Capture group name for this replication task'
      },
      {
        name: 'source_schema',
        type: 'array',
        required: false,
        description: 'Specific schemas to capture (empty = all)'
      },
      {
        name: 'supplemental_logging',
        type: 'boolean',
        required: false,
        description: 'Enable supplemental logging for PK and FK'
      }
    ],
    requires_auth: true,
    supports: ['Oracle', 'MySQL', 'PostgreSQL', 'SQL Server', 'MariaDB'],
    max_concurrent: 10
  },
  {
    id: 'oci_goldengate_delivery',
    name: 'OCI GoldenGate Delivery',
    description: 'Deliver captured changes to target system',
    category: 'data_integration',
    endpoint: 'https://goldengate-api.oracle.cloud/delivery',
    protocol: 'REST',
    latency: 'sub-second',
    reliability: 99.95,
    parameters: [
      {
        name: 'delivery_group',
        type: 'string',
        required: true,
        description: 'Delivery group name'
      },
      {
        name: 'target_endpoint',
        type: 'string',
        required: true,
        description: 'Target database or Kafka endpoint'
      },
      {
        name: 'delivery_mode',
        type: 'string',
        required: false,
        description: 'Delivery strategy',
        enum: ['redo-log', 'archive', 'online']
      },
      {
        name: 'error_handling',
        type: 'string',
        required: false,
        description: 'Error handling policy',
        enum: ['discard', 'retry', 'halt']
      }
    ],
    requires_auth: true,
    supports: ['Oracle', 'MySQL', 'PostgreSQL', 'Kafka', 'SQL Server'],
    max_concurrent: 10
  },
  {
    id: 'oci_goldengate_monitor',
    name: 'OCI GoldenGate Monitor',
    description: 'Monitor replication lag and health metrics',
    category: 'data_integration',
    endpoint: 'https://goldengate-api.oracle.cloud/monitor',
    protocol: 'REST',
    latency: 'seconds',
    reliability: 99.9,
    parameters: [
      {
        name: 'extract_name',
        type: 'string',
        required: true,
        description: 'Extract process name'
      },
      {
        name: 'replicate_name',
        type: 'string',
        required: true,
        description: 'Replicate process name'
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: 'Specific metrics to retrieve'
      }
    ],
    requires_auth: true,
    supports: ['Oracle', 'MySQL', 'PostgreSQL', 'SQL Server'],
    max_concurrent: 20
  }
];

/**
 * MS HorizonDB Tools
 */
export const msHorizonDbTools: AgentTool[] = [
  {
    id: 'horizondb_ingest',
    name: 'MS HorizonDB Time-Series Ingest',
    description: 'Ingest high-volume time-series data with compression',
    category: 'time_series',
    endpoint: 'https://horizondb.microsoft.com/api/v1/ingest',
    protocol: 'REST',
    latency: 'real-time',
    reliability: 99.99,
    parameters: [
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: 'Target HorizonDB table name'
      },
      {
        name: 'time_column',
        type: 'string',
        required: true,
        description: 'Name of time/timestamp column'
      },
      {
        name: 'value_columns',
        type: 'array',
        required: true,
        description: 'Columns containing metric values'
      },
      {
        name: 'batch_size',
        type: 'number',
        required: false,
        description: 'Records per batch (default: 10000)'
      },
      {
        name: 'compression_level',
        type: 'string',
        required: false,
        description: 'Compression strategy',
        enum: ['none', 'adaptive', 'aggressive']
      }
    ],
    requires_auth: true,
    supports: ['Time-Series Data', 'IoT Metrics', 'Financial Ticks'],
    max_concurrent: 50
  },
  {
    id: 'horizondb_query',
    name: 'MS HorizonDB Query Engine',
    description: 'Query aggregated time-series with automatic downsampling',
    category: 'query',
    endpoint: 'https://horizondb.microsoft.com/api/v1/query',
    protocol: 'REST',
    latency: 'seconds',
    reliability: 99.9,
    parameters: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: 'T-SQL query targeting HorizonDB tables'
      },
      {
        name: 'time_range',
        type: 'object',
        required: true,
        description: 'Start and end timestamps'
      },
      {
        name: 'downsample_interval',
        type: 'string',
        required: false,
        description: 'Downsampling interval (e.g., "1m", "1h")'
      },
      {
        name: 'aggregation',
        type: 'string',
        required: false,
        description: 'Aggregation function',
        enum: ['sum', 'avg', 'min', 'max', 'stddev']
      }
    ],
    requires_auth: true,
    supports: ['Time-Series Analysis', 'Metrics Aggregation', 'Trend Analysis'],
    max_concurrent: 100
  },
  {
    id: 'horizondb_retention',
    name: 'MS HorizonDB Retention Policy',
    description: 'Manage data retention and automatic downsampling policies',
    category: 'time_series',
    endpoint: 'https://horizondb.microsoft.com/api/v1/retention',
    protocol: 'REST',
    latency: 'sub-second',
    reliability: 99.95,
    parameters: [
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: 'HorizonDB table name'
      },
      {
        name: 'retention_period',
        type: 'string',
        required: true,
        description: 'How long to retain full-resolution data (e.g., "30d")'
      },
      {
        name: 'archive_period',
        type: 'string',
        required: false,
        description: 'How long to keep downsampled data'
      },
      {
        name: 'downsample_interval',
        type: 'string',
        required: false,
        description: 'Interval for downsampled data'
      }
    ],
    requires_auth: true,
    supports: ['Data Lifecycle', 'Cost Optimization'],
    max_concurrent: 20
  }
];

/**
 * Cloud Database Query Tools
 */
export const cloudDatabaseTools: AgentTool[] = [
  {
    id: 'bigquery_query',
    name: 'Google BigQuery',
    description: 'Execute analytical queries on BigQuery data warehouse',
    category: 'query',
    endpoint: 'https://www.googleapis.com/bigquery/v2',
    protocol: 'REST',
    latency: 'seconds',
    reliability: 99.99,
    parameters: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: 'SQL query to execute'
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: 'GCP project ID'
      },
      {
        name: 'dataset_id',
        type: 'string',
        required: false,
        description: 'Default dataset for queries'
      }
    ],
    requires_auth: true,
    supports: ['SQL', 'Analytics', 'ML-integrated Queries'],
    max_concurrent: 100
  },
  {
    id: 'redshift_query',
    name: 'Amazon Redshift',
    description: 'Execute queries on Redshift data warehouse',
    category: 'query',
    endpoint: 'https://redshift.amazonaws.com',
    protocol: 'REST',
    latency: 'seconds',
    reliability: 99.9,
    parameters: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: 'SQL query to execute'
      },
      {
        name: 'cluster_id',
        type: 'string',
        required: true,
        description: 'Redshift cluster identifier'
      }
    ],
    requires_auth: true,
    supports: ['SQL', 'Analytics', 'Spectrum Queries'],
    max_concurrent: 50
  },
  {
    id: 'snowflake_query',
    name: 'Snowflake',
    description: 'Execute queries on Snowflake data warehouse',
    category: 'query',
    endpoint: 'https://{account}.snowflakecomputing.com',
    protocol: 'REST',
    latency: 'seconds',
    reliability: 99.95,
    parameters: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: 'SQL query to execute'
      },
      {
        name: 'warehouse',
        type: 'string',
        required: true,
        description: 'Warehouse to use for query'
      }
    ],
    requires_auth: true,
    supports: ['SQL', 'Analytics', 'Multi-cloud'],
    max_concurrent: 100
  }
];

/**
 * Migration & ETL Tools
 */
export const migrationTools: AgentTool[] = [
  {
    id: 'aws_dms_migrate',
    name: 'AWS Database Migration Service',
    description: 'Migrate databases with continuous replication',
    category: 'migration',
    endpoint: 'https://dms.amazonaws.com',
    protocol: 'REST',
    latency: 'seconds',
    reliability: 99.9,
    parameters: [
      {
        name: 'source_endpoint',
        type: 'string',
        required: true,
        description: 'Source database connection'
      },
      {
        name: 'target_endpoint',
        type: 'string',
        required: true,
        description: 'Target database connection'
      },
      {
        name: 'migration_type',
        type: 'string',
        required: false,
        description: 'Type of migration',
        enum: ['cdc', 'full-load', 'full-load-and-cdc']
      }
    ],
    requires_auth: true,
    supports: ['Oracle', 'MySQL', 'PostgreSQL', 'SQL Server', 'Aurora'],
    max_concurrent: 10
  },
  {
    id: 'azure_data_factory',
    name: 'Azure Data Factory',
    description: 'Orchestrate ETL/ELT pipelines',
    category: 'migration',
    endpoint: 'https://management.azure.com',
    protocol: 'REST',
    latency: 'seconds',
    reliability: 99.95,
    parameters: [
      {
        name: 'pipeline_name',
        type: 'string',
        required: true,
        description: 'Name of the pipeline'
      },
      {
        name: 'source',
        type: 'object',
        required: true,
        description: 'Source data configuration'
      },
      {
        name: 'sink',
        type: 'object',
        required: true,
        description: 'Destination data configuration'
      }
    ],
    requires_auth: true,
    supports: ['90+ connectors', 'Data transformation', 'Mapping flows'],
    max_concurrent: 50
  }
];

/**
 * AI/ML Model Invocation Tools
 */
export const mlTools: AgentTool[] = [
  {
    id: 'vertex_ai_predict',
    name: 'Google Vertex AI Prediction',
    description: 'Invoke trained models on Vertex AI',
    category: 'ml',
    endpoint: 'https://us-central1-aiplatform.googleapis.com',
    protocol: 'gRPC',
    latency: 'seconds',
    reliability: 99.9,
    parameters: [
      {
        name: 'endpoint_id',
        type: 'string',
        required: true,
        description: 'Vertex AI endpoint ID'
      },
      {
        name: 'instances',
        type: 'array',
        required: true,
        description: 'Input data for prediction'
      }
    ],
    requires_auth: true,
    supports: ['Custom ML Models', 'Tabular Data', 'Time-series Forecasting'],
    max_concurrent: 100
  },
  {
    id: 'azure_openai_chat',
    name: 'Azure OpenAI Chat',
    description: 'Invoke GPT-4 or other LLMs via Azure',
    category: 'ml',
    endpoint: 'https://{resource}.openai.azure.com',
    protocol: 'REST',
    latency: 'seconds',
    reliability: 99.9,
    parameters: [
      {
        name: 'deployment_id',
        type: 'string',
        required: true,
        description: 'Azure OpenAI deployment ID'
      },
      {
        name: 'messages',
        type: 'array',
        required: true,
        description: 'Chat messages'
      }
    ],
    requires_auth: true,
    supports: ['Text Generation', 'Summarization', 'Code Generation'],
    max_concurrent: 100
  }
];

/**
 * Complete Tool Registry
 */
export const toolRegistry: AgentTool[] = [
  ...ociGoldenGateTools,
  ...msHorizonDbTools,
  ...cloudDatabaseTools,
  ...migrationTools,
  ...mlTools
];

/**
 * Tool selection helper
 */
export function getToolsByCategory(category: string): AgentTool[] {
  return toolRegistry.filter(tool => tool.category === category);
}

export function getToolById(id: string): AgentTool | undefined {
  return toolRegistry.find(tool => tool.id === id);
}

export function getToolsForPlatform(platform: string): AgentTool[] {
  return toolRegistry.filter(tool => tool.supports.includes(platform));
}

/**
 * Tool execution context
 */
export interface ToolExecutionContext {
  toolId: string;
  parameters: Record<string, any>;
  timeout: number;
  retries: number;
  auth_token?: string;
}

/**
 * Tool execution result
 */
export interface ToolResult {
  tool_id: string;
  success: boolean;
  data?: any;
  error?: string;
  execution_time_ms: number;
  timestamp: Date;
}
