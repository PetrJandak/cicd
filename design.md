## Test Design

```mermaid

graph TB
    subgraph Local_Development
        A1[Local Development]
        A2[Environment Variables (.env file)]
    end

    subgraph Docker_Compose
        B1[Docker Orchestration]
        subgraph Docker_Services
            B2[Test Config Store]
            B3[Mocked Data]
            B4[Service A]
        end
    end

    subgraph Testing_Framework
        C1[Suites]
        C2[Test Runner]
        C3[Reporter]
        C4[Test Artifacts]
    end

    subgraph Github_Actions
        D1[Unit Tests and Security Scan]
        D2[Smoke Test - snippet from Integration tests]
        D3[Integration Tests - Merge to main]
        D4[Nightly - Full End to End]
        D5[Performance Tests - Pre-Release]
        D6[Environment Variables]
    end

    subgraph Report_Generation
        E1[File Report]
    end

    Local_Development --> Docker_Compose
    Docker_Compose --> Testing_Framework
    Testing_Framework --> Github_Actions
    Testing_Framework --> D1
    Testing_Framework --> D2
    Testing_Framework --> D3
    Testing_Framework --> D4
    Testing_Framework --> D5
    D1 --> E1
    D2 --> E1
    D3 --> E1
    D4 --> E1
    D5 --> E1
    D6 --> D1
    D6 --> D2
    D6 --> D3
    D6 --> D4
    D6 --> D5
    A2 --> A1
    A2 --> Testing_Framework


    ```
