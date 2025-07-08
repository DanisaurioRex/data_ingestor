# 📄 Data Ingestor

**Data Ingestor** is a backend-centric application built with **NestJS** and **React**, designed to support ingestion of large datasets via CSV (with extensibility to other formats). This project serves as a technical showcase of advanced Node.js backend engineering using streaming, messaging, modular architecture, and concurrency patterns. The primary focus is on backend robustness and scalability.

---

## ✅ Core Objectives

- Demonstrate deep proficiency in **Node.js** using **NestJS**, focusing on architecture, patterns, and scalability.
- Leverage **Dependency Injection** and **SOLID principles** for maintainable code.
- Handle large file uploads with efficient memory usage using **streaming** and **backpressure** techniques.
- Use **Amazon SQS** for decoupled, event-driven processing of data rows.
- Track processing status at both process and row level for visibility and auditing.

---

## 📌 Functional Requirements

### 1. File Upload
- Accept CSV files via a web interface.
- Validate file metadata (type, size).
- Store file temporarily for ingestion.

### 2. Ingestion Orchestration
- Generate a unique `processId` per upload.
- Persist initial ingestion metadata.
- Stream and parse rows line-by-line.
- Dispatch rows to an SQS queue for processing.

### 3. Data Processing
- Process each row independently.
- Update row status and results in the database.
- Track and update the ingestion process status.

### 4. Status Monitoring
- Provide APIs to retrieve ingestion and row-level status.
- Emit events on process start, row processing, completion, and failure.

### 5. Error Reporting
- Persist failed rows with error reasons.
- Provide downloadable error reports.

---

## 🧱 Architecture

### Tech Stack
- **Backend:** NestJS (Node.js + TypeScript)
- **Database:** PostgreSQL
- **Queue:** Amazon SQS
- **Frontend:** React (for upload + status viewing)
- **Infrastructure:** Nx monorepo

### Design Patterns
- Dependency Injection
- Repository Pattern
- Event-driven architecture
- Streaming + Backpressure
- Modular domain-oriented codebase

---

## 🔄 Sequence Flow

Refer to the included sequence diagram:

1. `UploadController` accepts the file and delegates to `IngestOrchestrator`.
2. `IngestOrchestrator` persists metadata, parses file, and queues rows.
3. `ProcessorService` consumes SQS messages and processes each row.
4. `DBService` updates row and process statuses.
5. `SQSService` emits event notifications (`STARTED`, `PROCESS ROW`, `PROCESSED`, `COMPLETED`).

---

## 🧪 Testing Strategy

| Component           | Test Type            | Tools                |
|---------------------|----------------------|----------------------|
| Controllers         | E2E                  | Jest + Supertest     |
| Services            | Unit/Integration     | Jest + Mocks         |
| SQS Consumers       | Unit + Event Sim     | Jest + Localstack    |
| Database Layer      | Integration          | Testcontainers       |

---

## ⚙️ Developer Guidelines

- Organize code using Nx workspaces (`apps/`, `libs/`).
- Implement domain modules (e.g., `ingestion`, `file`, `processor`) with clean boundaries.
- Services must not directly depend on other services—always depend on interfaces.
- All external communications (DB, SQS) must go through well-defined adapters.

---

## 🔧 Technical Highlights

- File streaming via `fs.createReadStream` and `fast-csv`.
- Distributed processing via SQS workers.
- Row-level and process-level status tracking.
- Transactional DB updates and error isolation.
- Granular observability and error reports.

---

## 📈 Extensibility

- Add support for JSON, XLSX via a pluggable parser strategy.
- Add multi-tenancy for isolation of ingestion contexts.
- Add WebSocket integration for real-time progress tracking.
- Integrate AWS S3 for persistent file storage.
- Role-based access control for ingestion/report endpoints.

---

## 🔭 Future Enhancements

- Implement transformation pipeline (row mapping/validation).
- Add ingestion dashboards and analytics.
- Plug-in support for custom ingestion workflows.
- Integrate monitoring and alerts (Prometheus + Grafana).

---

## 🧩 Use Cases

![Use Case Diagram](./use-case-diagram.png)

---

## 📌 Sequence Diagram

![Sequence Diagram](./sequence-diagram.png)
