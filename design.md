## Test Design

```mermaid

graph TD
    subgraph Local_Development
        A1[Local Development]
    end

    subgraph Docker_Orchestration
        A2[Docker orchestration]
    end

    subgraph Mocked_Data
        A3[Mocked data]
    end

    subgraph Testing_Framework
        B1[Test Config Store]
        B2[Suites]
        B3[Test Runner]
        B4[Reporter]
        B5[Test Artifacts]
    end

    subgraph Github_Actions
        C1[Unit Tests & Security Scan]
        C2[Smoke Test - snippet from Integration tests]
        C3[Integration Tests (Merge to main)]
        C4[Nightly (Full End 2 End)]
        C5[Performance Tests (Pre-Release)]
        D2[Env Variables]
    end

    subgraph Report_Generation
        D1[File Report]
    end

    A1 --> A2
    A1 --> A3
    A2 --> Testing_Framework
    A3 --> B2
    Testing_Framework --> C1
    Testing_Framework --> C2
    Testing_Framework --> C3
    Testing_Framework --> C4
    Testing_Framework --> C5
    C1 --> D1
    C2 --> D1
    C3 --> D1
    C4 --> D1
    C5 --> D1
    D2 --> C1
    D2 --> C2
    D2 --> C3
    D2 --> C4
    D2 --> C5

    ```
